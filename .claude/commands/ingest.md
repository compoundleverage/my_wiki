# /ingest

把 `raw/` 下的一篇资料（或一个 URL）吸收进 wiki，触发连锁更新（1 source → 10~15 个节点变动）。

**用法**：
- `/ingest raw/<file>` — 已在 raw/ 下的文件
- `/ingest <https://...>` — URL，自动调用 `/clip` 前置抓取

**参数**：`$ARGUMENTS` = 文件相对路径 **或** URL

---

## 执行步骤

### 1. 入库校验 / URL 前置抓取

若 `$ARGUMENTS` 以 `http://` 或 `https://` 开头：

- 调用 `/clip $ARGUMENTS` 把 URL 存到 `raw/<auto-slug>.md`（见 `.claude/commands/clip.md`）
- 把返回的 `raw/<slug>.md` 作为后续步骤的实际 `<file>`
- 若 /clip 失败（BLOCKED）→ 本 /ingest 也 BLOCKED，提示用户

否则（本地路径）：

- 确认 `$ARGUMENTS` 路径在 `raw/` 下。**若不在 raw/，拒绝执行**，提示用户
- 用 Glob 或 Bash `ls` 确认文件存在

### 1.5. 二进制 → MD 边车（若适用）

若 `<file>` 扩展名 ∈ `.pdf .docx .pptx .xlsx .xls .epub .mp3 .wav`（Read 工具读不动或受页限制的格式）：

- Bash: `markitdown raw/<file>.<ext> > raw/<file>.md`
- 后续 §2 Read 走新生成的 `raw/<file>.md`；原始二进制保留作底证（不删）
- 在 `raw/<file>.md` 顶部追加边车 frontmatter：

  ```yaml
  ---
  derived_from: <file>.<ext>
  derived_via: markitdown
  derived_at: <today YYYY-MM-DD>
  source_url: <若是 /clip 链路传入则继承，否则 self>
  ---
  ```

- markitdown 失败时（exit code ≠ 0）→ 打印 stderr 后停止；**不降级回 Read**（PDF Read 有页限制、DOCX/PPTX 完全读不动，结果不可信）
- 若 sidecar `.md` 已存在 → 跳过转换（幂等）

若 `<file>` 已是 `.md` 或 `.txt`：跳过本步直接进 §2。

### 2. 深读与对齐

- 用 Read 读全文（PDF / Markdown 都支持；PDF 超过 10 页要分批）
- 提取 Takeaway 清单（≤ 7 条核心结论），每条附支撑证据
- **用 AskUserQuestion 和用户对齐 Takeaway**：
  - 问："以下是我从 `<file>` 提取的要点，准确吗？需要增删吗？"
  - 得到用户确认后才进入下一步

### 3. 连锁扫描（三步：召回 → 预筛 → 读精）

**设计理由**：Grep 本身毫秒级、不是瓶颈；随 wiki 增长真正变贵的是"grep 返回 N 候选后 Read N 个全页确认"（input token 随 N 线性）。分层为三步可在**不牺牲召回**的前提下降 Read 候选数 30-50%。

Karpathy gist 只对 `/query` 明文规定 "reads the index first"（line 57），`/ingest` 的发现方式留白。本步骤**不违背** Karpathy，是在其精神下做的 scaling 扩展。

#### 3a. 关键词召回（grep）

以 Takeaway 的关键词（人名 / 组织 / 概念术语）为种子：

- 对每个关键词用 Grep 扫 `wiki/**/*.md`
- 汇总得到 N 个候选相关页清单（粗召回）

grep 保留作**召回层**，因为 semantic retrieval 在"找文本提及"场景弱于关键词匹配（举例：新源里提到 "DisTrO" 这类专名，qmd 不一定抓得到 wiki 内提过它的页，grep 稳）。

#### 3b. Index summary 预筛（Read 前过滤层）

**一次** Read `index.md`（~100 行，轻，~3k tokens）。对 §3a 的 N 个候选：

- 查 index.md 对应行的一句话 summary（每条 `- [[page-name]] · 一句话摘要 · #tags` 格式）
- 判"与本次 Takeaway 主题**明显无关**？" → 标记 skip，**不 Read 全文**
- 判"直接相关 / 可能相关" → 保留进 §3c
- 若候选页在 index.md 无索引（漏了）→ 也保留（稳）+ log.md 后续动作字段备注"补 index 条目"

预筛通过的候选记为 N' 个（N' ≤ N）。

#### 3c. Read 全文确认真连锁

- 只对 §3b 通过的 N' 候选 Read 全文
- 判断是否真连锁（内容交集 / 冲突 / 可链接点）
- 把最终清单摆给用户看："这次 /ingest 预计会触碰 M 个页面：`[清单]`，确认？"

若 wiki 为空（首次 ingest），跳过 §3a-§3c，明确列出要**新建**的 entity / concept 页面数量。

#### 3d. 量化观测（写进 log.md）

§5 更新 log.md 时，`关键改动` 字段加一项："预筛 N → N' → 实触 M"（示例："预筛 18 → 9 → 6 处变动"）。

**用途**：
- 近期：验证预筛是否在降 Read 成本（N'/N 比值）
- 中期：观察 N 随 wiki 规模的增长曲线，触发 P1 决策（/lint O(N²) 优化 / subagent 外包）
- 长期：数据支持是否升级到 page-discovery 统一路由层（见 /plan P2）

### 4. 批量写入（可并行）

按类型分派到子目录：

- **`wiki/summaries/<source-slug>.md`** — 新建摘要页
  - slug = 文件名去扩展 + kebab-case
  - frontmatter: `type: summary`，`sources: ["../raw/<原始路径>"]`，**`last_reviewed: null`** + `status` 按 AI 自评（权威源通常 `stable`，草稿起手 `draft`）
  - 正文结构：
    1. 核心论点（3 条以内）
    2. 关键证据
    3. 与 wiki 已有结论的联系 / 冲突
- **`wiki/entities/*.md`** — 源文涉及的每个人 / 组织 / 项目 / 产品
  - 已存在：Edit 增量添加新信息，刷新 `last_updated`，frontmatter `sources` 追加；**`last_reviewed` 保持原值**（若原先已 review 过且今天有更新 → last_reviewed < last_updated → 插件自动 stale 黄点提醒重 review）
  - 不存在：Write 新建，**`last_reviewed: null`** + `status` 按自评
- **`wiki/concepts/*.md`** — 源文涉及的每个核心概念
  - 已存在：增量合并。**冲突走 `> [!warning] Conflict` 规则**（见 CLAUDE.md）；`last_updated` 刷今天，**`last_reviewed` 保持原值**
  - 不存在：新建，**`last_reviewed: null`** + `status` 按自评

**frontmatter 规则汇总**：

| 场景 | `last_reviewed` | `last_updated` | `status` |
|------|-----------------|----------------|----------|
| AI 生成新页 | `null`（必填） | 今天 | AI 自评：权威源→`stable`，草稿→`draft` |
| 增量更新已存在页 | **保持原值**（无论原值是日期还是 null） | 今天 | **保持原值** |
| 发现内容过时 | 不变 | 今天 | → `deprecated` |
| 用户亲自 review 完 | 用户手改为今天日期 | 不变 | 用户按需调整 |

**两字段语义**：`last_reviewed` 是人类 review 时间戳（AI 不可代为填日期）；`status` 是内容成熟度自评。详见 CLAUDE.md frontmatter schema § `last_reviewed` vs `status`。

**tags 写法硬约束**：`tags: [a, b, c]` 逗号分隔，**不带 `#`**（`#` 在 YAML 是注释符，带 `#` 会导致 `[` 不闭合、整个 frontmatter 被 Obsidian 拒绝）。

**Obsidian 端**：`.obsidian/plugins/review-dot/`（自研 ~54 行插件）+ `.obsidian/snippets/draft-indicator.css` 联合实现三态 dot：fresh 🔵 / stale 🟡 / ok 无。不依赖 Supercharged Links。

**连锁硬约束**：若最终只写了 1 个 summary 而没触发其他页面变动，必须在 log.md `关键改动` 字段明示理由。

### 5. 更新导航

- **index.md**：把每个新建的页面按类型插入 `## Entities` / `## Concepts` / `## Sources` 分区：
  ```markdown
  - [[page-name]] · 一句话摘要 · #tag1 #tag2
  ```
- **log.md**：append

```markdown
## [<today>] ingest | <source-title>
- 涉及页面: <page1>.md, <page2>.md, ...
- 关键改动: <一句话概括>
- 后续动作: <可选，如"待验证冲突" / "需补实体页 X">
```

`<today>` 用 Bash `date +%Y-%m-%d`。

### 6. 报告

末尾给用户一句话总结：
- 本次 ingest 新建 X 页 + 更新 Y 页 = 共 N 处变动
- 发现 Z 处冲突（如有，指出位置）
- 建议下一步（例如"`/lint` 扫连锁完整性" / "追加 raw/<某文献>"）

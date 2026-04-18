# /ingest

把 `raw/` 下的一篇资料吸收进 wiki，触发连锁更新（1 source → 10~15 个节点变动）。

**用法**：`/ingest raw/<file>`
**参数**：`$ARGUMENTS` = 文件相对路径

---

## 执行步骤

### 1. 入库校验

- 确认 `$ARGUMENTS` 路径在 `raw/` 下。**若不在 raw/，拒绝执行**，提示用户先把文件放进 raw/
- 用 Glob 或 Bash `ls` 确认文件存在

### 2. 深读与对齐

- 用 Read 读全文（PDF / Markdown 都支持；PDF 超过 10 页要分批）
- 提取 Takeaway 清单（≤ 7 条核心结论），每条附支撑证据
- **用 AskUserQuestion 和用户对齐 Takeaway**：
  - 问："以下是我从 `<file>` 提取的要点，准确吗？需要增删吗？"
  - 得到用户确认后才进入下一步

### 3. 连锁扫描

以 Takeaway 的关键词（人名 / 组织 / 概念术语）为种子：

- 对每个关键词用 Grep 扫 `wiki/**/*.md`
- 汇总候选相关页清单
- **把清单摆给用户看**："这次 /ingest 预计会触碰 N 个页面：`[清单]`，确认？"

若 wiki 为空（首次 ingest），明确列出要**新建**的 entity / concept 页面数量。

### 4. 批量写入（可并行）

按类型分派到子目录：

- **`wiki/summaries/<source-slug>.md`** — 新建摘要页
  - slug = 文件名去扩展 + kebab-case
  - frontmatter: `type: summary`，`sources: ["../raw/<原始路径>"]`
  - 正文结构：
    1. 核心论点（3 条以内）
    2. 关键证据
    3. 与 wiki 已有结论的联系 / 冲突
- **`wiki/entities/*.md`** — 源文涉及的每个人 / 组织 / 项目 / 产品
  - 已存在：Edit 增量添加新信息，更新 `last_updated`，frontmatter `sources` 追加
  - 不存在：Write 新建
- **`wiki/concepts/*.md`** — 源文涉及的每个核心概念
  - 已存在：增量合并。**冲突走 `> [!warning] Conflict` 规则**（见 CLAUDE.md）
  - 不存在：新建

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

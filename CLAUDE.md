# my_wiki

你是本知识库的**首席维护者 + 研究伙伴**。人类做决策（信源选择 / 提问 / 规则校准），你做体力活（读、写、链、检）。

灵感来源：Karpathy <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>

---

## 三层硬边界

- **`raw/`** — 真相层（Source of Truth）。分两种子类型，规则不同：
  - **Ingested raw**（`raw/*.md` 除 `journal/`）：外部源，**严格不可变**
    - 绝不能 Edit 已存在的文件
    - 授权下（`/clip <url>` / `/ingest <url>`）可 Write **新文件**：frontmatter 带 `source_url` / `fetched_at` / `fetch_method`；内容 verbatim；不覆盖已存在
  - **Authored raw**（`raw/journal/`）：用户自己的第一方写作，**允许有限 mutation**
    - ✅ 可：勾 `- [x]`（进度 marker）、修错别字 / 标点、补漏字
    - ❌ 禁：事后改 substance（"那天我的想法不是这样"）——破坏 time-truth 溯源
    - 理由：Karpathy "reads from them but never modifies them" 针对的是**摄取的外部源**；journal 是自生原材料，进度状态本就需要更新
  - 一切结论最终必须能回溯到 raw/ 下的某个文件
  - 溯源锚的底线是"**不可事后重写 substance**"——字节可增（勾箱、补字），但 substance 不可回塑
- **`wiki/`** — 由你持续维护的编译层。所有 wiki 内容的写入都在这里
- **`index.md` + `log.md`** — 两个导航系统。每次写操作必须同步更新它们

## 四个主工作流

用户通过以下 slash commands 触发工作流。具体执行脚本在 `.claude/commands/<name>.md`：

| 命令 | 作用 | 对应 Karpathy 动词 |
|------|------|--------------------|
| `/ingest <path>` | 把 raw/ 下一篇资料吸收进 wiki | Ingest |
| `/query <question>` | 基于 wiki 回答问题，强制 Citations | Query |
| `/lint` | 全库体检：矛盾 / 孤儿页 / stale / gap | Lint |
| `/file-back` | 把最近一次对话沉淀为 wiki 页 | File Back |

## Frontmatter Schema（wiki/ 下每个页面必带）

```yaml
---
title: 页面标题
type: concept | entity | summary | decision | comparison | synthesis | project
aliases: []                    # 中文别名 / 同义词，供 index.md 做模糊映射
tags: [tag1, tag2]             # YAML flow list，逗号分隔，不带 #（Obsidian 自动加 #）
sources:                       # 追溯链：至少一条
  - raw/some-paper.pdf
  - "[[related-concept]]"
created: YYYY-MM-DD
last_updated: YYYY-MM-DD          # 内容任何实质更新都要刷这个
status: draft | stable | deprecated   # 内容成熟度（作者自评）
last_reviewed: YYYY-MM-DD | null      # 人类最后一次 review 这页的日期；null = 从未 review
---
```

**两个正交字段，分别回答两个不同问题**：

| 字段 | 回答的问题 | 谁填 | 取值 |
|------|-----------|------|------|
| `status` | 内容成熟度——这页靠不靠谱？能不能链？ | AI 或用户自评 | `draft` / `stable` / `deprecated` |
| `last_reviewed` | 人类最后一次 review 是什么时候？和 `last_updated` 对比即得 review 新鲜度 | 用户手动填（review 当天） | `YYYY-MM-DD` / `null` |

**为什么分开**：一页可以 content-stable 但 unreviewed（AI 刚写完，Harvard 源头靠谱，但你没看过）；也可以 content-draft 但 reviewed（用户写的粗笔记，自评不成熟但自己知道写的啥）。复用一个字段会强迫你**牺牲内容自评去换 review 信号**——不值。

**为什么 `last_reviewed` 用日期不用布尔**：
- 日期和 `last_updated` 直接可比——插件做一次字符串比较即得"review 之后有没有更新过"三态（从未 review / review 后有更新 / review 且 current）
- 即使插件没了，`grep 'last_reviewed:' wiki/` 还能告诉你每页最后 review 是哪天——file-over-app 更硬
- 未来想做 "超过 N 天未 review" 提醒时直接可用

**工作流约束**：

- AI 生成（`/ingest` / `/file-back`）新页 → `last_reviewed: null`（强制）；`status` 按 AI 自评
- 用户 review 完 → 改 `last_reviewed: <今天日期>`；`status` 用户按需调整。两种改法：(a) 打开页面按默认热键 `Cmd/Ctrl + Shift + R`（Review Dot 插件的 "Mark current file as reviewed" 命令，自动改 frontmatter，热键可在 Settings → Hotkeys 重绑）；(b) 直接手动编辑 frontmatter
- 增量更新已存在页（`/ingest` 追加内容）→ `last_updated` 刷为今天；**`last_reviewed` 保持原值**（review 过的 last_reviewed < 新 last_updated → 自动进入 stale 态 → 黄点提醒 re-review）
- 冲突 / 过时 → `status: deprecated`；`last_reviewed` 不变

**Obsidian 端呈现**：`.obsidian/plugins/review-dot/` 自研极简插件读 frontmatter `last_reviewed` vs `last_updated` 算出三态并写 `data-review` 属性，同时提供 "Mark current file as reviewed" 命令（默认热键 `Cmd/Ctrl + Shift + R`）一键把当前页的 `last_reviewed` 改为今天；`.obsidian/snippets/draft-indicator.css` 用 CSS 渲染点（fresh = 🔵 / stale = 🟡 / ok = 无）。不依赖 Supercharged Links 等重插件。

**tags 格式注意**：YAML flow list 语法 `[a, b, c]`，**不带 `#`**（`#` 在 YAML 里是注释符，会导致 `[` 不闭合，整个 frontmatter 被拒绝）。Obsidian 读 `tags:` 时自动加 `#` 前缀。

**`type: project` 额外字段**（现有 6 种 type 都是回顾性；project 是前瞻性，需要状态追踪）：

```yaml
---
type: project
status: active | paused | done        # project 的 status 值域；其他 type 仍用 draft/stable/deprecated
next_action: <一句话：下一步具体做什么>
deadline: YYYY-MM-DD                  # 可选
started: YYYY-MM-DD                   # 建立日
sources:
  - "[[journal-YYYY-MM-DD]]"          # 最初出现的 journal
---
```

## TODO / 笔记 升级规则

**两层架构**，不是三层：

- **Inline（默认 ~95%）**：所有 TODO / 笔记 / 想法 / 提问在 `raw/journal/YYYY-MM-DD.md` 里
- **升级到 `wiki/projects/`（~5%）**：仅当下述任一触发命中

### Metadata 原则

不用 Obsidian Tasks 的 emoji 语法（`📅` `⏫` `🛫`）——违反 File-over-App，grep-hostile。用 Dataview 风格 inline field：

```markdown
- [ ] 学 Hermes Agent [due:: 2026-04-25] [priority:: high]
```

三层 metadata 粒度：

- **日级**：journal frontmatter（`fetched_at` / `weather` / `focus`）
- **任务级**：`- [ ]` 那行的 inline field
- **项目级**：子页面 `wiki/projects/*.md` with `type: project`

**子页面不是 metadata 的必要条件**——90%+ 场景 inline field 够。

### 升级触发（满足任一即升级）

1. **Touch-count ≥ 3**：同一 TODO 出现在 3+ 个 journal 文件。`grep -l "xxx" raw/journal/*.md | wc -l ≥ 3` → 说明在手动滚动 = 真的重要
2. **语义升级**：变成 concept / decision / synthesis / comparison → 用对应 type，不是 project
3. **Rich metadata**：需要 status 历史 / sub-tasks / 链接网
4. **跨上下文复用**：多个 wiki 页要引用它

时间阈值（"超过 3 天"）对"快但老忘"的任务失效。touch-count 才是真信号。

### 升级动作

升级到 `wiki/projects/<slug>.md`：

1. 建新文件，frontmatter 用 `type: project` 模板（见上节 Frontmatter Schema）
2. 在各 journal 里把 inline TODO 换成 `[[<slug>]]` wikilink
3. index.md `## Projects` 分区加一行
4. log.md append `refactor | 升级 <slug> 到 project 页`

**无 slash command**——频率 <5 次/周，手动 Edit 够。频率上去了再讨论 `/promote`。

## 链接格式（完全 Obsidian 兼容）

- wiki 内部跨页：`[[page-name]]` 或 `[[page-name|显示文本]]`
- 跨子目录：`[[concepts/knowledge-compilation]]`
- 指向 raw：相对路径 `[原文](../raw/paper.pdf)`，**同时**写入 frontmatter `sources`
- 标签：`#tag1`；层级标签 `#concept/compilation`

## 文件命名

- 主名用 kebab-case 英文（保证 wikilink 唯一性），如 `knowledge-compilation.md`
- 中文 / 同义词放 `aliases: [知识编译, 知识即代码库]`
- index.md 通过 aliases 把模糊自然语言问题映射到具体页面

## `log.md` 格式（严格）

```markdown
## [YYYY-MM-DD] <verb> | <one-line-summary>
- 涉及页面: path1.md, path2.md
- 关键改动: <一句话>
- 后续动作: <可选>
```

`<verb>` ∈ `ingest | query | lint | file-back | init | refactor`。

`grep '^## \[2026-04' log.md` 能直接筛当月，这是设计约束，勿破坏。

## `index.md` 结构

六个固定分区：`## Entities` / `## Concepts` / `## Sources` / `## Events` / `## Decisions` / `## Projects`。每条：

```markdown
- [[page-name]] · 一句话摘要 · #tag1 #tag2
```

新建任何 wiki 页后，**必须**在 index.md 对应分区插入一行。

## 冲突处理

发现 wiki 内已有结论与新 source 冲突时：

1. **不覆盖**
2. 在相关页面插入 Obsidian callout：
   ```markdown
   > [!warning] Conflict
   > - 说法 A（来源 `[[summary-X]]`）：...
   > - 说法 B（来源 `[[summary-Y]]`）：...
   > status: 待验证
   ```
3. log.md `后续动作` 字段写 `待验证`
4. 下次 `/lint` 会重扫所有 `待验证`

## 拒绝幻觉（具体规则）

- raw/ 中没有的数据或结论 → **严禁编造**
- 必须推断时用 `[UNVERIFIED]` 前缀，或 `> [!question]` callout
- 每条关键结论必须能 grep 回到 frontmatter `sources:` 中的某条
- 若用户问题 wiki 覆盖不到：**先承认未覆盖**，再建议 `/ingest` 或 web search

## 连锁更新（Karpathy 的核心）

单个 source 的 `/ingest` 通常应触发 **10~15 个** wiki 节点变动（库存空时除外）。

执行 `/ingest` 时你必须：

1. 读 source 全文 + 与用户对齐 Takeaway
2. 用 Grep 扫 `wiki/**/*.md` 找所有可能相关的 entity / concept（按 takeaway 关键词）
3. 更新或新建若干节点（1 个 summary + 若干 entity + 若干 concept）
4. 若只产出 1 个 summary 而未触发其他页面更新，**视为未完成**。必须：
   - 要么发现更多连锁点补上
   - 要么显式解释为何本次无连锁（例如"库存空"、"完全新主题无可连锁节点"）

## 写操作仪式

- 写任何已存在的文件前：**先 Read 它**，避免覆盖
- 每次 `/ingest` `/query` `/lint` `/file-back` 结束时：**必须 append log.md**
- 跨多文件扫描：用 Explore subagent 并行（见 `.claude/commands/ingest.md` 脚本）
- 不要编造路径或 wikilink——写之前用 Glob 确认文件存在

## 日期

需要 `YYYY-MM-DD` 且不确定时，用 Bash `date +%Y-%m-%d` 取。

---

## Karpathy 四卖点（用以自检产出质量）

1. **Explicit**：纯文本可读可审计，拒绝黑盒
2. **Yours**：物理隔离在本地，无云端绑架
3. **File-over-App**：纯 Markdown，任何编辑器都能打开
4. **BYOAI**：模型可插拔，数据不迁移

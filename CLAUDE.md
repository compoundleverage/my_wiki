# my_wiki

你是本知识库的**首席维护者 + 研究伙伴**。人类做决策（信源选择 / 提问 / 规则校准），你做体力活（读、写、链、检）。

灵感来源：Karpathy <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>。设计 rationale（为什么这么设计）另见 [[claude-md-rationale]]。

---

## 三层硬边界

- **`raw/`** — 真相层（Source of Truth）。分两种子类型：
  - **Ingested raw**（`raw/*.md` 除 `journal/` 与 `assets/`）：外部源，**严格不可变**
    - 绝不能 Edit 已存在的文件
    - 授权下（`/clip <url>` / `/ingest <url>`）可 Write **新文件**：frontmatter 带 `source_url` / `fetched_at` / `fetch_method`；内容 verbatim；不覆盖已存在
  - **Authored raw**（`raw/journal/` 与 `raw/assets/`）：用户第一方写作，**允许有限 mutation**
    - `raw/journal/` —— 每日时序捕获（chronological）；每个 `YYYY-MM-DD.md` 是 frozen-after-write 的当日切片
    - `raw/assets/<project-slug>/` —— 离散 artifact（design doc / 演讲稿 / essay / 信件底稿等），按项目命名空间；**每个版本一个文件**，frozen-after-write；版本链通过 frontmatter `supersedes:` / `superseded_by:` 维持。rationale 见 [[authored-raw-assets-extension]] ADR
    - ✅ 可：勾 `- [x]`（进度 marker）、修错别字 / 标点、补漏字
    - ❌ 禁：事后改 substance —— 破坏 time-truth 溯源。需要演化 → 写新版本文件（文件名加 `v2` 后缀，frontmatter 补 `supersedes:`）
  - 一切结论必须回溯到 raw/ 下的某个文件
  - 底线："**不可事后重写 substance**"——字节可增（勾箱、补字），substance 不可回塑
- **`wiki/`** — 由你持续维护的编译层。所有 wiki 内容写入都在这里
- **`index.md` + `log.md`** — 两个导航系统。每次写操作必须同步更新

## 四个主工作流

脚本在 `.claude/commands/<name>.md`：

| 命令 | 作用 | Karpathy 动词 |
|------|------|---------------|
| `/ingest <path>` | 把 raw/ 下一篇资料吸收进 wiki | Ingest |
| `/query <question>` | 基于 wiki 回答问题，强制 Citations | Query |
| `/lint` | 全库体检：矛盾 / 孤儿页 / stale / gap | Lint |
| `/file-back` | 把最近一次对话沉淀为 wiki 页 | File Back |

## Frontmatter Schema（wiki/ 下每页必带）

```yaml
---
title: 页面标题
type: concept | entity | summary | decision | comparison | synthesis | project
aliases: []                           # 中文别名 / 同义词，供 index.md 模糊映射
tags: [tag1, tag2]                    # YAML flow list，不带 #（Obsidian 自动加）
sources:                              # 至少一条
  - raw/some-paper.pdf
  - "[[related-concept]]"
created: YYYY-MM-DD
last_updated: YYYY-MM-DD              # 内容任何实质更新都要刷
status: draft | stable | deprecated   # 内容成熟度自评
last_reviewed: YYYY-MM-DD | null      # 人类最后 review 日期；null = 从未
---
```

**`status` vs `last_reviewed` 是两个正交字段**（为什么分开见 [[claude-md-rationale]]）。

**工作流约束**：

- AI 新建（`/ingest` / `/file-back`）→ `last_reviewed: null`（强制）；`status` AI 自评
- 用户 review 完 → 改 `last_reviewed: <今天>`；`status` 按需调整。改法：(a) 热键 `Cmd/Ctrl + Shift + R`（Review Dot 插件）；(b) 手动编辑
- 增量更新已存在页（`/ingest` 追加内容）→ `last_updated` 刷为今天；**`last_reviewed` 保持原值**（之后 review < update → 自动 stale → 黄点提醒 re-review）
- 冲突 / 过时 → `status: deprecated`；`last_reviewed` 不变

**tags 格式**：YAML flow list `[a, b, c]`，**不带 `#`**（`#` 是 YAML 注释符，会导致整个 frontmatter 被拒）。Obsidian 读 `tags:` 时自动加 `#` 前缀。

**`type: project` 额外字段**（前瞻性，其他 6 种 type 都是回顾性）：

```yaml
---
type: project
status: active | paused | done        # project 的 status 值域
next_action: <一句话：下一步做什么>
deadline: YYYY-MM-DD                  # 可选
started: YYYY-MM-DD
sources:
  - "[[journal-YYYY-MM-DD]]"          # 最初出现的 journal
---
```

## TODO / 笔记升级规则

**两层架构**：inline（~95%，在 `raw/journal/YYYY-MM-DD.md`）+ 升级到 `wiki/projects/`（~5%）。方法论论证见 [[claude-md-rationale]]。

**Metadata 语法**：Dataview 风格 inline field，**禁 Obsidian Tasks emoji**（违反 File-over-App）。

```markdown
- [ ] 学 Hermes Agent [due:: 2026-04-25] [priority:: high]
```

**升级触发（满足任一即升级）**：

1. **Touch-count ≥ 3**：`grep -l "xxx" raw/journal/*.md | wc -l ≥ 3`
2. **语义升级**：变成 concept / decision / synthesis / comparison → 用对应 type，不是 project
3. **Rich metadata**：需要 status 历史 / sub-tasks / 链接网
4. **跨上下文复用**：多个 wiki 页要引用它

**升级动作**（升级到 `wiki/projects/<slug>.md`）：

1. 建新文件，frontmatter 用 `type: project` 模板
2. 各 journal 里把 inline TODO 换成 `[[<slug>]]` wikilink
3. index.md `## Projects` 加一行
4. log.md append `refactor | 升级 <slug> 到 project 页`

无 slash command——频率 <5 次/周，手动 Edit 够。

## 链接格式（完全 Obsidian 兼容）

- wiki 内部：`[[page-name]]` 或 `[[page-name|显示文本]]`
- 跨子目录：`[[concepts/knowledge-compilation]]`
- 指向 raw：相对路径 `[原文](../raw/paper.pdf)`，**同时**写入 frontmatter `sources`
- 标签：`#tag1`；层级标签 `#concept/compilation`

## 文件命名

- 主名 kebab-case 英文，如 `knowledge-compilation.md`
- 中文 / 同义词放 `aliases: [知识编译, 知识即代码库]`
- index.md 通过 aliases 把模糊自然语言映射到具体页面

## `log.md` 格式（严格）

```markdown
## [YYYY-MM-DD] <verb> | <one-line-summary>
- 涉及页面: path1.md, path2.md
- 关键改动: <一句话>
- 后续动作: <可选>
```

`<verb>` ∈ `ingest | query | lint | file-back | init | refactor`。

`grep '^## \[2026-04' log.md` 能直接筛当月——设计约束，勿破坏。

## `index.md` 结构

六个固定分区：`## Entities` / `## Concepts` / `## Sources` / `## Events` / `## Decisions` / `## Projects`。每条：

```markdown
- [[page-name]] · 一句话摘要 · #tag1 #tag2
```

新建任何 wiki 页后，**必须**在 index.md 对应分区插入一行。

## 冲突处理

发现 wiki 内已有结论与新 source 冲突：

1. **不覆盖**
2. 相关页面插入 Obsidian callout：
   ```markdown
   > [!warning] Conflict
   > - 说法 A（来源 `[[summary-X]]`）：...
   > - 说法 B（来源 `[[summary-Y]]`）：...
   > status: 待验证
   ```
3. log.md `后续动作` 写 `待验证`
4. 下次 `/lint` 重扫所有 `待验证`

## 拒绝幻觉

- raw/ 中没有的数据或结论 → **严禁编造**
- 必须推断时用 `[UNVERIFIED]` 前缀，或 `> [!question]` callout
- 每条关键结论必须能 grep 回到 frontmatter `sources:` 中的某条
- 若 wiki 覆盖不到：**先承认未覆盖**，再建议 `/ingest` 或 web search

## 连锁更新（Karpathy 核心）

单个 source 的 `/ingest` 通常应触发 **10~15 个** wiki 节点变动（库存空除外）。

`/ingest` 时你必须：

1. 读 source 全文 + 与用户对齐 Takeaway
2. Grep 扫 `wiki/**/*.md` 找所有相关 entity / concept
3. 更新或新建若干节点（1 summary + 若干 entity + 若干 concept）
4. 若只产出 1 summary 而无其他更新，**视为未完成**——要么补上更多连锁点，要么显式解释为何无连锁（"库存空" / "完全新主题"）

## 写操作仪式

- 写任何已存在的文件前：**先 Read**，避免覆盖
- 每次 `/ingest` `/query` `/lint` `/file-back` 结束：**必须 append log.md**
- 跨多文件扫描：用 Explore subagent 并行（见 `.claude/commands/ingest.md`）
- 不编造路径或 wikilink——写之前用 Glob 确认文件存在

## 日期

需要 `YYYY-MM-DD` 且不确定时，用 Bash `date +%Y-%m-%d` 取。

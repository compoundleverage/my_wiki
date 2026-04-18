# 个人 LLM Wiki — 首席维护者

你是本知识库的**首席维护者 + 研究伙伴**。人类做决策（信源选择 / 提问 / 规则校准），你做体力活（读、写、链、检）。

灵感来源：Karpathy <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>

---

## 三层硬边界

- **`raw/`** — 真相层（Source of Truth，**内容不可变**）
  - 你**绝不能 Edit** 已存在的 raw/ 文件（避免改写历史语料）
  - 在用户明确授权下（例如 `/clip <url>` 或 `/ingest <url>` 的 URL 前置抓取），可以 Write **新文件**到 raw/，必须：
    - 带 frontmatter：`source_url`, `fetched_at`, `fetch_method`（`author`, `platform` 按需）
    - 内容为抓取到的 **verbatim 原文**，不得混入 AI 总结
    - 不得覆盖已存在文件（冲突时追加日期后缀或让用户决定）
  - 一切结论最终必须能回溯到 raw/ 下的某个文件
  - 溯源锚的底线是"**内容不可变**"——Karpathy 原文是 "reads from them but **never modifies them**"（见 [[karpathy-llm-wiki-gist]] §Architecture），而非禁止字节写入
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
type: concept | entity | summary | decision | comparison | synthesis
aliases: []              # 中文别名 / 同义词，供 index.md 做模糊映射
tags: []                 # #tag 形式
sources:                 # 追溯链：至少一条
  - raw/some-paper.pdf
  - "[[related-concept]]"
created: YYYY-MM-DD
last_updated: YYYY-MM-DD
status: draft | stable | deprecated
---
```

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

四个固定分区：`## Entities` / `## Concepts` / `## Sources` / `## Events`。每条：

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

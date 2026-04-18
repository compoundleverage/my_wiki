---
title: Knowledge Compilation
type: concept
aliases: [知识编译, 知识即代码库, compile once, obsidian as ide]
tags: [llm-architecture, knowledge-base, core]
sources:
  - "[[karpathy-llm-wiki-gist]]"
  - ../../raw/karpathy-llm-wiki-gist.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Knowledge Compilation

## 定义

**把对话 / 资料 / 思考"一次性编译"成可复用、可版本控制的持久化知识制品**。对立面是"知识随对话生灭"的聊天模式。

核心比喻（Karpathy 原话，全文最响）：
> **"Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."**

此比喻把知识库运营**彻底工程化**：
- Obsidian / IDE：可编辑、可浏览、可跳转的 UI
- LLM / Programmer："写代码"（wiki 页面）的主体
- Wiki / Codebase：可 diff、可 git、可审计的一整套 markdown 树

## 工程化特征（对应"代码库"的各种工程属性）

| 代码库属性 | Wiki 类比 |
|-----------|-----------|
| Schema / 编码规范 | `CLAUDE.md`（本项目）/ `AGENTS.md`（Codex） |
| 编译（ingest）| [[/ingest]]：读源文 → 更新 10~15 个文件 |
| 运行时（query）| [[/query]]：基于已编译 wiki 回答 |
| 静态检查（lint）| [[/lint]]：跨页矛盾 / 孤儿页 / stale |
| Git history | `log.md` + 仓库本身的 commit 序列 |
| 导入依赖 | raw/ 溯源链 + `sources:` frontmatter |

此对应关系来自 [[garry-tan|Tan]] 的 [[thin-harness-fat-skills]] 类比扩展；两者共享"knowledge-as-codebase"的根隐喻。

## 为什么成立

Karpathy 的论证两步走：

1. **知识库的真正瓶颈是 bookkeeping**，不是阅读 / 思考本身。人类放弃个人 wiki 因为维护成本增长得比价值快
2. **LLM 消除了 bookkeeping 成本**：不会 bored，不会忘更新 cross-reference，一遍能 touch 15 个文件

所以能编译，就不该每次 query 现场重拼——这正是 [[persistent-wiki-vs-rag]] 的依据。

## 与 RAG 的范式级差异

| 观念 | RAG | Knowledge Compilation |
|------|-----|-----------------------|
| 知识位置 | 向量空间（黑盒） | Markdown 文件（显式） |
| 查询时 | 相似度检索 + 现场拼装 | 读 index → 结构下钻 → 综合 |
| 积累 | 无 | 每次 ingest / query 都让库更厚 |
| 审计 | ✗ | ✓ grep / git blame 都可用 |

## 边界与反例

**不是**：
- 不是"所有知识都要编译"——短期一次性资料（比如某次调研）不值得建 wiki（见 Karpathy §Tips 反面用例 + [[persistent-wiki-vs-rag]] 边界节）
- 不是"聊天是错的"——聊天是 REPL，快速试错有用；关键在于**高质量结果要 file back** 到 codebase 中，不要让它消散

**反例（违反编译精神）**：
- 同一个问题反复问 LLM 却没 /file-back → 每次都"重新编译"，违反"compile once"
- Wiki 里堆摘要但没 cross-reference → 是"文件列表"，不是 codebase

## 相关概念

- [[persistent-wiki-vs-rag]]：wiki 侧的直接论证
- [[diarization]]：编译的最小单元（单次 source → 单页档案）
- [[skill-as-permanent-upgrade]]：编译原则在 skill 层的投影（Tan 的版本）
- [[resolver-context-routing]]：编译产物的导航机制

## 历史继承

"Wiki = codebase" 这个想法可以追溯到 Vannevar Bush 的 [[vannevar-bush|Memex]] (1945)——个人策展的知识 + 文档间"关联轨迹"（associative trails）。[[memex-to-llm-wiki|Memex → LLM Wiki 的历史线]]有专页讨论。

## 参考来源

- [[karpathy-llm-wiki-gist]]
- 原文 `raw/karpathy-llm-wiki-gist.md` §"The core idea" + §"Why this works"

## Backlinks

- [[obsidian-as-ide-redirect]] — 2026-04-18 决策：obsidian-as-ide 比喻归入本页，不单建

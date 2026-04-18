---
title: Andrej Karpathy — "LLM Wiki" Gist
type: summary
aliases: [Karpathy LLM Wiki 原 gist, LLM Wiki pattern]
tags: [llm-architecture, knowledge-base, foundational]
sources:
  - ../../raw/karpathy-llm-wiki-gist.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Karpathy — "LLM Wiki" Gist 摘要

本 wiki 项目的**灵感源文件**。之前是通过二手中文解读图间接参考，本次终于直接 ingest 原文。

Karpathy 原 URL：<https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>

## 核心论点（≤ 3 条）

1. **Persistent wiki is a compounding artifact, not RAG**。RAG 每次 query 现场重拼；wiki 是一次编译 + 持续维护。原话："the wiki is a persistent, compounding artifact"（见 [[persistent-wiki-vs-rag]]）
2. **三层 + 三操作是全部架构**：raw sources (immutable) / wiki (LLM-generated) / schema。Ingest (1→10~15 页) / Query (带 citations + optional file back) / Lint。File back 是 Query 的子动作，我们项目把它提成第 4 动作 — 显式化，不算违反
3. **LLM 解决了 wiki 的维护问题**：bookkeeping 才是知识库真正瓶颈（不是读 / 想）。Karpathy 引 Vannevar Bush 的 Memex (1945) — Bush 的愿景更接近 LLM wiki 而非 Web；他解不了"谁维护"，LLM 解决了

## 关键证据 & 原文引用

- **核心比喻（整篇最响）**："[[knowledge-compilation|Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase]]"（该比喻的详细 role 映射见 [[knowledge-compilation]]）
- **10~15 连锁**："A single source might touch 10-15 wiki pages"（§Operations / Ingest）
- **log.md 可 grep 格式**：原文给的模板就是 `## [2026-04-02] ingest | Article Title`——我们项目严格匹配（见 [log.md](../../log.md)）
- **raw/ 的真正约束**："These are immutable — **the LLM reads from them but never modifies them**"（§Architecture / Raw sources）—— **注意："never modifies" 不是 "never writes"**。这是 [[memex-to-llm-wiki|本次 ingest 的决定性发现]] 之一
- **Obsidian Web Clipper 的官方推荐**：§Tips 第 1 条明推——印证 AI-assisted 写入 raw/ 是 Karpathy 原意内的

## 与 wiki 已有结论的联系（heavy 更新）

本次 ingest 是**主 update 为主**的 ingest，因为 wiki 从一开始就是按 Karpathy 思路（经二手解读图）搭的。直接源的到来带来 4 个连锁更新：

- [[thin-harness-fat-skills]]（[[garry-tan]] 的三层）：与 Karpathy 三层是**兄弟架构**——关注点不同（skills vs wiki knowledge），结构同形
- [[diarization]]：Karpathy 所说的"summaries that compound across sources"就是**全局化的 diarization**——不是单次动作，是整个 wiki 的 aggregate
- [[skill-as-permanent-upgrade]]：Karpathy 原话 "persistent, compounding artifact"——此概念的**前身**
- [[resolver-context-routing]]：Karpathy 原案里的 `index.md` 就是 explicit resolver：LLM 先读 index 找相关页，再下钻。[[garry-tan|Tan]] 的 skill description 是对这种模式的 ACL 级泛化

## 自指观察：本 wiki 是 Karpathy 原案的严格实例

对照检查——

| Karpathy 原案 | 本 wiki 实例 | 一致性 |
|------|--------|------|
| 三层（raw / wiki / schema） | raw/ + wiki/ + CLAUDE.md | ✅ |
| 三操作（Ingest / Query / Lint） | /ingest + /query + /lint | ✅ |
| File back 在 Query 之下 | 独立 /file-back 命令 | ⚠ 显式化 |
| `## [YYYY-MM-DD] ingest \| Title` | 严格匹配 | ✅ |
| "LLM reads raw but never modifies" | CLAUDE.md 写"绝不能 Write/Edit" | ⚠ **比原意严**（Gap-2 根源） |
| Obsidian Web Clipper 推荐 | 本次 ingest 通过新 [[/clip]] 实现 | ✅（现在对齐了） |

Gap-2 决议的**决定性证据**：Karpathy 原话是 "never modifies"，我们写成 "never writes"——把一个关于**内容完整性**的规则错译成**物理写入权限**。本次 ingest 后应松绑至与原意一致。

## [UNVERIFIED] 或待验证

- Karpathy 本人未直接回应 [[garry-tan|Tan]] 的 "Thin Harness, Fat Skills"——两者独立到达相似结构，但无交叉引用
- qmd 的 MCP server 实际稳定度 [UNVERIFIED]——只有 Karpathy 的推荐
- Tolkien Gateway 的 1000s pages 估计 [UNVERIFIED]——Karpathy 原话的数量描述

## 来源

- `raw/karpathy-llm-wiki-gist.md`（verbatim，fetched 2026-04-18 via curl raw URL）

## Backlinks

- [[obsidian-as-ide-redirect]] — 2026-04-18 决策：本页引用的 Karpathy "obsidian as IDE" 比喻最终归入 [[knowledge-compilation]]

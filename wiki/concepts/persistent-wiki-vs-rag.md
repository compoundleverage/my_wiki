---
title: Persistent Wiki vs RAG
type: concept
aliases: [持久化 wiki 对比 RAG, compounding artifact, 主动消化 vs 被动索引]
tags: [llm-architecture, knowledge-base, core]
sources:
  - "[[karpathy-llm-wiki-gist]]"
  - ../../raw/karpathy-llm-wiki-gist.md
  - "[[journal-2026-04-18]]"
  - ../../raw/journal/2026-04-18.md
created: 2026-04-18
last_updated: 2026-04-19
status: stable
---

# Persistent Wiki vs RAG

## 定义

[[andrej-karpathy]] 在原 gist 中提出的**范式对比**：传统 RAG 是每次 query 现场重拼碎片；**LLM wiki 是一次编译成网状结构后持续维护**。

Karpathy 的核心宣言："**The wiki is a persistent, compounding artifact.** The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read."

## 关键对比

| 维度 | 传统 RAG | Persistent Wiki |
|------|----------|-----------------|
| 数据形态 | 文档向量化后散装 chunks | Markdown 文件网 + 双向链接 |
| 查询时动作 | Embedding 相似度召回 + 现场拼装 | 读 index.md → 下钻 3-8 页 → 综合 |
| 知识积累 | 无——每次 query 都从零重算 | 复利——每次 ingest / query 都让 wiki 更厚 |
| 矛盾检测 | 无，依赖模型临场判断 | 显式 `> [!warning] Conflict` callout |
| 跨文档推理 | 靠"当次检索是否正好覆盖全部关键信息"（赌） | 结构下钻，可追溯 |
| 审计性 | 向量 opaque | Markdown 可读可 diff |
| 规模瓶颈 | Embedding 空间维度 | 无理论上限；Karpathy 实测 ~100 sources / ~数百页仍用 index.md 即可 |

## 为什么 wiki 赢

Karpathy 的核心论证：**"Nothing is built up"**（RAG 侧）vs **"Knowledge is compiled once and then kept current, not re-derived on every query"**（wiki 侧）。

- RAG 让 LLM 每次都在"重新发现"知识——subtle 的综合类问题（需要拼 5 篇文档）每次都从零找片段
- Wiki 把综合 **一次性固化下来**——cross-reference 已建，contradictions 已标，synthesis 已写
- 下次 query 只需**读已有的 synthesis**，而非重现它

## 扩张性 Open Question

> [!question] 来自用户 2026-04-18 日记（见 [[journal-2026-04-18]] §问题）
> 1. 随着 wiki 体量变大，是否 RAG 做 Query 更好？
> 2. 目前这么小体量，感觉 [[notebooklm|NotebookLM]] 处理数据快很多，之后会不会越来越慢？

**这不是与本页结论的冲突，是对其边界的合理压力测试**——Karpathy 论证的是"长期积累 + 反复深化"场景下 wiki 必赢；用户观察的是"小 / 新体量时 RAG 体感更快"。两者不矛盾，前者讲**长期积累极限**，后者讲**冷启动体感**。

### 本页已有的理论回应

- Karpathy 实测 ~100 sources / ~数百页用 index.md 即可——见 [关键对比 § 规模瓶颈](#关键对比)
- 超百万页时仍需 BM25+vector 辅助（[[qmd]]）；**但底层仍是结构化 wiki，不是 flat chunk**——见 [边界与反例](#边界与反例)

### 实证缺口（待补）

- [UNVERIFIED] [[my-wiki]] 当前体量（~30 wiki pages）下 /query 的真实响应时间
- [UNVERIFIED] [[notebooklm|NotebookLM]] 小 vs 大文档集的响应曲线
- [UNVERIFIED] 本 wiki 增长到多少 sources 时应引入 BM25+vector 辅助层

### 后续动作

待 [[my-wiki]] 体量增长后做实测对比，回填本节。

## 与 [[diarization]] 的关系

Diarization 是**单次**的"读全集写一页档案"动作。Persistent wiki 是 diarization 的**全局化 + 累积版**：
- 每个 wiki 页都是一次 diarization 的产物
- 整个 wiki 网 = 所有 diarization 的互联
- [[/file-back]] 是 query 结果的二次 diarization 固化

## 与 [[knowledge-compilation]] 的关系

Wiki 是 knowledge-compilation 范式的**产物形态**。[[knowledge-compilation|Obsidian 是 IDE、LLM 是 programmer、wiki 是 codebase]]：
- RAG 是"每次重新解释这段代码"
- Wiki 是"这段代码已经编译完，直接跑编译产物"

## 边界与反例

**不是**：
- 不是"RAG 完全没用"——对海量无组织资料做一次性查询，RAG 可行。但"长期积累 + 反复深化"的场景必败
- 不是"wiki 永远替代 RAG"——当 wiki 规模超百万页时，仍需 BM25+vector 搜索辅助（[[qmd]] 就是这个定位）。但底层仍是结构化 wiki，不是 flat chunk

**反例**：
- 用 RAG 管理个人 5 年的学习笔记 → 每次 query 都"从零重拼"，积累效应丧失
- 用 wiki 做 1000 万份合同的一次性检索 → 没有长期价值，wiki 建设成本不划算

## 相关概念

- [[knowledge-compilation]]：wiki 背后的"编译"隐喻
- [[diarization]]：wiki 每页都是一次 diarization
- [[resolver-context-routing]]：wiki 的 index.md 是原生 resolver（Karpathy 直说）
- [[skill-as-permanent-upgrade]]：[[garry-tan|Tan]] 把"compounding artifact"概念推到 skill 层
- [[compound-interest-tool]]：compound 隐喻被进一步下推到**个人每日实践层**的同构（用户 2026-04-18 日记的核心原则）

## 参考来源

- [[karpathy-llm-wiki-gist]] §"The core idea"
- 原文 `raw/karpathy-llm-wiki-gist.md` line 9-15

## Backlinks

- [[obsidian-as-ide-redirect]] — 2026-04-18 决策：本页内的"obsidian as IDE"比喻重定向到 [[knowledge-compilation]]

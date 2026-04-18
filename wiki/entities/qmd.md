---
title: qmd
type: entity
aliases: [qmd search, tobi qmd]
tags: [tool, search-engine, local, markdown]
sources:
  - "[[karpathy-llm-wiki-gist]]"
  - ../../raw/karpathy-llm-wiki-gist.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# qmd

## 身份

本地 markdown 搜索引擎。作者：tobi（[UNVERIFIED] 是 Shopify CEO Tobias Lütke 还是同名他人，gist 未明说）。

GitHub：<https://github.com/tobi/qmd>

被 [[andrej-karpathy]] 在 LLM Wiki gist §"Optional: CLI tools" 明确推荐为**可选的 wiki 搜索层**。

## 技术特征（从 Karpathy 描述推导）

- **Hybrid BM25 + 向量搜索**：混合词频 + 语义
- **LLM re-ranking**：搜索结果再让 LLM 重排
- **All on-device**：完全本地，无云
- **Dual interface**：
  - CLI（LLM 可 shell out）
  - MCP server（LLM 作原生 tool 调用）

## 在本 wiki 的定位

**未集成**。Karpathy 建议在 wiki 规模**变大以后**接入：

- 小规模（~百个页面）：`index.md` 作为导航已够
- 中大规模：index.md 当催化剂，qmd 做 fuzzy fulltext 检索
- 本项目当前 22 页 → 远未到需要 qmd 的规模

若未来 ingest 量到每周若干篇 + 总量 100+ 页，应把 qmd 集成计划提上日程，做成一个新的 skill：`/search <query>`（对应 [[purpose-built-tooling]] 原则——thin + narrow）。

## 与 [[resolver-context-routing]] 的关系

qmd 是 resolver 的**语义层扩展**：
- index.md resolver：按分类 / 文件名精确定位
- qmd resolver：按内容语义模糊召回
- 两者组合：精确 + 模糊的双路
- 这正是 Karpathy 原案 + [[garry-tan|Tan]] resolver 概念的自然融合

## [UNVERIFIED] 待核实

- tobi 的具体身份（Shopify CEO 还是他人）
- qmd 的 MCP server 实际稳定度
- 是否有 ranking quality benchmark

这些都需要直接 ingest qmd 的 README 或相关基准测试才能确认。

## 相关页面

- [[andrej-karpathy]]：推荐者
- [[karpathy-llm-wiki-gist]]：推荐出处
- [[resolver-context-routing]]：qmd 是 resolver 的延伸

## 来源

- `raw/karpathy-llm-wiki-gist.md` §"Optional: CLI tools"

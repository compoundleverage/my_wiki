---
title: Tolkien Gateway
type: entity
aliases: [tolkien 百科, tolkiengateway]
tags: [example, fan-wiki, reference]
sources:
  - "[[karpathy-llm-wiki-gist]]"
  - ../../raw/karpathy-llm-wiki-gist.md
created: 2026-04-18
last_updated: 2026-04-18
status: draft
---

# Tolkien Gateway

## 身份

托尔金宇宙的社区维护百科：<https://tolkiengateway.net/wiki/Main_Page>

被 [[andrej-karpathy]] 在 gist §"The core idea" 当作**手工 fan wiki 的标杆**：

> "Think of fan wikis like Tolkien Gateway — thousands of interlinked pages covering characters, places, events, languages, built by a community of volunteers over years. You could build something like that **personally as you read**, with the LLM doing all the cross-referencing and maintenance."

## 作为本 wiki 的参照标准

Tolkien Gateway 演示了 wiki 范式的**最终形态**：
- 规模上千页
- 双向链接密织
- 角色 / 地点 / 事件 / 语言等实体类型完整
- 靠社区志愿者长年维护

Karpathy 的洞察：**LLM 让个人也能建出类似规模的 wiki**——不需要社区，只需 LLM 做 cross-reference + 维护。

## 设计启发

本 wiki 未来若规模成长，可借鉴：
- 实体类型丰富（不止人 / 组织；可加"地点"、"事件"、"语言/术语表"）
- 每个实体页有稳定的 section 模板（Tolkien Gateway 角色页都有 "Biography" / "Characteristics" / "Etymology" 等）
- Graph view 上的枢纽节点通常是"中央实体"（索伦 / 中土 / ...）

## [UNVERIFIED] 数字

- Karpathy 说 "thousands of interlinked pages"——未核实具体规模
- 维护者数量 / 活跃度 [UNVERIFIED]
- 是否用 MediaWiki / Obsidian / 其他 [UNVERIFIED]

## 相关页面

- [[andrej-karpathy]]：引用者
- [[karpathy-llm-wiki-gist]]：引用出处
- [[persistent-wiki-vs-rag]]：Tolkien Gateway 是 persistent wiki 的人肉实现

## 来源

- `raw/karpathy-llm-wiki-gist.md` §"The core idea" 的应用列表

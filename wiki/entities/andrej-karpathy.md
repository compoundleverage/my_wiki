---
title: Andrej Karpathy
type: entity
aliases: [karpathy, 安德烈·卡尔帕西]
tags: [researcher, author, ai]
sources:
  - "[[karpathy-llm-wiki-gist]]"
  - ../../raw/karpathy-llm-wiki-gist.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Andrej Karpathy

## 身份

AI 研究者；OpenAI 早期员工、Tesla Autopilot 前负责人（[UNVERIFIED] 具体任职时段未在本次 raw/ 中，留待日后 ingest 其他材料确认）。**本 wiki 项目的灵感源**。

## 本 wiki 的核心贡献

**原 gist**：<https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>（本次 ingest 的 source，见 [[karpathy-llm-wiki-gist]]）

Gist 提出的 "LLM Wiki" 范式 = 本项目的全部蓝图：

- 三层架构（raw / wiki / schema）
- 三操作（Ingest / Query / Lint）+ File back 作为 Query 的 optional 延伸
- 10~15 连锁更新
- `index.md` + `log.md` 两导航
- "Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase" 比喻
- 推崇 Obsidian Web Clipper、qmd、Marp 工具链

## 影响 / 溯源网络

本 wiki 已 ingest 的其他材料与 Karpathy 的隐性关系：

- [[forrestchang]] 的 [[karpathy-skills-claude-md|CLAUDE.md 行为准则]]：repo 名 "andrej-karpathy-skills" 直接致敬（但未在 repo 内直接引用 Karpathy 本人言论——[UNVERIFIED] 是否是 skill bundle）
- [[garry-tan]] 的 [[garry-tan-thin-harness-fat-skills|"Thin Harness, Fat Skills"]]：独立到达相似的三层架构（skills / harness / app），但未引用 Karpathy gist。**两位独立从不同角度到达同一范式**

## 关键引用（从 gist 中）

> **"Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."**

> "The human's job is to curate sources, direct the analysis, ask good questions, and think about what it all means. The LLM's job is everything else."

> "The idea is related in spirit to Vannevar Bush's Memex (1945) ... The part he couldn't solve was who does the maintenance. The LLM handles that."

> "These are immutable — the LLM reads from them but never modifies them." （raw sources 的精确定义——**never modifies**，不是 never writes）

## [UNVERIFIED] / 待扩展

- Karpathy 是否对 [[garry-tan]] 的推文公开回应过？无记录。
- 本 wiki 项目被用户搭建时借用了中文二手解读图，Karpathy 本人是否知情 [UNVERIFIED]。
- Karpathy 其他 AI 教育内容（"Neural Networks: Zero to Hero" 等）本次未 ingest。

## 相关页面

- [[karpathy-llm-wiki-gist]]：唯一已 ingest 的直接原文
- [[vannevar-bush]]：Karpathy 明确致敬的前辈
- [[knowledge-compilation]] / [[persistent-wiki-vs-rag]]：Karpathy 原案的两大核心概念
- [[memex-to-llm-wiki]]：Bush → Karpathy 的历史线

## 来源

- `raw/karpathy-llm-wiki-gist.md`

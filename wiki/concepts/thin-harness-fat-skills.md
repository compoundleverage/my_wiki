---
title: Thin Harness, Fat Skills
type: concept
aliases: [薄骨架肥技能, thin harness fat skills 架构]
tags: [llm-architecture, agent-design, core]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Thin Harness, Fat Skills

## 定义

[[garry-tan]] 2026 年提出的 LLM agent 系统架构主张：**把"程序骨架"做薄，把"能力单元"（skills）做肥**。核心命题是 2x 开发者和 100x 开发者用的是**同一个模型**，差距不在智能而在架构。

三层结构：

```
┌──────────────────────────────────────┐
│  Fat Skills（90% 价值）              │  markdown 程序：判断/流程/领域知识
├──────────────────────────────────────┤
│  Thin Harness（~200 行）             │  loop / IO / context / safety
├──────────────────────────────────────┤
│  Application（deterministic）        │  QueryDB / ReadDoc / Search 等
└──────────────────────────────────────┘
```

**方向性原则**：push intelligence 往上（进 skills），push execution 往下（进 deterministic 工具）。模型一变强，skills 自动变强；deterministic 层永远可靠。

## 边界与反例

**不是**：
- 不是"要特别复杂的 skills"——skills 里装的是**判断力**，不是堆代码
- 不是"禁止造工具"——但每个工具要 thin + fast + narrow，不是 40+ god-tools

**反例（Tan 原文列出的反模式）**：
- 40+ tool definitions 吞掉半个 context window → [[context-bloat]]
- MCP god-tool 单次 round-trip 2~5 秒（vs Playwright CLI 100ms，75x 慢）
- REST API wrapper 把每个 endpoint 做成一个 tool

## 为什么成立

Tan 的论据：2026-03-31 [[anthropic]] 把 [[claude-code]] 512k 行源码意外泄漏到 npm。他读完后说"**证实了我在 YC 教的**"——秘密不在模型，在 wrapper。

关键引用："The difference isn't intelligence. It's architecture — and it fits on an index card."

## 相关概念

- [[harness]]：骨架的具体 4 项职责
- [[skill-as-method-call]]：skills 是带参数的方法调用
- [[resolver-context-routing]]：context 装载的路由表
- [[latent-vs-deterministic]]：分清什么放哪层
- [[diarization]]：典型 skill 动作
- [[skill-as-permanent-upgrade]]：为什么架构优于 rewriting
- [[simplicity-first]]：本概念在架构层的应用（forrestchang 同源）
- [[purpose-built-tooling]]：harness 下面的工具应怎么造

## 与 Karpathy 三层架构的关系（sibling framing）

[[andrej-karpathy]] 2026 年原 gist 提出的三层是：**raw sources / wiki / schema**（见 [[karpathy-llm-wiki-gist]]）。Tan 的三层是 **deterministic app / harness / skills**。两者**不是同一个轴的分层**，但是**同构的三层工程结构**：

| 层 | Karpathy | Tan |
|----|----------|-----|
| 底 | raw sources（数据） | deterministic app（工具） |
| 中 | wiki（知识产物） | harness（运行时） |
| 顶 | schema / CLAUDE.md（规则） | skills（判断） |

两者关注点不同——Karpathy 管"**知识层如何生长**"，Tan 管"**运行时如何执行**"。但两者都推崇"**thin middle + fat top**"：中间保持极简，复杂度往顶层推。Karpathy 的 CLAUDE.md 是 Tan 的 fat skills 的**特例**（wiki 专用的 skill bundle）。

两套思想**独立到达相似结构**——交集就是本 wiki。

## 自指观察

本 wiki 项目自身就是这个架构的实例：
- [CLAUDE.md](../../CLAUDE.md) ≈ thin harness（~150 行规则）
- [.claude/commands/*.md](../../.claude/commands/) ≈ fat skills（每个 ~50-100 行流程）
- `raw/` + `wiki/` ≈ deterministic 数据层

## 参考来源

- [[garry-tan-thin-harness-fat-skills]]
- 原文 `raw/garry-tan-thin-harness-fat-skills.md`

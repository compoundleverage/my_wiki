---
title: Anthropic Claude Code Source Leak (2026-03-31)
type: synthesis
aliases: [claude code 源码泄漏, 2026 npm 泄漏]
tags: [event, anthropic, claude-code, llm-architecture]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Anthropic Claude Code Source Leak (2026-03-31)

## 事件摘要

2026 年 3 月 31 日，[[anthropic]] 意外把整个 [[claude-code]] 的源代码（**512,000 行**）发布到 npm registry。

## 已知来源

唯一信息源是 [[garry-tan]] 在 [[garry-tan-thin-harness-fat-skills|"Thin Harness, Fat Skills"]] 推文中的**一段独白**：

> "On March 31, 2026, Anthropic accidentally shipped the entire source code for Claude Code to the npm registry. 512,000 lines. I read it. It confirmed everything I'd been teaching at YC: the secret isn't the model. It's the thing wrapping the model."

**事件详情（谁先发现、npm 上挂了多久、是否撤包、有无官方事后声明）均 [UNVERIFIED]**。Tan 没写，raw/ 也没有其他材料。若关键决策依赖本事件，需要另行 ingest 技术媒体报道。

## Tan 从源码中读出的架构要点

他把**意外证实**列为推文的论据之一。列举（对应本 wiki 节点）：

- Live repo context
- Prompt caching
- Purpose-built tools → [[purpose-built-tooling]]
- Context bloat minimization → [[context-bloat]]
- Structured session memory
- Parallel sub-agents

这些都是 [[harness]] 该做的"thin"动作，不提升模型智能，只优化"正确 context 在正确时间"。

## 为什么事件对本 wiki 重要

它是 [[thin-harness-fat-skills]] 论点的**经验证据**。没有这次泄漏，Tan 的架构主张仍只是 YC 内部经验；读完 Claude Code 源码让他能公开说："**它证实了我的假设**"。

## 争议 / 未解

- Anthropic 是否撤包？[UNVERIFIED]
- 源码是否被他人完整克隆留存？[UNVERIFIED]
- 事件对 Anthropic 业务影响？[UNVERIFIED]

## 相关页面

- [[anthropic]]：事件主体
- [[claude-code]]：被泄漏的产品
- [[garry-tan]]：唯一已知的"读过源码"的外部人
- [[thin-harness-fat-skills]]：被源码证实的架构假设

## 来源资料

- `raw/garry-tan-thin-harness-fat-skills.md` §"The harness is the product"

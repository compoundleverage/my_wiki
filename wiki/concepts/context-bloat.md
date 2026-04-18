---
title: Context Bloat
type: concept
aliases: [上下文肿胀, context 膨胀, tool bloat]
tags: [llm-architecture, anti-pattern]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Context Bloat

## 定义

**Harness 或 skills 塞进过多信息**，导致 LLM context window 被噪音占据，attention 退化。[[garry-tan]] 列为"fat harness + thin skills"反模式的核心症状。

三倍代价：**3x tokens, 3x latency, 3x failure rate**。

## 症状清单（Tan 原文）

- **40+ tool definitions** 吞掉半个 context window
- **God-tools** 做 screenshot-find-click-wait-read 一条龙，单次 2~5 秒 MCP round-trip
- **REST API wrapper**：把每个 endpoint 做成独立 tool
- **巨型 CLAUDE.md**：Tan 曾经写到 20,000 行（每一个 quirk / pattern / lesson 都塞进去）

## 为什么致命

LLM 的注意力是**稀缺资源**。context 越长，模型越倾向于：
- 忽略深处信息（lost in the middle）
- 被无关细节带偏
- 延迟增加（每次调用都要重读巨大 prompt）
- Prompt caching 命中率下降

Tan 的原话："Claude Code literally told me to cut it back." 模型本身都在抗议。

## 解药

- **Resolvers** ([[resolver-context-routing]])：把 20k 行 → 200 行指针，按需加载
- **Purpose-built tooling** ([[purpose-built-tooling]])：每个工具 thin + fast + narrow
- **Thin harness** ([[harness]])：只做 4 件事，别加第 5 件

## 相关概念

- [[thin-harness-fat-skills]]：主架构，context bloat 是违背它的典型
- [[resolver-context-routing]]：对治 bloat 的关键机制
- [[purpose-built-tooling]]：工具层的 bloat 解法
- [[simplicity-first]]：代码层的同源原则

## 本项目的防御

我们的 [CLAUDE.md](../../CLAUDE.md) 目前 ~150 行；[index.md](../../index.md) 是按需路由的入口。这是主动避免 bloat 的设计。
若未来 CLAUDE.md 膨胀过 300 行，应按 Tan 的教训拆：把细节移到 `.claude/commands/*.md` 或 `wiki/` 下对应页面，CLAUDE.md 只保留指针。

## 参考来源

- [[garry-tan-thin-harness-fat-skills]]
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "The harness" + "Resolvers" §§

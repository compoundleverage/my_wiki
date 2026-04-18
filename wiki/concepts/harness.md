---
title: Harness
type: concept
aliases: [骨架, LLM harness, agent harness]
tags: [llm-architecture, agent-design]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Harness

## 定义

**运行 LLM 的程序**。在 [[garry-tan]] 的 [[thin-harness-fat-skills]] 架构中，harness 只做 **4 件事**：

1. **Run the model in a loop** — LLM 反复调用
2. **Read and write your files** — 文件 IO
3. **Manage context** — 上下文窗口管理
4. **Enforce safety** — 权限/越界拦截

"That's it. That's the 'thin.'"

参考尺寸：约 **200 行代码**。JSON in, text out. Read-only by default。

## 为什么要薄

Tan 的核心论据：**harness 本身不提升智能**；它只是给模型"正确的 context、正确的时机、不被噪音淹没"。
任何塞进 harness 的"聪明"都会抢占 skills 和 model 本该承担的判断空间，降低整体表现。

具体反模式见 [[context-bloat]]——40+ tools 吞掉半个 context window 就是 harness 越权的典型。

## 2026-03-31 的经验证据

Tan 说他读了 [[anthropic]] [意外泄漏的 Claude Code 源码](../syntheses/anthropic-claude-code-source-leak-2026-03-31.md)（512k 行），**证实**了他的假设：秘密不在模型，在 harness。

关键机制（都是 harness 该做的 thin 动作）：
- Live repo context
- Prompt caching
- Purpose-built tools ([[purpose-built-tooling]])
- Context bloat minimization
- Structured session memory
- Parallel sub-agents

## 边界与反例

**不是**：
- 不是"无脑转发 tool call"——safety、context 压缩、loop 终止条件都是真活
- 不是"越简越好"——4 项核心职责缺一不可，只是不要塞第 5 件

**反例**：
- 把路由/判断逻辑写进 harness 代码（应提到 skills）
- 用 harness 做数据查询（应下沉到 deterministic 应用层）

## 相关概念

- [[thin-harness-fat-skills]]：主架构
- [[skill-as-method-call]]：harness 承载的单元
- [[context-bloat]]：harness 失败的典型症状
- [[purpose-built-tooling]]：harness 下面的工具层

## 参考来源

- [[garry-tan-thin-harness-fat-skills]] §2
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "The harness"

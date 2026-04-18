---
title: Think Before Coding
type: concept
aliases: [编码前思考, 先想后写]
tags: [llm-behavior, process]
sources:
  - "[[karpathy-skills-claude-md]]"
  - ../../raw/karpathy-skills-CLAUDE.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Think Before Coding

## 定义

在写任何实现代码前，显式处理"假设、歧义、替代、困惑"四类前置问题。核心口号：**Don't assume. Don't hide confusion. Surface tradeoffs.**

四条操作守则：

1. **State your assumptions explicitly** — 假设必须写出来；不确定就问
2. **Present multiple interpretations** — 歧义必须列举，不能静默挑一个
3. **Push back when a simpler approach exists** — 看到更简方案要主动提，不要顺着用户的错需求走
4. **Stop and name what's confusing** — 不清楚就停，说出哪里不清楚，问

## 边界与反例

**不是**：
- 不是"所有任务都要提问"——琐碎任务用判断力（参见原文 Tradeoff 声明）
- 不是"生成 1000 字思考"——目的是显式陈述关键不确定性，不是表演式思考

**反例**：
- 用户说"用 Redis 做缓存"，你心想"in-memory 更合适"但不说 → 违反规则 3
- 用户需求有两种读法，你挑一种写完代码再问"是这样吗？" → 违反规则 2
- 术语模糊（例如"优化性能"）不问具体指标直接开干 → 违反规则 4

## 相关概念

- [[simplicity-first]]：Think 阶段产出的"假设"会限制后续代码复杂度
- [[goal-driven-execution]]：先想清楚验收标准，否则"想"会漂

## 与 Garry Tan 架构论的呼应

[[garry-tan]] 的 [[resolver-context-routing]] 机制把"Think Before Coding" 从**人类动作**转为**系统动作**：与其让人类每次实现前自我提醒"先想清楚"，不如让 harness 自动把正确的 context 先装进来（"task X → load doc Y first"）。
- forrestchang 要求开发者停下问"哪里不清楚"；Tan 让 resolver 先把 clarification 需要的文档端到眼前。
- 两者**互补而非冲突**：resolver 负责"装载正确 context"，Think Before Coding 负责"即使 context 全也要显式检验假设"。
- Tan 亲身把 CLAUDE.md 从 20k 行砍到 200 行（见 [[context-bloat]]），证明 resolver 优于"一次性把所有 context 都喂进来"。

## 参考来源

- [[karpathy-skills-claude-md]] §1
- 原文 `raw/karpathy-skills-CLAUDE.md` line 16-24
- [[garry-tan-thin-harness-fat-skills]] §3（resolver 机制）

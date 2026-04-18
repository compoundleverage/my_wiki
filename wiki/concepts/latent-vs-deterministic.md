---
title: Latent vs Deterministic
type: concept
aliases: [潜空间 vs 确定性, latent deterministic 分界]
tags: [llm-architecture, agent-design, core]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
  - "[[journal-2026-04-18]]"
  - ../../raw/journal/2026-04-18.md
created: 2026-04-18
last_updated: 2026-04-19
status: stable
---

# Latent vs Deterministic

## 定义

Agent 系统的每一步要么是 **latent**（潜空间，智能在此），要么是 **deterministic**（确定性，信任在此）。**搞混两者是 agent 设计最常见的错误**。

| 维度 | Latent | Deterministic |
|------|--------|---------------|
| 谁干 | 模型 | 代码 |
| 价值 | 判断 / 综合 / 模式识别 | 同输入同输出 |
| 例子 | 读一堆文档写简报；跨领域类比 | SQL 查询；编译；算术 |
| 失败模式 | 幻觉，漂 | 无 |

## 经典反例（Tan 原话）

> An LLM can seat 8 people at a dinner table, accounting for personalities and social dynamics. Ask it to seat 800 and it will hallucinate a seating chart that looks plausible but is completely wrong.

**8 人排座**是 latent 问题（需要判断人际化学反应）；**800 人排座**是 deterministic 的组合优化问题，强行塞进 latent 一定翻车。

**"The worst systems put the wrong work on the wrong side of this line. The best systems are ruthless about it."**

## 如何判断放哪边

简单启发式：
- 需要"读完 + 综合 + 判断" → latent
- 需要"重复 1000 次不出错" → deterministic
- 需要"可审计的结果" → deterministic
- 需要"处理 novel 情况" → latent

[[yc]] 的 [[skill-as-method-call|matching skill]] 就是混合的例子：
- LLM 发明主题（latent：读 founder profile 判断谁跟谁聊得来）
- 算法分配座位（deterministic：约束满足）

## 用户的内化（2026-04-18）

本 wiki 维护者在 [[journal-2026-04-18]] §经验 的自创 [[ai-six-properties|AI 六特性]] 框架中，第 3 条直接嵌入本概念的术语：

> "3. 产出稳定，latent vs deterministic"

这是**外部概念被吸收进第一方框架**的信号——不是单纯 cite 或引用，而是把术语作为自己归纳 AI 能力时的原词。[[garry-tan|Tan]] 的论断在用户个人框架中因此有了锚点。对本概念的含义：不只是 Tan 的一家之言，也是读完 Tan 后会自然抽象出来的稳定分界。

## 边界与反例

**不是**：
- 不是"LLM 什么都不能做"——latent 该用就用，别怂
- 不是"代码什么都能做"——deterministic 处理 novel 输入会脆

**反例**：
- 让 LLM "计算 1000 个用户的 DAU 留存" → deterministic 任务塞进 latent
- 写死 if/else 判断"用户想要什么"意图 → latent 任务强行 deterministic 化

## 相关概念

- [[thin-harness-fat-skills]]：三层架构的 bottom 层是 deterministic
- [[diarization]]：标志性的 latent 动作
- [[skill-as-method-call]]：通常混合 latent + deterministic
- [[purpose-built-tooling]]：deterministic 层的工具化

## 参考来源

- [[garry-tan-thin-harness-fat-skills]] §4
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "Latent vs. deterministic"

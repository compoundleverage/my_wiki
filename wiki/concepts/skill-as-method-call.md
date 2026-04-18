---
title: Skill as Method Call
type: concept
aliases: [skill 是方法调用, markdown 方法调用, parameterized skill]
tags: [llm-architecture, agent-design]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Skill as Method Call

## 定义

Skill file 的本质是**带参数的可重用方法**，不是一次性 prompt。同一个 skill 文件被不同参数调用，能产生**根本不同的能力**。

[[garry-tan]] 的原话："A skill file works like a method call. It takes parameters. You invoke it with different arguments. The same procedure produces radically different capabilities depending on what you pass in."

## 经典例子（Tan 原文）

`/investigate` 是一个 7 步 skill：scope dataset → build timeline → diarize documents → synthesize → argue both sides → cite sources。

| 参数组合 | 得到的能力 |
|---------|-----------|
| TARGET=safety scientist, DATASET=2.1M discovery emails | 医学研究分析师，判断吹哨人是否被压制 |
| TARGET=shell company, DATASET=FEC filings | 法证调查员，追踪协同政治献金 |

**同一个 skill，同一个 7 步，同一个 markdown 文件**。Skill 描述的是**判断的过程**，invocation 提供世界。

## 关键论点

Tan 的升华："This is **not prompt engineering**. This is **software design**, using markdown as the programming language and human judgment as the runtime."

Markdown 比刚性源代码更适合封装能力，因为它用**模型本来就在思考的语言**描述过程、判断、上下文。

## 边界与反例

**不是**：
- 不是"skill 里写死答案"——skill 提供过程，不提供结论
- 不是"prompt template"——template 是文本槽位，skill 是可执行程序

**反例**：
- Skill 里硬编码数据集名字 → 丧失方法调用特性
- 把 7 个步骤合成一个大段落 → 丢掉可组合性

## YC 的真实用例

[[yc]] 在 Startup School 系统里用同一个 matching skill 三种 invocation：
- `/match-breakout`：1200 人按赛道聚类，30 人/房间
- `/match-lunch`：600 人跨赛道 serendipity，8 人/桌不重复
- `/match-live`：当前在场者近邻匹配，1:1，200ms

一个 skill，三套策略。

## 相关概念

- [[thin-harness-fat-skills]]：为什么 skills 是"fat"
- [[harness]]：skill 被谁调用
- [[resolver-context-routing]]：哪个 skill 何时被调用
- [[diarization]]：一个常用 skill 动作

## 参考来源

- [[garry-tan-thin-harness-fat-skills]] §1
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "Skill files"

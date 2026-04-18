---
title: Skill as Permanent Upgrade
type: concept
aliases: [skills 永久升级, system compounds, codify 原则]
tags: [llm-architecture, agent-design]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Skill as Permanent Upgrade

## 定义

每写一个 [[skill-as-method-call|skill file]] 就是给系统**加一次永不衰减的升级**：
- 不会遗忘（markdown 落盘持久化）
- 不会退化（文件不变）
- 凌晨 3 点仍在 cron 下跑
- **下一代模型一来就自动变强**（latent steps 的判断力升级，deterministic 不变）

[[garry-tan]] 的口号："**Build it once. It runs forever.**"

## Tan 的 OpenClaw 规则（meta-原则）

> "You are not allowed to do one-off work. If I ask you to do something and it's the kind of thing that will need to happen again, you must: do it manually the first time on 3 to 10 items. Show me the output. If I approve, codify it into a skill file. If it should run automatically, put it on a cron.
>
> **The test: if I have to ask you for something twice, you failed.**"

这条规则在 X 上获得 1000+ 赞、2500+ 收藏。Tan 强调**它不是 prompt engineering 技巧，是架构**：每次 codify 都把能力固化。

## 为什么 system compounds

关键在 [[latent-vs-deterministic]] 的分层：
- Latent 层随模型升级**自动变强**（每代 Claude 判断更精）
- Deterministic 层保持**完美可靠**（SQL 永远是 SQL）
- Skill 把两者组合成**可复用方法**

因此每个 skill 是一份**不会过期的资产**。

## YC 的学习闭环（Tan 原文）

Event 后跑 `/improve` skill：
1. 读 NPS 调查
2. Diarize "OK" 响应（不是差的，是"差点就行"的）
3. 提取模式
4. 写回新规则到 matching skills

结果：7 月活动 12% "OK" 率 → 下次活动 4%。**Skill 自己重写自己**，system 变好而无需人写代码。

## 三个递归应用

1. **Codify 常规任务** → 固化
2. **Codify 常规 codify**（自动提取新规则）→ 系统学习
3. **Codify 学习机制本身** → 复利增长

"The most valuable loops in 2026"（Tan 原话）：**retrieve → read → diarize → count → synthesize** + **survey → investigate → diarize → rewrite the skill**。

## 边界与反例

**不是**：
- 不是"所有对话都要 codify"——一次性真一次性的不算违规（比如写一封特别邮件）
- 不是"写 skill 就完事"——skill 也要 lint、要淘汰、要重构（对应我们的 [[/lint]] 工作流）

**反例**：
- 帮用户做同一件事 3 次还不主动提"要不要固化成 skill"→ 违反
- skill 写完扔着不回来迭代 → 腐烂

## 相关概念

- [[thin-harness-fat-skills]]：为什么"永久"——因为 skill 在 fat 层，与 harness/model 解耦
- [[skill-as-method-call]]：永久的单元
- [[diarization]]：典型的可永久化动作
- [[goal-driven-execution]]：goal = "被问第二次 = 失败"是强成功标准

## 与 Karpathy "persistent compounding artifact" 的血缘

[[andrej-karpathy]] 在原 gist 中把 **wiki 本身**描述为 "a persistent, compounding artifact"——这正是 [[garry-tan|Tan]] 的"skill 是永不衰减资产"在**更老框架**里的表达：
- Karpathy (2026-早)：**wiki 页**是永久 artifact，每次 ingest 让它更厚
- Tan (2026)：**skill 文件**是永久 artifact，每次新模型让它更强

两者的共同结构：**某种 markdown 文件**作为 system 的**非衰减资产**。差别在于"装什么"：Karpathy 装的是**知识**（synthesis），Tan 装的是**流程**（judgment procedure）。

本 wiki 项目同时拥有两种——`wiki/*.md`（Karpathy 式）+ `.claude/commands/*.md`（Tan 式）——两种永久资产共同演化。

## 本项目的对应

我们的 [[/ingest]] [[/query]] [[/lint]] [[/file-back]] 四个 slash commands 就是这条原则的实施：**每一次我做的事都应能被 codify**。Wiki 本身也是"asked twice = failed"的物理体现：用户问过的问题，答案应落在 wiki 里，不必再问一次。

## 参考来源

- [[garry-tan-thin-harness-fat-skills]]
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "Skills are permanent upgrades"

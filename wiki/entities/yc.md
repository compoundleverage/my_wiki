---
title: YC (Y Combinator)
type: entity
aliases: [y-combinator, Y Combinator]
tags: [organization, accelerator]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# YC (Y Combinator)

## 身份

创业加速器；Startup School 主办方；[[garry-tan]] 担任 CEO。

## 在 Thin Harness, Fat Skills 中的角色

Tan 用 **YC Startup School 2026** 作为 [[thin-harness-fat-skills]] 架构的**真实系统**演示：

- **规模**：2026 年 7 月 @ Chase Center，**6000 名 founder**
- **传统方式瓶颈**：15 人项目团队读申请，200 人可行，6000 人崩
- **新系统**：用 [[skill-as-method-call]] 架构批量 [[diarization|diarize]] + match

### 使用的 skills（Tan 原文列出）

| Skill | 作用 |
|-------|------|
| `/enrich-founder` | 拉所有源 + diarize + 标出 "says vs actually building" gap；每晚 cron |
| `/match-breakout` | 1200 人按赛道聚类，30/房间 |
| `/match-lunch` | 600 人跨赛道 serendipity，8/桌不重复 |
| `/match-live` | 当前在场者近邻匹配，200ms，1:1 |
| `/improve` | 读 NPS 调查，diarize "OK" 响应，把新规则写回 matching skills |

### 学习闭环的实证数据

July event "OK" rating = 12% → 下次 event = 4%。**skill 自己重写自己**。

## 本 wiki 的用途

YC 作为**场景提供者**——它把抽象的 [[thin-harness-fat-skills]] 架构落到 6000 人的真实匹配问题上，给出了**可验证的效益**。未来若做"agent 系统运营"主题，yc 实体页可以扩充为典型案例的集合。

## 来源资料

- `raw/garry-tan-thin-harness-fat-skills.md` §§ "The system that learns"

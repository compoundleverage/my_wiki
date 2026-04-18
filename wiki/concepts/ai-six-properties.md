---
title: AI 六特性（用户框架 v1）
type: concept
aliases: [AI 六特性, user AI capabilities taxonomy, ai-capabilities-v1]
tags: [user-framework, ai-capabilities, taxonomy, draft]
sources:
  - "[[journal-2026-04-18]]"
  - ../../raw/journal/2026-04-18.md
created: 2026-04-19
last_updated: 2026-04-19
status: draft
---

# AI 六特性（用户框架 v1）

## 定义

本 wiki 维护者在 [[journal-2026-04-18]] §经验 中首次明示记录的 AI 能力归纳框架。标记 **v1** 因为此框架可能在后续日记中被精炼、扩展或替换——届时 /ingest 应直接更新本页或迁移。

> [!note] Status: Draft
> 本页是用户个人归纳，不是学术 / 行业共识。Draft 状态意味着后续 /ingest 发现用户对此框架的修正、扩展、删除时，应直接覆盖本页或新开 v2 页。

## 六特性

| # | 特性 | 一句话含义 | wiki 内对应概念 |
|---|------|------------|-----------------|
| 1 | 无感低摩擦 | AI 调用成本低到使用者无感 | —— |
| 2 | 上下文记忆管理 | 长上下文 / 跨 session 记忆的工程化 | [[diarization]]（档案化压缩 context） |
| 3 | 产出稳定 | latent vs deterministic 分界；该确定性的交给代码 | [[latent-vs-deterministic]] |
| 4 | 主观能动性 | agent 层面的自主选择 / 规划 | —— |
| 5 | 自我迭代 | 系统 / skill 的持续升级机制 | [[skill-as-permanent-upgrade]] |
| 6 | 可审计解释 | 结果可追溯、可 diff、不黑盒 | [[persistent-wiki-vs-rag]]（审计性维度） |

## 观察

- **6 项中至少 4 项在 wiki 内已有独立概念页**——说明用户的框架不是凭空，是读完 [[andrej-karpathy|Karpathy]] + [[garry-tan|Tan]] 后的独立抽象与归纳
- **第 3 条最直接嵌入外部概念**：用户原话就用了 [[garry-tan|Tan]] 的术语 "latent vs deterministic"——这是外部概念被吸收进第一方框架的标志
- **第 1、4 条**尚无对应 wiki 概念页，是本框架相较 Karpathy + Tan 的独创维度——若后续日记反复强调，可升级为独立 concept 页

## 与外部框架的对比

| 外部框架 | 维度 | 与本框架的重合点 |
|----------|------|------------------|
| [[garry-tan\|Tan]] 四支柱（thin-harness / fat-skills / resolver / latent-deterministic） | 4 | 第 3 条直接重合；第 5 条与 [[skill-as-permanent-upgrade]] 重合 |
| [[andrej-karpathy\|Karpathy]] 四卖点（Explicit / Yours / File-over-App / BYOAI） | 4 | 第 6 条（可审计）对应 Explicit |

## 待追问

- [UNVERIFIED] 用户是否打算把此框架发展成独立方法论？若是，v2+ 的演化需要持续追踪
- 第 1 条"无感低摩擦"的具体度量是什么？（token 成本？响应延迟？UI/UX？）
- 第 4 条"主观能动性"与学界 agent autonomy 文献（ReAct / Plan-Act / Reflexion）的关系如何？

## 相关概念

- [[latent-vs-deterministic]]：第 3 条的外部来源
- [[skill-as-permanent-upgrade]]：第 5 条的外部同构
- [[diarization]]：第 2 条的一种实现路径
- [[persistent-wiki-vs-rag]]：第 6 条的一种实现路径

## 参考来源

- [[journal-2026-04-18]] §经验
- 原文 `raw/journal/2026-04-18.md`

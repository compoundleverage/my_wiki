---
title: Diarization
type: concept
aliases: [日记化, 档案化提炼, analyst's brief]
tags: [llm-architecture, knowledge-work]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Diarization

## 定义

**让模型读完关于一个主题的一切，写出一页结构化档案**。[[garry-tan]] 称之为"让 AI 对真正的知识工作有用的那一步"。

关键特征：
- 输入：一个主题的**全集**文档（几十到几百份）
- 输出：**一页** distilled 判断 = 结构化 profile
- 性质：**[[latent-vs-deterministic|latent]]**（需要 hold contradictions，notice what changed and when，综合出结构化智能）

## 为什么 RAG 做不到

Tan 的对比："No SQL query produces this. No RAG pipeline produces this. The model has to actually read, hold contradictions in mind, notice what changed and when."

- 数据库查询 = 记录 lookup（机械）
- RAG = 碎片召回 + 现场拼装（仍是碎片）
- **Diarization = analyst's brief**（全量阅读 + 判断综合）

## 经典输出样态（Tan 原文）

```
FOUNDER: Maria Santos
COMPANY: Contrail (contrail.dev)
SAYS: "Datadog for AI agents"
ACTUALLY BUILDING: 80% of commits are in billing module.
  She's building a FinOps tool disguised as observability.
```

"SAYS vs ACTUALLY BUILDING" 的 gap——**没有 embedding 能找到这个**。要求模型同时 hold 住：申请表自述 + GitHub commit 历史 + 1:1 对话 transcript，三者并列对比后做判断。

## 标志性用例

- **YC Startup School**：`/enrich-founder` skill 每晚 cron 跑 6000 个 founder profile，持续 fresh
- **本 wiki 项目**：我们的 [[/file-back]] 工作流生成的 **concept clarification 页**、**decision record 页**、**comparison 页**就是 diarization 的具体产物

## 边界与反例

**不是**：
- 不是"总结"——总结是长文压短文；diarization 是多源→单页的**重构**
- 不是"FAQ"——FAQ 是问题索引；diarization 是主题剖面

**反例**：
- 只读一份文档写摘要 → 不是 diarization（没有 hold 多源）
- 用 BM25/embedding 召回再拼 → 不是 diarization（没有 hold contradictions）

## 与 Karpathy 的"wiki is compounding"关系

[[andrej-karpathy]] 原 gist 说 "wiki is a persistent, compounding artifact" ——这是 diarization 的**全局化 + 累积版**：
- 每个 wiki 页（summary / concept / entity / synthesis）都是**一次 diarization 的产物**
- 整个 wiki 网 = 所有 diarization 的互联 + 累积
- [[/file-back]] 是把 /query 结果做成**二次 diarization**（不是原材料，是"对之前 diarization 的 diarization"）
- [[persistent-wiki-vs-rag]] 的论证核心正是：**RAG 每次现场拼碎片，wiki 是累积的 diarization 网**

所以"diarization"和"compounding wiki"是一枚硬币的两面：前者看的是**动作**（读全集→写一页），后者看的是**产物**（一堆相互引用的 diarizations）。

## 相关概念

- [[latent-vs-deterministic]]：diarization 是教科书 latent 动作
- [[skill-as-method-call]]：通常以 skill 方法调用形式出现
- [[thin-harness-fat-skills]]：diarization 是 fat skill 的典型产物
- [[persistent-wiki-vs-rag]]：diarization 产物的累积态
- [[knowledge-compilation]]：diarization 是编译的最小单元

## 参考来源

- [[garry-tan-thin-harness-fat-skills]] §5
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "Diarization"

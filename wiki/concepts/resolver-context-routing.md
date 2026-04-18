---
title: Resolver (Context Routing)
type: concept
aliases: [resolver, 上下文路由, context routing table]
tags: [llm-architecture, agent-design]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Resolver (Context Routing)

## 定义

**Context 的路由表**：当任务类型 X 出现时，先加载文档 Y。

[[garry-tan]] 的分工："Skills tell the model **how**. Resolvers tell it **what to load and when**."

Resolver 把"该读什么"从人类的记忆里解放出来，变成系统的自动行为。

## Tan 的典型例子

开发者改了一个 prompt。
- **没有 resolver**：直接 ship，可能静悄悄引入回归
- **有 resolver**：模型先读 `docs/EVALS.md`——里面说"跑 eval suite，对比分数，若精度跌超 2% 就回滚并调查"。开发者不知道 eval suite 存在；resolver 在正确时刻把它装进来

## Claude Code 自带的 resolver

每个 skill 都有 `description` 字段。模型**自动**把用户意图匹配到 skill description。你不必记得 `/ship` 存在——**description 就是 resolver**。

## Tan 的自我反省（重要教训）

> "My CLAUDE.md was 20,000 lines. Every quirk, every pattern, every lesson I'd ever encountered. Completely ridiculous. The model's attention degraded. Claude Code literally told me to cut it back."

改法：砍到 **~200 行**，只放**指针**（pointers to documents）。Resolver 在需要时加载对应文档。20k 行知识**按需可达**，但不再污染 context window。

## 边界与反例

**不是**：
- 不是"全局 prompt 模板"——resolver 是按任务类型分支的
- 不是"embedding 相似度检索"——resolver 是规则驱动的显式路由，不是概率召回

**反例**：
- CLAUDE.md 里塞所有规则 → 违反（应只放指针 + 按需跳转）
- 让模型自己猜要读哪个文档 → resolver 的工作就是消除这层猜测

## 相关概念

- [[thin-harness-fat-skills]]：resolver 是 harness 的一部分
- [[skill-as-method-call]]：skill 的 description 字段即 resolver 输入
- [[context-bloat]]：没有 resolver 就会塞爆 context

## 本项目的对应

我们的 [index.md](../../index.md) + frontmatter `aliases` 字段合起来就是一个 resolver 的雏形：
- index.md = 路由表（哪个概念在哪）
- aliases = 模糊自然语言到具体页面的映射

未来 [[/query]] 工作流应显式使用 index.md 作为第一步锚定——这已经写进了 `.claude/commands/query.md` 第 1 步。

## Karpathy 原案的直接验证

[[andrej-karpathy]] 在原 gist §"Indexing and logging" 明确写：

> "**The LLM updates [index.md] on every ingest. When answering a query, the LLM reads the index first to find relevant pages, then drills into them.** This works surprisingly well at moderate scale (~100 sources, ~hundreds of pages) and avoids the need for embedding-based RAG infrastructure."

即：Karpathy 的 `index.md` 就是 [[garry-tan|Tan]] resolver 概念的**原型**。Tan 的 skill description 是对这种模式的**更广形式**（不限于知识检索，适用于所有 task routing）。

两套思想的对应关系：

| Karpathy | Tan | 共通 |
|----------|-----|------|
| index.md（内容路由）| skill description（task 路由）| 都是 string → target 的表 |
| 读 index → drill | 匹配 description → invoke | 都是"先粗定位再精执行" |
| 避开 embedding RAG | 避开 "attention on 40 tools" | 都是**对 context 膨胀的对治** |

## 边界扩展

## 参考来源

- [[garry-tan-thin-harness-fat-skills]] §3
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "Resolvers"

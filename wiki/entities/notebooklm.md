---
title: NotebookLM
type: entity
aliases: [NotebookLM, Google NotebookLM]
tags: [product, llm-app, knowledge-base, google, rag]
sources:
  - "[[journal-2026-04-18]]"
  - ../../raw/journal/2026-04-18.md
created: 2026-04-19
last_updated: 2026-04-19
status: draft
---

# NotebookLM

Google 的 LLM 知识管理产品。用户上传文档集合后，由 LLM 基于该集合回答问题、生成摘要、生成 podcast 等。

## 在本 wiki 的角色

本 wiki 维护者在 [[journal-2026-04-18]] 中把 NotebookLM 作为 **[[persistent-wiki-vs-rag|RAG 范式的实测对照基线]]**：

> "目前这么小体量，感觉 NotebookLM 处理数据快很多，之后会不会越来越慢？"

这是用户对 [[persistent-wiki-vs-rag]] 结论的实测压力测试——[[andrej-karpathy|Karpathy]] 的论证是"RAG 长期积累场景必败、wiki 必赢"，用户观察到"RAG 小体量时体感更快"——两者并不矛盾，是 Karpathy 论证边界的补完。详见 [[persistent-wiki-vs-rag]] 的"扩张性 Open Question"章节。

## 已知信息

- 厂商：Google
- 类别：RAG-based 知识管理产品
- [UNVERIFIED] 具体技术：chunk 策略、检索算法、rerank 机制尚待确认，这会影响它与 [[my-wiki]] 的可比性

## 待查

- [UNVERIFIED] NotebookLM 的底层检索机制（纯向量？hybrid？）
- [UNVERIFIED] 规模变大后的真实性能曲线——用户担忧需数据验证
- [UNVERIFIED] 是否有 API / 能与本地 wiki 同步

## 参考来源

- [[journal-2026-04-18]] §问题

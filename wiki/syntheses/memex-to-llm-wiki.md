---
title: Memex → LLM Wiki (1945 → 2026)
type: synthesis
aliases: [memex llm wiki 历史线, bush karpathy 继承, 81 年]
tags: [history, knowledge-base, synthesis]
sources:
  - "[[karpathy-llm-wiki-gist]]"
  - ../../raw/karpathy-llm-wiki-gist.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Memex → LLM Wiki (1945 → 2026)

> "The idea is related in spirit to Vannevar Bush's Memex (1945) ... The part he couldn't solve was who does the maintenance. The LLM handles that."
> — [[andrej-karpathy]], 2026

这条 81 年的历史线把现代 LLM wiki 锚定为**一个老构想的隔代复兴**，而非全新发明。

## 两端对照

| 维度 | Memex (1945) | LLM Wiki (2026) |
|------|--------------|-----------------|
| 发明人 | [[vannevar-bush\|Vannevar Bush]] | [[andrej-karpathy\|Karpathy]]（提出范式，未发明技术） |
| 介质 | 微缩胶片 + 机械关联 | Markdown 文件 + 文件系统 |
| Indexing | 机械关联索引（associative trails）| `index.md` + wikilinks + optional [[qmd]] |
| 输入渠道 | 手工 / 外聘打字员 | Obsidian Web Clipper / [[/clip]] |
| 维护主体 | ⚠ **未解决**——靠本人或专职秘书 | **LLM**——不 bored、一遍 touch 15 文件 |
| 产出 | 个人知识路径（链接的文档集）| Persistent, compounding wiki |
| 私密性 | ✓ 本地个人机 | ✓ 本地 markdown |
| 协作 | 可通过复制胶片分享 | Git push / Obsidian sync |

## Bush 未解决的核心难题：维护成本

Karpathy 的洞察是一针见血：

> "The tedious part of maintaining a knowledge base is not the reading or the thinking — it's the bookkeeping. ... Humans abandon wikis because the maintenance burden grows faster than the value."

Memex 至 1945 年的技术上是可以搭出来的（胶片 + 机械索引都存在），但**人没这个时间长期维护**。1990 年代万维网兴起后，"知识库"彻底转向公共网 + 搜索引擎——Bush 的**个人、策展、关联**三原则全部被稀释。

Karpathy 的判断：Web 演化**偏离了** Bush 原意，而 LLM wiki 是**回归**。

## 中间环节（本 wiki 尚缺）

这条历史线中的几个关键节点，本 wiki 暂未 ingest，属于明显的 **data gap**（[[/lint]] 应标出）：

- **1968 "Mother of All Demos"（Engelbart）**：NLS 系统首次演示 hyperlink、协作编辑——直接桥接 Memex → Web
- **1960 Ted Nelson 的 Xanadu**：明确提出双向链接、transclusion，比 Web 更接近 Memex
- **1980s HyperCard**：个人超媒体工具的商业化尝试
- **1990s World Wide Web (Berners-Lee)**：脱离 Memex 原意的分支
- **2000s Wikipedia / 2010s Roam Research / Obsidian**：wiki 在个人 / 协作两个方向回归

若未来 ingest 上述任一点，可大幅扩展本综述。

## 为什么 LLM 是最终答案

三个技术前提同时成熟让 LLM wiki 成为可能：
1. **LLM 能批量阅读 + 综合** — 10~15 页 touch 这件事变廉价
2. **本地 markdown 工具链成熟** — Obsidian + Git 提供 IDE 级体验（见 [[knowledge-compilation]]）
3. **Context 窗口足够大** — 一次对话能装下 wiki 大部分结构，LLM 能"在大图下工作"

三者缺一都不行——这解释了为什么 Bush → 现在中间 80 年里这个构想反复被提出但没跑起来。

## 自指注记

**本 wiki 项目自身就是这条历史线的 2026 年实例**。
- Bush 愿景里的"个人 / 策展 / 关联"全部实现
- 维护成本——如本项目展示——确实靠 LLM 接近于零
- 本页作为综述，就是 LLM wiki 在反哺其自身的思想史

## [UNVERIFIED]

- Bush 1945 原文 "As We May Think" 细节尚未 ingest
- Engelbart / Nelson / HyperCard / Web 等中间节点的具体引用
- 上述"三技术前提"的时间线坐标——大致 2022-2026 但具体指哪个模型版本落地时的飞跃 [UNVERIFIED]

## 相关页面

- [[vannevar-bush]]：起点
- [[andrej-karpathy]]：2026 年节点
- [[knowledge-compilation]]：范式的现代表达
- [[persistent-wiki-vs-rag]]：现代侧的论证

## 来源

- `raw/karpathy-llm-wiki-gist.md` §"Why this works" 末段

---
title: my_wiki
type: entity
aliases: [my_wiki, 本 wiki 项目, my wiki repo]
tags: [project, wiki, personal, compounding-tool]
sources:
  - "[[journal-2026-04-18]]"
  - ../../raw/journal/2026-04-18.md
created: 2026-04-19
last_updated: 2026-04-19
status: stable
---

# my_wiki

## 定位

本 wiki 维护者在 GitHub (`compoundleverage/my_wiki`) 公开的个人知识库项目——也就是**这个仓库本身**。

## 关键事实

- **所有者**：本 wiki 维护者（GitHub handle `compoundleverage`）
- **仓库**：`github.com/compoundleverage/my_wiki`
- **灵感来源链**：[[andrej-karpathy|Karpathy]] 的 [[karpathy-llm-wiki-gist|LLM Wiki gist]] + [[garry-tan|Tan]] 的 [[thin-harness-fat-skills]] + [[forrestchang]] 的 skills 实施
- **架构**：三层硬边界（raw/ / wiki/ / index.md + log.md）+ 四动词 slash commands（/ingest、/query、/lint、/file-back）+ /clip 前置 URL 抓取
- **日记层**：2026-04-18 新增（方案 A：日记作为自生一手素材入 raw/），见 [[journal-2026-04-18]] 的触发

## 里程碑

- **2026-04-18（Day 1）**：init commit + 3 次 /ingest（forrestchang / Tan / Karpathy）+ 首次 /lint + 首次 /file-back（obsidian-as-ide-redirect 决策）+ 日记层方案 A 落地
- **2026-04-19（Day 2）**：首次日记→wiki 连锁 /ingest（[[journal-2026-04-18]]），产出本页

## 角色

`my_wiki` 是其所有者 [[compound-interest-tool|复利工具原则]] 的**首日实践产物**——见 [[journal-2026-04-18]] §想法："今天就是这个 my_wiki 是个好的开始"。

## 参考来源

- [[journal-2026-04-18]] §Day 1 完工、§想法
- 原文 [raw/journal/2026-04-18.md](../../raw/journal/2026-04-18.md)

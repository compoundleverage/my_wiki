---
title: Karpathy-Skills CLAUDE.md (forrestchang)
type: summary
aliases: [karpathy skills CLAUDE, 编码行为准则摘要]
tags: [coding-guidelines, llm-behavior]
sources:
  - ../../raw/karpathy-skills-CLAUDE.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Karpathy-Skills CLAUDE.md 摘要

作者 [[forrestchang]] 在 GitHub repo `andrej-karpathy-skills` 下放置的一份给 Claude Code / LLM 编码助手的**行为准则**。4 条主原则 + 1 条 tradeoff 声明 + 1 条成功指标。

## 核心论点（≤ 3 条）

1. **准则整体偏向"谨慎 > 速度"**：四条规则都是在"让 LLM 少干活少越界"，而非"让 LLM 更能干"。开篇 Tradeoff 明确说琐碎任务用判断力别死守。
2. **每一行改动都要可追溯到用户请求**：贯穿全文的隐性元规则。在 [[surgical-changes]] 里最露骨——"Every changed line should trace directly to the user's request"。
3. **强"成功标准"是独立 loop 的前提**：[[goal-driven-execution]] 是四条里最可操作的——把"加验证"翻译成"写失败测试再让它过"，模型就能自己闭环。

## 关键证据

- §1 [[think-before-coding]]：四条 before-implementing 规则，显式 vs 静默
- §2 [[simplicity-first]]：五条 "No ..." 清单 + "资深工程师会不会觉得过度复杂" 的自检启发
- §3 [[surgical-changes]]：四条 "Don't ..." 清单 + "改动产生孤儿时"的双面规则
- §4 [[goal-driven-execution]]：三条任务转化示例 + 多步任务的 step/verify 模板
- 收尾 success criteria：diff 里无关改动 ↓、过度复杂导致的重写 ↓、澄清问题提前出现

## 与 wiki 已有结论的联系

- 此为 wiki **首次 ingest**，无现有节点对比
- 与本项目自身 [CLAUDE.md](../../CLAUDE.md) 的"写任何文件前先 Read"、"拒绝幻觉"等规则**同源但更抽象**：forrestchang 的是跨项目通用版，本项目的是 Wiki 专用版。未来若抽取"LLM 行为准则"综述页，应把两份并列
- **2026-04-18 补**：第二次 ingest（[[garry-tan-thin-harness-fat-skills]]）带来全面横向验证——[[garry-tan|Garry Tan]] 的架构论从**系统层**复述了本准则的代码层主张。四个 concept 页（[[think-before-coding]] / [[simplicity-first]] / [[surgical-changes]] / [[goal-driven-execution]]）均已追加 Tan 的对应条款，构成 forrestchang（代码层）× Tan（架构层）的交叉引用网络。无冲突，纯强化。
- **2026-04-18 再补**：第三次 ingest（[[karpathy-llm-wiki-gist]]）让整条溯源链**闭环**——repo 名 "andrej-karpathy-skills" 现在**有了直接证据**对应 Karpathy 原案。forrestchang 的 4 原则 (`think-before-coding` / `simplicity-first` / `surgical-changes` / `goal-driven-execution`) 虽然未在 gist 内被 Karpathy 明确命名，但其精神与 gist §"The core idea" + §"Why this works" 的"LLM 做体力活、人类做决策"思想**完全一致**。原 [UNVERIFIED] 标记的"作者受 Karpathy 启发"推断**仍无直接证据**（repo README 未 ingest），但已**从推断升为强假设**。

## 与 Karpathy 本人关系

Repo 名带 "andrej-karpathy-skills"，但 CLAUDE.md 全文**未直接引用** Karpathy 本人言论。推测是作者受 Karpathy 思想启发（极简主义、goal-driven、file-over-app 等）编写的跨项目 skill bundle。**这是 [UNVERIFIED] 推断**，需要进一步核对 repo 其他文件（如 README）才能确认。

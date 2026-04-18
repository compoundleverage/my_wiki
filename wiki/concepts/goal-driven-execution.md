---
title: Goal-Driven Execution
type: concept
aliases: [目标驱动执行, 可验证的成功标准, verifiable success criteria]
tags: [llm-behavior, process]
sources:
  - "[[karpathy-skills-claude-md]]"
  - ../../raw/karpathy-skills-CLAUDE.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Goal-Driven Execution

## 定义

**把模糊任务转化为可验证的成功标准，然后 loop 到验证通过**。口号：**Define success criteria. Loop until verified.**

核心技巧 — 把含糊动词翻译成"写测试 / 让它过"：

| 原始任务 | 可验证化 |
|----------|----------|
| "Add validation" | Write tests for invalid inputs, then make them pass |
| "Fix the bug" | Write a test that reproduces it, then make it pass |
| "Refactor X" | Ensure tests pass before and after |

多步任务的模板：

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

**为什么重要**：强标准（strong criteria）让 agent 独立 loop；弱标准（"make it work"）逼出反复澄清。

## 边界与反例

**不是**：
- 不是"所有任务都要先写测试"——核心是"**可验证**"，能手动跑一次看结果也算
- 不是"TDD 必须"——是"成功标准要可验证"这个更弱的主张

**反例**：
- 用户说"优化这个函数"，你直接开改，没定义"优化"的度量 → 违反
- 多步任务一次性做完不设中间 verify 点 → 违反
- 接受"make it work"这种弱标准就动手 → 违反

## 相关概念

- [[think-before-coding]]：Think 阶段产出的就是这个"可验证标准"
- [[simplicity-first]]：成功标准本身也要简洁，不要堆一堆 vague metric

## 与 Garry Tan 架构论的呼应

[[garry-tan]] 给出 goal-driven 的 **meta 版本**——[[skill-as-permanent-upgrade|OpenClaw 规则]]："**if I have to ask you for something twice, you failed.**"
- "被问第二次" 就是**强到极致的 success criterion**：不仅单任务要 verifiable，整个系统都要 codify 到让同类请求不再发生。
- 达成路径：do it manually on 3-10 items → if approved, codify into skill file → if recurring, put on cron。这是 forrestchang 的 verify-loop 在系统层的扩展。
- 本 wiki 的 [[/ingest]] [[/query]] [[/lint]] [[/file-back]] 四 slash command 正是这条原则的产物。

## 参考来源

- [[karpathy-skills-claude-md]] §4
- 原文 `raw/karpathy-skills-CLAUDE.md` line 54-70
- [[garry-tan-thin-harness-fat-skills]] "Skills are permanent upgrades"

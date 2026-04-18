---
title: Surgical Changes
type: concept
aliases: [外科手术式改动, 最小 diff, 不乱碰]
tags: [llm-behavior, code-quality]
sources:
  - "[[karpathy-skills-claude-md]]"
  - ../../raw/karpathy-skills-CLAUDE.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Surgical Changes

## 定义

**只碰必须碰的，不顺手"改进"相邻代码**。口号：**Touch only what you must. Clean up only your own mess.**

两类规则：

### 编辑已有代码时
- 不要"改进"相邻代码/注释/格式
- 不要重构未坏的
- 匹配现有风格（即使你不同意）
- 发现无关死代码：**提一嘴但别删**

### 改动产生孤儿时
- 你的改动导致某个 import / 变量 / 函数没人用了 → **删**
- 但预先存在的死代码 → **不要删**（未被要求）

**判别测试**：每一行改动都应能直接追溯到用户请求（"Every changed line should trace directly to the user's request"）。

## 边界与反例

**不是**：
- 不是"禁止重构"——用户明确要求"refactor X" 时当然重构
- 不是"允许旧代码腐烂"——发现问题要**指出**，只是不顺手自作主张修

**反例**：
- 用户让你修 A 函数的 bug，你顺带把 B 函数的变量名也改了 → 违反
- 发现有 3 年没用过的 deprecated 模块，悄悄删掉 → 违反
- "既然在这个文件里了，顺便把缩进风格统一一下吧" → 违反

## 相关概念

- [[simplicity-first]]：Simplicity 管新增体量，Surgical 管改动边界
- [[think-before-coding]]：改动前想清楚哪些是"必须碰"的

## 与 Garry Tan 架构论的呼应

[[garry-tan]] 原文有一句"**Software doesn't have to be precious anymore. Build exactly what you need, and nothing else.**" 这是 Surgical Changes 的**架构版本**：不仅改动要外科手术式，造工具本身就别追求复用——专用一次性工具边际成本趋零，不要抱着"将来可能有用"的心态堆抽象（见 [[purpose-built-tooling]]）。
两者同源：判别测试都是"每一行改动 / 每一行工具代码都能直接追溯到当下需求"。

## 参考来源

- [[karpathy-skills-claude-md]] §3
- 原文 `raw/karpathy-skills-CLAUDE.md` line 38-52
- [[garry-tan-thin-harness-fat-skills]] §2（架构层补充）

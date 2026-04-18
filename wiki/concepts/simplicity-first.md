---
title: Simplicity First
type: concept
aliases: [简洁优先, 最小代码原则, YAGNI 变体]
tags: [llm-behavior, code-quality]
sources:
  - "[[karpathy-skills-claude-md]]"
  - ../../raw/karpathy-skills-CLAUDE.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Simplicity First

## 定义

**只写解决问题的最少代码，不做任何投机性（speculative）扩展**。口号：**Minimum code that solves the problem. Nothing speculative.**

五条 "No ..." 禁令：

1. **No features beyond what was asked** — 不加"顺便也做一下 X"
2. **No abstractions for single-use code** — 单用途代码不要提取函数/类
3. **No "flexibility" or "configurability"** — 没要就不给
4. **No error handling for impossible scenarios** — 不可能的分支不写 try/except
5. **If 200 lines could be 50, rewrite** — 自检压缩

启发式自检：问自己"**资深工程师会觉得这过度复杂吗？**" 若会，重写。

## 边界与反例

**不是**：
- 不是"不写注释不写测试"——准则针对**代码自身的复杂度**，不是产出的完整度
- 不是"粗糙糊弄"——最少代码 ≠ 难读代码

**反例**：
- 一次性脚本里搞 Strategy + Factory 双 Pattern → 违反
- 纯内部函数参数加 10 个 optional kwargs"以防万一" → 违反
- 单个 `open(x)` 外面包 `try/except Exception` 捕一切 → 违反（文件 IO 失败让它崩就对了）

## 相关概念

- [[surgical-changes]]：Simplicity First 管"新增代码的尺寸"，Surgical Changes 管"改动的范围"；两者合起来卡死"又肥又广"的 diff
- [[think-before-coding]]：先想清楚需求，才不会顺手加"可能有用"的东西

## 与 Garry Tan 架构论的呼应

[[garry-tan]] 在 [[garry-tan-thin-harness-fat-skills|"Thin Harness, Fat Skills"]] §2 把本概念**架构化**：不只代码要极简，工具与 harness 整体都要极简。推论出 [[purpose-built-tooling]]（每个工具 thin + fast + narrow），并给出 75x 性能差的实证（Playwright CLI 100ms vs Chrome MCP 15s）。
本条目与 forrestchang 的代码层主张**同源且互为补充**——共同指向"Build exactly what you need, and nothing else"。

## 参考来源

- [[karpathy-skills-claude-md]] §2
- 原文 `raw/karpathy-skills-CLAUDE.md` line 26-36
- [[garry-tan-thin-harness-fat-skills]] §2（架构层补充）

---
title: Purpose-Built Tooling
type: concept
aliases: [定制工具链, thin fast narrow tool, 专用工具]
tags: [llm-architecture, tooling]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Purpose-Built Tooling

## 定义

给 LLM agent 造工具时，**每个工具都要 thin + fast + narrow**——单一职责、100ms 级延迟、无多余选项。对立面是 MCP-style god-tools 和 REST API wrapper。

[[garry-tan]] 的原话："Software doesn't have to be precious anymore. Build exactly what you need, and nothing else."

## Tan 的基准对比

| 方案 | 单次耗时 | 性质 |
|------|---------|------|
| Playwright CLI 单 browser 操作 | ~100 ms | thin + fast + narrow ✓ |
| Chrome MCP screenshot-find-click-wait-read 一条龙 | ~15 s | god-tool ✗ |
| **差距** | **75x 慢** | |

## 核心论点

AI 让软件"不再珍贵"——**造一次性工具的边际成本趋近于零**。所以：

- 不要共享 god-tool，每个任务造一个专用 CLI
- 不要泛化抽象，直接构造最小必要的原语
- 不要担心"将来可能有别的用途"，到时再造第二个

## 与 [[simplicity-first]] 的关系

[[forrestchang]] 的 CLAUDE.md 从代码层提出同样的原则：**"Minimum code that solves the problem. Nothing speculative."**

Tan 把它**架构化**：不仅代码要极简，工具**整体**都要极简。

## 边界与反例

**不是**：
- 不是"所有工具都要手写"——合适的 CLI 可以是现成的（如 Playwright CLI 本身）
- 不是"拒绝抽象"——抽象应来自 3 次以上重复，而非想象

**反例**：
- 把整个 REST API（50 endpoints）都 expose 成 tool → 每个 tool 的 description 加起来把 context 吃爆
- MCP god-tool 做"一条龙服务"→ 单次调用 2-15 秒，流水线里全是等待

## 相关概念

- [[thin-harness-fat-skills]]：主架构
- [[harness]]：工具层位于 harness 之下（app 层）
- [[context-bloat]]：god-tools 是 bloat 的主因
- [[latent-vs-deterministic]]：工具层是 deterministic 世界的代表
- [[simplicity-first]]：代码层的同源原则

## 本项目的对应

我们的 `.claude/commands/*.md`（ingest/query/lint/file-back）就是 purpose-built skills——每个单一职责、~50-100 行、可独立演化。未来若触发"要不要把 4 个合成一个 mega-skill"的念头，**就违反了 Tan 的原则**。

## 参考来源

- [[garry-tan-thin-harness-fat-skills]] §2
- 原文 `raw/garry-tan-thin-harness-fat-skills.md` "The harness"

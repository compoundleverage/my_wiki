---
title: Claude Code
type: entity
aliases: [claude-code CLI, claude code]
tags: [product, llm-tool, cli]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Claude Code

## 身份

[[anthropic]] 开发的 LLM 编码 CLI。本 wiki 项目的运行宿主。

## 与 Thin Harness, Fat Skills 架构的对应

[[garry-tan]] 在 2026-03-31 [[anthropic-claude-code-source-leak-2026-03-31|读完源码后]]说："它**证实了**我一直在 YC 教的——秘密不在模型，在 wrapper。"

具体映射：
- Claude Code 的 harness 实现了 [[harness|四项核心职责]]：loop、file IO、context 管理、safety
- Skills 机制：每个 skill 带 `description` 字段，**自动作为 [[resolver-context-routing|resolver]]**（模型用自然语言意图匹配 skill description）
- Prompt caching、parallel sub-agents 等都是 harness 层的优化

## 已知规模

- 源码 512,000 行（见 [[anthropic-claude-code-source-leak-2026-03-31]]）

## 与本 wiki 项目的关系

我们整个 wiki 项目就跑在 Claude Code 上：
- [CLAUDE.md](../../CLAUDE.md) 是 Claude Code 的常驻 project context
- [.claude/commands/*.md](../../.claude/commands/) 是 Claude Code slash commands
- 本项目恰好是 [[thin-harness-fat-skills]] 的实例（见 summary 的自指观察）

## 来源资料

- `raw/garry-tan-thin-harness-fat-skills.md` 多处
- `raw/karpathy-skills-CLAUDE.md`（同类行为准则的另一源）

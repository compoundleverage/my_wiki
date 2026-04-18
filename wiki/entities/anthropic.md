---
title: Anthropic
type: entity
aliases: [anthropic ai]
tags: [organization, llm-provider]
sources:
  - "[[garry-tan-thin-harness-fat-skills]]"
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Anthropic

## 身份

AI 研究与产品公司；Claude 模型家族 + [[claude-code]] CLI 的创造者。

## 本 wiki 已涉及的条目

- [[claude-code]]：旗舰产品，本 wiki 的运行宿主
- [[anthropic-claude-code-source-leak-2026-03-31]]：2026-03-31 的源码意外泄漏事件
- 产品理念与 [[thin-harness-fat-skills]] 架构高度一致（从 [[garry-tan]] 读源码后的反向推断）

## 已知关键机制（通过 Claude Code 对外暴露的）

来自 [[garry-tan]] 读源码后的概括：
- Live repo context
- Prompt caching
- Purpose-built tools
- Context bloat minimization
- Structured session memory
- Parallel sub-agents

这些都是 [[harness]] 层该做的"thin"动作，不是提升模型智能的。

## 本 wiki 的元数据关联

- 本项目整个运行在 [[claude-code]] 上
- `CLAUDE.md` 约定是 Anthropic 定义的项目级常驻 prompt 约定

## 来源资料

- `raw/garry-tan-thin-harness-fat-skills.md` 多处引用
- [UNVERIFIED] 公司背景（成立年份、创始人等）未在 raw/ 中——需要时另行 ingest

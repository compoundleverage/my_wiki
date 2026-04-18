---
title: Garry Tan — "Thin Harness, Fat Skills" (2026)
type: summary
aliases: [thin harness fat skills 摘要, garry tan 架构论摘要]
tags: [llm-architecture, agent-design]
sources:
  - ../../raw/garry-tan-thin-harness-fat-skills.md
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# Garry Tan — "Thin Harness, Fat Skills" 摘要

[[garry-tan]] 2026 年在 X 上发布的长推文（来自 <https://x.com/garrytan/status/2042925773300908103>），系统阐述 LLM agent 系统架构的主张。本文是本 wiki 的**第一篇架构论长文**，触发 17 个新节点 + 4 个 concept 更新。

## 核心论点（≤ 3 条）

1. **瓶颈不是模型智能，是架构**：2x 和 100x 的人用的是同一个模型。差距在 wrapper（[[harness]]）而非 model。核心命题："It fits on an index card."
2. **[[thin-harness-fat-skills|Thin harness + fat skills]] 三层结构**：skills（markdown 程序，判断与流程，90% 价值） / harness（~200 行骨架） / application（deterministic 工具链）。方向性原则：intelligence 往上推，execution 往下推
3. **Skills 是永久升级**：每个 skill 一次写好以后自动随模型变强；deterministic 层永远可靠；[[skill-as-permanent-upgrade|system compounds]]，build once runs forever

## 关键证据

- **2026-03-31 [[anthropic-claude-code-source-leak-2026-03-31|Claude Code 源码泄漏]]**：Tan 读完 512k 行后说"it confirmed everything I'd been teaching at YC"——harness is the product，不是 model
- **YC Startup School 2026 真实系统**：6000 founders 用 [[skill-as-method-call|parameterized skill]] 架构匹配。同一个 matching skill 三种 invocation（breakout/lunch/live）产生完全不同策略。`/improve` 闭环把 "OK" 率从 12% 降到 4%——**skill 自己重写自己**
- **数量证据**：Playwright CLI 100ms vs Chrome MCP 15s = **75x 性能差**（[[purpose-built-tooling]] 的依据）；Tan 亲身 CLAUDE.md 从 20k 行砍到 200 行（[[resolver-context-routing]] + [[context-bloat]] 的实证）

## 五个定义

1. **Skill files**（[[skill-as-method-call]]）：像方法调用一样，带参数的 markdown
2. **The harness**（[[harness]]）：只做 loop / file IO / context / safety 四件事
3. **Resolvers**（[[resolver-context-routing]]）：context 的路由表；Claude Code 的 skill description 天然是 resolver
4. **Latent vs deterministic**（[[latent-vs-deterministic]]）：判断放 latent，重复精确放 deterministic；混用是最常见错误
5. **Diarization**（[[diarization]]）：读全集写一页结构化档案；RAG 做不到

## 与 wiki 已有结论的联系

本 wiki 之前已 ingest [[karpathy-skills-claude-md|forrestchang 的 CLAUDE.md 行为准则]]，Tan 的架构论与它**全面呼应**：

- Tan [[purpose-built-tooling]] ≈ forrestchang [[simplicity-first]]（架构版 vs 代码版）
- Tan "软件不再珍贵，build exactly what you need" ≈ forrestchang [[surgical-changes]]
- Tan "asked twice = failed" ≈ forrestchang [[goal-driven-execution]]（meta 版本）
- Tan [[resolver-context-routing]] 把 forrestchang [[think-before-coding]] 从"人类动作"转成"系统动作"——**提前装载正确 context**

两源**高度一致且彼此强化**；无冲突。已在 4 个 concept 页追加 Tan 的观点作为架构补充。

## 本次 ingest 的"自指观察"

Tan 的三层架构**恰好是本 wiki 项目自身的形态**：

| Tan 架构 | 本项目对应 |
|----------|------------|
| Thin harness（~200 行） | [CLAUDE.md](../../CLAUDE.md)（~150 行规则） |
| Fat skills（markdown 程序） | [.claude/commands/*.md](../../.claude/commands/)（每个 ~50-100 行） |
| Deterministic 应用层 | [raw/](../../raw/) + [wiki/](../../wiki/) + Grep / Glob / Read 工具 |

这不是刻意设计——Karpathy 的原 gist 早就指向这个结构，而 Tan 独立从另一角度到达了同样的形态。**两套思想的汇合点就是本 wiki 的存在**。

## 待验证

- [[anthropic-claude-code-source-leak-2026-03-31]] 事件的详情（撤包？有无官方声明？）—— [UNVERIFIED]
- [[steve-yegge]] "10x-100x" 原始出处——Tan 未给引用源—— [UNVERIFIED]

## 来源

- `raw/garry-tan-thin-harness-fat-skills.md`

---
title: 不单建 obsidian-as-ide 独立页（重定向到 knowledge-compilation）
type: decision
aliases: [reject obsidian-as-ide, obsidian-as-ide 不建页, dangling-link 处理案例]
tags: [decision, lint, wiki-governance]
sources:
  - "[[knowledge-compilation]]"
  - "[[karpathy-llm-wiki-gist]]"
  - "[[persistent-wiki-vs-rag]]"
created: 2026-04-18
last_updated: 2026-04-18
status: stable
---

# 不单建 obsidian-as-ide 独立页

## 问题

2026-04-18 首次 `/lint` 检出 `[[obsidian-as-ide]]` 有 3 处 dangling 引用（3 处被用到，但无 `wiki/concepts/obsidian-as-ide.md` 文件）。

Lint 按启发式规则 **"3+ 次引用 = 概念候选"** 建议新建独立页。

用户追问："**obsidian-as-ide 本质不是 file-over-app 吗？有什么我遗漏的吗？**"

此提问触发重审。

## 选项

| | 方案 | 含义 |
|---|------|------|
| A | 按 lint 推荐，新建独立页 | `wiki/concepts/obsidian-as-ide.md` |
| B | 3 处 dangling 重定向到 [[knowledge-compilation]] | 该页已含此比喻 |
| C | 扩写 [[knowledge-compilation]] 的 obsidian-as-ide 小节 | 中间方案：保留 anchor 但不单页 |

## 评估

### file-over-app vs obsidian-as-ide 的关系

二者**不等价**：

| 维度 | file-over-app | obsidian-as-ide |
|------|---------------|-----------------|
| 类型 | **存储属性** | **操作隐喻** |
| 回答 | "数据在哪？" | "工作流什么样？" |
| 主张 | Markdown 纯文件，无 SaaS 锁定 | Obsidian=IDE / LLM=programmer / wiki=codebase 的三角色映射 |
| 依赖 | 独立存在 | 依赖 file-over-app 作前提 |
| 推出 | 可迁移、可 BYOAI、可 git | 可 diff、可 PR review、可把 lint 当静态检查 |

即：file-over-app 是 obsidian-as-ide 的**必要前提**但不是**等价物**。

### 但"是否该建单独页"是另一个问题

检查 [[knowledge-compilation]] 当前内容：
- ✓ 已有 Karpathy 原话完整引用
- ✓ 已有三角色映射（Obsidian / LLM / wiki）
- ✓ 已有"工程化特征"详表（schema / ingest / git / lint 类比）

**obsidian-as-ide 的全部有价值内容已在 [[knowledge-compilation]] 里**。新建独立页会：
- 严重重复（同一比喻两处展开）
- graph view 造成双中心，hub 弱化
- 违反 [[purpose-built-tooling|Tan 的 thin + narrow]] 精神（一个概念一个页，别分叉）

## 最终选择

**方案 B**：重定向 3 处引用到 [[knowledge-compilation]]，不建独立页。

已执行：

| 位置 | 动作 |
|------|------|
| `summaries/karpathy-llm-wiki-gist.md:27` | `[[obsidian-as-ide\|...]]` → `[[knowledge-compilation\|...]]` |
| `concepts/knowledge-compilation.md:74` | 删除自指占位行（该页指向自己是荒谬的） |
| `concepts/persistent-wiki-vs-rag.md:51` | `[[obsidian-as-ide\|...]]` → `[[knowledge-compilation\|...]]` |

## 后续动作

- [x] 3 处重定向（已完成）
- [x] 更新 `.claude/commands/lint.md` §4 和 §7：dangling link 的**三路解法**（重定向 / 扩写 / 建页），要求先查已有页覆盖再推荐
- [x] 本决策页 file-back 成正式记录

## 元反思（给未来 /lint 的教训）

Lint 的"3 次 dangling = 概念候选"是**启发式**，不是**规则**。正确流程：

```
发现 dangling link
  ↓
先问：已有 page 是否已覆盖此概念？
  ↓
├─ 完全覆盖 → 重定向（方案 B）
├─ 部分覆盖 → 扩写已有页的相关 section（方案 C）
└─ 完全新   → 建新页（方案 A）
```

Lint 不能单独做这个判断——需要人类判断力看"是否覆盖"。这正是 Karpathy 原 gist 强调的 **"human does the asking, LLM does the bookkeeping"** 的应用：**lint 是 bookkeeping，接不接受是 human 的 asking**。

本次 **/lint → 用户追问 → /file-back** 的链路是三动作协作的**典型示范**——lint 找到候选，human 判断取舍，file-back 把决定固化为 wiki 节点。未来 dangling 类问题都应走此链路。

# /file-back

把最近一次 `/query` 的对话（或任意高质量对话）沉淀为 wiki 页。

**用法**：`/file-back` 或 `/file-back <type>`
**参数**：`$ARGUMENTS` = 可选类型（concept / decision / comparison / synthesis）

---

## 执行步骤

### 1. 选类型

若 `$ARGUMENTS` 为空，用 AskUserQuestion 问归档类型：

- **概念澄清页 (concept)** — 系统性定义 + 边界 + 反例 → `wiki/concepts/`
- **决策记录页 (decision)** — 问题 / 选项 / 理由 / 最终选择 → `wiki/decisions/`
- **对比分析页 (comparison)** — 多方案 / 模型 / 供应商的结构化比较 → `wiki/comparisons/`
- **综述页 (synthesis)** — 跨多源的合成 → `wiki/syntheses/`

### 2. 生成页面

按类型模板写到对应子目录。通用 frontmatter：

```yaml
---
title: <用户问题或主题>
type: <concept|decision|comparison|synthesis>
aliases: []
tags: []
sources:
  - "[[wiki-page-1]]"        # /query 时读过的页面
  - ../raw/original.pdf       # 溯源到的 raw 文件
created: <today>
last_updated: <today>
status: draft
---
```

#### concept 模板

```markdown
# <概念名>

## 定义
<清晰定义>

## 边界与反例
<什么不是这个概念>

## 相关概念
- [[concept-A]]：区别是 ...
- [[concept-B]]：包含关系 ...

## 参考来源
<frontmatter 已列，此处可展开注释>
```

#### decision 模板

```markdown
# <决策主题>

## 问题
<要解决什么>

## 选项
- 方案 A：...
- 方案 B：...

## 评估
<每个方案的利弊>

## 最终选择
<决定 + 理由>

## 后续动作
- [ ] ...
```

#### comparison 模板

```markdown
# <对比主题>

| 维度 | 方案 A | 方案 B | 方案 C |
|------|--------|--------|--------|
| ... | ... | ... | ... |

## 小结
<哪个在哪种场景更合适>
```

#### synthesis 模板

```markdown
# <主题>

## 背景
## 关键观点
## 跨源对比
## 结论
```

### 3. 自动双链（Backlinks）

对 frontmatter `sources` 中每个 wiki 页：
- Read 该页
- 若没有 `## Backlinks` 区块，Edit 在文末 append：
  ```markdown
  ## Backlinks
  - [[<new-page>]]
  ```
- 若已有 Backlinks，Edit 追加一行

### 4. 更新 index.md

对应分区插入：
```markdown
- [[<new-page>]] · <一句话摘要> · #tag
```

### 5. 更新 log.md

```markdown
## [<today>] file-back | <new-page-title>
- 涉及页面: wiki/<type>/<new-page>.md + <被引用的页>
- 关键改动: 从 query 沉淀为 <type> 页
- 后续动作: 可选 /lint 验证连锁
```

### 6. 报告

告知用户：
- 新页面路径
- 更新的 backlinks 数量
- 建议下一步（例如"继续 /query 深入" / "`/lint` 验证"）

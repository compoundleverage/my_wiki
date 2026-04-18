# /query

基于 wiki 回答问题，强制 Citations。结束时可选 File Back 沉淀。

**用法**：`/query <question>`
**参数**：`$ARGUMENTS` = 问题

---

## 执行步骤

### 1. 锚定索引

- Read `index.md`
- 按分类 + aliases 圈出候选页面集合（通常 5~15 个）
- 辅以 Grep：`Grep <关键词> wiki/**/*.md --output-mode files_with_matches`

### 2. 下钻阅读

- 从候选集合选 **3~8 个** 高相关页面精读
- Read 每个候选页的**全文**（不是摘要）
- 记下每条关键信息的 frontmatter `sources` 指向

### 3. 溯源核对（必要时）

当答案涉及具体数据 / 精确引用 / 有争议的结论时：
- 穿透到 raw/ 下的原始文件
- Read `raw/<原始文件>` 校验底层细节
- 如发现 wiki 页与 raw 不一致，**不覆盖**，log 后续动作写 `待验证冲突`

### 4. 综合输出

回答格式：

```markdown
## 答案

<结构化呈现的核心结论>

## Citations

- 结论 1 → `[[wiki-page-1]]` · `raw/paper-x.pdf` §section
- 结论 2 → `[[wiki-page-2]]`
- ...

## 覆盖度说明（若有缺口）

- wiki 未覆盖：<哪些子问题>
- 建议：`/ingest raw/<待补资料>` 或 web search
```

**硬约束**：
- 每条实质性结论都必须有 Citation
- 无 Citation 的论述必须用 `[UNVERIFIED]` 前缀
- 若 wiki 覆盖不到核心问题，**先承认**，再建议补充 ingest

### 5. File Back 询问

回答末尾用 AskUserQuestion 问：

> "要把这次问答归档到 wiki 吗？"

选项：
- 概念澄清页 (concept)
- 决策记录页 (decision)
- 对比分析页 (comparison)
- 综述页 (synthesis)
- 不归档

若非"不归档"，调用 `/file-back <type>` 子流程把刚才的问答沉淀成指定类型的页面。

### 6. 更新 log

append log.md：

```markdown
## [<today>] query | <question 简短版>
- 涉及页面: <读过的 wiki 页>
- 产出: <若 file back，列新页面；否则 "未归档">
- 后续动作: <可选>
```

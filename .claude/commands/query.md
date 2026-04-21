# /query

基于 wiki 回答问题，强制 Citations。结束时可选 File Back 沉淀。

**用法**：`/query <question>`
**参数**：`$ARGUMENTS` = 问题

---

## 执行步骤

### 1. 锚定候选集

候选集 = QMD 混合检索结果 ∪ index.md/aliases 命中。两条腿走路：QMD 抓语义关联，index.md 抓显式实体/别名。

#### 1a. QMD 混合检索（语义 + 词频 + LLM rerank）

```bash
qmd query "<question>" --files --json --min-score 0.3 -n 15
```

- 输出：相关度 ≥ 0.3 的文件路径 + 分数（最多 15 条）
- 强项：问题缺明显关键词、跨概念语义关联、口语化提问
- **前置**：本地 QMD 索引已建（首次：`qmd collection add ./wiki --name wiki && qmd embed`）；wiki 大改后跑 `qmd embed` 增量更新
- 失败时（qmd 未安装 / exit ≠ 0 / 结果空）：跳过本子步，单走 §1b，不阻塞 /query

#### 1b. index.md / aliases 锚定（index-first，Karpathy 规范）

Karpathy gist line 57 原文："When answering a query, the LLM **reads the index first** to find relevant pages, then drills into them."

执行顺序（严格）：

1. **Read `index.md`**（必做）
2. 按分类 + aliases 圈出候选页面集合
3. **Grep 是 fallback，非并列**：仅当 §1a qmd 结果 + §1b index 合起来候选 **< 3 页**时，才用 Grep `<关键词> wiki/**/*.md` 兜底（防止 index 覆盖不全时漏召回）
4. 若 grep 兜底触发 → log.md 后续动作字段备注"补 index 条目 `[[page-x]]`"（对应页应被 index 收录但未收录）

强项：问题含明确实体名 / 用户惯用别名 / 显式 wikilink 引用。

#### 1c. 合并去重

- §1a ∪ §1b 去重，通常 5~15 个候选
- QMD 高分（> 0.6）但 index.md 漏掉的页 → 可能 index.md 缺索引，记入"后续动作：补 index.md 条目"

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

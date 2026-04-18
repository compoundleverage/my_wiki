# /lint

全库体检。对应 Karpathy "代码检查器"角色。

**用法**：`/lint` 或 `/lint <scope>`
**参数**：`$ARGUMENTS` = 可选 scope，如 `wiki/concepts`（留空则扫全库）

---

## 五维度扫描

### 1. Contradictions（跨页矛盾）

- 所有未消解的 Conflict callout：
  ```
  Grep "\[!warning\] Conflict" wiki/**/*.md
  ```
- `待验证` 状态：
  ```
  Grep "待验证" wiki/**/*.md log.md
  ```
- 逐条列出来源 / 位置

### 2. Stale claims（过时说法）

- 读每个页面的 frontmatter `last_updated`
- 对比 log.md 中的 `supersede` / `deprecated` 记录
- 标记超过 6 个月未更新但近期被 ingest 可能影响的页面
- Grep 关键词：`deprecated` / `supersede` / `已过时`

### 3. Orphan pages（孤儿页）

- Glob 所有 `wiki/**/*.md`（排除 lint-reports/）
- 对每个页面：用 Grep 反查 `[[<page-name>]]` 是否出现在其他页面
- 无任何入链 → orphan
- index.md 里的链接算入链

### 4. Missing cross-references

启发式检测：
- 对每个概念页标题，Grep 它在其他页面的出现
- 若作为纯文本出现但未写成 `[[]]` → 缺链
- 高频共现但无互链的概念 / 实体对 → 列出

### 5. Data gaps

- Glob `wiki/**/*.md` 扫 frontmatter
- `sources: []` 或缺失 → 缺来源
- index.md 某分区为空 → 覆盖度缺失
- raw/ 下有但 summaries/ 下无对应文件 → 未 ingest 的 raw

---

## 产出

写 `wiki/lint-reports/<today>.md`：

```markdown
---
title: Lint Report <today>
type: synthesis
created: <today>
last_updated: <today>
status: stable
---

# Lint Report <today>

## Contradictions (N)
- [[page-x]]:line — <矛盾说法>

## Stale claims (N)
- [[page-y]]:last_updated=<old>

## Orphan pages (N)
- [[page-z]]

## Missing cross-references (N)
- [[page-a]] ↔ [[page-b]]（共现 N 次，未互链）

## Data gaps (N)
- [[page-c]] sources 为空
- index.md `## Events` 分区为空

## 建议新建的页面
- <concept>：频繁被提及但无独立页

## 建议合并 / 拆分
- [[page-d]] 过长，建议拆为 …
```

append log.md：

```markdown
## [<today>] lint | <scope>
- 涉及页面: wiki/lint-reports/<today>.md
- 关键改动: 发现 N 个问题（X 矛盾 / Y 孤儿 / Z 过时）
- 后续动作: 待人工裁决
```

## 报告给用户

一句话总结：数量 + 最紧迫的 1~2 个问题 + 指向 lint report 文件路径。

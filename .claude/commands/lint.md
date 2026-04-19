# /lint

全库体检。对应 Karpathy "代码检查器"角色。

**用法**：`/lint` 或 `/lint <scope>`
**参数**：`$ARGUMENTS` = 可选 scope，如 `wiki/concepts`（留空则扫全库）

---

## 0. 工具约定（2026-04-20 追加）

### 0A. `Bash + rg --no-ignore` 绕过 `.gitignore`

`.gitignore` 已把 wiki 内容层（`wiki/summaries/` / `entities/` / `concepts/` / `syntheses/` / `decisions/` / `raw/journal/`）全部 ignore（"激进私有化"，见 git commit `10b8b70`，2026-04-19）。ripgrep 默认遵守 `.gitignore`，而 Claude Code 的 `Grep` 工具**无 `--no-ignore` 参数**：

- 用 `Grep` 工具扫 wiki → **扫不到 wiki 主体 → lint 结果全面错误**（误报整库孤儿、漏报所有 dangling、Conflict callout 全部看不到）
- **本命令下所有扫描示例中的 `Grep ...`，执行时必须替换为 `Bash + rg --no-ignore ...`**

示范命令：

```bash
# Conflict + 待验证
rg --no-ignore -n '\[!warning\] Conflict|待验证' wiki/ log.md

# 所有 wikilink targets（去重）——用于 dangling 统计
rg --no-ignore -oN '\[\[[^\]|#]+' wiki/ | sed 's/^.*\[\[//' | sort -u

# Frontmatter last_updated
rg --no-ignore -n '^last_updated:' wiki/

# UNVERIFIED 计数
rg --no-ignore -c 'UNVERIFIED' wiki/
```

若未来 `.gitignore` 调整（例如公开 wiki 内容），本约定可撤销。

### 0B. 占位符 wikilink 禁令

禁止在 wiki 内写 `[[journal-*]]` / `[[project-*]]` 等 glob 伪装 wikilink——它们既非合法 target 也非模板占位，会伪装成合法 wikilink 通过 lint，但 Obsidian 实际无法解析。

"未来某篇 / 某事件" 的引用 **必须用纯文本**：

```diff
- [[journal-*]] 做一次中期评估
+ 未来某篇 journal（届时回填具体日期）做一次中期评估
```

真正要 wikilink 时再回填具体 target。

首次踩坑：2026-04-20 lint §4b，`wiki/entities/qmd.md:54`（本次 /ingest 疏忽产生）。

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

### 4. Missing cross-references / Dangling wikilinks

**两类问题必须分开对待**：

#### 4a. 缺互链（页面**存在**，但被纯文本提及）

- 对每个概念页标题，Grep 它在其他页面的出现
- 若作为纯文本出现但未写成 `[[]]` → 候选缺链
- 高频共现但无互链的概念 / 实体对 → 列出

#### 4b. Dangling wikilinks（链接指向**不存在**的页面）

- 收集所有 `[[<name>]]` 的唯一 name 集合
- 对每个 name：Glob 检查 `wiki/**/*.md` 是否存在对应文件
- 不存在 → dangling

**对每个 dangling，产出三路候选解法**，**不得**机械推荐"建新页"：

| 情况 | 解法 |
|------|------|
| 已有页已覆盖此概念 | **重定向** `[[target\|display]]` → `[[existing-page\|display]]` |
| 已有页部分覆盖 | **扩写**该页的相关 section，删 dangling 引用 |
| 完全新概念，已有页无法扩写 | **建新页** |

**硬约束**：报告里 dangling 每条必须附**候选覆盖页**（若有），让人判断取舍。不要一看见 dangling 就写"建议新建"。

**另一条硬约束（占位符识别）**：若 dangling target 形如 `journal-*` / `project-*` / `page-*` 等 glob 伪装写法，**直接归为"改为纯文本"一路**（见 §0B 占位符 wikilink 禁令），不走重定向/扩写/建页三路。

参考案例：
- [[obsidian-as-ide-redirect]]（2026-04-18 首次 lint 的 dangling 处理决策，三路解法起源）
- 2026-04-20 lint `[[journal-*]]` → 纯文本（占位符识别首例）

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

## Missing cross-references / Dangling wikilinks

### 缺互链 (N1) — 页面存在但纯文本提及
- [[page-a]] ↔ [[page-b]]（共现 N 次，未互链）

### Dangling wikilinks (N2) — 链接指向不存在的页面
- `[[target-x]]`：N 处引用；**候选覆盖页**：[[existing-y]]（差不多覆盖 / 部分覆盖 / 无）
  - 推荐解法：重定向 / 扩写 / 建页
  - 需人工判断，**不自动建页**

## Data gaps (N)
- [[page-c]] sources 为空
- index.md `## Events` 分区为空

## 建议新建的页面（仅当 dangling + 无覆盖候选 + 确属新概念）
- <concept>：N 处 dangling 引用；已有页无法覆盖；建议新建

**注意**：不得把所有"频繁被提及但无独立页"一概推荐建页——见 §4b 三路解法，默认应先查重定向 / 扩写。

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

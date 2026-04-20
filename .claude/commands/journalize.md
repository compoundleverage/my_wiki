# /journalize

新建今日 `raw/journal/YYYY-MM-DD.md`，承接昨日未完成代办 + 昨日 `## 明天` 清单，并给出建议 + 一个启发性问题。

**用法**：`/journalize`（无参数；日期从 `date +%Y-%m-%d` 取）

---

## 执行步骤

### 1. 锚定今日

Bash: `date +%Y-%m-%d` → `<today>`

若 `raw/journal/<today>.md` 已存在：**不覆盖**（Authored raw 允许增量 mutation，但"新建"动作对已存在文件视为 overwrite → 禁）。

- 报告："今日 journal 已存在：`raw/journal/<today>.md`"
- 读该文件，跳过 §2-§4，直接走 §5/§6/§7（仅重算建议与问题）

### 2. 找昨日 journal

Bash: `ls raw/journal/ | sort | tail -n 1` → `<last>`

- 若空（库存首次）：跳过 §3；§4 用无 carry-over 模板；在 §7 告知"首篇"
- 若 `<last>` 不是昨天（有断档）：仍以 `<last>` 为承接源；在 §7 标注"断档 N 天"

### 3. 抽取代办传承清单

读 `raw/journal/<last>.md`，合并两部分：

- **`## 明天`** 分区所有条目（若分区缺失，跳过）
- **`## 代办`** 中所有顶层 `- [ ]` 行（未勾）：
  - 若父项 `[x]`，整块 sub-items 跳过（父勾即子勾）
  - 保留原始文本（含 Dataview inline field `[due:: ...] [priority:: ...]`）

合并去重：按文本精确匹配（skill 不做 NLP 归并；词形不同由用户手动合并）。

得到 `carry_todos[]`。

### 4. 写今日 journal

用 Write 创建 `raw/journal/<today>.md`，模板：

```yaml
---
source_url: self
fetched_at: <today>
fetch_method: direct-writing
author: will
platform: journal
---

# <today>

## 代办
<每条 carry_todos，前缀 "- [ ] "，每行一条>

## 问题

## 经验

## 状态

## 想法

## 明天
```

**不自动填**：问题 / 经验 / 状态 / 想法 / 明天——这些是 Authored raw 的第一方内容，skill 不代笔。

### 5. 生成建议（3~5 条）

基于 wiki 当前状态 + 昨日 journal，按以下维度扫：

**a. Touch-count ≥ 3 升级候选**

对 `carry_todos` 每条关键词：

```bash
grep -l "<关键词>" raw/journal/*.md | wc -l
```

若 ≥ 3 → 列为"升级到 `wiki/projects/<slug>.md` 候选"（CLAUDE.md TODO 升级规则）。**只提示，不自动升级**——人类决策。

**b. 未 ingest 的 journal**

若昨日 journal 未进 wiki（`grep -c "## \[.*ingest.*journal-<yesterday>" log.md` = 0）：

- 建议"今日先 `/ingest raw/journal/<last>.md` 做连锁"

**c. Stale project 扫**

读 `wiki/index.md` `## Projects`；对每个 `status: active` 的 project：

- 读子页 `last_updated`；若 < `<today> - 3` → 提示"stale project 检查"

**d. Stale TODO 警告**

若某 `carry_todos` 条目 touch-count ≥ 5 仍未完成 → 提示"是否降级或主动放弃"（反 procrastination）

**e. 昨日"经验/想法/问题"的 wiki 覆盖缺口**

对昨日这三分区的核心名词，Grep `wiki/**/*.md`：

- 若 0 命中 → 建议建新 concept/entity 页（但由下一次 /ingest 触发，不手动建）

### 6. 启发性问题（1 个）

基于（昨日 `## 状态` / `## 想法` / `## 经验`）+（wiki `## Concepts` 近 7 天新增）+（log.md 近 3 条）生成 **恰好 1 个**。

设计原则：

- **不泛泛**："你今天想做什么"这种废问题禁止
- **钩住具体张力**：昨日表达的矛盾 / 未决疑问 / 跃迁时刻
- **暗含下一步动作**：问题本身指向一个可执行方向
- **少即是多**：一个好问题 > 五个平庸问题

### 7. 报告

输出给用户（非写入文件）：

```
✅ raw/journal/<today>.md 已建
   - 承接 <N> 条代办（昨日"明天" <M> + 未完成代办 <K>，去重后 <N>）
   - [若断档] 昨日断档 <D> 天（上次 journal = <last>）

💡 建议（3~5 条）：
   1. [升级候选] <TODO 文本> — touch-count=X ≥ 3，建议升级到 wiki/projects/<slug>.md
   2. [ingest] 昨日 journal 尚未入 wiki，建议 /ingest raw/journal/<last>.md
   3. ...

❓ 启发性问题：
   <one specific, high-leverage question>
```

若今日 journal 已存在（§1 分叉）：报告改为 "今日已有 journal → 跳过新建，直接给建议和问题"。

---

## 设计原则

- **不 append log.md**：journal 创建是 raw/ 层日常动作，不是 wiki 工作流。log.md verb 列表（`ingest | query | lint | file-back | init | refactor`）不新增 `journalize` verb，保持 log 纯度。**真正的 wiki 层演进在 `/ingest raw/journal/<date>.md` 触发时才入 log.md**。
- **代笔边界**：skill 仅生成 `## 代办` 骨架；其他分区留空由用户手写。CLAUDE.md "Authored raw 禁事后改 substance" 的精神反推：也禁 skill 代替用户写"当天 substance"。
- **不自动升级 project**：touch-count ≥ 3 是触发 _建议_ 的阈值，升级动作由用户执行（建 `wiki/projects/<slug>.md` + 回填 wikilink + index.md + log.md refactor entry）。
- **无参数**：日期自动取今日；跨日补写用 `/journalize --date YYYY-MM-DD`（未实现，首版不做）。

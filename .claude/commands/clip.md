# /clip

抓取一个 URL 的内容 → 存到 `raw/` 作为新的 immutable source。`/ingest` 的前置工具。

**用法**：`/clip <url> [slug]`
**参数**：
- `$ARGUMENTS` 第一段 = URL（必须以 `http://` 或 `https://` 开头）
- `$ARGUMENTS` 第二段 = 可选 slug（文件名 stem，不带扩展名；省略时自动生成）

---

## 设计原则（dogfood [[purpose-built-tooling]]）

`/clip` 是 thin + fast + narrow 工具：
- 单一职责：URL → raw/ 文件（verbatim 内容 + provenance frontmatter）
- **绝不**做内容总结 / 提取 / 分析（那是 `/ingest` 的事）
- **绝不**修改已存在的 raw/ 文件
- 失败时失败显式，不静默截断

## 与 CLAUDE.md raw/ 规则的关系（Gap-2 说明）

当前 CLAUDE.md 写 "AI 绝不能 Write / Edit raw/"——**字面上 /clip 违反此规则**。本工具在用户授权下 Write 新文件到 raw/，并用以下 skill-level 护栏保证源头纯洁性：

1. **Write-only-new**：遇到同名文件就换 slug；绝不覆盖已存在 raw 文件
2. **Verbatim content**：抓到什么存什么，除了 frontmatter 不添一字
3. **Mandatory provenance**：每个新文件必带 `source_url` / `fetched_at` / `fetch_method`，可审计

Gap-2 正式决议（是否改 CLAUDE.md 让文字与行为一致）待后续独立讨论。在此之前 /clip 按本 spec 运作，记录每次实际写入到 log.md。

---

## 执行步骤

### 1. 参数校验

- 从 `$ARGUMENTS` 解析 URL + 可选 slug
- URL 必须以 `http://` 或 `https://` 开头；否则拒绝执行
- 若未提供 slug，按"来源规则"自动生成（见 §2）

### 2. 抓取（fetch priority，依次尝试直到成功）

优先级顺序经测试定；第 4 级永不失败（用户粘贴）。

| 级 | 方式 | 适用 |
|----|------|------|
| 1 | 识别 GitHub gist / repo URL → `gh gist view <id>` 或 `curl` 到 raw URL | GitHub 内容，最干净 |
| 2 | WebFetch | 静态 HTML / 公开文档 / PDF |
| 3 | `$B goto <url>` + `$B text` 提取正文（gstack browse 渲染 JS） | SPA、复杂前端 |
| 4 | AskUserQuestion 请用户粘贴 | 登录墙 / 反爬 / 纯图片 |

每级失败时必须打印失败原因再降级，不静默切换。

### 3. 自动 slug（未指定时）

按以下规则生成：

- **GitHub gist**（URL 形如 `gist.github.com/<user>/<id>`）→ `<user>-<title-kebab>.md`。title 从 gist 内容 H1 提取，无则用 short id
- **GitHub 文件**（`github.com/<user>/<repo>/blob/<ref>/<path>`）→ `<user>-<repo>-<basename-kebab>.md`
- **X / Twitter**（`x.com/<handle>/status/<id>`）→ `<handle>-tweet-<short-title>.md`。short-title 从前 30 字取 kebab-case；拿不到用短 id
- **通用 URL** → 尝试 `<title>` 从 HTML `<title>` tag；fallback 为 domain + path kebab
- 冲突：若 slug 已存在于 raw/，追加 `-YYYY-MM-DD` 后缀

### 4. 写入 raw/

Write 到 `raw/<slug>.md`，必带以下 frontmatter：

```yaml
---
source_url: <原始 URL>
fetched_at: <today YYYY-MM-DD>
author: <已知作者，未知用 [UNKNOWN]>
platform: <github-gist | github-repo | x.com | web | ...>
fetch_method: <gh-cli | curl | webfetch | gstack-browse | user-paste>
note: <可选 1 行备注，如 "原文 verbatim，仅 frontmatter 为元数据">
---
```

之后直接放抓取到的正文 verbatim，**不做任何编辑**。

### 5. 更新 log.md

append：

```markdown
## [<today>] clip | <slug>
- 涉及页面: raw/<slug>.md
- 关键改动: URL <shortened-url> 抓取成功（fetch_method=<method>）
- 后续动作: 可运行 /ingest raw/<slug>.md 进入知识网络
```

### 6. 报告

给用户一句话：
- `raw/<slug>.md` 创建完成，N 行 / M KB
- 建议：`/ingest raw/<slug>.md`

---

## 失败处理

| 场景 | 行动 |
|------|------|
| URL 无法抓到任何内容 | 返回 BLOCKED，列出 4 级尝试各自失败原因 |
| Slug 已存在 | 自动追加日期后缀；告知用户新 slug |
| frontmatter 不完整（author 未知等） | 标 `[UNKNOWN]`，不阻塞 |
| 内容过大（> 1MB） | 暂停，AskUserQuestion 确认是否继续 |

## 不做的事

- ❌ 摘要 / 要点提取（那是 /ingest）
- ❌ 更新 index.md（那是 /ingest）
- ❌ 修改已存在 raw 文件（护栏一）
- ❌ 写入 wiki/ 任何路径

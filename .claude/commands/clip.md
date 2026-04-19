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

**关于 markitdown 的 verbatim 边界**：markitdown 是结构化转码（PDF / DOCX / PPTX 等 → Markdown），输出非字节级 verbatim，但属于"无编辑性转录"——只做格式转换，不增删 substance。本工具视其输出为 verbatim，不做后续修改。frontmatter 标注 `fetch_method: markitdown` 留审计痕。**注**：YouTube 字幕已从 markitdown 路径移除（实测 0.1.5 缺 cookies 支持，YouTube `/api/timedtext` 拒裸请求 → 拿到 footer HTML），改走 yt-dlp（见 §2 第 2 级）。

**关于 yt-dlp 的 verbatim 边界**：yt-dlp 输出 YouTube 字幕原始 .srt（手动 + auto-generated 多语言）。auto-generated caption 是 rolling 格式（每帧累积重复），**clip.md 阶段视 .srt 为 verbatim 底证、不去重**；去重交给 /ingest 派生 .md sidecar。frontmatter 标注 `fetch_method: yt-dlp`。

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

优先级顺序经测试定；第 6 级永不失败（用户粘贴）。

| 级 | 方式 | 适用 |
|----|------|------|
| 1 | 识别 GitHub gist / repo URL → `gh gist view <id>` 或 `curl` 到 raw URL | GitHub 内容，最干净 |
| 2 | `yt-dlp ...`（cookies + proxy + 字幕，详见下方） | YouTube 视频字幕 |
| 3 | `markitdown <url> > raw/<slug>.md` | 指向 `.pdf` `.docx` `.pptx` `.xlsx` `.epub` 等结构化二进制的 URL |
| 4 | WebFetch | 静态 HTML / 公开文档 |
| 5 | `$B goto <url>` + `$B text` 提取正文（gstack browse 渲染 JS） | SPA、复杂前端 |
| 6 | AskUserQuestion 请用户粘贴 | 登录墙 / 反爬 / 纯图片 |

每级失败时必须打印失败原因再降级，不静默切换。

**第 2 级触发条件**（match 即用 yt-dlp）：

- URL host ∈ `youtube.com` / `youtu.be` / `m.youtube.com`

**前置一次性安装**（首次跑前）：

```bash
pipx install yt-dlp
pipx inject yt-dlp certifi   # macOS pipx venv 缺 CA bundle，否则 SSL 验证失败
```

**命令模板**（slug 由 §3 生成）：

```bash
cd raw && yt-dlp \
  --proxy http://127.0.0.1:7890 \
  --cookies-from-browser chrome \
  --skip-download --ignore-no-formats-error \
  --write-subs --write-auto-subs \
  --sub-langs 'en,zh.*,en-US' \
  --convert-subs srt \
  -o "<slug>.%(ext)s" \
  <youtube-url>
```

输出多个 `raw/<slug>.<lang>.srt`（每语言一个）。

**例外约定**：clip.md 通常承诺 "1 raw = 1 .md"，YouTube 例外——多语言字幕作为多个 .srt 进 raw/，并写一个 `raw/<slug>.md` index 文件含 frontmatter + `subtitle_files: [<slug>.en.srt, ...]` 字段。CLAUDE.md "raw/*.md" 规则的字面冲突已在 Gap-2 决议范围内（与 markitdown 二进制 sidecar 同性质）。

**字幕去重**：YouTube auto-caption 是 rolling 格式（每帧累积重复），clip.md **不**做去重；保留 .srt verbatim 作底证，去重交给 /ingest 派生 .md sidecar。去重 helper 暂未写——首次真 ingest YouTube 时实现并固化到 `.claude/commands/ingest.md`。

**proxy 端口**：模板写死 7890（用户 Clash 默认）。端口不同时从 `env | grep https_proxy` 取代。

**前置依赖**：依赖系统级 HTTP/HTTPS proxy 在 `https_proxy` env 中（中国大陆环境必需）；用户 Chrome 已登录 YouTube（cookies 取自 chrome keychain）。

yt-dlp 失败时（exit code ≠ 0）打印 stderr 再降级到第 4 级（webfetch 视频页 HTML 仅拿 metadata，无 transcript）。

**第 3 级触发条件**（match 任一即用 markitdown，不进 WebFetch）：

- URL path 以 `.pdf` / `.docx` / `.pptx` / `.xlsx` / `.xls` / `.epub` / `.mp3` / `.wav` 结尾
- 或用户在 `$ARGUMENTS` 显式加 `--via=markitdown`

markitdown 失败时（exit code ≠ 0）打印 stderr 再降级到第 4 级。

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
fetch_method: <gh-cli | yt-dlp | markitdown | curl | webfetch | gstack-browse | user-paste>
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

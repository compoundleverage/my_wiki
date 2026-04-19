# Evolution Log

时间序 append-only 记录。最新记录在最下方。

格式：`## [YYYY-MM-DD] <verb> | <one-line-summary>`
verb ∈ `ingest | query | lint | file-back | init | refactor`

---

## [2026-04-18] init | project bootstrap
- 涉及页面: CLAUDE.md, .claude/commands/*.md, index.md
- 关键改动: 按 Karpathy 蓝图初始化三层架构（raw/ + wiki/ + schema）和四动词 slash commands（ingest / query / lint / file-back）
- 后续动作: 把第一篇资料放入 raw/ 后运行 /ingest

## [2026-04-18] ingest | Karpathy-Skills CLAUDE.md (forrestchang)
- 涉及页面: wiki/summaries/karpathy-skills-claude-md.md, wiki/concepts/{think-before-coding,simplicity-first,surgical-changes,goal-driven-execution}.md, wiki/entities/forrestchang.md, index.md
- 关键改动: 首次 ingest；wiki 库存为空，仅建 6 个新页（1 summary + 4 concepts + 1 entity），未达 Karpathy 预期的 10~15 连锁（符合 CLAUDE.md 明示的"库存空"例外）
- 后续动作: 未来 ingest 更多 LLM-behavior 类素材时，复用这 4 个 concepts 作为连锁锚点；可随时 /lint 验证完整性

## [2026-04-18] clip | karpathy-llm-wiki-gist
- 涉及页面: raw/karpathy-llm-wiki-gist.md
- 关键改动: Karpathy 原始 gist 抓取成功（fetch_method=curl via raw URL；gh cli 遇 502 降级）；新 /clip skill 首次投入使用
- 后续动作: /ingest raw/karpathy-llm-wiki-gist.md

## [2026-04-18] ingest | Garry Tan "Thin Harness, Fat Skills"
- 涉及页面: wiki/summaries/garry-tan-thin-harness-fat-skills.md, wiki/concepts/{thin-harness-fat-skills,harness,skill-as-method-call,resolver-context-routing,latent-vs-deterministic,diarization,context-bloat,purpose-built-tooling,skill-as-permanent-upgrade}.md, wiki/entities/{garry-tan,steve-yegge,anthropic,claude-code,yc}.md, wiki/syntheses/anthropic-claude-code-source-leak-2026-03-31.md, 更新 wiki/concepts/{think-before-coding,simplicity-first,surgical-changes,goal-driven-execution}.md + wiki/summaries/karpathy-skills-claude-md.md, index.md
- 关键改动: 第二次 ingest。新建 17 页（1 summary + 9 concepts + 5 entities + 1 synthesis）+ 更新 5 页 + 导航 2 页 = 24 处变动。**首次触发 10~15 连锁硬约束并超额达成**。4 处 forrestchang × Tan 的交叉引用网络。发现产品规范缺口：/ingest 不接 URL；raw/ 写入权规则过严；x.com 抓取未规范
- 后续动作: 写测试报告 output/test-reports/ingest-v1-2026-04-18.md；讨论是否实施 /clip 命令（RFC B）；待验证 Anthropic 泄漏事件详情、Steve Yegge 10x-100x 原始出处

## [2026-04-18] refactor | Gap-1 实施 + Gap-2 执行
- 涉及页面: .claude/commands/clip.md（新）, .claude/commands/ingest.md（加 URL 识别）, CLAUDE.md（raw/ 规则松绑至"内容不可变"原意）
- 关键改动: 新增 /clip skill (purpose-built URL→raw/)；/ingest 自动识别 URL 参数；CLAUDE.md raw/ 规则从"禁 Write/Edit"改为"禁 Edit 已存在文件、授权下可 Write 新文件 with provenance"——与 Karpathy 原意 "never modifies them" 对齐
- 后续动作: 第 3 次 ingest 验证新流程

## [2026-04-18] ingest | Andrej Karpathy "LLM Wiki" Gist
- 涉及页面: 新建 wiki/summaries/karpathy-llm-wiki-gist.md, wiki/concepts/{persistent-wiki-vs-rag,knowledge-compilation}.md, wiki/entities/{andrej-karpathy,vannevar-bush,qmd,tolkien-gateway}.md, wiki/syntheses/memex-to-llm-wiki.md；更新 wiki/concepts/{thin-harness-fat-skills,diarization,skill-as-permanent-upgrade,resolver-context-routing}.md + wiki/summaries/karpathy-skills-claude-md.md; index.md
- 关键改动: 第 3 次 ingest。通过新 /ingest URL 流程走通（URL→/clip→raw→ingest 链路首次端到端）。8 新页 + 5 更新 + 2 导航 = 15 处变动，正落 10~15 区间。发现决定性证据：Karpathy 原文 "never modifies them" 不是 "never writes"——CLAUDE.md 原规则比原意严，本次已对齐。溯源链闭环：forrestchang（实施层）← Tan（架构层）← Karpathy（范式层），三者无冲突、纯强化
- 后续动作: 更新 output/test-reports/ingest-v1-2026-04-18.md 为 v2（含 Gap-2 实施记录 + 第 3 次观察）；若需求再涨可实施 qmd 集成 / skill 改名为 ingest-v2

## [2026-04-18] lint | 首次全库体检
- 涉及页面: wiki/lint-reports/2026-04-18.md（新建）
- 关键改动: 0 冲突 / 0 孤儿 / 0 stale；发现 2 个小问题（[[file-back]] 引用应改为 [[/file-back]]；[[obsidian-as-ide]] 有 3 处引用但页未建）；17+ UNVERIFIED 正常跟踪。建立健康 baseline
- 后续动作: P0 修 file-back 引用格式；P1 建 obsidian-as-ide 概念页；P2 按需 ingest forrestchang README / Karpathy 教育资料 / Bush 1945 原文

## [2026-04-18] refactor | Lint 发现修复（file-back 引用 + obsidian-as-ide 重定向）
- 涉及页面: wiki/concepts/{persistent-wiki-vs-rag,diarization,knowledge-compilation}.md, wiki/summaries/karpathy-llm-wiki-gist.md, .claude/commands/lint.md
- 关键改动: 2 处 `[[file-back]]` → `[[/file-back]]` 格式统一；3 处 `[[obsidian-as-ide]]` 重定向到 [[knowledge-compilation]]（决策见 [[obsidian-as-ide-redirect]]）；更新 lint.md §4 增加 dangling wikilink 三路解法（重定向/扩写/建页），硬约束不机械推荐建页
- 后续动作: 下次 lint 应验证 dangling wikilinks = 0

## [2026-04-18] file-back | obsidian-as-ide-redirect 决策记录
- 涉及页面: wiki/decisions/obsidian-as-ide-redirect.md（新建），Backlinks 补到 [[knowledge-compilation]] [[karpathy-llm-wiki-gist]] [[persistent-wiki-vs-rag]]；index.md 新增 ## Decisions 分区
- 关键改动: 把用户追问触发的"是否建 obsidian-as-ide 页"决策固化为 ADR 风格决策页；核心结论"lint 是 bookkeeping，取舍是 human asking"；本次是 /lint → 用户追问 → /file-back 三动作协作的首个实例
- 后续动作: 未来 dangling 类问题都走此链路

## [2026-04-18] refactor | 新增日记层（方案 A：入 raw/）
- 涉及页面: raw/journal/2026-04-18.md（新建）, log.md
- 关键改动: 把日记定位为"自生一手素材"纳入 raw/（`source_url: self` / `fetch_method: direct-writing` / `platform: journal`），不破坏三层架构、守住"内容不可变"铁律；首条 entry 含使用规则 comment 作为以后 entries 的参考模板
- 后续动作: 写完当天日记后跑 `/ingest raw/journal/2026-04-18.md` 做首次"日记→wiki"连锁；长期使用后可观察是否需要 journal 专用 concept 页（例如记录日记→wiki 的抽取规则）

## [2026-04-19] ingest | Journal 2026-04-18（首次"日记→wiki"连锁）
- 涉及页面: 新建 wiki/summaries/journal-2026-04-18.md, wiki/entities/{my-wiki,hermes-agent,notebooklm}.md, wiki/concepts/{compound-interest-tool,ai-six-properties}.md；更新 wiki/concepts/{persistent-wiki-vs-rag,latent-vs-deterministic}.md, index.md
- 关键改动: 第 4 次 ingest，首次日记→wiki 连锁。6 新页 + 2 更新 + 2 导航 = 10 处变动，正中 Karpathy 10~15 区间下限。关键发现：(1) 用户自创 AI 六特性第 3 条直接内化 [[latent-vs-deterministic]]——证明日记层不止情绪 dump，是第一方知识生成源；(2) 用户对 [[persistent-wiki-vs-rag]] 的扩张性质疑作为 open question 入库（引入 [[notebooklm]] 对照基线），不是冲突是边界探测
- 后续动作: 追踪 [[ai-six-properties]] v2+ 演化（后续日记是否修正）；[[my-wiki]] 体量增长后做 vs NotebookLM 的响应时间实测；[[hermes-agent]] stub 待真正学习后补全

## [2026-04-19] lint | 全库体检（ingest 后）
- 涉及页面: wiki/lint-reports/2026-04-19.md（新建）
- 关键改动: 0 冲突 / 0 孤儿 / 0 stale / 0 dangling wikilinks；48 UNVERIFIED（上次 17，+31 主要来自新 stub 页 hermes-agent + notebooklm，密度健康）；发现 2 处缺反向互链（[[compound-interest-tool]] → [[skill-as-permanent-upgrade]] / [[persistent-wiki-vs-rag]] 均已单向引用但目标页未补反向），是本次 ingest 漏做的 P1 修复项
- 后续动作: P1 修反向互链（2 Edit，~1 min）；发现 lint 工具层缺陷（`^sources:\s*$` 正则误判 YAML list-form；slash command 引用约定需排除）已记入 lint-reports/2026-04-19 §10，未来 /lint 优化参考

## [2026-04-19] refactor | Lint P1 修复：补反向互链
- 涉及页面: wiki/concepts/skill-as-permanent-upgrade.md, wiki/concepts/persistent-wiki-vs-rag.md
- 关键改动: 两页"相关概念"节各补一行 [[compound-interest-tool]] 反向链接；skill-as-permanent-upgrade.md frontmatter 追加 journal-2026-04-18 为 source + 更新 last_updated=2026-04-19；**三层同构链（个人 / 知识 / 架构）现在双向闭合**，本次 ingest 实际连锁 = 10 + 2 = 12 处（仍在 10~15 区间）
- 后续动作: 下次 /lint 应验证 §4a 缺反向互链 = 0

## [2026-04-19] refactor | 项目改名 my_wiki + 集成 markitdown / QMD（Phase 1，本会话内非破坏部分）
- 涉及页面: CLAUDE.md, .claude/commands/{clip,ingest,query}.md
- 关键改动: (1) CLAUDE.md H1 标题 `# 个人 LLM Wiki — 首席维护者` → `# my_wiki`（line 3 角色描述未动，"首席维护者"用词后续可再清理）；(2) clip.md fetch priority 表新增 markitdown 作为第 2 级——YouTube URL / 直接指向 .pdf .docx .pptx .xlsx .epub 等结构化二进制 URL 优先走 markitdown，pushed WebFetch / gstack-browse / user-paste 各下一级；frontmatter `fetch_method` enum 加 `markitdown`；§设计原则补 markitdown verbatim 边界说明；(3) ingest.md 新增 §1.5 二进制→MD 边车前置——raw/ 下若是 .pdf .docx .pptx 等，先 markitdown 转 .md sidecar（带 derived_from / derived_via / derived_at frontmatter），后续 §2 Read 走 .md，原始二进制保留作底证；(4) query.md §1 锚定步骤拆为 §1a QMD 混合检索（`qmd query --files --json`）+ §1b index.md/aliases 锚定 + §1c 合并去重——QMD 抓语义关联，index.md 抓显式实体，QMD 失败优雅降级
- 后续动作: 待用户确认 Phase 2 destructive ops（mv `llm_wiki` → `my_wiki` + mv Claude 项目记忆目录）；Phase 3 新会话内 `pipx install 'markitdown[all]'` + `bun install -g @tobilu/qmd` + `qmd collection add ./wiki --name wiki && qmd embed` + 端到端 smoke test；CLAUDE.md line 3 "首席维护者"措辞按用户偏好后续再清理

## [2026-04-19] refactor | TODO/Calendar/Metadata 架构决策 + 基础设施
- 涉及页面: CLAUDE.md, .obsidian/daily-notes.json, wiki/templates/daily-note.md（新）, wiki/bases/journal-calendar.base（新）, index.md
- 关键改动: 按 `~/.claude/plans/calendar-elegant-sonnet.md` 执行——(1) CLAUDE.md 加 "TODO / 笔记 升级规则"（两层架构 + touch-count 触发 + Dataview inline field）；(2) raw/ 拆 Ingested raw（严格不可变）vs Authored raw（journal 允许勾箱/修错别字但禁 substance 重写）；(3) frontmatter schema 加 `type: project` 含 status/next_action/deadline/started；(4) Calendar 用内置 Bases 不装社区插件；(5) index.md 加 ## Projects 分区（当前为空）；(6) 新建 daily-note 模板 + journal-calendar.base
- 后续动作: 用户在 Obsidian 确认 Settings → Core plugins → Daily Notes 已指向 raw/journal/ + format=YYYY-MM-DD + template=wiki/templates/daily-note；确认 Obsidian ≥ 1.9 能打开 .base 文件；首个 TODO 升级发生时 dogfood touch-count 工作流

## [2026-04-19] refactor | markitdown / QMD 集成（Phase 3 — 装 + 验证）
- 涉及页面: log.md, ~/.claude/projects/-Users-liutong-Admin-Journey-to-AI-my-wiki/{MEMORY.md, memory/youtube-parsing-limitation.md}（新）
- 关键改动: (1) `pipx install markitdown[all]` ✅ v0.1.5；(2) `bun install -g @tobilu/qmd` ❌ node-llama-cpp tarball IntegrityCheckFailed → 改 `npm install -g @tobilu/qmd` ✅ v0.9.0；(3) 清理 bun 残留 `~/.bun/bin/qmd` symlink + `~/node_modules/`（266MB 失败装的依赖摊在用户家根目录，bun 全局 store 异常行为）；(4) `qmd collection add ./wiki --name wiki` indexed 40 → `qmd embed` 68 chunks / 5s（首次下 embeddinggemma-300M-Q8_0 313MB / 14min）；(5) Smoke tests：`vsearch` ✅ 但 scores 集中 0.56-0.59（embeddinggemma 区分度有限）；`query` ✅ **reranker 加持后质变**——top hit `obsidian-as-ide-redirect.md` 0.91 vs #2 0.50（gap 0.41，reranker 真识别相关性），首次需下 `qmd-query-expansion-1.7B-q4_k_m` 1.2GB；markitdown PDF/DOCX 推迟（用户决定有真实文档时再测）；markitdown YouTube ❌ 实测拿到 footer HTML（cookie 墙），用户认知锚定后已记 memory
- 后续动作: clip.md §第 2 级触发条件需修正——YouTube 不应进 markitdown 优先路径（实测失败率高），降级到第 3 级或加显式 caveat；`/query` 命令实际执行时优先用 `qmd query --files`（reranker 加持），`vsearch` 仅作 fallback；下次有 PDF/DOCX 时补 markitdown 那侧 smoke test

## [2026-04-20] refactor | YouTube ingest 工具链调通（yt-dlp 替代 markitdown）+ clip.md 校准
- 涉及页面: .claude/commands/clip.md, ~/.claude/projects/-Users-liutong-Admin-Journey-to-AI-my-wiki/{MEMORY.md, memory/youtube-parsing-limitation.md}（重写）
- 关键改动: (1) 装 `pipx install yt-dlp` v2026.3.17（brew 走 ghcr.io 被网络拦改用 pipx）+ `pipx inject yt-dlp certifi` 解决 macOS pipx venv 缺 CA bundle 导致的 SSL 验证失败；(2) 实测 yt-dlp 配方成功——`--proxy http://127.0.0.1:7890 --cookies-from-browser chrome --skip-download --ignore-no-formats-error --write-subs --write-auto-subs --sub-langs 'en,zh.*,en-US' --convert-subs srt`，三种字幕（en + zh-Hans + zh-Hant）齐下 ~800KB；(3) 关键诊断洞察——markitdown 0.1.5 失败的真因不是"YouTube 解析行业短板"（之前 memory 错判），而是缺 cookies 支持；YouTube `/api/timedtext` 现在拒裸请求；同时验证 markitdown 加显式 `HTTPS_PROXY` env 重测仍同样失败，说明 cookies 才是瓶颈、proxy 是次要因素；(4) clip.md 5 处修订：fetch priority 5 级 → 6 级（YouTube 单独成第 2 级、markitdown 下推到第 3 级）、新增 yt-dlp 命令模板 + 前置一次性安装 + 字幕去重交 ingest 的例外约定 + proxy 端口约定、frontmatter `fetch_method` enum 加 `yt-dlp`、§设计原则补 yt-dlp verbatim 边界 + markitdown YouTube 移除注释；(5) memory 重写：`youtube-parsing-limitation.md` type 从 feedback → reference，内容从"行业短板悲观判断" → 工具配方 + 认知校准（前一次 memory 错在哪）
- 后续动作: 字幕去重 helper 待写（首次真 ingest YouTube 时实现并固化到 ingest.md）；下次有 PDF/DOCX 时补 markitdown 那侧 smoke test（仍欠）；考虑把 proxy/SSL 这类 macOS pipx + 中国大陆环境坑做一条 reference memory，避免装新 Python 工具时重踩

## [2026-04-20] ingest | journal-2026-04-19（第 2 篇"日记→wiki"连锁）
- 涉及页面: 新建 wiki/summaries/journal-2026-04-19.md, wiki/entities/{mempalace,screenstudio,clicky}.md；更新 wiki/entities/{my-wiki,hermes-agent,qmd}.md, wiki/concepts/compound-interest-tool.md, index.md
- 关键改动: 第 5 次 ingest，第 2 篇日记连锁。4 新页（1 summary + 3 entity stub）+ 4 更新 + 2 导航 = **10 处变动，再次正中 Karpathy 10~15 区间下限**。关键发现：(1) [[compound-interest-tool]] 第 2 次第一方背书（"AI 发展正反馈十足 + 每天都可以取得实质性进步" 绑定 "日拱一卒"），证明是稳定底层信念而非一次灵感；(2) [[qmd]] 状态从"未集成"翻转到"已集成（2026-04-19）"——用户主动早于 Karpathy 建议的规模阈值接入，[[compound-interest-tool]] 原则的激进执行实例，22 页规模即接入；(3) [[hermes-agent]] touch-count=2（4-18/4-19 连续 tomorrow-tail），未达 ≥3 升级阈值，按新 TODO 升级规则继续 inline；(4) "AI 陪伴工具"方向成型：[[hermes-agent]]（执行层）+ [[mempalace]]（沉浸感层）两个 building block 建立；(5) "朋友对 terminal 的恐惧"：用户选择暂不抽象 concept，等更多 journal 观察累积（avoid 过早抽象）；(6) touch-count 机制首次试运行：Hermes Agent / Auto Research / Claude Code 4.6 泄漏 / 神经递质四联均 touch=2，机制按预期工作
- 后续动作: 3 个 stub（mempalace/screenstudio/clicky）待亲测或 `/clip <GitHub README URL>` 后补全；[[qmd]] 实装后累积 10~20 次 /query 反馈做中期评估；若 Hermes Agent / Auto Research / Claude Code 4.6 / 神经递质 / Harness Engineering 任一再出现一次即触发 ≥3 升级 project；可 `/lint` 验证本次连锁完整性

## [2026-04-20] lint | 全库体检（第 2 次日记 ingest 后）
- 涉及页面: wiki/lint-reports/2026-04-20.md（新建）
- 关键改动: 0 contradictions / 0 stale / 0 orphans（严格 orphan=0；[[tolkien-gateway]] 仅 index 入链的"弱孤儿"状态延续，非可操作问题）/ 0 empty sources / **1 dangling wikilink** —— `wiki/entities/qmd.md:54` 的 `[[journal-*]]` 是本次 ingest 时写的占位符表述，非合法 wikilink；三路解法指向"改为纯文本"，P1 修法 1 Edit；UNVERIFIED 47（上次 48，-1，稳定），新增 8（mempalace 2 + screenstudio 3 + clicky 3）/ 消减约 9；[[journal-2026-04-19]] 入链 8 页 × 互联健康；上次 lint 的 P1（补反向互链）确认已完结（见 `[2026-04-19] refactor | Lint P1 修复`）
- 后续动作: **P1 修 §4b `[[journal-*]]` dangling**（qmd.md:54 改纯文本，30s）；方法论记录：.gitignore 激进私有化后 Grep 工具无法穿透，lint 扫描全部改用 Bash + rg --no-ignore，建议把此约定写入 lint.md §工具约定小节；占位符 wikilink（`[[journal-*]]`）是 ingest 新陷阱，下次写"未来某篇"时应显式用纯文本

## [2026-04-20] refactor | Lint P1 修复：占位符 wikilink
- 涉及页面: wiki/entities/qmd.md
- 关键改动: `wiki/entities/qmd.md:54` `[[journal-*]]` → `未来某篇 journal（届时回填具体日期）`（1 Edit）；dangling 归零
- 后续动作: 下次 /lint 应验证 dangling = 0；考虑把"lint 必须用 rg --no-ignore 绕过 .gitignore"和"禁用占位符 wikilink（如 [[journal-*]]）"两条约定写入 .claude/commands/lint.md（当前仅 lint-report §10 方法论记录，未固化到命令规范）

## [2026-04-20] refactor | lint.md 固化两条约定（§0 工具约定）
- 涉及页面: .claude/commands/lint.md
- 关键改动: 新增 §0 工具约定小节——§0A "`Bash + rg --no-ignore` 绕过 .gitignore"（附 Conflict / wikilink targets / last_updated / UNVERIFIED 四条示范命令，说明 Grep 工具在 .gitignore 激进私有化后不可用的根因与影响）+ §0B "占位符 wikilink 禁令"（`[[journal-*]]` 等 glob 伪装 wikilink 改为纯文本，首次踩坑引用 qmd.md:54）；§4b Dangling 区新增一条硬约束"占位符识别直接走改纯文本一路，不走三路解法"；把 2026-04-20 lint 方法论记录升级为命令规范
- 后续动作: 下次 /lint 应完整按 §0 执行；若 .gitignore 未来调整（公开 wiki 内容），§0A 可撤销；§0B 永久保留


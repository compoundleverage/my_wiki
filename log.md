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


## [2026-04-20] clip | feel-good-hormones Harvard 5 篇
- 涉及页面: raw/{feel-good-hormones-how-they-affect-your-mind-mood-and-body, dopamine-the-pathway-to-pleasure, serotonin-the-natural-mood-booster, endorphins-the-brains-natural-pain-reliever, oxytocin-the-love-hormone}.md（5 新）
- 关键改动: 1 次 /ingest 批量 clip 5 个 URL（主文 + 4 子链接）；全部 fetch_method=webfetch；主文 frontmatter `series:` 列出同批 5 个 slug 建立横向关联；4 子文件 frontmatter `series_parent:` 反向指向主文
- 后续动作: 本次为 /ingest 前置；见下一条 ingest 日志

## [2026-04-20] ingest | Harvard Feel-Good Hormones 系列（首个神经科学主题）
- 涉及页面: 新建 wiki/summaries/feel-good-hormones-series.md, wiki/concepts/{dopamine,serotonin,endorphins,oxytocin,neurotransmitter,runners-high,exercise-as-hormone-trigger}.md, wiki/comparisons/four-feel-good-hormones.md；更新 index.md
- 关键改动: **9 新页 + 1 导航 = 10 处变动，落在 Karpathy 10~15 连锁区间**。首次引入神经科学 / wellness 主题区，与现有 AI / 知识工程区独立无冲突；comparison 页直接对应 journal TODO "多巴胺 vs 内啡肽 vs 血清素 vs 催产素"；[[exercise-as-hormone-trigger]] 反向引用 [[compound-interest-tool]]——运动作为"同动作多收益"的身体复利典型，把激素主题和 wiki 现有核心原则打通；反直觉洞察三条（纯蛋白反降 serotonin / oxytocin 正反馈 / endorphin=endogenous morphine 命名机制）落入 summary §三条非显然洞察
- 后续动作: 用户可勾 journal TODO "多巴胺 vs 内啡肽 vs 血清素 vs 催产素" 为 -[x]（wiki 覆盖后 TODO 满足）；可运行 /lint 扫连锁完整性（预期 dangling=0、9 新页反向引用健康）；未来 Hermes Agent / Auto Research / Claude Code 4.6 泄漏 / Harness Engineering 若再出现一次 journal 即触达 touch-count=3 升级阈值

## [2026-04-20] lint | Run 2（Harvard feel-good hormones ingest 后）
- 涉及页面: wiki/lint-reports/2026-04-20.md（追加 Run 2 section）
- 关键改动: 0 矛盾 / 0 stale / 0 孤儿 / 0 新 dangling / 0 data gap；9 新页每页实质入链 ≥4，枢纽（comparison/summary）各 8 入链；Run 1 P1（`[[journal-*]]`）确认已修；UNVERIFIED 从 9 新页引入 = 0
- 后续动作: 无 P1/P2；clean pass

## [2026-04-20] clip | Harvard dopamine-fasting + quitting-addiction 2 篇
- 涉及页面: raw/dopamine-fasting-maladaptive-fad.md, raw/five-action-steps-for-quitting-an-addiction.md（2 新）
- 关键改动: 跟进 dopamine.md 中埋的 2 个外部深挖链接；fetch_method=webfetch；Grinspoon 是哈佛医学院内部医生（科学辟谣源头可信）；5 步戒瘾是 Harvard Health Publishing 官方指南
- 后续动作: 本次为 /ingest 前置；见下一条 ingest 日志

## [2026-04-20] ingest | dopamine 暗面深挖（辟谣 + 恢复路径）
- 涉及页面: 新建 wiki/summaries/{dopamine-fasting-grinspoon,five-action-steps-quitting-addiction}.md, wiki/concepts/{dopamine-fasting,addiction-recovery}.md；更新 wiki/concepts/dopamine.md（+辟谣小节 +恢复路径 +2 sources）, index.md（+4 条）
- 关键改动: **4 新页 + 1 更新 + 1 导航 = 6 处变动**（Karpathy 10~15 区间下端；因主题深度收窄而非广度；深挖本身就是"扩张单一节点"的模式）。关键建构：(1) [[dopamine-fasting]] 辟谣后把"dopamine fast"正名为 Sepah CBT-based 数字排毒，和 [[compound-interest-tool]] 形成**减法复利 vs 加法复利**一对（未独立建页，留作未来主题）；(2) [[addiction-recovery]] 5 步框架显式映射 [[dopamine]] 强化回路的 cue-response-reward 三环节，3 步打断、2 步 meta-cognitive；(3) [[dopamine-fasting]] ↔ [[addiction-recovery]] 定位为"预防版 vs 重建版"——同一回路不同严重度的干预；(4) dopamine.md 现在除了"奖赏-强化"正面，也补上"成瘾暗面 + 辟谣流行误读 + 恢复路径"三侧完整三角
- 后续动作: 可运行 /lint 扫新 4 页反向互链 + dopamine.md 被重链入度变化；Sepah LinkedIn 原文、DSM-5 行为成瘾诊断边界、Overcoming Addiction Special Health Report 是未来可选深挖节点；用户原可选"环境设计=负复利"独立 concept 页暂跳过，待主题累积到 3 处以上再抽取

## [2026-04-20] refactor | 引入 status:draft review 工作流 + Obsidian 圆点可视化
- 涉及页面: .obsidian/snippets/draft-indicator.css（新）；CLAUDE.md（+status review 工作流段落）；.claude/commands/ingest.md（§4 status 规则汇总）；13 新页回溯 stable → draft（今日 Harvard 系列 + dopamine 深挖）
- 关键改动: 新建页默认 `status: draft` 变成硬约束，review 工作流正式固化——人类亲自打开 / 确认 → 改 stable → Obsidian File Explorer 左侧蓝圆点自动消失。依赖：Supercharged Links 社区插件监听 `status` 字段（用户一次性装 + 配置）。`status` 增量更新规则也明确："已存在页保持原值，不回退到 draft"避免 review 过的内容被 /ingest 二次降级。13 页回溯覆盖：9 Harvard feel-good-hormones + 4 dopamine 深挖
- 后续动作: 用户装 Supercharged Links 插件 + 启用 snippet（具体步骤见 draft-indicator.css 顶部注释）；CLAUDE.md 的 status 段可能还要延伸到 /file-back 命令（当前 ingest.md 已写，file-back.md 待查）；/lint 未来应加一条"检查 stable 页是否所有 wikilink 指向的目标也都 stable"（draft ↔ stable 边界检测，目前是 nice-to-have）

## [2026-04-20] refactor | 拆分 status / reviewed + 修 tags YAML 语法 bug
- 涉及页面: 13 新页 frontmatter（今日 Harvard 9 + dopamine 深挖 4）；.obsidian/snippets/draft-indicator.css（重写）；CLAUDE.md（frontmatter schema §）；.claude/commands/ingest.md（§4）
- 关键改动: (1) **Bug 修复** — 13 页 `tags: [#foo #bar]` 是无效 YAML（`#` 是注释符→`[` 不闭合→整个 frontmatter 被 Obsidian 拒绝→作为 body 文本显示，用户截图暴露）。改为 `tags: [foo, bar]` 规范格式，与 `wiki/concepts/think-before-coding.md:5` 现有约定对齐。同步修 `runners-high.md` aliases 里 `runner's high` 的单引号（`"runner's high"` 防御性加双引号）。(2) **字段拆分** — 原先把 `status: draft` 双重语义化（既表示"内容成熟度"又表示"待 review"）是字段挤压错误。拆为两个正交字段：`status` 保留原义（内容成熟度，draft/stable/deprecated），新增 `reviewed: true|false`（人类 review 门控）。13 页回滚到 `status: stable`（Harvard 权威源自评合理）+ `reviewed: false`（等你亲自过目）。(3) **CSS snippet 改目标** — 从 `[data-link-status="draft"]` 改为 `[data-link-reviewed="false"]`；Supercharged Links 配置从 watch `status` 改为 watch `reviewed`。(4) **Spec 固化** — CLAUDE.md 加两字段对比表 + 为什么分开的解释 + tags YAML 硬约束段；ingest.md §4 加 frontmatter 规则汇总表 + tags 禁 `#` 硬约束
- 后续动作: 用户在 Obsidian 端重装/重配 Supercharged Links（managed attribute 改 `reviewed`）；review 完 13 页后手动改 `reviewed: true`；未来 /ingest / /file-back 的新页会自动带 `reviewed: false`；/file-back.md 可能也需要同步更新 frontmatter 规则（待查）；/lint 未来加一条"unreviewed 页数"作为健康指标（draft 不再是 review 信号，需要另外统计）

## [2026-04-20] refactor | review UX v2：自研最小插件 + last_reviewed 日期字段 + legacy 回溯
- 涉及页面: .obsidian/plugins/review-dot/{manifest.json,main.js}（新，~54 行）；.obsidian/snippets/draft-indicator.css（重写：三态）；54 wiki .md 页 frontmatter（13 新页 reviewed:false→last_reviewed:null；41 legacy 页 +last_reviewed:2026-04-20）；CLAUDE.md frontmatter schema §；.claude/commands/ingest.md §4
- 关键改动: (1) **字段 v2** — `reviewed: true/false` 升级为 `last_reviewed: YYYY-MM-DD | null` 日期字段。好处：日期和 last_updated 直接可比，自动生成三态（fresh/stale/ok）无需显式 enum；plugin 消失后 `grep 'last_reviewed:' wiki/` 仍有可读信息；未来"超过 N 天未 review 提醒"可直接用。(2) **放弃 Supercharged Links** — 功能重、95% 能力浪费、配置复杂。改为自研 `review-dot` 插件：~54 行纯 JS，只做一件事（读 frontmatter 两个日期 → 写 data-review 属性），DOM 改由 CSS snippet 画点。总代码量（插件+snippet）< 100 行，全部可审计。(3) **三态** — fresh 🔵（last_reviewed=null）/ stale 🟡（last_reviewed < last_updated）/ ok 无点。/ingest 增量更新已存在页时只刷 last_updated，保持 last_reviewed 不变 → 自动触发 stale 态提醒 re-review，规则简洁。(4) **Legacy 回溯用 Option B** — 用户确认"我确实也 review 过了"，41 个 legacy wiki 页统一加 `last_reviewed: 2026-04-20`；今日 13 新页 `last_reviewed: null` 等待 review。(5) **Spec 固化** — CLAUDE.md 重写 "两个正交字段" 段（加 "为什么用日期不用布尔" 子段）；ingest.md §4 规则表加 `last_updated` 列
- 后续动作: 用户启用 Obsidian Community plugins 开关 + 启用 Review Dot 插件 + 刷新 CSS snippets 勾选 draft-indicator（三步）；verify：今日 13 新页应现 🔵，41 legacy 页应无点；review 13 新页后手动改 `last_reviewed: 2026-04-20` → 点消失；.claude/commands/file-back.md 需同步（file-back 新建页也应带 last_reviewed: null）——待下次 /file-back 时检查；/lint 未来加"fresh 页数 + stale 页数"健康指标（替代之前考虑的 "unreviewed 页数"）

## [2026-04-21] refactor | Review Dot v0.2.0：一键 mark-reviewed 热键
- 涉及页面: .obsidian/plugins/review-dot/{main.js,manifest.json}, CLAUDE.md
- 关键改动: 插件升级 0.1.0 → 0.2.0，新增 "Mark current file as reviewed" 命令（默认热键 `Cmd/Ctrl + Shift + R`）。实现：`this.addCommand` + `app.fileManager.processFrontMatter()` 就地改写 active file 的 `last_reviewed` 为 today（本地时区，非 UTC，避开晚间跨日偏差）；已有 `metadataCache.on('changed')` 监听会自动重算 data-review → 蓝/黄点瞬时消失，无需 UI 刷新。保护栏：无 active md 文件或缺 `last_reviewed` 字段时只弹 Notice 不写文件（避免给 raw/ 或无 frontmatter 页意外加字段）。为什么选热键而非"滑到底自动 review"：scroll 触发会把 review 语义从"人类验证内容"稀释到"DOM 从眼前过一遍"，且短页永远滚不到底 / 开页瞬触发两头都坏；热键保住 intentionality，成本同样一键。CLAUDE.md 工作流约束段落补上两种改法并存（a 热键 / b 手动编辑）
- 后续动作: 用户在 Obsidian 端 reload 插件（Settings → Community plugins → Review Dot 关→开）或重启 app 让新命令生效；首次触发前可去 Settings → Hotkeys 搜 "Mark current file as reviewed" 确认热键未冲突（Cmd+Shift+R 默认空闲，若被其他插件占用可重绑）；热键在 journal / raw/ 文件上按会走"缺 last_reviewed 字段→Notice 跳过"保护路径，符合 raw/ 不可变约束

## [2026-04-21] clip | hermes-agent-vs-openclaw
- 涉及页面: raw/hermes-agent-vs-openclaw.md, raw/hermes-agent-vs-openclaw.zh-Hans.srt (+ zh-Hans-zh-Hans, zh-Hant-zh-Hans srt 变体)
- 关键改动: YouTube 视频（Best Partners TV / 大飞，18:18，2026-04-17 上传）字幕抓取成功（fetch_method=yt-dlp，cookies-from-browser chrome，proxy 7890）。3 个 .srt 作 verbatim 底证（zh-Hans 为 uploader 上传原版，其余是简繁自动翻译变体，内容基本一致）；写一个 .md index 文件汇总元数据与 subtitle_files 清单
- 后续动作: 继续 /ingest raw/hermes-agent-vs-openclaw.md 进入 Takeaway 对齐 + 连锁扫描

## [2026-04-21] clip | nousresearch-hermes-agent-readme + openclaw-openclaw-readme
- 涉及页面: raw/nousresearch-hermes-agent-readme.md, raw/openclaw-openclaw-readme.md
- 关键改动: 官方 README 两份各自抓成 raw/ 文件（curl raw.githubusercontent.com，verbatim；fetch_method=curl）。目的：对 2026-04-17 最佳拍档视频 /ingest 的结论做**二次校验**。Hermes v0.9.0 / 194 行；OpenClaw（Peter Steinberger 创建，MIT，Node.js 24 产品）/ 492 行。WebSearch 先定位两个官方仓库 URL
- 后续动作: 增量 /ingest 两份 README → 修正视频转述不精确处 + 补官方新细节

## [2026-04-21] ingest | Hermes Agent vs OpenClaw（最佳拍档 2026-04-17）
- 涉及页面: 新建 wiki/summaries/hermes-vs-openclaw.md, wiki/entities/{openclaw,nous-research}.md, wiki/concepts/{procedural-knowledge,tiered-memory-architecture}.md, wiki/syntheses/hermes-openclaw-vs-my-wiki-design.md；更新 wiki/entities/hermes-agent.md（stub → 详细页），wiki/concepts/{thin-harness-fat-skills,skill-as-method-call,skill-as-permanent-upgrade,knowledge-compilation}.md（+ 连锁片段）；导航 index.md（+3 entity +2 concept +1 source +1 synthesis line）
- 关键改动: 第 4 次正式 /ingest。新建 6 页 + 更新 5 页 + 2 导航 = **13 处变动**，落在 Karpathy 10-15 硬约束内。**关键发现**：raw/garry-tan-thin-harness-fat-skills.md:144 明确写 "I tweeted an instruction I gave to **my OpenClaw**..."—— Tan 本人是 OpenClaw 深度用户，"Tan 的 OpenClaw 规则"就是他给自己 OpenClaw 实例的指令，这条规则的推文发布时间与本次视频（2026-04-17）在同一窗口——视频里"OpenClaw 过去半年定义了赛道"的市场印象由 Tan 使用行为和推文流量侧面印证。Hermes Agent 从 stub 一跃成为 wiki 中细节最丰富的 agent 页之一（~200 行）。建 synthesis 做"Hermes/OpenClaw 运行时 agent vs 本 wiki knowledge base"自反对照：记忆分层、skills 沉淀、身份锚定三项都呈同构——三个独立系统到达相同结构不变量，佐证 Karpathy file-over-app 原理的底层必然性
- 后续动作: (1) Hermes Agent / OpenClaw 官方源 /ingest 做二次校验（当前仅 1 条二手媒体源，summary status=draft）；(2) EvoMap 抄袭事件原始资料 /ingest；(3) user 亲自 review 6 个新 page 后把 last_reviewed 改今天 → 蓝点消失；(4) /lint 验证新 concept（procedural-knowledge / tiered-memory-architecture）是否被 synthesis + hermes-agent 正确回链

## [2026-04-21] ingest | karpathy/autoresearch（Karpathy 2026-03 新作，75k stars）
- 涉及页面: 新建 wiki/summaries/karpathy-autoresearch.md + wiki/entities/{autoresearch,nanochat}.md + wiki/concepts/autonomous-research-loop.md；更新 wiki/entities/andrej-karpathy.md + wiki/concepts/{simplicity-first,skill-as-method-call,thin-harness-fat-skills,procedural-knowledge}.md；导航 index.md +3 entity/concept/source
- 关键改动: 第 5 次正式 /ingest。新建 4 页 + 更新 5 页 + 导航 2 = **11 处变动**，落在 Karpathy 10-15 硬约束内。**3 个关键发现**：(1) **Karpathy 亲口用 "skill" 称呼 program.md** —— README §Running "The `program.md` file is essentially a super lightweight 'skill'"——三个独立作者（Tan / Hermes-Nous / Karpathy）收敛到同一 "skill = markdown method spec" 定义；(2) **simplicity-first 被 Karpathy 升级为 agent runtime rule** —— program.md §Simplicity criterion 把 forrestchang/Tan 的人类代码规范**编码进 AI agent 执行约束**，从"人类审查"跨越到"agent 内置"；(3) **autonomous-research-loop 提炼为独立 concept** —— modify / 5min train / keep-discard / NEVER STOP pattern 可迁移到其他单指标驱动场景（/lint 自动修、文档测试自动化、prompt 优化）。用户 journal-2026-04-18/19/20 连续 3 日 TODO "学习 Auto Research" **首次实质启动**（touch-count=3 阈值达成）。视频题材机会：journal-2026-04-21 §想法提到 "1.Skill 内容视频 2.Karpathy 知识库动态"，autoresearch 是两题材交点
- 后续动作: (1) 若深入，可 /ingest nanochat 父项目 README；(2) 可 /ingest autoresearch 的 analysis.ipynb 看实验 log 分析方式；(3) autonomous-research-loop pattern 可能应用到本 wiki 的 /lint 自动修或 skill 自动优化（探索性）；(4) "NEVER STOP" agent 设计 pattern 对比本 wiki 的 /lint / /ingest 交互式流程——反方向参考

## [2026-04-21] query | autoresearch 5min time budget 可不可改 → file-back concept
- 涉及页面: 读 [[autoresearch]] / [[autonomous-research-loop]] / [[karpathy-autoresearch]] + raw/karpathy-autoresearch-program.md §What you CANNOT do + raw/karpathy-autoresearch-readme.md §Design choices §Platform support；新建 wiki/concepts/agent-vs-human-editable-surface.md；导航 index.md +1 Concept
- 关键改动: /query 澄清 "agent 不能改 / human 可以改"两层边界：time budget 存 prepare.py（agent read-only，program.md §CANNOT 明文禁），但 human 可改（Karpathy §Platform support 建议小算力 fork 时调参）。5 min 在 autoresearch 定义内是 **invariant 不是 variable**——若 agent 能改会 trivial 作弊（延长 training → val_bpb 降）。Simplicity criterion 依赖 time budget 固定才有意义。**File Back 为 concept**：`agent-vs-human-editable-surface.md` 提炼四层分配表（基准/实验/规则/轨迹）作为 skill spec 设计的普适原则，对比 autoresearch / Hermes / OpenClaw / 本 wiki 四种实施方式；发现本 wiki 与 autoresearch **同构**——raw/=prepare.py / wiki/=train.py / CLAUDE.md+commands=program.md / log.md=results.tsv
- 后续动作: (1) 若走 ADR 梯度 2（MLX fork），需先读 prepare.py 源码找 time budget constant 的准确变量名；(2) [[autonomous-research-loop]] §1 可增量补"agent vs human 可改性"两层区分（建议 review 时手动加，避免重建 concept）；(3) [[journal-2026-04-21]] §想法 "知识输出 project" 若启动，应先画 editable surface 分配表

## [2026-04-21] query | autoresearch 对我是否用不到（H100 要求）→ file-back ADR
- 涉及页面: 读 [[autoresearch]] / [[karpathy-autoresearch]] / [[autonomous-research-loop]] + raw/karpathy-autoresearch-readme.md § Quick start / § Platform support / § Notable forks；新建 wiki/decisions/autoresearch-on-mac.md；导航 index.md +1 Decision
- 关键改动: /query 澄清"H100 要求 ≠ 用不到"——三层答案：(1) 官方原版确要 NVIDIA H100；(2) 但有 4 个 forks 覆盖 MacOS / MLX / Win RTX / AMD，trevin-creator/autoresearch-mlx 对用户 Mac 最适用；(3) 学习价值独立于运行（program.md 作 skill 样板、autonomous-research-loop 可迁移、simplicity-first 升级为 runtime rule 等），本 wiki 9 节点 ingest 已捕获核心 insights。file-back 为 ADR：**默认走梯度 1**（只读 wiki 反哺 slash commands 设计，零额外成本 + 符合 compound-interest-tool 复利原则），梯度 2（MLX fork 跑一晚）/ 梯度 3（租 H100 $16-24/night）作 future pivots；列了 4 条重评触发条件（视频题材需 live demo / 研究主题转向 / 非金钱获取 H100 路径 / MLX fork 易用性提升）
- 后续动作: (1) 明日 journal §代办 可移除 "学习 Auto Research"（已实质完成）；(2) ADR status=draft，用户 review 后可升 accepted 或调整梯度选择；(3) [[autonomous-research-loop]] pattern 迁移到本 wiki /lint 自动修 / prompt 优化 是独立 project 候选

## [2026-04-21] clip | karpathy-autoresearch（README + program.md）
- 涉及页面: raw/karpathy-autoresearch-readme.md, raw/karpathy-autoresearch-program.md
- 关键改动: Karpathy 2026-03-06 发布的新 repo `github.com/karpathy/autoresearch`（75k stars / 10.9k forks，MIT），通过 GitHub API + curl 抓取两个核心 markdown 文件（README 8KB / program.md 7KB）到 raw/。`master` branch（非 main），首次 curl main 404 是分支名差异。**核心发现**：program.md 开篇直接自称 **"super lightweight skill"**——Karpathy 亲自用"skill"一词标识自己的文件，与本 wiki 已 ingest 的 Tan/Forrest/Hermes skills 生态**无缝对接**。产品思路"研究员不动 Python，只编程 program.md"是 thin-harness/fat-skills 在科研场景的原生实施
- 后续动作: 继续 /ingest 两文件进入 wiki 知识网络，新建 autoresearch entity + autonomous-research-loop concept + 连锁 simplicity-first / skill-as-method-call 等

## [2026-04-21] ingest | journal-2026-04-20（第 3 篇"日记→wiki"连锁，Day 3 日记）
- 涉及页面: 新建 wiki/summaries/journal-2026-04-20.md + wiki/entities/review-dot-plugin.md；更新 wiki/concepts/{compound-interest-tool,skill-as-permanent-upgrade,exercise-as-hormone-trigger}.md + wiki/entities/{hermes-agent,my-wiki,openclaw}.md + wiki/summaries/hermes-vs-openclaw.md；index.md +1 entity +1 source
- 关键改动: 11 处变动，落在 Karpathy 10-15 硬约束内。**3 个关键发现**：(1) 痛点→落地 < 24h 闭环实证——§想法 "my_wiki 无法标识 review 状态...能否插件解决" → 当日即实施 review-dot 插件，次日 v0.2.0 加热键。Build-review-dot-plugin entity 页记录原始需求 → 三态设计 → 版本迭代。(2) **用户独立到达 Tan "OpenClaw 规则"** —— §经验原话"每当发现 agent 犯错，需要总结出来反馈给工程系统让他不再犯"与 Tan "asked twice = failed" 语义等价。日记时用户未必回顾过 Tan 页——独立到达 > 受影响产生，verifies LLM 协作工作流必然结构。加 backlink 到 skill-as-permanent-upgrade。(3) **复利工具原则第 3 次背书**——不是 speech 而是"工具落地 + 篮球 + Harvard 学习"三路径同时发生。已从灵感过渡到默认节奏。**工作流技巧 feedback**（写入 memory）：查过往活动优先 `rg '^## \[.*\] ingest' log.md`，别扫 wiki 反推
- 后续动作: (1) **Harness Engineering** touch-count 达 3（4-18/4-19/4-20），若 4-21 再提可升 `wiki/projects/harness-engineering.md`；(2) **Hermes Agent 陪伴工具** touch-count 达 3 但仍未 project 化，次日 Hermes 视频 ingest 回答了"怎么安全运行"但"具体陪伴产品形态"仍缺；(3) review-dot 插件的 "发到社媒" TODO touch-count=1，观察是否再次出现；(4) /lint 验证连锁 + 人工 review 2 个新页

## [2026-04-21] lint | journal-2026-04-20 ingest 后增量验证（v2）
- 涉及页面: wiki/lint-reports/2026-04-21-v2.md（新）; wiki/summaries/journal-2026-04-20.md（修 1 dangling）
- 关键改动: Day 3 日记 ingest 后 lint v2。**整体健康优秀**：0 活跃矛盾 / 0 孤儿（62 页全部有 backlink）/ 1 dangling（已修）/ 0 stale / 0 data gap。唯一 dangling —— `wiki/summaries/journal-2026-04-20.md:33` 写了 `[[journal-2026-04-21]]` forward reference（今日 journal 尚未 ingest，按 T+1 节奏应 2026-04-22 做），按 §0B 占位符禁令改为纯文本"未来 journal"。**自反教训**：写 journal summary 易诱发"forward reference"陷阱，下次 journal ingest 前自查"任何指向尚未存在的 journal wikilink 应改纯文本"
- 后续动作: 继续 /ingest 深挖 hermes/openclaw docs 子页可销 6 条 [UNVERIFIED]；Harness Engineering / Hermes 陪伴工具 两 TODO touch-count 已达 3 阈值，下次提及时可 project 化

## [2026-04-21] lint | 全库（Hermes/OpenClaw 两次 ingest 后验证连锁）
- 涉及页面: wiki/lint-reports/2026-04-21.md, wiki/summaries/hermes-vs-openclaw.md（修 1 处 dangling）
- 关键改动: 两次 /ingest（视频 + 官方 README 二次校验）后全库体检。**整体健康优秀**：0 活跃矛盾 / 0 孤儿 / 1 活跃 dangling（已修）/ 0 stale / 0 data gap / index.md 六分区全满（19 entity + 28 concept + 9 source + 3 event + 1 decision）。**唯一引入的 bug** —— wiki/summaries/hermes-vs-openclaw.md:106 写成 `[[synthesis | hermes-openclaw-vs-my-wiki-design]]`（alias pipe 两侧误加空格 → Obsidian 解析为 target=`synthesis ` + alias=xxx），已就地修为 `[[hermes-openclaw-vs-my-wiki-design|自反对照 synthesis]]`。连锁验证：6 新页形成六边形互引 + 与 4 个已有 concept 跨区连接，密度极高。20+ 处 UNVERIFIED 标记全部是 tracking 结构（非活跃冲突），其中 hermes-vs-openclaw 占 6 条待下次深入 docs/ 子页验证
- 后续动作: (1) 自反规则固化——下次 /ingest 写 alias wikilink 前自查 "[[target|alias]]" 紧凑无空格；(2) UNVERIFIED 治理方案：想消 hermes-vs-openclaw 的 6 条，可 /ingest docs.hermes-agent.nousresearch.com 子页（security/memory/cron）+ docs.openclaw.ai 子页（gateway/security/sandboxing），把具体参数（1300 token / 60s 轮询 / 5 层安全栈）落地

## [2026-04-21] ingest | Hermes/OpenClaw 官方 README 二次校验
- 涉及页面: wiki/entities/{hermes-agent,openclaw,nous-research}.md（增量补官方细节 + 修正视频误述 + status draft→stable）；wiki/summaries/hermes-vs-openclaw.md（加"视频 vs 官方交叉校验"13 行对照表 + status draft→stable）；index.md 不变（entity/concept 已列，无新页）
- 关键改动: 官方源二次校验，发现 **3 处视频表述需修正**：(1) **Gateway 定位** —— 视频称"绝对控制中枢"，官方 README 明说 "the Gateway is just the control plane — the product is the assistant"；Gateway 只是 sessions/channels/tools/events 的 control plane；(2) **OpenClaw 安全评价** —— 视频称"早期争议多权限不受限隔离弱"，官方实际有 DM pairing（陌生人配对码）+ sandbox 架构（Docker/SSH/OpenShell backends + default deny list），准确表述应为"main session 默认全权符合单用户 local-first，non-main 默认 sandbox"；(3) **OpenClaw 工作区文件** —— 视频将 SOUL/AGENTS/USER/TOOLS/HEARTBEAT/MEMORY.md 说成"并列存在"，官方 injected prompt files 仅 3 个（AGENTS.md/SOUL.md/TOOLS.md），MEMORY+USER 存在但不注入，HEARTBEAT 未在 README 出现。**另发现官方丰富信息**：OpenClaw 创建者 Peter Steinberger (steipete) + Molty 龙虾 AI 原型、MIT、Node.js 24 runtime（非 Python）、ClawHub (clawhub.com) skills registry（与 Hermes 的 agentskills.io 不同！视频把二者混）、Live Canvas + A2UI、Voice Wake + Talk Mode（ElevenLabs）、25+ channels（视频只列 5-6）、OpenAI/GitHub/NVIDIA/Vercel sponsor、社区项目 HermesClaw 允许同一微信账号同时跑 Hermes+OpenClaw；Hermes v0.9.0、6 terminal backends（+Daytona/Singularity/Modal serverless）、Email channel、Android via Termux、Honcho by plastic-labs、Tinker-Atropos RL、相关项 hermes-agent-self-evolution ICLR 2026 Oral。**工作流输出**：此为本 wiki 首次"视频 → 官方源"完整工作流走通——新标准：视频素材先 draft，官方源交叉后升 stable；summary 加"视频 vs 官方"对照表作审计痕
- 后续动作: (1) 用户 review 4 个增量页；(2) 想深入 Hermes 可按需 /ingest `docs.hermes-agent.nousresearch.com` 的 security/memory/cron/skills 子页（尤其验证 1300 token / 60s 轮询 / 5 层安全等具体参数）；(3) 想深入 OpenClaw 可 /ingest `docs.openclaw.ai` 的 gateway/security/sandboxing 页；(4) Hermes 研究线可单独抽一条做 synthesis：Nous 的 DisTrO + WorldSim/Doomscroll + Hermes 4 + Tinker-Atropos 的串接

## [2026-04-22] clip | langchain-anatomy-of-agent-harness
- 涉及页面: raw/langchain-anatomy-of-agent-harness.md
- 关键改动: LangChain 官方博客长文 Vivek Trivedy《The Anatomy of an Agent Harness》（2026-03-10 发布）抓取成功（fetch_method=webfetch）；verbatim 全文 + frontmatter provenance；内容涵盖 harness 定义（Agent = Model + Harness）、9 个核心 harness primitives（filesystem / bash / sandbox / memory & search / context rot battling / ralph loops / planning & self-verification 等）、model-harness co-training 反馈循环、未来方向三条开放问题
- 后续动作: 继续 /ingest raw/langchain-anatomy-of-agent-harness.md 进入 Takeaway 对齐 + 连锁扫描（强预期与 [[thin-harness-fat-skills]] / [[harness]] / [[hermes-agent]] / [[openclaw]] / [[ralph-loop]]（待建）/ [[autonomous-research-loop]] / [[skill-as-method-call]] / [[knowledge-compilation]] 等节点强连锁）

## [2026-04-22] ingest | LangChain "The Anatomy of an Agent Harness"（harness 议题系统化首源）
- 涉及页面: 新建 wiki/summaries/langchain-anatomy-of-agent-harness.md + wiki/concepts/{ralph-loop,context-rot}.md + wiki/entities/{langchain,vivek-trivedy}.md；更新 wiki/concepts/{harness,thin-harness-fat-skills,context-bloat,autonomous-research-loop,procedural-knowledge,tiered-memory-architecture}.md + wiki/entities/claude-code.md + wiki/syntheses/hermes-openclaw-vs-my-wiki-design.md；index.md +5 条（2 entity + 2 concept + 1 source）
- 关键改动: 第 6 次正式 /ingest，Day 5 首次 ingest。**5 新页 + 8 更新 + 2 导航 = 15 处变动，正中 Karpathy 10-15 连锁硬约束上限**。预筛 40+ → 20 → 13 处变动（N→N'→M）。**3 个关键发现**：(1) **三独立来源 harness 框架收敛** —— [[garry-tan|Tan]] 经验主义 + [[andrej-karpathy|Karpathy]] 极简主义 + [[vivek-trivedy|Trivedy]] 系统化三视角在 "Agent = Model + Harness / harness ≠ 智能 / 持久化+可验证最关键" 三点收敛；(2) **Ralph Loop 作为 NEVER STOP 的 hook 层兜底** —— Karpathy prompt 层指令（skill spec 求自律）+ Trivedy hook 层强制（harness 拦 exit）是同问题的两层回答，二者并用最稳；(3) **Context Rot 给 [[context-bloat]] 一个超类** —— Tan context-bloat 是"写坏"反模式，Trivedy context-rot 是"装不下"物理现象；3 机制（compaction / tool-offloading / progressive disclosure）成为本 wiki 第一次系统化捕获的 harness-level context 管理框架。**工程价值**：本 wiki 不 ship 自己 harness（外包给 Claude Code），但 Trivedy 9 primitives 清单给"选 harness"提供打分维度——`hermes-openclaw-vs-my-wiki-design.md` 第 4 透镜节把 Hermes/OpenClaw/my_wiki 按 primitive 覆盖度对比，解决了原 synthesis 末尾"本 wiki 的 harness 是谁"的未闭环问题。**Model-harness 共进化**的反向洞察：Claude Code 被 Anthropic 联合 post-train 导致 Opus 4.6 对 Claude Code 特定行为 overfit——这反而让**本 wiki 场景（grep md / edit md / bash / slash command 路由）正好落在 overfit 的 sweet spot**，Terminal Bench 2.0 上 Opus 4.6 在别的 harness 得分更高的现象对本 wiki 反向有利
- 后续动作: (1) 用户 review 5 个新页 + 8 个更新页，改 last_reviewed 让蓝点消失；(2) 可 WebSearch `langchain deepagents github` / `ralph loop origin` / `codex-5.3 apply_patch prompting guide` 消减 4 条 [UNVERIFIED]；(3) 可 /ingest `langchain-ai/deepagents` README 深入 harness 库实施细节；(4) Trivedy 结尾 3 个 open problem（百 agent 并行 / self-trace 分析 / JIT tool+context 装配）可作未来 research 方向跟踪；(5) /lint 验证本次 13 处新/更新页反向链健康（预期 dangling=0）

## [2026-04-22] ingest | journal-2026-04-21（Day 4 日记，第 4 篇"日记→wiki"连锁）
- 涉及页面: 新建 wiki/summaries/journal-2026-04-21.md；更新 wiki/entities/{my-wiki,vivek-trivedy,review-dot-plugin}.md + wiki/concepts/{compound-interest-tool,harness}.md + wiki/summaries/langchain-anatomy-of-agent-harness.md；index.md +1 source
- 关键改动: 第 7 次正式 /ingest，第 4 篇 journal→wiki 连锁。**1 新页 + 6 更新 + 2 导航 = 9 处变动，略低于 Karpathy 10-15 区间下限**（journal ingest 常见——主题窄且与已有节点强互引，连锁自然收敛）。预筛 15+ → 10 → 7 处变动（N→N'→M）。**3 个关键发现**：(1) **用户独立到达 "Agent = Model + Harness Engineering" 等式** —— Day 4 日记经验区原话与 Trivedy 2026-03-10 公式完全一致；时间线证据：日记 4-21 写 → Trivedy 4-22 入 wiki → 日记 ingest 4-22（本日），用户写日记当天 wiki 尚无 Trivedy，**独立到达非模仿**。四独立来源（Tan/Karpathy/Trivedy/用户）收敛于同一 harness 框架——convergence 本身是 harness 作为结构性必然的论证。已回溯写入 [[harness]] § "四独立来源收敛" + [[vivek-trivedy]] § "用户独立到达 working-backwards" + [[langchain-anatomy-of-agent-harness]] § "用户独立到达观察"。(2) **"修复 Agent 先找缺了什么结构性的能力" 独立到达 Trivedy working-backwards 方法论** —— Trivedy 原文 "Behavior we want (or want to fix) → Harness Design"；用户表述侧重"修"而非"建"，是方法论的自然反向泛化（设计 ↔ 调试 两向）。(3) **痛点→<24h 落地第 2 例** —— Day 3 review-dot 插件 + Day 4 ingest §3 预筛（commit `ace8baa`）——本 wiki 维护者"日拱一卒"节奏从单次闭环稳定到连续可重复。**工作流价值**：Day 4 TODO 4 项 ✅ 实质映射到本日 3 次 ingest + 1 次 commit，证明"记下学习 TODO → 通过 /ingest 系统化完成"是稳定流程。**未升级但需跟踪的 touch-count**：Hermes 陪伴工具（touch=4，延续至 4-22 journal）/ Claude Code 4.6 泄漏学习（touch=4）/ 知识输出 project 候选（touch=1 first mention，想法区）/ review-dot 社媒传播（touch=2 approaching）
- 后续动作: (1) 用户 review 新增 1 页（journal-2026-04-21 summary）+ 6 个更新页，改 last_reviewed；(2) Hermes 陪伴工具 touch-count=4 但仍未 project 化——若明日（4-22 journal 即将写的日记）再提可升 `wiki/projects/hermes-companion-tool.md`；(3) 知识输出 project（自媒体传播）touch=1，视频主题候选 [[skill-as-method-call]] vs [[procedural-knowledge]] 对比 + [[review-dot-plugin]] 设计故事，继续观察累积；(4) "参考最佳实践完成工程实践"方法论 first mention，语义模糊，观察 ≥3 实例后再概念化；(5) 算力投资 thesis first mention，与 wiki 当前主题区独立，stub 不扩展；(6) /lint 验证本次 9 处反向链健康

## [2026-04-22] lint | Day 5 双 ingest 后全库（LangChain + journal-2026-04-21）
- 涉及页面: wiki/lint-reports/2026-04-22.md（新建）
- 关键改动: **0 矛盾 / 0 孤儿 / 0 活跃 dangling / 0 stale / 0 data gap**——**clean pass**，无 P1/P2。规模 74 页（Day 3 基线 62 页 → +12）；fresh 🔵 19 / reviewed 55；UNVERIFIED 96（Day 3 基线 47 → +49，主要来自 LangChain 4 + Hermes/OpenClaw ~20 + autoresearch ~5 的 tracking 结构，健康）。**预筛 §3b 首次实战验证**：LangChain ingest 40+→20→13（60% 降读）；journal ingest 15+→10→7（55% 降读）——N→N' 比值 ~50%，符合 spec 预期"降 Read 候选 30-50%"。10 个 dangling candidates 全部是 lint-reports 历史描述 / index.md backtick 模板占位符 / output/test-reports 泛指示意——**0 活跃 dangling**。所有 Day 5 新 6 页（LangChain 5 + journal 1）反向入链 3-15 处健康，`[[langchain-anatomy-of-agent-harness]]` 15 入链成为本次枢纽。**自反观察**：lint 扫自身 lint-reports 会误报大量历史 dangling 描述（本次 10/10 candidates 全是噪音），未来可考虑 lint-reports/ 子目录整体从 dangling 扫描排除，但当前成本低不改动
- 后续动作: 无 P1/P2；可选 P3—— LangChain ingest 的 4 条 [UNVERIFIED]（Terminal Bench 2.0 排名 / Top30→Top5 数据 / Codex-5.3 guide URL / Ralph loop 命名由来）WebSearch 消减；用户 review 19 个 fresh 🔵 页（按 `Cmd/Ctrl+Shift+R` 热键）

## [2026-04-22] refactor | CLAUDE.md 瘦身 + rationale 析出
- 涉及页面: CLAUDE.md（225 → 181 行），wiki/decisions/claude-md-rationale.md（新建 87 行），index.md（## Decisions +1）
- 关键改动: 按"运行时规则 vs 设计 rationale"切分。CLAUDE.md 只留每次工作流必查的执行规则（三层边界 / frontmatter 模板 / 工作流约束 / link 语法 / log+index 格式 / 冲突处理 / 拒绝幻觉 / 连锁更新 / 写仪式 / 日期）。移出到 [[claude-md-rationale]]：(1) status 与 last_reviewed 正交字段的长论证 + 为什么用日期不用布尔；(2) Obsidian 端呈现 review-dot 插件 + CSS 渲染细节；(3) TODO 升级方法论（两层不是三层 / metadata 选型反对 emoji / touch-count 是真信号论证）；(4) Karpathy 四卖点自检清单。规则本身无任何变化——所有硬约束保留原文，只是"为什么"外迁。CLAUDE.md 内在两处留 pointer 指向 rationale：frontmatter 表格下 + TODO 升级段开头
- 后续动作: 用户 review claude-md-rationale（目前 `last_reviewed: null`）；观察后续 /ingest /query 是否出现规则漏失现象——若有需回补到 CLAUDE.md 而非 rationale

## [2026-04-22] clip | agentskills-io-standard
- 涉及页面: raw/agentskills-io-standard.md（新建，三页合并：/home + /specification + /what-are-skills）
- 关键改动: URL agentskills.io/home 抓取成功（fetch_method=webfetch），并并联合 WebFetch /specification + /what-are-skills 子页 verbatim。frontmatter 含 source_url / fetched_at / fetch_method 标注 "三页合并整合"；35+ adopter 清单完整抓取入表；progressive disclosure 官方三级定义 + SKILL.md frontmatter schema 全文保留
- 后续动作: /ingest raw/agentskills-io-standard.md

## [2026-04-22] ingest | agentskills.io 开放标准（Claude/OpenClaw/Hermes 共标准背景）
- 涉及页面: 新建 wiki/summaries/agentskills-io-standard.md + wiki/entities/agentskills-io.md + wiki/concepts/progressive-disclosure.md；更新 wiki/concepts/{procedural-knowledge,skill-as-method-call,skill-as-permanent-upgrade,thin-harness-fat-skills,agent-vs-human-editable-surface}.md + wiki/entities/{anthropic,claude-code,hermes-agent,openclaw}.md；index.md +3 条（1 entity + 1 concept + 1 source）
- 关键改动: 第 8 次正式 /ingest，Day 5 第 3 次 ingest。**3 新页 + 8 更新 + 2 导航 = 13 处变动，正中 Karpathy 10-15 连锁硬约束**。预筛 48 → 17 → 13（N→N'→M，N'/N ~35%，符合 spec 预期"降 Read 候选 30-50%"）。**3 个关键发现**：(1) **Resolve 两处 [UNVERIFIED]** —— procedural-knowledge.md:80-84 "agentskills.io 详情 / 联署方" + hermes-agent.md:186 "agentskills.io 开放标准详情"，现已替换为权威来源（官方三页）；(2) **Anthropic-MCP 对照发现**：Anthropic 2026-04 把内部 Claude Code skill 机制**开源为 agentskills.io 标准**——正对应 OpenAI 2024 开源 MCP 协议的先例，两家 AI 公司都通过"开放协议"策略扩大 agent 生态（MCP 开工具调用 / Agent Skills 开能力单元）；(3) **用户口头陈述 vs 官网 carousel 冲突**：用户说 "Claude/OpenClaw/Hermes 都用这个标准"，但官方 2026-04-22 carousel 35+ adopter 里 Claude+Claude Code 在、OpenClaw 和 Hermes Agent 都不在。按 CLAUDE.md 冲突规则在 3 个页面（summary / agentskills-io entity / openclaw / hermes-agent）写 `> [!warning] Conflict` callout + status "待验证"。OpenClaw 实际用 `<skill>/SKILL.md` 同名文件但未官方联署，Hermes 视频自称遵循未官方证实——三种可能性（carousel 滞后 / 同名非同规范 / 视频推断错）留给下次 /ingest OpenClaw / Hermes 最新 docs 精确回答。**工程价值**：(a) 给本 wiki 原已存在的 3 个"skill"概念（[[skill-as-method-call]]/[[skill-as-permanent-upgrade]]/[[thin-harness-fat-skills]]）加上 formal spec 对应——从"Tan 主张 + 本 wiki 实施"升级为"有工业标准背书"；(b) 新建 [[progressive-disclosure]] 概念——从 [[context-rot]] § 机制 3 里散落的单次提及，升级为独立概念页；Trivedy 的 harness primitive 视角 + agentskills.io canonical 实施两视角合并；(c) [[agent-vs-human-editable-surface]] 获得首个 machine-readable 的 surface 表达（`allowed-tools` frontmatter 字段）——从"约定"到"spec"的升级；(d) 本 wiki 自身工作流 `.claude/commands/*.md` 与 agentskills.io SKILL.md 的差异 / 迁移路径明确化（见 summary § 与本 wiki 维护本身的含义）
- 后续动作: (1) 用户 review 3 个 fresh 🔵 新页 + 8 个更新页（按 `Cmd/Ctrl+Shift+R` 热键）；(2) **待验证冲突**——OpenClaw 是否官方 adopt agentskills.io / Hermes 是否官方 adopt，建议 /ingest docs.openclaw.ai/skills + Nous Hermes README 最新版 / 关注 agentskills.io carousel 后续更新；(3) 可 WebSearch "agentskills.io announcement" 或 "Anthropic Agent Skills blog" 补首发日期（目前 [UNVERIFIED]）；(4) 本 wiki 若要把 `.claude/commands/*.md` 重构为 agentskills.io SKILL.md 格式可作独立 project 议题（当前短期不必）；(5) /lint 验证本次 13 处反向链健康 + 3 页 fresh 🔵 状态

## [2026-04-23] refactor | 扩展 Authored raw 到 raw/assets/ + 首落 ai-zhiji project 页（office-hours 3 归档）
- 涉及页面: CLAUDE.md（§"三层硬边界"schema 段更新）；新建 raw/assets/ai-zhiji/{design-v1,design-v2}.md（gstack 源 verbatim copy + Authored raw frontmatter）；新建 wiki/decisions/authored-raw-assets-extension.md（ADR）；新建 wiki/projects/ai-zhiji.md（type:project，status:active）；新建 raw/journal/2026-04-23.md（今日 journal，含本次 refactor 经验）；index.md +2 条（## Decisions 加 ADR 行，## Projects 加 ai-zhiji 行）
- 关键改动: **本 wiki 第一次对 CLAUDE.md schema 做扩展**。Authored raw 从单一 `raw/journal/` 扩展为 `raw/journal/` + `raw/assets/<project-slug>/`。触发因：office-hours session 3 产出 AI 知己 design doc v1/v2，~/.gstack/ 作为默认落盘位违反 wiki 自身的 file-over-app + sovereignty thesis（design doc 不跟 git、不随 backup、换机不跟走）。新 schema 规则：raw/assets/<slug>/ 按项目命名空间，每版本独立文件 frozen-after-write，版本链通过 frontmatter supersedes/superseded_by 双向维持。ADR 沉淀完整 Context + Decision + Rationale + Alternatives（拒绝 Path B 塞 journal 命名混乱、拒绝 Path C 保持 gstack sovereignty 弱）+ Consequences。ai-zhiji 是本 schema 扩展的 reference 实例。**注**：本次不触发 Karpathy 10-15 连锁（schema governance + 首落项目页不同质，无 wiki 既有概念可连锁）。本 refactor 回应用户反问"design doc 和 journal 是否同性质"—— 结论：同性质（第一方时间戳 frozen），但旧 schema 未覆盖离散 artifact 场景，需扩展
- 后续动作: (1) 用户 review 3 个 fresh 🔵 新页（ADR + project + 今日 journal）；(2) 执行 Assignment Q1-Q4（PM 对话 + 3 天 manual prototype + narrative 研究）；(3) 未来 /office-hours / essay / talk 产出默认进 raw/assets/<slug>/，或双写 gstack + raw/assets/（决策短期双写，待运行后再收敛）；(4) /lint 未来某次优化需显式认识 raw/assets/ 子目录（反向链健康 + supersedes 链完整性扫描）；(5) 本次对话中用户反问"pre-ingest vs post-ingest 的 frozen 强度是否分级"，AI 回以三轴分法（citation integrity / provenance / time-truth），用户**决定不沉淀到 wiki**，仅留在对话历史 —— 若未来再遇类似反问 ≥ 2 次，考虑沉淀到 [[claude-md-rationale]] 或新建 concept 页

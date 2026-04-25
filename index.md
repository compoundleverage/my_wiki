# Knowledge Wiki Index

Last rebuild: 2026-04-22 (Day 5, agentskills.io ingest)

个人知识库的全局导航。任何严肃的 `/query` 都从这里开始。

格式约定：`- [[page-name]] · 一句话摘要 · #tag1 #tag2`

---

## Entities
<!-- 人 / 组织 / 项目 / 产品 -->

- [[forrestchang]] · GitHub 用户，`andrej-karpathy-skills` 作者 · #author
- [[garry-tan]] · YC CEO，`@garrytan`，Thin Harness/Fat Skills 架构论作者 · #author #investor
- [[steve-yegge]] · "10x-100x AI 生产力"说法的被引用提出者 · #author
- [[anthropic]] · Claude 模型 + Claude Code 的创造者 · #organization #llm-provider
- [[claude-code]] · Anthropic 的 LLM 编码 CLI，本 wiki 的运行宿主 · #product #cli
- [[yc]] · Y Combinator 加速器，Startup School 主办方 · #organization
- [[andrej-karpathy]] · AI 研究者；本 wiki 项目的灵感源 · #researcher #author
- [[vannevar-bush]] · 1945 Memex 提出者，Karpathy 致敬的前辈 · #historical #pioneer
- [[qmd]] · tobi 的本地 markdown 搜索引擎（BM25+向量+LLM rerank） · #tool #search
- [[tolkien-gateway]] · 托尔金 fan wiki，Karpathy 用作 wiki 规模参照 · #example
- [[my-wiki]] · 本 wiki 仓库（compoundleverage/my_wiki）；[[compound-interest-tool]] 的首日实例 · #project #personal
- [[hermes-agent]] · Nous Research 自托管 agent；执行循环驱动 + 自我进化 + 4 层记忆；2026-04-17 最佳拍档视频首次入库 · #agent #self-hosted-agent #self-evolving
- [[openclaw]] · 自托管 agent；Gateway 中心化 + 工作区模型；[[garry-tan]] 的自用产品（raw/garry-tan:144 "my OpenClaw"） · #agent #self-hosted-agent
- [[nous-research]] · [[hermes-agent]] 研发团队；2022 Discord 社群 → 2023 公司化；open-source + 去中心化理念 · #ai-lab #organization
- [[notebooklm]] · Google RAG 产品；[[persistent-wiki-vs-rag]] 扩张性实测对照基线 · #product #google #rag
- [[mempalace]] · GitHub 工具（stub）；[[hermes-agent]] 的"AI 陪伴工具"沉浸感层候选 · #tool #stub
- [[screenstudio]] · GitHub 工具（stub）；与 [[clicky]] 教学软件组合候选 · #tool #stub
- [[clicky]] · GitHub 工具（stub）；farzaa 作，与 [[screenstudio]] 组合候选 · #tool #stub
- [[review-dot-plugin]] · 本 wiki 维护者自研 Obsidian 插件（v0.2.0，~54 行 JS）；三态圆点 fresh/stale/ok + 一键 `Cmd+Shift+R` mark-reviewed · #tool #plugin #self-authored
- [[autoresearch]] · Karpathy 2026-03 发布，75k+ stars；AI agent 通宵自主做 LLM 研究的最小 kit（3 文件：prepare/train/program.md） · #karpathy #autonomous-agent #research-kit
- [[nanochat]] · Karpathy 的 LLM training 教育项目（stub）；[[autoresearch]] 的父项目 · #karpathy #llm-training #stub
- [[autoresearch]] · Karpathy 2026-03 新作；AI agent 自主做 LLM 研究最小可运行 kit；75k stars · #product #github-repo #karpathy #autonomous-agent
- [[nanochat]] · Karpathy 教育向 LLM 训练项目；[[autoresearch]] 父项目（stub） · #product #github-repo #karpathy #stub
- [[langchain]] · AI 应用开发框架公司；`deepagents` harness library；2026-03 Trivedy 博客给本 wiki 提供 harness 议题第 3 视角 · #organization #ai-company #agent-tooling
- [[vivek-trivedy]] · LangChain 工程师；《The Anatomy of an Agent Harness》作者；"Agent = Model + Harness" 等式 + 9 primitives 清单提出者 · #author #langchain #harness-engineering
- [[agentskills-io]] · Anthropic 原创的 Agent Skills 开放标准；SKILL.md 规范 + 三级 progressive disclosure + 35+ 产品 adopter · #open-standard #specification #skill-spec
- [[gstack]] · [[garry-tan]] 开源 Claude Code 技能集；视频时刻 ~70k stars / 28+ skills；built into Conductor IDE；自评是 [[thin-harness-fat-skills]] 的 "my implementation" · #tool #harness #skill-collection
- [[diana-hu]] · YC partner（[UNVERIFIED] 姓未在视频字幕中给出，猜 Hu）；2026-04-24 视频提出 [[ai-as-company-os]] 框架 · #author #investor #yc #ai-strategy
- [[flowershu]] · 中文 AI 圈技术作者（GitHub `alchaincyf` / WeChat 花叔 / Bilibili AI 进化论-花生）；橙皮书系列作者（《Hermes Agent 从入门到精通》v260407 / 《Harness Engineering》前作） · #author #chinese-ai-community #technical-writer
- [[honcho]] · Plastic Labs 用户建模系统；Hermes Agent 可选外挂；[[dialectical-user-modeling]] 实施 · #tool #user-modeling #plastic-labs
- [[mitchell-hashimoto]] · Terraform 创造者；Harness Engineering 概念命名者；Ghostty 终端模拟器 · #author #developer #harness-engineering

## Concepts
<!-- 跨文档提取的核心概念 -->

- [[think-before-coding]] · 编码前显式处理假设/歧义/替代/困惑 · #llm-behavior #process
- [[simplicity-first]] · 只写解决问题的最少代码，禁投机性扩展 · #llm-behavior #code-quality
- [[surgical-changes]] · 只碰必须碰的，每一行改动可追溯到用户请求 · #llm-behavior #code-quality
- [[goal-driven-execution]] · 把模糊任务转成可验证的成功标准 · #llm-behavior #process
- [[thin-harness-fat-skills]] · Garry Tan 的核心架构论：skills 装判断，harness 装骨架 · #llm-architecture #core
- [[harness]] · 运行 LLM 的 ~200 行程序，只做 4 件事 · #llm-architecture
- [[skill-as-method-call]] · skill file 是带参数的 markdown 方法调用 · #llm-architecture
- [[resolver-context-routing]] · context 的路由表：task X → load doc Y first · #llm-architecture
- [[latent-vs-deterministic]] · 判断放潜空间，重复精确放确定性；分错是最常见错误 · #llm-architecture #core
- [[diarization]] · 读全集写一页结构化档案；RAG 做不到的 analyst's brief · #llm-architecture #knowledge-work
- [[context-bloat]] · 40+ tools 吞 context 的反模式 · #anti-pattern
- [[purpose-built-tooling]] · thin + fast + narrow 工具链，拒绝 god-tools · #tooling
- [[skill-as-permanent-upgrade]] · 每个 skill 是永不衰减的资产，system compounds · #llm-architecture
- [[procedural-knowledge]] · "记住方法" vs "记住事实"——Hermes 的 agent 自动生成 skill 机制 · #agent #skills #memory
- [[tiered-memory-architecture]] · 分层记忆：小常驻 / 大检索 / 跨会话画像 / 程序性 skills · #agent #memory #architecture
- [[autonomous-research-loop]] · Karpathy autoresearch 提炼的"modify → train → keep/discard → NEVER STOP" autonomous 研究循环 pattern · #autonomous #karpathy #experiment-loop
- [[agent-vs-human-editable-surface]] · Skill spec 必须显式声明谁可改什么文件；基准/实验/规则/轨迹四层分配；autoresearch 三文件架构是最清晰实施 · #agent-design #skill-spec #boundary
- [[autonomous-research-loop]] · Modify → Train → Keep/Discard → NEVER STOP；Karpathy autoresearch 提炼的 autonomous agent pattern · #agent #autonomous #research-methodology
- [[ralph-loop]] · Harness hook 拦 exit + 干净 context 重注原 prompt；Trivedy 命名的 long-horizon 执行 pattern；NEVER STOP 的 hook 层兜底 · #harness #long-horizon #hook
- [[context-rot]] · Context 填充导致 reasoning 退化的一般现象；Trivedy 命名；3 机制对付（compaction / tool-offloading / progressive-disclosure） · #llm-architecture #context-engineering #langchain
- [[persistent-wiki-vs-rag]] · Karpathy 核心论证：wiki 编译一次持续维护 vs RAG 现场重拼 · #knowledge-base #core
- [[knowledge-compilation]] · "知识即代码库"——Obsidian/LLM/wiki = IDE/programmer/codebase · #knowledge-base #core
- [[compound-interest-tool]] · 每天产出一个对自己有复利的工具；"日拱一卒"（本 wiki 维护者原则） · #principle #personal #core
- [[ai-six-properties]] · 本 wiki 维护者自创的 AI 能力框架 v1（draft） · #user-framework #ai-capabilities
- [[dopamine]] · 奖赏 / 动机 / 运动控制神经递质；Parkinson's 基础 · #neurotransmitter #hormone
- [[serotonin]] · 情绪主调神经递质；抑郁症与 SSRI 的核心 · #neurotransmitter #mood
- [[endorphins]] · "endogenous morphine"，内源止痛；runner's high 主因 · #neurotransmitter #pain
- [[oxytocin]] · "love hormone"；分娩 / 键合；少见正反馈回路 · #neurotransmitter #bonding
- [[neurotransmitter]] · 跨突触化学信使；四种 feel-good 激素双重身份的概念基础 · #concept #neuroscience
- [[runners-high]] · 运动欣快感；β-endorphin 主因，四激素协同 · #exercise #phenomenon
- [[exercise-as-hormone-trigger]] · 运动 = 四合一激素激发器；[[compound-interest-tool]] 的身体典型 · #exercise #compound-interest
- [[four-feel-good-hormones]] · Dopamine vs Serotonin vs Endorphins vs Oxytocin 对比表 · #comparison #hormones
- [[dopamine-fasting]] · "多巴胺断食"辟谣 + Sepah 原 CBT 温和版操作 · #debunking #cbt #mindfulness
- [[addiction-recovery]] · Harvard 5 步戒瘾框架；对应 dopamine 强化回路的逆向工程 · #addiction #recovery
- [[progressive-disclosure]] · Metadata / Body / Resources 三级按需加载；agentskills.io canonical 实施 + Trivedy harness primitive · #llm-architecture #context-engineering #skill-spec
- [[multi-agent-worktree-orchestration]] · 每 worktree 1 work item × N 并行（Tan 实测 10-15 → 10-50 PRs/day）；并行自治 + 串行人工 gate · #agent-orchestration #worktree #parallel
- [[adversarial-review-skill]] · skill 角色不只产出，也包括"反方批判 + autofix"；Tan GStack 实证 6/10 → 8/10 两轮 · #skill-design #quality-gate #harness
- [[qa-tooling-cost-reduction]] · Playwright CLI 替 Chrome MCP 单 action 75× 加速；harness primitive 优化范例 · #harness #tooling #cost-reduction
- [[ai-as-company-os]] · [[diana-hu\|Diana]]：AI 不是公司用的工具，是公司运行其上的 OS；流过智能层 + 持续学习 + 替核心管理函数 · #organization #ai-strategy #control-systems
- [[closed-loop-company]] · [[diana-hu\|Diana]]：闭环 vs 开环组织（control systems framing）；[[ai-as-company-os]] 的运行时机制 · #organization #control-systems #ai-strategy
- [[queryable-company]] · [[diana-hu\|Diana]]：公司对 AI legible；[[closed-loop-company]] 的数据基础——artifact 集中 + AI 可读 · #organization #data-architecture #ai-strategy
- [[dialectical-user-modeling]] · [[honcho]]：捕用户陈述偏好 vs 实际行为偏好的矛盾；多维身份推断 · #user-modeling #ai-memory #honcho
- [[in-on-out-of-the-loop]] · Kief Morris 框架：人类 AI 监督三态（in / on / out）；Hermes self-improving 把讨论推到 4th state · #agent-supervision #autonomy #control

## Sources
<!-- raw/ 下的原始资料，由 /ingest 自动维护 -->

- [[karpathy-skills-claude-md]] · forrestchang 的 LLM 编码行为准则（4 原则） · #coding-guidelines
- [[garry-tan-thin-harness-fat-skills]] · Garry Tan 架构论长文：2x vs 100x 差在架构不在模型 · #llm-architecture
- [[karpathy-llm-wiki-gist]] · 本 wiki 项目的直接灵感源（终于 ingest） · #foundational
- [[journal-2026-04-18]] · my_wiki Day 1 日记：完工 + 扩张性疑问 + AI 六特性起源 · #journal #milestone
- [[journal-2026-04-19]] · my_wiki Day 2 日记：MarkitDown + QMD 实装 + 3 工具热榜发现 + 复利原则第 2 次背书 · #journal #milestone
- [[journal-2026-04-20]] · my_wiki Day 3 日记：review-dot 插件原型（痛点→落地 24h 内）+ Harvard 四激素学习 + 用户独立到达"asked twice = failed"原则 · #journal #milestone #plugin-authoring
- [[journal-2026-04-21]] · my_wiki Day 4 日记：harness 议题收官（3 次 ingest）+ ingest §3 预筛优化（痛点→落地 <24h 第 2 例）+ 用户独立到达"Agent = Model + Harness Engineering" + working-backwards 方法论 · #journal #milestone #harness-engineering
- [[karpathy-autoresearch]] · Karpathy 2026-03 autoresearch repo 完整 ingest；README + program.md verbatim；skill spec 外部印证第 3 方 · #karpathy #autonomous-agent #skill-spec
- [[karpathy-autoresearch]] · Karpathy 2026-03 autoresearch 官方 README + program.md 双文件 ingest；三独立信源（Tan / Hermes / Karpathy）收敛于"skill = markdown spec" · #karpathy #autonomous-agent #skill-spec
- [[feel-good-hormones-series]] · Harvard Health 四+一篇：dopamine / serotonin / endorphins / oxytocin 全景 · #neuroscience #wellness
- [[dopamine-fasting-grinspoon]] · Grinspoon MD 2020：dopamine fasting 科学辟谣 + 温和 CBT 版本的认知锚 · #debunking #wellness-critique
- [[five-action-steps-quitting-addiction]] · Harvard 2021：5 步戒瘾公式（药物 / 酒精 / 行为三类通用） · #addiction #framework
- [[hermes-vs-openclaw]] · 最佳拍档 2026-04-17 视频；Hermes Agent vs OpenClaw 架构大对比 + EvoMap 抄袭风波 · #agent #architecture-comparison #youtube-summary
- [[langchain-anatomy-of-agent-harness]] · Trivedy 2026-03-10 LangChain 博客：harness 等式 + 9 primitives + Ralph Loop + Context Rot + Model-Harness 共进化 · #harness #langchain #core
- [[agentskills-io-standard]] · 2026-04-22 /ingest agentskills.io 三页；SKILL.md 规范 + 必填字段 + progressive disclosure + 35+ adopter；OpenClaw/Hermes 接入状态待验证 · #open-standard #skill-spec #anthropic
- [[yc-garry-tan-claude-code-as-team]] · YC 2026-04-23 Tan 21:49 视频；GStack live demo + 多 agent worktree 编排 + adversarial review + Playwright CLI；命名 GStack 为 [[thin-harness-fat-skills]] 实施 · #garry-tan #gstack #claude-code #yc
- [[yc-diana-ai-as-company-os]] · YC 2026-04-24 [[diana-hu\|Diana]] 10:27 视频；AI 是公司 OS / 闭环组织 / queryable company / 1000x engineer / 中层管理消失；战略层与 Tan 工程层互补 · #diana-hu #yc #ai-strategy #organization
- [[hermes-orange-book-flowershu]] · 花叔《Hermes Agent 从入门到精通》v260407（2026-04-07）；5 部 17 节；解 agentskills.io adoption + 引入 Honcho 辩证建模 / Kief Morris on-the-loop / 自改进上限论；引入 5 vs 3 层安全新冲突 · #hermes-agent #methodology #flowershu #chinese-source

## Events
<!-- 时间相关条目（可选） -->

- [[anthropic-claude-code-source-leak-2026-03-31]] · Anthropic 意外把 Claude Code 512k 行源码推到 npm · #event #anthropic
- [[memex-to-llm-wiki]] · 1945 Bush Memex → 2026 LLM Wiki 的 81 年历史线 · #history #synthesis
- [[hermes-openclaw-vs-my-wiki-design]] · 自反对照：Hermes/OpenClaw 架构 vs 本 wiki 三层结构的同构性 · #synthesis #meta #karpathy
- [[yc-engineer-vs-org-architecture]] · Tan engineer-level + Diana org-level 互补 AI 架构；同一 Yegge 1000x 两层贡献；5 层复利同构链 · #synthesis #yc #ai-strategy

## Decisions
<!-- ADR 风格的决策记录 -->

- [[obsidian-as-ide-redirect]] · 2026-04-18 决定不单建 obsidian-as-ide 页，重定向到 [[knowledge-compilation]] · #decision #wiki-governance
- [[autoresearch-on-mac]] · 2026-04-21 ADR：默认梯度 1（只读 wiki + 反哺 slash commands），梯度 2（MLX fork） / 3（租 H100）作 future pivot · #decision #autoresearch #hardware
- [[claude-md-rationale]] · 2026-04-22 CLAUDE.md 瘦身后的 rationale 层：schema 正交字段 / Obsidian 插件呈现 / TODO 升级方法论 / Karpathy 四卖点自检 · #decision #wiki-governance #schema-design
- [[decisions/authored-raw-assets-extension]] · 2026-04-23 ADR：扩展 Authored raw 覆盖 raw/assets/，支持第一方 design/essay/presentation 归档与 sovereignty · #decision #wiki-governance #schema-design

## Projects
<!-- 前瞻性：active / paused / done 的多日项目；升级自 raw/journal/ 里 touch-count ≥ 3 的 TODO -->

- [[projects/ai-zhiji]] · Dual-World Reciprocal AI 伴侣（三域 file-over-app + anchor narrative + Hermes agent）；office-hours 3 产出，W1-16 plan locked · #project #ai-companion #dual-world #active


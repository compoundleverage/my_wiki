# Knowledge Wiki Index

Last rebuild: 2026-04-21

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

## Sources
<!-- raw/ 下的原始资料，由 /ingest 自动维护 -->

- [[karpathy-skills-claude-md]] · forrestchang 的 LLM 编码行为准则（4 原则） · #coding-guidelines
- [[garry-tan-thin-harness-fat-skills]] · Garry Tan 架构论长文：2x vs 100x 差在架构不在模型 · #llm-architecture
- [[karpathy-llm-wiki-gist]] · 本 wiki 项目的直接灵感源（终于 ingest） · #foundational
- [[journal-2026-04-18]] · my_wiki Day 1 日记：完工 + 扩张性疑问 + AI 六特性起源 · #journal #milestone
- [[journal-2026-04-19]] · my_wiki Day 2 日记：MarkitDown + QMD 实装 + 3 工具热榜发现 + 复利原则第 2 次背书 · #journal #milestone
- [[feel-good-hormones-series]] · Harvard Health 四+一篇：dopamine / serotonin / endorphins / oxytocin 全景 · #neuroscience #wellness
- [[dopamine-fasting-grinspoon]] · Grinspoon MD 2020：dopamine fasting 科学辟谣 + 温和 CBT 版本的认知锚 · #debunking #wellness-critique
- [[five-action-steps-quitting-addiction]] · Harvard 2021：5 步戒瘾公式（药物 / 酒精 / 行为三类通用） · #addiction #framework
- [[hermes-vs-openclaw]] · 最佳拍档 2026-04-17 视频；Hermes Agent vs OpenClaw 架构大对比 + EvoMap 抄袭风波 · #agent #architecture-comparison #youtube-summary

## Events
<!-- 时间相关条目（可选） -->

- [[anthropic-claude-code-source-leak-2026-03-31]] · Anthropic 意外把 Claude Code 512k 行源码推到 npm · #event #anthropic
- [[memex-to-llm-wiki]] · 1945 Bush Memex → 2026 LLM Wiki 的 81 年历史线 · #history #synthesis
- [[hermes-openclaw-vs-my-wiki-design]] · 自反对照：Hermes/OpenClaw 架构 vs 本 wiki 三层结构的同构性 · #synthesis #meta #karpathy

## Decisions
<!-- ADR 风格的决策记录 -->

- [[obsidian-as-ide-redirect]] · 2026-04-18 决定不单建 obsidian-as-ide 页，重定向到 [[knowledge-compilation]] · #decision #wiki-governance

## Projects
<!-- 前瞻性：active / paused / done 的多日项目；升级自 raw/journal/ 里 touch-count ≥ 3 的 TODO -->


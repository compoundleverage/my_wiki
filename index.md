# Knowledge Wiki Index

Last rebuild: 2026-04-19

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
- [[hermes-agent]] · 本 wiki 维护者明日学习目标（stub） · #learning-target #stub
- [[notebooklm]] · Google RAG 产品；[[persistent-wiki-vs-rag]] 扩张性实测对照基线 · #product #google #rag

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
- [[persistent-wiki-vs-rag]] · Karpathy 核心论证：wiki 编译一次持续维护 vs RAG 现场重拼 · #knowledge-base #core
- [[knowledge-compilation]] · "知识即代码库"——Obsidian/LLM/wiki = IDE/programmer/codebase · #knowledge-base #core
- [[compound-interest-tool]] · 每天产出一个对自己有复利的工具；"日拱一卒"（本 wiki 维护者原则） · #principle #personal #core
- [[ai-six-properties]] · 本 wiki 维护者自创的 AI 能力框架 v1（draft） · #user-framework #ai-capabilities

## Sources
<!-- raw/ 下的原始资料，由 /ingest 自动维护 -->

- [[karpathy-skills-claude-md]] · forrestchang 的 LLM 编码行为准则（4 原则） · #coding-guidelines
- [[garry-tan-thin-harness-fat-skills]] · Garry Tan 架构论长文：2x vs 100x 差在架构不在模型 · #llm-architecture
- [[karpathy-llm-wiki-gist]] · 本 wiki 项目的直接灵感源（终于 ingest） · #foundational
- [[journal-2026-04-18]] · my_wiki Day 1 日记：完工 + 扩张性疑问 + AI 六特性起源 · #journal #milestone

## Events
<!-- 时间相关条目（可选） -->

- [[anthropic-claude-code-source-leak-2026-03-31]] · Anthropic 意外把 Claude Code 512k 行源码推到 npm · #event #anthropic
- [[memex-to-llm-wiki]] · 1945 Bush Memex → 2026 LLM Wiki 的 81 年历史线 · #history #synthesis

## Decisions
<!-- ADR 风格的决策记录 -->

- [[obsidian-as-ide-redirect]] · 2026-04-18 决定不单建 obsidian-as-ide 页，重定向到 [[knowledge-compilation]] · #decision #wiki-governance

## Projects
<!-- 前瞻性：active / paused / done 的多日项目；升级自 raw/journal/ 里 touch-count ≥ 3 的 TODO -->


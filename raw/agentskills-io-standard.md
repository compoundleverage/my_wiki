---
source_url: https://agentskills.io/home
fetched_at: 2026-04-22
author: agentskills.io (originated by Anthropic, now open standard)
platform: web
fetch_method: webfetch
note: 本文件合并抓取三页（/home overview + /specification + /what-are-skills），正文 verbatim；frontmatter 为元数据。多页合并为单 raw 属于 /clip spec "1 raw = 1 .md" 约定的主观整合（同属一个标准的多个页面）。
---

# Agent Skills 开放标准 · 三页合并快照

> 抓取时间：2026-04-22
> 站点：agentskills.io
> 组成：Overview (`/home`) + Specification (`/specification`) + What are skills (`/what-are-skills`)

---

## 页 1 — Overview (`/home`)

> ## Documentation Index
> Fetch the complete documentation index at: https://agentskills.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> A simple, open format for giving agents new capabilities and expertise.

Agent Skills are folders of instructions, scripts, and resources that agents can discover and use to do things more accurately and efficiently.

## Why Agent Skills?

Agents are increasingly capable, but often don't have the context they need to do real work reliably. Skills solve this by giving agents access to procedural knowledge and company-, team-, and user-specific context they can load on demand. Agents with access to a set of skills can extend their capabilities based on the task they're working on.

**For skill authors**: Build capabilities once and deploy them across multiple agent products.

**For compatible agents**: Support for skills lets end users give agents new capabilities out of the box.

**For teams and enterprises**: Capture organizational knowledge in portable, version-controlled packages.

## What can Agent Skills enable?

* **Domain expertise**: Package specialized knowledge into reusable instructions, from legal review processes to data analysis pipelines.
* **New capabilities**: Give agents new capabilities (e.g. creating presentations, building MCP servers, analyzing datasets).
* **Repeatable workflows**: Turn multi-step tasks into consistent and auditable workflows.
* **Interoperability**: Reuse the same skill across different skills-compatible agent products.

## Adoption

Agent Skills are supported by leading AI development tools.

**Adopters 清单（来自站点 Logo Carousel，2026-04-22 抓取时有 35+ 项；含 `instructionsUrl` 表明已接入）**：

| 名称 | 描述 | instructionsUrl |
|------|------|-----------------|
| Junie | JetBrains IntelliJ 平台上的 LLM-agnostic 编码 agent | junie.jetbrains.com/docs/agent-skills.html |
| Gemini CLI | Google 开源 Gemini 终端 agent | geminicli.com/docs/cli/skills/ |
| Autohand Code CLI | Autonomous ReAct 终端 agent | autohand.ai/docs/working-with-autohand-code/agent-skills.html |
| OpenCode | 开源终端 / IDE / 桌面 agent | opencode.ai/docs/skills/ |
| OpenHands | 开源云编码 agent 平台 | docs.openhands.dev/overview/skills |
| Mux | Coder 并行 agent 工作区 | mux.coder.com/agent-skills |
| Cursor | AI 编辑器 / 编码 agent | cursor.com/docs/context/skills |
| Amp | 前沿编码 agent | ampcode.com/manual#agent-skills |
| Letta | Stateful agent 平台（高级记忆） | docs.letta.com/letta-code/skills/ |
| Firebender | Android-native 编码 agent | docs.firebender.com/multi-agent/skills |
| Goose | Block 开源可扩展 agent | block.github.io/goose/docs/guides/context-engineering/using-skills/ |
| GitHub Copilot | Microsoft 编辑器 agent | docs.github.com/en/copilot/concepts/agents/about-agent-skills |
| VS Code | Microsoft 编辑器 | code.visualstudio.com/docs/copilot/customization/agent-skills |
| Claude Code | Anthropic 官方编码 agent | code.claude.com/docs/en/skills |
| Claude | Anthropic AI 产品 | platform.claude.com/docs/en/agents-and-tools/agent-skills/overview |
| OpenAI Codex | OpenAI 编码 agent | developers.openai.com/codex/skills/ |
| Piebald | 桌面 / Web agentic 开发 app | — |
| Factory | AI-native 软件开发平台 Droids | docs.factory.ai/cli/configuration/skills |
| pi | 最小终端编码 harness（badlogic） | github.com/badlogic/pi-mono/.../skills.md |
| Databricks Genie Code | Databricks 数据工作自主 partner | docs.databricks.com/aws/en/assistant/skills |
| Agentman | 医疗 RCM agentic 平台 | agentman.ai/agentskills |
| TRAE | ByteDance 自适应 AI IDE | trae.ai/blog/trae_tutorial_0115 |
| Spring AI | Spring 官方 AI 框架 | spring.io/blog/2026/01/13/spring-ai-generic-agent-skills/ |
| Roo Code | 编辑器 AI 开发团队 | docs.roocode.com/features/skills |
| Mistral AI Vibe | Mistral 终端编码助手 | github.com/mistralai/mistral-vibe |
| Command Code | 持续学习"编码品味"的 agent | commandcode.ai/docs/skills |
| Ona | 后台 agent 平台（云端工程师团） | ona.com/docs/ona/agents-md#skills-for-repository-specific-workflows |
| VT Code | 开源编码 agent，shell 安全强 | github.com/vinhnx/vtcode/blob/main/docs/skills/SKILLS_GUIDE.md |
| Qodo | Agentic 代码完整性平台 | qodo.ai/blog/how-i-use-qodos-agent-skills-to-auto-fix-issues-in-pull-requests/ |
| Laravel Boost | Laravel AI 开发加速器 | laravel.com/docs/12.x/boost#agent-skills |
| Emdash | 桌面并行 agent（git worktree 隔离） | docs.emdash.sh/skills |
| Snowflake Cortex Code | Snowflake 平台内 agent | docs.snowflake.com/en/user-guide/cortex-code/extensibility#extensibility-skills |
| Kiro | Spec-driven 开发 AI IDE | kiro.dev/docs/skills/ |
| Workshop | 跨平台多 LLM agent（桌面/Web/CLI） | docs.workshop.ai/core-concepts/working-with-the-agent#create-your-own-agents |
| Google AI Edge Gallery | 移动端本地 LLM 运行 | github.com/google-ai-edge/gallery/tree/main/skills |
| nanobot | 超轻量跨平台个人 agent（含 MCP） | nanobot.wiki/docs/0.1.5/use-nanobot/skills |
| fast-agent | ACPX / Skills 开发 agent 框架 | fast-agent.ai/agents/skills/ |

## Open development

The Agent Skills format was originally developed by [Anthropic](https://www.anthropic.com/), released as an open standard, and has been adopted by a growing number of agent products. The standard is open to contributions from the broader ecosystem.

Come join the discussion on [GitHub](https://github.com/agentskills/agentskills) or [Discord](https://discord.gg/MKPE9g8aUy)!

## Get started

- **What are skills?** — Learn about skills, how they work, and why they matter. (`/what-are-skills`)
- **Specification** — The complete format specification for SKILL.md files. (`/specification`)
- **Add skills support** — Add skills support to your agent or tool. (`/client-implementation/adding-skills-support`)
- **Example skills** — Browse example skills on GitHub. (`github.com/anthropics/skills`)
- **Reference library** — Validate skills and generate prompt XML. (`github.com/agentskills/agentskills/tree/main/skills-ref`)

---

## 页 2 — What are skills? (`/what-are-skills`)

# What are skills?

> Agent Skills are a lightweight, open format for extending AI agent capabilities with specialized knowledge and workflows.

At its core, a skill is a folder containing a `SKILL.md` file. This file includes metadata (`name` and `description`, at minimum) and instructions that tell an agent how to perform a specific task. Skills can also bundle scripts, templates, and reference materials.

```
my-skill/
├── SKILL.md          # Required: instructions + metadata
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
└── assets/           # Optional: templates, resources
```

## How skills work

Skills use **progressive disclosure** to manage context efficiently:

1. **Discovery**: At startup, agents load only the name and description of each available skill, just enough to know when it might be relevant.

2. **Activation**: When a task matches a skill's description, the agent reads the full `SKILL.md` instructions into context.

3. **Execution**: The agent follows the instructions, optionally loading referenced files or executing bundled code as needed.

This approach keeps agents fast while giving them access to more context on demand.

## The SKILL.md file

Every skill starts with a `SKILL.md` file containing YAML frontmatter and Markdown instructions:

```mdx
---
name: pdf-processing
description: Extract PDF text, fill forms, merge files. Use when handling PDFs.
---

# PDF Processing

## When to use this skill
Use this skill when the user needs to work with PDF files...

## How to extract text
1. Use pdfplumber for text extraction...

## How to fill forms
...
```

The following frontmatter is required at the top of `SKILL.md`:

* `name`: A short identifier
* `description`: When to use this skill

The Markdown body contains the actual instructions and has no specific restrictions on structure or content.

This simple format has some key advantages:

* **Self-documenting**: A skill author or user can read a `SKILL.md` and understand what it does, making skills easy to audit and improve.
* **Extensible**: Skills can range in complexity from just text instructions to executable code, assets, and templates.
* **Portable**: Skills are just files, so they're easy to edit, version, and share.

## Next steps

* [View the specification](/specification) to understand the full format.
* [Add skills support to your agent](/client-implementation/adding-skills-support) to build a compatible client.
* [See example skills](https://github.com/anthropics/skills) on GitHub.
* [Read authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) for writing effective skills.
* [Use the reference library](https://github.com/agentskills/agentskills/tree/main/skills-ref) to validate skills and generate prompt XML.

---

## 页 3 — Specification (`/specification`)

# Specification

> The complete format specification for Agent Skills.

## Directory structure

A skill is a directory containing, at minimum, a `SKILL.md` file:

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

## `SKILL.md` format

The `SKILL.md` file must contain YAML frontmatter followed by Markdown content.

### Frontmatter

| Field           | Required | Constraints                                                                                                       |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `name`          | Yes      | Max 64 characters. Lowercase letters, numbers, and hyphens only. Must not start or end with a hyphen.             |
| `description`   | Yes      | Max 1024 characters. Non-empty. Describes what the skill does and when to use it.                                 |
| `license`       | No       | License name or reference to a bundled license file.                                                              |
| `compatibility` | No       | Max 500 characters. Indicates environment requirements (intended product, system packages, network access, etc.). |
| `metadata`      | No       | Arbitrary key-value mapping for additional metadata.                                                              |
| `allowed-tools` | No       | Space-separated string of pre-approved tools the skill may use. (Experimental)                                    |

**Minimal example:**

```markdown SKILL.md
---
name: skill-name
description: A description of what this skill does and when to use it.
---
```

**Example with optional fields:**

```markdown SKILL.md
---
name: pdf-processing
description: Extract PDF text, fill forms, merge files. Use when handling PDFs.
license: Apache-2.0
metadata:
  author: example-org
  version: "1.0"
---
```

#### `name` field

The required `name` field:

* Must be 1-64 characters
* May only contain unicode lowercase alphanumeric characters (`a-z`) and hyphens (`-`)
* Must not start or end with a hyphen (`-`)
* Must not contain consecutive hyphens (`--`)
* Must match the parent directory name

**Valid examples:**

```yaml
name: pdf-processing
```

```yaml
name: data-analysis
```

```yaml
name: code-review
```

**Invalid examples:**

```yaml
name: PDF-Processing  # uppercase not allowed
```

```yaml
name: -pdf  # cannot start with hyphen
```

```yaml
name: pdf--processing  # consecutive hyphens not allowed
```

#### `description` field

The required `description` field:

* Must be 1-1024 characters
* Should describe both what the skill does and when to use it
* Should include specific keywords that help agents identify relevant tasks

**Good example:**

```yaml
description: Extracts text and tables from PDF files, fills PDF forms, and merges multiple PDFs. Use when working with PDF documents or when the user mentions PDFs, forms, or document extraction.
```

**Poor example:**

```yaml
description: Helps with PDFs.
```

#### `license` field

The optional `license` field:

* Specifies the license applied to the skill
* We recommend keeping it short (either the name of a license or the name of a bundled license file)

**Example:**

```yaml
license: Proprietary. LICENSE.txt has complete terms
```

#### `compatibility` field

The optional `compatibility` field:

* Must be 1-500 characters if provided
* Should only be included if your skill has specific environment requirements
* Can indicate intended product, required system packages, network access needs, etc.

**Examples:**

```yaml
compatibility: Designed for Claude Code (or similar products)
```

```yaml
compatibility: Requires git, docker, jq, and access to the internet
```

```yaml
compatibility: Requires Python 3.14+ and uv
```

> Note: Most skills do not need the `compatibility` field.

#### `metadata` field

The optional `metadata` field:

* A map from string keys to string values
* Clients can use this to store additional properties not defined by the Agent Skills spec
* We recommend making your key names reasonably unique to avoid accidental conflicts

**Example:**

```yaml
metadata:
  author: example-org
  version: "1.0"
```

#### `allowed-tools` field

The optional `allowed-tools` field:

* A space-separated string of tools that are pre-approved to run
* Experimental. Support for this field may vary between agent implementations

**Example:**

```yaml
allowed-tools: Bash(git:*) Bash(jq:*) Read
```

### Body content

The Markdown body after the frontmatter contains the skill instructions. There are no format restrictions. Write whatever helps agents perform the task effectively.

Recommended sections:

* Step-by-step instructions
* Examples of inputs and outputs
* Common edge cases

Note that the agent will load this entire file once it's decided to activate a skill. Consider splitting longer `SKILL.md` content into referenced files.

## Optional directories

### `scripts/`

Contains executable code that agents can run. Scripts should:

* Be self-contained or clearly document dependencies
* Include helpful error messages
* Handle edge cases gracefully

Supported languages depend on the agent implementation. Common options include Python, Bash, and JavaScript.

### `references/`

Contains additional documentation that agents can read when needed:

* `REFERENCE.md` - Detailed technical reference
* `FORMS.md` - Form templates or structured data formats
* Domain-specific files (`finance.md`, `legal.md`, etc.)

Keep individual reference files focused. Agents load these on demand, so smaller files mean less use of context.

### `assets/`

Contains static resources:

* Templates (document templates, configuration templates)
* Images (diagrams, examples)
* Data files (lookup tables, schemas)

## Progressive disclosure

Skills should be structured for efficient use of context:

1. **Metadata** (~100 tokens): The `name` and `description` fields are loaded at startup for all skills
2. **Instructions** (< 5000 tokens recommended): The full `SKILL.md` body is loaded when the skill is activated
3. **Resources** (as needed): Files (e.g. those in `scripts/`, `references/`, or `assets/`) are loaded only when required

Keep your main `SKILL.md` under 500 lines. Move detailed reference material to separate files.

## File references

When referencing other files in your skill, use relative paths from the skill root:

```markdown SKILL.md
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

Keep file references one level deep from `SKILL.md`. Avoid deeply nested reference chains.

## Validation

Use the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) reference library to validate your skills:

```bash
skills-ref validate ./my-skill
```

This checks that your `SKILL.md` frontmatter is valid and follows all naming conventions.

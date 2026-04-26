---
source_url: https://hermes-agent.nousresearch.com/docs/user-guide/security
fetched_at: 2026-04-26
author: Nous Research
platform: web
fetch_method: webfetch
note: 官方 Hermes Agent 安全文档（user-guide/security）；用于解 2026-04-25 ingest 引入的"5 vs 3 层安全"Conflict
---

# Hermes Agent Security Documentation

## Overview & Security Model

The security model comprises **seven layers**:

1. "User authorization — who can talk to the agent (allowlists, DM pairing)"
2. "Dangerous command approval — human-in-the-loop for destructive operations"
3. "Container isolation — Docker/Singularity/Modal sandboxing with hardened settings"
4. "MCP credential filtering — environment variable isolation for MCP subprocesses"
5. "Context file scanning — prompt injection detection in project files"
6. "Cross-session isolation — sessions cannot access each other's data or state"
7. "Input sanitization — working directory parameters in terminal tool backends are validated"

## Dangerous Command Approval

### Approval Modes Configuration

Three operational modes via `approvals.mode` in `~/.hermes/config.yaml`:

- **manual** (default): Always prompt users for approval
- **smart**: Auxiliary LLM assesses risk; low-risk auto-approved, dangerous auto-denied, uncertain escalates
- **off**: Disables all approval checks (equivalent to `--yolo`)

### YOLO Mode Activation

Three methods to bypass approval prompts:
- CLI flag: `hermes --yolo` or `hermes chat --yolo`
- Slash command: `/yolo` (toggle on/off during session)
- Environment variable: `HERMES_YOLO_MODE=1`

### Approval Timeout

"User has a configurable amount of time to respond. If no response is given within the timeout, the command is denied by default (fail-closed)."

Default configuration:
```yaml
approvals:
  timeout: 60  # seconds (default: 60)
```

### Dangerous Pattern Triggers

Key patterns requiring approval include:
- Recursive delete: `rm -r`, `rm --recursive`
- Root path deletion: `rm ... /`
- World-writable permissions: `chmod 777/666`, `o+w`, `a+w`
- Filesystem operations: `mkfs`, `dd if=`
- SQL destructive: `DROP TABLE/DATABASE`, `DELETE FROM` (without WHERE), `TRUNCATE TABLE`
- System file overwrites: `> /etc/`
- Process termination: `kill -9 -1`, `pkill -9`
- Shell execution: `bash -c`, `python -e`, `curl | sh`
- Sensitive file overwrites via `tee` or redirection to `/etc/`, `~/.ssh/`, `~/.hermes/.env`

### Approval Flow (CLI)

```
⚠️  DANGEROUS COMMAND: recursive delete
rm -rf /tmp/old-project
[o]nce  |  [s]ession  |  [a]lways  |  [d]eny
Choice [o/s/a/D]:
```

Four options: once, session, always (permanent allowlist), deny (default).

### Approval Flow (Gateway/Messaging)

Agent sends command details to chat; user replies with: **yes**, **y**, **approve**, **ok**, **go** (approve) or **no**, **n**, **deny**, **cancel** (deny).

Environment variable `HERMES_EXEC_ASK=1` automatically set when running gateway.

### Permanent Allowlist

```yaml
command_allowlist:
  - rm
  - systemctl
```

## User Authorization (Gateway)

### Authorization Check Order

1. Per-platform allow-all flag (e.g., `DISCORD_ALLOW_ALL_USERS=true`)
2. DM pairing approved list
3. Platform-specific allowlists (e.g., `TELEGRAM_ALLOWED_USERS`)
4. Global allowlist (`GATEWAY_ALLOWED_USERS`)
5. Global allow-all (`GATEWAY_ALLOW_ALL_USERS=true`)
6. Default: deny

### Platform Allowlists Configuration

```yaml
TELEGRAM_ALLOWED_USERS=123456789,987654321
DISCORD_ALLOWED_USERS=111222333444555666
WHATSAPP_ALLOWED_USERS=15551234567
SLACK_ALLOWED_USERS=U01ABC123
GATEWAY_ALLOWED_USERS=123456789
DISCORD_ALLOW_ALL_USERS=true
GATEWAY_ALLOW_ALL_USERS=true
```

### DM Pairing System

**Code security features** (based on OWASP + NIST SP 800-63-4):
- Code format: "8-char from 32-char unambiguous alphabet (no 0/O/1/I)"
- Randomness: Cryptographic (`secrets.choice()`)
- Code TTL: 1 hour expiry
- Rate limiting: 1 request per user per 10 minutes
- Pending limit: Max 3 pending codes per platform
- Lockout: 5 failed approval attempts → 1-hour lockout
- File security: `chmod 0600` on all pairing data files

**Pairing CLI commands:**
```bash
hermes pairing list
hermes pairing approve telegram ABC12DEF
hermes pairing revoke telegram 123456789
hermes pairing clear-pending
```

**Storage location:** `~/.hermes/pairing/` with per-platform JSON files.

**Configuration:**
```yaml
unauthorized_dm_behavior: pair  # or "ignore"
whatsapp:
  unauthorized_dm_behavior: ignore
```

## Container Isolation

### Docker Security Flags

```python
_SECURITY_ARGS = [
    "--cap-drop", "ALL",
    "--cap-add", "DAC_OVERRIDE",
    "--cap-add", "CHOWN",
    "--cap-add", "FOWNER",
    "--security-opt", "no-new-privileges",
    "--pids-limit", "256",
    "--tmpfs", "/tmp:rw,nosuid,size=512m",
    "--tmpfs", "/var/tmp:rw,noexec,nosuid,size=256m",
    "--tmpfs", "/run:rw,noexec,nosuid,size=64m"
]
```

### Resource Limits Configuration

```yaml
terminal:
  backend: docker
  docker_image: "nikolaik/python-nodejs:python3.11-nodejs20"
  docker_forward_env: []
  container_cpu: 1           # CPU cores
  container_memory: 5120     # MB (default 5GB)
  container_disk: 51200      # MB (default 50GB)
  container_persistent: true
```

### Filesystem Persistence Modes

- **Persistent mode**: Bind-mounts `/workspace` and `/root` from `~/.hermes/sandboxes/docker/<task_id>/`
- **Ephemeral mode**: Uses tmpfs for workspace

## Terminal Backend Security Comparison

| Backend | Isolation | Dangerous Cmd Check | Best For |
|---------|-----------|-------------------|----------|
| **local** | None — runs on host | ✅ Yes | Development, trusted users |
| **ssh** | Remote machine | ✅ Yes | Running on separate server |
| **docker** | Container | ❌ Skipped (container is boundary) | Production gateway |
| **singularity** | Container | ❌ Skipped | HPC environments |
| **modal** | Cloud sandbox | ❌ Skipped | Scalable cloud isolation |
| **daytona** | Cloud sandbox | ❌ Skipped | Persistent cloud workspaces |

## Environment Variable Passthrough

### Skill-Scoped Passthrough (Automatic)

Skills declare `required_environment_variables` in frontmatter; vars set automatically register as passthrough.

```yaml
required_environment_variables:
  - name: TENOR_API_KEY
    prompt: Tenor API key
    help: Get a key from https://developers.google.com/tenor
```

### Config-Based Passthrough (Manual)

```yaml
terminal:
  env_passthrough:
    - MY_CUSTOM_KEY
    - ANOTHER_TOKEN
```

### Credential File Passthrough

```yaml
required_credential_files:
  - path: google_token.json
    description: Google OAuth2 token
```

Mount behavior:
- **Docker**: Read-only bind mounts (`-v host:container:ro`)
- **Modal**: Mounted at sandbox creation + synced before each command
- **Local**: No action needed

### Sandbox Filtering Behavior

| Sandbox | Default Filter | Passthrough Override |
|---------|---|---|
| **execute_code** | Blocks vars containing `KEY`, `TOKEN`, `SECRET`, `PASSWORD`, `CREDENTIAL`, `PASSWD`, `AUTH` | ✅ Passthrough vars bypass both checks |
| **terminal** (local) | Blocks explicit Hermes infrastructure vars | ✅ Passthrough vars bypass blocklist |
| **terminal** (Docker) | No host env vars by default | ✅ Passthrough + `docker_forward_env` forwarded via `-e` |
| **terminal** (Modal) | No host env/files by default | ✅ Credential files mounted; env passthrough via sync |
| **MCP** | Blocks everything except safe system vars + explicitly configured `env` | ❌ Not affected by passthrough |

## MCP Credential Handling

### Safe Environment Variables

Only these pass from host to MCP stdio subprocesses:
```
PATH, HOME, USER, LANG, LC_ALL, TERM, SHELL, TMPDIR
```
Plus any `XDG_*` variables.

```yaml
mcp_servers:
  github:
    command: "npx"
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_..."
```

### Credential Redaction

Redacted patterns: GitHub PATs, OpenAI-style keys, Bearer tokens, `token=`/`key=`/`API_KEY=`/`password=`/`secret=` parameters.

## Website Access & SSRF Protection

### Website Blocklist Configuration

```yaml
security:
  website_blocklist:
    enabled: true
    domains:
      - "*.internal.company.com"
      - "admin.example.com"
    shared_files:
      - "/etc/hermes/blocked-sites.txt"
```

### SSRF Protection

"All URL-capable tools (web search, web extract, vision, browser) validate URLs before fetching them." Blocked addresses include:
- Private networks (RFC 1918): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
- Loopback: `127.0.0.0/8`, `::1`
- Link-local: `169.254.0.0/16` (cloud metadata)
- CGNAT (RFC 6598): `100.64.0.0/10` (Tailscale, WireGuard)
- Cloud metadata hostnames: `metadata.google.internal`, `metadata.goog`
- Reserved, multicast, unspecified addresses

"DNS failures are treated as blocked (fail-closed). Redirect chains are re-validated at each hop."

## Tirith Pre-Exec Security Scanning

```yaml
security:
  tirith_enabled: true
  tirith_path: "tirith"
  tirith_timeout: 5
  tirith_fail_open: true
```

"Tirith detects threats that pattern matching alone misses: Homograph URL spoofing (internationalized domain attacks), Pipe-to-interpreter patterns (`curl | bash`, `wget | sh`), Terminal injection attacks"

Tirith auto-installs with SHA-256 checksum verification (and cosign provenance if available).

## Context File Injection Protection

Scanned files: AGENTS.md, .cursorrules, SOUL.md

Scanner checks for:
- Instructions to ignore/disregard prior instructions
- Hidden HTML comments with suspicious keywords
- Attempts to read secrets (`.env`, `credentials`, `.netrc`)
- Credential exfiltration via `curl`
- Invisible Unicode characters

Blocked file notification:
```
[BLOCKED: AGENTS.md contained potential prompt injection (prompt_injection). Content not loaded.]
```

## Production Deployment Best Practices

### Gateway Deployment Checklist

1. Set explicit allowlists — never use `GATEWAY_ALLOW_ALL_USERS=true` in production
2. Use container backend — set `terminal.backend: docker`
3. Restrict resource limits
4. Store secrets securely (`chmod 600 ~/.hermes/.env`)
5. Enable DM pairing
6. Review command allowlist
7. Set `MESSAGING_CWD` — don't operate from sensitive directories
8. Run as non-root
9. Monitor logs at `~/.hermes/logs/`
10. Keep updated — `hermes update` regularly

## Key Caveats & Limitations

- Container bypass: "When running in `docker`, `singularity`, `modal`, or `daytona` backends, dangerous command checks are skipped because the container itself is the security boundary."
- Docker forward_env warning: "If you add names to `terminal.docker_forward_env`, those variables are intentionally injected into the container... it also means code running in the container can read and exfiltrate them."
- Tirith fail-open default: Set `tirith_fail_open: false` in high-security environments.
- Missing credentials not leaked: "Missing/unset vars are never registered."

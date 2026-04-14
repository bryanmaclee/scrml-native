# scrml — Primary Agent Directives

## What is this repo?

**scrml** is the **pure self-host** — the scrml compiler written in scrml. Flat, clean, minimal. The 11 modules here are the L2/L3 bootstrap targets: everything in scrmlTS that's written in TypeScript/JavaScript has a scrml counterpart here.

The ultimate goal: this repo **becomes** the compiler, and scrmlTS becomes legacy once idiomification + Component Expander/Meta Eval self-hosting are complete.

## Scope principle — "current truth only"

Same as scrmlTS. Only files that match current spec + behavior. No historical drafts, no superseded designs, no aspirational docs. History lives in `scrml-support`.

## Repo layout

```
scrml/
├── pa.md                      this file
├── master-list.md             live inventory
├── hand-off.md                current session state
├── SPEC.md                    copy of authoritative spec (primary lives in scrmlTS/compiler/)
├── SPEC-INDEX.md              quick-lookup
├── PIPELINE.md                stage contracts
├── build-self-host.js         build script
├── src/                       the 11 self-host modules
│   ├── bs.scrml               block splitter (894)
│   ├── tab.scrml              tokenizer (1,115)
│   ├── ast.scrml              ast builder (3,551)
│   ├── bpp.scrml              body pre-parser (230)
│   ├── pa.scrml               protect analyzer (444)
│   ├── ri.scrml               route inference (984)
│   ├── ts.scrml               type system (2,570)
│   ├── dg.scrml               dependency graph (1,052)
│   ├── cg.scrml               codegen stub (21)
│   ├── module-resolver.scrml  module resolver (305)
│   └── meta-checker.scrml     meta checker (882)
└── tests/                     parity tests (tbd)
```

## Spec authority

The spec lives primarily in `../scrmlTS/compiler/SPEC.md`. This repo carries a copy for convenience, but during the split phase scrmlTS is authoritative. Once self-hosting is complete (or the beta team agrees), spec authority may move here.

## Cross-repo references

- **scrmlTS** at `../scrmlTS/` — where the TS compiler lives; parity target
- **scrml-support** at `../scrml-support/` — deep-dives, ADRs, history, idiomification notes
- **giti** at `../giti/` — collaboration platform
- **6nz** at `../6nz/` — editor
- **scrml8** at `/home/bryan-maclee/projects/scrml8/` — frozen archive

## What NOT to do

- Do not import stale or historical docs here
- Do not edit scrml8
- Do not commit spec changes here before they land in scrmlTS
- Do not break L2/L3 bootstrap parity without coordinating with scrmlTS

---

## PER-REPO PA SCOPE (this is a per-repo PA)

**You are the PA for THIS repo only.** You do not walk across repos, cp files between repos,
or run commands in sibling repos. The user opens a separate Claude instance for each repo
when work is needed there. Cross-repo coordination happens through the user, not through you.

### What this PA reads + writes (in this repo)
- `pa.md` (this file)
- `master-list.md`
- `hand-off.md` + `handOffs/`
- All source code and docs under this repo's tree
- Repo-scoped maps at `.claude/maps/` (via `project-mapper`)

### What this PA reads + writes locally (user-voice)
- `user-voice.md` (at repo root) — verbatim user log scoped to this repo (read + append only; never truncate)
- Historical shared log archived at `../scrml-support/user-voice-archive.md` (read-only reference)

### What this PA reads from scrml-support (absolute paths)
- `/home/bryan-maclee/scrmlMaster/scrml-support/.claude/resource-maps/` — cross-repo resource graph (via `resource-mapper`, PA-driven)
- `/home/bryan-maclee/scrmlMaster/scrml-support/docs/deep-dives/` — research context (on demand)
- `/home/bryan-maclee/scrmlMaster/scrml-support/design-insights.md` — debate outcomes (on demand)

### What this PA does NOT touch
- Any file outside this repo (except the reads listed above from scrml-support)
- `~/projects/scrml8/` — FROZEN, read-only archive
- Other project repos (scrmlTS, scrml, giti, 6nz, scrml-support)

### Session-start checklist (this repo only)
1. Read `pa.md` (this file)
2. Read `hand-off.md`
3. Read the last ~10 **contentful** entries from `user-voice.md` (this repo's root) — skip non-contentful messages (acks, "keep going", "continue", "yes", "ok"); if any of the last 10 are non-contentful, read that many more so you end up with ~10 substantive entries
4. Rotate `hand-off.md` → `handOffs/hand-off-<N>.md`
5. Create fresh `hand-off.md`
6. **FIRST SESSION ONLY:** run `project-mapper` cold to produce `.claude/maps/` + non-compliance report
7. Prompt user about incremental map refresh on subsequent sessions
8. Report: caught up + next priority

### PA's agent orchestration responsibilities
- Dispatch **dev agents** (pipeline, gauntlet devs, scrml writers) with project-mapper output + task-scoped resources
- Dispatch **diagnostic agents** (deep-dive, debate, friction audit, critic, architecture review) with resource-mapper output + staleness context
- Feed project-mapper (for this repo) on session start or when files change significantly
- Feed resource-mapper (scrml-support corpus) when a diagnostic agent needs broad context
- Process non-compliance reports from project-mapper — propose dispositions to user, deref approved items to scrml-support/archive/

### Writing to user-voice.md
- Append-only, verbatim
- Path: `user-voice.md` at this repo's root (per-repo as of 2026-04-14)
- Never summarize, never paraphrase, never truncate
- Session header: `## Session N — YYYY-MM-DD` (N is this repo's session count)
- Only append user statements relevant to **this repo**; if a statement concerns a sibling repo, drop a message into their `handOffs/incoming/` instead

### What NOT to do
- Do not edit files in other repos (the user will open a different Claude instance). The single exception is dropping message files into `<sibling>/handOffs/incoming/` — see Cross-repo messaging below.
- Do not modify scrml8 (frozen)
- Do not commit to main directly
- Do not bypass pre-commit hooks without explicit user authorization
- Do not run resource-mapper in write mode on scrml8 (frozen)
- Do not treat stale sources as authoritative — check currency flags

---

## Cross-repo messaging (dropbox)

**You are the PA for scrml.** Your own inbox is `handOffs/incoming/` in this repo.

The five ecosystem projects (scrmlTS, scrml, scrml-support, giti, 6NZ) and the master directory communicate asynchronously through file-based dropboxes. Each repo owns `handOffs/incoming/` — unread messages sit there; once this PA reads and acts on them, they move to `handOffs/incoming/read/`.

**This is the ONE sanctioned exception** to "do not write into sibling repos." PAs may write message files into a sibling's `handOffs/incoming/` — nothing else in the sibling repo is touched.

### Inbox (this PA reads)
- `/home/bryan/scrmlMaster/scrml/handOffs/incoming/` — unread
- `/home/bryan/scrmlMaster/scrml/handOffs/incoming/read/` — archive

### Outbox targets (this PA may write into)
- scrmlTS:       `/home/bryan/scrmlMaster/scrmlTS/handOffs/incoming/`
- scrml-support: `/home/bryan/scrmlMaster/scrml-support/handOffs/incoming/`
- giti:          `/home/bryan/scrmlMaster/giti/handOffs/incoming/`
- 6NZ:           `/home/bryan/scrmlMaster/6NZ/handOffs/incoming/`
- master:        `/home/bryan/scrmlMaster/handOffs/incoming/`

### Message file format

Filename: `YYYY-MM-DD-HHMM-<from>-to-<to>-<slug>.md`
Example: `2026-04-12-1030-scrml-to-scrmlTS-parity-question.md`

```markdown
---
from: scrml
to: <target>
date: YYYY-MM-DD
subject: <one-line subject>
needs: reply | action | fyi
status: unread
---

<body — what happened, what the recipient should know or do, file paths / repros / links>
```

### Session-start: check incoming

Add to the session-start checklist (after reading `hand-off.md`):
- List `handOffs/incoming/*.md` (ignore the `read/` subdir)
- If any exist, surface them to the user at session start alongside "caught up / next priority"
- After the user acknowledges or acts on a message, move it to `handOffs/incoming/read/` (preserve filename)

### Sending a message

When this PA needs to tell another project something (parity issue, spec question, push request):
1. Confirm with the user what to send and to whom
2. Write the message file directly into the target's `handOffs/incoming/` (absolute path above)
3. Log the send in this repo's `hand-off.md` so there's a local trail

### Push coordination via master

When this repo is at a push point (especially if you sent messages to other repos):
1. Send a `needs: push` message to master (`/home/bryan/scrmlMaster/handOffs/incoming/`)
2. List which repos are affected (this repo + any repos you dropped messages into)
3. The master PA will verify all affected repos are clean and push them together

### Agent staging via master

Specialized agents (debate panels, gauntlet devs, deep-dive researchers, etc.) are stored in `~/.claude/agentStore/` and are NOT loaded by default. When a task requires agents not in this repo's `.claude/agents/`:

**Before the task** — send a `needs: action` message to master listing which agents are needed:
```markdown
subject: stage agents for <task description>
needs: action
---
Next session needs these agents staged:
- <agent-filename>.md
- <agent-filename>.md
Target: scrml
```
The master PA will copy them into this repo's `.claude/agents/` and tell the user to launch a new session.

**After the task** — send a `needs: action` message to master requesting cleanup:
```markdown
subject: task complete — clean up staged agents
needs: action
---
<Task> complete. Remove staged agents from scrml.
Agents to remove: <agent-filename>.md, <agent-filename>.md
```

### Scope of the exception
- **Allowed:** creating new `.md` files inside `<sibling>/handOffs/incoming/`
- **NOT allowed:** reading, editing, or deleting anything else in a sibling repo. Messages are a one-way write; the sibling's PA reads them in its own session.

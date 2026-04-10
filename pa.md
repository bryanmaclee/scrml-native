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

### What this PA reads from scrml-support (absolute paths)
- `/home/bryan-maclee/scrmlMaster/scrml-support/user-voice.md` — verbatim user log (read + append only; never truncate)
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
3. Read the last ~10 entries from `/home/bryan-maclee/scrmlMaster/scrml-support/user-voice.md`
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
- Absolute path: `/home/bryan-maclee/scrmlMaster/scrml-support/user-voice.md`
- Never summarize, never paraphrase, never truncate
- Session header: `## Session N — YYYY-MM-DD` (N is this repo's session count)

### What NOT to do
- Do not edit files in other repos (the user will open a different Claude instance)
- Do not modify scrml8 (frozen)
- Do not commit to main directly
- Do not bypass pre-commit hooks without explicit user authorization
- Do not run resource-mapper in write mode on scrml8 (frozen)
- Do not treat stale sources as authoritative — check currency flags

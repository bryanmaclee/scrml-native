# primary.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Project Fingerprint

Language:   scrml (self-host compiler modules) + JavaScript (build script)
Framework:  scrml compiler pipeline (11 stages)
Runtime:    Bun (required — `Bun.Transpiler`, `Bun.SQL` referenced in spec/build)
Type:       Compiler (pure self-host — the scrml compiler written in scrml)
Size:       ~13 files (11 .scrml modules + build script + spec copies)

## Repo Context

This is the **pure self-host** repo. It contains the scrml compiler written in scrml.
The ultimate goal: these modules replace the TypeScript originals in scrml.

- Spec authority: `../scrml/compiler/SPEC.md` (primary during split phase). This repo
  carries a copy (`SPEC.md`) for convenience.
- Parity target: `../scrml/` (TS compiler)
- Bootstrap status: L2 + L3 complete (master-list.md)
- Open self-hosting gaps: CE (Component Expander), ME (Meta Eval) — not yet ported

## Map Index

| Map | Status | Contents |
|---|---|---|
| structure.map.md | present | directory layout, 11 module list, entry points |
| dependencies.map.md | present | build-time deps, internal pipeline data flow |
| schema.map.md | present | pipeline I/O types from PIPELINE.md contracts |
| config.map.md | present | no env vars; build script path staleness noted |
| build.map.md | present | build-self-host.js, CG assembly, stale path warning |
| error.map.md | present | pipeline error codes by stage |
| test.map.md | present | empty tests/; parity tests in scrml |
| pipeline.map.md | present | all 11 stage contracts, I/O shapes, key invariants |
| api.map.md | absent | not applicable (compiler, not web API) |
| state.map.md | absent | not applicable |
| events.map.md | absent | not applicable |
| auth.map.md | absent | not applicable |
| domain.map.md | absent | not applicable (pipeline.map.md covers domain) |
| style.map.md | absent | not applicable |
| i18n.map.md | absent | not applicable |
| infra.map.md | absent | no CI/CD, no Docker |
| migrations.map.md | absent | not applicable |
| jobs.map.md | absent | not applicable |

## File Routing

pipeline stage contracts / I/O shapes   → pipeline.map.md
module list / file purposes              → structure.map.md
build commands / output paths            → build.map.md
error codes / error shapes               → error.map.md
test status / parity coverage            → test.map.md
stage I/O type definitions               → schema.map.md
env vars / config keys                   → config.map.md
package / runtime dependencies           → dependencies.map.md

## Key Facts

- Entry point for building: `build-self-host.js` (Bun script) — calls scrml's `compileScrml()`
  on each `.scrml` module; writes `.js` to `compiler/dist/self-host/` (paths are stale from scrml8 split)
- All 11 modules live flat in `src/` with no subdirectories
- `bpp.scrml` (230 LOC) is a legacy artifact — BPP stage was removed in PIPELINE v0.6.0 and
  `bpp.scrml` is not compiled by the current build script
- `cg.scrml` is a 21-line loader stub — actual CG logic is raw JS in `cg-parts/` (not yet present
  in this repo at scan time)
- `meta-checker.scrml` has a runtime dependency on `expression-parser.js` (copied from scrml at build time)
- `ast.scrml` imports its tokenizer as `"./tokenizer.js"` — the build script creates this alias
  by copying `tab.js` → `tokenizer.js` post-compile
- Spec copy in this repo: SPEC.md (18,521 lines, 53 sections) — scrml is authoritative during split phase
- Tests directory is empty; parity tests live in `../scrml/compiler/tests/self-host/` (migration planned)
- Open idiomification work: `ts.scrml` (2,570 LOC) and `ast.scrml` (3,551 LOC) flagged in master-list.md

## Tags
#scrml #map #primary #self-host #compiler

## Links
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [pipeline.map.md](./pipeline.map.md)
- [structure.map.md](./structure.map.md)
- [build.map.md](./build.map.md)
- [test.map.md](./test.map.md)
- [error.map.md](./error.map.md)

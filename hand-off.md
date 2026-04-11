# scrml — Session 2 Hand-Off

**Date:** 2026-04-11
**Next hand-off filename:** `handOffs/hand-off-2.md`

## Caught up from
- Session 1 (handOffs/hand-off-1.md): initial split from scrml8. 11 `.scrml` modules in `src/`, spec copies, pa.md + master-list.md in place.

## Session Work

### 1. Repo onto main + branch hygiene (DONE)
Session started on detached HEAD with 3 unmerged commits. Rotated hand-off, committed on temp `session-2` branch, fast-forward merged to `main`. Everything on `main`, nothing lost.

### 2. Cold project map (DONE)
Ran `project-mapper` cold for the first time. Wrote to `.claude/maps/`:
- primary, structure, dependencies, schema, config, build, error, test, pipeline
- `non-compliance.report.md`

Skipped api/state/events/auth maps (not applicable — this is a compiler repo).

### 3. Non-compliance findings (2)
- **`build-self-host.js`** — stale scrml8 monorepo paths. Fixed this session.
- **`SPEC.md`** — copy from scrmlTS at 2026-04-10; may already be behind as scrmlTS moves ahead. Diff before treating as authoritative.

### 4. Build script fix (DONE) — commit `4bded13`
Rewired `build-self-host.js` for the flat `src/` layout:
- Source modules resolved from `src/*.scrml`
- `compileScrml` imported from `../scrmlTS/compiler/src/api.js` (scrmlTS authoritative during split)
- `expression-parser.ts` sourced from scrmlTS
- Output → `./dist/self-host/`
- CG assembly gracefully skips when `src/cg-parts/` missing (still in frozen scrml8)

**Build result:** 8 of 10 modules compile cleanly:
- PASS: module-resolver, meta-checker, bs, tab, ast, ri, ts, dg
- FAIL: `bpp.scrml:80` — `E-CTX-003: Unclosed 'trimmed'`
- FAIL: `pa.scrml` — 10× `E-EQ-004: !== is not valid, use !=`

### 5. Spec drift flagged (HOLD)
User confirmed: **scrmlTS has moved ahead post-split.** The 2 failing modules compiled fine in scrml8, so these failures are almost certainly scrmlTS spec/compiler drift, not real source bugs. Fixing them blindly would mask the drift. **On hold pending spec-copy sync strategy.**

## Next up

- [ ] **Resolve spec drift** — diff this repo's `SPEC.md` against `../scrmlTS/compiler/SPEC.md`; decide sync strategy (re-copy on each session? manual sync? wait for self-host to become authoritative?)
- [ ] **Re-evaluate `bpp.scrml` + `pa.scrml` failures** after spec sync — they may vanish, or they may indicate real idiomification work
- [ ] Migrate parity tests from scrmlTS
- [ ] Idiomification pass on `ts.scrml` + `ast.scrml`
- [ ] Port Component Expander + Meta Eval

## Open questions for next session
- What's the sync cadence with scrmlTS during the split phase? (spec copy, api.js shape, error code set)
- Should `cg-parts/` be copied into this repo, or stay in scrml8 until CG is truly self-hosted via `cg.scrml`?

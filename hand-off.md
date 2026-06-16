# scrml — Session 3 Hand-Off

**Date:** 2026-04-12
**Next hand-off filename:** `handOffs/hand-off-3.md`

## Caught up from
- Session 2 (handOffs/hand-off-2.md): cold project map done, build script fixed for flat src/ layout, 8/10 modules compile. 2 failures (bpp.scrml, pa.scrml) traced to scrml spec/compiler drift. On hold pending sync strategy.

## Session Work

### 1. Session start housekeeping (DONE) — commit `2230749`
- Rotated hand-off-2.md, created fresh hand-off.md
- Committed `pa.md` with cross-repo messaging section (user had edited this between sessions)
- Checked inbox: empty
- Read user-voice (scrml S6-S7 entries)
- Initialized memory system for this repo

### 2. Quick wrap
User had no further work this session — just needed the pa.md tracked and committed.

## Next up

- [ ] **Resolve spec drift** — diff this repo's `SPEC.md` against `../scrml/compiler/SPEC.md`; decide sync strategy
- [ ] **Re-evaluate `bpp.scrml` + `pa.scrml` failures** after spec sync
- [ ] Migrate parity tests from scrml
- [ ] Idiomification pass on `ts.scrml` + `ast.scrml`
- [ ] Port Component Expander + Meta Eval

## Open questions for next session
- What's the sync cadence with scrml during the split phase? (spec copy, api.js shape, error code set)
- Should `cg-parts/` be copied into this repo, or stay in scrml8 until CG is truly self-hosted via `cg.scrml`?

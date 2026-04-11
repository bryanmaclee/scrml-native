# scrml — Session 1 Hand-Off

**Date:** 2026-04-10
**Next hand-off filename:** `handOffs/hand-off-1.md`

## Stats
- Source: split from scrml8 (~/projects/scrml8/compiler/self-host/) S86
- 11 .scrml modules: 12,048 LOC total
- Spec copies: SPEC.md (18,753 lines), SPEC-INDEX.md, PIPELINE.md

## Session Work

### 1. Initial split from scrml8 (DONE)
Copied `compiler/self-host/*.scrml` → `src/` (flat structure). Copied spec + build script.

### 2. pa.md + master-list.md (DONE)
Scope principle locked: current truth only. Spec authority stays in scrmlTS for now.

## Next up

- [ ] Migrate parity tests from scrmlTS
- [ ] Idiomification pass on ts.scrml + ast.scrml
- [ ] Port Component Expander + Meta Eval
- [ ] Cold project map

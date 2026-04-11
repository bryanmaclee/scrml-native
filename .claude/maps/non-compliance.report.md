# non-compliance.report.md
# project: scrml
# generated: 2026-04-11T00:00:00Z
# scan mode: FULL_COLD_START

## Summary

Total docs scanned: 7
Compliant: 5
Non-compliant: 1
Uncertain: 1

Docs scanned (excluding handOffs/, .git/):
- SPEC.md
- SPEC-INDEX.md
- PIPELINE.md
- pa.md
- master-list.md
- hand-off.md
- README.md

---

## Non-compliant docs

### `build-self-host.js` (not a .md, flagged as artifact non-compliance)

**Reason:** Code artifact describing stale layout  
**Detail:** The build script was copied from scrml8 and retains scrml8/monorepo path assumptions.
Specifically:
- `compilerRoot = scriptDir/..` expects `build-self-host.js` to live inside a `compiler/` subdir
- `projectRoot = compilerRoot/..` targets the scrml8 project root, not this repo's root
- All module source paths resolve to `compiler/self-host/*.scrml` and `stdlib/compiler/*.scrml`
  within the scrml8 tree — none of these paths exist in this repo
- `srcDir` resolves to `../src/api.js` (scrmlTS), not this repo's `src/`
- `cg-parts/` directory referenced but absent from this repo

As written, running `bun build-self-host.js` from this repo will SKIP every module ("source not
found") and produce no output.

**Suggested disposition:** Update `build-self-host.js` to use this repo's actual layout:
- Source modules: `src/*.scrml` (flat, relative to this repo root)
- `compileScrml` import: absolute path to scrmlTS `../scrmlTS/compiler/src/api.js` or add
  scrmlTS as a workspace dependency
- Output dir: relative to this repo (e.g., `dist/self-host/`)
- `cg-parts/` either port from scrml8 or note as not-yet-migrated

---

## Uncertain docs (needs human review)

### `SPEC.md`

**Reason:** Copy vs. authoritative source drift  
**What to check:** `pa.md` explicitly states "spec changes flow from scrmlTS" and "scrmlTS is
authoritative during split phase." SPEC.md in this repo is dated 2026-04-10 (per SPEC-INDEX.md
last-updated). Verify this copy is current with `../scrmlTS/compiler/SPEC.md`. If scrmlTS has
received spec commits since the split, this copy may be behind. Run:
```
diff /home/bryan-maclee/scrmlMaster/scrml/SPEC.md /home/bryan-maclee/scrmlMaster/scrmlTS/compiler/SPEC.md
```
If it diffs, the copy here is stale — update before any agent reads it as authoritative.

---

## Compliant docs

| Doc | Assessment |
|---|---|
| `SPEC-INDEX.md` | Compliant — matches SPEC.md section count (53 sections, 18,521 lines). Last updated 2026-04-10. |
| `PIPELINE.md` | Compliant — v0.6.0 (2026-04-02). Stage index matches module roster. BPP removal documented. |
| `pa.md` | Compliant — current per-repo PA directives, accurate cross-repo refs |
| `master-list.md` | Compliant — accurate module list, LOC counts, bootstrap status. Open work items correctly flagged. |
| `hand-off.md` | Compliant — current session state (session 2, in progress) |
| `README.md` | Compliant (stub) — only contains `# scrml`. Empty by design at this stage. |

---

## Tags
#non-compliance #project-mapper #cleanup #scrml

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)

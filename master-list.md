# scrml — Master List

**Purpose:** Live inventory of the pure self-host repo.

**Last updated:** 2026-04-10 (S86 — initial split)

---

## A. Self-host modules — `src/` (11 files, 12,048 LOC)

| File | LOC | Purpose | Status |
|---|---|---|---|
| `bs.scrml` | 894 | Block splitter | Wired + parity tests in scrmlTS |
| `tab.scrml` | 1,115 | Tokenizer | Wired + parity tests |
| `ast.scrml` | 3,551 | AST builder | Wired + parity tests |
| `bpp.scrml` | 230 | Body pre-parser | Wired + override mechanism |
| `pa.scrml` | 444 | Protect analyzer | Wired + parity tests |
| `ri.scrml` | 984 | Route inference | Wired + 26 parity tests |
| `ts.scrml` | 2,570 | Type system | Wired |
| `dg.scrml` | 1,052 | Dependency graph | Wired + 8 parity tests |
| `cg.scrml` | 21 | Codegen stub | Wired (stub — loads sub-modules) |
| `module-resolver.scrml` | 305 | Module resolver | Wired + parity tests |
| `meta-checker.scrml` | 882 | Meta checker | Wired + parity tests |

**Bootstrap status:**
- L2: all 10 source files produce identical output via selfHostModules — COMPLETE
- L3: self-hosted compileScrml() compiles all source files identically — COMPLETE

---

## B. Spec (copy — primary in scrmlTS)

- [x][x] `SPEC.md` (18,753 lines, 53 sections)
- [x][x] `SPEC-INDEX.md`
- [x][x] `PIPELINE.md` (1,569 lines)

Spec changes flow from scrmlTS. This repo syncs after scrmlTS updates.

---

## C. Build

- [x][x] `build-self-host.js` — produces compiled `.scrml` → `.js` modules consumed by scrmlTS `--self-host`

---

## D. Tests

- [ ][ ] Parity tests — currently live in scrmlTS (`compiler/tests/self-host/`). Migration to this repo TBD.

---

## E. Open work

### Idiomification (making scrml code idiomatic scrml, not "JS-in-scrml")
- [ ][ ] `ts.scrml` (2,570 lines) — tighten patterns
- [ ][ ] `ast.scrml` (3,551 lines) — tighten patterns
- Others confirmed already idiomatic or close

### Not yet self-hosted (remain in scrmlTS)
- [ ][ ] Component Expander — port to `ce.scrml`
- [ ][ ] Meta Eval — port to `me.scrml`

### Cleanup (post-split)
- [ ][ ] Non-compliance audit — run updated project-mapper to find stale docs
- [ ][ ] Migrate parity tests from scrmlTS
- [ ][ ] First cold project map

---

## F. Cross-repo

- **scrmlTS** — TS/JS compiler, parity target
- **scrml-support** — idiomification notes, self-host design rationale
- **scrml8** — frozen archive

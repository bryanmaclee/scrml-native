# structure.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Entry Points

`build-self-host.js` — Node/Bun script; compiles all 11 `.scrml` modules via `compileScrml()` from scrml,
writes `.js` output to `compiler/dist/self-host/` (path is relative to scrml8 layout — see note below).

**Note on build-self-host.js paths:** The script contains hardcoded paths that reference
`../src/api.js` and `../../compiler/self-host/` (scrml8 tree layout). These paths do NOT match
the current repo layout (`src/` contains `.scrml` files directly). This is a staleness artifact
from the split — the script was copied from scrml8 and not yet updated for this repo's flat layout.

## Directory Ownership

```
scrml/
├── src/          — 11 self-host .scrml modules (the compiler written in scrml)
├── tests/        — empty; parity tests currently live in scrml/compiler/tests/self-host/
├── handOffs/     — historical session hand-offs (out of scope for maps)
└── .claude/      — agent tooling; maps/ written here
```

`src/` — Each file is one compiler stage or sub-stage. No subdirectories. Flat layout.
`tests/` — Empty at scan time. Migration from scrml planned (master-list section D).
`handOffs/` — Out of scope (historical). Contains `hand-off-1.md`.

## Self-Host Modules — `src/`

| File | LOC | Pipeline Stage | Abbrev |
|---|---|---|---|
| `bs.scrml` | 894 | Stage 2: Block Splitter | BS |
| `tab.scrml` | 1,115 | Stage 3: Tokenizer + AST Builder | TAB |
| `ast.scrml` | 3,551 | Stage 3: AST Builder (sub-module of TAB) | AST |
| `bpp.scrml` | 230 | Legacy stub — BPP removed in PIPELINE v0.6.0 | BPP |
| `pa.scrml` | 444 | Stage 4: protect= Analyzer | PA |
| `ri.scrml` | 984 | Stage 5: Route Inferrer | RI |
| `ts.scrml` | 2,570 | Stage 6: Type System | TS |
| `dg.scrml` | 1,052 | Stage 7: Dependency Graph Builder | DG |
| `cg.scrml` | 21 | Stage 8: Codegen (stub — loads CG sub-modules) | CG |
| `module-resolver.scrml` | 305 | Stage 3.1: Module Resolver | MOD |
| `meta-checker.scrml` | 882 | Stage 6.5: Meta Check + Eval | META |

Total: 11 files, 12,048 LOC

## Spec / Doc Files (root)

| File | Purpose |
|---|---|
| `SPEC.md` | Copy of authoritative spec (primary: `../scrml/compiler/SPEC.md`). 18,521 lines, 53 sections. |
| `SPEC-INDEX.md` | Quick-lookup table: section → line range → topic |
| `PIPELINE.md` | Stage contracts v0.6.0 — binding I/O contracts for all 11 pipeline stages |
| `pa.md` | Per-repo PA directives and session-start checklist |
| `master-list.md` | Live inventory — modules, spec, build, tests, open work |
| `hand-off.md` | Current session state |
| `README.md` | Stub only ("# scrml") |

## Ignored / Generated Paths

- `handOffs/` — historical, out of scope
- `.git/` — version control
- `.claude/` — agent tooling (this directory)

## Tags
#scrml #map #structure #self-host #compiler

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)

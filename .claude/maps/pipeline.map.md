# pipeline.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Pipeline Overview

The scrml compiler transforms `.scrml` source into HTML + CSS + JS through 11 ordered stages.
Stage contracts are normative in `PIPELINE.md` v0.6.0 (2026-04-02).

**Performance target:** 4000-line project compiled in < 1 second (wall time) with full worker
parallelism. Per-file stages run in Bun workers using `SharedArrayBuffer` + `Atomics` for coordination.

## Stage Index

| # | Abbrev | Name | File | LOC | Parallelism |
|---|---|---|---|---|---|
| 1 | PP | Preprocessor | (not self-hosted) | — | per-file |
| 2 | BS | Block Splitter | `src/bs.scrml` | 894 | per-file |
| 3 | TAB | Tokenizer + AST Builder | `src/tab.scrml` + `src/ast.scrml` | 1,115 + 3,551 | per-file |
| 3.1 | MOD | Module Resolver | `src/module-resolver.scrml` | 305 | project-wide |
| 3.2 | CE | Component Expander | (not self-hosted) | — | per-file (after MOD) |
| 4 | PA | protect= Analyzer | `src/pa.scrml` | 444 | project-wide |
| 5 | RI | Route Inferrer | `src/ri.scrml` | 984 | project-wide |
| 6 | TS | Type System | `src/ts.scrml` | 2,570 | per-file (after PA+RI) |
| 6.5 | META | Meta Check + Eval | `src/meta-checker.scrml` | 882 | project-wide |
| 7 | DG | Dependency Graph | `src/dg.scrml` | 1,052 | project-wide |
| 8 | CG | Code Generator | `src/cg.scrml` (stub) | 21 | per-file (after DG) |

**Not yet self-hosted (remain in scrmlTS):**
- PP (Stage 1) — Preprocessor
- CE (Stage 3.2) — Component Expander (`ce.scrml` planned)

## Stage Contracts (summary)

### BS (Stage 2) — `src/bs.scrml`
- Input: `{ filePath, source, macroTable }`
- Output: `{ filePath, blocks: Block[] }`
- Block types: `markup | state | logic | sql | css | error-effect | meta | text | comment`
- Key: `<ident` = markup, `< ident` = state (whitespace disambiguates)
- Closer forms: `explicit | inferred | trailing | self-closing | null`
- Errors: `BSError` thrown (fail-fast). Codes: `E-CTX-001`, `E-CTX-002`, `E-CTX-003`

### TAB (Stage 3) — `src/tab.scrml` + `src/ast.scrml`
- Input: BS output block tree
- Output: Per-file AST (`ast.scrml` imports `tab.scrml` as `"./tokenizer.js"` at runtime)
- Feeds: MOD (Stage 3.1)

### MOD (Stage 3.1) — `src/module-resolver.scrml`
- Input: All TAB outputs (project-wide sync point)
- Output: `{ compilationOrder: string[], exportRegistry: Map<string, ExportShape> }`
- Responsibilities: Import graph, circular import detection, export name validation

### PA (Stage 4) — `src/pa.scrml`
- Input: CE output ASTs + schema I/O (project-wide sync)
- Required inputs: `tables=` (E-PA-005 if absent), `src=` (E-PA-006 if absent)
- Output: `ProtectAnalysis[]` — `{ dbPath, filePath, fields[], views[] }`
- `dbPath` and `filePath` are resolved canonical absolute paths
- Unknown `protect=` field names → `E-PA-007` (error, not warning — since v0.3.0)
- Two db blocks same DB + different protect= lists → independent ProtectAnalysis entries

### RI (Stage 5) — `src/ri.scrml`
- Input: Post-CE ASTs (project-wide)
- Output: Route map `{ routeId, method, path, handler, isServer }[]`
- Note: `FunctionDecl.isServer` from TAB is a syntactic hint; RI is authoritative for server classification
- 26 parity tests in scrmlTS

### TS (Stage 6) — `src/ts.scrml`
- Input: Per-file AST (after PA+RI complete)
- Output: Typed AST with type annotations on every node
- Idiomification target (listed as open work in master-list.md — 2,570 LOC)

### META (Stage 6.5) — `src/meta-checker.scrml`
- Input: Post-TS typed AST (project-wide)
- Output: Post-meta-expansion AST — `^{}` blocks evaluated, results spliced into AST
- Runtime dep: `expression-parser.js` (imported via `^{}` meta import in source)
- Validates phase separation and `reflect()` calls (meta check) + evaluates `^{}` (meta eval)
- DG sees this post-META-expansion AST (not the raw typed AST)

### DG (Stage 7) — `src/dg.scrml`
- Input: Post-META AST (project-wide)
- Output: `DGNode[]` — every node variant has `hasLift: boolean`
- `hasLift=true` when statement(s) immediately following in same anonymous logic block contain `LiftExpr`
- Error: `E-LIFT-001` (concurrent lift — two parallel DG nodes in same logic block both have `hasLift=true`)
- 8 parity tests in scrmlTS

### CG (Stage 8) — `src/cg.scrml` (stub, 21 LOC)
- Input: Post-DG data (per-file after DG complete)
- Output: `{ html, css, js }` per file
- Implementation: `cg.scrml` is a loader stub. The actual CG is assembled at build time from
  `cg-parts/section-*.js` files (raw JS, too brace-heavy for BS to parse as scrml)
- Security invariants (added v0.5.1): client JS MUST NOT contain SQL execution calls,
  `process.env`/`Bun.env`, or other server-only constructs
- CSRF token injection when `csrf="auto"`. Auth check injection when `auth="required"`.
- Error: `E-CG-006` (server-context leak), `W-CG-001` (suppressed SQL block)

## BPP Note

`src/bpp.scrml` (230 LOC) remains in `src/` but was removed from the active pipeline in
PIPELINE v0.6.0. It is NOT in the current `build-self-host.js` modules list as a compiled
output target. It is a legacy artifact of the BPP → CE restructure.

## Tags
#scrml #map #pipeline #stages #contracts #self-host #compiler

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [schema.map.md](./schema.map.md)
- [structure.map.md](./structure.map.md)
- [build.map.md](./build.map.md)

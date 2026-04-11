# schema.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Overview

No TypeScript type files, `.d.ts` files, Prisma schema, or GraphQL schema exist in this repo.
Type shapes for the compiler pipeline are defined in the PIPELINE.md stage contracts (authoritative)
and implemented inside the `.scrml` source modules.

## Pipeline Stage I/O Types (from PIPELINE.md — normative contracts)

These are the named types crossing stage boundaries. They are NOT TypeScript types in this repo —
they are contract-level shapes defined in PIPELINE.md.

### PP Output → BS Input
```
{ filePath: string, source: string, macroTable: Map<string, string> }
```

### BS Output → TAB Input
Block array (each block: `{ type: string, content: string, span: Span }`)
- `Span`: `{ start: number, end: number, line: number, col: number }`

### TAB/AST Output → MOD Input
Per-file AST array. AST node shapes defined in SPEC.md §4–§23 (no TS type file in this repo).

### MOD Output → CE + downstream
`{ compilationOrder: string[], exportRegistry: Map<string, ExportShape> }`

### PA Output
`ProtectAnalysis[]` — `{ dbPath: string, filePath: string, fields: string[], views: string[] }`
(Full shape: PIPELINE.md Stage 4 output contract)

### RI Output
Route map — `{ routeId: string, method: string, path: string, handler: string, isServer: boolean }[]`

### TS Output
Typed AST (type annotations attached to each AST node)

### META (Stage 6.5) Output
Post-meta-expansion AST with `^{}` blocks evaluated and spliced

### DG Output
Dependency graph — `DGNode[]` with `hasLift: boolean` annotation on every node variant
(added in PIPELINE v0.5.0)

### CG Output
`{ html: string, css: string, js: string }` per file

## Error Types (from PIPELINE.md)

| Code | Stage | Condition |
|---|---|---|
| E-PP-001 | PP | Duplicate macro name |
| E-PP-002 | PP | Undefined macro reference |
| E-PP-003 | PP | Circular macro expansion |
| E-PA-005 | PA | `tables=` absent |
| E-PA-006 | PA | `src=` absent |
| E-PA-007 | PA | Unknown `protect=` field name |
| E-ROUTE-001 | RI | Route inference error (non-fatal in self-host context) |
| E-LIFT-001 | DG | Concurrent lift (two DG nodes in same logic block both have hasLift=true) |
| E-CG-006 | CG | SQL/server-context node in client-boundary output |
| W-CG-001 | CG | Top-level SQL/transaction block suppressed from client output |

Full error code list: SPEC.md §34 (lines 11785–11979), PIPELINE.md per-stage contracts.

## Tags
#scrml #map #schema #pipeline #types #compiler

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [structure.map.md](./structure.map.md)

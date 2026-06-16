# error.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Overview

This is a `.scrml` source repo — error types are defined in PIPELINE.md stage contracts and
SPEC.md §34, not in TypeScript files. The compiled output (`.js`) is consumed by scrml's
`--self-host` flag; error handling is in scrml's caller layer.

## Error Types by Stage (from PIPELINE.md — normative)

| Code | Stage | Type | When thrown |
|---|---|---|---|
| E-PP-001 | PP (Stage 1) | warning | Duplicate macro name |
| E-PP-002 | PP (Stage 1) | error | Undefined macro reference |
| E-PP-003 | PP (Stage 1) | error | Circular macro expansion |
| E-PA-005 | PA (Stage 4) | error | `tables=` absent from input |
| E-PA-006 | PA (Stage 4) | error | `src=` absent from input |
| E-PA-007 | PA (Stage 4) | error | Unknown `protect=` field name (was W-PA-001, upgraded to error in v0.3.0) |
| E-ROUTE-001 | RI (Stage 5) | warning | Route inference issue (non-fatal in self-host builds) |
| E-LIFT-001 | DG (Stage 7) | error | Concurrent lift — two DG nodes in same logic block both have hasLift=true |
| E-CG-006 | CG (Stage 8) | error | SQL/transaction/server-context meta node in client-boundary output |
| W-CG-001 | CG (Stage 8) | warning | Top-level SQL/transaction block suppressed from client output |

Full error code catalogue: SPEC.md §34 (lines 11785–11979)

## Error Handling in build-self-host.js

- Fatal errors: `fatalErrors = result.errors.filter(e => e.code !== "E-ROUTE-001")` — non-zero exit
- Non-fatal: `E-ROUTE-001` warnings counted but build continues
- Crash guard: try/catch around each module compile, logs message + stack (verbose mode)
- Exit code: `process.exit(0)` on all pass, `process.exit(1)` on any failure

## Error Shape (from build-self-host.js usage)

```
CompileError {
  code: string       // e.g. "E-ROUTE-001"
  message: string
  line?: number
  severity?: 'error' | 'warning'   // added in PIPELINE v0.5.1
}
```

## Unhandled Error Risks

- `build-self-host.js` path resolution — all source paths are stale (scrml8 layout). Every module
  will `SKIP` with "source not found" until paths are updated. The script will not crash but will
  produce no output.
- `cg-parts/` directory not present in this repo — CG assembly step will emit SKIP errors for
  all 5 sections.

## Tags
#scrml #map #error #pipeline #compiler

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [schema.map.md](./schema.map.md)

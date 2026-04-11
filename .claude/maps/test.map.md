# test.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Test Framework

No test framework detected in this repo. No `package.json` with test runner dependency.

## Test Status

`tests/` directory exists but is **empty** at scan time.

Per `master-list.md` section D:
> "Parity tests — currently live in scrmlTS (`compiler/tests/self-host/`). Migration to this repo TBD."

## Parity Test Status (from master-list.md)

| Module | Parity tests exist | Location |
|---|---|---|
| bs.scrml | yes | `../scrmlTS/compiler/tests/self-host/` |
| tab.scrml | yes | `../scrmlTS/compiler/tests/self-host/` |
| ast.scrml | yes | `../scrmlTS/compiler/tests/self-host/` |
| bpp.scrml | yes (override mechanism) | `../scrmlTS/compiler/tests/self-host/` |
| pa.scrml | yes | `../scrmlTS/compiler/tests/self-host/` |
| ri.scrml | yes (26 tests) | `../scrmlTS/compiler/tests/self-host/` |
| ts.scrml | none listed | — |
| dg.scrml | yes (8 tests) | `../scrmlTS/compiler/tests/self-host/` |
| cg.scrml | none (stub) | — |
| module-resolver.scrml | yes | `../scrmlTS/compiler/tests/self-host/` |
| meta-checker.scrml | yes | `../scrmlTS/compiler/tests/self-host/` |

## Bootstrap Parity Status (from master-list.md)

- **L2 complete:** All 10 source files produce identical output via selfHostModules
- **L3 complete:** Self-hosted `compileScrml()` compiles all source files identically

## Open Work

Migration of parity tests from scrmlTS → this repo is listed as open in master-list.md.

## Tags
#scrml #map #test #parity #self-host #compiler

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [structure.map.md](./structure.map.md)

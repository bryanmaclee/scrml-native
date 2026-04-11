# dependencies.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Package Manifest

No `package.json`, `go.mod`, `Cargo.toml`, or other dependency manifest found in this repo.

This is a **source-only** self-host repo. The `.scrml` modules have no runtime npm dependencies of
their own — they are compiled by scrmlTS's `compileScrml()` function (external dependency, lives in
`../scrmlTS/`).

## Runtime Dependencies (from build-self-host.js)

| Import | Source | Purpose |
|---|---|---|
| `compileScrml` | `../src/api.js` (scrmlTS) | Compiles `.scrml` source to JS via library mode |
| `expression-parser.js` | `../scrmlTS/compiler/src/expression-parser.ts` | Runtime dep copied to `dist/self-host/` for meta-checker |
| Node `fs` built-ins | `mkdirSync, existsSync, copyFileSync, readFileSync, writeFileSync` | File I/O for build script |
| Node `path` built-ins | `resolve, dirname, join` | Path construction |
| `Bun.Transpiler` | Bun runtime | TS→JS transpilation of `expression-parser.ts` |

## Internal Module Graph (pipeline order)

The `.scrml` modules implement discrete pipeline stages with these data-flow dependencies:

```
[raw source]
    → bs.scrml         (Stage 2: block splitting)
    → tab.scrml        (Stage 3: tokenization)
       → ast.scrml     (Stage 3: AST construction, imports tab.scrml as "tokenizer.js")
    → module-resolver.scrml  (Stage 3.1: import graph, export registry)
    → pa.scrml         (Stage 4: protect= analysis)
    → ri.scrml         (Stage 5: route inference)
    → ts.scrml         (Stage 6: type checking)
    → meta-checker.scrml     (Stage 6.5: meta check + eval, imports expression-parser.js)
    → dg.scrml         (Stage 7: dependency graph)
    → cg.scrml         (Stage 8: codegen stub; assembles cg-parts/ JS sections at build time)
```

`bpp.scrml` (230 LOC) — BPP stage was removed in PIPELINE v0.6.0. File remains in `src/`
but is no longer part of the active pipeline. Not compiled as a listed module in the current
`build-self-host.js` modules array.

## Tags
#scrml #map #dependencies #self-host #compiler

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [structure.map.md](./structure.map.md)

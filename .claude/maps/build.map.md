# build.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Development Commands

No `package.json` present — no npm/bun scripts defined.

## Build Script

`build-self-host.js` — Bun script. Compile all self-host `.scrml` modules to ES module JS.

```
bun run build-self-host.js [--verbose]
bun build-self-host.js [-v]
```

### What it does (in order)

1. **Compile scrml modules** — Calls `compileScrml({ mode: "library" })` from scrml for each
   module. Writes `.js` output to `compiler/dist/self-host/` (path currently stale — see config.map.md).
   Suppresses `E-ROUTE-001` warnings (non-fatal for self-host code with no protected fields).

2. **Copy runtime deps** — Copies/transpiles `expression-parser.ts` (TS→JS via Bun.Transpiler)
   into the output directory alongside the compiled modules.

3. **Create module aliases** — Copies `tab.js` → `tokenizer.js` because `ast.js` imports
   `"./tokenizer.js"` by that name at runtime.

4. **Assemble CG** — Concatenates 5 pre-ported JS section files from `cg-parts/` into `cg.js`.
   CG is NOT compiled from `cg.scrml` — the main codegen is too large and brace-heavy for the
   block splitter; raw JS sections are concatenated instead.

### Modules compiled by build-self-host.js

| Module name | Source `.scrml` | Output `.js` |
|---|---|---|
| module-resolver | `stdlib/compiler/module-resolver.scrml` (stale path) | `module-resolver.js` |
| meta-checker | `stdlib/compiler/meta-checker.scrml` (stale path) | `meta-checker.js` |
| block-splitter | `compiler/self-host/bs.scrml` (stale path) | `block-splitter.js` |
| body-pre-parser | `compiler/self-host/bpp.scrml` (stale path) | `body-pre-parser.js` |
| tokenizer | `compiler/self-host/tab.scrml` (stale path) | `tokenizer.js` |
| ast-builder | `compiler/self-host/ast.scrml` (stale path) | `ast-builder.js` |
| protect-analyzer | `compiler/self-host/pa.scrml` (stale path) | `pa.js` |
| route-inference | `compiler/self-host/ri.scrml` (stale path) | `ri.js` |
| type-system | `compiler/self-host/ts.scrml` (stale path) | `ts.js` |
| dependency-graph | `compiler/self-host/dg.scrml` (stale path) | `dg.js` |

Note: All source paths in the modules list are stale (scrml8 layout). The script requires
path updates to work from this repo.

### CG assembly sections (cg-parts/)

| Section file | Included in cg.js |
|---|---|
| `section-core.js` | yes |
| `section-rewrite.js` | yes |
| `section-emit-core.js` | yes |
| `section-emit-wiring.js` | yes |
| `section-assembly.js` | yes |

`cg-parts/` directory is referenced but does not exist in this repo at scan time.

## CI/CD

No `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, or other CI config detected.

## Docker

No `Dockerfile` or `docker-compose.*` detected.

## Tags
#scrml #map #build #self-host #compiler

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [config.map.md](./config.map.md)

# config.map.md
# project: scrml
# updated: 2026-04-11T00:00:00Z  commit: 0f3b36e

## Environment Variables

No `.env.example`, `.env.template`, or config files detected in this repo.

`build-self-host.js` references no `process.env.*` variables. The build script's behavior is
controlled entirely by command-line flags.

## CLI Flags (build-self-host.js)

| Flag | Default | Effect |
|---|---|---|
| `--verbose` / `-v` | off | Enables verbose logging during compilation |

## Hardcoded Paths in build-self-host.js

The build script uses `import.meta.url`-relative path resolution. Key resolved paths:

| Variable | Resolves to | Status |
|---|---|---|
| `scriptDir` | directory containing `build-self-host.js` | ok |
| `compilerRoot` | `scriptDir/..` (expects a `compiler/` parent) | STALE — script was not updated after split from scrml8 |
| `projectRoot` | `compilerRoot/..` | STALE — targets scrml8 tree, not this repo |
| `stdlibCompilerDir` | `projectRoot/stdlib/compiler` | STALE |
| `srcDir` | `compilerRoot/src` (scrml src, not this repo's src/) | STALE |
| `outputDir` | `compilerRoot/dist/self-host` | STALE |

The build script's path wiring assumes the scrml8 monorepo layout and will not work as-is from
this standalone repo's root. Needs updating for the split layout.

## Feature Flags

None detected at scan time.

## Tags
#scrml #map #config #build #self-host

## Links
- [primary.map.md](./primary.map.md)
- [master-list.md](../../master-list.md)
- [pa.md](../../pa.md)
- [build.map.md](./build.map.md)

# scrml — Primary Agent Directives

## What is this repo?

**scrml** is the **pure self-host** — the scrml compiler written in scrml. Flat, clean, minimal. The 11 modules here are the L2/L3 bootstrap targets: everything in scrmlTS that's written in TypeScript/JavaScript has a scrml counterpart here.

The ultimate goal: this repo **becomes** the compiler, and scrmlTS becomes legacy once idiomification + Component Expander/Meta Eval self-hosting are complete.

## Scope principle — "current truth only"

Same as scrmlTS. Only files that match current spec + behavior. No historical drafts, no superseded designs, no aspirational docs. History lives in `scrml-support`.

## Repo layout

```
scrml/
├── pa.md                      this file
├── master-list.md             live inventory
├── hand-off.md                current session state
├── SPEC.md                    copy of authoritative spec (primary lives in scrmlTS/compiler/)
├── SPEC-INDEX.md              quick-lookup
├── PIPELINE.md                stage contracts
├── build-self-host.js         build script
├── src/                       the 11 self-host modules
│   ├── bs.scrml               block splitter (894)
│   ├── tab.scrml              tokenizer (1,115)
│   ├── ast.scrml              ast builder (3,551)
│   ├── bpp.scrml              body pre-parser (230)
│   ├── pa.scrml               protect analyzer (444)
│   ├── ri.scrml               route inference (984)
│   ├── ts.scrml               type system (2,570)
│   ├── dg.scrml               dependency graph (1,052)
│   ├── cg.scrml               codegen stub (21)
│   ├── module-resolver.scrml  module resolver (305)
│   └── meta-checker.scrml     meta checker (882)
└── tests/                     parity tests (tbd)
```

## Spec authority

The spec lives primarily in `../scrmlTS/compiler/SPEC.md`. This repo carries a copy for convenience, but during the split phase scrmlTS is authoritative. Once self-hosting is complete (or the beta team agrees), spec authority may move here.

## Cross-repo references

- **scrmlTS** at `../scrmlTS/` — where the TS compiler lives; parity target
- **scrml-support** at `../scrml-support/` — deep-dives, ADRs, history, idiomification notes
- **giti** at `../giti/` — collaboration platform
- **6nz** at `../6nz/` — editor
- **scrml8** at `/home/bryan-maclee/projects/scrml8/` — frozen archive

## What NOT to do

- Do not import stale or historical docs here
- Do not edit scrml8
- Do not commit spec changes here before they land in scrmlTS
- Do not break L2/L3 bootstrap parity without coordinating with scrmlTS

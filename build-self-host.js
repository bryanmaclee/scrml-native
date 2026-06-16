#!/usr/bin/env bun
/**
 * @script build-self-host
 * Compile scrml self-hosted compiler modules to ES module JS.
 *
 * Compiles src/*.scrml in library mode and writes output to dist/self-host/.
 * These compiled modules can be loaded by the scrml compiler CLI's
 * --self-host flag to replace the JS originals.
 *
 * compileScrml is imported from the sibling scrml repo during the split
 * phase (scrml is still authoritative for the JS compiler + api.js).
 *
 * Usage:
 *   bun build-self-host.js [--verbose]
 *
 * Output:
 *   dist/self-host/*.js
 */

import { mkdirSync, existsSync, copyFileSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname, join } from "path";
import { compileScrml } from "../scrml/compiler/src/api.js";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const scriptDir = dirname(new URL(import.meta.url).pathname);
const repoRoot = scriptDir;                              // scrml/
const srcDir = resolve(repoRoot, "src");
const outputDir = resolve(repoRoot, "dist", "self-host");
const scrmlTsCompilerSrc = resolve(repoRoot, "..", "scrml", "compiler", "src");

// ---------------------------------------------------------------------------
// Modules to compile
// Each entry: { name, scrmlFile, outputBase }
// ---------------------------------------------------------------------------

const modules = [
  { name: "module-resolver",  scrmlFile: resolve(srcDir, "module-resolver.scrml"), outputBase: "module-resolver" },
  { name: "meta-checker",     scrmlFile: resolve(srcDir, "meta-checker.scrml"),    outputBase: "meta-checker" },
  { name: "block-splitter",   scrmlFile: resolve(srcDir, "bs.scrml"),              outputBase: "block-splitter" },
  { name: "body-pre-parser",  scrmlFile: resolve(srcDir, "bpp.scrml"),             outputBase: "body-pre-parser" },
  { name: "tokenizer",        scrmlFile: resolve(srcDir, "tab.scrml"),             outputBase: "tokenizer" },
  { name: "ast-builder",      scrmlFile: resolve(srcDir, "ast.scrml"),             outputBase: "ast-builder" },
  { name: "protect-analyzer", scrmlFile: resolve(srcDir, "pa.scrml"),              outputBase: "pa" },
  { name: "route-inference",  scrmlFile: resolve(srcDir, "ri.scrml"),              outputBase: "ri" },
  { name: "type-system",      scrmlFile: resolve(srcDir, "ts.scrml"),              outputBase: "ts" },
  { name: "dependency-graph", scrmlFile: resolve(srcDir, "dg.scrml"),              outputBase: "dg" },
];

// ---------------------------------------------------------------------------
// Runtime dependencies to copy into dist/self-host/
//
// Compiled modules may reference relative JS files via ^{} imports.
// For example, meta-checker.scrml has:
//   ^{ const { extractIdentifiersFromAST } = await import("./expression-parser.js"); }
//
// The library-mode codegen emits this as a static ES import using the same
// relative path. When loaded from dist/self-host/, the file must be present
// in the same directory.
// ---------------------------------------------------------------------------

const runtimeDeps = [
  {
    name: "expression-parser.js",
    src: resolve(scrmlTsCompilerSrc, "expression-parser.ts"),
    // Required by: meta-checker.js (from ^{} import)
  },
];

// ---------------------------------------------------------------------------
// Post-compilation aliases
//
// Some compiled modules import each other by names that differ from the
// scrml input filename. Create symlinks/copies to satisfy these imports.
// ---------------------------------------------------------------------------

const aliases = [
  {
    // ast.js imports "./tokenizer.js" but the file is compiled as "tab.js"
    src: "tab.js",
    alias: "tokenizer.js",
  },
];

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

const verbose = process.argv.includes("--verbose") || process.argv.includes("-v");

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

console.log("scrml build-self-host: compiling self-hosted compiler modules");
console.log(`  output: ${outputDir}`);
console.log("");

// Ensure output directory exists
mkdirSync(outputDir, { recursive: true });

let allPassed = true;

// Step 1: Compile scrml modules
for (const mod of modules) {
  if (!existsSync(mod.scrmlFile)) {
    console.error(`  SKIP  ${mod.name} — source not found: ${mod.scrmlFile}`);
    continue;
  }

  const start = performance.now();

  try {
    const result = compileScrml({
      inputFiles: [mod.scrmlFile],
      outputDir,
      mode: "library",
      write: true,
      verbose,
      log: verbose ? console.log : () => {},
    });

    const ms = (performance.now() - start).toFixed(1);

    // E-ROUTE-001 warnings are non-fatal — self-hosted code has no protected fields
    const fatalErrors = result.errors.filter(e => e.code !== "E-ROUTE-001");
    const routeWarnings = result.errors.filter(e => e.code === "E-ROUTE-001");

    if (fatalErrors.length > 0) {
      console.error(`  FAIL  ${mod.name} (${ms}ms) — ${fatalErrors.length} error(s):`);
      for (const err of fatalErrors) {
        console.error(`         [${err.code || "?"}] ${err.message}`);
        if (err.line) console.error(`         at line ${err.line}`);
      }
      allPassed = false;
    } else {
      const outputFile = join(outputDir, `${mod.outputBase}.js`);
      console.log(`  PASS  ${mod.name} (${ms}ms) → ${outputFile}`);
      if (routeWarnings.length > 0) {
        console.log(`         (${routeWarnings.length} non-fatal E-ROUTE-001 warnings suppressed)`);
      }
      if (result.warnings.length > 0) {
        for (const w of result.warnings) {
          console.log(`         warn: [${w.code || "?"}] ${w.message}`);
        }
      }
    }
  } catch (err) {
    const ms = (performance.now() - start).toFixed(1);
    console.error(`  CRASH ${mod.name} (${ms}ms): ${err.message}`);
    if (verbose && err.stack) {
      console.error(err.stack);
    }
    allPassed = false;
  }
}

// Step 2: Copy runtime dependencies
console.log("");
console.log("Copying runtime dependencies:");
for (const dep of runtimeDeps) {
  if (!existsSync(dep.src)) {
    console.error(`  SKIP  ${dep.name} — source not found: ${dep.src}`);
    continue;
  }
  const destPath = join(outputDir, dep.name);
  try {
    if (dep.src.endsWith(".ts")) {
      // Transpile TS → JS using Bun's transpiler (strips type annotations)
      const transpiler = new Bun.Transpiler({ loader: "ts" });
      const source = readFileSync(dep.src, "utf8");
      const js = transpiler.transformSync(source);
      writeFileSync(destPath, js);
      console.log(`  TRANSPILE  ${dep.name} (ts→js) → ${destPath}`);
    } else {
      copyFileSync(dep.src, destPath);
      console.log(`  COPY  ${dep.name} → ${destPath}`);
    }
  } catch (err) {
    console.error(`  FAIL  ${dep.name}: ${err.message}`);
    allPassed = false;
  }
}

// Step 2.5: Create aliases for cross-module imports
console.log("");
console.log("Creating module aliases:");
for (const { src, alias } of aliases) {
  const srcPath = join(outputDir, src);
  const aliasPath = join(outputDir, alias);
  if (existsSync(srcPath)) {
    copyFileSync(srcPath, aliasPath);
    console.log(`  ALIAS  ${src} → ${alias}`);
  }
}

// Step 3: Assemble CG (codegen) from pre-ported JS sections
//
// The CG stage is 32 files / ~13K lines of code-generating JavaScript.
// These files emit JS code strings containing braces that confuse the
// block splitter's brace-depth tracking. Rather than fighting the BS,
// we concatenate the ported JS sections directly into an ES module.
//
// NOTE (split phase): cg-parts/ was not copied into this repo during the
// scrml8 → scrml split. If a local src/cg-parts/ exists we assemble cg.js;
// otherwise this step is a graceful skip and cg.js comes from scrml.
console.log("");
const cgSections = [
  "section-core.js",
  "section-rewrite.js",
  "section-emit-core.js",
  "section-emit-wiring.js",
  "section-assembly.js",
];
const cgPartsDir = resolve(srcDir, "cg-parts");
const cgOutputPath = join(outputDir, "cg.js");
if (!existsSync(cgPartsDir)) {
  console.log(`CG assembly: SKIP — no src/cg-parts/ in this repo (split phase; cg-parts still in scrml8)`);
} else {
  console.log("Assembling CG (codegen) from sections:");
  try {
    let cgContent = "// Self-hosted CG — assembled from ported JS sections\n";
    for (const section of cgSections) {
      const sectionPath = join(cgPartsDir, section);
      if (!existsSync(sectionPath)) {
        console.error(`  SKIP  ${section} — not found`);
        allPassed = false;
        continue;
      }
      cgContent += `\n// --- ${section} ---\n`;
      cgContent += readFileSync(sectionPath, "utf8");
      console.log(`  INCLUDE  ${section}`);
    }
    writeFileSync(cgOutputPath, cgContent);
    console.log(`  ASSEMBLED  cg.js → ${cgOutputPath}`);
  } catch (err) {
    console.error(`  FAIL  cg.js: ${err.message}`);
    allPassed = false;
  }
}

console.log("");
if (allPassed) {
  console.log("All self-hosted modules compiled successfully.");
  process.exit(0);
} else {
  console.error("One or more modules failed to compile.");
  process.exit(1);
}

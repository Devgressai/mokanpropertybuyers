// scripts/check-assets.mts
//
// Gate: every hardcoded asset path referenced in source actually exists under
// public/. A sibling project once pointed its Organization, LocalBusiness, and
// Article JSON-LD at "/logo.png" — a file that had never existed, sitewide, in
// three separate schema blocks. No build broke and no error was thrown: a
// missing image inside a JSON-LD string is invisible to the compiler. Only a
// filesystem check catches that class of bug.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ASSET_RE = /"(\/[A-Za-z0-9_\-./]+\.(?:png|jpg|jpeg|webp|svg|gif|ico|pdf|txt|xml))"/g;

export interface AssetRef {
  path: string;
  file: string;
}

export interface MissingAsset {
  path: string;
  files: string[];
}

export interface AssetAudit {
  scanned: number;
  refs: number;
  missing: MissingAsset[];
}

/** Removes block and line comments so a path mentioned only in a comment isn't flagged. */
function stripComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

/**
 * Pure extraction, decoupled from the filesystem so it can be exercised with
 * known-bad input in tests. Only matches a path quoted exactly as written in
 * source — an external URL ("https://...", "//cdn...") never matches because
 * stripping comments (which also eats the "//" inside such a string) removes
 * the closing quote the pattern requires.
 */
export function extractAssetRefs(text: string, file: string): AssetRef[] {
  const stripped = stripComments(text);
  const refs: AssetRef[] = [];
  for (const m of stripped.matchAll(ASSET_RE)) {
    const path = m[1];
    if (path.startsWith("//")) continue; // protocol-relative URL, belt-and-suspenders
    refs.push({ path, file });
  }
  return refs;
}

/**
 * Pure existence check, decoupled from the real filesystem so it can be
 * exercised with a fake `exists` predicate in tests.
 */
export function findMissingAssets(refs: AssetRef[], exists: (path: string) => boolean): MissingAsset[] {
  const byPath = new Map<string, Set<string>>();
  for (const r of refs) {
    if (!byPath.has(r.path)) byPath.set(r.path, new Set());
    byPath.get(r.path)!.add(r.file);
  }
  return [...byPath.entries()]
    .filter(([path]) => !exists(path))
    .map(([path, files]) => ({ path, files: [...files].sort() }));
}

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const PUBLIC = join(ROOT, "public");

function walk(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (/\.tsx?$/.test(name)) acc.push(full);
  }
  return acc;
}

export function auditAssets(): AssetAudit {
  const files = walk(SRC);
  const refs: AssetRef[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    refs.push(...extractAssetRefs(text, relative(ROOT, file)));
  }
  const missing = findMissingAssets(refs, (p) => existsSync(join(PUBLIC, p)));
  return { scanned: files.length, refs: refs.length, missing };
}

function main(): void {
  const { scanned, refs, missing } = auditAssets();
  console.log(`check:assets scanned ${scanned} source file(s), ${refs} asset reference(s)`);

  if (missing.length) {
    for (const m of missing) {
      console.error(`MISSING  ${m.path}`);
      for (const f of m.files) console.error(`         referenced by ${f}`);
    }
    console.error(`\ncheck:assets FAILED — ${missing.length} missing asset(s)`);
    process.exit(1);
  }

  console.log(`check:assets OK — ${refs} asset reference(s), 0 missing`);
}

if (process.argv[1]?.includes("check-assets")) main();

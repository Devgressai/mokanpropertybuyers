// scripts/check-hrefs.mts
//
// Gate: every internal href literal under src/app/ and src/components/
// resolves to something that actually exists. check:links only audits pages
// inside the seoPages graph; the static marketing pages (/how-it-works,
// /faq, /about, /contact) sit entirely outside that graph and hardcode
// seven links straight to state-line slugs (e.g.
// "/which-side-of-state-line-road"). Nothing protects those today -- and
// because the (geo)/[slug] route sets `dynamicParams = false`, renaming one
// of those slugs in src/data/state-line.ts turns every hardcoded href into a
// hard 404 with no build failure, no error, no warning. Same failure class
// check:assets exists to catch (a JSON-LD string pointing at a logo that
// was never there), applied to hrefs instead of asset paths.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { getAllSeoSlugs } from "../src/lib/seo/pageIndex.js";

// Matches href="/foo", the object-literal href: "/foo" form (used by
// StaticPageShell's breadcrumbs array and, indirectly through Breadcrumbs,
// rendered as a <Link>), and the static-template href={`/foo`} form. The
// backtick alternative isn't anchored to a leading slash -- that filtering
// happens below -- because the captured content still needs to match the
// ${...} case so it can be recognized and skipped as dynamic.
const HREF_RE = /\bhref\s*[=:]\s*\{?\s*(?:"([^"]*)"|`([^`]*)`)\s*\}?/g;

export interface HrefRef {
  href: string;
  file: string;
  line: number;
}

export interface HrefAudit {
  filesScanned: number;
  hrefsChecked: number;
  unresolved: HrefRef[];
}

/** Removes block and line comments, same as check-assets, so an href mentioned only in a comment isn't flagged. */
function stripComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

/**
 * Pure extraction, decoupled from the filesystem so it can be exercised with
 * known-bad input in tests. Skips external URLs (http://, https://,
 * protocol-relative //), anchors (#...), mailto:/tel:, and any template
 * literal containing ${...} interpolation -- ParentLink, PlaceLinkList, and
 * RelatedLinkList all build hrefs that way from slugs already validated
 * elsewhere (check:pages), and there is nothing static left to resolve once
 * interpolation is involved.
 */
export function extractHrefRefs(text: string, file: string): HrefRef[] {
  const stripped = stripComments(text);
  const refs: HrefRef[] = [];
  for (const m of stripped.matchAll(HREF_RE)) {
    const raw = m[1] ?? m[2];
    if (raw === undefined) continue;
    if (raw.includes("${")) continue; // dynamic template, not statically resolvable
    // mailto:, tel:, #anchor, and http(s):// all fail this check and are dropped.
    if (!raw.startsWith("/")) continue;
    if (raw.startsWith("//")) continue; // protocol-relative URL
    const line = stripped.slice(0, m.index).split("\n").length;
    refs.push({ href: raw, file, line });
  }
  return refs;
}

/**
 * Pure resolution, decoupled from the real filesystem and page index so it
 * can be exercised with known-bad input in tests. `routes` is the set of
 * static App Router paths that exist on disk (leading slash, e.g. "/about",
 * "/"); `seoSlugs` is the set of slugs from getAllSeoSlugs() (no leading
 * slash).
 */
export function resolveHref(href: string, routes: Set<string>, seoSlugs: Set<string>): boolean {
  const path = href.split("?")[0].split("#")[0];
  if (routes.has(path)) return true;
  return seoSlugs.has(path.replace(/^\//, ""));
}

/** Pure filter over already-extracted refs, decoupled from the filesystem so it can be exercised with known-bad input in tests. */
export function findUnresolvedHrefs(
  refs: HrefRef[],
  routes: Set<string>,
  seoSlugs: Set<string>
): HrefRef[] {
  return refs.filter((r) => !resolveHref(r.href, routes, seoSlugs));
}

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SRC = join(ROOT, "src");
const APP_DIR = join(SRC, "app");
const COMPONENTS_DIR = join(SRC, "components");

function walkFiles(dir: string, acc: string[] = []): string[] {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkFiles(full, acc);
    else if (/\.tsx?$/.test(name)) acc.push(full);
  }
  return acc;
}

/**
 * Builds the set of static routes that exist on disk: every directory path
 * under src/app/ that contains a page.tsx, with route groups -- `(geo)` --
 * stripped (they don't appear in the URL) and any path passing through a
 * dynamic segment -- `[slug]` -- dropped entirely. dynamicParams = false on
 * that route means the only valid values are whatever getAllSeoSlugs()
 * returns, which is checked separately.
 */
export function buildStaticRoutes(appDir: string): Set<string> {
  const routes = new Set<string>();
  if (!existsSync(appDir)) return routes;
  if (existsSync(join(appDir, "page.tsx"))) routes.add("/");

  function walk(dir: string, segments: string[]): void {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      const full = join(dir, name);
      if (!statSync(full).isDirectory()) continue;
      if (/^\[.*\]$/.test(name)) continue; // dynamic segment -- not a static route
      const isGroup = /^\(.*\)$/.test(name);
      const nextSegments = isGroup ? segments : [...segments, name];
      if (existsSync(join(full, "page.tsx"))) routes.add("/" + nextSegments.join("/"));
      walk(full, nextSegments);
    }
  }

  walk(appDir, []);
  return routes;
}

export function auditHrefs(): HrefAudit {
  const files = [...walkFiles(APP_DIR), ...walkFiles(COMPONENTS_DIR)];
  const refs: HrefRef[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    refs.push(...extractHrefRefs(text, relative(ROOT, file)));
  }
  const routes = buildStaticRoutes(APP_DIR);
  const seoSlugs = new Set(getAllSeoSlugs());
  const unresolved = findUnresolvedHrefs(refs, routes, seoSlugs);
  return { filesScanned: files.length, hrefsChecked: refs.length, unresolved };
}

function main(): void {
  const { filesScanned, hrefsChecked, unresolved } = auditHrefs();
  console.log(`check:hrefs scanned ${filesScanned} source file(s), ${hrefsChecked} href(s)`);

  if (unresolved.length) {
    for (const u of unresolved) {
      console.error(`UNRESOLVED  ${u.href}  (${u.file}:${u.line})`);
    }
    console.error(`\ncheck:hrefs FAILED — ${unresolved.length} unresolved href(s)`);
    process.exit(1);
  }

  console.log(`check:hrefs OK — ${hrefsChecked} href(s), 0 unresolved`);
}

if (process.argv[1]?.includes("check-hrefs")) main();

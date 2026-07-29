// scripts/check-pages.mts
//
// Gate: the SEO page graph is internally consistent. No two pages share a
// slug or a title, and every parentSlug/childSlug reference resolves to a
// real page. A dangling reference here renders as a 404 behind a link that
// looks legitimate on the page that names it.
import { seoPages } from "../src/lib/seo/pageIndex.js";

export interface PageLike {
  slug: string;
  title: string;
  type: string;
  parentSlug?: string;
  childSlugs?: string[];
}

export interface PageAudit {
  total: number;
  duplicateSlugs: string[];
  duplicateTitles: string[];
  unresolvedRefs: string[];
  countsByType: Record<string, number>;
}

/**
 * Pure detection logic, decoupled from the real page index so it can be
 * exercised with known-bad input in tests.
 */
export function analyzePages(pages: PageLike[]): PageAudit {
  const bySlug = new Map<string, PageLike>();
  for (const p of pages) bySlug.set(p.slug, p);

  const duplicateSlugs = findDuplicates(pages.map((p) => p.slug));
  const duplicateTitles = findDuplicates(pages.map((p) => p.title));

  const unresolvedRefs: string[] = [];
  for (const p of pages) {
    if (p.parentSlug && !bySlug.has(p.parentSlug)) {
      unresolvedRefs.push(`${p.slug}: parentSlug -> ${p.parentSlug}`);
    }
    for (const child of p.childSlugs ?? []) {
      if (!bySlug.has(child)) {
        unresolvedRefs.push(`${p.slug}: childSlugs -> ${child}`);
      }
    }
  }

  const countsByType: Record<string, number> = {};
  for (const p of pages) countsByType[p.type] = (countsByType[p.type] ?? 0) + 1;

  return { total: pages.length, duplicateSlugs, duplicateTitles, unresolvedRefs, countsByType };
}

function findDuplicates(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) duplicates.add(v);
    seen.add(v);
  }
  return [...duplicates];
}

export function auditPages(): PageAudit {
  return analyzePages(seoPages);
}

function main(): void {
  const { total, duplicateSlugs, duplicateTitles, unresolvedRefs, countsByType } = auditPages();

  if (duplicateSlugs.length || duplicateTitles.length || unresolvedRefs.length) {
    for (const s of duplicateSlugs) console.error(`DUPLICATE SLUG   ${s}`);
    for (const t of duplicateTitles) console.error(`DUPLICATE TITLE  ${t}`);
    for (const r of unresolvedRefs) console.error(`UNRESOLVED REF   ${r}`);
    console.error(
      `\ncheck:pages FAILED — ${duplicateSlugs.length} duplicate slug(s), ` +
        `${duplicateTitles.length} duplicate title(s), ${unresolvedRefs.length} unresolved ref(s)`
    );
    process.exit(1);
  }

  console.log("Page counts by type:");
  for (const [type, count] of Object.entries(countsByType).sort()) {
    console.log(`  ${type.padEnd(10)} ${count}`);
  }
  console.log(`check:pages OK — ${total} pages, no duplicates, no unresolved refs`);
}

if (process.argv[1]?.includes("check-pages")) main();

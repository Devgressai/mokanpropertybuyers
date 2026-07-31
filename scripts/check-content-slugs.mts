// scripts/check-content-slugs.mts
//
// Gate: the content registry merges with Object.assign({}, ...registries) --
// last map wins, silently. If two maps define the same slug, one page's copy
// vanishes with no error and no warning. Geography already has check:slugs
// proving all 196 geographic slugs unique (2 states + 53 counties + 141
// cities -- three places dropped because their real county isn't modeled in
// this footprint, see docs/WAVE-0B-PREREQUISITES.md); content had no
// equivalent. This gate closes that gap while there is still exactly one
// content map, rather than after a second map silently hides a page.
import { contentRegistries } from "../src/data/content-registry.js";

/**
 * Pure detection logic, decoupled from the real registry so it can be
 * exercised with known-bad input in tests. Must run against the pre-merge
 * array of maps -- after Object.assign the collision no longer exists to
 * find. Reports each colliding slug once, regardless of how many maps
 * define it, matching how check-slugs.mts dedupes via a Set.
 */
export function findDuplicateContentSlugs(maps: Record<string, unknown>[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const map of maps) {
    for (const slug of Object.keys(map)) {
      if (seen.has(slug)) duplicates.add(slug);
      seen.add(slug);
    }
  }
  return [...duplicates];
}

export interface ContentSlugAudit {
  maps: number;
  slugs: number;
  duplicates: string[];
}

export function auditContentSlugs(): ContentSlugAudit {
  const slugs = new Set<string>();
  for (const map of contentRegistries) {
    for (const slug of Object.keys(map)) slugs.add(slug);
  }
  return {
    maps: contentRegistries.length,
    slugs: slugs.size,
    duplicates: findDuplicateContentSlugs(contentRegistries),
  };
}

function main(): void {
  const { maps, slugs, duplicates } = auditContentSlugs();
  if (duplicates.length) {
    for (const d of duplicates) console.error(`DUPLICATE CONTENT SLUG  ${d}`);
    console.error(
      `\ncheck:content-slugs FAILED — ${maps} maps, ${duplicates.length} duplicate slugs`
    );
    process.exit(1);
  }
  if (maps === 0) {
    console.log("check:content-slugs OK — 0 maps, 0 slugs, nothing to check");
    return;
  }
  console.log(`check:content-slugs OK — ${maps} map${maps === 1 ? "" : "s"}, ${slugs} slugs, 0 duplicates`);
}

if (process.argv[1]?.includes("check-content-slugs")) main();

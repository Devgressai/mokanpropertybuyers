// scripts/check-slugs.mts
//
// Gate: every geographic slug (state, county, city) is globally unique, and
// every county/city slug is state-scoped (ends -mo or -ks). Seven towns and
// three counties in this radius share a name across the state line -- the
// two worst being Kansas City and Johnson County, the biggest entities in
// the market -- so a slug collision here isn't a theoretical edge case.
import { states, counties, cities } from "../src/data/geography.js";

export interface SlugAudit {
  total: number;
  duplicates: string[];
  unscoped: string[];
}

/**
 * Pure detection logic, decoupled from the real geography module so it can
 * be exercised with known-bad input in tests. `stateSlugs` are exempt from
 * the -mo/-ks suffix rule (a state hub's slug IS the state); `geoSlugs`
 * (counties + cities) are not.
 */
export function analyzeSlugs(stateSlugs: string[], geoSlugs: string[]): SlugAudit {
  const all = [...stateSlugs, ...geoSlugs];

  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const slug of all) {
    if (seen.has(slug)) duplicates.add(slug);
    seen.add(slug);
  }

  const unscoped = geoSlugs.filter((s) => !/-(mo|ks)$/.test(s));

  return { total: all.length, duplicates: [...duplicates], unscoped };
}

export function auditSlugs(): SlugAudit {
  const stateSlugs = states.map((s) => s.slug);
  const geoSlugs = [...counties.map((c) => c.slug), ...cities.map((c) => c.slug)];
  return analyzeSlugs(stateSlugs, geoSlugs);
}

function main(): void {
  const { total, duplicates, unscoped } = auditSlugs();
  if (duplicates.length || unscoped.length) {
    for (const d of duplicates) console.error(`DUPLICATE SLUG  ${d}`);
    for (const u of unscoped) console.error(`UNSCOPED SLUG   ${u} (needs -mo or -ks)`);
    console.error(
      `\ncheck:slugs FAILED — ${duplicates.length} duplicate, ${unscoped.length} unscoped`
    );
    process.exit(1);
  }
  console.log(`check:slugs OK — ${total} geographic slugs, all unique and state-scoped`);
}

if (process.argv[1]?.includes("check-slugs")) main();

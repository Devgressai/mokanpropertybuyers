import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type StateCode = "MO" | "KS";

interface FootprintEntry {
  name: string;
  state: StateCode;
  geoid: string;
  lat: number;
  lon: number;
  dist: number;
  pop: number | null;
}

const ROOT = resolve(import.meta.dirname, "..");
const footprint = JSON.parse(
  readFileSync(resolve(ROOT, "data/footprint.json"), "utf8")
) as { counties: FootprintEntry[]; places: FootprintEntry[] };

const STATE_NAME: Record<StateCode, string> = { MO: "Missouri", KS: "Kansas" };

/** Census appends an entity type to place names; counties carry no suffix. */
function cleanName(raw: string): string {
  return raw.replace(/\s+(city|town|village|CDP|borough)$/i, "").trim();
}

export function slugifyPlace(
  rawName: string,
  state: StateCode,
  _kind: "city" | "county"
): string {
  const base = cleanName(rawName)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['\u2019.]/g, "")   // apostrophes and periods vanish, never hyphenate
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `sell-my-house-fast-${base}-${state.toLowerCase()}`;
}

const R_MI = 3958.7613;
function haversine(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const p1 = (aLat * Math.PI) / 180;
  const p2 = (bLat * Math.PI) / 180;
  const dp = ((bLat - aLat) * Math.PI) / 180;
  const dl = ((bLon - aLon) * Math.PI) / 180;
  const h =
    Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R_MI * Math.asin(Math.sqrt(h));
}

function tierOf(pop: number): 1 | 2 | 3 | 4 | 5 {
  if (pop >= 50000) return 1;
  if (pop >= 15000) return 2;
  if (pop >= 5000) return 3;
  if (pop >= 2000) return 4;
  return 5;
}

const counties = footprint.counties.map((c) => ({
  slug: slugifyPlace(c.name, c.state, "county"),
  name: c.name,
  state: c.state,
  geoid: c.geoid,
  population: c.pop ?? 0,
  distanceMi: c.dist,
  lat: c.lat,
  lon: c.lon,
  citySlugs: [] as string[],
}));

const cities = footprint.places.map((p) => {
  // Nearest county centroid IN THE SAME STATE. The same-state constraint is
  // load-bearing: without it, a Kansas town nearer a Missouri centroid would be
  // filed under a Missouri county and inherit Missouri law.
  let best = counties.find((c) => c.state === p.state)!;
  let bestDist = Infinity;
  for (const c of counties) {
    if (c.state !== p.state) continue;
    const d = haversine(p.lat, p.lon, c.lat, c.lon);
    if (d < bestDist) { bestDist = d; best = c; }
  }
  best.citySlugs.push(slugifyPlace(p.name, p.state, "city"));
  return {
    slug: slugifyPlace(p.name, p.state, "city"),
    name: cleanName(p.name),
    state: p.state,
    geoid: p.geoid,
    population: p.pop ?? 0,
    distanceMi: p.dist,
    lat: p.lat,
    lon: p.lon,
    countySlug: best.slug,
    tier: tierOf(p.pop ?? 0),
  };
});

for (const c of counties) c.citySlugs.sort();

const states = (["MO", "KS"] as StateCode[]).map((code) => ({
  code,
  name: STATE_NAME[code],
  slug: `sell-my-house-fast-${STATE_NAME[code].toLowerCase()}`,
}));

const banner = `// GENERATED FILE — DO NOT EDIT.
// Source: data/footprint.json (US Census Gazetteer 2023 + Population Estimates 2023)
// Regenerate: npm run codegen:geography
// CI fails if this file differs from a fresh run.
`;

const out = `${banner}
export type StateCode = "MO" | "KS";

export interface StateDef { code: StateCode; name: string; slug: string; }
export interface CountyDef {
  slug: string; name: string; state: StateCode; geoid: string;
  population: number; distanceMi: number; lat: number; lon: number;
  citySlugs: string[];
}
export interface CityDef {
  slug: string; name: string; state: StateCode; geoid: string;
  population: number; distanceMi: number; lat: number; lon: number;
  countySlug: string; tier: 1 | 2 | 3 | 4 | 5;
}

export const states: StateDef[] = ${JSON.stringify(states, null, 2)};

export const counties: CountyDef[] = ${JSON.stringify(counties, null, 2)};

export const cities: CityDef[] = ${JSON.stringify(cities, null, 2)};

const CLEAN = /\\s+(city|town|village|CDP|borough)$/i;

export function slugifyPlace(
  rawName: string,
  state: StateCode,
  _kind: "city" | "county"
): string {
  const base = rawName
    .replace(CLEAN, "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/['\\u2019.]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return \`sell-my-house-fast-\${base}-\${state.toLowerCase()}\`;
}
`;

writeFileSync(resolve(ROOT, "src/data/geography.ts"), out);
console.log(
  `geography.ts: ${states.length} states, ${counties.length} counties, ${cities.length} cities`
);

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type StateCode = "MO" | "KS";

export interface FootprintEntry {
  name: string;
  state: StateCode;
  geoid: string;
  lat: number;
  lon: number;
  dist: number;
  pop: number | null;
}

const STATE_NAME: Record<StateCode, string> = { MO: "Missouri", KS: "Kansas" };
const VALID_STATES: ReadonlySet<StateCode> = new Set(["MO", "KS"]);

/**
 * Validates one raw JSON record from footprint.json and narrows it to a
 * FootprintEntry. This is the read boundary: everything downstream assumes
 * `state` is a real StateCode and the numeric fields are real numbers. If a
 * future `--radius` on build-footprint.py ever widens far enough to pull in
 * Nebraska, Iowa, Oklahoma, or Arkansas, this throws here -- naming the
 * offending record -- instead of an anonymous TypeError deep in the
 * county-assignment loop.
 */
export function validateFootprintEntry(
  raw: unknown,
  kind: "county" | "place"
): FootprintEntry {
  const e = (raw ?? {}) as Record<string, unknown>;
  const label = `${kind} record {name: ${JSON.stringify(e.name)}, state: ${JSON.stringify(e.state)}, geoid: ${JSON.stringify(e.geoid)}}`;

  if (typeof e.name !== "string" || e.name.length === 0) {
    throw new Error(`${label}: "name" must be a non-empty string`);
  }
  if (typeof e.geoid !== "string" || e.geoid.length === 0) {
    throw new Error(`${label}: "geoid" must be a non-empty string`);
  }
  if (typeof e.lat !== "number" || !Number.isFinite(e.lat)) {
    throw new Error(`${label}: "lat" must be a finite number`);
  }
  if (typeof e.lon !== "number" || !Number.isFinite(e.lon)) {
    throw new Error(`${label}: "lon" must be a finite number`);
  }
  if (typeof e.dist !== "number" || !Number.isFinite(e.dist)) {
    throw new Error(`${label}: "dist" must be a finite number`);
  }
  if (typeof e.state !== "string" || !VALID_STATES.has(e.state as StateCode)) {
    throw new Error(
      `${label}: unsupported state "${String(e.state)}" -- this codegen only models Missouri (MO) and Kansas (KS)`
    );
  }
  return {
    name: e.name,
    state: e.state as StateCode,
    geoid: e.geoid,
    lat: e.lat,
    lon: e.lon,
    dist: e.dist,
    pop: typeof e.pop === "number" ? e.pop : null,
  };
}

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

/**
 * Reads data/footprint.json, validates every record at the boundary, derives
 * states/counties/cities, and writes src/data/geography.ts. Wrapped in a
 * function (rather than run at module load) so tests can import
 * `validateFootprintEntry` and `slugifyPlace` without triggering file I/O.
 */
function generate(): void {
  const ROOT = resolve(import.meta.dirname, "..");
  const raw = JSON.parse(
    readFileSync(resolve(ROOT, "data/footprint.json"), "utf8")
  ) as { counties: unknown[]; places: unknown[] };

  const footprint = {
    counties: raw.counties.map((c) => validateFootprintEntry(c, "county")),
    places: raw.places.map((p) => validateFootprintEntry(p, "place")),
  };

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
    let best: (typeof counties)[number] | undefined;
    let bestDist = Infinity;
    for (const c of counties) {
      if (c.state !== p.state) continue;
      const d = haversine(p.lat, p.lon, c.lat, c.lon);
      if (d < bestDist) { bestDist = d; best = c; }
    }
    if (!best) {
      // Validation already rejects states outside MO/KS, so this can only
      // happen if one of the two states has zero counties in the footprint --
      // a data problem, not a code bug. Fail loudly and name the record.
      throw new Error(
        `no county found in state "${p.state}" for place "${p.name}" (geoid ${p.geoid}) -- ` +
        `every place must have at least one county centroid in its own state`
      );
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
}

// Only run the generator when this file is executed directly (`npm run
// codegen:geography`), not when imported by tests for its pure functions.
const isDirectRun =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectRun) {
  generate();
}

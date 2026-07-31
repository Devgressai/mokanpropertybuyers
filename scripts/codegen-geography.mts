import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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

// ---------------------------------------------------------------------------
// Census place-to-county crosswalk. The Gazetteer-only heuristic below (a
// city's county is "whichever county centroid is nearest, same state") is
// wrong near a county border -- nearest-centroid has no idea where the actual
// line is drawn. The crosswalk is the actual line: one row per place, listing
// every county that place's boundary genuinely touches. Distance is used
// below ONLY to break a tie among a place's own real counties (a place that
// truly spans two counties needs one designated as the primary), never to
// guess a county a place doesn't touch.
// ---------------------------------------------------------------------------

const CROSSWALK_SOURCES: Record<StateCode, { url: string; cache: string }> = {
  KS: {
    url: "https://www2.census.gov/geo/docs/reference/codes/files/st20_ks_places.txt",
    cache: "st20_ks_places.txt",
  },
  MO: {
    url: "https://www2.census.gov/geo/docs/reference/codes/files/st29_mo_places.txt",
    cache: "st29_mo_places.txt",
  },
};

/**
 * Downloads a file to scripts/.cache if it is not already there, in the same
 * style build-footprint.py caches the Gazetteer and population files it
 * downloads -- a repeat run (or CI) only pays the network cost once.
 */
async function fetchCached(cacheDir: string, url: string, cacheName: string): Promise<string> {
  const path = resolve(cacheDir, cacheName);
  if (!existsSync(path)) {
    mkdirSync(cacheDir, { recursive: true });
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`failed to download ${url}: HTTP ${res.status} ${res.statusText}`);
    }
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
  }
  return path;
}

/**
 * Parses one Census "st<FIPS>_<state>_places.txt" crosswalk file into a map
 * from place geoid (state FIPS + place FIPS, matching FootprintEntry.geoid)
 * to the list of county names that place touches. A row looks like:
 *   KS|20|64500|Shawnee city|Incorporated Place|A|Johnson County
 * and a place spanning multiple counties lists them comma-separated in the
 * same field:
 *   MO|29|38000|Kansas City city|Incorporated Place|A|Cass County, Clay County, Jackson County, Platte County
 */
export function parseCrosswalk(text: string): Map<string, string[]> {
  const map = new Map<string, string[]>();
  for (const line of text.split("\n")) {
    const row = line.trim();
    if (!row) continue;
    const parts = row.split("|");
    if (parts.length < 7) continue;
    const stateFips = parts[1];
    const placeFips = parts[2];
    const countyField = parts[6];
    const geoid = `${stateFips}${placeFips}`;
    const countyNames = countyField
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    map.set(geoid, countyNames);
  }
  return map;
}

export async function loadCrosswalk(cacheDir: string): Promise<Map<string, string[]>> {
  const merged = new Map<string, string[]>();
  for (const state of Object.keys(CROSSWALK_SOURCES) as StateCode[]) {
    const { url, cache } = CROSSWALK_SOURCES[state];
    const path = await fetchCached(cacheDir, url, cache);
    const text = readFileSync(path, "latin1");
    for (const [geoid, names] of parseCrosswalk(text)) merged.set(geoid, names);
  }
  return merged;
}

/**
 * Fails loudly, naming the offending record, exactly like
 * `validateFootprintEntry` -- if a place has no row in the crosswalk, this is
 * a data problem (the crosswalk should cover every incorporated place and
 * CDP in both states), not something to paper over with a guess.
 */
export function lookupRealCounties(
  crosswalk: ReadonlyMap<string, string[]>,
  place: { name: string; state: StateCode; geoid: string }
): string[] {
  const found = crosswalk.get(place.geoid);
  if (!found || found.length === 0) {
    throw new Error(
      `place record {name: ${JSON.stringify(place.name)}, state: ${JSON.stringify(place.state)}, geoid: ${JSON.stringify(place.geoid)}}: ` +
      `no matching row in the Census place-county crosswalk (st20_ks_places.txt / st29_mo_places.txt) -- ` +
      `cannot assign a county without one`
    );
  }
  return found;
}

interface CentroidCandidate {
  slug: string;
  name: string;
  lat: number;
  lon: number;
}

/** Nearest candidate by haversine distance from `place`. Throws on an empty list. */
function nearestByCentroid<T extends CentroidCandidate>(
  candidates: T[],
  place: { lat: number; lon: number }
): T {
  let best: T | undefined;
  let bestDist = Infinity;
  for (const c of candidates) {
    const d = haversine(place.lat, place.lon, c.lat, c.lon);
    if (d < bestDist) { bestDist = d; best = c; }
  }
  if (!best) throw new Error("nearestByCentroid: empty candidate list");
  return best;
}

export interface CountyAssignment<T extends CentroidCandidate> {
  /** The county this city treats as its single parent (a real page must exist for it). */
  primary: T;
  /** Every county name the place actually touches, per the crosswalk, plus the
   *  primary if it had to fall back outside that set. Always includes `primary.name`. */
  countyNames: string[];
  /** True only for the explicit, logged fallback path (see below). */
  usedFallback: boolean;
}

/**
 * Assigns a city's primary county, constrained to the counties it actually
 * touches (per the crosswalk) whenever any of those are modeled in this
 * site's footprint. Nearest-centroid is used only to break a tie among a
 * place's own real, modeled counties -- never across the full county list.
 *
 * A small number of places (three, as of the 2023 crosswalk: El Dorado
 * Springs and Stover in Missouri each have exactly one real county -- Cedar
 * and Morgan -- that sits outside this site's 100-mile / 53-county
 * footprint; New Franklin's is Howard) have NO real county modeled here at
 * all. This site's footprint is fixed at build-footprint.py's radius (a
 * `check:slugs` / `geography.test.ts` invariant this codegen must not grow
 * by inventing new county pages), so those places cannot get a genuinely
 * correct primary parent without adding a page. The explicit, logged
 * exception: fall back to the nearest MODELED same-state county so the city
 * still resolves to a real page, but record the true jurisdiction in
 * `countyNames` (and hence `countiesAll` on the generated CityDef) so it is
 * never silently lost the way the old unconstrained nearest-centroid bug
 * lost it for cities that DID have a modeled county available.
 */
export function assignCounty<T extends CentroidCandidate>(
  place: { name: string; state: StateCode; geoid: string; lat: number; lon: number },
  realCountyNames: string[],
  countiesInState: T[]
): CountyAssignment<T> {
  const realModeled = countiesInState.filter((c) => realCountyNames.includes(c.name));

  if (realModeled.length === 1) {
    return { primary: realModeled[0], countyNames: realCountyNames, usedFallback: false };
  }
  if (realModeled.length > 1) {
    const primary = nearestByCentroid(realModeled, place);
    return { primary, countyNames: realCountyNames, usedFallback: false };
  }

  // realModeled.length === 0: every real county for this place is outside
  // the modeled footprint. Explicit fallback, loudly logged -- see doc comment.
  const primary = nearestByCentroid(countiesInState, place);
  console.warn(
    `FALLBACK COUNTY ASSIGNMENT: ${place.name}, ${place.state} (geoid ${place.geoid}) -- ` +
    `its real county per the Census crosswalk [${realCountyNames.join(", ")}] is not modeled in ` +
    `this site's ${countiesInState.length}-county-per-state footprint. Using nearest modeled county ` +
    `"${primary.name}" as the structural parent page; the true county is still recorded in countiesAll.`
  );
  return {
    primary,
    countyNames: [...new Set([...realCountyNames, primary.name])],
    usedFallback: true,
  };
}

/**
 * Reads data/footprint.json, validates every record at the boundary, derives
 * states/counties/cities, and writes src/data/geography.ts. Wrapped in a
 * function (rather than run at module load) so tests can import
 * `validateFootprintEntry` and `slugifyPlace` without triggering file I/O.
 */
async function generate(): Promise<void> {
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

  const crosswalk = await loadCrosswalk(resolve(ROOT, "scripts/.cache"));

  const cities = footprint.places.map((p) => {
    const realCountyNames = lookupRealCounties(crosswalk, p);
    const countiesInState = counties.filter((c) => c.state === p.state);
    if (countiesInState.length === 0) {
      // Validation already rejects states outside MO/KS, so this can only
      // happen if one of the two states has zero counties in the footprint --
      // a data problem, not a code bug. Fail loudly and name the record.
      throw new Error(
        `no county found in state "${p.state}" for place "${p.name}" (geoid ${p.geoid}) -- ` +
        `every place must have at least one county centroid in its own state`
      );
    }
    const { primary, countyNames } = assignCounty(p, realCountyNames, countiesInState);

    primary.citySlugs.push(slugifyPlace(p.name, p.state, "city"));
    const countiesAll = [...new Set(countyNames)]
      .map((name) => slugifyPlace(name, p.state, "county"))
      .sort();
    return {
      slug: slugifyPlace(p.name, p.state, "city"),
      name: cleanName(p.name),
      state: p.state,
      geoid: p.geoid,
      population: p.pop ?? 0,
      distanceMi: p.dist,
      lat: p.lat,
      lon: p.lon,
      countySlug: primary.slug,
      countiesAll,
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
  countySlug: string; countiesAll: string[]; tier: 1 | 2 | 3 | 4 | 5;
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
  await generate();
}

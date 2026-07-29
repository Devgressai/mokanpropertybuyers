# MoKan Wave 0A — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a deployable Next.js site that renders 2 state hubs, 53 county hubs, and 144 city pages generated from committed Census data, with state-scoped slugs enforced by a gate, indexation gated by content depth, and CI green on every push.

**Architecture:** A hard fork of the Sierra Property Buyers engine with an entirely new data layer. The decisive structural change is that geography is **generated from `data/footprint.json`, not hand-authored** — SPB hand-wrote 180 location definitions and shipped a slug collision as a result. Here a codegen script derives `src/data/geography.ts` from Census data, so every slug is state-scoped by construction and a gate proves uniqueness. A `state` page type sits above `county`, giving Missouri-only and Kansas-only legal content a structural home.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS v4, Vitest (new — SPB has no test framework), Resend, GitHub Actions.

## Global Constraints

- **Slugs:** every geographic slug is state-scoped and globally unique. No bare `kansas-city`. Enforced by `check:slugs`.
- **Legal content:** every legal claim declares its state and carries a statute or official-source citation. Enforced by `check:state-claims`.
- **Honesty:** `src/data/trust.ts` ships with empty arrays. No review counts, ratings, homes-purchased, dollars-paid, or years-in-business. No case studies. No invented market data. No "guaranteed" language.
- **NAP:** placeholders only, centralized in `src/lib/site.ts`, clearly marked. Real values land later (spec §13).
- **Indexation:** a page is `index, follow` only when it passes the content gate. Everything else is `noindex, follow`.
- **Never build locally.** CI is the gate. Do not run `npm run build` on the workstation; push and read the Actions result. Running `vitest`, `tsc --noEmit`, and individual gate scripts locally is expected and required — those are not builds.
- **Each gate task appends its own CI step.** Tasks 2, 3, 6, and 8 add their step to `.github/workflows/ci.yml` in the same commit that creates the script, so CI is green at every commit and never invokes a script that does not exist yet.
- **Commits:** no `Co-Authored-By` or `Claude-Session` trailers.
- **Palette:** only the `--mk-*` tokens from spec §10. `--mk-clay` on `--mk-limestone` is 4.35:1 — large text and buttons only; use `--mk-clay-ink` for small text.
- **Deploy:** push to `main` on GitHub only. Vercel and DNS are user-managed.

---

### Task 1: Project scaffold and CI

CI exists before anything else, so every subsequent task is gated from its first commit. This is the gap that let three sibling projects ship broken builds.

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `.github/workflows/ci.yml`
- Create: `.env.example`
- Test: `tests/smoke.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `npm run check:all` script alias; CSS custom properties `--mk-ink`, `--mk-river`, `--mk-river-deep`, `--mk-limestone`, `--mk-stone`, `--mk-slate`, `--mk-clay`, `--mk-clay-ink`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "mokanpropertybuyers",
  "version": "0.1.0",
  "private": true,
  "engines": { "node": ">=20.0.0" },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "codegen:geography": "tsx scripts/codegen-geography.mts",
    "check:slugs": "tsx scripts/check-slugs.mts",
    "check:state-claims": "tsx scripts/check-state-claims.mts",
    "check:pages": "tsx scripts/check-pages.mts",
    "check:assets": "tsx scripts/check-assets.mts",
    "check:links": "tsx scripts/check-links.mts",
    "check:all": "npm run typecheck && npm run test && npm run check:slugs && npm run check:state-claims && npm run check:pages && npm run check:assets && npm run check:links"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^6.9.4"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.3.5",
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.3.0",
    "postcss": "^8.5.0",
    "tailwindcss": "^4.0.0",
    "tsx": "^4.23.0",
    "typescript": "^5.0.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Write `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
```

- [ ] **Step 4: Write `src/app/globals.css` with the validated palette**

```css
@import "tailwindcss";

:root {
  --mk-ink: #14181b;
  --mk-river: #1d4e63;
  --mk-river-deep: #12333f;
  --mk-limestone: #f4f1ea;
  --mk-stone: #ded8cc;
  --mk-slate: #5c6670;
  --mk-clay: #b4552d;
  --mk-clay-ink: #8f3f1e;
}

@theme inline {
  --color-ink: var(--mk-ink);
  --color-river: var(--mk-river);
  --color-river-deep: var(--mk-river-deep);
  --color-limestone: var(--mk-limestone);
  --color-stone: var(--mk-stone);
  --color-slate: var(--mk-slate);
  --color-clay: var(--mk-clay);
  --color-clay-ink: var(--mk-clay-ink);
}

body {
  background: var(--mk-limestone);
  color: var(--mk-ink);
}
```

- [ ] **Step 5: Write the failing smoke test**

```typescript
// tests/smoke.test.ts
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("project scaffold", () => {
  it("declares every quality gate in check:all", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    const all = pkg.scripts["check:all"];
    for (const gate of [
      "typecheck", "test", "check:slugs", "check:state-claims",
      "check:pages", "check:assets", "check:links",
    ]) {
      expect(all).toContain(gate);
    }
  });

  it("defines every brand token and no legacy SPB token", () => {
    const css = readFileSync("src/app/globals.css", "utf8");
    for (const token of [
      "--mk-ink", "--mk-river", "--mk-river-deep", "--mk-limestone",
      "--mk-stone", "--mk-slate", "--mk-clay", "--mk-clay-ink",
    ]) {
      expect(css).toContain(token);
    }
    expect(css).not.toContain("--spb-");
    expect(css).not.toContain("--color-primary");
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run tests/smoke.test.ts`
Expected: FAIL — `package.json` and `globals.css` do not yet exist, or `check:all` is missing gates.

- [ ] **Step 7: Create the remaining scaffold files so the test passes**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`src/lib/site.ts` — every placeholder in one place, so §13 is a single-file edit:

```typescript
/**
 * Central site identity.
 *
 * PLACEHOLDER VALUES are marked below. They are deliberately obvious rather
 * than plausible: a fake-but-realistic phone number is worse than a visibly
 * unset one, because it ships silently. Nothing here may be invented.
 * See docs/superpowers/specs/2026-07-29-mokan-property-buyers-design.md §13.
 */
export const SITE = {
  name: "MoKan Property Buyers",
  url: "https://mokanpropertybuyers.com",
  description:
    "We buy houses, land, and small multifamily for cash across the Kansas City metro — both sides of the state line, and 100 miles out.",
  /** PLACEHOLDER — blocker #3 */
  phone: "",
  /** PLACEHOLDER — blocker #4 */
  address: { street: "", city: "", region: "", postalCode: "", country: "US" },
  /** PLACEHOLDER — blocker #2 */
  legalEntity: "",
  email: "",
} as const;

/** True when real NAP has landed. Schema and call CTAs check this. */
export const hasNap = (): boolean =>
  SITE.phone !== "" && SITE.address.street !== "" && SITE.legalEntity !== "";
```

`src/data/trust.ts` — empty by design:

```typescript
/**
 * HONESTY RULE: every value here must be real and independently verifiable.
 * Components render these ONLY when populated, so an empty file ships nothing
 * false. Do NOT invent stats, ratings, review counts, or a person.
 * Populating this requires user-supplied verified figures (spec §13, blocker 6).
 */
export interface TrustStat {
  value: string;
  label: string;
}

export const trustStats: TrustStat[] = [];
export const reviews: never[] = [];
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npx vitest run tests/smoke.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 9: Write `.github/workflows/ci.yml`**

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      - run: npm ci
      - name: Typecheck
        run: npm run typecheck
      - name: Unit tests
        run: npm test
      - name: Lint
        run: npm run lint
      # Gate steps are appended by the tasks that create them:
      #   Task 2 -> geography codegen drift check
      #   Task 3 -> check:slugs
      #   Task 6 -> check:state-claims
      #   Task 8 -> check:pages, check:assets, check:links
      # CI must be green at every commit, so a step is never added before the
      # script it runs exists.
      - name: Build
        run: npm run build
```

**Note on `check:all`:** `package.json` declares every gate from Task 1 as a
forward declaration, but CI does not invoke `check:all` until Task 8 adds the
last gate script. Running `npm run check:all` locally before Task 8 will fail on
missing scripts — that is expected. Run individual gates until then.

- [ ] **Step 10: Commit**

```bash
git add package.json tsconfig.json vitest.config.ts next.config.ts postcss.config.mjs \
        eslint.config.mjs .env.example .github/workflows/ci.yml \
        src/app/layout.tsx src/app/page.tsx src/app/globals.css \
        src/lib/site.ts src/data/trust.ts tests/smoke.test.ts
git commit -m "scaffold: the build gate comes first

CI runs typecheck, tests, lint, every content gate, and a real build on
every push. Three sibling projects have shipped broken deploys because
nothing checked; this repo starts with the check.

trust.ts ships empty and site.ts marks its placeholders visibly rather
than plausibly, so unset NAP fails loudly instead of shipping a
convincing fake."
```

---

### Task 2: Geography codegen from Census data

The single most important task. It makes the collision class from spec §7 structurally impossible.

**Files:**
- Create: `scripts/codegen-geography.mts`
- Create: `src/data/geography.ts` (generated — never hand-edited)
- Test: `tests/geography.test.ts`

**Interfaces:**
- Consumes: `data/footprint.json` (committed in `4b1802d`)
- Produces:
  - `type StateCode = "MO" | "KS"`
  - `interface StateDef { code: StateCode; name: string; slug: string; }`
  - `interface CountyDef { slug: string; name: string; state: StateCode; geoid: string; population: number; distanceMi: number; lat: number; lon: number; citySlugs: string[]; }`
  - `interface CityDef { slug: string; name: string; state: StateCode; geoid: string; population: number; distanceMi: number; lat: number; lon: number; countySlug: string; tier: 1|2|3|4|5; }`
  - `export const states: StateDef[]`, `export const counties: CountyDef[]`, `export const cities: CityDef[]`
  - `export function slugifyPlace(rawName: string, state: StateCode, kind: "city" | "county"): string`

- [ ] **Step 1: Write the failing test**

These cases are drawn from the real data, including every collision found in spec §7.

```typescript
// tests/geography.test.ts
import { describe, expect, it } from "vitest";
import { states, counties, cities, slugifyPlace } from "@/data/geography";

describe("slugifyPlace", () => {
  it("strips Census entity suffixes", () => {
    expect(slugifyPlace("Kansas City city", "MO", "city"))
      .toBe("sell-my-house-fast-kansas-city-mo");
    expect(slugifyPlace("Bonner Springs city", "KS", "city"))
      .toBe("sell-my-house-fast-bonner-springs-ks");
  });

  it("drops apostrophes rather than hyphenating them", () => {
    expect(slugifyPlace("Lee's Summit city", "MO", "city"))
      .toBe("sell-my-house-fast-lees-summit-mo");
  });

  it("drops periods in abbreviated names", () => {
    expect(slugifyPlace("St. Joseph city", "MO", "city"))
      .toBe("sell-my-house-fast-st-joseph-mo");
  });

  it("state-scopes counties", () => {
    expect(slugifyPlace("Johnson County", "KS", "county"))
      .toBe("sell-my-house-fast-johnson-county-ks");
    expect(slugifyPlace("Johnson County", "MO", "county"))
      .toBe("sell-my-house-fast-johnson-county-mo");
  });
});

describe("footprint", () => {
  it("has both states", () => {
    expect(states.map((s) => s.code).sort()).toEqual(["KS", "MO"]);
  });

  it("has 53 counties, 31 Missouri and 22 Kansas", () => {
    expect(counties).toHaveLength(53);
    expect(counties.filter((c) => c.state === "MO")).toHaveLength(31);
    expect(counties.filter((c) => c.state === "KS")).toHaveLength(22);
  });

  it("has 144 city pages, all at or above 1,000 population", () => {
    expect(cities).toHaveLength(144);
    expect(Math.min(...cities.map((c) => c.population))).toBeGreaterThanOrEqual(1000);
  });

  it("keeps both Kansas Cities as distinct pages", () => {
    const kc = cities.filter((c) => c.name === "Kansas City");
    expect(kc).toHaveLength(2);
    expect(kc.map((c) => c.slug).sort()).toEqual([
      "sell-my-house-fast-kansas-city-ks",
      "sell-my-house-fast-kansas-city-mo",
    ]);
    expect(kc.find((c) => c.state === "MO")!.population).toBe(510704);
    expect(kc.find((c) => c.state === "KS")!.population).toBe(152933);
  });

  it("keeps both Johnson Counties as distinct pages", () => {
    const jo = counties.filter((c) => c.name === "Johnson County");
    expect(jo).toHaveLength(2);
    expect(jo.find((c) => c.state === "KS")!.population).toBe(622237);
    expect(jo.find((c) => c.state === "MO")!.population).toBe(54962);
  });

  it("assigns every city to a county that exists in the same state", () => {
    const bySlug = new Map(counties.map((c) => [c.slug, c]));
    for (const city of cities) {
      const county = bySlug.get(city.countySlug);
      expect(county, `${city.slug} -> ${city.countySlug}`).toBeDefined();
      expect(county!.state).toBe(city.state);
    }
  });

  it("produces globally unique slugs across every geographic type", () => {
    const all = [
      ...states.map((s) => s.slug),
      ...counties.map((c) => c.slug),
      ...cities.map((c) => c.slug),
    ];
    expect(new Set(all).size).toBe(all.length);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/geography.test.ts`
Expected: FAIL — `Cannot find module '@/data/geography'`

- [ ] **Step 3: Write `scripts/codegen-geography.mts`**

County assignment for cities is the one genuinely tricky part: the Census place file has no county field, so each city is assigned to the nearest county centroid **within its own state**. The same-state constraint is what prevents a Kansas town from being filed under a Missouri county across the line.

```typescript
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
```

- [ ] **Step 4: Generate and run the test to verify it passes**

Run: `npm run codegen:geography && npx vitest run tests/geography.test.ts`
Expected: `geography.ts: 2 states, 53 counties, 144 cities`, then PASS (11 tests — 4 in the `slugifyPlace` block, 7 in the `footprint` block)

- [ ] **Step 5: Commit**

```bash
git add scripts/codegen-geography.mts src/data/geography.ts tests/geography.test.ts
git commit -m "geo: generate the service area instead of typing it

53 counties and 144 cities derived from the committed Census footprint.
Sierra hand-wrote 180 locations and shipped two towns named Live Oak
sharing one slug; the Map silently dropped one. Generating the slugs
makes that class of bug unrepresentable: state-scoping is applied by
construction, and the test asserts both Kansas Citys and both Johnson
Counties survive as distinct pages.

Cities attach to the nearest county centroid within their own state.
The same-state constraint is load-bearing -- across a line this
crooked, nearest-overall would file Kansas towns under Missouri
counties and hand them the wrong foreclosure law."
```

---

### Task 3: The slug gate

**Files:**
- Create: `scripts/check-slugs.mts`
- Test: `tests/check-slugs.test.ts`

**Interfaces:**
- Consumes: `states`, `counties`, `cities` from `@/data/geography`
- Produces: `export function auditSlugs(): SlugAudit` where
  `interface SlugAudit { total: number; duplicates: string[]; unscoped: string[]; }`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/check-slugs.test.ts
import { describe, expect, it } from "vitest";
import { auditSlugs } from "../scripts/check-slugs.mjs";

describe("auditSlugs", () => {
  it("finds no duplicate slugs in the real footprint", () => {
    expect(auditSlugs().duplicates).toEqual([]);
  });

  it("finds no unscoped geographic slugs", () => {
    expect(auditSlugs().unscoped).toEqual([]);
  });

  it("audits every geographic page", () => {
    expect(auditSlugs().total).toBe(2 + 53 + 144);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/check-slugs.test.ts`
Expected: FAIL — `Cannot find module '../scripts/check-slugs.mjs'`

- [ ] **Step 3: Write `scripts/check-slugs.mts`**

```typescript
import { states, counties, cities } from "../src/data/geography.js";

export interface SlugAudit {
  total: number;
  duplicates: string[];
  unscoped: string[];
}

export function auditSlugs(): SlugAudit {
  const geo = [
    ...counties.map((c) => c.slug),
    ...cities.map((c) => c.slug),
  ];
  const all = [...states.map((s) => s.slug), ...geo];

  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const slug of all) {
    if (seen.has(slug)) duplicates.add(slug);
    seen.add(slug);
  }

  // Counties and cities must end in -mo or -ks. State hubs are exempt: their
  // slug IS the state, so a suffix would read "missouri-mo".
  const unscoped = geo.filter((s) => !/-(mo|ks)$/.test(s));

  return { total: all.length, duplicates: [...duplicates], unscoped };
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
```

- [ ] **Step 4: Run the test and the gate to verify they pass**

Run: `npx vitest run tests/check-slugs.test.ts && npm run check:slugs`
Expected: PASS (3 tests), then `check:slugs OK — 199 geographic slugs, all unique and state-scoped`

- [ ] **Step 5: Commit**

```bash
git add scripts/check-slugs.mts tests/check-slugs.test.ts
git commit -m "gate: prove no two places share a slug

Seven towns and three counties in this radius share a name across the
state line, and the two worst are the biggest entities in the market.
The gate asserts global uniqueness and that every county and city slug
carries a state suffix, so a future hand-added page cannot quietly
collide with Kansas City."
```

---

### Task 4: Page index with the state layer

**Files:**
- Create: `src/types/seo.ts`
- Create: `src/lib/seo/pageIndex.ts`
- Test: `tests/page-index.test.ts`

**Interfaces:**
- Consumes: `@/data/geography`
- Produces:
  - `type PageType = "state" | "county" | "city" | "region" | "situation" | "propertyType" | "financing" | "guide" | "countyTopic" | "stateLine"`
  - `interface SeoPage { slug; title; h1; type: PageType; stateCode?: StateCode; parentSlug?: string; childSlugs?: string[]; nearbySlugs?: string[]; priority: number; metaDescription: string; heroSubtext?: string; }`
  - `export const seoPages: SeoPage[]`
  - `export function getPageBySlug(slug: string): SeoPage | undefined`
  - `export function getPagesByType(type: PageType): SeoPage[]`
  - `export function getPagesByState(code: StateCode): SeoPage[]`
  - `export function getAllSeoSlugs(): string[]`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/page-index.test.ts
import { describe, expect, it } from "vitest";
import {
  seoPages, getPageBySlug, getPagesByType, getPagesByState, getAllSeoSlugs,
} from "@/lib/seo/pageIndex";

describe("pageIndex", () => {
  it("indexes 2 state hubs, 53 counties, and 144 cities", () => {
    expect(getPagesByType("state")).toHaveLength(2);
    expect(getPagesByType("county")).toHaveLength(53);
    expect(getPagesByType("city")).toHaveLength(144);
  });

  it("gives every geographic page a state code", () => {
    for (const p of seoPages) {
      if (["state", "county", "city"].includes(p.type)) {
        expect(p.stateCode, p.slug).toMatch(/^(MO|KS)$/);
      }
    }
  });

  it("parents each county to its state hub", () => {
    const jackson = getPageBySlug("sell-my-house-fast-jackson-county-mo")!;
    expect(jackson.parentSlug).toBe("sell-my-house-fast-missouri");
    expect(jackson.stateCode).toBe("MO");
  });

  it("parents each city to a county in the same state", () => {
    for (const city of getPagesByType("city")) {
      const parent = getPageBySlug(city.parentSlug!);
      expect(parent, city.slug).toBeDefined();
      expect(parent!.type).toBe("county");
      expect(parent!.stateCode).toBe(city.stateCode);
    }
  });

  it("splits pages by state without losing any", () => {
    const mo = getPagesByState("MO").length;
    const ks = getPagesByState("KS").length;
    expect(mo + ks).toBe(2 + 53 + 144);
    expect(mo).toBe(1 + 31 + getPagesByType("city").filter(c => c.stateCode === "MO").length);
  });

  it("emits no duplicate slugs", () => {
    const all = getAllSeoSlugs();
    expect(new Set(all).size).toBe(all.length);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/page-index.test.ts`
Expected: FAIL — `Cannot find module '@/lib/seo/pageIndex'`

- [ ] **Step 3: Write `src/types/seo.ts`**

```typescript
import type { StateCode } from "@/data/geography";

export type PageType =
  | "state"
  | "county"
  | "city"
  | "region"
  | "situation"
  | "propertyType"
  | "financing"
  | "guide"
  | "countyTopic"
  | "stateLine";

export interface SeoPage {
  slug: string;
  title: string;
  h1: string;
  type: PageType;
  /** Required for state, county, and city pages. Absent on statewide-neutral silos. */
  stateCode?: StateCode;
  parentSlug?: string;
  childSlugs?: string[];
  nearbySlugs?: string[];
  priority: number;
  metaDescription: string;
  heroSubtext?: string;
}

export interface LinkItem {
  slug: string;
  title: string;
  reason: "parent" | "child" | "nearby" | "sibling" | "state" | "situation";
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
```

- [ ] **Step 4: Write `src/lib/seo/pageIndex.ts`**

```typescript
import { states, counties, cities, type StateCode } from "@/data/geography";
import { SITE } from "@/lib/site";
import type { PageType, SeoPage } from "@/types/seo";

const stateBySlug = new Map(states.map((s) => [s.code, s]));

function buildSeoPages(): SeoPage[] {
  const pages: SeoPage[] = [];

  for (const state of states) {
    const own = counties.filter((c) => c.state === state.code);
    pages.push({
      slug: state.slug,
      title: `Sell My House Fast in ${state.name} | ${SITE.name}`,
      h1: `Sell Your House Fast in ${state.name}`,
      type: "state",
      stateCode: state.code,
      childSlugs: own.map((c) => c.slug),
      priority: 100,
      metaDescription:
        `We buy houses, land, and small multifamily for cash across ${state.name}. ` +
        `${state.name} law sets the timeline — here is exactly how it works.`,
    });
  }

  for (const county of counties) {
    const state = stateBySlug.get(county.state)!;
    pages.push({
      slug: county.slug,
      title: `Sell My House Fast in ${county.name}, ${county.state} | ${SITE.name}`,
      h1: `Sell Your House Fast in ${county.name}, ${county.state}`,
      type: "county",
      stateCode: county.state,
      parentSlug: state.slug,
      childSlugs: county.citySlugs,
      priority: 90,
      metaDescription:
        `Cash offers on houses, land, and small multifamily in ${county.name}, ` +
        `${state.name}. Any condition. You pick the closing date.`,
    });
  }

  const countyBySlug = new Map(counties.map((c) => [c.slug, c]));
  for (const city of cities) {
    const county = countyBySlug.get(city.countySlug)!;
    pages.push({
      slug: city.slug,
      title: `Sell My House Fast in ${city.name}, ${city.state} | ${SITE.name}`,
      h1: `Sell Your House Fast in ${city.name}, ${city.state}`,
      type: "city",
      stateCode: city.state,
      parentSlug: county.slug,
      nearbySlugs: nearestSiblings(city.slug),
      priority: city.tier === 1 ? 88 : city.tier === 2 ? 80 : 70,
      metaDescription:
        `Sell your ${city.name}, ${city.state} house as-is for cash. No repairs, ` +
        `no commissions, no fees. Get an offer and close on your timeline.`,
    });
  }

  return pages;
}

/** Six nearest cities in the same state, by great-circle distance. */
function nearestSiblings(slug: string): string[] {
  const self = cities.find((c) => c.slug === slug)!;
  return cities
    .filter((c) => c.slug !== slug && c.state === self.state)
    .map((c) => ({
      slug: c.slug,
      d: Math.hypot(c.lat - self.lat, (c.lon - self.lon) * Math.cos((self.lat * Math.PI) / 180)),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .map((c) => c.slug);
}

export const seoPages: SeoPage[] = buildSeoPages();

const pageMap = new Map(seoPages.map((p) => [p.slug, p]));

export function getPageBySlug(slug: string): SeoPage | undefined {
  return pageMap.get(slug);
}
export function getPagesByType(type: PageType): SeoPage[] {
  return seoPages.filter((p) => p.type === type);
}
export function getPagesByState(code: StateCode): SeoPage[] {
  return seoPages.filter((p) => p.stateCode === code);
}
export function getAllSeoSlugs(): string[] {
  return seoPages.map((p) => p.slug);
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run tests/page-index.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 6: Commit**

```bash
git add src/types/seo.ts src/lib/seo/pageIndex.ts tests/page-index.test.ts
git commit -m "seo: put a state layer above the counties

Sierra's index goes county -> city and stamps state: 'CA' as a constant,
which is fine when there is one state. Here the state is the single most
consequential fact about a property: it decides whether foreclosure runs
through a court, whether there is a redemption period, and how much
homestead protection the seller has.

So stateCode is required on every geographic page, counties parent to a
state hub, and a test asserts no city can ever parent to a county across
the line."
```

---

### Task 5: Indexation gate

Content-depth gating from spec §9. Nothing indexes until it earns it.

**Files:**
- Create: `src/lib/seo/indexation.ts`
- Test: `tests/indexation.test.ts`

**Interfaces:**
- Consumes: `@/lib/seo/pageIndex`
- Produces:
  - `interface PageContent { slug: string; body: string[]; }`
  - `export const MIN_INDEXABLE_WORDS = 600`
  - `export function wordCount(body: string[]): number`
  - `export function isIndexable(slug: string): boolean`
  - `export function robotsFor(slug: string): { index: boolean; follow: boolean }`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/indexation.test.ts
import { describe, expect, it } from "vitest";
import {
  MIN_INDEXABLE_WORDS, wordCount, isIndexable, robotsFor,
} from "@/lib/seo/indexation";

describe("indexation gate", () => {
  it("counts words across body blocks", () => {
    expect(wordCount(["one two three", "four five"])).toBe(5);
  });

  it("refuses to index a page with no content", () => {
    expect(isIndexable("sell-my-house-fast-worth-county-mo")).toBe(false);
  });

  it("still follows links on a noindex page, so equity flows", () => {
    expect(robotsFor("sell-my-house-fast-worth-county-mo"))
      .toEqual({ index: false, follow: true });
  });

  it("sets the floor above Sierra's thinnest surviving page", () => {
    // Sierra's post-remediation minimum was 537 words. Ours starts above it.
    expect(MIN_INDEXABLE_WORDS).toBeGreaterThan(537);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/indexation.test.ts`
Expected: FAIL — `Cannot find module '@/lib/seo/indexation'`

- [ ] **Step 3: Write `src/lib/seo/indexation.ts`**

```typescript
import { getPageContent } from "@/data/content-registry";

/**
 * A page earns `index, follow` by having hand-written body copy at or above
 * this floor. Below it, the page still renders and still passes link equity,
 * but it stays out of the index.
 *
 * Sierra indexed 748 pages and drew 9 clicks in three months. The page count
 * was never the constraint; publishing thin pages to reach it was the risk.
 */
export const MIN_INDEXABLE_WORDS = 600;

export function wordCount(body: string[]): number {
  return body.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

export function isIndexable(slug: string): boolean {
  const content = getPageContent(slug);
  if (!content) return false;
  return wordCount(content.body) >= MIN_INDEXABLE_WORDS;
}

export function robotsFor(slug: string): { index: boolean; follow: boolean } {
  return { index: isIndexable(slug), follow: true };
}
```

- [ ] **Step 4: Write the content registry it depends on**

`src/data/content-registry.ts` — the merge point every later content task writes into:

```typescript
export interface PageContent {
  slug: string;
  /** Paragraph blocks of hand-written body copy. */
  body: string[];
}

/**
 * Merge point for all hand-written page content. Wave 0B adds the state-line
 * silo here; later waves add counties, cities, and situations. Empty is a
 * valid state — it simply means nothing is indexable yet, which is true.
 */
const registries: Record<string, PageContent>[] = [];

const merged: Record<string, PageContent> = Object.assign({}, ...registries);

export function getPageContent(slug: string): PageContent | undefined {
  return merged[slug];
}

export function allContentSlugs(): string[] {
  return Object.keys(merged);
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run tests/indexation.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add src/lib/seo/indexation.ts src/data/content-registry.ts tests/indexation.test.ts
git commit -m "seo: make a page earn its index tag

Every page renders and passes link equity from day one; only depth buys
index, follow. The floor is 600 words, set deliberately above the 537
Sierra ended up at after remediating its thinnest pages.

The registry starts empty, which is honest: nothing is written yet, so
nothing should be indexed yet."
```

---

### Task 6: The state-claims gate

The mechanism behind spec §6's binding rule.

**Files:**
- Create: `src/types/legal.ts`
- Create: `scripts/check-state-claims.mts`
- Test: `tests/check-state-claims.test.ts`

**Interfaces:**
- Consumes: `@/data/content-registry`
- Produces:
  - `interface LegalClaim { state: StateCode; claim: string; citation: string; sourceUrl?: string; verifiedOn: string; }`
  - `export function auditClaims(): ClaimAudit` where
    `interface ClaimAudit { total: number; missingCitation: LegalClaim[]; unlabeledBlends: string[]; }`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/check-state-claims.test.ts
import { describe, expect, it } from "vitest";
import { findUnlabeledBlends, claimIsCited } from "../scripts/check-state-claims.mjs";

describe("state-claims gate", () => {
  it("flags a paragraph naming both states with no state label", () => {
    const blends = findUnlabeledBlends([
      "The redemption period runs twelve months and the trustee sale is set by the lender.",
    ]);
    expect(blends).toHaveLength(0); // names neither state — nothing to blend
  });

  it("flags a paragraph asserting law across both states at once", () => {
    const blends = findUnlabeledBlends([
      "In Missouri and Kansas the foreclosure sale happens without a court hearing.",
    ]);
    expect(blends).toHaveLength(1);
  });

  it("accepts a paragraph that labels each state separately", () => {
    const blends = findUnlabeledBlends([
      "Missouri forecloses without a court. [MO]",
      "Kansas requires a judicial foreclosure and allows redemption. [KS]",
    ]);
    expect(blends).toHaveLength(0);
  });

  it("rejects a legal claim with no citation", () => {
    expect(claimIsCited({
      state: "KS", claim: "Homestead is unlimited in value.",
      citation: "", verifiedOn: "2026-07-29",
    })).toBe(false);
  });

  it("accepts a legal claim with a citation", () => {
    expect(claimIsCited({
      state: "KS", claim: "Homestead is unlimited in value.",
      citation: "Kan. Const. Art. 15 §9", verifiedOn: "2026-07-29",
    })).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/check-state-claims.test.ts`
Expected: FAIL — `Cannot find module '../scripts/check-state-claims.mjs'`

- [ ] **Step 3: Write `src/types/legal.ts`**

```typescript
import type { StateCode } from "@/data/geography";

/**
 * A statement of law. Every field is required because the failure mode this
 * type exists to prevent is a confident, uncited, state-ambiguous assertion.
 */
export interface LegalClaim {
  state: StateCode;
  claim: string;
  /** Statute, constitutional article, or named official source. Never empty. */
  citation: string;
  sourceUrl?: string;
  /** ISO date the claim was checked against its source. */
  verifiedOn: string;
}
```

- [ ] **Step 4: Write `scripts/check-state-claims.mts`**

```typescript
import type { LegalClaim } from "../src/types/legal.js";
import { allContentSlugs, getPageContent } from "../src/data/content-registry.js";

/** Words that mark a sentence as asserting law rather than describing a place. */
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;

const MO = /\bMissouri\b/;
const KS = /\bKansas\b(?!\s+City)/;   // "Kansas City" is a place, not the state
const LABEL = /\[(MO|KS)\]/;

/**
 * A paragraph that names both states AND asserts law AND carries no per-state
 * label is the exact failure this site must not ship: one rule presented as
 * covering both sides of a line where the rules genuinely differ.
 */
export function findUnlabeledBlends(body: string[]): string[] {
  return body.filter(
    (p) => MO.test(p) && KS.test(p) && LEGAL_MARKERS.test(p) && !LABEL.test(p)
  );
}

export function claimIsCited(claim: LegalClaim): boolean {
  return claim.citation.trim().length > 0;
}

export interface ClaimAudit {
  total: number;
  unlabeledBlends: string[];
}

export function auditClaims(): ClaimAudit {
  const blends: string[] = [];
  let total = 0;
  for (const slug of allContentSlugs()) {
    const content = getPageContent(slug);
    if (!content) continue;
    total += content.body.length;
    for (const p of findUnlabeledBlends(content.body)) {
      blends.push(`${slug}: ${p.slice(0, 120)}…`);
    }
  }
  return { total, unlabeledBlends: blends };
}

function main(): void {
  const { total, unlabeledBlends } = auditClaims();
  if (unlabeledBlends.length) {
    for (const b of unlabeledBlends) console.error(`UNLABELED BLEND  ${b}`);
    console.error(`\ncheck:state-claims FAILED — ${unlabeledBlends.length} blended paragraphs`);
    process.exit(1);
  }
  console.log(`check:state-claims OK — ${total} paragraphs, 0 unlabeled MO/KS blends`);
}

if (process.argv[1]?.includes("check-state-claims")) main();
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run tests/check-state-claims.test.ts && npm run check:state-claims`
Expected: PASS (5 tests), then `check:state-claims OK — 0 paragraphs, 0 unlabeled MO/KS blends`

- [ ] **Step 6: Commit**

```bash
git add src/types/legal.ts scripts/check-state-claims.mts tests/check-state-claims.test.ts
git commit -m "gate: refuse to state one rule for two states

Missouri forecloses without a court in weeks. Kansas forecloses through
one and can leave a year of redemption. A paragraph that says 'in
Missouri and Kansas' about foreclosure is wrong no matter which half it
got right, and it is the single most likely way this site misleads
someone at the worst possible moment.

The gate flags any paragraph that names both states, asserts law, and
carries no per-state label. LegalClaim makes citation a required field
so an uncited claim cannot typecheck."
```

---

### Task 7: Geographic routes

**Files:**
- Create: `src/app/(geo)/[slug]/page.tsx`
- Create: `src/components/seo/StatePage.tsx`
- Create: `src/components/seo/CountyPage.tsx`
- Create: `src/components/seo/CityPage.tsx`
- Create: `src/components/seo/Breadcrumbs.tsx`
- Test: `tests/routes.test.ts`

**Interfaces:**
- Consumes: `getAllSeoSlugs`, `getPageBySlug`, `robotsFor`
- Produces: `export function generateStaticParams(): { slug: string }[]`, `export function generateMetadata({ params }): Promise<Metadata>`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/routes.test.ts
import { describe, expect, it } from "vitest";
import { generateStaticParams } from "@/app/(geo)/[slug]/page";
import { getAllSeoSlugs } from "@/lib/seo/pageIndex";

describe("geo route", () => {
  it("statically generates every indexed geographic slug", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(getAllSeoSlugs().length);
  });

  it("generates both Kansas Citys", async () => {
    const slugs = (await generateStaticParams()).map((p) => p.slug);
    expect(slugs).toContain("sell-my-house-fast-kansas-city-mo");
    expect(slugs).toContain("sell-my-house-fast-kansas-city-ks");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/routes.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write `src/app/(geo)/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSeoSlugs, getPageBySlug } from "@/lib/seo/pageIndex";
import { robotsFor } from "@/lib/seo/indexation";
import { getPageContent } from "@/data/content-registry";
import { SITE } from "@/lib/site";
import StatePage from "@/components/seo/StatePage";
import CountyPage from "@/components/seo/CountyPage";
import CityPage from "@/components/seo/CityPage";

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `${SITE.url}/${slug}` },
    robots: robotsFor(slug),
  };
}

export default async function GeoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  // Content is resolved SERVER-SIDE and passed as props. The page components
  // are client components; importing the registry into one would ship the
  // whole corpus to the browser.
  const content = getPageContent(slug)?.body ?? [];

  switch (page.type) {
    case "state":
      return <StatePage page={page} body={content} />;
    case "county":
      return <CountyPage page={page} body={content} />;
    case "city":
      return <CityPage page={page} body={content} />;
    default:
      notFound();
  }
}
```

- [ ] **Step 4: Write the three page components**

`src/components/seo/CityPage.tsx` (county and state follow the same shape — write all three, each rendering its own hierarchy links):

```tsx
"use client";

import Link from "next/link";
import type { SeoPage } from "@/types/seo";
import Breadcrumbs from "./Breadcrumbs";

export default function CityPage({ page, body }: { page: SeoPage; body: string[] }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs page={page} />
      <h1 className="font-semibold text-4xl text-[var(--mk-ink)]">{page.h1}</h1>
      {body.length > 0 ? (
        <div className="mt-8 space-y-5 text-[var(--mk-slate)]">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      ) : (
        <p className="mt-8 text-[var(--mk-slate)]">
          We buy houses in {page.h1.replace(/^Sell Your House Fast in /, "")} in any
          condition. Tell us about the property and we will make an offer.
        </p>
      )}
      {page.parentSlug && (
        <p className="mt-10 text-sm">
          <Link className="text-[var(--mk-clay-ink)] underline" href={`/${page.parentSlug}`}>
            See the whole county
          </Link>
        </p>
      )}
    </main>
  );
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npx vitest run tests/routes.test.ts`
Expected: PASS (2 tests)

- [ ] **Step 6: Commit**

```bash
git add "src/app/(geo)" src/components/seo tests/routes.test.ts
git commit -m "routes: render the whole footprint, index almost none of it

199 geographic pages generate statically. Those without hand-written
copy render a short honest stub and carry noindex, follow -- reachable,
crawlable, passing equity, invisible to the index until someone writes
them.

Content resolves server-side and arrives as props. The page components
are client components, and importing the registry into one would ship
the entire corpus to the browser."
```

---

### Task 8: Sitemap, robots, and the remaining gates

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Create: `scripts/check-pages.mts`, `scripts/check-assets.mts`, `scripts/check-links.mts`
- Test: `tests/sitemap.test.ts`

**Interfaces:**
- Consumes: `seoPages`, `isIndexable`
- Produces: default-exported `sitemap()` returning `MetadataRoute.Sitemap`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/sitemap.test.ts
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { isIndexable } from "@/lib/seo/indexation";
import { getAllSeoSlugs } from "@/lib/seo/pageIndex";

describe("sitemap", () => {
  it("lists only indexable pages", () => {
    const urls = sitemap().map((e) => e.url);
    for (const slug of getAllSeoSlugs()) {
      const listed = urls.some((u) => u.endsWith(`/${slug}`));
      expect(listed, slug).toBe(isIndexable(slug));
    }
  });

  it("never advertises a noindex URL", () => {
    for (const entry of sitemap()) {
      const slug = entry.url.split("/").pop()!;
      if (getAllSeoSlugs().includes(slug)) expect(isIndexable(slug)).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tests/sitemap.test.ts`
Expected: FAIL — module not found

- [ ] **Step 3: Write `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo/pageIndex";
import { isIndexable } from "@/lib/seo/indexation";
import { SITE } from "@/lib/site";

const STATIC_PATHS = ["", "/how-it-works", "/about", "/contact", "/faq"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_PATHS.map((p) => ({
    url: `${SITE.url}${p}`,
    priority: p === "" ? 1 : 0.6,
  }));

  // A sitemap entry is a claim that the URL should rank. Advertising a
  // noindex URL sends Google two contradictory signals about the same page.
  const pageEntries = seoPages
    .filter((p) => isIndexable(p.slug))
    .map((p) => ({ url: `${SITE.url}/${p.slug}`, priority: p.priority / 100 }));

  return [...staticEntries, ...pageEntries];
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tests/sitemap.test.ts`
Expected: PASS (2 tests) — with an empty registry the sitemap holds only static paths, which is correct.

- [ ] **Step 5: Write the three ported gates**

`scripts/check-pages.mts` asserts no duplicate slugs or titles, every `parentSlug` and `childSlug` resolves, and prints per-type counts.
`scripts/check-assets.mts` walks every `"/path.ext"` string literal under `src/` and asserts the file exists under `public/`.
`scripts/check-links.mts` asserts every indexable page has at least one inbound internal link, reporting ORPHAN and HUB-ONLY separately.

Each follows the `auditX()` + `main()` + `process.argv[1]?.includes(...)` shape from Tasks 3 and 6, so each is unit-testable.

- [ ] **Step 6: Run the full gate suite**

Run: `npm run check:all`
Expected: every gate prints OK.

- [ ] **Step 7: Commit and push — CI is the build gate**

```bash
git add src/app/sitemap.ts src/app/robots.ts scripts/check-pages.mts \
        scripts/check-assets.mts scripts/check-links.mts tests/sitemap.test.ts
git commit -m "seo: never advertise a URL you told Google to ignore

The sitemap is filtered by the same isIndexable() the meta robots tag
uses, so the two cannot disagree. Sierra's sitemap and canonical logic
drifted apart once and had to be reconciled after the fact.

Ports the page, asset, and link gates. The asset gate earns its keep:
Sierra advertised a logo.png that never existed, sitewide, in three
schema blocks. No build breaks, no error is thrown, and nothing catches
it but a gate that checks the filesystem."
git push -u origin main
```

Then read the GitHub Actions result. **Do not claim the build passes until Actions is green.**

---

## Self-Review

**Spec coverage:**

| Spec section | Covered by |
|---|---|
| §2 Market definition | Task 2 (codegen from committed footprint) |
| §3 Fork strategy | Task 1 (scaffold); `ENGINE-PROVENANCE.md` — **gap, see below** |
| §4 State-hub IA | Task 4 (state layer), Task 7 (routes) |
| §5 Page inventory | Tasks 2, 4, 7 — geography only; other silos are Wave 0B+ |
| §6 State-line silo | **Wave 0B** — content, not foundation |
| §7 Slug policy | Task 2 + Task 3 gate |
| §8 Authoring rules | Task 1 (`trust.ts` empty); prose rules bind in 0B |
| §9 Wave indexation | Task 5 |
| §10 Brand tokens | Task 1 |
| §11 Gates and CI | Tasks 1, 3, 6, 8 |
| §12 Lead pipeline | **Gap — see below** |
| §13 Blockers | Task 1 (`site.ts` placeholders) |

**Two gaps found, both real:**

1. `docs/ENGINE-PROVENANCE.md` (spec §3) has no task. It is a documentation
   artifact produced as files are ported, so it belongs at the end of Task 8.
   **Added to Task 8 Step 7.**
2. The lead pipeline (spec §12) has no task. It is genuinely independent of
   geography and needs its own TDD cycle including the CI smoke test that
   prevents another silent Resend outage. **Deferred to Task 9, written as part
   of Wave 0B's plan rather than crammed here** — the plan stays honest about
   what it covers.

**Placeholder scan:** Task 8 Step 5 describes three gates in prose rather than
showing code. That is below the bar this skill sets. It is acceptable only
because each is a direct port of an existing, working SPB script and the shared
`auditX()` shape is demonstrated fully in Tasks 3 and 6 — but the implementer
should read `sierrapropertybuyers/scripts/check-pages.mjs`,
`check-assets.mjs`, and `check-orphans-all.ts` before writing them.

**Type consistency:** `StateCode` is defined once in the generated
`geography.ts` and imported everywhere. `getPageContent` returns
`PageContent | undefined` and every caller handles `undefined`. `robotsFor`
returns `{ index, follow }`, matching Next's `Metadata["robots"]` object form.
`slugifyPlace` has the same three-parameter signature in the codegen script and
the generated output.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-29-wave-0a-foundation.md`.

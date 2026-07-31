// tests/homepage.test.ts
//
// The real homepage (src/app/page.tsx + src/components/home/*) replaces the
// Wave-0 placeholder. Same honesty rules as tests/static-pages.test.ts, plus
// a check that no href on the homepage points at a route or slug that
// doesn't actually exist -- see scripts/check-hrefs.mts, gate #9.
import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  extractHrefRefs,
  resolveHref,
  buildStaticRoutes,
} from "../scripts/check-hrefs.mts";
import { getAllSeoSlugs } from "@/lib/seo/pageIndex";

const APP_DIR = path.join(process.cwd(), "src/app");
const HOME_COMPONENTS_DIR = path.join(process.cwd(), "src/components/home");
const PAGE_FILE = path.join(APP_DIR, "page.tsx");

function homeComponentFiles(): string[] {
  return readdirSync(HOME_COMPONENTS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => path.join(HOME_COMPONENTS_DIR, f));
}

function allHomepageFiles(): string[] {
  return [PAGE_FILE, ...homeComponentFiles()];
}

function readAll(files: string[]): string {
  return files.map((f) => readFileSync(f, "utf8")).join("\n");
}

describe("homepage exists and is no longer the placeholder", () => {
  it("ships src/app/page.tsx and a src/components/home directory", () => {
    expect(readFileSync(PAGE_FILE, "utf8")).not.toContain("placeholder homepage");
    expect(homeComponentFiles().length).toBeGreaterThan(0);
  });
});

describe("homepage has exactly one h1", () => {
  it("renders a single h1 across page.tsx and its home components", () => {
    const source = readAll(allHomepageFiles());
    const matches = source.match(/<h1[\s>]/g) ?? [];
    expect(matches.length).toBe(1);
  });

  it("the h1 lives in the Hero component, not scattered elsewhere", () => {
    const heroSource = readFileSync(path.join(HOME_COMPONENTS_DIR, "Hero.tsx"), "utf8");
    expect(heroSource).toMatch(/<h1[\s>]/);
  });
});

describe("homepage carries no invented figures or promises", () => {
  const bannedPatterns: { name: string; pattern: RegExp }[] = [
    { name: "day-count timeline promise", pattern: /\b\d+[\s-]*(day|days)\b/i },
    { name: "hour-count timeline promise", pattern: /\b\d+[\s-]*(hour|hours)\b/i },
    { name: "'guaranteed' claim", pattern: /\bguaranteed\b/i },
    { name: "superlative claim", pattern: /\b(best|#1|top-rated|award-winning)\b/i },
    { name: "fabricated review/rating figure", pattern: /\b\d(\.\d)?\s*(star|stars)\b/i },
    {
      name: "fabricated homes-purchased figure",
      pattern: /\b\d[\d,]*\+?\s*(homes|houses|properties)\s+(bought|purchased|sold)/i,
    },
    { name: "fabricated years-in-business figure", pattern: /\b\d+\+?\s*years?\s+(in business|of experience)\b/i },
    { name: "hardcoded phone number", pattern: /\(\d{3}\)\s?\d{3}[\s-]\d{4}/ },
    // Population and county/city counts are real, sourced numbers -- but a
    // dollar figure on this homepage would necessarily be invented, since
    // src/data/trust.ts (the only place a real one could come from) is empty.
    { name: "fabricated dollar figure", pattern: /\$\s?\d/ },
  ];

  for (const { name, pattern } of bannedPatterns) {
    it(`contains no ${name}`, () => {
      const source = readAll(allHomepageFiles());
      expect(pattern.test(source), name).toBe(false);
    });
  }
});

describe("homepage renders no NAP while hasNap() is false", () => {
  it("never references SITE.phone, SITE.address, or SITE.legalEntity", () => {
    const source = readAll(allHomepageFiles());
    expect(source).not.toMatch(/SITE\.(phone|address|legalEntity)\b/);
  });

  it("doesn't import src/data/trust (empty on purpose)", () => {
    const source = readAll(allHomepageFiles());
    expect(source).not.toMatch(/from ["']@\/data\/trust["']/);
  });
});

describe("no 'use client' homepage component imports a src/data module", () => {
  it("holds for every file under src/components/home", () => {
    for (const file of homeComponentFiles()) {
      const source = readFileSync(file, "utf8");
      const isClient = /^["']use client["'];?/.test(source.trim());
      if (isClient) {
        expect(source, path.basename(file)).not.toMatch(/from ["']@\/data\//);
      }
    }
  });

  it("has at least one component reading real geography data server-side (sanity check the rule above can fail)", () => {
    const source = readAll(homeComponentFiles());
    expect(source).toMatch(/from ["']@\/data\/geography["']/);
  });
});

describe("homepage hrefs all resolve to a real route or slug", () => {
  it("every href in page.tsx and src/components/home resolves", () => {
    const routes = buildStaticRoutes(APP_DIR);
    const seoSlugs = new Set(getAllSeoSlugs());
    const refs = allHomepageFiles().flatMap((file) =>
      extractHrefRefs(readFileSync(file, "utf8"), path.relative(process.cwd(), file))
    );
    expect(refs.length).toBeGreaterThan(0);
    const unresolved = refs.filter((r) => !resolveHref(r.href, routes, seoSlugs));
    expect(unresolved, JSON.stringify(unresolved)).toEqual([]);
  });

  it("links to all four required state-line silo pages", () => {
    const source = readAll(allHomepageFiles());
    for (const slug of [
      "/missouri-vs-kansas-foreclosure",
      "/kansas-right-of-redemption",
      "/which-side-of-state-line-road",
      "/homestead-exemption-missouri-vs-kansas",
    ]) {
      expect(source, slug).toContain(slug);
    }
  });
});

describe("the wrong-move section is present", () => {
  it("has a heading telling a seller when selling to us is the wrong move", () => {
    const source = readAll(allHomepageFiles());
    expect(source).toMatch(/When Selling to Us Is the Wrong Move/);
  });

  it("names the Kansas redemption-window case specifically, not just the generic listing trade-off", () => {
    const wrongMoveSource = readFileSync(
      path.join(HOME_COMPONENTS_DIR, "WrongMove.tsx"),
      "utf8"
    );
    expect(wrongMoveSource).toMatch(/redemption/i);
  });
});

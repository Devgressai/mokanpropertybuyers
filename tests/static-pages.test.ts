// tests/static-pages.test.ts
//
// Wave 0B gap: the four static pages (/how-it-works, /about, /contact,
// /faq) and their sitemap wiring. See sitemap.test.ts for the generic
// "every emitted URL resolves to a real route" regression test -- these
// tests are specific to what these four pages must and must not contain.
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import { SITE } from "@/lib/site";
import { FIELD_LIMITS } from "@/lib/leads";
import { validateClientSide } from "@/components/ContactForm";

const APP_DIR = path.join(process.cwd(), "src/app");

const STATIC_PAGE_FILES = [
  "how-it-works/page.tsx",
  "about/page.tsx",
  "contact/page.tsx",
  "faq/page.tsx",
];

describe("static pages exist and are wired into the sitemap", () => {
  it("ships a page.tsx for all four pending paths", () => {
    for (const file of STATIC_PAGE_FILES) {
      expect(existsSync(path.join(APP_DIR, file)), file).toBe(true);
    }
  });

  it("lists the homepage and all four static pages in the sitemap", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain(SITE.url);
    for (const p of ["/how-it-works", "/about", "/contact", "/faq"]) {
      expect(urls, p).toContain(`${SITE.url}${p}`);
    }
  });
});

describe("ContactForm client-side validation mirrors FIELD_LIMITS", () => {
  const base = {
    name: "Jordan Rivers",
    email: "jordan@example.com",
    phone: "8165550142",
    propertyAddress: "123 Main St, Kansas City, MO",
    message: "",
  };

  it("accepts a name exactly at FIELD_LIMITS.name", () => {
    const errors = validateClientSide({ ...base, name: "a".repeat(FIELD_LIMITS.name) });
    expect(errors.name).toBeUndefined();
  });

  it("rejects a name one character past FIELD_LIMITS.name", () => {
    const errors = validateClientSide({ ...base, name: "a".repeat(FIELD_LIMITS.name + 1) });
    expect(errors.name).toBeDefined();
  });

  it("accepts an email exactly at FIELD_LIMITS.email", () => {
    // Build a syntactically valid email of exactly FIELD_LIMITS.email chars.
    const domain = "@example.com";
    const local = "a".repeat(FIELD_LIMITS.email - domain.length);
    const email = `${local}${domain}`;
    expect(email).toHaveLength(FIELD_LIMITS.email);
    const errors = validateClientSide({ ...base, email });
    expect(errors.email).toBeUndefined();
  });

  it("rejects a phone shorter than the server's minimum digit count", () => {
    const errors = validateClientSide({ ...base, phone: "555012" });
    expect(errors.phone).toBeDefined();
  });

  it("rejects a phone longer than FIELD_LIMITS.phone", () => {
    const errors = validateClientSide({ ...base, phone: "1".repeat(FIELD_LIMITS.phone + 1) });
    expect(errors.phone).toBeDefined();
  });

  it("accepts a propertyAddress exactly at FIELD_LIMITS.propertyAddress", () => {
    const errors = validateClientSide({
      ...base,
      propertyAddress: "a".repeat(FIELD_LIMITS.propertyAddress),
    });
    expect(errors.propertyAddress).toBeUndefined();
  });

  it("rejects a propertyAddress one character past FIELD_LIMITS.propertyAddress", () => {
    const errors = validateClientSide({
      ...base,
      propertyAddress: "a".repeat(FIELD_LIMITS.propertyAddress + 1),
    });
    expect(errors.propertyAddress).toBeDefined();
  });

  it("rejects a message one character past FIELD_LIMITS.message", () => {
    const errors = validateClientSide({
      ...base,
      message: "a".repeat(FIELD_LIMITS.message + 1),
    });
    expect(errors.message).toBeDefined();
  });

  it("requires name, email, phone, and propertyAddress", () => {
    const errors = validateClientSide({
      name: "",
      email: "",
      phone: "",
      propertyAddress: "",
      message: "",
    });
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.propertyAddress).toBeDefined();
    // message is optional
  });
});

describe("ContactForm never imports a src/data module", () => {
  it("has no src/data import in its source", () => {
    const source = readFileSync(
      path.join(process.cwd(), "src/components/ContactForm.tsx"),
      "utf8"
    );
    expect(source).not.toMatch(/from ["']@\/data\//);
  });
});

describe("static pages carry no invented content", () => {
  const bannedPatterns: { name: string; pattern: RegExp }[] = [
    // Timeline promises -- "close in 7 days", "within 24 hours", etc.
    { name: "day-count timeline promise", pattern: /\b\d+[\s-]*(day|days)\b/i },
    { name: "hour-count timeline promise", pattern: /\b\d+[\s-]*(hour|hours)\b/i },
    { name: "'guaranteed' claim", pattern: /\bguaranteed\b/i },
    { name: "superlative claim", pattern: /\b(best|#1|top-rated|award-winning)\b/i },
    { name: "fabricated review/rating figure", pattern: /\b\d(\.\d)?\s*(star|stars)\b/i },
    { name: "fabricated homes-purchased figure", pattern: /\b\d[\d,]*\+?\s*(homes|houses|properties)\s+(bought|purchased|sold)/i },
    { name: "fabricated years-in-business figure", pattern: /\b\d+\+?\s*years?\s+(in business|of experience)\b/i },
    // A populated phone number would look like this once SITE.phone lands --
    // it must never be hardcoded into a page ahead of that.
    { name: "hardcoded phone number", pattern: /\(\d{3}\)\s?\d{3}[\s-]\d{4}/ },
  ];

  for (const file of STATIC_PAGE_FILES) {
    it(`${file} contains no banned figures or promises`, () => {
      const source = readFileSync(path.join(APP_DIR, file), "utf8");
      for (const { name, pattern } of bannedPatterns) {
        expect(pattern.test(source), `${file}: matched ${name}`).toBe(false);
      }
    });
  }

  it("about page renders NAP only behind hasNap(), never unconditionally", () => {
    const source = readFileSync(path.join(APP_DIR, "about/page.tsx"), "utf8");
    expect(source).toContain("hasNap()");
    // SITE.phone/SITE.address/SITE.legalEntity may only appear inside the
    // hasNap() branch -- this file has no other reason to reference them.
    expect(source).toMatch(/hasNap\(\)\s*\?[\s\S]*SITE\.phone/);
  });

  it("no static page imports src/data/trust (empty on purpose -- nothing to render yet)", () => {
    for (const file of STATIC_PAGE_FILES) {
      const source = readFileSync(path.join(APP_DIR, file), "utf8");
      expect(source, file).not.toMatch(/from ["']@\/data\/trust["']/);
    }
  });
});

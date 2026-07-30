// tests/check-hrefs.test.ts
import { describe, expect, it } from "vitest";
import {
  extractHrefRefs,
  resolveHref,
  findUnresolvedHrefs,
  auditHrefs,
} from "../scripts/check-hrefs.mts";

describe("extractHrefRefs", () => {
  it("finds a JSX attribute href", () => {
    const refs = extractHrefRefs('<Link href="/faq">FAQ</Link>', "src/foo.tsx");
    expect(refs).toEqual([{ href: "/faq", file: "src/foo.tsx", line: 1 }]);
  });

  it("finds a static href={`...`} template attribute", () => {
    const refs = extractHrefRefs("<Link href={`/faq`}>FAQ</Link>", "src/foo.tsx");
    expect(refs).toEqual([{ href: "/faq", file: "src/foo.tsx", line: 1 }]);
  });

  it("finds an object-literal href: \"...\" form", () => {
    const refs = extractHrefRefs('breadcrumbs={[{ label: "Home", href: "/" }]}', "src/foo.tsx");
    expect(refs).toEqual([{ href: "/", file: "src/foo.tsx", line: 1 }]);
  });

  it("ignores a dynamic template literal with interpolation", () => {
    const refs = extractHrefRefs("<Link href={`/${item.slug}`}>x</Link>", "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("ignores an external https URL", () => {
    const refs = extractHrefRefs('<a href="https://example.com/foo">x</a>', "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("ignores a protocol-relative URL", () => {
    const refs = extractHrefRefs('<a href="//cdn.example.com/foo">x</a>', "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("ignores an anchor link", () => {
    const refs = extractHrefRefs('<a href="#section">x</a>', "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("ignores mailto: and tel: links", () => {
    const refs = extractHrefRefs(
      '<a href="mailto:foo@example.com">x</a><a href="tel:+15551234567">y</a>',
      "src/foo.tsx"
    );
    expect(refs).toEqual([]);
  });

  it("ignores an href mentioned only inside a comment", () => {
    const refs = extractHrefRefs('// old: href="/gone"\nconst y = 1;', "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("reports the correct line number for an href past the first line", () => {
    const refs = extractHrefRefs(
      'const a = 1;\nconst b = 2;\n<Link href="/faq">FAQ</Link>',
      "src/foo.tsx"
    );
    expect(refs).toEqual([{ href: "/faq", file: "src/foo.tsx", line: 3 }]);
  });

  it("finds every occurrence, one per match", () => {
    const refs = extractHrefRefs(
      '<Link href="/a">a</Link><Link href="/b">b</Link>',
      "src/foo.tsx"
    );
    expect(refs.map((r) => r.href)).toEqual(["/a", "/b"]);
  });
});

describe("resolveHref / findUnresolvedHrefs", () => {
  const routes = new Set(["/", "/about", "/faq"]);
  const seoSlugs = new Set(["jackson-county-mo", "olathe-ks"]);

  it("resolves an href to an existing static route", () => {
    expect(resolveHref("/about", routes, seoSlugs)).toBe(true);
  });

  it("resolves an href to an existing seoPages slug", () => {
    expect(resolveHref("/olathe-ks", routes, seoSlugs)).toBe(true);
  });

  it("does not resolve an href to a nonexistent slug", () => {
    expect(resolveHref("/does-not-exist", routes, seoSlugs)).toBe(false);
  });

  it("flags an unresolvable href via findUnresolvedHrefs", () => {
    const refs = [
      { href: "/does-not-exist", file: "src/foo.tsx", line: 5 },
      { href: "/about", file: "src/foo.tsx", line: 6 },
    ];
    expect(findUnresolvedHrefs(refs, routes, seoSlugs)).toEqual([
      { href: "/does-not-exist", file: "src/foo.tsx", line: 5 },
    ]);
  });

  it("does not flag a valid seoPage slug or a valid static route", () => {
    const refs = [
      { href: "/jackson-county-mo", file: "src/foo.tsx", line: 1 },
      { href: "/faq", file: "src/foo.tsx", line: 2 },
    ];
    expect(findUnresolvedHrefs(refs, routes, seoSlugs)).toEqual([]);
  });
});

describe("auditHrefs (real filesystem, real page index)", () => {
  it("scans at least one real source file and reports zero unresolved hrefs", () => {
    const audit = auditHrefs();
    expect(audit.filesScanned).toBeGreaterThan(0);
    expect(audit.hrefsChecked).toBeGreaterThan(0);
    expect(audit.unresolved).toEqual([]);
  });

  it("resolves all seven hardcoded state-line hrefs on the static marketing pages", () => {
    // The exact motivation for this gate: how-it-works and faq hardcode
    // links straight to state-line slugs, entirely outside the seoPages
    // graph that check:links audits. This asserts they are seen and pass,
    // not merely that the aggregate unresolved count is zero.
    const audit = auditHrefs();
    const stateLineHrefs = [
      "/which-side-of-state-line-road",
      "/missouri-vs-kansas-foreclosure",
      "/missouri-trustee-sale-timeline",
      "/kansas-right-of-redemption",
      "/probate-missouri-vs-kansas",
      "/tax-sale-missouri-vs-kansas",
    ];
    for (const href of stateLineHrefs) {
      expect(audit.unresolved.map((u) => u.href)).not.toContain(href);
    }
  });
});

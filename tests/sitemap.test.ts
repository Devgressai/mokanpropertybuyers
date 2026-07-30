// tests/sitemap.test.ts
import { describe, expect, it } from "vitest";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import { isIndexable } from "@/lib/seo/indexation";
import { getAllSeoSlugs } from "@/lib/seo/pageIndex";
import { SITE } from "@/lib/site";

const APP_DIR = path.join(process.cwd(), "src/app");

/**
 * Walks src/app and returns every URL path backed by a real page.tsx/page.ts
 * file, resolved the way Next's App Router resolves it: route groups
 * `(name)` are transparent (they never appear in the URL), and dynamic
 * segments `[slug]` are excluded on purpose — those routes are validated
 * against `seoPages` instead, not against this static-route walk. Root is
 * represented as `""`, matching how `STATIC_PATHS` is written.
 */
function discoverStaticRoutes(dir: string, base = ""): string[] {
  const routes: string[] = [];
  const entries = readdirSync(dir);
  if (entries.includes("page.tsx") || entries.includes("page.ts")) {
    routes.push(base);
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry.startsWith("[")) continue; // dynamic segment — not a static path
    const isRouteGroup = entry.startsWith("(") && entry.endsWith(")");
    const segment = isRouteGroup ? "" : `/${entry}`;
    routes.push(...discoverStaticRoutes(full, `${base}${segment}`));
  }
  return routes;
}

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

  it("always includes the homepage", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls).toContain(SITE.url);
  });

  /**
   * Regression test for the Wave 0A bug: STATIC_PATHS listed four pages
   * (/how-it-works, /about, /contact, /faq) that had no route, so the
   * sitemap advertised 404s to Google. This walks the real filesystem
   * rather than checking a hardcoded list, so it fails automatically the
   * moment a path is added to STATIC_PATHS before its page ships, and
   * passes automatically once the page lands — no one has to remember to
   * update this test either way.
   */
  it("every emitted URL resolves to a real route", () => {
    const staticRoutes = new Set(discoverStaticRoutes(APP_DIR));
    const seoSlugs = new Set(getAllSeoSlugs());

    for (const entry of sitemap()) {
      const urlPath = entry.url.replace(SITE.url, "");
      if (urlPath === "") {
        expect(staticRoutes.has(""), "/").toBe(true);
        continue;
      }
      const slug = urlPath.slice(1);
      const backedBySeoPage = seoSlugs.has(slug);
      const backedByStaticRoute = staticRoutes.has(urlPath);
      expect(backedBySeoPage || backedByStaticRoute, urlPath).toBe(true);
    }
  });
});

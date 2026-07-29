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

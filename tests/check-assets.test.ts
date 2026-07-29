// tests/check-assets.test.ts
import { describe, expect, it } from "vitest";
import { extractAssetRefs, findMissingAssets, auditAssets } from "../scripts/check-assets.mts";

describe("extractAssetRefs", () => {
  it("finds a quoted absolute path with an image extension", () => {
    const refs = extractAssetRefs('const logo = "/images/logo.png";', "src/foo.tsx");
    expect(refs).toEqual([{ path: "/images/logo.png", file: "src/foo.tsx" }]);
  });

  it("ignores an external https URL", () => {
    const refs = extractAssetRefs('const x = "https://example.com/foo.png";', "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("ignores a protocol-relative URL", () => {
    const refs = extractAssetRefs('const x = "//cdn.example.com/foo.png";', "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("ignores a path referenced only inside a line comment", () => {
    const refs = extractAssetRefs('// old: "/images/unused.png"\nconst y = 1;', "src/foo.tsx");
    expect(refs).toEqual([]);
  });

  it("finds every occurrence, one per match", () => {
    const refs = extractAssetRefs(
      'const a = "/a.svg"; const b = "/b.svg";',
      "src/foo.tsx"
    );
    expect(refs.map((r) => r.path)).toEqual(["/a.svg", "/b.svg"]);
  });
});

describe("findMissingAssets", () => {
  it("reports an asset path that does not exist on disk", () => {
    const missing = findMissingAssets(
      [{ path: "/logo.png", file: "src/schema.ts" }],
      () => false
    );
    expect(missing).toEqual([{ path: "/logo.png", files: ["src/schema.ts"] }]);
  });

  it("does not report an asset path that exists on disk", () => {
    const missing = findMissingAssets(
      [{ path: "/logo.png", file: "src/schema.ts" }],
      () => true
    );
    expect(missing).toEqual([]);
  });

  it("groups multiple referencing files under one missing path", () => {
    const missing = findMissingAssets(
      [
        { path: "/logo.png", file: "src/a.ts" },
        { path: "/logo.png", file: "src/b.ts" },
      ],
      () => false
    );
    expect(missing).toEqual([{ path: "/logo.png", files: ["src/a.ts", "src/b.ts"] }]);
  });
});

describe("auditAssets (real filesystem)", () => {
  it("scans at least one real source file and reports zero missing assets", () => {
    const audit = auditAssets();
    expect(audit.scanned).toBeGreaterThan(0);
    expect(audit.missing).toEqual([]);
  });
});

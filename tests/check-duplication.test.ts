// tests/check-duplication.test.ts
import { describe, expect, it } from "vitest";
import {
  normalizeText,
  pageText,
  findDuplicatePairs,
  longestCommonSubstring,
  isAllowlisted,
  auditDuplication,
} from "../scripts/check-duplication.mts";
import { duplicationAllowlist } from "../src/data/duplication-allowlist.js";

describe("normalizeText", () => {
  it("collapses runs of whitespace to a single space", () => {
    expect(normalizeText("a   b\n\nc\td")).toBe("a b c d");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeText("  a b  ")).toBe("a b");
  });
});

describe("pageText", () => {
  it("joins body paragraphs with a space and normalizes the result", () => {
    expect(pageText(["one  two", "three"])).toBe("one two three");
  });
});

describe("longestCommonSubstring", () => {
  it("finds the longest run shared by two strings", () => {
    expect(longestCommonSubstring("the quick brown fox", "a quick brown dog")).toBe(
      " quick brown "
    );
  });

  it("returns an empty string when nothing is shared", () => {
    expect(longestCommonSubstring("abc", "xyz")).toBe("");
  });

  it("returns an empty string for an empty input", () => {
    expect(longestCommonSubstring("", "abc")).toBe("");
    expect(longestCommonSubstring("abc", "")).toBe("");
  });
});

describe("findDuplicatePairs", () => {
  // A planted 160-character passage -- the exact threshold this gate uses.
  const shared160 = "x".repeat(160);
  // A planted 100-character passage -- below threshold, must never be reported.
  const shared100 = "y".repeat(100);

  it("reports two pages that share a full 160-character window", () => {
    const pairs = findDuplicatePairs([
      { slug: "page-a", text: `intro ${shared160} outro-a` },
      { slug: "page-b", text: `different start ${shared160} outro-b` },
    ]);
    expect(pairs).toHaveLength(1);
    expect(pairs[0].pageA).toBe("page-a");
    expect(pairs[0].pageB).toBe("page-b");
    expect(pairs[0].sharedWindows).toBeGreaterThan(0);
    expect(pairs[0].longestPassage).toContain(shared160);
  });

  it("does not report two pages that share only 100 characters", () => {
    const pairs = findDuplicatePairs([
      { slug: "page-a", text: `intro ${shared100} outro-a` },
      { slug: "page-b", text: `different start ${shared100} outro-b` },
    ]);
    expect(pairs).toEqual([]);
  });

  it("does not report a page against itself or unrelated pages", () => {
    const pairs = findDuplicatePairs([
      { slug: "page-a", text: "entirely unique content about foreclosure timelines" },
      { slug: "page-b", text: "completely different content about probate procedure" },
    ]);
    expect(pairs).toEqual([]);
  });

  it("counts one shared window per pair even when three pages all share the same passage", () => {
    const pairs = findDuplicatePairs([
      { slug: "page-a", text: shared160 },
      { slug: "page-b", text: shared160 },
      { slug: "page-c", text: shared160 },
    ]);
    // C(3,2) = 3 pairs, each sharing the same single 160-char window.
    expect(pairs).toHaveLength(3);
    for (const p of pairs) expect(p.sharedWindows).toBe(1);
  });

  it("reports more shared windows for a longer shared passage", () => {
    // A repeated character (e.g. "z".repeat(200)) would collapse every
    // 160-char window into the same string, undercounting -- this needs an
    // aperiodic passage so each of the 41 possible offsets is a genuinely
    // distinct window.
    const aperiodic200 = Array.from({ length: 200 }, (_, i) =>
      String.fromCharCode(33 + ((i * 7919) % 89))
    ).join("");
    const pairs = findDuplicatePairs([
      { slug: "page-a", text: aperiodic200 },
      { slug: "page-b", text: aperiodic200 },
    ]);
    // 200 - 160 + 1 = 41 distinct overlapping 160-char windows.
    expect(pairs[0].sharedWindows).toBe(41);
  });

  it("is exhaustive: catches a shared passage regardless of its offset", () => {
    // A stride-N sampled check only tests offsets that are multiples of N;
    // this shared passage is deliberately placed at an odd, non-round
    // offset (7) to prove the detector checks every offset, not a sample.
    const pairs = findDuplicatePairs([
      { slug: "page-a", text: "a".repeat(7) + shared160 + "b".repeat(3) },
      { slug: "page-b", text: "c".repeat(11) + shared160 + "d".repeat(5) },
    ]);
    expect(pairs).toHaveLength(1);
  });
});

describe("isAllowlisted", () => {
  const allowlist = [{ pageA: "foo", pageB: "bar", reason: "test reason" }];

  it("matches a pair in the given order", () => {
    expect(isAllowlisted("foo", "bar", allowlist)?.reason).toBe("test reason");
  });

  it("matches a pair in reverse order -- allowlisting is not order-dependent", () => {
    expect(isAllowlisted("bar", "foo", allowlist)?.reason).toBe("test reason");
  });

  it("does not match an unrelated pair", () => {
    expect(isAllowlisted("foo", "baz", allowlist)).toBeUndefined();
  });
});

describe("auditDuplication (real content registry)", () => {
  it("finds zero unallowlisted colliding pairs in the real corpus", () => {
    const audit = auditDuplication();
    expect(audit.pagesCompared).toBeGreaterThan(0);
    expect(audit.pairsFailing).toEqual([]);
  });

  it("every pair the real corpus does find is covered by the real allowlist", () => {
    const audit = auditDuplication();
    expect(audit.pairsAllowlisted).toBe(audit.pairsFound);
  });
});

describe("the real allowlist", () => {
  it("gives every entry a non-empty, specific reason", () => {
    for (const entry of duplicationAllowlist) {
      expect(entry.reason.length).toBeGreaterThan(20);
    }
  });
});

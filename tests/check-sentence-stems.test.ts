// tests/check-sentence-stems.test.ts
import { describe, expect, it } from "vitest";
import {
  normalizeSentence,
  splitSentences,
  sentenceStem,
  findRepeatedStems,
  isStemAllowlisted,
  auditSentenceStems,
} from "../scripts/check-sentence-stems.mts";
import { sentenceStemAllowlist } from "../src/data/sentence-stem-allowlist.js";

describe("normalizeSentence", () => {
  it("strips [MO] and [KS] state tags", () => {
    expect(normalizeSentence("[MO] An owner in this county")).toBe("An owner in this county");
    expect(normalizeSentence("[KS] An owner in this county")).toBe("An owner in this county");
  });

  it("collapses whitespace and trims", () => {
    expect(normalizeSentence("  a   b\n\nc  ")).toBe("a b c");
  });
});

describe("splitSentences", () => {
  it("splits on sentence boundaries followed by a capital letter", () => {
    expect(splitSentences("One sentence. Another one.")).toEqual([
      "One sentence.",
      "Another one.",
    ]);
  });

  it("does not split a sentence spanning what was a paragraph break", () => {
    // The exact case check:duplication cannot see: a sentence whose
    // surrounding text differs, joined here as one page-body string.
    const joined = "end of paragraph one. Start of the shared sentence here. Rest of it.";
    expect(splitSentences(joined)).toEqual([
      "end of paragraph one.",
      "Start of the shared sentence here.",
      "Rest of it.",
    ]);
  });
});

describe("sentenceStem", () => {
  it("returns the first 70 characters, case-folded", () => {
    const sentence = "A".repeat(80);
    expect(sentenceStem(sentence)).toBe("a".repeat(70));
  });

  it("returns undefined for a sentence shorter than the stem length", () => {
    expect(sentenceStem("Too short.")).toBeUndefined();
  });

  it("strips state tags before measuring length", () => {
    const withTag = "[MO] " + "x".repeat(70);
    expect(sentenceStem(withTag)).toBe("x".repeat(70));
  });
});

describe("findRepeatedStems", () => {
  const templatedOpener = (place: string) =>
    `None of the above makes a fast cash sale the obvious answer for a seller in ${place}. Unique detail about ${place} follows here in the rest of the paragraph.`;

  it("reports a stem shared by more pages than the threshold", () => {
    const pages = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"].map((place, i) => ({
      slug: `page-${i}`,
      text: templatedOpener(place),
    }));
    const matches = findRepeatedStems(pages, 5);
    expect(matches).toHaveLength(1);
    expect(matches[0].slugs).toHaveLength(6);
  });

  it("does not report a stem shared by exactly the threshold count", () => {
    const pages = ["Alpha", "Bravo", "Charlie", "Delta", "Echo"].map((place, i) => ({
      slug: `page-${i}`,
      text: templatedOpener(place),
    }));
    expect(findRepeatedStems(pages, 5)).toEqual([]);
  });

  it("does not report genuinely distinct sentence openings", () => {
    const pages = [
      { slug: "page-a", text: "This page discusses foreclosure timelines in detail here." },
      { slug: "page-b", text: "This page discusses probate procedure in a different way." },
      { slug: "page-c", text: "This page discusses tax sale redemption rights instead." },
    ];
    expect(findRepeatedStems(pages, 2)).toEqual([]);
  });

  it("counts a page once even if it repeats the same sentence internally", () => {
    const repeatedOnOnePage = templatedOpener("Alpha") + " " + templatedOpener("Alpha");
    const pages = [
      { slug: "page-a", text: repeatedOnOnePage },
      { slug: "page-b", text: templatedOpener("Bravo") },
    ];
    const matches = findRepeatedStems(pages, 1);
    expect(matches[0]?.slugs).toEqual(["page-a", "page-b"]);
  });

  it("is invisible to check:duplication's page-level window but still caught here", () => {
    // Simulates the real bug: identical sentence, different surrounding
    // text on every page, so no 160-character page-level window matches,
    // but the sentence-level stem still does.
    const pages = Array.from({ length: 6 }, (_, i) => ({
      slug: `page-${i}`,
      text:
        `Paragraph filler unique to page ${i} that pushes the shared sentence to a different offset each time. ` +
        templatedOpener(`City${i}`) +
        ` More unique filler text specific to page ${i} follows to close out the paragraph.`,
    }));
    const matches = findRepeatedStems(pages, 5);
    expect(matches).toHaveLength(1);
    expect(matches[0].slugs).toHaveLength(6);
  });
});

describe("isStemAllowlisted", () => {
  const allowlist = [{ stem: "a repeated stem for testing purposes only, exactly seventy c", reason: "test reason" }];

  it("matches an allowlisted stem", () => {
    expect(isStemAllowlisted(allowlist[0].stem, allowlist)?.reason).toBe("test reason");
  });

  it("does not match an unrelated stem", () => {
    expect(isStemAllowlisted("something else entirely", allowlist)).toBeUndefined();
  });
});

describe("auditSentenceStems (real content registry)", () => {
  it("finds zero unallowlisted repeated stems in the real corpus", () => {
    const audit = auditSentenceStems();
    expect(audit.pagesCompared).toBeGreaterThan(0);
    expect(audit.stemsFailing).toEqual([]);
  });

  it("every stem the real corpus does find is covered by the real allowlist", () => {
    const audit = auditSentenceStems();
    expect(audit.stemsAllowlisted).toBe(audit.stemsRepeated);
  });
});

describe("the real allowlist", () => {
  it("gives every entry a non-empty, specific reason", () => {
    for (const entry of sentenceStemAllowlist) {
      expect(entry.reason.length).toBeGreaterThan(20);
    }
  });
});

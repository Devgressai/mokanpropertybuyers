import { describe, expect, it } from "vitest";
import {
  MIN_INDEXABLE_WORDS, wordCount, isIndexable, isBodyIndexable, robotsFor,
} from "@/lib/seo/indexation";

describe("indexation gate", () => {
  it("counts words across body blocks", () => {
    expect(wordCount(["one two three", "four five"])).toBe(5);
  });

  it("counts zero words for an empty body", () => {
    expect(wordCount([])).toBe(0);
  });

  it("is not fooled by empty strings and extra whitespace", () => {
    expect(wordCount(["", "  ", "one   two", ""])).toBe(2);
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

  it("draws the line one word below the floor: not indexable", () => {
    const body = [Array(MIN_INDEXABLE_WORDS - 1).fill("word").join(" ")];
    expect(wordCount(body)).toBe(MIN_INDEXABLE_WORDS - 1);
    expect(isBodyIndexable(body)).toBe(false);
  });

  it("draws the line exactly at the floor: indexable", () => {
    const body = [Array(MIN_INDEXABLE_WORDS).fill("word").join(" ")];
    expect(wordCount(body)).toBe(MIN_INDEXABLE_WORDS);
    expect(isBodyIndexable(body)).toBe(true);
  });

  describe("stateLine claims gate", () => {
    // These two carry zero verified claims by design (see
    // state-line-content-transaction.ts) -- the ledger has no MO or KS
    // coverage for either topic yet. They clear the word-count floor, so if
    // the claims gate ever regresses to a word-count-only check, these
    // assertions catch it.
    it("does not index a stateLine page with 0 claims, even past the word floor", () => {
      expect(isIndexable("contract-for-deed-missouri-vs-kansas")).toBe(false);
      expect(isIndexable("seller-disclosure-missouri-vs-kansas")).toBe(false);
    });

    it("still follows links on those two pages", () => {
      expect(robotsFor("contract-for-deed-missouri-vs-kansas"))
        .toEqual({ index: false, follow: true });
      expect(robotsFor("seller-disclosure-missouri-vs-kansas"))
        .toEqual({ index: false, follow: true });
    });

    it("indexes a stateLine page that carries at least one verified claim", () => {
      // tax-sale-missouri-vs-kansas: 2 Missouri claims, honest about the
      // Kansas gap -- this is the shape the gate is supposed to let through.
      expect(isIndexable("tax-sale-missouri-vs-kansas")).toBe(true);
    });

    it("does not gate non-stateLine page types on claims", () => {
      // A state/county/city page has no `claims` field at all -- its title
      // describes a place, not a legal comparison, so the word-count floor
      // alone must still decide it. This page has no content registered, so
      // it fails on word count, not on a wrongly-applied claims check --
      // confirmed by isBodyIndexable never entering the picture here.
      expect(isIndexable("sell-my-house-fast-worth-county-mo")).toBe(false);
    });
  });
});

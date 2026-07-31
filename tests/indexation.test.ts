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
    // NOTE: as of Wave 0C, every stateLine page in the registry carries at
    // least one claim, so there is currently no live content example of the
    // "0 claims, past the word floor, stays noindex" branch of
    // isTopicallyIndexable() in src/lib/seo/indexation.ts. That branch is
    // still real code, exercised the moment a future stateLine page ships
    // without a verified claim -- it is just not under test against live
    // content right now. Don't read the absence of that example as the rule
    // having been relaxed.
    //
    // contract-for-deed and seller-disclosure used to carry zero verified
    // claims (see state-line-content-transaction.ts's history) -- the ledger
    // had no MO or KS coverage for either topic. Wave 0C closed that gap, so
    // both now carry real claims and index. The assertions below confirm the
    // gate lets them through now that they qualify, and still exercises the
    // "index + follow" shape a passing stateLine page gets.
    it("indexes contract-for-deed and seller-disclosure now that each carries a verified claim", () => {
      expect(isIndexable("contract-for-deed-missouri-vs-kansas")).toBe(true);
      expect(isIndexable("seller-disclosure-missouri-vs-kansas")).toBe(true);
    });

    it("indexes and follows links on those two pages", () => {
      expect(robotsFor("contract-for-deed-missouri-vs-kansas"))
        .toEqual({ index: true, follow: true });
      expect(robotsFor("seller-disclosure-missouri-vs-kansas"))
        .toEqual({ index: true, follow: true });
    });

    it("indexes a stateLine page that carries at least one verified claim", () => {
      // tax-sale-missouri-vs-kansas: Missouri and Kansas claims alike now --
      // this is the shape the gate is supposed to let through.
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

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
});

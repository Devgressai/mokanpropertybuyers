// src/data/duplication-allowlist.ts
//
// Explicit exceptions to `check:duplication`. Some duplication across pages
// is correct, not a defect: two pages quoting the same statute verbatim are
// citing a shared external source, not scaling one piece of content into
// two. Paraphrasing Mo. Const. Art. X Section 25 on one of the two pages
// that discuss it, purely to make a text-similarity checker pass, would
// make the page *less* accurate, not more original. This file is the one
// place that trade-off gets made explicitly, with a written reason per pair
// -- see docs/DUPLICATION-POLICY.md for the full policy this file
// implements and the reasoning behind each entry below.
//
// Anything not listed here that check:duplication finds is a real failure:
// go rewrite the boilerplate, don't add an entry to make the check quiet.

export interface AllowlistEntry {
  /** Content-registry slug. Order does not matter -- checked both ways. */
  pageA: string;
  pageB: string;
  /** Why this specific pair is allowed to share text, not a general policy statement. */
  reason: string;
}

export const duplicationAllowlist: AllowlistEntry[] = [
  {
    pageA: "sell-my-house-fast-missouri",
    pageB: "transfer-tax-missouri-vs-kansas",
    reason:
      "Both pages state Missouri's constitutional transfer-tax ban -- Article X, Section 25, adopted by voters in 2010 -- in the same operative language, because that language is what the constitutional provision actually says. The state hub summarizes the same ban the state-line page covers in depth; paraphrasing a constitutional citation to reduce text similarity would make one of the two pages less accurate, not more original. See docs/DUPLICATION-POLICY.md.",
  },
  {
    pageA: "sell-my-house-fast-missouri",
    pageB: "tax-sale-missouri-vs-kansas",
    reason:
      "Both pages restate RSMo 140.340's tax-sale redemption right (one year, no bond or notice condition) in matching operative language, because that is the operative language of the statute. One shared 160-character window; below the threshold this ledger otherwise treats as boilerplate. See docs/DUPLICATION-POLICY.md.",
  },
];

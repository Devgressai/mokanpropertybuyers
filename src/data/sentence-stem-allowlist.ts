// src/data/sentence-stem-allowlist.ts
//
// Explicit exceptions to `check:sentence-stems`. Some repeated sentence
// openings are correct, not a defect: several pages that describe the same
// Kansas statute -- K.S.A. 60-2415's sale-confirmation requirement, K.S.A.
// 60-2301's uncapped homestead exemption -- naturally open that sentence
// the same way, because restating a statute's own operative language *is*
// the accurate way to cite it. Paraphrasing the opening of a citation
// sentence purely to make a stem-similarity checker pass would make the
// page less accurate, not more original. This file is the one place that
// trade-off gets made explicitly, with a written reason per stem -- see
// `docs/SENTENCE-STEM-POLICY.md` for the full policy and the threshold this
// gate uses.
//
// Anything not listed here that check:sentence-stems finds is a real
// failure: go vary the sentence, don't add an entry to make the check quiet.

export interface StemAllowlistEntry {
  /** The exact 70-character stem (state tags stripped, whitespace collapsed, case-folded) this entry excuses. */
  stem: string;
  /** Why this specific stem is allowed to repeat, not a general policy statement. */
  reason: string;
}

export const sentenceStemAllowlist: StemAllowlistEntry[] = [];

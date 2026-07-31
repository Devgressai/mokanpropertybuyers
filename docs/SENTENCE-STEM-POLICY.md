# Sentence Stem Policy

The gate is `scripts/check-sentence-stems.mts` (`npm run check:sentence-stems`).
It closes a gap `check:duplication` cannot see. That gate is exhaustive at
the *page* level -- a shared 160-character passage is caught no matter where
it lands -- but it compares whole normalized page bodies, so a single
repeated *sentence* surrounded by different text on every page can slip
through: the different neighbouring text on each side keeps any 160-character
window from lining up between two pages, even though the sentence itself is
identical (give or take a city or county name).

## The failure that motivated this gate (2026-07-30/31)

A corpus-wide sentence-stem audit found 49 of this corpus's 116 pages opened
the "when NOT to sell to us" honesty section with one of two near-identical
sentences:

| Stem (first 70 characters) | Pages |
|---|---:|
| "none of the above makes a fast cash sale the **obvious** answer for a sell…" | 33 |
| "none of the above makes a fast cash sale the **default** answer for a sell…" | 10 |
| "none of the above is legal advice, and a small-county foreclosure noti…" | 6 |

This mattered more here than an ordinary repeated phrase would, because the
honesty section is the site's credibility feature -- the page telling a
seller when a fast cash sale is the wrong move for them. Forty-nine pages
saying that in the same words reads as a disclaimer template, not as advice
actually written for that seller. All 49 openers were rewritten with a
genuinely different opening thought (who it applies to, the alternative that
usually wins, the condition that flips the answer, or a specific local
market fact), and this gate was built so the same failure mode -- a
sentence, not a passage, templated across many pages -- gets caught going
forward instead of requiring another manual audit to find.

## How the gate works

1. Join each page's body paragraphs (like `check-duplication.mts`'s
   `pageText`, so a sentence spanning a paragraph break is never missed) and
   split the result into sentences.
2. Strip the `[MO]`/`[KS]` state tags, collapse whitespace, and case-fold.
3. Take the first 70 characters of each sentence as its "stem". 70 was
   chosen because it is exactly wide enough to require several words of real
   sentence structure to coincide -- short enough that the county or city
   name (which is what actually varied on the 49 offending pages) usually
   falls *after* the stem rather than fragmenting it into apparently
   "different" stems, long enough that ordinary short, generic openings
   ("An owner with real equity...") don't false-positive against each other
   by coincidence.
4. Group every sentence in the corpus by stem. A stem shared by more than 5
   distinct pages fails, unless it is allowlisted.

## Why the threshold is 5

Some sentence-opening repetition is legitimate. Several pages describe the
same Kansas statute -- K.S.A. 60-2415's sale-confirmation requirement,
K.S.A. 60-2301's uncapped homestead exemption -- in matching technical
language, because restating a statute's own operative language *is* the
accurate way to cite it (the same judgment call `check:duplication` makes
for page-level passages; see `docs/DUPLICATION-POLICY.md`). In the corpus as
it stands, the widest legitimate citation cluster is 5 pages. No single
statute or fixed legal test is ever described identically by more than 5
pages. A stem appearing on 6 or more pages therefore has no citation-based
explanation available to it -- 6 is the first count that can only be
explained as an unedited template. The three stems this gate was built to
catch (33, 10, and 6 pages) all clear that line comfortably; the genuine
citation clusters (5 pages each) sit comfortably under it.

## Extending the allowlist

Add an entry to `sentenceStemAllowlist` in
`src/data/sentence-stem-allowlist.ts` only when the repeated stem opens a
sentence citing a statute, constitutional provision, or fixed legal test --
not when it is merely a convenient phrase. Give every entry a specific,
falsifiable reason naming the source being cited. If a future sweep finds a
new failing stem, ask the same question the duplication policy asks: is
this a citation, or is this boilerplate that should be rewritten instead?

# Duplication Policy

The gate is `scripts/check-duplication.mts` (`npm run check:duplication`). It
compares every page in the content registry against every other page, on
normalized (whitespace-collapsed) text, using an exhaustive, stride-1
160-character sliding window -- no sampling. See the file header comment for
why stride 1 is mandatory: a coarser stride is a sample, not a proof, and a
160-character match whose alignment doesn't land on a sampled offset is
simply invisible to it. That is exactly how this exact defect went
undetected three separate times before this gate existed -- a stride-20 ad
hoc check found 0 colliding pairs, a stride-15 check found 3, and only an
exhaustive stride-1 sweep found the real number, 8.

## Why an allowlist exists at all

Not all duplication is a defect. Two pages that both quote the same statute,
the same constitutional provision, or the same fixed enumeration are citing
a shared external source correctly -- rewording either one to reduce text
similarity would make that page *less* accurate, not more original. The
allowlist in `src/data/duplication-allowlist.ts` is the one place that
judgment call gets made, explicitly, with a written reason per pair.
Anything the gate finds that is not on the allowlist is treated as a real
failure: the fix is to rewrite the boilerplate, not to add an entry.

## The exhaustive sweep run at wave close (2026-07-30)

Against the 36-page corpus at the time this gate was built, the exhaustive
sweep found exactly 8 colliding page pairs. Each pair's shared text turned
out to be a single contiguous passage (the reported `sharedWindows` count for
every pair below equals `passageLength - 159`, confirming there was no second,
separate collision hiding in the same pair). Two were judged genuine
citation overlap and allowlisted; six were boilerplate and rewritten.

| Pair | Shared windows | Disposition |
|---|---|---|
| `sell-my-house-fast-missouri` <-> `transfer-tax-missouri-vs-kansas` | 81 | **Allowlisted** -- both state the Missouri constitutional transfer-tax ban (Art. X, Section 25) in its own operative language. |
| `sell-my-house-fast-missouri` <-> `tax-sale-missouri-vs-kansas` | 1 | **Allowlisted** -- both restate RSMo 140.340's one-year tax-sale redemption right in its own operative language. |
| `missouri-vs-kansas-foreclosure` <-> `sell-my-house-fast-kansas` | 90 | Rewritten -- the Kansas hub had copied the foreclosure silo's explanation of the K.S.A. 60-2414 one-third-leverage test almost verbatim. Shortened and restructured on the hub. |
| `property-tax-assessment-missouri-vs-kansas` <-> `sell-my-house-fast-kansas` | 62 | Rewritten -- same hub-copies-silo pattern, for the 11.5% Kansas assessment ratio. |
| `sell-my-house-fast-kansas` <-> `transfer-tax-missouri-vs-kansas` | 62 | Rewritten -- same pattern, for the Kansas mortgage-registration-tax repeal. |
| `homestead-exemption-missouri-vs-kansas` <-> `sell-my-house-fast-kansas` | 22 | Rewritten -- same pattern, for the Kansas homestead-by-category enumeration (160 acres / 1 acre in town / manufactured home). |
| `sell-my-house-fast-cass-county-mo` <-> `sell-my-house-fast-clay-county-mo` | 36 | Rewritten -- two sibling Missouri counties with no statutory reason to share this much text; the trustee's-sale mechanics sentence on the Clay County page was restructured. |
| `sell-my-house-fast-cass-county-mo` <-> `sell-my-house-fast-st-joseph-mo` | 12 | Rewritten -- a shared closing-disclaimer sentence; reworded on the St. Joseph page. |

### Why the four Kansas-hub pairs share a pattern

`sell-my-house-fast-kansas` is the state hub; each of the other four pages
in that group is the deep-dive silo page for the same topic. A hub
summarizing a topic its own silo page covers in depth will always touch the
same statute -- that's expected and correct. What was *not* correct was the
hub reproducing the silo's own explanatory sentences almost word for word
instead of summarizing them. Each of the four fixes shortens and
restructures the hub's paragraph while keeping every fact, every `[KS]` tag,
and every citation intact; the silo pages were left untouched since they are
the pages meant to carry the full depth.

## Extending the allowlist

Add an entry to `duplicationAllowlist` in
`src/data/duplication-allowlist.ts` only when a pair's shared text is a
genuine citation -- statutory, constitutional, or a fixed enumerated legal
test -- not when it is merely convenient. Give every entry a specific,
falsifiable reason naming the source being cited, not a generic "these are
similar." If a future sweep finds a new failing pair, judge it on the same
two questions this pass used: is this a citation, or is this boilerplate
that should be rewritten instead?

// scripts/check-state-claims.mts
//
// Gate: the law genuinely differs between Missouri and Kansas — foreclosure
// procedure, redemption, homestead limits, transfer taxes all diverge at the
// state line. A paragraph that names both states, asserts law, and carries
// no per-state label is wrong no matter which half it got right, and it is
// the single most likely way this site misleads someone at the worst
// possible moment. This gate flags exactly that paragraph shape.
import type { LegalClaim } from "../src/types/legal.js";
import { allContentSlugs, getPageContent } from "../src/data/content-registry.js";

/** Words that mark a sentence as asserting law rather than describing a place. */
const LEGAL_MARKERS = /\b(foreclos\w*|redemption|probate|homestead|statute|lien|deed of trust|judicial|trustee sale|disclosure|exemption|assessment ratio|transfer tax)\b/i;

const MO = /\bMissouri\b/;
const KS = /\bKansas\b(?!\s+City)/; // "Kansas City" is a place, not the state
const LABEL = /\[(MO|KS)\]/;

/**
 * A paragraph that names both states AND asserts law AND carries no per-state
 * label is the exact failure this site must not ship: one rule presented as
 * covering both sides of a line where the rules genuinely differ.
 */
export function findUnlabeledBlends(body: string[]): string[] {
  return body.filter(
    (p) => MO.test(p) && KS.test(p) && LEGAL_MARKERS.test(p) && !LABEL.test(p)
  );
}

export function claimIsCited(claim: LegalClaim): boolean {
  return claim.citation.trim().length > 0;
}

export interface ClaimAudit {
  total: number;
  unlabeledBlends: string[];
}

export function auditClaims(): ClaimAudit {
  const blends: string[] = [];
  let total = 0;
  for (const slug of allContentSlugs()) {
    const content = getPageContent(slug);
    if (!content) continue;
    total += content.body.length;
    for (const p of findUnlabeledBlends(content.body)) {
      blends.push(`${slug}: ${p.slice(0, 120)}…`);
    }
  }
  return { total, unlabeledBlends: blends };
}

function main(): void {
  const { total, unlabeledBlends } = auditClaims();
  if (unlabeledBlends.length) {
    for (const b of unlabeledBlends) console.error(`UNLABELED BLEND  ${b}`);
    console.error(`\ncheck:state-claims FAILED — ${unlabeledBlends.length} blended paragraphs`);
    process.exit(1);
  }
  console.log(`check:state-claims OK — ${total} paragraphs, 0 unlabeled MO/KS blends`);
}

if (process.argv[1]?.includes("check-state-claims")) main();

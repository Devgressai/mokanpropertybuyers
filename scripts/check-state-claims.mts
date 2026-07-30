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

/**
 * Every claim must carry a citation AND a verification date. An uncited claim
 * typechecks — `citation: ""` satisfies `citation: string` — so the type alone
 * never enforced this. Wave 0A shipped `claimIsCited` uncalled; this is the
 * call site.
 */
export function auditClaimList(slug: string, claims: LegalClaim[]): string[] {
  const problems: string[] = [];
  for (const c of claims) {
    if (!claimIsCited(c)) {
      problems.push(`${slug}: uncited [${c.state}] "${c.claim.slice(0, 80)}"`);
    } else if (c.verifiedOn.trim() === "") {
      problems.push(`${slug}: unverified [${c.state}] "${c.claim.slice(0, 80)}"`);
    }
    // A pendingChange asserts a future rule; if it carries no citation of its
    // own, that assertion is exactly as uncited as the current claim would be
    // without one — the enacting instrument is what makes it verifiable.
    if (c.pendingChange && c.pendingChange.citation.trim() === "") {
      problems.push(
        `${slug}: pendingChange uncited [${c.state}] "${c.pendingChange.claim.slice(0, 80)}"`
      );
    }
    // "proposed" means the change has not been enacted -- it may never
    // happen (a ballot measure can fail, a bill can die in committee). That
    // is a materially weaker claim than "enacted," and a reader needs to
    // know what still has to occur, or the page reads as certain when it
    // is only possible.
    if (c.pendingChange?.status === "proposed" && !c.pendingChange.contingency?.trim()) {
      problems.push(
        `${slug}: proposed pendingChange missing contingency [${c.state}] "${c.pendingChange.claim.slice(0, 80)}"`
      );
    }
  }
  return problems;
}

export interface ClaimAudit {
  total: number;
  claimCount: number;
  unlabeledBlends: string[];
  missingCitation: string[];
}

export function auditClaims(): ClaimAudit {
  const blends: string[] = [];
  const missingCitation: string[] = [];
  let total = 0;
  let claimCount = 0;
  for (const slug of allContentSlugs()) {
    const content = getPageContent(slug);
    if (!content) continue;
    total += content.body.length;
    for (const p of findUnlabeledBlends(content.body)) {
      blends.push(`${slug}: ${p.slice(0, 120)}…`);
    }
    const claims = content.claims ?? [];
    claimCount += claims.length;
    missingCitation.push(...auditClaimList(slug, claims));
  }
  return { total, claimCount, unlabeledBlends: blends, missingCitation };
}

function main(): void {
  const { total, claimCount, unlabeledBlends, missingCitation } = auditClaims();
  if (unlabeledBlends.length) {
    for (const b of unlabeledBlends) console.error(`UNLABELED BLEND  ${b}`);
  }
  if (missingCitation.length) {
    for (const m of missingCitation) console.error(`MISSING CITATION  ${m}`);
  }
  if (unlabeledBlends.length || missingCitation.length) {
    console.error(
      `\ncheck:state-claims FAILED — ${unlabeledBlends.length} blended paragraphs, ${missingCitation.length} uncited claims`
    );
    process.exit(1);
  }
  console.log(
    `check:state-claims OK — ${total} paragraphs, ${claimCount} claims, ${unlabeledBlends.length} unlabeled MO/KS blends, ${missingCitation.length} uncited claims`
  );
}

if (process.argv[1]?.includes("check-state-claims")) main();

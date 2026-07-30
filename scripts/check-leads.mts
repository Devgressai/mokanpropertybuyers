// scripts/check-leads.mts
//
// Gate: the full lead pipeline actually produces a deliverable payload, end
// to end, through a fake transport. This is deliberately NOT "does the route
// handler return 200" -- Sacramento Bath's quote endpoint returned 200 while
// only ever console.log'ging the lead, and a status-code-only check would
// have passed there too. This asserts a payload was actually produced and
// that it contains what the seller submitted.
import { submitLead, type LeadPayload, type LeadTransport } from "../src/lib/leads.ts";

class RecordingTransport implements LeadTransport {
  sent: LeadPayload[] = [];
  async send(payload: LeadPayload): Promise<void> {
    this.sent.push(payload);
  }
}

const SMOKE_ENV = {
  RESEND_API_KEY: "re_smoke_test_key",
  LEAD_TO_EMAIL: "smoke-test@example.com",
  LEAD_FROM_EMAIL: "MoKan Property Buyers <smoke-test@example.com>",
};

const SMOKE_INPUT = {
  name: "CI Smoke Test",
  email: "smoke@example.com",
  phone: "8165550100",
  propertyAddress: "1 Smoke Test Way, Kansas City, MO",
  message: "Automated end-to-end lead delivery check.",
};

export async function runLeadSmokeTest(): Promise<{ ok: boolean; detail: string }> {
  const transport = new RecordingTransport();

  const result = await submitLead(SMOKE_INPUT, {
    ip: "127.0.0.1",
    transport,
    env: SMOKE_ENV,
  });

  if (result.status !== "sent") {
    return { ok: false, detail: `expected status "sent", got "${result.status}"` };
  }
  if (transport.sent.length !== 1) {
    return { ok: false, detail: `expected exactly 1 payload produced, got ${transport.sent.length}` };
  }

  const payload = transport.sent[0]!;
  if (payload.to !== SMOKE_ENV.LEAD_TO_EMAIL) {
    return { ok: false, detail: "payload.to did not come from LEAD_TO_EMAIL" };
  }
  if (!payload.html.includes("Smoke Test Way")) {
    return { ok: false, detail: "payload body did not contain the submitted address" };
  }

  return { ok: true, detail: `payload produced: to=${payload.to} subject="${payload.subject}"` };
}

export async function runMissingKeySmokeTest(): Promise<{ ok: boolean; detail: string }> {
  const transport = new RecordingTransport();
  try {
    await submitLead(SMOKE_INPUT, {
      ip: "127.0.0.2",
      transport,
      env: { ...SMOKE_ENV, RESEND_API_KEY: "" },
    });
    return { ok: false, detail: "submitLead did not throw with a missing RESEND_API_KEY" };
  } catch {
    if (transport.sent.length !== 0) {
      return { ok: false, detail: "a payload was produced despite the missing key" };
    }
    return { ok: true, detail: "missing key threw before any payload was produced" };
  }
}

async function main(): Promise<void> {
  const happy = await runLeadSmokeTest();
  const guarded = await runMissingKeySmokeTest();

  if (!happy.ok) console.error(`LEAD SMOKE TEST FAILED (happy path)   ${happy.detail}`);
  else console.log(`check:leads OK (happy path)   ${happy.detail}`);

  if (!guarded.ok) console.error(`LEAD SMOKE TEST FAILED (missing key)   ${guarded.detail}`);
  else console.log(`check:leads OK (missing key)  ${guarded.detail}`);

  if (!happy.ok || !guarded.ok) process.exit(1);
}

if (process.argv[1]?.includes("check-leads")) main();

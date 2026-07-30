// tests/leads.test.ts
import { beforeEach, describe, expect, it } from "vitest";
import {
  FIELD_LIMITS,
  LeadConfigurationError,
  LeadDeliveryError,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  assertLeadDeliveryConfigured,
  buildLeadPayload,
  escapeHtml,
  isValidEmail,
  isValidPhone,
  resetRateLimiter,
  submitLead,
  validateLead,
  type LeadInput,
  type LeadPayload,
  type LeadTransport,
} from "@/lib/leads";

const validEnv = {
  RESEND_API_KEY: "re_test_key",
  LEAD_TO_EMAIL: "leads@example.com",
  LEAD_FROM_EMAIL: "MoKan Property Buyers <noreply@example.com>",
};

const validInput: LeadInput = {
  name: "Jordan Rivers",
  email: "jordan@example.com",
  phone: "(816) 555-0142",
  propertyAddress: "123 Main St, Kansas City, MO",
  message: "Inherited house, needs a fast cash sale.",
};

/** Fake transport: records every payload it would have sent, no network. */
class FakeTransport implements LeadTransport {
  sent: LeadPayload[] = [];
  private failNext = false;

  async send(payload: LeadPayload): Promise<void> {
    if (this.failNext) {
      this.failNext = false;
      throw new Error("simulated transport failure");
    }
    this.sent.push(payload);
  }

  failOnNextSend(): void {
    this.failNext = true;
  }
}

beforeEach(() => {
  resetRateLimiter();
});

describe("escapeHtml", () => {
  it("escapes all five HTML-significant characters", () => {
    expect(escapeHtml(`<script>&"'</script>`)).toBe(
      "&lt;script&gt;&amp;&quot;&#039;&lt;/script&gt;"
    );
  });

  it("leaves ordinary text untouched", () => {
    expect(escapeHtml("123 Main St, Kansas City, MO")).toBe("123 Main St, Kansas City, MO");
  });
});

describe("isValidEmail", () => {
  it("accepts an ordinary address", () => {
    expect(isValidEmail("a@b.com")).toBe(true);
  });

  it.each(["not-an-email", "missing-domain@", "@missing-local.com", "no-at-sign.com", ""])(
    "rejects %s",
    (bad) => {
      expect(isValidEmail(bad)).toBe(false);
    }
  );

  it("rejects an address longer than the field limit", () => {
    const long = "a".repeat(FIELD_LIMITS.email) + "@example.com";
    expect(isValidEmail(long)).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("accepts a formatted 10-digit US number", () => {
    expect(isValidPhone("(816) 555-0142")).toBe(true);
  });

  it("accepts a plain 10-digit number", () => {
    expect(isValidPhone("8165550142")).toBe(true);
  });

  it("rejects too few digits", () => {
    expect(isValidPhone("555-0142")).toBe(false);
  });

  it("rejects too many digits", () => {
    expect(isValidPhone("1".repeat(20))).toBe(false);
  });

  it("rejects non-numeric junk", () => {
    expect(isValidPhone("call me maybe")).toBe(false);
  });
});

describe("validateLead", () => {
  it("accepts a well-formed submission", () => {
    const result = validateLead(validInput);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.propertyAddress).toBe("123 Main St, Kansas City, MO");
    }
  });

  it("rejects a missing name", () => {
    const result = validateLead({ ...validInput, name: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues).toContain("name is required");
  });

  it("rejects a malformed email", () => {
    const result = validateLead({ ...validInput, email: "not-an-email" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues).toContain("email is invalid");
  });

  it("rejects a malformed phone", () => {
    const result = validateLead({ ...validInput, phone: "abc" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues).toContain("phone is invalid");
  });

  it("rejects a missing property address", () => {
    const result = validateLead({ ...validInput, propertyAddress: "" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues).toContain("propertyAddress is required");
  });

  it("rejects an oversized name", () => {
    const result = validateLead({ ...validInput, name: "a".repeat(FIELD_LIMITS.name + 1) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues).toContain("name is too long");
  });

  it("rejects an oversized property address", () => {
    const result = validateLead({
      ...validInput,
      propertyAddress: "a".repeat(FIELD_LIMITS.propertyAddress + 1),
    });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues).toContain("propertyAddress is too long");
  });

  it("rejects an oversized message", () => {
    const result = validateLead({ ...validInput, message: "a".repeat(FIELD_LIMITS.message + 1) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.issues).toContain("message is too long");
  });

  it("accepts an absent message (optional field)", () => {
    const { message, ...rest } = validInput;
    void message;
    const result = validateLead(rest);
    expect(result.ok).toBe(true);
  });

  it("tolerates non-string junk in every field without throwing", () => {
    const result = validateLead({
      name: 123,
      email: {},
      phone: null,
      propertyAddress: ["x"],
      message: undefined,
    } as unknown as LeadInput);
    expect(result.ok).toBe(false);
  });
});

describe("buildLeadPayload", () => {
  it("escapes HTML in every field of the delivered body", () => {
    const dangerous = {
      ...validInput,
      name: `<img src=x onerror=alert(1)>`,
      message: `<script>alert('xss')</script>`,
    };
    const validated = validateLead(dangerous);
    expect(validated.ok).toBe(true);
    if (!validated.ok) return;

    const payload = buildLeadPayload(validated.value, validEnv);
    expect(payload.html).not.toContain("<script>");
    expect(payload.html).not.toContain("<img src=x");
    expect(payload.html).toContain("&lt;script&gt;");
    expect(payload.html).toContain("&lt;img src=x onerror=alert(1)&gt;");
  });

  it("strips CRLF from the subject so a newline can't inject a header", () => {
    const validated = validateLead({
      ...validInput,
      propertyAddress: "123 Main St\r\nBcc: attacker@evil.com",
    });
    expect(validated.ok).toBe(true);
    if (!validated.ok) return;
    const payload = buildLeadPayload(validated.value, validEnv);
    expect(payload.subject).not.toMatch(/[\r\n]/);
  });

  it("reads to/from from env, never a hardcoded address", () => {
    const validated = validateLead(validInput);
    expect(validated.ok).toBe(true);
    if (!validated.ok) return;
    const payload = buildLeadPayload(validated.value, validEnv);
    expect(payload.to).toBe(validEnv.LEAD_TO_EMAIL);
    expect(payload.from).toBe(validEnv.LEAD_FROM_EMAIL);
  });
});

describe("assertLeadDeliveryConfigured", () => {
  it("passes silently when every var is set", () => {
    expect(() => assertLeadDeliveryConfigured(validEnv)).not.toThrow();
  });

  it("throws when RESEND_API_KEY is missing", () => {
    expect(() =>
      assertLeadDeliveryConfigured({ ...validEnv, RESEND_API_KEY: "" })
    ).toThrow(LeadConfigurationError);
  });

  it("throws when LEAD_TO_EMAIL is missing", () => {
    expect(() =>
      assertLeadDeliveryConfigured({ ...validEnv, LEAD_TO_EMAIL: undefined })
    ).toThrow(LeadConfigurationError);
  });

  it("throws when LEAD_FROM_EMAIL is missing", () => {
    expect(() =>
      assertLeadDeliveryConfigured({ ...validEnv, LEAD_FROM_EMAIL: undefined })
    ).toThrow(LeadConfigurationError);
  });

  it("names every missing variable in the error message", () => {
    try {
      assertLeadDeliveryConfigured({});
      expect.unreachable("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(LeadConfigurationError);
      const message = (err as Error).message;
      expect(message).toContain("RESEND_API_KEY");
      expect(message).toContain("LEAD_TO_EMAIL");
      expect(message).toContain("LEAD_FROM_EMAIL");
    }
  });
});

describe("submitLead — full pipeline via a fake transport", () => {
  it("produces a correctly-shaped payload for a valid submission", async () => {
    const transport = new FakeTransport();
    const result = await submitLead(validInput, { ip: "1.1.1.1", transport, env: validEnv });
    expect(result.status).toBe("sent");
    if (result.status !== "sent") return;
    expect(transport.sent).toHaveLength(1);
    expect(transport.sent[0]).toEqual(result.payload);
    expect(result.payload.to).toBe(validEnv.LEAD_TO_EMAIL);
    expect(result.payload.replyTo).toBe(validInput.email);
    expect(result.payload.subject).toContain("123 Main St, Kansas City, MO");
    expect(result.payload.html).toContain("Jordan Rivers");
  });

  it("escapes HTML end to end through submitLead, not just buildLeadPayload", async () => {
    const transport = new FakeTransport();
    const result = await submitLead(
      { ...validInput, message: `<script>alert(1)</script>` },
      { ip: "1.1.1.2", transport, env: validEnv }
    );
    expect(result.status).toBe("sent");
    if (result.status !== "sent") return;
    expect(transport.sent[0]!.html).not.toContain("<script>");
    expect(transport.sent[0]!.html).toContain("&lt;script&gt;");
  });

  it("rejects the 6th request from the same IP within the rate-limit window", async () => {
    const transport = new FakeTransport();
    const ip = "9.9.9.9";
    const now = Date.now();

    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      const result = await submitLead(validInput, { ip, transport, env: validEnv, now });
      expect(result.status).toBe("sent");
    }

    const sixth = await submitLead(validInput, { ip, transport, env: validEnv, now });
    expect(sixth.status).toBe("rate_limited");
    expect(transport.sent).toHaveLength(RATE_LIMIT_MAX);
  });

  it("resets the rate limit after the window elapses", async () => {
    const transport = new FakeTransport();
    const ip = "9.9.9.10";
    const start = Date.now();

    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      await submitLead(validInput, { ip, transport, env: validEnv, now: start });
    }
    const blocked = await submitLead(validInput, { ip, transport, env: validEnv, now: start });
    expect(blocked.status).toBe("rate_limited");

    const afterWindow = start + RATE_LIMIT_WINDOW_MS + 1;
    const allowed = await submitLead(validInput, {
      ip,
      transport,
      env: validEnv,
      now: afterWindow,
    });
    expect(allowed.status).toBe("sent");
  });

  it("returns success on a filled honeypot but delivers nothing", async () => {
    const transport = new FakeTransport();
    const result = await submitLead(
      { ...validInput, honeypot: "I am a bot" },
      { ip: "2.2.2.2", transport, env: validEnv }
    );
    expect(result.status).toBe("honeypot");
    expect(transport.sent).toHaveLength(0);
  });

  it("does not send when the honeypot is filled even with otherwise-invalid data", async () => {
    const transport = new FakeTransport();
    const result = await submitLead(
      { honeypot: "gotcha", name: "", email: "garbage" },
      { ip: "2.2.2.3", transport, env: validEnv }
    );
    expect(result.status).toBe("honeypot");
    expect(transport.sent).toHaveLength(0);
  });

  it("a missing RESEND_API_KEY throws before touching the transport -- never a silent 200", async () => {
    const transport = new FakeTransport();
    const brokenEnv = { ...validEnv, RESEND_API_KEY: "" };
    await expect(
      submitLead(validInput, { ip: "3.3.3.3", transport, env: brokenEnv })
    ).rejects.toBeInstanceOf(LeadConfigurationError);
    expect(transport.sent).toHaveLength(0);
  });

  it("a missing LEAD_TO_EMAIL or LEAD_FROM_EMAIL also throws rather than sending", async () => {
    const transport = new FakeTransport();
    await expect(
      submitLead(validInput, {
        ip: "3.3.3.4",
        transport,
        env: { ...validEnv, LEAD_TO_EMAIL: "" },
      })
    ).rejects.toBeInstanceOf(LeadConfigurationError);
    await expect(
      submitLead(validInput, {
        ip: "3.3.3.5",
        transport,
        env: { ...validEnv, LEAD_FROM_EMAIL: "" },
      })
    ).rejects.toBeInstanceOf(LeadConfigurationError);
    expect(transport.sent).toHaveLength(0);
  });

  it("a missing key beats even a filled honeypot -- configuration is checked first", async () => {
    const transport = new FakeTransport();
    await expect(
      submitLead(
        { ...validInput, honeypot: "bot" },
        { ip: "3.3.3.6", transport, env: { ...validEnv, RESEND_API_KEY: "" } }
      )
    ).rejects.toBeInstanceOf(LeadConfigurationError);
  });

  it("rejects a malformed email before ever calling the transport", async () => {
    const transport = new FakeTransport();
    const result = await submitLead(
      { ...validInput, email: "not-an-email" },
      { ip: "4.4.4.4", transport, env: validEnv }
    );
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") expect(result.issues).toContain("email is invalid");
    expect(transport.sent).toHaveLength(0);
  });

  it("rejects a malformed phone before ever calling the transport", async () => {
    const transport = new FakeTransport();
    const result = await submitLead(
      { ...validInput, phone: "12" },
      { ip: "4.4.4.5", transport, env: validEnv }
    );
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") expect(result.issues).toContain("phone is invalid");
    expect(transport.sent).toHaveLength(0);
  });

  it("rejects an oversized field before ever calling the transport", async () => {
    const transport = new FakeTransport();
    const result = await submitLead(
      { ...validInput, message: "a".repeat(FIELD_LIMITS.message + 1) },
      { ip: "4.4.4.6", transport, env: validEnv }
    );
    expect(result.status).toBe("invalid");
    if (result.status === "invalid") expect(result.issues).toContain("message is too long");
    expect(transport.sent).toHaveLength(0);
  });

  it("surfaces a transport failure as LeadDeliveryError, not a swallowed success", async () => {
    const transport = new FakeTransport();
    transport.failOnNextSend();
    await expect(
      submitLead(validInput, { ip: "5.5.5.5", transport, env: validEnv })
    ).rejects.toBeInstanceOf(LeadDeliveryError);
  });
});

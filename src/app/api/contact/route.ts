// src/app/api/contact/route.ts
//
// Seller-enquiry endpoint. See spec §12 and src/lib/leads.ts for the pipeline
// this wires up. Nothing security- or delivery-relevant lives in this file --
// it only adapts Next.js Request/Response and the Resend SDK to the pure
// interfaces in src/lib/leads.ts, so that logic stays testable without a
// network call.
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/site";
import {
  LeadConfigurationError,
  LeadDeliveryError,
  submitLead,
  type LeadInput,
  type LeadTransport,
} from "@/lib/leads";

export const runtime = "nodejs";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * CSRF guard: reject any POST whose Origin/Referer isn't this site. A
 * missing Origin AND Referer is also rejected -- a same-origin browser POST
 * always sends at least one of the two.
 */
function isAllowedOrigin(request: Request): boolean {
  const candidate = request.headers.get("origin") ?? request.headers.get("referer");
  if (!candidate) return false;

  let candidateUrl: URL;
  let siteUrl: URL;
  try {
    candidateUrl = new URL(candidate);
    siteUrl = new URL(SITE.url);
  } catch {
    return false;
  }

  if (candidateUrl.hostname === siteUrl.hostname) return true;
  // Local development only.
  if (candidateUrl.hostname === "localhost" || candidateUrl.hostname === "127.0.0.1") {
    return true;
  }
  return false;
}

function resendTransport(apiKey: string): LeadTransport {
  const resend = new Resend(apiKey);
  return {
    async send(payload) {
      const { error } = await resend.emails.send({
        from: payload.from,
        to: payload.to,
        replyTo: payload.replyTo,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      });
      if (error) {
        throw new Error(error.message || "Resend API returned an error");
      }
    },
  };
}

export async function POST(request: Request): Promise<NextResponse> {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: LeadInput;
  try {
    const json: unknown = await request.json();
    body = (json && typeof json === "object" ? json : {}) as LeadInput;
  } catch {
    return NextResponse.json({ error: "Malformed request body" }, { status: 400 });
  }

  const ip = getClientIp(request);

  try {
    const result = await submitLead(body, {
      ip,
      transport: resendTransport(process.env.RESEND_API_KEY ?? ""),
      env: process.env,
    });

    switch (result.status) {
      case "sent":
        return NextResponse.json({ success: true });
      case "honeypot":
        // Indistinguishable from success on the wire -- the point is to not
        // tip the bot off, not to punish it.
        return NextResponse.json({ success: true });
      case "rate_limited":
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      case "invalid":
        return NextResponse.json(
          { error: "Please check your submission and try again.", issues: result.issues },
          { status: 400 }
        );
    }
  } catch (err) {
    if (err instanceof LeadConfigurationError) {
      // Unmistakable: this must show up in Vercel function logs, not just a
      // 5xx status the caller can rationalize away.
      console.error("[leads] CONFIGURATION ERROR -- lead delivery is not set up:", err.message);
      return NextResponse.json(
        { error: "This form is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }
    if (err instanceof LeadDeliveryError) {
      console.error("[leads] DELIVERY FAILED -- a seller enquiry was not delivered:", err.message);
      return NextResponse.json(
        { error: "We couldn't send your request. Please try again later." },
        { status: 502 }
      );
    }
    console.error("[leads] Unexpected error handling a lead submission:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

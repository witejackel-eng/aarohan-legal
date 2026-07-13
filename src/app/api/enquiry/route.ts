import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/enquiry — general enquiry form endpoint.
 *
 * Per brand brief §16:
 *   - Server-side validation with Zod
 *   - Trim and normalise inputs
 *   - Honeypot field
 *   - Rate limiting (in-memory per-IP, sufficient for a single-instance
 *     deployment; for multi-instance, replace with a shared store)
 *   - Request-size limit
 *   - Generic safe error messages
 *   - No secret exposed to the browser
 *   - No form data logged to the console
 *   - No message body exposed in analytics
 *   - No automatic forwarding to third-party CRMs by default
 *   - No attachment support
 *   - No automated legal response
 *   - No promise of response time
 *   - No automatic creation of an advocate-client relationship
 *   - No mailing-list subscription by default
 *
 * Environment variables (see .env.example):
 *   ENQUIRY_RECIPIENT_EMAIL  — address that should receive the enquiry
 *   RESEND_API_KEY           — if set, email is sent via Resend
 *   NEXT_PUBLIC_SITE_URL     — canonical site URL (used in email body)
 *
 * If email configuration is absent, the endpoint responds with a
 * graceful "disabled" error rather than pretending a message was sent.
 */

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  organisation: z.string().trim().max(200).optional().or(z.literal("")),
  email: z.string().trim().min(1).email().max(200),
  telephone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[0-9 +()\-\s]*$/)
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
  consent: z.literal(true),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

// Simple in-memory rate limiter per IP. For multi-instance deployments,
// replace with a shared store (e.g. Redis). The limits below are
// conservative to mitigate abuse without blocking genuine enquiries.
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 enquiries per minute per IP
const rateLimit = new Map<string, { count: number; firstAt: number }>();

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimitCheck(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimit.get(ip);
  if (!existing || now - existing.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateLimit.set(ip, { count: 1, firstAt: now });
    return true;
  }
  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  existing.count += 1;
  return true;
}

// Periodic cleanup so the rate-limit map does not grow unboundedly.
if (typeof globalThis !== "undefined") {
  const gc = () => {
    const now = Date.now();
    for (const [k, v] of rateLimit.entries()) {
      if (now - v.firstAt > RATE_LIMIT_WINDOW_MS * 2) {
        rateLimit.delete(k);
      }
    }
  };
  // Avoid duplicate intervals in dev (HMR)
  const g = globalThis as { __enquiryRateGc?: NodeJS.Timeout };
  if (!g.__enquiryRateGc) {
    g.__enquiryRateGc = setInterval(gc, RATE_LIMIT_WINDOW_MS);
  }
}

export async function POST(req: NextRequest) {
  // 1. Request-size limit (~10 KB is more than enough for the form).
  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > 10_000) {
    return NextResponse.json(
      { error: "Request too large." },
      { status: 413 }
    );
  }

  // 2. Rate limit per IP
  const ip = getClientIp(req);
  if (!rateLimitCheck(ip)) {
    return NextResponse.json(
      {
        error:
          "Too many enquiries have been submitted from this address. Please try again later.",
      },
      { status: 429 }
    );
  }

  // 3. Parse JSON
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // 4. Honeypot — if the hidden field is non-empty, pretend success
  //    but discard the request silently.
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof (body as { website?: unknown }).website === "string" &&
    ((body as { website: string }).website as string).length > 0
  ) {
    // Silently accept but do nothing — typical honeypot pattern
    return NextResponse.json({ ok: true });
  }

  // 5. Validate
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please review the highlighted fields and try again." },
      { status: 400 }
    );
  }

  // 6. Email configuration check — never pretend that a message was sent.
  const recipientEmail = process.env.ENQUIRY_RECIPIENT_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  if (!recipientEmail || !resendApiKey) {
    // Email configuration is absent — fail gracefully with a clear
    // instruction to use the direct contact email.
    return NextResponse.json(
      {
        error:
          "The enquiry form is not yet configured to deliver messages. Please contact the practice directly using the verified email or telephone on the General Enquiries page.",
      },
      { status: 503 }
    );
  }

  // 7. Send email via Resend.
  //    We deliberately do NOT log the message body or any personal
  //    data to the console. Only a generic success/failure marker is
  //    recorded.
  try {
    const payload = {
      from: "Aarohan Legal Enquiries <onboarding@resend.dev>",
      to: [recipientEmail],
      reply_to: parsed.data.email,
      subject: `General enquiry — ${parsed.data.subject}`.slice(0, 200),
      text: [
        `A general enquiry was submitted through the website.`,
        ``,
        `Name: ${parsed.data.name}`,
        parsed.data.organisation ? `Organisation: ${parsed.data.organisation}` : null,
        `Email: ${parsed.data.email}`,
        parsed.data.telephone ? `Telephone: ${parsed.data.telephone}` : null,
        `Subject: ${parsed.data.subject}`,
        `Consent: confirmed`,
        ``,
        `Message:`,
        parsed.data.message,
        ``,
        `---`,
        `Source: ${siteUrl}`,
        `Time: ${new Date().toISOString()}`,
      ]
        .filter(Boolean)
        .join("\n"),
    };

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Generic safe error — never expose Resend's error payload to the
      // browser, which may include sensitive detail.
      return NextResponse.json(
        {
          error:
            "The enquiry could not be submitted at the moment. Please try again later or contact the practice directly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "The enquiry could not be submitted at the moment. Please try again later or contact the practice directly.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET — reject non-POST requests with 405.
 */
export function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

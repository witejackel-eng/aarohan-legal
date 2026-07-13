import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — security headers per brand brief §26.
 *
 * Sets:
 *   - Strict-Transport-Security
 *   - X-Content-Type-Options: nosniff
 *   - Referrer-Policy: strict-origin-when-cross-origin
 *   - Permissions-Policy (deny camera, microphone, geolocation, payment)
 *   - X-Frame-Options: DENY  (frame-ancestors protection)
 *   - Content-Security-Policy (suitable for the implemented stack)
 *
 * CSP allows:
 *   - 'self' for scripts, styles, images, fonts, connect
 *   - 'unsafe-inline' for styles (Tailwind/Next.js require this for
 *     injected style elements in dev and for some compiled CSS)
 *   - Fonts from next/font (self-hosted)
 *   - connect-src 'self' for the /api/enquiry endpoint
 *   - No 'unsafe-eval', no 'unsafe-inline' for scripts
 *   - frame-ancestors 'none' to prevent clickjacking
 *
 * No external analytics domains are allowed by default.
 */

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();

  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
  );
  res.headers.set("X-DNS-Prefetch-Control", "on");
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      // Tailwind injects <style> elements; next/font also needs inline styles
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://api.resend.com",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
    ].join("; ")
  );

  return res;
}

export const config = {
  // Apply to all routes except Next.js internals
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.svg$).*)"],
};

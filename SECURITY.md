# Aarohan Legal — Security

## Security assumptions

- The website is an informational institutional website, not a transactional application.
- The only server-side endpoint accepting user input is `POST /api/enquiry`.
- The deployment environment provides HTTPS termination and standard DDoS mitigation.
- The rate limiter is in-memory per-instance. For multi-instance deployments, replace it with a shared store (e.g. Redis).

## Form protections

The General Enquiries endpoint (`src/app/api/enquiry/route.ts`) enforces:

1. **Server-side validation with Zod** — every field is validated against a strict schema. Invalid input is rejected with HTTP 400 and a generic error.
2. **Honeypot field** — a hidden `website` field must remain empty. If non-empty, the endpoint returns HTTP 200 but discards the request silently.
3. **Per-IP rate limiting** — 3 requests per minute per IP. Excess requests are rejected with HTTP 429.
4. **Request-size limit** — requests larger than 10 KB are rejected with HTTP 413.
5. **Generic safe error messages** — error responses never expose internal state, stack traces or upstream API errors.
6. **No form data logged** — the message body, name, email, telephone and consent value are never written to the console or to analytics.
7. **No automatic forwarding** — no automatic forwarding to third-party CRMs by default.
8. **No attachment support** — the form does not accept file uploads.
9. **No automated legal response** — the endpoint does not produce a legal response.
10. **No promise of response time** — the website does not commit to a response window.
11. **No automatic advocate-client relationship** — submission does not create a relationship.
12. **No mailing-list subscription** — submissions are not added to any mailing list.
13. **Email configuration check** — if `ENQUIRY_RECIPIENT_EMAIL` or `RESEND_API_KEY` is absent, the endpoint responds with HTTP 503 and never pretends a message was sent.

## Environment variables

See `.env.example`. Variables:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL.
- `ENQUIRY_RECIPIENT_EMAIL` — recipient address for enquiry emails.
- `RESEND_API_KEY` — Resend API key for email delivery.

`.env` is gitignored. Never commit secrets to source control.

## Security headers

Set by `src/middleware.ts`:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (frame-ancestors protection)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()`
- `Content-Security-Policy`:
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-inline'` (Next.js requires inline scripts for hydration)
  - `style-src 'self' 'unsafe-inline'` (Tailwind and next/font inject inline styles)
  - `img-src 'self' data: blob:`
  - `font-src 'self' data:`
  - `connect-src 'self' https://api.resend.com`
  - `frame-ancestors 'none'`
  - `form-action 'self'`
  - `base-uri 'self'`
  - `object-src 'none'`
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`

No `unsafe-eval` is permitted anywhere. No external analytics domains are allowed by default.

## Reporting process

If you believe you have identified a security vulnerability in this website, please contact the practice using the verified contact information on the General Enquiries page. Include a clear description of the issue and, if possible, steps to reproduce. The practice will acknowledge receipt and aim to investigate within a reasonable period.

Do not include confidential, privileged or time-sensitive material in your report until an engagement has been accepted in writing.

## Dependency-review process

Dependencies are declared in `package.json`. Before each deployment:

1. Run `bun audit` to identify known vulnerabilities in the dependency tree.
2. Review the output and update affected packages.
3. Re-run the production build and the lint check to confirm nothing regresses.
4. Document any dependency that cannot be updated and the reason.

## Data-handling limitations

- The website does not collect sensitive personal data (no Aadhaar, no PAN, no financial records, no medical records, no identity documents, no case numbers, no opposing-party details).
- The website does not set advertising, behavioural-tracking, fingerprinting or session-replay cookies.
- The website does not load analytics by default.
- The website does not sell personal information.
- The website does not perform cross-site behavioural tracking.
- Form submissions are retained only for the period reasonably required to respond and to maintain a record of the enquiry, after which they are deleted unless a longer period is required by law or by an engagement. Specific retention values must be confirmed by the firm before launch.
- The disclaimer acceptance is a single boolean stored in `sessionStorage` and is cleared when the browser session ends.

## Sanitised MDX / content pipeline

Perspective articles are stored as typed data structures in `src/content/perspectives.ts`. The body is rendered through React components (`PerspectiveBody`) — no `dangerouslySetInnerHTML`, no raw HTML injection. This eliminates the risk of stored XSS through the content pipeline.

## Safe external links

External links (if any are added in the future) should include `rel="noopener noreferrer"` to prevent tab-nabbing and referrer leakage. The current implementation has no external links in the editorial copy.

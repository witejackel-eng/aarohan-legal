# Aarohan Legal

> **Repository:** `aarohan-legal` — an independent boutique Indian legal practice website. Editorial, intellectual, restrained, contemporary, precise. Indian without decorative stereotypes. Premium without behaving like a commercial sales website. Built around the Indian professional-ethics rules applicable to advocates: no advertising, no solicitation, no fabricated credentials, no testimonials, no case-result claims.

A single-route Next.js 16 application that delivers a multi-page editorial experience through client-side view-state. The visual system is entirely original and procedural — a typographic wordmark, an editorial palette (paper, ink, constitutional red, antique brass, dark), a WebGL sculpture ("The Constitutional Field") built with Three.js / R3F, and a set of procedural SVG illustrations for the seven practice areas. No downloaded imagery is used anywhere on the site.

> **Prelaunch warning.** This website is a technical and editorial implementation, not a certification of compliance. Before publication, the firm must obtain review from an enrolled advocate familiar with the applicable Bar Council of India Rules, relevant State Bar Council requirements, privacy obligations and current judicial or regulatory directions.

---

## 1. Project overview

Aarohan Legal is a single-route Next.js 16 application that simulates a multi-page editorial site through client-side view-state. The site is built around the Indian professional-ethics rules applicable to advocates: no advertising, no solicitation, no fabricated credentials, no testimonials, no case-result claims.

The visual system is original and was created for this project: a typographic wordmark, an editorial palette (paper, ink, constitutional red, antique brass, dark), a procedural WebGL sculpture ("The Constitutional Field"), and a set of procedural SVG illustrations for the seven practice areas. No downloaded imagery is used.

## 2. Design philosophy

- **Editorial, not commercial.** The site reads like a digital legal publication rather than a SaaS landing page.
- **Restrained motion.** All motion is quiet, controlled and serves hierarchy. `prefers-reduced-motion` is honoured globally.
- **Procedural visuals.** Every illustration, the WebGL sculpture and the favicon are generated from typography, lines and geometry — never from stock photography.
- **Indian without stereotypes.** The palette references bound legal volumes and editorial ink, not festival colours; the wordmark is purely typographic.
- **Original.** The reference site (myweblab.it) inspired the editorial catalogue style; this implementation has its own brand, palette, typography pairing, grid proportions, motion choreography, illustration language, navigation labels, component shapes, hero composition and WebGL object.

## 3. Originality statement

Nothing in this project copies the reference site's logo, business name, written copy, source code, illustrations, images, icons, exact section sequence, exact typefaces, exact colour palette, exact component dimensions, exact animation timing, exact mobile navigation, exact hero composition, distinctive branded phrases, or any other copyrightable element. The high-level qualities reinterpreted (oversized editorial typography, structured index-style menu, strong section numbering, full-screen navigation, typographic marquee, rigid grid systems, large negative space, scroll-led transitions, sticky editorial side labels, numbered service lists, elegant page transitions, deliberate typography hierarchy, minimal but expressive colour use, high-quality micro-interactions, digital-publication feel) are applied through original implementation.

## 4. Technical stack

- Next.js 16 with App Router
- React 19
- TypeScript in strict mode
- Tailwind CSS 4 with custom brand tokens
- Three.js + @react-three/fiber + @react-three/drei (WebGL hero)
- Framer Motion (transitions for full-screen index)
- React Hook Form + Zod (enquiry form)
- Lucide React (utility icons)
- Resend (optional email delivery for the enquiry endpoint)

No external CMS is used. All content is editable through typed data in `src/content/` and `src/config/site.ts`.

## 5. Local setup

```bash
# Install dependencies
bun install

# Run the dev server
bun run dev

# Lint
bun run lint

# Validate perspectives
bun run scripts/validate-perspectives.mjs
```

The dev server runs on port 3000. Open the preview panel — do not visit `http://localhost:3000` directly in a sandboxed environment.

## 6. Environment variables

See `.env.example`. Without `ENQUIRY_RECIPIENT_EMAIL` and `RESEND_API_KEY`, the enquiry endpoint responds with HTTP 503 and the website degrades gracefully (the form remains visible, submission is disabled, the verified direct contact email is shown).

## 7. Content editing

All editable content lives in:

- `src/config/site.ts` — firm information, contact details, feature flags, legal version, social links, footer statement, lawyer profiles (verified flag controls public rendering).
- `src/content/principles.ts` — the five principles.
- `src/content/practice-areas.ts` — the seven practice areas (slug, descriptions, contexts, types of work, institutional framework, illustration key).
- `src/content/perspectives.ts` — the editorial notes. Each article has a `status` field (`draft | reviewed | published`) and a `legalReview` flag. An article is rendered publicly only when `status === "published"` AND `legalReview === true`. The validation script `scripts/validate-perspectives.mjs` enforces this at build time.

Do not invent professional credentials. The production build must display no fake lawyer names, fabricated qualifications, fake enrolment numbers, fake addresses, fake clients or fabricated achievements.

## 8. Perspective publishing workflow

1. Write the article as a new entry in `src/content/perspectives.ts`.
2. Set `status: "draft"` and `legalReview: false` while writing.
3. After legal review by an enrolled advocate, set `status: "published"` and `legalReview: true`.
4. Run `bun run scripts/validate-perspectives.mjs` to verify the article satisfies the published-article checks (title, publication date, last-reviewed date, disclaimer, legal review flag, at least one source for legal propositions, abstract, non-empty body).
5. The article renders publicly only after the validation script passes.

Do not auto-publish AI-generated legal content. Each article is a general-information editorial note — not legal advice for any specific facts.

## 9. Disclaimer behaviour

The disclaimer gate is implemented per brand brief §4.5:

- A refined full-screen panel is displayed before the visitor enters the main website for the first time in a browser session.
- Acceptance is stored in `sessionStorage` only (per session, not persistent).
- No preselected acceptance.
- Keyboard accessible, focus trapped, focus restored after acceptance.
- Escape triggers "leave website" (navigates to `about:blank`).
- A visible link to the complete Disclaimer page is provided.
- Analytics are not loaded before consent (analytics are disabled site-wide by default — see `siteConfig.features.analyticsEnabled`).
- The gate is a client-side session overlay, not server-side cloaking. Public informational content remains indexable.

## 10. Form configuration

The General Enquiries form (`src/components/forms/GeneralEnquiryForm.tsx`) submits to `POST /api/enquiry` (`src/app/api/enquiry/route.ts`).

Server-side protections:

- Zod schema validation
- Honeypot field (`website` must be empty)
- Per-IP rate limiting (3 requests per minute)
- 10 KB request-size limit
- Generic safe error messages (no detail about internal state)
- No form data logged to the console
- No message body exposed in analytics
- No automatic forwarding to third-party CRMs
- No attachment support
- No automated legal response
- No promise of response time
- No automatic creation of an advocate-client relationship
- No mailing-list subscription by default

If email configuration is absent, the endpoint responds with HTTP 503 and the website degrades gracefully.

## 11. Accessibility

The website targets WCAG 2.2 AA. See `ACCESSIBILITY.md` for the full statement.

Key features:

- Semantic HTML and correct heading hierarchy
- Skip-to-content link as the first focusable element on each view
- Full keyboard navigation with visible focus indicators
- Focus trap and restoration in the disclaimer dialog and full-screen index
- Reduced-motion support (pauses marquee, disables parallax, switches WebGL to a static fallback)
- Descriptive form validation errors
- Alt text / accessible labels for meaningful SVGs; decorative SVGs hidden from assistive technology
- No information conveyed by colour alone
- No autoplay audio

## 12. Security

See `SECURITY.md` for the full statement. Highlights:

- Strict TypeScript (no `any` outside narrow justified cases)
- Server-side input validation on all API inputs
- Rate limiting, honeypot, request-size limit on the enquiry endpoint
- Generic safe error responses
- Security headers via middleware: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, Content-Security-Policy
- `frame-ancestors 'none'` to prevent clickjacking
- No `eval`, no open redirect, no exposed stack traces
- Safe external links with `noopener` and `noreferrer` (where applicable)
- No secrets in source control (`.env` is gitignored)
- No sensitive data in browser storage (disclaimer acceptance is a single boolean in `sessionStorage`)

## 13. Testing

The project ships with a perspective validation script (`scripts/validate-perspectives.mjs`). Run it before every deployment:

```bash
bun run scripts/validate-perspectives.mjs
```

A Playwright smoke test plan is documented in the brand brief (§27). The recommended critical tests are:

1. Homepage loads.
2. Disclaimer gate opens on first session.
3. Keyboard focus remains inside disclaimer.
4. Acceptance closes disclaimer.
5. Acceptance remains during the same browser session.
6. Full-screen index opens and closes.
7. Escape closes the index.
8. Keyboard navigation reaches every main view.
9. Practice links work.
10. Perspective pages work.
11. General enquiry validation works.
12. Confidentiality warning is visible.
13. Invalid form submissions fail safely.
14. Reduced-motion mode disables major motion.
15. Custom 404 renders.
16. No horizontal overflow at key mobile widths.

## 14. Deployment

The project is prepared for Vercel:

- `next.config.ts` uses `output: "standalone"` for production builds.
- `metadataBase` is set from `siteConfig.seo.siteUrl` (override via `NEXT_PUBLIC_SITE_URL`).
- No hardcoded localhost URLs.
- The enquiry endpoint fails gracefully without email credentials.
- WebGL works in production.
- No development-only assets in the production build.
- No missing routes — all views resolve through the view router on `/`.
- No broken font loading.
- No secret exposure.

## 15. Prelaunch legal review

Before launch, the firm must obtain review from an enrolled advocate familiar with:

- The Bar Council of India Rules
- Relevant State Bar Council requirements
- Privacy obligations
- Current judicial or regulatory directions

See `PRELAUNCH-LEGAL-AND-CONTENT-CHECKLIST.md` for the list of fields that must be replaced or verified.

## 16. Replacement of provisional data

All provisional data is centrally listed in `src/config/site.ts` (the `provisionalWarnings` array) and in `PRELAUNCH-LEGAL-AND-CONTENT-CHECKLIST.md`. Provisional fields are visually flagged in the UI with "Provisional — pending verification" until their corresponding `verified` flag is set to `true`.

## 17. No-image / procedural-visual approach

No downloaded imagery is used anywhere on the site. All visuals are:

- Typography
- Layout
- Custom SVG illustrations (`src/components/illustrations/PracticeIllustration.tsx`)
- CSS-generated graphics
- Canvas/WebGL graphics (`src/components/webgl/`)
- Three-dimensional procedural geometry (the Constitutional Field)

This is a deliberate ethical and aesthetic choice — it avoids stock photography, AI-generated lawyer portraits, courthouse photographs, generic gavels, generic scales-of-justice imagery, handshake photographs, corporate boardroom photographs and city skyline photographs.

## 18. No AI attribution

Per the brand brief, no AI attribution, no bot branding and no mention that the site was generated by an AI is included anywhere in the project.

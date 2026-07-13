---
Task ID: full-build
Agent: main (Super Z)
Task: Build the complete Aarohan Legal — Indian legal boutique website per pasted master command.

Work Log:
- Loaded uploaded brief (2135 lines) and the fullstack-dev skill.
- Installed three, @react-three/fiber, @react-three/drei, @types/three.
- Built src/config/site.ts with verified flags on every field; no fabricated credentials; lawyer profiles array empty (peoplePageEnabled = false).
- Built content modules: principles.ts (5 principles), practice-areas.ts (7 areas with institutional frameworks), perspectives.ts (3 published articles with sources, disclaimer, legalReview flag, frontmatter-style schema).
- Wrote scripts/validate-perspectives.mjs enforcing the brand-brief publish rule (status=published AND legalReview=true AND has sources).
- Replaced layout.tsx with editorial fonts (Instrument Sans / Newsreader / IBM Plex Mono via next/font) and full metadata/viewport.
- Replaced globals.css with the Aarohan brand palette (#F1EEE6 paper, #11110F ink, #6A1F2B red, #A9844F brass, #151412 dark), editorial typography utilities, motion primitives, and global prefers-reduced-motion handling.
- Built src/lib/view-router.tsx — single-route SPA view-state with hash sync, sessionStorage persistence, popstate handling. This reconciles the project's "/" — only constraint with the multi-page-feeling experience the brief demands.
- Built DisclaimerGate (sessionStorage, focus trap, escape-to-leave, focus restoration, visible link to full Disclaimer, no preselection).
- Built SiteHeader with route-context label and animated Index button marker; transparent over hero, paper surface on scroll.
- Built FullscreenIndex with numbered routes, motion choreography (numbers enter separately from labels), fine-rule background diagram that reacts to hover, keyboard + escape handling, body-scroll lock.
- Built ConstitutionalField WebGL sculpture using Three.js / R3F: 7 layered planes, 3 grid layers, intersecting brass diagonals, 10 ordered nodes with red central apex. Autonomous slow rotation, small pointer parallax, reduced-motion fallback, WebGL-support detection, dynamic import.
- Built ConstitutionalFieldFallback as static SVG (paper planes, grid, nodes, brass axis, red apex).
- Built homepage sections 01–10 per the brief: Hero, InstitutionalIntro (with layered-structure SVG), MovingPracticeIndex (marquee with reduced-motion static fallback), PrinciplesSection (sticky desktop / vertical mobile), PracticeAreasSection (numbered list with hover-activated procedural SVGs), LegalStructureSection (8-level interactive diagram), MethodSection (4 stages), PerspectivesSection, GeneralInfoSection (dark), SiteFooter.
- Built 7 procedural SVG illustrations (one per practice area) using the same visual grammar — fine rules, nodes, geometric planes, indexed labels.
- Built views: FirmView, PracticeView, PracticeDetailView (template with 8 sections each), PerspectivesView, PerspectiveDetailView (with body renderer, sources, disclaimer, related), ContactView, DisclaimerView, PrivacyView, TermsView, AccessibilityView, NotFoundView.
- Built GeneralEnquiryForm with React Hook Form + Zod, honeypot, consent checkbox, dual confidentiality warning (above message field and at top of form).
- Built POST /api/enquiry route with Zod validation, honeypot, per-IP rate limiting (3/min), 10KB request-size limit, generic safe errors, Resend integration, graceful 503 when email config absent.
- Built middleware.ts with HSTS, X-Content-Type-Options, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, full CSP (frame-ancestors 'none', no unsafe-eval, connect-src 'self' api.resend.com), COOP, CORP.
- Wrote sitemap.ts, robots.ts, favicon.svg, icon.svg, og.svg (all original typographic / procedural SVGs).
- Wrote README.md, SECURITY.md, ACCESSIBILITY.md, PRELAUNCH-LEGAL-AND-CONTENT-CHECKLIST.md, .env.example.

Stage Summary:
- Routes completed (via view-state on "/"): home, firm, practice, practice-detail (7 slugs), perspectives, perspective-detail (3 slugs), people (disabled view), contact, disclaimer, privacy, terms, accessibility, not-found.
- Visual systems: editorial typography pairing, Aarohan palette + tokens, original wordmark + monogram + favicon + app icon + OG graphic, 7 procedural practice illustrations, 1 procedural layered-structure diagram, 1 procedural legal-structure pyramid, WebGL Constitutional Field with SVG fallback.
- WebGL: Three.js + R3F, dynamic import, no SSR, capped DPR, reduced-motion fallback, WebGL-support detection, autonomous slow rotation + small pointer parallax, no external textures.
- Compliance: sessionStorage disclaimer gate, no advertising / solicitation language, no testimonials, no fabricated credentials, verified-flag system on every site config field, published-perspective validation script, neutral "General Enquiries" form wording, confidentiality warnings, no calendar, no file uploads, no Aadhaar/PAN/case-number fields.
- Accessibility: WCAG 2.2 AA target, skip-to-content link, semantic HTML, focus trap + restoration in disclaimer + index nav, visible focus indicators, descriptive form errors, reduced-motion honoured globally, alt text on meaningful SVGs, no colour-only information.
- Security: middleware-set headers (CSP, HSTS, X-Frame-Options, Permissions-Policy, etc.), Zod server-side validation, honeypot, per-IP rate limiting, request-size limit, generic safe errors, no form-data logging, no unsafe-eval, frame-ancestors 'none', no secrets in source control.
- Tests run:
  - bun run lint → 0 errors, 0 warnings.
  - bun run scripts/validate-perspectives.mjs → 3 published articles verified.
  - curl GET / → HTTP 200, 90 KB rendered HTML.
  - curl GET /sitemap.xml, /robots.txt, /favicon.svg, /og.svg, /icon.svg → all HTTP 200.
  - curl GET /api/enquiry → HTTP 405 (correct, POST only).
  - curl POST /api/enquiry invalid → HTTP 400.
  - curl POST /api/enquiry valid (no email config) → HTTP 503 graceful.
  - curl POST /api/enquiry 4× in a row → HTTP 429 on the 4th (rate limit working).
  - agent-browser open / → page loads, no console errors, no hydration warnings.
  - agent-browser snapshot → all homepage sections present (hero, intro, marquee, principles, practice areas, legal structure, method, perspectives, general info, footer).
  - agent-browser click Index → full-screen index opens, escape closes it.
  - agent-browser navigate (via hash) → firm, practice, practice-detail, perspectives, perspective-detail, contact, disclaimer, privacy, terms, accessibility, not-found all render correctly.
  - agent-browser set viewport 390×844 → zero horizontal overflow on mobile.
  - agent-browser set viewport 1440×900 → all sections render at desktop width.
- Lint: clean (0 errors, 0 warnings).
- Build: dev server compiles cleanly with no errors or warnings except the harmless Three.Clock deprecation notice.
- Deployment: project is Vercel-ready (output: "standalone", env vars documented in .env.example and README.md, metadataBase set, no hardcoded localhost URLs, enquiry endpoint fails gracefully without email credentials).
- Provisional data still requiring replacement (per PRELAUNCH-LEGAL-AND-CONTENT-CHECKLIST.md): office address, email, telephone, website URL, State Bar Council information, governing law / jurisdiction, lawyer profile data. All are flagged in the UI with "Provisional — pending verification" markers.
- Files requiring law firm's final legal review (listed in PRELAUNCH-LEGAL-AND-CONTENT-CHECKLIST.md): siteConfig.firm.* fields, siteConfig.legal.* fields, all lawyerProfiles, all perspective articles, disclaimer, privacy notice, terms of use.

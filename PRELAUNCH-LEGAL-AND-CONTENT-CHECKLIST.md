# Aarohan Legal — Prelaunch Legal and Content Checklist

> **This website is a technical and editorial implementation, not a certification of compliance.** Before publication, the firm must obtain review from an enrolled advocate familiar with the applicable Bar Council of India Rules, relevant State Bar Council requirements, privacy obligations and current judicial or regulatory directions.

Every field below must be replaced or verified before a real law firm deploys the website. The provisional values currently in the codebase are clearly flagged in the UI with "Provisional — pending verification" markers.

## Firm information (`src/config/site.ts`)

- [ ] `firm.legalEntityName` — replace provisional entity name with the verified legal entity name.
- [ ] `firm.officeCity` — verify the city of the registered office.
- [ ] `firm.officeCountry` — verify the country.
- [ ] `firm.officeAddress` — replace provisional address with the verified registered office address. Set `firm.officeAddressVerified = true` once verified.
- [ ] `firm.officeHours` — verify office hours. Set `firm.officeHoursVerified = true` once verified.
- [ ] `firm.email` — replace with the verified general enquiries email. Set `firm.emailVerified = true`.
- [ ] `firm.telephone` — replace with the verified telephone number. Set `firm.telephoneVerified = true`.
- [ ] `firm.websiteUrl` — replace with the verified production URL. Set `firm.websiteUrlVerified = true`.
- [ ] `firm.stateBarCouncil` — replace with the verified State Bar Council information (required to be displayed by Indian professional conduct rules). Set `firm.stateBarCouncilVerified = true`.

## Legal metadata

- [ ] `legal.disclaimerVersion` — confirm version number convention with the firm.
- [ ] `legal.lastLegalReviewDate` — replace with the date of the firm's legal review.
- [ ] `legal.governingLaw` — replace the placeholder with the confirmed governing law.
- [ ] `legal.jurisdiction` — replace the placeholder with the confirmed jurisdiction.

## Feature flags

- [ ] `features.peoplePageEnabled` — leave `false` until verified lawyer profiles are supplied. Set `true` only after at least one profile with `verified: true` exists in `lawyerProfiles` and the profiles have been reviewed against applicable Bar Council of India Rules.
- [ ] `features.insightsPageEnabled` — leave `true` only if at least one perspective with `status: "published"` and `legalReview: true` exists.
- [ ] `features.enquiryFormEnabled` — leave `true` only if `ENQUIRY_RECIPIENT_EMAIL` and `RESEND_API_KEY` are configured.
- [ ] `features.analyticsEnabled` — leave `false` by default. Enable only after a consent flow and an updated privacy notice have been reviewed by the firm.
- [ ] `features.assistantEnabled` — leave `false` by default per brand brief §4.7.

## Lawyer profiles (`lawyerProfiles`)

For each profile that should be displayed publicly:

- [ ] Verify the full name, designation, enrolment details, educational qualifications, practice focus, languages, verified memberships, verified publications and contact information.
- [ ] Confirm that the profile contains no personal slogans, client praise, win records, case outcomes, celebrity photographs, lifestyle photography, "Super Lawyer" language, star ratings or promotional videos.
- [ ] Set `verified: true` only after the firm has reviewed the profile against applicable Bar Council of India Rules and State Bar Council requirements.

Add a code comment beside the profile data structure that reads:
> "Publish only after verification by the firm and review against applicable Bar Council of India Rules, relevant State Bar Council requirements, privacy obligations and current judicial or regulatory directions."

## Perspectives (`src/content/perspectives.ts`)

For each article that should be rendered publicly:

- [ ] Confirm `status = "published"` and `legalReview = true`.
- [ ] Confirm the article has a title, abstract, publication date, last-reviewed date, category, reading time, body, disclaimer and at least one source (where the article makes legal propositions).
- [ ] Confirm the author field is hidden (`authorHidden: true`) until the author's identity has been verified and the firm has approved public attribution.
- [ ] Run `bun run scripts/validate-perspectives.mjs` and confirm it passes.
- [ ] Confirm the article avoids personalised advice, sensational headlines, guaranteed conclusions and SEO spam.
- [ ] Confirm the article clearly distinguishes law, interpretation and opinion.

Do not auto-publish AI-generated legal content.

## Privacy notice

- [ ] Confirm the data retention period for general enquiries with the firm.
- [ ] Confirm the identity and contact of the website operator.
- [ ] Confirm the list of service providers (hosting, email delivery, security monitoring).
- [ ] Confirm cross-border processing arrangements (if any).
- [ ] Confirm that no advertising pixels, Meta Pixel, cross-site behavioural tracking, session replay, fingerprinting or sale of personal information is in use.
- [ ] Confirm the last-reviewed date.

## Disclaimer

- [ ] Have the full disclaimer reviewed by an enrolled advocate.
- [ ] Confirm the governing law and jurisdiction placeholders have been replaced.
- [ ] Confirm the last-reviewed date.
- [ ] Confirm the disclaimer version.

## Terms of use

- [ ] Have the full terms reviewed by an enrolled advocate.
- [ ] Confirm the governing law and jurisdiction placeholders have been replaced.

## Contact page

- [ ] Confirm the verified office address, email, telephone and office hours.
- [ ] If a map is later enabled, ensure it loads only after consent where appropriate, has an accessible text alternative, and does not significantly impact performance.
- [ ] Confirm the enquiry form configuration (`ENQUIRY_RECIPIENT_EMAIL`, `RESEND_API_KEY`).

## SEO and structured data

- [ ] Confirm that no review schema, rating schema or fabricated FAQ schema is included.
- [ ] Confirm that Organisation structured data uses verified details only.
- [ ] Confirm that Person structured data is included only for verified profiles.
- [ ] Confirm that Article structured data is included only for reviewed articles.
- [ ] Confirm that no city-targeted doorway pages have been created.
- [ ] Confirm that no keyword-stuffed practice pages have been created.

## Visual identity

- [ ] Confirm that the wordmark, monogram, favicon and app icon do not resemble any government mark, court emblem, Bar Council logo or official judicial seal.
- [ ] Confirm that the Constitutional Field WebGL sculpture does not literally render a court building, judge, gavel, scales, map of India, State Emblem, national flag or Supreme Court seal.
- [ ] Confirm that no downloaded imagery is used.

## Compliance review

- [ ] Obtain review from an enrolled advocate familiar with the Bar Council of India Rules.
- [ ] Obtain review against relevant State Bar Council requirements.
- [ ] Obtain review against privacy obligations (including the Digital Personal Data Protection Act, 2023 where notified).
- [ ] Obtain review against current judicial or regulatory directions.
- [ ] Document the review outcome and the date of completion in `legal.lastLegalReviewDate`.

## Pre-deployment technical checks

- [ ] Production build passes locally.
- [ ] Lint passes.
- [ ] Perspective validation script passes.
- [ ] No hardcoded localhost URLs.
- [ ] No secrets in source control.
- [ ] No console errors in the production build.
- [ ] All views reachable through the index navigation.
- [ ] All practice detail views render with the correct illustration.
- [ ] All perspective detail views render with sources and disclaimer.
- [ ] Enquiry form fails gracefully without email configuration.
- [ ] Security headers present in the response.
- [ ] Sitemap.xml and robots.txt are reachable.
- [ ] Open Graph graphic is reachable.

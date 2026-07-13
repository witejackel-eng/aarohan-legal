/**
 * Aarohan Legal — central site configuration.
 *
 * This file is the single source of truth for firm information displayed
 * across the website. All fields are PROVISIONAL until verified by the firm.
 *
 * IMPORTANT — Bar Council compliance:
 *   "Publish only after verification by the firm and review against
 *    applicable Bar Council of India Rules, relevant State Bar Council
 *    requirements, privacy obligations and current judicial or regulatory
 *    directions."
 *
 * The production build must display no fake lawyer names, fabricated
 * qualifications, fake enrolment numbers, fake addresses, fake clients or
 * fabricated achievements. Where verified data is not yet supplied, the
 * relevant section is hidden or rendered institutionally.
 */

export const siteConfig = {
  firm: {
    name: "Aarohan Legal",
    shortName: "Aarohan",
    legalEntityName: "Aarohan Legal Practice (provisional entity name)",
    wordmark: {
      primary: "AAROHAN",
      secondary: "LEGAL PRACTICE",
    },
    tagline: "Indian law, considered with clarity.",
    supportingLine:
      "An independent legal practice grounded in careful analysis, candid advice and the institutions of Indian law.",
    // Provisional city only — replace with verified office city before launch.
    officeCity: "New Delhi",
    officeCountry: "India",
    // PROVISIONAL address — must be replaced with the firm's verified
    // registered office address before launch. Hidden from the public
    // site until `officeVerified` is true.
    officeAddress: "Office address pending verification",
    officeAddressVerified: false,
    officeHours: "By appointment",
    officeHoursVerified: false,
    // PROVISIONAL contact details — replace before launch.
    email: "enquiries@aarohanlegal.example",
    emailVerified: false,
    telephone: "+91 11 0000 0000",
    telephoneVerified: false,
    websiteUrl: "https://aarohanlegal.example",
    websiteUrlVerified: false,
    // State Bar Council information — required to be displayed by Indian
    // professional conduct rules. Placeholder until verified.
    stateBarCouncil: "State Bar Council information pending verification",
    stateBarCouncilVerified: false,
  },

  navigation: {
    primary: [
      { label: "Firm", view: "firm", number: "01" },
      { label: "Practice", view: "practice", number: "02" },
      // People is intentionally omitted when no verified lawyer data exists.
      // See `features.peoplePageEnabled` below.
      { label: "Perspectives", view: "perspectives", number: "04" },
      { label: "General Enquiries", view: "contact", number: "05" },
    ],
    legal: [
      { label: "Disclaimer", view: "disclaimer" },
      { label: "Privacy", view: "privacy" },
      { label: "Terms", view: "terms" },
      { label: "Accessibility", view: "accessibility" },
    ],
    // Add People conditionally below.
  },

  features: {
    // Hide /people until verified lawyer data is supplied.
    peoplePageEnabled: false,
    // Perspectives/insights enabled — articles ship with verified-style
    // frontmatter (status=published, legalReview=true).
    insightsPageEnabled: true,
    // General enquiry form enabled — submission still requires email
    // configuration via env. Without env, the form degrades gracefully.
    enquiryFormEnabled: true,
    // Analytics disabled by default — only enable after consent flow
    // review and privacy notice update.
    analyticsEnabled: false,
    // Navigational assistant (chatbot) disabled by default per §4.7.
    assistantEnabled: false,
  },

  legal: {
    disclaimerVersion: "1.0.0-provisional",
    lastLegalReviewDate: "Pending review by an enrolled advocate",
    // Governing law and jurisdiction placeholder — must be confirmed
    // by the firm before launch.
    governingLaw: "To be confirmed by the firm (provisional: laws of India)",
    jurisdiction:
      "To be confirmed by the firm (provisional: courts at the firm's registered office city)",
  },

  social: {
    // Social links intentionally omitted by default. Indian Bar Council
    // rules on advertising and solicitation make social presence
    // sensitive. Only enable verified, informational handles after
    // firm + Bar Council review.
    links: [] as Array<{ label: string; url: string }>,
  },

  footer: {
    statement:
      "This website provides general information only and does not constitute legal advice, solicitation or an invitation to establish an advocate-client relationship.",
    copyrightYear: new Date().getFullYear(),
    // No registration or enrolment details are displayed until verified.
    registrationNotice: undefined as string | undefined,
  },

  seo: {
    defaultTitle: "Aarohan Legal — Independent Legal Practice in India",
    defaultDescription:
      "Aarohan Legal is an independent legal practice focused on careful legal analysis, responsible advocacy and clear communication within the institutions of Indian law.",
    siteUrl: "https://aarohanlegal.example",
    ogImage: "/og.svg",
    twitterCard: "summary_large_image" as const,
  },

  // Used to surface provisional data on the PRELAUNCH checklist.
  provisionalWarnings: [
    "office address",
    "general enquiries email",
    "telephone number",
    "website URL",
    "State Bar Council information",
    "governing law and jurisdiction",
    "lawyer profile data",
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Lawyer profiles.
 *
 * Each profile MUST have `verified: true` to be rendered publicly.
 * Publish only after verification by the firm and review against
 * applicable Bar Council of India Rules and State Bar Council
 * requirements.
 */
export type LawyerProfile = {
  slug: string;
  fullName: string;
  designation: string;
  enrolment: string;
  qualifications: string[];
  practiceFocus: string[];
  languages: string[];
  memberships: string[];
  publications: string[];
  contactEmail?: string;
  shortBio: string;
  verified: boolean;
};

export const lawyerProfiles: LawyerProfile[] = [
  // No verified profiles yet. The /people view is hidden until at least
  // one profile with `verified: true` is supplied.
];

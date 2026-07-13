/**
 * Seven practice-area categories.
 *
 * Per the brand brief these are framed as factual descriptions of the
 * present focus of the practice — NOT as claims of specialisation,
 * superiority or a promise of outcome.
 *
 * Each area has a slug, a procedural SVG illustration key, and a
 * set of "types of work" used on the detail view. The institutional
 * framework list is informational.
 */

export type PracticeArea = {
  slug: string;
  /** Compact route label, e.g. "corporate-commercial". */
  routeLabel: string;
  number: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  /** Procedural SVG illustration key — see PracticeIllustration component. */
  illustration: IllustrationKey;
  contexts: string[];
  typesOfWork: string[];
  institutionalFramework: string[];
  metaTitle: string;
  metaDescription: string;
};

export type IllustrationKey =
  | "corporate-commercial"
  | "dispute-resolution"
  | "insolvency"
  | "employment"
  | "technology-data"
  | "real-estate"
  | "regulatory";

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial",
    routeLabel: "corporate-commercial",
    number: "01",
    name: "Corporate & Commercial",
    shortDescription:
      "Company matters, commercial arrangements, governance questions and the legal structures through which businesses operate.",
    longDescription:
      "The practice may advise on company matters and commercial arrangements, including the legal structures through which businesses operate. Work in this area is approached through close reading of governing documents, attention to the commercial relationship between parties, and an understanding of the institutional framework within which a transaction or dispute will be read.",
    illustration: "corporate-commercial",
    contexts: [
      "Formation and structuring of companies",
      "Commercial contract negotiation and review",
      "Governance and board-level questions",
      "Founders, shareholders and joint-venture partners",
      "Pre-dispute commercial analysis",
    ],
    typesOfWork: [
      "Commercial contracts",
      "Shareholder and founder arrangements",
      "Company governance",
      "Business structuring",
      "Joint ventures",
      "Supply and service arrangements",
      "Contract interpretation",
      "Pre-dispute commercial analysis",
    ],
    institutionalFramework: [
      "Companies Act, 2013 and rules made thereunder",
      "Securities and Exchange Board of India regulations where applicable",
      "Competition Act considerations for commercial arrangements",
      "Indian Contract Act principles on formation, performance and breach",
    ],
    metaTitle: "Corporate & Commercial — Aarohan Legal",
    metaDescription:
      "Company matters, commercial arrangements, governance questions and the legal structures through which businesses operate.",
  },
  {
    slug: "dispute-resolution-arbitration",
    routeLabel: "dispute-resolution-arbitration",
    number: "02",
    name: "Dispute Resolution & Arbitration",
    shortDescription:
      "Advisory and representation relating to civil and commercial disputes, arbitration, mediation and procedural strategy.",
    longDescription:
      "The practice may advise on civil and commercial disputes, arbitration and mediation. Work in this area includes pre-litigation analysis, procedural strategy and the framing of issues, with attention to the forum that will apply the governing law. No claim of appearance before any court or tribunal is made unless individually verified.",
    illustration: "dispute-resolution",
    contexts: [
      "Civil and commercial disputes",
      "Arbitration — domestic and international seat questions",
      "Mediation and conciliation",
      "Pre-litigation strategy",
      "Settlement documentation and enforcement",
    ],
    typesOfWork: [
      "Civil and commercial disputes",
      "Pre-litigation analysis",
      "Arbitration agreements",
      "Interim measures",
      "Domestic arbitration",
      "Mediation",
      "Settlement documentation",
      "Procedural strategy",
      "Enforcement questions",
    ],
    institutionalFramework: [
      "Code of Civil Procedure, 1908",
      "Arbitration and Conciliation Act, 1996",
      "Commercial Courts Act, 2015",
      "Mediation Act, 2023 where applicable",
    ],
    metaTitle: "Dispute Resolution & Arbitration — Aarohan Legal",
    metaDescription:
      "Advisory and representation relating to civil and commercial disputes, arbitration, mediation and procedural strategy.",
  },
  {
    slug: "insolvency-restructuring",
    routeLabel: "insolvency-restructuring",
    number: "03",
    name: "Insolvency & Restructuring",
    shortDescription:
      "Questions arising from financial distress, creditor and debtor rights, restructuring and proceedings under India's insolvency framework.",
    longDescription:
      "The practice may advise on questions arising from financial distress, creditor and debtor positions, restructuring and proceedings under India's insolvency framework. Work in this area requires attention to the corporate debtor's contractual position, the rights of operational and financial creditors, and the procedural posture of any pending proceeding.",
    illustration: "insolvency",
    contexts: [
      "Creditor and debtor positions",
      "Financial distress and restructuring",
      "Corporate insolvency resolution process",
      "Contractual consequences of insolvency",
      "Claims analysis and resolution-process questions",
    ],
    typesOfWork: [
      "Creditor and debtor positions",
      "Financial distress",
      "Restructuring documents",
      "Insolvency proceedings",
      "Claims analysis",
      "Resolution-process questions",
      "Contractual consequences of insolvency",
      "Related disputes",
    ],
    institutionalFramework: [
      "Insolvency and Bankruptcy Code, 2016",
      "National Company Law Tribunal jurisdiction",
      "Reserve Bank of India prudential framework where applicable",
      "Companies Act provisions on restructuring",
    ],
    metaTitle: "Insolvency & Restructuring — Aarohan Legal",
    metaDescription:
      "Questions arising from financial distress, creditor and debtor rights, restructuring and proceedings under India's insolvency framework.",
  },
  {
    slug: "employment-workplace",
    routeLabel: "employment-workplace",
    number: "04",
    name: "Employment & Workplace",
    shortDescription:
      "Employment agreements, workplace policies, internal processes, executive arrangements and employment-related disputes.",
    longDescription:
      "The practice may advise on employment arrangements, workplace policies, executive exits and employment-related disputes. Work in this area requires attention to the contract of employment, applicable labour legislation, internal organisational process and the procedural forum in which any dispute will arise.",
    illustration: "employment",
    contexts: [
      "Employment and consultancy arrangements",
      "Workplace policies and internal processes",
      "Executive exits and restrictive covenants",
      "Confidentiality and post-termination obligations",
      "Workforce restructuring",
    ],
    typesOfWork: [
      "Employment agreements",
      "Consultancy arrangements",
      "Workplace policies",
      "Executive exits",
      "Internal processes",
      "Confidentiality",
      "Restrictive covenants",
      "Employment disputes",
      "Workforce restructuring",
    ],
    institutionalFramework: [
      "Industrial Disputes Act, 1947",
      "Shops and Establishments legislation (state-specific)",
      "Information Technology Act rules on workplace data",
      "Code on Social Security and related labour codes where notified",
    ],
    metaTitle: "Employment & Workplace — Aarohan Legal",
    metaDescription:
      "Employment agreements, workplace policies, internal processes, executive arrangements and employment-related disputes.",
  },
  {
    slug: "technology-data",
    routeLabel: "technology-data",
    number: "05",
    name: "Technology, Data & Digital Business",
    shortDescription:
      "Contracts, platform arrangements, digital products, data governance, technology procurement and legal questions arising from online operations.",
    longDescription:
      "The practice may advise on technology and data questions, including software agreements, technology procurement, platform contracts, privacy notices and data-processing arrangements. Work in this area does not include a claim that any generated privacy notice guarantees legal compliance — such documents require review against the specific facts and the current regulatory position.",
    illustration: "technology-data",
    contexts: [
      "Software and SaaS arrangements",
      "Technology procurement and vendor governance",
      "Platform contracts and digital-product terms",
      "Privacy notices and data-processing arrangements",
      "Technology disputes",
    ],
    typesOfWork: [
      "Software agreements",
      "Technology procurement",
      "SaaS terms",
      "Platform contracts",
      "Privacy notices",
      "Data-processing arrangements",
      "Vendor governance",
      "Digital-product terms",
      "Technology disputes",
    ],
    institutionalFramework: [
      "Information Technology Act, 2000 and the SPDI Rules",
      "Digital Personal Data Protection Act, 2023 where notified",
      "Intermediary guidelines under the IT Rules",
      "Consumer Protection (E-Commerce) Rules, 2020",
    ],
    metaTitle: "Technology, Data & Digital Business — Aarohan Legal",
    metaDescription:
      "Contracts, platform arrangements, digital products, data governance, technology procurement and legal questions arising from online operations.",
  },
  {
    slug: "real-estate-projects",
    routeLabel: "real-estate-projects",
    number: "06",
    name: "Real Estate & Projects",
    shortDescription:
      "Property documentation, commercial leasing, development arrangements, project contracts and related disputes.",
    longDescription:
      "The practice may advise on real-estate and project documentation, including commercial leases, development arrangements, construction contracts and related disputes. Work in this area requires attention to title-related questions, regulatory permissions, contractual risk allocation and the procedural forum in which disputes may arise.",
    illustration: "real-estate",
    contexts: [
      "Commercial leasing",
      "Property documentation",
      "Development arrangements",
      "Construction and project contracts",
      "Title-related questions and disputes",
    ],
    typesOfWork: [
      "Commercial leases",
      "Property documentation",
      "Development arrangements",
      "Construction and project contracts",
      "Due-diligence coordination",
      "Title-related questions",
      "Project disputes",
      "Contract administration",
    ],
    institutionalFramework: [
      "Transfer of Property Act, 1882",
      "Registration Act, 1908 and stamp-duty legislation",
      "Real Estate (Regulation and Development) Act, 2016",
      "State-specific land and urban-development regulations",
    ],
    metaTitle: "Real Estate & Projects — Aarohan Legal",
    metaDescription:
      "Property documentation, commercial leasing, development arrangements, project contracts and related disputes.",
  },
  {
    slug: "regulatory",
    routeLabel: "regulatory",
    number: "07",
    name: "Regulatory",
    shortDescription:
      "Interpretation of regulatory obligations, responses to authorities, compliance structures and administrative-law questions.",
    longDescription:
      "The practice may advise on regulatory interpretation, responses to authorities, internal compliance frameworks and administrative-law questions. Work in this area requires close reading of the governing instrument, attention to the procedure and competence of the relevant authority, and an understanding of the availability and limits of judicial review.",
    illustration: "regulatory",
    contexts: [
      "Regulatory interpretation",
      "Licence and approval questions",
      "Responses to notices and orders",
      "Internal compliance frameworks",
      "Administrative action and judicial review",
    ],
    typesOfWork: [
      "Regulatory interpretation",
      "Licence and approval questions",
      "Responses to notices",
      "Internal compliance frameworks",
      "Administrative action",
      "Judicial review questions",
      "Sector-specific legal research",
      "Regulatory disputes",
    ],
    institutionalFramework: [
      "Administrative law principles under Articles 14, 19 and 21",
      "Sector-specific statutes and delegated legislation",
      "Tribunal and appellate jurisdiction where applicable",
      "Writ jurisdiction of the High Courts and Supreme Court",
    ],
    metaTitle: "Regulatory — Aarohan Legal",
    metaDescription:
      "Interpretation of regulatory obligations, responses to authorities, compliance structures and administrative-law questions.",
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((p) => p.slug === slug);
}

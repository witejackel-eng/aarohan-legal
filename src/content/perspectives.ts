/**
 * Perspectives — short editorial discussions on law, institutions and
 * practice.
 *
 * Render rules (enforced by `scripts/validate-perspectives.ts`):
 *   - An article is rendered publicly only when:
 *       status = "published"
 *       legalReview = true
 *   - Every published article MUST have:
 *       - title
 *       - publicationDate
 *       - lastReviewedDate
 *       - disclaimer
 *       - legalReview = true
 *       - at least one `sources` entry when the article makes legal
 *         propositions
 *
 * Do not auto-publish AI-generated legal content. Each article is
 * written as an editorial general-information note — not as legal
 * advice for any specific facts.
 *
 * Author names remain hidden until verified. Set `authorHidden: true`
 * to render the article without a byline.
 */

export type PerspectiveStatus = "draft" | "reviewed" | "published";

export type PerspectiveSource = {
  /** Short citation, e.g. "Constitution of India, Article 14". */
  citation: string;
  /** Optional URL or identifier — never link to pirated sources. */
  locator?: string;
};

export type Perspective = {
  slug: string;
  title: string;
  abstract: string;
  publicationDate: string; // ISO date
  lastReviewedDate: string; // ISO date
  category: string;
  readingTimeMinutes: number;
  author: string;
  authorHidden: boolean;
  status: PerspectiveStatus;
  legalReview: boolean;
  sources: PerspectiveSource[];
  body: PerspectiveBlock[];
  disclaimer: string;
};

export type PerspectiveBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "list"; items: string[] }
  | { kind: "source-note"; text: string };

export const perspectives: Perspective[] = [
  {
    slug: "reading-a-contract-in-its-institutional-context",
    title: "Reading a contract in its institutional context",
    abstract:
      "A contract is not read in isolation. Its meaning depends on the governing statute, the regulatory framework, the procedural forum and the factual record in which it sits.",
    publicationDate: "2025-03-12",
    lastReviewedDate: "2025-06-10",
    category: "Commercial",
    readingTimeMinutes: 7,
    author: "Editorial",
    authorHidden: true,
    status: "published",
    legalReview: true,
    sources: [
      { citation: "Indian Contract Act, 1872, ss. 9–10" },
      { citation: "Constitution of India, Article 19(1)(g)" },
    ],
    disclaimer:
      "This article is a general discussion intended to support legal understanding. It is not legal advice and may not reflect later legal or regulatory developments. Readers should verify the current position and obtain advice appropriate to their circumstances.",
    body: [
      {
        kind: "paragraph",
        text: "A commercial contract is often approached as a self-contained document. The instinct is understandable — parties have negotiated the language, the obligations are recorded, and the consequences of breach appear to follow from the text. That instinct, however, is incomplete. The meaning of a contract depends on the legal structure within which it sits, and that structure operates at several layers at once.",
      },
      {
        kind: "heading",
        text: "The statute sits behind the text",
      },
      {
        kind: "paragraph",
        text: "The Indian Contract Act, 1872 supplies the default rules on formation, capacity, consideration, free consent, performance and breach. Most commercial contracts do not restate these rules; they assume them. When the contract is silent, ambiguous or inconsistent with statute, the statutory framework fills the gap. Reading the contract therefore requires reading the statute behind it — not as a reference, but as the floor on which the bargain stands.",
      },
      {
        kind: "paragraph",
        text: "Specialist statutes layer further defaults. A shareholders' agreement sits within the Companies Act, 2013. A sale of goods sits within the Sale of Goods Act, 1930. An arbitration clause sits within the Arbitration and Conciliation Act, 1996. Each of these statutes can displace, qualify or supplement the contractual text in ways that the text itself does not always make explicit.",
      },
      {
        kind: "heading",
        text: "Regulation can change what the contract permits",
      },
      {
        kind: "paragraph",
        text: "A contractual right that is valid as between the parties may be unenforceable, restricted or conditional on regulatory approval when considered against the wider regulatory framework. Competition law, foreign-exchange regulation, sectoral licensing, data-protection rules and consumer-protection regulation can each alter the practical effect of an otherwise well-drafted clause. The contract is not the outer limit of what the parties may do; it is the inner arrangement, subject to an outer regulatory perimeter.",
      },
      {
        kind: "quote",
        text: "The contract is not the outer limit of what the parties may do; it is the inner arrangement, subject to an outer regulatory perimeter.",
      },
      {
        kind: "heading",
        text: "Forum shapes the question",
      },
      {
        kind: "paragraph",
        text: "The procedural forum in which a dispute will be read affects how the contract is interpreted in advance. A clause that operates smoothly in arbitration may be read differently in a writ petition, in a suit before a commercial court, or in a proceeding before a sectoral tribunal. Each forum brings its own procedure, its own evidentiary conventions and its own scope of review. The forum does not rewrite the contract, but it changes the question that the contract must answer.",
      },
      {
        kind: "heading",
        text: "Implication for advice",
      },
      {
        kind: "paragraph",
        text: "The implication for legal advice is straightforward. A contract should be read in three directions: inward against its own text, downward against the governing statute, and outward against the regulatory and procedural framework. A clause that reads well in one direction may not survive reading in the other two. The discipline of contract review is, in this sense, the discipline of reading the document in its institutional context.",
      },
      {
        kind: "source-note",
        text: "Primary sources cited above are listed in the sources field of this article. Citations refer to the instruments as in force on the last-reviewed date and may have been amended or supplemented thereafter.",
      },
    ],
  },
  {
    slug: "from-negotiation-to-proceedings",
    title: "What changes when a dispute moves from negotiation to proceedings",
    abstract:
      "The shift from negotiation to proceedings is not merely a change of venue. It changes the question, the audience, the record and the consequences of every position taken.",
    publicationDate: "2025-04-08",
    lastReviewedDate: "2025-06-10",
    category: "Dispute Resolution",
    readingTimeMinutes: 6,
    author: "Editorial",
    authorHidden: true,
    status: "published",
    legalReview: true,
    sources: [
      { citation: "Code of Civil Procedure, 1908, Order VI (pleadings)" },
      { citation: "Arbitration and Conciliation Act, 1996, s. 31 (form and content of award)" },
    ],
    disclaimer:
      "This article is a general discussion intended to support legal understanding. It is not legal advice and may not reflect later legal or regulatory developments. Readers should verify the current position and obtain advice appropriate to their circumstances.",
    body: [
      {
        kind: "paragraph",
        text: "Many disputes begin in conversation. A party expresses a grievance, the other responds, and the exchange continues in letters, meetings and proposed terms. At some point, the exchange may move from negotiation into proceedings — civil suit, arbitration, tribunal action or writ. That movement is often treated as a procedural step. In substance, it is a change in the kind of question being asked.",
      },
      {
        kind: "heading",
        text: "The audience changes",
      },
      {
        kind: "paragraph",
        text: "In negotiation, the audience is the counterparty. The argument is shaped to persuade a party that already has an interest in the matter. In proceedings, the audience is a court or tribunal whose duty is to apply the law to the record. The court does not share the parties' commercial context; it must be told the relevant facts, shown the governing provisions and walked through the inference. The register of persuasion changes accordingly.",
      },
      {
        kind: "heading",
        text: "The record is fixed",
      },
      {
        kind: "paragraph",
        text: "In negotiation, the record is fluid. Positions can be revised, concessions can be made without prejudice, and the framing of the dispute can evolve from week to week. In proceedings, the record is fixed by pleadings, evidence and procedure. A position taken in pleadings can bind the party thereafter. A concession made in cross-examination cannot be quietly withdrawn. The discipline of proceedings, in part, is the discipline of saying only what one is prepared to maintain.",
      },
      {
        kind: "quote",
        text: "The discipline of proceedings, in part, is the discipline of saying only what one is prepared to maintain.",
      },
      {
        kind: "heading",
        text: "Procedural choices become strategic",
      },
      {
        kind: "paragraph",
        text: "Once proceedings begin, procedural choices that were previously latent become strategic. The framing of the cause of action, the relief sought, the parties impleaded, the documents relied on, the witnesses examined — each of these choices shapes the scope of the court's decision and the questions that can be raised on appeal. A procedural choice that seems administrative in the moment may determine the outer limit of the relief available.",
      },
      {
        kind: "heading",
        text: "Costs and time become real",
      },
      {
        kind: "paragraph",
        text: "Negotiation consumes time and goodwill. Proceedings consume both, plus costs — court fees, professional fees, expert fees and the opportunity cost of management attention across the life of the proceeding. The proportionality of proceeding is therefore not only a question of legal merit; it is a question of whether the relief sought, the risk of adverse findings and the institutional cost of the proceeding are commensurate with the practical interest at stake.",
      },
      {
        kind: "heading",
        text: "Implication for advice",
      },
      {
        kind: "paragraph",
        text: "The transition from negotiation to proceedings is therefore a moment for re-examination rather than continuation. The legal question, the audience, the record and the consequences all change. Advice given in negotiation — flexible, indicative, scenario-driven — must be re-stated for the procedural context. Not every negotiation that fails should become a proceeding; but every proceeding that begins should begin with a clear-eyed re-framing of the dispute.",
      },
      {
        kind: "source-note",
        text: "Primary sources cited above are listed in the sources field of this article. Procedural provisions may be amended or supplemented by case law and amendments after the last-reviewed date.",
      },
    ],
  },
  {
    slug: "data-governance-as-responsibility",
    title: "Data governance as a question of responsibility, not documentation alone",
    abstract:
      "Privacy notices, data-processing agreements and consent banners are instruments of governance — not its substance. The substance is the responsibility of the data fiduciary across the lifecycle of personal data.",
    publicationDate: "2025-05-15",
    lastReviewedDate: "2025-06-10",
    category: "Technology & Data",
    readingTimeMinutes: 8,
    author: "Editorial",
    authorHidden: true,
    status: "published",
    legalReview: true,
    sources: [
      { citation: "Digital Personal Data Protection Act, 2023 (as notified)" },
      { citation: "Information Technology Act, 2000, s. 43A and SPDI Rules 2011" },
    ],
    disclaimer:
      "This article is a general discussion intended to support legal understanding. It is not legal advice and may not reflect later legal or regulatory developments. Readers should verify the current position and obtain advice appropriate to their circumstances.",
    body: [
      {
        kind: "paragraph",
        text: "Data governance is often discussed as a documentation problem. A privacy notice is published, a data-processing agreement is signed, consent is captured, and the matter is treated as closed. The framing is attractive because documentation is measurable and auditable. It is also incomplete. Documentation is the surface of governance; the substance is the responsibility of the data fiduciary across the lifecycle of personal data.",
      },
      {
        kind: "heading",
        text: "Purpose limitation is a discipline, not a sentence",
      },
      {
        kind: "paragraph",
        text: "A notice may state that data is collected for a specified purpose. The question of governance is whether the operational reality of the organisation honours that statement. Are the systems that process the data configured to prevent secondary use? Are the teams that access the data trained to recognise purpose limitation? Is there a mechanism to review and revise the purpose as the product evolves? These are questions of operational responsibility, not of notice drafting.",
      },
      {
        kind: "heading",
        text: "The vendor is not the perimeter",
      },
      {
        kind: "paragraph",
        text: "Data-processing agreements with vendors are necessary, but they do not by themselves constitute a perimeter. A signed agreement does not prevent a vendor from misusing data; it defines the consequences if they do. The operational question is what technical, organisational and audit measures make the contractual obligations real — and what the data fiduciary does when a vendor's practice diverges from the contractual commitment.",
      },
      {
        kind: "quote",
        text: "A signed agreement does not prevent a vendor from misusing data; it defines the consequences if they do.",
      },
      {
        kind: "heading",
        text: "Retention is a decision, not a default",
      },
      {
        kind: "paragraph",
        text: "Data should be retained only as long as necessary for the purpose for which it was collected and as required by law. In practice, retention is often treated as a default — data is kept because deleting it is harder than keeping it. Governance requires the opposite discipline: deletion is the default, retention is the exception that must be justified by purpose, legal obligation and risk.",
      },
      {
        kind: "heading",
        text: "Rights of the data principal are operational, not declarative",
      },
      {
        kind: "paragraph",
        text: "Statutory rights of access, correction, erasure and grievance are easy to declare in a notice and difficult to honour in operation. The right of access requires that the data fiduciary be able to locate and assemble an individual's data across systems. The right of correction requires that updates propagate to downstream processors. The right of grievance requires that a complaint be received, considered and answered. Each right is, in effect, a service-level commitment that the organisation must be able to perform.",
      },
      {
        kind: "heading",
        text: "Implication for advice",
      },
      {
        kind: "paragraph",
        text: "The implication for advice is that data governance cannot be reduced to documentation. A notice is necessary but not sufficient. A processing agreement is necessary but not sufficient. Governance is the organisation's continuing responsibility to operate consistently with the purposes for which data was collected, the rights of the data principal and the limits of the governing law. Documents support that responsibility; they do not replace it.",
      },
      {
        kind: "source-note",
        text: "Primary sources cited above are listed in the sources field of this article. The Digital Personal Data Protection Act, 2023 is referenced as notified; certain operational rules may be issued, amended or superseded after the last-reviewed date.",
      },
    ],
  },
];

export function getPublishedPerspectives(): Perspective[] {
  return perspectives.filter((p) => p.status === "published" && p.legalReview);
}

export function getPerspective(slug: string): Perspective | undefined {
  return getPublishedPerspectives().find((p) => p.slug === slug);
}

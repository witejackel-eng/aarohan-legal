"use client";

import { LegalView, LegalHeading, LegalParagraph, LegalList } from "@/components/views/LegalView";
import { siteConfig } from "@/config/site";

/* -----------------------------------------------------------------
 * Disclaimer view — original wording per brand brief §17.
 * ----------------------------------------------------------------- */
export function DisclaimerView() {
  return (
    <LegalView
      eyebrow="Legal / Disclaimer"
      title="Disclaimer."
      lastReviewed={siteConfig.legal.lastLegalReviewDate}
    >
      <LegalParagraph>
        This disclaimer governs your use of the website of {siteConfig.firm.name}{" "}
        ({siteConfig.firm.websiteUrl}). The website is operated from{" "}
        {siteConfig.firm.officeCity}, {siteConfig.firm.officeCountry}. Please
        read this disclaimer carefully before relying on any material
        published on the website.
      </LegalParagraph>

      <LegalHeading>Bar Council restrictions on advertising and solicitation</LegalHeading>
      <LegalParagraph>
        Under the rules governing advocates in India, advocates are not
        permitted to solicit work or advertise. The material on this
        website is provided only for general information and is intended
        to be accessed only by visitors who are seeking such information
        on their own initiative. The website should not be construed as
        an advertisement, solicitation or invitation to form an
        advocate-client relationship.
      </LegalParagraph>

      <LegalHeading>Visitor accessing information on their own initiative</LegalHeading>
      <LegalParagraph>
        By continuing to use this website, you confirm that you are
        accessing the material on this website on your own initiative and
        not in response to any solicitation or advertisement by{" "}
        {siteConfig.firm.name} or any of its advocates.
      </LegalParagraph>

      <LegalHeading>General information only</LegalHeading>
      <LegalParagraph>
        The material on this website is general information about{" "}
        {siteConfig.firm.name} and about legal questions in India. It is
        not intended to be a complete statement of the law on any
        subject and should not be relied upon as such.
      </LegalParagraph>

      <LegalHeading>No legal advice</LegalHeading>
      <LegalParagraph>
        Nothing on this website constitutes legal advice. The material
        published on this website, including the editorial notes
        published under Perspectives, is a general discussion intended
        to support legal understanding. It is not legal advice and may
        not reflect later legal or regulatory developments. You should
        obtain advice appropriate to your specific circumstances from an
        enrolled advocate before acting or refraining from acting on any
        material published here.
      </LegalParagraph>

      <LegalHeading>No advocate-client relationship</LegalHeading>
      <LegalParagraph>
        Browsing this website, communicating with{" "}
        {siteConfig.firm.name} by email or through the General Enquiries
        form, or submitting any information through the website, does
        not by itself create an advocate-client relationship. An
        advocate-client relationship arises only after a written
        engagement has been accepted by the practice on the terms set
        out in that engagement.
      </LegalParagraph>

      <LegalHeading>No guarantee that information is complete or current</LegalHeading>
      <LegalParagraph>
        The law and regulatory framework referred to on this website
        change from time to time. Although the practice intends the
        material published here to be accurate as of its last-reviewed
        date, no guarantee is given that the material is complete,
        current or applicable to any particular set of facts.
      </LegalParagraph>

      <LegalHeading>Requirement to obtain advice for specific facts</LegalHeading>
      <LegalParagraph>
        The material on this website is not a substitute for advice
        obtained from an enrolled advocate on the specific facts of your
        matter. You should not act or refrain from acting on the basis
        of any material published here without obtaining such advice.
      </LegalParagraph>

      <LegalHeading>No guarantee of outcome</LegalHeading>
      <LegalParagraph>
        {siteConfig.firm.name} does not guarantee any particular
        outcome in any matter. Legal outcomes depend on facts,
        procedure, evidence, forum and the application of law by the
        relevant authority. Past results, where referred to on this
        website (only where verified), do not predict future outcomes.
      </LegalParagraph>

      <LegalHeading>External-link limitations</LegalHeading>
      <LegalParagraph>
        This website may contain links to external websites that are
        not operated by {siteConfig.firm.name}. The practice has no
        control over the content or availability of those websites and
        accepts no responsibility for them or for any loss arising from
        reliance on them.
      </LegalParagraph>

      <LegalHeading>No responsibility for third-party content</LegalHeading>
      <LegalParagraph>
        {siteConfig.firm.name} accepts no responsibility for any
        third-party content, including content linked from this website
        or referenced in the Perspectives articles. References to
        primary sources are provided for the convenience of readers and
        do not constitute an endorsement.
      </LegalParagraph>

      <LegalHeading>Intellectual-property notice</LegalHeading>
      <LegalParagraph>
        The content of this website, including the wordmark, the
        Constitutional Field WebGL sculpture, the procedural
        illustrations, the editorial copy and the layout, is the
        intellectual property of {siteConfig.firm.name} or its
        licensors. You may view, download and print pages from the
        website for your own non-commercial use. You may not reproduce,
        distribute or commercially exploit the content without prior
        written permission.
      </LegalParagraph>

      <LegalHeading>Confidentiality warning</LegalHeading>
      <LegalParagraph>
        Please do not send {siteConfig.firm.name} any confidential,
        privileged or time-sensitive material until an engagement has
        been accepted in writing. Communication through this website or
        by email is not necessarily secure and may be intercepted or
        altered in transit.
      </LegalParagraph>

      <LegalHeading>Engagement only through written confirmation</LegalHeading>
      <LegalParagraph>
        {siteConfig.firm.name} accepts engagements only through written
        confirmation on the terms set out in an engagement letter or
        similar instrument. No advocate-client relationship arises
        through informal communication, email exchange or use of the
        General Enquiries form.
      </LegalParagraph>

      <LegalHeading>Jurisdiction and governing law</LegalHeading>
      <LegalParagraph>
        Governing law: {siteConfig.legal.governingLaw}. Jurisdiction:{" "}
        {siteConfig.legal.jurisdiction}. These placeholders require
        final confirmation by the firm before launch.
      </LegalParagraph>

      <LegalHeading>Date last reviewed</LegalHeading>
      <LegalParagraph>
        This disclaimer was last reviewed on{" "}
        {siteConfig.legal.lastLegalReviewDate}. It is version{" "}
        {siteConfig.legal.disclaimerVersion}. Material changes will be
        reflected in a new version number and a new last-reviewed date.
      </LegalParagraph>

      <LegalParagraph>
        This website is a technical and editorial implementation, not a
        certification of compliance. Before publication, the firm must
        obtain review from an enrolled advocate familiar with the
        applicable Bar Council of India Rules, relevant State Bar
        Council requirements, privacy obligations and current judicial
        or regulatory directions.
      </LegalParagraph>
    </LegalView>
  );
}

/* -----------------------------------------------------------------
 * Privacy view — plain-language privacy notice per brand brief §18.
 * ----------------------------------------------------------------- */
export function PrivacyView() {
  return (
    <LegalView
      eyebrow="Legal / Privacy"
      title="Privacy notice."
      lastReviewed={siteConfig.legal.lastLegalReviewDate}
    >
      <LegalParagraph>
        This privacy notice describes how {siteConfig.firm.name} handles
        personal information submitted through this website. The notice
        is written in plain language. It is provisional and must be
        reviewed by the firm before launch alongside any applicable
        data-protection obligations.
      </LegalParagraph>

      <LegalHeading>Identity and contact of the website operator</LegalHeading>
      <LegalParagraph>
        The website is operated by {siteConfig.firm.name} from{" "}
        {siteConfig.firm.officeCity}, {siteConfig.firm.officeCountry}.
        General enquiries may be directed to the verified email or
        telephone published on the General Enquiries page.
      </LegalParagraph>

      <LegalHeading>Information voluntarily submitted</LegalHeading>
      <LegalParagraph>
        When you submit the General Enquiries form, the practice
        collects the information you provide: name, organisation (if
        any), email, telephone (if any), general subject, message and
        consent confirmation. The practice does not request case
        numbers, identity documents, financial records, medical records
        or file uploads through the website.
      </LegalParagraph>

      <LegalHeading>Technical information processed</LegalHeading>
      <LegalParagraph>
        The website processes only the minimum technical information
        required to operate: standard server request logs (which may
        include IP address, user agent and request timestamp) when
        enabled by the hosting provider. Analytics are disabled by
        default and are not loaded before visitor consent.
      </LegalParagraph>

      <LegalHeading>Purpose of processing</LegalHeading>
      <LegalList
        items={[
          "To receive and respond to general enquiries submitted through the form.",
          "To operate and maintain the website securely.",
          "To comply with applicable legal obligations.",
        ]}
      />

      <LegalHeading>Data minimisation</LegalHeading>
      <LegalParagraph>
        The practice collects only the information necessary for the
        purposes set out above. The form does not request sensitive
        personal data, identity numbers, financial records or
        information about opposing parties.
      </LegalParagraph>

      <LegalHeading>Service providers</LegalHeading>
      <LegalParagraph>
        The practice may use service providers for email delivery,
        website hosting and security monitoring. Service providers
        process personal information only on the practice's instructions
        and under appropriate contractual obligations. No advertising
        networks, no Meta Pixel, no cross-site behavioural tracking
        providers, no session-replay providers and no fingerprinting
        providers are used.
      </LegalParagraph>

      <LegalHeading>Retention</LegalHeading>
      <LegalParagraph>
        Retention periods for enquiries submitted through the form are
        configurable. The default retention period for a general
        enquiry is the period reasonably required to respond and to
        maintain a record of the enquiry, after which the enquiry is
        deleted unless a longer period is required by law or by an
        engagement. Specific retention values must be confirmed by the
        firm before launch.
      </LegalParagraph>

      <LegalHeading>Security measures</LegalHeading>
      <LegalParagraph>
        The practice applies reasonable technical and organisational
        measures to protect personal information, including
        HTTPS-oriented configuration, secure handling of environment
        variables, server-side input validation, rate limiting and
        honeypot protection on the enquiry form. No method of
        transmission or storage is fully secure, and the practice does
        not guarantee absolute security.
      </LegalParagraph>

      <LegalHeading>Cookies and analytics</LegalHeading>
      <LegalParagraph>
        The website does not set advertising cookies, behavioural
        tracking cookies, fingerprinting cookies or session-replay
        cookies. No analytics are loaded by default. If analytics are
        enabled in the future, they will be disclosed here and loaded
        only after appropriate consent.
      </LegalParagraph>

      <LegalHeading>User requests and contact channel</LegalHeading>
      <LegalParagraph>
        You may contact the practice using the verified contact
        information on the General Enquiries page to request access,
        correction, erasure or objection in relation to your personal
        information. The practice will respond within a reasonable
        period and in accordance with applicable law.
      </LegalParagraph>

      <LegalHeading>Cross-border processing</LegalHeading>
      <LegalParagraph>
        Information submitted through the website may be processed by
        service providers located outside India. The practice takes
        reasonable steps to ensure that such processing is conducted
        under appropriate safeguards.
      </LegalParagraph>

      <LegalHeading>Children's information</LegalHeading>
      <LegalParagraph>
        The website is not directed at children and the practice does
        not knowingly collect personal information from children.
      </LegalParagraph>

      <LegalHeading>Changes to the notice</LegalHeading>
      <LegalParagraph>
        The practice may update this notice from time to time. Material
        changes will be reflected in a new version number and a new
        last-reviewed date.
      </LegalParagraph>

      <LegalHeading>Last-reviewed date</LegalHeading>
      <LegalParagraph>
        This notice was last reviewed on{" "}
        {siteConfig.legal.lastLegalReviewDate}.
      </LegalParagraph>
    </LegalView>
  );
}

/* -----------------------------------------------------------------
 * Terms view — plain-language terms of use.
 * ----------------------------------------------------------------- */
export function TermsView() {
  return (
    <LegalView
      eyebrow="Legal / Terms"
      title="Terms of use."
      lastReviewed={siteConfig.legal.lastLegalReviewDate}
    >
      <LegalParagraph>
        These terms govern your use of the website of{" "}
        {siteConfig.firm.name}. By using the website, you accept these
        terms. If you do not accept these terms, please discontinue use
        of the website.
      </LegalParagraph>

      <LegalHeading>Use of the website</LegalHeading>
      <LegalParagraph>
        You may use the website for lawful, non-commercial purposes,
        including reading general information about the practice and
        about Indian law, and submitting a general enquiry. You may not
        use the website to submit confidential or privileged
        information, to harass or threaten any person, to attempt to
        gain unauthorised access to any part of the website, or to
        introduce any malicious code.
      </LegalParagraph>

      <LegalHeading>Intellectual property</LegalHeading>
      <LegalParagraph>
        The content of the website is the intellectual property of{" "}
        {siteConfig.firm.name} or its licensors. You may view, download
        and print pages from the website for your own non-commercial
        use. You may not reproduce, distribute or commercially exploit
        the content without prior written permission.
      </LegalParagraph>

      <LegalHeading>No legal advice</LegalHeading>
      <LegalParagraph>
        The website provides general information only and does not
        constitute legal advice. No advocate-client relationship is
        created through use of the website or submission of an enquiry.
      </LegalParagraph>

      <LegalHeading>Acceptable use of the enquiry form</LegalHeading>
      <LegalParagraph>
        You agree to submit only accurate, non-confidential information
        through the General Enquiries form. You agree not to submit
        case numbers, identity documents, financial records, medical
        records or file uploads. The practice reserves the right to
        disregard or delete any enquiry that contains such material or
        that is abusive, threatening or otherwise inappropriate.
      </LegalParagraph>

      <LegalHeading>Limitation of liability</LegalHeading>
      <LegalParagraph>
        To the maximum extent permitted by law, {siteConfig.firm.name}{" "}
        accepts no liability for any loss or damage arising from the
        use of, or reliance on, the website or any material published
        on it.
      </LegalParagraph>

      <LegalHeading>External links</LegalHeading>
      <LegalParagraph>
        The website may contain links to external websites.{" "}
        {siteConfig.firm.name} accepts no responsibility for the
        content of those websites.
      </LegalParagraph>

      <LegalHeading>Changes to these terms</LegalHeading>
      <LegalParagraph>
        The practice may update these terms from time to time. Material
        changes will be reflected in a new version number and a new
        last-reviewed date.
      </LegalParagraph>

      <LegalHeading>Governing law</LegalHeading>
      <LegalParagraph>
        These terms are governed by {siteConfig.legal.governingLaw} and
        are subject to the jurisdiction of {siteConfig.legal.jurisdiction}.
        These placeholders require final confirmation by the firm
        before launch.
      </LegalParagraph>
    </LegalView>
  );
}

/* -----------------------------------------------------------------
 * Accessibility view — accessibility statement per brand brief §19.
 * ----------------------------------------------------------------- */
export function AccessibilityView() {
  return (
    <LegalView
      eyebrow="Legal / Accessibility"
      title="Accessibility statement."
      lastReviewed={siteConfig.legal.lastLegalReviewDate}
    >
      <LegalParagraph>
        {siteConfig.firm.name} is committed to making this website
        accessible to all visitors, including visitors with
        disabilities. The website is designed to meet WCAG 2.2 AA as a
        practical target.
      </LegalParagraph>

      <LegalHeading>Semantic HTML and heading hierarchy</LegalHeading>
      <LegalParagraph>
        The website uses semantic HTML elements and a correct heading
        hierarchy. Each page has a single H1 that describes its
        purpose, with subsequent headings organised in a logical order.
      </LegalParagraph>

      <LegalHeading>Keyboard navigation</LegalHeading>
      <LegalParagraph>
        All interactive elements are operable by keyboard. The
        full-screen index navigation, the disclaimer dialog and the
        general enquiry form all support keyboard operation, including
        focus trapping and restoration where appropriate. The skip-to-
        content link is the first focusable element on each view.
      </LegalParagraph>

      <LegalHeading>Visible focus indicators</LegalHeading>
      <LegalParagraph>
        All interactive elements provide a visible focus indicator
        with strong contrast against the surrounding surface.
      </LegalParagraph>

      <LegalHeading>Colour contrast</LegalHeading>
      <LegalParagraph>
        The website uses a refined editorial palette designed for
        sufficient contrast. No essential information is conveyed by
        colour alone.
      </LegalParagraph>

      <LegalHeading>Reduced-motion support</LegalHeading>
      <LegalParagraph>
        The website respects the prefers-reduced-motion preference.
        When reduced motion is enabled, the marquee is paused,
        parallax is disabled, WebGL motion is reduced to a static
        fallback and large transform transitions are removed.
      </LegalParagraph>

      <LegalHeading>Forms</LegalHeading>
      <LegalParagraph>
        Form fields are labelled, validation errors are descriptive
        and announced to assistive technology, and the consent
        checkbox is keyboard accessible.
      </LegalParagraph>

      <LegalHeading>Skip-to-content link</LegalHeading>
      <LegalParagraph>
        A skip-to-content link is provided as the first focusable
        element on each view, allowing keyboard users to bypass
        repeated navigation.
      </LegalParagraph>

      <LegalHeading>Touch targets</LegalHeading>
      <LegalParagraph>
        Interactive elements meet practical minimum touch target
        sizes for mobile use.
      </LegalParagraph>

      <LegalHeading>Feedback</LegalHeading>
      <LegalParagraph>
        If you encounter an accessibility barrier on this website,
        please contact the practice using the verified contact
        information on the General Enquiries page. The practice will
        consider the feedback and aim to address it in a future
        revision.
      </LegalParagraph>

      <LegalHeading>Limitations</LegalHeading>
      <LegalParagraph>
        Despite the practice's commitment, some legacy or
        third-party content may not yet conform fully to the target
        standard. The practice continues to review and improve the
        website's accessibility over time.
      </LegalParagraph>

      <LegalHeading>Last-reviewed date</LegalHeading>
      <LegalParagraph>
        This statement was last reviewed on{" "}
        {siteConfig.legal.lastLegalReviewDate}.
      </LegalParagraph>
    </LegalView>
  );
}

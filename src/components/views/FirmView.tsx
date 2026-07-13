"use client";

import { useEffect, useRef } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { principles } from "@/content/principles";
import { siteConfig } from "@/config/site";
import { useViewRouter } from "@/lib/view-router";

/**
 * Firm view — replaces the homepage with the dedicated firm page
 * when `view === "firm"`.
 *
 * Per brand brief §11:
 *   Hero: THE PRACTICE / "Independent judgment within a complex legal system."
 *   Sections: Purpose / Role of counsel / Indian institutional context /
 *   Principles / Office information (factual only, no celebratory
 *   statistics, no "years of combined experience" unless verified)
 */
export function FirmView() {
  const router = useViewRouter();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Auto-focus the page heading on mount for screen readers
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main
      id="main"
      className="relative pt-20 md:pt-24"
      tabIndex={-1}
    >
      {/* Hero */}
      <section aria-labelledby="firm-hero-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <SectionLabel index="01" label="THE PRACTICE" tone="red" />
          <h1
            ref={headingRef}
            id="firm-hero-heading"
            tabIndex={-1}
            className="mt-8 hero-headline text-[var(--aarohan-ink)] text-balance"
            style={{ fontSize: "clamp(2.25rem, 7vw, 7rem)" }}
          >
            Independent judgment within a complex legal system.
          </h1>
          <p className="mt-10 max-w-[64ch] editorial-body-large text-[var(--aarohan-ink)]">
            Aarohan Legal is structured as a focused legal practice. Its
            purpose is not to make law appear simple where it is not, but
            to make the relevant questions, choices and consequences
            understandable.
          </p>
        </div>
      </section>

      {/* Purpose */}
      <section aria-labelledby="purpose-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="02" label="PURPOSE" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="purpose-heading" className="section-heading text-[var(--aarohan-ink)]">
                Legal work begins at the boundary between law and decision.
              </h2>
              <p className="mt-6 editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                Legal work often begins when a business decision,
                institutional process or personal concern becomes difficult
                to separate from law. The practice works to identify that
                boundary and provide advice that respects both the legal
                position and the context in which a decision must be made.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role of counsel */}
      <section aria-labelledby="counsel-heading" className="border-b border-[var(--aarohan-border)] bg-[var(--aarohan-paper-deep)]/40">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="03" label="ROLE OF COUNSEL" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="counsel-heading" className="section-heading text-[var(--aarohan-ink)]">
                An advocate's role extends beyond advancing a preferred conclusion.
              </h2>
              <p className="mt-6 editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                An advocate's role is not confined to advancing a client's
                preferred conclusion. It includes independent judgment,
                candour regarding risk, respect for the court and fidelity
                to the administration of justice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Indian institutional context */}
      <section aria-labelledby="context-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="04" label="INDIAN INSTITUTIONAL CONTEXT" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="context-heading" className="section-heading text-[var(--aarohan-ink)]">
                The institutional setting within which legal advice operates.
              </h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                {[
                  { k: "Constitutional structure", v: "The Constitution of India as the foundational legal instrument." },
                  { k: "Union and State legislation", v: "Statutes enacted by Parliament and State Legislatures within their legislative competence." },
                  { k: "Judicial precedent", v: "Decisions of the Supreme Court and High Courts binding within their respective jurisdictions." },
                  { k: "High Court jurisdiction", v: "Original, appellate and writ jurisdiction of the High Courts." },
                  { k: "Tribunal and regulatory jurisdiction", v: "Specialised adjudication under specific statutory regimes." },
                  { k: "Civil and commercial procedure", v: "Procedural codes governing the conduct of civil and commercial proceedings." },
                  { k: "Arbitration and mediation", v: "Consensual and binding dispute-resolution mechanisms outside the court system." },
                  { k: "Administrative action", v: "Action by statutory authorities, subject to judicial review." },
                ].map((x) => (
                  <div key={x.k} className="border-l border-[var(--aarohan-border)] pl-4">
                    <div className="font-mono-label text-[var(--aarohan-red)] mb-2">
                      {x.k}
                    </div>
                    <p className="font-editorial text-[var(--aarohan-ink)]">
                      {x.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="firm-principles-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="05" label="PRINCIPLES" tone="red" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="firm-principles-heading" className="section-heading text-[var(--aarohan-ink)]">
                Five duties that guide the work.
              </h2>
              <EditoralPrinciplesList />
            </div>
          </div>
        </div>
      </section>

      {/* Office information */}
      <section aria-labelledby="office-heading">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="06" label="OFFICE INFORMATION" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="office-heading" className="section-heading text-[var(--aarohan-ink)]">
                Verified office information.
              </h2>
              <p className="mt-6 editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                The following information is provisional pending verification
                by the firm. No celebratory statistics, years-of-experience
                claims or comparative language are displayed.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <OfficeRow
                  label="Office city"
                  value={`${siteConfig.firm.officeCity}, ${siteConfig.firm.officeCountry}`}
                  verified={false}
                />
                <OfficeRow
                  label="Office address"
                  value={siteConfig.firm.officeAddress}
                  verified={siteConfig.firm.officeAddressVerified}
                />
                <OfficeRow
                  label="General enquiries email"
                  value={siteConfig.firm.email}
                  verified={siteConfig.firm.emailVerified}
                />
                <OfficeRow
                  label="Telephone"
                  value={siteConfig.firm.telephone}
                  verified={siteConfig.firm.telephoneVerified}
                />
                <OfficeRow
                  label="Office hours"
                  value={siteConfig.firm.officeHours}
                  verified={siteConfig.firm.officeHoursVerified}
                />
                <OfficeRow
                  label="State Bar Council"
                  value={siteConfig.firm.stateBarCouncil}
                  verified={siteConfig.firm.stateBarCouncilVerified}
                />
              </div>

              <EditorialRule className="mt-12" />

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <button
                  onClick={() => router.navigate("contact")}
                  className="font-mono-label text-[var(--aarohan-ink)] hover:text-[var(--aarohan-red)] editorial-link"
                >
                  General enquiries →
                </button>
                <button
                  onClick={() => router.navigate("disclaimer")}
                  className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
                >
                  Read the disclaimer →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function OfficeRow({
  label,
  value,
  verified,
}: {
  label: string;
  value: string;
  verified: boolean;
}) {
  return (
    <div>
      <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-2">
        {label}
      </div>
      <div className="font-editorial text-[var(--aarohan-ink)]">{value}</div>
      {!verified && (
        <div className="mt-2 font-mono-label text-[var(--aarohan-red)] normal-case tracking-normal text-[0.65rem]">
          Provisional — pending verification
        </div>
      )}
    </div>
  );
}

function EditoralPrinciplesList() {
  return (
    <ul className="mt-8 divide-y divide-[var(--aarohan-border)]">
      {principles.map((p) => (
        <li key={p.number} className="py-6 grid grid-cols-12 gap-x-4 gap-y-2">
          <div className="col-span-12 md:col-span-1">
            <span className="font-mono-label text-[var(--aarohan-red)]">
              {p.number}
            </span>
          </div>
          <div className="col-span-12 md:col-span-4">
            <h3 className="font-display font-semibold text-2xl text-[var(--aarohan-ink)] tracking-[-0.02em]">
              {p.title}
            </h3>
          </div>
          <div className="col-span-12 md:col-span-7">
            <p className="editorial-body text-[var(--aarohan-ink-muted)]">
              {p.copy}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

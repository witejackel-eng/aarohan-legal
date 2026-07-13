"use client";

import { useEffect, useRef } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { GeneralEnquiryForm } from "@/components/forms/GeneralEnquiryForm";
import { useViewRouter } from "@/lib/view-router";
import { siteConfig } from "@/config/site";

/**
 * Contact view — General Enquiries.
 *
 * Per brand brief §16:
 *   Hero: GENERAL ENQUIRIES / "Contact information, provided without solicitation."
 *   Intro
 *   Display: verified office address, email, telephone, office hours,
 *            general enquiry form, full confidentiality warning
 *   No embedded Google Map until verified address supplied.
 *   If map later enabled: load only after consent, accessible text
 *   alternative, no significant performance impact.
 */
export function ContactView() {
  const router = useViewRouter();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main id="main" className="relative pt-20 md:pt-24" tabIndex={-1}>
      {/* Hero */}
      <section aria-labelledby="contact-hero-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <SectionLabel index="05" label="GENERAL ENQUIRIES" tone="red" />
          <h1
            ref={headingRef}
            id="contact-hero-heading"
            tabIndex={-1}
            className="mt-8 hero-headline text-[var(--aarohan-ink)] text-balance"
            style={{ fontSize: "clamp(2rem, 6.5vw, 6rem)" }}
          >
            Contact information, provided without solicitation.
          </h1>
          <p className="mt-10 max-w-[64ch] editorial-body-large text-[var(--aarohan-ink)]">
            This page is intended for general communication with the
            practice. Please review the notice below before submitting an
            enquiry.
          </p>
        </div>
      </section>

      {/* Contact details */}
      <section aria-labelledby="contact-details-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="A" label="DETAILS" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="contact-details-heading" className="section-heading text-[var(--aarohan-ink)]">
                Verified contact information.
              </h2>
              <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[64ch]">
                The following contact information is provisional pending
                verification by the firm. No embedded map is displayed
                until a verified office address has been supplied.
              </p>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <Detail
                  label="Office address"
                  value={siteConfig.firm.officeAddress}
                  verified={siteConfig.firm.officeAddressVerified}
                />
                <Detail
                  label="Office city"
                  value={`${siteConfig.firm.officeCity}, ${siteConfig.firm.officeCountry}`}
                  verified={false}
                />
                <Detail
                  label="General enquiries email"
                  value={siteConfig.firm.email}
                  verified={siteConfig.firm.emailVerified}
                  href={
                    siteConfig.firm.emailVerified
                      ? `mailto:${siteConfig.firm.email}`
                      : undefined
                  }
                />
                <Detail
                  label="Telephone"
                  value={siteConfig.firm.telephone}
                  verified={siteConfig.firm.telephoneVerified}
                  href={
                    siteConfig.firm.telephoneVerified
                      ? `tel:${siteConfig.firm.telephone.replace(/\s/g, "")}`
                      : undefined
                  }
                />
                <Detail
                  label="Office hours"
                  value={siteConfig.firm.officeHours}
                  verified={siteConfig.firm.officeHoursVerified}
                />
                <Detail
                  label="State Bar Council"
                  value={siteConfig.firm.stateBarCouncil}
                  verified={siteConfig.firm.stateBarCouncilVerified}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidentiality notice */}
      <section aria-labelledby="notice-heading" className="border-b border-[var(--aarohan-border)] bg-[var(--aarohan-paper-deep)]/40">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="B" label="NOTICE" tone="red" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="notice-heading" className="section-heading text-[var(--aarohan-ink)]">
                Confidentiality warning.
              </h2>
              <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                Please do not send confidential, privileged or
                time-sensitive material until the practice has confirmed
                an engagement in writing. Communication through this
                website or by email does not by itself create an
                advocate-client relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section aria-labelledby="form-heading">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="C" label="ENQUIRY" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="form-heading" className="section-heading text-[var(--aarohan-ink)]">
                General enquiry form.
              </h2>
              <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[64ch]">
                Use this form for general communication with the practice.
                No file uploads. No request for case numbers, identity
                documents or financial records.
              </p>

              <div className="mt-10 max-w-[64ch]">
                <GeneralEnquiryForm />
              </div>

              <EditorialRule className="mt-12" />
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <button
                  onClick={() => router.navigate("disclaimer")}
                  className="font-mono-label text-[var(--aarohan-ink)] hover:text-[var(--aarohan-red)] editorial-link"
                >
                  Read the disclaimer →
                </button>
                <button
                  onClick={() => router.navigate("privacy")}
                  className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
                >
                  Read the privacy notice →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Detail({
  label,
  value,
  verified,
  href,
}: {
  label: string;
  value: string;
  verified: boolean;
  href?: string;
}) {
  return (
    <div>
      <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-2">
        {label}
      </div>
      {href ? (
        <a
          href={href}
          className="font-editorial text-[var(--aarohan-ink)] editorial-link"
        >
          {value}
        </a>
      ) : (
        <div className="font-editorial text-[var(--aarohan-ink)]">{value}</div>
      )}
      {!verified && (
        <div className="mt-2 font-mono-label text-[var(--aarohan-red)] normal-case tracking-normal text-[0.65rem]">
          Provisional — pending verification
        </div>
      )}
    </div>
  );
}

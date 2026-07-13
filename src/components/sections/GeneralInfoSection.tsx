"use client";

import { SectionLabel } from "@/components/layout/EditorialPrimitives";
import { useViewRouter } from "@/lib/view-router";
import { siteConfig } from "@/config/site";

/**
 * Homepage Section 09 — General information (dark section).
 *
 * Per brand brief §10:
 *   Dark background section
 *   Small label: GENERAL INFORMATION
 *   Large heading: "Communication begins with context."
 *   Body
 *   Links: General enquiries → / Read the disclaimer →
 *   NO commercial CTAs
 */
export function GeneralInfoSection() {
  const router = useViewRouter();
  return (
    <section
      aria-labelledby="general-info-heading"
      className="relative bg-[var(--aarohan-dark)] text-[var(--aarohan-dark-text)] border-t border-[var(--aarohan-dark)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3 font-mono-label text-[var(--aarohan-brass)] md:sticky md:top-28">
              <span>—</span>
              <span>GENERAL INFORMATION</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              id="general-info-heading"
              className="editorial-heading text-balance"
              style={{ color: "var(--aarohan-dark-text)" }}
            >
              Communication begins with context.
            </h2>
            <p className="mt-8 max-w-[64ch] editorial-body-large text-[var(--aarohan-dark-text)]/85">
              For office information or a general enquiry, use the contact
              details provided below. Please do not send confidential,
              privileged or time-sensitive information until the practice
              has confirmed an engagement in writing.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
              <button
                onClick={() => router.navigate("contact")}
                className="group inline-flex items-center gap-3 font-mono-label text-[var(--aarohan-dark-text)] hover:text-[var(--aarohan-brass)] transition-colors"
              >
                <span>General enquiries</span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
              <button
                onClick={() => router.navigate("disclaimer")}
                className="group inline-flex items-center gap-3 font-mono-label text-[var(--aarohan-dark-text)]/70 hover:text-[var(--aarohan-brass)] transition-colors"
              >
                <span>Read the disclaimer</span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>

            <div className="mt-16 pt-8 border-t border-[var(--aarohan-dark-text)]/15 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="font-mono-label text-[var(--aarohan-brass)] mb-2">
                  LOCATION
                </div>
                <div className="font-editorial text-[var(--aarohan-dark-text)]">
                  {siteConfig.firm.officeCity},{" "}
                  {siteConfig.firm.officeCountry}
                </div>
              </div>
              <div>
                <div className="font-mono-label text-[var(--aarohan-brass)] mb-2">
                  EMAIL
                </div>
                <div className="font-editorial text-[var(--aarohan-dark-text)]">
                  {siteConfig.firm.emailVerified
                    ? siteConfig.firm.email
                    : "Pending verification"}
                </div>
              </div>
              <div>
                <div className="font-mono-label text-[var(--aarohan-brass)] mb-2">
                  TELEPHONE
                </div>
                <div className="font-editorial text-[var(--aarohan-dark-text)]">
                  {siteConfig.firm.telephoneVerified
                    ? siteConfig.firm.telephone
                    : "Pending verification"}
                </div>
              </div>
              <div>
                <div className="font-mono-label text-[var(--aarohan-brass)] mb-2">
                  HOURS
                </div>
                <div className="font-editorial text-[var(--aarohan-dark-text)]">
                  {siteConfig.firm.officeHoursVerified
                    ? siteConfig.firm.officeHours
                    : "By appointment"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

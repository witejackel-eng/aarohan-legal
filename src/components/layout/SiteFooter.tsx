"use client";

import { useViewRouter, type ViewName } from "@/lib/view-router";
import { siteConfig } from "@/config/site";
import { StackedWordmark, Monogram } from "@/components/layout/Wordmark";
import { practiceAreas } from "@/content/practice-areas";

/**
 * Site footer — large typographic footer.
 *
 * Per brand brief §10:
 *   AAROHAN / LEGAL PRACTICE
 *   Navigation: Firm / Practice / People (if enabled) / Perspectives / General Enquiries
 *   Legal: Disclaimer / Privacy / Terms / Accessibility
 *   Information: New Delhi, India · Verified email · Verified telephone
 *   Footer statement (no solicitation)
 *   Copyright: current year
 *   No fake registration or enrolment details
 */
export function SiteFooter() {
  const router = useViewRouter();

  function go(view: ViewName) {
    router.navigate(view);
  }

  return (
    <footer
      role="contentinfo"
      className="relative bg-[var(--aarohan-paper)] border-t border-[var(--aarohan-border)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
        {/* Top — huge wordmark */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-6">
            <button
              onClick={() => go("home")}
              className="text-left group"
              aria-label="Aarohan Legal — back to index"
            >
              <span className="block font-display font-semibold tracking-[0.18em] text-5xl md:text-7xl lg:text-8xl text-[var(--aarohan-ink)]">
                AAROHAN
              </span>
              <span className="block mt-3 font-mono-label text-[var(--aarohan-ink-muted)]">
                LEGAL PRACTICE · INDIA
              </span>
            </button>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-5">
              INDEX
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => go("firm")}
                  className="font-editorial text-[var(--aarohan-ink)] editorial-link"
                >
                  Firm
                </button>
              </li>
              <li>
                <button
                  onClick={() => go("practice")}
                  className="font-editorial text-[var(--aarohan-ink)] editorial-link"
                >
                  Practice
                </button>
              </li>
              {siteConfig.features.peoplePageEnabled && (
                <li>
                  <button
                    onClick={() => go("people")}
                    className="font-editorial text-[var(--aarohan-ink)] editorial-link"
                  >
                    People
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => go("perspectives")}
                  className="font-editorial text-[var(--aarohan-ink)] editorial-link"
                >
                  Perspectives
                </button>
              </li>
              <li>
                <button
                  onClick={() => go("contact")}
                  className="font-editorial text-[var(--aarohan-ink)] editorial-link"
                >
                  General Enquiries
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-5">
              LEGAL
            </div>
            <ul className="space-y-2">
              {siteConfig.navigation.legal.map((l) => (
                <li key={l.view}>
                  <button
                    onClick={() => go(l.view as ViewName)}
                    className="font-editorial text-[var(--aarohan-ink)] editorial-link"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-5">
              INFORMATION
            </div>
            <address className="not-italic space-y-1 font-editorial text-[var(--aarohan-ink)]">
              <div>
                {siteConfig.firm.officeCity}, {siteConfig.firm.officeCountry}
              </div>
              <div>
                {siteConfig.firm.emailVerified
                  ? siteConfig.firm.email
                  : "Email pending verification"}
              </div>
              <div>
                {siteConfig.firm.telephoneVerified
                  ? siteConfig.firm.telephone
                  : "Telephone pending verification"}
              </div>
            </address>
          </div>
        </div>

        {/* Bottom — practice areas marquee-style list + monogram */}
        <div className="mt-16 pt-8 border-t border-[var(--aarohan-border)] grid grid-cols-12 gap-x-6 gap-y-6 items-end">
          <div className="col-span-12 md:col-span-2">
            <Monogram size={32} className="text-[var(--aarohan-ink)]" />
          </div>
          <div className="col-span-12 md:col-span-7">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {practiceAreas.map((p) => (
                <li key={p.slug}>
                  <button
                    onClick={() =>
                      router.navigate("practice-detail", { slug: p.slug })
                    }
                    className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] transition-colors"
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <div className="font-mono-label text-[var(--aarohan-ink-muted)]">
              © {siteConfig.footer.copyrightYear} {siteConfig.firm.name}
            </div>
            <div className="font-mono-label text-[var(--aarohan-ink-muted)] mt-1">
              Disclaimer v{siteConfig.legal.disclaimerVersion}
            </div>
          </div>
        </div>

        {/* Footer statement */}
        <div className="mt-12 pt-6 border-t border-[var(--aarohan-border)]">
          <p className="font-editorial text-[var(--aarohan-ink-muted)] text-sm md:text-base max-w-[88ch]">
            {siteConfig.footer.statement}
          </p>
        </div>
      </div>
    </footer>
  );
}

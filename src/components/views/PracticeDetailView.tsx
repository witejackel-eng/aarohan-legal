"use client";

import { useEffect, useRef } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { getPracticeArea, practiceAreas } from "@/content/practice-areas";
import { PracticeIllustration } from "@/components/illustrations/PracticeIllustration";
import { getPublishedPerspectives } from "@/content/perspectives";
import { useViewRouter } from "@/lib/view-router";
import { siteConfig } from "@/config/site";

/**
 * Practice detail view.
 *
 * Per brand brief §13 — every practice page shares a strong template
 * but has distinct diagrams and content.
 *
 * Page structure:
 *   1. Practice name
 *   2. Neutral description
 *   3. Contexts in which questions arise
 *   4. Types of work
 *   5. Relevant Indian institutional framework
 *   6. Related perspectives (if any)
 *   7. General-information disclaimer
 *   8. Neutral contact-information link
 *
 * Wording such as "The practice may advise on…". Avoid "We are
 * renowned for…", "We deliver winning outcomes…", "Our experts
 * dominate…", "We guarantee…".
 */
export function PracticeDetailView({ slug }: { slug: string }) {
  const router = useViewRouter();
  const area = getPracticeArea(slug);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [slug]);

  if (!area) {
    return (
      <main id="main" className="pt-32 px-5 md:px-8 max-w-[1600px] mx-auto">
        <p className="font-mono-label text-[var(--aarohan-red)]">404</p>
        <h1 className="mt-4 section-heading text-[var(--aarohan-ink)]">
          Practice area not found.
        </h1>
        <button
          onClick={() => router.navigate("practice")}
          className="mt-8 font-mono-label text-[var(--aarohan-ink)] editorial-link"
        >
          Return to practice index →
        </button>
      </main>
    );
  }

  const related = getPublishedPerspectives()
    .filter((p) => p.category.toLowerCase().includes(area.name.split(" ")[0].toLowerCase()))
    .slice(0, 3);

  return (
    <main id="main" className="relative pt-20 md:pt-24" tabIndex={-1}>
      {/* Hero */}
      <section aria-labelledby={`practice-${area.slug}-heading`} className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => router.navigate("practice")}
              className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
            >
              ← Practice
            </button>
            <span className="font-mono-label text-[var(--aarohan-ink-muted)]">
              / {area.number}
            </span>
          </div>
          <SectionLabel index={`02 / ${area.number}`} label={area.name.toUpperCase()} tone="red" />
          <h1
            ref={headingRef}
            id={`practice-${area.slug}-heading`}
            tabIndex={-1}
            className="mt-8 hero-headline text-[var(--aarohan-ink)] text-balance"
            style={{ fontSize: "clamp(2rem, 6.5vw, 6rem)" }}
          >
            {area.name}.
          </h1>
          <p className="mt-10 max-w-[64ch] editorial-body-large text-[var(--aarohan-ink)]">
            {area.longDescription}
          </p>
        </div>
      </section>

      {/* Diagram */}
      <section aria-label="Practice illustration" className="border-b border-[var(--aarohan-border)] bg-[var(--aarohan-paper-deep)]/40">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6 items-center">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="FIG" label="DIAGRAM" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <PracticeIllustration
                illustration={area.illustration}
                className="w-full max-w-[480px] h-auto"
                active
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contexts */}
      <section aria-labelledby="contexts-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="A" label="CONTEXTS" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="contexts-heading" className="section-heading text-[var(--aarohan-ink)]">
                Contexts in which questions arise.
              </h2>
              <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {area.contexts.map((c) => (
                  <li
                    key={c}
                    className="flex items-baseline gap-3 py-3 border-b border-[var(--aarohan-border)]"
                  >
                    <span
                      aria-hidden
                      className="inline-block w-1.5 h-1.5 bg-[var(--aarohan-red)] shrink-0 translate-y-1.5"
                    />
                    <span className="font-editorial text-[var(--aarohan-ink)]">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Types of work */}
      <section aria-labelledby="work-heading" className="border-b border-[var(--aarohan-border)] bg-[var(--aarohan-paper-deep)]/40">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="B" label="TYPES OF WORK" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="work-heading" className="section-heading text-[var(--aarohan-ink)]">
                The practice may advise on the following.
              </h2>
              <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[64ch]">
                The list below is descriptive. It is not a claim of
                specialisation, superiority or a promise of outcome.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {area.typesOfWork.map((w) => (
                  <li
                    key={w}
                    className="border border-[var(--aarohan-border)] px-4 py-2 font-mono-label text-[var(--aarohan-ink)] normal-case tracking-normal text-sm"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional framework */}
      <section aria-labelledby="framework-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="C" label="INSTITUTIONAL FRAMEWORK" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 id="framework-heading" className="section-heading text-[var(--aarohan-ink)]">
                Relevant Indian institutional framework.
              </h2>
              <ul className="mt-8 space-y-3">
                {area.institutionalFramework.map((f) => (
                  <li
                    key={f}
                    className="grid grid-cols-12 gap-x-4 py-3 border-b border-[var(--aarohan-border)]"
                  >
                    <span
                      aria-hidden
                      className="col-span-1 font-mono-label text-[var(--aarohan-brass)]"
                    >
                      §
                    </span>
                    <span className="col-span-11 font-editorial text-[var(--aarohan-ink)]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related perspectives */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-b border-[var(--aarohan-border)]">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6">
              <div className="col-span-12 md:col-span-3">
                <SectionLabel index="D" label="RELATED PERSPECTIVES" tone="muted" />
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 id="related-heading" className="section-heading text-[var(--aarohan-ink)]">
                  Related editorial notes.
                </h2>
                <ul className="mt-8 divide-y divide-[var(--aarohan-border)]">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <button
                        onClick={() =>
                          router.navigate("perspective-detail", { slug: p.slug })
                        }
                        className="group w-full text-left py-6 grid grid-cols-12 gap-x-4"
                      >
                        <span className="col-span-12 md:col-span-3 font-mono-label text-[var(--aarohan-ink-muted)]">
                          {p.category}
                        </span>
                        <span className="col-span-12 md:col-span-9 font-display text-xl text-[var(--aarohan-ink)] group-hover:translate-x-1 transition-transform">
                          {p.title}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer + contact */}
      <section aria-label="General information disclaimer">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <EditorialRule className="mb-12" />
          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
            <div className="col-span-12 md:col-span-3">
              <SectionLabel index="E" label="NOTICE" tone="red" />
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                The information on this page is provided as general
                information only. It does not constitute legal advice,
                solicitation or an invitation to establish an
                advocate-client relationship. Communication through this
                website does not by itself create an advocate-client
                relationship.
              </p>
              <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                For general enquiries, please contact the practice using
                the verified contact information on the General Enquiries
                page. Do not send confidential, privileged or
                time-sensitive material until an engagement has been
                accepted in writing.
              </p>
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
                <span className="font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
                  {siteConfig.legal.disclaimerVersion} ·{" "}
                  {siteConfig.legal.lastLegalReviewDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// silence unused-import warning for practiceAreas (kept for future nav rail)
void practiceAreas;

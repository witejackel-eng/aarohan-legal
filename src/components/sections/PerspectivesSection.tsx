"use client";

import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { getPublishedPerspectives } from "@/content/perspectives";
import { useViewRouter } from "@/lib/view-router";

/**
 * Homepage Section 08 — Perspectives.
 *
 * Per brand brief §10:
 *   Label: 06 / PERSPECTIVES
 *   Heading: "Notes on law, institutions and practice."
 *   Intro: general disclaimer
 *   Three initial long-form articles (already provided in content)
 */
export function PerspectivesSection() {
  const router = useViewRouter();
  const articles = getPublishedPerspectives().slice(0, 3);

  return (
    <section
      aria-labelledby="perspectives-heading"
      className="relative border-t border-[var(--aarohan-border)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel
              index="06"
              label="PERSPECTIVES"
              tone="red"
              className="md:sticky md:top-28"
            />
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              id="perspectives-heading"
              className="editorial-heading text-balance text-[var(--aarohan-ink)]"
            >
              Notes on law, institutions and practice.
            </h2>
            <p className="mt-6 max-w-[68ch] editorial-body text-[var(--aarohan-ink-muted)]">
              These materials are general discussions intended to support
              legal understanding. They are not legal advice and may not
              reflect later legal or regulatory developments.
            </p>

            <EditorialRule className="mt-12" />

            <ul className="divide-y divide-[var(--aarohan-border)]">
              {articles.map((a) => (
                <li key={a.slug}>
                  <button
                    onClick={() =>
                      router.navigate("perspective-detail", { slug: a.slug })
                    }
                    className="group w-full text-left py-8 md:py-10 grid grid-cols-12 gap-x-6 gap-y-3"
                  >
                    <div className="col-span-12 md:col-span-2">
                      <div className="font-mono-label text-[var(--aarohan-ink-muted)]">
                        {formatDate(a.publicationDate)}
                      </div>
                      <div className="mt-1 font-mono-label text-[var(--aarohan-red)]">
                        {a.category}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-10">
                      <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-[-0.02em] text-[var(--aarohan-ink)] group-hover:translate-x-2 transition-transform duration-500">
                        {a.title}
                      </h3>
                      <p className="mt-3 editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                        {a.abstract}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <span className="font-mono-label text-[var(--aarohan-ink)] group-hover:text-[var(--aarohan-red)] transition-colors">
                          Continue reading →
                        </span>
                        <span className="font-mono-label text-[var(--aarohan-ink-muted)]">
                          {a.readingTimeMinutes} min
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <button
                onClick={() => router.navigate("perspectives")}
                className="font-mono-label text-[var(--aarohan-ink)] hover:text-[var(--aarohan-red)] editorial-link"
              >
                View all perspectives →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d
      .toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase();
  } catch {
    return iso;
  }
}

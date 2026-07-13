"use client";

import { useEffect, useRef } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { getPublishedPerspectives } from "@/content/perspectives";
import { useViewRouter } from "@/lib/view-router";

/**
 * Perspectives list view.
 */
export function PerspectivesView() {
  const router = useViewRouter();
  const articles = getPublishedPerspectives();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main id="main" className="relative pt-20 md:pt-24" tabIndex={-1}>
      <section aria-labelledby="persp-hero-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <SectionLabel index="04" label="PERSPECTIVES" tone="red" />
          <h1
            ref={headingRef}
            id="persp-hero-heading"
            tabIndex={-1}
            className="mt-8 hero-headline text-[var(--aarohan-ink)] text-balance"
            style={{ fontSize: "clamp(2.25rem, 7vw, 7rem)" }}
          >
            Perspectives on Indian law and institutions.
          </h1>
          <p className="mt-10 max-w-[64ch] editorial-body-large text-[var(--aarohan-ink)]">
            Editorial notes on law, institutions and practice. These
            materials are general discussions intended to support legal
            understanding. They are not legal advice and may not reflect
            later legal or regulatory developments.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <EditorialRule className="mb-8" />
          <ul className="divide-y divide-[var(--aarohan-border)]">
            {articles.map((a) => (
              <li key={a.slug}>
                <button
                  onClick={() =>
                    router.navigate("perspective-detail", { slug: a.slug })
                  }
                  className="group w-full text-left py-10 md:py-14 grid grid-cols-12 gap-x-6 gap-y-4"
                >
                  <div className="col-span-12 md:col-span-3">
                    <div className="font-mono-label text-[var(--aarohan-ink-muted)]">
                      {formatDate(a.publicationDate)}
                    </div>
                    <div className="mt-2 font-mono-label text-[var(--aarohan-red)]">
                      {a.category}
                    </div>
                    <div className="mt-2 font-mono-label text-[var(--aarohan-ink-muted)]">
                      {a.readingTimeMinutes} MIN
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-[-0.02em] text-[var(--aarohan-ink)] group-hover:translate-x-2 transition-transform duration-500">
                      {a.title}
                    </h2>
                    <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                      {a.abstract}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono-label text-[var(--aarohan-ink)] group-hover:text-[var(--aarohan-red)] transition-colors">
                      Continue reading →
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <EditorialRule className="mt-12" />
          <p className="mt-6 font-editorial text-[var(--aarohan-ink-muted)] max-w-[68ch]">
            Law and regulation change. Readers should verify the current
            position and obtain advice appropriate to their circumstances.
          </p>
        </div>
      </section>
    </main>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso)
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

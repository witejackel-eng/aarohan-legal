"use client";

import { useEffect, useRef } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { practiceAreas } from "@/content/practice-areas";
import { PracticeIllustration } from "@/components/illustrations/PracticeIllustration";
import { useViewRouter } from "@/lib/view-router";

/**
 * Practice overview view.
 *
 * Per brand brief §12 — show all 7 practice areas in a precise editorial
 * index. Each area shows number / name / short factual description /
 * institutional context / link to detail page / procedural SVG.
 *
 * No "Why choose us" section. No rankings. No promotional comparisons.
 */
export function PracticeView() {
  const router = useViewRouter();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main id="main" className="relative pt-20 md:pt-24" tabIndex={-1}>
      <section aria-labelledby="practice-hero-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <SectionLabel index="02" label="PRACTICE" tone="red" />
          <h1
            ref={headingRef}
            id="practice-hero-heading"
            tabIndex={-1}
            className="mt-8 hero-headline text-[var(--aarohan-ink)] text-balance"
            style={{ fontSize: "clamp(2.25rem, 7vw, 7rem)" }}
          >
            Legal questions, organised by context.
          </h1>
          <p className="mt-10 max-w-[64ch] editorial-body-large text-[var(--aarohan-ink)]">
            Practice categories help describe the areas in which legal
            questions commonly arise. They are not substitutes for
            understanding the facts, forum, governing law and procedural
            position of an individual matter.
          </p>
        </div>
      </section>

      <section aria-label="Practice areas index">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-16 md:py-24">
          <EditorialRule className="mb-8" />
          <ul className="divide-y divide-[var(--aarohan-border)]">
            {practiceAreas.map((p) => (
              <li key={p.slug}>
                <button
                  onClick={() =>
                    router.navigate("practice-detail", { slug: p.slug })
                  }
                  className="group w-full text-left py-10 md:py-14 grid grid-cols-12 gap-x-6 gap-y-5"
                >
                  <div className="col-span-12 md:col-span-1">
                    <span className="font-mono-label text-[var(--aarohan-ink-muted)] group-hover:text-[var(--aarohan-red)] transition-colors">
                      {p.number}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-[-0.02em] text-[var(--aarohan-ink)] group-hover:translate-x-2 transition-transform duration-500">
                      {p.name}
                    </h2>
                    <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[60ch]">
                      {p.shortDescription}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {p.contexts.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono-label text-[var(--aarohan-ink)] group-hover:text-[var(--aarohan-red)] transition-colors">
                      <span>View detail</span>
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-4 md:pl-6">
                    <PracticeIllustration
                      illustration={p.illustration}
                      className="w-full h-auto"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

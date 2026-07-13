"use client";

import { useState } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { practiceAreas } from "@/content/practice-areas";
import { PracticeIllustration } from "@/components/illustrations/PracticeIllustration";
import { useViewRouter } from "@/lib/view-router";

/**
 * Homepage Section 05 — Practice areas.
 *
 * Per brand brief §10:
 *   Label: 03 / PRACTICE
 *   Heading: "Areas of legal work."
 *   Intro: disclaimer that categories are factual info, not claims
 *   Large numbered list (not generic cards)
 *   Each item links to a detail page
 *   Each item has a custom procedural illustration that activates on
 *   hover or focus
 */
export function PracticeAreasSection() {
  const router = useViewRouter();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      aria-labelledby="practice-heading"
      className="relative border-t border-[var(--aarohan-border)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel
              index="03"
              label="PRACTICE"
              tone="red"
              className="md:sticky md:top-28"
            />
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              id="practice-heading"
              className="editorial-heading text-balance text-[var(--aarohan-ink)]"
            >
              Areas of legal work.
            </h2>
            <p className="mt-6 max-w-[68ch] editorial-body text-[var(--aarohan-ink-muted)]">
              The following categories describe the present focus of the
              practice. They are provided as factual information and should
              not be read as a claim of specialisation, superiority or a
              promise of outcome.
            </p>

            <EditorialRule className="mt-12" />

            {/* Large numbered list */}
            <ul className="divide-y divide-[var(--aarohan-border)]">
              {practiceAreas.map((p, i) => {
                const isActive = hovered === i;
                return (
                  <li key={p.slug}>
                    <button
                      onClick={() =>
                        router.navigate("practice-detail", { slug: p.slug })
                      }
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      className="group w-full text-left py-8 md:py-12 grid grid-cols-12 gap-x-6 gap-y-4 items-start"
                      aria-label={`Open ${p.name}`}
                    >
                      <div className="col-span-12 md:col-span-1">
                        <span className="font-mono-label text-[var(--aarohan-ink-muted)] group-hover:text-[var(--aarohan-red)] transition-colors">
                          {p.number}
                        </span>
                      </div>

                      <div className="col-span-12 md:col-span-7">
                        <h3 className="font-display font-semibold text-3xl md:text-4xl tracking-[-0.02em] text-[var(--aarohan-ink)] group-hover:translate-x-2 transition-transform duration-500">
                          {p.name}
                        </h3>
                        <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[60ch]">
                          {p.shortDescription}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 font-mono-label text-[var(--aarohan-ink)] group-hover:text-[var(--aarohan-red)] transition-colors">
                          <span>Read more</span>
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
                          active={isActive}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

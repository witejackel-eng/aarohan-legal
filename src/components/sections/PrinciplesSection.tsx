"use client";

import { useState } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { principles } from "@/content/principles";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Homepage Section 04 — Principles.
 *
 * Per brand brief §10:
 *   Label: 02 / PRINCIPLES
 *   Heading: "Five duties that guide the work."
 *   Five large editorial panels (01–05)
 *
 * Interaction:
 *   - Desktop may use a sticky horizontal progression
 *   - Mobile must use a normal vertical sequence
 *   - No scroll hijacking
 *   - No tiny text
 *   - Each principle remains understandable without animation
 */
export function PrinciplesSection() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section
      aria-labelledby="principles-heading"
      className="relative border-t border-[var(--aarohan-border)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel
              index="02"
              label="PRINCIPLES"
              tone="red"
              className="md:sticky md:top-28"
            />
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              id="principles-heading"
              className="editorial-heading text-balance text-[var(--aarohan-ink)]"
            >
              Five duties that guide the work.
            </h2>

            {/* Desktop — sticky horizontal progression (no scroll hijack) */}
            <div className="mt-16 hidden lg:grid grid-cols-12 gap-x-6">
              {/* Sticky number rail */}
              <div className="col-span-4 sticky top-28 self-start">
                <ul className="border-l border-[var(--aarohan-border)]">
                  {principles.map((p, i) => (
                    <li key={p.number}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        className="w-full text-left pl-5 py-4 border-b border-[var(--aarohan-border)] group"
                        aria-current={active === i}
                      >
                        <div
                          className={[
                            "font-mono-label transition-colors",
                            active === i
                              ? "text-[var(--aarohan-red)]"
                              : "text-[var(--aarohan-ink-muted)] group-hover:text-[var(--aarohan-ink)]",
                          ].join(" ")}
                        >
                          {p.number}
                        </div>
                        <div
                          className={[
                            "font-display font-semibold text-2xl mt-1 transition-colors",
                            active === i
                              ? "text-[var(--aarohan-ink)]"
                              : "text-[var(--aarohan-ink-muted)] group-hover:text-[var(--aarohan-ink)]",
                          ].join(" ")}
                        >
                          {p.title}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Active panel content */}
              <div className="col-span-8 sticky top-28 self-start">
                <div
                  className="relative pl-8 border-l-2 border-[var(--aarohan-red)]"
                  key={active}
                >
                  <div className="font-mono-label text-[var(--aarohan-red)] mb-6">
                    PRINCIPLE {principles[active].number}
                  </div>
                  <h3 className="section-heading text-[var(--aarohan-ink)]">
                    {principles[active].title}
                  </h3>
                  <p className="mt-8 editorial-body-large text-[var(--aarohan-ink)] max-w-[42ch]">
                    {principles[active].copy}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile / tablet — vertical sequence */}
            <div className="mt-12 lg:hidden">
              <ul className="space-y-12">
                {principles.map((p) => (
                  <li key={p.number}>
                    <div className="grid grid-cols-12 gap-x-4 gap-y-3">
                      <div className="col-span-12">
                        <div className="font-mono-label text-[var(--aarohan-red)] mb-2">
                          {p.number}
                        </div>
                      </div>
                      <div className="col-span-12">
                        <h3 className="section-heading text-[var(--aarohan-ink)]">
                          {p.title}
                        </h3>
                        <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)]">
                          {p.copy}
                        </p>
                      </div>
                    </div>
                    <EditorialRule className="mt-10" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";

/**
 * Homepage Section 02 — Institutional introduction.
 *
 * Per brand brief §10:
 *   Label: 01 / THE PRACTICE
 *   Heading: "Law does not operate in isolation."
 *   Body + secondary paragraph
 *   Procedural illustration showing several legal layers aligning
 */
export function InstitutionalIntroSection() {
  return (
    <section
      aria-labelledby="intro-heading"
      className="relative border-t border-[var(--aarohan-border)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel
              index="01"
              label="THE PRACTICE"
              tone="red"
              className="md:sticky md:top-28"
            />
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              id="intro-heading"
              className="editorial-heading text-balance text-[var(--aarohan-ink)]"
            >
              Law does not operate in isolation.
            </h2>

            <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
              <div className="col-span-12 lg:col-span-7">
                <p className="editorial-body text-[var(--aarohan-ink)]">
                  Every instruction sits within a wider structure:
                  constitutional principle, legislation, delegated
                  regulation, judicial precedent, procedure and institutional
                  practice. Our work is to understand that structure,
                  identify the questions that matter and communicate a
                  considered course of action.
                </p>
                <p className="mt-6 editorial-body text-[var(--aarohan-ink-muted)]">
                  The practice approaches disputes and transactions with the
                  same discipline—close reading, clear issue-framing and an
                  understanding of the commercial or personal circumstances
                  in which legal decisions must be made.
                </p>
              </div>

              {/* Procedural illustration — several legal layers aligning */}
              <div className="col-span-12 lg:col-span-5 lg:pl-6">
                <LayeredStructureDiagram />
              </div>
            </div>

            <EditorialRule className="mt-16" />

            {/* Footnote-style detail row */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { k: "Constitution", v: "Foundational structure" },
                { k: "Legislation", v: "Statutory rules" },
                { k: "Regulation", v: "Delegated instruments" },
                { k: "Precedent", v: "Judicial interpretation" },
              ].map((x) => (
                <div key={x.k}>
                  <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-2">
                    {x.k}
                  </div>
                  <div className="font-editorial text-[var(--aarohan-ink)]">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Procedural SVG — several legal layers aligning.
 * No downloaded assets.
 */
function LayeredStructureDiagram() {
  return (
    <svg
      viewBox="0 0 400 320"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: several legal layers aligning"
    >
      <g stroke="#11110F" fill="none">
        {/* Four layered planes */}
        <rect x="20" y="40" width="360" height="220" strokeOpacity="0.18" strokeWidth="0.8" />
        <rect x="40" y="60" width="320" height="180" strokeOpacity="0.25" strokeWidth="0.8" />
        <rect x="60" y="80" width="280" height="140" strokeOpacity="0.35" strokeWidth="0.8" />
        <rect x="80" y="100" width="240" height="100" strokeOpacity="0.5" strokeWidth="0.8" />
      </g>

      {/* Connecting vertical rules — alignment */}
      <g stroke="#A9844F" strokeWidth="0.8" strokeOpacity="0.6">
        <line x1="80" y1="100" x2="80" y2="40" />
        <line x1="200" y1="100" x2="200" y2="40" />
        <line x1="320" y1="100" x2="320" y2="40" />
      </g>

      {/* Index nodes */}
      <g fill="#11110F">
        <circle cx="80" cy="40" r="2.5" />
        <circle cx="200" cy="40" r="2.5" />
        <circle cx="320" cy="40" r="2.5" />
      </g>

      {/* Central red apex node */}
      <circle cx="200" cy="40" r="5" fill="#6A1F2B" />

      {/* Index labels */}
      <g
        fill="#5F5C55"
        fontFamily="ui-monospace, monospace"
        fontSize="9"
        letterSpacing="0.15em"
      >
        <text x="20" y="290">L1</text>
        <text x="40" y="290">L2</text>
        <text x="60" y="290">L3</text>
        <text x="80" y="290">L4</text>
      </g>
    </svg>
  );
}

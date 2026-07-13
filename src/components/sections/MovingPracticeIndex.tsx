"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ITEMS = [
  "CORPORATE & COMMERCIAL",
  "DISPUTE RESOLUTION",
  "ARBITRATION",
  "INSOLVENCY",
  "EMPLOYMENT",
  "TECHNOLOGY & DATA",
  "REAL ESTATE",
  "REGULATORY",
];

/**
 * Homepage Section 03 — Moving practice index.
 *
 * Per brand brief §10:
 *   Horizontally moving typographic index of practice-area labels.
 *   Pauses on hover. Respects reduced-motion. Readable. Does not
 *   look like an advertising banner.
 */
export function MovingPracticeIndex() {
  const reduced = usePrefersReducedMotion();
  // Duplicate items so the marquee can loop seamlessly
  const items = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="Practice index"
      className="relative border-t border-b border-[var(--aarohan-border)] bg-[var(--aarohan-paper-deep)]/40 py-8 md:py-12 overflow-hidden"
    >
      {/* Edge fade masks for legibility */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, var(--aarohan-paper) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 md:w-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, var(--aarohan-paper) 0%, transparent 100%)",
        }}
      />

      {reduced ? (
        // Static layout for reduced motion — no scrolling
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 justify-center font-display font-semibold tracking-[-0.02em] text-2xl md:text-4xl text-[var(--aarohan-ink)]">
            {ITEMS.map((it) => (
              <li key={it} className="whitespace-nowrap">
                {it}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="relative w-full">
          <div className="marquee-track will-change-transform">
            {items.map((it, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 md:gap-10 px-6 md:px-10 font-display font-semibold tracking-[-0.02em] text-2xl md:text-4xl text-[var(--aarohan-ink)]"
              >
                <span className="whitespace-nowrap">{it}</span>
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 bg-[var(--aarohan-red)]"
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

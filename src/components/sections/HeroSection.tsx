"use client";

import { useEffect, useRef, useState } from "react";
import { useViewRouter } from "@/lib/view-router";
import { ConstitutionalField } from "@/components/webgl/ConstitutionalField";

/**
 * Homepage Section 01 — Hero.
 *
 * Per brand brief §10:
 *   Eyebrow: INDEPENDENT LEGAL PRACTICE · INDIA
 *   Main headline: "Indian law, considered with clarity."
 *   Supporting copy
 *   Primary neutral link: "View the practice →"
 *   Secondary link: "General information →"
 *   NO commercial CTA button style
 *   Display the Constitutional Field WebGL object behind or beside
 *   the typography
 *   Scroll indicator: "Proceed through the index"
 */

export function HeroSection() {
  const router = useViewRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-headline"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* WebGL Constitutional Field — behind the typography */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
      >
        <ConstitutionalField className="w-full h-full" />
      </div>

      {/* Soft paper gradient at bottom for text contrast */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/3 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, var(--aarohan-paper) 0%, rgba(241,238,230,0.85) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24 min-h-[100svh] flex flex-col">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-auto">
          <span className="font-mono-label text-[var(--aarohan-red)]">
            INDEPENDENT LEGAL PRACTICE
          </span>
          <span
            aria-hidden
            className="inline-block w-6 h-px bg-[var(--aarohan-border)]"
          />
          <span className="font-mono-label text-[var(--aarohan-ink-muted)]">
            INDIA
          </span>
        </div>

        {/* Headline + supporting copy */}
        <div className="py-12 md:py-20">
          <h1
            id="hero-headline"
            className="hero-headline text-[var(--aarohan-ink)] text-balance"
          >
            <span className="block">Indian law,</span>
            <span className="block">
              considered
            </span>
            <span className="block">
              with{" "}
              <span className="relative inline-block">
                <span className="text-[var(--aarohan-red)]">clarity</span>
                <span
                  aria-hidden
                  className="absolute left-0 -bottom-1 w-full h-[2px] bg-[var(--aarohan-red)]"
                />
              </span>
              <span
                aria-hidden
                className="text-[var(--aarohan-ink)] blink-cursor"
              >
                .
              </span>
            </span>
          </h1>

          <p className="mt-8 md:mt-10 max-w-[52ch] editorial-body-large text-[var(--aarohan-ink)] text-pretty">
            Aarohan Legal is an independent practice focused on careful
            legal analysis, responsible advocacy and clear communication
            within the institutions of Indian law.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
            <button
              onClick={() => router.navigate("practice")}
              className="group inline-flex items-center gap-3 font-mono-label text-[var(--aarohan-ink)] hover:text-[var(--aarohan-red)] transition-colors"
            >
              <span>View the practice</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </button>
            <button
              onClick={() => router.navigate("firm")}
              className="group inline-flex items-center gap-3 font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] transition-colors"
            >
              <span>General information</span>
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block w-px h-10 bg-[var(--aarohan-ink-muted)]"
            />
            <span className="font-mono-label text-[var(--aarohan-ink-muted)]">
              Proceed through the index
            </span>
          </div>
          {mounted && (
            <div className="hidden md:flex items-center gap-3 font-mono-label text-[var(--aarohan-ink-muted)]">
              <span>EST.</span>
              <span className="text-[var(--aarohan-ink)]">2024</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";
import { siteConfig } from "@/config/site";
import { useViewRouter } from "@/lib/view-router";

/**
 * Legal view shell — shared layout for Disclaimer, Privacy, Terms,
 * Accessibility. Each page passes its own title, eyebrow, and body.
 */
export function LegalView({
  eyebrow,
  title,
  lastReviewed,
  children,
}: {
  eyebrow: string;
  title: string;
  lastReviewed: string;
  children: React.ReactNode;
}) {
  const router = useViewRouter();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main id="main" className="relative pt-20 md:pt-24" tabIndex={-1}>
      <section aria-labelledby="legal-hero-heading" className="border-b border-[var(--aarohan-border)]">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-20">
          <SectionLabel index="L" label={eyebrow.toUpperCase()} tone="red" />
          <h1
            ref={headingRef}
            id="legal-hero-heading"
            tabIndex={-1}
            className="mt-6 editorial-heading text-balance text-[var(--aarohan-ink)]"
          >
            {title}
          </h1>
          <p className="mt-6 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-sm">
            Last reviewed: {lastReviewed} · Version{" "}
            {siteConfig.legal.disclaimerVersion}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-20">
          <div className="grid grid-cols-12 gap-x-6">
            <div className="col-span-12 md:col-span-2">
              <SectionLabel index="§" label="TEXT" tone="muted" />
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <div className="max-w-[68ch] space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </section>

      <EditorialRule />

      <section>
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-8">
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => router.navigate("home")}
              className="font-mono-label text-[var(--aarohan-ink)] hover:text-[var(--aarohan-red)] editorial-link"
            >
              ← Return to index
            </button>
            <button
              onClick={() => router.navigate("disclaimer")}
              className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
            >
              Disclaimer
            </button>
            <button
              onClick={() => router.navigate("privacy")}
              className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
            >
              Privacy
            </button>
            <button
              onClick={() => router.navigate("terms")}
              className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
            >
              Terms
            </button>
            <button
              onClick={() => router.navigate("accessibility")}
              className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
            >
              Accessibility
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="editorial-body text-[var(--aarohan-ink)] leading-relaxed">
      {children}
    </p>
  );
}

export function LegalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 font-display font-semibold text-2xl text-[var(--aarohan-ink)] tracking-[-0.02em]">
      {children}
    </h2>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-0">
      {items.map((it, i) => (
        <li
          key={i}
          className="flex items-baseline gap-3 editorial-body text-[var(--aarohan-ink)]"
        >
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 bg-[var(--aarohan-red)] shrink-0 translate-y-1"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

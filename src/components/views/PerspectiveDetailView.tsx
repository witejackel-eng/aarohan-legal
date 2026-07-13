"use client";

import { useEffect, useRef } from "react";
import { EditorialRule, SectionLabel } from "@/components/layout/EditorialPrimitives";
import { getPerspective, getPublishedPerspectives, type PerspectiveBlock } from "@/content/perspectives";
import { useViewRouter } from "@/lib/view-router";
import { siteConfig } from "@/config/site";

/**
 * Perspective detail view — renders one published article.
 *
 * Per brand brief §15:
 *   - Title, abstract, date, last-reviewed, author (hidden if unverified),
 *     category, primary-source references, reading time, body, related,
 *     disclaimer
 *   - Editorial note: "Law and regulation change. Readers should verify
 *     the current position and obtain advice appropriate to their
 *     circumstances."
 */
export function PerspectiveDetailView({ slug }: { slug: string }) {
  const router = useViewRouter();
  const article = getPerspective(slug);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [slug]);

  if (!article) {
    return (
      <main id="main" className="pt-32 px-5 md:px-8 max-w-[1600px] mx-auto">
        <p className="font-mono-label text-[var(--aarohan-red)]">404</p>
        <h1 className="mt-4 section-heading text-[var(--aarohan-ink)]">
          Article not found or not published.
        </h1>
        <button
          onClick={() => router.navigate("perspectives")}
          className="mt-8 font-mono-label text-[var(--aarohan-ink)] editorial-link"
        >
          Return to perspectives →
        </button>
      </main>
    );
  }

  const related = getPublishedPerspectives()
    .filter((p) => p.slug !== article.slug)
    .slice(0, 2);

  return (
    <main id="main" className="relative pt-20 md:pt-24" tabIndex={-1}>
      <article aria-labelledby="article-heading">
        {/* Hero */}
        <header className="border-b border-[var(--aarohan-border)]">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-20">
            <button
              onClick={() => router.navigate("perspectives")}
              className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
            >
              ← Perspectives
            </button>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="font-mono-label text-[var(--aarohan-red)]">
                {article.category}
              </span>
              <span aria-hidden className="w-6 h-px bg-[var(--aarohan-border)]" />
              <span className="font-mono-label text-[var(--aarohan-ink-muted)]">
                {formatDate(article.publicationDate)}
              </span>
              <span aria-hidden className="w-6 h-px bg-[var(--aarohan-border)]" />
              <span className="font-mono-label text-[var(--aarohan-ink-muted)]">
                {article.readingTimeMinutes} MIN READ
              </span>
            </div>
            <h1
              ref={headingRef}
              id="article-heading"
              tabIndex={-1}
              className="mt-6 editorial-heading text-balance text-[var(--aarohan-ink)]"
            >
              {article.title}
            </h1>
            <p className="mt-6 max-w-[68ch] editorial-body-large text-[var(--aarohan-ink-muted)]">
              {article.abstract}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-[var(--aarohan-ink-muted)]">
              {!article.authorHidden && (
                <div className="font-mono-label">BY {article.author.toUpperCase()}</div>
              )}
              {article.authorHidden && (
                <div className="font-mono-label">AUTHOR — PENDING VERIFICATION</div>
              )}
              <div className="font-mono-label">
                LAST REVIEWED {formatDate(article.lastReviewedDate)}
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <section className="border-b border-[var(--aarohan-border)]">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-20">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 md:col-span-2">
                <div className="md:sticky md:top-28">
                  <SectionLabel index="§" label="TEXT" tone="muted" />
                </div>
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-3">
                <PerspectiveBody blocks={article.body} />
              </div>
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="border-b border-[var(--aarohan-border)] bg-[var(--aarohan-paper-deep)]/40">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-16">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 md:col-span-2">
                <SectionLabel index="§" label="SOURCES" tone="red" />
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-3">
                <ul className="space-y-3">
                  {article.sources.map((s, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-12 gap-x-4 py-2 border-b border-[var(--aarohan-border)]"
                    >
                      <span className="col-span-1 font-mono-label text-[var(--aarohan-brass)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="col-span-11 font-editorial text-[var(--aarohan-ink)]">
                        {s.citation}
                        {s.locator && (
                          <span className="ml-2 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
                            ({s.locator})
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-b border-[var(--aarohan-border)]">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-16">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 md:col-span-2">
                <SectionLabel index="§" label="NOTICE" tone="red" />
              </div>
              <div className="col-span-12 md:col-span-8 md:col-start-3">
                <p className="editorial-body text-[var(--aarohan-ink-muted)] max-w-[68ch]">
                  {article.disclaimer}
                </p>
                <p className="mt-4 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-sm">
                  Law and regulation change. Readers should verify the
                  current position and obtain advice appropriate to their
                  circumstances.
                </p>
                <p className="mt-6 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
                  Disclaimer version: {siteConfig.legal.disclaimerVersion} ·
                  Last legal review: {siteConfig.legal.lastLegalReviewDate}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-12 md:py-16">
              <SectionLabel index="§" label="RELATED" tone="muted" />
              <EditorialRule className="my-6" />
              <ul className="divide-y divide-[var(--aarohan-border)]">
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
          </section>
        )}
      </article>
    </main>
  );
}

function PerspectiveBody({ blocks }: { blocks: PerspectiveBlock[] }) {
  return (
    <div className="max-w-[68ch]">
      {blocks.map((b, i) => {
        if (b.kind === "paragraph") {
          return (
            <p key={i} className="editorial-body text-[var(--aarohan-ink)] mt-6 first:mt-0">
              {b.text}
            </p>
          );
        }
        if (b.kind === "heading") {
          return (
            <h2
              key={i}
              className="mt-12 mb-2 font-display font-semibold text-2xl md:text-3xl tracking-[-0.02em] text-[var(--aarohan-ink)]"
            >
              {b.text}
            </h2>
          );
        }
        if (b.kind === "quote") {
          return (
            <blockquote
              key={i}
              className="my-10 pl-6 border-l-2 border-[var(--aarohan-red)] font-editorial text-xl md:text-2xl text-[var(--aarohan-ink)] leading-snug"
            >
              {b.text}
              {b.attribution && (
                <footer className="mt-3 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
                  {b.attribution}
                </footer>
              )}
            </blockquote>
          );
        }
        if (b.kind === "list") {
          return (
            <ul key={i} className="my-6 space-y-2">
              {b.items.map((it, j) => (
                <li
                  key={j}
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
        if (b.kind === "source-note") {
          return (
            <p
              key={i}
              className="mt-8 pt-4 border-t border-[var(--aarohan-border)] font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs leading-relaxed"
            >
              {b.text}
            </p>
          );
        }
        return null;
      })}
    </div>
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

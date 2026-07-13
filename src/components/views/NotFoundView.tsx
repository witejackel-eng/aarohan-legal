"use client";

import { useEffect, useRef } from "react";
import { useViewRouter } from "@/lib/view-router";

/**
 * 404 view — rendered when no other view matches. Per brand brief §8,
 * a custom 404 page is required.
 */
export function NotFoundView() {
  const router = useViewRouter();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main
      id="main"
      className="relative pt-32 md:pt-40 px-5 md:px-8 min-h-[80vh] flex items-center"
      tabIndex={-1}
    >
      <div className="mx-auto w-full max-w-[1600px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono-label text-[var(--aarohan-red)]">
              ERROR 404
            </span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="hero-headline text-[var(--aarohan-ink)] text-balance"
              style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            >
              The page could not be located.
            </h1>
            <p className="mt-8 max-w-[64ch] editorial-body-large text-[var(--aarohan-ink-muted)]">
              The view you requested is not available. The website may
              have been revised, or the link may not correspond to a
              published view. Use the index to continue.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <button
                onClick={() => router.navigate("home")}
                className="font-mono-label text-[var(--aarohan-ink)] hover:text-[var(--aarohan-red)] editorial-link"
              >
                Return to index →
              </button>
              <button
                onClick={() => router.navigate("contact")}
                className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link"
              >
                General enquiries →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

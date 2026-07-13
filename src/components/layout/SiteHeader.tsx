"use client";

import { useEffect, useState } from "react";
import { useViewRouter, viewLabel } from "@/lib/view-router";
import { siteConfig } from "@/config/site";
import { Wordmark } from "@/components/layout/Wordmark";

/**
 * Site header.
 *
 * Per brand brief §9:
 *   Left: AAROHAN wordmark
 *   Centre: small page-context label that changes based on route
 *   Right: "Index" button with a minimal animated marker
 *
 * Behaviour:
 *   - Begins transparent over the hero when contrast permits
 *   - Becomes a controlled paper surface after scrolling
 *   - Subtle border, never oversized floating pill
 *   - Keyboard accessible, clear focus states
 */
export function SiteHeader({
  onIndexClick,
}: {
  onIndexClick: () => void;
}) {
  const router = useViewRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on view change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [router.view, router.params]);

  const label = viewLabel(router.view, router.params);

  // On home view at top, header is transparent (over hero). Otherwise paper.
  const transparent = router.view === "home" && !scrolled;

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-[100] transition-colors duration-500",
        transparent
          ? "bg-transparent"
          : "bg-[var(--aarohan-paper)]/95 backdrop-blur-[2px] border-b border-[var(--aarohan-border)]",
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
          {/* Left — wordmark */}
          <button
            onClick={() => router.navigate("home")}
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.firm.name} — home`}
          >
            <Wordmark
              className="text-[var(--aarohan-ink)]"
              size="sm"
            />
          </button>

          {/* Centre — page context label (hidden on small screens) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <span
              key={label}
              className="font-mono-label text-[var(--aarohan-ink-muted)] animate-[fade-in_0.4s_ease-out]"
              aria-live="polite"
            >
              {label}
            </span>
          </div>

          {/* Right — Index button */}
          <button
            onClick={onIndexClick}
            aria-expanded={menuOpen}
            aria-controls="fullscreen-index"
            aria-label="Open full-screen index navigation"
            className="group inline-flex items-center gap-3 px-3 md:px-4 py-2 hover:bg-[var(--aarohan-paper-deep)] transition-colors"
          >
            <span className="font-mono-label text-[var(--aarohan-ink)]">
              Index
            </span>
            <span
              aria-hidden
              className="relative inline-flex flex-col gap-[5px] w-4"
            >
              <span
                className={[
                  "block h-px bg-[var(--aarohan-ink)] transition-all duration-300",
                  menuOpen ? "translate-y-[6px] rotate-45" : "w-4",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px bg-[var(--aarohan-ink)] transition-all duration-300",
                  menuOpen ? "opacity-0" : "w-4 opacity-100",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-px bg-[var(--aarohan-ink)] transition-all duration-300",
                  menuOpen ? "-translate-y-[6px] -rotate-45 w-4" : "w-3",
                ].join(" ")}
              />
            </span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}

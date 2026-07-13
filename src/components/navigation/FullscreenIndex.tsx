"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useViewRouter } from "@/lib/view-router";
import { siteConfig } from "@/config/site";
import { StackedWordmark, Monogram } from "@/components/layout/Wordmark";
import { practiceAreas } from "@/content/practice-areas";

/**
 * Full-screen index navigation — editorial catalogue style.
 *
 * Per brand brief §9:
 *   Left section: large numbered route list
 *   Right section: firm information
 *   Bottom: horizontal legal-information statement
 *
 * Motion:
 *   - Background expands from the top edge
 *   - Route numbers enter separately from labels
 *   - Fine rules draw across the screen
 *   - Hovering a route changes a procedural diagram in the background
 *   - Escape closes the menu
 *   - Body scroll locked, focus trapped, closing returns focus to Index btn
 */

type IndexRoute = {
  number: string;
  label: string;
  view: Parameters<ReturnType<typeof useViewRouter>["navigate"]>[0];
  description: string;
};

function buildRoutes(): IndexRoute[] {
  const routes: IndexRoute[] = [
    {
      number: "01",
      label: "Firm",
      view: "firm",
      description: "The practice, its purpose and institutional context.",
    },
    {
      number: "02",
      label: "Practice",
      view: "practice",
      description: "Areas of legal work, described factually.",
    },
  ];
  if (siteConfig.features.peoplePageEnabled) {
    routes.push({
      number: "03",
      label: "People",
      view: "people",
      description: "Verified profiles of the practice.",
    });
  }
  routes.push({
    number: siteConfig.features.peoplePageEnabled ? "04" : "03",
    label: "Perspectives",
    view: "perspectives",
    description: "Editorial notes on law, institutions and practice.",
  });
  routes.push({
    number: siteConfig.features.peoplePageEnabled ? "05" : "04",
    label: "General Enquiries",
    view: "contact",
    description: "Contact information, without solicitation.",
  });
  return routes;
}

export function FullscreenIndex({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const router = useViewRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const routes = buildRoutes();

  // Focus trap + escape
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const t = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 80);

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  // Restore focus on close
  useEffect(() => {
    if (open) return;
    triggerRef.current?.focus();
  }, [open, triggerRef]);

  function go(view: IndexRoute["view"]) {
    router.navigate(view);
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="fullscreen-index"
          role="dialog"
          aria-modal="true"
          aria-label="Site index navigation"
          ref={panelRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[150] bg-[var(--aarohan-paper)]"
        >
          {/* Background procedural diagram that changes on hover */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.06] transition-opacity duration-700"
            data-hovered={hovered ?? undefined}
          >
            <BackgroundDiagram hovered={hovered} />
          </div>

          {/* Top bar */}
          <div className="relative border-b border-[var(--aarohan-border)]">
            <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-[var(--aarohan-ink)]">
                <Monogram size={22} />
                <span className="font-mono-label">INDEX</span>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close index navigation"
                className="group inline-flex items-center gap-3 font-mono-label hover:text-[var(--aarohan-red)] transition-colors"
              >
                <span>Close</span>
                <span aria-hidden className="relative w-4 h-4 inline-flex">
                  <span className="absolute top-1/2 left-0 w-4 h-px bg-current rotate-45" />
                  <span className="absolute top-1/2 left-0 w-4 h-px bg-current -rotate-45" />
                </span>
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="relative h-[calc(100%-9rem)] overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10 py-10 md:py-16">
              <div className="grid grid-cols-12 gap-x-6 gap-y-12">
                {/* Left — numbered routes */}
                <nav className="col-span-12 lg:col-span-8" aria-label="Primary">
                  <ul className="divide-y divide-[var(--aarohan-border)]">
                    {routes.map((r, i) => (
                      <li key={r.view}>
                        <button
                          onMouseEnter={() => setHovered(i)}
                          onMouseLeave={() => setHovered(null)}
                          onFocus={() => setHovered(i)}
                          onBlur={() => setHovered(null)}
                          onClick={() => go(r.view)}
                          className="group w-full text-left py-5 md:py-7 flex items-baseline gap-6 md:gap-10"
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.1 + i * 0.06,
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="font-mono-label text-[var(--aarohan-ink-muted)] group-hover:text-[var(--aarohan-red)] transition-colors w-12 shrink-0"
                          >
                            {r.number}
                          </motion.span>
                          <span className="flex-1">
                            <motion.span
                              initial={{ opacity: 0, y: 18 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                delay: 0.18 + i * 0.06,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="block font-display font-semibold tracking-[-0.02em] text-4xl md:text-6xl lg:text-7xl text-[var(--aarohan-ink)] group-hover:translate-x-2 transition-transform duration-500"
                            >
                              {r.label}
                            </motion.span>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{
                                delay: 0.32 + i * 0.06,
                                duration: 0.6,
                              }}
                              className="block mt-2 font-editorial text-[var(--aarohan-ink-muted)] text-base md:text-lg max-w-[42ch]"
                            >
                              {r.description}
                            </motion.span>
                          </span>
                          <motion.span
                            aria-hidden
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.06 }}
                            className="font-mono-label text-[var(--aarohan-ink-muted)] group-hover:text-[var(--aarohan-red)] transition-colors"
                          >
                            →
                          </motion.span>
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Legal links */}
                  <div className="mt-12 pt-8 border-t border-[var(--aarohan-border)]">
                    <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-4">
                      LEGAL
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                      {siteConfig.navigation.legal.map((l) => (
                        <li key={l.view}>
                          <button
                            onClick={() => go(l.view as IndexRoute["view"])}
                            className="font-mono-label text-[var(--aarohan-ink)] editorial-link"
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>

                {/* Right — firm information */}
                <aside className="col-span-12 lg:col-span-4 lg:pl-8 lg:border-l lg:border-[var(--aarohan-border)]">
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-10"
                  >
                    <div>
                      <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-3">
                        LOCATION
                      </div>
                      <p className="font-editorial text-lg md:text-xl">
                        {siteConfig.firm.officeCity},{" "}
                        {siteConfig.firm.officeCountry}
                      </p>
                    </div>
                    <div>
                      <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-3">
                        GENERAL ENQUIRIES
                      </div>
                      {siteConfig.firm.emailVerified ? (
                        <a
                          href={`mailto:${siteConfig.firm.email}`}
                          className="font-editorial text-lg md:text-xl editorial-link"
                        >
                          {siteConfig.firm.email}
                        </a>
                      ) : (
                        <p className="font-editorial text-base text-[var(--aarohan-ink-muted)]">
                          Email pending verification
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="font-mono-label text-[var(--aarohan-ink-muted)] mb-3">
                        PRACTICE AREAS
                      </div>
                      <ul className="space-y-1.5">
                        {practiceAreas.map((p) => (
                          <li key={p.slug}>
                            <button
                              onClick={() => {
                                router.navigate("practice-detail", {
                                  slug: p.slug,
                                });
                                onClose();
                              }}
                              className="font-editorial text-sm md:text-base text-[var(--aarohan-ink)] editorial-link"
                            >
                              {p.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <StackedWordmark className="text-[var(--aarohan-ink)]" />
                    </div>
                  </motion.div>
                </aside>
              </div>
            </div>
          </div>

          {/* Bottom — legal-information statement */}
          <div className="relative absolute bottom-0 inset-x-0 border-t border-[var(--aarohan-border)]">
            <div className="mx-auto w-full max-w-[1600px] px-5 md:px-10 py-4">
              <p className="font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-[0.7rem] leading-relaxed">
                {siteConfig.footer.statement}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Background procedural diagram.
 *
 * A field of horizontal rules + nodes. When a route is hovered, the
 * rules compress toward the corresponding vertical position.
 */
function BackgroundDiagram({ hovered }: { hovered: number | null }) {
  const rows = 24;
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      {Array.from({ length: rows }).map((_, i) => {
        const baseY = (i / rows) * 800;
        const targetY = hovered !== null
          ? baseY + (hovered - 2) * 8
          : baseY;
        return (
          <line
            key={i}
            x1="0"
            y1={targetY}
            x2="1200"
            y2={targetY}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-[var(--aarohan-ink)]"
          />
        );
      })}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = (i / 13) * 1200;
        return (
          <circle
            key={`n-${i}`}
            cx={x}
            cy={hovered !== null ? 200 + hovered * 80 : 400}
            r="2"
            fill="currentColor"
            className="text-[var(--aarohan-red)]"
          />
        );
      })}
    </svg>
  );
}

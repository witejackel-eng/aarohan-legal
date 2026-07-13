"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useViewRouter } from "@/lib/view-router";
import { siteConfig } from "@/config/site";

/**
 * Entry disclaimer.
 *
 * Per brand brief §4.5 — displayed before the visitor enters the main
 * website for the first time in a browser session.
 *
 * Requirements honoured:
 *   - sessionStorage-based acceptance (no preselection)
 *   - keyboard accessible, focus trap, focus restoration
 *   - escape closes (treated as "leave")
 *   - visible link to full Disclaimer page
 *   - analytics never loaded before consent (analytics are disabled
 *     site-wide by default — see siteConfig.features.analyticsEnabled)
 *   - public informational content remains indexable; the gate is
 *     implemented as a session-level client overlay, not server-side
 *     cloaking
 */

const STORAGE_KEY = "aarohan.disclaimer.accepted";

export function DisclaimerGate({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const acceptRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const router = useViewRouter();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const accepted = sessionStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        previouslyFocused.current = document.activeElement as HTMLElement;
        setOpen(true);
      }
    } catch {
      // sessionStorage may be unavailable (private mode) — do not block
      setOpen(false);
    }
  }, []);

  const handleAccept = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
    previouslyFocused.current?.focus();
  }, []);

  const handleLeave = useCallback(() => {
    // "Leave website" — attempt to navigate away to a neutral page
    if (typeof window !== "undefined") {
      window.location.href = "about:blank";
    }
  }, []);

  const openDisclaimer = useCallback(() => {
    router.navigate("disclaimer");
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, [router]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    // Focus the accept button initially
    const t = window.setTimeout(() => {
      acceptRef.current?.focus();
    }, 50);

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleLeave();
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
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handler);
    // Lock body scroll
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = original;
    };
  }, [open, handleLeave]);

  if (!mounted) {
    // Avoid hydration mismatch: render nothing until client mounts
    return <>{children}</>;
  }

  if (!open) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-[var(--aarohan-paper)] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="disclaimer-title"
        aria-describedby="disclaimer-body"
      >
        {/* Top bar — fixed height, never scrolls */}
        <div className="shrink-0 border-b border-[var(--aarohan-border)]">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6 md:px-10 py-4 md:py-5 flex items-center justify-between gap-3">
            <div className="font-mono-label text-[var(--aarohan-ink-muted)] text-[0.6rem] sm:text-[0.6875rem]">
              AAROHAN · LEGAL PRACTICE
            </div>
            <div className="font-mono-label text-[var(--aarohan-ink-muted)] text-[0.6rem] sm:text-[0.6875rem] text-right">
              ENTRY NOTICE · {siteConfig.legal.disclaimerVersion}
            </div>
          </div>
        </div>

        {/* Body — scrolls independently when content exceeds viewport */}
        <div
          ref={panelRef}
          className="flex-1 overflow-y-auto overs-contain"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6 md:px-10 py-8 sm:py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6 sm:gap-y-8 md:gap-y-10">
              <div className="col-span-12 md:col-span-3">
                <div className="font-mono-label text-[var(--aarohan-red)] mb-3 sm:mb-4">
                  00 / NOTICE
                </div>
                <p className="font-mono-label text-[var(--aarohan-ink-muted)] leading-relaxed normal-case tracking-normal text-[0.7rem] sm:text-xs">
                  Please read this notice before entering the website.
                </p>
              </div>

              <div className="col-span-12 md:col-span-9">
                <h1
                  id="disclaimer-title"
                  className="editorial-heading text-balance text-[clamp(1.75rem,6vw,2.75rem)]"
                >
                  Before you continue.
                </h1>

                <div
                  id="disclaimer-body"
                  className="mt-6 sm:mt-8 max-w-[58ch] editorial-body text-[var(--aarohan-ink)] space-y-4 sm:space-y-5 text-[1rem] sm:text-[1.0625rem] md:text-[1.1875rem] leading-relaxed sm:leading-[1.62]"
                >
                  <p>
                    Under the rules governing advocates in India, advocates
                    are not permitted to solicit work or advertise. By
                    continuing, you confirm that you are seeking information
                    about Aarohan Legal on your own initiative.
                  </p>
                  <p>
                    The material on this website is provided only for general
                    information and does not constitute legal advice,
                    solicitation or an invitation to form an advocate-client
                    relationship. Communication through this website does not
                    by itself create an advocate-client relationship.
                  </p>
                  <p>
                    Do not send confidential, privileged or time-sensitive
                    material until an engagement has been accepted in
                    writing.
                  </p>
                </div>

                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <button
                    ref={acceptRef}
                    onClick={handleAccept}
                    className="group inline-flex items-center justify-center gap-3 bg-[var(--aarohan-ink)] text-[var(--aarohan-paper)] px-6 sm:px-7 py-4 font-mono-label text-[0.7rem] sm:text-[0.6875rem] hover:bg-[var(--aarohan-red-deep)] transition-colors w-full sm:w-auto"
                  >
                    <span>I understand and wish to continue</span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <button
                    onClick={handleLeave}
                    className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] underline underline-offset-4 decoration-[var(--aarohan-border)] hover:decoration-[var(--aarohan-ink)] transition-colors text-[0.7rem] sm:text-[0.6875rem] text-center sm:text-left"
                  >
                    Leave website
                  </button>
                </div>

                <div className="mt-10 sm:mt-12 pt-6 border-t border-[var(--aarohan-border)]">
                  <button
                    onClick={openDisclaimer}
                    className="font-mono-label text-[var(--aarohan-ink-muted)] hover:text-[var(--aarohan-ink)] editorial-link text-[0.7rem] sm:text-[0.6875rem]"
                  >
                    Read the complete Disclaimer →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar — fixed height, never scrolls */}
        <div className="shrink-0 border-t border-[var(--aarohan-border)]">
          <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-6 md:px-10 py-3 md:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
            <p className="font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-[0.65rem] sm:text-xs">
              {siteConfig.firm.officeCity}, {siteConfig.firm.officeCountry}
            </p>
            <p className="font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-[0.65rem] sm:text-xs">
              Last legal review: {siteConfig.legal.lastLegalReviewDate}
            </p>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}

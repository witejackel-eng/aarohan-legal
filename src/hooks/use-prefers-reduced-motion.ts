"use client";

import { useEffect, useState } from "react";

/**
 * Detects prefers-reduced-motion.
 *
 * Per brand brief §20: when reduced motion is enabled, stop marquee
 * motion, disable parallax, reduce WebGL motion, remove large
 * transform transitions, make all content immediately available.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

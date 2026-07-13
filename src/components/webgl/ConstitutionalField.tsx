"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { ConstitutionalFieldFallback } from "@/components/webgl/ConstitutionalFieldFallback";

/**
 * ConstitutionalField — wrapper that:
 *   - Dynamically imports the WebGL canvas (no SSR)
 *   - Shows a CSS/SVG fallback if WebGL fails or is unsupported
 *   - Respects prefers-reduced-motion (renders static fallback)
 *   - Lazy-loads Three.js code only when needed
 */

const Canvas = dynamic(
  () => import("@/components/webgl/ConstitutionalFieldCanvas").then((m) => m.default),
  {
    ssr: false,
    loading: () => <ConstitutionalFieldFallback />,
  }
);

export function ConstitutionalField({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const c = document.createElement("canvas");
      const gl =
        c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWebglOk(!!gl);
    } catch {
      setWebglOk(false);
    }
  }, []);

  // If reduced motion is requested, render the static SVG fallback
  // (per brand brief §7.1 — provide a CSS/SVG fallback; reduce WebGL
  // motion when reduced motion is enabled).
  if (reduced || webglOk === false) {
    return <ConstitutionalFieldFallback className={className} />;
  }

  if (webglOk === null) {
    return <ConstitutionalFieldFallback className={className} />;
  }

  return (
    <div className={className} aria-hidden>
      <Canvas />
    </div>
  );
}

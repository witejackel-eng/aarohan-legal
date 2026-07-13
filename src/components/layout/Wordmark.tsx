import { cn } from "@/lib/utils";

/**
 * Aarohan wordmark — original typographic mark.
 *
 * Per brand brief §6.4:
 *   - Strong letter spacing
 *   - Restrained geometry
 *   - Small legal-practice descriptor
 *   - No scales, no gavels, no court pillars, no emblem-like seals,
 *     no resemblance to a government mark
 *
 * Implementation: pure typographic SVG with an optional abstract "A"
 * monogram based on two ascending structural planes (the rising form
 * implied by the Sanskrit root "aarohan" — ascent).
 */

export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const text =
    size === "lg" ? "text-2xl md:text-4xl" : size === "sm" ? "text-sm" : "text-base md:text-lg";

  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display font-semibold tracking-[0.18em]",
          text
        )}
      >
        AAROHAN
      </span>
      <span
        className={cn(
          "font-mono-label text-[0.5em] md:text-[0.55em] mt-1 opacity-70"
        )}
      >
        LEGAL PRACTICE
      </span>
    </span>
  );
}

/**
 * Abstract "A" monogram — two ascending planes meeting at an apex.
 * No pillars, no scales, no seals. Pure structural ascent.
 */
export function Monogram({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="Aarohan monogram"
      className={className}
    >
      {/* Left ascending plane */}
      <path
        d="M6 42 L24 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      {/* Right ascending plane */}
      <path
        d="M42 42 L24 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      {/* Crossbar */}
      <path
        d="M14.5 30 L33.5 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      {/* Tiny node at apex */}
      <rect x="23" y="4" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

/**
 * Compact stacked wordmark — used in footer / full-screen index.
 */
export function StackedWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-display font-semibold tracking-[0.22em] text-3xl md:text-5xl">
        AAROHAN
      </span>
      <span className="font-mono-label text-xs md:text-sm mt-3 opacity-70">
        LEGAL PRACTICE
      </span>
    </span>
  );
}

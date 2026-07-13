import { cn } from "@/lib/utils";

/**
 * SectionLabel — numbered editorial section heading chip.
 *
 * Renders `01 / THE PRACTICE` style labels above each major section.
 */
export function SectionLabel({
  index,
  label,
  className,
  tone = "ink",
}: {
  index: string;
  label: string;
  className?: string;
  tone?: "ink" | "red" | "brass" | "muted";
}) {
  const toneColor =
    tone === "red"
      ? "text-[var(--aarohan-red)]"
      : tone === "brass"
        ? "text-[var(--aarohan-brass)]"
        : tone === "muted"
          ? "text-[var(--aarohan-ink-muted)]"
          : "text-[var(--aarohan-ink)]";
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono-label",
        toneColor,
        className
      )}
    >
      <span>{index}</span>
      <span
        aria-hidden
        className="inline-block w-8 h-px bg-current opacity-60"
      />
      <span>{label}</span>
    </div>
  );
}

/**
 * EditorialRule — thin horizontal hairline used to separate sections.
 */
export function EditorialRule({
  className,
  tone = "border",
}: {
  className?: string;
  tone?: "border" | "ink" | "red" | "brass";
}) {
  const bg =
    tone === "ink"
      ? "bg-[var(--aarohan-ink)]"
      : tone === "red"
        ? "bg-[var(--aarohan-red)]"
        : tone === "brass"
          ? "bg-[var(--aarohan-brass)]"
          : "bg-[var(--aarohan-border)]";
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full", bg, className)}
    />
  );
}

/**
 * RevealText — text-mask reveal on scroll. Falls back to plain text
 * if IntersectionObserver is unavailable or reduced motion is on.
 */
export function RevealText({
  as: Tag = "span",
  children,
  className,
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Tag className={cn("reveal-line", className)}>
      <span>{children}</span>
    </Tag>
  );
}

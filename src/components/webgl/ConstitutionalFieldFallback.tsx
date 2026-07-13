"use client";

/**
 * CSS/SVG fallback for the Constitutional Field WebGL sculpture.
 *
 * Shown when:
 *   - WebGL is unavailable
 *   - prefers-reduced-motion is enabled
 *   - The WebGL canvas is still loading
 *   - WebGL fails (the parent switches to this fallback)
 *
 * The fallback is a static SVG composition that retains the same
 * visual grammar: thin planes, layered grids, intersecting lines,
 * ordered nodes, controlled red and brass highlights, paper-like
 * monochromatic surfaces.
 */
export function ConstitutionalFieldFallback({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Paper background */}
        <rect width="800" height="600" fill="#F1EEE6" />

        {/* Layered planes — receding frames */}
        <g stroke="#11110F" fill="none" opacity="0.16">
          <rect x="60" y="60" width="680" height="480" strokeWidth="0.6" />
          <rect x="100" y="100" width="600" height="400" strokeWidth="0.6" />
          <rect x="140" y="140" width="520" height="320" strokeWidth="0.6" />
          <rect x="180" y="180" width="440" height="240" strokeWidth="0.6" />
          <rect x="220" y="220" width="360" height="160" strokeWidth="0.6" />
        </g>

        {/* Central red plane — constitutional core */}
        <rect
          x="260"
          y="240"
          width="280"
          height="120"
          fill="#6A1F2B"
          opacity="0.14"
          stroke="#6A1F2B"
          strokeWidth="0.8"
        />

        {/* Brass diagonal axis */}
        <g stroke="#A9844F" strokeWidth="0.8" opacity="0.5">
          <line x1="100" y1="100" x2="700" y2="500" />
          <line x1="700" y1="100" x2="100" y2="500" />
        </g>

        {/* Grid layer */}
        <g stroke="#5F5C55" strokeWidth="0.4" opacity="0.42">
          {Array.from({ length: 17 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={60 + i * 42.5}
              y1="60"
              x2={60 + i * 42.5}
              y2="540"
            />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="60"
              y1={60 + i * 40}
              x2="740"
              y2={60 + i * 40}
            />
          ))}
        </g>

        {/* Ordered nodes */}
        <g fill="#11110F">
          <circle cx="100" cy="100" r="3" />
          <circle cx="700" cy="100" r="3" />
          <circle cx="100" cy="500" r="3" />
          <circle cx="700" cy="500" r="3" />
          <circle cx="400" cy="300" r="3" />
          <circle cx="260" cy="240" r="2.5" />
          <circle cx="540" cy="240" r="2.5" />
          <circle cx="260" cy="360" r="2.5" />
          <circle cx="540" cy="360" r="2.5" />
        </g>
        {/* Central red node */}
        <circle cx="400" cy="300" r="6" fill="#6A1F2B" />
        {/* Brass apex node */}
        <circle cx="400" cy="180" r="5" fill="#A9844F" />
      </svg>
    </div>
  );
}

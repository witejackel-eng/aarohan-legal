"use client";

import type { IllustrationKey } from "@/content/practice-areas";

/**
 * PracticeIllustration — set of custom procedural SVG illustrations.
 *
 * Per brand brief §7.2 — each illustration must use the same visual
 * grammar: fine rules, nodes, geometric planes, indexed labels,
 * abstract diagrams, small motion on hover. No downloaded assets.
 *
 * Illustration concepts (brand brief §7.2):
 *   corporate-commercial:  Interlocking contractual planes.
 *   dispute-resolution:    Two opposing fields connected through a
 *                          neutral central axis.
 *   insolvency:            A fragmented system reorganising into a
 *                          stable structure.
 *   employment:            A network of individual nodes connected to
 *                          an institutional framework.
 *   technology-data:       A controlled data lattice surrounded by a
 *                          boundary layer.
 *   real-estate:           Layered spatial plans and structured
 *                          development lines.
 *   regulatory:            Concentric frameworks showing overlapping
 *                          statutory authority.
 */

type CommonProps = {
  className?: string;
  active?: boolean;
};

export function PracticeIllustration({
  illustration,
  className,
  active = false,
}: {
  illustration: IllustrationKey;
  className?: string;
  active?: boolean;
}) {
  switch (illustration) {
    case "corporate-commercial":
      return <CorporateCommercial className={className} active={active} />;
    case "dispute-resolution":
      return <DisputeResolution className={className} active={active} />;
    case "insolvency":
      return <Insolvency className={className} active={active} />;
    case "employment":
      return <Employment className={className} active={active} />;
    case "technology-data":
      return <TechnologyData className={className} active={active} />;
    case "real-estate":
      return <RealEstate className={className} active={active} />;
    case "regulatory":
      return <Regulatory className={className} active={active} />;
  }
}

/* --- Corporate & Commercial — interlocking contractual planes --- */
function CorporateCommercial({ className, active }: CommonProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role="img"
      aria-label="Illustration: interlocking contractual planes"
    >
      <g stroke="#11110F" fill="none" strokeWidth="0.8">
        <rect
          x="30"
          y="35"
          width="120"
          height="80"
          strokeOpacity={active ? 0.85 : 0.5}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        <rect
          x="90"
          y="50"
          width="120"
          height="80"
          strokeOpacity={active ? 0.85 : 0.5}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        <rect
          x="60"
          y="20"
          width="120"
          height="80"
          strokeOpacity={active ? 0.45 : 0.2}
          strokeDasharray="2 2"
          style={{ transition: "stroke-opacity 0.5s" }}
        />
      </g>
      <g
        fill={active ? "#6A1F2B" : "#11110F"}
        style={{ transition: "fill 0.5s" }}
      >
        <circle cx="90" cy="50" r="2.5" />
        <circle cx="150" cy="50" r="2.5" />
        <circle cx="90" cy="130" r="2.5" />
        <circle cx="150" cy="130" r="2.5" />
      </g>
      <circle cx="120" cy="90" r="4" fill="#6A1F2B" />
      <IndexLabels positions={["01", "02", "03"]} />
    </svg>
  );
}

/* --- Dispute Resolution — two opposing fields connected by a central axis --- */
function DisputeResolution({ className, active }: CommonProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role="img"
      aria-label="Illustration: two opposing fields connected through a neutral central axis"
    >
      <g stroke="#11110F" fill="none" strokeWidth="0.8">
        <rect
          x="20"
          y="40"
          width="80"
          height="80"
          strokeOpacity={active ? 0.8 : 0.45}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        <rect
          x="140"
          y="40"
          width="80"
          height="80"
          strokeOpacity={active ? 0.8 : 0.45}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        {/* Connecting axis */}
        <line
          x1="100"
          y1="80"
          x2="140"
          y2="80"
          stroke="#A9844F"
          strokeWidth="1.4"
          strokeOpacity={active ? 1 : 0.6}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        {/* Internal grid left */}
        <line x1="60" y1="40" x2="60" y2="120" strokeOpacity="0.25" />
        <line x1="20" y1="80" x2="100" y2="80" strokeOpacity="0.25" />
        {/* Internal grid right */}
        <line x1="180" y1="40" x2="180" y2="120" strokeOpacity="0.25" />
        <line x1="140" y1="80" x2="220" y2="80" strokeOpacity="0.25" />
      </g>
      <circle cx="100" cy="80" r="3" fill="#11110F" />
      <circle cx="140" cy="80" r="3" fill="#11110F" />
      <circle cx="120" cy="80" r="4" fill="#6A1F2B" />
      <IndexLabels positions={["A", "·", "B"]} />
    </svg>
  );
}

/* --- Insolvency — fragmented system reorganising into a stable structure --- */
function Insolvency({ className, active }: CommonProps) {
  const fragments = [
    { x: 30, y: 35, w: 28, h: 22, r: -6 },
    { x: 70, y: 30, w: 26, h: 28, r: 4 },
    { x: 110, y: 38, w: 24, h: 20, r: -3 },
    { x: 145, y: 28, w: 30, h: 26, r: 8 },
    { x: 185, y: 36, w: 26, h: 24, r: -5 },
  ];
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role="img"
      aria-label="Illustration: a fragmented system reorganising into a stable structure"
    >
      <g stroke="#11110F" fill="none" strokeWidth="0.8">
        {fragments.map((f, i) => (
          <rect
            key={i}
            x={f.x}
            y={f.y}
            width={f.w}
            height={f.h}
            transform={`rotate(${active ? 0 : f.r} ${f.x + f.w / 2} ${f.y + f.h / 2})`}
            strokeOpacity={active ? 0.7 : 0.4}
            style={{ transition: "transform 0.6s ease, stroke-opacity 0.5s" }}
          />
        ))}
      </g>
      {/* Stable target structure — becomes more visible when active */}
      <g
        stroke="#6A1F2B"
        fill="none"
        strokeWidth="0.9"
        strokeOpacity={active ? 0.85 : 0.35}
        style={{ transition: "stroke-opacity 0.5s" }}
      >
        <rect x="60" y="95" width="120" height="40" />
        <line x1="60" y1="115" x2="180" y2="115" strokeOpacity="0.5" />
        <line x1="120" y1="95" x2="120" y2="135" strokeOpacity="0.5" />
      </g>
      <circle cx="120" cy="115" r="3.5" fill="#6A1F2B" />
      <IndexLabels positions={["01", "02", "03"]} />
    </svg>
  );
}

/* --- Employment — network of individual nodes connected to an institutional framework --- */
function Employment({ className, active }: CommonProps) {
  const nodes = [
    { x: 40, y: 50 },
    { x: 80, y: 40 },
    { x: 120, y: 50 },
    { x: 160, y: 40 },
    { x: 200, y: 50 },
    { x: 60, y: 80 },
    { x: 100, y: 75 },
    { x: 140, y: 80 },
    { x: 180, y: 75 },
  ];
  const hub = { x: 120, y: 120 };
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role="img"
      aria-label="Illustration: a network of individual nodes connected to an institutional framework"
    >
      {/* Connecting lines to the hub */}
      <g stroke="#11110F" strokeWidth="0.6" strokeOpacity={active ? 0.5 : 0.25}>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={hub.x}
            y2={hub.y}
            style={{ transition: "stroke-opacity 0.5s" }}
          />
        ))}
      </g>
      {/* Institutional framework (hub frame) */}
      <rect
        x="90"
        y="105"
        width="60"
        height="35"
        fill="none"
        stroke="#6A1F2B"
        strokeWidth="1"
        strokeOpacity={active ? 0.85 : 0.5}
        style={{ transition: "stroke-opacity 0.5s" }}
      />
      {/* Individual nodes */}
      <g fill="#11110F">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="2.5" />
        ))}
      </g>
      <circle cx={hub.x} cy={hub.y} r="4.5" fill="#6A1F2B" />
      <IndexLabels positions={["·", "·", "·"]} />
    </svg>
  );
}

/* --- Technology & Data — controlled data lattice surrounded by a boundary layer --- */
function TechnologyData({ className, active }: CommonProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role="img"
      aria-label="Illustration: a controlled data lattice surrounded by a boundary layer"
    >
      {/* Boundary layer */}
      <rect
        x="20"
        y="20"
        width="200"
        height="120"
        fill="none"
        stroke="#A9844F"
        strokeWidth="1.2"
        strokeOpacity={active ? 0.9 : 0.55}
        strokeDasharray="3 3"
        style={{ transition: "stroke-opacity 0.5s" }}
      />
      {/* Lattice */}
      <g stroke="#11110F" strokeWidth="0.5" strokeOpacity={active ? 0.55 : 0.3}>
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={40 + i * 20}
            y1="30"
            x2={40 + i * 20}
            y2="130"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="30"
            y1={40 + i * 18}
            x2="210"
            y2={40 + i * 18}
          />
        ))}
      </g>
      {/* Lattice nodes */}
      <g fill="#11110F">
        {Array.from({ length: 5 }).map((_, i) => (
          <circle
            key={i}
            cx={60 + i * 30}
            cy={70}
            r="2"
            fillOpacity={active ? 1 : 0.7}
          />
        ))}
      </g>
      <circle cx="120" cy="80" r="5" fill="#6A1F2B" />
      <IndexLabels positions={["·", "·", "·"]} />
    </svg>
  );
}

/* --- Real Estate — layered spatial plans and structured development lines --- */
function RealEstate({ className, active }: CommonProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role="img"
      aria-label="Illustration: layered spatial plans and structured development lines"
    >
      <g stroke="#11110F" fill="none" strokeWidth="0.7">
        <rect x="30" y="30" width="180" height="100" strokeOpacity="0.5" />
        <rect x="30" y="30" width="180" height="100" strokeOpacity="0.3" strokeDasharray="2 3" transform="translate(6 6)" />
        {/* Internal partitions — spatial plan */}
        <line x1="30" y1="80" x2="210" y2="80" strokeOpacity="0.4" />
        <line x1="90" y1="30" x2="90" y2="80" strokeOpacity="0.4" />
        <line x1="150" y1="30" x2="150" y2="80" strokeOpacity="0.4" />
        <line x1="120" y1="80" x2="120" y2="130" strokeOpacity="0.4" />
        <line x1="30" y1="105" x2="210" y2="105" strokeOpacity="0.25" />
      </g>
      {/* Development lines — vertical, structured */}
      <g stroke="#A9844F" strokeWidth="0.7" strokeOpacity={active ? 0.7 : 0.4}>
        <line x1="60" y1="140" x2="60" y2="155" />
        <line x1="120" y1="140" x2="120" y2="155" />
        <line x1="180" y1="140" x2="180" y2="155" />
      </g>
      <circle cx="60" cy="155" r="2" fill="#A9844F" />
      <circle cx="120" cy="155" r="2" fill="#A9844F" />
      <circle cx="180" cy="155" r="2" fill="#A9844F" />
      <circle cx="120" cy="55" r="3" fill="#6A1F2B" />
      <IndexLabels positions={["L1", "L2", "L3"]} />
    </svg>
  );
}

/* --- Regulatory — concentric frameworks showing overlapping statutory authority --- */
function Regulatory({ className, active }: CommonProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={className}
      role="img"
      aria-label="Illustration: concentric frameworks showing overlapping statutory authority"
    >
      <g fill="none" strokeWidth="0.8">
        <rect
          x="40"
          y="20"
          width="160"
          height="120"
          stroke="#11110F"
          strokeOpacity={active ? 0.55 : 0.3}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        <rect
          x="60"
          y="40"
          width="120"
          height="80"
          stroke="#11110F"
          strokeOpacity={active ? 0.65 : 0.4}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        <rect
          x="80"
          y="55"
          width="80"
          height="50"
          stroke="#6A1F2B"
          strokeOpacity={active ? 0.85 : 0.5}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
        <rect
          x="95"
          y="68"
          width="50"
          height="24"
          stroke="#A9844F"
          strokeOpacity={active ? 0.95 : 0.6}
          style={{ transition: "stroke-opacity 0.5s" }}
        />
      </g>
      <circle cx="120" cy="80" r="3" fill="#6A1F2B" />
      <IndexLabels positions={["01", "02", "03", "04"]} />
    </svg>
  );
}

/* --- Tiny index labels along the bottom of each illustration --- */
function IndexLabels({ positions }: { positions: string[] }) {
  return (
    <g
      fill="#5F5C55"
      fontFamily="ui-monospace, monospace"
      fontSize="6"
      letterSpacing="0.15em"
    >
      {positions.map((p, i) => (
        <text
          key={i}
          x={20 + i * (200 / Math.max(positions.length - 1, 1))}
          y="155"
        >
          {p}
        </text>
      ))}
    </g>
  );
}

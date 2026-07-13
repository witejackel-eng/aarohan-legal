"use client";

import { useState } from "react";
import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";

/**
 * Homepage Section 06 — Indian legal system.
 *
 * Per brand brief §10:
 *   Label: 04 / THE LEGAL STRUCTURE
 *   Heading: "Advice must account for the institution that will apply it."
 *   Intro copy
 *   Interactive diagram with 8 levels (Constitution → ADR)
 *   NOT presented as personalised legal advice
 *   Supporting passage
 */

type Level = {
  id: string;
  label: string;
  description: string;
};

const LEVELS: Level[] = [
  {
    id: "constitution",
    label: "Constitution",
    description:
      "The foundational legal structure within which all statutes, institutions and exercises of authority operate.",
  },
  {
    id: "legislation",
    label: "Parliamentary & State legislation",
    description:
      "Statutes enacted by Parliament and State Legislatures within their respective legislative competences.",
  },
  {
    id: "delegated",
    label: "Delegated legislation & regulation",
    description:
      "Rules, regulations, notifications and orders made under the authority of a parent statute.",
  },
  {
    id: "supreme-court",
    label: "Supreme Court of India",
    description:
      "The apex constitutional court; final court of appeal and the guardian of fundamental rights.",
  },
  {
    id: "high-courts",
    label: "High Courts",
    description:
      "Constitutional courts of the States, with original and appellate jurisdiction and supervisory authority.",
  },
  {
    id: "district",
    label: "District & subordinate judiciary",
    description:
      "Trial courts that record evidence and frame findings of fact at first instance.",
  },
  {
    id: "tribunals",
    label: "Tribunals & statutory authorities",
    description:
      "Specialised bodies adjudicating questions under specific statutory regimes.",
  },
  {
    id: "adr",
    label: "Arbitration, mediation & negotiated resolution",
    description:
      "Private and consensual mechanisms for resolving disputes outside the court system.",
  },
];

export function LegalStructureSection() {
  const [active, setActive] = useState<string>("constitution");
  const activeLevel = LEVELS.find((l) => l.id === active) ?? LEVELS[0];

  return (
    <section
      aria-labelledby="legal-structure-heading"
      className="relative border-t border-[var(--aarohan-border)] bg-[var(--aarohan-paper-deep)]/40"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel
              index="04"
              label="THE LEGAL STRUCTURE"
              tone="red"
              className="md:sticky md:top-28"
            />
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              id="legal-structure-heading"
              className="editorial-heading text-balance text-[var(--aarohan-ink)]"
            >
              Advice must account for the institution that will apply it.
            </h2>
            <p className="mt-6 max-w-[68ch] editorial-body text-[var(--aarohan-ink-muted)]">
              Indian law operates through constitutional courts, the wider
              judicial system, tribunals, statutory authorities and
              alternative dispute-resolution processes. The meaning of a
              legal rule often depends not only on its wording, but also on
              jurisdiction, precedent, procedure and the authority
              responsible for applying it.
            </p>

            {/* Interactive diagram */}
            <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-6">
              {/* Left rail — list of levels */}
              <div className="col-span-12 lg:col-span-5">
                <ul className="border-l border-[var(--aarohan-border)]">
                  {LEVELS.map((l, i) => (
                    <li key={l.id}>
                      <button
                        onMouseEnter={() => setActive(l.id)}
                        onFocus={() => setActive(l.id)}
                        onClick={() => setActive(l.id)}
                        className="w-full text-left pl-5 py-3 border-b border-[var(--aarohan-border)] group"
                        aria-current={active === l.id}
                      >
                        <div
                          className={[
                            "flex items-baseline gap-3",
                            active === l.id
                              ? "text-[var(--aarohan-ink)]"
                              : "text-[var(--aarohan-ink-muted)] group-hover:text-[var(--aarohan-ink)]",
                          ].join(" ")}
                        >
                          <span className="font-mono-label text-xs">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display font-medium text-lg md:text-xl">
                            {l.label}
                          </span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — active level detail + diagram */}
              <div className="col-span-12 lg:col-span-7 lg:pl-6">
                <div
                  className="relative pl-6 border-l-2 border-[var(--aarohan-red)]"
                  key={active}
                >
                  <div className="font-mono-label text-[var(--aarohan-red)] mb-3">
                    LEVEL {String(LEVELS.findIndex((l) => l.id === active) + 1).padStart(2, "0")}
                  </div>
                  <h3 className="section-heading text-[var(--aarohan-ink)]">
                    {activeLevel.label}
                  </h3>
                  <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)] max-w-[48ch]">
                    {activeLevel.description}
                  </p>
                </div>

                <LegalStructureDiagram active={active} />
              </div>
            </div>

            <EditorialRule className="mt-16" />

            <p className="mt-8 max-w-[68ch] editorial-body text-[var(--aarohan-ink)]">
              A careful legal position therefore requires more than finding a
              section or citation. It requires understanding hierarchy,
              institutional competence, procedural posture and the factual
              record.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Procedural SVG showing hierarchy of levels.
 */
function LegalStructureDiagram({ active }: { active: string }) {
  const levelIndex = LEVELS.findIndex((l) => l.id === active);
  return (
    <svg
      viewBox="0 0 400 240"
      className="w-full h-auto mt-8"
      role="img"
      aria-label="Diagram: hierarchy of legal institutions"
    >
      {/* Pyramid layers */}
      <g stroke="#11110F" fill="none" strokeWidth="0.7">
        <polygon points="200,20 320,60 80,60" strokeOpacity="0.5" />
        <polygon points="80,60 320,60 360,100 40,100" strokeOpacity="0.5" />
        <polygon points="40,100 360,100 380,140 20,140" strokeOpacity="0.5" />
        <polygon points="20,140 380,140 380,180 20,180" strokeOpacity="0.5" />
        <polygon points="20,180 380,180 360,220 40,220" strokeOpacity="0.5" />
      </g>

      {/* Highlighted layer */}
      <g fill="#6A1F2B" fillOpacity="0.12" stroke="#6A1F2B" strokeWidth="1">
        {levelIndex === 0 && <polygon points="200,20 320,60 80,60" />}
        {levelIndex === 1 && <polygon points="80,60 320,60 360,100 40,100" />}
        {levelIndex === 2 && <polygon points="40,100 360,100 380,140 20,140" />}
        {levelIndex === 3 && <polygon points="20,140 380,140 380,180 20,180" />}
        {levelIndex === 4 && <polygon points="20,180 380,180 360,220 40,220" />}
      </g>

      {/* Node at active level */}
      {levelIndex >= 0 && levelIndex <= 4 && (
        <circle
          cx="200"
          cy={[40, 80, 120, 160, 200][levelIndex]}
          r="4"
          fill="#6A1F2B"
        />
      )}

      {/* Side ADR line (arbitration) — when active, highlight */}
      <g
        stroke="#A9844F"
        strokeWidth="0.8"
        strokeOpacity={active === "adr" ? 0.9 : 0.4}
        strokeDasharray="3 3"
      >
        <line x1="380" y1="140" x2="395" y2="140" />
      </g>

      {/* Tribunals side line */}
      <g
        stroke="#A9844F"
        strokeWidth="0.8"
        strokeOpacity={active === "tribunals" ? 0.9 : 0.4}
        strokeDasharray="3 3"
      >
        <line x1="20" y1="140" x2="5" y2="140" />
      </g>
    </svg>
  );
}

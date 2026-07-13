"use client";

import { SectionLabel, EditorialRule } from "@/components/layout/EditorialPrimitives";

/**
 * Homepage Section 07 — Working method.
 *
 * Per brand brief §10:
 *   Label: 05 / METHOD
 *   Heading: "A disciplined sequence, adapted to the matter."
 *   Four stages: Understand, Frame, Examine, Advise
 *
 *   Do NOT imply every matter follows the same process.
 *   Do NOT call this a proprietary method.
 *   Do NOT make performance claims.
 */

const STAGES = [
  {
    number: "01",
    name: "Understand",
    copy: "Identify the instruction, the relevant facts, the parties, the immediate risks and the practical objective.",
  },
  {
    number: "02",
    name: "Frame",
    copy: "Separate the central legal issues from assumptions, background noise and questions that do not determine the result.",
  },
  {
    number: "03",
    name: "Examine",
    copy: "Review the governing text, precedent, procedure, evidentiary position and available courses of action.",
  },
  {
    number: "04",
    name: "Advise",
    copy: "Communicate the position, uncertainty, consequences and next steps in language that can support a considered decision.",
  },
];

export function MethodSection() {
  return (
    <section
      aria-labelledby="method-heading"
      className="relative border-t border-[var(--aarohan-border)]"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-12 gap-x-6 gap-y-12">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel
              index="05"
              label="METHOD"
              tone="red"
              className="md:sticky md:top-28"
            />
          </div>

          <div className="col-span-12 md:col-span-9">
            <h2
              id="method-heading"
              className="editorial-heading text-balance text-[var(--aarohan-ink)]"
            >
              A disciplined sequence, adapted to the matter.
            </h2>
            <p className="mt-6 max-w-[68ch] editorial-body text-[var(--aarohan-ink-muted)]">
              The following sequence describes a working approach rather than
              a fixed procedure. It is not a proprietary method and does
              not imply that every matter follows the same path. Each
              instruction is shaped by its facts, forum and governing law.
            </p>

            <EditorialRule className="mt-12" />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {STAGES.map((s) => (
                <div key={s.number} className="relative">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-mono-label text-[var(--aarohan-red)]">
                      {s.number}
                    </span>
                    <span
                      aria-hidden
                      className="flex-1 h-px bg-[var(--aarohan-border)]"
                    />
                  </div>
                  <h3 className="font-display font-semibold text-2xl md:text-3xl tracking-[-0.02em] text-[var(--aarohan-ink)]">
                    {s.name}
                  </h3>
                  <p className="mt-4 editorial-body text-[var(--aarohan-ink-muted)]">
                    {s.copy}
                  </p>
                </div>
              ))}
            </div>

            <EditorialRule className="mt-16" />
            <p className="mt-6 font-mono-label text-[var(--aarohan-ink-muted)] normal-case tracking-normal text-xs">
              Working method · Not a proprietary procedure · No performance claim
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

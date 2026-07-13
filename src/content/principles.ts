/**
 * Five core principles that govern the practice.
 *
 * Per the brand brief, these are presented as principles governing the
 * practice — not as self-congratulatory claims.
 */

export type Principle = {
  number: string;
  title: string;
  copy: string;
};

export const principles: Principle[] = [
  {
    number: "01",
    title: "Constitutional fidelity",
    copy: "Our work begins with the constitutional structure within which every statute, institution and exercise of authority must be understood.",
  },
  {
    number: "02",
    title: "Candour",
    copy: "Clear advice includes identifying uncertainty, testing assumptions and saying what the law may not permit.",
  },
  {
    number: "03",
    title: "Independence",
    copy: "Independent judgment is essential to responsible advocacy. Legal analysis must remain free from pressure, convenience and fashionable conclusions.",
  },
  {
    number: "04",
    title: "Duty",
    copy: "An advocate's responsibility extends beyond a commercial instruction. It includes duties to the court, the client, the profession and the administration of justice.",
  },
  {
    number: "05",
    title: "Proportionality",
    copy: "Not every disagreement should become prolonged litigation. The appropriate legal response must remain proportionate to the rights, risks and practical interests involved.",
  },
];

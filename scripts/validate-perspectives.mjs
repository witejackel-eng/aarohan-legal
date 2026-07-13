#!/usr/bin/env node
/**
 * Build-time validation for perspectives.
 *
 * Enforces the brand-brief rule:
 *   An article may be rendered publicly only when:
 *     status = "published" and legalReview = true
 *   Every published article MUST have:
 *     - title
 *     - publicationDate
 *     - lastReviewedDate
 *     - disclaimer
 *     - legalReview flag
 *     - at least one `sources` entry when the article makes legal
 *       propositions (treated as required for all published articles
 *       in this codebase, since editorial notes routinely cite law).
 *
 * Run with: `node scripts/validate-perspectives.mjs` or
 *           `bun run scripts/validate-perspectives.mjs`
 *
 * Exits with code 1 if validation fails.
 */
import { perspectives } from "../src/content/perspectives.ts";

const errors = [];

for (const p of perspectives) {
  const id = p.slug || "(missing slug)";

  if (p.status !== "published") {
    // Non-published drafts skip the strict checks.
    continue;
  }

  if (!p.legalReview) {
    errors.push(`[${id}] Published article has legalReview=false`);
  }
  if (!p.title || p.title.trim().length === 0) {
    errors.push(`[${id}] Missing title`);
  }
  if (!p.publicationDate) {
    errors.push(`[${id}] Missing publicationDate`);
  }
  if (!p.lastReviewedDate) {
    errors.push(`[${id}] Missing lastReviewedDate`);
  }
  if (!p.disclaimer || p.disclaimer.trim().length === 0) {
    errors.push(`[${id}] Missing disclaimer`);
  }
  if (!Array.isArray(p.sources) || p.sources.length === 0) {
    errors.push(
      `[${id}] Published article makes legal propositions but has no sources`
    );
  }
  if (!Array.isArray(p.body) || p.body.length === 0) {
    errors.push(`[${id}] Published article has empty body`);
  }
  if (!p.abstract || p.abstract.trim().length === 0) {
    errors.push(`[${id}] Missing abstract`);
  }
}

if (errors.length > 0) {
  console.error("\nPerspective validation failed:\n");
  for (const e of errors) console.error("  - " + e);
  console.error("");
  process.exit(1);
}

console.log(
  `Perspective validation passed: ${perspectives.filter((p) => p.status === "published").length} published article(s) verified.`
);
process.exit(0);

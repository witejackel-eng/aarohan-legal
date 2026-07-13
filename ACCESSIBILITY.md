# Aarohan Legal — Accessibility

## Commitment

Aarohan Legal is committed to making this website accessible to all visitors, including visitors with disabilities. The website is designed to meet WCAG 2.2 AA as a practical target.

## Semantic HTML and heading hierarchy

- The website uses semantic HTML elements throughout (`main`, `header`, `nav`, `section`, `article`, `address`, `footer`).
- Each view has a single `<h1>` that describes its purpose. Subsequent headings are organised in a logical order.

## Skip-to-content link

A skip-to-content link is provided as the first focusable element on each view. It is visually hidden by default and becomes visible on focus, allowing keyboard users to bypass repeated navigation.

## Keyboard navigation

- All interactive elements are operable by keyboard.
- The full-screen index navigation supports keyboard operation, including focus trapping and restoration to the trigger button on close.
- The disclaimer dialog supports keyboard operation, including focus trapping, escape-to-leave and focus restoration to the previously focused element.
- The general enquiry form supports full keyboard operation, including the consent checkbox.

## Visible focus indicators

All interactive elements provide a visible focus indicator with strong contrast against the surrounding surface (2px solid outline with 3px offset).

## Colour contrast

The website uses a refined editorial palette designed for sufficient contrast:

- Primary text on paper background meets WCAG AA contrast.
- Muted text is used only for non-essential supplementary information.
- No essential information is conveyed by colour alone.

## Reduced-motion support

The website respects the `prefers-reduced-motion` preference globally:

- The practice-area marquee is paused and rendered as a static list.
- Parallax is disabled.
- WebGL motion is reduced — the canvas is replaced with a static SVG fallback.
- Large transform transitions are removed.
- All content remains immediately available.

## Forms

- All form fields are labelled.
- Validation errors are descriptive and announced to assistive technology via `role="alert"` and `aria-live`.
- The consent checkbox is keyboard accessible.
- The confidentiality warning is positioned directly above the message field and at the top of the form for visibility.

## SVG accessibility

- Meaningful SVGs (illustrations, diagrams) include `role="img"` and a descriptive `aria-label`.
- Decorative SVGs (background patterns, the WebGL canvas) are marked `aria-hidden`.

## Touch targets

Interactive elements meet practical minimum touch target sizes for mobile use. The site has been reviewed at 320px, 360px, 390px, 430px, 768px, 1024px, 1280px, 1440px and 1920px widths.

## Language

The `html` element has `lang="en"`. The site is written in English. Indian-English date formatting is used (e.g. `12 MAR 2025`).

## Meaningful link labels

Links use descriptive labels. No "click here" or "read more" without context. Each editorial link is paired with the title or subject of the target.

## No autoplay audio

The website does not play audio automatically.

## No cursor-only interactions

All interactions are operable by keyboard. No interaction depends solely on hover or cursor position. The desktop sticky-progression principles section, for example, falls back to a vertical sequence on mobile and tablet.

## Limitations

Despite the practice's commitment, some content may not yet conform fully to the target standard. The practice continues to review and improve the website's accessibility over time. If you encounter an accessibility barrier, please contact the practice using the verified contact information on the General Enquiries page.

## Last reviewed

This statement was last reviewed on the date shown on the Accessibility page (provisional — pending verification by the firm before launch).

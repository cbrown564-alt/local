# Douglas & Cromie — typography & layout audit

**Route:** `/concepts/douglas-cromie/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 3 / Medium 2 / Low 1

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/douglas-cromie-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/douglas-cromie-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/douglas-cromie-mobile-hero.png`

## Issues

### I1 — Headline forced into one-word-per-line column
- **Severity:** High
- **Where:** first viewport / `.dc-hero h1` (`max-width: 8ch`)
- **Observation:** "Drive away with confidence." renders as four lines — "Drive" / "away" / "with" / "confidence." — on desktop and three lines on mobile. The 8ch cap creates a tall, narrow stack that reads as accidental wrapping, not editorial line breaks. Confirmed in hero screenshots and transformation after card.
- **Suggested fix:** Remove `max-width: 8ch` from `.dc-hero h1` or raise to `14ch–16ch`. Keep the manual `<br>` after "away" in markup for a two-line rhythm ("Drive away" / "with confidence.") and drop `text-wrap: balance` if it fights the intended break.

### I2 — Headline sits on the image seam
- **Severity:** High
- **Where:** first viewport / `.dc-hero-copy` right edge abutting `.dc-hero-image`
- **Observation:** The period of "confidence." sits within ~4–8px of the column gutter where white meets the forecourt photo. On the 1280px capture the serif terminal nearly touches the blue car bonnet. Reads as text colliding with the image edge.
- **Suggested fix:** Increase right padding on `.dc-hero-copy`, e.g. change `padding: clamp(36px, 5vw, 76px) clamp(24px, 5vw, 72px)` to use a larger right value (`clamp(32px, 6vw, 96px)`), or add `padding-inline-end: clamp(40px, 7vw, 100px)` at `min-width: 981px`.

### I3 — Copy column too narrow relative to grid fraction
- **Severity:** High
- **Where:** first viewport / `.dc-hero` grid (`minmax(320px, .78fr)` copy vs `1.22fr` image)
- **Observation:** The copy column is squeezed to ~38% width while the h1 is further constrained to 8ch (~64px of glyphs). Large Georgia display type has no horizontal breathing room; the kicker and intro (`max-width: 46ch`) are wider than the headline, breaking hierarchy.
- **Suggested fix:** Widen the copy fraction to `minmax(360px, .92fr)` or give `.dc-hero h1` a `min-width` matching the intro block. Align headline measure with `.dc-intro` (`max-width: 46ch` or `min(46ch, 100%)`).

### I4 — Mobile hero horizontal padding too tight
- **Severity:** Medium
- **Where:** mobile first viewport / `.dc-hero-copy` (`padding: 40px 20px 46px` at ≤620px)
- **Observation:** At 390px the 44–66px headline glyphs sit ~20px from the viewport edge. "Drive" and "confidence." feel clipped by the screen bezel; the full-width call button below has the same 20px inset, so the headline does not align to a consistent margin with CTAs.
- **Suggested fix:** In the `max-width: 620px` block, set `.dc-hero-copy { padding-inline: clamp(24px, 6vw, 32px); }` to match `.dc-visit` and `.dc-proof` mobile padding intent.

### I5 — Proof bar label wraps awkwardly
- **Severity:** Medium
- **Where:** below hero / `.dc-proof-label` (`max-width: 10ch`)
- **Observation:** "years in the business" breaks across three lines inside the slate bar while the adjacent "50" numeral stays single-line. The 10ch cap mirrors the hero mistake — unnecessary narrowing.
- **Suggested fix:** Remove `max-width: 10ch` from `.dc-proof-label` or set `max-width: 14ch`; allow `white-space: nowrap` on "years in the business" if the bar width permits.

### I6 — Service row uneven wrapping at tablet
- **Severity:** Low
- **Where:** `.dc-service-row` (980px breakpoint)
- **Observation:** Four equal columns with bold centred text; "Servicing all makes" wraps to two lines while neighbours stay one line, breaking the row's vertical rhythm.
- **Suggested fix:** Add `font-size: clamp(14px, 1.1vw, 16px)` and `padding-inline: clamp(12px, 2vw, 28px)` on `.dc-service-row p`, or switch to `grid-template-columns: repeat(4, minmax(0, 1fr))` with `hyphens: none; text-wrap: balance`.

## Suggested fix priority
1. Remove or widen `.dc-hero h1` `max-width: 8ch` and fix intentional line break in markup (I1).
2. Add right padding / widen copy column so headline clears the image seam (I2, I3).
3. Increase mobile `.dc-hero-copy` horizontal padding (I4).
4. Fix `.dc-proof-label` measure (I5).

## Notes
- Hind body + Georgia headline follows the archived homepage identity; the defect is measure and padding, not font pairing.
- Forecourt photo gradient (`.dc-hero-image::after`) is subtle and does not cause the seam collision — that is a layout/padding issue on the copy side.
- Top strip and header alignment are acceptable; defects are localised to the hero grid.

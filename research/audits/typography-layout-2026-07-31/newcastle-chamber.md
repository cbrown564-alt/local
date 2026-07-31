# Newcastle Chamber of Commerce — typography & layout audit

**Route:** `/concepts/newcastle-chamber/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 0 / Medium 4 / Low 3

## Screenshots
- Desktop hero: `screenshots/newcastle-chamber-desktop-hero.png`
- Desktop full: `screenshots/newcastle-chamber-desktop-full.png`
- Mobile hero: `screenshots/newcastle-chamber-mobile-hero.png`

## Issues

### I1 — “Join the chamber” floats between brand and nav (mobile)
- **Severity:** Medium
- **Where:** mobile hero / `.nc-header` + `.nc-join`
- **Observation:** At 390px the join CTA sits directly under the logo block, then the full nav row appears below. The button reads as part of the logo cluster, not as a page-level action; vertical rhythm between brand → CTA → nav is uneven.
- **Suggested fix:** On mobile, move join after nav: give `.nc-join { order: 4; width: 100%; text-align: center; }` and `.nc-nav { order: 3; }` inside the existing `@media (max-width: 940px)` header flex rules, or tuck join into the nav row as the last item.

### I2 — Headline line breaks orphan “of”
- **Severity:** Medium
- **Where:** mobile hero / `.nc-story h1`
- **Observation:** Headline breaks as “Newcastle / Chamber of / Commerce” with italic “of” stranded at the end of line 2. Ragged right edge and weak connection between “Chamber” and “Commerce”.
- **Suggested fix:** Insert markup break: `Newcastle Chamber<br /><em>of Commerce</em>` or use `max-width: 11em` on `h1` with `text-wrap: balance` so “of Commerce” stays together.

### I3 — Lede and disclaimer pushed below fold on mobile
- **Severity:** Medium
- **Where:** mobile hero / `.nc-lede`, `.nc-prototype-note` (CSS order 6–7)
- **Observation:** `display: contents` reorder puts the promenade photo (order 5) before the supporting lede paragraph and prototype disclaimer. First viewport shows headline + search + CTAs but not the directory disclaimer or fuller value prop.
- **Suggested fix:** Move `.nc-lede` to order 3 (before search) and `.nc-prototype-note` to order 4, or reduce `.nc-visual-image { min-height: 200px; }` on mobile so lede peeks above the fold.

### I4 — Prototype disclaimer low contrast
- **Severity:** Medium
- **Where:** first viewport / `.nc-prototype-note`
- **Observation:** 12px `#5a6e7e` on `--mist` (#e9eef2) is legal/disclosure text at the edge of comfortable reading, especially on mobile after the reorder.
- **Suggested fix:** `color: #3d5568; font-size: 12.5px; line-height: 1.5;` or match `.nc-lede` body colour `#4a5a68`.

### I5 — Search button label vertically tight
- **Severity:** Low
- **Where:** first viewport / `.nc-search button`
- **Observation:** “Search” sits close to top/bottom edges of the navy button; adjacent input has more vertical breathing room (14px padding).
- **Suggested fix:** `padding: 14px 18px` on `.nc-search button` to match input vertical rhythm.

### I6 — “List your business” underline kisses descenders
- **Severity:** Low
- **Where:** first viewport / `.nc-link`
- **Observation:** `text-underline-offset: 6px` with brass underline sits tight under the arrow and “business” letterforms; slight collision feel.
- **Suggested fix:** `text-underline-offset: 8px` or `text-decoration-thickness: 1.5px` with `text-decoration-skip-ink: auto`.

### I7 — Footer contact block line spacing tight
- **Severity:** Low
- **Where:** full page / `.nc-site-footer p`
- **Observation:** Email, phone, and social links stack with only `6px` margin between lines — denser than body copy elsewhere.
- **Suggested fix:** `.nc-site-footer p { margin-bottom: 10px; }` or `line-height: 1.6` on footer paragraphs.

## Suggested fix priority
1. Reorder mobile content so lede/disclaimer appear before or beside the photo (I3).
2. Fix mobile join-button placement in header (I1).
3. Tighten headline line breaks on mobile (I2).
4. Bump prototype-note contrast (I4).
5. Match search button vertical padding to input (I5).

## Notes
- Newsreader + brass italic on “of Commerce” is intentional civic identity; contrast on desktop is acceptable.
- Trade rail and split hero grid align cleanly at 1280px; no collision with the Mourne Made disclosure strip.
- Photo `transform: scale(1.5)` is aggressive but does not clip caption text; not flagged as a layout defect.

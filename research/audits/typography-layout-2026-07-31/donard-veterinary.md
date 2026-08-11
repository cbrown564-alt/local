# Donard Veterinary Clinic — typography & layout audit

**Route:** `/concepts/donard-veterinary/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 2 / Medium 4 / Low 2

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/donard-veterinary-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/donard-veterinary-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/donard-veterinary-mobile-hero.png`

## Issues

### I1 — Placeholder nav reads as struck-through/deleted
- **Severity:** High
- **Where:** first viewport / `.dv-header` / `.dv-nav a[data-concept-placeholder]`
- **Observation:** Four of five header links (“Our practice”, “Pet services”, “FAQs”, “Contact”) carry `.concept-link-inert`: dotted `line-through` plus `opacity: 0.5`. In the hero they look like cancelled menu items, not “coming later”.
- **Suggested fix:** Exclude header nav from `.concept-link-inert`, or replace strikethrough with a subtler placeholder treatment (e.g. `opacity: 0.65`, no line-through, optional “(soon)” micro-label). Scope rule: `.concept-link-inert:not(.dv-nav a)` or a dedicated `.concept-placeholder` class without decoration.

### I2 — Service rail placeholders struck through in first viewport
- **Severity:** High
- **Where:** first viewport (desktop) / `.dv-rail` / `.dv-service`
- **Observation:** All six service-rail links are placeholders and show the same dotted strikethrough at the bottom of the desktop hero. The category strip reads as a row of deleted services.
- **Suggested fix:** Same as I1 — do not apply `text-decoration: line-through` to rail cells; use muted colour (`color: #665572`) and `pointer-events: none` only, or link rail items to stub routes without `data-concept-placeholder`.

### I3 — Brand subline too small on mobile header
- **Severity:** Medium
- **Where:** mobile hero / `.dv-brand-sub`
- **Observation:** Tagline “PROFESSIONAL · CARING · COMPASSIONATE” is `10px` with `letter-spacing: 0.22em` uppercase. Beside the large “Book an appointment” pill it is easy to miss and strains legibility on a phone.
- **Suggested fix:** At `max-width: 940px`, bump to `font-size: 11px`, reduce tracking to `0.14em`, or hide the subline on the narrowest breakpoints (`display: none` below 400px).

### I4 — H1 forced break splits brand name awkwardly
- **Severity:** Medium
- **Where:** first viewport / `.dv-story h1`
- **Observation:** `max-width: 9em` forces “Donard Veterinary” and “Clinic” onto separate lines with tight `line-height: 0.98`, so the business name reads as two unrelated phrases rather than one title.
- **Suggested fix:** Raise `max-width` to `11em` or remove the cap on desktop; alternatively set `text-wrap: balance` and allow a single-line title at 1280px (`max-width: none` above 940px already exists for mobile — mirror for desktop with `max-width: 12em`).

### I5 — Care-desk meta line low hierarchy beside heading
- **Severity:** Medium
- **Where:** first viewport / `.dv-care-head span`
- **Observation:** “Small-animal clinic · Newcastle” is `12px` `#665572` on lavender — legible (~5.6:1) but visually competes with the uppercase green label on the left without clear hierarchy; on narrow care-desk widths the two lines feel like duplicate location cues (kicker already says “8 Railway Street · Newcastle”).
- **Suggested fix:** Drop the right span on desktop hero or style as `font-size: 11px; color: #7a6d85`; align to baseline with the label using `align-items: baseline` and `gap: 12px`.

### I6 — Emergency strip hours cramped on mobile
- **Severity:** Medium
- **Where:** mobile hero / `.dv-strip` (breakpoint `max-width: 940px`)
- **Observation:** Strip stacks centre-aligned with `gap: 2px`; the hours string is long and sits directly under the emergency line with almost no breathing room, making opening hours hard to scan quickly.
- **Suggested fix:** Increase stacked `gap` to `6px`; split hours onto two lines with a `<br>` or `display: block` on `.dv-strip-hours`; or abbreviate (“Mon–Fri 8:30–6:30 · Wed 7 · Sat 9–1”).

### I7 — Care option helper text dense
- **Severity:** Low
- **Where:** first viewport / `.dv-care-options small`
- **Observation:** Secondary lines are `12px` / `line-height: 1.35` in a three-row grid — readable but cramped against `16px` titles, especially “Health checks, diagnostics, surgery, dental care and more.”
- **Suggested fix:** Set `font-size: 13px; line-height: 1.45` and `margin-top: 4px` on `small`.

### I8 — Phone number repeated three times in first viewport
- **Severity:** Low
- **Where:** first viewport / `.dv-strip`, `.dv-phone`, `.dv-care-hours a`
- **Observation:** Same number appears in emergency strip, header, and care-desk footer within one screen — noisy hierarchy, not a legibility failure.
- **Suggested fix:** Omit number from `.dv-care-hours` when header phone is visible (desktop), or replace footer link with “Call the clinic” text link.

## Suggested fix priority
1. Remove or soften `.concept-link-inert` strikethrough on header nav and service rail (I1, I2).
2. Fix mobile brand subline size/visibility (I3).
3. Relax desktop `h1` max-width to avoid awkward brand split (I4).
4. Improve mobile emergency-strip spacing (I6).
5. Tighten care-desk meta hierarchy (I5).

## Notes
- Strikethrough on placeholders is studio convention (`concept-shell.css` `.concept-link-inert`) but harms showcase pages where most nav/rail items are still placeholders.
- Real paths (appointments, VidiVet, tel links) render correctly without strikethrough — the care desk is the strongest craft on the page.
- Fraunces/Karla pairing and teal/plum palette are intentional brand voice, not defects.

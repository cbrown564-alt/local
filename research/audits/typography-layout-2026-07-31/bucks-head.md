# The Bucks Head — typography & layout audit

**Route:** `/concepts/bucks-head/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 2 / Medium 4 / Low 1

## Screenshots
- Desktop hero: `screenshots/bucks-head-desktop-hero.png`
- Desktop full: `screenshots/bucks-head-desktop-full.png`
- Mobile hero: `screenshots/bucks-head-mobile-hero.png`

## Issues

### I1 — Mobile hours strip doubles height and crowds the hero
- **Severity:** High
- **Where:** first viewport (mobile) / `.bh-strip`
- **Observation:** Strip stacks to two centred lines at ≤940px; measured height 80px vs 38px desktop. Combined with the taller disclosure banner (extra hearth note via `bannerNote`) and wrapped header, the story `h1` starts at `top: 375px` on a 844px screen — less than half the viewport for headline, lede, CTAs, and the booking card peek.
- **Suggested fix:** On mobile shorten copy in markup or CSS: hide low-priority segment with `.bh-strip-note { display: block; }` on its own row but use `font-size: 12px; padding-block: 6px;` on `.bh-strip`. Split hours across a collapsible “Hours” link, or show “Open today · 028…” single line with `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` until tapped.

### I2 — Booking widget only partially visible in mobile hero
- **Severity:** High
- **Where:** first viewport (mobile) / `.bh-panel` `.bh-booking`
- **Observation:** Panel `min-height: 410px` with booking card aligned `flex-end`; card top at `800px` leaves only the “Book a table” heading and brick border visible in the first 844px viewport. Form fields and “Check availability” require scroll — weak for a concept centred on reservations.
- **Suggested fix:** Reduce `.bh-panel { min-height: 320px; padding: 60px 22px 24px; }` on mobile, or promote a compact inline booking row under `.bh-actions` (date + party + button) and defer the full card. Alternatively `order` booking card immediately after lede before the hearth image band.

### I3 — Hero `h1` line-height gap between sans and serif lines
- **Severity:** Medium
- **Where:** first viewport / `.bh-story h1` and `h1 em`
- **Observation:** `h1` is uppercase Jost at `line-height: 1.04`; nested `em` is `display: block` Lora italic with `text-transform: none`. The switch creates a visible vertical dead zone between “MODERN FLARE” and “from the pass to your plate.” — hierarchy feels disconnected rather than one headline.
- **Suggested fix:** Tighten em block: `.bh-story h1 em { margin-top: -0.08em; line-height: 1.08; }` or reduce `h1` bottom margin and set `h1 { line-height: 1.02; }`. Consider keeping serif on same baseline with smaller size instead of `display: block`.

### I4 — Desktop hero `margin-bottom: 108px` leaves dead cream band
- **Severity:** Medium
- **Where:** full page (desktop) / `.bh-hero`
- **Observation:** `margin-bottom: 108px` on `.bh-hero` while `.bh-rail` is `grid-row: 2` inside the hero creates a large empty cream strip below the menu rail and above the page end (landing has no below-fold sections). Looks like unfinished layout/spacing.
- **Suggested fix:** Remove `margin-bottom: 108px` on desktop landing, or anchor rail sticky to bottom: `.bh-hero { margin-bottom: 0; min-height: calc(100vh - …); }` with rail flush to viewport bottom.

### I5 — Menu rail label vertically misaligned with items
- **Severity:** Medium
- **Where:** first viewport (desktop) / `.bh-rail-label` vs `.bh-menu`
- **Observation:** Label has `padding: 18px 26px 18px 0` while `.bh-menu` uses `padding: 16px 8px` with stacked span subtitle. “The menus” sits optically low relative to the uppercase menu names; border-right divider emphasises the offset.
- **Suggested fix:** Align flex cross-axis: `.bh-rail { align-items: stretch; }` `.bh-rail-label { display: flex; align-items: center; padding: 0 26px 0 0; }` and equalise vertical padding on `.bh-menu` (`padding: 18px 8px`).

### I6 — Booking card hugs right viewport edge
- **Severity:** Medium
- **Where:** first viewport (desktop) / `.bh-booking` in `.bh-panel`
- **Observation:** Panel uses `justify-content: flex-end` with `padding: 30px clamp(26px, 3.2vw, 50px)`; card at `left: 907px` on 1280px width leaves ~41px right inset while the story column has 46px left — card feels glued to the right edge, especially beside the gradient overlay.
- **Suggested fix:** Centre card in panel: `.bh-panel { justify-content: center; }` or add `margin-right: clamp(16px, 2vw, 32px);` on `.bh-booking`.

### I7 — Lede orphan “Bar's” line break
- **Severity:** Low
- **Where:** first viewport (desktop) / `.bh-lede`
- **Observation:** `max-width: 30em` causes “Bronagh McCormick and chef Alex Greene keep the Front” / “Bar's stove warm…” — awkward break mid-thought before “Bar's”.
- **Suggested fix:** `max-width: 34em` or `text-wrap: pretty` on `.bh-lede`; optional `Front&nbsp;Bar's` in markup.

## Suggested fix priority
1. Compress mobile hours strip + banner overhead (I1).
2. Surface booking form fields in mobile first viewport (I2).
3. Remove desktop hero bottom margin dead band (I4).
4. Unify `h1`/`em` vertical rhythm (I3).
5. Align menu rail label (I5).

## Notes
- “Flare” vs “flair” is copy, not a typography defect — not scored here.
- Buck's vs Bucks apostrophe inconsistency (`bh-kicker` vs `bh-brand-name`) is naming, not layout craft.
- Serif/sans pairing in headline is intentional Bucks Head voice; the issue is spacing between stacks, not mixing families.
- AI hearth banner note is required disclosure; craft impact is the extra banner height on mobile, captured in I1.

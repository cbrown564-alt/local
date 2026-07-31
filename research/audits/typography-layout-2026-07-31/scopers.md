# Scopers — typography & layout audit

**Route:** `/concepts/scopers/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 3 / Medium 3 / Low 2

## Screenshots
- Desktop hero: `screenshots/scopers-desktop-hero.png`
- Desktop full: `screenshots/scopers-desktop-full.png`
- Mobile hero: `screenshots/scopers-mobile-hero.png`

## Issues

### I1 — Supper Club card entirely below fold on mobile
- **Severity:** High
- **Where:** first viewport (mobile) / `.sc-panel` `.sc-club`
- **Observation:** Measured `.sc-club` at `top: 1142px` on a 844px viewport. The hero’s right-column booking surface — the concept’s secondary conversion path — does not appear until after the headline, lede, CTAs, and the full 2×2 food rail (each cell ~188px tall with full-width thumbs). Mobile visitors only see the story column and food thumbnails first.
- **Suggested fix:** At ≤940px move `.sc-panel` above `.sc-rail` and below `.sc-story` (explicit `order` values), or surface a compact `.sc-club` teaser (kicker + date + CTA only, ~160px) inline after `.sc-actions`. Reduce `.sc-rail-cell` mobile height: `.sc-rail-thumb { height: 48px; }` and horizontal scroll instead of 2×2 grid.

### I2 — Headline line breaks orphan words
- **Severity:** High
- **Where:** first viewport / `.sc-story h1`
- **Observation:** `max-width: 11em` produces desktop break “…hot food” / “bar.” with a lone period on its own line. Mobile breaks “hot” alone on one line between “zero-waste” and “food bar.” — a staircase rag that weakens the claim.
- **Suggested fix:** Remove or widen cap: `.sc-story h1 { max-width: none; }` at ≤940px, or `max-width: 16em` on desktop. Insert `<wbr>` after “zero-waste” or use `text-wrap: balance` (where supported) on the `h1`.

### I3 — Mobile header stack consumes ~25% of viewport before hero
- **Severity:** High
- **Where:** first viewport (mobile) / `.mm-concept-banner` + `.sc-strip` + `.sc-header`
- **Observation:** Disclosure banner (~92px mobile), strip, wrapped header (logo + “Book the supper club” + four nav links) push `.sc-story h1` to `top: 330px`. Less than half the viewport remains for headline + body + rail.
- **Suggested fix:** Collapse `.sc-nav` to two links on landing (`#food`, supper club) at ≤520px; shrink `.sc-book` to “Supper club” label. Consider `position: sticky` header with reduced padding after scroll — or hide `.sc-brand-sub` (already hidden at ≤520px) and tighten `.sc-header { padding-block: 8px; }`.

### I4 — Food rail thumbnails dominate mobile hero
- **Severity:** Medium
- **Where:** first viewport (mobile) / `.sc-rail` `.sc-rail-cell`
- **Observation:** Rail cells switch to column layout with `.sc-rail-thumb { width: 100%; height: 74px; }`. Four items in a 2×2 grid occupy ~190px each — visually heavier than the lede paragraph and competing with the headline for attention.
- **Suggested fix:** Use a single-row horizontal scroll on mobile: `.sc-rail { flex-wrap: nowrap; overflow-x: auto; }` `.sc-rail-cell { flex: 0 0 140px; flex-direction: row; }` `.sc-rail-thumb { width: 48px; height: 48px; }`.

### I5 — Facebook link underline spans full text width
- **Severity:** Medium
- **Where:** first viewport (mobile) / `.sc-link`
- **Observation:** “This week's menu on Facebook →” uses default underline with `text-underline-offset: 6px` and `text-decoration-color: var(--paprika)`. On mobile the underline reads as a full-width rule beneath the CTA row, visually merging with the black “See the food” button.
- **Suggested fix:** `.sc-actions .sc-link { text-decoration-thickness: 1px; text-underline-offset: 4px; }` or separate with `margin-top: 8px; display: inline-block;` when stacked.

### I6 — Four-column dish grid tightens copy on medium desktop
- **Severity:** Medium
- **Where:** below fold / `.sc-dish-grid` at 941px–1100px
- **Observation:** Four equal columns with `clamp(16px, 1.6vw, 26px)` gap squeeze card body copy to ~14.5px over ~220px width. Line lengths fall below ~35 characters; descriptions feel cramped compared to the generous hero lede.
- **Suggested fix:** Break to two columns earlier: `@media (max-width: 1100px) { .sc-dish-grid { grid-template-columns: repeat(2, 1fr); } }` (already drops to 2 at 940px — consider 1100px threshold).

### I7 — Supper club small print low contrast
- **Severity:** Low
- **Where:** first viewport (desktop) / `.sc-club small`
- **Observation:** “Booking via Instagram · message to reserve” at 12px `#a89f87` on `--iron` (`#26231e`) is ~4.2:1 — borderline for small centred text.
- **Suggested fix:** `.sc-club small { color: #c4baa8; font-size: 12.5px; }`.

### I8 — Strip Facebook link uses inline style
- **Severity:** Low
- **Where:** first viewport / `.sc-strip a` (`style="color:#fff;"` in markup)
- **Observation:** Inline white override bypasses the design system; if strip link styles change, this link alone may drift. Not a visible defect today but inconsistent with `.sc-strip` token usage.
- **Suggested fix:** Move to CSS: `.sc-strip a { color: #fff; font-weight: 600; }` in `concept-scopers.css` and remove inline attribute.

## Suggested fix priority
1. Bring supper club card into mobile first screen (I1).
2. Fix `h1` rag/orphan breaks (I2).
3. Reduce mobile chrome height before hero (I3).
4. Slim the food rail on mobile (I4).
5. Widen dish grid breakpoint (I6).

## Notes
- Paprika emphasis on “zero-waste” and kelp rail are intentional brand choices; contrast on white/buttermilk is adequate.
- Generated-food disclaimer in `.sc-provenance` is appropriately subdued; not a hierarchy defect.
- Owner badge PNG in header is deliberately non-circular; not flagged.

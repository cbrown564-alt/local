# Castle Farm — typography & layout audit

**Route:** `/concepts/castle-farm/`
**Date:** 2026-07-31
**Severity summary:** Critical 2 / High 1 / Medium 3 / Low 2

## Screenshots
- Desktop hero: `screenshots/castle-farm-desktop-hero.png`
- Desktop full: `screenshots/castle-farm-desktop-full.png`
- Mobile hero: `screenshots/castle-farm-mobile-hero.png`

## Issues

### I1 — Primary CTAs struck through and halved in opacity
- **Severity:** Critical
- **Where:** first viewport / `.farm-button`, `.farm-box-action a`
- **Observation:** Both “Choose a produce box” and “Start a box” use `data-concept-placeholder` → `.concept-link-inert` adds dotted `line-through` and `opacity: 0.5`. On a shop concept, the main commerce actions look cancelled/unclickable in both hero columns.
- **Suggested fix:** Point CTAs at a real stub route (`/concepts/castle-farm/box/` or `#`) without `data-concept-placeholder`, or override in `concept-castle-farm.css`: `.farm-button.concept-link-inert, .farm-box-action a.concept-link-inert { opacity: 1; text-decoration: none; }` while keeping `pointer-events: none` if needed.

### I2 — Primary CTA contrast fails when inert
- **Severity:** Critical
- **Where:** first viewport / `.farm-button` on `.farm-hero-copy`
- **Observation:** With `opacity: 0.5`, navy `#0b1735` text on gold `#cfae68` measures ~2.79:1 — far below 4.5:1. Combined with strikethrough, the button fails legibility and looks broken.
- **Suggested fix:** Fixing I1 restores full opacity (~8:1+). If placeholders remain, never apply opacity reduction to filled buttons; use `background: #a89258` + full-opacity text instead.

### I3 — Entire header nav and basket struck through
- **Severity:** High
- **Where:** first viewport / `.concept-nav a`, `.concept-basket`
- **Observation:** All nav links and “Basket · 0” are placeholders with dotted strikethrough. A grocery concept header should signal shop structure; instead every category reads deleted.
- **Suggested fix:** Remove `data-concept-placeholder` from nav/basket for showcase, or scope `.concept-link-inert` to exclude `.concept-header a` / use muted `#c9c7c1` text without decoration for inactive items.

### I4 — Mobile header loses nav, only strikethrough basket
- **Severity:** Medium
- **Where:** mobile hero / `.concept-header` (`max-width: 820px`)
- **Observation:** `.concept-nav { display: none }` hides categories on mobile; only logo and strikethrough “Basket · 0” remain — weak wayfinding and no clean primary header action.
- **Suggested fix:** Show a single “Shop” or “Boxes” link on mobile, or a hamburger with non-inert labels; ensure basket placeholder does not use strikethrough.

### I5 — Duplicate box CTAs with equal weight
- **Severity:** Medium
- **Where:** first viewport / `.farm-button` + `.farm-box-action a`
- **Observation:** Two gold buttons (“Choose a produce box” / “Start a box”) in the same hero compete at similar size and styling; hierarchy unclear which is primary, especially once strikethrough is removed.
- **Suggested fix:** Make left CTA primary (filled gold) and image overlay link outline/ghost (`background: transparent; border: 2px solid #cfae68; color: #fff`), or remove duplicate and keep one CTA in `.farm-box-action`.

### I6 — Faithful-visualisation caption small and edge-hugging
- **Severity:** Medium
- **Where:** first viewport / `.farm-produce figcaption`
- **Observation:** `10px` caption sits `top: 16px; right: 18px` over busy produce photo — readable on navy chip but easy to miss and visually detached from the box overlay copy below.
- **Suggested fix:** Increase to `11px`, `line-height: 1.4`, `max-width: 220px`; or move caption below image on mobile (`position: static` inside figure flow).

### I7 — Wordmark CSS crop fragile
- **Severity:** Low
- **Where:** first viewport / `.farm-wordmark img`
- **Observation:** Square master cropped with `transform: translateY(-70px)` (desktop) / `-59px` (mobile) — any asset dimension change breaks the lockup alignment.
- **Suggested fix:** Export a dedicated wordmark asset or use `object-fit` + fixed `object-position` on a wide crop rather than manual translate offsets.

### I8 — Step row cramped at mobile single column
- **Severity:** Low
- **Where:** mobile / `.farm-steps` (`max-width: 430px`)
- **Observation:** Single-column steps with `font-size: 12px` and gold numerals — functional but tight vertical rhythm after large hero CTA.
- **Suggested fix:** `padding: 14px 0` on `li`, `font-size: 13px` on step labels.

## Suggested fix priority
1. Remove inert strikethrough/opacity from primary CTAs (I1, I2).
2. Fix header nav/basket placeholder styling (I3).
3. Add mobile nav or clean basket treatment (I4).
4. Clarify single primary box CTA hierarchy (I5).
5. Improve caption size/placement (I6).

## Notes
- Navy/gold farm palette and Georgia headline are intentional; produce photo and faithful-box visualisation are strong.
- Atkinson Hyperlegible on buttons is intentional via `ConceptLayout` font stack — strikethrough comes from JS placeholder class, not the font.
- `/transformations/castle-farm/` card will show the same struck-through commerce chrome until placeholder styling is fixed.

# Mourne Cycles — typography & layout audit

**Route:** `/concepts/mourne-cycles/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 3 / Medium 3 / Low 2

## Screenshots
- Desktop hero: `screenshots/mourne-cycles-desktop-hero.png`
- Desktop full: `screenshots/mourne-cycles-desktop-full.png`
- Mobile hero: `screenshots/mourne-cycles-mobile-hero.png`

## Issues

### I1 — “Trekdealer” missing word space in lede
- **Severity:** High
- **Where:** first viewport / `.mc-lede` (`mourne-cycles.astro` markup)
- **Observation:** Rendered text is “listed as a Trekdealer and Cyclescheme retailer” — no space between bold “Trek” and “dealer”. DOM text confirms collapsed whitespace between `</strong>` and `dealer` across desktop and mobile.
- **Suggested fix:** Add explicit space inside markup: `<strong>Trek</strong> dealer` on one line, or `{' '}` after `</strong>` in Astro.

### I2 — Secondary hero link struck through and faded
- **Severity:** High
- **Where:** first viewport / `.mc-actions` / `.mc-link[data-concept-placeholder]`
- **Observation:** “Explore the bike range →” is a placeholder: `.concept-link-inert` applies dotted `line-through` and `opacity: 0.5` on the coal panel. It reads as a disabled/deleted action beside the primary red CTA.
- **Suggested fix:** Remove `data-concept-placeholder` if linking to a stub bikes page, or exclude `.mc-link` from inert styling; use muted `color: var(--steel-light)` without line-through for secondary ghost links.

### I3 — Category rail entirely struck through
- **Severity:** High
- **Where:** first viewport (desktop) / `.mc-rail` / `.mc-cell[data-concept-placeholder]`
- **Observation:** All five bike categories (Electric, Road, Mountain, Hybrid, Kids) show dotted strikethrough. The bottom rail — a major hierarchy element — looks like deleted inventory.
- **Suggested fix:** Do not mark rail cells with `data-concept-placeholder` in the showcase build, or override `.concept-link-inert` inside `.mc-rail` (`text-decoration: none; opacity: 1; color: inherit`).

### I4 — Header nav placeholders struck through
- **Severity:** Medium
- **Where:** first viewport / `.mc-nav a[data-concept-placeholder]`
- **Observation:** “ACCESSORIES” and “VISIT US” carry strikethrough while “BIKES”, “WORKSHOP”, and “CYCLE TO WORK” are clean — asymmetric, broken nav rhythm.
- **Suggested fix:** Same placeholder treatment as I2/I3; prefer uniform nav styling with inactive items at reduced opacity only.

### I5 — Mobile address strip tight when phone wraps
- **Severity:** Medium
- **Where:** mobile hero / `.mc-strip`
- **Observation:** With `font-size: 12px`, uppercase, and `letter-spacing: 0.14em`, the phone number wraps to a second line with minimal line-height; the two lines nearly touch. First span hidden on mobile leaves only address+phone in a thin bar.
- **Suggested fix:** At `max-width: 940px`, set `line-height: 1.45`, `padding-block: 10px`, and allow `white-space: normal`; optionally break after address with `display: block` on the phone link.

### I6 — Workshop disclaimer microtext
- **Severity:** Medium
- **Where:** first viewport (desktop) / `.mc-workshop-note`
- **Observation:** “No invented service prices…” is `11px` centred on coal — easy to overlook and feels like footer cruft intruding into the hero grid.
- **Suggested fix:** Move to `12px`, `padding: 10px 16px`, or relocate below the rail as a full-width studio honesty line outside `.mc-workshop-desk`.

### I7 — Condensed hero H1 tight against thesis
- **Severity:** Low
- **Where:** first viewport / `.mc-story h1` + `.mc-thesis`
- **Observation:** `line-height: 0.92` on 60–88px uppercase italic leaves the red “CYCLES” line visually crowded against the thesis below; acceptable on desktop but heavy on mobile.
- **Suggested fix:** Add `margin-bottom: 16px` on `h1` (currently `12px`) or set `line-height: 0.96` on mobile.

### I8 — Mobile header CTA dominates logo lockup
- **Severity:** Low
- **Where:** mobile hero / `.mc-header` / `.mc-book`
- **Observation:** Red “BOOK A SERVICE” button is taller than the mountain wordmark block; top-aligned pair leaves dead space under the logo and unbalanced header mass.
- **Suggested fix:** At mobile breakpoint, reduce `.mc-book` padding to `10px 14px`, `font-size: 15px`, or vertically centre header with `align-items: center` on `.mc-header`.

## Suggested fix priority
1. Fix Trek/dealer whitespace in `.mc-lede` markup (I1).
2. Remove strikethrough from rail and secondary hero link (I2, I3).
3. Clean up header placeholder nav styling (I4).
4. Loosen mobile `.mc-strip` line-height when phone wraps (I5).
5. Improve workshop disclaimer legibility/placement (I6).

## Notes
- Barlow Condensed industrial voice is intentional; coal/red split hero is strong craft where placeholders are not strikethrough.
- Workshop desk panel (steps, dual CTAs) has clear hierarchy — best-layout region on the page.
- `/transformations/mourne-cycles/` after card uses the same concept shell; strikethrough placeholders will read equally broken there.

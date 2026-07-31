# Cúpla — typography & layout audit

**Route:** `/concepts/cupla/`
**Date:** 2026-07-31
**Severity summary:** Critical 1 / High 2 / Medium 3 / Low 1

## Screenshots
- Desktop hero: `screenshots/cupla-desktop-hero.png`
- Desktop full: `screenshots/cupla-desktop-full.png`
- Mobile hero: `screenshots/cupla-mobile-hero.png`

## Issues

### I1 — Mobile first viewport shows counter panel, not the brand name
- **Severity:** Critical
- **Where:** first viewport (mobile) / `.cp-hero` grid order
- **Observation:** CSS sets `.cp-counter-panel { order: 0 }` and `.cp-story { order: 1 }` at ≤940px. Measured: `.cp-story h1` (“Cúpla”) sits at `top: 896px` — below the 844px viewport — while the counter panel, bilingual list, and 11px disclaimer fill the screen. The page’s primary wordmark is not visible on first paint.
- **Suggested fix:** Reverse mobile order: `.cp-story { order: 0; }` `.cp-counter-panel { order: 1; }`, or show a compact brand lockup inside `.cp-counter-head` (add `.cp-brand-name` at mobile sizes). Trim counter panel height (smaller `h2`, hide `.cp-counter-rings` below 940px) so both panels fit above the fold.

### I2 — Decorative rings collide with counter heading
- **Severity:** High
- **Where:** first viewport / `.cp-counter-rings` vs `.cp-counter-panel h2`
- **Observation:** The SVG sits `position: absolute; top: 20px; right: 18px; width: min(32%, 170px)` and overlaps the “and” in “Brews, bakes and bowls.” On mobile the rings extend to the viewport edge (125px wide, `right: 18px`), clipping the circle and reducing legibility of the italic display line.
- **Suggested fix:** `@media (max-width: 940px) { .cp-counter-rings { display: none; } }` or move rings behind copy with lower opacity and `pointer-events: none; right: -24px; width: 120px;` so no glyph overlap. Add `padding-right` on `h2` equal to ring width on desktop.

### I3 — Placeholder links strikethrough pollutes bilingual chrome
- **Severity:** High
- **Where:** first viewport / `.cp-nav a[data-concept-placeholder]`, `.cp-rail-cell[data-concept-placeholder]`
- **Observation:** “Ár scéal · Our story”, “Aimsigh sinn · Find us”, and three of four rail cells show dotted strikethrough at 50% opacity. On a concept whose craft thesis is bilingual pairing, the Irish lines read as errors, not inactive sections.
- **Suggested fix:** Scope inert styling away from bilingual labels — e.g. `body.concept-cupla .cp-nav [data-concept-placeholder] { opacity: 1; text-decoration: none; cursor: default; }` with a subtle `(soon)` suffix in `--sage-ink` instead of strikethrough. Hide unused rail cells on landing rather than showing struck-through “Maidin / Morning”.

### I4 — Counter disclaimer too small for disclosure copy
- **Severity:** Medium
- **Where:** first viewport / `.cp-counter-note`
- **Observation:** Menu-sample disclaimer is 11px/1.4 on `#0b231d` (`#a9bfb3` text). On mobile it spans full width at the bottom of the hero column — easy to miss and below AA for body-sized disclosure text.
- **Suggested fix:** Bump to `font-size: 12.5px; line-height: 1.45; padding: 10px 15px;` and lighten text to `#c5d4cb` for ≥4.5:1 on `#0b231d`.

### I5 — Mobile nav links undersized and separator-inconsistent
- **Severity:** Medium
- **Where:** first viewport (mobile) / `.cp-nav a`
- **Observation:** Nav drops to `font-size: 11.5px` with mixed `·` and `•` separators between Irish/English pairs. Wrapped links in a three-item row feel cramped under the follow pill.
- **Suggested fix:** Standardise on `·` in markup; set `font-size: 12.5px; gap: 6px 12px;`. Consider moving nav into `.cp-rail` on mobile and keeping header to brand + follow only.

### I6 — Thesis line contrast borderline on petrol
- **Severity:** Medium
- **Where:** first viewport (desktop) / `.cp-thesis`
- **Observation:** “Fáilte isteach. Come on in.” uses `#f0cfad` at up to 30px on `--petrol` (`#1d4e54`). Secondary welcome line reads noticeably dimmer than the white `h1` beside it; measured colour pair is ~3.8:1 — short of AA for large text if treated as body.
- **Suggested fix:** Lighten to `#f5dcc0` or `#fff` at 0.92 opacity: `.cp-thesis { color: rgba(255,255,255,0.92); }` with the Irish span at full white.

### I7 — Counter action bar text hugs edges on narrow widths
- **Severity:** Low
- **Where:** first viewport (mobile) / `.cp-counter-actions a`
- **Observation:** “Féach ar an mbiachlár · See the menu →” in a single row with `justify-content: space-between` pushes the arrow within a few pixels of the right edge at 390px.
- **Suggested fix:** Add `padding-inline: 20px;` on `.cp-counter-actions a` and allow the label to wrap: `flex-wrap: wrap; row-gap: 4px;`.

## Suggested fix priority
1. Restore brand `h1` above the fold on mobile (I1).
2. Remove ring/heading collision (I2).
3. Replace strikethrough placeholder styling in bilingual UI (I3).
4. Increase disclaimer size/contrast (I4).
5. Brighten `.cp-thesis` (I6).

## Notes
- Petrol story column + oat rail is intentional; the mobile reorder to counter-first was likely meant to show the café panel but costs the wordmark.
- Bilingual list in `.cp-counter-list` (Irish italic left, English small-caps right) is deliberate hierarchy; English at 12px uppercase is acceptable on dark petrol.
- Studio disclosure banner is excluded from concept craft scoring.

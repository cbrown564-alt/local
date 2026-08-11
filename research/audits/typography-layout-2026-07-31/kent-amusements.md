# Kent Amusements — typography & layout audit

**Route:** `/concepts/kent-amusements/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 2 / Medium 4 / Low 2

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/kent-amusements-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/kent-amusements-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/kent-amusements-mobile-hero.png`

## Issues

### I1 — Coral accent text below large-text contrast minimum
- **Severity:** High
- **Where:** first viewport / `.ka-story h1 em`, `.ka-thesis`
- **Observation:** “AMUSEMENTS” and “FIFTY SUMMERS OF SEASIDE FUN.” use `--coral-deep` (#c9443a) on `--spray` (#dceef2). CSS comment in `concept-kent-amusements.css` records 2.92:1 — below the 3:1 large-text threshold. Red-on-mist reads washed at a glance.
- **Suggested fix:** Use `--coral-ink` (#a3352c) for text accents (already defined for safe text): `.ka-story h1 em, .ka-thesis { color: var(--coral-ink); }` — keep `--coral-deep` for fills only.

### I2 — Display heading line-height cramped
- **Severity:** High
- **Where:** first viewport / `.ka-story h1`, `.ka-thesis`
- **Observation:** Teko stack runs `line-height: 0.86` on h1 and `0.95` on thesis. “KENT”, “AMUSEMENTS”, and “FIFTY SUMMERS…” visually touch — ascenders/descenders collide, especially on mobile where all three lines dominate the fold.
- **Suggested fix:** Loosen to `line-height: 0.92` on `.ka-story h1` and `line-height: 1` on `.ka-thesis`; add `margin-bottom: 4px` between h1 and thesis.

### I3 — Mobile header crammed to viewport edges
- **Severity:** Medium
- **Where:** mobile hero / `.ka-header`, `.ka-brand`, `.ka-call`
- **Observation:** At 390px the logo mark and “Call 028…” button sit ~16px from screen edges with no breathing room; brand subline is hidden (`display: none`) so the header feels edge-to-edge and imbalanced.
- **Suggested fix:** At `max-width: 520px`, use `padding-inline: 20px` on `.ka-header` (already 16px — bump to 20–22px) and `gap: 14px`; optionally show abbreviated subline: `.ka-brand-sub { display: block; font-size: 9px; }`.

### I4 — “Inside” board header flush to section top (mobile)
- **Severity:** Medium
- **Where:** mobile hero / `.ka-now-head`
- **Observation:** When the dark board stacks below the story, `.ka-now-head` labels sit hard against the top edge of the navy block with minimal separation from the hero above — abrupt colour transition, no vertical cushion.
- **Suggested fix:** Add `padding-top: 12px` on `.ka-now-board` at `max-width: 940px`, or `margin-top: 8px` between `.ka-story` and `.ka-now-board`.

### I5 — Attraction descriptors hidden on mobile board
- **Severity:** Medium
- **Where:** mobile hero / `.ka-now-attractions small` (`display: none` at ≤940px)
- **Observation:** Board rows show only number + title + arrow; “Indoor bumper cars”, “New for 2026”, etc. disappear. Hierarchy collapses to bare ride names with no supporting type size differentiation.
- **Suggested fix:** Keep descriptors visible: remove `small { display: none; }` and switch grid to two rows — `grid-template-columns: 34px 1fr auto; grid-template-rows: auto auto;` with `small { grid-column: 2; font-size: 11px; }`.

### I6 — Bottom rail duplicates board content
- **Severity:** Medium
- **Where:** first viewport / `.ka-rail` vs `.ka-now-attractions`
- **Observation:** Dodgems / VR / Arcade / Call appear in both the right-hand board and the bottom rail within the same viewport on desktop. Repetition adds visual noise without hierarchy gain (not strategy — layout redundancy).
- **Suggested fix:** On desktop, hide the rail when the board is visible: `@media (min-width: 941px) { .ka-rail { display: none; } }`, or reduce rail to phone-only contact cell.

### I7 — Repeated location string three times in hero
- **Severity:** Low
- **Where:** first viewport / `.ka-brand-sub`, `.ka-kicker`, `.ka-now-head`
- **Observation:** “Central Promenade · Newcastle” (or variant) appears in logo subline, story kicker, and board header — typographic echo, not broken layout.
- **Suggested fix:** Drop kicker line (`.ka-kicker`) on desktop where brand subline already states location, or change board header to “Today at Kent”.

### I8 — “Open today?” bar text size jump
- **Severity:** Low
- **Where:** first viewport / `.ka-now-hours`
- **Observation:** Body line is 12px but `strong` jumps to 14px inside a 14px-tall bar — tight vertical fit, especially when bar stacks on mobile (`flex-direction: column`).
- **Suggested fix:** Uniform `font-size: 13px` with `strong { font-weight: 800; }`, or increase bar padding to `16px` vertical.

## Suggested fix priority
1. Swap coral accent text to `--coral-ink` (I1).
2. Loosen Teko line-height on h1/thesis (I2).
3. Restore mobile attraction descriptors on the board (I5).
4. Add cushion between story and board on mobile (I4).
5. Deduplicate rail vs board on desktop (I6).

## Notes
- Teko all-caps display voice is intentional seaside poster identity; density is a choice, but contrast and leading still need correction.
- `.ka-call` already uses `--coral-ink` for accessible button fill — apply the same token discipline to headline accents.
- Nav links are live (no placeholder strikethrough); header craft is stronger than batch-two clinical concepts.

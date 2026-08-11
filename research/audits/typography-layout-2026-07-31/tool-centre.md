# The Tool Centre — typography & layout audit

**Route:** `/concepts/tool-centre/`
**Date:** 2026-07-31
**Severity summary:** Critical 0 / High 2 / Medium 4 / Low 2

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/tool-centre-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/tool-centre-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/tool-centre-mobile-hero.png`

## Issues

### I1 — Header tagline fails contrast on cream header
- **Severity:** High
- **Where:** first viewport / `.tc-brand-sub` in `.tc-header`
- **Observation:** “Hardware · Plant & tool hire” renders in `--hivis-deep` (`#d4b600`) at 10px/600 on the `--floor` (`#f0f0f0`) header background. At ~2.5:1 contrast this is below AA for normal text and effectively invisible at arm’s length on mobile.
- **Suggested fix:** Scope a header-only token, e.g. `.tc-header .tc-brand-sub { color: var(--mute); }` or darken to `#8a7200`/`#6b5a00` so 10px uppercase clears 4.5:1 on `#f0f0f0`. Keep `--hivis-deep` for on-dark/yellow contexts only.

### I2 — Mobile headline orphans “YARD.”
- **Severity:** High
- **Where:** first viewport (mobile) / `.tc-story h1`
- **Observation:** At 390px the uppercase headline breaks as “HARDWARE ON THE SHELF. HIRE ON THE” / “YARD.” — a single word on its own line. The `max-width: 12em` constraint is removed at ≤940px but the full-width column still produces a ragged, unbalanced stack.
- **Suggested fix:** Add a mobile rule such as `.tc-story h1 { font-size: clamp(28px, 8.5vw, 40px); max-width: 14ch; }` or insert a `<wbr>`/soft break after “shelf.” in markup so “Hire on the yard.” stays grouped. Alternatively reduce tracking slightly on mobile (`letter-spacing: 0`).

### I3 — Desktop headline breaks mid-phrase
- **Severity:** Medium
- **Where:** first viewport (desktop) / `.tc-story h1`
- **Observation:** `max-width: 12em` forces “SHELF. HIRE ON THE” onto one line while “YARD.” wraps, splitting the second sentence across lines at an arbitrary word boundary rather than the sentence boundary after the period.
- **Suggested fix:** Raise `max-width` to `14em`–`15em`, or set `max-width: none` from 1100px up. Better: wrap the `<em>` block so colour change aligns with “Hire on the yard.” as a unit.

### I4 — Mobile header tagline wraps to three lines beside CTA
- **Severity:** Medium
- **Where:** first viewport (mobile) / `.tc-brand-text` + `.tc-call`
- **Observation:** `.tc-brand-sub` measures 93×47px beside a 177×47px call button — the 0.22em-tracked 10px line wraps to ~3 lines while the button stays single-line, making the header row visually lopsided and taller than the 80px desktop spec.
- **Suggested fix:** At ≤940px add `.tc-brand-sub { letter-spacing: 0.12em; white-space: nowrap; font-size: 9px; }` or stack brand block above the call button (`.tc-header { flex-wrap: wrap; }` with `.tc-call { margin-left: auto; }` on row 1 only).

### I5 — Placeholder nav links show strikethrough in hero chrome
- **Severity:** Medium
- **Where:** first viewport / `.tc-nav a[data-concept-placeholder]`
- **Observation:** “Hardware”, “Gas”, “Hours”, “Find us” render with dotted strikethrough and 50% opacity (`.concept-link-inert`). In the primary nav this reads as broken links, not “coming soon”, and breaks visual consistency with the live “Hire” link.
- **Suggested fix:** Either hide placeholders on the landing nav (`display: none` for `[data-concept-placeholder]` in `.tc-nav` only) or replace with a non-link label style (no underline animation, `color: var(--mute)`, no strikethrough).

### I6 — Category rail competes with hero on mobile
- **Severity:** Medium
- **Where:** first viewport (mobile) / `.tc-rail`
- **Observation:** The dark `.tc-rail` grid begins at ~754px from the top, consuming the lower third of the 844px viewport while the lede and CTAs are still above it. Food-category labels feel like footer chrome, not hero content.
- **Suggested fix:** On mobile defer the rail below a min-height story block: `.tc-hero { grid-template-rows: auto auto auto; }` with `.tc-rail { order: 3; margin-top: 8px; }`, or collapse to a single horizontal scroll strip with smaller `.tc-cat` (12px) so the headline + lede fill the first screen.

### I7 — Phone number repeated three times above fold
- **Severity:** Low
- **Where:** first viewport / `.tc-strip`, `.tc-call`, `.tc-desk-cta`
- **Observation:** The same number appears in the strip, header button, and hire-desk card. Typographically this clutters the header and dilutes hierarchy between strip utility and primary CTA.
- **Suggested fix:** Keep the number in `.tc-strip` and `.tc-desk-cta`; change `.tc-call` label to “Call the yard” or icon-only on desktop widths where the strip already shows the number.

### I8 — “Day rate on request” column feels cramped at narrow desk widths
- **Severity:** Low
- **Where:** first viewport / `.tc-rate-ask` in `.tc-rates li`
- **Observation:** `white-space: nowrap` on the right column keeps four identical strings aligned but forces the left `.tc-rate-item` labels to compress when the desk card is near its 392px cap; gap is only 14px.
- **Suggested fix:** At card widths under 360px switch to stacked layout: `.tc-rates li { flex-direction: column; align-items: flex-start; gap: 2px; }` and drop `white-space: nowrap` on `.tc-rate-ask`.

## Suggested fix priority
1. Fix `.tc-brand-sub` contrast on the cream header (I1).
2. Repair mobile headline line breaks (I2).
3. Tame mobile header wrapping beside the call button (I4).
4. Remove or restyle placeholder nav strikethrough (I5).
5. Adjust desktop `h1` max-width / break points (I3).

## Notes
- Uppercase Chivo + hi-vis yellow on dark panels is intentional trade-counter voice; defects are where those tokens land on light surfaces.
- Yellow `<em>` colouring inside the `h1` is deliberate emphasis; the issue is line-break placement, not the colour split itself.
- Mourne Made disclosure banner typography (Arial 12px) is studio chrome, not Tool Centre craft.

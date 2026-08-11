# Newcastle Family Dental Care — typography & layout audit

**Route:** `/concepts/newcastle-dental/`
**Date:** 2026-07-31
**Severity summary:** Critical 1 / High 2 / Medium 4 / Low 2

## Screenshots
- Desktop hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/newcastle-dental-desktop-hero.png`
- Desktop full: `../../../media/audits/typography-layout-2026-07-31/screenshots/newcastle-dental-desktop-full.png`
- Mobile hero: `../../../media/audits/typography-layout-2026-07-31/screenshots/newcastle-dental-mobile-hero.png`

## Issues

### I1 — Primary CTAs rendered inert (strikethrough + 50% opacity)
- **Severity:** Critical
- **Where:** first viewport / `.nd-book`, `.nd-submit` (`data-concept-placeholder`)
- **Observation:** “Request a visit” and “Send request securely” inherit `.concept-link-inert` from `ConceptLayout.astro` (opacity 0.5, dotted line-through). Both read as disabled/deleted and fail as the page’s two primary actions.
- **Suggested fix:** Remove `data-concept-placeholder` from `.nd-book` and `.nd-submit`, or scope `.concept-link-inert` to `header nav a` only so form/header CTAs keep full weight: e.g. `body.concept-page > header nav a.concept-link-inert { … }` and leave buttons alone.

### I2 — Nav links struck through at half opacity
- **Severity:** High
- **Where:** first viewport / `.nd-nav a` (`data-concept-placeholder`)
- **Observation:** All four nav items (“The practice”, “Treatments”, “Register”, “Contact”) show dotted strikethrough and 50% opacity. On a patient-facing concept they look broken, not “preview”.
- **Suggested fix:** Drop placeholder treatment on nav links and use a subtler non-link style instead — e.g. `span.nd-nav-item` with `color: var(--nd-ink-soft)` and no underline animation — or replace `.concept-link-inert` with `cursor: default` and a “Preview” tooltip without line-through.

### I3 — Reason radio row cramped at desktop width
- **Severity:** Medium
- **Where:** first viewport / `.nd-field--choice label`
- **Observation:** “Register”, “Check-up”, and “In pain” share one row with `flex: 1` and only `10px 8px` padding. Label text sits flush against borders; “In pain” feels squeezed next to the form edge.
- **Suggested fix:** Increase horizontal padding to `10px 12px`, add `min-width: 0` on labels, or stack vertically below ~520px: `@media (max-width: 520px) { .nd-field--choice { flex-direction: column; } }`.

### I4 — Care pills orphan on mobile
- **Severity:** Medium
- **Where:** first viewport / `.nd-care`
- **Observation:** At 390px, three pills sit on row 1 and “Mon–Fri 9–5” wraps alone on row 2, leaving a visual hole and uneven tag block.
- **Suggested fix:** Use a two-column grid on narrow screens: `.nd-care { display: grid; grid-template-columns: 1fr 1fr; }` at `max-width: 520px`, or shorten copy (“Mon–Fri 9–5” → “9–5 weekdays”).

### I5 — H1 second-line line-height gap
- **Severity:** Medium
- **Where:** first viewport / `.nd-lede h1` + `h1 em` (Instrument Serif italic)
- **Observation:** “Your family dentist,” and “close to home.” have a visibly larger gap than the tight `line-height: 1.02` intends — the italic serif’s ascenders/descenders add dead space between lines.
- **Suggested fix:** Tighten with `line-height: 0.95` on `h1` and `display: block` on `br`, or reduce `em` size slightly: `.nd-lede h1 em { font-size: 0.92em; line-height: 1; }`.

### I6 — Team cards clipped in first viewport
- **Severity:** Medium
- **Where:** first viewport / `.nd-team`
- **Observation:** On 1280×800 desktop hero, the third dentist card (Dr Sandford) is cut off at the bottom edge; only two cards read as complete in the fold.
- **Suggested fix:** Reduce top/main padding — e.g. `.nd-main { padding-bottom: 72px; }` and `margin-top: 20px` on `.nd-team` — or collapse team to a single horizontal scroll row on shorter viewports.

### I7 — Strip secondary text low contrast
- **Severity:** High
- **Where:** first viewport / `.nd-strip`
- **Observation:** Address line uses `#eaf0ff` on `--nd-blue-deep` (#26389a). Readable but thin at 11.5px; phone link is stronger white. The non-linked span reads weaker than the tel link beside it.
- **Suggested fix:** Set `.nd-strip { color: #fff; }` and use `opacity: 0.85` only on a wrapper if hierarchy is needed, or bump strip to `font-size: 12.5px`.

### I8 — Member initial off-centre in avatar circle
- **Severity:** Low
- **Where:** `.nd-member-initial`
- **Observation:** Serif initials (K, M, S) sit slightly low in the 38px circles — optical misalignment, not catastrophic.
- **Suggested fix:** Switch to sans for initials or add `padding-top: 1px; line-height: 1;` on `.nd-member-initial`.

### I9 — Mobile “Request a visit” tight horizontal padding
- **Severity:** Low
- **Where:** mobile hero / `.nd-book`
- **Observation:** Pill button text nearly touches left/right edges at 390px; feels narrower than the URL bar below it.
- **Suggested fix:** `padding: 11px 22px` on `.nd-book`, or `align-self: flex-start` with `min-width: 11rem`.

## Suggested fix priority
1. Remove inert styling from `.nd-book` and `.nd-submit` (I1).
2. Replace nav strikethrough treatment with a non-destructive preview style (I2).
3. Bump strip text contrast/size (I7).
4. Fix mobile care-pill wrap (I4).
5. Loosen reason radio row padding or stack on mobile (I3).

## Notes
- Instrument Serif italic on “close to home.” is intentional voice, not a defect.
- Mourne Made concept banner and disclosure strip are studio chrome; excluded from concept craft scoring.
- Secure URL bar pill is deliberate product messaging; spacing to eyebrow is tight but acceptable once CTA contrast is fixed.

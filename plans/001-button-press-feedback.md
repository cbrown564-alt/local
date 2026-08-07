# 001 — Give `.button` press feedback on tap

- **Status**: DONE — verified on device 2026-08-07 (commit d22516b)
- **Commit**: 3f9d543
- **Severity**: HIGH
- **Category**: Physicality & origin (missing press feedback) / Accessibility
- **Estimated scope**: 1 file, ~6 lines

## Problem

`.button` is the site-wide call to action — every "Request a free before-and-after",
every "Browse local website examples", on every page. It has a hover state and
nothing else:

```css
/* src/site/styles/global.css:64 — current */
.button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 54px; padding: 12px 20px; border: 2px solid var(--blue); background: var(--blue); color: var(--white); text-decoration: none; font-weight: 700; transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease; }
.button:hover { border-color: var(--ink); background: var(--ink); }
```

There is no `:active` rule anywhere in the stylesheet for `.button`, `.button-secondary`
or `.button-blue`. Confirmed by searching `src/site/styles/*.css` — the only matches for
`.button:` are `:hover` (`global.css:65`, `global.css:856`, `home.css:15-16`,
`what-we-look-for.css:1475`) and `.button-blue:focus-visible` (`global.css:67`).

Hover does not exist on touch devices, which is where most visitors to a local-business
site arrive. So on a phone, tapping the primary CTA produces **no visual acknowledgement
whatsoever** between the tap and the next page painting.

This is made worse deliberately, two lines earlier:

```css
/* src/site/styles/global.css:25 — current */
button, a { -webkit-tap-highlight-color: transparent; }
```

That rule removes the grey flash iOS and Android supply by default. The default was
suppressed and nothing was put in its place, so the button is currently *less*
responsive than an unstyled one. On a slow connection the visitor gets no signal that
the tap registered, and the common result is a second tap.

## Target

Add `transform` to the existing transition list and one `:active` rule. Exact values,
per the press-feedback spec (`scale(0.97)`, 100–160ms, `ease-out`, kept subtle in the
0.95–0.98 range):

```css
/* target — src/site/styles/global.css:64-65 */
.button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 54px; padding: 12px 20px; border: 2px solid var(--blue); background: var(--blue); color: var(--white); text-decoration: none; font-weight: 700; transition: background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease-out; }
.button:hover { border-color: var(--ink); background: var(--ink); }
.button:active { transform: scale(.97); }
```

`ease-out` is correct here rather than the `ease` used for the colour properties: the
press is the moment the user is watching, and it should start fast.

The single `:active` rule covers `.button-secondary` and `.button-blue` automatically —
both are modifier classes applied alongside `.button`, and neither sets `transform`
(verified: no `transform` declaration appears on any `.button*` selector in
`src/site/styles/`), so there is nothing to conflict with.

### Reduced motion

Movement must be dropped for `prefers-reduced-motion`, but the feedback must not be —
reduced motion means gentler, not zero. Replace the scale with a non-motion signal
inside the existing block at `global.css:985`:

```css
/* target — appended inside the existing @media (prefers-reduced-motion: reduce) block */
  .button:active { transform: none; filter: brightness(.94); }
```

`filter: brightness()` rather than a background swap because `.button-secondary` is
white-ground with `var(--blue-deep)` text (`global.css:69-75`) — a blanket
`background: var(--blue-deep)` would collapse its text contrast. Brightness darkens
both variants safely and is not a movement property.

Note that the existing rule at `global.css:987` already forces
`transition-duration: .01ms !important` on everything inside that block, so this
feedback will apply instantly. That is intended — do not add a duration to it.

No `@media (hover: hover)` gating is needed. That guard exists to stop touch devices
firing false *hover* states; `:active` is the correct pointer-agnostic press state and
is exactly what should fire on touch.

## Repo conventions to follow

- Motion values are written inline per-rule. There are **no** `--ease-*` or `--duration-*`
  custom properties in this codebase — do not introduce a token file for this change.
- The house durations for interaction states are 160ms and 180ms (`global.css:49, 64, 324, 368, 439`).
  160ms is the established value for button-family transitions; use it.
- **Exemplar to imitate — `src/site/styles/reel-player.css:158`:**
  ```css
  .reel-player-play:active .reel-player-play-icon { transform: scale(.97); }
  ```
  This is the same press treatment at the same value, already shipping on this site.
  Match its formatting convention exactly, including the leading-dot decimal (`.97`,
  not `0.97`), which is used throughout these stylesheets.
- Two other press states exist and are consistent with this direction:
  `src/site/styles/motion-compare.css:47-50` (`translate(1px, 1px)`) and
  `src/site/styles/global.css:592` (`scale(.94)` on the comparison slider thumb).
- `reel-player.css:145-148` is the precedent for the reduced-motion approach: it sets
  `transform: none` and substitutes a non-motion property rather than removing the
  feedback entirely.

## Steps

1. In `src/site/styles/global.css`, on line 64, append `, transform 160ms ease-out` to
   the end of the existing `transition` value in the `.button` rule. Change nothing else
   on that line.
2. In `src/site/styles/global.css`, immediately after line 65 (`.button:hover { … }`),
   add a new line:
   ```css
   .button:active { transform: scale(.97); }
   ```
3. In `src/site/styles/global.css`, inside the existing
   `@media (prefers-reduced-motion: reduce) { … }` block that begins at line 985, add
   as a new line before the closing brace:
   ```css
     .button:active { transform: none; filter: brightness(.94); }
   ```

## Boundaries

- Do NOT touch `.text-link` (`global.css:76`), `.owner-filter-pill` (`global.css:436`),
  `.tag`, or any other interactive element. Those are separate findings with their own
  frequency profiles.
- Do NOT remove or modify `-webkit-tap-highlight-color: transparent` at `global.css:25`.
  The `:active` rule replaces what it suppressed; leaving both is correct.
- Do NOT modify the `.button:hover` rules in `home.css:15-16`, `global.css:856`, or
  `what-we-look-for.css:1475`.
- Do NOT change markup, component files, or any `.astro` file. This is a CSS-only change.
- Do NOT introduce easing or duration custom properties.
- Do NOT add new dependencies.
- If the code at any cited line does not match the excerpt above (drift since commit
  3f9d543), STOP and report rather than improvising.

## Verification

- **Mechanical**: run `pnpm exec astro check` — expect no new errors. A full `pnpm build`
  also runs the prose/asset checks and is slower; `astro check` is sufficient for a
  CSS-only change.
- **Feel check**: run `pnpm dev` and open the homepage.
  - Press and hold the primary CTA with a mouse: the button should shrink slightly and
    **stay** shrunk while held, then spring back on release. If it flickers back while
    held, the `:active` selector is being overridden.
  - Confirm the shrink is barely perceptible as *size* and mostly perceptible as
    *response*. If it reads as a visible zoom, the value is wrong — it must be `.97`.
  - Check `.button-secondary` (the "Browse local website examples" button on the
    homepage) gets the same press, and that its border does not visibly thin or
    shimmer during the scale.
  - In DevTools → Animations, set playback speed to 10% and confirm the scale starts
    fast and decelerates into place — not a linear slide, and not slow-then-fast.
  - In DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce", press the
    button and confirm it **darkens instantly and does not move**. Feedback must still
    be present; a button that does nothing under reduced motion is a failed
    implementation, not a passing one.
- **Real device (required — this is the whole point of the change)**: open the dev
  server on an actual iPhone and an Android phone and tap the CTA. Confirm a visible
  press on both.
  - Known gotcha: some iOS Safari versions do not apply `:active` to `<a>` elements
    without a touch listener on the document. `.button` is used on both `<a>`
    (`HomeFilmHero.astro:66`, `TownMap.astro:105`) and `<button type="submit">`
    (`request.astro:102`). If the anchors do not respond on iOS but the submit button
    does, STOP and report it — do not add an `ontouchstart` hack or a JS listener
    without approval, as that is outside this plan's scope.
- **Done when**: `.button:active` exists in `global.css` with `transform: scale(.97)`,
  the `.button` transition list includes `transform 160ms ease-out`, the reduced-motion
  block neutralises the transform while keeping the brightness feedback, and a physical
  phone shows a press response on both an anchor-based and a button-based CTA.

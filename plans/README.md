# Animation plans

Self-contained implementation plans produced by `improve-animations`. Each plan is
written to be executed by an agent with no context from the conversation that produced
it: exact file paths, exact values, explicit scope boundaries.

Plans are read-only artefacts about source code — writing a plan never changes `src/`.

| # | Title | Severity | Category | Status |
| --- | --- | --- | --- | --- |
| [001](001-button-press-feedback.md) | Give `.button` press feedback on tap | HIGH | Physicality / Accessibility | APPLIED — device check pending |

## Execution order

001 stands alone — no dependencies, and nothing else queued yet.

## Candidates not yet planned

From the `find-animation-opportunities` sweep at commit `3f9d543`, in leverage order.
Each needs an `improve-animations plan <description>` pass before it is executable:

1. **Request-form confirmation swap** — `src/pages/request.astro:272-274` hard-cuts
   `form.hidden = true; confirmation.hidden = false` at the site's only high-emotion
   moment.
2. **Mobile menu entrance** — `src/site/components/Header.astro:63` toggles `hidden`
   with no spatial link to the button that opened it.
3. **Form error/success messages** — `src/pages/request.astro:234-241` +
   `global.css:886-888`; messages appear instantly, then the page scrolls to them.
4. **Swap-shop details button** — `src/site/scripts/fault-walk.ts:274` sets
   `hidden = false` while the panel beside it already animates in
   (`fault-walk.ts:117-123`).
5. **Transformations filter grid** — `src/pages/transformations/index.astro:254-258`
   snaps the card grid on every filter tap.

## Standing caveat

`src/site/styles/global.css:985-989` collapses every transition and animation on the
site to `.01ms !important` under `prefers-reduced-motion`. That is zero, not gentler —
so any motion added anywhere becomes a hard cut for those users unless the plan
explicitly substitutes a non-motion signal, as 001 does. Worth deciding whether that
blanket rule should become per-effect handling before many more plans land.

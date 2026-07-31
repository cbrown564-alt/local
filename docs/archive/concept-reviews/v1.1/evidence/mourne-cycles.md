# Archived concept review — Mourne Cycles — 25 July 2026

Status: Revise

Concept: `/concepts/mourne-cycles/`
Reviewed commit: `efadf8a`
Reviewed source fingerprint: `sha256:c51e0e8d37e7dc365b96d7462334d826ae733c4d9608812a3b6c903969ad66a4`
(re-computed by the reviewer via `node tools/check-concept-reviews.mjs --fingerprint mourne-cycles`; matches the repaired candidate recorded in `docs/CONCEPT_DESIGN_REVIEW.md` § "Re-review candidate — repaired source fingerprints")
Creator: Mourne Made (Phase Q shared repair pass, subject-proof pass, and the 25 July reopened-candidate repair)
Independent reviewer: separate non-creator agent (did not create or repair this concept)

This is the **third** independent v1.1 review of Mourne Cycles. The first
returned Revise at 5.93 (gates failed: claims, subject proof, responsive). The
second returned Revise at 5.78 (gates failed: claims, subject proof, readable).
Both earlier verdicts are preserved in the Re-review section below so the
improvement is legible. Every score here was fixed from the reviewer's own live
measurements of the current source; the earlier verdicts were consulted only
afterwards, to write the earlier-defect disposition.

## Candidate

Visitor job: *"My bike needs a service — find out what the Newcastle shop's
workshop actually does and get the request to them, without ringing blind."*

Current presence and verification: `research/pipeline/verifications.json` → "Mourne
Cycles", Newcastle, `verifiedOn: 2026-07-20`. Trading status **Open** (Companies
House NI064124 active, confirmation statement 25 March 2026; listed Trek dealer
and Cyclescheme retailer). Digital presence: free-tier Wix brochure site with a
"© 2014 … Proudly created with Wix" footer, no product listings, no prices, no
booking of any kind; the opening screen is a collage of supplier logos with the
shop's name only in the header logo and the phone number as the only action.
Verified corrections: phone `028 4372 7272`, email `mournecycles@gmail.com`.

Truth checked at: 2026-07-20 (5 days old at review; refresh due 2026-10-18).

Primary loop: home hero → **Book a workshop slot** → `/concepts/mourne-cycles/hire/`
→ panel 02 *Workshop & service* → **Email to book a slot →**
(`mailto:mournecycles@gmail.com?subject=Workshop%20booking`), with **Call to
book · 028 4372 7272** (`tel:+442843727272`) as the parallel handoff in panel 01.

Review boundary:

- Start screen/state: `/concepts/mourne-cycles/` first viewport. Primary CTA
  measured fully in the fold at both sizes (desktop y 444–503 of 710; phone
  y 417–476 of 844).
- Successful end screen/state: `/concepts/mourne-cycles/hire/` panel 02 — the
  visitor's mail client opens on a draft to `mournecycles@gmail.com`, subject
  "Workshop booking". Explicitly labelled prototype handoff: the panel foot
  reads "The shop confirms scope, price and turnaround", and the layout
  `bannerNote` states the whole page is illustrative.
- Important failure state: **none exists.** DOM inspection of both routes
  returns a `form, input, select, textarea, button` count of **0**; the only
  focusable elements on either route are anchors, and the concept ships no page
  script of its own. There is nothing a visitor can submit incorrectly, so there
  is no validation state, no empty state and nothing to recover from.
- Recovery: n/a. The nearest analogue is activating an inert placeholder.
  Clicking "Explore the bike range →" leaves the URL unchanged (measured:
  `url before === url after`), opens no dialog, writes to no `aria-live` region
  (measured: `document.querySelectorAll("[aria-live]").length === 0`) and
  produces no visible response. The only explanation is the `title` attribute
  "Concept preview — this link is not active", which requires a mouse hover and
  reaches neither keyboard nor touch users.

The loop ending in a phone/email handoff rather than a form is, on the evidence,
an **honest and correctly labelled prototype boundary but a thin loop**. Honest:
both destinations are the ones the real business answers, verified against the
`corrections` block, and the handoff is labelled at three levels (panel foot,
`.mc-provisional`, layout `bannerNote`). Thin: the `mailto` subject is a
hardcoded literal, so nothing the visitor read or chose reaches the shop, and
the absence of any input means two of the four states the rubric names —
important failure and recovery — do not exist at all.

Exposed routes and actions outside the loop:

- `/concepts/mourne-cycles/` (nav "Bikes", brand mark on both routes) → works.
- `/concepts/mourne-cycles/hire/` (nav "Workshop", nav "Cycle to Work", header
  "Book a service" on home, the red "Cycle to Work / Save through work" rail
  cell) → works. "Workshop" and "Cycle to Work" are two nav items pointing at
  the same URL.
- `tel:+442843727272` — strip and header on both routes, plus hire panel 01 →
  correct, matches the verified correction.
- `mailto:mournecycles@gmail.com?subject=Workshop%20booking` — hire header
  "Book a service" and hire panel 02 → correct, matches the verified correction.
- `/request/?business=Mourne%20Cycles&town=Newcastle&source=concept` (claim
  action in the shared disclosure banner) → works, parameters correct.
- No `/transformations/mourne-cycles/` link renders; the slug has no published
  transformation record. Correct for the current state.

Declared placeholders, stubs and limitations:

All eight inactive controls use the explicit `data-concept-placeholder` marker;
no bare `href="#"` survives at runtime. `ConceptLayout`'s script strips the
`href`, sets `aria-disabled="true"` and adds a `title`; `concept-shell.css`
renders them at `opacity: .5` with a dotted line-through, and they are correctly
skipped by the tab order rather than trapping focus.

- Nav: **Accessories**, **Visit us**.
- Hero secondary action: **Explore the bike range →** — directly beside the
  primary CTA in the first viewport at both sizes.
- Range rail: **01 Electric**, **02 Road**, **03 Mountain**, **04 Hybrid**,
  **05 Kids** — the entire bike range, i.e. the headline deliverable of the
  recorded design task ("Retail storefront: **product range**, servicing and
  hire booking, Cyclescheme funnel").
- Hire panel 03: **Start your application →**, softened by the foot note
  "Confirm the current application route with the shop".
- Illustrative content, labelled *before* the values in all three places: hire
  prices ("Illustrative models and prices — not verified current stock or
  rates"), service tiers ("Illustrative service tiers — not verified current
  packages"), the 42% dial ("illustrative scheme example"), plus the
  layout-level `bannerNote` on the hire route.
- Hero imagery: AI-generated visualisation, disclosed in a figcaption pinned to
  the image and documented in `public/media/place/ATTRIBUTION.md`.

Closest portfolio neighbours (chosen by the reviewer from side-by-side captures
of the concepts sharing the coal/trade-retail construction; justification in the
Closest-neighbour test below):

- **The Tool Centre** (`/concepts/tool-centre/`) — the strongest match: same
  town, same trade-retail category, same phone-first "we cannot publish rates"
  thesis, and near-identical first-viewport grammar.
- **Murdock Brothers** (`/concepts/murdock-brothers/`) — same coal ground plus
  one hot accent, same condensed all-caps two-colour hero, same struck-through
  nav, same right-hand panel, same trade voice and the same price-honesty move.
- (Douglas & Cromie remains the instructive third: it faces the identical
  "we cannot show real stock" constraint and solves it better — see the
  neighbour test.)

## Evidence bundle

- Current capture: `public/media/concepts/mourne-cycles/mourne-cycles-before.jpg` — read in full.
  Representative: it shows exactly what the verification record describes
  (Trek / Shimano / Bontrager logo collage, shop name only in the header logo,
  phone number as the sole action).
- Desktop after, 1265×710: `.tmp/rr-mc-out/desktop_concepts_mourne-cycles_.png`
  and `desktop_concepts_mourne-cycles_hire_.png` (reviewer's own).
- Phone first screen, 390×844: `.tmp/rr-mc-out/phone_concepts_mourne-cycles_.png`
  and `phone_concepts_mourne-cycles_hire_.png` (reviewer's own; `-full.png`
  variants alongside).
  Every capture was taken with `defaultViewport: null`, a CDP
  `Emulation.setDeviceMetricsOverride`, an asserted
  `document.documentElement.clientWidth === target` before measuring, and `clip`
  plus `captureBeyondViewport: false`. All four verified at 1265 and 390.
- Serving note: the production preview on `http://127.0.0.1:4321` owned by
  another process stopped responding partway through the review. The reviewer
  did **not** rebuild. The existing `dist/` output — confirmed to carry the
  reviewed source (`listed Trek dealer &amp; Cyclescheme retailer` present in
  `dist/concepts/mourne-cycles/index.html`) — was served read-only on
  `127.0.0.1:4399` via `.tmp/rr-mc-serve.mjs`. Measurements taken before and
  after the switch agree.
- Primary-loop walkthrough: `.tmp/rr-mc-loop.mjs` output — pointer and keyboard
  runs on both routes.
- Failure and recovery evidence: `.tmp/rr-mc-loop.mjs`, "POINTER LOOP +
  PLACEHOLDER ACTIVATION". There is no failure state to capture; the recorded
  evidence is the null result of activating an inert control.
- Sources, asset credits and limitations: `public/media/place/ATTRIBUTION.md`
  lines 14 and 18; `src/site/data/transformation-details.ts` lines 731 and 744.
- Asset source and public-use rights status:
  - `mourne-cycles-faithful-visualisation.jpg` — generated in-house from an
    April 2026 Mourne Cycles customer photo; ATTRIBUTION.md records the
    generation boundary *and* what the reference does not evidence.
    **Publishable.**
  - `mourne-cycles-trail.jpg` — **deleted 25 July 2026** and recorded as removed
    in ATTRIBUTION.md. Confirmed absent: the hire route now returns zero `<img>`
    elements. The previous round's only release blocker is clear.
- External destination and accepted parameters: `tel:+442843727272` and
  `mailto:mournecycles@gmail.com?subject=Workshop%20booking`, both matching the
  verified `corrections` block exactly. **No parameters are collected or
  carried** — the subject is a hardcoded literal.
- Keyboard check: **operable, but the primary action has no visible focus.**
  Home desktop: 10 focusable elements, tab order matches visual order. Phone:
  Tab ×4 reaches "Book a workshop slot", Enter navigates to the hire route; hire
  phone Tab ×3 reaches the `mailto`. Every focusable element receives
  `outline: 3px solid rgb(15, 16, 19)` at `outline-offset: 3px`. On the white
  header that ring measures 19.02:1; **on the coal hero it measures 1.00:1** —
  see the Responsive gate.
- Contrast check: **3 live failures** (down from ~20). Measured from computed
  styles with alpha *and inherited CSS `opacity`* composited against the
  resolved backdrop. Full table in `.tmp/rr-mc-out/deep.json`.
- Reduced-motion check: **pass.** Under CDP `Emulation.setEmulatedMedia`
  `prefers-reduced-motion: reduce`, `document.getAnimations()` returns 0 and no
  element has a computed `animation-name` other than `none`, on both routes.
- `pnpm build`: not run by the reviewer — the brief reserved the build to
  another process. The served `dist/` is the reviewed source.
- `pnpm test:concepts`: not re-run by the reviewer, for the same reason.
- `pnpm test:reviewed-concepts`: **pass — 14/14**, run by the reviewer against
  the reviewed output (`SHOT_BASE=http://127.0.0.1:4399`). See the note under
  the Readable gate: its contrast probe does not composite CSS `opacity`, so it
  passes on three texts that fail when measured as rendered.
- Relevant journey or interaction check: reviewer's own — overflow, fold
  geometry, link inventory, tab order, focus-ring contrast, computed-style
  contrast, reduced motion, placeholder activation, dense-scroll banner
  occlusion, remove-nav and neighbour captures (`.tmp/rr-mc-audit.mjs`,
  `rr-mc-deep.mjs`, `rr-mc-loop.mjs`, `rr-mc-neighbours.mjs`).
- Browser console: **clean.** Zero errors, zero page errors and zero failed
  requests across all four route/size combinations.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | **Pass** | `verifiedOn` 2026-07-20, five days before review — well inside one month. The before-capture matches the record's description of the Wix supplier-logo collage line for line. The copy describes the shop plainly ("An established local bike shop, listed as a Trek dealer and Cyclescheme retailer") and nowhere mocks the current site; both routes defer to the shop repeatedly ("Call on 028 4372 7272 to confirm what the shop currently offers", "The shop confirms scope, price and turnaround"). Named weakness: the concept never states *when* the current site was captured on the page itself, so a visitor cannot date the comparison it implies. |
| Claims are honest | **Pass** | Both of the last round's claims defects are genuinely fixed. The first-viewport strip on both routes now reads "EST. 2002 · LISTED TREK DEALER & CYCLESCHEME RETAILER" — a near-verbatim quote of the verification record's `tradingEvidence` ("listed Trek dealer and Cyclescheme retailer"); the unsourced exclusivity claim "main dealer for the area" no longer appears anywhere on either route, and the strip no longer contradicts the hero lede below it. The hero `alt` no longer asserts the fence is the shop's premises: it now reads "…against a red slatted fence beside a blue bin marked 48, based on a customer photograph". "Est. 2002" traces to the shop's own "established 2002" wording, recorded in `transformation-details.ts:744`. Every unverifiable value carries an explicit label *before* it (three `.mc-provisional` lines plus the layout `bannerNote`), all eight inactive controls carry `data-concept-placeholder`, and the hero caption volunteers "It does not claim current shop stock." **Named weakness:** `transformation-details.ts:744` still tells a reader "The photographs are the Trek dealer imagery the shop already publishes on its own pages, reused rather than replaced" — false since the trail photo was deleted and the hero replaced by a generated visualisation. It is fingerprinted slug material, though not visitor-facing on the concept route, so it does not fail the gate; it must be corrected before any public case study. |
| Real visitor loop | **Pass** | The primary job reaches an explicitly labelled prototype handoff. Both external destinations are live and are the ones the real business answers (`tel:+442843727272`, `mournecycles@gmail.com`, both from the verified `corrections` block). There is no fake search, no inert filter, no decorative submit and no invented live status. Every price, tier and percentage that cannot be verified is labelled illustrative before it appears. **Named weakness:** the gate passes partly because nothing interactive was attempted — there is no control on either route that could have been faked. The cost is carried in the Complete-loop score. |
| Subject proof | **Fail** | Judged against the 24 July 2026 amendment. **(2) Openly disclosed — now PASSES at both sizes**, and this is the repair working: at 1265×710 the figcaption sits y 507–542 against a 710px fold, and at a true 390×844 it is pinned to the image at y 708–753 with the independent-concept banner at y 749–834 — both disclosures now inside the phone first viewport, where the last round measured the caption 61px below it. **(3) Faithful — passes**; a scuffed bike beside a wheelie bin under-promises rather than over-promises. **(1) Subject-specific — FAILS**, and it is now the sole reason. The frame contains a bicycle, a red slatted fence, paving and a blue bin hand-marked "48". It contains no shop, no frontage, no signage, no workshop, no staff and no Castlewellan Road. The studio's own credit concedes the point: ATTRIBUTION.md records that "the reference evidences the bicycle and its surroundings only, **not the ownership of the yard**", and the on-page caption adds "It does not claim current shop stock." So by the concept's own two disclosures the image is neither the business's place nor the business's product — it is a bicycle a customer photographed somewhere. A visitor meeting this screen gets convincing proof that a Trek bike exists against a red fence; they get no visual proof of *this bike shop*. The amendment requires the visualisation to depict "*this* business — its actual place, product, rooms or work"; honest disclosure of a non-subject scene resolves deception but does not supply proof. This sits below Cúpla (a visualisation of the actual photographed 105 Main Street frontage) and Kent/Donard (licensed photographs of the actual premises), all of which cleared this gate on the same amendment. |
| Responsive and keyboard usable | **Fail** | Mechanically clean: measured `document.documentElement.scrollWidth === clientWidth` on both routes at both sizes (1265/1265, 390/390), zero elements past the viewport edge, zero clipped header controls (the red "BOOK A SERVICE" action is fully inside 390px), sensible reflow (hero 46/54 → single column, three hire panels stack, rail goes two-up), and a complete tab order in visual order with Enter activating. The gate nonetheless fails on its explicit visible-focus clause: **the primary action has no visible focus indicator.** The 25 July repair replaced the leaked studio gorse ring with `--concept-focus: #0f1013` — which is `--coal`, the hero's own background. On `.mc-story` the 3px ring at 3px offset therefore measures **1.00:1** against the surface it is drawn on, and the capture `.tmp/rr-mc-out/focus-cta-desktop.png` shows the focused "Book a workshop slot" button with no ring visible at all. The same 1.00:1 applies to the first tab stop, the phone number in the coal strip. **Named weakness (not gate-deciding):** `.mc-nav` and `.mc-phone` remain `display: none` below 940px with no replacement, so a phone visitor gets no site navigation on either route; nothing is orphaned only because the brand link, the CTA, the header action and the red rail cell happen to cover both routes between them. |
| Readable and motion-safe | **Fail** | Much improved and now narrow. The honesty copy the last round condemned is fixed: the prototype disclosure sentence now measures 5.74:1 (was 3.60), "Illustrative service tiers" 5.18:1 (was 3.25), the hire prices 6.88:1 (was 3.84), the step numerals 4.82:1, the Cyclescheme body 6.87:1. Three live sub-4.5:1 texts remain, all caused by CSS `opacity` applied to otherwise-adequate colours: `.mc-cell-scheme .mc-cell-index` "Cycle to Work" at **3.34:1** (white at `opacity: .75` on `--red`) and `.mc-cell-scheme small` "Listed Cyclescheme retailer" at **3.93:1** (`opacity: .85`) — both inside the one *live* rail cell, in the desktop first viewport; and `.mc-panel-foot small` "Confirm the current application route with the shop" at **3.30:1** (`opacity: .6` on `--red-deep`) — the caveat that qualifies the placeholder Cyclescheme button, so once again a piece of honesty copy is among the least legible text on the page. Worth recording for the portfolio: `pnpm test:reviewed-concepts` passes 14/14 on this source because its `CONTRAST_PROBE` composites `color` alpha but never multiplies inherited CSS `opacity`, so the assertion added to prevent exactly this defect class is blind to all three. Separately, the five inert range cells render at 2.29:1 and 3.57:1; WCAG exempts inactive components, so they are not counted as gate failures, but a full-width row of near-illegible crossed-out text across the fold is a real composition cost, scored under First viewport. Motion side **passes**: 0 running animations and 0 computed `animation-name` under emulated `prefers-reduced-motion: reduce` on both routes. Images have useful alternatives; the hire route now contains no `<img>` at all. |

Review disposition: **Revise**

Evidence still needed to judge the design: none. Every scored category was judged
from live measurement of the reviewed source.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | **Pass** | The last round's sole blocker is cleared. `mourne-cycles-trail.jpg` — Trek/Bontrager dealer marketing photography with no recorded licence — was deleted on 25 July and the removal is documented in `ATTRIBUTION.md:18`; the hire route now serves zero images, confirmed by DOM inspection. The remaining hero is generated in-house from a customer photograph, with its generation boundary and its evidentiary limits both recorded. Publishable. |
| Truth check current within 90 days | **Pass** | `verifiedOn: 2026-07-20`, five days old. Expires 2026-10-18. |
| Independent-concept safeguards and honest public disclosure | **Pass, with a recorded defect** | `<meta name="robots" content="noindex, nofollow">` present on both routes; "Independent concept by Mourne Made. Not the live Mourne Cycles website." present on both, with the extra `bannerNote` on the hire route; claim action `/request/?business=Mourne%20Cycles&town=Newcastle&source=concept` present and correctly parameterised. The banner is now `position: fixed` at every size and measured inside the fold at both 1265×710 and 390×844 on both routes. Recorded defect: the stale "photographs are the Trek dealer imagery … reused rather than replaced" sentence in `transformation-details.ts:744` must be corrected before any public case study, since it would be published copy. |
| Repository and journey checks | **Pass for the reviewed source, partially re-verified** | Fingerprint re-computed by the reviewer as `sha256:c51e0e8d…66a4`, matching the repaired candidate. `pnpm test:reviewed-concepts` re-run by the reviewer against the reviewed output: **14/14**. `pnpm build` and `pnpm test:concepts` were **not** re-run — the brief reserved the build to another process — so those two rest on the coordinator's record rather than the reviewer's own execution. Zero console errors and zero failed requests measured across four route/size combinations. |

## Creator self-review

No creator self-score was filed for this re-review, so this table is deliberately
empty and the independent scores below stand alone.

| Category | Score /10 | Evidence | Strongest quality | Clearest weakness |
|---|---:|---|---|---|
| Evidence, truthfulness and respect | — | not filed | — | — |
| Visitor outcome and concept thesis | — | not filed | — | — |
| Subject identity and distinctiveness | — | not filed | — | — |
| First viewport and visual composition | — | not filed | — | — |
| Complete loop and functional integrity | — | not filed | — | — |
| Responsive use and accessibility | — | not filed | — | — |
| Craft and finish | — | not filed | — | — |

Creator weighted score: not filed.

## Independent review

First-glance order at desktop (1265×710): **first**, the coal-black left plane
with "MOURNE **CYCLES**" set in 88px condensed italic caps, "CYCLES" in signal
red — the name genuinely owns the screen and is the largest thing on it;
**second**, the photograph filling the right 54%, a black Trek full-suspension
bike against a bright orange-red slatted fence, the only colour mass able to
compete with the headline; **third**, the red "BOOK A WORKSHOP SLOT" button —
and immediately after it, unavoidably, the full-width row of five struck-through
range cells (ELECTRIC · ROAD · MOUNTAIN · HYBRID · KIDS) across the bottom of the
fold. The eye's third and fourth stops are one live action and a wall of
crossed-out ones.

First-glance order on phone (390×844): **first**, "MOURNE CYCLES" at 44px, still
dominant (y 217–258); **second**, the red "BOOK A WORKSHOP SLOT" block at
y 417–476; **third**, the photograph entering at y 543 with its disclosure
caption pinned across the bottom of it at y 708–753, and the independent-concept
banner immediately beneath at y 749–834. The order now reads identity → action →
disclosed evidence → disclosure, which is the correct sequence and a measurable
improvement on the previous round, where both disclosures fell below the fold.
The cost is that the image is compressed to a 210px band and the bike is cropped
through the saddle and the wheels.

Remove-nav test: **passes.** With `.mc-strip`, `.mc-header` and the banner
removed (capture `.tmp/rr-mc-out/removenav.png`), the business is still
identifiable at hero scale: the wordmark carries it, the signal-red/coal pairing
and the condensed italic caps are recognisably the shop's own logo colours and
letterforms, and the "NEWCASTLE · LOCAL SINCE 2002" kicker places it. The
qualification: identity survives via the *name and palette*, not via the
photograph — strip the chrome and the image alone would not tell anyone which
bike shop this is, or that it shows a bike shop's premises at all.

Swap-the-business test: replace "Mourne Cycles" with any Newcastle trade
retailer and the page survives almost intact. The coal/hot-accent split hero, the
skewed kicker dash, the condensed two-colour caps headline, the lede with the
business name bolded, the filled button plus struck secondary link, the bottom
category rail, the phone-first thesis and the "ring the shop to confirm" honesty
stance all transfer unchanged; only the photograph and the word "Cycles" would
have to move. Nothing on the page is *bike-shop-shaped* the way Murdock Brothers'
litre control is fuel-shaped — the one artefact that would have been (the range
rail) ships as five dead cells. The tightest subject-owned element is the SVG
peaks-and-red-summit mark, a faithful quote of the shop's real logo.

Closest-neighbour test: against **The Tool Centre** — captured side by side at
1265×710 by the reviewer — the two first viewports are the same composition with
substitutions: same black top strip (address left, contact right), same paper
header with mark + name + spaced all-caps subline, same struck-through nav, same
coloured pill CTA top-right, same coloured kicker dash, same huge condensed
two-colour all-caps H1, same lede with the business name bolded, same filled
button plus underlined secondary text link, same right-hand plane, same bottom
rail, same town, same "we cannot publish rates so ring the shop" thesis. What is
materially different is the accent hue (yellow vs red) and the content of the
right-hand plane — and there Tool Centre is ahead: it fills the plane with a
black hire-rate board carrying real, honest content ("Day rate on request" ×4),
where Mourne Cycles fills it with a photograph. Against **Murdock Brothers**, the
coal + single-hot-accent + condensed-caps + right-hand-panel + struck-nav
construction recurs again, but Murdock earns its screen with a working litre
range input and a deliberately blank price panel that explains itself — a real
signature interaction where Mourne Cycles has none. **Douglas & Cromie** solves
this concept's exact problem better: facing the identical "we cannot show real
stock" constraint, it renders a populated forecourt list with labelled `PHOTO`
placeholders and a banner note stating the vehicles are placeholders, which
communicates far more than five crossed-out category names. Mourne Cycles'
genuine differentiator against all three is the photographic hero — which is
precisely why the hero proving a bicycle rather than the shop is the costliest
defect on the page.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 7.5 | 1.125 | Verification 5 days old; before-capture matches the record line for line; both handoff destinations match the verified `corrections` block exactly; the strip claim now quotes `tradingEvidence` near-verbatim and the "main dealer for the area" exclusivity claim is gone from both routes; the hero `alt` no longer asserts premises; the undocumented Trek marketing photograph is deleted and its removal recorded; three `.mc-provisional` labels plus a layout `bannerNote` place every unverifiable value behind an explicit label. | ATTRIBUTION.md volunteers the limits of its own evidence — it records not just what the reference photo shows but that it "evidences the bicycle and its surroundings only, not the ownership of the yard". A credits file that argues against its own image is the most honest artefact in this batch, and it is what let this review settle the subject-proof question on the record rather than on impression. | `transformation-details.ts:744` still states "The photographs are the Trek dealer imagery the shop already publishes on its own pages, reused rather than replaced" — untrue since 25 July, and it is fingerprinted, publishable slug copy. Compounded by the hero lede rendering as "listed as a **Trek**dealer" (verified in the built HTML: `<strong>Trek</strong>dealer`), which damages the one sentence carrying the sourced claim. |
| Visitor outcome and concept thesis | 15% | 6.0 | 0.90 | Against a Wix page whose only action is a phone number under a supplier-logo collage, the concept puts a named workshop action in the fold at both sizes, adds a route explaining three service tiers and a Cyclescheme path, and hands off to the shop's real number and real email. The opening speaks to the visitor ("Bikes, workshop care and straight local advice") before any owner-facing framing. | It picks the right job and is honest about its own limits: the current site cannot tell a visitor what the workshop does, this page can, and "Call on 028 4372 7272 to confirm what the shop currently offers" is the correct posture for a shop that publishes nothing. | The errand is explained, not made materially easier. The handoff collects nothing — `mailto:…?subject=Workshop%20booking` is a hardcoded literal, so the visitor opens a blank email and types exactly what they would have said on the phone. Buck's Head carries date + party into ResDiary and Enniskeen carries date + nights into Bookin1; this carries a subject line. And the design task's headline deliverable, the product range, ships as five struck-through cells. |
| Subject identity and distinctiveness | 15% | 6.0 | 0.90 | Remove-nav passes on the reviewer's own capture; the SVG peaks-and-red-summit mark and the coal/signal-red/condensed-italic system are demonstrably taken from the shop's real logo rather than from the "bike shop" category; the hero shows a real, specific bicycle. | The palette and mark are properly sourced from the subject — set the concept beside `mourne-cycles-before.jpg` and the red, the black and the condensed caps are visibly the same shop's, which is exactly what this category asks for. | The *construction* repeats the portfolio almost element for element. The Tool Centre (same town, same trade) and Murdock Brothers share the strip / paper-header / struck-nav / kicker-dash / condensed-two-colour-H1 / bolded-name lede / filled-button-plus-struck-link / right-panel / bottom-rail grammar. Swap the business and only the photograph and the word "Cycles" must change; nothing on the page is shaped by what a bike shop actually does. |
| First viewport and visual composition | 15% | 6.0 | 0.90 | Desktop: one legible composition, 46/54 coal-to-photograph split, brand dominant at 88px, one-line proposition, one red primary action, disclosure caption in the fold at y 507–542. Phone: identity → action → evidence → disclosure, headline y 217, CTA y 417–476, image y 543–753, caption y 708–753, banner y 749–834. Measured: 8 of the 18 links inside the desktop fold are inert. | The desktop first screen is the strongest thing here — a genuine dominant visual plane, no card grid, no widget clutter, and the orange-red of the fence rhyming with the red of "CYCLES", the CTA and the scheme cell is a deliberate, well-judged colour tie that makes the photograph feel chosen rather than dropped in. | The composition's third beat is a full-width row of five crossed-out product categories rendering at 2.29:1 and 3.57:1 — the screen advertises its own missing half along its bottom edge, and the struck secondary action sits directly beside the primary CTA. On phone the fix that brought the disclosures into the fold cost the proof its scale: the image is a 210px band with the bike cropped through saddle and wheels. |
| Complete loop and functional integrity | 15% | 5.5 | 0.825 | Pointer and keyboard both complete the loop (phone Tab ×4 → Enter → hire route; hire Tab ×3 → `mailto`). Both destinations verified against `verifications.json`. All eight placeholders correctly marked and correctly skipped by the tab order. `test:reviewed-concepts` 14/14; zero console errors across four route/size combinations. | Everything that exists actually works, and the handoffs are real rather than decorative — the number and the address are the ones the shop answers, verified against the record, not invented. | Two of the four states the rubric names do not exist: DOM inspection returns zero forms, inputs, buttons and selects on both routes, so there is no failure state, no empty state and no recovery, and the handoff carries no parameters. Activating an inert control produces no URL change, no dialog and no live region (measured `[aria-live]` count 0); the only explanation is a `title` tooltip that keyboard and touch users never receive. At 390px both handoff buttons fall under the fixed disclosure at some scroll positions ("Call to book" at scrollY 25–100, "Email to book a slot" at 500–575) — recoverable by scrolling, but the two controls the loop ends on are the two that get covered. |
| Responsive use and accessibility | 15% | 5.5 | 0.825 | Zero horizontal overflow measured at a true 390×844 and at 1265×710 on both routes; no clipped header actions; sensible reflow; complete keyboard operation in visual order with Enter activating; correct image alternatives; reduced motion verified by emulated media with 0 running animations and 0 computed `animation-name`. Contrast failures down from ~20 to 3. | The mechanical responsive work is clean and verified at a genuinely 390px viewport rather than a faked one, and the contrast repair did what it targeted: every piece of honesty copy the last round condemned now sits between 4.8:1 and 6.9:1. | The primary action has **no visible focus ring**. `--concept-focus: #0f1013` is `--coal`, the hero's own background, so the 3px ring on "Book a workshop slot" measures **1.00:1** and is absent in the capture — the repair that removed the leaked studio gorse replaced an invisible ring with a differently invisible one. Three live texts still fail 4.5:1 (3.30, 3.34, 3.93:1), all from CSS `opacity` the repo's own contrast assertion does not composite. `.mc-nav`/`.mc-phone` remain `display: none` below 940px with no replacement, so phone visitors get no site navigation at all. |
| Craft and finish | 10% | 6.0 | 0.60 | Consistent condensed-italic display against Barlow body; a coherent 0.09/0.14/0.26em tracking ladder; the skewed red dash motif carried across both routes; no over-rounding, no reflex card grid, no generic rise animation, no console defects; correct responsive image sources (1265/640 WebP with a JPEG fallback and sensible `sizes`). | The type system is genuinely deliberate and holds together across two routes and two sizes — the tracking ladder, the italic-caps display voice and the single red accent read as one designed thing rather than a set of defaults. | A visible typographic defect in the concept's most important sentence: the built HTML contains `<strong>Trek</strong>dealer`, so the hero lede reads "listed as a **Trek**dealer" at both sizes. Dead and misleading CSS survives untouched from the last round: `@keyframes mc-rise` declared and never applied, `.mc-story::after { content: none }` as a no-op, and a `prefers-reduced-motion` block disabling animations on five selectors that have none — motion-safety code that is decorative. Two nav items point at the same URL, and on hire desktop the fixed banner still covers the third hire price row inside the first viewport. |
| **Total** | **100%** | | **6.08/10** | | | |

Weighted calculation:

```text
(7.5 × .15) + (6.0 × .15) + (6.0 × .15) + (6.0 × .15)
             + (5.5 × .15) + (5.5 × .15) + (6.0 × .10)
= 1.125 + 0.90 + 0.90 + 0.90 + 0.825 + 0.825 + 0.60
= 6.075 → 6.08
```

## Verdict

Weighted score: **6.08**/10

Core category floors at 7.0 met: **No** — Visitor outcome 6.0, Complete loop 5.5
and Responsive/accessibility 5.5 are below 7.0. Evidence/truth 7.5 clears the
floor for the first time in three rounds.

Supporting category floors at 6.0 met: **Yes** — Identity 6.0, First viewport 6.0
and Craft 6.0 each meet 6.0 exactly.

All design gates pass: **No** — `Subject proof`, `Responsive and keyboard usable`
and `Readable and motion-safe` fail. `Claims are honest` passes for the first
time.

All public release conditions pass: **Yes** — asset permission is now clear, the
truth check is current, the safeguards are present and in-fold at both sizes, and
the fingerprint and journey suite verify. Publication remains barred by the
design verdict, not by a release condition.

Verdict: **Revise**

Required repairs in priority order:

1. **Give the first viewport proof of the shop, not of a bicycle.** The concept's
   own ATTRIBUTION entry and on-page caption both disclaim that the image shows
   the business's place or stock, which is exactly why it cannot carry the gate.
   Obtain or generate a faithful, disclosed visualisation of the actual
   63A Castlewellan Road frontage, fascia or workshop — the route Cúpla took to
   pass this gate under the same amendment.
   *Acceptance check:* the first-viewport image contains an identifying feature
   of the premises (fascia, signage, frontage or workshop interior) traceable to
   a dated reference recorded in `ATTRIBUTION.md`, with the disclosure inside the
   fold at both 1265×710 and 390×844.
2. **Make the focus ring visible on the primary action.** `--concept-focus:
   #0f1013` equals the hero background; the ring on `.mc-cta` measures 1.00:1.
   Use a colour that reads against both the coal hero and the white header, or
   pair the outline with a contrasting offset backdrop.
   *Acceptance check:* a `test:reviewed-concepts` assertion that every
   `:focus-visible` outline colour reaches ≥3:1 against the *composited backdrop
   at the outline offset* for every focusable element on both routes — measured
   against the surface the ring is drawn on, not the element's own background.
3. **Fix the three remaining contrast failures, and fix the probe that missed
   them.** `.mc-cell-scheme .mc-cell-index` (3.34:1), `.mc-cell-scheme small`
   (3.93:1) and `.mc-panel-foot small` (3.30:1) all fail because of CSS
   `opacity`. Raise them to ≥4.5:1 by adjusting colour rather than opacity.
   *Acceptance check:* extend `CONTRAST_PROBE` in
   `tools/test/test-reviewed-concept-journeys.mjs` to multiply inherited CSS
   `opacity` into the composite before computing the ratio, then assert zero
   sub-threshold body/control texts. The current probe passes 14/14 on a source
   with three measurable failures, so this repair protects every reopened
   concept, not just this one.
4. **Give the loop a real input and a real failure state.** A minimal form on the
   hire route — bike type, preferred week, name, phone — composing a `mailto`
   body that carries every field (the pattern Donard Veterinary was repaired to
   use), with an empty-submit message and recovery.
   *Acceptance check:* an assertion that submitting with fields populated
   produces a `mailto:` whose body contains every value, and that submitting
   empty shows a visible message without navigating away.
5. **Reduce the dead-link load in the first viewport, or make it informative.**
   Five struck-through range cells at 2.29:1 advertise the missing half of the
   design task across the bottom of the scored screen. Follow Douglas & Cromie:
   populate the rail with labelled placeholder content that explains itself, or
   move the rail out of the fold.
   *Acceptance check:* no more than two inert controls inside the first viewport
   at 1265×710, and every inert control's explanation reachable without hover.
6. **Correct the stale source note and the missing space.** Update
   `transformation-details.ts:744` — the Trek dealer photography it describes is
   deleted — and fix `<strong>Trek</strong>dealer` in the hero lede.
7. **Housekeeping.** Delete `@keyframes mc-rise`, `.mc-story::after` and the
   no-op `prefers-reduced-motion` block; give phone visitors some site navigation
   or accept and document the two-route shape; point "Cycle to Work" at a
   distinct destination or drop the duplicate; keep the hire panel CTAs out from
   under the fixed disclosure at 390px.

## Appeal

Appeal requested: No
Reason: —
Appeal reviewer: —
Appeal reviewer saw earlier scores before deciding: No
Appeal score: —
Appeal verdict replacing the original: —

## Re-review

Date: 2026-07-25
Commit: `efadf8a`
Reviewed source fingerprint: `sha256:c51e0e8d37e7dc365b96d7462334d826ae733c4d9608812a3b6c903969ad66a4`

Earlier verdicts, preserved:

| Round | Date | Weighted | Verdict | Design gates failed |
|---|---|---:|---|---|
| 1 — first independent v1.1 | 24 Jul 2026 | 5.93 | Revise | claims, subject proof, responsive |
| 2 — after the shared repair pass | 25 Jul 2026 | 5.78 | Revise | claims, subject proof, readable |
| **3 — this review, after the reopened-candidate repair** | **25 Jul 2026** | **6.08** | **Revise** | **subject proof, responsive, readable** |

Checks repeated: first-glance at 1265×710 and a true 390×844 on both routes;
pointer and keyboard primary loop; inert-control activation; full link and route
inventory; external destination and parameter check against `verifications.json`;
computed-style contrast sweep with inherited CSS `opacity` composited; focus-ring
contrast measured against the surface the ring is drawn on, plus a rendered
capture; reduced-motion emulation; horizontal-overflow and clipped-header
measurement; dense-scroll `elementFromPoint` occlusion sweep at 25px intervals;
console capture; remove-nav, swap-the-business and closest-neighbour tests from
the reviewer's own captures; subject-proof judgement against the 24 July 2026
amendment; `pnpm test:reviewed-concepts`; fingerprint re-computation.

Earlier defect disposition — the previous round's three failed gates:

- **Claims are honest — RESOLVED.** "TREK MAIN DEALER FOR THE AREA" is gone from
  the first-viewport strip of both routes and replaced with "listed Trek dealer &
  Cyclescheme retailer", a near-verbatim quote of the verification record; the
  self-contradiction with the hero lede 300px below is therefore also gone. The
  hero `alt` no longer asserts the fence is Mourne Cycles' service yard. The gate
  passes. Residual, not gate-breaking: the stale photography sentence in
  `transformation-details.ts:744`.
- **Subject proof — PARTIALLY RESOLVED, still FAILS.** Condition (2), open
  disclosure, is fully fixed: the caption is pinned to the image and measured
  inside the fold at both sizes (phone y 708–753 against an 844 fold, where it
  previously sat 61px below), and the banner is `position: fixed` at every size
  and also in-fold. Condition (3), faithfulness, still passes. Condition (1),
  subject-specificity, is unchanged and is now the sole cause of failure — the
  frame still shows a bicycle, a fence and a bin, and both the credits file and
  the caption explicitly disclaim that it depicts the shop's premises or stock.
  No repair addressed this; it needs different imagery, not different framing.
- **Readable and motion-safe — LARGELY RESOLVED, still FAILS narrowly.** The ~20
  sub-threshold texts are down to 3. Every item the last round named —
  `.mc-hire-sub` 3.60→5.74, `.mc-provisional` 3.25→5.18, `.mc-tier-price`
  3.84→6.88, `.mc-tier-detail` 3.60→5.74, `.mc-panel-num` 2.82→6.87,
  `.mc-step-n` 3.81→4.82, `.mc-savings-label` 3.34→6.87, `.mc-brand-sub`
  3.96→6.31 — now passes. The three survivors are a different defect class (CSS
  `opacity`, not colour choice) which the new repo assertion does not detect.

Other dispositions carried from earlier rounds:

- **Asset-permission release blocker — RESOLVED.** `mourne-cycles-trail.jpg`
  deleted and documented; the hire route serves no images.
- **"Controls trapped under the disclosure banner" (portfolio-wide) — RESOLVED at
  1265×710.** Where the last round measured all six `.mc-rail` cells covered on a
  document 2px taller than the viewport, `--mm-banner-space` now reserves 84px
  and the dense hit-test returns **zero** occluded controls at desktop. At 390px
  the reserved space is 100px and no control is permanently trapped, but three
  active controls are covered at some scroll positions — recorded as a
  craft/loop weakness, not a gate failure.
- **390px header overflow clipping the primary CTA (round 1) — RESOLVED and
  still clean.** `scrollWidth === clientWidth === 390` on both routes; zero
  clipped header controls.
- **Studio gorse focus ring leaking into the concept — RESOLVED, and replaced by
  a new defect.** The ring is no longer Mourne Made's `#E0C14D`; it is now
  `#0f1013`, which is this concept's own hero background, so the primary action
  went from a low-contrast ring to no visible ring at all. This is the one
  genuine regression introduced by the repair.
- **Focus order, overflow, clipped-header, console and placeholder-marking
  results — all still clean**, re-measured rather than carried forward.

Final score: **6.08**/10
Final verdict: **Revise**

The trajectory is real: 5.93 → 5.78 → 6.08, with the claims gate and the asset
blocker both closed for the first time, the honesty copy now legible, and both
disclosures inside the phone fold. What remains is not a polish list. Two of the
three failed gates now turn on single, specific, cheap defects — one CSS custom
property (`--concept-focus`) and three `opacity` values — and could be closed in
an afternoon. The third cannot: the subject-proof gate needs a picture of the
shop, and the concept has spent three rounds repairing everything around that
requirement without meeting it.

If the final verdict is Revise:

Retired from public queue: this is the second consecutive Revise after the
owner's 25 July reopening, which was itself an explicit designation rather than a
fresh repair cycle. Under §5 three core categories are still below 7.0 and three
design gates still fail, so the design is retired from the public queue and kept
internal. It remains a `noindex` route and `Concept in progress` in
`PROSPECTS.md`; no transformation, one-sheet or outreach use is permitted.
Condition required to reopen: new subject imagery showing the actual premises —
licensed photography or a faithful disclosed visualisation of the frontage or
workshop — since that is the only failure a further repair pass cannot resolve on
its own, together with the focus-ring and contrast fixes and a re-review by a
non-creator. An explicit owner flagship designation would also reopen it, but the
evidence here argues for the imagery first: everything else on this page is now
within reach of the standard.

## Truth refresh

Date: 2026-07-25
Trading status: **Open** — unchanged. Companies House NI064124 active,
confirmation statement dated 25 March 2026 (per `verifications.json`,
`verifiedOn: 2026-07-20`).
Current public presence: unchanged — free-tier Wix brochure site, "© 2014 …
Proudly created with Wix", supplier-logo collage opening screen, phone number as
the only action. Re-confirmed against `public/media/concepts/mourne-cycles/mourne-cycles-before.jpg`,
which matches the record's description exactly.
Primary external handoff: `tel:+442843727272` and
`mailto:mournecycles@gmail.com?subject=Workshop%20booking` — both match the
verified `corrections` block.
Material claims: **all supported.** The previous round's unsupported "Trek main
dealer for the area" is removed; the strip now quotes the record. "Est. 2002"
traces to the shop's own "established 2002" wording.
Asset permission: **clear.** The undocumented Trek marketing photograph is
deleted; the remaining hero is generated in-house with a documented boundary.
Material change found: **No** — no change at the business. One documentation
inconsistency remains inside the repository (`transformation-details.ts:744`
still describes reused Trek dealer photography that no longer exists).
Affected categories to re-review: none arising from a change at the business; the
open design failures are recorded above.
Public status: **Remove pending re-review** — the concept must not be published,
used in a transformation, one-sheet or outreach.

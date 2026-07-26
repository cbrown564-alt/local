# Archived concept review — Mourne Cycles — 25 July 2026

Status: Revise

Concept: `/concepts/mourne-cycles/`  
Reviewed commit: `8987095`  
Reviewed source fingerprint: `sha256:a7ca30644c4c26bf0333a717a5f68545e7bfa24908bfe5db5f5f27f31296c51c`  
(re-computed by the reviewer via `node scripts/check-concept-reviews.mjs --fingerprint mourne-cycles`; matches the repair candidate recorded in `CONCEPT_DESIGN_REVIEW.md`)  
Creator: Mourne Made (Phase Q shared repair pass + subject-proof pass, 24–25 July 2026)  
Independent reviewer: separate non-creator agent (did not create or repair this concept)

This is the **second** independent v1.1 review of Mourne Cycles. The first
returned Revise at 5.93 with gates `claims`, `subject proof` and
`responsive use` failed. Scores below were fixed from the reviewer's own live
inspection before reading the Phase Q batch table or the shared-repair table;
those were read afterwards only to write the "Earlier defect disposition" line
in the Re-review section, and no score was changed as a result.

## Candidate

Visitor job: *"My bike needs a service — get it booked in with the Newcastle
shop without having to ring blind and ask what they do."*

Current presence and verification: `research/verifications.json` → "Mourne
Cycles", Newcastle, `verifiedOn: 2026-07-20`. Trading status **Open**
(Companies House NI064124 active, confirmation statement 25 March 2026; listed
Trek dealer and Cyclescheme retailer). Digital presence: free-tier Wix
brochure site with a "© 2014 … Proudly created with Wix" footer, no product
listings, no prices, no booking of any kind; the opening screen is a collage of
supplier logos (Trek, Bontrager, Shimano) with the shop's own name only in the
header logo and the phone number as the only action. Verified corrections:
phone `028 4372 7272`, email `mournecycles@gmail.com`, Facebook, Instagram.

Truth checked at: 2026-07-20 (5 days old at review; refresh due 2026-10-18).

Primary loop: home hero → **Book a workshop slot** → `/concepts/mourne-cycles/hire/`
→ panel 02 *Workshop & service* → **Email to book a slot →**
(`mailto:mournecycles@gmail.com?subject=Workshop%20booking`), with
**Call to book · 028 4372 7272** (`tel:+442843727272`) as the parallel handoff
in panel 01.

Review boundary:

- Start screen/state: `/concepts/mourne-cycles/` first viewport, hero CTA
  "Book a workshop slot" (measured at y 479–538 desktop, y 475–534 phone —
  fully in the fold at both sizes).
- Successful end screen/state: `/concepts/mourne-cycles/hire/`, panel 02, the
  visitor's mail client opens on a draft addressed to
  `mournecycles@gmail.com` with subject "Workshop booking". This is an
  explicitly labelled prototype handoff — the panel foot reads "The shop
  confirms scope, price and turnaround".
- Important failure state: **none exists.** The concept contains no form, no
  input, no `<button>`, no `<select>` and no page script of its own
  (verified by grep across both `.astro` files and by DOM inspection: the only
  focusable elements on either route are anchors). There is nothing a visitor
  can submit incorrectly, so there is no empty state, no validation state and
  nothing to recover from. The nearest analogue is clicking an inert
  placeholder — see below.
- Recovery: n/a. Clicking the inert "Explore the bike range →" leaves the URL
  unchanged (`http://127.0.0.1:4321/concepts/mourne-cycles/`), opens no dialog,
  writes to no `aria-live` region and produces no visible response of any kind.
  The only explanation available to the visitor is the `title` attribute
  tooltip "Concept preview — this link is not active", which requires a mouse
  hover and is unavailable to keyboard and touch users.

Exposed routes and actions outside the loop:

- `/concepts/mourne-cycles/` (Bikes, brand mark) → works.
- `/concepts/mourne-cycles/hire/` (Workshop, Cycle to Work, Book a service,
  the red "Cycle to Work / Save through work" rail cell) → works. Note
  "Workshop" and "Cycle to Work" are two nav items pointing at the same URL.
- `tel:+442843727272` ×2 per route (strip + header, plus panel 01) → correct,
  matches the verified correction.
- `mailto:mournecycles@gmail.com?subject=Workshop%20booking` (hire header
  "Book a service" + panel 02) → correct, matches the verified correction.
- `/request/?business=Mourne%20Cycles&town=Newcastle&source=concept` (claim
  action in the shared banner) → works, parameters correct.
- No `/transformations/mourne-cycles/` case-study link renders, because the
  slug has no published transformation record. Correct for the current state.

Declared placeholders, stubs and limitations:

All eight use the explicit `data-concept-placeholder` marker (no bare
`href="#"` survives). `ConceptLayout`'s script strips the `href`, sets
`aria-disabled="true"`, adds a `title`, and `concept-shell.css` renders them
`opacity: .5` with a dotted line-through.

- Nav: **Accessories**, **Visit us**.
- Hero secondary action: **Explore the bike range →** — sits directly beside
  the primary CTA in the first viewport at both sizes.
- Range rail: **01 Electric**, **02 Road**, **03 Mountain**, **04 Hybrid**,
  **05 Kids** — the entire bike range, i.e. the headline deliverable of the
  recorded design task ("Retail storefront: **product range**, servicing and
  hire booking, Cyclescheme funnel").
- Hire panel 03: **Start your application →**, softened by the foot note
  "Confirm the current application route with the shop".
- Illustrative content, all labelled *before* the values appear: hire prices
  ("Illustrative models and prices — not verified current stock or rates"),
  service tiers ("Illustrative service tiers — not verified current
  packages"), the 42% dial ("illustrative scheme example"), plus the layout
  `bannerNote` on the hire route ("Hire prices, service tiers and savings
  examples are illustrative, not current shop offers").
- Hero imagery: AI-generated visualisation, disclosed in an adjacent
  figcaption and in `public/images/place/ATTRIBUTION.md`.

Closest portfolio neighbours:

- **The Tool Centre** (`/concepts/tool-centre/`) — same town, same trade-retail
  category, and near-identical page grammar: black top strip with address left
  and phone right, paper header bar with mark + name + spaced all-caps
  subline, horizontal nav with struck-through inert items, coloured pill CTA
  top-right, kicker with a coloured dash rule, huge condensed all-caps
  two-colour headline, lede paragraph with the business name bolded, filled
  primary button plus a secondary text link, and a bottom rail. Both concepts
  also share the same honesty stance ("rates on request" / "not verified
  current rates") and the same phone-first thesis.
- **Murdock Brothers** (`/concepts/murdock-brothers/`) — same coal ground plus
  one hot accent, same condensed all-caps two-colour hero, same struck-through
  nav, same right-hand panel, same trade voice, same "the merchant publishes no
  price so we leave it blank" honesty move.
- (Douglas & Cromie is a close third, and solves Mourne Cycles' exact
  "we cannot show real stock" problem more usefully — see the neighbour test.)

## Evidence bundle

- Current capture: `public/images/mourne-cycles-before.jpg` — read in full.
  Representative: it shows exactly what the verification record describes
  (Trek / Shimano / Bontrager logo collage, shop name only in the header logo,
  phone number as the sole action, HOME · SHOWROOM · WORKSHOP · ABOUT · VISIT US
  nav).
- Desktop after, 1265×710:
  `research/concept-reviews/evidence/phase-q-rereview/reviewer-mourne-cycles/v2-home-desktop.png`
  and `v2-hire-desktop.png` (reviewer's own; full-page variants alongside).
- Phone first screen, 390×844:
  `.../reviewer-mourne-cycles/v2-home-phone.png` and `v2-hire-phone.png`
  (plus `-full.png`).
  **Note on the supplied bundle:** the pre-captured images in
  `research/concept-reviews/evidence/phase-q-rereview/` (`mourne-cycles__desktop-1265x710.png`,
  `mourne-cycles__phone-390x844.png` and their `-full` variants) are
  **mis-captured** — they render the page at Puppeteer's default 800 px
  viewport and then pad or crop the bitmap to the nominal size, so the desktop
  shot shows a 1265 px frame with 465 px of blank canvas and the phone shot
  shows an 800 px-wide layout cropped to 390 px with the headline and hero
  links sliced through. They make the concept look broken when it is not.
  Every measurement in this record comes from the reviewer's own captures,
  taken with the viewport genuinely set to 1265×710 and 390×844 and the
  screenshot issued over CDP `Page.captureScreenshot` so Puppeteer cannot reset
  the metrics override mid-capture.
- Primary-loop walkthrough: `.../reviewer-mourne-cycles/loop.json` steps 1–2
  (pointer and keyboard), `focus-cta.png` (visible focus ring on the primary
  CTA).
- Failure and recovery evidence: `.../reviewer-mourne-cycles/loop.json` step 3.
  There is no failure state to capture; the recorded evidence is the null
  result of activating an inert control.
- Sources, asset credits and limitations: `public/images/place/ATTRIBUTION.md`
  (hero visualisation entry); `src/data/transformation-details.ts` lines 731
  and 744 (source note: "the established-2002 wording, the address, phone
  number and email, the brand list, the bike categories and the Cycle to Work
  partnerships all come from that site").
- Asset source and public-use rights status:
  - `mourne-cycles-faithful-visualisation.jpg` — generated in-house from an
    April 2026 Mourne Cycles customer photo; documented in ATTRIBUTION.md with
    its generation boundary. **Publishable.**
  - `mourne-cycles-trail.jpg` (hire panel 01 background) — **not in
    ATTRIBUTION.md at all**, and no rights status recorded anywhere. It is
    Trek/Bontrager dealer marketing photography (the same rider frame is
    visible on the shop's current site in `mourne-cycles-before.jpg`, and
    `transformation-details.ts` confirms "the photographs are the Trek dealer
    imagery the shop already publishes on its own pages, reused rather than
    replaced"). **Release blocker.**
- External destination and accepted parameters: `tel:+442843727272` and
  `mailto:mournecycles@gmail.com?subject=Workshop%20booking`. Both destinations
  match the verification record's `corrections` block exactly, so both are
  routes the real business honours. **No parameters are collected or carried** —
  the mailto subject is a hardcoded literal; nothing the visitor read or chose
  (bike type, tier, date, name) reaches the shop.
- Keyboard check: **pass.** Home: 10 focusable elements, tab order matches
  visual order, Tab ×8 reaches "Book a workshop slot", Enter navigates to
  `/concepts/mourne-cycles/hire/` (h1 "TWO WHEELS, LOOKED AFTER."). Hire: Tab
  ×9 reaches "Email to book a slot →". Every focusable element shows
  `outline: solid 3px rgb(224,193,77)` at `outline-offset: 4px`. The eight
  inert placeholders have no `href` and no `tabindex`, so they are correctly
  skipped rather than trapping focus.
- Contrast check: **fail.** ~20 distinct sub-threshold texts measured from
  computed styles with alpha composited against the resolved backdrop. Full
  table in `.../reviewer-mourne-cycles/audit.json`. Worst offenders listed in
  the Responsive/accessibility row below.
- Reduced-motion check: **pass, vacuously.** Under CDP
  `Emulation.setEmulatedMedia` `prefers-reduced-motion: reduce`,
  `document.getAnimations()` returns 0 and no element has a computed
  `animation-name` other than `none`. The concept has no animation at all —
  `@keyframes mc-rise` is declared at `concept-mourne-cycles.css:261` and never
  applied, so the `@media (prefers-reduced-motion: reduce)` block at line 286
  disables animations that do not exist. Only 140–150 ms colour transitions and
  1 px hover lifts remain, which are not nonessential movement in the gate's
  sense.
- `pnpm build`: **pass** — release check + `astro check` + `astro build`,
  71 pages, complete in 1.38 s.
- `pnpm test:concepts`: **pass** — "36 routes × 2 viewports; 72 passed, 0
  failed; 109 declared placeholders."
- `pnpm test:reviewed-concepts`: **pass** — "7/7 passed." No assertion is
  Mourne-Cycles-specific for the workshop handoff, because there is no field to
  preserve; the reviewed-concept suite currently owns only the provisional-label
  assertion for this slug.
- Relevant journey or interaction check: reviewer's own — overflow, fold
  geometry, link inventory, tab order, contrast, reduced motion, placeholder
  activation, banner overlap (`mc-capture2.mjs`, `mc-audit.mjs`, `mc-loop.mjs`,
  `mc-fold.mjs`, `mc-neighbours.mjs` in `.tmp/`).
- Browser console: **clean.** Zero errors, zero page errors and zero failed
  requests on both routes at both viewports.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | **Pass** | `verifiedOn` 2026-07-20, five days before review — well inside one month. The current-site capture is representative and matches the record's description of the Wix supplier-logo collage line for line. The concept's copy describes the shop plainly ("An established local bike shop, listed as a Trek dealer and Cyclescheme retailer") and nowhere mocks the current site; the hire page repeatedly defers to the shop ("Call on 028 4372 7272 to confirm what the shop currently offers", "The shop confirms scope, price and turnaround"). |
| Claims are honest | **Fail** | The top strip of **both** routes, in the first viewport, reads "**EST. 2002 · TREK MAIN DEALER FOR THE AREA**", unlabelled and unqualified. The verification record supports only "listed Trek dealer and Cyclescheme retailer"; no source in `verifications.json`, `transformation-details.ts` or ATTRIBUTION.md contains the words "main dealer". "Main dealer **for the area**" converts a neutral sourced fact into an exclusivity claim about a relationship with Trek, and the concept's own hero lede three hundred pixels below states the sourced version correctly ("listed as a Trek dealer"), so the page contradicts itself on the same screen. Second instance: the hero image's accessible name asserts "**Mourne Cycles' red service-yard fence**" while ATTRIBUTION.md records the reference only as "an April 2026 Mourne Cycles customer photo" — a premises claim with no source. Everything else is properly handled: "Est. 2002" traces to the shop's own site wording, and prices, tiers and the 42% figure all carry explicit illustrative labels placed *before* the values. |
| Real visitor loop | **Pass** | The primary job reaches an explicitly labelled prototype handoff. Both external destinations are live and are the ones the real business honours (`tel:+442843727272`, `mournecycles@gmail.com` — both from the verified `corrections` block). There is no fake search, no inert filter, no decorative submit, no invented live status. Every price and tier that cannot be verified is labelled as illustrative before it appears, and all eight inactive controls carry `data-concept-placeholder` rather than a bare `href="#"`. Passes — but note it passes partly because nothing interactive was attempted; see the Complete-loop score. |
| Subject proof | **Fail** | Judged against the 24 July 2026 amendment. **(1) Subject-specific — marginal.** The image is not stock: a specific used Trek full-suspension bike, a specific red slatted fence, specific paving, a blue wheelie bin hand-marked "48". But nothing in the frame identifies *this business*: no shop, no frontage, no signage, no workshop interior, no staff, no Castlewellan Road. A visitor meeting the first viewport gets convincing proof that a bike exists against a red fence somewhere — not visual proof of this bike shop. It sits between a category scene and true subject proof, and below the standard set by Cúpla and Kent Amusements, which visualise or photograph the actual frontage. **(2) Openly disclosed — fails at phone size.** At 1265×710 the disclosing figcaption is fully in the fold (image y 111–576, caption y 576–612). At a true 390×844 the image runs y 625–905 (78 % visible) and the figcaption sits y **905–956, i.e. 61 px below the fold**; the shared "Independent concept by Mourne Made" banner goes `position: static` at ≤760 px and lands at y 1302, also below the fold. So a phone visitor meeting the first viewport sees a photorealistic photograph of a bicycle with **neither** the AI disclosure **nor** the independent-concept disclosure visible anywhere on screen. The gate requires the first viewport to contain proof that is openly labelled as such; at the size most visitors will use, it is not labelled at all. **(3) Faithful — pass.** A scuffed bike beside a wheelie bin under-promises rather than over-promises; it depicts no standard the shop cannot deliver. |
| Responsive and keyboard usable | **Pass** | Measured `document.documentElement.scrollWidth === clientWidth` on both routes at both sizes (1265/1265, 390/390); zero elements extend past the viewport edge. Header actions are never clipped — the red "BOOK A SERVICE" button is fully inside 390 px, and the primary CTA is fully in the phone fold at y 475–534. Reflow is sensible: hero unstacks 46/54 → single column, the three hire panels stack, the range rail goes two-up. Keyboard: full tab order in visual order, visible 3 px focus ring on every focusable element, Enter activates. Recorded weakness (not gate-breaking): `.mc-nav` and `.mc-phone` are `display: none` below 940 px with **no replacement control**, so a phone visitor has no site navigation at all on either route — the content stays reachable only because the CTA and the red rail cell both point at the hire page. |
| Readable and motion-safe | **Fail** | ~20 measured body/control texts below 4.5:1, concentrated in exactly the copy that carries the concept's honesty. On the hire route: the prototype disclosure sentence "This screen demonstrates a possible hire, workshop and Cycle to Work journey…" **3.60:1**; "Illustrative service tiers — not verified current packages" **3.25:1**; "ILLUSTRATIVE SCHEME EXAMPLE" beside the 42 % dial **3.34:1**; every price ("from £20 / day", "£30", "£45") **3.84:1**; every service description ("Safety check + lube" etc.) **3.60:1**; the Cyclescheme body copy **4.12:1**; the step numerals **3.81:1**; the panel number "03" **2.82:1**. On both routes the locality line "NEWCASTLE · COUNTY DOWN" under the wordmark is **3.96:1** at 10 px. The eight inert links, dimmed to `opacity: .5`, come out at **3.57:1** effective. Motion side passes (no animation exists to remove). Images have useful alternatives — the hero alt is descriptive and self-disclosing, the decorative trail photo is correctly `alt=""` inside `aria-hidden="true"`. |

Review disposition: **Revise**

Evidence still needed to judge the design: none. Every scored category was
judged from live inspection.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | **Blocked** | `mourne-cycles-trail.jpg`, used at 20 % opacity behind hire panel 01, is Trek/Bontrager dealer marketing photography reused from the shop's own site. It has **no entry in `public/images/place/ATTRIBUTION.md`** — the only image in either route that the credits file misses — and no recorded rights status. Unblock by documenting a licence, replacing it with an owned or generated asset, or removing it (it is decorative and `aria-hidden`, so removal costs nothing). The hero visualisation is generated in-house, documented with its generation boundary, and is publishable. |
| Truth check current within 90 days | **Pass** | `verifiedOn: 2026-07-20`, five days old. Expires 2026-10-18. |
| Independent-concept safeguards and honest public disclosure | **Pass, with a recorded defect** | `<meta name="robots" content="noindex, nofollow">` present via `ConceptLayout`; "Independent concept by Mourne Made. Not the live Mourne Cycles website." present on both routes, with the extra `bannerNote` on the hire route; claim action `/request/?business=Mourne%20Cycles&town=Newcastle&source=concept` present and correctly parameterised. The condition is met literally. The defect — that at ≤760 px the banner is `position: static` and drops below the fold — is scored under the subject-proof gate rather than counted twice here. No public case study exists for this slug yet, so no public claim is outstanding. |
| Repository and journey checks | **Pass** | `pnpm build` complete (release check + `astro check` + `astro build`, 71 pages). `pnpm test:concepts` 72/72 across 36 routes. `pnpm test:reviewed-concepts` 7/7. Fingerprint re-computed by the reviewer as `sha256:a7ca30…c51c`, matching the reviewed source. |

## Creator self-review

No creator self-score was filed for this re-review, so this table is
deliberately empty and the independent scores below stand alone.

## Independent review

First-glance order at desktop (1265×710): **first**, the coal-black left plane
with "MOURNE **CYCLES**" in 88 px condensed italic caps, the word "CYCLES" in
signal red — the name genuinely owns the screen; **second**, the photograph on
the right, a black Trek full-suspension bike against a bright red fence, which
is the only colour mass big enough to compete with the headline; **third**, the
red "BOOK A WORKSHOP SLOT" button — and immediately after it, unavoidably, the
row of five struck-through range cells (ELECTRIC · ROAD · MOUNTAIN · HYBRID ·
KIDS) across the bottom of the fold. The eye's third and fourth stops are a
live action and a wall of crossed-out ones.

First-glance order on phone (390×844): **first**, "MOURNE CYCLES" (48 px, still
dominant); **second**, the red "BOOK A WORKSHOP SLOT" block at y 475; **third**,
the top edge of the bike photograph entering at y 625 and running off the bottom
of the screen. Nothing else fits. The struck-through "Explore the bike range →"
sits between the CTA and the image at y 558. Critically, at this size the
photograph arrives **uncaptioned** — the "AI-generated visualisation" line is
61 px below the fold, and the "Independent concept" banner is 458 px below it.

Remove-nav test: **passes.** With `.mc-strip` and `.mc-header` hidden, the
business is still identifiable at hero scale — the wordmark carries it, the
signal-red/coal pairing and the condensed italic are recognisably the shop's
own logo colours and letterforms (verified against the real mark in
`mourne-cycles-before.jpg`, a red-and-white mountain-and-cog over MOURNE CYCLES
in condensed caps), and the "NEWCASTLE · LOCAL SINCE 2002" kicker places it.
The qualification: identity survives via the *name and palette*, not via the
photograph — strip the nav and the image alone would not tell you which bike
shop this is.

Swap-the-business test: replace "Mourne Cycles" with any Newcastle trade
retailer and the page survives almost intact. The coal/hot-accent split hero,
the kicker dash, the condensed two-colour caps headline, the lede, the filled
button plus struck secondary link, the bottom category rail, the phone-first
thesis and the "call to confirm" honesty stance all transfer unchanged; only
the photograph and the word "Cycles" would have to move. Nothing on the page is
*bike-shop-shaped* the way Murdock Brothers' litre slider is fuel-shaped or
Groves' dispensing label is pharmacy-shaped — the promised bike-shop artefact
(the range rail) is present as five dead cells. The tightest thing the page
owns is the SVG peaks-and-red-summit mark, which is a faithful quote of the
shop's real logo.

Closest-neighbour test: against **The Tool Centre**, the two first viewports are
the same composition with substitutions — same black strip (address left, phone
right), same paper header with mark + name + spaced subline, same struck-through
nav, same coloured pill CTA top-right, same kicker-dash + condensed two-colour
caps H1 + lede + filled button + struck secondary link, same bottom rail, same
town, same "we cannot publish rates so ring the shop" thesis. What is materially
different is only the right-hand plane (Tool Centre fills it with a black hire
rate card carrying real content; Mourne Cycles fills it with a photograph) and
the accent hue (yellow vs red). Against **Murdock Brothers**, the same coal +
single-hot-accent + condensed-caps + right-hand-panel + struck-nav construction
recurs, but Murdock earns its screen with a working range input and a
deliberately blank price panel that explains itself — a real signature
interaction where Mourne Cycles has none. **Douglas & Cromie** solves this
concept's exact problem better: facing the same "we cannot show real stock"
constraint, it renders a populated forecourt list with labelled `PHOTO`
placeholders and a banner note stating "Vehicles shown are placeholders", which
communicates far more than five crossed-out category names. Mourne Cycles'
genuine differentiator against all three is the photographic hero — which makes
the disclosure gap at 390 px more costly, not less.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 6.0 | 0.90 | Verification 5 days old; before-capture matches the record line for line; both handoff destinations match the verified `corrections` block; three separate `.mc-provisional` labels plus a layout `bannerNote` place every unverifiable price/tier/percentage *before* the value; AI hero disclosed in a figcaption and documented in ATTRIBUTION.md with its generation boundary; "Est. 2002" traced to the shop's own site wording via `transformation-details.ts`. | The illustrative labelling is genuinely disciplined — the label precedes the number in all three places, and the layout-level banner note repeats it, so no visitor can read a price without first reading that it is not a real one. | "TREK MAIN DEALER FOR THE AREA" in the first-viewport strip of both routes is an unsourced exclusivity claim about a third-party relationship, and it contradicts the correctly-sourced "listed as a Trek dealer" 300 px below it. Compounded by `mourne-cycles-trail.jpg` — Trek marketing photography reused with no ATTRIBUTION entry and no rights status — and by the hero alt asserting a "service-yard" that no record evidences. |
| Visitor outcome and concept thesis | 15% | 6.0 | 0.90 | Against a Wix page whose only action is a phone number under a supplier-logo collage, the concept puts a named workshop action in the fold, adds a page that explains three service tiers and a Cyclescheme route, and hands off to the shop's real number and real email. The opening speaks to the visitor ("Bikes, workshop care and straight local advice") before any owner-facing framing. | The thesis is honest about its own limits and picks the right job: the current site cannot tell a visitor what the workshop does, and this page can. The hire route's "Call on 028 4372 7272 to confirm what the shop currently offers" is the right posture for a shop that publishes nothing. | The task is barely made easier. The handoff collects nothing — `mailto:…?subject=Workshop%20booking` is a hardcoded literal, so the visitor still opens a blank email and types the same thing they would have said on the phone. Buck's Head carries date + party into ResDiary and Enniskeen carries date + nights into Bookin1; this carries a subject line. And the design task's headline deliverable, the product range, is five struck-through cells. |
| Subject identity and distinctiveness | 15% | 6.0 | 0.90 | Remove-nav passes; the SVG peaks-and-red-summit mark and the coal/signal-red/condensed-italic system are demonstrably lifted from the shop's real logo and site rather than from the "bike shop" category; the hero photograph is of a real, specific bike in a real, specific yard. | The palette and mark are properly sourced from the subject — put the concept beside `mourne-cycles-before.jpg` and the red, the black and the condensed caps are visibly the same shop's, which is exactly what the category asks for. | The *construction* repeats the portfolio: The Tool Centre (same town) and Murdock Brothers share the strip/header/struck-nav/kicker-dash/condensed-two-colour-H1/lede/filled-button/struck-secondary/bottom-rail grammar almost element for element. Swap the business and only the photo and the word "Cycles" must change. Nothing on the page is shaped by what a bike shop actually does. |
| First viewport and visual composition | 15% | 6.0 | 0.90 | Desktop: one legible composition, 46/54 coal-to-photograph split, brand dominant at 88 px, one-line proposition, one red primary action, caption in the fold at y 576–612. Phone: identity → action → evidence order, headline at y 237, CTA at y 475, image entering at y 625. Measured: 8 of the 18 links inside the desktop fold are inert. | The desktop first screen is the strongest thing here — a real dominant visual plane, no card grid, no widget clutter, and the red of the fence in the photograph rhyming with the red of "CYCLES" and the CTA is a deliberate, well-judged colour tie. | Eight struck-through dead links sit inside the scored screen, including the secondary action directly beside the primary CTA and the entire five-cell range rail across the bottom edge. The composition's third beat is a row of crossed-out product categories. On phone the fold cuts the photograph at 78 % and leaves both disclosures off-screen, so the phone first viewport is materially weaker than the desktop one it is scored beside. |
| Complete loop and functional integrity | 15% | 5.5 | 0.825 | Pointer and keyboard both complete the loop (Tab ×8 → Enter → hire route; Tab ×9 → mailto). Both destinations verified against the record. All eight placeholders correctly marked and correctly skipped by keyboard. `test:concepts` 72/72, `test:reviewed-concepts` 7/7, `build` clean, zero console errors. | Everything that exists actually works, and the handoffs are real rather than decorative — the number and the address are the ones the shop answers, verified against `verifications.json`, not invented. | Two of the four states the rubric requires do not exist. There is **no form, input, button or script anywhere in the concept**, so there is no failure state, no empty state and nothing to recover from, and the handoff carries no parameters. Activating an inert control produces no visible response at all — no URL change, no dialog, no live region — and the only explanation is a `title` tooltip that keyboard and touch users never receive. "Book a service" in the header also means two different things on the two routes (navigate on home, open a mail client on hire). |
| Responsive use and accessibility | 15% | 5.0 | 0.75 | Zero horizontal overflow measured at 1265×710 and a true 390×844 on both routes; no clipped header actions; sensible reflow; complete keyboard operation with a visible 3 px focus ring; correct image alternatives; reduced motion verified via emulated media (0 running animations). ~20 measured contrast failures. | The mechanical responsive work is clean and verified at a true 390 px viewport rather than a faked one — no overflow, no clipping, no focus trap, correct `alt=""`/`aria-hidden` on the decorative photo and a self-disclosing alt on the hero. | Text is not readable where it matters most: the prototype disclosure sentence is 3.60:1, "Illustrative service tiers — not verified current packages" is 3.25:1 and "ILLUSTRATIVE SCHEME EXAMPLE" is 3.34:1 — the three pieces of copy that hold the claims gate up are among the least legible text on the page, alongside every price at 3.84:1. Separately, `.mc-nav` and `.mc-phone` are `display: none` below 940 px with no replacement, so phone visitors get no site navigation at all. |
| Craft and finish | 10% | 6.0 | 0.60 | Consistent condensed-italic display against Barlow body, a coherent letter-spacing ladder, the skewed red dash motif carried across both routes, no over-rounding, no reflex card grid, no rise animation, no console defects, correct responsive image sources (1265/640 WebP with a JPEG fallback and sensible `sizes`). | The type system is genuinely deliberate and holds together across two routes and two sizes — the 0.09em/0.14em/0.26em tracking ladder, the italic-caps display voice and the single red accent read as one designed thing rather than a set of defaults. | Dead and misleading CSS: `@keyframes mc-rise` is declared and never used, `.mc-story::after { content: none }` is a no-op, and the `prefers-reduced-motion` block disables animations on five selectors that have none — the motion-safety code is decorative. The focus ring is Mourne Made's own gorse `#E0C14D` from `global.css`, i.e. the studio palette leaking into a concept screen, which `DESIGN.md` explicitly forbids. Two nav items point at the same URL, and on hire desktop the fixed banner sits over the "Trek e-bike · from £45 / day" row. |
| **Total** | **100%** | | **5.78/10** | | | |

Weighted calculation:

```text
(6.0 × .15) + (6.0 × .15) + (6.0 × .15) + (6.0 × .15)
             + (5.5 × .15) + (5.0 × .15) + (6.0 × .10)
= 0.90 + 0.90 + 0.90 + 0.90 + 0.825 + 0.75 + 0.60
= 5.775 → 5.78
```

## Verdict

Weighted score: **5.78**/10

Core category floors at 7.0 met: **No** — Evidence/truth 6.0, Visitor outcome
6.0, Complete loop 5.5 and Responsive/accessibility 5.0 are all below 7.0.

Supporting category floors at 6.0 met: **Yes** — Identity 6.0, First viewport
6.0, Craft 6.0 all meet 6.0 exactly.

All design gates pass: **No** — `Claims are honest`, `Subject proof` and
`Readable and motion-safe` fail.

All public release conditions pass: **No** — asset permission is blocked by the
undocumented Trek marketing photograph on the hire route.

Verdict: **Revise**

This consumes the one focused repair cycle allowed after the first Revise
verdict. Under the process rule at `CONCEPT_DESIGN_REVIEW.md` §5, if a core
category is still below 7.0, a supporting category is still below 6.0 or a
design gate still fails at the *next* re-review, the concept is retired from the
public queue and kept internal.

Required repairs in priority order:

1. **Remove or source the "main dealer" claim.** Replace the strip text
   "EST. 2002 · TREK MAIN DEALER FOR THE AREA" with the sourced wording already
   used in the hero lede ("Trek dealer · Cyclescheme retailer"), or cite a
   source in `verifications.json` that supports "main dealer for the area".
   Also amend the hero `alt` so it does not assert the fence is Mourne Cycles'
   service yard unless the customer-photo provenance is recorded.
   *Acceptance check:* no string on either route asserts a Trek relationship
   stronger than the verification record's "listed Trek dealer"; add a
   `test:reviewed-concepts` assertion that the strip text is a substring of a
   sourced-claims allowlist.
2. **Make the visualisation disclosure survive the phone fold.** The caption
   currently sits 61 px below y 844. Move it above the image, overlay it on the
   image, or reduce `.mc-visual-image { min-height: 280px }` so caption bottom
   ≤ 844 at 390×844.
   *Acceptance check:* a browser assertion that
   `.mc-visual figcaption`'s `getBoundingClientRect().bottom <= innerHeight` at
   390×844 on `/concepts/mourne-cycles/`.
3. **Fix the contrast failures, starting with the honesty copy.** Raise
   `.mc-hire-sub`, `.mc-provisional`, `.mc-savings-label`, `.mc-tier-detail`,
   `.mc-tier-price`, `.mc-panel-num`, `.mc-step-n`, `.mc-brand-sub` and the
   Cyclescheme body copy to ≥ 4.5:1. `--steel #7c8088` on `--paper #f5f4f1` can
   never reach 4.5:1 and needs darkening; red `#d7282f` on coal `#0f1013`
   reaches only 3.84:1 and needs lightening or a different role.
   *Acceptance check:* a scripted contrast sweep over both routes reporting zero
   sub-4.5:1 body/control texts and zero sub-3:1 large texts.
4. **Give the loop a real input and a real failure state.** A minimal form on
   the hire route — bike type, preferred week, name, phone — that composes a
   `mailto` body carrying every field (the pattern Donard Veterinary was
   repaired to use), with an empty-submit message and recovery.
   *Acceptance check:* a `test:reviewed-concepts` assertion that submitting with
   fields populated produces a `mailto:` whose body contains every value, and
   that submitting empty shows a visible message without navigating away.
5. **Reduce the dead-link load in the first viewport, or make it informative.**
   Five struck-through range cells advertise the missing half of the design
   task. Follow Douglas & Cromie: either populate the rail with labelled
   placeholder content that explains itself, or move the rail out of the fold.
   *Acceptance check:* no more than two inert controls inside the first viewport
   at 1265×710, and every inert control's explanation reachable without hover.
6. **Document or remove `mourne-cycles-trail.jpg`** (release blocker). It is
   decorative and `aria-hidden`; removing it costs nothing and clears the
   condition.
7. **Housekeeping.** Delete `@keyframes mc-rise`, `.mc-story::after` and the
   no-op `prefers-reduced-motion` block; give the concept its own focus-ring
   colour so the Mourne Made gorse does not appear inside a concept screen;
   point "Cycle to Work" at a distinct destination or drop the duplicate;
   reconcile the two meanings of the header "Book a service".

## Appeal

Appeal requested: No
Reason: —
Appeal reviewer: —
Appeal reviewer saw earlier scores before deciding: No
Appeal score: —
Appeal verdict replacing the original: —

## Re-review

Date: 2026-07-25
Commit: `8987095`
Checks repeated: first-glance at 1265×710 and 390×844; pointer and keyboard
primary loop; inert-control activation; full link/route inventory on both
routes; external destination and parameter check against `verifications.json`;
computed-style contrast sweep; reduced-motion emulation; horizontal-overflow and
clipped-header measurement; console capture; remove-nav, swap-the-business and
closest-neighbour tests; subject-proof judgement against the 24 July 2026
amendment; `pnpm build`, `pnpm test:concepts`, `pnpm test:reviewed-concepts`,
fingerprint re-computation.

Earlier defect disposition (read from the Phase Q batch table and the
shared-repair table only after the scores above were fixed):

- **"390 px header overflow clips the primary CTA" — RESOLVED.** Measured
  `scrollWidth === clientWidth === 390` on both routes; the header's red
  "BOOK A SERVICE" action is fully inside the viewport and the primary CTA sits
  fully in the phone fold at y 475–534.
- **"generic Trek/stock imagery captioned 'from the range in store'" —
  PARTIALLY RESOLVED.** The false caption is gone and the hero is now a
  subject-specific generated visualisation with a disclosing figcaption and an
  ATTRIBUTION entry. But the generic Trek marketing rider photograph survives on
  the hire route (`mourne-cycles-trail.jpg`, 20 % opacity behind panel 01) with
  no ATTRIBUTION entry and no rights status, and the new hero's disclosure falls
  below the fold at 390 px. **Subject proof still fails.**
- **"invented, unlabelled hire prices and service tiers" — RESOLVED.** Three
  `.mc-provisional` labels now precede the values, plus a layout-level
  `bannerNote`. Verified in the DOM and in the captures. (New consequence: those
  labels are now the lowest-contrast text on the page at 3.25–3.34:1.)
- **"brand mark struck-through by the inert-link script" (portfolio-wide) —
  RESOLVED.** The wordmark links to `/concepts/mourne-cycles/` and renders
  normally.
- **Claims gate — STILL FAILS**, on a defect the first review did not name:
  "TREK MAIN DEALER FOR THE AREA" in the first-viewport strip of both routes.
- **Responsive gate — NOW PASSES.** But `Readable and motion-safe`, which was
  *not* in the earlier failed set, now fails on ~20 measured contrast results.

Final score: **5.78**/10
Final verdict: **Revise**

The repaired source is better than the 5.93 it replaces on the three axes the
repair targeted, and slightly lower overall because this review weights the two
absent loop states and the contrast of the honesty copy more heavily, and
because the "main dealer" claim was not caught the first time. The difference is
not a disagreement about the repair; it is a wider net.

If the final verdict is Revise:

Retired from public queue: not yet — this verdict consumes the single allowed
repair cycle. The concept remains internal and `Concept in progress` in
`PROSPECTS.md`; no transformation, one-sheet or outreach use is permitted.
Condition required to reopen: the seven repairs above, re-verified by a
non-creator reviewer. If a core floor or a design gate still fails at that
point, retire the design and reopen only on new evidence, real subject
photography of the shop itself, a materially different direction, or an explicit
owner flagship decision.

## Truth refresh

Date: 2026-07-25
Trading status: **Open** — unchanged. Companies House NI064124 active,
confirmation statement dated 25 March 2026 (per `verifications.json`,
`verifiedOn: 2026-07-20`).
Current public presence: unchanged — free-tier Wix brochure site, "© 2014 …
Proudly created with Wix", supplier-logo collage opening screen, phone number as
the only action. Re-confirmed against `public/images/mourne-cycles-before.jpg`,
which matches the record's description exactly.
Primary external handoff: `tel:+442843727272` and
`mailto:mournecycles@gmail.com` — both match the verified `corrections` block.
Material claims: **one changed/unsupported** — "Trek main dealer for the area"
is not supported by the record, which says only "listed Trek dealer and
Cyclescheme retailer".
Asset permission: **action required** — `mourne-cycles-trail.jpg` has no
recorded source or licence.
Material change found: **Yes** (the unsupported dealer claim and the
undocumented asset, both introduced by the concept rather than by a change at
the business).
Affected categories to re-review: Evidence/truthfulness/respect; the
`Claims are honest` gate; the asset-permission release condition.
Public status: **Remove pending re-review** — the concept must not be published,
used in a transformation, one-sheet or outreach until the repairs above are made
and independently re-verified.

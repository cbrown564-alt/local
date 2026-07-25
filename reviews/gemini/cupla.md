# Concept review — Cúpla, Dundrum — 25 July 2026

Status: Revise

Concept: `/concepts/cupla/`  
Reviewed commit: `8987095`  
Reviewed source fingerprint: `sha256:d694b8f163d15a355be0d345f266384efdbe7ba12a9db723010b05c4b5665130`  
Creator: repair pass of 24 July 2026 (shared claims + subject-proof pass)  
Independent reviewer: non-creator reviewer agent, second v1.1 round

## Candidate

Visitor job: See what Cúpla serves and roughly what it costs, then find them or
check what is actually on today.

Current presence and verification: `research/verifications.json` → "Cupla",
verified 2026-07-21. CUPLA BAI'S LTD (NI711705) active at Companies House; food
hygiene rating "Good", 17 January 2025; confirmation statement overdue at the
time of checking but active trading confirmed by first-hand local report on
21 July 2026. No website; social-only presence
(`instagram.com/cuplabrewbar`, `facebook.com/p/Cúpla-61565293502528`). Café
"Brews, Bakes & Bowls" founded 2024 by twin owners, 105 Main Street, Dundrum,
Co. Down, BT33 0LX. Explicit caveat: distinguish from Cupla Coffee (Utah, USA)
and from Dundrum in Dublin.

Truth checked at: 2026-07-21 (4 days old at review; next refresh due
2026-10-19).

Primary loop: `/concepts/cupla/` → "An biachlár · Menu" → `/concepts/cupla/menu/`
(sterling sample menu) → "@cuplabrewbar →" handoff to Instagram for today's
specials and hours.

Review boundary:

- Start screen/state: `/concepts/cupla/`, first viewport, at 1265×710 and
  390×844.
- Successful end screen/state: `/concepts/cupla/menu/`, three sterling-priced
  columns under a visible illustrative-menu label, then the caramel specials
  strip handing off to `instagram.com/cuplabrewbar`.
- Important failure state: `/concepts/cupla/menu/` — the visitor wants
  information the prototype cannot hold (today's actual availability, current
  prices, opening hours). Trigger: reading "Babhla an Lae · Ask at the counter"
  and looking for a price.
- Recovery: the deferral is explicit at three points — the price cell renders an
  em dash `—` rather than an invented figure; the head note reads "Illustrative
  sample menu and sterling prices for design evaluation; confirm current items
  and prices on Instagram"; the foot strip reads "Speisialtachtaí an lae ·
  Today's counter specials live on Instagram" with a live
  `@cuplabrewbar →` link. Verified: HTTP 200, final URL unchanged, page title
  "Cúpla (@cuplabrewbar) • Instagram photos and videos".
- **Second failure state, with no recovery:** at 390×844 the concept home page
  contains no link to the menu at all (see Design gates). The failure has no
  in-prototype exit — the visitor's only remaining routes are Instagram,
  Facebook and the Mourne Made claim link.

Exposed routes and actions outside the loop:

- `/concepts/cupla/` → works (brand mark, "Fáilte · Home").
- `/concepts/cupla/menu/` → works at 1265; **unreachable from the home page at
  390** (`.cp-nav { display: none }`, `concept-cupla.css:277`, with no
  hamburger, no rail cell and no CTA replacing it).
- "Follow @cuplabrewbar", "See today's counter", "Today's hours on Instagram",
  "Ar oscailt · Today's hours →", "@cuplabrewbar" (×2) → all resolve to
  `https://www.instagram.com/cuplabrewbar/`, HTTP 200, correct account.
- "Find us on Facebook →" → `https://www.facebook.com/p/C%C3%BApla-61565293502528/`,
  HTTP 200, page title "Cúpla | Dundrum" — the correct Co. Down account, not
  the Utah or Dublin businesses the verification warns about.
- "Is this your business? Claim this concept →" →
  `/request/?business=C%C3%BApla&town=Dundrum&source=concept`, parameters
  correct.
- No case-study link renders (release check reports "0 public transformations"),
  which is the correct state.

Declared placeholders, stubs and limitations:

- Five inert links, all correctly marked `data-concept-placeholder`; the layout
  script strips `href`, sets `aria-disabled="true"` and `title="Concept preview
  — this link is not active"`, adds `.concept-link-inert`. Verified: none of the
  five appears in the tab order; computed style is `line-through`, `opacity 0.5`,
  `cursor: not-allowed`. No bare `href="#"` survives to the rendered page.
  - Header: "Ár scéal · Our story", "Aimsigh muid · Find us".
  - Home rail: "Maidin · Morning", "Lón · Lunch", "Le tabhairt leat · Takeaway".
- Menu content: labelled "Illustrative sample menu and sterling prices for
  design evaluation" in the petrol head bar, above every price at both sizes on
  direct load.
- Hero image: `figcaption` reads "AI-generated visualisation, faithfully based
  on Cúpla's August 2024 premises image. It is not documentary photography."
- Not offered anywhere: opening hours, a map, allergens, ordering. Hours are
  deferred honestly to Instagram in the top strip at both sizes.

Closest portfolio neighbours:

- **Scopers** (`src/pages/concepts/scopers.astro`) — the same Dundrum Main
  Street food category and, more seriously, the same composition: `-strip` /
  `-header` (brand lockup + nav + right-hand pill CTA) / `-hero` two-column grid
  / `-story` (kicker, h1, lede, two actions) / `-panel` / bottom four-cell
  `-rail` in which exactly three cells are `data-concept-placeholder` and the
  fourth links to social with a "today's hours" label. Cúpla's `.cp-rail` and
  Scopers' `.sc-rail` are the same component with different words.
- **Tonn Ruray Café** (`src/pages/concepts/tonn-ruray.astro`) — the other
  Dundrum Main Street café with an Irish-language name and a bilingual brand
  sub-lockup ("Caife · the café"). Cúpla's Irish/English pairing is not a unique
  position within the portfolio.

## Evidence bundle

- Current capture: `research/concept-reviews/evidence/phase-q-rereview/cupla__desktop-1265x710.png`,
  `…/cupla__phone-390x844.png`, `…/cupla_menu__*.png` (note: these were rendered
  in an 800 px window and do not show true 1265/390 layout; the reviewer
  re-captured — see below).
- Desktop after, 1265×710: `.tmp/cp-out/s-home__desktop-fold.png`,
  `.tmp/cp-out/s-menu__desktop-fold.png` (+ `-full.png`).
- Phone first screen, 390×844: `.tmp/cp-out/s-home__phone-fold.png`,
  `.tmp/cp-out/s-menu__phone-fold.png` (+ `-full.png`).
- Primary-loop walkthrough or recording: `.tmp/cp-keyboard.mjs` output —
  full tab order and rendered-link inventory at both sizes on both routes.
- Failure and recovery evidence: `.tmp/cp-out/s-menu__phone-full.png`
  (em-dash price, head note, specials strip); `.tmp/cp-focus.mjs` output
  (`menuReachable: false` at 390).
- Sources, asset credits and limitations: `research/verifications.json` →
  "Cupla"; `public/images/place/ATTRIBUTION.md:13`.
- Asset source and public-use rights status: `cupla-faithful-visualisation.jpg`
  is studio-generated from an August 2024 Google Maps user photo of the real
  frontage, held privately at `.tmp/concept-subject-references/cupla-exterior-google-2024.jpg`
  and not published. ATTRIBUTION records the reference and the generation
  boundary ("the prompt forbade invented seating, people, products or
  amenities") but records no licence position for the reference photograph
  itself.
- External destination and accepted parameters: Instagram 200 / "Cúpla
  (@cuplabrewbar)"; Facebook 200 / "Cúpla | Dundrum"; claim link parameters
  `business=Cúpla&town=Dundrum&source=concept` correct.
- Keyboard check: 8 stops at 1265 on both routes; visible focus ring on every
  stop; Tab 3 → Enter on home navigates to `/concepts/cupla/menu/` (title
  "Biachlár · Menu — Cúpla, Dundrum"). At 390 the home page has 7 stops and
  **none of them is the menu**. Focus-ring contrast measured: `rgb(224,193,77)`
  is 5.24:1 on petrol but **1.66:1 on the oat header** and **1.66:1 on the
  caramel primary CTA**.
- Contrast check: computed from live styles (see Design gates). Seven text roles
  below 4.5:1, including every price on the menu.
- Reduced-motion check: PASSES. Under
  `Emulation.setEmulatedMedia prefers-reduced-motion: reduce`, transition
  durations collapse from 0.15s to 1e-05s, `scroll-behavior` goes smooth →
  auto, `document.getAnimations().length === 0` in both states. There is no
  entrance animation to remove.
- `pnpm build`: PASS. Release check "Concept release check passed: 0 public
  transformations"; `astro check` clean; 71 pages built.
- `pnpm test:concepts`: 36 routes × 2 viewports, 71 passed / 1 failed. The
  single failure is `/concepts/castle-farm/ · phone` (HTTP 404 + 980 px
  document), unrelated to Cúpla and consistent with a dev-server race while the
  reviewer's own captures were running. Both Cúpla routes passed at both
  viewports — which is itself a finding: the audit asserts overflow, console and
  placeholder marking, and does not assert that essential navigation survives at
  390.
- `pnpm test:reviewed-concepts`: 7/7 passed, including the sterling-pricing and
  sample-menu-label assertions.
- Relevant journey or interaction check: hash deep-link probe
  `/concepts/cupla/menu/#cp-col-bowls` — at 1265 the page scrolls 31 px and the
  illustrative label stays fully in the fold; at 390 the page scrolls 809 px,
  putting the label 582 px above the viewport while the Babhlaí prices
  (£7.00 / £9.00 / £10.50) are on screen.
- Browser console: zero errors, zero warnings, zero failed requests on all six
  route × size combinations.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Verification 4 days old (2026-07-21) with a company number, a dated hygiene rating and a first-hand local confirmation. Both social accounts captured live and correct. The copy describes the café's own position without mocking the absence of a website. |
| Claims are honest | Pass | The earlier euro defect is gone: every price is sterling (£2.50–£10.50) and "Illustrative sample menu and sterling prices for design evaluation; confirm current items and prices on Instagram" renders above the first price at 1265 (label y 192, first price y 317) and at 390 (label y 227, first price y 402). The unknown item is an em dash, not an invented figure. Passed with two recorded weaknesses: "served in both of the town's languages" asserts a service the verification does not evidence (the record supports a bilingual *identity*, not Irish-language service), and neither route states "Co. Down" despite the explicit Dundrum/Dublin caveat — the sterling symbol now carries that distinction alone. |
| Real visitor loop | **Fail** | At 390×844 the concept home page contains no route to the menu. `.cp-nav { display: none }` (`concept-cupla.css:277`) hides "An biachlár · Menu" with nothing replacing it. Measured: the seven rendered links on the phone home page are Instagram ×4, Facebook ×1, the brand mark to itself, and the Mourne Made claim link; `menuReachable: false`. The primary visitor job — see what they serve and what it costs — cannot be started on the device the verification record calls the design task ("Mobile-first café page"). The menu route is not gated or labelled; it is simply orphaned. |
| Subject proof | Pass | The hero is subject-specific, disclosed and faithful. Compared against the August 2024 reference: same three-bay white-render frontage with navy joinery, same fascia board reading CÚPLA with the Facebook and Instagram glyphs at either end, same two hanging baskets, same two window boxes, same door decal "CÚPLA COFFEE SHOP Est. 2024". No invented seating, people, products, food or amenities; nothing depicts a standard the café cannot deliver. Disclosed in an adjacent `figcaption` ("AI-generated visualisation… not documentary photography"), fully in the fold at 1265 (caption y 592–642). Unlike Enniskeen, the source does not declare the image fictional and it does document the real premises. Weakness recorded, not a failure: at 390 the caption falls 102 px below the fold (image y 626, caption y 946). |
| Responsive and keyboard usable | **Fail** | No horizontal overflow at either size on either route (`scrollWidth === clientWidth`, zero elements past the viewport edge), and keyboard activation works at 1265. But the gate also forbids *hidden essential content*, and the menu link is `display:none` at 390 — removed from the render tree, the accessibility tree and the tab order. Second defect: the focus indicator measures 1.66:1 against the oat header and 1.66:1 against the caramel "See today's counter" button, below 3:1, so focus is effectively invisible on the header and on the primary action. |
| Readable and motion-safe | **Fail** | Reduced motion and image alternatives pass; contrast and language markup do not. Measured from computed styles on the oat ground `#f7f8f6`: menu prices `#a56a24` 14px/600 = **4.21:1**; item descriptors `#6b7a70` 12px = **4.25:1**; the English gloss beside each Irish item name (`#7a8a7f` 12px — "Flat White", "Scone", "Granola") = **3.42:1**; column English labels `#a56a24` 11px/700 = **4.21:1**; brand sub-lockup "BREWS · BAKES · BOWLS" = **4.21:1**; home rail English labels `#7d8a80` 12px/700 = **3.39:1**; menu address `rgba(245,238,225,.6)` on petrol = **4.00:1**. All are body text and all fail 4.5:1 — the English half of a bilingual menu is the least readable text on the page. Separately, language markup is inverted: `/concepts/cupla/menu/` declares `<html lang="ga-IE">` while the great majority of its text is English, so a screen reader announces "Illustrative sample menu and sterling prices for design evaluation", "Butter, jam and cream", "Ask at the counter" and the whole Mourne Made disclosure banner in an Irish voice; only two elements carry `lang="ga"`. Conversely `/concepts/cupla/` is `lang="en-GB"` with every Irish string — "Fáilte isteach", "Caife · Bácús · Babhlaí", "ar an bpríomhshráid", "Maidin", "Lón", "Le tabhairt leat", "Ar oscailt", "An biachlár", "Ár scéal", "Aimsigh muid" — carrying no `lang` attribute at all. |

Review disposition: Revise

Evidence still needed to judge the design: none. Every gate was decided from
direct measurement at both required sizes.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Pass, with a flagged question | The published asset is studio-generated and documented at `ATTRIBUTION.md:13`; the third-party Google Maps reference photo is held privately and never published. Unresolved and worth recording before any external use: ATTRIBUTION states the reference but records no rights position for generating a close derivative of a specific copyrighted user photograph. |
| Truth check current within 90 days | Pass | Verified 2026-07-21, 4 days old. Trading status, address, both social handles and the twin-owner 2024 founding all still match. |
| Independent-concept safeguards and honest public disclosure | Pass | `ConceptLayout` emits `noindex, nofollow`; the fixed banner reads "Independent concept by Mourne Made. Not the live Cúpla website"; the claim action carries correct parameters. No case-study link renders, correctly, because no transformation is public. |
| Repository and journey checks | Pass | `pnpm build` exit 0 with the release check first; `pnpm test:reviewed-concepts` 7/7; both Cúpla routes pass the 72-case concept audit at both viewports. (The one audit failure in this run is Castle Farm, not Cúpla.) |

## Creator self-review

No creator self-score was filed for this re-review; the repair pass is recorded
in `CONCEPT_DESIGN_REVIEW.md` as an implementation record rather than a verdict.
The self-review table is therefore skipped.

## Independent review

First-glance order at desktop (1265×710): **first** the word "Cúpla" — 88 px
white Vollkorn on petrol, occupying the left 56 %; **second** the frontage
visualisation filling the right 44 %, with the real CÚPLA fascia legible at the
top of the frame; **third** the caramel "See today's counter" button. A fourth
thing arrives uninvited: two struck-through, half-opacity nav items sitting
beside the one live one in the header, which reads as page damage before it
reads as honesty.

First-glance order on phone (390×844): **first** "Cúpla" at 59 px; **second**
the caramel "See today's counter" button; **third** the "Fáilte isteach. *Come
on in.*" line. The subject proof is fourth and partial — the visualisation does
not begin until y 626, so 218 px of an 844 px screen carries it, and its
disclosure caption is below the fold. The menu, which is the reason to build
this concept, is nowhere in the phone page at all.

Remove-nav test: passes at both sizes. Strip the header and the wordmark plus
the frontage image — a specific painted fascia reading CÚPLA over a navy-and-
white three-bay shopfront with window boxes — still identifies this business and
no other. The twin-ring mark reinforces it without needing a caption.

Swap-the-business test: the identity would break, the layout would not. Colour,
mark, type and the whole Irish/English pairing device derive from *cúpla* = twins
and from the real frontage; none of it transfers. But the page skeleton — strip,
header with right-hand pill, split hero, four-cell rail with three dead cells —
transfers to any Dundrum food business unchanged, which is exactly what Scopers
already is.

Closest-neighbour test: against **Scopers**, materially different are the
palette (petrol/caramel/oat vs Scopers' warm scheme), the display face
(Vollkorn vs Bricolage Grotesque), the twin-ring mark, the bilingual pairing
and — genuinely — the second asset: Cúpla ships a priced three-column menu card
where Scopers ships a supper-club page. Materially the *same* are the strip,
header, hero grid, story column and the four-cell rail with three
`data-concept-placeholder` cells and a fourth social "today's hours" cell.
Against **Tonn Ruray**, materially different are the proof (a real frontage
image vs a typographic hero) and the twin thesis; materially the same is the
"Irish-named Dundrum café with a bilingual sub-lockup" position, which the
portfolio now occupies twice.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 7.0 | 1.05 | Verification 4 days old with company number NI711705, dated hygiene rating and first-hand local confirmation; both external handoffs opened live and returned the correct Cúpla accounts; sterling throughout; sample menu labelled above the prices; image origin disclosed in an adjacent caption and recorded in ATTRIBUTION. | The claim discipline on the things that previously failed is now genuinely good: currency, label placement, an em dash instead of an invented price, and a disclosure caption that says what the image is *not*. | "Served in both of the town's languages" is an unsourced service claim sitting in the first viewport — the verification supports a bilingual *identity*, not Irish-language service — and the Irish itself is not reliable: "Babhla Gránáit" glossed as *Açaí* and "Babhla Sóra" glossed as *Savoury* are not Irish words, and the nav's "Aimsigh muid" takes a subject pronoun as an object (it should be *sinn*). For a concept whose entire thesis is bilingual credibility, invented vocabulary is a truth surface, not a detail. |
| Visitor outcome and concept thesis | 15% | 5.5 | 0.825 | At 1265: home → menu → Instagram completes in three steps with pointer and keyboard. At 390: `menuReachable: false` — seven rendered links, none to the menu. | The thesis is exactly right for the subject — a café with no website gains a priced menu and an honest hours handoff, and the prototype is disciplined about deferring what it cannot know. | On the device the record's own design task names ("Mobile-first café page"), the outcome is not merely harder, it is unavailable: every phone route terminates at Instagram or Facebook, which is the status quo the concept exists to improve. The page also never answers the second half of the job — no hours, no map, and "Aimsigh muid · Find us" struck through. |
| Subject identity and distinctiveness | 15% | 6.5 | 0.975 | Twin rings from *cúpla*; petrol/caramel/oat drawn off the navy-and-white frontage; Vollkorn; Irish-first, English-second labels in every component; frontage image carrying the real fascia. Remove-nav test passes at both sizes. | The identity is genuinely derived from the business rather than its category — the name generates the mark, the mark generates the pairing device, and the pairing device organises every list on both pages. | The composition is Scopers' with new words: identical strip / header / split hero / story column / four-cell rail with three inert cells and a social fourth. Tonn Ruray already holds the "Irish-named Dundrum café" lane, so the portfolio reads this as a repeated position rather than a new one. |
| First viewport and visual composition | 15% | 6.0 | 0.90 | Desktop: 56/44 split, one dominant visual plane, one primary action, disclosure caption in the fold at y 592–642. Phone: image enters at y 626, caption at y 946 (below fold), brand sub-lockup wraps to three lines beside the Follow pill. | At 1265 it is one legible composition with a clear hierarchy — name, proof, action — and the caption is placed where the visitor actually meets the image. | Two struck-through half-opacity nav links sit at hero scale in the header, and the bottom rail (y 642–711) is entirely covered by the fixed disclosure banner (y 638–694, x 43–1223) despite a CSS comment claiming the rail was right-aligned so the badge "never covers a cell". At 390 the composition front-loads 626 px of text before any proof of the café. |
| Complete loop and functional integrity | 15% | 5.0 | 0.75 | Keyboard: Tab 3 → Enter navigates home → menu (verified title change). Both external destinations 200 with correct titles. Empty state honest at three levels. But at 390 the menu is orphaned, and at 1265×710 the fixed banner permanently covers "Tae · Tea · £2.80" (row at y 591–643) and the entire caramel specials strip (y 662–710) — the page scrolls only 31 px, so scrolling does not clear them. | The honesty engineering is above the portfolio average: `data-concept-placeholder` strips `href`, sets `aria-disabled`, adds a title, removes the link from the tab order and marks it visibly; no fake search, filter, submit or invented live status appears anywhere. | The loop's single most important edge is broken — the primary route does not exist at 390 — and at the other required size a priced menu row and the recovery strip are unreadable under the banner. Five of the thirteen rendered links on the desktop home page are inert. |
| Responsive use and accessibility | 15% | 4.5 | 0.675 | Zero horizontal overflow and zero console errors at both sizes on both routes; menu columns stack cleanly at 390; reduced motion verified via emulated media (0.15s → 1e-05s, smooth → auto, zero running animations); alt text is specific and useful. Against that: menu link `display:none` at 390; seven text roles between 3.39:1 and 4.25:1; focus ring 1.66:1 on the oat header and on the caramel CTA; `lang="ga-IE"` on a majority-English page and no `lang` on any Irish string on the home page. | The responsive skeleton is sound — nothing overflows, nothing is clipped, the three-column menu reflows to one column without loss, and motion safety is complete rather than nominal. | Three separate access requirements fail at once, and each lands on the content the visitor came for: the prices, the English translations and the route to reach them. The `lang` inversion is the sharpest — a concept built on bilingualism ships the one markup affordance bilingual content requires either absent or backwards. |
| Craft and finish | 10% | 6.0 | 0.60 | Menu card typography measured and read at both sizes; console clean; responsive image sources resolve correctly (640 webp at both 390 and 557 CSS px). Dead code: `.cp-card`, `.cp-card-kicker`, `.cp-offer`, `.cp-offer-ga/-en`, `.cp-card-cta`, `.cp-card small` (~55 lines) render on no page; `@keyframes cp-rise` animates nothing; the `prefers-reduced-motion` block disables animations that do not exist. | The menu card is the best-made artefact here: italic Vollkorn Irish name, small-caps English gloss, prices right-aligned on a shared baseline, a caramel rule under each column head, hairlines between rows, and a caramel specials bar anchoring the foot. It reads as a printed menu, not a web list. | The surrounding finish is unresolved: five struck-through links, three of which occupy a 2×2 block that is most of the phone page below the image; a fixed banner that eats the rail on one route and a priced row on the other at exactly the size the CSS comment says the menu was built for; "BREWS · BAKES · BOWLS" broken to three lines at 390; and the phone rail's "Today's hours →" dropping its arrow to a fourth line. |
| **Total** | **100%** |  | **5.78/10** | Six gates checked by direct measurement; three fail. | Faithful, disclosed, subject-specific proof of the real 105 Main Street frontage. | The menu is unreachable at 390 and unreadable at 4.21:1. |

## Verdict

Weighted score: 5.78/10

Calculation: (7.0 × .15) + (5.5 × .15) + (6.5 × .15) + (6.0 × .15) +
(5.0 × .15) + (4.5 × .15) + (6.0 × .10)
= 1.05 + 0.825 + 0.975 + 0.90 + 0.75 + 0.675 + 0.60 = **5.775 → 5.78**

Core category floors at 7.0 met: No — visitor outcome 5.5, complete loop 5.0,
responsive/accessibility 4.5 (evidence/truth 7.0 meets it).

Supporting category floors at 6.0 met: Yes — identity 6.5, first viewport 6.0,
craft 6.0.

All design gates pass: No — real visitor loop, responsive and keyboard usable,
and readable and motion-safe all fail.

All public release conditions pass: Yes (with a flagged rights question on the
generation reference).

Verdict: **Revise**

Required repairs in priority order:

1. **Restore the menu route at 390.** `.cp-nav { display: none }`
   (`concept-cupla.css:277`) removes the only link to `/concepts/cupla/menu/`
   from the phone home page. Acceptance check: at a true 390×844 viewport,
   `[...document.querySelectorAll("a[href]")].filter(a => a.offsetParent)`
   on `/concepts/cupla/` includes an href containing `/menu`, and that link is
   reachable by Tab with a visible focus ring. Add an assertion for it to
   `scripts/test-reviewed-concept-journeys.mjs`, because the 72-case audit
   passed this concept while the link was hidden.
2. **Raise every failing text role to 4.5:1.** Measured on `#f7f8f6`: prices and
   column labels `#a56a24` 4.21:1, item descriptors `#6b7a70` 4.25:1, the
   English gloss `#7a8a7f` 3.42:1, home rail labels `#7d8a80` 3.39:1, brand
   sub-lockup 4.21:1; and `.cp-menu-address` `rgba(245,238,225,.6)` on petrol
   4.00:1. Acceptance check: computed-style contrast ≥ 4.5:1 for all of these
   at both sizes, and ≥ 3:1 for the focus outline against the oat header and the
   caramel CTA (currently 1.66:1 for both).
3. **Fix the language markup.** Set `/concepts/cupla/menu/` back to `en-GB` and
   mark the Irish strings with `lang="ga"` (column heads, item names,
   `.cp-menu-specials-ga`); mark the Irish strings on `/concepts/cupla/` the
   same way (`.cp-kicker`, `.cp-thesis` opening, `.cp-strip em`, every
   `.cp-rail-ga`, and the Irish half of each nav label). Acceptance check: no
   English text sits under a `ga` ancestor and no Irish text sits under an
   `en-GB` ancestor without its own `lang`.
4. **Stop the fixed disclosure banner covering content.** At 1265×710 it hides
   the home rail entirely and, on the menu, "Tae · Tea · £2.80" and the whole
   specials strip; the page scrolls only 31 px so scrolling does not clear them.
   Acceptance check: at 1265×710, no `.cp-menu-item`, `.cp-menu-specials` or
   `.cp-rail-cell` rectangle intersects `.mm-concept-banner` at any scroll
   position.
5. **Source or soften the bilingual claims.** Replace "served in both of the
   town's languages" with something the verification record supports (a bilingual
   identity, not Irish-language service); correct or remove "Babhla Gránáit"
   (*Açaí*), "Babhla Sóra" (*Savoury*) and "Aimsigh muid" (should be *Aimsigh
   sinn*); and state "Co. Down" on at least one route, since the verification's
   explicit Dundrum/Dublin caveat is currently carried by the £ sign alone.
6. **Reduce the placeholder load in the composition.** Five struck-through links
   — two in the desktop header at hero scale, three filling most of the phone
   page below the image — make an honest limitation look like a broken page.
   Either cut the dead cells or give the rail real destinations. While there,
   delete `.cp-card*` / `.cp-offer*` (~55 unused lines) and the unused
   `@keyframes cp-rise`.

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
Checks repeated: first-glance at 1265×710 and 390×844 on both routes; full
pointer and keyboard walkthrough of the primary loop; failure/deferral trigger
and recovery; currency, label-placement and hash-deep-link probe; computed-style
contrast on 31 selectors; reduced-motion emulation; `lang` and image-alternative
audit; horizontal-overflow and console capture on six route × size combinations;
external destination resolution; remove-nav, swap-the-business and
closest-neighbour tests; `pnpm build`, `pnpm test:concepts`,
`pnpm test:reviewed-concepts`.

Earlier defect disposition (read only after the scores above were fixed):

- **Claims — resolved.** The first round's deciding defect was a euro-priced
  menu for a sterling café, unlabelled and unsourced. Prices are now sterling
  and the "Illustrative sample menu and sterling prices" label renders above the
  first price at both sizes on direct load. One residual risk recorded, not
  scored as a gate failure: a hand-built hash URL using the columns'
  `aria-labelledby` ids (`/concepts/cupla/menu/#cp-col-bowls`) scrolls 809 px at
  390 and puts that label 582 px above the viewport while prices are on screen —
  the Buck's Head pattern, but not reachable from any link the prototype ships.
  Two new claim weaknesses surfaced that the first round did not name: the
  unsourced "served in both of the town's languages" and the invented Irish
  vocabulary.
- **Subject proof — resolved.** The first round failed on "no café imagery". The
  hero now passes the 24 July amendment on all three conditions, and passes it
  where Enniskeen failed: Enniskeen's own source declared its visualisations
  fictional, whereas this one is a close, verifiable re-rendering of a specific
  August 2024 photograph of 105 Main Street, matching it fascia, glyphs,
  joinery, baskets, window boxes and door decal, with the origin disclosed
  adjacent to the image. Residual weakness: the disclosure caption is 102 px
  below the fold at 390.
- **Not previously found, now failing.** Three gates the first round passed or
  did not reach now fail on measurement: the real visitor loop (menu orphaned at
  390), responsive/keyboard (hidden essential content; 1.66:1 focus ring), and
  readable/motion-safe (seven text roles below 4.5:1; inverted `lang`). The
  first two are not regressions introduced by the repair — `git show` confirms
  `.cp-nav { display: none }` has been present in `concept-cupla.css` since the
  original Cúpla commit (`64ffc8a`); the first round simply did not measure it.
  The repair pass therefore fixed both defects it targeted and the concept still
  moved down, from 6.43 to 5.78, because the newly measured defects are heavier
  than the ones removed.

Final score: 5.78/10  
Final verdict: **Revise**

If the final verdict is Revise:

Retired from public queue: 2026-07-25 — remains **Concept in progress**, stays
off the public transformation list, and has now consumed no repair cycle beyond
the shared 24 July pass.  
Condition required to reopen: a phone-reachable menu route, contrast at 4.5:1
across the menu body and rail, correct `lang` markup on both routes, and a
composition that survives the fixed disclosure banner at 1265×710 — then a
re-review of visitor outcome, complete loop, responsive/accessibility, first
viewport and craft. Evidence and subject identity need no further work.

## Truth refresh

Date: 2026-07-25  
Trading status: Open — unchanged. CUPLA BAI'S LTD (NI711705) active; hygiene
rating "Good" (17 January 2025); first-hand local confirmation 21 July 2026.  
Current public presence: unchanged — social only. Instagram
`@cuplabrewbar` live (title "Cúpla (@cuplabrewbar) • Instagram photos and
videos"); Facebook page live (title "Cúpla | Dundrum"). No website found.  
Primary external handoff: `https://www.instagram.com/cuplabrewbar/` — HTTP 200,
correct account, no redirect.  
Material claims: unchanged in the record. Two claims on the page are not backed
by it — Irish-language *service* and the specific Irish menu vocabulary.  
Asset permission: the published visualisation is studio-generated and
documented; the rights position for the Google Maps reference photograph used
to generate it is not recorded and should be before any external use.  
Material change found: No  
Affected categories to re-review: none on truth grounds.  
Public status: Keep as internal concept — not public, and not eligible while
three design gates fail.

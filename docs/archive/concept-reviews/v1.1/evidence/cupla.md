# Archived concept review — Cúpla, Dundrum — 25 July 2026

Status: Revise

Concept: `/concepts/cupla/`  
Reviewed commit: `efadf8a`  
Reviewed source fingerprint: `sha256:a467049ba2b967cdcef8fe14ece0e830b5dc5002f969eea0a2e3a738707baddd`
(verified this session with `node tools/check-concept-reviews.mjs --fingerprint cupla`)  
Creator: repair pass of 25 July 2026 (owner-reopened, against the second-round findings)  
Independent reviewer: non-creator reviewer agent, third v1.1 round — did not create or
repair this concept

## Candidate

Visitor job: See what Cúpla serves and roughly what it costs, then find out what is
actually on today.

Current presence and verification: `research/pipeline/verifications.json` → "Cupla", verified
2026-07-21. CUPLA BAI'S LTD (NI711705) active at Companies House; food hygiene rating
"Good", 17 January 2025; confirmation statement overdue at the time of checking but
active trading confirmed by first-hand local report on 21 July 2026. No website;
social-only presence (`instagram.com/cuplabrewbar`,
`facebook.com/p/Cúpla-61565293502528`). Café "Brews, Bakes & Bowls" founded 2024 by
twin owners, 105 Main Street, Dundrum, Co. Down, BT33 0LX. Explicit caveat:
distinguish from Cupla Coffee (Utah, USA) and from Dundrum in Dublin.

Truth checked at: 2026-07-21 (4 days old at review; next refresh due 2026-10-19).

Primary loop: `/concepts/cupla/` → "An biachlár · Menu" → `/concepts/cupla/menu/`
(sterling sample menu under a visible illustrative label) → "@cuplabrewbar →" handoff
to Instagram for today's specials and hours.

Review boundary:

- Start screen/state: `/concepts/cupla/`, first viewport, at 1265×710 and 390×844.
- Successful end screen/state: `/concepts/cupla/menu/`, three sterling-priced columns
  beneath the illustrative-menu label, then the caramel specials strip handing off to
  `instagram.com/cuplabrewbar`.
- Important failure state: `/concepts/cupla/menu/` — the visitor wants what the
  prototype cannot hold (today's actual availability, current prices, opening hours).
  Trigger: reading "Babhla an Lae · Bowl of the day · Ask at the counter" and looking
  for a price.
- Recovery: deferral is explicit at four points and honest at all of them — the unknown
  price renders an em dash `—` rather than an invented figure; the head note reads
  "Illustrative sample menu and sterling prices for design evaluation; confirm current
  items and prices on Instagram"; the head bar carries "Speisialtachtaí inniu ar
  Instagram · Today's specials on @cuplabrewbar"; the foot strip repeats it with a live
  `@cuplabrewbar →` link. The top strip on both routes reads "Today's hours on
  Instagram". Verified live: Instagram HTTP 200, final URL unchanged; Facebook HTTP
  200, final URL unchanged.

Exposed routes and actions outside the loop:

- `/concepts/cupla/` → works (brand mark on both routes; "Fáilte · Home" on the menu).
- `/concepts/cupla/menu/` → works, and is now reachable at **both** sizes (see gates).
- "Follow @cuplabrewbar", "See today's counter", "Today's hours on Instagram",
  "Ar oscailt · Today's hours →", "@cuplabrewbar" (×2) → all
  `https://www.instagram.com/cuplabrewbar/`, HTTP 200, correct account.
- "Find us on Facebook →" → `https://www.facebook.com/p/C%C3%BApla-61565293502528/`,
  HTTP 200, the Co. Down account — not the Utah or Dublin businesses the verification
  warns about.
- "Is this your business? Claim this concept →" →
  `/request/?business=C%C3%BApla&town=Dundrum&source=concept`, HTTP 200, parameters
  correct.
- No case-study link renders, which is the correct state while no transformation is
  public.

Declared placeholders, stubs and limitations:

- Five inert links, all correctly marked `data-concept-placeholder`. The layout script
  strips `href`, sets `aria-disabled="true"` and a title, and adds
  `.concept-link-inert`; none appears in the tab order (measured: 8 tab stops per route,
  none of them a placeholder).
  - Header: "Ár scéal · Our story", "Aimsigh sinn · Find us".
  - Home rail: "Maidin · Morning", "Lón · Lunch", "Le tabhairt leat · Takeaway".
- Menu content: labelled "Illustrative sample menu and sterling prices for design
  evaluation" in the petrol head bar, above every price at both sizes on direct load.
- Hero image: `figcaption` reads "AI-generated visualisation, faithfully based on
  Cúpla's August 2024 premises image. It is not documentary photography." Alt text
  opens "Faithful visualisation of Cúpla's…".
- Not offered anywhere: opening hours, a map, allergens, ordering. Hours are deferred to
  Instagram in the top strip on both routes.

Closest portfolio neighbours:

- **Scopers** (`src/pages/concepts/scopers.astro`) — the same Dundrum Main Street food
  category and the same chassis: `-strip` / `-header` (brand lockup + nav + right-hand
  pill CTA) / `-hero` two-column grid / `-story` (kicker, h1, lede, two actions) /
  `-panel` / bottom four-cell `-rail` in which exactly three cells are
  `data-concept-placeholder` and the fourth links to social with a "today's hours"
  label.
- **Tonn Ruray Café** (`src/pages/concepts/tonn-ruray.astro`) — the other Dundrum Main
  Street café with an Irish-language name and a bilingual brand sub-lockup. The
  Irish/English pairing is not a unique portfolio position.

## Evidence bundle

All measurements below were taken by this reviewer from the running preview, with
`defaultViewport: null` and a CDP `Emulation.setDeviceMetricsOverride`;
`document.documentElement.clientWidth` was asserted equal to 1265 or 390 before any
reading was trusted. Scripts: `.tmp/rr-cp-lib.mjs`, `rr-cp-shots.mjs`, `rr-cp-probe.mjs`,
`rr-cp-hit.mjs`, `rr-cp-kbd.mjs`, `rr-cp-focus.mjs`, `rr-cp-hash.mjs`, `rr-cp-enter.mjs`.

- Current capture: `research/pipeline/verifications.json` → "Cupla" (no live site exists; the
  business is social-only, which is the concept's premise).
- Desktop after, 1265×710: `.tmp/rr-cp-out/home__desktop-fold.png`,
  `.tmp/rr-cp-out/menu__desktop-fold.png`.
- Phone first screen, 390×844: `.tmp/rr-cp-out/home__phone-fold.png`,
  `.tmp/rr-cp-out/menu__phone-fold.png`.
- Primary-loop walkthrough: `.tmp/rr-cp-enter.mjs` output — Tab ×3 → Enter on
  `/concepts/cupla/` navigates to `/concepts/cupla/menu/` (title "Biachlár · Menu —
  Cúpla, Dundrum") at **both** 1265×710 and 390×844; Tab ×3 → Enter on the menu returns
  to `/concepts/cupla/`. Full rendered-link inventory per size in `.tmp/rr-cp-probe.mjs`
  output.
- Failure and recovery evidence: menu captures showing the em-dash price, the head
  note and the specials strip; hash probe in `.tmp/rr-cp-hash.mjs` output.
- Sources, asset credits and limitations: `research/pipeline/verifications.json` → "Cupla";
  `public/media/place/ATTRIBUTION.md:13`.
- Asset source and public-use rights status: `cupla-faithful-visualisation.jpg` is
  studio-generated from an August 2024 Google Maps user photo of the real frontage, held
  privately at `.tmp/concept-subject-references/cupla-exterior-google-2024.jpg` and never
  published. ATTRIBUTION records the reference and the generation boundary ("the prompt
  forbade invented seating, people, products or amenities") but records no rights
  position for generating a close derivative of that specific third-party photograph.
- External destination and accepted parameters: Instagram 200, no redirect; Facebook
  200, no redirect; claim link 200 with `business=Cúpla&town=Dundrum&source=concept`.
- Keyboard check: 8 tab stops per route at both sizes; no placeholder in the tab order;
  loop completes in both directions. **Focus-indicator contrast measured against the
  surface the ring is actually drawn on** (`outline-offset: 3px`, so the parent's
  painted background): 1.14:1 for the top-strip "Instagram" link on
  `--petrol-deep`, 1.54:1 for "See today's counter" and "Find us on Facebook" on
  `--petrol`, 1.23:1 for the studio claim link on the banner navy. Oat surfaces measure
  13.4:1.
- Contrast check: computed from live styles with alpha blending against the effective
  painted background, every text-bearing element on both routes at both sizes:
  **0 failures** (4 route × size combinations). The 25 July `--caramel-ink` /
  `--sage-ink` work landed.
- Reduced-motion check: PASS. Under emulated `prefers-reduced-motion: reduce`,
  `document.getAnimations().length === 0`, `scroll-behavior` resolves to `auto`, and
  `.cp-cta` transition duration collapses to `1e-05s`.
- `pnpm build`: not re-run this session — another process owns the build, and the brief
  forbade starting one. The implementation record for this fingerprint states build,
  the 72-case audit and 14 journeys pass; the fingerprint itself was verified here.
- `pnpm test:concepts`: as above — not re-run. Independent overflow/console evidence was
  gathered instead: `scrollWidth === clientWidth` and zero console errors, warnings and
  failed requests on all four route × size combinations.
- `pnpm test:reviewed-concepts`: not re-run. Note for the next repair: the new
  "generated-image disclosure inside the phone fold" assertion passes on this source
  while the disclosure is in fact 100% covered by the fixed banner (below), so the
  assertion needs an `elementFromPoint` check, not a rect test.
- Relevant journey or interaction check: hash probe `/concepts/cupla/menu/#cp-col-bowls`
  — at 1265 the page scrolls 115 px and the illustrative label stays in view (top 77);
  at 390 it scrolls 906 px, putting the label 563 px above the viewport with 9 prices on
  screen. No link the prototype ships produces that hash.
- Browser console: zero errors, zero warnings, zero failed requests on all four
  route × size combinations.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Verification 4 days old (2026-07-21) with company number NI711705, a dated hygiene rating and a first-hand local confirmation. Both social accounts resolved live and correct. The copy states the café's position — twin owners, 2024, specialty coffee and bowls — without mocking the absence of a website, and frames the bilingual treatment as the concept's own proposal rather than a description of the business. |
| Claims are honest | Pass | Every price is sterling (£2.50–£10.50). "Illustrative sample menu and sterling prices for design evaluation; confirm current items and prices on Instagram" renders above the first price at 1265 (label top 192, first price 317) and at 390 (label 343, first price 518). The unknown item is an em dash, not an invented figure. The previously unsourced service claim is gone: the lede now reads "The bilingual treatment below is this concept's proposal, drawn from the café's own Irish-language name and branding." "Co. Down" now appears on both routes, disambiguating Dundrum, Dublin, alongside sterling. Recorded weaknesses, not failures: a hand-built hash built from an internal `aria-labelledby` id bypasses the label at 390 (no shipped link produces it — materially unlike Buck's Head, whose four *named landing links* carried their hashes); "Babhla Blasta" is glossed "Savoury bowl" where *blasta* means tasty; and the visualisation extends past its reference frame, inventing a neighbouring house and a roadside planter, though no premises feature. |
| Real visitor loop | Pass | The second round's deciding defect is closed. At a true 390×844 the home page renders 13 links including "An biachlár · Menu" at document y 193; it is tab stop 3, and Tab ×3 → Enter navigates to the menu (title change verified) at both sizes, with a return path from the menu. Empty state honest at four points; both external destinations 200 and correct; claim parameters correct; five placeholders inert, out of the tab order and visibly marked. Weakness: at intermediate scroll positions the fixed banner covers live controls — the "Ar oscailt · Today's hours →" rail link at 390/scroll 128 and the specials `@cuplabrewbar →` at 1265/scroll 58 (`elementFromPoint` returns `mm-concept-claim`). Both clear at maximum scroll, so nothing is permanently trapped. |
| Subject proof | Pass | Compared feature by feature against the private August 2024 reference: same three-bay white-render frontage with navy joinery and keystone details, same fascia board reading CÚPLA with the Facebook glyph left and Instagram glyph right, same two hanging baskets on wrought brackets, same two window boxes, same door decal "CÚPLA COFFEE SHOP Est. 2024", same navy panelled door. No invented seating, people, products, food or amenities; nothing depicts a standard the café cannot deliver. Origin disclosed in the adjacent `figcaption` and in the alt text, and recorded in ATTRIBUTION. Serious weakness scored elsewhere: at 390 the disclosure caption occupies 776–820 and the fixed banner 764–834, so `elementFromPoint` at the caption's centre returns `mm-concept-claim` — the phone first viewport shows a photorealistic frontage with no visible generated-origin notice until the visitor scrolls ~60 px. The image also loses its CÚPLA fascia lettering to the 172 px centre crop at 390. |
| Responsive and keyboard usable | **Fail** | No horizontal overflow at either size on either route (`scrollWidth === clientWidth`, zero elements past the viewport edge), no console errors, the menu reflows three columns to one cleanly, and the loop completes by keyboard at both sizes. But the gate requires visible focus on navigation, controls, **disclosure and the primary action**, and the ring is drawn 3 px outside each element onto the parent surface: `--concept-focus: #0d2f33` measures **1.14:1** on the `--petrol-deep` strip (tab stop 1 of both routes — the "Today's hours on Instagram" link that carries the concept's honest hours deferral), **1.54:1** on `--petrol` behind the primary "See today's counter" action and "Find us on Facebook →", and **1.23:1** behind the studio's own claim link, because `body.concept-page :focus-visible` (0-2-1) out-ranks `.mm-concept-banner :focus-visible` (0-2-0) and the white ring never applies. Screenshots confirm the strip ring is not perceptible. Second defect under "hidden essential content": the AI-visualisation disclosure is fully occluded at 390 in the first viewport (above). The 25 July repair replaced one invisible ring (gorse at 1.66:1 on oat) with another that is invisible on the concept's dominant surface. |
| Readable and motion-safe | Pass | Contrast measured from computed styles with alpha blending on every text-bearing element across all four route × size combinations: **zero failures**, including the menu prices (`--caramel-ink`), the English gloss beside each Irish item name (`--sage-ink`), the home rail labels and the menu address. Reduced motion is complete rather than nominal: zero running animations, `scroll-behavior: auto`, transitions collapsed to 1e-05s. The single image carries specific, useful alt text. Weakness: the `lang` repair is half-done. Both routes are correctly `lang="en-GB"` and the home page marks all 10 Irish strings, but nine Irish strings on the menu carry no `lang="ga"` — "Caife Bán", "Caife Scagtha", "Tae", "Scóna", "Muffin an Lae", "Cáca Milis", "Tósta", "Gránóla" and the whole caramel specials heading "Speisialtachtaí an lae" — so a screen reader voices most of the Bácús and Caife columns, and the closing bar, in an English voice on a page whose thesis is bilingual. |

Review disposition: Revise

Evidence still needed to judge the design: none. Every gate was decided from direct
measurement at both required sizes. `pnpm build` / `test:concepts` /
`test:reviewed-concepts` were not re-run (another process owns the build); independent
overflow, console, contrast and hit-test evidence was gathered instead.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Pass, with a flagged question | The published asset is studio-generated and documented at `ATTRIBUTION.md:13`; the third-party Google Maps reference is held privately and never published. Still unrecorded, and worth resolving before any external use: the rights position for generating a close derivative of a specific copyrighted user photograph. |
| Truth check current within 90 days | Pass | Verified 2026-07-21, 4 days old. Trading status, address, both handles and the twin-owner 2024 founding all still match. |
| Independent-concept safeguards and honest public disclosure | Pass | Both routes emit `<meta name="robots" content="noindex, nofollow">`; the fixed banner reads "Independent concept by Mourne Made. Not the live Cúpla website."; the claim action resolves 200 with correct parameters. No case-study link renders, correctly. |
| Repository and journey checks | Pass | The reviewed fingerprint was recomputed here and matches `sha256:a467049…7baddd`. Build and audit results are carried from the implementation record for this fingerprint rather than re-run, per the brief; independent overflow and console evidence on four route × size combinations found zero defects. |

## Creator self-review

No creator self-score was filed for this round.

## Independent review

First-glance order at desktop (1265×710): **first** the word "Cúpla" — 90 px white
Vollkorn on petrol, owning the left 56%; **second** the frontage visualisation filling
the right 44% with the real CÚPLA fascia legible across the top; **third** the caramel
"See today's counter" button. Fourth and uninvited: two struck-through, half-opacity nav
items beside the one live one, which reads as page damage before it reads as honesty.

First-glance order on phone (390×844): **first** "Cúpla" at 42 px; **second** the caramel
"See today's counter"; **third** the "Fáilte isteach. *Come on in.*" line. The subject
proof is fifth and partial — the image does not start until y 648, gets 116 visible px
before the fixed banner, loses the fascia lettering to the centre crop, and its
generated-origin caption is painted over entirely. The menu link, correctly, is now
present at y 193.

Remove-nav test: passes at both sizes. Strip the header and the wordmark plus the
frontage — a specific painted fascia reading CÚPLA over a navy-and-white three-bay
shopfront with window boxes — still identifies this business and no other. The twin-ring
mark reinforces it without a caption.

Swap-the-business test: the identity would break, the layout would not. Colour, mark,
type and the whole Irish/English pairing derive from *cúpla* = twins and from the real
frontage; none transfers. The skeleton — strip, header with right-hand pill, split hero,
four-cell rail with three dead cells — transfers to any Dundrum food business unchanged,
which is exactly what Scopers already is.

Closest-neighbour test: against **Scopers**, materially different are the palette
(petrol/caramel/oat), the display face (Vollkorn vs Bricolage Grotesque), the twin-ring
mark, the bilingual pairing and the second asset — a priced three-column menu card
against a supper-club page. Materially the same are the strip, header, hero grid, story
column and the four-cell rail with three `data-concept-placeholder` cells and a social
fourth. Against **Tonn Ruray**, materially different are the proof (a real frontage
image against a typographic hero) and the twin thesis; materially the same is the
"Irish-named Dundrum café with a bilingual sub-lockup" position, which the portfolio now
occupies twice.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 7.5 | 1.125 | Verification 4 days old with NI711705, a dated hygiene rating and first-hand confirmation; both handoffs resolved live to the correct Co. Down accounts; sterling throughout; illustrative label above the first price at both sizes on direct load; "Co. Down" on both routes; the bilingual treatment explicitly framed as the concept's proposal; the invented Irish of the last round corrected (*Gránóla* for the non-word *Gránáit*, *Aimsigh sinn* for the ungrammatical *Aimsigh muid*); generation boundary recorded in ATTRIBUTION. | The concept now says exactly what it is: a proposal built on the café's own Irish name, priced illustratively in the right currency, with every unknown deferred to the account the business actually uses. Correcting its own Irish is the mark of a concept treating language as a truth surface. | Three residual truth edges. A hand-built `#cp-col-bowls` URL at 390 puts nine prices on screen with the illustrative label 563 px above the fold — unreachable from any shipped link, but the Buck's Head pattern. "Babhla Blasta" is glossed "Savoury bowl" where *blasta* means tasty (Irish for savoury would be *goirt*), so the menu still carries one loose gloss. And ATTRIBUTION records no rights position for generating a close derivative of a specific third-party photograph. |
| Visitor outcome and concept thesis | 15% | 7.0 | 1.05 | Home → menu → Instagram completes in three steps by pointer and by keyboard at 1265×710 **and** 390×844 (Tab ×3 → Enter, title change verified, return path works). The thesis — a social-only café gains a priced, bilingual menu and an honest hours handoff — is legible in the first screen at both sizes. | The outcome is now genuinely delivered on the device the verification record names as the design task ("Mobile-first café page"); a visitor who arrives on a phone can read the whole offer with prices, which no current Cúpla surface allows. | Only the first half of the visitor job is served. There is still no answer to *when* or *where*: no hours, no map, and "Aimsigh sinn · Find us" struck through in the header — every time-and-place question is routed back to Instagram, which is the status quo the concept exists to improve on. |
| Subject identity and distinctiveness | 15% | 6.5 | 0.975 | Twin rings from *cúpla*; petrol/caramel/oat drawn off the navy-and-white frontage; Vollkorn; Irish-first, English-second in every component; the real fascia carried in the hero. Remove-nav passes at both sizes. | The identity is derived from the business rather than its category: the name generates the mark, the mark generates the pairing device, and the pairing device organises every list on both pages. | The composition is Scopers' with new words — identical strip / header / split hero / story column / four-cell rail with three inert cells and a social fourth — and Tonn Ruray already holds the "Irish-named Dundrum café" lane, so the portfolio reads this as a repeated position rather than a new one. |
| First viewport and visual composition | 15% | 6.0 | 0.90 | Desktop: 56/44 split, one dominant visual plane, one primary action, the disclosure caption fully in the fold (510–560) and — new this round — the rail (560–629) clearing the banner (638–694), confirmed by `elementFromPoint` at every scroll position. Phone: image enters at 648, caption 776–820 sits under the banner 764–834. | At 1265 it is one legible composition with a clean scan order — name, proof, action — and the repair genuinely bought the rail its space back from the fixed banner. | At 390 the composition front-loads 648 px of type before any proof of the café, gives the image 116 visible px, crops the CÚPLA fascia out of frame, and lets the studio's own banner paint over the generated-origin caption entirely. Two struck-through nav links also sit at hero scale in the desktop header. |
| Complete loop and functional integrity | 15% | 7.0 | 1.05 | Loop completes both directions, both sizes, pointer and keyboard; four-level honest deferral; em dash instead of an invented price; both destinations 200 with no redirect; claim parameters correct; five placeholders inert, out of the tab order, visibly marked; zero console errors. | The honesty engineering is above the portfolio average and is now matched by a working route: no fake search, filter, submit or invented live status appears anywhere, and the one thing the prototype cannot know renders as a dash rather than a number. | The fixed banner still eats live controls at intermediate scroll positions — the "Ar oscailt · Today's hours →" rail link at 390/scroll 128 and the specials `@cuplabrewbar →` at 1265/scroll 58 both return `mm-concept-claim` from `elementFromPoint`. Nothing is permanently trapped, but the recovery (keep scrolling) is undiscoverable. Five of thirteen home links remain inert. |
| Responsive use and accessibility | 15% | 6.0 | 0.90 | Zero horizontal overflow and zero console output on four route × size combinations; **zero computed contrast failures** anywhere; reduced motion complete; three-column menu reflows to one cleanly; menu reachable and keyboard-operable at 390. Against that: focus ring 1.14:1 / 1.54:1 / 1.23:1 on the surfaces it is actually painted on; the AI disclosure occluded at 390; nine Irish strings on the menu unmarked. | Contrast is the real win of this round — the concept's whole bilingual payload, the English gloss and the prices, now measures clean at both sizes where seven roles previously failed, and motion safety is verified rather than asserted. | Three access requirements still fail, and each lands on something load-bearing: the primary action and the hours link have no perceptible focus ring; the generated-origin disclosure is invisible on the phone first screen; and the `lang` fix stops halfway, leaving most of the menu's Irish item names voiced in English. |
| Craft and finish | 10% | 6.0 | 0.60 | Menu card read at both sizes; console clean; responsive image sources resolve (640 webp at 390). Dead code confirmed still present: `.cp-card`, `.cp-card-kicker`, `.cp-offer`, `.cp-offer-ga/-en`, `.cp-card-cta`, `.cp-card small` (~55 lines) render on no page; `@keyframes cp-rise` animates nothing; the `prefers-reduced-motion` block disables animations that do not exist. | The menu card remains the best-made artefact in this concept: italic Vollkorn Irish names, small-caps English glosses, prices on a shared right baseline, a caramel rule under each column head, hairlines between rows and a caramel specials bar anchoring the foot. It reads as a printed menu, not a web list. | The surrounding finish is unresolved: the Babhlaí column ends ~200 px short of its neighbours leaving a ragged foot at 1265; the phone menu nav wraps to two rows and the head stacks four small-text paragraphs before the first item; a dangling "·" separator ends a line in the phone head bar; five struck-through links; and ~60 lines of dead CSS the previous review already named. |
| **Total** | **100%** |  | **6.60/10** | Six gates checked by direct measurement; one fails. | Faithful, disclosed, subject-specific proof of the real 105 Main Street frontage — still the portfolio's only generated visualisation that earns the amendment. | No perceptible focus ring on the primary action or the first tab stop, and the AI disclosure painted over on the phone first screen. |

## Verdict

Weighted score: 6.60/10

Calculation: (7.5 × .15) + (7.0 × .15) + (6.5 × .15) + (6.0 × .15) + (7.0 × .15) +
(6.0 × .15) + (6.0 × .10)
= 1.125 + 1.05 + 0.975 + 0.90 + 1.05 + 0.90 + 0.60 = **6.60**

Core category floors at 7.0 met: No — responsive/accessibility 6.0. (Evidence 7.5,
outcome 7.0 and loop 7.0 all meet it.)

Supporting category floors at 6.0 met: Yes — identity 6.5, first viewport 6.0, craft 6.0.

All design gates pass: No — responsive and keyboard usable fails.

All public release conditions pass: Yes (with a flagged rights question on the
generation reference).

Verdict: **Revise**

Required repairs in priority order:

1. **Give the focus ring 3:1 against every surface it lands on.** `--concept-focus:
   #0d2f33` with `outline-offset: 3px` paints onto the parent, measuring 1.14:1 on
   `--petrol-deep` (tab stop 1 of both routes), 1.54:1 on `--petrol` behind the primary
   CTA and the Facebook link, and 1.23:1 behind the studio claim link. Acceptance check:
   for every tab stop on both routes at both sizes, the computed `outline-color`
   contrasts ≥ 3:1 with the parent's painted background — a two-tone ring (light outer,
   dark inner) is the usual fix for a page with both oat and petrol grounds. Separately,
   raise the banner's white-ring rule above `body.concept-page :focus-visible`, which
   currently out-ranks it (0-2-1 vs 0-2-0) on all twenty concepts.
2. **Get the generated-origin disclosure visible in the phone first viewport.** The
   caption occupies 776–820 at 390 and the fixed banner 764–834, so
   `document.elementFromPoint` at the caption's centre returns `mm-concept-claim`.
   Acceptance check: at 390×844, scroll 0, `elementFromPoint` at the centre of
   `.cp-panel figcaption` returns the caption or a descendant. The existing
   reviewed-concept assertion passes on this source and must change from a rect test to
   a hit test, or it will keep certifying an invisible disclosure.
3. **Finish the `lang` markup.** Nine Irish strings on `/concepts/cupla/menu/` carry no
   `lang="ga"`: "Caife Bán", "Caife Scagtha", "Tae", "Scóna", "Muffin an Lae", "Cáca
   Milis", "Tósta", "Gránóla" and `.cp-menu-specials-ga` "Speisialtachtaí an lae".
   Acceptance check: no Irish text sits under an `en-GB` ancestor without its own `lang`,
   and no English text under a `ga` ancestor, on either route.
4. **Stop the banner covering live controls at intermediate scroll positions.** At 390
   it covers the "Ar oscailt · Today's hours →" rail link at scroll 128; at 1265 it
   covers the specials `@cuplabrewbar →` at scroll 58 and the "Tae · Tea" row at scroll
   0. Acceptance check: `elementFromPoint` at the centre of every `.cp-rail-cell`,
   `.cp-menu-item` and `.cp-menu-specials-link` returns itself at *every* scroll
   position, not only at the extremes.
5. **Raise the phone first viewport's proof budget.** 648 px of type precede the image,
   which then gets 116 visible px and a centre crop that cuts the CÚPLA fascia
   lettering — the single most identifying feature in the frame. Acceptance check: at
   390×844 the visualisation begins above y 520 and the fascia lettering is inside the
   rendered crop.
6. **Close the residual truth edges.** Re-gloss "Babhla Blasta" (*blasta* = tasty, not
   savoury); make the illustrative label survive a hand-built column hash at 390 (a
   sticky head bar or a per-column label); and record a rights position in ATTRIBUTION
   for generating a close derivative of the third-party reference photo.
7. **Cut the dead weight.** `.cp-card*` / `.cp-offer*` (~55 lines), `@keyframes
   cp-rise`, and the `prefers-reduced-motion` block that disables animations which do
   not exist; and reduce the five struck-through placeholder links, which make an honest
   limitation look like page damage at hero scale.

## Appeal

Appeal requested: No  
Reason: —  
Appeal reviewer: —  
Appeal reviewer saw earlier scores before deciding: No  
Appeal score: —  
Appeal verdict replacing the original: —

## Re-review

Date: 2026-07-25 (third independent round)  
Commit: `efadf8a` — fingerprint
`sha256:a467049ba2b967cdcef8fe14ece0e830b5dc5002f969eea0a2e3a738707baddd`

Earlier verdicts on this concept, kept visible:

| Round | Date | Weighted | Verdict | Gates failed |
|---|---|---:|---|---|
| First v1.1 review | 24 July 2026 | 6.43 | Revise | claims, subject proof |
| Second (post shared repair), commit `8987095` | 25 July 2026 | 5.78 | Revise | real visitor loop, responsive/keyboard, readable/motion-safe |
| **Third (this record), commit `efadf8a`** | **25 July 2026** | **6.60** | **Revise** | **responsive/keyboard** |

The second round's deciding defects were: `.cp-nav { display: none }` at 390 hiding the
only link to the menu; menu body copy failing 4.5:1 throughout; and `lang="ga-IE"`
declared over a mostly English menu page.

Checks repeated: first-glance at 1265×710 and a true 390×844 on both routes; full
pointer and keyboard walkthrough of the primary loop in both directions at both sizes;
enumerated rendered links per size; failure/deferral trigger and recovery; currency and
label placement on direct load and via an in-page hash; computed-style contrast with
alpha blending on every text-bearing element across four route × size combinations;
focus-ring contrast against the surface the ring is painted on; `elementFromPoint`
hit-testing of every first-viewport control at three scroll positions per route × size;
reduced-motion emulation; `lang` and alt-text audit; horizontal-overflow and console
capture; external destination resolution; `noindex` and claim-parameter check;
fingerprint recomputation; remove-nav, swap-the-business and closest-neighbour tests.

Earlier defect disposition:

- **Real visitor loop — RESOLVED.** The nav is now a wrapped strip under the brand;
  "An biachlár · Menu" renders at y 193 at 390, is tab stop 3, and Enter navigates. Both
  routes expose a return path. Gate passes.
- **Readable and motion-safe — RESOLVED.** The seven text roles that measured 3.39:1 to
  4.25:1 are gone: `--caramel-ink` and `--sage-ink` bring every measured element clean,
  with **zero** contrast failures across all four route × size combinations. Reduced
  motion and alt text pass. Gate passes, with the half-finished menu `lang` markup
  recorded as the named weakness.
- **Responsive and keyboard usable — NOT RESOLVED.** The hidden-nav half is fixed; the
  focus half is not. The previous 1.66:1 gorse ring was replaced with a near-black
  petrol ring that measures 1.14:1 on the strip, 1.54:1 behind the primary action and
  1.23:1 behind the claim link — one invisible ring swapped for another. The gate also
  now fails on hidden essential content of a different kind: the AI disclosure occluded
  by the fixed banner at 390.
- **Claims — remains resolved** from the first round, and improved: the unsourced
  "served in both of the town's languages" is replaced by an explicit statement that the
  bilingual treatment is the concept's proposal; "Co. Down" is now on both routes; the
  invented Irish ("Babhla Gránáit" = *granite*) and the ungrammatical "Aimsigh muid" are
  corrected. One loose gloss and the hand-built hash bypass remain as weaknesses, not
  gate failures.
- **Subject proof — remains resolved.** Re-verified feature by feature against the
  August 2024 reference. This is still the only disclosed generated visualisation in the
  portfolio that earns the 24 July amendment where Enniskeen's fictional country house
  failed it. Its disclosure placement on the phone, however, has moved from "102 px
  below the fold" to "inside the fold but painted over" — the same experience for the
  visitor, scored here under the responsive gate.
- **Banner occlusion of the desktop rail — RESOLVED.** All four `.cp-rail-cell` controls
  previously returned the banner from `elementFromPoint` at 1265×710 with only 1 px of
  scroll available. The `--mm-banner-space` reservation works at desktop: the rail ends
  at 629 above the banner's 638, and hit-testing returns the cells themselves at every
  scroll position. The reservation does **not** apply at 390, where
  `.cp-hero { min-height: 0 }` opts out — which is why the phone occlusions survive.

Final score: 6.60/10  
Final verdict: **Revise**

If the final verdict is Revise:

Retired from public queue: remains **Concept in progress** and off the public
transformation list; both routes stay `noindex` internal.  
Condition required to reopen: this is the second repair cycle spent under the owner's
25 July explicit designation. The concept is now one gate and one core-category floor
from the standard, and both turn on the same short list — a focus ring that reads on
petrol, a disclosure the phone visitor can see, and the remaining nine `lang="ga"`
attributes. A third repair needs an explicit owner decision; the evidence, claims, loop
and subject-proof work behind it is sound and would carry forward.

## Truth refresh

Date: 2026-07-25  
Trading status: Open — unchanged. CUPLA BAI'S LTD (NI711705) active; hygiene rating
"Good" (17 January 2025); first-hand local confirmation 21 July 2026.  
Current public presence: unchanged — social only. Instagram `@cuplabrewbar` HTTP 200
with no redirect; Facebook page HTTP 200 with no redirect. No website found.  
Primary external handoff: `https://www.instagram.com/cuplabrewbar/` — HTTP 200, correct
account, no redirect.  
Material claims: unchanged in the record. The previously unsupported Irish-language
*service* claim has been removed from the page; the menu vocabulary is now accurate
Irish apart from one loose gloss.  
Asset permission: the published visualisation is studio-generated and documented; the
rights position for the Google Maps reference photograph used to generate it is still
unrecorded and should be settled before any external use.  
Material change found: No  
Affected categories to re-review: none on truth grounds.  
Public status: Keep as internal concept — not public, and not eligible while the
responsive/keyboard gate fails.

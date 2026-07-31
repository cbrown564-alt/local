# Archived concept review — Newcastle Chamber of Commerce — 25 July 2026

Status: Revise

Concept: `/concepts/newcastle-chamber/`  
Reviewed commit: `8987095`  
Reviewed source fingerprint: `sha256:8c734e5a8f325c9a6c081e1222a9aad65c5742a36bbb041ba650d78485877bfb`  
Creator: Codex root agent (repair pass)  
Independent reviewer: independent non-creator agent `newcastle_chamber_v11_rereview`

No creator self-review table appears below: no self-score was filed for this
candidate, so the "Creator self-review" section of the template is skipped.

## Candidate

Visitor job: Find a business in Newcastle, Co. Down by trade — type what you
need on the front page and land on a directory result that answers it.

Current presence and verification: `research/pipeline/verifications.json`, record
"Newcastle Chamber Of Commerce", `verifiedOn` 2026-07-22 (file `asOf`
2026-07-24). Trading status Open; no website; Gmail + Facebook + Instagram +
LinkedIn only.

Truth checked at: 2026-07-22 (3 days old at review; well inside the one-month
gate and the 90-day release window).

Primary loop: `/concepts/newcastle-chamber/` → type a trade into the hero search
→ GET to `/concepts/newcastle-chamber/members/?q=…` → filtered card set plus a
live `role="status"` count → join/contact handoff by `mailto:`.

Review boundary:

- Start screen/state: `/concepts/newcastle-chamber/`, first visit, no query.
- Successful end screen/state: `/members/?q=hotel` showing 3 of 17 cards, the
  other three category sections hidden, and the status line "3 illustrative
  listings for “hotel”."
- Important failure state: `/members/?q=no-such-trade` (and, notably,
  `?q=chemist` — the field's own placeholder example) → 0 cards, empty message.
- Recovery: the empty message names four working trades ("café, pharmacy, hotel
  or gifts"); there is no search field on the results page, so changing the
  query requires the browser back button.

Exposed routes and actions outside the loop:

- `/members/`, `/events/`, `/join/`, `/about/`, `/contact/` — all HTTP 200, all
  render, all internal links resolve.
- Category jump tabs on `/members/` (`#all`, `#hospitality`, `#food`, `#retail`,
  `#services`) — plain anchors. Work in the unfiltered state; **inert in the
  filtered state** (see loop defect below).
- Home trade rail → `/members/#<category>` — works, but see the claims defect.
- `mailto:newcastlechamber2023@gmail.com`, `tel:+442843724903`, Facebook,
  Instagram, LinkedIn — all match the verification record character for
  character; all open real destinations. No fake forms anywhere on the site.
- Shared shell: "Is this your business? Claim this concept →" →
  `/request/?business=Newcastle%20Chamber%20of%20Commerce&town=Newcastle&source=concept`
  (HTTP 200). No "See the case study" link is rendered, correctly, because no
  transformation record is published (`/transformations/newcastle-chamber/`
  404s and the slug sits in `transformationCandidates`, not `transformations`).

Declared placeholders, stubs and limitations:

- Home, first viewport, both sizes: "Directory names are illustrative examples,
  not a verified membership list."
- `/members/` head: "This illustrative list demonstrates the directory
  experience; it does not identify verified Chamber members."
- `/members/` shell banner note: "Member list is illustrative."
- `/events/` shell banner note: "Sample dates are illustrative." plus a per-row
  `SAMPLE DATE` badge on the two unconfirmed events (the confirmed Halloween row
  carries no badge and a real `datetime` attribute).
- No `href="#"` and no `data-concept-placeholder` links exist on this concept —
  every exposed control has a real destination.
- Not declared anywhere: that some directory entries name **real** Newcastle
  businesses and others are **invented**.

Closest portfolio neighbours:

- `hotel-enniskeen` — the structural sibling. Same hero grammar: rule-and-kicker,
  large serif display with a brass italic `em`, lede, two actions on a tinted
  left panel, full-bleed photograph in the right column, shared multi-page shell
  with a top strip and horizontal nav.
- `kelly-mcevoy-brown` — the other "filterable register of many named entries"
  concept, i.e. the same interaction thesis solved a different way.

## Evidence bundle

- Current capture: `public/media/concepts/newcastle-chamber/newcastle-chamber-before.jpg` — the Chamber's
  Facebook page behind a login wall, matching the verification note.
- Desktop after, 1265×710: `.tmp/nc-shots/home__desktop.png` (and the supplied
  `research/concepts/phase-q-rereview/evidence/newcastle-chamber__desktop-1265x710.png`).
- Phone first screen, 390×844: `.tmp/nc-shots/home__phone.png`.
- Note on the supplied bundle: the pre-captured `…__phone-390x844.png` and
  `…__desktop-1265x710.png` files are 800px-wide renders cropped to the target
  size, not true emulated viewports (visible text is clipped mid-word). All
  measurements in this record come from my own captures, taken with
  `page.setViewport({width, height, isMobile})`; a raw
  `Emulation.setDeviceMetricsOverride` on a `page.createCDPSession()` is
  re-applied away by puppeteer's own emulation manager on navigation and silently
  yields an 800px layout.
- Primary-loop walkthrough: `.tmp/nc-kbd.mjs` output — tab order, Enter
  submission, and query→result-set assertions for
  `bakery`, `hotel`, `café`, `chemist`, `Bookends`, `no-such-trade` and empty.
- Failure and recovery evidence: `.tmp/nc-shots/members-q-none__{desktop,phone}.png`,
  `.tmp/nc-tabs.mjs` output.
- Sources, asset credits and limitations: `research/pipeline/verifications.json`,
  `research/chamber-website-brief.md`, `public/media/place/ATTRIBUTION.md`.
- Asset source and public-use rights status: `/media/place/central-promenade.jpg`
  — The Central Promenade, Newcastle, Eric Jones, 26 February 2012, Geograph
  2843609, **CC BY-SA 2.0**. Credited in `ATTRIBUTION.md` and in an on-page
  `figcaption` ("Newcastle Central Promenade · Eric Jones, 2012 · CC BY-SA 2.0")
  that is rendered wherever the image is rendered. Licence permits publication
  with attribution and share-alike.
- External destination and accepted parameters: `?q=` round-trips correctly
  through the GET form; the value is read, lower-cased with `en-GB` locale
  (so `Café` matches `café`) and echoed in the status line. mailto/tel targets
  match verification exactly.
- Keyboard check: 16-stop tab sweep on the desktop home page — order is DOM
  order and matches visual order (strip socials → brand → six nav links → Join →
  search input → Search → Browse the directory → List your business → rail).
  Every stop shows a visible 3px solid `rgb(224,193,77)` outline; the search
  input instead shows a 2px inset `rgb(176,122,46)` ring. Enter in the search
  field submits and navigates. No keyboard trap, no positive tabindex.
- Contrast check: computed from live `getComputedStyle` with full alpha
  compositing of the background stack across all six routes (148 distinct
  pairs). **One failure**: `/contact/` `a.nc-cta` "Send an email" —
  `rgb(24,44,63)` on `rgb(24,44,63)`, **1.00:1**. Lowest passing value elsewhere
  is 4.53:1 (`.nc-prototype-note`, 12px). The two brass chips I first flagged
  (`.nc-badge` "Sample date", `.nc-benefit-num`) pass at 4.62:1 and 4.67:1 once
  their 15%-alpha backgrounds are composited.
- Reduced-motion check: `Emulation.setEmulatedMedia prefers-reduced-motion:
  reduce` — `.nc-dir-head` animation removed; `.nc-dir-category` keeps
  `nc-dir-rise` but at `1e-05s`, i.e. effectively removed. The concept's own
  reduce rule is out-specified by its `:nth-child` selectors and only works
  because of a global `!important` safety net.
- `pnpm build`: **passed**, exit 0 — `check-concept-reviews.mjs` ("Concept
  release check passed: 0 public transformations"), `astro check` 0 errors /
  0 warnings, 71 pages built.
- `pnpm test:concepts`: reported by the creator as 72/72 across 36 routes ×
  2 viewports; independently corroborated — I measured
  `documentElement.scrollWidth === clientWidth` on all six routes at both sizes.
- `pnpm test:reviewed-concepts`: **7/7 passed** (re-run by me).
- Relevant journey or interaction check: `?q=` genuinely changes the result set
  (17 → 3 → 1 → 0) and the `role="status"` region announces the count.
- Browser console: **clean**. Zero console errors, page errors or failed
  requests across 10 URL/viewport combinations.

## Design gates

| Gate | Pass/Fail | Evidence or defect |
|---|---|---|
| Current and respectful | Pass | Verification 2026-07-22, three days old. Address, phone, Gmail, Facebook, Instagram and LinkedIn all match it exactly. The before capture is the honest Facebook login wall, not a mocked-up strawman. The About copy says outright: "It is not a live Chamber website and does not claim committee approval." No officer names anywhere, respecting the record's caveat that officer names are unconfirmed snippet data. |
| Claims are honest | **Fail** | Tapping "Hospitality · 4 example listings" on the phone home page — a path the concept itself offers — lands at `/members/#hospitality`, `scrollY` 595, where the viewport holds "Slieve Donard Resort & Spa · Downs Road", "Enniskeen Country House Hotel · 98 Bryansford Road", "The Anchor Inn · Main Street" and "Shore View Guest House · Central Promenade" and **no illustrative label at all** (regex sweep of every visible text node for /illustrative\|example\|verified\|concept/ returned `[]`). The h1, the intro disclaimer and the shell banner are all out of view; on phone the banner is `position: static` at the foot of a 3656px document. `#food`, `#retail` and `#services` behave the same. Second defect: 16 of the 17 listings have no verification record — the list silently mixes real trading businesses (Royal County Down Golf Club, Mourne Heritage Trust, Newcastle Credit Union, Slieve Donard) with invented ones (Bookends Newcastle, Bay Café, The Corner Bakehouse, The Linen House, Sandy Brae Ice Cream), each given a street and a trade, and nothing tells the visitor which is which. The label disclaims *membership*; it does not label the locations, trades or existence. |
| Real visitor loop | **Fail** | The search itself is real. The tabs are not, once it runs. With `?q=hotel` active, clicking the tab labelled **"All"** — which permanently carries `nc-dir-tab--active` styling — leaves 3 of 17 cards visible and the status line unchanged: there is no way to clear a query from the results page. Clicking "Services & Leisure" in the same state does nothing at all (`#services` stays `hidden`) and scrolls to an arbitrary offset. This is on the recovery path from the concept's own empty state. Compounding it: the hero placeholder advertises "Café, **chemist**, guest house…" and `?q=chemist` returns **zero results**, and there is no search input on `/members/` to retry from. |
| Subject proof | **Fail** | The phone first viewport at 390×844 contains **no image whatsoever** — the `.nc-panel` figure's top edge measures y = 842.58 in an 844px viewport, so 1.4px of a 305px-tall photograph is technically on screen. The first screen is type, a search box and a button on flat mist. On desktop the photograph is real, specific and credited (Eric Jones, 2012, CC BY-SA 2.0, `figcaption` present at both sizes wherever the image renders) and the header seal is genuinely derived from the Chamber's own circular mountain logo visible in the before capture — but it is a 2012 photograph of the *town*, not of this organisation, which has no premises. It is place proof carrying the weight of subject proof, and on phone there is not even that. |
| Responsive and keyboard usable | **Fail** | `@media (max-width: 940px) { .nc-nav { display: none } }` with **no replacement** — no menu button, no footer navigation. Consequence, measured by enumerating every visible anchor on every route at 390×844: from the home page a phone visitor can reach only `/members/` and `/join/`; from `/members/` only `/join/` and home. `/events/`, `/about/` and `/contact/` are reachable from **nowhere** on the home page or the directory, and `/about/` is reachable from no page at all on a phone. That is hidden essential content, which the gate names explicitly. The category tab rail also overflows unannounced (scrollWidth 406 vs clientWidth 338), hiding "Services". Keyboard behaviour itself is good: logical order, visible focus on every stop, Enter submits. |
| Readable and motion-safe | **Fail** | `/contact/` — the page whose entire job is to get a message to the committee — renders its "Send an email" button as a **blank navy rectangle**. `.nc-contact-block a { color: var(--harbour) }` (specificity 0-1-1) out-ranks `.nc-cta { color: #fff }` (0-1-0), giving `rgb(24,44,63)` on `rgb(24,44,63)`, contrast **1.00:1**. Everything else passes (lowest 4.53:1), alt text is descriptive and specific, and reduced motion does remove the rise animation in practice. |

Review disposition: Revise

Evidence still needed to judge the design: none.

## Public release conditions

| Condition | Pass/Blocked | Evidence or unblock condition |
|---|---|---|
| Asset permission or publishable replacement | Pass | The single image is CC BY-SA 2.0 (Geograph 2843609, Eric Jones), attributed on the page and in `ATTRIBUTION.md`. Publishable as-is provided the share-alike credit stays wherever the image is displayed — it currently does. |
| Truth check current within 90 days | Pass | `verifiedOn` 2026-07-22, three days old. |
| Independent-concept safeguards and honest public disclosure | Blocked | `noindex, nofollow`, the shell disclosure and the claim action are all present, and the slug is correctly absent from `publicTransformationSlugs`. Blocked because the disclosure fails to reach the phone visitor at the point of the claim (see the claims gate) — the safeguard exists but does not do its job at 390px. |
| Repository and journey checks | Pass | `pnpm build` exit 0 (release check + `astro check` 0/0 + 71 pages); `pnpm test:reviewed-concepts` 7/7; fingerprint recomputed and matches the reviewed source. |

## Creator self-review

No creator self-score was filed for this candidate; the table is skipped.

## Independent review

First-glance order at desktop (1265×710): the four-line harbour-navy serif
"Newcastle Chamber *of Commerce*" filling the left half → the promenade
photograph filling the right half to the viewport edge → the white search field
with its navy Search button. Fourth, unavoidably, the dark disclosure bar
slicing across the bottom of the composition and cutting the "Browse the
directory" button in half.

First-glance order on phone (390×844): the same serif headline, now three lines
→ the brass "Find a business in town." → the search field. There is no third
subject element: the photograph starts at y 842.6, the trade rail at y ~1150,
and the header carries only the brand and a Join button. Subject evidence inside
the phone first viewport is limited to the words "Newcastle", "Co. Down" and
"under the Mournes", plus a 46px seal; every pixel of photographic proof is
below the fold.

Remove-nav test: passes on the name and little else. Cover the header and the h1
still reads "Newcastle Chamber of Commerce" with "Newcastle, Co. Down · 50A Main
Street · under the Mournes" above it — but that is the *name* doing the work,
not the identity. Strip the words and harbour navy, brass, Newsreader and a
hairline seal describe any civic institution in the British Isles.

Swap-the-business test: weak. Replace "Newcastle" with "Banbridge", swap the
promenade photograph for a Banbridge street, change "under the Mournes", and
nothing else in the concept breaks — the seal (a generic mountain silhouette at
46px), the palette, the strip, the four-cell trade rail, the category taxonomy,
the join benefits and the whole copy deck transfer intact. The one genuinely
untransferable asset, the fact that the seal is traced from *this* Chamber's own
Facebook logo, is invisible at rendered scale.

Closest-neighbour test:

- vs `hotel-enniskeen`: the hero is close to a reprint. Both open with a
  rule-and-kicker, a large serif display broken by a brass italic `em`, a lede,
  a primary button plus an arrow text link, all on a tinted left panel with a
  photograph filling the right column, inside the same multi-page shell.
  Materially different: the Chamber's thesis is a *search field* in the hero
  rather than an availability bar, and its directory is a second route rather
  than a booking handoff. Materially worse: Enniskeen's image runs edge to edge
  and carries an inline "PROVISIONAL VISUALISATION" badge on the image itself,
  where the Chamber's photograph is smaller, lower and carries its honesty note
  200px away in a different column.
- vs `kelly-mcevoy-brown`: the same "register of many named entries" idea, and
  KMB solves it better. KMB puts the register *in the first viewport* beside the
  headline, with its filters as real on-screen controls and a disclosure banner
  that names its imagery limitation inline. The Chamber puts a search box in the
  hero and the register a route away, with no search control on the register
  page at all. The Chamber's compensating difference is a genuinely working
  query→result-set→empty-state chain with a live count announcement, which KMB
  does not attempt.

| Category | Weight | Score /10 | Weighted | Evidence | Strongest quality | Clearest weakness |
|---|---:|---:|---:|---|---|---|
| Evidence, truthfulness and respect | 15% | 6.5 | 0.975 | Verification three days old; address, phone, Gmail and three social URLs match it exactly; Halloween correctly dated *and* correctly weekday-checked (31 Oct 2026 is a Saturday); no officer names, no invented fee, honest before capture. | It gets the Chamber's *own* facts completely right and refuses the two easiest inventions — officers and a membership price. | It publishes seventeen third-party businesses' trades and street locations with only one of them (Enniskeen) present in `verifications.json`, and mixes real traders with fabricated ones under a single label. |
| Visitor outcome and concept thesis | 15% | 6.5 | 0.975 | "Find a business in town." is printed on the page; the search genuinely filters 17 → 3 for `hotel`, → 1 for `bakery`, → 0 for `no-such-trade`, with a `role="status"` count. Before state is a Facebook login wall. | The thesis is stated in five words and the mechanism behind it is real, not decorative. | The concept's own advertised example query, "chemist", returns zero results — the shipped placeholder text names a trade the directory cannot answer. |
| Subject identity and distinctiveness | 15% | 6.0 | 0.900 | Harbour navy + civic brass + Newsreader; seal traced from the Chamber's real circular mountain logo; "50A Main Street", "under the Mournes", Co. Down strip. | The seal is honest identity archaeology — it comes from the subject's only existing brand asset. | The swap-the-business test costs one town name and one photograph; and the focus ring is gorse yellow `rgb(224,193,77)`, the Mourne Made studio colour that `docs/DESIGN.md` says must never appear inside a concept screen. |
| First viewport and visual composition | 15% | 5.5 | 0.825 | Desktop is one legible composition with a dominant photographic plane. But `document.elementFromPoint` at the centre of "Browse the directory" returns `ASIDE.mm-concept-banner`: the fixed disclosure covers 37 of the button's 53px. On phone the first viewport holds no image at all. | At desktop width the type/photograph split is genuinely well balanced and the proposition reads in under two seconds. | The declared primary action is not clickable in the desktop first viewport, and the phone first viewport contains no visual proof of anything. |
| Complete loop and functional integrity | 15% | 6.0 | 0.900 | Search → results → empty → handoff all work by pointer and keyboard; six routes 200; zero console errors; no fake forms — join and contact are honest `mailto:` handoffs, which is the right answer for a volunteer committee. | Refusing to build a fake membership form, and shipping a real query-dependent result set with an announced count, is the honest engineering choice. | In the filtered state the tab labelled "All" does not show all and four category tabs do nothing; with no search input on the results page, a visitor cannot clear or change a query without the back button. |
| Responsive use and accessibility | 15% | 5.0 | 0.750 | Zero horizontal overflow on 6 routes × 2 viewports; visible focus on all 16 tab stops; labelled search, live region, descriptive alt, reduced motion effective. | The keyboard experience is complete and the layout genuinely reflows without a single pixel of overflow. | At ≤940px the whole navigation is `display:none` with nothing in its place, orphaning `/events/`, `/about/` and `/contact/` on a phone — and the `/contact/` button that might have rescued it is invisible at 1.00:1. |
| Craft and finish | 10% | 5.5 | 0.550 | Newsreader is well set, the brass italic `em` is used consistently across six h1s, 4px radii throughout, calm spacing, clean build (0 errors, 0 warnings), zero console noise. | Typographic discipline is consistent across all six pages — this does not read as one good page plus five afterthoughts. | A primary button ships with invisible text; `@keyframes nc-rise` is dead code; the reduce-motion rule is out-specified by its own `:nth-child` selectors and saved only by a global `!important`; and the directory head leaves the right half of a 1265px screen empty. |
| **Total** | **100%** |  | **5.87/10** | Exact sum 5.875; recorded as 5.87 because the rubric forbids rounding up. |  |  |

## Verdict

Weighted score: 5.87/10

Core category floors at 7.0 met: No — Evidence 6.5, Visitor outcome 6.5,
Complete loop 6.0 and Responsive/accessibility 5.0 are all below 7.0.

Supporting category floors at 6.0 met: No — First viewport 5.5 and Craft 5.5 are
below 6.0. Identity meets 6.0 exactly.

All design gates pass: No — four of six fail (claims, real visitor loop, subject
proof, responsive/keyboard, readable/motion-safe: five of six).

All public release conditions pass: No — independent-concept safeguards are
blocked because the disclosure does not reach a phone visitor at the point of
the claim.

Verdict: Revise

Required repairs in priority order:

1. **Make the illustrative label reach the names.** Put the disclosure on or
   beside every card group — a per-section line under each `h2`, or a chip on
   each card — so that `/members/#services` on a phone shows it without
   scrolling. Acceptance check: for each of `#all`, `#hospitality`, `#food`,
   `#retail`, `#services` at 390×844, at least one visible text node matching
   /illustrative|example/ is inside the viewport at the landed scroll position.
2. **Separate real businesses from invented ones, or invent all of them.** Either
   mark each listing's status, or replace the real trading names with plainly
   fictional ones. Publishing "Royal County Down Golf Club · Golf Links Road ·
   world-ranked links course" beside "Bookends Newcastle · Main Street · new and
   second-hand" under one word, "illustrative", asks the visitor to distinguish
   fact from fiction with no information. Acceptance check: every directory entry
   either resolves to a `research/pipeline/verifications.json` record or is visibly marked
   as an invented example.
3. **Restore navigation below 940px.** A disclosure button, a menu, or a footer
   nav — anything. Acceptance check: from `/concepts/newcastle-chamber/` at
   390×844, all five sibling routes are reachable in one tap.
4. **Fix the invisible contact button.** Acceptance check: `/contact/`
   `a.nc-cta` computes ≥ 4.5:1; add the assertion to
   `test-reviewed-concepts` so no concept ships an invisible control again.
5. **Make the category tabs honest in the filtered state.** "All" should clear
   `?q=`; a category tab should either re-filter or be visibly disabled with a
   reason. Acceptance check: from `?q=hotel`, clicking "All" restores 17 visible
   cards and clears the status line.
6. **Put subject proof in the phone first viewport** — move the photograph above
   the search block on phone, or lead with a cropped band of it. Acceptance check:
   at 390×844 the `.nc-panel` figure occupies at least 25% of the first viewport.
7. **Stop the fixed disclosure occluding the primary action.** Acceptance check:
   at 1265×710, `document.elementFromPoint` at the centre of the home page's
   first `.nc-cta` returns that anchor. (This is a shared-shell defect and worth
   fixing once for the whole portfolio.)
8. Polish: add a search input to `/members/`, fix the "chemist" placeholder so
   every advertised example returns results, give the overflowing tab rail a
   scroll affordance, delete `@keyframes nc-rise`, correct the reduce-motion
   selector specificity, and take the studio's gorse yellow out of the concept's
   focus ring.

## Appeal

Appeal requested: No  
Reason: Not applicable.  
Appeal reviewer: Not applicable.  
Appeal reviewer saw earlier scores before deciding: No  
Appeal score: Not applicable.  
Appeal verdict replacing the original: Not applicable.

## Re-review

Date: 2026-07-25  
Commit: `8987095`  
Checks repeated: first-glance at both sizes; pointer and keyboard primary loop;
`?q=` for seven query values including empty and no-match; category tabs in the
filtered state; deep links `#hospitality`/`#food`/`#services` at 390×844 by URL
and by tapping the home rail; visible-anchor enumeration on 6 routes × 2
viewports; horizontal overflow and console on 10 URL/viewport combinations;
computed contrast with alpha compositing on 6 routes; reduced motion; alt text;
fixed-banner hit-testing; fingerprint, `pnpm build` and
`pnpm test:reviewed-concepts`.

Earlier defect disposition (read and recorded **after** my category scores were
fixed; scores were not revised as a result). The first v1.1 verdict was
**Revise at 6.28** with gates failed on claims, real loop and subject proof.

| Earlier deciding defect | Disposition |
|---|---|
| "Homepage search is theatre (every query returns all 18 cards)" | **Resolved.** The search is now genuinely query-dependent: 17 cards baseline, `?q=hotel` → 3, `?q=café` → 3, `?q=bakery` → 1, `?q=no-such-trade` → 0 with a real empty state, plus a `role="status"` count. The real-loop gate nevertheless still fails, on a *different* defect the repair introduced no fix for: the category tabs, including "All", are inert once a query is active. |
| "Real named businesses listed as 'members'" | **Partially resolved; gate still fails.** The word "members" is gone from the listing copy ("Example Main Street listings", "does not identify verified Chamber members"), and the label is now visible in the home first viewport and the directory head at both sizes. But the listings still name real trading businesses, still mix them indistinguishably with invented ones, and the label does not travel with the names: `/members/#hospitality` reached by tapping the concept's own home rail at 390×844 shows four named businesses with no label in the viewport. |
| "No real place/artefact proof" | **Partially resolved; gate still fails.** A real, licensed, credited photograph now exists (Central Promenade, Eric Jones 2012, CC BY-SA 2.0) and the header seal is traced from the Chamber's own Facebook logo. On desktop this is a genuine improvement. On phone the first viewport contains no image at all — the figure's top edge is at y 842.58 of 844 — so the repair note's claim that the phone sequence shows "identity and action, then subject evidence" is true of DOM order but not of the first screen. |
| Portfolio-wide: "every home page links its own wordmark with `href='#'`" | **Resolved.** The brand link is `/concepts/newcastle-chamber/`; no struck-through inert brand mark appears, and the concept ships no `data-concept-placeholder` or `href="#"` links at all. |
| Portfolio-wide: "header wraps badly at 390 px, pushing the primary action off-screen" | **Resolved, at a cost.** The header now stacks cleanly and "Join the chamber" is fully visible with no overflow — but the fix was `.nc-nav { display: none }` with no replacement, which orphans three routes on a phone. |

Two gate failures are **new since the first verdict** and were not among the
earlier three: responsive/keyboard (navigation removed below 940px) and
readable/motion-safe (the `/contact/` button at 1.00:1). Net movement 6.28 →
5.87.

Final score: 5.87/10  
Final verdict: Revise

If the final verdict is Revise:

Retired from public queue: 25 July 2026 — remains an internal `noindex` concept,
absent from `publicTransformationSlugs` and from all outreach. This candidate has
now consumed its focused repair cycle: a design gate still fails (four do), core
categories remain below 7.0 and two supporting categories below 6.0.  
Condition required to reopen: a materially different treatment of the directory's
truth problem (a committee-owned or plainly fictional list), phone navigation and
phone-first subject proof — not another spacing pass — or an explicit owner
decision to treat the Chamber as a flagship worth further investment.

## Truth refresh

Date: 2026-07-25  
Trading status: Open — verification record 2026-07-22 unchanged; no contradicting
evidence found during review.  
Current public presence: No website. Facebook, Instagram and LinkedIn active;
Gmail `newcastlechamber2023@gmail.com`. Before capture shows the Facebook login
wall, matching the record.  
Primary external handoff: `mailto:` and `tel:` targets match the verification
record exactly; social URLs match the record's `sources` list.  
Material claims: Unchanged. The Chamber's own facts on the page (address, phone,
email, socials, 2023 relaunch, Halloween 31 October 2026 with the district
council) are all sourced. The seventeen directory listings are not.  
Asset permission: Still valid — CC BY-SA 2.0 with attribution present.  
Material change found: No  
Affected categories to re-review: none  
Public status: Remove pending re-review

# Plan

Working roadmap for Mourne Made after the Product Stage homepage ship.
Update this file when a milestone starts, finishes, or changes shape.

Snapshot: 24 July 2026 · 9 shortlist concepts published · Milestone 1 complete · Milestone 2 second assets shipped · "See it in motion" demo clips shipped for every transformation · F1 Enniskeen flagship and F2 Buck's Head journey case both complete locally, with outreach gated by domain/form/printed-QR checks · South Down Signs on hold

---

## Milestone 1 — Finish remaining shortlist landings ✅

Complete the opening-screen concept for each remaining shortlisted prospect, using the established build loop in `PROSPECTS.md` (verify → build → capture → design notes → record).

| Business | Town | Type | Landing brief | Status |
|---|---|---|---|---|
| **The Tool Centre** | Newcastle | First website | Utilitarian trade site: hire prices, stock categories, hours | Published — [/transformations/tool-centre/](/transformations/tool-centre/) |
| **Kent Amusements** | Newcastle | First website | Seasonal attraction site: attractions, hours, family offers | Published — [/transformations/kent-amusements/](/transformations/kent-amusements/) |
| **Newcastle Chamber of Commerce** | Newcastle | First website / community | Civic hub: member directory, events, join page | Published — [/transformations/newcastle-chamber/](/transformations/newcastle-chamber/) |

### Exit criteria

- Concept page at `/concepts/<slug>/` with its own scoped stylesheet
- Transformation page at `/transformations/<slug>/` with matched 1265×710 captures, three design notes, and independent-concept disclosure
- Registered in `src/data/transformations.ts`, capture script `CONCEPTS` map, `research/verifications.json` (stage → Concept published), and `PROSPECTS.md`
- Re-read live public presence the day of build; leave cookie/login walls visible on first-website “current” captures

**Exit criteria met 22 July 2026** for all three landings above.

### Held

- **South Down Signs** — no concept until trading is confirmed in person. Rejoin only after that caveat clears (no longer blocking M1 close-out).

---

## Milestone 2 — Second critical page or asset ✅

**Shipped 22 July 2026.** Today each concept proves only the opening screen. Owners often decide on the next useful surface — booking, menu, hire list, events — not the hero alone. For every published shortlist concept (the six live ones plus the three from Milestone 1), add **one** second concept screen that matches that concept’s own visual identity.

### Build conventions (M2)

| Piece | Convention |
|---|---|
| Second concept route | `/concepts/<slug>/<asset>/` → `src/pages/concepts/<slug>/<asset>.astro` |
| Styles | Extend the existing `concept-<slug>.css` with the same class prefix — do not invent a second identity |
| Captures | `node scripts/capture-concept-screens.mjs <slug>/<asset>` → `public/images/<slug>-<asset>-after.jpg` (+ optional `-before.jpg` when a real before exists) |
| Transformation page | After the opening comparison, a `.second-surface` block: either a second `BeforeAfter` with `showNotes={false}`, or a labelled companion still |
| Docs | Note which asset shipped in `PROSPECTS.md` + `research/verifications.json` |

Working asset routes: `hotel-enniskeen/rooms`, `mourne-cycles/hire`, `donard-veterinary/appointments`, `bucks-head/menus`, `scopers/supper-club`, `cupla/menu`, `tool-centre/hire-list`, `kent-amusements/attractions`, `newcastle-chamber/members`.

### Intent

- Same brand system as the landing (palette, type, voice) — never the Mourne Made studio chrome inside the concept
- Chosen because it is the highest-leverage gap for that business, not because every site needs the same second page
- Shown on the transformation page as a second comparison or a clearly labelled companion asset beside the opening-screen slider
- Still labelled independent / uncommissioned

### Second assets shipped

| Business | Second asset | Route |
|---|---|---|
| Hotel Enniskeen | Rooms & stay detail with Bookin1 | [/concepts/hotel-enniskeen/rooms/](/concepts/hotel-enniskeen/rooms/) |
| Mourne Cycles | Hire, workshop & Cyclescheme funnel | [/concepts/mourne-cycles/hire/](/concepts/mourne-cycles/hire/) |
| Donard Veterinary | Appointment request / emergency info | [/concepts/donard-veterinary/appointments/](/concepts/donard-veterinary/appointments/) |
| The Buck’s Head | Menus experience (not PDF-only) | [/concepts/bucks-head/menus/](/concepts/bucks-head/menus/) |
| Scopers | Supper-club night page | [/concepts/scopers/supper-club/](/concepts/scopers/supper-club/) |
| Cúpla | Bilingual menu | [/concepts/cupla/menu/](/concepts/cupla/menu/) |
| The Tool Centre | Plant-hire price list | [/concepts/tool-centre/hire-list/](/concepts/tool-centre/hire-list/) |
| Kent Amusements | Attractions / hours / family offers board | [/concepts/kent-amusements/attractions/](/concepts/kent-amusements/attractions/) |
| Newcastle Chamber | Member directory | [/concepts/newcastle-chamber/members/](/concepts/newcastle-chamber/members/) |

### Exit criteria

- One second asset per published shortlist concept, captured at the same comparison size where it is a page, or as a print-faithful flat where it is a menu/board
- Transformation page updated so a visitor can judge landing + second surface without leaving the concept story
- `PROSPECTS.md` / verifications note which second asset shipped

**Exit criteria met 22 July 2026** for all nine second assets above.

### Out of scope for this milestone

- Full multi-page site builds
- CMS, real booking backends, or live data
- South Down Signs (until trading confirmed)

---

## Motion demos — "See it in motion" ✅

**Shipped 23 July 2026.** A homepage still can't show a rotating hero, a
dropdown, a hover state or how fast a visitor reaches the main action — exactly
what the concepts improve. Every transformation now carries a paired
~10-second demo clip beneath the still slider (`MotionCompare.astro`), captured
by the same script as the stills (`scripts/capture-concept-media.mjs`, see
`MEDIA_CAPTURE.md`).

- **Real-website concepts** (castle-farm, hotel-enniskeen, mourne-cycles,
  donard-veterinary, bucks-head): paired before + after clips.
- **First-website concepts** (scopers, cupla, tool-centre, kent-amusements,
  newcastle-chamber): after-only; the before stays the honest gated-social
  still, since there is no live site to demo.
- Arrival pop-ups (consent, sign-up, auto-opened chat) are now dismissed before
  capture, so both the still and the clip show the page a business designed,
  not the legal chrome on top of it. Castle Farm, Enniskeen and Donard before
  stills were recaptured clean as part of this.

---

## Milestone F — Flagship case studies ✅ complete locally (F1 23 July, F2 24 July 2026)

Two deep case studies that lead the outreach wave, planned in full in
`research/enniskeen-flagship-plan.md` (F1) and
`research/bucks-head-journey-plan.md` (F2). F1 built and verified the shared
infrastructure locally (reel capture mode, title cards, `ReelPlayer`, print
one-sheet pipeline); F2 reused all of it and added a journey mode — a phone-size
step vocabulary shared by a build-day audit and the film, so a published tap
count can never drift from the filed evidence. Both are complete as local
working prototypes; neither has been sent or promoted.

| Piece | Scope | Why this shape |
|---|---|---|
| **F1 · Enniskeen flagship — locally verified** | Full linked concept site (Home · Stay · Dine · The estate · Things to do), 75 s MP4/WebM guest-journey film, Rooms + Dine companion stills, personalised A4 one-sheet and reviewed pitch | The complete reversible working prototype exists. Build, responsive page review, media decode, deferred loading, reduced-motion and keyboard playback checks pass. Stage stays Concept published; domain resolution, production-form delivery and printed-phone QR verification remain genuine outreach gates |
| **F2 · Buck's Head journey case — locally verified** | Measured build-day audit of two phone errands, paired portrait journey films plus a 48 s side-by-side edit, "Two journeys" case-study section, A4 one-sheet and walk-in pitch | Their site is current and well maintained — the à la carte PDF was reissued on build day — so the verified gap is the journey around the ResDiary engine, not the site. Booking fell from 2 taps to 1 and the à la carte from 3 taps to 1; the handoff now sends only the two parameters the widget honours. Stage stays Concept published; the walk-in waits on the same domain/form/printed-QR gates |

Decision record, phases, gates, risks and estimates live in the two plan
documents. Hard gates shared by both: day-of-build re-verification (both
targets have changed their sites mid-build before), and no pitch leaves the
building until the P1 pair in REVIEW.md clears (domain resolves, form
delivers).

---

## Milestone 3 — Personalised one-sheets (before outreach)

**Must complete before starting outreach.** A printed one-sheet made for one
named business, showing that business's own concept, handed to the owner in
person during trading hours. There is no generic door-drop — see
[ADR 0001](docs/adr/0001-personalised-one-sheets-over-door-drop.md) for the
options weighed and why the earlier bifold-first recommendation was reversed.

Decided 24 July 2026 in a plan review against the domain going live.

### Batch one — the Dundrum walk

One afternoon, four doors, on home turf. Batch one exists to teach the
conversation, not to win the largest client; the flagship is deliberately held
back until the opener has been said out loud three or four times.

| Business | Concept in hand | Note |
|---|---|---|
| The Buck's Head | Landing + M2 menus + F2 journey case | F2 landed, so the sheet can carry the journey comparison. M3 was explicitly decoupled from F2 and would have shipped without it |
| Scopers | Landing + M2 supper club | No pitch document yet |
| Cúpla | Landing + M2 bilingual menu | No pitch document yet |
| Castle Farm | Landing (predates the pipeline) | **Verify first.** No record in `research/verifications.json`: no stage, no dated evidence, no design task. Bring it into the pipeline properly, or refresh/retire the public transformation |

Batch two is Newcastle, led by Hotel Enniskeen with the F1 film and one-sheet
already built.

### Build conventions (M3)

| Piece | Convention |
|---|---|
| Print route | Dev-only under `src/workbench/print/`, injected in `astro.config.mjs`; never in a production build |
| Styles | `src/styles/onesheet.css` — studio chrome, not the business's identity. A one-sheet is *from* Mourne Made; only the comparison imagery is the business's |
| PDF | `node scripts/print-onesheet.mjs <slug>` → headless Chrome print-to-PDF with a page-count assertion |
| Ask | **Claim**, not request — see `CONTEXT.md`. The recipient already holds their before-and-after and cannot meaningfully request one. Applies to **every** one-sheet recipient in both batches; Enniskeen does not revert to the request framing once the conversation is learned, because the reason is structural, not a lack of practice |
| CTA branch | A transformation page arriving with a `source=onesheet-*` parameter knows it is being read by its subject and swaps to the claim CTA; reached any other way it keeps the stranger's request CTA. Builds REVIEW.md bold idea 1 |
| QR | `/transformations/<slug>/?source=onesheet-<slug>` — see [ADR 0002](docs/adr/0002-printed-qr-attribution-contract.md) |

**Build the first sheets by hand; do not extract a template yet.** Three or
four real sheets will teach the right abstraction; one will not. This is a
deliberate deviation from the `transformation-details.ts` + `[slug].astro`
pattern that REVIEW.md P3 applied to comparison pages — resist "fixing" it
early. Extract once batch one is printed and the shape has stopped moving.

### Print production

- **Commercial digital short-run.** Home inkjet cannot bleed on A4 and bands on
  heavy dark coverage; the sheet's whole argument is the quality of the work.
- **Artwork is not currently printable.** `onesheet.css` sets `@page { size: A4 }`
  with `.onesheet-page` at exactly `210mm × 297mm`, no bleed and no crop marks,
  while `.onesheet-reverse` runs `#132029` edge to edge. Trim drift will expose
  white paper on a near-black page, and a printer handed this file will scale it
  ~2% to fake the bleed, shifting every element. Add 3mm bleed (216×303mm) and
  crop marks to the print route **before** any new artwork exists.
- Chrome print-to-PDF emits RGB with no CMYK profile; saturated accents such as
  the `#e0c14d` brass kicker will dull in conversion. Check this on the proof.
- **Proof the existing Enniskeen sheet first**, before designing the other four.
  Heavy dark ink across A4 is the hardest thing on the sheet to print well; if
  it looks cheap, that is a design change to discover once, not four times.

### Gate — M4 is a prerequisite, not the next milestone

A printed URL cannot be revised. **Nothing goes to a printer until a production
request-form submission has been verified arriving in the inbox carrying its
source.** Artwork may be designed in parallel; it may not be printed. This
inverts the original M3 → M4 order.

### Exit criteria

- 3mm bleed and crop marks in the print route; Enniskeen proof printed and judged
- Four batch-one sheets designed, copy deck written, print-ready PDFs produced
- QR scanned from printed paper on a phone, landing on the right transformation
  and carrying `source` through to a delivered email
- Walk order and a rehearsed spoken opener, including the said-out-loud
  disclosure that the concept is independent and uncommissioned
- Castle Farm verified into the pipeline with a stage, or its transformation
  refreshed or retired

---

## Milestone 4 — Wire the request form

The `/request/` flow posts through `/api/request` to the configured inbox. Before or alongside first outreach, verify production delivery, keep clear error handling, add a dedicated post-submission confirmation page, and confirm spam/privacy basics for UK contact. Use the confirmation page as the successful-conversion destination for Google Ads.

### Exit criteria

- Production requests arrive in a monitored channel
- Successful submissions redirect to a dedicated `/request/thank-you/` page
- Google Ads records a conversion only after a successful submission
- Success and error paths tested on mobile
- Copy still frames the ask as free, reversible, and no-obligation

---

## Milestone 5 — First outreach wave

Only after Milestones 1–3 (and preferably 4). Move published concepts through **Contacted → Mock-up requested** in `research/verifications.json`.

### Order of operations

1. Clear remaining caveats (South Down Signs trading; same-name collisions kept out of copy)
2. Re-verify each target the day before contact
3. Lead with the printed piece + the live transformation link; offer the free before-and-after
4. Record outcomes in verifications + `PROSPECTS.md`

### Exit criteria

- First batch contacted with dated notes
- At least one before-and-after request path proven end-to-end (site or reply)

---

## Milestone 6 — First paid engagement

Convert a before-and-after request into scoped paid work. Keep concept vs commissioned labelling honest on the public site until client approval exists.

### Exit criteria

- Written scope and fee for one job
- Public site updated only when the relationship and permissions allow

---

## Chamber full-site exploration (pre-outreach design review)

**Started 22 July 2026.** Newcastle Chamber is the hard first-website case:
no existing site, volunteer-run, same-name search collision, and the published
M1/M2 work only proves a homepage + members screen. Before leading outreach
with that direction, explore fuller site concepts.

| Piece | Location |
|---|---|
| Research brief | `research/chamber-website-brief.md` |
| Prototype index | [/prototypes/chamber/](/prototypes/chamber/) |
| A · Civic Front Door | [/prototypes/chamber/civic/](/prototypes/chamber/civic/) |
| B · Main Street Finder | [/prototypes/chamber/main-street/](/prototypes/chamber/main-street/) |
| C · Harbour Network | [/prototypes/chamber/network/](/prototypes/chamber/network/) |

Each direction is a full linked IA: Home · About · Members · Events · Join ·
Contact. Shared content in `src/data/chamber-prototype.ts`.

**Decision 22 July 2026:** B-led hybrid published at
`/concepts/newcastle-chamber/` (Finder IA + civic chrome + warmer join).
Prototypes retained for comparison.

### Exit criteria

- Research brief + peer examples recorded ✅
- Three visually distinct full-site prototypes, every page reachable ✅
- Winning direction decided and published as full linked concept site ✅

---

## Later backlog (not sequenced yet)

- Confirm or drop South Down Signs; build if trading holds
- Census refresh (OSM + Maps) and a new shortlist round via the select → verify → normalise → build → record cycle
- Feature-upgrade cases (booking capability for recent rebuilds such as Dacara / Conlyn)
- Broader audiences after independents: charities, clubs, public services
- Community contribution visible on-site (pro-bono / civic piece — Chamber may seed this; full-site direction under review at `/prototypes/chamber/`)
- Analytics light enough to see which transformations and CTAs convert, without dashboard theatre on the marketing site

---

## Suggested build order (near term)

```
M1 ✅ Tool Centre / Kent Amusements / Chamber landings
M2 ✅ Second assets for all nine shortlist concepts
F1 ✅ Enniskeen flagship working prototype (outreach gates remain)
F2 ✅ Buck's Head journey case (outreach gates remain)
M4 Request form delivery + source attribution (gates any print going out)
M3 Personalised one-sheets → bleed/crop fix → Enniskeen proof → batch-one artwork → print
M5 Outreach wave 1 (Dundrum walk first, Newcastle led by the flagship after)
M6 First paid job
```

South Down Signs inserts ahead of outreach only after trading confirmation; otherwise it stays out of the first outreach wave.

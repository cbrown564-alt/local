# Plan

Working roadmap for Mourne & Main after the Product Stage homepage ship.
Update this file when a milestone starts, finishes, or changes shape.

Snapshot: 23 July 2026 · 9 shortlist concepts published · Milestone 1 complete · Milestone 2 second assets shipped · "See it in motion" demo clips shipped for every transformation · South Down Signs on hold

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

- Same brand system as the landing (palette, type, voice) — never the Mourne & Main studio chrome inside the concept
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

## Milestone 3 — Letterbox marketing (before outreach)

**Must complete before starting outreach.** Print something worth posting through every independent shop door on the shortlist streets — concrete proof, not a generic flyer.

### Brainstorm — what it could be

Ambition runs from a single sharp card to a small printed “local before-and-after” piece. Decide ambition against cost-per-door, production time, and whether the piece itself demonstrates the craft we sell.

| Option | Form | Ambition | Notes |
|---|---|---|---|
| **A. Proof postcard** | A6 / DL postcard, one local before/after on the face, one CTA on the reverse | Low–medium | Fast to print; easy to hand or post; limited story |
| **B. Door-drop bifold** | A5 bifold: one featured transformation, “how a free before-and-after works”, QR to the live site | Medium | More room for belief ladder; still one piece per drop |
| **C. Street sampler** | Short printed folio (4–6 panels) of 3–4 before/afters from the same town | High | Feels like a local exhibition; higher print cost; strongest “we already did the work” signal |
| **D. Personalised one-sheet** | Single named sheet for one business (“what X could look like”) using their concept | High per door | Best conversion; not viable for every door — use for priority outreach after the generic drop |
| **E. Window-ready mini-poster** | A4 with a tear-off or QR strip owners could keep | Medium | Doubles as something they might display; risk of looking like junk mail if copy is salesy |

### Working recommendation to stress-test

1. **Primary drop:** Option **B** (bifold) or a strong **A** if budget/time is tight — one hero comparison from the recipient’s town, plain neighbourly copy, QR to `/transformations/` and `/request/`.
2. **Priority follow-up:** Option **D** for the hottest shortlist names once Milestone 2 assets exist (landing + second page in the leave-behind).
3. **Tone rules (from PRODUCT.md):** show the change before the ask; no SaaS theatre; concept work labelled honestly; CTA = free before-and-after.
4. **Production questions to answer in this milestone:** print run size, towns/streets covered, paper stock, whether QR lands on a tracked path, hand-delivery vs Royal Mail, and a single back-side layout that stays readable at arm’s length.

### Exit criteria

- Chosen format + copy deck + print-ready artwork (PDF)
- QR / URL path verified on phone
- Drop list (streets / businesses) and a one-pass delivery plan
- Explicit go/no-go on personalised sheets vs generic town sampler

---

## Milestone 4 — Wire the request form

The `/request/` flow is still local-only and does not transmit. Before or alongside first outreach, connect a real inbox (or form backend), keep error/success states, and confirm spam/privacy basics for UK contact.

### Exit criteria

- Submitted requests arrive in a monitored channel
- Success/error paths tested on mobile
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
M3 Letterbox format decision → artwork → print
M4 Request form wiring
M5 Outreach wave 1
M6 First paid job
```

South Down Signs inserts ahead of outreach only after trading confirmation; otherwise it stays out of the first outreach wave.

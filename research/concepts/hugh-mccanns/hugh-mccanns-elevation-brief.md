# Hugh McCann's — elevation brief: the house that exists for a day that hasn't happened yet

Written 4 August 2026, first in the ranked sequence in
`docs/elevation-brief-priorities.md`. The general method is in
`docs/the-elevation-method.md`; this is the wedding-venue application of it.
The verification record (`research/pipeline/verifications.json`, "Hugh
McCanns", 24 July 2026) names this the highest-value single target in its
batch and sets the accuracy bar to match.

**Status: written 4 August 2026; first pass (moves 1–4) implemented the same
day.** The concept before that pass was an honest feature graft — one
faithful dining-room visualisation, the "We do." lock-up, and a
date-and-guest-count enquiry that drafts an email to the venue's published
address. It passed the five publication checks but did not make the venue
recognisable to the family who runs it.

**What shipped, 4 August 2026 (moves 1–4).** Every fact below was re-read
from hughmccanns.com — the home, `/weddings/` and `/accommodation/` pages —
on 4 August 2026, and only what those pages publish is on the concept:

- The complete "From Today Until Your Day, We Do." is the headline, with
  "Passed down through three generations Hugh McCann's is at the very heart
  of the community" opening the first screen beneath it (move 1).
- The Donna and Chris review is carried verbatim as a pull-quote with its
  date, 12.10.17, and a link to the venue's own reviews (move 1). The open
  decision is resolved as *keep, dated*; the withdrawal condition stands.
- The placeholder navigation is gone. The Loft Suite, the Coast Suite, the
  Secret Garden, Little Haven and the Avoca Hotel are named with their
  published character and capacities, and each routes to the same enquiry
  (move 2).
- The day runs as the venue's own sequence — viewing, planning, ceremony,
  meal, reception, evening, night, Day 2 — arriving at the date (move 3).
- The invented season strip is removed from markup and stylesheet, and the
  "season guide is indicative" footnote with it. The enquiry now says every
  date is held in conversation. The 40–250 guest slider stays (move 4).
- `tools/test/test-hugh-mccanns-elevation.mjs` pins all four moves against
  the built page, including "no availability claim survives", and runs in
  `pnpm test`. The comparison still and demo clip were recaptured in the
  same commit; the case-study Sources & limits block now records the 4 August
  read date, the weddings-page source, and that the page shows no
  availability of any kind.

The published "from £995" figure stays off the page (open decision resolved
as *omit*: the brief does not depend on it and pricing raises the
re-verification bar before every use). Moves 5 (dusk visualisation) and 6
(the where-your-day-happens plate) are unstarted — both need an asset session
this pass did not include.

## The shape of this business

Hugh McCann's is a **place that sells one future day**. It is not a
restaurant with a function room: the weddings page, the suites, the ceremony
licence, the brochure and the brochure's prices are the business, and the
front bar, the restaurant and Little Haven accommodation orbit the wedding
trade. The register is **atmosphere** — the same family of moves as
Enniskeen, not the appetite register of a food counter. What the customer
buys is the day: the viewing, the planning, the ceremony, the meal, the
evening. The theatre is that day, shown at its best moments.

The concept competes with a maintained, genuinely well-written site — the
July 2026 menu upload proves active maintenance, and the copy is better than
most studios write. The honest argument is already chosen and must not
widen: the venue's entire trade runs on booked dates, and its site has no
enquiry form, no availability check and no date capture anywhere. This is a
feature graft, not a rebuild. Elevation here means making the graft feel
like it grew on the premises, not expanding its scope.

## The essence

**A two-hundred-year-old house, run by one family for three generations,
whose whole business is a day that hasn't happened yet.**

The venue's own headline already carries the paradox: "From Today Until Your
Day, We Do." The building is the past made solid; the product is the future
made specific. A concept that holds both ends of that line — the arc behind,
the day ahead — will feel like the venue. A concept that keeps only the
enquiry mechanic is a form on a pretty background, and any venue could wear
it.

## What recognition can draw on

The public record is unusually full (the venue's own site re-read 4 August
2026; `research/pipeline/verifications.json`):

- **Their voice:** "From Today Until Your Day, We Do." "Passed down through
  three generations Hugh McCann's is at the very heart of the community."
  "Traditional rustic charm as well as the new world contemporary style."
  "From your initial viewing, right until your big day, we will remain by
  your side." "Renowned for our cocktails, our quirky vintage tea party and
  our outstanding drinks receptions." "Exclusively yours." The best-sentence
  test is passed several times over; the page currently uses one fragment.
- **Their geography:** 119–121 Central Promenade, "at the foot of the
  Mournes", with sea views toward Dundrum Bay. The Secret Garden: lavender-
  lined pathways to a gazebo beneath the mountains, licensed for civil
  ceremonies. The Loft Suite upstairs: stone walls, open fire, a private sun
  terrace with mountain views, up to 120 seated with room for 120 more in
  the evening. The Coast Suite downstairs: cocktail bar, drapes, mood
  lighting, up to 250 seated. Little Haven, the Georgian guest house — NITB
  four-star, eight bedrooms sleeping seventeen, the bridal suite among them.
  The Avoca Hotel, the sister property on the promenade, named for Day 2
  celebrations. A wedding here genuinely moves between addresses; that is
  what makes the map a real one rather than a decoration.
- **Their ritual:** complete wedding planning — "from your initial viewing,
  right until your big day". The viewing, the planning, the ceremony (the
  garden or a suite, under the civil licence), three or five courses, the
  drinks reception or the vintage tea party, the evening in the Coast Suite,
  the bridal suite at Little Haven, Day 2 at the Avoca. The current
  testimonial set ends in 2019 and the brochure is 2021.22; the ritual is
  documented, the recent dates are not.
- **Their arc:** two hundred years of building, three generations of one
  family, and a site footer that reads 2018 under a menu uploaded last
  month. The arc is the business's own proof that it keeps its promises.
- **Their mark:** the "Hugh McCann's — Boutique Wedding Venue & Gardens"
  wordmark. No cleared logo file is held; the publication record reserves
  the exact production wordmark for if the business engages. The concept's
  plaster, forest, gold and blush palette is already a fair reading of the
  rooms.

## The diagnosis

The graft is honest and the headline is theirs, but the page below it could
be moved to any venue with only the nouns changed:

1. **Their best sentence is truncated.** "We do." works as a headline, but
   the full line — "From Today Until Your Day, We Do" — is the one the venue
   chose, and the kicker that carries it is small and paraphrased nearby.
   The three-generations sentence, which would tell the family they were
   seen, is absent.
2. **The rooms have no names.** The record names the Loft Suite, the Coast
   Suite and the Secret Garden with their real capacities and character; the
   page offers placeholder navigation where they should be.
3. **The ritual is a form, not a sequence.** Date, guest count, send. The
   business's actual mechanism — viewing, planning, day, Day 2 — is
   documented and unused.
4. **The season strip is invented availability.** Open, a-few-left and taken
   months are presented beside the enquiry in a business whose dates are its
   trade. The "season guide is indicative" line is an 11px-style honesty
   footnote under the highest-risk content type there is: a couple could
   decide not to enquire because June looks full. This element fails the
   honesty boundary and should be the first thing the next pass removes or
   rebuilds.
5. **No theatre.** One daytime plate, however faithful, is a photograph's
   worth of atmosphere from a venue that trades in evenings.

## The moves

Ordered by the recommended build sequence: voice first, then the essence
made visible, then theatre, then the keepable artifact.

### 1. Give their full sentence back, and add the one that proves study

Rebuild the opening lock-up around the complete "From Today Until Your Day,
We Do." — their words, set as the statement of the page, not a fragment of
it. Beneath it, the welcome note opens on "Passed down through three
generations", in their words or a plainly-credited quotation, so the first
screen tells the family the concept was made for one venue.

Add one verbatim testimonial as a large pull-quote, dated and sourced: the
Donna and Chris review (12.10.17) — a couple who met climbing Slieve Donard,
got engaged at its summit, and married with the mountain behind them — is
the strongest recognition story in the record. It must carry its date and
its source; the record's testimonials end in 2019 and the page must never
imply otherwise. If the staleness reads badly on review, drop the quote
rather than freshen it silently.

### 2. Name the suites and the garden

Replace the placeholder navigation with the venue's real destinations, taken
only from its weddings and accommodation pages:

- **The Loft Suite** — first floor; stone walls, open fire, the sun terrace
  with mountain views; up to 120 seated, 120 more in the evening
- **The Coast Suite** — ground floor; cocktail bar, drapes and mood
  lighting; up to 250 seated
- **The Secret Garden** — lavender-lined pathways, the gazebo, civil
  ceremonies under the mountains
- **Little Haven** — eight bedrooms sleeping seventeen, the bridal suite
  among them
- **The Avoca Hotel** — the sister property, for Day 2

No invented interiors, capacities or amenities; the published facts are
specific enough to do the recognition work alone. Each entry can hold the
same date-and-guest-count enquiry, so the whole page keeps one job.

### 3. Stage "from today until your day" as the sequence

Make the ritual visible in the order the venue itself sells it, grounded
only in published claims:

**The viewing → the planning ("we will remain by your side") → the ceremony
in the garden or a suite → the meal, three courses or five → the drinks
reception or the vintage tea party → the evening in the Coast Suite → the
bridal suite at Little Haven → Day 2 at the Avoca.**

Each step takes one line of their own wording and one honest action; the
enquiry panel sits at the end of the sequence, where the ritual naturally
arrives at the date. This is the essence made visible: the two-hundred-year
house behind, the single future day ahead, and the family that stays beside
you between them.

### 4. Retire the invented calendar

Remove the open/few/taken season strip. In its place, say the honest thing
the record supports: every date is held by conversation, and the date-and-
guest-count enquiry is how that conversation starts. If any season guidance
survives, it must be sourced from the venue or plainly labelled as
illustrative guidance about weddings in general — never presented as this
venue's availability. The guest-count slider stays: its 40-to-250 scale is
the venue's own published range, and "40 · intimate / 250 · the full room"
is already honest.

### 5. Make evening the venue's theatre

The Coast Suite "becomes truly magical during the evening" in the venue's
own words, and the most likely moment the family opens this link is after a
Saturday wedding, late, on a phone. Create a second, composition-matched
faithful visualisation of the dining room at dusk — same window bays, same
table settings, same Mourne profile going dark — swapped on the visitor's
local time with the daytime plate as the no-JS default. Build the swap
mechanism and its tests before the asset arrives, per the Enniskeen lesson.
The image carries the existing faithful-visualisation disclosure in alt
text, on the page and in the case study.

### 6. Draw the plate the family keeps

An indicative, hand-drawn **where-your-day-happens plate** for the concept
and the reverse of a one-sheet: the promenade frontage, the Secret Garden
behind with its lavender path and gazebo, the mountains behind that, Dundrum
Bay across the road — with Little Haven and the Avoca marked as the day's
other addresses. Only the geography the record supports; no invented
gardens, terraces or sightlines. This is a drawing, not a diagram: budget it
as its own session, review it at phone width for clipped labels, and carry
the "indicative · not a survey" disclosure.

## Recommended bundles

- **First pass:** moves 1–4. All of it works from existing facts and the
  current hero — their full sentence, the named destinations, the staged
  ritual, and the honest calendar fix — and it is the pass that makes the
  page irreplaceable by another venue. Move 4 is small and belongs here
  because it removes the page's one dishonest element.
- **Theatre session:** move 5, mechanism and tests first, asset second.
- **Keepable artifact:** move 6 as its own drawing session, then the
  one-sheet that takes the plate on its reverse.

## Honesty constraints

- This is a feature graft on a maintained site, per the Buck's Head rule.
  The customer page never criticises the current site; that diagnosis stays
  in the case study. The enquiry keeps the reviewed mailto handoff to the
  published `info@hughmccanns.com` address — no form backend, nothing sent
  from the page.
- Nothing invented for atmosphere: no room features, menu items, prices,
  packages, garden details, staff names or availability beyond what the
  venue publishes, each with a read date recorded. The "packages for 100
  guests from £995" figure is published on the weddings page (read 4 August
  2026); if it is used, cite the read date and re-verify before any
  outreach — pricing is live business fact, not editorial copy.
- The season strip must not return in any form that reads as real
  availability. Illustrative numbers are the highest-risk content type, and
  in a booked-date business they can cost the venue an enquiry.
- Testimonials are quoted verbatim with their dates and sources, and
  withdrawn if edited or removed. The page never implies a review is more
  recent than 2019; the 2021.22 brochure is not cited as current.
- The public site stays AI-imagery-only (privacy decision, 31 July 2026).
  Any generated variant keeps the triple disclosure — alt text, visible page
  note, case-study Sources & limits — plus a provenance entry in the same
  commit. The venue's own photographs remain reserved for personal outreach
  material.
- No studio-drawn crest or monogram: the venue's production wordmark leads
  if it is ever cleared; until then plain type carries the name, per the
  Dundrum Inn rule.
- Any day-part or map behaviour respects `prefers-reduced-motion`, keeps
  focus visible and works at the real 390px viewport.
- Any change to the first viewport, hero composition or section order
  recaptures the comparison stills and clip in the same commit, per
  `docs/MEDIA_CAPTURE.md`.

## Tests that pin the elevation

Each move ships with a small proof:

- Assert the full "From Today Until Your Day, We Do" line and the
  three-generations sentence reach the first screen, and that the
  pull-quote — if kept — carries its date and a source the family can
  follow.
- Assert all five named destinations render with only their published
  capacities and character, and that each route reaches the same enquiry.
- Assert the enquiry still drafts an email carrying the chosen date and
  guest count to `info@hughmccanns.com`, and that nothing else sends.
- Assert no availability claim survives: no month state, no season strip,
  no "few left" language anywhere on the page.
- If the dusk hero lands, assert every day-part file on disk reaches the
  page, that reduced motion settles on the daytime plate, and that the
  visible disclosure stays attached — the cached-build failure from the
  Enniskeen session is the test to copy.
- If the plate lands, inspect it at desktop and 390px and assert no clipped
  labels and a present indicative disclosure.
- Run the guest-voice guard and the five publication checks; then run the
  swap test on the finished page: remove "Hugh McCann's" and the suites, and
  if the page still works for any venue, the elevation has not gone far
  enough.

## Open decisions

- ~~Is the Donna and Chris testimonial (12.10.17) fresh enough to carry?~~
  **Resolved 4 August 2026: kept, verbatim, with its date and a link to the
  venue's own reviews.** The wording used is the one published today —
  "Everyone complemented the food, the decor, the views…" — not the summit
  story this brief described from the earlier read; only what was verified on
  4 August 2026 is on the page. Withdraw the quote if the venue edits or
  removes it.
- ~~Does the published "from £995" package figure belong on the page?~~
  **Resolved 4 August 2026: omitted.** Real and dated, but pricing raises the
  re-verification bar before every use and nothing here depends on it.
- Does the dusk variant stay photoreal after generation review, or is a
  drawn evening plate more honest and more ownable beside the faithful
  daytime room?
- If the business engages, the production wordmark and licensed photography
  replace the type lock-up and the faithful visualisation — already recorded
  in `research/publication.json` as the first improvement to raise.

## When a move ships

Record the source and read date for every new fact, add provenance for any
new asset in the same commit, update the case-study Sources & limits block,
and add journey coverage for new behaviour. Any move that changes the first
viewport recaptures the comparison stills and clip in the same commit.
Update this status line as moves land; do not call the concept validated
until an owner or representative visitor has supplied that evidence.

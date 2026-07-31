# Donard Veterinary Clinic — elevation brief: from good to great, on its own terms

Written 31 July 2026, as part of the expansion of the elevation work beyond
`docs/good-to-great-concept-elevation.md` (hotel-shaped) and
`research/concepts/scopers/scopers-elevation-brief.md` (food-bar-shaped). The general method
these briefs follow is in `docs/the-elevation-method.md`.

**Status: all five moves shipped 31 July 2026; craft rebuild same day.** The
landmines at the end are fixed before any move starts; the honesty
constraints decide what every move is allowed to say. The 31 July first pass
was rebuilt on 31 July to drawing-kit standard: the cast is hand-drawn
(spaniel, cat, rabbit, reused across hero and life arc, with reduced-motion-
safe micro-animation), the safety net is a drawn mechanism with routing-tagged
connectors, the catchment map is a true plate (real relative geography —
Newcastle on the coast at the foot of Donard, the Mournes sweeping
south-west — double rules, three type registers, halos, cartouche), the life
arc ends in a deliberately quiet goodbye card, the timeline keeps only
documented beats, and the hero regains its Mourne backdrop.

## The shape of this business

A **care** business: its product is emotion under management — the phone call
you dread making, the pet as family member, the worry at 11pm, and eventually
the hardest day. The concept's existing thesis ("Make it easy to ask for
help") is right, and the care desk is the strongest craft on the page. But
the concept is the most visually bare in the portfolio: zero imagery since
the Geograph exterior was withdrawn on 26 July 2026, species-agnostic in
tone, and the archived swap-the-business test found almost everything
survives a change of name. Recognition for Catherine Savage means proving
the studio understands what a small-animal practice actually is — and the
sources, unusually, are rich.

## What recognition can draw on

All sourced (`research/pipeline/verifications.json:108-134`; recruitment ad,
vetni.co.uk, 8 July 2026; the practice's own pages):

- **The animals' absence is the loudest fact.** No pet appears anywhere on a
  vet concept.
- **The three-layer safety net**, in their own words: call the clinic number
  and you are "diverted to the on-call vet"; VidiVet is "our trusted partner
  for out-of-hours support… 24/7 access to expert digital vet advice", free
  for clients; the recruitment ad confirms "No out of hours" for staff — the
  chain is structural, not incidental.
- **The bereavement page** — "When the time comes to say goodbye", opening
  "As pet owners ourselves we fully understand…" — the most emotionally
  distinctive content the practice publishes. Most vet sites bury this;
  theirs does not.
- **The fascia words**: "Professional · Caring · Compassionate", physically
  on the building.
- **The catchment, named by them**: Newcastle plus Castlewellan, Dundrum,
  Bryansford, Clough, Annalong, Kilcoo and Hilltown.
- **The founder arc**: opened 2017 by Catherine Savage; independently owned,
  100% small-animal; nine years in and recruiting, against a backdrop of
  corporate chain consolidation in vet care. Serious kit (full Idexx in-house
  lab, digital x-ray, videoscope, peripatetic specialists) behind a site that
  still says "newly opened".

## The moves

Ordered by recommended build sequence.

### 1. The animals

Illustrated pets — a dog, a cat, a small pet — drawn in the concept's
palette, disclosed as illustrations. **Not photoreal:** generated photoreal
pets would read as real patients, which is the wrong side of the honesty
line; illustration is warm, obviously commissioned, and safe. One move that
fixes the species-agnostic tone of the whole page. The appointment form's
"Your pet" select (Dog / Cat / Small pet / Other) tells you the cast.

### 2. The phone always finds a vet

The safety net stops being copy in a panel and becomes a visible mechanism:
one number → diverted to the on-call vet → free 24/7 VidiVet triage. A
simple, calm three-layer diagram of what happens when you ring. This is the
theatre of reassurance — the correct register for a care business, where the
surprise should feel like relief, not spectacle. It builds on the care desk,
which is already the page's best region.

### 3. A pet's whole life, including the ending

The "day in the life" move translated into a life: first jabs → the weight
clinic → the dental → the emergency → the goodbye. Structured around the
services they actually publish (Routine Health Care, Diagnostics, Surgery,
Dental, Weight Clinic, Emergency — verbatim list on record). The courage is
in the last step: honour the bereavement page with a gentle, properly
credited section in the same register they wrote it. Their own sentence —
"As pet owners ourselves we fully understand" — is also the concept's
pull-quote: the practice's own words, not a client's (no reviews are on
record), with its page named so the owner can find it.

### 4. The catchment map

The drawn-map move: Newcastle and the eight named villages, in the concept's
palette, indicative-disclosed. For a vet the map says *we are your local
practice* more concretely than any tagline — and it gives "close to home" a
geography instead of leaving it a slogan. The keepable artifact, and the
natural one-sheet cover. Budget it as its own session, per the estate-map
lesson.

### 5. Still independent

A short timeline: opened 2017 → nine years of independence → growing (the
July 2026 recruitment) → the Donard Vet Club tease they themselves posted
("coming soon"). Independence is the positioning claim that matters to this
owner against the chains; the "newly opened" staleness of their own site
makes the arc visible only here. Dates only where documented — 2017 is on
record; nothing else is.

## Honesty constraints

- **Resolve the palette before building on it.** The archived 25 July review
  disputes the badge reading: the real logo and frontage in the Geograph
  photograph are blue and teal, "there is no plum anywhere in the real
  identity", and the stylesheet header comment claiming plum from the logo
  appears misstated (`research/archive/v1.1/evidence/donard-veterinary.md:268`).
  Move 1 and the map inherit whatever is decided; correct the CSS comment
  either way.
- **"Sunday — Closed" is an unsourced inference** stated as fact in the
  appointments emergency panel (`src/pages/concepts/donard-veterinary/appointments.astro:93`).
  No Sunday line is published anywhere. Remove it or rephrase to what the
  practice actually publishes (call the clinic number; diversion handles the
  rest).
- **The bannerNote is empty** — the concept never states its own thesis in
  the studio banner. Write it when the first move lands.
- No invented staff names beyond Catherine Savage (public record via the
  practice's own ad), no invented pet names, no invented testimonials, no
  services beyond the published list, no claims about response times beyond
  "within minutes" as VidiVet themselves publish.
- The mailto handoff stays exactly as honest as it is: three on-page labels
  that it sends nothing itself, stale-draft withdrawal on edit. Any new
  section routes back to that handoff rather than implying online booking.
- The placeholder-link strikethrough (audit issues I1/I2, 31 July 2026)
  reads as deleted items in the first viewport; fix with the portfolio-wide
  remedy.
- Imagery stays generated-and-disclosed or drawn; the Geograph exterior stays
  withdrawn (held, credited, not in use since 26 July 2026).

## When a move ships

Each landed move gets: provenance entries for any new file in the same
commit; the case study's Sources & limits block updated the same day; journey
coverage for any new behaviour; and a note in this file's status line. The
comparison stills predate the VidiVet correction era only in overlay detail;
any move that restructures the first viewport recaptures stills and clip in
the same commit (docs/MEDIA_CAPTURE.md).

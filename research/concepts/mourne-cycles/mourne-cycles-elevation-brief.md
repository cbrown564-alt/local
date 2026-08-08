# Mourne Cycles — elevation brief: from good to great, on its own terms

Written 31 July 2026, as part of the expansion of the elevation work beyond
`docs/good-to-great-concept-elevation.md` (hotel-shaped) and
`research/concepts/scopers/scopers-elevation-brief.md` (food-bar-shaped). The general method
these briefs follow is in `docs/the-elevation-method.md`.

**Status: moves 1–5 shipped 31 July 2026.** Move 6 (founding arc) waits on an
ownership sourcing decision in `research/pipeline/verifications.json`.

**Flagship rebuild shipped 8 August 2026.** The concept is now a complete
six-page site (home, bikes, workshop, hire, cycle-to-work, trails) on a shared
shell with the mobile-nav defect fixed, kinetic typography (hero ride-in +
scroll-velocity lean, both on the one scheduler with designed reduced-motion
settled states), a trails theatre session (the real Mourne skyline sampled at
build time from the baked SRTM-derived terrain grid, drawn in on arrival with
a walking marker and metre readout), an accessible workshop booking widget
that composes an email carrying service + day (the thin mailto loop, fixed
honestly), and a single `#mc-grade` photographic voice. No new generated
media shipped with the rebuild, so `research/image-provenance.md` needed no
new entries; the three plates left open are briefed in
`mc-generation-brief.md`. The mobile nav is no longer absent — the standing
constraint below is closed.

## The shape of this business

A **trade** business — and the archived reviews were blunt: "nothing on the
page is bike-shop-shaped" (`research/archive/v1.1/evidence/mourne-cycles.md`).
The business itself is richly shaped: established 2002, a listed Trek dealer
and Cyclescheme retailer behind a gmail address and a "Proudly created with
Wix © 2014" footer, at 63A Castlewellan Road — **literally the road out of
Newcastle toward Castlewellan, the gateway to the Mournes' trail country**.
That location is the story the concept never used. An LBS does not sell
bikes; it sells access to riding, and it keeps the relationship through the
workshop.

## What recognition can draw on

- **The shop's own voice** (live homepage, already quoted in
  `src/site/data/transformation-details.ts:657`): "one of Northern Ireland's
  premier local bike shops (or 'LBS' to bike aficionados)" — the parenthetical
  is the best copy anyone will write for this business — plus "RIDE WITH US"
  and "Come and visit us!".
- **The founding arc**: trading since 2002; MOURNE CYCLES LIMITED (NI064124)
  incorporated April 2007 — roughly five years of trading before
  incorporating. Companies House lists Bernard Thomas Mackin and Donna Julie
  Mackin as directors since 18 April 2007 (public record), but the studio
  dataset records ownership as unverified — **naming them is a new sourcing
  decision, flagged, not assumed**.
- **The trails**: the shop's own site maintains an "Our local Trails"
  section — an unused, ownable asset.
- **The workshop culture**: the stand, the ticket rail, the mechanic who
  knows your bike. The concept's workshop desk is already the best region on
  the page (audit, 31 July 2026); the business's heart is already located.
- **The logo**: coal peaks with a single red summit — genuinely good raw
  material, already quoted as the SVG mark.
- **Cycle to Work**: the conversion path by which people actually buy a
  decent bike; the case study records two scheme partnerships, the concept
  names Cyclescheme.

## The moves

Ordered by recommended build sequence.

### 1. Their voice, attributed

Quote the "LBS to bike aficionados" line verbatim, attributed to the shop,
set where the thesis currently sits. "Bikes, workshop care and straight
local advice" is fine studio copy; their parenthetical is better and it is
theirs. Keep "main dealer in Trek bikes in the area" out of the studio's
voice — it is quotable only as the shop's own wording ("the shop calls
itself…"), per the second v1.1 review.

### 2. Turn the dead rail into the recognition engine

The five-category range currently ships as five inert cells that render
**dotted-strikethrough at 50% opacity — the entire range reads as deleted
inventory across the fold** (audit issues I2/I3, the worst optics in the
portfolio). Do not invent products — no sourced product data exists. Map the
categories to terrain instead: "Electric — the coast road without the
hills." "Mountain — built for Castlewellan reds." Each cell says where that
kind of bike goes. The rail becomes bike-shop-shaped, place-rooted and
honest in one move.

### 3. The trails map

The drawn-map move, and the strongest of the four concepts: the shop at the
trailhead, Castlewellan forest, Tollymore, Donard, the coast road — in the
coal/red/paper palette, indicative-disclosed. Recognition and theatre in one
artifact; the one-sheet cover; a session of its own per the estate-map
lesson. Ground every named trail in the shop's own trails section or
verifiable public trail designations — no invented routes, no invented
grading.

### 4. The workshop is the heart

Lean into the strongest existing region. An "on the stand today" jobs
board — bottom bracket, two punctures, a full service — clearly labelled
illustrative, disclosed like the hire prices. Every LBS has the stand and
the ticket rail; this says *working shop* in a way no template can, and it
gives the "Book a service" action a reason to exist.

### 5. Cycle to Work as the guided moment

The 42% dial is the only current surprise, and it is an invented number
wearing an illustrative label. Replace spectacle with substance: a real
worked example — a named scheme mechanic, a named salary band, the actual
three steps — every figure labelled illustrative. This is the conversion
path; it deserves to be the most careful piece of explanatory craft on the
page, not a dial.

### 6. The founding arc, if sourcing allows

"Local since 2002" is already honoured in the kicker. The fuller arc —
trading 2002, incorporated 2007, still the same family behind the counter —
is available from public record **only after the ownership sourcing decision
is taken and recorded in `research/pipeline/verifications.json`**. Until then the
concept keeps "ownership unverified" and says nothing the dataset does not.

## Honesty constraints

- **Fix first:** the collapsed whitespace rendering "listed as a
  **Trek**dealer" (`src/pages/concepts/mourne-cycles.astro:37`); the stale
  after-alt copy still describing "the Trek trail hero" from the
  deleted-imagery era (`src/site/data/transformation-details.ts:647`); and the
  strikethrough rail above.
- **No premises imagery.** The faithful visualisation proved a bicycle, not
  the business, and stays withdrawn; unlicensed Trek/Bontrager marketing
  photography stays deleted. Any future imagery is the 63A frontage or
  workshop, sourced or faithfully generated and disclosed, or drawn work like
  the map.
- **Illustrative numbers are a standing risk**: the £20/£30/£45 hire prices
  and the 42% dial are exactly the kind of figures an owner assumes are real.
  Labels stay prominent — the current 11px footer-cruft honesty line (audit
  I6) is not prominent enough for numbers.
- The "two Cycle to Work partnerships" claim in the case study and the
  single named scheme in the concept should be reconciled to what
  `research/pipeline/verifications.json` supports.
- The mailto handoff stays thin-but-honest; do not imply online booking,
  live availability or real-time workshop status. "The shop confirms both"
  remains the rule.
- Mobile nav is absent below 940px (archived review) — any new section
  inherits the problem; fix with, or before, the first move that adds
  navigation weight.

## When a move ships


Guest-facing attribution stays light (who spoke + a reasonable month/year or era). Studio read stamps and research caveats belong in research and Sources & limits — see the three-layer honesty split in `docs/the-elevation-method.md`.

Each landed move gets: provenance entries for any new file in the same
commit; the case study's Sources & limits block updated the same day; journey
coverage for any new behaviour; and a note in this file's status line. Any
move that restructures the first viewport recaptures stills and clip in the
same commit (docs/MEDIA_CAPTURE.md).

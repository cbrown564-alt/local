# Castle Farm Fresh Produce — elevation brief: the castle's farm, on the web since 2008

Written 4 August 2026, second in the ranked sequence in
`docs/elevation-brief-priorities.md`. The general method is in
`docs/the-elevation-method.md`; this is the farm-shop application of it. The
ranked review called this the least-elevated public page: a single hero
screen with placeholder navigation and an inert basket.

**Status: written 4 August 2026. Moves 1, 2, 3, 4, 5 and 6 implemented 5
August 2026** — the farm's own sentence and both dates lead the page, the
weekly round is on it with the published cutoffs, days, towns and terms and a
town lookup, the stock is told in the farm's two-source shape, the week's
table is the theatre plate, the delivery-round plate is the keepable artifact,
and every control either reaches `castlefarmni.com` or is gone. Recipe dishes
hand off to the live blog index: the shop sitemap listed no per-post URLs on
5 August 2026. `tools/test/test-castle-farm-elevation.mjs` pins what shipped
and runs in `pnpm test`.

Two open decisions below were resolved in the cautious direction when the
moves shipped: the £45 Medium Mixed Box price is **not** quoted (the page
names the box and links out, because prices are the most perishable thing the
farm publishes), and the "approximately 50,000" bulletin figure is **left
out** — it reads as a boast the farm never asked for. One correction to the
test list below: the recorded schedule names Dundrum on Tuesday only, not on
four days, so the page and its test claim Tuesday and nothing more.
Castlewellan is the town the published schedule really does name twice.

The concept before this pass was an honest clarity case — "This week's shop,
sorted.", a disclosed faithful visualisation of the mixed box, a three-step
strip — and it passed the publication checks. What it did not do is tell the
farm's own story. The record re-read for this brief (the farm's About and
Delivery pages, 4 August 2026) turned out to be one of the richest
inventories in the pipeline, and almost none of it was on the page.

## The shape of this business

Castle Farm is a **product business with a counter ritual**: what the
customer buys is the week's food, and the mechanism is the weekly round —
order by Sunday 3pm, the box is packed on the farm, and it reaches the
doorstep on the farm's delivery day for that town. The register follows the
Product row of the method: the essence lives in the moment the product is
*for* — the week's table — and the theatre is the table, shown at its best
moment. It is not a Place business despite the extraordinary site; the
castle and the mountains are the provenance, not the product.

The concept competes with a working Shopify store with live checkout, so the
Buck's Head rule applies in full: the argument is first-screen clarity and
the story the store never tells, never a replacement shop. Everything
transactional hands off to `castlefarmni.com`.

## The essence

**A farm beside Dundrum Castle, in one family's hands for hundreds of years,
that has run its weekly round on the web since 2008.**

The paradox is the two dates. The farm says its ancestors lived in the
actual castle grounds — the oldest possible local provenance — and it also
says it was "established as a web based order and home delivery service in
2008", eighteen years of online rounds before most supermarkets managed one.
Norman castle, Shopify checkout. A concept that holds both dates at once is
irreplaceable by any box scheme; the current page, which holds neither,
could be any grocer's.

## What recognition can draw on

The public record is unusually full (the farm's own site re-read 4 August
2026; `research/concepts/castle-farm/verification.json`):

- **Their voice:** "Simply browse our fresh produce, add to cart and
  checkout. **Let us worry about digging it up.**" That sentence passes the
  best-sentence test outright — plain, funny, and only a farm could write
  it. Also: "only the best fine foods that the local area has to offer", and
  the mission to "keep money circulating in the local economy, provide jobs
  for local people and cut down on food miles".
- **Their arc:** established 2008 as a web-based order and home-delivery
  service; approximately 50,000 people kept up to date by social media and
  email bulletins (their own figure — quote it as theirs); "farmed by
  generations of the same family for hundreds of years", with ancestors in
  the castle grounds; a growing sheep flock, and plans for tree planting and
  a small orchard.
- **Their geography:** the foothills of the Mournes beside the historic
  Norman Dundrum Castle — and then the round. The farm publishes its whole
  delivery schedule: Tuesday north and east (Dundrum, Newcastle,
  Castlewellan, Downpatrick, the Ards, Bangor, Belfast, Lisburn,
  Hillsborough, Dromore, Dromara and more), Wednesday south (Clough,
  Kilkeel, Annalong, Warrenpoint, Newry, Armagh, Portadown, Craigavon,
  Banbridge, Castlewellan and more), Thursday the peninsula loop (Tyrella,
  Ardglass, Strangford, Portaferry, the Ards Peninsula, North Down), Friday
  further north (Saintfield, Antrim, Larne, Carrickfergus and more),
  Saturday by arrangement. Dozens of named towns, mapped to named days.
- **Their ritual:** bespoke orders for Tuesday–Thursday deliveries by
  **Sunday 3pm**; for Friday/Saturday deliveries by **Wednesday 3pm**; a
  despatch notification by email or SMS on the day; a £40 minimum for local
  areas, £76 for outlying postcodes, a £4 delivery fee at checkout; a box or
  bags left out if nobody is in. This is a real weekly mechanism with real
  numbers, published in full.
- **Their stock:** their own Mourne Aberdeen Angus beef herd, a 300-ewe
  commercial sheep flock behind the free-range Mourne lamb, Gloucestershire
  Old Spot rare-breed pork, free-range eggs, and potatoes and vegetables in
  season — supplemented, in their own model, by produce "from other small
  local producers and businesses in the area", which the farm describes as
  giving those producers a platform across Ulster. A recipe blog (beef
  bourguignon, shepherd's cottage pie, goulash) pairs the boxes with the
  week's dinners.
- **Their mark:** the "Castle Farm" wordmark. No cleared logo file is held;
  the concept currently crops a produce photograph into a wordmark window
  and discloses in its banner that the wordmark is not the farm's.

## The diagnosis

1. **The page survives the swap test.** "This week's shop, sorted." plus a
   box and three steps could front any box scheme in any county. Nothing on
   the screen is only true of Castle Farm.
2. **The strongest facts are absent.** 2008, the castle, the herd, the Old
   Spots, the Sunday 3pm cutoff, the named-town round — the entire
   recognition inventory is missing.
3. **Placeholder commerce reads as a broken shop.** Dead navigation ("Box
   deals", "Fruit & veg", "Butchery", "Groceries"), an inert "Basket · 0"
   and a "Start a box" that goes nowhere are the strikethrough-shelf failure
   in a new costume: controls that pretend to work are worse than none.
4. **There is no handoff to the live store anywhere.** For a concept whose
   whole honesty rests on "clarity, not a rebuild", forgetting the real shop
   exists undercuts the case. Every transaction control should either link
   to `castlefarmni.com` or not exist.
5. **The theatre is a still life, not a moment.** The faithful box
   visualisation is accurate but static; nothing shows what the box is
   *for*.

## The moves

Ordered by the recommended build sequence: voice first, then the essence
made visible, then theatre, then the keepable artifact.

### 1. Let the farm say its own sentence

Open the page on "Let us worry about digging it up." — quoted verbatim,
attributed to the farm's own site with its read date. Pair it with the two
dates: "Farmed by generations of the same family for hundreds of years · on
the web since 2008." Set the Castle Farm name in type; retire the cropped-
produce wordmark, which is nobody's mark. The first screen should make the
owner feel seen before it asks anyone to buy anything.

### 2. Put the weekly round on the page

The essence made visible is the round. A **This week's round** panel, drawn
only from the published schedule:

- The cutoff that matters today, computed from the visitor's clock: order by
  Sunday 3pm for the Tuesday–Thursday round, by Wednesday 3pm for
  Friday/Saturday — never an invented "order in the next 4 hours" pressure
  timer.
- The delivery days as the farm publishes them, each with a handful of its
  named towns and a route to the full schedule on the live site.
- The honest numbers: £40 local minimum, £76 outlying, £4 delivery at
  checkout, each carried with its read date and linked to the farm's
  delivery page rather than restated as the concept's own promise.
- A **Is your town on the round?** lookup against the published town list:
  type a town, get its delivery day. Every entry is a published fact, so the
  feature is honest by construction — and it is the one thing their own
  site, which lists towns in dense paragraphs, does not do.

This panel is the concept's working heart: it proves the studio read the
business, and it is genuinely more usable than the source.

### 3. Name the farm and the neighbours

The stock, in the farm's own two-source structure — **from this farm, and
from our neighbours**:

- From the farm: Mourne Aberdeen Angus beef, free-range Mourne lamb from the
  growing flock, Gloucestershire Old Spot pork, free-range eggs, potatoes
  and vegetables in season.
- From the neighbours: the small local producers the farm says it gives a
  platform to. Name only what the record names; do not invent a supplier
  roll-call.

Add the table end of the loop: the recipe blog's pairings (the bourguignon,
the cottage pie) as "this week's box, this week's dinner" — each recipe
linked to the live post. The box stops being inventory and becomes the
week's meals, which is what the customer actually buys.

### 4. Make the table the theatre

Replace the static box still with the moment the box is *for*: the week's
table laid from the box — the Angus joint, the eggs, the vegetables, the
yoghurt — composed in the concept's palette. One generation, reviewed
against the faithfulness boundary: no brands the farm does not stock, no
produce the season does not allow, the same disclosure chain as the current
plate (alt text, visible note, case-study Sources & limits, provenance in
the same commit). If the generation drifts toward produce the farm has never
sold, fall back to a drawn table plate rather than ship an appetising lie.

### 5. Draw the round as the keepable artifact

A hand-drawn **delivery-round plate** for the concept and the reverse of a
one-sheet: the farm beside Dundrum Castle at the centre, the four day-loops
around it — Tuesday northeast, Wednesday south, Thursday the peninsula,
Friday north — each carrying a selection of its named towns. This is the
piece the family keeps: their whole week's driving, drawn as one picture.
Only published geography; an "indicative · not a survey" disclosure; drawn
in the concept's palette; reviewed at phone width for clipped labels. Budget
it as its own session — it is a drawing, not a diagram, and dozens of towns
must be curated, not dumped.

### 6. Make every control honest

Replace every placeholder with a real destination or remove it:

- "Choose a produce box" / "Start a box" → the live box listings on
  `castlefarmni.com`.
- The category rail (Fruit & veg, Butchery, Grocery) → the matching live
  collections, or cut the rail.
- Delete "Basket · 0". A basket that never fills is theatre in the wrong
  register — the concept does not sell; it introduces.
- Delivery and prices → the farm's live delivery page, which stays the
  source of truth between re-verifications.

## Recommended bundles

- **First pass:** moves 1, 2 and 6 — their sentence, the round, the honest
  controls. All of it is data and links; no new imagery, and it turns the
  page from a poster into the farm's own front door.
- **Recognition pass:** move 3 — the herd, the flock, the Old Spots, the
  neighbours, the recipes.
- **Theatre session:** move 4, one generation with its review gate.
- **Keepable artifact:** move 5 as its own drawing session, then the
  one-sheet that takes the round on its reverse.

## Honesty constraints

- This is a clarity-and-story case on a working store, per the Buck's Head
  rule. The customer page never criticises the live site (the slideshow, the
  pop-ups, the stale seasonal categories all stay in the case study), and
  every transaction hands off to `castlefarmni.com`.
- Every figure — £40, £76, the £4 fee, the 3pm cutoffs, the £45 Medium Mixed
  Box if quoted — is carried with its read date and re-verified before any
  outreach. These are live business facts; the October 2025 archive already
  shows the local minimum moving from £36 to £40, so treat them as
  perishable.
- No invented stock: only the animals, crops and producers the farm
  publishes. No invented towns on the round, and no claiming a delivery day
  for a town the schedule does not list — the lookup must say "not on the
  published round; the farm asks you to contact them", which is what the
  farm itself says.
- The "approximately 50,000" bulletin figure is their claim: quote it as
  theirs ("they say"), with its source, or leave it out.
- Quotes are verbatim with read dates: "Let us worry about digging it up."
  and the castle-grounds line come from the farm's own pages, 4 August 2026.
- The public site stays AI-imagery-only (privacy decision, 31 July 2026);
  any new plate keeps the triple disclosure and a same-commit provenance
  entry. The current faithful box visualisation's disclosure chain stays
  attached to it.
- No studio-drawn crest: the farm's production wordmark leads if it is ever
  cleared; until then plain type carries the name.
- Any clock-driven panel respects `prefers-reduced-motion`, keeps focus
  visible, and works at the real 390px viewport; the cutoff panel must never
  shame or rush the visitor.
- Any change to the first viewport recaptures the comparison stills and clip
  in the same commit, per `docs/MEDIA_CAPTURE.md`.

## Tests that pin the elevation

- Assert "Let us worry about digging it up." reaches the first screen with
  its attribution, and both dates (hundreds of years / 2008) appear with it.
- Assert the round data lives in one data module with its read date, and the
  town lookup answers correctly for a fixed sample — Dundrum on four days,
  Kilkeel on Wednesday, Portaferry on Thursday, Bangor on Tuesday, Larne on
  Friday — and declines honestly for a town the schedule does not list.
- Assert every commerce control resolves to a `castlefarmni.com` URL and
  that no `data-concept-placeholder` or inert basket survives.
- Assert the minimums, fee and box price each appear at most once, each
  adjacent to their source link — no orphaned numbers.
- If the table plate lands, assert its disclosure chain; if the round plate
  lands, inspect at desktop and 390px for clipped labels and the indicative
  disclosure.
- Run the guest-voice guard and the publication checks; then the swap test:
  remove "Castle Farm" and the round, and if the page still works for any
  box scheme, the elevation has not gone far enough.

## Open decisions

- Does the £45 Medium Mixed Box stay quoted on the page (read-dated, and the
  only named product with a verified price) or does the page name the box
  and link out for the price? Prices are the most perishable content the
  farm publishes.
- Is the recipe pairing current enough to feature? The blog's posting
  cadence is unverified; read-dated and linked, it is honest either way.
- Does the 50,000-bulletin claim earn its place, attributed, or does it read
  as boasting the farm never asked the concept to make?
- Theatre composition: the week's table versus the box on the doorstep —
  decide at generation review, with the drawn-plate fallback.

## When a move ships

Record the source and read date for every new fact, add provenance for any
new asset in the same commit, update the case-study Sources & limits block,
and add journey coverage for new behaviour. Any move that changes the first
viewport recaptures the comparison stills and clip in the same commit. The
publication record already asks for two things this brief satisfies: a
sources note on the concept banner, and a second surface — the round panel
is that surface. Update this status line as moves land; do not call the
concept validated until an owner or representative visitor has supplied
that evidence.

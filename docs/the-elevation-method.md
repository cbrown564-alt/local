# The elevation method — finding the magic in any business

Written 31 July 2026. `docs/good-to-great-concept-elevation.md` is the hotel
instance of this method, written when Enniskeen was the only elevated
concept. The Scopers review showed the failure mode of applying it literally:
day-part heroes, estate maps and history bands are *place* moves, and a zero-
waste hot food bar has no place in that sense. Four derived briefs now exist —
`research/concepts/scopers/scopers-elevation-brief.md`, `research/concepts/bettys-butters/bettys-butters-elevation-brief.md`,
`research/concepts/donard-veterinary/donard-veterinary-elevation-brief.md`,
`research/concepts/mourne-cycles/mourne-cycles-elevation-brief.md` — and this document is the process
they were derived by, so the next concept does not need to rediscover it.

## What "great" is made of

A good concept demonstrates competence: correct information, honest handoffs,
a coherent palette. Great adds two things polish cannot provide:

- **Recognition** — the owner sees details only someone who studied *their*
  business would know. Recognition is attentiveness made visible; it is what
  makes an owner care, because it proves the concept was made for one
  business, not templated for ten.
- **Theatre** — one or two moments of surprise, in the register the business
  already trades in. Theatre is what gets the concept shown to a spouse, a
  partner, a regular.

Both are grounded in a third thing: **the essence** — the one claim that is
true of this business and of no competitor. The essence is usually a paradox
(the chef who cooked for the nation now judges his day in milk bread buns; a
shop whose shelf was never stocked; nine years old and still saying "newly
opened"; serious dealer credentials behind a gmail address). Find the paradox
and the angle is usually inside it.

Anything that is merely "nicer" is not elevation.

## The process

### 1. Inventory before ideas

Read everything verifiable before designing anything: `research/pipeline/verifications.json`,
the business's own site (all of it, including the footer and the stale copy),
their social captions, reviews if any exist, public record (Companies House,
recruitment ads, listings). List the raw materials under five heads:

- **Their voice** — the best sentence they ever wrote about themselves.
- **Their geography** — the place or patch the business is *of*.
- **Their ritual** — the mechanism, game or routine inside the business.
- **Their arc** — the dates and turns that got them here.
- **Their mark** — the visual identity they already own.

A thin inventory (Betty's: no owner name, no dates, no reviews) is itself a
finding — it tells you which heads the elevation may draw on, and where the
discipline is to make much of what exists rather than to add to it.

### 2. Name the shape, because the shape picks the register

Every move has a register, and the register comes from the shape of the
business, not from the studio's habits:

| Shape | Essence lives in | Theatre register | Worked example |
|---|---|---|---|
| Place (hotel, estate) | the grounds, the building | atmosphere — dusk windows | Enniskeen |
| Counter (food bar, café) | appetite and the week's rhythm | appetite — the steaming plate | Scopers |
| Product (jar, loaf, bottle) | the moment the product is *for* | the table — the melt | Betty's Butters |
| Care (vet, dental, clinic) | emotion under management | reassurance — the safety net | Donard Veterinary |
| Trade (bike shop, tool shop) | access and expertise | freedom — the ride | Mourne Cycles |

The wrong register is how you get hotel moves on a food bar. When unsure, ask:
what does the customer actually buy — a stay, a meal, a jar, relief, a ride?
The theatre is that thing, shown at its best moment.

### 3. The tests that find the magic

Apply each to the business; the answers are the moves.

- **The best-sentence test.** What is the best thing they ever said about
  themselves? "LBS to bike aficionados." "As pet owners ourselves we fully
  understand." "Carrots like you've never tasted them before." That sentence,
  quoted verbatim with its source named, is almost always a move — their
  words, art-directed, beat studio copy and prove attentiveness in one
  gesture.
- **The map test.** Every business has a geography: estate, larder,
  catchment, trails. A drawn map of it, indicative-disclosed and grounded
  only in what they publish, is the keepable artifact — the piece an owner
  holds onto. Budget it as its own session; it is a drawing, not a diagram.
- **The ritual test.** What game or mechanism runs inside the business? The
  supper club's secrecy. The phone that always finds a vet. "When it's gone,
  it's gone." Stage the ritual; do not merely report it.
- **The swap test.** Replace the business's name with a competitor's. Every
  element that survives intact is competence, not recognition. (The archived
  reviews ran this on Mourne Cycles: "nothing on the page is
  bike-shop-shaped.") Run it on your own draft before any reviewer does.
- **The feed test.** What does their current channel do well, and what can it
  not hold? Compete where the incumbent medium is weak — permanence,
  structure, ritual, the whole arc at once — and hand off honestly where it
  is strong: today's hours, this week's specials, live stock. Losing to the
  feed at its own game is how concepts end up with strikethrough shelves of
  invented product.
- **The owner test.** Who opens this link, when, on what device, and what do
  they want to be seen as? The Enniskeen owner opens at 21:00 on a phone and
  sees the windows lit. The Scopers owner wants the philosophy taken
  seriously. The vet wants the hardest conversation handled with care. Design
  the first screen for that person at that moment.

### 4. Build order

Recognition is cheaper than it looks; theatre is not. Ship in this order:

1. **Voice** (a pull-quote in their words) and the small editorial moves —
  hours, all recognition, no new assets.
2. **The essence made visible** — the zero-waste trace, the safety-net
  diagram, the range mapped to terrain. The move that turns the business's
  creed into something you can see.
3. **The theatre moment** — one hero, in the right register, with its
  mechanism built and tested before its assets arrive.
4. **The map**, alone, as its own session — then the one-sheet, which takes
  the map on its reverse.

### 5. Pin the magic

Every landed move gets a behavioural assertion in the journey suite, because
the elevation failures are invisible in code review: the clipped map label,
the cached build that drops a day-part variant, the swap that never fires.
If the moment of magic is not tested, it will quietly regress to good.

## The honesty boundary (applies to every move, every business)

- Every claim comes from `research/pipeline/verifications.json` or the business's own
  public words, with the read date recorded. Nothing invented for atmosphere:
  no owners the record does not name, no dates the business does not publish,
  no suppliers, farms, trails, reviews or past events conjured to fill a
  section.
- AI-imagery-only on the public site (privacy decision, 31 July 2026);
  businesses' own photographs are for personal outreach material. Withdrawn
  imagery stays withdrawn.
- Generated imagery keeps the triple disclosure: alt text, a visible line on
  the page, the case study's Sources & limits block — and a provenance entry
  in the same commit as the file.
- Illustrative content (flavours, prices, jobs boards) is labelled
  *prominently* — an 11px footnote under invented numbers is not honesty, it
  is cover. Illustrative numbers are the highest-risk content type: owners
  assume they are real.
- Unsourced inferences are landmines even when they sound safe: "made in
  small batches", "Sunday — Closed". If the record does not say it, the page
  does not say it.
- Prefer their real mark over a studio monogram, their real words over our
  paraphrase, their real mechanism over our invention. Elevation elevates
  what is there.

## Failure modes this method exists to prevent

- **Hotel moves on a food bar** — applying a previous elevation's moves by
  shape instead of by register. Derive from the inventory, every time.
- **The strikethrough shelf** — placeholder inventory that reads as deleted
  product. If you cannot show it honestly, do not show it; map it, quote it,
  or hand it off.
- **The generic chassis** — a concept that passes the swap test. Usually
  means the inventory was read but not mined: the voice, geography, ritual
  and arc were sitting in the sources unused.
- **Theatre in the wrong register** — spectacle where the business trades in
  reassurance, or appetite where it trades in trust. The register is the
  business's, not the studio's.
- **Magic that ships unpinned** — the one beautiful moment, asserted by no
  test, gone by the next refactor.

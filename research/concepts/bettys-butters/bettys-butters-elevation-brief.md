# Betty's Better Butters — elevation brief: from good to great, on its own terms

Written 31 July 2026, as part of the expansion of the elevation work beyond
`docs/good-to-great-concept-elevation.md` (hotel-shaped) and
`research/concepts/scopers/scopers-elevation-brief.md` (food-bar-shaped). The general method
these briefs follow is in `docs/the-elevation-method.md`.

**Status: all six moves shipped 31 July 2026; serving plates added 1 August
2026.** Imagery decision: AI-generated table-register plates for melt, treat
and staple (banner-disclosed); maker mark retained; source butter photograph
held for provenance. Comparison stills and clip need recapture
(docs/MEDIA_CAPTURE.md).

## The shape of this business

Neither a place nor a service — **a jar on a shelf**, and the shelf is the
whole story. The live site's defining fact is structural: the `/our-store`
page embeds an unconfigured Ecwid widget, behind copy that promises allergen
and serving information on "individual product pages" that cannot render. A
shop whose shelf was never stocked. The concept exists to close that gap, so
the elevation's centre of gravity is the range, made real enough to want.

The competition is not a feed (Scopers' problem) — Betty's Instagram is young
and thin. The competition is the supermarket shelf and the farmers'-market
stall: the concept must make a jar of butter feel like a considered purchase,
not a commodity.

## What recognition can draw on

The record is deliberately thin — no owner name anywhere, no dates, no
reviews (Google rating null), no premises story beyond the address. What is
verifiably available (`research/pipeline/verifications.json:568-585`):

- **Their own words**, verbatim from the live site, read 31 July 2026:
  "Bringing you restaurant quality flavours to the comfort of your own home";
  "flavoured butters using recipes collected from over 10 years in
  professional kitchens"; "a one off treat or a new staple ingredient of your
  kitchen".
- **The hand-drawn mountain-ring mark** — the Mournes above Dundrum, the only
  ownable visual identity, currently used once.
- **The delivery triangle** — collection, local delivery, or Royal Mail
  across the UK. A tiny Dundrum producer posting butter nationwide is
  genuinely charming and currently buried in a strip.
- **The empty-shelf paradox** itself — the gap is the pitch, and it is more
  concrete than "two-page builder site": the store copy even contains a live
  typo ("an be found").

Recognition here must come from the maker's voice, the mark, and the product
reality. Enniskeen-style moves via guests, reviews or history are impossible;
do not manufacture substitutes.

## The moves

Ordered by recommended build sequence.

### 1. The maker's voice, verbatim

Quote the founder copy directly — "recipes collected from over 10 years in
professional kitchens" — set large, attributed to the site it came from. The
concept currently paraphrases it into one lede sentence; the paraphrase is
weaker than the original and recognition lives in the original. The Scopers
move transfers directly, with the same rule: their words beat studio words.

### 2. The melt — theatre in the table register

Flavoured butter exists for one moment: the knob of Café de Paris melting
over a steak, maple & sea salt disappearing into hot toast. That moment is
the hero this concept does not have. Appetite, but in the *table* register —
home cooking elevated — not the counter register of the Scopers brief. A
day-part variant maps to meals rather than light: breakfast butter in the
morning, dinner butter in the evening. Imagery strategy needs one decision
first (see constraints): the concept today legitimately uses the business's
own butter photograph, which the AI-only rule elsewhere forbids.

### 3. "What it does to a Tuesday"

Their store copy promises serving suggestions it cannot deliver. Deliver
them: each flavour on the shelf paired with the ordinary weeknight plate it
transforms. This makes the illustrative range earn its place — the shelf
stops being four labelled placeholders and becomes an argument for what the
real range will look like when the maker stocks it. The four flavour names
stay illustrative and stay disclosed, exactly as now.

### 4. The treat→staple arc as architecture

They wrote the structure themselves: "a one off treat or a new staple
ingredient of your kitchen". Two registers already exist on the shelf —
Café de Paris is the treat; garlic & herb is the staple. Give the page that
spine: the dinner-party moment and the everyday jar, in their words.

### 5. The mark as a system

The mountain ring appears once. Ornaments between sections, a seal at the
foot, the favicon — the house-mark move with the honesty bonus that it is
their real mark, not a studio invention. Palette and motif extend from it,
not beside it.

### 6. The delivery triangle, told as charm

"Posted from 10 Main Street, Dundrum — collected at the door, delivered
locally, or sent by Royal Mail anywhere in the UK." One line, set like it
matters. It is the most specific true thing about the operation, and
specificity is what a new producer with no reviews has instead of
reputation.

## Honesty constraints

- **Fix first, before any move:** "made in small batches" in the strip
  (`src/pages/concepts/bettys-butters.astro:27`) appears nowhere in
  verifications or the live site. It slipped the publication check. Remove it
  or source it; nothing else in this brief should build on a page carrying an
  unsourced claim.
- No invented owner name, founding date, batch claims, farm or creamery
  sourcing, flavour backstories, or reviews. This business gives the studio
  less raw material than any other concept; the discipline is to make much of
  what exists, never to add to it.
- The four flavour names and their notes remain illustrative, disclosed three
  ways as now (banner note, per-jar pill, footnote). Any new flavour-adjacent
  copy inherits the same disclosure.
- **Imagery decision required:** this concept is the portfolio exception that
  reuses the business's own assets (mark + butter photograph, downloaded from
  their public homepage 27 July 2026, `research/image-provenance.md:61-66`).
  Move 2 either extends that exception with their photography (outreach-grade,
  withdrawal-on-request) or generates melt/table imagery under the AI-only
  rule with the standard triple disclosure. Decide explicitly; do not drift
  into a mixture.
- The placeholder-link strikethrough rendering (audit issue I2, 31 July 2026)
  reads as broken UI on the primary CTAs; fix with the portfolio-wide remedy
  before adding new sections that repeat the pattern.
- No prices, no stock claims, no "order now" behaviour — the real shop has no
  working checkout, and the concept's "Shop the range" stays an inert
  placeholder until outreach.

## When a move ships

Each landed move gets: provenance entries for any new file in the same
commit; the case study's Sources & limits block updated the same day; journey
coverage for any new behaviour; and a note in this file's status line. If
moves 2 or 3 restructure the hero or shelf, the comparison stills and clip
are recaptured in the same commit (docs/MEDIA_CAPTURE.md) — the fold will have
changed.

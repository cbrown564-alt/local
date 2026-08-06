# Shell elevation brief — Mourne Made's own website

Written 1 August 2026, after the concept portfolio clarified the studio's
positioning, vocabulary and product. The shell predates that clarity and was
built with little thought; this brief applies the studio's own elevation
method (`docs/the-elevation-method.md`) to Mourne Made itself, the way the
concept briefs apply it to one business.

Decisions already made (brainstorm, 1 August 2026):

- **Primary arrival: cold strangers.** The claim door (one-sheet recipients)
  is real but secondary — it never outranks the free before-and-after offer.
- **The town coverage map is the theatre.** A drawn map of Dundrum and
  Newcastle with every public transformation pinned is the shell's keepable
  artifact — the studio's equivalent of the Enniskeen estate map.
- **Directions A and B only.** A: the shell is treated as the studio's own
  flagship concept. B: two doors — request for the cold stranger, claim for
  the business that finds itself already made. Direction C (studio-wide
  "show your workings" voice) is rejected: the existing three-layer honesty
  labelling stays exactly where it is, on the transformation pages, and the
  shell makes no new loud statements about what the studio lacks.
- **One generic survivor gets elevated, not cut.** The Mourne photo band is
  elevated by merging it into the map band (see move 3). The numbered
  "How it works" strip is cut; its three honest facts fold into the closing
  CTA as plain sentences.

## The diagnosis

Run the studio's own tests on the current homepage:

- **Swap test: fails.** "Fancy a digital makeover? / Same business. Better
  first impression." survives a name swap with any web studio anywhere. By
  the method's definition the current hero is a generic chassis.
- **Vocabulary test: fails.** `docs/CONTEXT.md` owns concept, transformation,
  before-and-after, claim. The homepage uses none of them; "makeover" is not
  in the vocabulary and describes a service the studio does not sell.
- **Register test: fails.** A cold local owner is buying confidence that the
  studio understands their place and will not waste their time — a
  proof/attentiveness register. The current page's moments are place
  atmosphere (the photo band) and landing-page mechanics (the numbered
  strip); neither is in that register.

## The essence

The paradox the headline must live inside: **the portfolio is full of work
nobody asked for, and that is the point.** The studio builds your website
before you ask, free, and lets you judge it before anyone asks you for
anything.

Inventory, per the method's five heads:

- **Voice:** "It shows the change before asking the business to buy."
  (PRODUCT.md positioning)
- **Geography:** Dundrum and Newcastle — real streets, real named
  businesses, the census
- **Ritual:** the before/after reveal; the drag handle
- **Arc:** census → verification → uncommissioned concept → independent
  review → publication, each step dated
- **Mark:** the side-tab stamp; gorse tab

## The owner test

A cold stranger arrives skeptical, most likely on a phone, most likely from
a local Facebook group or a neighbour's mention. The first screen must
answer two questions in seconds: *is this for businesses like mine, here?*
and *is this real?* Town names and the live reveal answer both. Everything
else is supporting cast.

## The moves

### 1. The reveal performs the offer (theatre, proof register)

The hero stays product-led — the featured transformation's before/after —
but it now *performs*: the comparison arrives fully "before" and sweeps
once to "after" on load, then leaves the drag handle inviting touch. The
page demonstrates the offer before a word of explanation, which is also
PRODUCT.md's first design principle.

- The sweep is a short, single, eased animation; `prefers-reduced-motion`
  shows the settled mid-split state with no motion.
- The comparison remains keyboard-operable; the sweep never steals focus
  or moves the handle out from under a pointer already dragging.
- Headline lives in the paradox. Working candidates, to be settled in
  copy review:
  - "We've already started."
  - "Your business, before and after — before you've asked."
  - "See what your business could look like online. We built it first."
  The lede names the place and the offer in vocabulary terms:
  "Free before-and-after concepts for businesses around Dundrum and
  Newcastle."
- Primary CTA stays `Request a free before-and-after`. The claim door
  appears here only as a quiet text link (see move 4).

### 2. Recognition strip: real names, real thumbnails

The portfolio presence on the homepage becomes visual: a strip of public
transformations as thumbnails with the business's name and town — never
the studio's chrome (review bold idea 6, accepted). A visual product
deserves a visual portfolio, and a skeptical stranger recognises businesses
they know faster than they read sentences. The count stays honest and dated
("independently reviewed" with the review date), driven by
`publicTransformationSlugs` as today.

### 3. The town map, elevated from the photo band (theatre, the keepable artifact)

The "Rooted here / Made here, for here" photo band is the survivor that
gets elevated: it becomes a drawn map of Dundrum and Newcastle with every
public transformation pinned at its street. The shore photograph may
survive only as texture inside the map's sea — the band's job ("this
studio is *of* this place") is now done by something only this studio
could have made.

- This is a drawing, not a diagram: budget it as its own session, per the
  method's map test and the Enniskeen lesson (clipped labels are invisible
  in code review — look at it).
- The map must not read as an unattended directory (PRODUCT.md's warning
  about shared discovery). Pins are proof of concept work, each linking to
  its transformation; the map lists nothing else — no hours, no contact
  details, no businesses without a public transformation.
- Pins are generated from `publicTransformationSlugs` plus a
  town/street coordinate per record, so a new public transformation
  appears on the map without hand-editing; the build fails if a public
  slug has no pin.
- Carry the map's own disclosure convention ("indicative · not a survey"
  equivalent) in line with the Enniskeen estate map.

### 4. Two doors, one clearly smaller

The vocabulary defines two arrivals; the shell now admits both without
dividing the stranger's attention:

- **Cold door (primary):** request a free before-and-after — hero CTA and
  closing CTA, unchanged in weight.
- **Claim door (secondary):** a quiet line near the hero and on the
  transformations index: "We've already made some of these. If one is
  yours, it's yours." It leads to `/transformations/` and the pre-filled
  claim action that `ConceptLayout` already provides. The claim door never
  gets a button on the homepage hero.

To serve "find yours" instantly, `/transformations/` becomes browsable by
town with the same thumbnails as the homepage strip.

### 5. Cut the numbered strip

"Three steps, no pressure. 01 / 02 / 03" is landing-page furniture: its
facts are true but its shape is the generic chassis this brief exists to
remove. The three facts survive as plain sentences beside the closing CTA
("Tell us about your business. We build one before-and-after. You decide
in your own time."), where they read as reassurance, not process theatre.

### 6. Keep, untouched

- The `BeforeAfter` mechanic and its disclosure footer
- The community commitment section ("Good websites shouldn't only go to
  those who can pay.") and `/about/`
- The request page, privacy notice, and all existing honesty labelling
- `LocalStrip` and `MourneMotif`, unless the map band absorbs their role —
  decided when the map lands

## What the shell does not do

- No studio-wide sourcing blocks, no "no client results yet" statements
  (Direction C, rejected). The transformation pages keep their existing
  Sources & limits; the homepage makes no claims that need one.
- No invented testimonials, client logos or results. None exist; the
  honesty boundary in `docs/the-elevation-method.md` applies to the shell
  exactly as it does to a concept.
- No dashboard theatre, no automation imagery, no SaaS cadence
  (PRODUCT.md anti-references).
- The map never becomes a business directory (move 3 constraint).

## Build order

Per the method — voice first, mechanism before assets, the map alone:

1. **Copy and doors.** New headline and lede, claim-door line, steps-strip
   removal, CTA-section sentences. No new assets; immediately reviewable
   against the swap test.
2. **The reveal sweep.** Build and test the mechanism with the existing
   featured comparison before touching anything visual. Pin it: a journey
   assertion that the sweep runs (and that reduced-motion settles) — the
   magic is unpinned otherwise.
3. **Transformations by town + thumbnails.** Index and homepage strip;
   data shape for town/street coordinates lands here, ready for the map.
4. **The town map.** Its own session, like every map. Photo band absorbed;
   pins generated from the public slug list; build check for pin coverage.
5. **Homepage recomposition.** Order, spacing and motion polish once the
   pieces exist.

## Tests that pin the magic

- Journey assertion: the hero sweep completes and the handle is
  interactive afterwards; with reduced-motion forced, the comparison
  renders settled.
- Build check: every `publicTransformationSlugs` entry has a map pin and
  an index thumbnail; a new public transformation cannot ship invisible.
- The swap test, run by hand on the final homepage copy before
  publication — the same test the concepts face.
- `pnpm test:concepts` and the reviewed-journeys suite must stay green;
  the shell changes touch no concept page. **Both were retired on 4 August
  2026** (`PLAN.md` section 1c). Until something replaces them, "touches no
  concept page" is an argument rather than a checked fact, and the nine
  per-page pins are what is left to lean on.

## Open questions

- Final headline: the three candidates in move 1 need a decision in copy
  review.
- Does the shore photograph survive inside the map's sea, or retire with
  the band? Decide when the map drawing exists to compare against.
- `LocalStrip` and `MourneMotif`: keep alongside the map band or absorbed
  by it — decided at move 5.

## What shipped (1 August 2026)

All five build-order steps landed in one session:

1. **Copy and doors.** Headline "See what your business could look like
   online." (chosen from the candidates) with the lede "We built it first
   — a free before-and-after concept, made for your business before you
   ask." Claim door: a quiet hero text link, "We've already made some
   local concepts — if one is yours, it's yours.", plus a matching line
   on `/transformations/`. The numbered strip is cut; its three facts
   stand as plain sentences at the closing CTA. The archived steps CSS
   moved to `home-alternatives.css` for the prototype that still uses it.
2. **The reveal sweep.** `BeforeAfter` gained a `sweep` prop: the hero
   comparison arms at full "before", sweeps once to the resting split,
   cancels on any user takeover, and renders settled under
   `prefers-reduced-motion`. SSR stays at the settled split, so no-JS,
   crawlers, print and capture are untouched. Was pinned by
   `tools/test/test-shell-home.mjs` (`pnpm test:shell-home`), retired on
   4 August 2026 with nothing in its place (`PLAN.md` section 1c). The same
   suite held the homepage claim-door link, which had already gone missing
   once — see section 1b item 1.
3. **Transformations by town + thumbnails.** `/transformations/` already
   filtered by town with image cards; the homepage `LocalStrip` is now a
   visual rail of the public transformations (thumbnail, name, town), and
   each record carries an optional `pin` coordinate.
4. **The town map.** `src/site/components/TownMap.astro` — a drawn,
   indicative map (castle keep, Murlough, the bay, Mourne ridges, coast
   road) with a gorse pin per public transformation; hover/focus name
   chips; "indicative · not a survey" disclosure. The photo band was
   absorbed: the shore photograph retired from the band (it did not
   survive into the map's sea — open question resolved), and the map
   throws at build if a public slug has no pin (verified: removing the
   Cúpla pin fails the build and names the slug).
5. **Recomposition.** Hero → recognition rail → town map → closing CTA →
   community commitment. `MourneMotif` stays as the divider after the
   map; `LocalStrip` kept and elevated rather than absorbed.

Decisions recorded: cold strangers are the primary arrival, so the claim
door never outranks the request CTA; the map pins link to transformations
only and list nothing else, so the map cannot drift into a directory.

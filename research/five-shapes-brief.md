# `/five-shapes/` — a pattern book, not a template gallery

*Written 6 August 2026. Sibling of
[`what-we-look-for-brief.md`](what-we-look-for-brief.md) — the third of the
three approaches mapped in
[`three-ways-to-describe-the-work.md`](three-ways-to-describe-the-work.md).
This is the public surface for the shape → register table in
[`docs/the-elevation-method.md`](../docs/the-elevation-method.md), the way the
fault walk is the public surface for the fault taxonomy.*

## The name does the tonal work

Not `/templates/` — the word promises something to pick, pay for and fill in,
and "templated for ten" is precisely the accusation the swap test makes. Not
`/examples/` — vague, and it invites reading the plates as portfolio. Not
`/styles/` — the five shapes differ by *task*, not by decoration, and a style
word concedes the aesthetic framing the whole method refuses. **Five shapes**
is countable and concrete, the natural sibling of *five things we look for* —
and the smallness of the number does the anti-template work by itself. Nobody
mistakes five for a catalogue.

Working headline: **There is no standard website.** Subhead: five shapes a
local site takes, drawn and annotated — what the customer buys decides the
shape.

## The device: a pattern book

**Recommendation: five drawn plates, one per shape, annotated in a single
hand, answering the same five questions.**

The genre is the architectural pattern book or the field guide — not the
template gallery grid. Each plate is one wireframe in the same grey grammar as
the fault walk's mocks, but *annotated*: leader lines to the parts that
matter, notes in a drawn hand, the way a surveyor marks up an elevation. The
plates are for reading, not choosing.

The five shapes are the elevation method's, verbatim: **a place, a counter
business, a product, a care practice, a trade.** Each plate answers the same
five questions, and the parallel structure is the argument — because
everything else is held constant, the differences that remain are exactly the
differences the business forces. The questions, each traceable to a test in
the method:

1. **What does the customer buy?** A stay, a meal, a jar, relief, a ride.
   Every other line on the plate follows from this one.
2. **What is the first screen for?** The owner test: who arrives, when, on
   what device, wanting what.
3. **What does the action ask?** The mechanism, not the word — what two or
   three things the visitor states, and what they get back.
4. **What must stay current, and where does that live?** The feed test made
   visible: the handoff is drawn on the plate, not hidden in it.
5. **What is worth staging?** The one theatre moment the register allows.

The differentiating answers, from the method's own table:

| Shape | The first screen answers | The action asks | Theatre register |
| --- | --- | --- | --- |
| A place | is this where I want to wake up? | dates and party size | atmosphere — the dusk windows |
| A counter business | what's on today, and until when? | nothing — it shows the week and the walk-in | appetite — the steaming plate |
| A product | when would I open this? | where to find it near you | the table — the melt |
| A care practice | can they see us, and soon? | who needs seen and when — with the emergency route unmissable | reassurance — the safety net |
| A trade | do they know their stuff, and can they fix mine? | the job and the week you need it | freedom — the ride |

Each plate closes with **we drew one of these** — one to three links into the
public transformations of that shape, independent-concept label intact. The
worked examples already exist: the method was derived across all five shapes,
so no plate needs a hypothetical.

## Four rules that keep it a pattern book, not a shop

1. **Nothing is choosable, priced or downloadable.** No plate carries a
   "start here". The close asks for a link to the visitor's own site, not a
   pick from the five.
2. **Wireframe and annotation only — nothing to covet.** A template gallery
   sells finishes; this page sells reasons. The moment a plate acquires a
   palette or a typeface it starts making the aesthetic argument the method
   disowns ("anything that is merely nicer is not elevation" has to be true of
   the marketing too).
3. **One drawn hand across all five.** Same stroke, same grey, same annotation
   lettering, so the eye reads difference as *meaning* rather than as
   house-style variety. Five plates that are mostly the same, differing
   exactly where the business differs, is the whole page in one glance.
4. **The misfit panel is not optional.** A sixth panel after the five: some
   businesses straddle two shapes (a gallery sells product and is a place; a
   farm shop is counter and product at once), and some are none of the five (a
   chamber, a club, a charity). The shapes are a reading aid, and naming yours
   is our job — not a form the owner fills in. This panel is what stops the
   page reading as a quiz.

## The one interactive, budgeted at possibly zero

**The wrong-register control.** Seat another shape's first screen onto this
plate and watch it answer the wrong question — the care practice opening on
dusk atmosphere while the visitor arrived worried; the counter business
opening on heritage while the visitor is hungry now. One line names the
failure. It is the method's own failure mode — hotel moves on a food bar —
made feelable, and it is this page's version of the swap test: shapes do not
swap.

But the page must be complete without it, and the care plate is the wrong
place to stage worry theatrically. If the control survives the prototype at
all, it goes on the counter plate only — the least sensitive register — and it
never touches care.

## Numbers and honesty

- Annotations state what the shape *needs*, never how common anything is. The
  prevalence prohibition propagates here as everywhere: no "most cafés…", no
  tallies read as statistics about the world.
- No claim about any named business appears on a plate. The worked-example
  links carry the claims, on the pages built to hold them.
- Worked-example links go only to public transformations, asserted against
  `publicTransformationSlugs` at build time, so a withdrawn concept fails the
  build rather than shipping a dead link — the same contract the one-sheet QR
  destinations already have.
- The plates are drawn — CSS and SVG. No provenance entries, no disclosures.
  If a plate ever wants generated imagery, the answer is no: a generated
  "ideal site" photograph is the template gallery this page exists not to be.

## Degradation

Static-first by design — the plates *are* the settled state, so reduced motion
costs nothing. Every annotation is real DOM text, present without JS; if
notes reveal on hover or tap at desktop, the full set is still readable in
sequence underneath. The phone layout is designed, not fallen back to:
marginalia is a desktop genre (leader lines need width), so at phone size the
notes become a numbered key beneath the plate, in reading order.

## Page structure

```
1  Opening      There is no standard website. Five shapes, and what the
                customer buys decides which one a business needs.

2  The plates   Place, counter, product, care, trade. Each: the drawn
                plate, the five answers, → we drew one of these.

3  The misfit   Some businesses are two of these. Some are none. Naming
   panel        the shape is our job.

4  Close        → /request/. Send the link — you don't need to know your
                shape; spotting it is the first thing we do.
```

Request path wins on attention weight: five plates and one optional control is
already a full page, so the close is the heaviest element and nothing
self-advances.

## Build notes

- `/prototypes/` first, per the house convention — the plate layout and the
  annotation treatment need a study before a public route.
- One plate component, five data entries (`shape`, `buys`, `firstScreen`,
  `action`, `handoff`, `theatre`, `exampleSlugs[]`). Five bespoke plates would
  be five bespoke drifts.
- Data completeness is a test: a plate missing any of the five answers fails,
  and `exampleSlugs` are checked against `publicTransformationSlugs`.
- The Q&A structure is semantic — definition lists or headed sections, not
  positioned text — so a screen reader gets the same parallel structure a
  sighted visitor gets.
- Shape labels reuse the fault walk's exact wording (*a counter business*, *a
  place*…) so the two pages teach one vocabulary.

## Open questions

- Five plates at launch, or three? Five is the taxonomy, but it is five
  drawings. Fallback: place, counter and care — the three most distinct
  registers — with product and trade following once the plate component has
  settled.
- Does the wrong-register control earn its weight, or does it steal attention
  from the close? Prototype decides; the page ships without it if in doubt.
- The plates share the fault walk's wireframe grammar — should they be visibly
  better-finished than the fault mocks, to read as "the good version"? Risk:
  finishing them starts the aesthetic argument rule 2 forbids.
- Does the care plate need its own tone review before shipping? Emotion under
  management is the one register where a wireframe annotation can read as
  glib.
- Do the plates need names beyond the shape nouns, or is *a care practice*
  already the right amount of specificity for an owner scanning for
  themselves?

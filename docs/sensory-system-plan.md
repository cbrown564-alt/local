# Sensory system — implementation plan

Written 4 August 2026. The survey that produced the ideas, and the case for and
against each, is `research/sensory-system.md`. The eight working miniatures are
at `/prototypes/showcase/` (`src/site/scripts/showcase-demos.ts`).

Six of the eight are approved to build: **03 Rebuild, 05 Voice, 01 Ridgeline,
07 Film, 02 Depth, 04 Lights**. Not approved: 06 Tideline (no real tide data;
see "Held" below) and 08 Weather (nice-to-have, no case).

**This runs in parallel with `PLAN.md` sections 3 and 4.** It is not sequenced
behind the first outreach conversations. Two constraints survive that decision,
because they are about consent and evidence rather than ordering:

- **Nothing generated about a business without its agreement.** Phase 4 (Film)
  and phase 5b (splat capture) depict a real premises, and need that business's
  written agreement before generation, not before publication.
- **Nothing that claims a result we have not produced.** Anything whose meaning
  depends on a completed pilot waits for one. See phase 0, question 5.

And one standing precedence: `PLAN.md` section 3 protects the request path. If
work here ever competes with that path for attention or for page weight, that
path wins.

## What the prototypes are and are not

The tiles are proofs of *mechanism* at 340px. They are not proofs of
*product*. Two of the six have no agreed end product at all:

- **01 Ridgeline** — the mechanism (real skyline, drawn, walkable) is proven.
  Where it lives on a page, at what size, and what it does when the reader
  scrolls, is undecided.
- **04 Lights** — the mechanism (379 businesses at real coordinates, lit and
  dark) is proven. Whether it is a footer band, a full section, or a moment
  that fires once, is undecided.

The other four have a clear target surface and need production quality rather
than a design answer. So this plan runs in two stages: **resolve the two
unknowns first**, then build in priority order.

## Phase 0 — resolve Ridgeline and Lights (design, not code)

Do this before writing any production component. Output is a decision recorded
here, not a prototype.

### The proposal: they are one artefact, not two

Ridgeline and Lights are the same picture drawn twice. The skyline is the
horizon; the businesses are the lights beneath it. Built separately they are
two tricks; built together they are one image of the place we work in — the
Mournes above, the town below, our own review data as the lights.

Proposed component: **`Shore`** — one canvas, one data path (terrain +
`businesses.json`), rendered at three scales:

| Scale | Where | What it does |
|---|---|---|
| `band` | Footer of every page, ~120px tall | Static horizon, lights settled. No animation after first paint. |
| `rule` | Section divider, ~28px tall | Skyline only, no lights. Fills left-to-right with scroll progress. |
| `stage` | `/about/`, request confirmation, ~50vh | Full: horizon, lights arriving, the count in real text beside it. |

One component, one budget, one accessibility story. A reader meets the same
image at three weights as they move through the site, which is what makes it a
house style rather than a set of effects.

### Decide before building

1. **Is `Shore` right, or do Ridgeline and Lights stay separate?** If separate,
   both need their own surface decision and this plan gains a step.
2. **Does the footer band animate at all?** Recommendation: no. A footer that
   moves on every page is a tax on every page.
3. **Does `rule` track scroll, or is it static?** Scroll-tracking is the whole
   idea of Ridgeline; it is also the thing most likely to feel like decoration
   pretending to be a control. Test it on one page before adopting it on all.
4. **What does the `stage` scale say in text?** The count must be real prose
   near the image, not a caption inside it — the claim has to survive with the
   canvas switched off.
5. **What fires on request confirmation?** The intended moment: one more light
   comes on, for them. Decide whether that is honest before we have actually
   built them anything. Recommendation: it is not. Hold it until a pilot
   completes, then it is true.

### How to resolve it

Build the three scales as static SVG or PNG comps at real page width, drop them
into a copy of the live homepage, footer and `/about/`, and look at them on a
phone. Do not build the component to find out. Record the decision in this file
and in an ADR if `Shore` is adopted, because it becomes a sitewide dependency.

**Gate:** Phase 0 is complete when the surface, scale and motion of every place
`Shore` appears is written down here.

## Phase 1 — 03 Rebuild — **built, 5 August 2026**

The highest-value, lowest-risk item. Build first.

**As built.** `RebuildStage.astro` (drop-in for `BeforeAfter`) on the homepage
proof fold and every `/transformations/<slug>/` opener;
`src/site/scripts/rebuild-stage.ts` for the renderer,
`src/site/scripts/motion.ts` for the scheduler, `src/site/styles/rebuild.css`.
Checked by `pnpm test:rebuild`, which runs inside `pnpm test`.

Three things went differently from the sketch above:

- **No second image download.** The canvas draws the frames from the `<img>`
  elements already in the page rather than loading its own copies, so the
  effect adds no bytes to the comparison it decorates.
- **The build and the sweep are one move.** The comparison arrives fully
  *before*; the build plays over it; when the build lands on the concept the
  canvas fades onto identical pixels and the existing sweep then opens the
  split to 50%, which is what tells the reader the handle is theirs. The
  canvas fires `rebuild:settled` even when it cannot draw at all, so a broken
  image or a missing 2D context can never strand the page on *before*.
- **Settled state is the comparison at 50%, not the after frame alone.** Under
  reduced motion no canvas is created and the page is exactly the comparison as
  it was: after image present, static, handle in the middle. Ending on the
  after frame alone would put the handle against the left edge with nothing to
  suggest dragging it.

Measured, not assumed: scheduler and renderer together are **1.34KB gzipped**,
and the stage records **zero** layout shift where it previously recorded ~0.019
— sweeping the split used to move `.comparison-divider` through `left`, a
layout property, and it now moves through a transform.

Still open: the concept comparison (`MotionCompare`) is untouched. It compares
two *videos*, not two stills, so the tile build does not transfer to it as-is.

**What it is.** The before/after handover as a build: the current site comes
apart in tiles on a diagonal, the concept lands in its place. Replaces the
passive state of the comparison, not the comparison itself.

**Where.** Homepage proof fold (`HomeProofStage`), every
`/transformations/<slug>/` opener, and the concept comparison
(`BeforeAfter` / `MotionCompare`).

**Build.**

1. Extract the tile-wave renderer from `showcase-demos.ts` into
   `src/site/scripts/rebuild-stage.ts`, and a `RebuildStage.astro` component
   taking the same props the existing comparison components take
   (`before`, `after`, alts, name, town, href).
2. It runs once when scrolled into view, then holds on the after state. It does
   not loop on a real page — the loop in the prototype exists so the tile is
   alive in a grid.
3. **The manual compare stays.** The drag handle sits beneath or after the
   animation and is the only thing that exists under reduced motion, which
   gets the after frame and the handle, no build.
4. Both images keep their real `alt`. The canvas is `aria-hidden`; the
   underlying `<img>` pair remains in the DOM for search, print and no-JS.

**Acceptance.**

- No layout shift: the canvas occupies the same box as the current stage.
- First frame is the *before* image, so a reader who arrives mid-scroll never
  sees the concept without its counterpart.
- Under reduced motion, no build plays and the after image is shown settled.
- Passes `pnpm test:shell-home` with the claim-door link still in the hero.

**Check.** Extend the homepage shell test to assert the `<img>` pair and the
manual compare control both exist when the canvas is present.

## Phase 2 — 05 Voice

Highest emotional return. Build second, on one concept, and show it to a real
owner before extending it.

**What it is.** A narrated walkthrough of a concept, in a synthetic voice, with
the page lighting up as the voice reaches each part, full captions, and a
readable transcript.

**Build.**

1. **Script per concept**, written by hand into
   `research/concepts/<slug>/narration.md`. It is guest-visible copy: it must
   pass `tools/check/check-concept-guest-voice.mjs`, so it speaks as the
   business and never narrates the studio, the concept or the method. It may
   not make a claim the concept page does not already make.
2. **Generation pipeline** — `tools/pipeline/generate-narration.mjs`, calling
   `POST /v1/text-to-speech/{voice_id}/with-timestamps`. That endpoint returns
   `audio_base64` plus character-level `alignment`
   (`character_start_times_seconds` / `..._end_times_seconds`), which is what
   makes the caption and focus timings exact instead of hand-tuned. The MCP
   tool used for the prototype does not return alignment; do not build on it.
   Outputs: `public/media/concepts/<slug>/<slug>-narration.mp3` and
   `research/concepts/<slug>/narration.json` (script, cue list, voice id,
   model id, generation date).
3. **Component** — `ConceptNarration.astro`: play control, live caption,
   focus target per cue, and a `<details>` transcript that is in the DOM
   whether or not the audio ever loads. `preload="none"`. Never autoplay.
4. **Disclosure.** The voice is synthetic and must be described as such on the
   page, in the visible layer, not only in an aria-label — the same standard
   `docs/CONCEPT_DESIGN_REVIEW.md` applies to generated imagery. Record every
   generated file in `research/image-provenance.md`.
5. **Voice choice.** The prototype uses "Irish Cultural Guide"
   (`NPWroowF4phQhaPWjXPj`). Do not adopt it by default. Generate the same
   script in three voices and play them to two local people before choosing.
   A synthetic accent that is nearly right is worse than a neutral one.

**Acceptance.**

- Page is fully usable and complete with sound off and JavaScript off.
- Captions carry every word; transcript matches the audio exactly.
- No audio element begins loading before the reader asks for it.
- Script passes the guest-voice check and contains no claim absent from the
  page.

**Check.** `pnpm test:narration` — for each concept with a narration file:
the mp3 exists, `narration.json` cue text matches the rendered captions, the
provenance entry exists, and the page carries a visible synthetic-voice
disclosure.

**Stop condition.** If the first owner reacts to the voice as a gimmick or a
fake, stop at one and do not roll it out.

## Phase 3 — 01 + 04 Shore (Ridgeline and Lights)

Build only after Phase 0 has produced a written surface decision.

**Build.**

1. `src/site/scripts/shore.ts` — one renderer, `scale: "band" | "rule" |
   "stage"`. Skyline profile precomputed at build time into a small typed array
   rather than derived from the 50k-point terrain grid in the client; the
   client bundle should carry a profile of ~200 numbers, not the grid.
2. Business points continue to arrive as a JSON script tag from the page, and
   only the fields the picture needs (`lat`, `lon`, `lit`). Never the names.
3. `Shore.astro` renders the canvas plus the real prose claim beside it.
4. Footer usage paints once and stops.

**Acceptance.**

- Bundle cost of the terrain profile is under 2KB.
- The count in prose is derived from the same array the canvas draws, so they
  cannot disagree.
- Reduced motion: settled frame, no arrival animation.
- No dark point is ever labelled, hoverable, or otherwise identifiable. This is
  a hard rule, not a preference — the image is a map of who is behind.

**Check.** Extend `pnpm test:prose-counts` to cover any count rendered beside a
`Shore`, so a stale prose number fails the build the same way the transformation
counts do.

## Phase 4 — 07 Film

Highest risk item on the list. One business, with consent, before any second.

**Build.**

1. Extend `tools/pipeline/assemble-hero-film.mjs` to a per-business target:
   one six-second establishing shot, generated from the business's own
   reference photographs, output to
   `public/media/concepts/<slug>/<slug>-establishing.{mp4,webm}` with poster.
2. **On-frame label, every time.** A generated moving image of a real business
   is a picture of something that did not happen. Follow the Dundrum Inn
   precedent: visible on-frame disclosure, matching aria-label, provenance
   entry.
3. **Close the stand-in hole.** Today, "stand-ins must never deploy" is
   discipline, not a guard. Add a check that fails the build when a `.demo`
   marker exists for any film referenced from `src/`. Do this in Phase 4 even
   if no per-business film ships, because the hole is already open on the
   town films.
4. Mobile gets the poster, not the film, unless measurement says otherwise.

**Acceptance.**

- Disclosure is visible in the first viewport on phone and desktop, not below
  the fold.
- Owner has seen the film and agreed to it before it is published.
- Poster LCP is no worse than the still it replaces.

**Check.** `pnpm test:film-provenance` — every film referenced from `src/` has
a provenance entry, an on-frame disclosure and no `.demo` marker.

## Phase 5 — 02 Depth

The sleeper. Two stages, and the second may never be needed.

**5a — depth-map stills.** Generate a depth map per hero photograph, store it
as `<stem>-depth.webp` beside the master, and drive the band offsets from it
rather than from screen position. `DepthStill.astro` falls back to
`ResponsiveImage` when the depth map, WebGL or motion budget is missing.
Regenerated by `pnpm optimize:media` alongside the other derivatives.

**5b — Gaussian splat capture.** For a business worth the trip — a hotel,
restaurant or venue — capture the real frontage on a phone and render it with
[Spark](https://sparkjs.dev/) (three.js, WebGL2, already a dependency).
This is the only item on the list that is photographic truth rather than
generated fiction, which makes it the *least* risky thing to show and the most
convincing. Gate it on: a business that has agreed, a scene under 8MB
streamed, and a still fallback.

**Acceptance.**

- No hero regresses on LCP; the still is what loads first in every case.
- Reduced motion gets the flat photograph.
- A splat of a real premises is photography and is credited as such — it is
  not generated, and must not be labelled as if it were.

## Cross-cutting requirements

These apply to every phase and should be built once, in Phase 1.

1. **One scheduler.** A single module owns "is this on screen, is motion
   allowed, is the tab visible" and every effect registers with it. Two canvases
   must never both hold a rAF loop on the same screen. **Built:**
   `src/site/scripts/motion.ts`. Later phases register with it rather than
   calling `requestAnimationFrame` themselves.
2. **Budget.** No more than one animating canvas in the first viewport. Total
   added JavaScript for the whole system under 25KB gzipped, terrain profile
   included. Measure, do not assume. **Spent so far: 1.34KB** (scheduler and
   03 Rebuild).
3. **Reduced motion is a first-class state**, not a disable switch: every
   effect has a designed settled frame. The prototype already found the trap —
   a `ResizeObserver` firing after the single settled paint wipes the canvas.
4. **No-JS and no-WebGL paths** are the real page. Every canvas is decorative
   and `aria-hidden`; the meaning lives in the DOM beneath it.
5. **Nothing claims more than the dataset supports.** Counts come from the data
   they draw; generated media is labelled on the frame; synthetic voice is
   disclosed in the visible layer.
6. **Internal prototypes stay noindex** and are covered by `PLAN.md` section
   6.5 — move `/prototypes/` to dev-only or protected hosting before any
   broader public campaign.

## Sequencing and gates

Phases 0 and 1 can both start now, and are independent of each other: phase 0
is design work on paper, phase 1 is code. Nothing here is gated on the outreach
wave.

| Phase | Item | Gate to start |
|---|---|---|
| 0 | Shore design resolution | None — start now |
| 1 | 03 Rebuild | ~~None~~ **built 5 August 2026** |
| 2 | 05 Voice | Phase 1 shipped and stable |
| 3 | 01 + 04 Shore | Phase 0 decision written down |
| 4 | 07 Film | A business has agreed, in writing, to a generated film of itself |
| 5a | 02 Depth stills | Phases 1–3 shipped |
| 5b | 02 Splat capture | A business worth the trip has agreed |

The two consent gates (4 and 5b) are the only ones that depend on a
conversation, and either could open early — a business that agrees during the
first outreach wave unblocks its phase that day, regardless of where the rest
of this plan has reached.

## Held

- **06 Tideline.** Held until it reads a published tide table for Dundrum Bay,
  baked at build time. The prototype uses a 12h25m harmonic, which is the shape
  of a tide and not the tide, and the site does not publish shapes as facts.
  The time-of-day palette is separable and could be adopted without the tide.
- **08 Weather.** No case beyond that it looks good. Revisit only if the
  typography work in `PLAN.md` section 6.3 wants a signature.

## What would make us stop

- An owner reads any of it as expensive. The work has to signal *craft*, not
  budget; a site that looks costly makes the offer look costly.
- The request path measurably slows. Section 3 of `PLAN.md` protects that path
  and outranks everything here.
- Any of it produces a claim we cannot evidence. Then it is removed, not
  softened.

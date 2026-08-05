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

## Phase 0 — resolve Ridgeline and Lights — **resolved, 5 August 2026**

Output is a decision recorded here, not a prototype. The decision is
[ADR 0004](adr/0004-shore-horizon-and-lights.md); the reasoning is below.

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

### The decision

**`Shore` is adopted, at two scales, not three.**

| Scale | Where | What it does | Status |
|---|---|---|---|
| `band` | Inside `Footer.astro`, every page, ~120px | Horizon only. No lights. Painted once, never animated. | **Build now** |
| ~~`rule`~~ | — | — | **Cut** |
| `stage` | `/about/`, ~50vh | Horizon, lights, dated count in prose beside it | **Held** — see gate below |

The governing distinction, which decides everything else:

> **The horizon is identity. The lights are evidence.**
> Identity can go anywhere. Evidence only appears where prose can stand beside
> it, and only where the prose is true.

Taken in order:

1. **`Shore`, not Lit Town.** The prototype at `/prototypes/home/lit-town/`
   already unified terrain and lights, as a three.js hero. Measured in a real
   build it costs **132KB gzipped for the script and 46KB for the terrain
   grid** — about seven times the budget for the whole sensory system, on one
   page. `PLAN.md` section 3 outranks this plan, and that is the heaviest thing
   we could put in front of the request path. It is also, being one hero on one
   page, the one shape that cannot become a house style. Lit Town stays in the
   prototype record as the thing we did not build.
2. **`band` goes in the footer of every page, and replaces `MourneMotif`.**
   Not beside it: `MourneMotif` is an *invented* skyline, a hand-drawn zigzag
   path. The whole claim of Ridgeline is that it is the real one. A site
   showing a true horizon and a made-up one has no truth claim left. `band`
   also sits *inside* the footer as its top edge rather than floating above it
   — a horizon that is structurally part of the footer is architecture, one
   hovering above it is a sticker. No carve-out for `/request/`: a static image
   painted once does not compete with a form above it.
3. **`band` carries no lights, and therefore does not animate.** A footer has
   no room for prose, so lights there would be an assertion about real
   businesses made silently on every page, including `/privacy/`. At 120px they
   would be texture, not information — all of the honesty risk, none of the
   evidence. With no lights there is nothing left to animate.
4. **`rule` is cut.** With `band` static and lightless, a static `rule` is the
   same drawing at 28px in a third place — a duplicate, not a third weight. And
   a scroll-tracking `rule` would put the same image on the same page with a
   different behaviour: frozen at the bottom, animating in the middle. One
   picture, two rules, reads as inconsistency rather than as a system. A
   progress indicator that cannot be clicked, dragged, or read a position from
   is decoration in a control's costume.
5. **`stage` was held until the census was verified and a confidence bar
   agreed.** Both landed 5 August 2026 (website-status bar). Build is still
   pending — see phase 3b.
6. **Nothing fires on request confirmation.** The intended moment — one more
   light comes on, for them — is a claim we have built them something. Held
   until a pilot completes, at which point it is true and can be revisited.

### Why `stage` was held: the census is not a business list

The claim `stage` was to carry did not survive contact with
`src/site/data/businesses.json`. Of the 379 rows, 281 are marked as having no
website. That set is not 281 local businesses that are behind. It contains:

- **Royal County Down Golf Course**, which has one of the better-known websites
  in Irish sport;
- **KFC, Subway, Centra, SuperValu, Poundland, Superdrug, BP, Circle K,
  Trespass, Regatta** — national chains, where "no website found" means *this
  branch* has no site of its own, a different claim entirely;
- **Newcastle police station, fire station, primary school and tourist
  information centre**, all covered by PSNI, NIFRS, EA and DiscoverNI;
- **Parkaneety Graveyard, Drumee Cemetery, the Granite Trail, Slieve Donard
  Trail** and **"High Mournes scenic loop"**, which is a road.

Duplication is the least of it — the normaliser already dedupes on
`town|aliased-name`, and only three near-duplicate pairs survive it (Donard
Hotel, Granite Trail, Percy French, each a bare and a "The" form), plus one
trail assigned to both towns. The problem is category error, not repetition.

246 of the 281 carry `dataConfidence: "Public listing; ownership and trading
status not independently confirmed"`. We had not confirmed they trade, let
alone that they lack a site.

Filtering to independent, trading, non-duplicate businesses in commercial
categories leaves **213 businesses, 187 of them placeable on a map, 156 of
those dark**. That is a defensible *shape* — most independent businesses here
have no site of their own — but **149 of the 156 are still unconfirmed**, so
publishing the figure would assert that 156 specific premises are behind on
evidence we ourselves labelled unconfirmed.

This is the plan's own stop condition: *a claim we cannot evidence is removed,
not softened*. The glossary gap that allowed it is now closed — `docs/CONTEXT.md`
defines **Census**, **Trading business** and **Lit / dark**, and the term
`Prospect` no longer points at an undefined "census".

**Gate for `stage` (opened 5 August 2026).** The census audit
([`census-audit-2026-08-05.md`](../research/pipeline/census-audit-2026-08-05.md))
showed the dark flag was wrong about two times in three on an unverified sample.
The four-step pass then cleared every dark, mapped, trading row
([`verification-pass-status.md`](../research/pipeline/verification-pass-status.md)).
The confidence decision
([`census-confidence-decision-2026-08-05.md`](../research/pipeline/census-confidence-decision-2026-08-05.md))
adopts the **website-status bar**: publish a dated aggregate and anonymous
lights over Trading ∩ mapped ∩ dark rows that carry a verification object.
Current figure **85 of 166** (~half) — never “most”, never raw census rows,
never a named or hoverable dark point.

**Gate for `band`:** none. It carries no claim. Build it.

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

Phase 0 is resolved (ADR 0004). This phase now splits: **3a `band` is
unblocked; 3b `stage` is unblocked under the website-status bar** (confidence
decision 5 August 2026) — build still pending.

**Build — 3a, `band`.**

1. `src/site/scripts/shore.ts` — one renderer, `scale: "band" | "stage"`.
   Skyline profile precomputed at build time into a small typed array rather
   than derived from the 50k-point terrain grid in the client; the client
   bundle should carry a profile of ~200 numbers, not the grid.
2. `Shore.astro` renders the canvas. At `band` it paints once and stops, and
   carries no lights and no claim.
3. `band` goes inside `Footer.astro` as the footer's own top edge, on every
   page. `MourneMotif.astro` is deleted in the same change, and its use on the
   homepage removed — a real horizon and an invented one cannot share a site.

**Acceptance — 3a.**

- Bundle cost of the terrain profile is under 2KB.
- Reduced motion and no-JS both get the settled horizon; the footer's links and
  text are untouched by either.
- The canvas is `aria-hidden` and adds nothing to the accessibility tree.

**Build — 3b, `stage`.** Gate open. Claim constraints from the confidence
decision:

1. Business points arrive as a JSON script tag from the page, and only the
   fields the picture needs (`lat`, `lon`, `lit`). Never the names.
2. Points are **trading businesses** only, as defined in `docs/CONTEXT.md` —
   never raw census rows. Dark lights are the verified dark ∩ mapped subset.
3. `Shore.astro` at `stage` renders the canvas plus the real prose claim beside
   it, carrying the review date. Wording is the dated fraction (currently
   85 of 166) or “about half” — never “most”.

**Acceptance — 3b.**

- The count in prose is derived from the same array the canvas draws, so they
  cannot disagree.
- The prose names its date and its scope, and is true of the set drawn.
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
| 0 | Shore design resolution | ~~None~~ **resolved 5 August 2026**, ADR 0004 |
| 1 | 03 Rebuild | ~~None~~ **built 5 August 2026** |
| 2 | 05 Voice | Phase 1 shipped and stable |
| 3a | `Shore` `band` | None — Phase 0 is resolved and the band carries no claim |
| 3b | `Shore` `stage` | ~~Census verified + confidence bar~~ **unblocked 5 August 2026** (website-status bar; see confidence decision) — build pending |
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

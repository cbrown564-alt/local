# Sensory system — research and evaluation

August 2026. Written to answer one question: we have free generated video
(Gemini Omni), a large ElevenLabs balance, and the ability to build real-time
graphics with three.js — none of which is on the site. What is actually worth
building, across every surface, and what would only be decoration?

Prototype grid: `/prototypes/showcase/`. Demo code:
`src/site/scripts/showcase-demos.ts`.

**Decided 4 August 2026.** Six of the eight are approved to build — 03 Rebuild,
05 Voice, 01 Ridgeline, 07 Film, 02 Depth, 04 Lights. 06 Tideline and 08 Weather
are held. Ridgeline and Lights were approved with the end product explicitly
undecided, and are resolved on paper before any component is written. The
phases, gates and acceptance criteria are
[`docs/sensory-system-plan.md`](../docs/sensory-system-plan.md), and the work
runs in parallel with `PLAN.md` sections 3 and 4 rather than behind them. The
only remaining gates are about consent: nothing generated about a business
without its written agreement. This file remains the record of *why*, not of
what to build.

## 1. What the cutting edge is doing

Surveyed August 2026.

- **Scroll is the storytelling engine, not a scrollbar.** The 2026 Awwwards
  cohort (Cartier, Shopify, Primland, the OFF+BRAND F1 site that took Site of
  the Year) sequences 3D scenes on scroll rather than moving a 2D page.
- **Restraint beats stacking.** The consistent read across the round-ups is
  that winners pick *one* hard idea and execute it cleanly — a drivable
  physics world, audio-reactive fluid, one object with real weight — rather
  than layering five effects. Bruno Simon's 2025 portfolio (Site of the Month,
  January 2026) is one idea.
- **Mobile is a different scene, not the same scene smaller.** Device
  detection serving lighter geometry, fewer particles, simplified animation is
  now standard practice rather than an optimisation afterthought.
- **Gaussian splatting has arrived on the web.** Spark (World Labs) renders
  3DGS in three.js on WebGL2 across desktop, iOS and Android; Spark 2.0 adds
  streaming level-of-detail. Practically: a phone video of a shopfront can now
  become a navigable photoreal scene in a browser. This is the single most
  relevant technique on the list for us, because our subject matter is
  physical premises we can walk to.
- **Generative hero personalisation is the commercial trend.** Hero copy,
  imagery and CTA rendered per visitor intent; reported 18–41% lift on
  demo-request CTR versus static controls. The interesting part is not the
  tooling, it is that per-visitor generated hero media is now normal enough
  that per-*business* generated hero media will not read as a gimmick.
- **Audio narration of page content is mainstream and accessibility-framed.**
  ElevenLabs Audio Native embeds narration into articles; Voice Design v3
  generates a custom voice from a text description.

Sources:
[Metabole immersive examples](https://metabole.studio/en/blog/immersive-website-examples) ·
[hontran.dev award winners 2026](https://www.hontran.dev/blog/best-award-winning-websites-2026) ·
[Utsubo best three.js sites 2026](https://www.utsubo.com/blog/best-threejs-websites-2026) ·
[Utsubo gaussian splatting guide](https://www.utsubo.com/blog/gaussian-splatting-guide) ·
[Spark](https://sparkjs.dev/) ·
[World Labs on Spark 2.0](https://www.worldlabs.ai/blog/spark-2.0) ·
[Figma web design trends](https://www.figma.com/resource-library/web-design-trends/) ·
[Elementor AI web design trends](https://elementor.com/blog/10-ai-web-design-trends-watch-2026/) ·
[ElevenLabs Audio Native](https://elevenlabs.io/blog/audio-native)

## 2. How that applies to *this* site

The award cohort is built for judges. Our reader is an owner in Newcastle with
a shop to open, who did not come for an experience. So the trend list has to be
filtered hard.

What transfers:

- **One idea, executed properly** — directly. We should ship one signature
  technique everywhere, not eight.
- **Generated media per subject** — this is our unfair advantage. Every other
  studio pitching a Dundrum business shows a template. We can show *them*, in
  film and in a voice, for the cost of a few minutes.
- **Place-awareness** — the trend cohort personalises to visitor *intent*
  because they have nothing else. We can personalise to visitor *place and
  time*, which is far more affecting and much harder to fake from London.

What does not transfer:

- **Scroll-jacked 3D narrative.** Our reader needs to be in and out. A
  sequenced 3D scroll story would actively cost us conversions on `/request/`.
- **Spectacle for its own sake.** Anything that makes the site look expensive
  makes the offer look expensive. The work has to read as *craft*, not budget.
- **Per-visitor generated copy.** We make specific factual claims about real
  local businesses. Generated copy is the one place where the honesty rules
  and the trend are flatly incompatible.

## 3. The eight, evaluated

Each is live at tile size in `/prototypes/showcase/`.

| # | Idea | Uses | Effort | Honesty risk | Verdict |
|---|------|------|--------|--------------|---------|
| 01 | Ridgeline — real skyline as scroll position | baked terrain | low | none | **Build** |
| 02 | Depth — flat photo given a camera move | existing photos | low | low | Build after 03 |
| 03 | Rebuild — before comes apart, after lands | capture pairs | low | none | **Build first** |
| 04 | Lights — reviewed businesses as points of light | `businesses.json` | low | medium | Build, carefully |
| 05 | Voice — narrated walkthrough driving the page | ElevenLabs | low | medium | **Build** |
| 06 | Tideline — sky, sea and tide at the reader's hour | terrain + clock | medium | medium | Hold for tide data |
| 07 | Film — generated establishing shot per business | Gemini Omni | high | **high** | Pilot on one business |
| 08 | Weather — wind through the headline type | none | low | none | Nice-to-have |

Notes on the two that carry real risk:

**07 Film.** A generated shot of a real business is a picture of something
that did not happen. It must be labelled on the frame every time and recorded
in `research/image-provenance.md`, exactly as the Dundrum Inn frontage
visualisation is. The tile in the grid deliberately shows the failure mode:
the clip is a `--demo` tone render from `pnpm assemble:film`, not Dundrum, and
it is badged as such. Stand-ins must never deploy.

**04 Lights.** The image is a map of who is behind. It is defensible as an
aggregate — "N of {total} have no website of their own" — and indefensible the
moment a dark point is nameable. No labels, no hover, no tooltips on dark
points, ever.

**06 Tideline** currently uses a plain 12h25m harmonic. That is the *shape* of
a tide, not the tide. It cannot ship as a factual statement until it reads a
published table for Dundrum Bay, baked at build time.

## 4. Recommendation

Ship three, in this order:

1. **03 Rebuild** — it improves the exact thing we already sell on, costs
   nothing beyond the captures we already make, and has no honesty exposure.
   Keep a manual compare alongside for anyone who wants to study the detail.
2. **05 Voice** — the highest emotional return per pound spent, and it scales
   to every business we approach, including as an audio file attached to the
   first email. Test the voice on real local owners first: a synthetic accent
   that is *nearly* right is worse than a neutral one.
3. **01 Ridgeline** — the binding motif. Without it the other two are two
   tricks; with it they are a studio with a house style.

Then pilot **07 Film** on a single business that has agreed to it, with the
label discipline in place, and judge it on the owner's reaction rather than on
how it looks.

**02 Depth** is the sleeper. The tile fakes depth from screen position; the
real version reads a generated depth map, and the *serious* version is a
Gaussian splat captured on a phone outside the premises. For a business worth
the trip — a hotel, a restaurant, a venue — walking their frontage into the
browser is the most convincing thing on this page, and Spark makes it a
weekend of work rather than a research project.

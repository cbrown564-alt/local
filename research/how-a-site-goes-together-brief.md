# `/how-its-made/` — the build as a page

> **Guest voice, titles, and URLs:** superseded by
> [`owner-voice-on-the-three-pages.md`](owner-voice-on-the-three-pages.md).
> Public route is `/how-its-made/` (was `/how-a-site-goes-together/`). This brief
> still owns structure, interaction, and honesty constraints.


*Written 6 August 2026; refined 7 August 2026 against what the two sibling
builds actually did to their briefs — reel folded to five beats, the control
resolved to the house CSS reel, the page structure grown to the house grammar,
and the stop declared the page's one drawn beat. Sibling of
[`what-we-look-for-brief.md`](what-we-look-for-brief.md) — the second of the
three approaches mapped in
[`three-ways-to-describe-the-work.md`](three-ways-to-describe-the-work.md).
Where the fault walk argues backward from what goes wrong, this page argues
forward through what right is made of. Same taxonomy, same wireframe grammar,
opposite direction.*

## The name does the tonal work

Not `/anatomy-of-a-website/` — an anatomy is performed on something dead, and
the page's whole argument is assembly. Not `/the-perfect-website/` — that
claims the single ideal form `/five-shapes/` exists to deny, and it is a SaaS
landing page's sentence besides. Not `/how-we-work/` — process pages are about
the studio; this page is about the thing. **How a site goes together** is
carpentry language: joinery, not genius — and it is literally what happens on
the page.

Working headline: **How a site goes together.** Subhead: one page, assembled
in front of you — and every layer is the answer to something a customer
actually does.

## The interactive: the assembly

**One wireframe, empty at the start, built up one decision at a time while the
visitor drives — on the house reel, not a stepper.**

A single grey wireframe stage stays fixed on screen. The visitor advances
through beats on a CSS scroll-snap reel with prev/next controls and an index
strip — the pattern `five-shapes-reel.ts` established: nothing auto-advances,
JS only wires the arrows, the strip, `aria-current` and hash sync, and the
degraded state is ordinary document flow. Each beat does exactly three things:
one layer arrives with a physical gesture, one line of narration says which
customer moment it answers, and one quiet cross-reference points at the fault
it prevents.

The reel resolves the stepper-versus-scroll question the way both siblings
resolved theirs: no JS-driven paging anywhere. A stepper was the slideshow
risk; raw scroll was the genre's scroll-hijack risk. The reel is neither —
and reversibility comes free: scroll back and the layer lifts off again. A
construction you can also take apart reads as understanding; a cinematic you
sit through reads as marketing.

The gestures are the tactile part, and they are borrowed deliberately: *seat*,
*slide*, *unfold*, *light* — the physical verbs the studio's scene grammar
uses in clay (`film/studio-recurring-themes.md` stage 3), here done in CSS and
SVG. A nameplate seats on the fascia. A concertina unfolds where the file was.
A status line lights. Someone who has seen the clips recognises the
vocabulary; someone who hasn't just feels the page being *made* rather than
displayed.

## The build order is the argument

The layers are not invented for the page. They are the ten themes answered, in
close to the order the reel already runs them — access before identity before
record — which is also the order the elevation method builds in. One data
source, shared theme ids, so this page and `/what-we-look-for/` cannot drift
apart.

Five beats, folded from the original seven the way every scope question on the
sibling pages resolved to the smaller number: beats 1 and 2 fold into the
arrival, beats 5 and 6 fold into the ask and its reason. Five beats also lands
one beat per five-shapes plate — a tidy sibling symmetry.

| Beat | Layer | The narration line (customer moment) | Answers |
| --- | --- | --- | --- |
| 1 | A door that opens, and a first screen that answers | Before it is anything, a site is somewhere a stranger can arrive — and most arrive with one question. Open now? Where? Is this the right place? | T1, T2, T4 |
| 2 | The name over the door | The biggest name on the site is yours. Suppliers get one confident line. | T3 |
| 3 | The stock, readable | What you sell, in the shape it is read on a phone — a page, not a file. | T8 |
| 4 | An action with a mechanism, and the reason to use it | Two fields — the date and the number of people — placed in front of your worries, with the thing you'd say in ten seconds at the counter on the first screen instead of in the footer. | T5, T6, T7 |
| 5 | The honest handoff | The page keeps what doesn't go stale, and hands today to the source that is always fresh. | T9 |
| 6 | **The stop** | *(see below)* | T10 |

**Beat 6 is a stop, not a layer.** The assembly halts: the wireframe reaches
for a register — a colour, a typeface, a photograph, a first screen designed
for one owner at one hour — and the grey has nothing to offer. The narration
says the quiet part: *up to here, every good site is the same site. Past here,
it has to be yours.* Then the swap test's own image — the blank nameplate
hovering over the finished chassis, seating perfectly, because nothing on it
is anyone's yet — and the page hands over: to `/five-shapes/` for why the next
layer differs by business, and to the transformations for the times it was
actually drawn.

This resolves, on the page itself, the contradiction between "an idealised
form" and "there is no single idealised form": the ideal form is real, and it
runs out exactly one layer before the end. The stop is the studio's whole
pitch in one beat, and it is the reason this page can sit beside
`/five-shapes/` without the two arguing.

The hovering nameplate stays, and it is the page's **one drawn beat** — the
same call five-shapes made for its theatre scenes. The image is already built
and pinned in the fault walk's swap test, and landing it on our own chassis
reads as candour: nothing here is anyone's yet.

## Rules that keep the assembly honest

1. **Wireframe, not a fake website** — same rule and same grammar as the fault
   walk. Grey blocks, ruled bands, placeholder bars; the only legible words
   are the mechanism labels a beat needs (*book*, *menu*, *open until*). There
   is nothing to covet aesthetically, which keeps attention on structure,
   where the argument lives.
2. **Shape-neutral until the stop.** No business, no shape label, no register.
   The moment the wireframe would need to know what kind of business it is —
   beat 6 — is the moment the page stops building. That discipline *is*
   beat 6.
3. **One drawn beat, at the stop — enforced, not disciplined.** Beats 1–5
   carry no register styling and no drawn scene. The stop gets the single
   expressive moment (the hovering nameplate). Like five-shapes' one-colour
   rule, the count is a module-load assertion and a test pin, so a second
   expressive beat cannot slip in with a later refactor.
4. **Narration in the customer's moment, never the studio's craft.** "So a
   stranger with one question gets an answer on the first screen" — never "we
   then establish the information hierarchy". The reader must picture their
   customer, not our process. This is the single most likely tonal failure on
   the page.
5. **No performance claims.** The page never says sites built this way convert
   or rank better. Each layer's authority is that the missing version is a
   documented fault, fixed on named concepts — the cross-reference does that
   work, quietly.

## Degradation is the poster

No JS and `prefers-reduced-motion` get the **exploded diagram**: the finished
wireframe drawn once with numbered leader lines, the five narration lines as
a numbered list beside it, and the stop as the final entry. That plate is
designed first, before any animation — it is the settled frame the sensory
rules require, it is what prints, and if the argument does not survive as a
single labelled drawing, the animated version has nothing to animate.

The contract is the fault walk's, verbatim: **server-render both states** —
the exploded plate carries the full argument with the beats as text, and JS
only mounts the live reel over it. Reduced motion is honoured twice, in the
stylesheet and in `matchMedia`, the way `five-shapes-reel.ts` does it. The
static layer's text is pinned in the page test so the no-JS document cannot
quietly rot.

## Page structure

The house grammar both siblings converged on — planned here rather than
discovered mid-build:

```
1  Hero            Headline + subhead, and the drawn-plates disclosure stated
                   once up top: grey blocks, no business names, no performance
                   claims. Hero fan: the assembly's own stages fanned,
                   aria-hidden — the "thesis drawn, not said" pattern from
                   both sibling heroes.

2  How it works    One sentence of instruction. The fault walk's open
                   question answered itself — the errand needed one sentence;
                   this control is stranger, so it gets one too.

3  Index strip     "Five decisions, in order" — one owner-scan question per
                   beat, a first-class data field (the way five-shapes made
                   ownerQuestion data rather than parsing it from answers).
                   Strip links page the reel; beats already built are marked.

4  The assembly    Beats 1–5 on the reel, visitor-driven, reversible.

5  The stop        Beat 6. Up to here, every good site is the same site.
                   The one drawn beat: the blank nameplate.
                   → /five-shapes/      (why the next layer differs)
                   → /transformations/  (the times it was drawn)

6  The checklist   "Check your own site against the five layers" — one
                   self-check question per beat, the fault walk's `check`
                   field and the same discipline: a checklist, never a score.

7  What this is    The build order is the elevation method's build order —
   for             the craft framing that keeps the page reading as method
                   rather than lead magnet. States the never-rules aloud
                   on-page (no performance claims, no prevalence, nothing
                   self-advances), each statement pinned in the page test.

8  Close           → /request/. Send a link; we'll tell you which layers
                   you already have. The heaviest element on the page.
```

Request path wins on attention weight, as everywhere: one assembly, nothing
self-advancing, the close the heaviest element on the page.

## Build notes

- The study happens in **scratch capture scripts committed with the change** —
  the convention five-shapes actually followed — not a `/prototypes/` route.
  The control is the house reel, so the study is the beat geometry, the
  gestures, and the exploded plate, not a control bake-off.
- One component; the layers are data (`beat`, `name`, `themeIds[]`,
  `question`, `narration`, `gesture`, `check`), **extending the shared
  fault-walk data module** rather than duplicating theme ids — the way
  five-shapes extended `FaultBlock` with optional keys so the fault walk was
  unchanged. The reel reuses the five-shapes reel script's pattern (CSS
  scroll-snap; JS for arrows, strip, `aria-current`, hash sync only).
- **Module-load assertions**, same as five-shapes: every beat complete, theme
  ids valid against the shared taxonomy, and exactly one drawn beat — at the
  stop. Incompleteness fails `astro build`, not just the test suite.
- **Guest-facing beats get names, not T-ids.** Proper nouns in the fault
  walk's manner ("A door that opens"), numbered in page order; T-ids live in
  data, anchors and tests only.
- Drawn, not generated — CSS and SVG. No provenance entries, no disclosures.
- **Pin the magic.** Assert the beats render in order, that stepping back
  removes a layer, that beats 1–5 contain no register styling and the page
  carries exactly one drawn beat at the stop, that the no-JS document contains
  the full exploded diagram, and that the disclosure and never-rules copy is
  present verbatim. The regression to fear is a refactor that ships the
  wireframe fully assembled with the narration as captions — a diagram
  pretending to be a construction.
- Keyboard-operable stepping, and the narration lines are real DOM text in
  reading order, not aria theatre.

## Open questions

- ~~Stepper or scroll?~~ Resolved 7 August 2026: the house CSS scroll-snap
  reel with prev/next and index strip — the five-shapes pattern. Reversible
  for free, degraded for free, and no JS paging anywhere on the site.
- ~~Are seven beats too many to hold in grey?~~ Resolved 7 August 2026:
  folded to five, per the original fallback — beats 1+2 into the arrival,
  beats 5+6 into the ask and its reason. Every scope question on the sibling
  pages resolved to the smaller number; this one does too.
- ~~Should the assembly begin from one of the fault walk's *fixed*
  wireframes?~~ Resolved 7 August 2026: no. Shared grammar (`FaultPanelView`,
  `fw-frame`) gives cross-page recognition for free; a shared chassis would
  imply the assembly is what that page's fix control does.
- ~~Does the stop need the hovering nameplate?~~ Resolved 7 August 2026: yes —
  it is the page's one drawn beat, the image is already built and pinned in
  the fault walk's swap test, and on our own chassis it reads as candour.
- Does five beats on a reel read as construction or as slideshow? The scratch
  study answers it; if it reads as a slideshow, the fallback is the fault
  walk's plain vertical sequence with the stage pinned, not a JS stepper.
- Does the hero fan show the assembly mid-build or the exploded plate?
  Mid-build argues the page's verb; the exploded plate previews the poster.
  The scratch study decides.

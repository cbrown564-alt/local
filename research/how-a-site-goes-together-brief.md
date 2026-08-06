# `/how-a-site-goes-together/` — the assembly as a page

*Written 6 August 2026. Sibling of
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

**Recommendation: one wireframe, empty at the start, built up one decision at
a time while the visitor drives.**

A single grey wireframe stage stays fixed on screen. The visitor advances
through beats — a stepped control or scroll, decided in prototype (see open
questions) — and each beat does exactly three things: one layer arrives with a
physical gesture, one line of narration says which customer moment it answers,
and one quiet cross-reference points at the fault it prevents.

The gestures are the tactile part, and they are borrowed deliberately: *seat*,
*slide*, *unfold*, *light* — the physical verbs the studio's scene grammar
uses in clay (`film/studio-recurring-themes.md` stage 3), here done in CSS and
SVG. A nameplate seats on the fascia. A concertina unfolds where the file was.
A status line lights. Someone who has seen the clips recognises the
vocabulary; someone who hasn't just feels the page being *made* rather than
displayed.

What this must not become is the genre it superficially resembles — the
scroll-hijacked product reveal (`PRODUCT.md` anti-references). Two defences:
the visitor advances it, it never advances itself; and every beat is
reversible — step back and the layer lifts off again. A construction you can
also take apart reads as understanding; a cinematic you sit through reads as
marketing.

## The build order is the argument

The layers are not invented for the page. They are the ten themes answered, in
close to the order the reel already runs them — access before identity before
record — which is also the order the elevation method builds in. One data
source, shared theme ids, so this page and `/what-we-look-for/` cannot drift
apart.

| Beat | Layer | The narration line (customer moment) | Answers |
| --- | --- | --- | --- |
| 1 | A door that opens | Before it is anything, a site is somewhere a stranger can arrive — an address that resolves, with no account between the street and the door. | T1, T2 |
| 2 | The first screen answers the arrival question | Most people arrive with one question. Open now? Where? Is this the right place? | T4 |
| 3 | The name on the fascia | The biggest name on the site is yours. Suppliers get one confident line. | T3 |
| 4 | The stock, readable | What you sell, in the shape it is read on a phone — a page, not a file. | T8 |
| 5 | An action with a mechanism | The date and the number of people: two fields, placed in front of your worries rather than behind them. | T5, T6 |
| 6 | The record, out of the cellar | The thing you'd say in ten seconds at the counter, on the first screen instead of in the footer. | T7 |
| 7 | The honest handoff | The page keeps what doesn't go stale, and hands today to the source that is always fresh. | T9 |
| 8 | **The stop** | *(see below)* | T10 |

**Beat 8 is a stop, not a layer.** The assembly halts: the wireframe reaches
for a register — a colour, a typeface, a photograph, a first screen designed
for one owner at one hour — and the grey has nothing to offer. The narration
says the quiet part: *up to here, every good site is the same site. Past here,
it has to be yours.* Then the swap test in one image — a blank nameplate
hovering over the finished chassis, seating perfectly, because nothing on it
is anyone's yet — and the page hands over: to `/five-shapes/` for why the next
layer differs by business, and to the transformations for the times it was
actually drawn.

This resolves, on the page itself, the contradiction between "an idealised
form" and "there is no single idealised form": the ideal form is real, and it
runs out exactly one layer before the end. The stop is the studio's whole
pitch in one beat, and it is the reason this page can sit beside
`/five-shapes/` without the two arguing.

## Rules that keep the assembly honest

1. **Wireframe, not a fake website** — same rule and same grammar as the fault
   walk. Grey blocks, ruled bands, placeholder bars; the only legible words
   are the mechanism labels a beat needs (*book*, *menu*, *open until*). There
   is nothing to covet aesthetically, which keeps attention on structure,
   where the argument lives.
2. **Shape-neutral until the stop.** No business, no shape label, no register.
   The moment the wireframe would need to know what kind of business it is —
   beat 8 — is the moment the page stops building. That discipline *is*
   beat 8.
3. **Narration in the customer's moment, never the studio's craft.** "So a
   stranger with one question gets an answer on the first screen" — never "we
   then establish the information hierarchy". The reader must picture their
   customer, not our process. This is the single most likely tonal failure on
   the page.
4. **No performance claims.** The page never says sites built this way convert
   or rank better. Each layer's authority is that the missing version is a
   documented fault, fixed on named concepts — the cross-reference does that
   work, quietly.

## Degradation is the poster

No JS and `prefers-reduced-motion` get the **exploded diagram**: the finished
wireframe drawn once with numbered leader lines, the seven narration lines as
a numbered list beside it, and the stop as the final entry. That plate is
designed first, before any animation — it is the settled frame the sensory
rules require, it is what prints, and if the argument does not survive as a
single labelled drawing, the animated version has nothing to animate.

## Page structure

```
1  Opening       One paragraph: every part of a good site is a decision,
                 and the decisions have an order. What follows gets built
                 once, in front of you.

2  The assembly  Beats 1–7, visitor-driven, reversible.

3  The stop      Beat 8. Up to here, every good site is the same site.
                 → /five-shapes/      (why the next layer differs)
                 → /transformations/  (the times it was drawn)

4  Close         → /request/. Send a link; we'll tell you which layers
                 you already have.
```

The close line earns its place: after seven beats the visitor has a checklist
in their head, and the request path converts it into the free walk of their
own site. Request path wins on attention weight, as everywhere: one assembly,
nothing self-advancing, the close the heaviest element on the page.

## Build notes

- `/prototypes/` first, like the fault walk — the assembly control is novel,
  and the prototype decides stepper versus scroll.
- One component; the layers are data (`beat`, `themeIds[]`, `narration`,
  `gesture`), sharing theme ids with the fault-walk data module so the two
  pages are provably the same taxonomy.
- Drawn, not generated — CSS and SVG. No provenance entries, no disclosures.
- **Pin the magic.** Assert the beats render in order, that stepping back
  removes a layer, that the beat-8 state contains no register styling, and
  that the no-JS document contains the full exploded diagram. The regression
  to fear is a refactor that ships the wireframe fully assembled with the
  narration as captions — a diagram pretending to be a construction.
- Keyboard-operable stepping, and the narration lines are real DOM text in
  reading order, not aria theatre.

## Open questions

- Stepper or scroll? Scroll is the genre convention and the genre is the
  anti-reference; a stepper is honest but may read as a slideshow. Prototype
  both on the first three beats only.
- Are seven beats too many to hold in grey? Fallback: fold beats 1 and 2 (the
  arrival) and beats 5 and 6 (the ask and the reason), giving five.
- Should the assembly begin from one of the fault walk's *fixed* wireframes,
  so a visitor arriving from `/what-we-look-for/` recognises the object? Tidy,
  but it risks implying the assembly is what that page's fix control does.
- Does the stop need the hovering nameplate, or is the halt itself enough? The
  plate is the strongest image the studio owns for T10, but here it lands on
  our own chassis — test whether that reads as candour (nothing here is
  anyone's yet) or as the page failing its own test.

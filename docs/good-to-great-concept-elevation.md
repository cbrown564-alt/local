# Good to great — elevating a concept from polished to personal

Written 31 July 2026 as a reference for the Enniskeen flagship upgrade and as
the studio's general playbook for taking a concept from "well designed" to
"I can't believe that's *our* place". Since generalised: this is the hotel
instance of `docs/the-elevation-method.md`, which derives the moves per
business shape (see the Scopers, Betty's Butters, Donard Veterinary and
Mourne Cycles elevation briefs in `research/`).

**Status, 31 July 2026:** built for Enniskeen — six of the seven moves in
full, including the day-part hero. See "What shipped" below.

## The principle

A good concept demonstrates competence: correct information architecture,
honest booking handoffs, a coherent palette. That earns the owner's respect
but not their imagination. The jump to exceptional comes from two things
polish cannot provide:

- **Recognition** — the owner sees details only someone who studied *their*
  place would know: the turret, the pink bath, the walk their guests actually
  take. Recognition proves the concept was made for one business, not
  templated for ten.
- **Theatre** — one or two moments that surprise: the house at dusk with the
  windows lit, a map of the estate drawn like the ones in country-house
  foyers. Theatre is what gets the concept shown to a spouse, a partner, a
  regular at the bar.

Every move below serves one of those two. Anything that is merely "nicer"
is not on this list.

## The moves (general playbook)

1. **Day-part hero.** Generate variants of the same hero composition — dawn,
   midday, dusk with lit windows — and swap by the visitor's local time. The
   owner will most likely open the concept in the evening; the first thing
   they see is their own building glowing. The single most emotional trick
   available, and cheap: a few generations plus a small time-based swap.
2. **An illustrated site map.** The physical grounds are often the most
   cinematic and least visible asset. A hand-drawn-style map in the concept's
   own palette, reusable across the page, the one-sheet and the film, is the
   kind of artifact an owner keeps.
3. **A day in the life.** Rework generic navigation tiles into a timeline of
   one guest's day — morning coffee, the walk, afternoon tea, the fire. It
   turns a menu into a story the owner recognises, and quietly proves
   understanding of the business rather than the brochure.
4. **The history told properly.** Most independent businesses sit on better
   raw history than competitors that pay to have it written up. A real
   timeline band costs little and scores high on "they *got* us".
5. **One photographic voice.** Apply a signature grade across every visual —
   shared shadow tint, warm highlights, fine grain, via a common CSS/SVG
   filter — so the site reads as one commissioned shoot rather than assembled
   generations. This is the difference between "AI filler" and art direction,
   at the cost of a few lines of CSS.
6. **A house mark.** A simple line monogram in the accent colour, used in the
   header, as section ornaments and as favicon. Type-only branding reads as a
   website; a mark reads as an identity, and it gives print and film a seal.
7. **Editorial details.** Drop caps, and one *real* guest review set as a
   large italic pull-quote. A guest's own words land harder with an owner
   than any copy the studio writes — and quoting a public review stays inside
   the honesty rules. Guest attribution is light (speaker + month/year or
   platform); the studio read date stays in research and Sources & limits.

Moves 1–4 create the feeling; 5–7 make it hold together under scrutiny.

## Enniskeen application

| Move | Enniskeen version | Cost | Priority |
|---|---|---|---|
| Day-part hero | Three more generations of the existing Shimna Valley hero composition — dawn mist, midday, dusk with the windows lit — swapped on local time; "Provisional visualisation" disclosure rides along | Low | **1** |
| Illustrated map | Brass-line-on-cream map of the twelve acres: the house, the Wishing Well, the trail to the Shimna, the gardens. Estate page first, then the one-sheet reverse | Medium | **2** |
| One photographic voice | Pine-green shadows, warm highlights, fine grain across all `enk-` imagery so the AI set reads as one shoot | Very low | **3** |
| Editorial details | Drop cap on the welcome note; one real review from the ~389 public ones as a Cormorant italic pull-quote | Very low | **4** |
| A day at Enniskeen | Homepage explore grid becomes a timeline: morning above the valley → Wishing Well walk → Mourne Honey afternoon tea → fire in the Brandy Pad Lounge, each linking to its page | Medium | Later |
| History timeline | Estate page history section grows into a band: house built 1890s, the Brandy Pad smuggling route behind the lounge name, the family era | Low | Later |
| House mark | "E"-and-turret line monogram in honey brass: header, section ornaments, favicon, one-sheet seal | Medium | Later |

Recommended first bundle: day-part hero, one photographic voice, and the
pull-quote — with the estate map if a generation session is available. That
combination is a couple of sessions' work and every piece also upgrades the
one-sheet and the reel.

## What shipped (31 July 2026)

| Move | Where it lives | State |
|---|---|---|
| Day-part hero | `src/components/enniskeen/EnkHero.astro`, bands in `enniskeen-site.ts` | **Done.** Dawn, day and dusk, swapped on the visitor's local clock; the daytime plate stays the pre-script state so no-JS, crawlers, print and capture are untouched. Prompts and boundary in `research/concepts/hotel-enniskeen/enniskeen-day-part-hero-brief.md` |
| Illustrated map | `src/components/enniskeen/EnkEstateMap.astro`, estate page | **Done.** Brass-line plate of the twelve acres — drive, house and turret, lawn, trail, Wishing Well, Shimna, sightlines to Donard and the sea |
| One photographic voice | SVG filter in `EnniskeenShell.astro`, `--enk-grade` in the stylesheet | **Done.** Pine shadows, warm highlights, eased saturation, fine grain — one filter over every image in the concept |
| Editorial details | Home welcome note | **Done.** One drop cap, and one verbatim TripAdvisor review — Carolyn K, July 2026 — set as a large Cormorant italic pull-quote with a light attribution the owner can follow; the studio read stamp stays off the guest layer |
| History timeline | Estate page, `estate.timeline` | **Done.** Four moments; only the two dates the hotel actually publishes are given as dates |
| House mark | `EnkMark.astro`, `public/brand/enniskeen-mark.svg` | **Done.** E-under-turret monogram: header, footer seal, section ornament, favicon. Recorded in `image-provenance.md` as studio-drawn, explicitly *not* the hotel's logo |
| A day at Enniskeen | — | **Not built.** It restructures the homepage, which is the one change that invalidates the flagship film and forces a re-capture. Left as a deliberate, separate decision |

All of it was covered by `pnpm test:enniskeen`, **retired on 4 August 2026
with nothing in its place** (`PLAN.md` section 1c). Enniskeen is the batch-two
flagship and is now the largest concept without a pin; re-establishing one
belongs with any further work on it. That suite also asserted the
day-part swap (pinning the clock to 12:00 and 21:00), the shared grade, no
clipped map labels, the map's "indicative · not a survey" disclosure, the four
timeline moments, and that the pull-quote carries a light attribution and a
citation an owner can follow (not a studio read stamp), and that every
day-part file on disk actually reaches the page.

### What the build taught us

- **Recognition is cheaper than it looks; theatre is not.** The grade, the drop
  cap, the pull-quote and the timeline together took a fraction of the map's
  time and carry much of the "they *got* us" weight. The map is the piece the
  owner will keep — but budget it as its own session, not as a trailing item.
- **An illustrated map is a drawing, not a diagram.** The first pass had labels
  running off the plate and text struck through by its own trail line. Nothing
  catches that but looking at it. The journey test now has a clipped-label
  assertion because the failure is invisible in code review.
- **Ship the mechanism before the assets.** Resolving day-part variants against
  the filesystem meant the swap could land, be tested and be reviewed with zero
  images in hand; when the two generations arrived they needed a format
  conversion and nothing else. Every move that waits on a generation should be
  built this way — but pair it with a test that compares what is on disk to
  what reached the page, because a cached Astro build silently dropped a newly
  added variant and looked exactly like a broken swap.
- **A grade must compose, not override.** `--enk-grade` is a custom property so
  the few images with their own framing filters can chain it. A blanket
  `filter:` on `img` would have been silently overridden by them.
- **Watch what the data module drags into the browser.** Putting the
  filesystem check in the shared data file pulled `node:fs` into the client
  bundle through the booking script. Server-only code belongs in the component
  frontmatter that uses it.

## Constraints

- The public site stays AI-imagery-only (privacy decision, 31 July 2026);
  the hotel's own photographs are reserved for personal outreach material.
  Day-part variants must carry the same disclosure as the current hero.
- History and review content must be sourced the same way as everything else
  in `research/pipeline/verifications.json` — real reviews, documented dates, nothing
  invented for atmosphere.
- None of the moves touch the booking handoff or the five-page IA, so the
  flagship film stays largely accurate; a re-capture is only needed if the
  homepage restructure (move 3) lands.
- `prefers-reduced-motion` and the existing disclosure conventions apply to
  any new behaviour, per established studio rules.

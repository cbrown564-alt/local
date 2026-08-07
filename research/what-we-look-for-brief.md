# `/what-we-look-for/` — five faults as a page

*Written 6 August 2026; reel cut to five on 7 August 2026. The public surface
for the fault taxonomy in
[`research/film/studio-recurring-themes.md`](film/studio-recurring-themes.md).
The studio taxonomy still has ten IDs; this page walks the five that earn a
public demonstration. Uses invented demonstrations only — no real business's
fault appears here. Recorded faults about real businesses stay in
`verifications.json` and go out one-to-one on a postcard
(`research/outreach-postcards.md`), never onto a public page. One of three
sibling approaches to describing the work — the map and the argument between
them is
[`three-ways-to-describe-the-work.md`](three-ways-to-describe-the-work.md);
the other two are the assembly
([`how-a-site-goes-together-brief.md`](how-a-site-goes-together-brief.md)) and
the shapes ([`five-shapes-brief.md`](five-shapes-brief.md)).*

## The name does the tonal work

Not `/website-faults/`, not `/what-goes-wrong/`, not `/five-mistakes/`. The page
is called **what we look for** because that is literally true — it is now the
step-5 diagnostic in `docs/RESEARCH_METHOD.md` — and because it points the
sentence at the studio rather than at the reader. A page titled *five mistakes
you're making* is a page an owner closes; a page titled *five things we look for
before we redesign anything* is a page an owner reads to find out whether we
know what we're doing.

Working headline: **Five things we look for before we redesign anything.**
Subhead: what twenty concepts taught us to check first — and what each one costs
the person standing outside your shop.

## The interactive: walk the errand

**Recommendation: give the visitor an errand and let the fault stop them.**

Not a before/after slider, for two reasons worth writing down. First, the site
already has that control, on the transformation pages, where it sits over
*captured screenshots of real sites* and earns its credibility from the audit
behind it — putting the same control over invented mocks borrows that
credibility without the measurement. Second, a slider compares **appearance**,
and not one of the ten faults is aesthetic. Sliding between two invented looks
argues that we make things prettier, which is the exact claim the taxonomy's
refinement pass cut the template-sludge scene to avoid.

The scenes work because of the departure beat — the loss is *felt*. A slider
cannot do loss. This can:

```
┌─────────────────────────────────────────────┐
│  T4 · Nobody answers "are you open?"        │
│                                             │
│  Your errand:  find out if they're open now │
│                                             │
│  ┌───────────────────┐   taps        3      │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │   screens     2      │
│  │  ░░ translate ░░  │                      │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │   still looking?     │
│  │  ▓▓▓▓ video ▓▓▓▓  │   the hours are      │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │   two screens down   │
│  │   ↓ scroll        │                      │
│  └───────────────────┘   [ fix it ]         │
│   a counter business                        │
└─────────────────────────────────────────────┘
```

Tap around the wireframe. The fault stops you. Your own taps are counted. Then
one control — **fix it** — re-renders the *same* wireframe with the fix, same
errand, and you walk it in one tap. The number on screen is the visitor's own
experience, not a studio statistic about anybody.

**Why this device and not something new:** the studio already measures errands.
`transformation-details.ts` has a `TransformationErrand` type — *"one errand,
walked on both sides at phone size"* — with taps and screens for each side, and
`tools/capture/audit-journey.mjs` produces those counts. Buck's Head ships two
of them. The interactive is that existing unit made playable, so the page
teaches in the same currency the case studies are argued in. That is reuse, not
invention.

**It degrades into the thing that was required anyway.** No JS and
`prefers-reduced-motion` get the two wireframe states side by side as static
plates with the tap counts stated as text — which is the poster the taxonomy's
grammar demands of every scene.

## Four rules that keep the mock from being criticism

This is the whole of the user's concern, and it is solved in the mock's
construction rather than in a disclaimer.

1. **Wireframe, not a fake website.** Grey blocks, ruled bands, no photography,
   no colour identity, no type personality. There is nothing to judge
   aesthetically, which forces attention onto structure — where every one of the
   ten faults actually lives. It also cannot be mistaken for anyone's real site.
2. **No business name, ever — a shape instead.** Each mock is labelled with the
   elevation method's five shapes: *a counter business*, *a place*, *a product*,
   *a care practice*, *a trade*. This kills the "is this someone I recognise?"
   reading, and it teaches the register idea from
   `docs/the-elevation-method.md` for free.
3. **No invented copy that could read as bad writing.** Placeholder bars, not
   sentences. The only legible words are the mechanism labels the errand needs
   to work — *translate*, *book*, *download menu* — in plain system type, never
   an invented brand voice.
4. **Every fault is shown as a decision that looked reasonable.** The newsletter
   overlay, the translation widget, the PDF menu, the supplier logos: somebody
   was advised to do each of those, and often paid for it. One line per theme
   says so. This single move turns the page from criticism into sympathy, and it
   has the advantage of being true.

## The five errands

The studio taxonomy still names ten faults (T1–T10). The page walks five —
three access faults, one identity fault, and the swap-test closer. Cut from the
public reel (still recorded in outreach and verifications): T2 dead end, T3
whose shop, T6 worries in front, T8 locked in a file, T9 stopped clock.

| Theme | Your errand | What stops you | The fixed walk |
| --- | --- | --- | --- |
| **T1** | See what they sell | Consent dialog, then a login panel over greyed-out content | The content, no account |
| **T4** | Find out if they're open now | Hours below a translate bar and a video, two screens down | A status line on the first screen |
| **T5** | Ask whether the 14th is free | *Book* leads to a page with a phone number on it | Two fields — the date and the number of people |
| **T7** | Find the best reason to choose them | The years, the award and the accreditations are in the footer | The record on the first screen |
| **T10** | Tell these two apart | *(not an errand — see below)* | — |

**T10 is the closer and gets the one drag control on the page.** Two identical
wireframes side by side; drag the blank nameplate from one to the other and it
seats perfectly — nothing breaks, and the visitor has just proved the point on
themselves. Then one control adds three true details to the right-hand shape,
and the plate will not seat. This is the only place a drag gesture is the right
device, because here the *comparison itself* is the argument.

## Numbers on this page

**The mock's numbers are the mock's own.** Whatever the wireframe actually does
when you tap it — that is the count on screen. Real measured figures ("the à la
carte is 794px wide and shrinks to 49 per cent on a phone", "the first Book A
Table sits 2,254 pixels down") stay on the transformation pages, where the
business is named and the audit is dated. Importing a real business's
measurement into a fictional wireframe would be smuggling evidence into a
fiction, and it is the single most likely honesty failure on this page.

**The taxonomy tallies do not appear as prevalence.** "Found on six of twenty
concepts" counts what the studio wrote up in its own case-study notes, three per
concept because the template takes three. On the page, a theme may say *the one
we hit most often* and link to the concepts where it was fixed. It may never say
*most small business websites have three of these* — that arithmetic belongs to
the page template, not the world. Same prohibition as
`docs/RESEARCH_METHOD.md` → "What the counts may not be read as saying".

**No score.** The page never totals anything about the visitor's own site, and
the request form does not grade them (see below).

## Page structure

```
1  Opening          Five things we look for. What the page is, and that the
                    demonstrations are invented — stated once, plainly, up top.

2  The five         One block per theme, in reel order:
                    T1 T4 T5 T7 T10 — access faults first, identity fault
                    second, the swap test last.

                    Each block:  message (one line)
                                 the reasonable decision behind it (one line)
                                 → walk the errand  (the interactive)
                                 → the clip         (still-first, muted)
                                 → "we fixed this here" (1–3 concept links,
                                    independent-concept label intact)

3  What this is     The diagnostic is step 5 of the research method. Link the
   for              method doc. This is the paragraph that makes the page read
                    as craft rather than as a lead magnet.

4  Close            → /request/. Send a link, get the same walk done on your
                    own site, no obligation.
```

**The clip sits beside the interactive, not above it.** The interactive is the
argument; the clip is the mnemonic that makes it repeatable to a spouse. If the
clips aren't generated yet, the page ships without them — every block must work
as wireframe-plus-two-lines on day one. Nothing here is blocked on a gen.

**Request path wins on attention weight** (workstream rule 5). Five interactive
toys plus films is enough to out-shout a CTA, so: no autoplay, one clip expanded
at a time, and the close is the heaviest element on the page.

## Build notes

- Public at `/what-we-look-for/` (promoted from `/prototypes/`).
- One component, five data entries. The errands are data (`theme`, `errand`,
  `shape`, `before[]`, `after[]`, `stop`) — the same discipline as
  `transformation-details.ts`. Five bespoke components would be five bespoke bugs.
- **Test the fault, not the fix.** The failure mode is a mock whose fault is
  accidentally walkable — someone tidies the wireframe and the hours land on the
  first screen. Assert, per theme, that the before-walk cannot reach the errand's
  goal in fewer than N steps, the same way `pnpm test:enniskeen` pinned the
  day-part swap before it was retired. This is `the-elevation-method.md` §5 applied to our own page:
  unpinned magic regresses.
- Keyboard-walkable and screen-reader-sane, or the page is a fault of its own.
- The wireframes are drawn, not generated — CSS and SVG. No provenance entry
  needed, no disclosure, no gens. Only the clips carry that weight.

## Open questions

- Does the errand read without instruction, or does each block need "tap the
  grey blocks"? Prototype answers it.
- ~~Is ten interactives on one page too many?~~ Resolved: cut to five
  (T1, T4, T5, T7, T10). The other five stay in the studio taxonomy and outreach.
- Should the visitor's tap count persist across themes ("you've spent N taps
  failing to do ordinary things")? Powerful, and one step from being a
  score. Probably not.

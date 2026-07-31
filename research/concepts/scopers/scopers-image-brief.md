# Scopers — generation brief for the concept's food imagery

Written 31 July 2026. The Scopers concept's structural weakness is that it
sells the plate with no plate on the screen: their live Instagram is a feed of
real dishes, so on the one thing the business actually sells, the "before"
arguably wins. This brief closes that gap.

## The privacy rule (decides everything below)

Decision of 31 July 2026, matching the Enniskeen constraint in
`docs/good-to-great-concept-elevation.md`:

- **Public site — AI-generated imagery only.** Scopers' own photographs are
  never published on `mournemade.co.uk`.
- **Personal outreach only — their own photographs may be used**, credited, in
  the one-sheet and anything handed over in person, swapped or withdrawn on
  first request.

So every file below is generated. None of them is a photograph of Scopers'
food, and nothing on the page may imply otherwise.

## The honesty line for generated food

The **dish names are real** — each one is quoted from Scopers' own public
Instagram caption, listed in Sources below. The **pictures are not**. That
distinction has to survive on the page itself, not just in this file — but
lightly. Revised 31 July 2026: the first pass asked for per-image alt-text
disclosure plus a visible line in the food section; that proved
heavy-handed. The kept register is:

- Each generated plate is captioned as what it is — *"a generated riff on
  Scopers' own Instagram post"* — one honest clause, not a disclaimer block.
- The concept banner carries the standing line: *"Food imagery is
  AI-generated."*
- The transformation page's "Sources & limits" block says it in full, and is
  updated in the same commit as any imagery change.
- `research/image-provenance.md` gets an entry per file, under
  **Generated imagery**, before the concept is re-published.

## One photographic voice

All six share a grade so the set reads as one commissioned shoot rather than
six separate generations — the move that separates art direction from AI
filler:

- Daylight from a window to one side, soft, slightly cool; no flash, no
  studio rim light, no dark moody restaurant lighting.
- Shot close, 50–85 mm equivalent, shallow but not extreme depth of field.
  A plate fills the frame; the room is a suggestion behind it.
- Surfaces: pale oak, scrubbed steel pass, brown kraft takeaway boxes, cast
  iron. **No white tablecloths, no slate, no fine-dining plating towers.**
- Colour: warm buttermilk highlights, cast-iron shadows with a faint green
  cast, a paprika accent somewhere in every frame (palette in
  `src/styles/concept-scopers.css`: `#f7f2e3`, `#26231e`, `#b4511d`, `#5c6b3d`).
- Fine grain. Nothing glossy, nothing HDR, nothing that reads as stock.

**Forbidden in every frame:** people's faces, hands holding the dish, visible
logos or brand marks (Scopers' badge is added in the page, never generated),
text, menus, price tags, chalkboards, any recognisable Dundrum shopfront or
interior — these must not look like the real premises.

## The files

Deliver as `.jpg` (or `.png`, the pipeline converts) at 1600 px on the long
edge or better, into `public/images/`, using these exact names. Landscape 3:2
unless noted. `pnpm optimize:media` then generates the 640/1265 webp
derivatives; the page already references the base names.

### 1. `scopers-generated-chicken-burger.jpg`
Their signature. Source caption: *"Proper quality chicken, marinated in
buttermilk, breaded to order, topped with our homemade wild garlic mayo and
tomato salsa, served in our home baked milk bread burger buns."*

> A buttermilk-fried chicken burger in a dark home-baked milk bread bun
> scattered with black sesame seeds, craggy golden breadcrumb crust, an
> orange-red tomato salsa and pale wild garlic mayo running down the side,
> fresh green leaves beneath. Standing on pale oak, three-quarter view at
> plate height, soft cool window light from the left, warm buttermilk
> highlights, cast-iron shadows, fine grain. No hands, no faces, no logos,
> no text.

### 2. `scopers-generated-loaded-fries.jpg`
Source caption: *"BBQ PORK LOADED FRIES — with chipotle mayo and crispy
jalapenos."*

> A brown kraft takeaway box heaped with thick golden chips, pulled BBQ pork,
> drizzled chipotle mayo, crisp battered jalapeño rings, chopped spring onion
> and black sesame. Shot from just above, close, the box filling the frame on
> a scrubbed steel counter, soft daylight, warm highlights, faint green-cast
> shadows, fine grain. No hands, no faces, no logos, no text.

### 3. `scopers-generated-carrots.jpg`
Source caption: *"Fresh / Local / Seasonal — have you tried the carrots side
dish?? Carrots like you've never tasted them before!"* Carries the zero-waste,
Mourne-Larder claim visually better than anything else on the menu.

> Glazed heritage carrots cut in thick angled slices in a kraft box, sesame
> seeds, chopped spring onion and small yellow and white edible flowers, a
> glossy seasoned dressing pooling underneath. Close, slightly overhead, soft
> daylight, paprika-orange dominant against a pale ground, fine grain. No
> hands, no faces, no logos, no text.

### 4. `scopers-generated-bread.jpg`
Source caption: *"Fresh bread baked each day."*

> Two rustic round loaves cooling on a wire rack — one deeply cracked and
> golden wheaten, one seeded and darker — crumb texture and flour dust
> visible, on a pale oak counter. Close, shallow depth of field, the second
> loaf soft behind the first, soft cool daylight, warm crust tones, fine
> grain. No hands, no faces, no logos, no text.

### 5. `scopers-generated-counter.jpg`  *(portrait 4:5)*
The room, not a dish — used as the "Our story" panel so the section is not a
wall of text. Must **not** resemble the real 169 Main Street interior.

> A small independent hot food bar's service counter: a scrubbed steel pass,
> a stack of brown kraft boxes, a wire rack of loaves, one cast-iron pan, a
> jar of wooden spoons, a green plant on the end. Empty of people. Warm
> daylight from a shop window out of frame, buttermilk walls, cast-iron
> shadows, fine grain, unposed. No faces, no hands, no signage, no menu
> boards, no text, no recognisable street outside.

### 6. `scopers-generated-supper-table.jpg`  *(landscape 16:9, hero)*
The supper-club page hero — the strongest thing the business does and
currently the least visible. A secret location, announced to guests the week
before.

> A long bare wooden table set for a dozen for a supper club inside a rough
> stone barn, mismatched chairs, small glass jars of wildflowers and foraged
> greenery down the centre, plain linen napkins, candles and hanging bulbs
> just lit at dusk. Empty of people, taken before the guests arrive. Warm
> low light against cool blue evening through an open barn door, cast-iron
> shadows, fine grain, quietly beautiful and rural, not luxurious. No faces,
> no logos, no text.

## Where each lands

| File | Placement |
| --- | --- |
| chicken-burger, loaded-fries, carrots, bread | The food section grid on `/concepts/scopers/`, and the four signature rail cells |
| counter | "Our story" panel on `/concepts/scopers/` |
| supper-table | Hero of `/concepts/scopers/supper-club/` |

## After the files land

1. `pnpm optimize:media` for the 640/1265 webp derivatives.
2. Replace the pending placeholders of the same names (see below).
3. Recapture the comparison stills and clip — these change the fold, so the
   committed `scopers-after.jpg` and `scopers-after.mp4` go stale
   (docs/MEDIA_CAPTURE.md, same commit).
4. Add the six provenance entries; update the "Sources & limits" paragraph.
5. `node tools/test/run-verification.mjs` and the concept journey checks.

**Delivered 31 July 2026.** All six were generated to this brief and are in
place; the placeholders are gone. The originals arrived as 1402x1122 PNGs and
are held outside the repository at `.tmp/scopers-source-images/`. The counter
and supper-table images came back at 5:4 rather than the portrait and 16:9
asked for here, which the layout absorbs. Every step in the list above has been
carried out.

## The menu-cover hero — delivered 7 August 2026 (added 31 July 2026)

The elevation brief's move 3 in its full vision: one signature dish
art-directed like a menu cover — macro, the wild garlic mayo mid-drip — with
deliberate negative space for the cover type. **Delivered as a risograph
illustration plus a four-second animated loop**, not the photoreal macro
first specced here: when both directions were tried, the risograph won on
identity and on honesty (an illustration is its own disclosure — nobody
mistakes it for the real plate), and the animation supplies the appetite the
photoreal route was meant to protect. The elevation brief's photoreal
decision stands for the food cards below the hero; the hero itself took the
illustration fallback.

Delivered files, in `public/media/concepts/scopers/`:

- `risograph-chicken-burger.png` — 1536x1024 master, burger right of frame,
  the left third quiet buttermilk paper for the cover type.
- `risograph-chicken-burger.mp4` — 1280x720, four seconds, static camera,
  line-work steam and drip glisten. The pipeline webm strips the audio.
- jpg + webp derivatives via `pnpm optimize:media`.

Wiring: the midday entry of `dayPartSources` in
`src/concepts/scopers/content.ts` points at the still, with `video` set to
the loop's basename — `ScHero` upgrades the frame to `<video>` only when
both transcodes exist, keeps the still as poster/alt carrier, flips the
cover type to dark-on-paper (`tone: "light"`), pauses offscreen, and falls
back to the still under `prefers-reduced-motion`. The page caption runs in
the lightened register: *"illustrated after Scopers' own post."*

The original photoreal prompt is kept below for the record; it was not used.

> A buttermilk-fried chicken burger in a dark home-baked milk bread bun
> scattered with black sesame seeds, craggy golden breadcrumb crust, pale
> wild garlic mayo caught mid-drip down one side, orange-red tomato salsa,
> fresh green leaves. Standing on pale oak at the right of the frame,
> three-quarter view at plate height, macro close at 85 mm equivalent; the
> left third of the frame is quiet, empty pale-oak surface falling into soft
> cast-iron shadow, composed to carry cover type. Soft cool window light
> from the left, warm buttermilk highlights, fine grain. No hands, no faces,
> no logos, no text.

## Sources for the dish claims

All captions above were read from Scopers' public Instagram
(`@scopersdundrum`) on 31 July 2026: buttermilk chicken burger (14 March),
BBQ pork loaded fries (7 February), carrots side (26 March), fresh bread
(2 April), Dexter burger (27 June), cookies-and-cream milkshake (22 May).
Bio: "Hot Food Bar by Paul Cunningham · Championing the best of local produce
· Fix Food – Fix the Planet · #zerowaste". Fourth birthday posted 23 July
2026.

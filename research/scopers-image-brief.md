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
distinction has to survive on the page itself, not just in this file:

- Alt text names the dish and states the image is a generated illustration.
- The food section carries one visible line: *"Dishes from Scopers' own posts.
  Images are generated illustrations, not photographs of the food."*
- The transformation page's "Sources & limits" block is updated in the same
  commit — its current sentence "The concept introduces no photography" becomes
  false the moment these land.
- `research/concept-reviews/image-provenance.md` gets an entry per file, under
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
   (MEDIA_CAPTURE.md, same commit).
4. Add the six provenance entries; update the "Sources & limits" paragraph.
5. `node scripts/run-verification.mjs` and the concept journey checks.

**Placeholders:** until real generations arrive, each name above is a flat
paprika/kelp card stamped "IMAGE PENDING — generated illustration to be
supplied". They exist only so the layout is real and the swap is a file
replace. **The concept must not be published or shown to anyone in this
state.**

## Sources for the dish claims

All captions above were read from Scopers' public Instagram
(`@scopersdundrum`) on 31 July 2026: buttermilk chicken burger (14 March),
BBQ pork loaded fries (7 February), carrots side (26 March), fresh bread
(2 April), Dexter burger (27 June), cookies-and-cream milkshake (22 May).
Bio: "Hot Food Bar by Paul Cunningham · Championing the best of local produce
· Fix Food – Fix the Planet · #zerowaste". Fourth birthday posted 23 July
2026.

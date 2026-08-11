# One Day, Made Here — hero film treatment

Studio working document. Not guest-facing.

Further Omni clip ideas (Kent comic, Scopers breathe, place loops, studio
experiments, paste-ready prompts): [`omni-clip-backlog.md`](./omni-clip-backlog.md).

Two sibling films, one per town, each a single dawn-to-dusk day. They share a
visual grammar so they read as one work in two parts — but each town keeps its
own light, its own pace, its own sound. The homepage hero plays one at a time
behind the pitch, with the town switcher ("Dundrum / Newcastle") as the
chooser. Nothing cross-cuts between towns: a day belongs to one place.

## Honesty position (non-negotiable)

These are generated films of real places. The studio's brand is truthfulness,
so the hero carries a quiet disclosure — "an imagined day, not footage" — and
the video aria-labels say the same. Record provenance in
`research/image-provenance.md` when the films ship.

## Reference stills — the canonical towns (take 2 onwards)

Take 1 (4 August 2026, text-only prompts) proved the multi-shot failure mode:
the castle appeared as four different buildings in four different places, the
street changed between shots, and the grade drifted. The fix is a canonical
reference still per shot in `media/film/stills/<town>/`, built so the
geography recurs: one round-towered Norman keep on one grassy drumlin for
Dundrum; one granite ridge profile over one whitewashed seafront for
Newcastle.

**The still prompts live in `research/film/reference-still-prompts.md`** and
the stills are generated externally (high-quality image pipeline, not
in-repo). Until they land, `media/film/stills/` does not exist — that is
the current state. Once the stills are in place, **generate every video clip
conditioned on its matching still** (image-to-video / start frame in Gemini
Omni), with the shot prompt and style block from the tables below. The still
fixes the geography; the prompt supplies the motion and the time of day. Do
not mix stills across towns, and do not regenerate the stills casually —
they are the continuity. The stills also double as poster candidates
(`<town>-film-poster` currently comes from the assembled dusk frame; a still
could replace it if the render disappoints).

| Shot | Dundrum still | Newcastle still |
|------|---------------|-----------------|
| 01 | `01-pre-dawn-bay.png` (master) | `01-pre-dawn-beach.png` (master) |
| 02 | `02-first-light-mudflats.png` | `02-first-light-ridge.png` |
| 03 | `03-morning-main-street.png` (street master) | `03-morning-promenade.png` (street master) |
| 04 | `04-cafe-window-bay.png` | `04-midday-beach.png` |
| 05 | `05-golden-hour-castle.png` | `05-golden-harbour.png` |
| 06 | `06-blue-hour-street.png` | `06-dusk-amusements.png` |

## Visual grammar (both towns)

- 6 clips × ~8s each, generated with Gemini Omni, assembled in listed order
- 0.8s crossfades; the final dusk frame crossfades back into the opening
  pre-dawn frame, so the loop reads as "tomorrow" rather than a seam
- One continuous, unhurried feel: slow forward drift at walking pace, no cuts
  within a clip, no camera shake, no people facing camera
- Grade: muted coastal palette — slate blue, sea green, wet sand, warm amber
  window light. Atmosphere over action.

### Style block — append verbatim to every Gemini Omni prompt

> Cinematic photorealistic film, shot on 35mm anamorphic, natural available
> light only, muted coastal palette of slate blue, sea green and warm amber,
> soft film grain, gentle slow forward camera drift at walking pace, no text,
> no logos, no recognisable faces, no camera shake, no cuts, one continuous
> shot, County Down, Northern Ireland, atmosphere over action.

## Film one — Dundrum: "The quiet bay"

Intimate and tidal. The bay empties and fills; the castle watches; the street
is two minutes long and everyone knows it.

| # | Clip prompt (style block appended) |
|---|------------------------------------|
| 01 | Pre-dawn, mist lying low over the tidal flats of a small inner bay, tide fully out, a ruined Norman castle faint on a low hill through the mist, a curlew walking the wet sand, almost no light, blue-grey stillness |
| 02 | First sunlight breaking across tidal mudflats, shallow channels of water catching gold, wading birds lifting in ones and twos, low mist burning off, ruined castle on the hill behind |
| 03 | Early morning on a short Irish village main street, a hand pulling up a shop shutter, hand-painted signs, a baker's window glowing warm, milk bottles by a door, quiet and close |
| 04 | Midday inside a small café, coffee being poured by a window, steam rising, bright glittering tidal bay visible through the glass beyond, calm and warm |
| 05 | Golden hour on the bay, ruined castle silhouetted against low amber sun, wet sand reflecting the sky, a lone dog walker far away, long soft light |
| 06 | Blue hour on the village main street, shop windows glowing amber one by one, a single street lamp, deep blue sky, mist returning over the bay at the end of the street |

## Film two — Newcastle: "Where the mountains sweep to the sea"

Open and sweeping. The beach is the front room; the Mournes are the back
wall. Bigger weather, bigger sky.

| # | Clip prompt (style block appended) |
|---|------------------------------------|
| 01 | Pre-dawn on a long open beach, dark surf rolling in, a granite mountain range a black mass above a sleeping seaside town, first grey light on the water |
| 02 | First sunlight striking the ridge of a high granite mountain above a coastal town, rose-gold light sliding down the slopes toward the rooftops, sea still in shadow |
| 03 | Early morning on a Victorian seaside promenade, shutters going up on a small bike shop, gulls on lamp posts, low sun along the pavement, coffee window glowing |
| 04 | Midday on the beach, bright sea, dog walkers and a distant swimmer, granite mountains hazy behind the town, gulls turning on the wind |
| 05 | Golden hour in a small harbour, fishing boats at anchor, long shadows across the promenade, warm light on whitewashed walls, mountains violet behind |
| 06 | Dusk on the seafront, amusement arcade lights flickering on one by one, warm windows along the promenade, the sea going dark blue, first stars over the mountain ridge |

## Sound — ElevenLabs

Two seamless ambience beds, built from short loopable stems and mixed by the
assembly pipeline (`tools/pipeline/assemble-hero-film.mjs`) to a 60s bed.
Generate stems with the Sound Effects API (`POST /v1/sound-generation`,
`eleven_text_to_sound_v2`, `duration_seconds: 10`, `loop: true`) — the API
caps at 30s, so do not ask for minute-long clips. The mixer stream-loops each
stem to fill the bed. Everything is generated ambience — no music library, no
recording. Keep beds sparse; the hero plays them at low volume and they are
opt-in only, never autoplay.

```bash
# needs ELEVENLABS_API_KEY in the environment
pnpm generate:ambience
pnpm assemble:film
```

### Dundrum bed — stems (10s, loopable)

1. `water` — "very still shallow tidal water lapping gently over mudflats,
   close and quiet, no waves, seamless ambient loop"
2. `birds` — "curlew and oystercatcher calls across a still estuary,
   occasional, distant, early morning, sparse seamless ambient loop"
3. `village` — "quiet Irish village morning ambience, distant shop shutter,
   soft cup on saucer, door closing far away, sparse seamless loop"
4. `evening` — "still village evening ambience, faint distant trad session
   through a pub door, very quiet, occasional slow car, seamless loop"

Mix: water −6 dB, birds −10 dB, village −16 dB, evening −14 dB, evening stem
only in the second half of the bed.

### Newcastle bed — stems (10s, loopable)

1. `surf` — "steady surf washing a sandy beach, medium distance, rhythmic,
   no people, seamless ambient loop"
2. `gulls` — "herring gulls calling over a seaside promenade, occasional,
   bright daytime, sparse seamless ambient loop"
3. `wind` — "soft sea wind, open and empty, no whistle, seamless ambient loop"
4. `arcade` — "faint seaside amusement arcade heard from outside at dusk,
   muffled electronic jingles and distant ride hum, very quiet, seamless loop"

Mix: surf −6 dB, gulls −12 dB, wind −14 dB, arcade −16 dB, arcade only in
the second half.

Optional: a sparse warm pad/piano underlay from ElevenLabs music at −18 dB.
Try it; drop it if it sentimentalises.

## Assembly

Drop Gemini Omni exports into `media/film/clips/dundrum/01-…mp4` …
`06-…mp4` (any filename with the right two-digit prefix; any codec — the
pipeline normalises). Drop ElevenLabs stems into
`media/film/audio/<town>/` using the stem names above. Then:

```bash
node tools/pipeline/assemble-hero-film.mjs            # assemble towns whose clips exist
node tools/pipeline/assemble-hero-film.mjs --demo     # synthesise stand-in clips, then assemble
```

Outputs (per town):

- `public/media/home/<town>-film.mp4` / `.webm` — full arc, seamless loop
- `public/media/home/<town>-film-mobile.mp4` / `.webm` — dusk pair, lighter
- `public/media/home/<town>-film-poster.jpg` + `-640.webp` / `-1265.webp`
- `public/media/home/<town>-ambience.mp3` — mixed bed (only if stems exist)

## Hero integration

Lives as **prototype E** at `/prototypes/home/film/` (4 August 2026): the
film hero plus the proof fold exactly as a production page would compose
them, followed by a status note listing what remains before any promotion.
`src/site/components/HomeFilmHero.astro` renders only for towns with
complete assets (checked at build time by `src/site/data/home-films.ts`), so
promoting means rendering it on the homepage — the product hero stays until
a film lands, and reverting is deleting `public/media/home/`. The prototype
page doubles as the to-do list; keep it honest.

Behaviour contract:

- Autoplay muted, `playsinline`, loop; loads only when in view
- `prefers-reduced-motion` or `save-data`: poster still + explicit play
  button, never autoplay
- Town switcher: crossfades video + poster + sound bed; remembers choice in
  `localStorage`
- Sound: opt-in toggle ("Hear the bay" / "Hear the sea"), fade in/out,
  pauses with video
- Honesty line in the corner: "An imagined day, generated frame by frame —
  not footage."
- When the film hero is live, the before/after stage moves directly below as
  the proof fold; the pitch stays one scroll deep

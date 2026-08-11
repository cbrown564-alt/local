# Reference still prompts — One Day, Made Here

Studio working document. Not guest-facing.

Twelve prompts for the canonical reference stills, one per film shot per
town. These stills are the continuity layer: every Gemini Omni clip is
generated conditioned on its matching still, so whatever image pipeline
produces them decides what the towns look like. Generate at 16:9, as high
resolution as the pipeline allows.

## How to use this file

1. Generate the two **master stills per town first** (01 and 03). Everything
   else is chained from them.
2. For chained shots, feed the master(s) back as visual reference if the
   pipeline supports it. If it doesn't, the prompts below are self-contained:
   the canonical geography is spelled out in every prompt — keep those
   passages word-for-word identical between shots.
3. Do not "improve" the canonical descriptors between shots. The whole
   point is that the castle, the hill, the ridge and the streets never
   change.
4. Save outputs as `media/film/stills/<town>/<NN>-<slug>.png` using the
   filenames given per shot — `research/film/one-day-made-here.md` maps them
   to clips, and the assembly pipeline expects that naming if a still is
   ever used as a poster.

## Shared style block — append to every prompt

> Photorealistic landscape photograph, shot on a full-frame camera with a
> 35mm prime lens at f/5.6, natural available light only, muted coastal
> palette of slate blue, sea green, wet sand and warm amber window light,
> fine film grain, gentle natural vignetting, high dynamic range, no HDR
> halos, no oversaturation, no text, no logos, no watermarks, no people
> facing camera, County Down, Northern Ireland.

## Canonical geography — the passages that must never change

The Dundrum passages below are grounded in the real photographs retained in
`stills/dundrum/sources/`; do not reconstruct the earlier fictional geography.

**Dundrum (D):** "the real view across Dundrum Inner Bay from east of
Downshire Bridge toward Dundrum: branching tidal channels and exposed flats
in the foreground, the village stretched along the far shore, and Dundrum
Castle small and distant on the wooded hill at upper left"

**Dundrum street (DS):** "the real Main Street, Dundrum view descending
toward St Donard's church tower: the marked bus stop and wet two-lane road in
the foreground, the exact stepped row of narrow rendered houses and premises
following the bend, and the large grey three-storey house with white quoins
on the right, with slate roofs, repeated chimneys, simple lamp columns and
overhead wires; the castle is not visible from this viewpoint"

The Newcastle passages below are grounded in the real photographs retained in
`stills/newcastle/sources/`; do not reconstruct the earlier fictional beach,
promenade or harbour geography.

**Newcastle beach (N):** "the real low-tide view southwest from the northern
beach toward Newcastle: shallow tidal water and rippled wet sand around rows
of old timber groyne posts, Murlough dunes and rock armour on the right, the
town and church tower small in the middle distance, and the true broad Mourne
profile filling the horizon"

**Newcastle promenade (NP):** "the real Central Promenade gardens looking
southwest: sea and harbour breakwater on the left, metal railings and a curved
wet path around the lawn, mature trees and modern sculptural lamp columns,
houses and road on the right, and the true wooded mountain slopes behind"

**Newcastle harbour (NH):** "the real tidal harbour at low water: small boats
grounded across the mud, stone and concrete harbour walls, pale houses along
the far shore, and a steep wooded Mourne slope with its rounded summit rising
immediately behind"

**Newcastle amusements (NA):** "the real current Kent Amusements frontage on
Central Promenade: red upper storeys with pale trim, grey end bay, black KENT
AMUSEMENTS and DODGEMS fascia, glass arcade frontage, yellow accessibility
ramp and railings, road signs and markings in their documented perspective"

---

## Dundrum — "The quiet bay"

### Real-view grounding

- Bay viewpoint: `dundrum/sources/real-bay-view.jpg`. Preserve its camera
  position, tidal-channel layout, far-shore village, wooded framing, hill
  proportions and the castle's small placement at upper left.
- Castle identity: `dundrum/sources/real-castle-detail.jpg`. Use only to keep
  the distant round keep and fragmented curtain walls authentic; never enlarge
  or relocate them in the bay view.
- Street viewpoint: `dundrum/sources/main-street-perspective-traffic.jpg`.
  Preserve its camera direction, road and bus-stop markings, building
  footprints and façade widths, roofs, chimneys, windows, doors, the grey
  quoined house at right, the church tower, trees, wires and lamp columns. The
  newer survey photographs beside it are for checking recognisable details,
  not for compositing a fictional continuous row. Do not add the castle, bay
  or mountains to this view.
- Generate 01 and 03 from those source photographs. Treat 01 as the edit target
  for 02 and 05, and 03 as the edit target for 06. For chained shots, change
  only the named light, weather and activity.

### 01 — master exterior · `dundrum/01-pre-dawn-bay.png`

Pre-dawn at the tidal bay: {D}. The tide is fully out; low mist lies over
the flats and partially softens the distant village and castle. A single
curlew walks the wet sand in the foreground. Almost no light, deep blue-grey
stillness, vast and quiet. Composition: preserve the real source viewpoint;
the bay and channels fill the lower two thirds, with the village and wooded
castle hill distant along the upper third.

### 02 · `dundrum/02-first-light-mudflats.png`

The same bay moments after sunrise: {D}, identical viewpoint to the master
still. Low golden light rakes across the mudflats, the same shallow channels
catch the gold, wading birds lift in ones and twos, and the mist burns off in
patches. The distant village and authentic small castle on its wooded hill
receive the first sun. Same composition as the master, brighter and warmer;
do not change any geography.

### 03 — street master · `dundrum/03-morning-main-street.png`

Early morning on the village street: {DS}. Remove the traffic queue and
motorcyclists from the source, retaining at most one ordinary car in the middle
distance. One existing ground-floor window glows warm, two milk bottles stand
by an existing doorway, and wet road and pavement reflect the low natural
light. Quiet, close, lived-in. Composition: street level, the same perspective
toward the real church tower. Do not invent a shutter, bakery, continuous shop
row, castle or drumlin.

### 04 · `dundrum/04-cafe-window-bay.png`

Midday inside a small calm café: a ceramic cup of coffee being poured at a
plain wooden table by a large window, steam rising. Through the glass,
sunlit and tiny with distance: {D}, with bright midday glitter on the same
channels. Use the real bay source for the exterior view and keep the castle
small on its wooded hill beyond the village. The interior is warm timber and
pale plaster; the bay carries the light.

### 05 · `dundrum/05-golden-hour-castle.png`

Golden hour on the bay: {D}, identical viewpoint to the master still. The
distant castle is a small dark silhouette on its wooded hill, wet sand mirrors
the warm sky, long soft light rakes the flats, and a lone distant dog walker
is tiny on the sand. The warmest frame of the set. Change only light and the
tiny walker; preserve every channel, building, tree and landform from 01.

### 06 · `dundrum/06-blue-hour-street.png`

Blue hour on the village street: {DS}, identical viewpoint to the street
master. The same existing lamp columns are lit, a restrained handful of
existing windows glow amber, the sky is deep blue, and light damp haze gathers
at the far bend. Warm windows against blue dusk; the day closing. Preserve
every building, car, wire, tree and road marking from 03; do not add or remove
any fixed object and do not add the castle.

---

## Newcastle — "Where the mountains sweep to the sea"

### Real-view grounding

- Beach viewpoint: `newcastle/sources/real-beach-town-view.jpg`. Preserve its
  southwest camera direction, groyne-post spacing, low-tide channels and sand,
  Murlough dune edge and rock armour, distant town skyline and exact mountain
  profile. Generate 01 from this photograph and use 01 as the edit target for
  02 and 04.
- Promenade viewpoint: `newcastle/sources/real-central-promenade-2025.jpg`.
  Preserve the real gardens, railings, path, trees, modern lamps, breakwater,
  houses and mountain relationship. Do not replace them with a Victorian shop
  row or add a bike shop.
- Harbour viewpoint: `newcastle/sources/real-harbour-evening.jpg`, with
  `real-harbour-boats.jpg` used only to confirm boat and wall detail. Preserve
  low water and grounded boats; do not turn the basin into still open water.
- Amusements viewpoint: `newcastle/sources/real-kent-amusements-2025.jpg`.
  Preserve the current façade, fascia, ramp, signs and road perspective. It is
  a separate documented view from 03, not an invented arcade inserted into it.
- For every shot, change only the named light, weather and sparse activity.
  The additional photographs in the source folder are verification references,
  not permission to merge several places into one view.

### 01 — master exterior · `newcastle/01-pre-dawn-beach.png`

Pre-dawn on the northern beach: {N}. The tidal pools are dark silver, the
town is unlit, faint mist gathers at the mountain foot and the Mournes are a
blue-black mass against a barely lightening sky. Empty, quiet and natural.
Composition: preserve the real source viewpoint with water and posts below,
the distant town along the middle and the true ridge filling the upper frame.

### 02 · `newcastle/02-first-light-ridge.png`

First sunlight on the mountains: {N}, identical viewpoint to the master
still. A narrow muted rose-gold light catches the upper ridge through thinning
cloud; the town, tidal pools and sand remain in cool shadow. Preserve every
post, channel, building, dune and landform from 01.

### 03 — street master · `newcastle/03-morning-promenade.png`

Early morning on the promenade: {NP}. Rain has left the path and road wet; two
gulls perch on existing lamp columns and one existing house window glows warm.
No parked cars or crowd. Preserve the exact gardens, street furniture,
coastline, houses and mountains from the source; do not invent shops,
shutters, terraces or a different style of lamp.

### 04 · `newcastle/04-midday-beach.png`

Bright late morning on the beach: {N}, identical viewpoint to the master
still. Broken coastal cloud lights the wet sand and shallow water; at most two
walkers are tiny in the distance and the mountains soften into realistic
atmospheric haze. Keep the actual low-tide view rather than inventing open surf
or a swimmer. Preserve every fixed object from 01.

### 05 · `newcastle/05-golden-harbour.png`

Golden hour at Newcastle Harbour: {NH}. Low sun catches the grounded boat
hulls and selected house walls while the wooded mountain remains cool and
dark. Long soft shadows lie across the tidal mud and the first existing
windows begin to glow. Preserve the low-water basin, railing, boats, walls,
houses and mountain; do not add a lighthouse or make the boats float.

### 06 · `newcastle/06-dusk-amusements.png`

Blue-hour dusk outside the arcade: {NA}. Existing arcade and fascia lights glow
through the real glass frontage, with soft reds, golds and greens reflected on
wet pavement and roadway. Remove parked cars and keep people tiny and distant.
Preserve every recognisable façade, sign, ramp, railing and road feature from
the source. This is intentionally a different real camera position from 03.

---

## After generation

- Review all twelve side by side at small size: if one keep, ridge or
  street reads differently from its siblings, regenerate that still with
  the master as reference — not a new master.
- Drop the twelve files into `media/film/stills/<town>/` with the
  filenames above, then generate each Gemini Omni clip conditioned on its
  still plus the shot prompt and film style block from
  `research/film/one-day-made-here.md`.

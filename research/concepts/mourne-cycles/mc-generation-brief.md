# Mourne Cycles — generation brief: the remaining plates

Written 8 August 2026, alongside the flagship rebuild. The concept is complete
without these; every slot degrades to a designed drawn or coal panel until the
file exists in `public/media/concepts/mourne-cycles/` and the page picks it up
(filesystem-resolved at build time, the Enniskeen pattern).

## Boundaries (standing, from the elevation brief)

- **No premises imagery.** Do not generate the 63A frontage or the workshop
  interior as-if-real. The workshop plate below is a generic stand-and-bench
  scene — atmosphere, not the actual premises — and ships disclosed as
  AI-generated in the visible layer, as the current plates do.
- No real people, no faces. No brand marks: Trek, Bontrager and Shimano logos
  stay out of frame — the shop's dealer status is copy, not imagery.
- One shoot, one grade: plates are generated to sit under the single
  `#mc-grade` filter (saturation eased, shadows to coal, fine grain) — cool,
  overcast, Northern Ireland light; nothing sun-drenched or studio-lit.
- Every file gets a `research/image-provenance.md` entry in the same commit,
  and the concept banner note already discloses generated imagery.

## The plates

### 1. `mourne-cycles-workshop.jpg` — the stand (workshop page)

A road bike up on a workshop repair stand, mid-service: chain off, a rag and
a track pump on the bench, tools on a pegboard behind, warm tungsten work
light against cool daylight from a doorway. No people, no logos, shallow
depth. Landscape 3:2.

Slots: a visual band on `/concepts/mourne-cycles/workshop/` beside the
booking widget (wire with an `inPublic` check when the file exists).

### 2. `mourne-cycles-hire-fleet.jpg` — the fleet (hire page)

Three bikes — a hybrid, a hardtail mountain bike, an e-bike — leaned in a row
against a forest trail-edge fence, helmets hanging from the bars, morning
mist, Castlewellan-style spruce behind. No people, no logos. Landscape 3:2,
dark enough to sit under white text at ~0.22 opacity.

Slots: the `.mc-hire-photo` underlay on `/concepts/mourne-cycles/hire/` (CSS
retained from the first build; re-add the `inPublic` wiring when the file
exists). Note: do NOT reuse `mourne-cycles-hire-after.jpg` — that is the
case-study capture of the old page, a screenshot, not a plate.

### 3. `mourne-cycles-trail-dusk.jpg` — trail country at dusk (trails page, optional)

Forest singletrack at last light, a ribbon of trail disappearing downhill
toward distant water, the Mournes a dark line on the horizon. Moody, cool,
no riders. Landscape 16:9.

Slots: a closing band on `/concepts/mourne-cycles/trails/` under the
"Tell us the ride you're after" CTA. The day-part hero mechanism (Enniskeen
pattern) remains a possible later move for the home hero — dawn/day/dusk of
the same trail — but needs its own brief and a "change the light and nothing
else" rule; not assumed here.

## After a plate lands

1. Provenance entry in the same commit.
2. `pnpm optimize:media` for the 640/1265 webp variants (check the tool's
   conventions for generated plates first).
3. Wire the slot (`inPublic`), rebuild, recapture the affected stills per
   `docs/MEDIA_CAPTURE.md`.
4. Note it in this file's status line below.

**Status: briefed 8 August 2026; no plates generated yet.**

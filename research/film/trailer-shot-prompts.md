# Trailer shots — prompt sheet and asset audit

*10 August 2026. Generation-ready prompts for the eighteen frames in
[`trailer-visuals-brief.md`](trailer-visuals-brief.md), cut against
`../../media/narration/trailer/trailer-trim.mp3` (1:35.6). House pattern follows
[`studio-recurring-themes.md`](studio-recurring-themes.md) Stage 4; house rules
and the A20 edit protocol from
[`studio-media-experiments.md`](studio-media-experiments.md) apply throughout.*

**Status: research only.** Provenance entry before any commit of new frames.

---

## 1. What we actually had, once we looked

The brief said seven of eighteen shots already exist. That was true of the
*scenes*, but it understated the still-image archive. Most of the recent
Codex-generated stills were created in Codex threads and are now also archived
in [`../../media/media-sprint/codex-generated/2026-08-03--2026-08-10/`](../../media/media-sprint/codex-generated/2026-08-03--2026-08-10/), with source thread IDs in its manifest.

The studio clip frames were also extracted to [`../../media/film/stills/studio/`](../../media/film/stills/studio/)
as nine reference plates. Those plates are separate from the original Codex
still generations: they are conditioning inputs pulled from the 8-second
MP4s, not newly generated images.

**Everything reused is capped at 1280×720.** That is the source resolution of
the studio clips. It is fine for a web hero and it is *not* fine beside a newly
generated still at 2K, which will read sharper and break the set. Either
generate new stills at 720p to match — wasteful and limiting — or plan an
upscale pass on the reused plates. **Recommend: generate new work large, upscale
the nine plates, and judge the mix on a contact sheet before committing.**

**T10 never seats the plate.** Across all eight seconds the brass nameplate
lifts off the left shopfront, drifts to the right one, and hovers at a series of
angles — it ends *askew*, not seated. Shot 16's beat ("it seats perfectly,
nothing else changes") is not in the clip. Two clean level frames exist at 4.5s
and 5.5s, so **shot 16 works as a still and fails as motion.**

Also noted, and useful: the right-hand window in T10 carries a small ridgeline
doodle. The Ridgeline motif is already living inside the clay world without
anyone planning it.

**The boots survive scrutiny.** At contact-sheet size they read as two small
pots; at full resolution they are unmistakably boots, mid-stride, one lifted.
No action needed — but never judge this material at thumbnail size.

## 2. The one decision that blocks generating

**T01 and T04 are different shopfronts, and the trailer needs one door.**

| | T01 — the login | T04 — are you open |
| --- | --- | --- |
| Building | wide, three glazed bays, recessed central door | narrow, one large window, panelled door |
| Ground | cobbles | wet flagstones |
| Weather | dry dusk | rain |
| Interior | boots on shelves, amber, alive | dark, then one lamp |

Shot 1 is T01's door. Shot 17 is written as *"back to shot 1 — this time the
window answers"*, and the gesture that answers it — a lamp warming behind the
glass, a brass clock face resolving — is **T04's**, already generated and one of
the best frames in the corpus (`T04-02-clock-lights.png`). Cut together as they
stand, the film walks up to one building and gets its answer from a different
one. The rhyme that carries the whole ending breaks.

**Recommendation: T01's shopfront is the film's one door.** Act 1 is four shots
on it and they are all already made; T04 contributes one. Adopting T01 costs a
single new generation — shot 17, T04's clock gesture staged on T01's frontage —
and that shot was already on the list as *must move*. The reverse choice costs
four.

This is the only thing blocking generation. Everything in §4 can be generated
today regardless of how it goes.

## 3. Shared style block — append to every prompt

Derived from Stage 3's grammar and from what the existing plates actually look
like, which is not quite what the earlier prose said.

> Miniature clay and paper-craft set, stop-motion animation look, shot slightly
> above eye level on a long lens with a shallow depth of field. No people, no
> faces, no hands anywhere in frame. County Down coastal palette: slate grey,
> sea green, wet stone, warm amber window light, harbour brass. Soft overcast
> key light, pale grey sky. Fine grain, gentle vignette, no gloss, no
> oversaturation. **No text, no lettering, no numerals, no logos, no signage
> anywhere — blank fascias and blank paper stay blank.** Calm and dry, not
> corporate explainer energy.

**Canonical descriptors — keep word-for-word identical between shots.** This is
the continuity layer, exactly as `reference-still-prompts.md` does it for the
towns. Do not "improve" them between generations.

**The door (D):** "a small green-painted clay shopfront at dusk, three glazed
bays with a recessed central door between them, dark slate stall-riser below the
windows, a cobbled street in front, warm amber light inside"

**The street (S):** "a row of small clay shopfronts and houses along a gently
curving street, slate roofs, red brick chimneys, plain rendered fronts, simple
lamp columns, no signage on any fascia"

**The twins (T):** "two small green clay shopfronts side by side under slate
roofs, and one plain blank brass nameplate with rounded corners"

## 4. The prompts

Seven frames. Five are stills; two must move and are written as 8-second
image-to-video conditioned on a named plate.

---

### Shot 3 — they want to know if you're open (0:05.1, still)

```
Still, 16:9. [D] The street is empty and dusk has gone blue. On the cobbles
directly in front of the recessed door, at ground level, a single small pale
rectangle of light lies face up, as if a lit screen had been set down on the
stones. It is the only warm thing in the lower half of the frame and it throws
a soft glow up onto the stall-riser and the doorframe. The shop's own interior
light is dimmer than the little rectangle. Nothing else in frame.

The rectangle is featureless glowing white — no icons, no text, no interface.
```

*Note.* The rectangle must stay blank. The moment it has an interface it is a
picture of a specific product, and Stage 3's lettering rule exists precisely
here.

---

### Shot 5 — they tap it. Nothing. Again. (0:20.7, **must move**)

Conditioned on `stills/studio/T01-02-forms-on-glass.png`.

```
Image-to-video, 8 seconds, from the attached still. Hold the framing exactly.
Two blank white paper rectangles are pressed flat against the frosted glass of
the door. Three times, spaced about two seconds apart, a single soft ripple
starts at the centre of the lower paper rectangle and travels outward about an
inch — and then stops dead and flattens out, without ever reaching the edge of
the paper or the glass. Nothing else in the frame moves at all. The interior
stays cold and grey behind the pane. The boots do not move. The last ripple
dies and the frame goes completely still.

No text, no lettering, no cursor, no interface. The ripple is the only motion in
the entire clip.
```

*Note.* Three taps, not two — the trim isolated them at 0:20.7, 0:22.4 and
0:24.2 with a full second of silence around each. Time the ripples to those.
The clip is cut to the audio, not the reverse.

---

### Shot 6 — then they go next door (0:26.8, still)

```
Still, 16:9. [D] Wide, pulled back one building further than the previous
framing so that the neighbouring shopfront is visible at the right edge. The
green shopfront in the centre is dark, shut and grey behind its glass. The
neighbouring premises at the right is warmly lit, its window glowing amber onto
the cobbles. The cobbles in front of the central door are empty — the boots are
gone. A faint warm reflection from the neighbour's window reaches most of the
way across the wet stones toward the dark door, and stops short of it.
```

*Note.* The light reaching *toward* the dark door and stopping short is the
whole shot. If the generation flattens that, re-roll rather than accept.

---

### Shot 10 — not their marketing, their websites (0:48, still)

```
Still, 16:9. [S] The row of clay shopfronts is seen through a large pane of
window glass in the near foreground, slightly out of focus at its edges, with
faint dust and a few dry rain spots on it. The glass sits between the camera and
the street, so the whole row is viewed through it rather than from the pavement.
The reflection of a pale grey sky lies across the upper part of the pane. The
street beyond is sharp and ordinary and completely empty.
```

*Note.* The pane is the argument: the street is unchanged, but you are now
meeting it through glass. Do not add a frame, a mullion or a device body — the
moment it becomes a phone it becomes a product shot.

---

### Shot 12 — sixty things wrong, ten patterns (0:55.1, still) — **the signature shot**

```
Still, 16:9. Top-down flat lay on a dark slate work surface, lit softly from
one side. Ten shallow rectangular trays of pale unfinished clay are laid out in
two rows of five, evenly spaced. Distributed among the trays are roughly sixty
small brass objects — plain simple forms, each a few centimetres: keys, discs,
small bells, plain plates, rings, hooks. The objects are sorted, so each tray
holds a group that clearly belongs together and differs from its neighbours, and
the trays hold visibly different numbers of them. A few loose brass objects sit
outside the trays at the edge of the frame, not yet sorted.

No labels, no text, no numerals, no writing on the trays or the objects. Warm
brass against cold slate. Orderly, patient, handmade — a specimen tray, not an
infographic.
```

*Note.* This is the only image in the film that carries the *method* rather
than a fault, and it is the one frame with no existing reference to lean on.
Budget the most re-rolls here. The failure mode is that it reads as an
infographic; the fix is fewer, plainer objects and more empty slate. X20 proves
the top-down technique.

---

### Shot 13 — not one of them is that it looked ugly (1:01.5, still)

```
Still, 16:9. A single handsome clay shopfront, centred, in immaculate
condition — freshly painted, clean glass, brass fittings polished, everything
square and well made. Late afternoon light, dry pavement. It is the best-looking
building in this whole set of images. The street is completely empty in both
directions and there is nobody at the door. The interior behind the glass is
neat, and unlit.

No text, no lettering, no signage. Handsome and still and unvisited.
```

*Note.* It has to be genuinely the prettiest frame in the film — that is the
line. Resist making it subtly sinister; the emptiness does the work.

---

### Shot 17 — what the person outside came to ask (1:24.7, **must move**)

*Blocked on §2. Written for the recommended answer: T01's door.*

Conditioned on `stills/studio/T01-03-empty-street.png`, borrowing T04's gesture.

```
Image-to-video, 8 seconds, from the attached still. Hold the framing exactly.
[D] The shopfront is dark and shut, the cobbles in front of it empty. A warm
lamp slowly brightens somewhere deep inside the shop, and as it comes up a plain
brass-rimmed clock face resolves into visibility in the left-hand glazed bay,
lit from behind. Amber light spreads out of the three bays and across the wet
cobbles toward the camera. In the last two seconds the boots walk back into
frame from the right, stop squarely in front of the door, and stay there.
Freeze on the final half-second.

The clock face has plain hands and no numerals and no maker's name. No text, no
lettering, no signage anywhere. One warm continuous move — no cuts, no camera
move.
```

*Note.* The only fix in the film, and it must rhyme with shot 1: same building,
same lens, same cobbles, boots returning to the spot they left. If §2 goes the
other way, this shot is already made — it is `T04-02-clock-lights.png` — and
shots 1, 4 and 6 need regenerating on T04's frontage instead.

---

### Shot 16 — the plate seats (1:15.3, still, or motion if T10 is redone)

Works as a still today: `stills/studio/T10-02-plate-seated-right.png`.

If motion is wanted, T10 must be regenerated, because the existing clip ends
askew:

```
Image-to-video, 8 seconds, from the attached still. [T] The blank brass
nameplate lifts cleanly off the fascia of the left shopfront, travels sideways
in one smooth unhurried move, and settles down level and square onto the fascia
of the right shopfront, where it fits exactly. It comes to rest and stays
perfectly still for the last three seconds. Nothing else in either shopfront
changes in any way — not a door, not a window, not a colour.

The plate stays blank the entire time. No text, no engraving, no lettering. The
plate must end level, seated and motionless — never tilted.
```

## 5. Order of generation

1. **Shot 12** first, alone. It is the least referenced, the most likely to
   need re-rolls, and if it cannot be made the film has no method shot and the
   edit changes shape. Find out early.
2. **Shots 3, 6, 10, 13** as one batch — all four are the same set and palette,
   and they should be judged against each other on a contact sheet, not
   individually.
3. **Shot 17** once §2 is answered. Everything hangs off it.
4. **Shot 5**, last of the required work — it is the most constrained and the
   easiest to specify once the plates around it are locked.
5. **Shot 16 motion** only if the still fails in the cut.

Contact-sheet the whole eighteen before any promotion, per house rule. The
slideshow-against-audio gate in the brief §1 step 3 still stands: cut it as
stills first, and only then buy motion.

# Trailer visuals — brief and shot list

*Written 10 August 2026. Imagery for
[`../narration/trailer/trailer.mp3`](../narration/trailer/) (2:04, Village
Elder). Companion to [`studio-recurring-themes.md`](studio-recurring-themes.md)
(the T1–T10 scenes) and [`studio-media-experiments.md`](studio-media-experiments.md)
(house rules, curation).*

**Status: research only.** Nothing here is approved to ship. Provenance entry
before any commit of generated frames, per
[`../image-provenance.md`](../image-provenance.md).

---

## 1. Where we start, and why it isn't video

The instinct is to commission ~18 video clips and sync them. That is the
expensive order, and this repository has already written down why:

> **House rule 5 — still under motion.** Beat-two (or final) frame is the
> poster; if the still does not carry the idea, the scene failed.
> — [`studio-media-experiments.md`](studio-media-experiments.md)

And the film pipeline that worked — *One Day, Made Here* — generated **two
master stills per town first**, then conditioned every Omni clip on its
matching still ([`reference-still-prompts.md`](reference-still-prompts.md)).
The still is the continuity layer. Motion is a derivative of it.

So the order is:

1. **Lock the beat sheet against real timecodes.** Done below — measured off
   the audio, not estimated from the script.
2. **Build the eighteen frames as stills.** One contact sheet.
3. **Cut the stills against the audio as a slideshow.** This is a complete,
   shippable artefact on its own — an image sequence with a 2:04 narration is
   a film, and it is the thing that proves the edit before any motion is paid
   for.
4. **Promote to motion only the shots that must move.** Four or five of the
   eighteen carry a physical turn; the rest are held frames with a slow push,
   which is prototype **02 Depth** in [`../sensory-system.md`](../sensory-system.md)
   and costs nothing.

Step 3 is the gate. If the slideshow does not hold, more motion will not save
it — it will only make the failure more expensive.

**The unfair advantage is that seven of the eighteen already exist.** The
trailer's two pillars — the login at the door and the swap test — are T01 and
T10, already generated, already curated, already surviving the 7 August
contact-sheet review. The trailer was written from those scenes. It should be
cut back onto them.

## 2. The timing spine

Measured from `trailer.mp3` by `ffmpeg silencedetect` (`-30dB`, 0.4s).
**Bold timecodes are the four long holds (1.8–1.9s)** — the `[pause]`,
`[reflective]` and `[matter-of-fact]` tags landing as real silence. These are
the act breaks and every cut of consequence should sit on one.

| | In | Out | Line |
| --- | --- | --- | --- |
| **Act 1 — the approach** | 0:00 | **0:30.8** | door → login wall → two dead taps |
| **Act 2 — the leaving** | 0:32.7 | **0:51.8** | next door, and nobody ever tells you |
| **Act 3 — the count** | 0:53.7 | **1:20.2** | twenty businesses, sixty faults, ten patterns |
| **Act 4 — the swap test** | 1:22.0 | 2:04.4 | the turn, the fix, the offer |

Sentence-level boundaries inside Act 4, where the cutting is tightest:

| In | Line |
| --- | --- |
| 1:22.0 | "Here's the one that stings." |
| 1:24.5 | "Open your website." |
| 1:26.2 | "Find your name." |
| 1:28.3 | "Now swap it for the business up the street." |
| 1:32.4 | "If nothing else on the page needs changing…" |
| 1:35.6 | "…the site isn't yours." |
| 1:38.6 | "It's a template with your name in the corner." |
| 1:42.2 | "And people can feel that," |
| 1:44.2 | "even if they'd never say it out loud." |
| 1:47.6 | "A site that's actually yours knows the one thing a template never can." |
| 1:50.1 | "What the person outside came to ask." |
| 1:54.4 | "That's the work." |
| 1:58.6 | "We'll show you yours…" |
| 2:00.9 | "…before we ask you for anything." |

Act 1–3 boundaries are exact at the act breaks and within ±1s inside them.
If frame-accurate word timings are ever needed for a tight sync, ElevenLabs
speech-to-text will return them; it was not run for this draft.

## 3. The shot list

Grammar is the established one: **clay object theatre, County Down coastal
palette — slate, sea green, warm amber window, harbour brass. No faces, no
hands, no lettering in frame. The customer is boots, an umbrella, a folded
note. The page is the antagonist, never the owner.**

| # | In | Beat | Frame | Source |
| --- | --- | --- | --- | --- |
| 1 | 0:00 | someone outside your door | Boots stop at a shut clay shopfront. Wet slate. | **T01** (opening) |
| 2 | 0:03.8 | *hold* | Same frame, nothing happens. The hold is the shot. | T01 freeze |
| 3 | 0:05.4 | not lost — they want to know if you're open | A small lit rectangle at boot height, the only warm thing in frame. | new still |
| 4 | 0:11.5 | what comes back is a login screen | Frosted pane, blank forms, the fascia name greyed behind the glass. | **T01** |
| 5 | 0:21 | they tap it. Nothing. Again. | Two taps on glass. The ripple does not propagate. | **new — must move** |
| 6 | 0:32.7 | then they go next door | Boots exit frame. One door along is lit. | new |
| 7 | 0:35 | no complaint, no bad review, no email | Empty envelope on an empty desk. | **X18** |
| 8 | 0:43 | just a quiet person who came and left | Counter bell with no clapper. Silence where a sound should be. | **T05** |
| 9 | 0:53.7 | twenty businesses round here | Slow lateral move along a continuous clay street. | **X14** + push |
| 10 | 1:00 | not their marketing — their websites | The same street seen through a pane, not from the pavement. | new |
| 11 | 1:06 | on a phone, in the rain, in a hurry | Rain on glass. | **X05** |
| 12 | 1:09 | roughly sixty things wrong → ten patterns | Top-down: sixty small brass objects sorted into ten trays. | **new — the signature shot** |
| 13 | 1:17 | not one of them is that it looked ugly | A handsome façade, immaculate, and nobody at it. | new |
| 14 | 1:22 | here's the one that stings | *Hold on 13.* | — |
| 15 | 1:24.5 | open your site, find your name, swap it | Blank brass nameplate lifts from one shopfront. | **T10** |
| 16 | 1:32.4 | …the site isn't yours | It seats perfectly on the identical twin next door. Nothing else changes. | **T10** |
| 17 | 1:47.6 | what the person outside came to ask | Back to shot 1. The boots are still there. This time the window answers. | **new — must move** |
| 18 | 1:54.4 | that's the work / we'll show you yours | The offer beat, live DOM type over the plate. | **X18** + X16 rule |

**Seven of eighteen exist.** Five are new stills. Two must be generated as
motion (5 and 17). Shot 12 is the one genuinely new scene worth spending on —
it is the only image in the film that carries the *method*, and the top-down
stop-motion technique is already proven by X20.

**Shot 17 is the whole film.** It is the only fix in the piece, it rhymes with
shot 1, and it is the single physical gesture house rule 4 asks for. If it
does not land, the trailer ends on a claim rather than a demonstration.

## 4. What the imagery is not allowed to do

Inherited constraints, not new ones:

1. **No business is identifiable.** No real fascia, no real signage, no
   recognisable frontage. The narration names no place
   ([`../narration/INDEX.md`](../narration/INDEX.md) rule 1) and the picture
   must not undo that. This is what retired the X23 coastal sequence.
2. **The login wall in shots 4–5 must not be any real platform's screen.**
   Frosted glass and blank forms carry it. A recognisable interface makes it a
   claim about a named company.
3. **Everything generated is disclosed on the frame**, as the town films are —
   "an imagined day … not footage" — and recorded in
   [`../image-provenance.md`](../image-provenance.md) before commit.
4. **The narration is synthetic and must be disclosed in the visible layer**,
   not only in an `alt` or `aria-label`. Adding pictures does not soften this;
   it strengthens it, because a voice over film reads as a documentary.
5. **Spectacle that steals weight from `/request/` dies.** House rule 8.

## 5. Open questions

1. **Trim first?** Plan §8 item 1 wants ~300 characters cut to bring the
   trailer near 1:30. **Cut before cutting picture** — every frame timed
   against 2:04 is wasted if the audio changes. This is the one decision that
   blocks step 2.
2. **Aspect.** 16:9 for the site, 9:16 for anything distributed. X13 is
   already a 9:16 derivative of T04, so the precedent exists; shot 12's
   top-down sort is the only one that will not survive the crop.
3. **Sound design.** The 3,000-credit reserve is untouched and X08's room-tone
   vocabulary is proven. Rain, a bell, boots on wet slate. Picture makes the
   absence of foley much more noticeable than audio-only did.

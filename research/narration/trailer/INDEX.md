# Trailer — cold open

*10 August 2026. Piece 1 of five in
[`../../narrative-audio-plan.md`](../../narrative-audio-plan.md) §4.*

**Status: research only.** Not approved to ship. Provenance filed in
[`../../image-provenance.md`](../../image-provenance.md).

| File | What |
| --- | --- |
| `trailer-trim.mp3` | 1:35.6, Village Elder, six cuts — **listen to this one** |
| `trailer.mp3` | 2:04, Village Elder, the full script |
| `trailer-down-narrator-superseded.mp3` | the first cut, 1:20, kept for the pacing comparison |
| `raw/` | all three generator outputs |
| [`script.md`](script.md) | both scripts, sources and the honesty check |
| [`trim-candidates.md`](trim-candidates.md) | the nine cuts offered, and the four lines ruled out |

Voice **Old Irish Village Elder** (`eEzkfaTvgdaH5to7Cn0M`), model `eleven_v3`,
`stability` 0.5, five audio tags. 1,380 characters.

**Recast 10 August.** The first cut used MM Down Narrator and is kept as
`trailer-down-narrator-superseded.mp3`. Once §2 settled the set on one
audience, the trailer had to share the snags' voice — a marketing set in two
voices is two sets.

## Measured

| Cut | Chars | Length | Rate | Integrated | True peak |
| --- | --- | --- | --- | --- | --- |
| Village Elder, trimmed (current) | 1,134 | **1:35.6** | 712 c/m | −17.2 LUFS | −1.8 dBTP |
| Village Elder, full script | 1,382 | 2:04.4 | 666 c/m | −17.4 LUFS | −1.8 dBTP |
| MM Down Narrator (superseded) | 1,382 | 1:19.8 | 1,040 c/m | −16.4 LUFS | −1.7 dBTP |

`loudnorm=I=-16:TP=-1.5:LRA=11` on all three. The trim sits 0.2 LU from the
full cut and inside the 0.6 LU spread of the five snags, so it drops into the
set without remastering anything else.

**And the rate moved again with the voice held constant.** Same narrator, same
model, same settings, 18% less text — 666 characters per minute became 712. A
7% swing from copy alone, on top of the 55% already measured from casting. The
predicted length was 1:40; it came in at 1:35.6. This is the third measurement
in a day saying the same thing: **time it after generation.**

**The same script, 44 seconds apart.** 1,040 characters per minute against 666
— a 55% pacing spread from casting alone, before a word changed. This is the
single most useful measurement of the day and it is recorded in plan §1: rate
is a property of the voice at least as much as of the copy, so a piece that
must hit a duration gets timed after generation, never predicted before it.

It also means **the trailer is now long for a cold open.** It was written to
1:30 and reads at 2:04. Cutting ~300 characters would bring it back; see plan
§8.

## What this take is for

It is the cheap register test. Judge the **voice against long copy** and the
**tone**, not the words — the script is one draft and rewriting it costs
nothing, while being wrong about the narrator costs twelve thousand credits in
Long A.

Three things to listen for:

1. **Does he hold for eighty seconds?** The audition was thirty-four. This is
   the first real endurance evidence.
2. **Do the audio tags earn their place?** `[pause]` before "Then they go next
   door", `[reflective]` into the twenty-businesses turn, `[matter-of-fact]`
   on the close. If any reads as a gear change rather than a breath, cut it —
   punctuation should carry what it can.
3. **Is the swap test landing?** It is the turn the whole piece is built on.
   If it goes past without weight, the fault is the pacing into it, not the
   line.

## Findings carried forward

**Rate is not a constant.** 1,380 characters ran 1:19.8 — a little over 1,000
characters per minute, against 830 in the audition. So the trailer is 1:20, not
the 1:45 it was costed at. Credits bill per character, so the budget is
unaffected; the *minute* estimates in the plan carry real spread and any piece
that must hit a duration gets timed after generation, not predicted before.

**A prevalence claim was caught in drafting, not in review.** The first draft
had "that happened this morning; it will happen again this afternoon" — a
frequency nobody counted, and exactly the kind of line the honesty rules
exist to stop. See [`script.md`](script.md). Worth noting that the pressure to
write it came from the format: audio wants momentum, and unearned specificity
is the cheapest way to fake it. Expect that pressure again in Long A.

# Long-form narrator audition

*10 August 2026. Casting the narrator for Long A, Long B and Shorts I in
[`../../narrative-audio-plan.md`](../../narrative-audio-plan.md) §5.*

**Status: undecided.** Nothing here advances to production. Provenance filed in
[`../../image-provenance.md`](../../image-provenance.md).

Script: [`script.md`](script.md) — 452 characters of real Long A copy. Model
`eleven_v3`, `stability` 0.5, no audio tags. Unmastered.

## Listen in this order

| File | Voice | Origin |
| --- | --- | --- |
| `../../../media/narration/audition/A1-mm-slate-narrator.mp3` | MM Slate Narrator | incumbent, cast 7 Aug for proverbs |
| `../../../media/narration/audition/A2-mm-harbour-brass.mp3` | MM Harbour Brass | incumbent, cast 7 Aug for the warm ask |
| `../../../media/narration/audition/A3-down-designed-1.mp3` | unsaved preview | designed 10 Aug, County Down brief |
| `../../../media/narration/audition/A4-down-designed-2.mp3` | unsaved preview | designed 10 Aug, County Down brief |
| `../../../media/narration/audition/A5-down-designed-3.mp3` | unsaved preview | designed 10 Aug, County Down brief |

A3–A5 are voice-design previews and **are not saved voices**. Only the chosen
one gets kept; the other two expire. Generated voice IDs are in the provenance
entry if a rescue is needed.

## Judge on three things

1. Does it hold attention past thirty seconds?
2. Does the cadence vary, or does every sentence land the same way?
3. Is it dry without being cold — a neighbour, not an agency?

The last sentence is the test that matters. "It is almost always a paradox" is
where a flat narrator falls over.

## Measured

| File | Length | Rate | Integrated | True peak |
| --- | --- | --- | --- | --- |
| A1 | 35.7s | 133 wpm | −16.3 LUFS | −0.8 dBTP |
| A2 | 33.7s | 141 wpm | −17.7 LUFS | −0.6 dBTP |
| A3 | 34.3s | 138 wpm | −18.1 LUFS | −1.8 dBTP |
| A4 | 33.6s | 141 wpm | −19.1 LUFS | −1.7 dBTP |
| A5 | 32.6s | 145 wpm | −17.8 LUFS | −1.0 dBTP |

Two findings worth carrying forward:

**The budget arithmetic holds.** 452 characters ran ~34 seconds across all five
voices — **~800 characters per finished minute**, against the 850 the plan was
costed at. The ~27,000-character programme is therefore about 34 minutes, not
32. Small margin, in the right direction.

**The mastering step is confirmed necessary, before it was needed.** These five
span 2.8 LU on identical input, and A1 and A2 sit above the −1.5 dBTP ceiling.
This is the same class of fault that held the 7 August batch back, arriving
again on day one — which is the argument for putting `loudnorm` in the
generator rather than in a later cleanup pass. Judge these takes on voice, not
on level; the level is a solved problem that has not been applied yet.

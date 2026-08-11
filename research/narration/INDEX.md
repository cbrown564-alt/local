# Narrative audio — 10 August 2026

Generated speech made during the one-day ElevenLabs credit window. Plan and
budget: [`../narrative-audio-plan.md`](../narrative-audio-plan.md). Provenance
for every file: [`../image-provenance.md`](../image-provenance.md).

**Status: research only.** Nothing here is approved to ship guest-facing. The
gate is plan §7 — a listening score sheet and local-listener evidence — and on
the 7 August precedent that gate is real: it held an entire batch of studio
audio back.

---

## The set — for one owner

**Audience: the owner of a local business who suspects something is wrong with
their website and cannot name it.** One voice throughout: **Old Irish Village
Elder** (`eEzkfaTvgdaH5to7Cn0M`).

| Order | File | Length |
| --- | --- | --- |
| 1 | [`../../media/narration/trailer/trailer.mp3`](trailer/) | 2:04 |
| 2 | [`../../media/narration/shorts-snags/S1-login-at-the-door.mp3`](shorts-snags/) | 57.5s |
| 3 | `../../media/narration/shorts-snags/S2-are-you-open.mp3` | 60.8s |
| 4 | `../../media/narration/shorts-snags/S3-bell-with-no-clapper.mp3` | 57.2s |
| 5 | `../../media/narration/shorts-snags/S4-best-thing-in-the-footer.mp3` | 62.1s |
| 6 | `../../media/narration/shorts-snags/S5-swap-test.mp3` | 59.5s |

**7 minutes 1 second in total.** The trailer previews the set and ends on the
swap test; S5 is the swap test in full.

Every beat in the snags comes from `src/site/data/fault-walks.ts` — the same
five entries `/where-it-fails/` walks — and each turns on that entry's
`decision` field, the reason the owner's choice was sensible at the time.
Without that turn it is five accusations in a row.

## Standalone — not part of the set

| File | Length | Audience |
| --- | --- | --- |
| [`../../media/narration/long-a-elevation/long-a-elevation-method.mp3`](long-a-elevation/) | 8:31 | a peer studio, or the studio itself |

The elevation method read in full, from
[`docs/the-elevation-method.md`](../../docs/the-elevation-method.md). Voice
Irish Cultural Guide. It is the best-made piece of the day and it is **not**
episode two of the owner set — an owner buying a website does not need to know
how elevation works. Filed here rather than deleted because it costs nothing to
keep and it is the studio's own doctrine, spoken.

## Casting

| Voice | Used for | Note |
| --- | --- | --- |
| Old Irish Village Elder (`eEzkfaTvgdaH5to7Cn0M`) | the owner set | 7 Aug bakeoff control |
| Irish Cultural Guide (`NPWroowF4phQhaPWjXPj`) | Long A | the 4 Aug showcase baseline |
| MM Down Narrator (`5D9bboiw6vTiK5plwIve`) | superseded trailer | designed 10 Aug, County Down brief |

[`audition/`](audition/) holds the five casting takes.

---

## Rules every file here follows

1. **No place name is spoken.** No town, village, mountain or street. Decided
   for respect first — small places make a business identifiable by town alone,
   and audio detaches from its context as it travels — and pronunciation
   simplicity second. Plan §3.
2. **No business is named in Long A at all**, only shapes. The owner set names
   none either.
3. **Nothing is invented.** No client, testimonial, ranking, measured result or
   prevalence claim. Figures trace to `transformation-details.ts` and
   `fault-walks.ts`.
4. **Everything is mastered** through `loudnorm=I=-16:TP=-1.5:LRA=11`. Raw
   generator output is kept beside each mastered file.
5. **Everything is disclosed.** All speech here is synthetic and none of it is
   a recording of any person. Guest-facing use would need that stated in the
   visible layer, not only in an `alt` or `aria-label`.

## What the day taught

**Rate is a property of the voice, not just the copy.** The same 1,380-character
trailer script ran 1:20 in one voice and 2:04 in another — 55% from casting
alone. Time a piece after generation; never predict its duration.

**Mastering is not optional and the fault arrives on day one.** Five audition
takes of *identical* input spanned 2.8 LU. After `loudnorm` the five snags span
0.6 LU. That difference is what makes a set a set.

**Cheap pieces first paid for itself twice.** Two register misses — a narrator
that did not land, and a lineup with no audience — both surfaced on work that
cost hundreds of credits to redo rather than thousands.

**The audience question is not a generation step, so the running order could
not catch it.** It went unasked through four pieces and was answered only when
a listener said they were confused. Ask "who is this for, in one sentence"
before anything is written — and distrust any answer that arrives as a table.

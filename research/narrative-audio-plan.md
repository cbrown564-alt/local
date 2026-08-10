# Narrative audio — plan for the 10 August credit window

*Written 10 August 2026. A one-day window of ~40,000 ElevenLabs credits that
expire tomorrow. This plan spends them on **explanatory narrative audio about
the studio and this repository** — the missing layer named in
[`studio-storytelling.md`](studio-storytelling.md) §1, in the studio's own
voice.*

*This is research output. Nothing here is approved to ship guest-facing; the
gate for that is §7.*

---

## 1. The constraint, stated first

40,000 credits is not much. Every plan decision below follows from this
arithmetic, so it goes at the top rather than in an appendix.

| Fact | Figure |
| --- | --- |
| Eleven v3 / Multilingual v2 | 1 credit per character |
| Flash / Turbo v2.5 | 0.5 credits per character |
| Measured narration rate | ~140 wpm ≈ **850 characters per finished minute** |
| Sound effects | ~100 credits per generation |

At 1 credit per character, 40,000 credits is about **47 minutes of speech if
nothing is ever regenerated** — which never happens. With a realistic 1.3×
retake factor and a sound-design reserve, the true budget is:

> **~33 minutes of finished, kept narration.**

Two consequences, both load-bearing:

1. **"Long-form" here means ten to twelve minutes, not an hour.** An hour is
   not available at this quality. Anyone planning against an hour is planning
   against credits that do not exist.
2. **Script discipline is the cost control.** A 20% tighter script is a 20%
   larger programme. Cutting happens on the page, before generation — not by
   regenerating and picking.

**Do not use Flash to buy more minutes.** Flash halves the price and loses
exactly the thing this exercise is for: prosody across long sentences. Spend
the credits on fewer, better minutes. The one exception is the narrator
audition in §5, where only timbre is being judged.

### Allocation

| # | Piece | Finished | Script chars | Credits (1.3×) |
| --- | --- | --- | --- | --- |
| 0 | Narrator audition (§5) | — | — | 1,200 |
| 1 | **Trailer** — cold open | 1.5 min | 1,300 | 1,700 |
| 2 | **Long A** — The elevation method | 11 min | 9,400 | 12,200 |
| 3 | **Long B** — The honesty is compiled | 8 min | 6,800 | 8,800 |
| 4 | **Shorts I** — Five snags × 5 | 5 min | 4,300 | 5,600 |
| 5 | **Shorts II** — Concept vignettes × 6 | 6 min | 5,100 | 6,600 |
| — | Sound design reserve | — | — | 3,000 |
| | **Total** | **~32 min** | **~27,000** | **39,100** |

~900 credits of headroom. Generate in the order 0 → 1 → 4 → 5 → 2 → 3: the
audition validates the voice, the trailer validates the register on something
cheap, the shorts bank complete deliverables, and the two long pieces — the
expensive, hardest-to-abandon items — go last when everything upstream is
known good.

---

## 2. Why this material, and what it actually is

The repo's problem is the one `studio-storytelling.md` already named: the offer
is abstract and the writing that explains it is *written*, not spoken. Two
bodies of knowledge carry the weight —
[`the-elevation-method.md`](../docs/the-elevation-method.md) (what "great" is
made of) and [`studio-recurring-themes.md`](film/studio-recurring-themes.md)
(ten faults, auditable to sixty observed instances across twenty concepts).
Both are strong source material for audio for the same reason: **they are full
of paradoxes and specifics**, and audio lives on concrete nouns.

The five pieces map onto three audiences without competing:

| Piece | Audience | The turn it delivers |
| --- | --- | --- |
| Trailer | anyone, cold | there is a method here, and it has teeth |
| Long A | an owner, a peer studio | "nicer" is not the goal; recognition and theatre are |
| Long B | a developer, a collaborator | the ethics are enforced by the build, not by good intentions |
| Shorts I | an owner who suspects something's wrong | naming the snag they couldn't name |
| Shorts II | anyone | twenty businesses, each with one paradox |

---

## 3. Best practice, applied to this repo

Sourced from audiobook, narrative-podcast and Eleven v3 guidance (§9), reduced
to the rules that actually change these scripts.

### Write for the ear

- **One idea per sentence.** The repo's house style stacks subordinate clauses
  beautifully and will not survive being read aloud. Every long sentence in the
  source docs becomes two or three spoken ones.
- **Concrete noun early.** "A shop whose shelf was never stocked" lands. "An
  inventory-presentation failure" does not.
- **No em-dash stacking.** The docs use the em dash as a thinking tool. Speech
  needs full stops. Convert, don't transcribe.
- **Numbers and symbols spelled out.** "Sixty observed faults", "twenty
  concepts", "one hundred and twenty-four of two hundred and thirty-two
  originals sold."
- **Read every line aloud before generating.** If it can't be said in one
  breath, it isn't a line yet. This is the single highest-leverage step and it
  costs zero credits.

### Cadence

- **Vary sentence length deliberately.** The reliable pattern: three short,
  then one long. Uniform cadence is what makes synthetic narration sound
  synthetic, and it is a scripting fault before it is a model fault.
- **Earn silence.** Leave beats after the turn in each piece. Beginners rush
  because silence feels awkward on the page; it doesn't in the ear.
- **Punctuation is the primary rhythm control.** Ellipsis for a held pause,
  comma for breath. Use these before reaching for tags.

### Register — the studio voice

The narrator is a County Down neighbour who has looked closely at your website
and is not going to be rude about it. Warm, specific, unhurried, dry. Never an
agency. Never a lecture.

- Follow the guest-facing vocabulary rules in
  [`owner-voice-on-the-three-pages.md`](owner-voice-on-the-three-pages.md):
  say *the snag*, not *fault*; *part of the site*, not *layer*; *made-up
  phone*, not *wireframe*. Method nouns stay in Long B, where the audience is
  developers and the jargon is the subject.
- **Keep the teeth.** Specific visitor costs, the swap test, the "grey runs
  out" stop. Do not sand into generic reassurance.
- No invented clients, testimonials, rankings or measured results — the
  honesty rules in [`studio-storytelling.md`](studio-storytelling.md) apply
  unchanged to spoken copy.

### Structure

Each long piece uses a **cold open**: drop into a scene mid-action, no
throat-clearing, no "in this episode." Then three acts — set the scene,
something shifts, land the insight. The shift must be a real turn, not a
transition; if a piece has no "but/therefore" beat, it's an essay being read
out and it should be cut.

### Eleven v3 audio tags

Use sparingly and only where the script genuinely needs colour: `[pause]`,
`[reflective]`, `[matter-of-fact]`, `[dry]`, `[slows down]`. Tags are for
passages punctuation cannot reach. A script leaning on tags for every line is
under-written. Establish a baseline style setting per voice first, then reach
for tags.

### Place names — do not use them

**No spoken piece names a town, village, mountain or street.** Decided
10 August, for two reasons that happen to point the same way:

1. **Respect.** These are small places and the businesses in them are
   identifiable by town alone. `studio-recurring-themes.md` already reached
   this position for a different reason — faults are generalised deliberately
   so "an owner should recognise the pattern in their own site, not recognise
   a neighbour being made an example of." Naming the town undoes that in one
   word. Audio travels further than a page and detaches from its context on
   the way.
2. **Simplicity.** Irish and County Down names are mangled by default, and
   every instance is a wasted regeneration and a pronunciation table to
   maintain. Removing them removes a whole class of retake.

Say instead: *the town*, *a small town on the coast*, *round here*, *the
mountains behind it*. This is a **gain, not a concession** — "a shop whose
shelf was never stocked" is a stronger line than the same sentence with a
postcode in it, and the generalised version is the one an owner anywhere
recognises themselves in.

Two carve-outs, both deliberate:

- **The studio's own name** stays. It is the studio's to say.
- **Business names in Shorts II** stay — those concepts are already published
  at `/transformations/` under those names, and the paradox needs a subject.
  But the *towns* they sit in do not, and the paradoxes carry perfectly well
  without them.

Applies to spoken copy only. Briefs, research and case studies are unchanged.

---

## 4. The five pieces

### 1. Trailer — cold open (1.5 min)

The thing you play first. Opens on a visitor's failure mid-action — a
greyed-out business name behind a Meta login dialog — then the swap test as the
turn: *swap your name for a competitor's. If nothing else needs changing, the
site isn't yours.* Ends pointing at the work, not at a form.

Source: [`studio-recurring-themes.md`](film/studio-recurring-themes.md) T1,
X08's proverb bank (T10 is already the swap test, already scripted).

### 2. Long A — The elevation method (11 min)

The strongest material in the repo and the piece most worth the credits.
Thesis: competence gets you correct information and a coherent palette;
*great* needs two more things, and both are grounded in a third.

- **Recognition** — details only someone who studied *their* business would
  know. Attentiveness made visible.
- **Theatre** — one or two moments of surprise, in the register the business
  already trades in. What gets a concept shown to a spouse.
- **The essence** — the one claim true of this business and no competitor,
  usually a paradox.

The paradoxes carry the piece and they are already written: *the chef who
cooked for the nation now judges his day in milk bread buns. A shop whose
shelf was never stocked. Nine years old and still saying "newly opened".
Serious dealer credentials behind a Gmail address.* Find the paradox and the
angle is usually inside it.

The act break is the Scopers failure — applying the hotel method literally to
a zero-waste hot food bar, where day-part heroes and estate maps are *place*
moves and a food bar has no place in that sense. A method that admits where it
broke is more persuasive than one that doesn't, and it is the honest version.

Source: [`the-elevation-method.md`](../docs/the-elevation-method.md), the five
derived elevation briefs.

### 3. Long B — The honesty is compiled (8 min)

The repo tour, and the one piece that is genuinely about *this repository*.
A developer-facing walk whose turn is that the studio's ethics are not a
promise in a README — they are build failures.

Beats: `pnpm build` refuses to complete if prose claims a public count the data
doesn't support. `check-concept-guest-voice.mjs` fails the build when studio
voice leaks into guest copy. A slug reaches `/transformations/` only by passing
five checks in `publication.json`. Every generated image, film **and synthetic
voice** needs an entry in [`image-provenance.md`](image-provenance.md) before
it is committed — including the file you are listening to right now, which is
the natural closing beat.

Then the honest counterweight, because Long B without it is an advertisement:
the 7 August curation held every file in `research/film/clips/studio/audio/`
back from production. No listening score sheet, no local-listener evidence, and
mixes with a 4.8 LU spread and clipping at +0.97 dBTP. The guards are real;
the taste is still human, and it said no.

Source: [`AGENTS.md`](../AGENTS.md), [`REPO_MAP.md`](../docs/REPO_MAP.md),
`tools/check/`, [`AUDIO.md`](film/clips/studio/audio/AUDIO.md).

### 4. Shorts I — Five snags (5 × ~60s)

One per snag from `/where-it-fails/`, each self-contained: stage the snag as a
visitor's errand, name what it costs, land the fix as one concrete change. No
business named, no context needed. Generalised deliberately so an owner
recognises the pattern in their own site rather than recognising a neighbour
being made an example of.

These are the most reusable artefacts in the plan — social cuts, print QR
destinations, page companions — and the cheapest to abandon if the register
is wrong.

### 5. Shorts II — Concept vignettes (6 × ~60s)

Six of the twenty concepts, one paradox each, chosen for range across category
and town: **Cúpla**, **Painted Earth**, **Mourne Cycles**, **Dundrum Inn**,
**Kent Amusements**, **Scopers**. Each: what the business is, the paradox, the
one move the concept made. Every claim traceable to
`transformation-details.ts` and the concept's own brief.

Concepts stay labelled independent and uncommissioned in the spoken copy, not
only in the metadata — one clause, early, in the studio's own voice.

---

## 5. Voice casting

The existing cast in
[`roster.json`](film/clips/studio/voice-bakeoff/roster.json) was selected on
7 August for whispers, proverbs and radio-play lines — **short forms**.
Endurance across eleven minutes was never tested, and it is a different
property. Do not assume the bakeoff winners transfer.

**Audition first (~1,200 credits).** Three candidates × ~450 characters of real
Long A copy, carrying a paradox line and the dry beat. With place names out of
the scripts, the audition judges three things only:

1. Does it hold attention past thirty seconds?
2. Does the cadence vary, or does every sentence land the same way?
3. Is it dry without being cold — a neighbour, not an agency?

Candidates:

| Key | Voice | ID | Case |
| --- | --- | --- | --- |
| Incumbent | MM Slate Narrator | `5vykio5nGgdGfnCLEAJ3` | the calm proverb/radio narrator, closest to the job on paper |
| Incumbent | MM Harbour Brass | `UDLQOECmLD4JOGNJYCNd` | warm neighbour register — the studio voice as §3 describes it |
| Challenger | Bren — Calm Irish Conversational | `RlSVB64yXMZJjq67jbB1` | library voice built for long-form; "quiet authority that feels human rather than performed" |

**Accent caveat.** The library's Irish narration voices are southern —
Waterford, the west, neutral Dublin — not Ulster. Bren may read as *Irish but
from elsewhere*, which for a County Down studio is a real, if quiet, wrongness.
The two MM voices were designed rather than picked, which is why they stay in
the running despite being cast for short forms. If the audition splits on
accent rather than endurance, the answer is a designed voice, not a library
one.

Provisional assignment, subject to the audition:

| Piece | Voice |
| --- | --- |
| Long A, Long B | audition winner (single narrator throughout) |
| Trailer | MM Rain Glass — weight, and it's short enough to carry |
| Shorts I | audition winner, so the series binds to the long pieces |
| Shorts II | MM Harbour Brass — warm neighbour, business-scale material |

One narrator across Long A, Long B and Shorts I is deliberate: it makes the
programme feel like one body of work rather than five experiments.

---

## 6. Production

### Tooling

Extend the existing pattern rather than inventing one.
`tools/pipeline/generate-studio-audio.mjs` already handles roster lookup,
ElevenLabs calls, stem/mix separation, `--only`, `--force` and `ffmpeg-static`.
Fork it to `tools/pipeline/generate-narration.mjs`, driven by a manifest
(`research/narration/manifest.json`) of `{ id, voice, model, script_path,
tags }` so scripts live in reviewable markdown, not in the generator.

Chunk long pieces at natural section breaks — roughly 1,500 characters — and
concatenate. This keeps a bad take from costing eleven minutes of credits, and
it is why the retake factor is 1.3× and not worse.

### Mastering — fixing a known past failure

The 7 August audio failed on loudness before it failed on taste: ~4.8 LU spread
across X08, X07 unusually quiet, X26 clipping at +0.97 dBTP. Do not repeat
this. `ffmpeg-static` is already a dependency, so add a normalisation step to
the generator, applied to every output:

```
loudnorm=I=-16:TP=-1.5:LRA=11
```

−16 LUFS integrated, −1.5 dBTP ceiling — standard for spoken-word programme
material, and it makes the pieces comparable to each other, which the bakeoff
files never were.

### Sound design

The 3,000-credit reserve buys room tone, not scenery. One bed per piece at
most, well under the voice, plus a small number of punctuating effects.
X08's room-tone vocabulary (street rain, shop door bell, counter wood, clock
tick wrong) is already proven and costs nothing to reuse conceptually.

---

## 7. Honesty gate — non-negotiable

Per [`AGENTS.md`](../AGENTS.md), before anything is committed:

1. **Provenance.** Every generated speech file gets an entry in
   [`image-provenance.md`](image-provenance.md) — date, model, voice name and
   ID, script source, and the explicit statement that it is not a recording of
   anyone and no real person's voice was cloned. This applies to internal
   prototypes too, not only shipped files.
2. **Disclosure.** Nothing here is guest-facing yet. If any piece later ships
   on a guest page it needs a visible synthetic-speech disclosure in the
   visible layer — not only in an `alt` or `aria-label`.
3. **Script check.** Spoken copy gets the same treatment as a case study's
   "Sources & limits" block: every claim checked against the concept's own
   copy and `transformation-details.ts`. No claim the concept does not already
   make.
4. **Curation status.** The index file states plainly whether these advance to
   production. Following the 7 August precedent, the honest default on
   generation day is **research only** until there is a listening score sheet
   and local-listener evidence.
5. **Guest voice.** Shorts II speaks *about* businesses in studio voice — it
   must not speak *as* them. The concept guest-voice rule runs the other way
   here and is easy to violate by accident.

---

## 8. Order of work today

1. Narrator audition (§5). **Gate: one voice that holds eleven minutes.**
2. Trailer script → generate → listen. **Gate: is the register right?** If not,
   fix it here, where it costs 1,700 credits and not 12,000.
3. Shorts I and II scripts → generate. Banks complete deliverables early.
4. Long A script, read aloud in full, cut to 9,400 characters → generate in
   sections.
5. Long B same.
6. Master everything through `loudnorm`, write `research/narration/INDEX.md`,
   file provenance entries, commit.

If the window closes early, the plan degrades in reverse order and the pieces
already banked are complete in themselves. That is why the shorts come before
the long pieces despite the long pieces being the point.

---

## 9. Sources

Best practice consulted 10 August 2026:

- [Pacing and Flow: Optimizing Writing for Audiobook Performance — The Urban Writers](https://theurbanwriters.com/blogs/publishing/pacing-and-flow-how-to-optimize-your-writing-for-audiobook-performance)
- [The DIY Narrator's Guide to Pacing and Performance — Sounds and Such](https://soundsandsuch.com/howtoaudiobook/the-diy-narrators-guide-to-pacing-and-performance)
- [10 Essential Audiobook Narration Skills — Backstage](https://www.backstage.com/magazine/article/10-skills-you-need-for-audiobook-narration-voice-work-67133/)
- [How To Create Narrative Podcasts: Writing Story-Driven Shows — Podcast Insights](https://www.podcastinsights.com/create-narrative-podcasts/)
- [How to Write a Narrative Podcast — No Film School](https://nofilmschool.com/how-write-narrative-podcast)
- [Audio tags 101: Directing emotional TTS in Eleven v3 — ElevenLabs](https://elevenlabs.io/blog/v3-audiotags)
- [Eleven v3 Audio Tags: Narrative Intelligence in Speech — ElevenLabs](https://elevenlabs.io/blog/eleven-v3-audio-tags-enabling-narrative-intelligence-in-speech)
- [ElevenLabs API pricing](https://elevenlabs.io/pricing/api)

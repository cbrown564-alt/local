# Studio voice bake-off

- Date: 2026-08-07
- Design model: `eleven_ttv_v3`
- Sample TTS model: `eleven_multilingual_v2`
- Prompt home: `research/film/studio-media-experiments.md` (X6, X8, X17, X25)
- Disclosure: all voices synthetic; required wherever audio ships guest-facing

## Why

X25 whispers were generated with a single voice (Irish Cultural Guide).
One voice cannot cover whisper intimacy, dry proverb, visitor frustration,
owner earnestness, UI antagonist flatness, and deadpan punch. This bake-off
casts 8 designed voices plus library controls so we can pick by ear.

## Research cast selected 7 August 2026

These assignments record the voices used to generate the bakeoff assets. They
are **not production approval**. The score sheet below remains empty, no local
listener decision is recorded, and the media curation advances no synthetic
studio voice. Reopen casting only for a named product need and complete the
ear-test gate before guest-facing use.

| Key | Assignment |
| --- | --- |
| `harbour-whisper` | X25 default whisper |
| `rain-glass` | X25 serious (T02, T09); solemn / X26 |
| `slate-narrator` | X8 proverbs; X6 narrator |
| `harbour-brass` | X18 ask; warm neighbour / request-path VO |

See [`roster.json`](roster.json). X25 whispers regenerated with this cast.
Supporting antagonist (not a “winner”, assigned for UI lines): `consent-bot`
→ X6 / X9 voice-from-nowhere. Studio audio batch:
[`../audio/AUDIO.md`](../audio/AUDIO.md).

## Listen UI

[`listen.html`](listen.html) — or play `../../../../../media/film/clips/studio/voice-bakeoff/samples/` / `../../../../../media/film/clips/studio/voice-bakeoff/design-previews/` directly.

## Designed cast

| Key | Name | Role | Mood | Jobs | Previews |
| --- | --- | --- | --- | --- | --- |
| `harbour-whisper` | MM Harbour Whisper | Intimate postcard whisper | close, dry, after-hours counter | X25, X8 soft takes | `p1` `p2` `p3` |
| `slate-narrator` | MM Slate Narrator | Calm proverb / radio narrator | dry documentary, obvious-and-a-little-sad | X8, X6 narrator, X18 VO | `p1` `p2` `p3` |
| `boots-visitor` | MM Boots Visitor | Visitor / customer | practical, wry, politely impatient | X6 visitor, X17 Heard | `p1` `p2` `p3` |
| `shop-owner` | MM Shop Owner | Owner defending the old site | earnest, warm, a bit defensive | X17 Meant, X6 contrast | `p1` `p2` `p3` |
| `consent-bot` | MM Consent Bot | UI / voice-from-nowhere antagonist | flat corporate courtesy | X6 Voice from nowhere, X9 right channel | `p1` `p2` `p3` |
| `brass-deadpan` | MM Brass Deadpan | Dry humour punchline | bone-dry, understated comedy | X6 punch, X8 wry takes, X20 caption VO | `p1` `p2` `p3` |
| `rain-glass` | MM Rain Glass | Serious / weighty truths | quiet authority, slight melancholy | X25 T2/T9, X8 solemn, X26 VO | `p1` `p2` `p3` |
| `harbour-brass` | MM Harbour Brass | Warm neighbour ask | warm, low, un-salesy invitation | X18 ask, X13 end card, request path VO | `p1` `p2` `p3` |

## Created library voices (slot-consuming)

| Key | Name | voice_id | From preview |
| --- | --- | --- | --- |
| `harbour-whisper` | MM Harbour Whisper | `WyfsOS84GSC89fL2A0YT` | p1 |
| `slate-narrator` | MM Slate Narrator | `5vykio5nGgdGfnCLEAJ3` | p1 |
| `boots-visitor` | MM Boots Visitor | `kRXwZPwlon9UqIERcAK4` | p1 |
| `brass-deadpan` | MM Brass Deadpan | `3UnqvX3L0Q98WCAHjsxs` | p1 |
| `rain-glass` | MM Rain Glass | `vstO5D1QR3FSavE7SemV` | p1 |
| `consent-bot` | MM Consent Bot | `UAEZFvq95kwQ0T7H424I` | p1 |
| `harbour-brass` | MM Harbour Brass | `UDLQOECmLD4JOGNJYCNd` | p1 |

## Library controls

| Key | Name | voice_id | Role |
| --- | --- | --- | --- |
| `control-irish-guide` | Irish Cultural Guide (baseline) | `NPWroowF4phQhaPWjXPj` | Current X25 baseline — known weak |
| `control-village-elder` | Old Irish Village Elder | `eEzkfaTvgdaH5to7Cn0M` | Existing Irish elder |
| `control-george` | George | `JBFqnCBsd6RMkjVDRZzb` | Warm British storyteller |
| `control-daniel` | Daniel | `onwK4e9ZLuTAKqWW03F9` | Steady broadcaster |
| `control-lily` | Lily | `pFZP5JQG7iQjIQuC4Bku` | Velvety British actress |
| `control-alice` | Alice | `Xb7hH8MSUJpSbSDYk0k2` | Clear British educator |
| `control-river` | River | `SAz9YHcvj6GT2YYXdXww` | Neutral informative |
| `control-bill` | Bill | `pqHfZKP75CvOlQylNhV4` | Wise mature American |

## Sample lines

| ID | Label | Text |
| --- | --- | --- |
| `x25-whisper` | X25 whisper (T4) | People arrive with one question. The first screen should answer it. |
| `x8-proverb` | X8 proverb (T1) | A stranger should not need an account to find your front door. |
| `x6-visitor` | X6 visitor | I don't want an account. I want to know if you're open. |
| `x17-owner` | X17 owner | We put the important notes up front so nobody's disappointed. |
| `x6-bot` | X6 consent bot | Create an account to continue. Accept all. |
| `x6-punch` | X6 deadpan punch | That was somebody deciding to visit you. |

## Score sheet (fill by ear)

| Voice | X25 whisper | X8 proverb | Visitor | Owner | Bot | Punch | Keep? | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `harbour-whisper` | | | | | | | | |
| `slate-narrator` | | | | | | | | |
| `boots-visitor` | | | | | | | | |
| `shop-owner` | | | | | | | | |
| `consent-bot` | | | | | | | | |
| `brass-deadpan` | | | | | | | | |
| `rain-glass` | | | | | | | | |
| `harbour-brass` | | | | | | | | |
| `control-irish-guide` | | | | | | | | |
| `control-village-elder` | | | | | | | | |
| `control-george` | | | | | | | | |
| `control-daniel` | | | | | | | | |
| `control-lily` | | | | | | | | |
| `control-alice` | | | | | | | | |
| `control-river` | | | | | | | | |
| `control-bill` | | | | | | | | |

## Casting targets (after listen)

| Job | Wanted quality | Winner (fill) |
| --- | --- | --- |
| X25 whisper | Intimate, dry, ≤8s belief, not tour-guide | |
| X8 proverb series | One consistent calm voice, memorable | |
| X6 narrator | Dry, local-not-salesy | |
| X6 visitor | Practical, wry | |
| X6 voice-from-nowhere | Flat UI courtesy | |
| X17 owner (Meant) | Earnest, not mocking | |
| X17 visitor (Heard) | Short, human loss | |
| Deadpan punch | Bone-dry, no sneer | |

## Regenerator notes

The current assignments remain reproducible research inputs. Do not copy them
into guest-facing production until a named product need reopens casting, the
score sheet is completed by ear and the local-listener gate is met. Near-miss
Irish accents lose to a clear neutral British neighbour voice.

## Commands

```bash
node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --design-only
node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --create
node --env-file=.env tools/pipeline/bakeoff-studio-voices.mjs --samples
```

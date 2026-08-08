# Studio bakeoff audio

- Date: 2026-08-07
- Generator: `tools/pipeline/generate-studio-audio.mjs`
- Cast: `../voice-bakeoff/roster.json`
- Disclosure: all VO synthetic; Foley from ElevenLabs Sound Effects API

## Curation status — research only

No file in this folder advances to production from the 7 August review. X8's
scripts remain a copy bank and X17's meant/heard interaction remains a research
idea, but the generated voices have no completed listening score sheet or
local-listener evidence.

The mixes also need mastering before any future reuse: X8 programme loudness
varies by about 4.8 LU; X07 is unusually quiet and dynamic; X26 reaches about
`+0.97 dBTP` and clips. Do not solve those technical faults unless a named
product need reopens the relevant experiment.

## Listen order

1. `X06-radio-play.mp3` — first 15s with the poster
2. `X08-T01.mp3`, `X08-T04.mp3`, `X08-T09.mp3` — proverb register
3. `X17-meant.mp3` / `X17-heard.mp3` — toggle insight
4. `X09-binaural-walk.mp3` — headphones
5. `X07-asmr-counter-foley.mp3`, `X26-choir-of-clocks-bed.mp3`, `X18-send-the-link.mp3`

## Files

| File | Experiment | Kind |
| --- | --- | --- |
| `X06-radio-play.mp3` | X6 | mixed radio play |
| `X07-asmr-counter-foley.mp3` | X7 | Foley bed |
| `X08-T01.mp3` … `X08-T10.mp3` | X8 | proverb + room tone |
| `X09-binaural-walk.mp3` | X9 | binaural mix |
| `X17-meant.mp3` / `X17-heard.mp3` | X17 | split VO |
| `X18-send-the-link.mp3` | X18 | ask line |
| `X26-choir-of-clocks-bed.mp3` | X26 | clock bed |

Stems live under `stems/X0N/`.

## Cast

| Role | Key |
| --- | --- |
| Visitor | `harbour-whisper` |
| Bot | `consent-bot` |
| Narrator / X8 | `slate-narrator` |
| X17 Owner | `harbour-brass` |
| X17 Heard | `rain-glass` |
| X18 ask | `harbour-brass` |

# Video purpose and duplication audit — 12 August 2026

*Working audit, not a canonical asset manifest. No files were generated,
published, moved, deleted or deprecated during this review.*

The owner records remain
[`clips/studio/MANIFEST.md`](clips/studio/MANIFEST.md) for studio intake and
curation, [`../media-sprint/VIDEO_INVENTORY_2026-08-10.md`](../media-sprint/VIDEO_INVENTORY_2026-08-10.md)
for the dated inventory, [`../image-provenance.md`](../image-provenance.md) for
provenance, and the source data/components under `src/` for what the website
actually uses. This document is a cross-check between those records. It must
not become a second asset owner.

## Result

The five motion generations proposed in
[`shorts-snags-motion-plan.md`](shorts-snags-motion-plan.md) are not five new
content gaps. They map one-for-one to five silent object-theatre films already
wired to `/where-it-fails/`:

| Short | Planned motion | Existing published scene | Purpose match | Disposition |
| --- | --- | --- | --- | --- |
| S1 — login at the door | A second frosted sheet lifts away to reveal a clear entrance. | `login-at-the-door` removes the frosted barrier and lets the waiting boots enter. | Same fault, consequence and barrier-removal turn; near-identical mechanism. | **Redundant.** Keep the complete still proof. Reuse or excerpt the existing scene only if a future short edit needs motion. |
| S2 — are you open? | The hours plate rises from the stall-riser to the fascia. | `are-you-open` shows an umbrella leave the unanswered dark window, then return when the clock and window light answer. | Same fault and answer; a different object gesture, but the published scene already gives the theme a complete physical turn. | **No current gap.** The vertical hierarchy gesture needs a distinct editorial reason before generation. |
| S3 — bell with no clapper | The clapper swings into contact with the bell wall. | `bell-no-clapper` makes the waiting counter bell produce a blank reply card and light in the back room. | Same unanswered-enquiry fault and response; related rather than identical mechanics. | **No current gap.** Keep the still proof unless the clapper itself becomes indispensable to a final short cut. |
| S4 — best thing hidden | A low plaque rises to window height. | `best-thing-hidden` moves the small brass key from a hidden drawer to the front of the shop. | Same hidden-to-prominent turn, with a directly equivalent brass object. | **Redundant.** The existing scene already owns the physical metaphor. |
| S5 — swap test | A blank nameplate lifts away from its mounting marks. | `swap-test` moves one blank nameplate between near-identical shopfronts, ending after it seats on the detailed shop. | Same theme, same object and the same plate-relocation mechanism. | **Exact semantic duplicate. Do not generate.** |

The revised short-film recommendation is therefore: **ship or review the five
shorts as the still-first proof cuts they already are; do not run the five-clip
Omni slate.** If a later edit requires motion, try the matching published
scene first. Reopen generation only against a named short-specific need that
the existing scene cannot meet, such as timing, aspect ratio or continuity
with the short's selected still world. “One motion beat per short” is not such
a need by itself.

## Evidence and counting rules

This audit used four kinds of evidence:

1. all MP4/WebM/MOV paths under `public/` and `media/`;
2. source references under `src/`, followed through dynamically constructed
   paths where necessary;
3. FFprobe duration, dimensions and audio-stream checks, plus one-frame-per-
   second contact sheets for the five published studio films and their
   research masters;
4. the studio manifest, provenance record, media-sprint inventory, proof-cut
   concat files and current motion plans.

At this snapshot there are **143 physical video files**: 61 public MP4s, 50
public WebMs and 32 research/source MP4s. That is not 143 creative works:

- MP4/WebM pairs are delivery encodes of one work.
- The four desktop/mobile town-film files are two assemblies in two delivery
  lengths, not four narratives.
- Public studio files are silent, sometimes trimmed delivery derivatives of
  research masters that retain generated audio.
- Before/after screen captures, proof cuts and assembled reels are authored
  edits or evidence, not new generated scenes.

“Wired” below means referenced by the current source that builds a route. It
does not mean reviewed by a visitor, approved by a subject, or promoted beyond
that route.

## What the website actually uses

### `/where-it-fails/`: five published fault films

The route imports `FaultWalk.astro` and `SwapTest.astro`. Those components
wire all five MP4/WebM pairs below. Each is poster-first, `preload="none"`,
silent, explicitly started with “Watch the scene”, visibly marked “AI-made”,
and replaced by the settled poster when motion is unavailable. T10 supports
the draggable swap test; it does not replace it.

| Semantic purpose | Website delivery asset | Preferred research master | Delivery relationship | Status |
| --- | --- | --- | --- | --- |
| T01: remove the login barrier and let the visitor enter | `public/media/studio/login-at-the-door.{mp4,webm}` — 8.00s, 1280×720 | `media/film/clips/studio/T01-login-at-the-door.mp4` — 8.00s | Silent normalized delivery derivative of the master. | Wired on `/where-it-fails/#t1`; preferred published version. |
| T04: answer “are you open?” on arrival | `public/media/studio/are-you-open.{mp4,webm}` — 8.71s, 1280×720 | `media/film/clips/studio/T04-are-you-open.mp4` — 8.00s | Corrected public edit resolves onto the numeral-free poster; not a byte copy of the intake master. | Wired on `/where-it-fails/#t4`; preferred published version. |
| T05: turn an unanswered enquiry into a visible response | `public/media/studio/bell-no-clapper.{mp4,webm}` — 10.00s, 1280×720 | `media/film/clips/studio/T05-bell-no-clapper.mp4` — 10.00s, 1920×1080 | Scaled, silent delivery derivative; public poster comes from the final half-second. | Wired on `/where-it-fails/#t5`; preferred published version. |
| T07: bring the best reason out of hiding | `public/media/studio/best-thing-hidden.{mp4,webm}` — 8.00s, 1280×720 | `media/film/clips/studio/T07-best-thing-hidden.mp4` — 8.00s | Silent delivery derivative. The manifest retains a floating-key clarity caveat. | Wired on `/where-it-fails/#t7`; preferred published version with caveat. |
| T10: prove whether the name can move without the site changing | `public/media/studio/swap-test.{mp4,webm}` — 5.04s, 1280×720 | `media/film/clips/studio/T10-swap-test.mp4` — 8.00s | Public edit ends at source frame 120/5.00s and excludes the source's incorrect final plate movement. | Wired on `/where-it-fails/#t10`; preferred published version and the direct S5 duplicate. |

The different file hashes are expected because these are normalized, muted or
trimmed encodes. Visual comparison confirms the public T10 is the first useful
turn from the research master, not a separate nameplate concept.

### Other current route families

| Route/use | Preferred assets | Semantic job | Duplicate treatment |
| --- | --- | --- | --- |
| Homepage `/` | `public/media/home/clay-phone-homepage.mp4` | One illustrative clay-phone film under the map: make the next useful action easy to find. | Current homepage film. Do not confuse it with the town-film prototype. |
| Home film prototype `/prototypes/home/film/` | `dundrum-film*` and `newcastle-film*` MP4/WebM assemblies | Two imagined dawn-to-dusk town films. Twelve files under `media/film/clips/{dundrum,newcastle}/` are their six-shot source clips. | Desktop/mobile and MP4/WebM files are delivery variants, not new works. These films are prototype-only on the current homepage direction. |
| Transformation pages | 30 `*-before.mp4` / `*-after.mp4` captures; `bucks-head-journey`; `hotel-enniskeen-reel` | Interface evidence and two captioned journey/reel edits. | Treat as product proof/capture works, not generated scene alternatives. Their WebMs are delivery encodes. |
| Concept routes | Bucks Head, Castle Farm, Kent Amusements and Mourne Cycles hero films; Cupla, Donard Hotel and Scopers essence films; Scopers risograph loop | Identity-specific concept atmosphere or product gesture. | Different subjects and page jobs; no direct duplicate of the five generic fault scenes. |

Eleven concept/reserve MP4s sit under `public/media/concepts/` but have no
current `src/` reference: Betty's melt; Castle Farm delivery and weekly-table;
Dundrum Inn blue hour; Enniskeen day/dusk and outreach reel; Hugh McCann's
table setting; Kent afternoon comic parts 1–3 and 4–6 plus promenade lights;
and Newcastle Chamber harbour. Preserve them as reserves. Their location
inside `public/` does not make them wired or preferred. The Newcastle mobile
town film may look unreferenced to a literal string search, but
`HomeFilmHero.astro` constructs that path dynamically for the prototype.

## Research, proof and candidate catalogue

| Group | Files/works | Purpose | Current status and preferred disposition |
| --- | --- | --- | --- |
| Town-film source clips | 12 MP4s under `media/film/clips/{dundrum,newcastle}/` | Six source shots per assembled town film. | Source masters for the prototype assemblies; preserve. Not twelve website films. |
| Studio theme masters | T01, T04, T05, T07 and T10 under `media/film/clips/studio/` | Generated source/intake for the five published fault scenes. | Research masters; public delivery derivatives above are preferred on the website. |
| Studio X experiments | X02, X05, X10, X16, X18, X19, X20, X21, X22, X26 and X27 | Format and metaphor experiments. | Not wired. Retain manifest decisions: mostly killed/soft-failed; X19 page-only support; X18 rework only if a page proves a need. Do not reopen them to fill a slate. |
| Studio reel proof | `studio-reel-v0.mp4`, 26s, silent | Internal T01 → T04 → provisional X18 sequence proof. | Proof only; never copy to `public/`. It contains existing works, not three new scenes. |
| Shorts still proofs present in this checkout | S2 60.8s, S3 v2 57.2s, S5 59.44s | Narrated held-image proofs. | Complete research proof cuts, not motion footage. Keep as the preferred short form unless a final edit proves a missing beat. |
| Shorts proofs held outside this worktree | S1 and S4 are absent from this worktree but were located read-only at `/Users/cobro/code/local/media/film/clips/shorts-snags/{S1,S4}/`. | Same still-under-voice proof role. | Location resolved: both complete proof cuts and their still masters exist in the main checkout. Do not copy or rebuild them merely to populate this worktree. |

No manual Gemini result MP4 exists under the media-sprint handoff directory in
this checkout. The manual handoff document therefore describes queued work,
not a hidden cache of newer preferred clips.

## Current plans that discovery changes

| Planned generation | Existing evidence | Audit decision |
| --- | --- | --- |
| Five clips in `shorts-snags-motion-plan.md` | The five published fault films cover the same five themes and physical turns; all short proofs are described as complete without motion. | **Freeze the whole slate.** S5 is exact duplication; S1 and S4 are near-mechanical duplication; S2 and S3 need a new short-specific reason, not just thematic difference. |
| `CENTRAL-GV-T01` continuity repair | T01 already has a wired 8s silent scene and settled fallback. | Quality-repair candidate only, not a content gap. Review the live defect before spending a generation. |
| `CENTRAL-GV-T04` temporal repair | T04 already has a wired corrected 8.71s silent edit ending on the numeral-free frame. | The handoff is stale as a gap claim. Generate only if a fresh review finds a defect the current corrected edit still has. |
| `CENTRAL-GV-X18` envelope opening | `/where-it-fails/` already uses the selected closed/open still pair beside live offer copy; current X18 motion is marked rework. | Optional enhancement, not a genuine experience gap. Do not generate without a named interaction that needs the opening action. |
| Remaining X experiments/backlog | The studio manifest already kills or reserves most existing attempts and names the few page-only uses. | Keep those curation decisions. Discovery is a reason to consume selected assets, not reopen rejected branches. |

### Editorial reuse result — 12 August 2026

The follow-up edit review closed the remaining reuse question. S1–S5 all stay
as still-first proofs; none of the existing fault films should be cut into the
current shorts. S5 was tested as a temporary, uncommitted full-length edit by
replacing its 0:10–0:15 still with the public 5.04-second T10 clip. The motion
made the edit worse: the set, crop, architecture, grade and light changed
mid-sentence, and the clip added a broader second-shop/details arc that the
narration did not ask for. The other four fail the same continuity or object-
identity bar on direct still/master comparison. The canonical per-short
decisions now live in
[`shorts-snags-motion-plan.md`](shorts-snags-motion-plan.md).

## Decision rule for future motion

Before any new short or fault-scene generation, search by **purpose**, not
filename:

1. name the visitor problem and the one physical turn;
2. check the five published fault films, concept films, proof cuts and X
   manifest for that same problem/turn;
3. identify the exact route and edit window the new asset must serve;
4. prefer a safe excerpt, re-encode or static hold when it already communicates
   the turn;
5. generate only when the existing asset fails a concrete requirement and the
   new brief states that difference.

A different crop, object noun or folder is not a distinct purpose. A required
aspect ratio, continuity lock, timing window or missing causal beat can be.

## Verification note

The current route source and its verification suite both pin the same five
studio MP4/WebM pairs on `/where-it-fails/`; `FaultFilm.astro` pins the
poster-first, explicit-play, muted delivery pattern. The media files were also
probed directly and reviewed as contact sheets against their research masters.

The repository's pre-build research-prose, prose-count, publication,
public-asset, Open Graph, guest-voice and provenance checks passed during this
audit. A fresh Astro render and `test:where-it-fails` could not run because
this worktree has no installed Astro binary; the offline dependency install
also lacked the cached `@astrojs/sitemap` tarball. Therefore “wired” in this
snapshot is established from the current route/component source and the
existing render-test contract, not from a newly produced `dist/` page. Local
Markdown links and `git diff --check` passed.

# Reorganising `research/` — plan

*10 August 2026. Written after measuring the folder rather than reading it.
Nothing here has been executed.*

---

## 1. What the numbers say

| | |
| --- | --- |
| Total size | **760 MB** |
| Media files (png/jpg/mp4/mp3) | **606** |
| Prose files (md) | **129** |
| Tracked in git under `research/` | 420 MB |
| `.git` | **1.4 GB** |
| Exact duplicate media (68 groups) | **129 MB wasted** |

**Media is 99% of the bytes and 18% of the files.** The prose — the part that
is actually research, that gets read, diffed, reviewed and argued with — is
about 2 MB buried inside three quarters of a gigabyte of renders. That is the
problem in one line, and it is exactly what you named.

Weight by area:

| | |
| ---: | --- |
| 292 MB | `media-sprint/codex-generated` |
| 175 MB | `film/clips` |
| 64 MB | `film/stills` |
| 57 MB | `audits/.../screenshots` |
| 43 MB | `../media/media-sprint/masters` |

## 2. Three separate problems, currently tangled

**(a) Kind is not separated from workstream.** The folder is organised by
workstream — film, narration, concepts, audits — and inside each, prose and
binaries sit side by side. So every workstream folder is both a reading surface
and a media dump, and neither works well.

**(b) The archive imported duplicates.** The Codex recovery is 131 PNGs,
279 MB, untracked. **60 of those 131 already exist elsewhere in the repo under
curated, meaningful names** — the X25 postcard fronts, the T04 corrected poster,
the X18 rework plates. Only **71 files (171 MB) are genuinely new.** The archive
is currently a 279 MB folder whose main content is a second copy of things we
already named properly. Across all of `research/` there are 68 duplicate groups
wasting 129 MB.

**(c) The git policy already exists and was applied to two directories.**
`.gitignore` excludes `media/concepts/*/evidence/` and
`media/audits/**/screenshots/` — media deliberately kept out of history. That
rule was right, and it was never extended to `film/clips`, `film/stills` or
`media-sprint/`, which is why 420 MB is in the repo and `.git` is 1.4 GB. **This
is not a new policy to invent. It is an existing one to finish applying.**

## 3. The proposed shape

Split by **kind** at the top level, keep **workstream** as the second level, so
every path stays guessable.

```
research/                    committed. prose, manifests, decisions. ~2 MB.
  film/                      briefs, prompt sheets, theme docs, shot lists
  narration/                 scripts, plans, listening notes
  concepts/ audits/ …        unchanged in spirit, media removed
  image-provenance.md        stays here — it is the index of the media
  INDEX.md                   new: what each workstream is, one line each

media/                       gitignored except the manifests. ~760 MB.
  raw/                       every generator output. immutable, never edited.
    codex/2026-08-03/…
    omni/2026-08-07/…
    eleven/2026-08-10/…
  plates/                    curated and renamed — what the prose refers to
    trailer/ studio/ towns/
  masters/                   mastered and assembled deliverables
  MANIFEST.md per folder     committed. name → provenance → what it is for.
```

Two rules that make it hold:

1. **A file under `research/` is prose or it is a manifest. Never a binary.**
2. **A file under `media/raw/` is never renamed, edited or deleted** — it is the
   audit trail. Curation happens by *copying* into `plates/` with a real name.

**Enforced, not just documented.** Add `tools/check/check-research-prose.mjs`
to fail the build if a binary lands under `research/`. The repo already runs six
`check-*` scripts in `build`, so this is one more line in an established
pattern — and a documented convention with no check is how the current state
happened.

## 4. Phases

Each phase is independently useful and independently revertible.

**Phase 1 — dedup (fast, ~129 MB back, no structural change).**
Hash every media file. Where a UUID-named copy and a curated-named copy are
byte-identical, keep the curated one and delete the twin, recording the mapping
in the archive manifest so traceability to the Codex thread survives. This alone
takes `codex-generated` from 279 MB to ~171 MB and removes the most confusing
thing in the folder — two names for one image.

**Phase 2 — name the 71 survivors.** They are currently
`019fd0a6-…--exec-088175fc-….png`. A UUID is not an asset; nobody will ever pick
one from a list. Contact-sheet them in batches, name what is worth keeping,
retire what is not. **This is the phase that unblocks the trailer question**,
and it is the one that needs a human eye rather than a script.

**Phase 3 — split kinds.** Move binaries out of `research/` into `media/` per
§3, leaving prose behind. Mechanical, scriptable, and the diff is enormous but
boring. Update the relative links in the prose as part of the same commit — the
26 July precedent in `image-provenance.md`, where moved images left three public
case studies describing photography that no longer existed, is the exact failure
to avoid.

**Phase 4 — git policy.** `.gitignore` `media/` except `MANIFEST.md`, add the
check script. New media stops entering history from that commit on.

**Phase 5 — trailer re-assessment.** With named plates, walk the eighteen shots
in `film/trailer-prompts-ordered.md` and mark each: have it, have something
close, still need it. Cheap once Phase 2 is done, guesswork before.

## 5. Two things to decide, not assume

**History.** Phases 4 and 5 stop the bleeding; they do not shrink the existing
1.4 GB `.git`, because the media is already in history. Only a rewrite
(`filter-repo`, or LFS migration) reclaims that, and a rewrite changes every
commit SHA. **I would not do it now.** There is a concurrent worktree on this
repo, and a rewrite under a second worktree is how people lose work. If the
1.4 GB genuinely hurts, do it deliberately, alone, with the other worktree
closed — as its own piece of work, not as a tail end of this one.

**Whether `media/` lives in the repo at all.** Keeping it inside the working
tree but gitignored means it is present, browsable and one `.gitignore` edit
away from being committed by accident. Putting it outside the repo entirely
(`~/media/mourne/`) makes that impossible but breaks every relative link in the
prose. **Recommend inside, gitignored** — the links are worth more than the
guarantee, and the check script covers the accident.

## 6. The fast path, if the trailer is the real goal

The reorganisation is worth doing on its own merits, but it is not on the
critical path for the film. **Phase 2 is.** If what you want this week is to
know which of the eighteen shots we already have, the shortest route is:

1. Contact-sheet the 71 unique Codex images in batches of twelve.
2. Tag each against the eighteen-shot list, or as "studio archive, not trailer".
3. Answer the coverage question.

That can happen today, against the folder exactly as it stands, and its output —
a named, tagged set — is Phase 2's deliverable anyway. Nothing is wasted by
doing it first, and the reorg gets easier for having been done.

**Recommendation: Phase 1 now** (it is scripted, safe and removes 129 MB of
genuine confusion), **then §6**, then Phases 3–4 when there is an hour and a
clean worktree.

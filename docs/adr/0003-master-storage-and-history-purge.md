# Masters stay local; sensitive blobs leave Git history

Businesses' own reference photographs and the scored prospect datasets were
once reachable from production URLs or a public GitHub repository. Removing
them from `public/` and making the repo private stops new exposure. It does
not erase bytes already cloned or cached. `PLAN.md` §6.2 therefore required two
decisions before the next recapture wave.

## Master storage — decided 31 July 2026

**Git LFS and external object stores were rejected.** The masters that must not
ship are reference photographs held for outreach and future faithful
visualisations. They are few, change rarely, and must never deploy. Keeping them
on disk under `research/concept-reviews/evidence/`, which is listed in
`.gitignore`, is enough: local checkout carries them, CI and deploys never see
them, and `pnpm optimize:media` regenerates any `public/` derivatives from the
masters when needed.

Derivative generation stays reproducible: committed JPEG/MP4 masters in
`public/` plus `scripts/optimize-public-media.mjs`.

## History purge — decided and executed 31 July 2026

**Purged from every commit** with `git filter-repo` (see
`scripts/purge-sensitive-git-history.sh`):

- `public/audits/concept-imagery-audit.html` — internal audit that reached
  production once.
- Twenty-one businesses' own photographs that lived under `public/images/` —
  Enniskeen (19), Castle Farm box, Buck's Head hearth — including their
  `-640.webp` and `-1265.webp` derivatives.
- The same masters after they were mistakenly committed under
  `research/concept-reviews/evidence/` in the deploy-boundary pass; evidence
  must remain git-ignored.
- `src/data/businesses.json` and `research/verifications.json` — named
  businesses, phones, emails and candid pipeline scores. The repo is private
  since 23 July 2026, but history was public until that day.

**Not purged:** AI-generated concept imagery, third-party CC BY-SA place
photographs with public credits, and comparison media — those are meant to
ship.

After the rewrite, the two JSON datasets were recommitted from the working tree
so the site and pipeline keep working. Evidence masters were restored locally
from a pre-purge copy; they are not in Git.

Repository privacy plus this purge is belt-and-braces, not amnesia: anyone who
cloned or cached the public period still has what they took. The purge stops
new clones and Git hosting from carrying the old blobs forward.

## Consequences

- Anyone with an existing clone must re-clone or hard-reset after a force-push
  of the rewritten `master`.
- New evidence masters are added only on disk under the git-ignored tree; never
  `git add -f`.
- `research/concept-reviews/image-provenance.md` records held paths; the audit
  HTML at `research/concept-reviews/audits/` resolves held images from
  `../evidence/`.

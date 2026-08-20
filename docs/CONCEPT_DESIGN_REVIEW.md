# Concept publication review

This document owns the minimum standard for showing an independent concept on
Mourne Made. It replaces the scored v1.1 process used on 24–25 July 2026. That
process and its evidence are preserved in
[`docs/archive/concept-review-v1.1-2026-07-25.md`](docs/archive/concept-review-v1.1-2026-07-25.md).

The concepts are proposals, not finished client websites. Publication requires
the absence of a serious defect. Stronger craft determines which concepts
receive extra investment as flagships.

## The five checks

A concept may appear in `/transformations/` when all five answers are yes.

| Check | Yes means |
|---|---|
| Truthful and respectful | The business is current, material facts are sourced or labelled as proposals, and the page does not imply approval or a relationship that does not exist. |
| Clear and specific | A visitor can understand the improvement and recognise why it belongs to this business rather than a generic category. |
| Works as presented | The main action works, reaches an honest prototype handoff, or is clearly labelled illustrative. Ordinary phone and desktop layouts do not prevent someone judging the concept. |
| Safe to publish | Reused assets may be published, generated or placeholder material is disclosed, and essential text and actions have no serious accessibility defect. |
| The owner would recognise themselves | The owner would see their own business improved rather than replaced. What they chose deliberately survives, the concept is better than what they already have, and nothing on the page talks about them in the third person. |

### Would the owner recognise themselves in this?

Added 27 July 2026, after three concepts passed the first four checks and were
withdrawn anyway. The first four ask whether a concept is *honest*. None of them
asks whether it is *good*, or whether the business would want it.

Tonn Ruray Café passed the first four checks and replaced a new owner's
personal, deliberate site — their own photographs, their own chosen quote —
with studio typography on cream. Groves Chemist passed while proposing to
rebuild the centralised platform the pharmacy had come off. Both were
withdrawn. The Dundrum Inn was an early live-site comparison that helped
motivate this question; it later published under the five checks (27 July
2026) as dated portfolio work. Do not cite it as a current failed fifth check.

Four questions answer it:

1. **Does what they chose deliberately survive?** Their colours, their typeface,
   their photographs, their words. A concept carries the subject's identity, not
   the studio's — that rule is in `docs/DESIGN.md` and all three failures broke it.
2. **Is this better than what they already have?** Open the live site and the
   concept side by side at the same size. If the live site wins on the thing the
   business actually sells — the room, the plate, the view — the concept is not
   ready, however honest it is.
3. **Would they read anything here as a criticism of them?** Remarks about the
   current site, its pricing or its language settings belong in the pitch, never
   inside the page being offered to them.
4. **Are we solving a problem they have?** A stale menu and a dead booking
   button are maintenance problems. A redesign does not fix them, and offering
   one as though it does misreads the business.

A *no* is a blocker, not an improvement. The repair is usually to restore what
was removed rather than to add anything.

A visual refinement, missing secondary page, imperfect composition or
nonessential accessibility improvement does not block publication. Record it as
an improvement.

## Outcomes

- **Publish** — all five checks pass.
- **Fix blocker** — name the failed check and the smallest repair.
- **Archive** — the business is no longer suitable or the underlying idea is
  too weak or misleading to repair economically.

There are no scores, category floors, repair limits or mandatory independent
review. A second opinion is useful for a disputed fact or a flagship decision,
but it is not required for ordinary publication.

## Review process

1. Open the concept and the **live site** side by side at phone and desktop
   size, then the case study.
2. Try the main action and any visible control that claims to work.
3. Check the dated business record, material claims, disclosure and asset
   source.
4. Answer the five checks.
5. Record at most one blocker and two optional improvements.
6. Publish immediately when the blocker is fixed.

The review should normally take 10–15 minutes. Use a deeper design critique only
when deciding whether to make a concept a flagship, print it for direct
outreach, or develop it into client-ready work.

## Repository record

`research/publication.json` records the answers for public
concepts. `pnpm build` rejects a public slug when its record is missing, a check
is false, or a blocker remains. It does not enforce aesthetic scores, reviewer
identity, source fingerprints or repair counts.

The fifth check, `ownerWouldRecognise`, is required for every review dated
27 July 2026 or later. The seventeen concepts published before that date were
never asked the question; `pnpm build` names them as owing a re-review rather
than failing, so the debt is visible on every build until it is paid. Answering
it for a concept means setting the field, not deleting the warning.

`PLAN.md` owns the unreviewed queue and the next action. `PROSPECTS.md` owns each
business's pipeline stage.


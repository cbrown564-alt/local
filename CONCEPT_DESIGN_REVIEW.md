# Concept publication review

This document owns the minimum standard for showing an independent concept on
Mourne Made. It replaces the scored v1.1 process used on 24–25 July 2026. That
process and its evidence are preserved in
[`docs/archive/concept-review-v1.1-2026-07-25.md`](docs/archive/concept-review-v1.1-2026-07-25.md).

The concepts are proposals, not finished client websites. Publication requires
the absence of a serious defect. Stronger craft determines which concepts
receive extra investment as flagships.

## The four checks

A concept may appear in `/transformations/` when all four answers are yes.

| Check | Yes means |
|---|---|
| Truthful and respectful | The business is current, material facts are sourced or labelled as proposals, and the page does not imply approval or a relationship that does not exist. |
| Clear and specific | A visitor can understand the improvement and recognise why it belongs to this business rather than a generic category. |
| Works as presented | The main action works, reaches an honest prototype handoff, or is clearly labelled illustrative. Ordinary phone and desktop layouts do not prevent someone judging the concept. |
| Safe to publish | Reused assets may be published, generated or placeholder material is disclosed, and essential text and actions have no serious accessibility defect. |

A visual refinement, missing secondary page, imperfect composition or
nonessential accessibility improvement does not block publication. Record it as
an improvement.

## Outcomes

- **Publish** — all four checks pass.
- **Fix blocker** — name the failed check and the smallest repair.
- **Archive** — the business is no longer suitable or the underlying idea is
  too weak or misleading to repair economically.

There are no scores, category floors, repair limits or mandatory independent
review. A second opinion is useful for a disputed fact or a flagship decision,
but it is not required for ordinary publication.

## Review process

1. Open the concept and its case study at phone and desktop size.
2. Try the main action and any visible control that claims to work.
3. Check the dated business record, material claims, disclosure and asset
   source.
4. Answer the four checks.
5. Record at most one blocker and two optional improvements.
6. Publish immediately when the blocker is fixed.

The review should normally take 10–15 minutes. Use a deeper design critique only
when deciding whether to make a concept a flagship, print it for direct
outreach, or develop it into client-ready work.

## Repository record

`research/concept-reviews/publication.json` records the four answers for public
concepts. `pnpm build` rejects a public slug when its record is missing, a check
is false, or a blocker remains. It does not enforce aesthetic scores, reviewer
identity, source fingerprints or repair counts.

`PLAN.md` owns the unreviewed queue and the next action. `PROSPECTS.md` owns each
business's pipeline stage.


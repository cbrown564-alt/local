# Decision register

Living index of what is **standing**, **current**, **superseded**,
**experiment**, or **open**. Written 18 August 2026 from a history audit
(see `docs/software-factory-proposals.md` §§12–14).

This document owns the question "what have we decided, and what is still
unsettled?" `PLAN.md` owns the next actions. `PRODUCT.md` owns positioning.
ADRs remain the long-form record of a single choice; this register is the
index and the place a contradiction is named before someone "just ships."

Preferences will change. When they do: supersede, list rework, pin if needed.
Do not edit an old ADR silently to match the tree.

## How to use

| Class | Use |
|---|---|
| **Standing** | Honesty / structure bars. Violate only with a new ADR and a check. |
| **Current** | Today's product choice. May be replaced; must say what is now false. |
| **Superseded** | History. Keep the link so we do not repeat it. |
| **Experiment** | One pack or prototype allowed to diverge; name the question. |
| **Open** | Unresolved. Needs an owner and a "decides when." Default if someone must ship first. |

**Supersession:** new row + `supersedes: <id>` + rework list. Old row
`status: superseded`.

**Factory:** a later drift check should fail when a `current` `mustHold` is
false in the tree (Proposal W). Until that check exists, treat a red row
below as a human gate.

---

## Standing (do not casually violate)

| ID | Decision | Must hold | Since |
|---|---|---|---|
| S1 | Guest-facing concept copy speaks as the business; studio method stays in banners, research, comments, Sources & limits | `pnpm test:guest-voice` clean | Elevation method 31 Jul 2026; AGENTS.md |
| S2 | No invented facts for atmosphere | Claims from `verifications.json` or the business's own public words | Elevation honesty boundary |
| S3 | A concept has at most three homes | `src/concepts/<slug>/`, `public/media/concepts/<slug>/`, `research/concepts/<slug>/` | REPO_MAP 31 Jul 2026 |
| S4 | Edit `public/`, never `dist/` | — | REPO_MAP |
| S5 | Generated media: provenance in the same commit; guest-facing work needs a **visible** disclosure, not only alt | `check-image-provenance`; publication "safe to publish" | 28 Jul–31 Jul lessons |
| S6 | Publication is five yeses, not a score | `research/publication.json`; no v1.1 7.0 gate | 27 Jul 2026 |
| S7 | Look-and-decide before abstract AI offers | Website (or labelled after) before automations | Factory proposals §5; not yet in PRODUCT.md |
| S8 | Ordinary counter: owners do not operate the factory | No prompt literacy required of owners | Factory proposals §7 |

S7–S8 are standing **intent** from 18 Aug 2026 proposals. They are not yet
product law. Promote into `PRODUCT.md` only when positioning is ready to move.

---

## Current decisions (may be superseded)

| ID | Decision | Must hold / watch | Since | Notes |
|---|---|---|---|---|
| C1 | Personalised hand-delivered one-sheets; no generic door-drop | ADR-0001; print path uses `onesheets.ts` | 24 Jul 2026 | Tension: `research/outreach-postcards.md` still discusses door-drop volume — see Q4 |
| C2 | Printed QR: `/transformations/<slug>/?source=onesheet-<slug>`; inbox must accept `source` | `pnpm test:source-attribution` | ADR-0002; closed 6 Aug | |
| C3 | Masters that must not ship stay gitignored on disk; history purged 31 Jul | ADR-0003; no `git add -f` of evidence | 31 Jul 2026 | |
| C4 | `Shore` at **two** scales: `band` in every footer now; `stage` held to one civic route | ADR-0004 (not PLAN §7 "three scales") | 5 Aug 2026 | PLAN §7 is stale |
| C5 | Census claim: 188 trading, 96 lit / 92 dark; never "most"; dated count | ADR-0005 numbers; CONTEXT.md lit/dark bar | 14 Aug 2026 | Supersedes 85/166 and 281-dark headlines |
| C6 | New public concepts gated on conversation / pilot evidence | PLAN.md Blocked | 3 Aug 2026 | |
| C7 | Browser journey suites retired; static pins + written gaps | PLAN.md §1c | 4 Aug 2026 | Gaps are unpaid, not forgotten |
| C8 | Representative prototypes: operating page → impossible local → combination only after both | PLAN.md 9 Aug | 9 Aug 2026 | |

### C9 — Civic map product — **conflicted (must decide)**

Two current stories exist. Pick one; supersede the other; queue rework.

| Story A — ADR-0005 (14 Aug) | Story B — shipped (`d31e0e8`, 14 Aug) |
|---|---|
| Route `/the-lights/` | Route `/the-map/` |
| Anonymous displaced lights, inline SVG, no JS | Leaflet, named businesses, exact coordinates |
| Dark never named or hoverable | Directory + website status + Google Maps links |
| Privacy copy matches A | Privacy copy still describes A, links to B |

**Default until decided:** treat the **shipped page** as what visitors see,
and treat ADR-0005 + privacy prose as **open contradiction** (Q1). Do not
"fix" privacy text or the ADR in passing — that is silent supersession.

---

## Superseded (history)

| ID | Was | Became | When |
|---|---|---|---|
| X1 | Generic A5 door-drop first | C1 one-sheets | ~24 Jul 2026 |
| X2 | v1.1 scores ≥7.0, independent reviewer, one repair then retire | S6 five checks | 25–27 Jul 2026 |
| X3 | Public portfolio reset to zero | Eighteen published under five checks | 27 Jul–3 Aug 2026 |
| X4 | Business photography on public concepts (then withdrawn 26 Jul) | AI / disclosed / rights-exceptions (see Q2) | 26–31 Jul 2026 |
| X5 | Print milestone before inbox proves `source` | C2 inbox-first | ADR-0002 |
| X6 | Hotel elevation moves as the method | Shape/register elevation method | 31 Jul 2026 |
| X7 | Puppeteer CI as the trust baseline | C7 static pins | 4 Aug 2026 |
| X8 | Invented `MourneMotif` as house skyline | Real `Shore` `band` | ADR-0004; motif retired 14 Aug |
| X9 | Shore `stage` on `/about/` | ADR-0005: one civic route (then Q1) | 14 Aug 2026 |
| X10 | Buck's Head in first-wave walk | Stop redesign pitch; Scopers + Cúpla remain | ADR-0001 outcome 27 Jul |

Archive paths stay: `docs/archive/plan-before-publication-reset-2026-07-25.md`,
`docs/archive/concept-review-v1.1-2026-07-25.md`. Do not treat them as gates.

---

## Open questions (need a concrete choice)

| ID | Question | Owner hint | Decides when | Default if we must ship |
|---|---|---|---|---|
| Q1 | Is the civic product anonymous lights (`/the-lights/`) or a named directory (`/the-map/`)? Align ADR-0005, privacy, `lights.json`, and the shipped route. | Product | Before any further map/lights work | Do not add features to `/the-map/` that assume ADR-0005 |
| Q2 | Imagery rule: "AI-only public" vs ADR-0003 CC + firm-owned published photos (Kelly, Douglas, Chamber, Donard Hotel)? Write the exception list. | Elevation / provenance | Next media or publish | Allow licensed CC and the firm's own **already-published** assets; keep withdrawn masters withdrawn |
| Q3 | Homepage claim door: restore the link or delete the comment and accept `/transformations/` as the door? | Shell | Next homepage PR | Do not advertise a claim door that is not there |
| Q4 | Are A6 postcards (incl. door-drop volume) a current channel or a rejected option under C1? | Outreach | Before any postcard print | C1 wins; postcards stay research |
| Q5 | Dundrum Inn: teaching example says check 5 failed; `publication.json` says Publish. Which is true? | Publication | Next Inn edit or review | Record is Publish; fix the teaching sentence or re-review |
| Q6 | `PLAN.md` suite counts (12 / 13/13) vs 17 suites in the runner | PLAN | Next PLAN edit | Runner is truth |
| Q7 | Pattern canon for packs (data layer, shell, disclosure, pins) — see below | Factory | Before next new pack | Use hypothesis canon; label exceptions `legacy` |
| Q8 | Print object: stock, bleed, colour | PLAN §9 | Before ink | Do not send files to a printer |
| Q9 | Held prospects (Murdock, South Down Signs) and GBP owner account | PROSPECTS / PLAN | Unblock conditions | No publish, no contact |
| Q10 | "Independently reviewed" on the studio site vs optional second opinion | PRODUCT / copy | Next shell copy pass | Do not imply a v1.1-style independent Pass |

---

## Pattern canon (hypothesis — Q7)

Until Q7 is closed, **new** work follows the right-hand column. Existing packs
are `legacy`, not defects, unless a rework item names them.

| Job | Canon for new work | Allowed exception | Legacy examples |
|---|---|---|---|
| Pack CSS | `src/concepts/<slug>/styles.css` | — | `DESIGN.md` still says `src/styles/concept-*.css` |
| Data | `record.ts` with standing rules when claims are gated | `content.ts` for voice-heavy one-screens | inline `.astro`; `round.ts`; chamber site data |
| Multi-route chrome | `components/<Name>Shell.astro` wrapping `ConceptLayout` | One-screen hash nav | Tool Centre / Scopers copy-paste headers; Chamber shell in `prototypes/` |
| Elevation brief | `research/concepts/<slug>/*-elevation-brief.md` | Documented skip (Enniskeen is the instance, not a skip forever) | bucks-head, donard-hotel, douglas-cromie |
| Elevation pin | `tools/test/test-<slug>-elevation.mjs` for landed magic | Synthetic prototypes have their own tests | Enniskeen, Scopers, Betty's, Donard Vet, Chamber |
| Generated disclosure | Banner + **visible guest line** + provenance | Placeholder figcaption (Painted Earth) | Alt-only (Buck's, Cúpla); missing banner (Tool Centre, Cúpla menu) |
| Booking | Verified live-engine params or labelled illustrative | Specialist platform link-out | Dundrum Inn decorative form |
| Mark | Real mark when we have rights | Studio mark **labelled** as concept (Tool Centre) | Inconsistent favicons |

---

## Rework queue (from 18 Aug 2026 audit)

Risk order. Do not big-bang eighteen packs.

1. **Q1** — Decide lights vs map; then one of: restore `/the-lights/` and retire directory features, or supersede ADR-0005 + rewrite privacy. Same PR as the decision, not later.
2. **Q3** — Claim door: implement or remove the comment.
3. **Q5** — Align CONCEPT_DESIGN_REVIEW teaching example with `publication.json`.
4. **Q6** — Fix PLAN suite counts to match the runner; keep the gaps table.
5. **Q2** — Write imagery exception list into elevation method + provenance (one paragraph).
6. **Stale docs** — `DESIGN.md` paths and Enniskeen "hotel's own imagery"; `elevation-brief-priorities.md` undercount; PLAN §7 three scales; `the-lights-brief.md` "not built."
7. **Pins** — Enniskeen first (flagship, largest gap); then Scopers, Betty's, Donard Veterinary.
8. **Disclosure gaps** — Tool Centre banner; Cúpla menu route; guest-layer line vs alt-only.
9. **Q4** — Postcard brief vs ADR-0001.
10. **Q10** — "Independently reviewed" wording.
11. **Legacy pack structure** — only when touching that pack anyway, or when a factory scaffold would copy it.

---

## Experiments in flight

Labelled so they are not mistaken for canon.

| Experiment | Question it answers | Where |
|---|---|---|
| Owner's operating page | Can public truth and upkeep be one object? | `docs/owners-operating-page-spec.md` |
| Impossible local website | Can place-and-trade structure a whole experience? | `docs/impossible-local-website-spec.md` |
| Sensory showcase / clay film | What generated film/voice/terrain can the studio show without implying client results? | `/prototypes/showcase/`, homepage clay (watch PRODUCT anti-references) |
| `/the-map/` (if not chosen as C9) | What happens if the census is a named directory? | Must not stay an unlabelled experiment |

---

## Change log

| Date | Change |
|---|---|
| 18 Aug 2026 | Register opened from factory history audit. No product decisions closed here except: defaults listed for Q1–Q10 if someone must ship first. |

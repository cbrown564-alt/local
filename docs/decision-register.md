# Decision register

Living index of what is **standing**, **current**, **superseded**,
**experiment**, or **open**. Opened 18 August 2026; first close-pass
20 August 2026 after product answers.

This document owns the question "what have we decided, and what is still
unsettled?" `PLAN.md` owns the next actions. `PRODUCT.md` owns positioning.
ADRs remain the long-form record of a single choice.

Preferences will change. When they do: supersede, list rework, pin if needed.

## How to use

| Class | Use |
|---|---|
| **Standing** | Honesty / structure bars. Violate only with a new ADR and a check. |
| **Current** | Today's product choice. May be replaced; must say what is now false. |
| **Superseded** | History. Keep the link so we do not repeat it. |
| **Experiment** | One pack or prototype allowed to diverge; name the question. |
| **Open** | Unresolved. Needs an owner and a "decides when." |

**Supersession:** new row + `supersedes: <id>` + rework list. Old row
`status: superseded`.

**New packs** follow the pattern canon. Divergence requires the work packet
to say `experiment` and name the question; otherwise the run is flawed.

---

## Standing

| ID | Decision | Must hold | Since |
|---|---|---|---|
| S1 | Guest-facing concept copy speaks as the business | `pnpm test:guest-voice` | 31 Jul 2026 |
| S2 | No invented facts for atmosphere | Claims from verifications or the business's own public words | Elevation method |
| S3 | A concept has at most three homes | Pack / media / research | REPO_MAP 31 Jul |
| S4 | Edit `public/`, never `dist/` | — | REPO_MAP |
| S5 | Generated media: provenance same commit; visible guest disclosure, not only alt | provenance + publication checks | 28–31 Jul |
| S6 | Publication is five yeses, not a score | `research/publication.json` | 27 Jul 2026 |
| S7 | Website-first look-and-decide before later arms | `PRODUCT.md` How the offer grows | 20 Aug 2026 |
| S8 | Ordinary counter: owners do not operate the factory | `PRODUCT.md` How the offer grows | 20 Aug 2026 |

---

## Current

| ID | Decision | Must hold | Since |
|---|---|---|---|
| C1 | Personalised hand-delivered one-sheets; no untargeted door-drop | ADR-0001 | 24 Jul 2026 |
| C1b | Named A6 postcards are a second channel (posted or handed to one named business) | ADR-0001 outcome 20 Aug; `research/outreach-postcards.md` | 20 Aug 2026 |
| C2 | Printed QR `source=onesheet-<slug>` reaches the inbox before ink | `pnpm test:source-attribution` | ADR-0002 |
| C3 | Non-shipping masters stay gitignored on disk | ADR-0003 | 31 Jul 2026 |
| C4 | `Shore` at two scales; `band` in every footer; `stage` has no route until a new decision | ADR-0004; ADR-0006 | 5 Aug / 20 Aug |
| C5 | Census counts: 188 trading, 96 lit / 92 dark; never “most” | ADR-0005 numbers (still current) | 14 Aug 2026 |
| C6 | New public concepts gated on conversation / pilot evidence | PLAN.md Blocked | 3 Aug 2026 |
| C7 | Browser journeys retired; static pins + written gaps | PLAN.md §1c | 4 Aug 2026 |
| C8 | Prototypes: operating page → impossible local → combination only after both | PLAN.md 9 Aug | 9 Aug 2026 |
| C9 | Civic product is `/the-map/`: named directory, listed coordinates | ADR-0006; `/privacy/` matches | 20 Aug 2026 |
| C10 | Homepage claim path is `/transformations/`, not a hero claim door | No claim-door comment or link on `/` | 20 Aug 2026 |
| C11 | Public concept imagery: AI + disclosure, credited CC, or the firm's already-public assets. Withdrawn masters stay withdrawn. | Elevation method | 20 Aug 2026 |
| C12 | Do not say “independently reviewed” unless a named second reviewer signed | PRODUCT.md; homepage / transformations copy | 20 Aug 2026 |
| C13 | Launch (help start a new business) is an internal horizon, not a public offer | PRODUCT.md | 20 Aug 2026 |
| C14 | New pack defaults: see Pattern canon. Old packs are `legacy` until queued. | This register | 20 Aug 2026 |

---

## Superseded

| ID | Was | Became | When |
|---|---|---|---|
| X1 | Generic A5 door-drop first | C1 one-sheets | ~24 Jul 2026 |
| X2 | v1.1 scores ≥7.0, independent reviewer | S6 five checks | 25–27 Jul 2026 |
| X3 | Public portfolio reset to zero | Eighteen published | 27 Jul–3 Aug |
| X4 | Blunt “AI-imagery-only on the public site” | C11 exception list | 20 Aug 2026 |
| X5 | Print before inbox proves `source` | C2 | ADR-0002 |
| X6 | Hotel elevation moves as the method | Shape/register method | 31 Jul 2026 |
| X7 | Puppeteer CI as the trust baseline | C7 | 4 Aug 2026 |
| X8 | Invented `MourneMotif` | `Shore` `band` | 14 Aug 2026 |
| X9 | Shore `stage` on `/about/` | ADR-0005 one civic route | 14 Aug 2026 |
| X10 | Buck's Head in first-wave walk | Stop redesign pitch | 27 Jul 2026 |
| X11 | ADR-0005 `/the-lights/` anonymous displaced map | C9 `/the-map/` | 20 Aug 2026 |
| X12 | Homepage hero claim door | C10 `/transformations/` | 20 Aug 2026 |
| X13 | Dundrum Inn as current failed fifth-check example | Teaching examples are Tonn Ruray and Groves; Inn published 27 Jul | 20 Aug 2026 |
| X14 | CONTEXT anonymity: dark never named or placed | C9 named directory | 20 Aug 2026 |

Archive paths stay historical. Do not treat them as gates.

---

## Open

| ID | Question | Decides when | Default if we must ship |
|---|---|---|---|
| Q8 | Print object: stock, bleed, colour | Before ink | Do not send files to a printer |
| Q9 | Held prospects and GBP owner account | Unblock conditions | No publish, no contact |

Closed 20 August 2026: Q1 (C9), Q2 (C11), Q3 (C10), Q4 (C1b), Q5 (X13), Q6
(still a PLAN prose fix — runner is truth; not a product question), Q7 (C14),
Q10 (C12).

---

## Pattern canon (current — C14)

For **new** work. Existing packs are `legacy` unless a rework item names them.

| Job | Canon | Allowed exception |
|---|---|---|
| Pack CSS | `src/concepts/<slug>/styles.css` | — |
| Data | `record.ts` with standing rules when claims are gated; else `content.ts` | — |
| Multi-route chrome | `components/<Name>Shell.astro` wrapping `ConceptLayout` | One-screen hash nav |
| Elevation brief | `research/concepts/<slug>/*-elevation-brief.md` | Documented skip |
| Elevation pin | `tools/test/test-<slug>-elevation.mjs` for each landed magic move | Prototype routes have their own tests |
| Generated disclosure | Banner + visible guest line + provenance | Placeholder figcaption (Painted Earth) |
| Booking | Verified live-engine params or labelled illustrative | Specialist platform link-out |
| Mark | Real mark when we have rights | Studio mark labelled as concept work |

---

## Rework queue

1. ~~Q1 lights vs map~~ — **done 20 Aug** (ADR-0006, privacy, CONTEXT).
2. ~~Q3 claim door~~ — **done 20 Aug** (comment removed).
3. ~~Q5 Inn teaching example~~ — **done 20 Aug**.
4. **Q6** — Fix PLAN suite counts to match the 17-suite runner; keep the gaps table.
5. ~~Q2 imagery list~~ — **done 20 Aug** (elevation method). `DESIGN.md` Enniskeen “hotel's own imagery” and `elevation-brief-priorities.md` undercount still stale.
6. **Stale docs** — `DESIGN.md` paths; PLAN §7 three scales; `the-lights-brief.md` header as historical; `lights.json` bake/check leftover plant (do not rewire into `/the-map/`).
7. **Pins** — Enniskeen first; then Scopers, Betty's, Donard Veterinary.
8. **Disclosure gaps** — Tool Centre banner; Cúpla menu; guest-layer line vs alt-only.
9. ~~Q4 postcards~~ — **done 20 Aug** (named only).
10. ~~Q10 independently reviewed~~ — **done 20 Aug** (PRODUCT + homepage/transformations copy).
11. **Legacy pack structure** — only when touching that pack, or when scaffold would copy it.
12. **Drift check** (Proposal W) — still unbuilt; first `mustHold`s: ADR-0006 route exists; privacy does not claim displaced anonymous points; no homepage claim-door comment.

---

## Experiments in flight

| Experiment | Question | Where |
|---|---|---|
| Owner's operating page | Can public truth and upkeep be one object? | `docs/owners-operating-page-spec.md` |
| Impossible local website | Can place-and-trade structure a whole experience? | `docs/impossible-local-website-spec.md` |
| Sensory showcase / clay film | What can the studio show without implying client results? | `/prototypes/showcase/`, homepage clay |

Launch kits stay internal (C13). `/the-map/` is current product, not an experiment.

---

## Change log

| Date | Change |
|---|---|
| 18 Aug 2026 | Register opened from factory history audit. |
| 20 Aug 2026 | Closed Q1–Q5, Q7, Q10 from product answers. ADR-0006. PRODUCT wedge + ordinary-counter. Imagery exceptions. Named postcards. Canon locked. Launch = internal. |

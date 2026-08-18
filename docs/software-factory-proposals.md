# Software factory proposals for Mourne Made

Research note and proposal series. Written 18 August 2026.

This document does three jobs:

1. Summarise what a **software factory** is in 2026 practice, with emerging
   best practices, use cases, do's / don'ts and pitfalls.
2. Map that model onto **what this repository already is** — product intent,
   what has shipped, and how research / generation / development /
   verification have evolved.
3. Propose a **Mourne Made factory**: stations, agents, quality controls and
   an adoption sequence that scale throughput *and* reliability without
   diluting the honesty and recognition bars the studio already holds.

It is a planning artifact. It does not change product positioning, publication
standards or the current outreach gate in `PLAN.md`.

---

## 1. What a software factory is

### Definition

A software factory treats delivery as a **production system**, not a craft
workshop:

- **Standardised inputs** — every unit of work enters with the same shape
  (scope, acceptance criteria, owner, target environment).
- **Defined assembly path** — stations with known handoffs, not ad-hoc agent
  chats.
- **Intermediate quality control** — checks at each station, not only at the
  end.
- **Measurable, evidence-backed outputs** — typically a pull request, packet
  or passing CI run with a reconstructable trail.
- **Replayability** — inputs, prompts, model versions and policies can
  reconstruct a shipped change.

The idea is decades old (Bemer late 1960s; Hitachi Software Works; Cusumano's
*Japan's Software Factories*; Microsoft's 2004 *Software Factories* book;
later enterprise platform programmes). What changed in 2025–2026 is the
**agent-native** reinterpretation: coding agents perform a larger share of
planning, implementation, testing and review inside that production system,
while engineers define intent, set bars and review evidence.

A coding agent is a worker. A factory is the plant the worker operates in.
Platform engineering standardised the environment humans used; the factory
inherits that and asks what happens when the entity on the golden path is an
autonomous agent with credentials, a 24/7 duty cycle and no instinct for when
something feels wrong.

### Emerging best practices (2026)

Drawn from practitioner write-ups (Factory.ai's Factory 2.0 framing, Vercel's
`ai-sdk-factory`, DoD AI-for-SDLC guidance, Port / TrueFoundry enterprise
control guides, BrainGu's "verification gap" thesis):

1. **One agent per station**, not one mega-agent with every skill. Scoped
   prompts, context and evals; easier to debug when a station fails.
2. **Automate the lifecycle around the human**, without removing the human
   from merge / ship for consequential work. Align review depth to risk.
3. **Same gateway for human- and agent-authored changes** — same CI, same
   publication gates, same disclosure rules.
4. **Evidence chains, not vibes** — classify → analyse/probe → implement →
   review → human merge, with documented rationale at each step (Vercel AI SDK
   factory pattern).
5. **Outcome taxonomy for factory runs** — e.g. success / flawed / blocked /
   manual. Only success ships; the rest feed prompts, evals and environment
   fixes. Improving the factory becomes the engineering job.
6. **Independent verification** — the model (or process) that implements must
   not be the sole author of the checks that green-light it. Prefer static
   assertions, mutation-proven tests, live-site side-by-side and second-model
   review for high-risk claims.
7. **Sandboxes and scoped secrets** — especially when agents ingest untrusted
   issue text or scrape live sites.
8. **Utilities layer** — model routing, credential custody, spend metering,
   telemetry, policy — treated as plant infrastructure, not afterthoughts.
9. **Adoption in stages** — scoped IDE delegation → automated PR review →
   multi-day missions in CI, each compounding on the last.
10. **Encode every agent failure** into durable rules (`AGENTS.md`, denylists,
    pin tests, ADRs) so the same mistake cannot recur silently.

### Common use cases

| Use case | Fit |
|---|---|
| Issue triage / classification | High — standardised input, measurable accuracy |
| Bug reproduce → fix → PR | High when repro is mechanical |
| Backports / migrations / boilerplate | High — Spotify-style agent PR volume |
| Docs and changelog | High |
| Security / config drift remediation | Medium–high with policy-as-code |
| Feature implementation from a tight spec | Medium — needs strong acceptance tests |
| Design-led concept work with recognition + theatre | Low for full autonomy; high for **station assistance** with human gates |
| Research verification (DNS, FSA, probe) | High for mechanical steps; low for identity judgement |
| Outreach / commercial judgement | Keep human — willingness to pay and relationship risk |

### Do's

- Standardise the **work packet** before scaling agents.
- Put quality bars in **machine-checkable** form wherever honesty allows.
- Separate **generate** from **verify**; prove checks can fail (mutation).
- Keep a **registry** of agents, prompts and what each may touch.
- Measure cycle time, defect escape, review burden and cost per change.
- Expand the automation boundary only when flawed/blocked rates justify it.
- Preserve human authority on identity, ethics, outreach and "is this better?".

### Don'ts

- Don't equate more agents with a factory (undefined process + agents = faster
  craft chaos).
- Don't let the same model write code and be the only reviewer of that code.
- Don't auto-merge high-risk paths (auth, payments, published claims about
  real businesses, anonymity constraints).
- Don't scale generation without scaling the **outer loop** (tests, disclosure,
  provenance, publication).
- Don't treat green CI as proof of commercial or owner recognition quality.
- Don't narrate process to guests (this repo already forbids that in concept
  guest voice).
- Don't invent facts to fill inventory gaps — elevation method already bans it.

### Common pitfalls

| Pitfall | Why it hurts | Mitigation |
|---|---|---|
| Verification gap | Implementation and tests share blind spots | Distinct verifiers; live evidence; mutation tests |
| Stale context | Bad plans from outdated codebase / live site | Fresh probes; dated records; pack assembly |
| Long-horizon drift | Multi-day agent missions wander | Station boundaries; acceptance criteria; budgets |
| Self-confirming disclosure | Alt text that says "AI-generated" used as proof of disclosure | Provenance ledger + visible on-page line (already learned here) |
| Suite that cannot fail | Green theatre | Mutation before wiring (already learned §1a) |
| Abort-on-first-failure | Hidden broken suites | Run-all reporting (already learned twice) |
| Score theatre | Rubrics that pass honest-but-unwanted work | Binary defects + owner-recognition check |
| Agentic sprawl | Unregistered bots, no cost/audit trail | Registry, budgets, scoped permissions |
| Throughput without demand signal | Building more concepts while outreach is gated | Factory capacity follows conversation evidence |
| Outer-loop starvation | Agents produce PRs faster than review/CI | Risk-tiered review; pin suites; reviewer UI |

---

## 2. Deep dive: what this repository is doing

### Product thesis

Mourne Made is a local digital studio for independent owner-operated businesses
around Dundrum and Newcastle, County Down. The site makes the opportunity
visible through a **personalised, side-by-side transformation** before asking
anyone to buy. Concept work is independent and uncommissioned: no business has
approved the work and no client result has been measured. Paid scopes are
presence repair, direct action and ongoing growth. The memorable line:
turn more local interest into direct business, with a right-sized website that
stays useful.

### What has been achieved so far

| Capability | State (docs snapshot ~3–12 Aug 2026) |
|---|---|
| Public transformations | **18** published under five-check standard |
| Concept packs | 19 packs + `_shell/` (held: Murdock Brothers) |
| Census / landscape | Source-bounded listing census; commercial landscape PDF |
| Verification | Trading confirmation pass; probe + FSA tooling; fault taxonomy |
| Elevation method | Written; multiple elevation briefs; shape/register discipline |
| Request path | Vercel function, rate limit, attribution, alert webhook |
| One-sheets + QR | Personalised print path; source-attribution suite |
| Studio product surfaces | Home, transformations, where-it-fails, how-its-made, why-its-yours |
| Prototypes | Operating page, impossible local, chamber, futures, sensory showcase |
| Verification baseline | `pnpm build` guards + `pnpm test` multi-suite runner (static pins era) |
| Outreach learning | One reply (Buck's Head) — no current opportunity; new concepts gated |

### Pipeline that already exists (proto-factory)

Mapped to stations. Much of this is already a factory in spirit — **human-run,
script-assisted**, with unusually strong honesty controls.

```
Census → Classify → Select → Verify → Brief → Design → Build
   → Disclose → Publish → Outreach → Measure
```

| Station | Exists today | Key paths |
|---|---|---|
| Census | OSM + Maps + directory | `tools/pipeline/research-businesses.mjs`, `businesses.json` |
| Classify | Dedup, alias, lit/dark, chain rules | `normalize-businesses.mjs`, `census-class.mjs` |
| Select | Human gap-class + composition | `PROSPECTS.md`, batch selection notes |
| Verify | Probe / FSA / merge / faults | `probe-sites.mjs`, `fsa-register.mjs`, `verifications.json` |
| Brief | Elevation briefs, pitches | `research/concepts/<slug>/`, `docs/the-elevation-method.md` |
| Design | Inventory → shape → tests → build order | Elevation method; shell elevation |
| Build | Concept packs + media capture | `src/concepts/`, `tools/capture/` |
| Disclose | Provenance + guest-voice + visible disclosure | `image-provenance.md`, check scripts |
| Publish | Five checks → `publication.json` → public slugs | `CONCEPT_DESIGN_REVIEW.md`, packer |
| Outreach | One-sheets, QR contract | `tools/print/`, ADR 0001/0002 |
| Measure | Specced for pilots; analytics events only | `PRODUCT.md`; no client results yet |

### Approaches over time (methodological shifts)

| Period | Approach | What it taught |
|---|---|---|
| Mid-July 2026 | Census + first verification pass; milestone landings | Source-bounded research; missing fields stay missing |
| 24–25 Jul | **v1.1 scored review** (7.0/10 craft gate, subagent reviews) | Scores passed honest concepts that owners would not want |
| 25–27 Jul | **Publication reset** → five binary checks + owner-recognition | Absence of serious defect > rubric theatre |
| 28 Jul – 3 Aug | Puppeteer journey suite as trust baseline | Entrance animations, tautological disclosure, abort-on-fail |
| 31 Jul | A→D restructure; elevation method; AI-imagery-only privacy | Three homes per concept; recognition + theatre; essence |
| 4 Aug | Retire browser suites (CI cost); harden request + QR | Coverage gaps recorded honestly in PLAN §1c |
| 5–6 Aug | Probe/FSA automation; static pin restoration; fault taxonomy | Mechanical verify steps; pin magic that ships |
| 7–12 Aug | Film/voice/media sprint; print system; representative prototypes | Sensory system as craft R&D, not portfolio expansion |
| Standing gate | No new portfolio concepts until real conversation evidence | Factory must not outrun demand learning |

### Research → generation → development → verification (four tracks)

**Research.** Started as a listing census; matured into a verification
discipline (probe site, dated trading evidence, hunt missed sites,
disambiguate names, record faults). Scripts now take the mechanical load;
judgement stays on identity, franchise and "still trading today". Publish bars
for lit/dark aggregates are deliberately conservative.

**Generation.** Captured real before/after stills and clips; AI imagery and
synthetic media under a provenance ledger; triple disclosure for guest-facing
generated assets; object-theatre film rules; no generated film of a real
business without consent. Elevation prefers their mark, words and mechanism
over studio invention.

**Development.** From scattered pages to concept packs (`_shell` + identity
sheets); shared chrome with subject-specific identity; prototypes as
representative forms (operating page, impossible local) without claiming
demand; ADRs for outreach, QR, masters, Shore/lights anonymity.

**Verification.** Evolution is the clearest factory lesson in the repo:

1. Scored craft → binary publication defects.
2. Browser journeys that caught real bugs → retired for cost → static pins for
   what was rewritten, with **explicit gaps** for what was lost.
3. Build-time guards for prose counts, publication records, orphans,
   guest-voice, provenance, lights anonymity.
4. Mutation-proving checks before trust (learned the hard way when checks
   could not fail).
5. "If the moment of magic is not tested, it will quietly regress to good."

### What "done well" means today

1. Trading verified in `verifications.json`.
2. Essence elevated (inventory mined; swap test fails; guest voice clean).
3. Works as presented; elevation pins where they exist.
4. Disclosure complete (provenance same commit; visible line; Sources & limits).
5. Five checks yes in `publication.json`.
6. `pnpm build` + `pnpm test` green; optional `publication:pack --check`.
7. Pipeline stage recorded; outreach-ready only after live side-by-side and
   print discipline.

### Bottlenecks (where a factory helps — and where it must not pretend)

| Bottleneck | Nature |
|---|---|
| Shortlist / gap-class composition | Human judgement |
| Fifth check live side-by-side | Human + live evidence |
| Elevation inventory mining | Semi-automatable; essence naming is human |
| Theatre / map drawing sessions | Craft time; not token-cheap |
| Provenance + capture + derivatives | Automatable pipeline |
| Coverage holes after suite retirement | Factory QC debt |
| Print stock/bleed/colour | Physical ops |
| Commercial proof | Outside the code factory — conversation |
| Consent for real-premises media | Legal / relationship |

---

## 3. Framing: a Mourne Made software factory

### What we would be industrialising

Not "more SaaS landing pages." The unit of production is a **concept
transformation packet** for one trading business — research-backed, elevated,
disclosed, published, optionally printed — plus the studio surfaces and
verification plant that keep the portfolio honest.

The factory's scarce resources are:

1. **Owner-recognition quality** (fifth check, elevation essence).
2. **Honesty under scale** (no invented facts, no guest-voice process narration,
   anonymity for dark lights).
3. **Human attention for outreach and commercial learning**.
4. **Reviewer time** for publication and flagship craft.

Throughput that burns those resources is not success.

### Design principles for *this* factory

1. **Stations mirror the existing pipeline** — do not invent a parallel process.
2. **Machine gates encode lessons already paid for** (guest-voice denylist,
   provenance, publication.json, run-all suites, mutation discipline).
3. **Risk tiers** — mechanical stations may be highly automated; identity,
   recognition, outreach and anonymity stay human-gated.
4. **Independent verification** — implementer agents do not author the only
   pins that pass their own work.
5. **Demand-coupled capacity** — portfolio expansion agents idle while
   `PLAN.md` blocks new concepts pending conversation evidence; the factory
   instead improves plant, prototypes and outreach ops.
6. **Guest surfaces stay anti-SaaS** — factory chrome lives in `research/`,
   `tools/`, CI comments and banners — never on concept guest pages.
7. **Improve the factory when runs are flawed/blocked** — same discipline as
   Vercel's outcome taxonomy.

### Proposed station map

```text
[Signal]  census refresh | live-site drift | plan item | outreach reply
    ↓
[Triage]  gap class, hold flags, batch composition (human approve)
    ↓
[Verify]  probe + FSA + merge staging → human confirm identity/trading
    ↓
[Packet]  elevation inventory draft + fault IDs + sources
    ↓
[Brief]   essence / shape / build order (human lock)
    ↓
[Build]   pack scaffold → screens → capture → optimize media
    ↓
[Disclose] provenance entries + guest-voice scan + visible disclosures
    ↓
[Pin]     elevation assertions + publication pack --check
    ↓
[Publish] five-check review (human) → publication.json → slug list
    ↓
[Outreach] one-sheet + QR (human print gate) → claim/request path
    ↓
[Learn]   reply coding, premise drift, factory run outcomes → rules/evals
```

Each box is a candidate **one-agent-per-task** (or script) with a typed input
and output artifact under `research/` or a PR.

---

## 4. Proposal series

Proposals are ordered for adoption. Earlier ones raise reliability; later ones
raise throughput. None require abandoning the current publication or outreach
gates.

### Proposal A — Formalise the factory control plane

**Intent.** Name what already exists so agents and humans share one map.

**Work:**

- Add a short `docs/FACTORY.md` (or keep this document as the home) that lists
  stations, input/output artifacts, owning scripts and human gates.
- Maintain an **agent/task registry** (even a markdown table): name, station,
  allowed paths, secrets, eval suite.
- Define run outcomes: `success | flawed | blocked | manual` for each
  automated station, logged beside the PR or packet.

**Why.** Without a control plane, more Cursor agents recreate July's craft
chaos at higher speed.

**Risk.** Doc drift — mitigate by linking ownership the way `README.md`
already does for PRODUCT/PLAN/PROSPECTS.

### Proposal B — Work packet schema (standardised inputs)

**Intent.** Every concept unit of work enters with the same shape.

**Work:**

- Schema for `research/concepts/<slug>/work-packet.json` (or extend
  publication-packer inputs): gap class, verification refs, fault IDs,
  elevation inventory stubs, acceptance criteria, risk tier, human owner.
- Generate the skeleton from `verifications.json` + probe output; humans fill
  essence and theatre.
- CI rejects Build-station PRs that lack a packet or that cite unpublished
  verification claims.

**Why.** Standardised inputs are property #1 of a working factory.

### Proposal C — Verification station automation (high ROI, low brand risk)

**Intent.** Scale the mechanical half of RESEARCH_METHOD without touching guest
voice.

**Work:**

- Scheduled or on-demand: `probe-sites` over held/shortlisted/public domains;
  diff against last probe; open "premise drift" issues when live sites change
  (Kelly McEvoy & Brown failure mode).
- Keep FSA refresh + `merge-verifications` staging; human merge only.
- Auto-flag franchise/chain keyword hits and same-name geography collisions
  for human review — never auto-reclassify to trading/dark for publication.

**Why.** Already half-built; highest reliability return per token.

### Proposal D — Disclosure & honesty plant (QC utilities)

**Intent.** Make honesty scale faster than generation.

**Work:**

- Single "disclose station" checklist agent: provenance entries present for
  every new `public/media/concepts/**` file; visible disclosure near generated
  assets; guest-voice denylist clean; Sources & limits not claiming withdrawn
  photography.
- Extend denylist when flawed runs invent new meta phrases.
- Optional second-model review **only** on case-study Sources & limits and
  banners — not on guest body copy generation.

**Why.** The repo's hardest lessons were honesty failures, not missing pixels.

### Proposal E — Pin factory (close the verification gap)

**Intent.** Restore behavioural coverage lost on 4 August without returning to
45-minute CI by default.

**Work:**

- Template for elevation pins: magic moments named in the brief become
  assertions in `tools/test/test-<slug>-elevation.mjs` in the same PR.
- Risk-tiered browser jobs: nightly or `workflow_dispatch` for retired suites
  (`test:concepts` header wrap, claim-door, Enniskeen day-part) — not every PR.
- Mutation CI for new pins (break selector / copy once in a dry job).
- Separate **implementer** from **pin author** in agent workflow (two tasks,
  two contexts).

**Why.** Elevation method already says unpinned magic regresses to good;
PLAN §1c already lists the gaps.

### Proposal F — Concept scaffold station (throughput with guardrails)

**Intent.** Faster pack creation without templating away recognition.

**Work:**

- Generator that creates the three homes, `ConceptLayout` wiring, empty
  identity sheet, publication-packet stub and work packet from a locked brief.
- Scaffold includes **swap-test reminders** and inventory section stubs — not
  stock hero layouts.
- Forbidden: auto-choosing theatre register from a previous concept's moves
  (hotel moves on a food bar).

**Why.** Removes toil before the craft starts; keeps essence human-locked.

### Proposal G — Capture & media station

**Intent.** Industrialise the mechanical media path.

**Work:**

- Orchestrate preview → capture screens/clips → `optimize:media` → provenance
  stub PR.
- Fail if capture dimensions / overlay policy from MEDIA_CAPTURE are violated.
- Keep consent gate for any real-premises generated film as `manual` outcome.

**Why.** Media toil is repetitive and already scripted; orchestration is the
gap.

### Proposal H — Publication assistant (not auto-publisher)

**Intent.** Accelerate the 10–15 minute review without auto-answering the fifth
check.

**Work:**

- Agent assembles live-site screenshots beside concept captures, lists material
  claims vs `verifications.json`, runs `publication:pack --check`, drafts a
  five-check worksheet with **empty** yes/no for the human.
- Never writes `status: Publish` without human confirmation.
- Flags "live site may have outgrown the premise" when probe diffs exist.

**Why.** Matches Vercel's "evidence chain for reviewers" without removing
accountability.

### Proposal I — Outreach ops station

**Intent.** Reliable one-sheets, not more door-drops.

**Work:**

- Given a published slug: rebuild PDF, verify QR decode equals
  `onesheets.ts` URL, run source-attribution suite, produce a print checklist
  (bleed, stock, disclosure wording for the owner).
- Human remains the walk-in / hand-delivery gate.
- Log outreach replies into structured learning (opportunity / no opportunity /
  revisit after X) feeding triage.

**Why.** ADR 0001/0002 already define the contract; the factory should enforce
it every time.

### Proposal J — Studio product & prototype line (parallel track)

**Intent.** While portfolio expansion is gated, run the factory on **plant and
form** work: operating page, impossible local, sensory demos, home phases.

**Work:**

- Treat each prototype spec as a mission with pins (`test:impossible-local`,
  etc.).
- Prefer this track for multi-agent throughput until conversation evidence
  unlocks new concepts.

**Why.** Aligns with PLAN's representative-prototype sequence and demand gate.

### Proposal K — Metrics and FinOps for agents

**Intent.** Know whether the factory is helping.

**Suggested meters:**

- Cycle time per station (verify → brief lock → publish).
- Flawed/blocked/manual rates by station.
- Pin coverage: public slugs with elevation pins vs without.
- Escape defects: issues found in live side-by-side after "green" CI.
- Token / CI minutes per merged PR and per published concept.
- Outreach: sheets printed, scans, requests, replies — already partly in
  analytics events.

**Why.** Without meters, "more agents" is faith-based.

### Proposal L — What not to factory (explicit non-goals)

Keep these **manual** until evidence says otherwise:

1. Naming the essence / paradox of a business.
2. Final fifth-check judgement and publish decision.
3. Selecting the shortlist batch composition.
4. Claiming a business is dark/lit in guest-facing named form.
5. Any message that implies client results or approval.
6. Auto-sending outreach or emailing owners from agents.
7. Generating guest copy that narrates the studio method.
8. Expanding the public portfolio while PLAN's conversation gate holds — use
   capacity on A–E, G, I, J instead.

---

## 5. Suggested adoption sequence

Aligned with common agent-native adoption (scoped → review → missions) and
this repo's risk profile:

| Phase | Focus | Exit criteria |
|---|---|---|
| **0 — Name the plant** | Proposal A + L | Station map agreed; non-goals written |
| **1 — QC utilities** | D + E (partial) + K skeleton | Provenance/guest-voice/pack checks in one "disclose" path; 2–3 new pins; run outcomes logged |
| **2 — Research mechanics** | C + B | Drift probes on public domains; work packets for held/next prospects |
| **3 — Scaffold & media** | F + G | New pack scaffold used once end-to-end on a held or synthetic subject |
| **4 — Reviewer assist** | H + I | Publication worksheet + one-sheet checklist used on next real publish/print |
| **5 — Missions** | J then careful concept missions | Multi-station runs on prototypes; concept missions only after outreach learning unlocks capacity |

Do not skip Phase 1. Scaling Build before Disclose/Pin recreates the
verification gap at portfolio scale.

---

## 6. Mapping software-factory literature → this repo

| Factory property | Mourne Made analogue today | Gap |
|---|---|---|
| Standardised inputs | Elevation briefs, verifications, publication reviews | No single work-packet schema |
| Standardised tooling | `pnpm build` / `pnpm test`, capture, print | Agent tasks not registered; browser QC thinned |
| Measurable output | Suite counts, publication.json | No station cycle-time or flawed-run metrics |
| Replayability | Git history, provenance, ADRs, PLAN narrative | Prompt/model versions for agent runs not systematically stored |
| Human control | Five checks, outreach gate, anonymity ADRs | Strong — preserve |
| Utilities | Checks, rate limit, provenance | Spend metering / agent registry thin |

---

## 7. Bottom line

Mourne Made is already a **proto-factory**: a repeatable path from census to
published transformation with unusually sharp honesty gates, written methods
and machine checks paid for in real failures (scored review theatre,
tautological disclosure, abort-on-fail, premise drift, hotel-moves-on-food-bar).

An agent-native software factory is the right next industrialisation **if** it
amplifies those gates rather than bypassing them. The highest-leverage moves
are not "generate more concepts." They are:

1. Formalise stations and work packets.
2. Automate verify/disclose/pin/media/print checklists.
3. Assist publication and outreach with evidence chains.
4. Spend mission capacity on prototypes and plant until conversation evidence
   justifies portfolio growth.
5. Treat flawed factory runs as the backlog that improves the plant.

That is how to do more things faster **and** more reliably — without turning a
local, recognition-led studio into generic automation theatre.

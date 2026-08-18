# Software factory proposals for Mourne Made

Research note and proposal series. Written 18 August 2026; expanded the same
day with the local AI-first agency scope ladder, a launch horizon, an
accessibility doctrine, and a decision-discipline system after a history
audit of contradictions and concept divergence.

This document does six jobs:

1. Summarise what a **software factory** is in 2026 practice, with emerging
   best practices, use cases, do's / don'ts and pitfalls.
2. Map that model onto **what this repository already is** — product intent,
   what has shipped, and how research / generation / development /
   verification have evolved.
3. Propose a **Mourne Made factory**: stations, agents, quality controls and
   an adoption sequence that scale throughput *and* reliability without
   diluting the honesty and recognition bars the studio already holds.
4. Expand the **long-term scope**: websites as the tangible trust wedge for a
   local AI-first agency, what AI can actually bring to owner-operated
   businesses, and how the factory makes multi-arm delivery real without
   becoming generic automation theatre.
5. Take one step further: use the same plant to **help launch new local
   businesses**, and insist the factory stay **ordinary to use** — familiar
   objects, not futuristic software the owner must learn.
6. Face the **decision problem**: early work could try things and leave
   contradictions; a factory stacks those mistakes. Record what already
   diverged, and install a system for surfacing questions and changing our
   minds without silent drift. The living register is
   [`docs/decision-register.md`](decision-register.md).

It is a planning artifact. It does not change product positioning, publication
standards or the current outreach gate in `PLAN.md`. Public guest surfaces
still follow `PRODUCT.md` anti-references: no SaaS landing cadence, no abstract
automation imagery, no inflated AI claims.

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
9. Pitching AI automations or mini-apps to businesses before a tangible
   before-and-after (or equivalent look-and-decide artifact) exists for them.
10. Putting "AI agency" chrome on guest-facing marketing in place of local,
    concrete outcomes.
11. Requiring owners to learn prompts, agent consoles or new daily software
    to receive the value.
12. Public "start your business with AI" framing, or launch concepts that
    imply a trade already exists.

---

## 5. Expanding the scope: local AI-first agency

### The strategic bet

**Long-term company:** a local, AI-first agency for owner-operated businesses
around Dundrum and Newcastle — proving that AI can work *for them*, in their
place, on work they recognise.

**Short-term route:** websites (and website-shaped transformations). Not
because websites are the ceiling of AI value, but because they are the best
**trust wedge**:

| Property | Why it matters for distrustful owners |
|---|---|
| Tangible | They already know what a website is |
| Evaluable | They look at before and after and decide — no unusual vocabulary |
| Comparable | Difference from their current surface is visible without abstraction |
| Low theory load | No need to explain models, agents, or "digital transformation" |
| Reversible conversation | A free before-and-after starts talk without requiring belief in AI |

Many owners are wary of AI (job fear, hallucination stories, opaque vendors).
Leading with "we will automate your business with AI" asks for trust the market
has not earned. Leading with "here is your business, improved, on a screen you
already understand" earns the right to go further.

Websites are **arm one**. The factory exists so arm one can be delivered
reliably at volume — and so arms two and three can reuse the same plant when
the conversation is ready.

### What AI can actually bring to local businesses

Evidence from SMB AI adoption research (JPMorgan Chase Institute transaction
data; 2026 SMB ROI benchmarks; local-agency practice) converges on a blunt
point: **ROI comes from embedding AI into handoffs and systems of record, not
from giving someone a chatbot tab.** Deep gains are operationally selective.
Shallow gains (better emails, draft posts) are real but easy to oversell.

For *this* catchment — independent hospitality, trade, care, retail, events —
the useful AI contributions cluster into five families. Each family must still
pass the studio's look-and-decide test before it becomes an offer.

#### 1. Own the route from interest to action (extends current offer)

Already in `PRODUCT.md` as presence repair and direct action: accurate pages,
Google Business Profile, booking/order/enquiry handoffs. AI accelerates
*building and maintaining* that route; the owner still judges the route by
looking at it.

Factory role: concept → pilot site → operating page upkeep (see
`docs/owners-operating-page-spec.md`).

#### 2. Keep the public answer true without a CMS career

The operating-page prototype is the bridge product: public truth and the act of
keeping it true as one designed object. AI assists drafting tonight's board,
seasonal hours, sold-out states — with the owner approving on the same surface
visitors see.

Factory role: content-assist stations with mandatory owner publish; pins for
"finite editable set" and rollback.

#### 3. Capture and complete inbound demand (the after-hours gap)

Highest commercial signal for local services: missed calls, Instagram DMs,
web forms, "are you open / can I book Thursday" messages that die after 18:00.
Practical patterns in 2026 local AI agencies:

- Instant reply that qualifies and offers real next steps
- Booking agent wired to a real calendar API (not a fake availability)
- Missed-call text-back within seconds
- Reminder / no-show recovery
- Review request after a completed visit

These are **measurable** (response time, booked appointments, recovered leads)
and still **demonstrable** with a recorded conversation or a side-by-side of
"what happens when someone messages at 9pm."

Factory role: workflow packet (channels, tools, approval gates, escalation) →
sandbox build → eval conversations → human go-live.

#### 4. Compress internal admin that never reaches the customer

Invoice/receipt capture, enquiry logging, CRM hygiene, weekly summary from
scattered inboxes, staff rota drafts from known constraints. SMB research
puts document extraction and reporting among the strongest demand areas —
but only when wired into the tools the business already uses.

Look-and-decide artifact: "here are last week's enquiries, filed; here is the
draft you approve before anything sends."

Factory role: integration inventory → one workflow → eval set of real (redacted)
examples → owner approval gate on every external side-effect.

#### 5. Mini-apps for one job the business cannot do today

Not a platform. One thin tool: wedding date+guest enquiry with structured
handoff (Hugh McCann's shape); hire-list availability; supper-club waitlist;
trade quote pack; bilingual menu editor; "tonight's specials" publisher that
also updates GBP. Prefer specialist platforms when they win (`PRODUCT.md`);
build only when the gap is real and ownership stays with the business.

Factory role: same as concept packs — brief → scaffold → pin → disclose →
pilot measure — but the unit is an app/workflow, not a marketing page.

### What AI should *not* be sold as (here)

| Temptation | Why it fails the wedge |
|---|---|
| "AI transformation" retainers | Abstract; fuels distrust |
| Generic chatbot on a brochure site | Looks like AI theatre; often blocks the human path |
| Replacing the owner's judgement on money, medical, legal, safety | Wrong risk tier; destroys trust if it errs |
| Autopilot social that invents offers/prices | Hallucination risk on the owner's reputation |
| Dashboards that prove we are clever | Violates anti-references; owners did not ask |
| Automating a broken route | Fix the owned action first (arm one) |

### Product ladder (arms of the agency)

```text
Arm 0  Trust surface     Studio site + transformations (show, don't claim)
Arm 1  Presence          Website / operating page / GBP — look and decide
Arm 2  Action            Booking, enquiry, order handoffs that complete
Arm 3  Continuity        AI-assisted upkeep of the public answer
Arm 4  Capture           Inbound agents & automations on real channels
Arm 5  Ops               Internal admin workflows with approval gates
Arm 6  Capability        Mini-apps for one new job the business lacked
Arm 7  Launch            Idea → look-and-decide surface → first week of trading
```

`PRODUCT.md` scopes map roughly as: presence repair → arms 1–2; direct action
→ arms 2–4; ongoing growth → arms 3–6 after economics and maintenance capacity
are known. Arm 7 is a later audience — founders and new offers — not a change
to today's primary users.

**Rule of advancement:** do not open arm *n+1* for a business until arm *n*
has a look-and-decide artifact and, for paid work, a named measure. The factory
enforces that as a triage gate, not a slogan.

### How the software factory enables scope expansion

A multi-arm agency without a factory becomes a clever person with too many
tools. The factory is what makes "AI-first" mean **repeatable delivery**, not
**more demos**.

| Factory capability | Enables across arms |
|---|---|
| Shared research/verify stations | Know the business once; reuse for site, automation, mini-app |
| Work packets + risk tiers | Same intake shape whether the output is a page or a workflow |
| One-agent-per-station | Add an "automation build" station without rewriting the plant |
| Independent verification | Eval suites for conversations / workflows parallel elevation pins |
| Disclose / honesty plant | Label AI assistance the same way generated imagery is labelled |
| Outcome taxonomy | Flawed automation runs improve prompts the way flawed concepts improve rules |
| Demand-coupled capacity | Arms 4–6 idle until arm 1 conversations prove willingness |
| Prototype track (Proposal J) | Operating page + impossible local rehearse arms 2–3 before sale |

The factory also flips the trust problem: **the agency uses AI in plain sight
on its own plant** (concepts, pins, probes) while **the client offer stays
outcome-shaped**. Owners need not believe in AI to benefit from a faster
honest delivery system — and when they are ready, the same plant ships the
next arm.

### Trust design for AI offers (carry forward the five-check spirit)

For any AI-assisted arm, publish/pilot only when:

1. **Truthful** — what is automated, what needs owner approval, what can be wrong.
2. **Clear** — one job named in the owner's words ("missed calls get a text
   back"), not "agentic orchestration."
3. **Works as presented** — demo with their real channel or a labelled rehearsal.
4. **Safe** — credentials in their accounts; escalation to a human; no silent
   sends on money/medical/legal/safety paths.
5. **Owner would recognise themselves** — uses their hours, services, voice,
   and platforms; does not replace deliberate choices with generic bot copy.

### Local-shaped opportunity map (illustrative, not a shortlist)

Tied to shapes already in the elevation method and portfolio:

| Shape | Arm 1 wedge | Natural next arm |
|---|---|---|
| Place (hotel/estate) | Property-first site + honest booking handoff | Enquiry qualification; rate/availability sync assist |
| Counter (food bar/café) | Tonight board / operating page | Specials publish → social/GBP; supper-club waitlist |
| Product (maker) | Product-led range page | Order/enquiry triage; "when it's gone" state automation |
| Care (vet/dental) | Emergency + appointment clarity | After-hours FAQ with hard escalation; reminder flows |
| Trade (bike/hire) | Hire-list / workshop route | Quote-pack mini-app; stock/handoff notifications |
| Events/venue | Date + guest enquiry | Follow-up sequences; vendor pack generator |

These are hypothesis shapes for factory product lines — not permission to pitch
before conversation evidence.

---

## 6. Launching new local businesses

### The further horizon

Arms 1–6 assume a trading business that already has a name, a door, a ritual
and something to elevate. That is the right first market: they can look at a
before and after.

The longer vision is not only to repair and grow what exists. It is to help
**new** local businesses start — a weekly food box from a home kitchen, a
seasonal hire window, a walking workshop, a second offer from someone who
already trades, a club that never had a public surface, a shop idea tested
before anyone signs a lease.

`PRODUCT.md` already funds community work from paid commercial work, and names
charities and clubs as the next audiences after owner-operators. Launch is the
same neighbourly move aimed at people who do not have a "before" yet. The
wedge becomes **after-only and labelled**: here is what next Tuesday would look
like if you started; decide whether you want that Tuesday.

This is not a startup studio and not a venture fund. It is a local workshop
that can stand up the familiar objects a new trade needs — a shop window, a
way to take a request, a chalkboard that stays true, a phone that answers —
fast enough that the idea can be tried in this town.

### Why a software factory changes what is tryable

Without a factory, launching locally still means: pay for a site you cannot
keep current, duct-tape Instagram and a personal email, or delay until you can
afford an agency week. Ideas that would work for a season, a Saturday market
or a ten-customer list never leave the kitchen table.

With a factory that already knows this catchment — gap classes, platforms
people actually use (GuestDiary, Bookin1, Booksy, GBP), elevation shapes,
operating-page upkeep — the cost of standing up a **honest first week** drops.
The constraint becomes the founder's capacity to keep a promise, not the cost
of software.

What becomes newly reasonable:

| Idea class | What the factory can stand up | Familiar object the founder judges |
|---|---|---|
| **Test before a lease** | Named storefront, hours, one action (enquire / join a list), no fake reviews | "Would I hand this card out on Main Street?" |
| **Seasonal / pop-up** | Operating page with open / closed / sold-out; takedown when the season ends | Tonight's board, not a twelve-page brochure |
| **Skill → first trade** | Maker, cook, guide, instructor: range + request + "when it's gone" | The table or the walk, shown clearly |
| **Side offer of an existing trader** | Supper club, hire window, workshop night as its own surface | The extra night, not a redesign of the day job |
| **Market stall → owned list** | Weekly availability, cutoff, route, request — the operating-page shape | The packing sheet customers already understand |
| **Club / charity first surface** | Events, joining, one true contact route | The noticeboard, done properly |
| **Succession / new owner** | Keep the recognised mark; replace the stale route | "This is still us, and you can book" |
| **Complementary pair** | Two small surfaces that hand off (rooms ↔ experiences, hire ↔ café) | Two doors, one honest link |
| **Shared visitor path** | Future partnership guide (`PRODUCT.md`) that points at owned actions | A town leaflet that does not steal the till |

None of these require the founder to "adopt AI." They require a Tuesday that
works.

### Honesty when there is no before

Launch work cannot borrow the existing verification fiction. There is no live
site to sit beside, no FSA date, no "owner would recognise themselves" against
a current page.

Use a different packet:

- **Intent, not trading evidence** — what they will sell, where, when, to whom.
- **Labelled as not yet trading** on any public concept (same independence
  rules as uncommissioned work).
- **No invented atmosphere** — no fake reviews, no conjured regulars, no
  "established 2026" theatre.
- **One promise** — the first-week action, not a full brand universe.
- **Upkeep named before launch** — who updates the board when it is real.

Synthetic representative prototypes (operating page, impossible local) already
rehearse this: new subjects, labelled, built to test a form. Launch for a real
founder is that form with their name and their promise, plus a baseline measure
(first enquiries, first paid orders, list sign-ups).

### What we do not do in the launch arm

- Imply a business is trading when it is not.
- Build a "startup OS" or founder dashboard.
- Push people toward premises, stock or debt they have not chosen.
- Use the census to manufacture businesses that are not there.
- Treat a successful concept as proof of demand (same rule as today).

---

## 7. The factory should feel ordinary

The plant can be sophisticated. The **counter** must not be.

The point of this factory is to make AI **accessible** to local businesses —
to hide the machinery the way an accountant hides the software, a printer
hides the RIP, a kitchen hides the prep list. It is not to march owners into
cutting-edge tools, agent consoles, prompt literacy or another SaaS tab they
will abandon.

If an owner needs to understand models, orchestration or "being AI-native" to
get value, the factory has failed the wedge.

### Familiar concepts, not new categories

Talk and ship in objects people already have:

| Factory output | Familiar concept | Not this |
|---|---|---|
| Concept / transformation | Shop window, before and after | "Design system" / "MVP" |
| Operating page | Chalkboard / tonight's board | CMS |
| Request / booking handoff | Phone and appointment book | Conversational agent |
| Missed-call text-back | The person who answers when you cannot | Voice AI platform |
| One-sheet | A printed card with a picture of the shop | Growth asset |
| Weekly summary to approve | The pile of notes on the counter | Ops copilot |
| Mini-app for one job | A hire book / waitlist / order pad | Platform |

The owner uses the shop window, the board, the phone, the card. The factory
uses agents, pins, packets and evals. Those words stay in `research/`,
`tools/` and this document.

### Ease of use is a quality bar

Accessibility here means:

1. **One conversation** — they describe the Tuesday they want; they do not
   fill a spec.
2. **One artifact they can hold** — a page, a sheet, a text thread — judged in
   minutes.
3. **No new daily tool** unless it *is* the chalkboard or the appointment
   book. Prefer their existing Instagram, GBP, Booksy, GuestDiary, Gmail.
4. **Approval on the same surface visitors see** — never a second admin world
   (operating-page doctrine).
5. **Plain failure** — if the automatic reply is unsure, it says so and hands
   to a person. No clever recovery theatre.
6. **Their accounts** — they own the domain, the number, the inbox.
7. **Stoppable** — a season can end; a workflow can be switched off; last good
   version remains.

Cutting-edge capability is a **back-of-house** advantage (speed, consistency,
honesty checks). It is not a feature list for the town.

### Do not force AI on the owner

| Do | Don't |
|---|---|
| Use AI to stand up their window faster | Require them to chat with a bot to edit hours |
| Offer a text-back they can read and correct | Train them on prompts |
| Keep a human studio number for the relationship | Replace the neighbour with a portal |
| Disclose generated pictures the usual way | Brand the offer as an AI product |
| Let them stay on a specialist booker if it works | Rebuild everything custom to show the factory |

Some owners will never want arms 4–6. That is success if arm 1 is useful. The
factory's job is optionality at low cost, not conversion to "AI customers."

---

## 8. Scope-expansion proposals

These extend A–L. They assume Phases 0–1 of the website factory are underway;
they do not replace the outreach gate.

### Proposal M — Codify the wedge doctrine

**Intent.** Make "website first, AI outcomes later" an enforceable product rule.

**Work:**

- Short doctrine note (or section in `PRODUCT.md` when positioning is ready to
  move): look-and-decide test; arm ladder; anti-abstraction copy rules.
- Triage refuses automation/mini-app work packets that lack an arm-1 artifact
  or an explicit exception (e.g. business already has a strong site and asks
  only for missed-call capture).
- Studio marketing continues to lead with transformations, not "AI agency."

**Why.** Stops the factory from optimising for impressive arms the market
cannot yet evaluate.

### Proposal N — Capability catalogue (internal only)

**Intent.** Know what the plant can build before selling it.

**Work:**

- Internal catalogue of repeatable recipes: operating-page upkeep assist;
  missed-call SMS; form → qualified email; booking API handoff; review ask;
  invoice OCR to folder; bilingual menu sync; etc.
- Each recipe lists: inputs, integrations, approval gates, eval fixtures,
  look-and-decide demo format, estimated risk tier.
- Lives under `research/` or `docs/` — not on the public site.

**Why.** Factories need standard products; agencies without catalogues reinvent
every time and over-promise.

### Proposal O — Workflow / automation line in the factory

**Intent.** Second product line with the same station discipline as concepts.

**Stations (sketch):**

```text
Discover pain (from verification faults + owner conversation)
  → Packet (channel, system of record, side-effects, measure)
  → Design conversation/flow (human lock on voice + escalation)
  → Build in sandbox (n8n/Make/custom; credentials scoped)
  → Eval set (20–50 labelled examples; mutation of bad sends)
  → Owner rehearsal (look-and-decide on their phone)
  → Go-live with monitoring + kill switch
  → Learn (flawed runs → recipe + eval updates)
```

**Why.** SMB ROI evidence says handoffs beat chat tabs; this industrialises
handoffs without skipping trust.

### Proposal P — Mini-app line (capability apps)

**Intent.** Thin owned tools when platforms do not fit.

**Work:**

- Reuse concept-pack scaffolding patterns (three homes → app module +
  research brief + pins).
- Prefer business-owned accounts and exportable data (`PRODUCT.md`).
- Factory pins: the one job completes; failure modes labelled; no dashboard
  theatre on the owner surface.

**Why.** Arm 6 without a factory becomes bespoke debt; with a factory it becomes
a catalogued recipe family.

### Proposal Q — Demonstration ladder on the studio site

**Intent.** Extend the belief sequence without AI-SaaS chrome.

**Work (when PLAN allows product storytelling):**

- Keep transformations as the hero proof.
- Add *representative* demonstrations later: operating page (arm 3), a labelled
  rehearsal of after-hours capture (arm 4), a mini-app for a synthetic subject
  (arm 6) — same honesty as concepts (independent, uncommissioned, no implied
  client results).
- Each demo must be look-and-decide in under ten seconds; no architecture
  diagrams as the pitch.

**Why.** The wedge strategy needs a path for "what else can you do?" that still
respects distrust.

### Proposal R — Measure AI value the way pilots already require

**Intent.** Do not let AI arms invent vanity metrics.

**Work:**

- Reuse `PRODUCT.md` pilot discipline: baseline + one primary measure before
  build (bookings completed, response time, recovered leads, hours saved on a
  named admin task, platform costs avoided).
- Factory packet requires the measure field; go-live blocked without it.
- Public claims about AI results forbidden until a pilot has dated evidence —
  same rule as concept work today.

**Why.** The long-term vision is *showing* AI value; showing requires
measurement, not mythology.

### Proposal S — Shared context graph across arms

**Intent.** One business memory for the factory.

**Work:**

- Extend verification + elevation inventory into a durable business context
  object: voice quotes, services, platforms, hours sources, fault IDs, live
  integrations, approval contacts.
- Every arm's agents read the same object; none invent hours or prices.
- Privacy: client credentials never enter the public repo; context for
  prospects stays source-bounded as today.

**Why.** Multi-arm delivery fails when each project rediscovers the business
and drifts from truth — the exact failure elevation method prevents for sites.

### Proposal T — Launch packet (intent, not census)

**Intent.** Make new-business work first-class without faking a verification.

**Work:**

- Packet type `launch` beside prospect packets: promise, place, season,
  first-week action, who keeps the board, labelled not-yet-trading.
- Block publication that implies current trading; allow labelled representative
  or founder-requested previews.
- Reuse operating-page and concept scaffolds; do not invent reviews, regulars
  or history.

**Why.** Arm 7 needs a different honesty contract than arms 1–6.

### Proposal U — First-week kit as a catalogue recipe

**Intent.** Stand up the smallest honest Tuesday: window + one action +
upkeep + optional list/text-back.

**Work:**

- One internal recipe: operating page (or after-only concept), request path,
  GBP/social handoff if they have them, owner publish, stoppable season.
- Look-and-decide test: "Would I hand this card out on Main Street?"
- Measure for a real founder: first enquiries or first paid orders — never
  page launches.

**Why.** This is the launch analogue of presence repair: familiar, finite,
judgable.

### Proposal V — Ordinary-counter standard

**Intent.** Encode accessibility as a gate, not a hope.

**Work:**

- Review checklist for any owner-facing surface: familiar name, no new daily
  tool unless it *is* the board/book, approval on the visitor surface, stoppable,
  their accounts, no prompt literacy required.
- Factory docs and agent prompts may say "agent"; guest and owner copy may not.
- Failed ordinary-counter review is a blocker (same weight as guest-voice).

**Why.** Stops the plant from leaking futurism into the town.

---

## 9. Suggested adoption sequence

Aligned with common agent-native adoption (scoped → review → missions), this
repo's risk profile, the wedge doctrine, and the ordinary-counter rule:

| Phase | Focus | Exit criteria |
|---|---|---|
| **0 — Name the plant** | A + L + M + V (draft) | Station map, non-goals, wedge + ordinary-counter agreed |
| **1 — QC utilities** | D + E (partial) + K skeleton | Disclose path; new pins; run outcomes logged |
| **2 — Research mechanics** | C + B + S (light) | Drift probes; work packets; shared context stub |
| **3 — Scaffold & media** | F + G | Pack scaffold used once end-to-end |
| **4 — Reviewer assist** | H + I | Publication + one-sheet checklists in real use |
| **5 — Website missions** | J then careful concept missions | Prototypes (esp. operating page) rehearse arms 2–3 |
| **6 — Catalogue arms 3–4** | N + O (sandbox) + Q (internal demos) | 2–3 recipes with evals; no public AI pitch yet |
| **7 — First non-site pilot** | O/P + R | One paying or formal pilot with baseline measure after arm-1 trust |
| **8 — Launch rehearsal** | T + U on a synthetic or willing founder | First-week kit used once; labelled; ordinary-counter pass |

Do not skip Phase 1. Do not open Phase 6 selling before Phase 5 has something
an owner can look at for continuity/capture. Do not offer Phase 8 as a public
"start a business with AI" product before arms 1–3 are ordinary to use.
Scaling Build before Disclose/Pin recreates the verification gap; scaling
automations before the wedge recreates the trust gap; scaling launch before
the counter is ordinary recreates the futurism gap.

---

## 10. Mapping software-factory literature → this repo

| Factory property | Mourne Made analogue today | Gap |
|---|---|---|
| Standardised inputs | Elevation briefs, verifications, publication reviews | No single work-packet schema; no workflow or launch packets yet |
| Standardised tooling | `pnpm build` / `pnpm test`, capture, print | Agent tasks not registered; browser QC thinned; no automation eval harness |
| Measurable output | Suite counts, publication.json | No station cycle-time or flawed-run metrics; no pilot AI measures yet |
| Replayability | Git history, provenance, ADRs, PLAN narrative | Prompt/model versions for agent runs not systematically stored |
| Human control | Five checks, outreach gate, anonymity ADRs | Strong — preserve; extend to automation approval and ordinary-counter |
| Utilities | Checks, rate limit, provenance | Spend metering / agent registry thin |
| Multi-product lines | Website arm only in production | Operating-page prototype is the bridge; arms 4–7 not industrialised |
| Owner experience | Transformations + request form | Must stay shop-window simple as the plant grows |

---

## 11. Bottom line

Mourne Made is already a **proto-factory**: a repeatable path from census to
published transformation with unusually sharp honesty gates, written methods
and machine checks paid for in real failures (scored review theatre,
tautological disclosure, abort-on-fail, premise drift, hotel-moves-on-food-bar).

The deeper company bet is a **local AI-first agency** that uses websites as the
trust wedge — because owners can look and decide — and then grows into
continuity, capture, ops automations and mini-apps once belief is earned.
Further out, the same plant can help **launch** new local trades: a first
Tuesday that is tryable because standing up a shop window, a board and a
request path no longer takes an agency month. Industry evidence says AI value
for SMBs lives in **handoffs and systems of record**, not in abstract
assistants; this catchment needs those handoffs to stay local, owned,
measurable and recognisable.

The factory itself should be **ordinary at the counter**. Sophistication stays
back of house. Owners should meet a shop window, a chalkboard, an appointment
book and a printed card — not agents, prompts or cutting-edge software. Making
AI accessible means they need not believe in AI, operate AI, or become "AI
businesses" to get a Tuesday that works.

An agent-native software factory is the right industrialisation **if** it:

1. Formalises stations and work packets for the website arm first.
2. Automates verify/disclose/pin/media/print checklists.
3. Assists publication and outreach with evidence chains.
4. Spends mission capacity on prototypes (especially the operating page) that
   rehearse later arms without claiming demand.
5. Adds workflow and mini-app lines with the same honesty bars and look-and-decide
   demos — never leading the market conversation with "AI" as the product.
6. Treats flawed factory runs as the backlog that improves the plant.
7. Couples capacity to conversation evidence so the agency does not outrun trust.
8. Keeps the owner experience familiar, finite and stoppable as scope grows.
9. Opens a launch arm only with intent packets, labelled previews and a
   first-week kit — never a fake before or a startup OS.
10. Treats decisions as living: standing bars stay pinned; current choices
    can be superseded with a rework queue; experiments stay labelled; open
    questions stay visible. History of reversals lives in
    [`docs/decision-register.md`](decision-register.md).

That is how to do more things faster, more reliably, **and** wider in scope —
including new businesses that could not have started on software cost alone —
without turning a recognition-led local studio into generic automation theatre,
and without asking distrustful owners to buy a story they cannot see.

---

## 12. Contradictions, reversals, and divergence (history audit)

A factory cannot treat the current tree as a single coherent spec. This
repository learned in public: publication reset, imagery withdrawal, suite
retirement, elevation method, Shore/Lights, then `/the-map/`. That was the
right way to start. It is the wrong way to scale — unless each change of mind
is named, the old rule is superseded, and the rework is queued.

The living list is [`docs/decision-register.md`](decision-register.md). This
section is the audit that filled it (18 August 2026).

### Why this matters for a factory

Humans remember "we don't do door-drops any more" and "Enniskeen's test died."
Agents do not. They read the nearest ADR, the nearest brief, and the nearest
concept pack, and they **copy the variant**. Unlabelled divergence becomes
eighteen slightly different products. Each later station then inherits the
wrong assumption. That is how mistakes stack.

Changing your mind is not the failure. **Silent supersession** is.

### Reversals and contradictions found

Severity is about factory risk (wrong next task, false green, privacy miss),
not moral score.

| Sev | What was decided | What later happened | Type |
|---|---|---|---|
| P0 | ADR-0005 (14 Aug): `/the-lights/`, anonymous displaced lights, no named dark businesses, no JS map | Same day: `d31e0e8` ships `/the-map/` — named directory, exact pins, Leaflet | **Reversal**; ADR and privacy copy not superseded |
| P0 | Privacy: no individual dark identities; displaced anonymous coordinates | `/the-map/` lists traders by name with exact lat/lon and website status | **Unresolved contradiction** |
| P1 | `PLAN.md` §1b: homepage claim door restored (3 Aug); shell brief ships quiet hero claim | `index.astro` has only a comment; `test:shell-home` retired 4 Aug | **Reversal** + unpaid debt |
| P1 | `CONCEPT_DESIGN_REVIEW.md`: Dundrum Inn "passed and lost to the live site" — reason for check 5 | `publication.json`: `dundrum-inn` Publish, `ownerWouldRecognise: true` | **Contradiction** in the teaching example |
| P1 | `PLAN.md` §1c: runner reports 12 / 13 of 13 | `run-verification.mjs` is 17 suites | **Doc drift** |
| P2 | Elevation method: "AI-imagery-only on the public site" | Kelly / Douglas ship firm photos; Chamber / Donard Hotel ship CC BY-SA; ADR-0003 allows CC | **Blunt rule vs exceptions** |
| P2 | `PRODUCT.md`: "independently reviewed" transformations | Five-check self-record; independent reviewer optional after v1.1 reset | **Copy vs process** |
| P2 | ADR-0001: no untargeted door-drop | `research/outreach-postcards.md` still discusses door-dropped volume | **Unresolved** |
| P2 | `lights.json` + anonymity checks | Public UI is `/the-map/`; lights pipeline still builds | **Orphan plant** |
| P3 | Shell brief: `MourneMotif` stays | ADR-0004 + later commit: real `Shore` band; motif retired | **Superseded** (aligned with ADR, stale brief) |
| P3 | `PLAN.md` §7: Shore at **three** scales | ADR-0004: **two** scales; `rule` cut | **Stale plan** |
| P3 | v1.1: scores ≥7.0, independent reviewer, one repair then retire | 25–27 Jul: five binary checks; Buck's Head republished after v1.1 retire | **Explicit replacement** (archive is history) |

Healthy reversals (named, then closed): door-drop → one-sheets; M3/M4 print
order → inbox-first QR; hotel-moves-on-food-bar → elevation shapes; browser
suites → static pins with a **written gaps table**. Those are the model: decide,
record, list what is no longer true.

### Divergence across concepts (same job, many answers)

A factory reading the packs cannot tell which pattern is current.

| Job | Variants in tree | Later-looking canon (hypothesis, not yet decided) |
|---|---|---|
| Data layer | `content.ts` / `record.ts` / `round.ts` / inline / `chamber-prototype` | `record.ts` with standing rules for claims-gated work |
| Multi-route chrome | Full `*Shell` / partial `DvChrome` / prototype Chamber shell / copy-paste headers | Per-concept shell wrapping `ConceptLayout` |
| Elevation brief | 14 have briefs; Buck's Head, Donard Hotel, Douglas, Enniskeen (intentional), Murdock missing | Brief required except documented exceptions |
| Elevation pin | 9 of 19 slugs; flagship Enniskeen has none after 4 Aug | Pin every landed magic move |
| Disclosure | Banner only / figcaption / alt-only / placeholder caption / missing | Visible guest-layer line + banner + provenance |
| Imagery | AI / CC / firm photos / CSS placeholders / withdrawn fallback | Rights-driven exceptions list, not "AI-only" slogan |
| Booking handoff | Bookin1 verified hash / ResDiary / decorative form / Instagram / phone / official engine | Verified parameters or labelled illustrative |
| Marks | Real PNG / studio SVG / text wordmark; favicon only on two packs | Real mark when we have it; studio mark labelled |
| Docs | `DESIGN.md` still cites `src/styles/concept-*.css` and hotel-owned Enniskeen photos | Pack paths in `REPO_MAP.md` |

None of these need a freeze tomorrow. They need a **canon vs labelled
exception** so the next pack does not roll a nineteenth variant.

### Open questions already sitting in briefs

Not contradictions — unfinished choices. If the factory starts work without
parking them, it will invent answers.

Examples: homepage headline candidates (`docs/shell-elevation-brief.md`);
print stock/bleed (`PLAN.md` §9); `/the-lights/` findability and correction
SLA (`research/the-lights-brief.md`, stale vs `/the-map/`); postcard vs
one-sheet (`research/outreach-postcards.md`); narration casting; held
prospects; GBP owner account.

---

## 13. A system for deciding, changing our minds, and reworking

Preferences will move. Ambition will move. That is expected. The factory
needs a way to **see the question, make a concrete choice, and spend rework
on purpose** — not a fantasy that everything is already decided.

### Decision classes

| Class | Meaning | Change rule |
|---|---|---|
| **Standing** | Honesty bars we do not casually violate (no invented facts; guest voice; three homes; owner-owned accounts; look-and-decide; ordinary counter) | New ADR + pin/check the same week |
| **Current** | Today's product choice (publication standard, outreach format, map route, imagery exceptions) | New decision **supersedes** the old; rework queue required |
| **Experiment** | One pack, prototype, or spike allowed to diverge | Must say `experiment` and what question it answers |
| **Open** | Unresolved on purpose | Owner + "decides when" + default if someone must ship first |

Early-stage work was all experiment. Factory-stage work is **current, with
experiments labelled**. Standing is a short list.

### The supersession loop (how we change our minds)

1. **Name the question** — one sentence. If two docs disagree, the question
   already exists; write it down instead of picking a side in a PR description.
2. **Options and cost** — including "leave divergent" as an option (sometimes
   right for a held concept).
3. **Decide** — status `current` or `standing`. Record date, what is now false,
   and the **rework queue** (files, packs, checks).
4. **Supersede** — old ADR/brief/PLAN paragraph marked superseded with a link.
   Do not delete history; archive is how we avoid repeating v1.1.
5. **Pin if standing or high-risk current** — a check that fails when the
   tree contradicts the decision (publication.json already does this for the
   five checks; guest-voice already does this for denylist phrases).
6. **Rework in slices** — factory missions consume the queue by risk, not a
   big-bang rewrite of eighteen concepts.

A change of mind without steps 3–5 is how `/the-lights/` and `/the-map/`
coexist.

### Surfacing over time (the factory's memory)

Do not rely on rereading PLAN. Three ongoing surfaces:

1. **Decision register** — [`docs/decision-register.md`](decision-register.md)
   is the index: open questions, current decisions, superseded history,
   pattern canon, rework queue. One owner document (same discipline as
   PRODUCT / PLAN / PROSPECTS).
2. **Drift station** — a check (Proposal W) that fails when a `current`
   decision's "must hold" assertion is false in the tree (e.g. ADR says
   route `/the-lights/` and that page does not exist; `DESIGN.md` cites
   deleted CSS paths). Human still writes the assertion; the factory
   notices breakage.
3. **Variant report** — when a Build station creates a *new* way to do a
   job that already has a canon (fourth data-layer name, fifth disclosure
   pattern), the run is `flawed` unless the packet marked `experiment`.

Every factory run should be allowed to **open** a question. That is learning.
It must not close one by implication.

### What we do not do

- Freeze the product so nothing can be reworked.
- Treat ADRs as holy if the tree has moved — that is how privacy copy lies.
- Normalise all eighteen packs in one pass "for consistency."
- Let PLAN narrative replace the register (PLAN owns the next actions;
  the register owns what is decided).
- Hide experiments in production patterns.

---

## 14. Decision-discipline proposals

### Proposal W — Decision register + drift check

**Intent.** One place that answers "what is decided, what is open, what did
we change."

**Work:**

- Keep [`docs/decision-register.md`](decision-register.md) current; link it
  from README ownership like PLAN/PRODUCT.
- Add machine-readable `research/decisions.json` (or frontmatter) with
  `id`, `class`, `status`, `mustHold` assertions, `supersededBy`.
- `tools/check/check-decisions.mjs` on `pnpm build`: fail if a `current`
  `mustHold` is false (route exists, file exists, phrase absent, suite count
  matches). Start with three assertions, grow when a drift hurts.

**Why.** The register without a check becomes another stale PLAN.

### Proposal X — Pattern canon (labelled variants)

**Intent.** Next concept does not invent a twentieth pack shape.

**Work:**

- Short canon in the register: data layer, shell, disclosure, pin, booking
  handoff — each with **one** default and a list of allowed exceptions.
- Scaffold (Proposal F) emits the canon only.
- Existing packs stay until a rework-queue item names them; they are
  `legacy`, not wrong.

**Why.** Divergence is expensive only when it is invisible.

### Proposal Y — Rework queue as factory work, not guilt

**Intent.** Changing a current decision produces tickets, not a vibe that
"we should tidy."

**Work:**

- Every supersession lists packs/docs/checks to update, risk-ordered.
- Factory missions may pick rework items when PLAN blocks new concepts
  (same as Proposal J).
- First queue (from this audit): (1) Lights vs Map vs privacy — **must
  decide**, not silently tidy; (2) claim door or delete the comment;
  (3) Dundrum Inn teaching example vs publication record; (4) PLAN suite
  counts; (5) DESIGN.md path/imagery stale lines; (6) elevation pins for
  Enniskeen / Scopers / Betty's / Donard Vet.

**Why.** Thoughtful rework is scheduled work.

### Proposal Z — Question protocol in every station

**Intent.** Learning stays visible.

**Work:**

- Work packet and publication pack gain `openQuestions[]` and
  `newVariants[]`.
- Station prompts: if you discover a contradiction, **open a register
  row** (`status: open`) rather than picking a side.
- Weekly (or per milestone) human pass: close or defer opens; never let
  them age into unofficial current.

**Why.** The alternative is agents deciding the map product in a refactor
commit.

### Adoption note

Add to Phase 0: stand up the register (already started) and one drift
assertion. Phase 1: W check with 3–5 `mustHold`s. Do **not** wait to
"finish deciding everything." The system is how we keep deciding.

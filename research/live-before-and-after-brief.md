# `/see-yours/` — the before-and-after, performed while you wait

*Written 14 August 2026. Turns the free before-and-after from a promise made on
`/request/` into a machine that performs its first minute in front of the
owner. Depends on the fault taxonomy
([`what-we-look-for-brief.md`](what-we-look-for-brief.md)), the five shapes
([`five-shapes-brief.md`](five-shapes-brief.md)), the assembly
([`how-a-site-goes-together-brief.md`](how-a-site-goes-together-brief.md)) and
`docs/RESEARCH_METHOD.md` steps 1 and 5. It is the most ambitious of the three
14 August directions and the one with the most ways to be dishonest — read the
scope section before the device section.*

## The idea in one line

The studio has written down how it diagnoses a local website, and has built the
tools that do the mechanical half of it. An owner who types their own address
should be able to watch that diagnosis run on their own site, at phone width,
in under a minute — and then decide whether to ask for the rest.

## Why this is not a gimmick

Three assets already exist and are currently used only in private:

| Asset | What it already does |
|---|---|
| `tools/pipeline/probe-sites.mjs` | Step 1 of the four-step verification, mechanically: does it resolve, does HTTPS work, where does it redirect, what built it, when was it last touched, can a customer book or order. Distinguishes DNS failure, refused TLS, Wix `ConnectYourDomain` 404s and silent redirects to a different business — because listed domains go dead in all four ways and collapsing them into "didn't load" was a real defect. |
| `tools/pipeline/derive-faults.mjs` | Derives the mechanical half of the fault taxonomy — **T1, T2, T5, T8, T9** — from those probes. Deliberately refuses T3, T4, T6, T7, T10, because the method requires a human opening the page, and T4 requires it at phone width. |
| `TransformationErrand` in `transformation-details.ts` | One errand, walked on both sides at phone size, with taps and screens per side. The currency the case studies are argued in and the currency `/where-it-fails/` teaches. |

**`derive-faults.mjs` has already decided this page's honest scope**, and it did
so for reasons that had nothing to do with a public feature. Five faults are
machine-derivable; five need a person. That split is the product design, handed
over pre-argued.

## The name does the tonal work

Not `/audit/` — an audit is a document produced by an authority, and we would
be claiming one over a business we have never spoken to. Not `/scan/` or
`/check-your-website/` — both belong to the SEO-grader genre, which ends in a
score, a red dial and an email capture, and which is precisely the anti-
reference `PRODUCT.md` warns about. Not `/instant-before-and-after/` — *instant*
promises the whole thing, and the whole thing takes a person.

**`/see-yours/`** is imperative, possessive and modest about scope. It also
completes a sentence the site already says everywhere else: *we show you your
own before and after.* `Before-and-after` is a defined term in
`docs/CONTEXT.md`; this page is that term, started.

Working headline: **Put your address in. Watch us start.** Subhead: the first
five checks we run on any local site, run on yours, at phone size — the rest
needs a person and we will say which parts.

## Scope: what the machine may and may not say

The whole risk of this page is a machine making claims about a real business
with nobody accountable for them. Four boundaries, each with a reason that
already exists in the repo.

**1 — Only the five mechanical faults.** T1 access, T2 dead end, T5 booking
that isn't, T8 locked in a file, T9 stopped clock. The other five are named on
the page as *what a person still has to look at*, which is honest and is also
the offer.

**2 — Everything observed is quoted, never characterised.** `derive-faults.mjs`
already enforces this internally: every `observed` string is a verbatim
sentence, and a `DISQUALIFIED` pattern blocks sentences that record a fix, a
probe's limitation, or an unconfirmed state, because recording one of those
would put a claim in outreach that the record itself contradicts. The public
version carries the same discipline: *your menu is a PDF stamped JUN24* is an
observation; *your menu is out of date* is a judgement about how the business
runs.

**3 — No score, no grade, no total.** `/where-it-fails/` already ruled that the
request form does not grade anyone, and gave the reason: the page never totals
anything about the visitor's own site. Five findings and five open questions is
the output. A number out of ten would make it a grader, and graders are
adversarial by construction.

**4 — Nothing is published, stored or indexed.** The result exists in the
owner's browser for the length of the visit. No result page has a URL. No
result is retained unless the owner submits it with the request, in which case
it is attached to their own enquiry and nowhere else. **A permalinked diagnosis
of a named business is a public fault page about someone who did not consent**,
which is the exact thing `/where-it-fails/` was constructed around avoiding.

Boundary 4 is the one a future feature request will attack — *let them share
it*, *let them come back to it*. It does not bend.

## The device: the assembly chassis, run on their own site

Not a report. Not a list of red crosses. **The build sequence from
`/how-its-made/`, replayed with their content in it.**

The visitor already met that chassis if they read the explainer pages: a page
assembling layer by layer, each layer a decision. Here the same five layers
seat one at a time, and each one either fits or visibly does not.

```
  ┌──────────────────────────────────────────────────────────┐
  │  yourshop.example                     phone · 390px      │
  │                                                          │
  │   ┌────────────┐    NAME & TRADE      ✓ seated           │
  │   │ ▓▓▓▓▓▓▓▓▓▓ │    reached in 1 tap                     │
  │   │ ░░░░░░░░░░ │                                         │
  │   │ ▓▓▓▓▓▓▓▓▓▓ │    ARE YOU OPEN      ✗ won't seat       │
  │   │ ▓▓▓▓▓▓▓▓▓▓ │    "hours are in an image on            │
  │   │            │     the Facebook feed"                  │
  │   └────────────┘                                         │
  │                     CAN I BOOK        ✗ won't seat       │
  │    layer 3 of 5     "Book Now resolves to a              │
  │                      contact form"                       │
  │                                                          │
  │                     WHAT'S ON         · needs a person   │
  │                     WHY YOU           · needs a person   │
  └──────────────────────────────────────────────────────────┘
```

Three states per layer, and the third is the important one: **seated**,
**won't seat**, and **needs a person**. A layer that needs a person is not a
failure and is not left blank — it is the visible edge of what a machine can
do, drawn in the same grammar as the rest, and it is the page's argument for
the paid version of itself.

**"Won't seat" is a physical statement, not a verdict.** The layer is drawn
sitting proud of the chassis, the way the assembly vignettes already show a
layer arriving. Nothing is red. Nothing is crossed out. The existing micro-
settling pulse in `assembly-build.ts` is exactly the vocabulary — a layer that
seats settles, a layer that doesn't stays visibly unseated.

**Their content, not a screenshot of their site.** The layers carry text
pulled from the probe — the business name, the trading hours if they are in the
markup, the label on the booking control. Never a live iframe, never a
screenshot re-rendered inside our chrome. Rendering someone's site inside our
frame and labelling it *before* is both a rights question and the criticism
problem: the fault-walk brief's first rule is *wireframe, not a fake website*,
and it applies with more force when the site is real.

## What happens when it finds nothing

The most likely outcome for a good local site, and the page has to handle it
better than it handles a bad one.

Five layers seat. The page says so, in one line, without disappointment: **all
five mechanical checks pass — the interesting questions on this site are the
five a person has to answer.** Then it names them, and then it offers the same
thing it offers everyone.

If that outcome feels like a failure of the page, the page is a grader after
all. A tool that is only satisfying when it finds something wrong will
eventually find something wrong.

## Rate, cost, and the fact that we are fetching other people's sites

- **One address at a time, rate-limited per caller**, on the store that already
  backs `/request/` — `INCR` then `EXPIRE NX`, salted digest of the address,
  never the address itself. Reuse it; do not invent a second limiter.
- **A polite fetcher.** Identifies itself, honours `robots.txt`, one page plus
  what that page references, hard timeout, never crawls. `probe-sites.mjs`
  already runs bounded and with a timeout; keep those defaults, lower the
  concurrency to one.
- **Fail open and say so.** A site that will not respond gets *we could not
  reach it — that may be us* and a route to the human version. It never gets
  *your site is down*, because a failed fetch from a serverless region is not
  evidence about a business. The probe tool's own header says it: a dead domain
  is not proof of a closure.
- **Cache by domain for a day.** The same owner refreshing four times should
  cost one fetch, and a link shared to a friend should not hammer a small shop.

## Page structure

```
1  The field       One input, one verb. "Put your address in."
                   Under it, in small type: what we will do (five
                   mechanical checks), what we will not (a score,
                   a judgement, a stored copy), and that nothing
                   here is published.

2  The run         The chassis assembles, layer by layer, live.
                   Each layer seats, won't seat, or needs a person.
                   Observations quoted verbatim. About 20 seconds.

3  What a person   The five faults a machine cannot judge, named
   still has to    and explained in one line each. This is the
   look at         honest boundary and the offer in the same block.

4  Close           → /request/, pre-filled with the address and the
                   findings, and clearly optional. "Send this to a
                   person" — the machine's output becomes the first
                   paragraph of a human conversation, which is what
                   the free before-and-after always was.
```

Section 3 is not a limitation notice, it is the product. Every SEO grader in
existence stops at the mechanical layer and implies that is the whole of it.
Saying *five of these need a person, here is what they are* is the single most
differentiating sentence available to this studio, and it is true.

## Why this is sequenced third

Stated because it is the direction most likely to be built first out of
excitement, and it should not be.

1. It fetches and reasons about real businesses' property, live, unattended.
   Everything else on this site is reviewed by a person before a visitor sees
   it. This is the first surface where a machine speaks about a named business
   with nobody in the loop, and the studio's own record — four false sourcing
   claims in one class, a fifth found later, a dark flag wrong two times in
   three — is a record of exactly this failure mode when a human *was* in the
   loop.
2. It is the heaviest build of the three by a wide margin: a serverless
   fetcher, a rate-limited endpoint, a rendering of unknown content, and an
   interactive that must degrade.
3. Its value depends on the credibility the other two pages build.
   `/what-we-got-wrong/` is what makes an owner believe a machine of ours is
   not selling them something, and `/the-lights/` is what gets them to the site
   at all.

Build it after both. The tools it needs are already written and will keep.

## Build notes

- Route `/see-yours/`. The endpoint sits beside `api/request.ts` and shares its
  limiter and its structured failure codes.
- **Reuse the derivation, do not rewrite it.** The public path should call the
  same rules as `derive-faults.mjs`, including its `DISQUALIFIED` filter. Two
  implementations of the fault rules is two sets of claims about real
  businesses, and one of them will drift.
- The renderer is the assembly chassis with data injected — `assembly.ts`
  shapes, `assembly.css` grid. If it needs its own visual language, the
  explainer pages did not teach what we thought they taught.
- **Pin what it may say.** A test that feeds fixture probes representing each
  fault and asserts the output contains only quoted observations, no
  characterisation verbs, no total, and no judgement about the business.
  Confirm each assertion fails under mutation before wiring it in — §1a found
  two checks that could not fail, and here a check that cannot fail is a
  machine that can libel someone.
- Pin the boundary too: five mechanical faults present, five human faults named
  and never machine-answered.
- No JS and reduced motion: the layers appear seated or unseated as a static
  list, findings in prose. The diagnosis is the deliverable; the assembly is
  how it is felt.
- Nothing on this page is generated media. No provenance, no disclosure.

## Open questions

- Does it need the address at all, or should it accept a business name and find
  the site the way step 3 of the verification pass does? The name is friendlier
  and it is how an owner thinks. It also means we choose which site we are
  talking about, and choosing wrong is the "disambiguating same-named
  businesses" problem the method already flags. Leaning: address only, at
  first.
- Should the findings be attachable to the request, or always retyped by the
  owner? Attaching is obviously better UX and it is also the moment a machine's
  claims enter a document we send back to them under our name.
- What happens when an owner disagrees with an observation? There must be an
  answer on the page, and *tell us and we will correct it* is the same posture
  as `/the-lights/`'s lookup. Consider making them literally the same handler.
- Does this cannibalise the one-sheet? A printed sheet is personalised, handed
  over in person and shows a concept; this shows a diagnosis and no concept.
  They are probably complements — but the sheet is the method with a
  relationship attached, and it should stay the primary path for the
  shortlist.

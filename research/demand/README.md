# Demand workstream

Opened 27 September 2026, straight after the
[portfolio review](../portfolio-review/portfolio-review-2026-09-27.md) cut 75
concept packs to the ten businesses below.

The build phase proved we can make a decent website for a local business in
days. It proved nothing about whether any of them want one. In two months,
one business was contacted, and it said no. This workstream exists to find out,
for each of the ten, **whether they have a problem they would pay to fix, what
the problem is in their own words, and when they would act on it.** It is
research first and selling second. A conversation that ends in "no, and here's
why" is a result.

## The question for each business

1. **Problem.** Is the failure we found one they feel? What does it cost
   them, in their own estimate: lost bookings, commission, phone time, a
   worry?
2. **Want.** Do they want it fixed, or have they decided it doesn't matter?
   (Arley House may be the second kind; that's a finding, not a failure.)
3. **Pitch.** Which sentence makes them lean in? Which one makes them
   defensive?
4. **Scope and price.** What is the smallest paid change they'd agree to,
   what would they expect to pay, and who keeps it current?
5. **Timing.** What is the moment they'd act: a season ending, a booking
   rush, a refit, a renewal, a bad review?
6. **Decision.** Who decides, and who else has to agree?

## Where each business starts

| # | Business | Problem we believe they have | First window | First step |
|---|---|---|---|---|
| 1 | [Hugh McCann's + Avoca Hotel](dossiers/hugh-mccanns.md) | Wedding enquiries can only be phone calls; the sister hotel has no booking route on its own site | **Now → mid-November**, before the Christmas / New Year engagement peak | Find out who runs marketing for both properties |
| 2 | [Scopers](dossiers/scopers.md) | Supper clubs and hours can't be found without a Facebook login | **Now → early November**, before Christmas supper clubs and vouchers sell | Re-verify the sheet; walk in on a quiet weekday |
| 3 | [Coco's Adventure Playground](dossiers/cocos-adventure-playground.md) | Families can't confirm hours or party terms before travelling | **Now**: Halloween half-term, then Christmas parties | Capture a real before; check the current site |
| 4 | [Mourne Cycles](dossiers/mourne-cycles.md) | Workshop, range and Cycle to Work invisible behind a 2014 Wix page | **October–November** workshop season; spring prep in February | Ask how the workshop diary fills today |
| 5 | [Newcastle Chamber of Commerce](dossiers/newcastle-chamber.md) | No website: a Gmail address and social pages | **October**, ahead of any Christmas shop-local push | Find the current committee contact |
| 6 | [Hotel Enniskeen](dossiers/hotel-enniskeen.md) | A c.2012 site in front of a working booking engine | **Mid-October → November**, once the season quietens | Re-check the live site; confirm the engine and decision-maker |
| 7 | [Conlyn House](dossiers/conlyn-house.md) | "Book Now" is a contact form | **November**, planning next season | Capture a real before; check whether it's still a form |
| 8 | [Arley House](dossiers/arley-house.md) | Rooms only for sale through OTAs and the phone | **November** | Find out whether they want direct bookings at all |
| 9 | [Donard Veterinary Clinic](dossiers/donard-veterinary.md) | No appointment request; a site that blocks zoom | Any time; no season | Confirm the practice is independent and who decides |
| 10 | [Newcastle Family Dental Care](dossiers/newcastle-dental.md) | Both domains send patients over plain HTTP to another practice's page | Any time, **after** the ownership question is answered | Establish the DJ Maguire relationship |

The order is by **timing pressure**, not by value. The accommodation cases
are worth more but are least urgent this week: the season is ending and
owners plan next year's selling in the quiet months.

## How a business moves through it

**Step 0: desk re-check** (an hour, the day before any visit). Re-open the
live site and social page; confirm trading; capture a real before where the
case study has a placeholder; note anything that changed since the concept
was built. Two July concepts were built on claims the live site had already
outgrown (Kelly McEvoy & Brown, The Donard Hotel). Don't walk in with a
stale premise.

**Step 1: discovery conversation.** Use the [interview guide](interview-guide.md).
Talk about their business, not our website. Don't open with the concept. If
they ask what we do, say it in a sentence and offer to show it at the end.

**Step 2: show the fix, only if step 1 confirmed a problem.** The concept,
the one-sheet, or just the before-and-after on a phone. Name the smallest
paid change and the one measure it would be judged by (PRODUCT.md: presence
repair, direct action, ongoing growth).

**Step 3: pilot.** PLAN.md section 5 already owns this: baseline, one
measure, business-owned accounts, a 30-day review, null results recorded.

## The evidence ladder

Each business is recorded at the highest rung it has reached. Politeness,
page views, a "looks great" and silence are rung 0.

| Rung | Signal | Example |
|---:|---|---|
| 0 | No conversation yet, or only pleasantries | "Lovely, leave it with me" |
| 1 | A real conversation with the person who decides | 15 minutes with the owner, not the Saturday staff |
| 2 | **Problem confirmed in their words** | "We lose the wedding people who email on a Sunday night" |
| 3 | **Cost stated by them** | "Booking.com takes about £X a year off us" |
| 4 | **Asked for the next step**: a price, a proposal, a second meeting | "What would that cost?" |
| 5 | **Committed something**: money, a date, account access, their photographs | Deposit paid; Google account shared |

A "no" at any rung is recorded with its reason. **"No, we've just rebuilt"
and "no, it doesn't matter to us" are both findings** that tell us about the
market, not just about one door.

## When to stop, change or continue

Checkpoint dates are fixed now so the answer can't drift.

| Date | Check | If it fails |
|---|---|---|
| **Fri 30 October 2026** | At least 5 of the 10 have reached rung 1 | The problem is our outreach, not their demand. Fix the approach before judging the offer |
| **Fri 27 November 2026** | At least 3 of the 10 at rung 2, and at least 1 at rung 3 | The failures we find are not problems owners feel. Stop building; re-read the objections for the real problem |
| **Fri 18 December 2026** | At least 1 business at rung 4 or 5 | Record it plainly in PLAN.md. Decide between: a different offer (presence repair / upkeep only), a different customer (the Chamber as channel), or stopping |

Reaching rung 5 with one business is the whole point; everything else is
supporting evidence.

## Recording

After every contact, the same day:

1. Update the business's dossier: the **Log** table, and anything the
   conversation corrected in the problem, pitch or timing sections.
2. Add or update a `demand` block on its record in
   `research/pipeline/verifications.json`, then run
   `node tools/pipeline/normalize-businesses.mjs`:

   ```json
   "demand": {
     "rung": 2,
     "lastContact": "2026-10-08",
     "spokeWith": "role, not name, unless they're happy to be named",
     "problemInTheirWords": "quote or close paraphrase",
     "costTheyStated": null,
     "objections": ["…"],
     "nextAction": "…",
     "nextActionBy": "2026-10-15"
   }
   ```

   The existing `outreach` block (The Buck's Head) stays as it is; `demand`
   is the richer record going forward.
3. Update the table above and `PROSPECTS.md`.

Personal details stay out of the repository unless the person has agreed to
be named. A role ("the owner", "the practice manager") is enough.

## Rules that don't bend here

- **No invented facts.** A dossier's figures are either sourced to the
  business's own published words or labelled as our assumption to test.
- **The concept is independent and uncommissioned**, and we say so first.
- **Don't lead with AI, automation or tools** (PRODUCT.md, "How the offer
  grows"). The owner meets a website, a printed sheet, a phone call.
- **Never criticise their current site to their face.** Name the job it
  can't do ("there's no way to send you a date") rather than how it looks.
- **Silence is not a yes.** Two follow-ups at most, then stop, as in the
  Enniskeen pitch's cadence.
- **No new concepts and no restyles of these ten** until a conversation asks
  for one (decision register C6 still stands).

## Files

- [`interview-guide.md`](interview-guide.md): the discovery conversation
  and what to listen for.
- [`dossiers/`](dossiers/): one per business: what we know, the problem,
  the pitch to test, scope, timing, decision-maker, the unknowns, and the log.

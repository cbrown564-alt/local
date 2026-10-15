# Hotel Enniskeen: demand dossier

**Rung 0** · no contact yet · private concept to show the hotel at
`https://mournemade.co.uk/for/enniskeen-dysn/` (four pages, unlisted, noindex;
source in `src/concepts/hotel-enniskeen/`) · the same pages in the hotel's
current colours (royal blue #0000CC as the accent on white) at
`https://mournemade.co.uk/for/enniskeen-dysn-blue/`, to show as an alternative · the public concept and case-study
routes were taken down with the gallery and are not live · one-sheet (parked, outdated) and
written pitch in `research/concepts/hotel-enniskeen/enniskeen-pitch.md`

## What we know

Sourced from `research/pipeline/verifications.json` and
`research/concepts/hotel-enniskeen/`.

- Enniskeen Country House Hotel, Newcastle: family-run, above the Shimna
  Valley, a twelve-acre estate. 4.4★ from about 389 TripAdvisor reviews,
  with 2026 stays.
- The site is a hand-built c.2012 ASP.NET template (jQuery 1.8.3, ZeroGrid
  CSS, booking links still carrying 2013 tracking tags, no copyright year).
  **Behind it sit a working Bookin1 booking engine and a gift-voucher
  shop.** Re-read unchanged on 23 July 2026.
- Its photographs are good; the concept keeps them, and keeps Bookin1 and
  the voucher shop.

## The problem we think they have

The hotel sells well despite its website. Guests who arrive on the site
from Google or a tourism page meet a 2012 layout on a phone; checking dates
means finding the Bookin1 link. Some of them check the OTA listing instead
and book there, at a commission.

## Would they want it?

- **For:** accommodation is the audit's highest-return lane; the engine is
  already paid for, so the change is the route to it, not new systems. A
  family-run hotel planning 2027 has the winter to think about it.
- **Against:** a hotel with 389 reviews and steady trade may feel no pain;
  "it works" is a reasonable answer. A rebuild is a bigger ask than any
  other on this list.
- **Kill question:** "Roughly how many of your bookings come direct, and
  how many through Booking.com or Expedia?"

## Pitch to test

The written pitch already exists. Its core:

> "The concept doesn't replace your working systems. It keeps your
> photographs, Bookin1 and the voucher shop, and gives Stay, Dine, the
> estate and things to do a clear page each."

What to test is whether **commission** or **how the hotel looks on a
phone** is the sentence that lands. Lead with the one they raise.

## Smallest paid scope and the one measure

**Direct action:** a phone-first front page with a date search passing
straight into Bookin1, then Rooms and Dine. The full concept only
if the first step proves itself. Measure: direct bookings through Bookin1
per month against the same months last year. Voucher sales are a second
measure before Christmas.

## Timing

**Mid-October to November**, when the season quietens and the owners plan
2027. Christmas vouchers are a reason to talk sooner, but not to rush a
rebuild.

**Sequencing rule (ADR-0001):** the highest-stakes room should not be where
we rehearse. Visit Enniskeen after at least two other discovery
conversations have been held and written up.

## Who decides

The owning family. Find out which member handles marketing and bookings.

## What the private concept shows (refreshed 15 October 2026)

- A phone header with a call button and a menu; on a phone the date search
  sits under the headline, in the first screen, and hands straight to Bookin1.
- Stay, Dine, and The estate & the Mournes, each picture shown once, the
  hotel's own copy said once.
- Deliberately lean for the pitch (about 1,000 words across four pages): one
  menu shown in full with the rest as PDFs, the outdoors as three short
  cards, the history as four headlines. The full menus, walking routes, golf
  logistics and the cycle-tour package stay in `content.ts` for the finished
  site. Say so if they ask where it all went.
- Every image is AI-generated and the page says so at the foot. The house
  front and Room 6 are visualisations from reference photographs of the real
  hotel; the rest are atmospheric. Expect the question, and offer to swap in
  their own photographs.

## Step 0 before the first visit

- Confirm `/for/enniskeen-dysn/` and `/for/enniskeen-dysn-blue/` are deployed
  and open on a phone.
- **Leave the one-sheet at home.** It is parked, not for this visit: its
  screenshot, film reference and framing predate the October refresh. Copies
  printed before 15 October 2026 also scan to a 404. On that day only its QR
  was repointed to `https://mournemade.co.uk/for/enniskeen-dysn/` and the
  "own photographs" claim corrected
  (`src/workbench/print/enniskeen-onesheet.astro`). Redesign it before any
  later use.
- Re-check the live site: still the 2012 template? Still Bookin1?
- Re-test the Bookin1 deep link the concept uses.
- Check the OTA listings: which ones, and what they show.

## Unknowns to answer

- Direct versus OTA share, and what commission costs them.
- Who built and hosts the current site, and whether a contract runs.
- Voucher sales volume.

## Log

| Date | Who (role) | Rung | What we learned | Next action, by when |
|---|---|---:|---|---|
| | | | | |

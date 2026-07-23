# The Bucks Head walk-in pitch

Prepared and reviewed against `PRODUCT.md` on 24 July 2026. This is outreach
material, not a record of contact. Nothing here has been said to anyone.

**Do not hand anything over until all three gates clear:**

1. `mournemade.co.uk` resolves and the case study is deployed there.
2. A production request-form submission has reached the intended inbox.
3. The printed one-sheet's QR has been scanned on a phone against the live page.

**And re-verify on the morning of the walk-in.** This site changes fast — a
ResDiary widget appeared between the 20 July verification pass and the 21 July
build. Re-run `node scripts/audit-journey.mjs bucks-head` that morning. If the
counts have moved because they fixed it themselves, either refresh the numbers
or stand down and say so. A pitch built on a stale critique is worse than no
pitch.

## What this pitch is not

It is not a rebuild pitch. Their site is current, actively maintained and well
photographed; the à la carte PDF was re-issued on the morning of the build.
Telling them to throw that away would be dishonest and would ask them to write
off recent spend. The honest, measured gap is the walk to the two things people
arrive wanting — a table and tonight's menu — so that is the whole pitch.

## The opening (say this first, and mean it)

> "You've got a good site — and a real booking engine behind it, which most
> places around here still don't. I'm not here to sell you a new website."

Nothing else lands until that does. This is Dundrum: the studio is from the
village, and the pitch has to sound like a neighbour, not an agency.

## Sixty seconds, standing at the bar

Hello, I'm Conor — I run a small web studio here in the village called Mourne
Made.

I did something before asking for your time. On a phone this morning I walked
the two things people actually come to your site for: booking a table, and
reading tonight's à la carte. Then I walked the same two on a concept that
keeps your site, your photographs, your brand and your ResDiary booking.

Booking a table took two taps and four screens, and the engine opens on today's
date rather than the night you wanted. Reading the à la carte took three taps
and lands on an A4 PDF that shrinks by half to fit a phone. On the concept both
took one tap.

That's the whole idea — your booking engine and your menus, just a shorter walk
to them. Can I show you the two side by side? It's fifty seconds, no sound.

*(Show the film on the phone. Leave the one-sheet. Then:)*

It's independent work — not commissioned, and I'm not presenting it as
something you've approved. If it's useful, the before-and-after is free and
there's no obligation. If it's not for you, no hard feelings and I'll not
bother you again.

## The three numbers, if asked

Every one of these is a count from a dated walk, filed with screenshots. Never
quote a number that is not in `research-renders/bucks-head-journey/<date>/`.

| What | Their site today | The concept |
| --- | --- | --- |
| Book a table for two | 2 taps · 4 screens | 1 tap · 2 screens |
| Read the à la carte | 3 taps · 4 screens | 1 tap · 2 screens |

Supporting, if pressed:

- The first "Book A Table" on the homepage is 2,254 px down — about 2.7 phone
  screens.
- The bookings page opens on the Important Booking Notes; the widget starts
  399 px down and the time list is below the first screen.
- The à la carte is a one-page A4 PDF, 794 CSS px wide; fitting it to a 390 px
  phone shrinks it to 49 %.

## What stays (lead with this if they bristle)

- Their website's photography and brand.
- **ResDiary** — the concept hands date and party straight into the same
  widget. Verified by hand: the widget honours `date` and `partySize`, so those
  are the only two the concept sends.
- Their menus, their prices, their wording.
- The Important Booking Notes — the policy is theirs and it is reasonable. The
  concept moves it beside the booking action instead of ahead of it.

## Objections

**"We've just spent money on that site."**
Good — and it shows. This doesn't replace it. Everything I changed is the route
to the booking engine you already pay for.

**"The PDFs are easier for us — the chef changes the menu constantly."**
That's the strongest argument for the change, not against it. A page can be
edited in a minute from a phone and read without downloading. Keep issuing the
PDF as the printed menu if it suits the kitchen.

**"Who asked you to do this?"**
Nobody. It's independent and it's labelled that way everywhere it appears —
that's why I'm standing here telling you rather than putting it out as if
you'd hired me. If you'd rather it came down, I'll take it down.

**"What does it cost?"**
The before-and-after is free. If you want work after that, I quote a fixed
price in writing first, and the first job can be one page.

## Email fallback (if the walk-in isn't possible)

Subject options:
- Two taps to a table — a small idea for The Bucks Head
- I timed the booking journey on your site (and kept your ResDiary)
- Your menus, readable on a phone

Hello Bronagh and Alex,

I'm Conor, a web designer from Dundrum. I made an independent concept for The
Bucks Head — not a new website, because yours is current and well looked after.

I walked two errands on a phone: booking a table and reading the à la carte.
Today they take two taps and three taps, and the menu ends in an A4 PDF that
halves in size to fit the screen. On the concept both take one tap, using your
own photographs, your brand and the same ResDiary booking you already run.

There's a fifty-second side-by-side film here:
https://mournemade.co.uk/transformations/bucks-head/

This wasn't commissioned and there's no obligation. If it's useful I'd be glad
to talk through what stays and what changes.

Conor
Mourne Made, Dundrum

## Tone check against PRODUCT.md

- **Change before the ask** — the film and the counts come before any mention
  of work.
- **Respect the existing business** — the opening names what is already good;
  the pitch never mocks the current site.
- **Small, reversible next step** — a free before-and-after, a fixed written
  quote, one page as a first scope, and an offer to take the concept down.
- **Honest separation** — independent and uncommissioned, said out loud and
  printed on the sheet and the film's end card.
- **No SaaS theatre** — no traffic or revenue claims. Only counts from a dated
  walk.

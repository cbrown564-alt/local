# The Tool Centre — voice harvest, 5 August 2026

Move 1 of `research/concepts/tool-centre/tool-centre-elevation-brief.md` is a
research action before it is a build move: read the Google reviews the
verification points at and harvest one verbatim sentence to carry the page.

**Outcome: the harvest failed. No sentence shipped.**

## What the record promised

`research/pipeline/verifications.json` (verified 20 July 2026) records, under
trading evidence: *"Google reviews praising the owner and prices"*. No sentence
was ever captured, and no rating, count or reviewer was recorded — only that
such reviews were seen.

## What was attempted, 5 August 2026

| Source | Result |
| --- | --- |
| Google Maps place page for The Tool Centre, BT33 0AE | Not reachable — Google search and Maps returned a redirect interstitial to this environment; no review text retrieved |
| Cylex UK listing (`the-tool-centre-13395845`) | HTTP 403. The listing's own title is **"AI Review Summary"** — see below |
| Yell listing (`the-tool-centre-newcastle-893055`) | HTTP 403 |
| construction.co.uk listing (`c/281260`) | HTTP 403 |
| Kompass listing (`gb55266254`) | HTTP 403 |
| Big Red Directory (`tool-centre-newcastle`) | Retrieved. **"No comments posted yet."** Hours re-confirmed: Mon–Sat 9–5, Sun 10–4 |
| Central Index / 192.com (`438612459827201`) | Retrieved. No customer reviews on the listing |
| Wanderlog | No entry for this business |
| The shop's Facebook page (`Toolcentreplanthire`) | Behind Meta's login wall, as recorded on 22 July 2026 |

## Why nothing shipped

Web search surfaced fluent, quotable-sounding praise — *"stands out for
quality, price and the superb friendly highly intelligent staff"*, *"the number
one choice for plant hire and the purchase of tools and hardware in Newcastle
(County Down)"* — and it was tempting. It failed verification twice over:

1. The listing it traces back to is published as an **AI review summary**, not
   as anyone's review. A summary is nobody's words.
2. Searching those exact phrases returns **no page anywhere** that contains
   them, which is what you would expect of text generated on the way to the
   answer rather than quoted from a source.

Either way it is not a customer's sentence, and putting it on the page in
quotation marks would have been a fabrication of exactly the kind the brief's
honesty constraints exist to prevent. The brief's discipline is absolute: *"if
the harvest yields nothing clean, nothing ships"*.

The same search surfaced an owner's first name inside that summary. It is
recorded here and used nowhere: an unverified name from a generated summary is
not the record gaining a name, and no name appears on either route.

## What shipped instead

Moves 2 and 3, per the brief's own answer to a failed harvest — *"the structure
moves stand alone; the brief recommends shipping them and leaving the voice slot
designed but empty."*

The slot is `customerVoice` in `src/concepts/tool-centre/record.ts`, typed and
documented and set to `null`. Null renders nothing; there is no empty band, no
placeholder quotation and no apology on the page. The test suite asserts that
no quotation, blockquote or star rating exists while it is null, and asserts the
attribution and read date the moment it is filled.

## What would succeed

A read of the Google Maps place page from a browser session that reaches it, or
the shop's own engagement. One sentence is enough. Record it in
`record.ts` with the reviewer as published, the platform, and the read date —
then run `pnpm test:tool-centre`, which will start enforcing the attribution
rather than the absence.

Per the brief's open decisions, the harvest should be read by a second pair of
eyes before any sentence ships.

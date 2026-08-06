# The Tool Centre — voice harvest

Move 1 of `research/concepts/tool-centre/tool-centre-elevation-brief.md` is a
research action before it is a build move: read the Google reviews the
verification points at and harvest one verbatim sentence to carry the page.

**Outcome: move 1 shipped 6 August 2026.** Two Google review sentences — one
for the shop floor on the landing page, one for hire on the hire list. Light
attribution (`Google review · Month Year`). No star ratings. Maps relative
dates and studio read stamps stay in this file.

## What shipped

### Shop voice — landing page (`shopVoice`)

| Field | Value |
| --- | --- |
| Quote | What an incredible shop, a true aladdins cave of everything you need for home DIY and more, the shop is well and truly stocked from floor to ceiling with so many things. |
| Who | Tony's Reviews |
| Platform context | Local Guide · 629 reviews · 1432 photos (not on the page) |
| When shown on Maps | "10 months ago" as of 6 August 2026 (~October 2025) |
| Source on the page | Google review · October 2025 |

The rest of that review (not on the page) also praises "very reasonable prices"
and knowledgeable staff. **Name care:** "Tony's Reviews" is a Local Guide
display name, not a claim that the owner's name is Tony.

### Hire voice — hire list (`hireVoice`)

| Field | Value |
| --- | --- |
| Quote | I hire the large range of hoists from them and they always go the extra mile to ensure the best service possible. |
| Who | chris keag |
| When shown on Maps | "2 years ago" as of 6 August 2026 (~August 2024) |
| Source on the page | Google review · August 2024 |

Full review body as pasted (6 August 2026):

> Tony and Gerard are fantastic to deal with. I hire the large range of hoists
> from them and they always go the extra mile to ensure the best service
> possible. Couldn't recommend these guys enough. Quality kit with a quality
> service.

**Name care:** Tony and Gerard appear inside this quotation only — that is the
record gaining names from a sourced review; they are not used elsewhere on
either route.

## What the record promised

`research/pipeline/verifications.json` (verified 20 July 2026) records, under
trading evidence: *"Google reviews praising the owner and the prices"*. No
sentence was captured at verification — only that such reviews were seen.

---

## Pass 1 — 5 August 2026

**Outcome of pass 1: the harvest failed.** Maps unreachable; Cylex published an
**AI Review Summary** whose fluent praise could not be found as anyone's words;
Big Red had no comments. Full table and the AI-summary trap are kept below for
the audit trail.

| Source | Result |
| --- | --- |
| Google Maps place page | Not reachable — redirect interstitial; no review text |
| Cylex UK (`the-tool-centre-13395845`) | HTTP 403; listing titled **"AI Review Summary"** |
| Yell / construction.co.uk / Kompass | HTTP 403 |
| Big Red Directory | **"No comments posted yet."** Hours Mon–Sat 9–5, Sun 10–4 |
| Central Index / 192.com | No customer reviews |
| Facebook (`Toolcentreplanthire`) | Meta login wall |

Web search also surfaced summary-style praise that matched no page — not
harvested. An owner's first name appeared inside that summary and was used
nowhere.

---

## Pass 2 — 6 August 2026 (before the Maps paste)

| Source | Result |
| --- | --- |
| Google Maps (automated) | HTTP 200 shell; no review bodies in HTML |
| Chamber of Commerce UK ([503643](https://www.chamberofcommerce.uk/business-directory/northern-ireland/newcastle/miscellaneous/503643-the-tool-centre)) | Retrieved Google-attributed shorts (Martine Kenny, mike naylor). Hours on that listing are nonsense — not used for hours or for the shipped quote |
| localitybiz.co.uk | Cloudflare — unread; search index showed longer text including the sentence that later shipped |
| Big Red Directory | Still no reviews |

Chamber candidates were held for a second pair of eyes and were **not** shipped
once a primary Maps read arrived the same day.

---

## Pass 3 — 6 August 2026 (primary Maps read)

A Google Maps place-page read was pasted into the studio session. Full review
body as shown:

> What an incredible shop, a true aladdins cave of everything you need for home
> DIY and more, the shop is well and truly stocked from floor to ceiling with so
> many things. You will have to visit many times to see what you missed, we got
> all we needed and more at very reasonable prices so happy with the quality of
> the items too, staff are polite, very helpful and very knowledgeable. I'll be
> using this tool shop many times and I recommend everyone to go in and check it
> out you'll be surprised there will definitely be something you'll need, see
> you soon and thank you for your help

Attribution chrome as shown: **Tony's Reviews** · Local Guide · 629 reviews ·
1432 photos · **10 months ago**.

The opening sentence (through the first period) is what ships. Spelling
`aladdins` is as published — not corrected.

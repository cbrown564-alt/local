# The Hutt Hostel — copy brief

Guest page copy for `src/concepts/hutt-hostel/home.astro`.
Speak as the hostel. Written 26 August 2026 against the 23 August 2026
elevation brief (`research/concepts/hutt-hostel/hutt-hostel-elevation-brief.md`).
Kind: **stay**. Staged action: reception ledger — ring / write / book
on their existing site. No fake calendar. No invented availability.

Studio voice stays in `bannerNote`, this file, `NOTES.md`, and code comments.

## Register

Fascia lockup: **THE HUTT** as the biggest type; **30 Downs Road**
under it. Trading name **The Hutt Hostel** (they also say The Hutt).
Geography always **30 Downs Road, Newcastle, BT33 0AG** — corner of
Donard Place. Phone **028 4372 2133**. Email **info@hutthostel.com**.
Booking / site **http://hutthostel.com** (never https as if it works).

## First screen

| Line | Source |
| --- | --- |
| Strip: 30 Downs Road, Newcastle · BT33 0AG | Door / About / harvest |
| Strip: Corner of Donard Place | Place |
| Strip / ring: 028 4372 2133 | Harvest. `tel:+442843722133` |
| Brand: The Hutt · Hostel · Newcastle | Trading name |
| Nav: The Padd / 72 beds / Reception / The door | About + reception hours + door |
| Header CTA: Reception from five | First-party hours Mon–Sun 5.00pm–9.00pm; essence |
| Kicker: Hostel · Newcastle | Kind + town |
| H1: THE HUTT | They also say The Hutt; brief move, biggest type |
| Number: 30 Downs Road | Door |
| Say: Wake beside the sea. | Essence, spoken |
| Lede: A few hundred yards from the seafront. Only a 5-minute walk to the foot of the Mournes. Reception from five. | About (live 26 Aug 2026) + first-party hours. Mournes shortened from “glorious Mourne Mountains” |
| Primary: Reception from five | Move: reception ledger, not a packed booking box |
| Secondary: 028 4372 2133 | A bed tonight — the number |

No form. No calendar. No invented availability. Identity lives in the
masthead; booking lives at Reception — not crammed into one bottom
utility box.

## The register (magazine)

| Line | Source |
| --- | --- |
| 72 beds on Downs Road. | 72 beds (About) + door |
| 72 beds including ‘The Padd’ — a self-contained apartment with its own kitchen, shower room, toilet and lounge. | About, live 26 Aug 2026. Verbatim |
| The Padd · A self-contained apartment. | Same, card heading |
| Kitchen / Shower room / Toilet / Lounge | Same. No invented extra rooms |
| hutthostel.com | Their booking / site. `http://hutthostel.com` |
| Who we already host: Educational · Sports · Religious · Backpackers | Homepage group types. Quiet ledger, not a brochure grid |
| Pull: Friendly atmosphere and affordable accommodation situated a few hundred yards from the seafront and the sort of golden sandy beaches in 'sunny' Newcastle County Down and only a 5-minute walk to the foot of the glorious Mourne Mountains. | About, live 26 Aug 2026. Verbatim |

Do not invent rates, bunk names, or a facilities grid.

## Reception (ledger)

| Line | Source |
| --- | --- |
| The book at the desk. | Ritual name for the ledger. Not a first-party slogan |
| Mon–Sun 5.00pm–9.00pm | Reception hours, first-party on their site |
| Tonight, a group, or The Padd. Ring, write, or book on our site. Reception from five. | Staging: chips + real doors. Hours |
| Chip Tonight → tel:+442843722133 | A bed tonight — the number |
| Chip A group → mailto:info@hutthostel.com | Groups they already host; write |
| Chip The Padd → http://hutthostel.com | Their booking / site |
| 028 4372 2133 · info@hutthostel.com · hutthostel.com | Primary actions, all three, always visible |

No `<form>`. No date picker. No “available tonight”. No invented engine.

## The door / artefact

| Line | Source |
| --- | --- |
| 30 Downs Road. | Door |
| We're in the heart of the town so easy enough to find. Just beside the Slieve Donard Hotel and Percy French Bar. | Contact, brief. Verbatim |
| Corner of Donard Place. A few hundred yards from the seafront. 5-minute walk to the foot of the Mournes. | Place + About. Mournes shortened as on the first screen |
| Caption: The Padd on Downs Road. | Guest voice. Drawing disclosure in `bannerNote` only |
| Address: The Hutt Hostel, 30 Downs Road, Newcastle BT33 0AG, Corner of Donard Place, phone, email, hutthostel.com | Geography + doors |

## Plate caption

“The Padd on Downs Road.” Guest voice.
Disclosure that it is a drawing / concept visualisation belongs in
`bannerNote` only.
Do not write “not a photograph of…” in the caption.

## Refused (do not print on the guest page)

- `https://hutthostel.com` as if it works (HTTPS failed 23 Aug 2026).
- Google checkout “out by 12” — Google-only; omitted rather than dated
  on the door. Prefer their 5–9 reception line.
- Owner name. Steph as manager (Facebook snippet) unless labelled as
  manager from Facebook — omitted.
- Rates, live Google tariff, 4.7 / 81.
- Room names beyond The Padd. Invented bunks, dorms, or a floor plan
  with a bedroom we were not given.
- A booking engine of our own. Fake calendar. Invented availability.
- Children’s faces. Unlicensed photographs. EssenceMedia / rasters
  under `/media`.
- Plate questions (“Is this where I want to wake up?”). “This page
  does not…”. “Independently reviewed”. Studio chrome on the door.
- A hostel brand system we invented. Stock bunks as theatre.

## Tests

- Assert 30 Downs Road, BT33 0AG, 028 4372 2133, info@hutthostel.com.
- Assert `http://hutthostel.com` and no working `https://hutthostel.com`.
- Assert The Padd + 72 beds + kitchen / shower room / toilet / lounge.
- Assert reception Mon–Sun 5.00pm–9.00pm.
- Assert no `<form>`, no calendar, no rates.
- Assert no owner name, no Steph.
- Assert caption is guest voice; drawing disclosure only in bannerNote.
- Swap test: remove 30 Downs Road, The Padd, Donard and Percy French,
  72 beds; if any hostel could wear what remains, stop.

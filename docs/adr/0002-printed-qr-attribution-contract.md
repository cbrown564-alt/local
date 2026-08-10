# Printed QR attribution reaches the inbox, and gates the print run

A one-sheet's QR encodes `/transformations/<slug>/?source=onesheet-<slug>`, the
transformation page carries that `source` through to its request CTA alongside
the pre-filled business and town, and `source` is submitted as a real field and
printed in the notification email. Because a printed URL cannot be revised
after the run, **nothing goes to a printer until a production submission has
been verified arriving in the inbox carrying its source** — which inverts
PLAN.md's original M3 → M4 order and makes the request-form work a prerequisite
inside M3 rather than the milestone after it.

## Why this needed recording

The chain was broken in three independent places and each break was invisible
from the others: the artwork printed `?src=` while the form read `?source=`;
the transformation CTA was a bare `/request/` that dropped any parameter at the
hop; and `source` lived only in `form.dataset` feeding the analytics call, so it
never entered `FormData`, never reached `api/request.ts`, and never appeared in
the email. Fixing any one or two of them changes nothing observable.

## Considered options

Pointing the QR at `/request/` directly was rejected because it asks before it
proves, breaking the first design principle in PRODUCT.md. Pointing it at
`/concepts/<slug>/` was rejected because it bypasses the "Sources & limits"
block, which is what makes an unsolicited concept read as warm rather than
intrusive. Relying on Vercel Analytics alone was rejected because the inbox is
where the decision actually gets made.

## Consequences

- The `source` parameter is slug-qualified rather than inferred from the URL
  path, so a scan of one business's sheet that produces a request for a
  different business is still attributable to the sheet that caused it.
- `source` must be allow-listed and length-capped in `api/request.ts` like every
  other accepted field; it arrives from a query string and is attacker-supplied.

## Outcome update — 6 August 2026: the gate cleared

A production submission through the Hotel Enniskeen sheet's link reached the
watched inbox carrying `Came from: Printed one-sheet (Hotel Enniskeen)`,
verified by the project owner. The decision above is satisfied and no longer
blocks a print run.

The live check was made once, through one sheet, which is what this decision
asks for. What varies between sheets — the encoded destination, the printed
text, the claim hop, the built form's hidden field, the allow-list result and
the composed email line — is pinned for all four sheets by
`pnpm test:source-attribution`, rebuilt without a browser on 6 August. What
could not be proven any other way is that a real deployment reaches a real
inbox, and that now has a dated observation behind it.

Two cautions the cleared gate does not cover. Production submissions were
returning 500 earlier the same day, because Vercel compiled `api/request.ts`
but left a runtime import of `transformations.ts` that Node could not load; the
allow-list moved to `api/public-transformation-slugs.mjs` to fix it. And a
delivered email proves only the Gmail credentials — the shared rate-limit store
and the delivery-failure webhook both fail quietly when unconfigured, so
neither is evidenced by this result.

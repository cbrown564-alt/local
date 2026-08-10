/**
 * The printed-QR attribution chain, end to end, without a browser.
 *
 * docs/adr/0002 recorded four independent breaks in this chain, and the
 * browser suite that walked it (`test:source-attribution`) was deleted on
 * 4 August 2026 with the rest of the Puppeteer suites — the day after the
 * chain was built. PLAN.md section 3 still cites it as the evidence that a
 * scan reaches the inbox attributed. This is that evidence again, as static
 * checks plus a real invocation of the endpoint.
 *
 * What it cannot do is press the button. The live hop — scanning a printed
 * sheet and watching the source arrive in a real inbox — stays PLAN.md
 * section 3 item 6, and no check here is a substitute for it.
 *
 * Each assertion below is one of the ways this has already broken, or could:
 *
 *   1. a sheet for a slug that is not published — the QR scans to a 404;
 *   2. committed QR artwork encoding a destination the code no longer builds;
 *   3. a print page writing the URL by hand instead of deriving it;
 *   4. a source the transformation page's carry regex silently drops;
 *   5. a page or form that lost the element the hop depends on;
 *   6. a source the endpoint records as `unrecognised`;
 *   7. a source longer than the field that carries it.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import { createRequestHandler } from "../../api/request.ts";
import { oneSheets, oneSheetPath, oneSheetSource, oneSheetUrl } from "../../src/site/data/onesheets.ts";
import { publicTransformationSlugs } from "../../src/site/data/transformations.ts";

const root = path.resolve(import.meta.dirname, "..", "..");
const read = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const slugs = Object.keys(oneSheets) as (keyof typeof oneSheets)[];
assert.ok(slugs.length > 0, "no one-sheets are defined");

const publicSlugs = new Set<string>(publicTransformationSlugs);

// 1. A printed URL cannot be revised after the run.
for (const slug of slugs) {
  const sheet = oneSheets[slug];
  assert.equal(sheet.slug, slug, `one-sheet "${slug}" is keyed by a different slug than it carries`);
  assert.ok(publicSlugs.has(sheet.slug), `one-sheet "${slug}" is not a public transformation; its QR would scan to a 404`);
  assert.doesNotThrow(() => oneSheetUrl(sheet.slug));
}

// 2. The committed artwork must encode the destination the code builds today.
//    toFile writes an XML prolog that toString omits, so the SVG body is what
//    is compared; the encoder is otherwise deterministic for fixed options.
for (const slug of slugs) {
  const { qr } = oneSheets[slug];
  assert.ok(fs.existsSync(path.join(root, qr)), `${qr} is missing, so the sheet has no QR to print`);
  const committed = read(qr);
  const expected = await QRCode.toString(oneSheetUrl(slug).href, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 2,
    color: { dark: "#132029", light: "#ffffff" },
  });
  assert.equal(
    committed.slice(committed.indexOf("<svg")),
    expected,
    `${qr} does not encode ${oneSheetUrl(slug).href}. Re-run \`pnpm print:onesheet ${slug}\`.`,
  );
}

// 3. ADR-0002's first break was artwork printing ?src=onesheet while the form
//    read ?source=, possible because the URL was written out by hand twice.
for (const slug of slugs) {
  const route = oneSheets[slug].route.replace(/^\/|\/$/g, "");
  const page = `src/${route}.astro`;
  assert.ok(fs.existsSync(path.join(root, page)), `${page} does not exist, but ${slug}'s sheet names it`);
  const source = read(page);
  assert.match(source, /from "[^"]*onesheets(\.ts)?"/, `${page} does not derive its URL from src/site/data/onesheets.ts`);
  assert.doesNotMatch(
    source,
    /mournemade\.co\.uk\/transformations\//,
    `${page} writes the destination out by hand; it must come from oneSheetUrl()`,
  );
}

// 4. The carry regex is read from the page rather than restated here, so
//    tightening it in a way that drops a real sheet fails this check.
const transformationPage = read("src/pages/transformations/[slug].astro");
const carryPattern = /\/\^onesheet-\[[^/]+\]\{0,\d+\}\$\//.exec(transformationPage);
assert.ok(carryPattern, "the transformation page no longer carries an incoming ?source= across the claim hop");
const carry = new RegExp(carryPattern[0].slice(1, -1));
for (const slug of slugs) {
  assert.match(oneSheetSource(slug), carry, `the claim hop would drop ${oneSheetSource(slug)}`);
}

// 5. The elements each hop depends on, in the built pages rather than the
//    source, because a template that stops rendering them fails here.
const dist = (rel: string) => path.join(root, "dist", rel);
assert.ok(fs.existsSync(dist("request/index.html")), "dist/request/index.html is missing — run `pnpm build` first");
assert.match(
  read("dist/request/index.html"),
  /<input[^>]*type="hidden"[^>]*name="source"/,
  "the request form has no hidden source field, so nothing can be submitted",
);
for (const slug of slugs) {
  const page = `dist/transformations/${slug}/index.html`;
  assert.ok(fs.existsSync(path.join(root, page)), `${page} is missing, but a printed QR points at it`);
  assert.match(read(page), /data-claim-link/, `${page} lost its claim link, so the sheet's source has nothing to attach to`);
}

// 6. Every sheet's source must survive the endpoint's allow-list as itself.
//    test:request pins two slugs by hand; this one is driven by the sheets
//    that exist, so a new sheet cannot be added without being covered.
let invocations = 0;
const deliveredSource = async (source: string) => {
  invocations += 1;
  let text = "";
  let statusCode = 0;
  const request = {
    method: "POST",
    headers: {
      origin: "https://mournemade.co.uk",
      host: "mournemade.co.uk",
      "x-forwarded-for": `203.0.113.${invocations}`,
    },
    body: {
      business: "Test business",
      link: "https://example.com",
      idea: "Make booking clearer",
      name: "Test visitor",
      email: "visitor@example.com",
      source,
    },
  } as never;
  const response = {
    setHeader() {},
    status(code: number) { statusCode = code; return this; },
    json() { return this; },
  } as never;
  await createRequestHandler(async (mail) => {
    text = String(mail.text ?? "");
    return { messageId: "test-message" };
  })(request, response);
  assert.equal(statusCode, 200, `a submission carrying ${source} was not accepted`);
  return text.split("\n").find((line) => line.startsWith("Came from: "))?.slice("Came from: ".length);
};

const originalGmailUser = process.env.GMAIL_USER;
const originalGmailPassword = process.env.GMAIL_APP_PASSWORD;
const originalRecipient = process.env.REQUEST_TO_EMAIL;
process.env.GMAIL_USER = "sender@example.com";
process.env.GMAIL_APP_PASSWORD = "test-password";
process.env.REQUEST_TO_EMAIL = "recipient@example.com";

const titleCaseSlug = (value: string) =>
  value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

for (const slug of slugs) {
  const source = oneSheetSource(slug);
  const expected = `Printed one-sheet (${titleCaseSlug(slug)})`;
  assert.equal(
    await deliveredSource(source),
    expected,
    `${source} does not reach the inbox as ${expected}, so a scan of ${slug}'s sheet is unattributable`,
  );
}

if (originalGmailUser === undefined) delete process.env.GMAIL_USER;
else process.env.GMAIL_USER = originalGmailUser;
if (originalGmailPassword === undefined) delete process.env.GMAIL_APP_PASSWORD;
else process.env.GMAIL_APP_PASSWORD = originalGmailPassword;
if (originalRecipient === undefined) delete process.env.REQUEST_TO_EMAIL;
else process.env.REQUEST_TO_EMAIL = originalRecipient;

// 7. The field that carries the source has to be wide enough for it. A
//    truncated source is recorded as `unrecognised`, which reads as a stranger
//    typing the URL rather than as a sheet losing its attribution.
const maxSource = Number(/source:\s*(\d+)/.exec(read("api/request.ts"))?.[1]);
assert.ok(Number.isFinite(maxSource), "api/request.ts no longer declares a maximum source length");
for (const slug of slugs) {
  assert.ok(
    oneSheetSource(slug).length <= maxSource,
    `${oneSheetSource(slug)} is longer than the ${maxSource}-character source field`,
  );
  assert.ok(
    oneSheetPath(slug).startsWith(`/transformations/${slug}/?source=`),
    `${slug}'s printed path no longer matches the ADR-0002 contract`,
  );
}

console.log(`Source attribution: the printed-QR chain holds for ${slugs.length} one-sheets.`);
console.log(
  "The live scan-to-inbox hop is not checked here: it needs a deployment and an inbox. Verified once on 6 August 2026 through the Hotel Enniskeen sheet (docs/adr/0002).",
);

import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";

/**
 * Walks the printed-QR attribution chain end to end (docs/adr/0002).
 *
 * The chain broke in three independent places at once, and each break was
 * invisible from the others: the artwork printed `?src=` while the form read
 * `?source=`, the transformation CTA was a bare link that dropped the
 * parameter at the hop, and `source` lived only in `form.dataset` feeding the
 * analytics call, so it never entered `FormData`. Fixing any one or two of
 * them changes nothing observable — which is exactly why this walks the whole
 * path rather than unit-testing the hops.
 *
 * The endpoint's own handling of `source` is covered by test:request. What
 * only a browser can show is that the value survives both hops in between.
 */

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const claimHref = async (page, path) => {
  await page.goto(new URL(path, base).href, { waitUntil: "networkidle0" });
  return page.$eval("a[data-claim-link]", (link) => link.getAttribute("href"));
};

const submittedSource = async (page, path) => {
  await page.goto(new URL(path, base).href, { waitUntil: "networkidle0" });
  return page.evaluate(() => {
    const form = document.querySelector(".request-form");
    // Read it the way the submit handler does, not by reading the input:
    // the defect being pinned was a value that existed on the element but
    // never reached the request body.
    return String(new FormData(form).get("source") ?? "");
  });
};

try {
  const page = await browser.newPage();

  // Hop one: the sheet's QR lands on the transformation page, and the claim
  // CTA must carry the sheet forward rather than resetting to "transformation".
  const scanned = await claimHref(page, "/transformations/scopers/?source=onesheet-scopers");
  assert.match(scanned, /[?&]source=onesheet-scopers(&|$)/, "claim CTA dropped the sheet's source");
  assert.match(scanned, /[?&]business=/, "claim CTA lost the pre-filled business");

  // A visitor who arrived any other way is still attributable, just not to a
  // sheet. The default must survive an absent parameter.
  const direct = await claimHref(page, "/transformations/scopers/");
  assert.match(direct, /[?&]source=transformation(&|$)/, "unscanned visit lost its default source");

  // A source a stranger retyped must not be carried forward as though printed.
  const forged = await claimHref(page, "/transformations/scopers/?source=%3Cscript%3E");
  assert.match(forged, /[?&]source=transformation(&|$)/, "claim CTA carried an invalid source forward");

  // Hop two: the request form must submit it as a real field.
  assert.equal(
    await submittedSource(page, "/request/?business=Scopers&town=Dundrum&source=onesheet-scopers"),
    "onesheet-scopers",
    "source never entered the submitted form data",
  );
  assert.equal(
    await submittedSource(page, "/request/"),
    "direct",
    "a direct request submitted no source at all",
  );

  // A sheet whose scan ends in a request for a different business stays
  // attributable to the sheet that caused it, not to the page it landed on.
  const crossed = await claimHref(page, "/transformations/cupla/?source=onesheet-scopers");
  assert.match(crossed, /[?&]source=onesheet-scopers(&|$)/, "cross-business scan lost its causing sheet");

  console.log(
    "Source attribution passed: QR source survives the transformation hop, the claim CTA and the submitted form data.",
  );
} finally {
  await browser.close();
}

/**
 * The workbench routes that produce shipped artwork — share cards and printed
 * one-sheets — are injected dev-only routes (astro.config.mjs), so they can
 * only be captured from `pnpm dev`. Astro serves its development toolbar on
 * every dev page, fixed to the bottom centre of the viewport, and it was
 * screenshotted straight into `public/media/og/`: every committed share card
 * carried a development tool pill, including `studio.jpg`, the card that shows
 * when someone shares the site in a group chat.
 *
 * Removing it in the browser rather than switching the toolbar off in
 * `astro.config.mjs` keeps it available where it is useful — ordinary dev work
 * — and makes its absence a property of the capture rather than a setting
 * someone can turn back on without noticing what it costs.
 */

/** Astro's toolbar has changed element names between majors; match all of them. */
const SELECTORS = ["astro-dev-toolbar", "astro-dev-overlay", "#dev-toolbar-root"];

/**
 * Strip the dev toolbar from a page and prove it is gone. Call after the page
 * has settled and immediately before `screenshot()` or `pdf()`.
 *
 * @param {import("puppeteer-core").Page} page
 * @param {string} label Artefact name, so a failure says which capture broke.
 */
export async function removeDevToolbar(page, label) {
  const remaining = await page.evaluate((selectors) => {
    for (const selector of selectors) {
      for (const node of document.querySelectorAll(selector)) node.remove();
    }
    return selectors.reduce(
      (count, selector) => count + document.querySelectorAll(selector).length,
      0,
    );
  }, SELECTORS);

  if (remaining > 0) {
    throw new Error(
      `${label}: Astro's dev toolbar is still in the page after removal, and would be captured into shipped artwork.`,
    );
  }
}

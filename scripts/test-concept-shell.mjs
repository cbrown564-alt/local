import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const routes = [
  "/concepts/bucks-head/",
  "/concepts/castle-farm/",
  "/concepts/cupla/",
  "/concepts/donard-veterinary/",
  "/concepts/hotel-enniskeen/",
  "/concepts/kent-amusements/",
  "/concepts/mourne-cycles/",
  "/concepts/newcastle-chamber/",
  "/concepts/scopers/",
  "/concepts/tool-centre/",
];

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const results = [];

  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto(new URL(route, base).href, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });
    const styles = await page.evaluate(() => {
      const header = document.querySelector("body.concept-page > header");
      const nav = header?.querySelector("nav");
      const firstNavLink = nav?.querySelector("a");
      const strip = header?.previousElementSibling;
      const headerStyle = header ? getComputedStyle(header) : null;
      const navStyle = nav ? getComputedStyle(nav) : null;
      const underlineStyle = firstNavLink
        ? getComputedStyle(firstNavLink, "::after")
        : null;
      const stripStyle = strip && /-strip(?:\s|$)/.test(strip.className)
        ? getComputedStyle(strip)
        : null;

      return {
        headerDisplay: headerStyle?.display,
        headerAlignment: headerStyle?.alignItems,
        headerJustification: headerStyle?.justifyContent,
        navDisplay: navStyle?.display,
        navGap: navStyle?.gap,
        underlineHeight: underlineStyle?.height,
        underlineBackground: underlineStyle?.backgroundColor,
        stripDisplay: stripStyle?.display,
      };
    });

    if (
      styles.headerDisplay !== "flex"
      || styles.headerAlignment !== "center"
      || styles.headerJustification !== "space-between"
      || styles.navDisplay !== "flex"
    ) {
      throw new Error(`${route} did not receive the shared header/navigation layout: ${JSON.stringify(styles)}`);
    }
    if (styles.stripDisplay && styles.stripDisplay !== "flex") {
      throw new Error(`${route} did not receive the shared top-strip layout.`);
    }
    if (!styles.navGap || styles.navGap === "normal") {
      throw new Error(`${route} did not resolve its navigation gap token.`);
    }

    results.push({ route, ...styles });
    await page.close();
  }

  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}

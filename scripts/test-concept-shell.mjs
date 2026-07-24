import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const root = path.resolve(import.meta.dirname, "..");
const pagesRoot = path.join(root, "src", "pages", "concepts");
const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const viewports = [
  { name: "desktop", width: 1265, height: 710 },
  { name: "phone", width: 390, height: 844, isMobile: true, hasTouch: true },
];

function findAstroFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? findAstroFiles(absolute) : [absolute];
  }).filter((file) => file.endsWith(".astro"));
}

function routeForFile(file) {
  const relative = path.relative(pagesRoot, file).replaceAll("\\", "/");
  const withoutExtension = relative.replace(/\.astro$/, "");
  const routePath = withoutExtension.endsWith("/index")
    ? withoutExtension.slice(0, -"/index".length)
    : withoutExtension;
  return `/concepts/${routePath}/`.replaceAll("//", "/");
}

const sources = findAstroFiles(pagesRoot);
const allRoutes = sources.map(routeForFile).sort();
const routeFilter = process.argv[2];
const routes = routeFilter
  ? allRoutes.filter((route) => route.includes(routeFilter))
  : allRoutes;
const knownRoutes = new Set(allRoutes);
const sourceErrors = [];

if (!routes.length) throw new Error(`No concept routes matched "${routeFilter}".`);

for (const file of sources) {
  const source = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  const anchors = source.match(/<a\b[^>]*>/g) ?? [];

  for (const anchor of anchors) {
    const isHashPlaceholder = /\bhref\s*=\s*["']#["']/.test(anchor);
    const isDeclared = /\bdata-concept-placeholder(?:\s|=|>)/.test(anchor);
    if (isHashPlaceholder && !isDeclared) {
      sourceErrors.push(`${relative}: hash link must be a real URL or declare data-concept-placeholder`);
    }
    if (isDeclared && !isHashPlaceholder) {
      sourceErrors.push(`${relative}: data-concept-placeholder must be paired with href="#"`);
    }
  }
}

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const results = [];

try {
  for (const route of routes) {
    for (const viewport of viewports) {
      const page = await browser.newPage();
      const runtimeErrors = [];
      page.on("console", (message) => {
        if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
      });
      page.on("pageerror", (error) => runtimeErrors.push(`page: ${error.message}`));
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
        isMobile: viewport.isMobile ?? false,
        hasTouch: viewport.hasTouch ?? false,
      });

      const response = await page.goto(new URL(route, base).href, {
        waitUntil: "networkidle0",
        timeout: 60_000,
      });

      const facts = await page.evaluate(() => {
        const visible = (element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return rect.width > 1
            && rect.height > 1
            && style.display !== "none"
            && style.visibility !== "hidden";
        };
        const describe = (element) => {
          const label = element.getAttribute("aria-label")
            || element.textContent?.replace(/\s+/g, " ").trim()
            || element.className;
          return String(label).slice(0, 80);
        };
        const documentWidth = Math.max(
          document.documentElement.scrollWidth,
          document.body?.scrollWidth ?? 0,
        );
        const layoutWidth = document.documentElement.clientWidth;
        const clippedHeaderControls = [
          ...document.querySelectorAll("header a, header button"),
        ].filter(visible).filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.left < -1 || rect.right > layoutWidth + 1;
        }).map(describe);
        const placeholders = [...document.querySelectorAll("a[data-concept-placeholder]")];
        const invalidPlaceholders = placeholders.filter((element) => (
          element.hasAttribute("href")
          || element.getAttribute("aria-disabled") !== "true"
          || !element.classList.contains("concept-link-inert")
        )).map(describe);
        const brandLinks = [...document.querySelectorAll(
          'a[class*="brand"], a[class*="logo"], a[class*="wordmark"]',
        )].filter(visible).map((element) => ({
          label: describe(element),
          path: new URL(element.href, location.href).pathname,
          inert: element.getAttribute("aria-disabled") === "true"
            || getComputedStyle(element).textDecorationLine.includes("line-through"),
        }));
        const internalConceptLinks = [...document.querySelectorAll('a[href^="/concepts/"]')]
          .map((element) => new URL(element.href, location.href).pathname);
        const unsafeForms = [...document.querySelectorAll("form")].flatMap((form) => {
          const problems = [];
          if (form.action.startsWith("mailto:")) {
            problems.push("native mailto form can discard named fields");
          }
          if (/return\s+false/.test(form.getAttribute("onsubmit") ?? "")) {
            problems.push("form suppresses submit without an explicit handoff");
          }
          return problems.map((problem) => `${describe(form)}: ${problem}`);
        });
        const directHeader = document.querySelector("body.concept-page > header");
        const directNav = directHeader?.querySelector("nav");
        const overflowElements = [...document.body.querySelectorAll("*")]
          .filter(visible)
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              label: describe(element),
              tag: element.tagName.toLowerCase(),
              className: typeof element.className === "string" ? element.className : "",
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              clientWidth: element.clientWidth,
              scrollWidth: element.scrollWidth,
            };
          })
          .filter((element) => (
            element.left < -1
            || element.right > layoutWidth + 1
            || element.scrollWidth > element.clientWidth + 1
          ))
          .sort((a, b) => (
            Math.max(b.right - layoutWidth, b.scrollWidth - b.clientWidth)
            - Math.max(a.right - layoutWidth, a.scrollWidth - a.clientWidth)
          ))
          .slice(0, 5);

        return {
          title: document.title,
          documentWidth,
          viewportWidth: innerWidth,
          htmlWidth: `${document.documentElement.clientWidth}/${document.documentElement.scrollWidth}`,
          bodyWidth: `${document.body.clientWidth}/${document.body.scrollWidth}`,
          clippedHeaderControls,
          placeholderCount: placeholders.length,
          invalidPlaceholders,
          brandLinks,
          internalConceptLinks,
          unsafeForms,
          directHeaderDisplay: directHeader ? getComputedStyle(directHeader).display : null,
          directNavDisplay: directNav && visible(directNav) ? getComputedStyle(directNav).display : null,
          overflowElements,
        };
      });

      const slug = route.split("/")[2];
      const expectedHome = `/concepts/${slug}/`;
      const failures = [...runtimeErrors];

      if (!response || response.status() >= 400) failures.push(`HTTP ${response?.status() ?? "no response"}`);
      if (facts.documentWidth > viewport.width + 1) {
        const offenders = facts.overflowElements
          .map((element) => (
            `${element.tag}.${element.className || "(no class)"} `
            + `[rect ${element.left}–${element.right}; content ${element.clientWidth}/${element.scrollWidth}]`
          ))
          .join(", ");
        failures.push(
          `horizontal overflow: ${facts.documentWidth}px document at ${viewport.width}px`
          + ` (viewport ${facts.viewportWidth}; html ${facts.htmlWidth}; body ${facts.bodyWidth})`
          + (offenders ? `; widest: ${offenders}` : ""),
        );
      }
      if (facts.clippedHeaderControls.length) {
        failures.push(`clipped header controls: ${facts.clippedHeaderControls.join(", ")}`);
      }
      if (facts.invalidPlaceholders.length) {
        failures.push(`placeholder setup failed: ${facts.invalidPlaceholders.join(", ")}`);
      }
      for (const brand of facts.brandLinks) {
        if (brand.path !== expectedHome) {
          failures.push(`brand "${brand.label}" points to ${brand.path}, expected ${expectedHome}`);
        }
        if (brand.inert) failures.push(`brand "${brand.label}" is rendered inert`);
      }
      for (const internalPath of facts.internalConceptLinks) {
        if (!knownRoutes.has(internalPath)) failures.push(`internal concept link has no route: ${internalPath}`);
      }
      for (const unsafeForm of facts.unsafeForms) failures.push(unsafeForm);
      if (viewport.name === "desktop" && facts.directHeaderDisplay && facts.directHeaderDisplay !== "flex") {
        failures.push(`direct concept header uses display:${facts.directHeaderDisplay}, expected flex`);
      }
      if (viewport.name === "desktop" && facts.directNavDisplay && facts.directNavDisplay !== "flex") {
        failures.push(`visible direct navigation uses display:${facts.directNavDisplay}, expected flex`);
      }

      results.push({
        route,
        viewport: viewport.name,
        placeholderCount: facts.placeholderCount,
        failures,
      });
      await page.close();
    }
  }
} finally {
  await browser.close();
}

const failed = results.filter((result) => result.failures.length);
console.log(
  `Concept audit: ${routes.length} routes × ${viewports.length} viewports; `
  + `${results.length - failed.length} passed, ${failed.length} failed; `
  + `${results.reduce((sum, result) => sum + result.placeholderCount, 0) / viewports.length} declared placeholders.`,
);

for (const result of failed) {
  console.error(`\n${result.route} · ${result.viewport}`);
  for (const failure of result.failures) console.error(`  - ${failure}`);
}
for (const error of sourceErrors) console.error(`\nsource\n  - ${error}`);

if (failed.length || sourceErrors.length) process.exitCode = 1;

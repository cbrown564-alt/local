import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { findChrome } from "./lib/chrome.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const phone = { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true };
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const results = [];

async function withPage(path, callback) {
  const page = await browser.newPage();
  const runtimeErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(message.text());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.setViewport(phone);
  const response = await page.goto(new URL(path, base).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  assert.ok(response && response.status() < 400, `${path} returned ${response?.status()}`);
  try {
    await callback(page);
    assert.deepEqual(runtimeErrors, [], `${path} logged browser errors`);
  } finally {
    await page.close();
  }
}

async function check(name, callback) {
  try {
    await callback();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, error: error.stack ?? error.message });
  }
}

await check("Newcastle Chamber search changes the directory result", async () => {
  await withPage("/concepts/newcastle-chamber/", async (page) => {
    await page.type("#nc-q", "pharmacy");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click(".nc-search button"),
    ]);
    assert.equal(new URL(page.url()).searchParams.get("q"), "pharmacy");
    const result = await page.evaluate(() => ({
      visibleNames: [...document.querySelectorAll("[data-nc-member]:not([hidden]) .nc-dir-card-name")]
        .map((element) => element.textContent?.trim()),
      status: document.querySelector("[data-nc-search-status]")?.textContent?.trim(),
      disclosure: document.querySelector(".nc-dir-intro")?.textContent?.replace(/\s+/g, " ").trim(),
    }));
    assert.deepEqual(result.visibleNames, ["Newcastle Pharmacy"]);
    assert.match(result.status ?? "", /^1 illustrative listing/);
    assert.match(result.disclosure ?? "", /does not identify verified Chamber members/);
  });

  await withPage("/concepts/newcastle-chamber/members/?q=no-such-trade", async (page) => {
    const result = await page.evaluate(() => ({
      visibleCount: document.querySelectorAll("[data-nc-member]:not([hidden])").length,
      emptyHidden: document.querySelector("[data-nc-empty]")?.hasAttribute("hidden"),
    }));
    assert.equal(result.visibleCount, 0);
    assert.equal(result.emptyHidden, false);
  });
});

await check("Donard appointment details survive into an explicit email handoff", async () => {
  await withPage("/concepts/donard-veterinary/appointments/", async (page) => {
    const pageText = await page.$eval("body", (body) => body.innerText);
    assert.match(pageText, /PetsApp/);
    assert.doesNotMatch(pageText, /VidiVet/);
    assert.equal(await page.$$("form[action^='mailto:']").then((forms) => forms.length), 0);

    await page.type("[data-dv-request] input[name=name]", "Review Test");
    await page.select("[data-dv-request] select[name=pet]", "Cat");
    await page.select("[data-dv-request] select[name=day]", "Wednesday");
    await page.type("[data-dv-request] input[name=phone]", "028 0000 0000");
    await page.click("[data-dv-request] button[type=submit]");
    await page.waitForSelector("[data-dv-handoff]:not([hidden])");
    const href = await page.$eval("[data-dv-email-link]", (link) => link.getAttribute("href"));
    const decoded = decodeURIComponent((href ?? "").replaceAll("+", " "));
    assert.match(decoded, /^mailto:info@donardveterinaryclinic\.co\.uk\?/);
    assert.match(decoded, /Review Test/);
    assert.match(decoded, /Pet: Cat/);
    assert.match(decoded, /Preferred day: Wednesday/);
    assert.match(decoded, /Phone: 028 0000 0000/);
  });
});

await check("Cúpla uses sterling and labels sample prices before the menu", async () => {
  await withPage("/concepts/cupla/menu/", async (page) => {
    const result = await page.evaluate(() => {
      const note = document.querySelector(".cp-menu-provisional");
      const firstPrice = document.querySelector(".cp-menu-item-price");
      return {
        text: document.body.innerText,
        note: note?.textContent?.replace(/\s+/g, " ").trim(),
        noteTop: note?.getBoundingClientRect().top,
        firstPriceTop: firstPrice?.getBoundingClientRect().top,
        prices: [...document.querySelectorAll(".cp-menu-item-price")]
          .map((element) => element.textContent?.trim()),
      };
    });
    assert.doesNotMatch(result.text, /€/);
    assert.ok(result.prices.length >= 10);
    assert.ok(result.prices.every((price) => price === "—" || price?.startsWith("£")));
    assert.match(result.note ?? "", /Illustrative sample menu and sterling prices/);
    assert.ok((result.noteTop ?? Infinity) < (result.firstPriceTop ?? -Infinity));
  });
});

await check("Mourne Cycles labels provisional offers before prices and imagery", async () => {
  await withPage("/concepts/mourne-cycles/hire/", async (page) => {
    const result = await page.evaluate(() => {
      const firstNotice = document.querySelector(".mc-provisional");
      const firstPrice = document.querySelector(".mc-tier-price");
      return {
        text: document.body.innerText,
        notices: [...document.querySelectorAll(".mc-provisional")]
          .map((element) => element.textContent?.replace(/\s+/g, " ").trim()),
        noticeTop: firstNotice?.getBoundingClientRect().top,
        priceTop: firstPrice?.getBoundingClientRect().top,
      };
    });
    assert.equal(result.notices.length, 2);
    assert.match(result.notices[0] ?? "", /not verified current stock or rates/);
    assert.ok((result.noticeTop ?? Infinity) < (result.priceTop ?? -Infinity));
    assert.doesNotMatch(result.text, /Green Commute Initiative|2–5 working days/);
  });

  await withPage("/concepts/mourne-cycles/", async (page) => {
    const evidence = await page.$eval(".mc-visual", (element) => ({
      caption: element.querySelector("figcaption")?.textContent?.replace(/\s+/g, " ").trim(),
      src: element.querySelector("img")?.getAttribute("src"),
      alt: element.querySelector("img")?.getAttribute("alt"),
    }));
    assert.match(evidence.caption ?? "", /AI-generated visualisation, faithfully based/);
    assert.match(evidence.caption ?? "", /does not claim current shop stock/);
    assert.match(evidence.src ?? "", /mourne-cycles-faithful-visualisation\.jpg$/);
    assert.match(evidence.alt ?? "", /Trek full-suspension mountain bike/);
  });
});

await check("Kent identifies its documentary exterior and keeps the phone action visible", async () => {
  await withPage("/concepts/kent-amusements/", async (page) => {
    const result = await page.evaluate(() => {
      const call = document.querySelector(".ka-call");
      const rect = call?.getBoundingClientRect();
      const visual = document.querySelector(".ka-panel");
      return {
        caption: visual?.querySelector("figcaption")?.textContent?.replace(/\s+/g, " ").trim(),
        src: visual?.querySelector("img")?.getAttribute("src"),
        alt: visual?.querySelector("img")?.getAttribute("alt"),
        callVisible: Boolean(rect && rect.left >= 0 && rect.right <= document.documentElement.clientWidth),
      };
    });
    assert.match(result.caption ?? "", /Eric Jones, 2023 · CC BY-SA 2\.0/);
    assert.match(result.src ?? "", /kent-amusements-exterior-2023\.jpg$/);
    assert.match(result.alt ?? "", /Kent Amusements' long red and cream frontage/);
    assert.equal(result.callVisible, true);
  });
});

await check("Five repaired concepts load responsive subject-proof images", async () => {
  const subjects = [
    {
      path: "/concepts/mourne-cycles/",
      selector: ".mc-visual",
      caption: /AI-generated visualisation, faithfully based/,
    },
    {
      path: "/concepts/newcastle-chamber/",
      selector: ".nc-panel",
      caption: /Eric Jones, 2012 · CC BY-SA 2\.0/,
    },
    {
      path: "/concepts/kent-amusements/",
      selector: ".ka-panel",
      caption: /Eric Jones, 2023 · CC BY-SA 2\.0/,
    },
    {
      path: "/concepts/donard-veterinary/",
      selector: ".dv-panel",
      caption: /Eric Jones, 2023 · CC BY-SA 2\.0/,
    },
    {
      path: "/concepts/cupla/",
      selector: ".cp-panel",
      caption: /AI-generated visualisation, faithfully based/,
    },
  ];

  for (const subject of subjects) {
    await withPage(subject.path, async (page) => {
      const evidence = await page.$eval(subject.selector, (element) => {
        const image = element.querySelector("img");
        return {
          complete: image?.complete,
          naturalWidth: image?.naturalWidth,
          currentSrc: image?.currentSrc,
          caption: element.querySelector("figcaption")?.textContent?.replace(/\s+/g, " ").trim(),
        };
      });
      assert.equal(evidence.complete, true);
      assert.ok((evidence.naturalWidth ?? 0) > 0);
      assert.match(evidence.currentSrc ?? "", /-640\.webp$/);
      assert.match(evidence.caption ?? "", subject.caption);
    });
  }
});

await check("Declared prototype availability shows a recovery-safe handoff", async () => {
  await withPage("/concepts/donard-hotel/", async (page) => {
    await page.click("[data-dh-availability] button[type=submit]");
    const status = await page.$eval(
      "[data-dh-availability-status]:not([hidden])",
      (element) => element.textContent?.replace(/\s+/g, " ").trim(),
    );
    assert.match(status ?? "", /no live availability was checked/);
  });
});

await browser.close();

const failed = results.filter((result) => !result.passed);
console.log(`Reviewed-concept journeys: ${results.length - failed.length}/${results.length} passed.`);
for (const result of failed) {
  console.error(`\n${result.name}\n${result.error}`);
}
if (failed.length) process.exitCode = 1;

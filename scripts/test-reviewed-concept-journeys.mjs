import assert from "node:assert/strict";
import fs from "node:fs";
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
    await page.type("#nc-q", "vet");
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle0" }),
      page.click(".nc-search button"),
    ]);
    assert.equal(new URL(page.url()).searchParams.get("q"), "vet");
    const result = await page.evaluate(() => ({
      visibleNames: [...document.querySelectorAll("[data-nc-member]:not([hidden]) .nc-dir-card-name")]
        .map((element) => element.textContent?.trim()),
      status: document.querySelector("[data-nc-search-status]")?.textContent?.trim(),
      disclosure: document.querySelector(".nc-dir-intro")?.textContent?.replace(/\s+/g, " ").trim(),
    }));
    assert.deepEqual(result.visibleNames, ["Donard Veterinary Clinic"]);
    assert.match(result.status ?? "", /^1 listing for/);
    assert.match(result.status ?? "", /not verified members/);
    assert.match(result.disclosure ?? "", /has\s+not confirmed any of them as members/);
  });

  await withPage("/concepts/newcastle-chamber/members/?q=no-such-trade", async (page) => {
    const result = await page.evaluate(() => ({
      visibleCount: document.querySelectorAll("[data-nc-member]:not([hidden])").length,
      emptyHidden: document.querySelector("[data-nc-empty]")?.hasAttribute("hidden"),
      canRetry: Boolean(document.querySelector("[data-nc-search-input]")),
    }));
    assert.equal(result.visibleCount, 0);
    assert.equal(result.emptyHidden, false);
    // The empty state must offer a way back: the first review found no search
    // input on the directory, so a failed query was a dead end.
    assert.equal(result.canRetry, true);
  });
});

// Every directory name must be a real business with a dated record, and the
// membership disclaimer must survive a deep link into a single category. The
// 25 July 2026 re-review failed the claims gate because the list mixed real
// trading names with invented ones under one word, "illustrative".
await check("Newcastle Chamber directory names are sourced and disclaimed per category", async () => {
  const verifications = JSON.parse(
    fs.readFileSync(new URL("../research/verifications.json", import.meta.url), "utf8"),
  );
  const simplify = (value) => value
    .toLocaleLowerCase("en-GB")
    .replace(/&/g, "and")
    .replace(/[^a-z]/g, "");
  // A record's `name` is the census join key; a corrected trading name lives
  // in `corrections.name` (Donard Veterinary Centre -> Clinic), so both count.
  const verifiedNames = verifications.records.flatMap((record) =>
    [record.name, record.corrections?.name].filter(Boolean).map(simplify));
  await withPage("/concepts/newcastle-chamber/members/", async (page) => {
    const names = await page.$$eval(".nc-dir-card-name", (nodes) =>
      nodes.map((node) => node.textContent.trim()));
    assert.ok(names.length >= 10, `directory rendered only ${names.length} listings`);
    for (const name of names) {
      const key = simplify(name);
      assert.ok(
        verifiedNames.some((verified) => verified.includes(key) || key.includes(verified)),
        `${name} has no record in research/verifications.json`,
      );
    }
  });

  await withPage("/concepts/newcastle-chamber/members/?cat=hospitality", async (page) => {
    const result = await page.evaluate(() => {
      const visibleSections = [...document.querySelectorAll("[data-nc-category]")]
        .filter((section) => !section.hidden);
      return {
        sections: visibleSections.map((section) => section.dataset.ncCategory),
        everySectionDisclaimed: visibleSections.every((section) =>
          /not a verified membership list/.test(section.querySelector(".nc-dir-cat-note")?.textContent ?? "")),
        activeTab: document.querySelector(".nc-dir-tab--active")?.dataset.ncTab,
      };
    });
    assert.deepEqual(result.sections, ["hospitality"]);
    assert.equal(result.everySectionDisclaimed, true);
    // "All" must not keep its active styling while a filter is on.
    assert.equal(result.activeTab, "hospitality");
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

// ── Defect classes the 25 July 2026 re-review measured for the first time ──
// Each of these failed on at least one concept while passing every earlier
// check, because the earlier reviews asserted them by eye rather than by
// measurement. They are cheap to run and they generalise, so they sweep the
// five reopened concepts rather than testing one route each.

const REOPENED = [
  { slug: "mourne-cycles", routes: ["/concepts/mourne-cycles/", "/concepts/mourne-cycles/hire/"] },
  { slug: "newcastle-chamber", routes: ["/concepts/newcastle-chamber/", "/concepts/newcastle-chamber/members/", "/concepts/newcastle-chamber/contact/"] },
  { slug: "kent-amusements", routes: ["/concepts/kent-amusements/", "/concepts/kent-amusements/attractions/"] },
  { slug: "donard-veterinary", routes: ["/concepts/donard-veterinary/", "/concepts/donard-veterinary/appointments/"] },
  { slug: "cupla", routes: ["/concepts/cupla/", "/concepts/cupla/menu/"] },
];

const CONTRAST_PROBE = `(() => {
  const parse = (value) => {
    const n = (value.match(/[\\d.]+/g) || []).map(Number);
    return n.length >= 4 ? n.slice(0, 4) : [n[0] || 0, n[1] || 0, n[2] || 0, 1];
  };
  const over = (fg, bg) => fg[3] >= 1 ? fg.slice(0, 3) : [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3]));
  const lum = (rgb) => { const [r, g, b] = rgb.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
  const bgOf = (el) => {
    let node = el; const stack = [];
    while (node) {
      const c = parse(getComputedStyle(node).backgroundColor);
      if (c[3] > 0) { stack.push(c); if (c[3] >= 1) break; }
      node = node.parentElement;
    }
    let out = [255, 255, 255];
    for (const c of stack.reverse()) out = over(c, out);
    return out;
  };
  const failures = [];
  for (const el of document.querySelectorAll("body *")) {
    if (el.closest(".mm-concept-banner")) continue;
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(" ").trim();
    if (!text) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.opacity === "0") continue;
    const size = parseFloat(cs.fontSize);
    const need = (size >= 24 || (size >= 18.66 && (Number(cs.fontWeight) || 400) >= 700)) ? 3 : 4.5;
    const bg = bgOf(el);
    const [hi, lo] = [lum(over(parse(cs.color), bg)), lum(bg)].sort((a, b) => b - a);
    const ratio = (hi + 0.05) / (lo + 0.05);
    if (ratio + 0.005 < need) failures.push(text.slice(0, 40) + " @ " + ratio.toFixed(2) + ":1 (needs " + need + ")");
  }
  return failures;
})()`;

await check("Reopened concepts meet 4.5:1 body and control contrast", async () => {
  for (const { routes } of REOPENED) {
    for (const route of routes) {
      await withPage(route, async (page) => {
        const failures = await page.evaluate(CONTRAST_PROBE);
        assert.deepEqual(failures, [], `${route} has sub-threshold text: ${failures.join(" | ")}`);
      });
    }
  }
});

// The fixed studio disclosure used to sit over the bottom rail of four
// concepts at 1265x710, on documents 1-2px taller than the viewport, so the
// controls beneath it could not be reached by scrolling either. A fixed footer
// overlapping content at scroll top is ordinary; a control that NO scroll
// position can reach is the defect, so that is what this asserts.
await check("No control is permanently trapped under the disclosure banner", async () => {
  for (const { routes } of REOPENED) {
    for (const route of routes) {
      const page = await browser.newPage();
      try {
        const client = await page.createCDPSession();
        await client.send("Emulation.setDeviceMetricsOverride", {
          width: 1265, height: 710, deviceScaleFactor: 1, mobile: false,
          screenWidth: 1265, screenHeight: 710,
        });
        await page.goto(new URL(route, base).href, { waitUntil: "networkidle0", timeout: 60_000 });
        const width = await page.evaluate(() => document.documentElement.clientWidth);
        assert.equal(width, 1265, `${route} did not lay out at 1265px`);
        const probe = () => {
          const out = [];
          for (const el of document.querySelectorAll("main a[href], main button, main input, main select")) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            const cy = r.y + r.height / 2;
            if (cy < 0 || cy > window.innerHeight) continue;
            const top = document.elementFromPoint(r.x + r.width / 2, cy);
            if (top && top.tagName.toLowerCase() === "astro-dev-toolbar") continue;
            const label = (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 40);
            out.push({ label, covered: Boolean(top?.closest(".mm-concept-banner")) });
          }
          return out;
        };

        // Reachable = the control is clickable at some scroll position.
        const trapped = await page.evaluate((probeSource) => {
          const run = new Function("return " + probeSource)();
          const reachable = new Set();
          const seen = new Set();
          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          for (const y of [0, Math.round(maxScroll / 2), maxScroll]) {
            // `behavior: "instant"` matters: these pages set
            // `scroll-behavior: smooth`, which makes a plain scrollTo animate,
            // so an immediate probe would measure the old position and report
            // reachable controls as trapped.
            window.scrollTo({ top: y, behavior: "instant" });
            for (const entry of run()) {
              seen.add(entry.label);
              if (!entry.covered) reachable.add(entry.label);
            }
          }
          window.scrollTo({ top: 0, behavior: "instant" });
          return [...seen].filter((label) => !reachable.has(label));
        }, probe.toString());
        assert.deepEqual(trapped, [], `${route}: ${trapped.join(", ")} cannot be reached at any scroll position`);
      } finally {
        await page.close();
      }
    }
  }
});

// Hiding the navigation below 940px with no replacement left Cúpla's menu and
// three Chamber routes reachable from nowhere on a phone.
await check("Every companion route is reachable on a phone", async () => {
  const expectations = [
    { from: "/concepts/cupla/", must: "/concepts/cupla/menu/" },
    { from: "/concepts/newcastle-chamber/", must: "/concepts/newcastle-chamber/about/" },
    { from: "/concepts/newcastle-chamber/", must: "/concepts/newcastle-chamber/contact/" },
    { from: "/concepts/newcastle-chamber/", must: "/concepts/newcastle-chamber/events/" },
    { from: "/concepts/donard-veterinary/", must: "/concepts/donard-veterinary/appointments/" },
    { from: "/concepts/kent-amusements/", must: "/concepts/kent-amusements/attractions/" },
    { from: "/concepts/mourne-cycles/", must: "/concepts/mourne-cycles/hire/" },
  ];
  for (const { from, must } of expectations) {
    await withPage(from, async (page) => {
      const reachable = await page.evaluate((target) =>
        [...document.querySelectorAll("a[href]")].some((anchor) => {
          if (new URL(anchor.href, location.href).pathname !== target) return false;
          const r = anchor.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && getComputedStyle(anchor).visibility !== "hidden";
        }), must);
      assert.ok(reachable, `${must} is not reachable from ${from} at 390x844`);
    });
  }
});

// Generated hero imagery must carry its disclosure inside the phone fold: the
// gate is about what the visitor is told, not what the markup contains.
await check("Generated-image disclosures sit inside the phone first viewport", async () => {
  for (const route of ["/concepts/mourne-cycles/", "/concepts/cupla/"]) {
    await withPage(route, async (page) => {
      const caption = await page.evaluate(() => {
        const figure = document.querySelector("main figure figcaption");
        if (!figure) return null;
        const r = figure.getBoundingClientRect();
        return { bottom: r.bottom, viewport: window.innerHeight, text: figure.textContent.replace(/\s+/g, " ").trim() };
      });
      assert.ok(caption, `${route} has no hero caption`);
      assert.match(caption.text, /AI-generated|visualisation/i);
      assert.ok(
        caption.bottom <= caption.viewport,
        `${route}: disclosure ends ${Math.round(caption.bottom - caption.viewport)}px below the fold`,
      );
    });
  }
});

// Kent's attractions page placed story and panel in the same grid cell at
// 390px — a 100% overlap that painted content on top of content.
await check("Stacked phone layouts do not overlap", async () => {
  await withPage("/concepts/kent-amusements/attractions/", async (page) => {
    const overlap = await page.evaluate(() => {
      const a = document.querySelector(".ka-atx-story")?.getBoundingClientRect();
      const b = document.querySelector(".ka-atx-panel")?.getBoundingClientRect();
      if (!a || !b) return null;
      const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return Math.round(x * y);
    });
    assert.equal(overlap, 0, `attractions story and panel overlap by ${overlap}px²`);
  });
});

// A prepared email draft must never outlive the values it was built from.
await check("Editing a prepared appointment withdraws the stale draft", async () => {
  await withPage("/concepts/donard-veterinary/appointments/", async (page) => {
    await page.type("[data-dv-request] input[name=name]", "First Name");
    await page.type("[data-dv-request] input[name=phone]", "028 0000 0000");
    await page.click("[data-dv-request] button[type=submit]");
    await page.waitForSelector("[data-dv-handoff]:not([hidden])");

    await page.type("[data-dv-request] input[name=name]", " Corrected");
    await page.waitForSelector("[data-dv-stale]:not([hidden])");
    const handoffHidden = await page.$eval("[data-dv-handoff]", (el) => el.hasAttribute("hidden"));
    assert.equal(handoffHidden, true, "the superseded draft link is still offered");

    // An invalid phone number must be refused rather than carried into the email.
    await page.$eval("[data-dv-request] input[name=phone]", (input) => { input.value = "not-a-phone!!!"; });
    const valid = await page.$eval("[data-dv-request] input[name=phone]", (input) => input.checkValidity());
    assert.equal(valid, false, "a non-numeric phone number passes validation");
  });
});

await browser.close();

const failed = results.filter((result) => !result.passed);
console.log(`Reviewed-concept journeys: ${results.length - failed.length}/${results.length} passed.`);
for (const result of failed) {
  console.error(`\n${result.name}\n${result.error}`);
}
if (failed.length) process.exitCode = 1;

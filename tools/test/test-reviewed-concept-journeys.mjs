import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { findChrome } from "../lib/chrome.mjs";
import { projectRoot, readPublicTransformationSlugs } from "../lib/public-slugs.mjs";
import { lookupProvenance, readImageProvenance } from "../lib/image-provenance.mjs";

const base = process.env.SHOT_BASE ?? "http://127.0.0.1:4321";
const phone = { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true };
const publicSlugs = readPublicTransformationSlugs();
const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const results = [];

// Seven concepts open with a `*-rise` entrance animation that fades opacity
// from 0 and translates by ~14px. `networkidle0` resolves while those are
// still running, so every probe that reads colour or geometry measured a
// half-faded, half-moved page and reported different failures on different
// runs — on 28 July 2026 the contrast probe caught Donard Veterinary's
// emergency card at 0.586 opacity and failed two texts that measure 4.60:1
// and 4.99:1 once settled. Wait for finite animations before any check reads
// the page. Infinite animations never finish, so they are excluded, and the
// wait is bounded so a paused or pathological animation cannot hang the suite.
async function settleAnimations(page) {
  await page.evaluate(async () => {
    const finite = document
      .getAnimations()
      .filter((animation) => Number.isFinite(animation.effect?.getComputedTiming?.().endTime))
      .map((animation) => animation.finished.catch(() => {}));
    await Promise.race([
      Promise.all(finite),
      new Promise((resolve) => setTimeout(resolve, 3_000)),
    ]);
  });
}

async function withPage(path, callback) {
  const page = await browser.newPage();
  const runtimeErrors = [];
  page.on("response", (response) => {
    if (response.status() < 400) return;
    // Vercel Web Analytics is production-only; local preview 404s are expected.
    if (/\/_vercel\//i.test(response.url())) return;
    runtimeErrors.push(`HTTP ${response.status()} ${response.url()}`);
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    const text = message.text();
    // Resource failures are recorded from the response listener with URLs.
    if (/Failed to load resource/i.test(text)) return;
    runtimeErrors.push(text);
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.setViewport(phone);
  const response = await page.goto(new URL(path, base).href, {
    waitUntil: "networkidle0",
    timeout: 60_000,
  });
  assert.ok(response && response.status() < 400, `${path} returned ${response?.status()}`);
  await settleAnimations(page);
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
    assert.match(result.disclosure ?? "", /has\s+not confirmed them as members/);
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
    fs.readFileSync(new URL("../research/pipeline/verifications.json", import.meta.url), "utf8"),
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
        `${name} has no record in research/pipeline/verifications.json`,
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
    assert.match(pageText, /VidiVet/);
    assert.doesNotMatch(pageText, /PetsApp/);
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

await check("Donard elevation surfaces sourced care content on the home page", async () => {
  await withPage("/concepts/donard-veterinary/", async (page) => {
    const pageText = await page.$eval("body", (body) => body.innerText);
    assert.match(pageText, /illustrated pets/i);
    assert.match(pageText, /As pet owners ourselves we fully understand/);
    assert.match(pageText, /diverted to the on-call vet/);
    assert.match(pageText, /Castlewellan/);
    assert.match(pageText, /Opened 2017/);
    assert.doesNotMatch(pageText, /Sunday/);

    // The drawn cast anchors the hero, disclosed as studio drawings.
    assert.equal(await page.$$eval(".dv-story .dv-cast-art", (nodes) => nodes.length), 3);
    assert.match(pageText, /studio drawings, not photographs of patients/);
    // The safety net is a mechanism: three routing-tagged connectors.
    assert.equal(await page.$$eval(".dv-net-conn", (nodes) => nodes.length), 3);
    assert.match(pageText, /Outside clinic hours/);
    assert.match(pageText, /Free for clients · 24\/7/);
    // The life arc ends quietly on the practice's bereavement page.
    assert.ok(await page.$(".dv-life-arc"));
    assert.ok(await page.$(".dv-life-card--quiet a[href*='say-goodbye']"));
    // The catchment map is a drawn plate with real geography marks.
    assert.match(pageText, /Slieve Donard/);
    assert.match(pageText, /indicative, not a survey/);
    // The independence timeline keeps only documented beats.
    assert.doesNotMatch(pageText, /Nine years of independence/);
    assert.match(pageText, /Donard Vet Club/);
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
    assert.match(result.note ?? "", /Sample menu/);
    assert.ok((result.noteTop ?? Infinity) < (result.firstPriceTop ?? -Infinity));
  });
});

await check("Mourne Cycles labels provisional offers before prices", async () => {
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
    assert.match(result.notices[0] ?? "", /Prices indicative|call to confirm/i);
    assert.ok((result.noticeTop ?? Infinity) < (result.priceTop ?? -Infinity));
    assert.doesNotMatch(result.text, /Green Commute Initiative|2–5 working days/);
  });
});

await check("Kent keeps the phone action visible on the opening screen", async () => {
  await withPage("/concepts/kent-amusements/", async (page) => {
    const result = await page.evaluate(() => {
      const call = document.querySelector(".ka-call");
      const rect = call?.getBoundingClientRect();
      return {
        callVisible: Boolean(
          rect
          && rect.width > 0
          && rect.height > 0
          && rect.left >= 0
          && rect.right <= document.documentElement.clientWidth,
        ),
      };
    });
    assert.equal(result.callVisible, true);
  });
});

// Classification comes from `image-provenance.md`, not from the page. The
// previous version derived "is this generated?" from the filename, caption and
// alt text, then asserted a disclosure against those same strings — so an image
// whose alt already read "AI-generated visualisation" satisfied the check by
// definition and could never fail, while a generated image with a neutral
// filename and no caption was never examined at all. The studio's own record is
// the only independent account of how an image was made.
await check("Public concepts disclose rendered imagery and keep Sources honest", async () => {
  assert.ok(publicSlugs.length > 0, "publicTransformationSlugs is empty");
  const provenance = readImageProvenance();
  // Restores the responsive-derivative assertion deleted on 28 July 2026. That
  // version pinned `-640.webp` on five named concept selectors, four of which
  // no longer render an image at all. The durable form of the same requirement:
  // where a phone-sized derivative was generated, the phone must be served it.
  const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : [full];
    });
  const availableDerivatives = new Set(
    walk(path.join(projectRoot, "public", "media"))
      .filter((file) => /-640\.webp$/i.test(file))
      .map((file) => path.basename(file)),
  );

  // Report every concept's imagery problems in one run. Asserting inline meant
  // the first bad slug masked the other fifteen.
  const problems = [];

  for (const slug of publicSlugs) {
    try {
    const conceptPath = `/concepts/${slug}/`;
    let rendered = null;
    await withPage(conceptPath, async (page) => {
      await page.evaluate(async () => {
        const images = [...document.querySelectorAll("img")].filter(
          (image) => !image.closest(".mm-concept-banner"),
        );
        await Promise.all(images.map((image) => {
          image.loading = "eager";
          if (image.complete && image.naturalWidth > 0) return Promise.resolve();
          // An <img> with no usable src never fires load or error, and
          // page.evaluate has no timeout of its own, so an unbounded wait here
          // would hang the suite until the CI job cap.
          return Promise.race([
            new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
              // Re-assigning src forces lazy below-fold images to fetch.
              const src = image.currentSrc || image.getAttribute("src");
              if (src) image.src = src;
            }),
            new Promise((resolve) => setTimeout(resolve, 5_000)),
          ]);
        }));
      });

      rendered = await page.evaluate(() => {
        const banner = document.querySelector(".mm-concept-banner")?.textContent
          ?.replace(/\s+/g, " ")
          .trim() ?? "";
        const isDecorative = (image) => {
          const src = image.currentSrc || image.getAttribute("src") || "";
          const alt = image.getAttribute("alt") ?? "";
          if (!src || src.startsWith("data:")) return true;
          if (/\.svg(?:$|\?)/i.test(src)) return true;
          if (alt === "" && (image.naturalWidth || 0) > 0 && image.naturalWidth <= 160) return true;
          return false;
        };
        // `closest` matches the element itself, so an image whose own class
        // contained "hero", "visual" or "photo" — `.di-hero-art`,
        // `.hm-hero-image` — resolved to the <img>, and querySelect on an <img>
        // finds nothing. Real disclosures were invisible to this helper and the
        // alt text quietly stood in for them. Search upward from the parent.
        const visibleDisclosure = (image) => {
          const scopes = [
            image.closest("figure"),
            image.parentElement?.closest(
              "[class*='panel'], [class*='visual'], [class*='hero'], [class*='photo'], section, article",
            ),
          ].filter(Boolean);
          const found = [];
          for (const scope of scopes) {
            for (const node of scope.querySelectorAll(
              "figcaption, .dh-photo-credit, .di-hero-placeholder, .hm-visual-note, [class*='photo-credit'], [class*='visual-note'], [class*='caption']",
            )) {
              const text = node.textContent?.replace(/\s+/g, " ").trim();
              if (!text) continue;
              const style = getComputedStyle(node);
              if (style.visibility === "hidden" || style.display === "none") continue;
              found.push({ text, bottom: node.getBoundingClientRect().bottom });
            }
          }
          return {
            // Alt text is deliberately excluded: it is not what a sighted
            // visitor is told, and including it made the check tautological.
            text: [...new Set(found.map((entry) => entry.text))].join(" "),
            bottom: found.length ? Math.max(...found.map((entry) => entry.bottom)) : null,
          };
        };

        const images = [...document.querySelectorAll("img")]
          .filter((image) => !image.closest(".mm-concept-banner"))
          .filter((image) => !isDecorative(image))
          .map((image) => {
            const src = image.currentSrc || image.getAttribute("src") || "";
            const rect = image.getBoundingClientRect();
            const disclosure = visibleDisclosure(image);
            return {
              src,
              basename: src.split("/").pop()?.split("?")[0] ?? "",
              disclosure: disclosure.text,
              disclosureBottom: disclosure.bottom,
              inFirstViewport: rect.top < window.innerHeight && rect.bottom > 0,
              complete: image.complete,
              naturalWidth: image.naturalWidth,
            };
          });

        return { banner, images, viewportHeight: window.innerHeight };
      });
    });

    assert.ok(rendered, `${slug}: concept page did not render`);

    const classify = (image) => lookupProvenance(provenance, image.basename);
    const unrecorded = rendered.images.filter((image) => !classify(image));
    assert.deepEqual(
      unrecorded.map((image) => image.basename),
      [],
      `${slug}: rendered image has no entry in research/image-provenance.md`,
    );

    for (const image of rendered.images) {
      const record = classify(image);
      assert.equal(image.complete, true, `${slug}: ${image.basename} failed to load`);
      assert.ok((image.naturalWidth ?? 0) > 0, `${slug}: ${image.basename} has no intrinsic size`);
      assert.notEqual(
        record.inUse,
        false,
        `${slug}: renders ${image.basename}, which the provenance record marks as no longer in use`,
      );

      const masterStem = image.basename.replace(/\.[^.]+$/, "").replace(/-\d+$/, "");
      const derivative = `${masterStem}-640.webp`;
      if (availableDerivatives.has(derivative) && image.basename !== derivative) {
        problems.push(
          `${slug}: serves ${image.basename} (${image.naturalWidth}px) to a 390px viewport while ${derivative} exists`,
        );
      }

      if (record.classification !== "generated" && record.classification !== "third-party") continue;

      // The banner is a page-level disclosure and sits above the concept, so it
      // counts — but something visible must say it, not just the alt attribute.
      const disclosed = `${image.disclosure} ${rendered.banner}`;
      const pattern = record.classification === "generated"
        ? /AI-generated|faithful visualisation|Provisional visualisation|visualisation/i
        : /Eric Jones|CC BY-SA|Unsplash|Geograph|Wikimedia/i;
      assert.match(
        disclosed,
        pattern,
        `${slug}: ${record.classification} asset ${image.basename} has no visible on-page disclosure`,
      );

      // Restores the first-viewport gate deleted on 28 July 2026. The point was
      // never markup presence — it is whether the visitor is told before they
      // have scrolled. An adjacent caption below the fold does not qualify
      // unless the banner already carries the disclosure.
      //
      // Scoped to generated imagery, matching the deleted check. Third-party
      // photographs carry their credit on the page and in
      // `public/media/place/ATTRIBUTION.md`; whether that credit must also sit
      // above the fold is a publication-standard decision that
      // docs/CONCEPT_DESIGN_REVIEW.md does not currently make.
      if (record.classification !== "generated") continue;
      if (!image.inFirstViewport) continue;
      const bannerDiscloses = pattern.test(rendered.banner);
      const captionInFold = image.disclosureBottom !== null
        && image.disclosureBottom <= rendered.viewportHeight
        && pattern.test(image.disclosure);
      assert.ok(
        bannerDiscloses || captionInFold,
        `${slug}: ${image.basename} is in the phone first viewport but its disclosure is not`
          + (image.disclosureBottom === null
            ? " (no visible caption found)"
            : ` (caption ends ${Math.round(image.disclosureBottom - rendered.viewportHeight)}px below the fold)`),
      );
    }

    await withPage(`/transformations/${slug}/`, async (page) => {
      const sources = await page.evaluate(() =>
        document.querySelector(".source-section")?.innerText?.replace(/\s+/g, " ").trim() ?? "",
      );
      assert.ok(sources, `${slug}: missing Sources & limits block`);

      const claimsNoPhotography = /introduces no photography/i.test(sources);
      if (claimsNoPhotography) {
        assert.equal(
          rendered.images.length,
          0,
          `${slug}: Sources claims no photography but the concept renders ${rendered.images.map((image) => image.basename).join(", ")}`,
        );
      }

      const claimsGenerated = /faithful visualisation|AI-generated/i.test(sources);
      const hasGenerated = rendered.images.some(
        (image) => classify(image)?.classification === "generated",
      );
      if (claimsGenerated) {
        assert.ok(
          hasGenerated,
          `${slug}: Sources describes generated imagery the concept page no longer uses`,
        );
      }

      const thirdPartyImages = rendered.images.filter(
        (image) => classify(image)?.classification === "third-party",
      );
      for (const image of thirdPartyImages) {
        assert.match(
          sources,
          /Eric Jones|CC BY-SA|promenade|Geograph|third-party|documentary/i,
          `${slug}: Sources & limits omit the third-party photograph still shown on the concept (${image.basename})`,
        );
      }
    });
    } catch (error) {
      problems.push(error.message.split("\n")[0]);
    }
  }

  assert.deepEqual(problems, [], `concept imagery problems:\n- ${problems.join("\n- ")}`);
});

await check("Declared prototype availability shows a recovery-safe handoff", async () => {
  await withPage("/concepts/donard-hotel/", async (page) => {
    const evidence = await page.$eval(".dh-hero", (element) => {
      const image = element.querySelector("img");
      return {
        complete: image?.complete,
        naturalWidth: image?.naturalWidth,
        currentSrc: image?.currentSrc,
        disclosure: element.querySelector(".dh-photo-credit")?.textContent?.replace(/\s+/g, " ").trim(),
      };
    });
    assert.equal(evidence.complete, true);
    assert.ok((evidence.naturalWidth ?? 0) > 0);
    assert.match(evidence.currentSrc ?? "", /donard-hotel-exterior-visualisation-640\.webp$/);
    assert.match(evidence.disclosure ?? "", /Eric Jones.*CC BY-SA 2\.0/);

    await page.click("[data-dh-availability] button[type=submit]");
    const status = await page.$eval(
      "[data-dh-availability-status]:not([hidden])",
      (element) => element.textContent?.replace(/\s+/g, " ").trim(),
    );
    assert.match(status ?? "", /official booking page for live rooms and prices/);
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
    // Inactive placeholders are visibly disabled and exempt from the text
    // contrast requirement. Live destinations and qualifying copy are not.
    if (el.closest('[aria-disabled="true"]')) continue;
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(" ").trim();
    if (!text) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.opacity === "0") continue;
    const size = parseFloat(cs.fontSize);
    const need = (size >= 24 || (size >= 18.66 && (Number(cs.fontWeight) || 400) >= 700)) ? 3 : 4.5;
    const bg = bgOf(el);
    // Inherited CSS opacity fades the text against its backdrop just as an
    // alpha channel does, but it is NOT part of color. The first version of
    // this probe composited color alpha only, so it passed 14/14 while three
    // texts dimmed by an ancestor's opacity were still under 4.5:1
    // (25 July 2026 re-review of Mourne Cycles). Fold the effective opacity in.
    let effectiveOpacity = 1;
    for (let node = el; node; node = node.parentElement) {
      effectiveOpacity *= Number(getComputedStyle(node).opacity);
    }
    const fg = parse(cs.color);
    fg[3] = (fg[3] ?? 1) * effectiveOpacity;
    const [hi, lo] = [lum(over(fg, bg)), lum(bg)].sort((a, b) => b - a);
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

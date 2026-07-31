import puppeteer from 'puppeteer-core';
import { findChrome } from '../../../../tools/lib/chrome.mjs';

const base = 'http://127.0.0.1:4321';
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true });

async function audit(slug, checks) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.goto(`${base}/concepts/${slug}/`, { waitUntil: 'networkidle0' });
  const desktop = await page.evaluate((checks) => {
    const out = {};
    for (const [key, sel] of Object.entries(checks)) {
      const el = document.querySelector(sel);
      if (!el) { out[key] = null; continue; }
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      out[key] = {
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        color: s.color,
        background: s.backgroundColor,
        width: Math.round(r.width),
        height: Math.round(r.height),
        top: Math.round(r.top),
        left: Math.round(r.left),
        text: el.textContent?.trim().slice(0, 80),
      };
    }
    return out;
  }, checks);
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(`${base}/concepts/${slug}/`, { waitUntil: 'networkidle0' });
  const mobile = await page.evaluate((checks) => {
    const out = {};
    for (const [key, sel] of Object.entries(checks)) {
      const el = document.querySelector(sel);
      if (!el) { out[key] = null; continue; }
      const r = el.getBoundingClientRect();
      out[key] = {
        width: Math.round(r.width),
        height: Math.round(r.height),
        top: Math.round(r.top),
        bottom: Math.round(r.bottom),
        inViewport: r.top >= 0 && r.top < 844,
        text: el.textContent?.trim().slice(0, 80),
      };
    }
    return out;
  }, checks);
  await page.close();
  return { desktop, mobile };
}

const results = {
  'tool-centre': await audit('tool-centre', {
    brandSub: '.tc-brand-sub',
    h1: '.tc-story h1',
    railFirst: '.tc-rail-cell:first-child .tc-cat',
    callBtn: '.tc-call',
  }),
  cupla: await audit('cupla', {
    counterH2: '.cp-counter-panel h2',
    rings: '.cp-counter-rings',
    storyH1: '.cp-story h1',
    counterNote: '.cp-counter-note',
    navLink: '.cp-nav a',
  }),
  scopers: await audit('scopers', {
    h1: '.sc-story h1',
    club: '.sc-club',
    railFirst: '.sc-rail-cell:first-child',
    bookBtn: '.sc-book',
  }),
  'bucks-head': await audit('bucks-head', {
    h1: '.bh-story h1',
    booking: '.bh-booking',
    strip: '.bh-strip',
    railLabel: '.bh-rail-label',
  }),
};

console.log(JSON.stringify(results, null, 2));
await browser.close();

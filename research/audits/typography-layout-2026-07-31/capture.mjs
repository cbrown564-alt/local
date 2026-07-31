import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { findChrome } from '../../../../tools/lib/chrome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots');
fs.mkdirSync(outDir, { recursive: true });

const slugs = ['newcastle-dental', 'hugh-mccanns', 'newcastle-chamber', 'kent-amusements'];
const base = 'http://127.0.0.1:4321';

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  defaultViewport: null,
});

for (const slug of slugs) {
  const url = `${base}/concepts/${slug}/`;
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.screenshot({ path: path.join(outDir, `${slug}-desktop-hero.png`) });

  await page.screenshot({ path: path.join(outDir, `${slug}-desktop-full.png`), fullPage: true });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.evaluate(() => document.fonts?.ready);
  await page.screenshot({ path: path.join(outDir, `${slug}-mobile-hero.png`) });

  await page.close();
  console.log(`Captured ${slug}`);
}

await browser.close();
console.log('Done');

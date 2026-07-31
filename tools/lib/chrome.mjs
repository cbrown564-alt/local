import fs from "node:fs";

const candidates = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

export function findChrome() {
  const executable = candidates.find((candidate) => candidate && fs.existsSync(candidate));
  if (!executable) {
    throw new Error("Chrome not found. Set CHROME_PATH to a Chrome executable.");
  }
  return executable;
}

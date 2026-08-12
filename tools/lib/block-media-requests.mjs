/**
 * Abort video/media fetches before geometry probes. Layout pins use the
 * element box (CSS-sized); decoded frames are not required and have crashed
 * headless Chrome on GitHub Actions during navigation.
 */
export async function blockMediaRequests(page) {
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const type = request.resourceType();
    const url = request.url();
    if (type === "media" || /\.(?:mp4|webm|m3u8)(?:$|\?)/i.test(url)) {
      request.abort().catch(() => {});
      return;
    }
    request.continue().catch(() => {});
  });
}

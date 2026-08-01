/** Open Graph share-card assets under public/media/og/. Regenerate with
    `node tools/capture/capture-og-cards.mjs` while `pnpm dev` is running. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const ogImages = {
  studio: "/media/og/studio.jpg",
  home: "/media/og/home.jpg",
  transformations: "/media/og/transformations.jpg",
  request: "/media/og/request.jpg",
} as const;

export function transformationOgImage(slug: string): string {
  return `/media/og/${slug}.jpg`;
}

export function conceptOgImage(slug: string, hasCandidate: boolean): string {
  return hasCandidate ? transformationOgImage(slug) : ogImages.studio;
}

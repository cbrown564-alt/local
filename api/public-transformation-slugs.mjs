/**
 * Public portfolio slugs. Owned here so the Vercel request function can load
 * them after compile — importing the Astro data TypeScript module left a
 * runtime `.ts` path that Node cannot resolve in `/var/task`.
 *
 * Site code re-exports this list from `src/site/data/transformations.ts`.
 */
export const publicTransformationSlugs = Object.freeze([
  "hotel-enniskeen",
  "mourne-cycles",
  "newcastle-chamber",
  "donard-veterinary",
  "scopers",
  "newcastle-dental",
  "hugh-mccanns",
  "arley-house",
  "conlyn-house",
  "cocos-adventure-playground",
]);

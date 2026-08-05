/**
 * "One Day, Made Here" town films for the homepage hero.
 *
 * The films are assembled offline by `tools/pipeline/assemble-hero-film.mjs`
 * from generated clips (see research/film/one-day-made-here.md). Because the
 * check runs at build time, a town appears in the hero only once its assets
 * are actually in public/media/home/ — the page can never point at a film
 * that isn't there. Restart the dev server after assembling.
 */
import fs from "node:fs";
import path from "node:path";

export interface TownFilm {
  id: "dundrum" | "newcastle";
  name: string;
  soundLabel: string;
  ariaLabel: string;
  soundReady: boolean;
  mobileReady: boolean;
}

const HOME_MEDIA = path.join(process.cwd(), "public", "media", "home");
const exists = (file: string): boolean =>
  fs.existsSync(path.join(HOME_MEDIA, file));

const TOWNS: ReadonlyArray<
  Omit<TownFilm, "soundReady" | "mobileReady">
> = [
  {
    id: "dundrum",
    name: "Dundrum",
    soundLabel: "Hear the bay",
    ariaLabel:
      "Generated film: an imagined dawn-to-dusk day in Dundrum, County Down — not footage of the real town.",
  },
  {
    id: "newcastle",
    name: "Newcastle",
    soundLabel: "Hear the sea",
    ariaLabel:
      "Generated film: an imagined dawn-to-dusk day in Newcastle, County Down — not footage of the real town.",
  },
];

export const getTownFilms = (): TownFilm[] =>
  TOWNS.filter(
    (town) =>
      exists(`${town.id}-film.mp4`) && exists(`${town.id}-film-poster-1265.webp`),
  ).map((town) => ({
    ...town,
    soundReady: exists(`${town.id}-ambience.mp3`),
    mobileReady: exists(`${town.id}-film-mobile.mp4`),
  }));

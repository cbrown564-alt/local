import routeProfile from "./route-profile.json";

export type JourneyChapterId =
  | "street"
  | "forest"
  | "high-ground"
  | "descent"
  | "workshop";

export type WorkshopConcern = "grip" | "gears" | "brakes";

export interface JourneyChapter {
  id: JourneyChapterId;
  index: string;
  label: string;
  progress: number;
  heading: string;
  body: string;
  cue: string;
}

export const workshop = {
  name: "Line & Bearing",
  description: "A synthetic mountain-bike workshop in Newcastle, County Down.",
  place: "Newcastle · County Down",
};
export const chapters: JourneyChapter[] = [
  {
    id: "street",
    index: "S",
    label: "Street",
    progress: 0,
    heading: "Begin where the tyres still sound on stone.",
    body: "The line leaves Newcastle at workshop height. Nothing here claims a trail or a safe way up; this is the first measured point in an expressive terrain study.",
    cue: "Set off",
  },
  {
    id: "forest",
    index: "F",
    label: "Forest",
    progress: 0.26,
    heading: "Grip changes before the view does.",
    body: "Soft ground loads tyres, pressure and drivetrain. The profile tightens as the study reaches the trees and the useful questions become mechanical.",
    cue: "Check grip",
  },
  {
    id: "high-ground",
    index: "H",
    label: "High ground",
    progress: 0.5,
    heading: "Town, ridge and sea share one line.",
    body: "",
    cue: "Hold the line",
  },
  {
    id: "descent",
    index: "D",
    label: "Descent",
    progress: 0.76,
    heading: "What the climb loaded, the descent reveals.",
    body: "Braking, shifting and tyre control stop being product categories. They become the things a rider can describe when the bike comes home.",
    cue: "Name the concern",
  },
  {
    id: "workshop",
    index: "W",
    label: "Workshop",
    progress: 1,
    heading: "Bring back what the mountain found.",
    body: "Tell the workshop what changed under load. A mechanic can ask the next question without pretending this terrain study is a ride recommendation.",
    cue: "Ask the workshop",
  },
];

export const concerns: Array<{
  id: WorkshopConcern;
  label: string;
  context: string;
}> = [
  {
    id: "grip",
    label: "Grip & tyres",
    context: "Grip changed as the ground softened.",
  },
  {
    id: "gears",
    label: "Gears & drivetrain",
    context: "Shifting or drivetrain load changed on the climb.",
  },
  {
    id: "brakes",
    label: "Brakes & control",
    context: "Braking or control changed on the descent.",
  },
];

export const route = routeProfile;

export const routeProfilePath = (width = 1000, height = 260): string => {
  const pad = 12;
  const min = route.summary.minElevationM;
  const max = route.summary.maxElevationM;
  return route.samples
    .map((sample, index) => {
      const x = pad + sample.progress * (width - pad * 2);
      const normal = (sample.elevationM - min) / Math.max(1, max - min);
      const y = height - pad - normal * (height - pad * 2);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
};

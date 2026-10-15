// Selection lists used during onboarding and profile editing.

export const GENRES = [
  "house",
  "techno",
  "edm",
  "electronic",
  "dance",
  "dj set",
  "bass",
  "trance",
] as const;

export type Genre = (typeof GENRES)[number];

export const SAMPLE_ARTISTS = [
  "fisher",
  "john summit",
  "kaskade",
  "disclosure",
  "chris lake",
  "eric prydz",
  "charlotte de witte",
  "dom dolla",
  "gorgon city",
  "meduza",
  "fred again..",
  "black coffee",
  "kettama",
  "prospa",
  "vintage culture",
] as const;

export const CITIES = ["miami", "dallas", "new york", "los angeles", "chicago", "austin", "other"] as const;

export const CREW_PREFERENCES = [
  { id: "small", label: "small + chill", description: "4-6 people, lower key" },
  { id: "big", label: "big energy", description: "8+ people, go hard" },
  { id: "same-gender", label: "mostly same gender", description: "crew leans one gender" },
  { id: "mixed", label: "mixed group", description: "no preference on gender mix" },
  { id: "solo-friendly", label: "solo-friendly", description: "everyone's meeting for the first time" },
] as const;

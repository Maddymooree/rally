/**
 * Event data layer for the "near you" section.
 *
 * Shaped so a future ingestion pipeline can slot in without touching the UI:
 *   1. pull raw events from event APIs (per city / per source)
 *   2. an AI classifier tags `genres` and sets `status: "pending"`
 *   3. dedupe across sources using `source` + `sourceId` (or a fuzzy match on
 *      artist + venue + date) before writing into this same shape
 *   4. an admin flips `status` to "approved" (or "hidden"), and can set
 *      `featured` — only "approved" events are ever rendered publicly
 *
 * For now there's no backend, so EVENTS below is hand-authored placeholder
 * data in that exact shape (status: "approved", source: "manual"). Swapping
 * in a real feed later means replacing this array (or fetching it) — no
 * component changes required.
 */

export type EventGenre = "edm" | "house" | "techno" | "electronic" | "dance" | "dj set";
export type EventStatus = "approved" | "pending" | "hidden";

export interface RallyEvent {
  id: string;
  artist: string;
  venue: string;
  city: string; // matches a City["slug"]
  date: string; // ISO date, e.g. "2027-01-24"
  dateLabel: string; // display string, e.g. "jan 24, 2027"
  genres: EventGenre[];
  imageUrl?: string;
  ticketUrl?: string;
  featured?: boolean;
  status: EventStatus;
  source: "manual" | (string & {}); // "manual" or e.g. "api:edmtrain"
  sourceId?: string;
}

export interface City {
  slug: string;
  name: string;
}

export const CITIES: City[] = [
  { slug: "dallas", name: "dallas" },
  { slug: "houston", name: "houston" },
  { slug: "new-york", name: "new york" },
  { slug: "los-angeles", name: "los angeles" },
  { slug: "miami", name: "miami" },
  { slug: "chicago", name: "chicago" },
];

export const EVENTS: RallyEvent[] = [
  {
    id: "dal-1",
    artist: "kaskade",
    venue: "the bomb factory",
    city: "dallas",
    date: "2027-01-24",
    dateLabel: "jan 24, 2027",
    genres: ["edm", "house"],
    featured: true,
    status: "approved",
    source: "manual",
  },
  {
    id: "dal-2",
    artist: "chris lake",
    venue: "stereo live",
    city: "dallas",
    date: "2027-02-07",
    dateLabel: "feb 7, 2027",
    genres: ["house", "dance"],
    status: "approved",
    source: "manual",
  },
  {
    id: "hou-1",
    artist: "fisher",
    venue: "the far out lounge",
    city: "houston",
    date: "2027-01-31",
    dateLabel: "jan 31, 2027",
    genres: ["house", "dj set"],
    featured: true,
    status: "approved",
    source: "manual",
  },
  {
    id: "hou-2",
    artist: "charlotte de witte",
    venue: "warehouse live",
    city: "houston",
    date: "2027-02-14",
    dateLabel: "feb 14, 2027",
    genres: ["techno", "electronic"],
    status: "approved",
    source: "manual",
  },
  {
    id: "nyc-1",
    artist: "black coffee",
    venue: "brooklyn mirage",
    city: "new-york",
    date: "2027-02-20",
    dateLabel: "feb 20, 2027",
    genres: ["house", "electronic"],
    featured: true,
    status: "approved",
    source: "manual",
  },
  {
    id: "nyc-2",
    artist: "carl cox",
    venue: "avant gardner",
    city: "new-york",
    date: "2027-03-06",
    dateLabel: "mar 6, 2027",
    genres: ["techno", "dj set"],
    status: "approved",
    source: "manual",
  },
  {
    id: "la-1",
    artist: "disclosure",
    venue: "shrine expo hall",
    city: "los-angeles",
    date: "2027-01-17",
    dateLabel: "jan 17, 2027",
    genres: ["dance", "electronic"],
    featured: true,
    status: "approved",
    source: "manual",
  },
  {
    id: "la-2",
    artist: "green velvet",
    venue: "sound nightclub",
    city: "los-angeles",
    date: "2027-02-27",
    dateLabel: "feb 27, 2027",
    genres: ["techno", "house"],
    status: "approved",
    source: "manual",
  },
  {
    id: "mia-1",
    artist: "david guetta",
    venue: "story miami",
    city: "miami",
    date: "2027-01-30",
    dateLabel: "jan 30, 2027",
    genres: ["edm", "dance"],
    featured: true,
    status: "approved",
    source: "manual",
  },
  {
    id: "mia-2",
    artist: "amelie lens",
    venue: "space miami",
    city: "miami",
    date: "2027-03-01",
    dateLabel: "mar 1, 2027",
    genres: ["techno"],
    status: "approved",
    source: "manual",
  },
  {
    id: "chi-1",
    artist: "seven lions",
    venue: "radius chicago",
    city: "chicago",
    date: "2027-02-06",
    dateLabel: "feb 6, 2027",
    genres: ["edm", "electronic"],
    featured: true,
    status: "approved",
    source: "manual",
  },
  {
    id: "chi-2",
    artist: "gorgon city",
    venue: "concord music hall",
    city: "chicago",
    date: "2027-02-21",
    dateLabel: "feb 21, 2027",
    genres: ["house", "dj set"],
    status: "approved",
    source: "manual",
  },
];

export function getEventsForCity(citySlug: string): RallyEvent[] {
  return EVENTS.filter((e) => e.city === citySlug && e.status === "approved").sort(
    (a, b) => a.date.localeCompare(b.date)
  );
}

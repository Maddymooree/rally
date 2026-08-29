/**
 * Event data layer for the "near you" section.
 *
 * Backed by the admin approval pipeline in google-apps-script/ — an admin
 * watchlists artists, a search job checks Bandsintown + Ticketmaster for
 * upcoming shows in each target city, and matches land as pending events
 * for manual review. See google-apps-script/SCHEMA.md for the full pipeline.
 *
 * events-data.json is auto-committed by the admin project (Github.gs)
 * whenever an event is approved, hidden, unhidden, or edited — it's never
 * hand-edited. The site reads it as a plain static import, so this stays a
 * fully static build with no runtime fetch and no public API involved.
 */
import eventsData from "./events-data.json";

export type EventGenre = "edm" | "house" | "techno" | "electronic" | "dance" | "dj set";
export type EventStatus = "approved" | "pending" | "hidden" | "rejected";

export interface RallyEvent {
  id: string;
  artist: string;
  venue: string;
  city: string; // matches a City["slug"]
  date: string; // ISO date, e.g. "2027-01-24"
  dateLabel: string; // display string, e.g. "jan 24, 2027"
  genres: EventGenre[];
  imageUrl?: string | null;
  ticketUrl?: string | null;
  featured?: boolean;
  status: EventStatus;
  source: "manual" | (string & {});
  sourceId?: string;
}

export interface City {
  slug: string;
  name: string;
}

export const CITIES: City[] = [
  { slug: "dallas", name: "dallas" },
  { slug: "new-york", name: "new york" },
  { slug: "los-angeles", name: "los angeles" },
  { slug: "miami", name: "miami" },
  { slug: "chicago", name: "chicago" },
];

const EVENTS = eventsData as RallyEvent[];

// A range dateLabel (e.g. "oct 15–18, 2026") always uses an en dash — every
// single-date label comes from formatDateLabel_ in Github.gs, which never
// produces one. Used to infer festival-style (apply now) vs a single-night
// club show (find your crew) since the data doesn't carry an explicit type.
export function isMultiNightEvent(event: RallyEvent): boolean {
  return event.dateLabel.includes("–");
}

const MONTH_INDEX: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// The last calendar day an event is still happening. `date` only stores the
// *start* day, so for a multi-night range ("oct 15–18, 2026") this parses
// the end day out of dateLabel instead — otherwise a 4-night residency would
// wrongly disappear from the site after night one. Falls back to `date`
// for single-date events (or if the label doesn't match the expected shape).
function getEventEndDate(event: RallyEvent): string {
  const match = event.dateLabel.match(/^([a-z]+) \d+–(\d+), (\d+)$/i);
  if (!match) return event.date;
  const [, monthAbbr, endDay, year] = match;
  const monthIndex = MONTH_INDEX[monthAbbr.toLowerCase()];
  if (monthIndex === undefined) return event.date;
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${endDay.padStart(2, "0")}`;
}

function isPastEvent(event: RallyEvent, referenceDate: Date): boolean {
  const todayStr = referenceDate.toISOString().slice(0, 10);
  return getEventEndDate(event) < todayStr;
}

export function getEventsForCity(citySlug: string, referenceDate: Date = new Date()): RallyEvent[] {
  return EVENTS.filter(
    (e) => e.city === citySlug && e.status === "approved" && !isPastEvent(e, referenceDate)
  ).sort((a, b) => a.date.localeCompare(b.date));
}

// The soonest `limit` approved events across every near-you city, for the
// homepage's "happening soon" carousel. Re-run against the current date on
// every page load/rebuild — there's no separate "refresh" step needed.
export function getUpcomingEvents(limit: number, referenceDate: Date = new Date()): RallyEvent[] {
  const upcoming = EVENTS.filter((e) => e.status === "approved" && !isPastEvent(e, referenceDate));

  upcoming.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return a.artist.localeCompare(b.artist);
  });

  return upcoming.slice(0, limit);
}

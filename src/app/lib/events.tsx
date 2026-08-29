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

export function getEventsForCity(citySlug: string): RallyEvent[] {
  return EVENTS.filter((e) => e.city === citySlug && e.status === "approved").sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}

// A range dateLabel (e.g. "oct 15–18, 2026") always uses an en dash — every
// single-date label comes from formatDateLabel_ in Github.gs, which never
// produces one. Used to infer festival-style (apply now) vs a single-night
// club show (find your crew) since the data doesn't carry an explicit type.
export function isMultiNightEvent(event: RallyEvent): boolean {
  return event.dateLabel.includes("–");
}

// The soonest `limit` approved events across every near-you city, for the
// homepage's "happening soon" carousel. Re-run against the current date on
// every page load/rebuild — there's no separate "refresh" step needed.
export function getUpcomingEvents(limit: number, referenceDate: Date = new Date()): RallyEvent[] {
  const todayStr = referenceDate.toISOString().slice(0, 10);
  const upcoming = EVENTS.filter((e) => e.status === "approved" && e.date >= todayStr);

  upcoming.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return a.artist.localeCompare(b.artist);
  });

  return upcoming.slice(0, limit);
}

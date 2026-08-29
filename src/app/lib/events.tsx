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
  { slug: "houston", name: "houston" },
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

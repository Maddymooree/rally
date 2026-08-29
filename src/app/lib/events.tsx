/**
 * Event data layer for the "near you" section.
 *
 * Backed by the admin approval pipeline in google-apps-script/ — an admin
 * watchlists artists, a search job checks Bandsintown + Ticketmaster for
 * upcoming shows in each target city, and matches land as pending events
 * for manual review. Only events an admin approves ever reach this fetch;
 * see google-apps-script/SCHEMA.md for the full pipeline.
 *
 * Backed by the deployed google-apps-script/events-api/ project — see
 * google-apps-script/SETUP.md for how to redeploy it if this URL ever
 * changes.
 */
export const EVENTS_API_URL =
  "https://script.google.com/macros/s/AKfycbyL3wBpxI-XCLd1g08g4w1IP-bs7UR6wGBhyhZuX5QLesSvI-053Uv-Y9GkvPxR7XO3/exec";

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

export async function fetchEventsForCity(citySlug: string): Promise<RallyEvent[]> {
  if (!EVENTS_API_URL) {
    console.warn("EVENTS_API_URL is not configured yet — see google-apps-script/SETUP.md");
    return [];
  }
  try {
    const res = await fetch(`${EVENTS_API_URL}?city=${encodeURIComponent(citySlug)}`);
    if (!res.ok) throw new Error(`events api responded ${res.status}`);
    const events: RallyEvent[] = await res.json();
    return events.sort((a, b) => a.date.localeCompare(b.date));
  } catch (err) {
    console.error("failed to load events for", citySlug, err);
    return [];
  }
}

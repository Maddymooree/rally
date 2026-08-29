/**
 * Placeholder show data for Scene 3's carousel.
 *
 * Shaped to match the real site's event schema (src/app/lib/events.tsx in
 * the main rally repo) so this module can later be swapped for a real
 * fetch/import against the live events feed without touching Scene 3 —
 * only `getUpcomingShows` needs to change, its signature can stay the same.
 */

export interface City {
  slug: string;
  name: string;
}

export interface Show {
  id: string;
  artist: string;
  venue: string;
  city: string; // matches a City["slug"]
  dateLabel: string; // display string, e.g. "jan 24"
}

export const CITIES: City[] = [
  { slug: "dallas", name: "dallas" },
  { slug: "houston", name: "houston" },
  { slug: "new-york", name: "new york" },
  { slug: "los-angeles", name: "los angeles" },
  { slug: "miami", name: "miami" },
  { slug: "chicago", name: "chicago" },
];

const SHOWS: Show[] = [
  { id: "1", artist: "polo & pan", venue: "the factory", city: "dallas", dateLabel: "jan 24" },
  { id: "2", artist: "fred again..", venue: "the criterion", city: "houston", dateLabel: "jan 31" },
  { id: "3", artist: "overmono", venue: "brooklyn mirage", city: "new-york", dateLabel: "feb 6" },
  { id: "4", artist: "black coffee", venue: "sound nightclub", city: "los-angeles", dateLabel: "feb 12" },
  { id: "5", artist: "chris lake", venue: "space miami", city: "miami", dateLabel: "feb 14" },
  { id: "6", artist: "disclosure", venue: "radius", city: "chicago", dateLabel: "feb 21" },
];

// Swap the body of this function for a real fetch/import later — callers
// (Scene 3) only depend on this signature, not on SHOWS being static.
export function getUpcomingShows(limit: number): Show[] {
  return SHOWS.slice(0, limit);
}

// Script Properties (Project Settings → Script Properties) this project expects:
//   RALLY_SHEET_ID           — the Google Sheet's file ID (from its URL)
//   BANDSINTOWN_APP_ID       — free, from https://artists.bandsintown.com/support/api-installation
//   TICKETMASTER_API_KEY     — free, from https://developer.ticketmaster.com/

var SHEET_ID_PROPERTY = 'RALLY_SHEET_ID';
var BANDSINTOWN_APP_ID_PROPERTY = 'BANDSINTOWN_APP_ID';
var TICKETMASTER_API_KEY_PROPERTY = 'TICKETMASTER_API_KEY';

var TAB_ARTISTS = 'Artists';
var TAB_EVENTS = 'Events';
var TAB_SEARCH_RUNS = 'SearchRuns';

var ARTIST_COLUMNS = ['id', 'name', 'aliases', 'active', 'notes', 'created_at'];
var EVENT_COLUMNS = [
  'id', 'artist', 'artist_id', 'venue', 'city', 'date', 'genres', 'image_url',
  'ticket_url', 'source', 'source_url', 'status', 'featured', 'dedupe_key',
  'reviewed_at', 'reviewed_by', 'created_at', 'updated_at'
];
var SEARCH_RUN_COLUMNS = ['id', 'started_at', 'finished_at', 'status', 'artists_searched', 'events_found', 'notes'];

var STATUS = { PENDING: 'pending', APPROVED: 'approved', REJECTED: 'rejected', HIDDEN: 'hidden' };

// Keep in sync with CITIES in src/app/lib/events.tsx. Adding a city later is
// just adding a row here (plus the matching entry client-side) — no schema change.
var CITIES = [
  { slug: 'dallas', name: 'Dallas' },
  { slug: 'houston', name: 'Houston' },
  { slug: 'new-york', name: 'New York' },
  { slug: 'los-angeles', name: 'Los Angeles' },
  { slug: 'miami', name: 'Miami' },
  { slug: 'chicago', name: 'Chicago' }
];

var SEARCH_WINDOW_DAYS = 120; // ~4 months, per the original "next 3-4 months" spec

// Script Properties this project expects:
//   RALLY_SHEET_ID — same Sheet ID as the admin project (they read the same
//                    underlying data; this one just can't write to it).

var SHEET_ID_PROPERTY = 'RALLY_SHEET_ID';
var TAB_EVENTS = 'Events';
var EVENT_COLUMNS = [
  'id', 'artist', 'artist_id', 'venue', 'city', 'date', 'genres', 'image_url',
  'ticket_url', 'source', 'source_url', 'status', 'featured', 'dedupe_key',
  'reviewed_at', 'reviewed_by', 'created_at', 'updated_at'
];
var STATUS_APPROVED = 'approved';

// Deploy this project separately from admin/, as its own Web App, with
// "Execute as: Me" and "Who has access: Anyone" — see SETUP.md. It is a
// distinct Apps Script project (not just a different function in the same
// one) specifically so the "Anyone" access setting can never expose a write
// path: there simply isn't one in this codebase to expose.
//
// GET ?city=<slug>  → approved events for that city
// GET (no city)     → approved events for every city
function doGet(e) {
  var city = e && e.parameter && e.parameter.city;

  var events = readRows_(TAB_EVENTS, EVENT_COLUMNS)
    .filter(function (row) { return row.status === STATUS_APPROVED; })
    .filter(function (row) { return !city || row.city === city; })
    .map(formatEventForPublic_)
    .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  return ContentService
    .createTextOutput(JSON.stringify(events))
    .setMimeType(ContentService.MimeType.JSON);
}

// Matches the RallyEvent shape in src/app/lib/events.tsx exactly, so the
// frontend can drop this straight in where the hardcoded array used to be.
function formatEventForPublic_(row) {
  return {
    id: row.id,
    artist: row.artist,
    venue: row.venue,
    city: row.city,
    date: row.date,
    dateLabel: formatDateLabel_(row.date),
    genres: splitList_(row.genres),
    imageUrl: row.image_url || null,
    ticketUrl: row.ticket_url || null,
    featured: isTruthy_(row.featured),
    status: row.status,
    source: row.source,
    sourceId: row.id
  };
}

function formatDateLabel_(iso) {
  if (!iso) return '';
  var d = new Date(iso + 'T00:00:00Z');
  if (isNaN(d.getTime())) return iso;
  return Utilities.formatDate(d, 'UTC', 'MMM d, yyyy').toLowerCase();
}

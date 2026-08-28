function listEventsByStatus_(status) {
  return readRows_(TAB_EVENTS, EVENT_COLUMNS).filter(function (e) { return e.status === status; });
}

function listPendingEvents() {
  return listEventsByStatus_(STATUS.PENDING)
    .map(formatEventForAdmin_)
    .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
}

function formatEventForAdmin_(e) {
  return {
    id: e.id,
    artist: e.artist,
    venue: e.venue,
    city: e.city,
    date: e.date,
    genres: splitList_(e.genres),
    imageUrl: e.image_url || '',
    ticketUrl: e.ticket_url || '',
    source: e.source,
    sourceUrl: e.source_url || '',
    status: e.status,
    featured: isTruthy_(e.featured),
    createdAt: e.created_at
  };
}

function dedupeKey_(artist, venue, date) {
  return [String(artist).trim().toLowerCase(), String(venue).trim().toLowerCase(), String(date).trim()].join('|');
}

// Duplicate guard: an in-flight (pending or approved) row with the same
// artist+venue+date blocks a new insert outright. A previously-rejected row
// blocks it too, but for a different reason — surfaced separately so the
// search job can log "already reviewed, skipping" instead of a silent no-op.
function findConflict_(key) {
  var rows = readRows_(TAB_EVENTS, EVENT_COLUMNS);
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].dedupe_key !== key) continue;
    if (rows[i].status === STATUS.PENDING || rows[i].status === STATUS.APPROVED) return 'duplicate';
    if (rows[i].status === STATUS.REJECTED) return 'previously_rejected';
  }
  return null;
}

function insertPendingEvent_(candidate) {
  var key = dedupeKey_(candidate.artist, candidate.venue, candidate.date);
  var conflict = findConflict_(key);
  if (conflict) return { inserted: false, reason: conflict };

  var now = new Date().toISOString();
  appendRow_(TAB_EVENTS, EVENT_COLUMNS, {
    id: Utilities.getUuid(),
    artist: candidate.artist,
    artist_id: candidate.artistId || '',
    venue: candidate.venue,
    city: candidate.city,
    date: candidate.date,
    genres: (candidate.genres || []).join(', '),
    image_url: candidate.imageUrl || '',
    ticket_url: candidate.ticketUrl || '',
    source: candidate.source,
    source_url: candidate.sourceUrl || '',
    status: STATUS.PENDING,
    featured: false,
    dedupe_key: key,
    reviewed_at: '',
    reviewed_by: '',
    created_at: now,
    updated_at: now
  });
  return { inserted: true };
}

// Admin edits before approving — only allowed while still pending, so an
// edit can never quietly rewrite a row that's already live.
function updatePendingEvent(id, fields) {
  var row = findRow_(TAB_EVENTS, EVENT_COLUMNS, id);
  if (!row) throw new Error('Event not found.');
  if (row.status !== STATUS.PENDING) throw new Error('Only pending events can be edited.');

  ['artist', 'venue', 'city', 'date', 'sourceUrl'].forEach(function (f) {
    if (fields[f] === undefined) return;
    var col = f === 'sourceUrl' ? 'source_url' : f;
    row[col] = fields[f];
  });
  if (fields.genres !== undefined) row.genres = (fields.genres || []).join(', ');

  row.dedupe_key = dedupeKey_(row.artist, row.venue, row.date);
  row.updated_at = new Date().toISOString();
  updateRow_(TAB_EVENTS, EVENT_COLUMNS, row._row, row);
}

function approveEvent(id) {
  setEventStatus_(id, STATUS.APPROVED);
}

function rejectEvent(id) {
  setEventStatus_(id, STATUS.REJECTED);
}

function setEventStatus_(id, status) {
  var row = findRow_(TAB_EVENTS, EVENT_COLUMNS, id);
  if (!row) throw new Error('Event not found.');
  var now = new Date().toISOString();
  row.status = status;
  row.reviewed_at = now;
  row.reviewed_by = Session.getActiveUser().getEmail() || 'unknown';
  row.updated_at = now;
  updateRow_(TAB_EVENTS, EVENT_COLUMNS, row._row, row);
}

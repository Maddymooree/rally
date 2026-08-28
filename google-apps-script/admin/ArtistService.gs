function listArtists() {
  return readRows_(TAB_ARTISTS, ARTIST_COLUMNS).map(function (a) {
    return {
      id: a.id,
      name: a.name,
      aliases: splitList_(a.aliases),
      active: isTruthy_(a.active),
      notes: a.notes || '',
      createdAt: a.created_at
    };
  });
}

function addArtist(name, aliases, notes) {
  name = (name || '').toString().trim();
  if (!name) throw new Error('Artist name is required.');

  var dupe = listArtists().some(function (a) { return a.name.toLowerCase() === name.toLowerCase(); });
  if (dupe) throw new Error('"' + name + '" is already on the watchlist.');

  var id = Utilities.getUuid();
  appendRow_(TAB_ARTISTS, ARTIST_COLUMNS, {
    id: id,
    name: name,
    aliases: (aliases || []).join(', '),
    active: true,
    notes: notes || '',
    created_at: new Date().toISOString()
  });
  return id;
}

function setArtistActive(id, active) {
  var row = findRow_(TAB_ARTISTS, ARTIST_COLUMNS, id);
  if (!row) throw new Error('Artist not found.');
  row.active = !!active;
  updateRow_(TAB_ARTISTS, ARTIST_COLUMNS, row._row, row);
}

function removeArtist(id) {
  var row = findRow_(TAB_ARTISTS, ARTIST_COLUMNS, id);
  if (!row) return;
  deleteRow_(TAB_ARTISTS, row._row);
}

// ---- shared small helpers ----

function findRow_(tabName, columns, id) {
  var rows = readRows_(tabName, columns);
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].id === id) return rows[i];
  }
  return null;
}

function splitList_(value) {
  if (!value) return [];
  return String(value).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
}

function isTruthy_(value) {
  return value === true || value === 'TRUE' || value === 'true';
}

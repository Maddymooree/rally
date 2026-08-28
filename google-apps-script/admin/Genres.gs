// Ticketmaster's own classification vocabulary, narrowed to the genres this
// site actually uses. Anything outside this map (e.g. "Rock", "Pop") is
// dropped rather than guessed — better an empty suggestion than a wrong one.
var GENRE_ALIAS_MAP = {
  'edm': 'edm',
  'dance/electronic': 'electronic',
  'electronic': 'electronic',
  'house': 'house',
  'deep house': 'house',
  'techno': 'techno',
  'dance': 'dance',
  'dj': 'dj set',
  'dj set': 'dj set'
};

function normalizeGenre_(raw) {
  if (!raw) return null;
  return GENRE_ALIAS_MAP[String(raw).trim().toLowerCase()] || null;
}

// Bandsintown carries no genre data at all. This is a small, hand-maintained
// seed for artists likely to already be on the watchlist — anything missing
// just comes through with no suggested genres, for you to fill in by hand.
// Safe to extend as you add artists.
var KNOWN_ARTIST_GENRES = {
  'kaskade': ['edm', 'house'],
  'fisher': ['house', 'dj set'],
  'charlotte de witte': ['techno'],
  'carl cox': ['techno', 'dj set'],
  'black coffee': ['house', 'electronic'],
  'disclosure': ['dance', 'electronic'],
  'green velvet': ['techno', 'house'],
  'david guetta': ['edm', 'dance'],
  'amelie lens': ['techno'],
  'seven lions': ['edm', 'electronic'],
  'gorgon city': ['house', 'dj set'],
  'chris lake': ['house', 'dance']
};

function suggestGenresForArtist_(artistName) {
  return KNOWN_ARTIST_GENRES[String(artistName).trim().toLowerCase()] || [];
}

// The job: for each active watchlist artist, check every target city via
// Ticketmaster (precise, city-scoped) and, if a Bandsintown app_id is
// configured, every artist once via Bandsintown too (artist-scoped —
// matched against our 6 cities by venue city text). Bandsintown's API is
// partner-gated now, so it's optional: leave BANDSINTOWN_APP_ID unset and
// this skips it cleanly rather than failing every run. Matches land as
// `status: pending` rows only; nothing here ever touches `approved`.
function runSearchJob() {
  var runId = Utilities.getUuid();
  var startedAt = new Date().toISOString();
  var artistsSearched = 0;
  var eventsFound = 0;
  var notes = [];
  var bandsintownEnabled = !!PropertiesService.getScriptProperties().getProperty(BANDSINTOWN_APP_ID_PROPERTY);

  try {
    var artists = listArtists().filter(function (a) { return a.active; });
    var today = new Date();
    var cutoff = new Date(Date.now() + SEARCH_WINDOW_DAYS * 24 * 60 * 60 * 1000);

    artists.forEach(function (artist) {
      artistsSearched++;
      var names = [artist.name].concat(artist.aliases);

      CITIES.forEach(function (city) {
        names.forEach(function (name) {
          try {
            fetchTicketmasterEvents_(name, city.name).forEach(function (candidate) {
              eventsFound += tryInsert_(candidate, city.slug, artist.id, today, cutoff, notes);
            });
          } catch (err) {
            notes.push('ticketmaster/' + name + '/' + city.slug + ': ' + err.message);
          }
        });
      });

      if (!bandsintownEnabled) return;

      names.forEach(function (name) {
        try {
          fetchBandsintownEvents_(name).forEach(function (candidate) {
            var matched = matchCityFromText_(candidate.cityText);
            if (!matched) return; // outside our 6 target cities
            eventsFound += tryInsert_(candidate, matched.slug, artist.id, today, cutoff, notes);
          });
        } catch (err) {
          notes.push('bandsintown/' + name + ': ' + err.message);
        }
      });
    });

    logSearchRun_(runId, startedAt, new Date().toISOString(), 'ok', artistsSearched, eventsFound, notes.join(' | '));
  } catch (err) {
    logSearchRun_(runId, startedAt, new Date().toISOString(), 'error', artistsSearched, eventsFound, notes.concat('FATAL: ' + err.message).join(' | '));
    throw err;
  }

  return { artistsSearched: artistsSearched, eventsFound: eventsFound, notes: notes };
}

function tryInsert_(candidate, citySlug, artistId, today, cutoff, notes) {
  if (!candidate.date || !candidate.venue) return 0;
  var eventDate = new Date(candidate.date + 'T00:00:00Z');
  if (eventDate < today || eventDate > cutoff) return 0;

  var genres = candidate.genres.length
    ? uniq_(candidate.genres.map(normalizeGenre_).filter(Boolean))
    : suggestGenresForArtist_(candidate.artist);

  var result = insertPendingEvent_({
    artist: candidate.artist,
    artistId: artistId,
    venue: candidate.venue,
    city: citySlug,
    date: candidate.date,
    genres: genres,
    sourceUrl: candidate.sourceUrl,
    ticketUrl: candidate.ticketUrl,
    source: candidate.source
  });

  if (!result.inserted && result.reason === 'previously_rejected') {
    notes.push(candidate.artist + ' @ ' + candidate.venue + ' (' + candidate.date + '): previously rejected, skipping');
  }
  return result.inserted ? 1 : 0;
}

function uniq_(arr) {
  return arr.filter(function (v, i) { return arr.indexOf(v) === i; });
}

function matchCityFromText_(text) {
  if (!text) return null;
  var lower = text.toLowerCase();
  for (var i = 0; i < CITIES.length; i++) {
    if (lower.indexOf(CITIES[i].name.toLowerCase()) !== -1) return CITIES[i];
  }
  return null;
}

function logSearchRun_(id, startedAt, finishedAt, status, artistsSearched, eventsFound, notes) {
  appendRow_(TAB_SEARCH_RUNS, SEARCH_RUN_COLUMNS, {
    id: id,
    started_at: startedAt,
    finished_at: finishedAt,
    status: status,
    artists_searched: artistsSearched,
    events_found: eventsFound,
    notes: notes
  });
}

function listSearchRuns() {
  var rows = readRows_(TAB_SEARCH_RUNS, SEARCH_RUN_COLUMNS);
  return rows.slice(-20).reverse().map(function (r) {
    return {
      startedAt: r.started_at,
      finishedAt: r.finished_at,
      status: r.status,
      artistsSearched: r.artists_searched,
      eventsFound: r.events_found,
      notes: r.notes
    };
  });
}

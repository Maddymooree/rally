// Both sources below are the "legitimate event APIs" from the original
// near-you spec — no scraping. Each returns a plain candidate object; city
// matching for Bandsintown happens in Search.gs since Bandsintown itself is
// artist-scoped, not city-scoped.

function fetchBandsintownEvents_(artistName) {
  var appId = PropertiesService.getScriptProperties().getProperty(BANDSINTOWN_APP_ID_PROPERTY);
  if (!appId) throw new Error('Script Property ' + BANDSINTOWN_APP_ID_PROPERTY + ' is not set. See SETUP.md.');

  var url = 'https://rest.bandsintown.com/artists/' + encodeURIComponent(artistName) +
    '/events?app_id=' + encodeURIComponent(appId) + '&date=upcoming';
  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var code = res.getResponseCode();
  if (code === 404) return []; // artist not found on Bandsintown — not an error
  if (code !== 200) throw new Error('Bandsintown ' + code + ': ' + res.getContentText().slice(0, 200));

  var events = JSON.parse(res.getContentText());
  if (!events || !events.length) return [];

  return events.map(function (e) {
    var venue = e.venue || {};
    return {
      artist: artistName,
      venue: venue.name || '',
      cityText: [venue.city, venue.region].filter(Boolean).join(', '),
      date: e.datetime ? e.datetime.slice(0, 10) : '',
      genres: [], // Bandsintown doesn't classify genre
      sourceUrl: e.url || '',
      ticketUrl: (e.offers && e.offers[0] && e.offers[0].url) || '',
      source: 'bandsintown'
    };
  });
}

function fetchTicketmasterEvents_(artistName, cityName) {
  var apiKey = PropertiesService.getScriptProperties().getProperty(TICKETMASTER_API_KEY_PROPERTY);
  if (!apiKey) throw new Error('Script Property ' + TICKETMASTER_API_KEY_PROPERTY + ' is not set. See SETUP.md.');

  var startDate = new Date();
  var endDate = new Date(Date.now() + SEARCH_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  var url = 'https://app.ticketmaster.com/discovery/v2/events.json'
    + '?apikey=' + encodeURIComponent(apiKey)
    + '&keyword=' + encodeURIComponent(artistName)
    + '&city=' + encodeURIComponent(cityName)
    + '&classificationName=music'
    + '&startDateTime=' + toTicketmasterDateTime_(startDate)
    + '&endDateTime=' + toTicketmasterDateTime_(endDate)
    + '&size=20';

  var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  var code = res.getResponseCode();
  if (code !== 200) throw new Error('Ticketmaster ' + code + ': ' + res.getContentText().slice(0, 200));

  var body = JSON.parse(res.getContentText());
  var events = (body._embedded && body._embedded.events) || [];

  return events.map(function (e) {
    var venue = e._embedded && e._embedded.venues && e._embedded.venues[0];
    var classification = e.classifications && e.classifications[0];
    var genres = [
      classification && classification.genre && classification.genre.name,
      classification && classification.subGenre && classification.subGenre.name
    ].filter(function (g) { return g && g.toLowerCase() !== 'undefined'; });

    return {
      artist: artistName,
      venue: venue ? venue.name : '',
      cityText: venue && venue.city ? venue.city.name : '',
      date: e.dates && e.dates.start ? e.dates.start.localDate : '',
      genres: genres,
      sourceUrl: e.url || '',
      ticketUrl: e.url || '',
      source: 'ticketmaster'
    };
  });
}

function toTicketmasterDateTime_(date) {
  return Utilities.formatDate(date, 'UTC', "yyyy-MM-dd'T'HH:mm:ss'Z'");
}

// Publishes the current set of approved events straight to the site's repo
// as a commit, so GitHub's own Pages build picks it up automatically —
// replaces the old public "events-api" project entirely. This is an
// authenticated, server-to-server call (Apps Script -> GitHub REST API), not
// a public endpoint, so none of the Workspace anonymous-access problems
// apply here.
//
// Script Properties this needs:
//   GITHUB_TOKEN   — a fine-grained personal access token scoped to just
//                    this repo, with Contents: Read and write permission.
//   GITHUB_OWNER   — e.g. "Maddymooree"
//   GITHUB_REPO    — e.g. "rally"
//   GITHUB_BRANCH  — e.g. "claude/github-repo-location-brjk8z"

var GITHUB_TOKEN_PROPERTY = 'GITHUB_TOKEN';
var GITHUB_OWNER_PROPERTY = 'GITHUB_OWNER';
var GITHUB_REPO_PROPERTY = 'GITHUB_REPO';
var GITHUB_BRANCH_PROPERTY = 'GITHUB_BRANCH';
var GITHUB_EVENTS_PATH = 'src/app/lib/events-data.json';

function publishEventsToGithub_() {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty(GITHUB_TOKEN_PROPERTY);
  var owner = props.getProperty(GITHUB_OWNER_PROPERTY);
  var repo = props.getProperty(GITHUB_REPO_PROPERTY);
  var branch = props.getProperty(GITHUB_BRANCH_PROPERTY);
  if (!token || !owner || !repo || !branch) {
    throw new Error('GitHub publish is not configured — set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH in Script Properties.');
  }

  var events = readRows_(TAB_EVENTS, EVENT_COLUMNS)
    .filter(function (e) { return e.status === STATUS.APPROVED; })
    .map(formatEventForPublish_)
    .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

  var content = JSON.stringify(events, null, 2) + '\n';
  var apiBase = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + GITHUB_EVENTS_PATH;
  var headers = {
    Authorization: 'Bearer ' + token,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };

  // The Contents API requires the current file's blob SHA to update it.
  var getRes = UrlFetchApp.fetch(apiBase + '?ref=' + encodeURIComponent(branch), {
    headers: headers,
    muteHttpExceptions: true
  });
  var sha = null;
  if (getRes.getResponseCode() === 200) {
    sha = JSON.parse(getRes.getContentText()).sha;
  } else if (getRes.getResponseCode() !== 404) {
    throw new Error('GitHub read failed (' + getRes.getResponseCode() + '): ' + getRes.getContentText().slice(0, 200));
  }

  var payload = {
    message: 'Publish approved events (' + events.length + ' live)',
    content: Utilities.base64Encode(Utilities.newBlob(content).getBytes()),
    branch: branch
  };
  if (sha) payload.sha = sha;

  var putRes = UrlFetchApp.fetch(apiBase, {
    method: 'put',
    headers: headers,
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  if (putRes.getResponseCode() >= 300) {
    throw new Error('GitHub publish failed (' + putRes.getResponseCode() + '): ' + putRes.getContentText().slice(0, 300));
  }
}

// A publish failure shouldn't make an approve/hide/edit action look like it
// failed — the Sheet is still the source of truth and already updated.
// Errors are logged so `adminPublishNow` (a manual retry) can surface them.
function tryPublish_() {
  try {
    publishEventsToGithub_();
  } catch (err) {
    Logger.log('GitHub publish failed: ' + err.message);
  }
}

// Matches the RallyEvent shape in src/app/lib/events.tsx.
function formatEventForPublish_(e) {
  return {
    id: e.id,
    artist: e.artist,
    venue: e.venue,
    city: e.city,
    date: e.date,
    dateLabel: formatDateLabel_(e.date),
    genres: splitList_(e.genres),
    imageUrl: e.image_url || null,
    ticketUrl: e.ticket_url || null,
    featured: isTruthy_(e.featured),
    status: e.status,
    source: e.source,
    sourceId: e.id
  };
}

function formatDateLabel_(iso) {
  if (!iso) return '';
  var d = new Date(iso + 'T00:00:00Z');
  if (isNaN(d.getTime())) return iso;
  return Utilities.formatDate(d, 'UTC', 'MMM d, yyyy').toLowerCase();
}

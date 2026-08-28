# Setting up the event pipeline

This is a one-time manual setup — Apps Script projects aren't something this
repo can deploy for you automatically. Budget about 20 minutes. Everything
here is free (no paid tiers required).

## 1. Create the Sheet

1. Create a new Google Sheet — name it whatever you like (e.g. "rally events").
2. Create three tabs, named **exactly** `Artists`, `Events`, `SearchRuns`
   (case-sensitive — the scripts look them up by name).
3. Paste this as row 1 of `Artists`:
   ```
   id	name	aliases	active	notes	created_at
   ```
4. Paste this as row 1 of `Events`:
   ```
   id	artist	artist_id	venue	city	date	genres	image_url	ticket_url	source	source_url	status	featured	dedupe_key	reviewed_at	reviewed_by	created_at	updated_at
   ```
5. Paste this as row 1 of `SearchRuns`:
   ```
   id	started_at	finished_at	status	artists_searched	events_found	notes
   ```
6. Copy the Sheet's ID out of its URL — the long string between `/d/` and
   `/edit`: `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`.
   You'll paste it into both scripts below.

## 2. Get free API keys

- **Ticketmaster API key** (required): sign up at https://developer.ticketmaster.com/,
  create an app in their console, and copy the Consumer Key. The free tier
  (5,000 calls/day) is far more than this needs. This is the primary source
  and does all the city-scoped searching.
- **Bandsintown app ID** (optional, and likely not available to you):
  Bandsintown's events API is partner-gated now — general signup isn't
  really available anymore. If you happen to have access, it's a nice
  secondary source; if not, just skip it. Leaving `BANDSINTOWN_APP_ID`
  unset in Script Properties makes the search job skip Bandsintown
  entirely rather than fail — Ticketmaster alone is sufficient.

Keep the Ticketmaster key handy for step 4.

## 3. Create the two Apps Script projects

Go to https://script.google.com/home → **New project**, twice — once for
each. Rename each project (top left) so you can tell them apart, e.g.
`rally-admin` and `rally-events-api`.

For **each** project: delete the default empty `Code.gs`, then for every file
in the matching folder here (`google-apps-script/admin/` or
`google-apps-script/events-api/`):
- `.gs` files → File → New → Script file, name it to match (without the
  `.gs` extension — Apps Script adds that itself), paste the contents.
- `.html` files (admin project only) → File → New → HTML file, name it
  `Admin`, paste the contents.
- `appsscript.json` → click the gear icon (Project Settings) → check "Show
  'appsscript.json' manifest file in editor" → open it from the file list →
  replace its contents with the one from this repo.

## 4. Set Script Properties

In **each** project: gear icon (Project Settings) → scroll to **Script
Properties** → add:

**rally-admin:**
| property | value |
|---|---|
| `RALLY_SHEET_ID` | the Sheet ID from step 1.6 |
| `BANDSINTOWN_APP_ID` | from step 2 |
| `TICKETMASTER_API_KEY` | from step 2 |

**rally-events-api:**
| property | value |
|---|---|
| `RALLY_SHEET_ID` | the same Sheet ID |

## 5. Authorize and schedule the search job

In **rally-admin**: open `Admin.gs`, pick `setUpDailyTrigger` from the
function dropdown at the top, click **Run**. Google will show an
"authorization required" prompt, then likely an "unverified app" warning —
that's expected for a script only you use; click **Advanced** → **Go to
rally-admin (unsafe)** → **Allow**. This grants the script access to the
Sheet and to make outside API calls (Bandsintown/Ticketmaster), and sets up
a trigger that runs `runSearchJob` daily at 6am in the project's time zone.
You only need to do this once — re-running it later is safe, it just resets
the schedule.

## 6. Deploy both as Web Apps

**rally-admin** (this becomes your admin page — bookmark it):
1. Deploy → New deployment → gear icon → **Web app**.
2. Execute as: **Me**. Who has access: **Only myself**.
3. Deploy, authorize again if prompted, copy the URL ending in `/exec`.
4. That URL *is* your admin page — nobody else can load it, because Google
   itself is checking that the visitor is logged into your account. There's
   no separate password to remember or lose.

**rally-events-api** (this is what the public site fetches from):
1. Deploy → New deployment → gear icon → **Web app**.
2. Execute as: **Me**. Who has access: **Anyone**.
3. Deploy, copy the `/exec` URL.
4. Sanity-check it directly: visiting `<that URL>?city=miami` in a browser
   should return `[]` (empty array — expected, nothing's approved yet).

## 7. Wire the public URL into the site

Open `src/app/lib/events.tsx` and set:
```ts
export const EVENTS_API_URL = "https://script.google.com/macros/s/.../exec";
```
using the rally-events-api URL from step 6. Commit and push — the "near
you" page will start fetching from it on the next deploy.

**If events don't show up and the browser console shows a CORS error:**
Apps Script web apps generally allow cross-origin `fetch()` for simple GET
requests, but this wasn't tested against a live deployment while building
it. If you hit this, tell me the exact console error and I'll adjust —
likely fix is routing the fetch through a tiny same-origin proxy.

## 8. Try it end-to-end

1. Open your rally-admin URL. Add an artist you know has shows coming up.
2. Click **run search now**. Give it a minute — it's checking 6 cities ×
   however many artists you've added, against two APIs.
3. Switch to the **pending queue** tab — anything found shows up there for
   you to review/edit.
4. Click **approve** on one.
5. Visit the live site's `/near-you` page, pick that event's city — it
   should now appear in the grid.

## Ongoing use

- Add artists any time from the **watchlist** tab; toggle the checkbox to
  pause one without removing it.
- The job re-runs automatically every day at 6am, or click **run search
  now** whenever you want it sooner.
- Review the **pending queue** tab periodically — nothing reaches the public
  site until you click approve.
- The **run log** tab shows the last 20 runs, including any API errors, so a
  quiet week is easy to tell apart from a broken key.

# Setting up the event pipeline

This is a one-time manual setup — Apps Script projects aren't something this
repo can deploy for you automatically. Budget about 20 minutes. Everything
here is free (no paid tiers required).

Only **one** Apps Script project is needed: `google-apps-script/admin/`.
(There's also an `events-api/` folder in this repo — that was an earlier,
abandoned approach; see the note in `SCHEMA.md`. You can ignore it.)

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

## 2. Get free API keys

- **Ticketmaster API key** (required): sign up at https://developer.ticketmaster.com/,
  create an app in their console, and copy the Consumer Key. The free tier
  (5,000 calls/day) is far more than this needs.
- **Bandsintown app ID** (optional, and likely not available to you):
  Bandsintown's events API is partner-gated now. If you don't have access,
  skip it — leaving `BANDSINTOWN_APP_ID` unset makes the search job skip
  Bandsintown entirely rather than fail. Ticketmaster alone is sufficient.

## 3. Get a GitHub personal access token

This is what lets the admin project publish approved events to the site's
repo directly, instead of the site needing to fetch from anywhere public.

1. On GitHub: **Settings → Developer settings → Personal access tokens →
   Fine-grained tokens → Generate new token**.
2. **Repository access**: select "Only select repositories" → choose this
   repo (`rally`).
3. **Permissions → Repository permissions → Contents**: set to **Read and
   write**. Leave everything else at "No access."
4. Generate it, and copy the token — GitHub only shows it once.

## 4. Create the Apps Script project

Go to https://script.google.com/home → **New project**. Rename it (top
left) to something like `rally-admin`.

Delete the default empty `Code.gs`, then for every file in
`google-apps-script/admin/` in this repo:
- `.gs` files → File → New → Script file, name it to match (without the
  `.gs` extension — Apps Script adds that itself), paste the contents.
  Note: the file with `doGet()` in it should be named `Main` (not
  `Admin` — that name is reserved for the HTML file below).
- `Admin.html` → File → New → HTML file, name it `Admin`, paste the contents.
- `appsscript.json` → gear icon (Project Settings) → check "Show
  'appsscript.json' manifest file in editor" → open it from the file list →
  replace its contents with the one from this repo.

## 5. Set Script Properties

Gear icon (Project Settings) → scroll to **Script Properties** → add:

| property | value |
|---|---|
| `RALLY_SHEET_ID` | the Sheet ID from step 1.6 |
| `BANDSINTOWN_APP_ID` | from step 2 (optional — skip if you don't have one) |
| `TICKETMASTER_API_KEY` | from step 2 |
| `GITHUB_TOKEN` | the token from step 3 |
| `GITHUB_OWNER` | the GitHub username/org that owns the repo, e.g. `Maddymooree` |
| `GITHUB_REPO` | the repo name, e.g. `rally` |
| `GITHUB_BRANCH` | the branch the site deploys from, e.g. `claude/github-repo-location-brjk8z` |

## 6. Authorize and schedule the search job

Open `Main.gs`, pick `setUpDailyTrigger` from the function dropdown at the
top, click **Run**. Google will show an "authorization required" prompt,
then likely an "unverified app" warning — that's expected for a script only
you use; click **Advanced** → **Go to rally-admin (unsafe)** → **Allow**.
This grants the script access to the Sheet, to call outside APIs
(Bandsintown/Ticketmaster/GitHub), and sets up a trigger that runs
`runSearchJob` daily at 6am in the project's time zone. You only need to do
this once — re-running it later is safe, it just resets the schedule.

## 7. Deploy as a Web App

1. Deploy → New deployment → gear icon → **Web app**.
2. Execute as: **Me**. Who has access: **Only myself**.
3. Deploy, authorize again if prompted, copy the URL ending in `/exec`.
4. That URL *is* your admin page — nobody else can load it, because Google
   itself checks that the visitor is logged into your account. Bookmark it.

## 8. Try it end-to-end

1. Open your admin URL. Add an artist you know has shows coming up.
2. Click **run search now**. Give it a minute — it's checking 6 cities ×
   however many artists you've added.
3. Switch to the **pending queue** tab — anything found shows up there for
   you to review/edit.
4. Click **approve**. This both marks it live in the Sheet *and* pushes a
   commit to the repo automatically — check the repo's commit history for
   one titled "Publish approved events."
5. Wait a minute or two for GitHub Pages to rebuild, then visit the live
   site's `/near-you` page, pick that event's city — it should appear.

If step 4 doesn't seem to have pushed a commit, go to the **live** tab and
click **publish to site now** — it'll show the exact error (usually a typo
in one of the `GITHUB_*` Script Properties, or the token missing repo
access).

## Ongoing use

- Add artists any time from the **watchlist** tab; toggle the checkbox to
  pause one without removing it.
- The job re-runs automatically every day at 6am, or click **run search
  now** whenever you want it sooner.
- Review the **pending queue** tab periodically — nothing reaches the public
  site until you click approve.
- The **live** tab shows everything currently approved or hidden — edit,
  hide, or unhide from there. Every change there re-publishes automatically.
- The **run log** tab shows the last 20 search runs, including any API
  errors, so a quiet week is easy to tell apart from a broken key.

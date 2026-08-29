# Event pipeline data model

Backing store is one Google Sheet with three tabs. Both Apps Script projects
(`admin/` and `events-api/`) open this same Sheet by ID, so there's only ever
one copy of the data — "approving" an event is just changing its `status`
cell, not moving a row between places.

Column order matters — the scripts read/write by position, not by header
name. If you ever add a column, append it at the end and add a matching
constant in both projects' `Constants.gs`.

## Tab: `Artists` (the watchlist)

| col | field        | type                  | notes                                    |
|-----|--------------|-----------------------|-------------------------------------------|
| A   | id           | text (uuid)           | generated on insert                       |
| B   | name         | text                  | display name, e.g. "Fisher"               |
| C   | aliases      | text, comma-separated | optional spelling variants for matching   |
| D   | active       | TRUE / FALSE          | paused artists are skipped by the search job |
| E   | notes        | text                  | optional, just for your own reference     |
| F   | created_at   | ISO datetime          |                                            |

## Tab: `Events` (pending + live, unified)

| col | field         | type                    | notes |
|-----|---------------|-------------------------|-------|
| A   | id            | text (uuid)             | |
| B   | artist        | text                    | display name |
| C   | artist_id     | text                    | fk → Artists.id, blank for manually-added events |
| D   | venue         | text                    | |
| E   | city          | text                    | one of the slugs below |
| F   | date          | text, `YYYY-MM-DD`      | |
| G   | genres        | text, comma-separated   | e.g. `"edm,house"` — suggested by the job, editable |
| H   | image_url     | text                    | optional |
| I   | ticket_url    | text                    | optional |
| J   | source        | text                    | `"bandsintown"` \| `"ticketmaster"` \| `"manual"` |
| K   | source_url    | text                    | the link you check to verify the listing |
| L   | status        | text                    | `pending` \| `approved` \| `rejected` \| `hidden` |
| M   | featured      | TRUE / FALSE            | |
| N   | dedupe_key    | text                    | generated: `lower(artist)｜lower(venue)｜date` |
| O   | reviewed_at   | ISO datetime            | blank until approved/rejected |
| P   | reviewed_by   | text                    | your Google account email |
| Q   | created_at    | ISO datetime            | |
| R   | updated_at    | ISO datetime            | |

**Dedup rule:** before inserting a new row, the search job computes the same
`dedupe_key` for the candidate and skips it if that key already exists on any
row with status `pending` or `approved`. A `rejected` row's key is *not*
reused as a skip — instead the job logs "previously rejected, skipping" in
the run's error/notes so it doesn't just silently reappear, but also doesn't
get re-inserted as a fresh pending row.

City slugs (must match the React app's `CITIES` in `src/app/lib/events.tsx`):
`dallas`, `houston`, `new-york`, `los-angeles`, `miami`, `chicago`. Adding a
city later means adding it to this list in both places — no schema change.

## Tab: `SearchRuns` (job log, optional but recommended)

| col | field            | type         | notes |
|-----|------------------|--------------|-------|
| A   | id               | text (uuid)  | |
| B   | started_at       | ISO datetime | |
| C   | finished_at      | ISO datetime | blank if still running / crashed |
| D   | status           | text         | `ok` \| `error` |
| E   | artists_searched | number       | |
| F   | events_found     | number       | new pending rows inserted |
| G   | notes            | text         | skipped duplicates, previously-rejected skips, API errors |

## What the public site sees

**Architecture note:** an earlier version of this had a second, public Apps
Script project (`events-api/`) that the site fetched from at runtime. That
project's code is still in this repo for reference but is no longer used —
Google Workspace's anonymous-access restrictions made it unreliable. The
current design (below) is simpler and has no public endpoint at all.

`admin/Github.gs` publishes the approved set straight into the site's repo
as a commit — `src/app/lib/events-data.json` — whenever an event is
approved, hidden, unhidden, or edited while live. The site imports that file
as a static build-time asset (`src/app/lib/events.tsx`), same as any other
data in the codebase. GitHub's own Pages build picks up the commit and
redeploys automatically, same as any other push. Each row is shaped exactly
like the `RallyEvent` type:

```json
[
  {
    "id": "…",
    "artist": "fisher",
    "venue": "the far out lounge",
    "city": "houston",
    "date": "2027-01-31",
    "dateLabel": "jan 31, 2027",
    "genres": ["house", "dj set"],
    "imageUrl": null,
    "ticketUrl": null,
    "featured": false,
    "status": "approved",
    "source": "bandsintown",
    "sourceId": "…"
  }
]
```

`dateLabel` is formatted server-side so there's one source of truth for the
display string.

# Waitlist backend setup

The city-waitlist form (`/near-you`, any "coming soon" city) needs this
deployed before submissions actually save anywhere. Until then, the form
still works in the browser but shows "something went wrong" on submit —
it's not silently failing, it genuinely has nowhere to send data yet.

## 1. Create the Sheet + Apps Script project

1. Go to [sheets.google.com](https://sheets.google.com) and create a new,
   blank spreadsheet. Name it something like "rally waitlist".
2. In that sheet: **Extensions → Apps Script**. This opens a bound Apps
   Script project (bound to this sheet, so it writes here automatically).
3. Delete the default `Code.gs` contents and paste in the contents of
   this repo's `google-apps-script/waitlist/Code.gs`.
4. Click the gear icon (**Project Settings**) → under "Show appsscript.json
   in editor", check the box. A new `appsscript.json` file appears in the
   editor — replace its contents with this repo's
   `google-apps-script/waitlist/appsscript.json`.
5. Save (Ctrl/Cmd+S).

## 2. Deploy as a web app

1. **Deploy → New deployment**.
2. Type: **Web app**.
3. Execute as: **Me**. Who has access: **Anyone**.
4. Click **Deploy**, then authorize it (it's your own script, so this is
   just Google's standard first-run consent screen).
5. Copy the **Web app URL** it gives you — it ends in `/exec`.

## 3. Wire it into the site

Open `src/app/lib/waitlist.ts` and set:

```ts
export const WAITLIST_SUBMIT_URL = "<the /exec URL from step 2>";
```

Commit and push. The waitlist form will start saving real submissions.

## Viewing / exporting submissions

Every signup lands as a row in the "Waitlist" tab of the sheet you
created, with columns: `timestamp | first name | email | city | instagram`.
To see signups for one city, use Sheets' own filter (Data → Create a
filter) on the `city` column. To export, File → Download → CSV — filter
first if you only want one city's rows.

## Re-deploying after editing Code.gs

If you edit `Code.gs` later, existing deployments don't pick up the
change automatically. **Deploy → Manage deployments → edit (pencil icon)
→ New version → Deploy.** The `/exec` URL stays the same.

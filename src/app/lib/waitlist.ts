// Mirrors submit.ts's pattern (a Google Apps Script web app that appends a
// row to a Sheet) but as its own deployment, since the waitlist needs its
// own sheet/dedup logic separate from festival applications. The matching
// Apps Script source lives in google-apps-script/waitlist/ — see its
// SETUP.md.
export const WAITLIST_SUBMIT_URL =
  "https://script.google.com/macros/s/AKfycbygVN_yhbtot8xMYR7qaoPPA30WMDcOCOCRqF_7hfuGzfVL3ADprh1uyVk57CtA44G-Fg/exec";

export interface WaitlistData {
  firstName: string;
  email: string;
  city: string;
  instagram: string;
}

export function submitWaitlist(data: WaitlistData) {
  if (!WAITLIST_SUBMIT_URL) {
    return Promise.reject(new Error("WAITLIST_SUBMIT_URL is not configured yet"));
  }

  return fetch(WAITLIST_SUBMIT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
  });
}

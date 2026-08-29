// Deploy this project as a Web App with "Execute as: Me" and
// "Who has access: Only myself" — see SETUP.md. That access setting is what
// makes this admin-only; nothing in the code itself checks who's asking.

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Admin')
    .setTitle('rally — admin')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ---- functions callable from Admin.html via google.script.run ----

function adminListArtists() { return listArtists(); }
function adminAddArtist(name, aliases, notes) { return addArtist(name, aliases, notes); }
function adminSetArtistActive(id, active) { return setArtistActive(id, active); }
function adminRemoveArtist(id) { return removeArtist(id); }

function adminListPendingEvents() { return listPendingEvents(); }
function adminUpdatePendingEvent(id, fields) { return updatePendingEvent(id, fields); }
function adminApproveEvent(id) { return approveEvent(id); }
function adminRejectEvent(id) { return rejectEvent(id); }
function adminAddManualEvent(fields) { return addManualEvent(fields); }

function adminListManagedEvents() { return listManagedEvents(); }
function adminUpdateLiveEvent(id, fields) { return updateLiveEvent(id, fields); }
function adminHideEvent(id) { return hideEvent(id); }
function adminUnhideEvent(id) { return unhideEvent(id); }

function adminRunSearchNow() { return runSearchJob(); }
function adminListSearchRuns() { return listSearchRuns(); }
function adminListCities() { return CITIES; }

// ---- one-time setup: select this function in the Apps Script editor and
// click Run, once, after you've filled in Script Properties. Re-running it
// is safe — it clears any existing trigger for this function first. ----
function setUpDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'runSearchJob') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('runSearchJob').timeBased().everyDays(1).atHour(6).create();
}

/**
 * Receives city-waitlist signups from the near-you "coming soon" cities
 * (src/app/lib/waitlist.ts -> submitWaitlist) and appends them to a
 * "Waitlist" sheet. Mirrors the pattern of the existing festival-apply
 * endpoint (src/app/lib/submit.ts) but as its own deployment, since this
 * needs its own sheet and its own dedup rule.
 *
 * Sheet columns: timestamp | first name | email | city | instagram
 *
 * Dedup rule: if the same email already has a row for the same city,
 * the request is accepted (so the visitor still sees the success message)
 * but no duplicate row is written.
 */
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var sheet = getOrCreateSheet_();

  var email = String(data.email || "").trim().toLowerCase();
  var city = String(data.city || "").trim().toLowerCase();

  if (!email || !city) {
    return jsonResponse_({ status: "error", message: "email and city are required" });
  }

  if (isDuplicate_(sheet, email, city)) {
    return jsonResponse_({ status: "duplicate" });
  }

  sheet.appendRow([
    new Date().toISOString(),
    data.firstName || "",
    data.email || "",
    data.city || "",
    data.instagram || "",
  ]);

  return jsonResponse_({ status: "ok" });
}

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Waitlist");
  if (!sheet) {
    sheet = ss.insertSheet("Waitlist");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["timestamp", "first name", "email", "city", "instagram"]);
  }
  return sheet;
}

function isDuplicate_(sheet, email, city) {
  var rows = sheet.getDataRange().getValues();
  // row[0]=timestamp, row[1]=first name, row[2]=email, row[3]=city, row[4]=instagram
  for (var i = 1; i < rows.length; i++) {
    var rowEmail = String(rows[i][2]).trim().toLowerCase();
    var rowCity = String(rows[i][3]).trim().toLowerCase();
    if (rowEmail === email && rowCity === city) {
      return true;
    }
  }
  return false;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

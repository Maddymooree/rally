// Read-only on purpose — this whole project has no append/update/delete
// helpers at all, so there is no code path that could mutate the Sheet no
// matter what request reaches it.

function getSheet_(tabName) {
  var sheetId = PropertiesService.getScriptProperties().getProperty(SHEET_ID_PROPERTY);
  if (!sheetId) throw new Error('Script Property ' + SHEET_ID_PROPERTY + ' is not set.');
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) throw new Error('Sheet tab "' + tabName + '" not found.');
  return sheet;
}

function readRows_(tabName, columns) {
  var sheet = getSheet_(tabName);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var values = sheet.getRange(2, 1, lastRow - 1, columns.length).getValues();
  return values
    .map(function (row) {
      var obj = {};
      columns.forEach(function (col, idx) { obj[col] = row[idx]; });
      return obj;
    })
    .filter(function (obj) {
      return columns.some(function (col) { return obj[col] !== '' && obj[col] !== undefined; });
    });
}

function splitList_(value) {
  if (!value) return [];
  return String(value).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
}

function isTruthy_(value) {
  return value === true || value === 'TRUE' || value === 'true';
}

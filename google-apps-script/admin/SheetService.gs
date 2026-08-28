// Thin, generic helpers over the Sheet. Everything else in this project reads
// and writes through these — nothing else touches SpreadsheetApp directly.

function getSheet_(tabName) {
  var sheetId = PropertiesService.getScriptProperties().getProperty(SHEET_ID_PROPERTY);
  if (!sheetId) throw new Error('Script Property ' + SHEET_ID_PROPERTY + ' is not set. See SETUP.md.');
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) throw new Error('Sheet tab "' + tabName + '" not found — check the tab name matches SCHEMA.md exactly.');
  return sheet;
}

// Reads all data rows (below the header) as plain objects keyed by `columns`,
// each tagged with its 1-indexed sheet row number as `_row` so callers can
// write back to the exact row without re-scanning.
function readRows_(tabName, columns) {
  var sheet = getSheet_(tabName);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var values = sheet.getRange(2, 1, lastRow - 1, columns.length).getValues();
  return values
    .map(function (row, i) {
      var obj = { _row: i + 2 };
      columns.forEach(function (col, idx) { obj[col] = row[idx]; });
      return obj;
    })
    // A row is "empty" once every mapped cell is blank — skip it rather than
    // treating it as real data (guards against stray blank rows in the tab).
    .filter(function (obj) {
      return columns.some(function (col) { return obj[col] !== '' && obj[col] !== undefined; });
    });
}

function appendRow_(tabName, columns, obj) {
  var sheet = getSheet_(tabName);
  var row = columns.map(function (col) { return obj[col] !== undefined ? obj[col] : ''; });
  sheet.appendRow(row);
}

function updateRow_(tabName, columns, rowIndex, obj) {
  var sheet = getSheet_(tabName);
  var row = columns.map(function (col) { return obj[col] !== undefined ? obj[col] : ''; });
  sheet.getRange(rowIndex, 1, 1, columns.length).setValues([row]);
}

function deleteRow_(tabName, rowIndex) {
  getSheet_(tabName).deleteRow(rowIndex);
}

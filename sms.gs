const SHEET_URL = 'YOUR_GOOGLE_SHEET_URL';
const SHEET_NAME = 'SMS';

const doGet = () => {
  const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_NAME);
  const [header, ...data] = sheet.getDataRange().getDisplayValues();

  const PHONE = header.indexOf('Phone');
  const TEXT = header.indexOf('Text');
  const STATUS = header.indexOf('Status');

  const output = [];

  data.forEach((row, index) => {
    if (row[STATUS] === '') {
      output.push([index + 1, row[PHONE], row[TEXT]]);
    }
  });

  const json = JSON.stringify(output);

  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.TEXT);
};

const doPost = (e) => {
  const sheet = SpreadsheetApp.openByUrl(SHEET_URL).getSheetByName(SHEET_NAME);
  const [header] = sheet.getRange('A1:1').getValues();
  const STATUS = header.indexOf('Status');
  var rowId = Number(e.parameter.row);
  sheet.getRange(rowId + 1, STATUS + 1).setValue('SMS Sent');
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
};

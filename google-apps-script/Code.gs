/**
 * QueueCap — Contact Inquiry → Google Sheets Web App
 *
 * Deployment:
 * 1. Create a Google Sheet (or open an existing one). Copy its ID from the
 *    URL: https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit
 * 2. Extensions → Apps Script. Replace the default Code.gs contents with this file.
 * 3. Set SPREADSHEET_ID and SECRET below. SECRET must match the
 *    GOOGLE_SHEETS_SECRET environment variable used by the Next.js app.
 * 4. Deploy → New deployment → type "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment's Web App URL into GOOGLE_SHEETS_WEBHOOK_URL.
 * 6. After any code change: Deploy → Manage deployments → edit (pencil) the
 *    existing deployment → Version: New version → Deploy. This keeps the
 *    same URL. ("New deployment" instead would give you a different URL.)
 *
 * Note: SpreadsheetApp.getActiveSpreadsheet() does NOT work here — it
 * requires an active UI session, which a Web App HTTP request doesn't have,
 * even for a script bound to this sheet. openById() is the correct call.
 */

const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SPREADSHEET_ID";
const SHEET_NAME = "Inquiries";
const SECRET = "REPLACE_WITH_A_LONG_RANDOM_SECRET";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (SECRET && data.secret !== SECRET) {
      return jsonResponse({ status: "error", message: "Unauthorized" });
    }

    const sheet = getOrCreateSheet();

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || "",
      data.phone || "",
      data.email || "",
      data.eventType || "",
      data.budget || "",
      data.message || "",
      data.status || "New",
      data.source || "Website",
    ]);

    return jsonResponse({ status: "success" });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.message });
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Full Name",
      "Phone",
      "Email",
      "Event Type",
      "Budget",
      "Message",
      "Status",
      "Source",
    ]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

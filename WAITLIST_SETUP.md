# Waitlist Google Sheet setup

The coming soon page collects email addresses and writes them to a Google Sheet
via a Google Apps Script web app.

## Steps

1. **Create a Google Sheet** (any Google account).
   Name it "Samay Waitlist" or similar. The first sheet will be used.
   Add headers in row 1: `Timestamp | Email`

2. **Open Extensions > Apps Script** from the sheet.

3. **Replace the default code** with:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var data = JSON.parse(e.postData.contents)
  if (data.email) {
    sheet.appendRow([new Date(), data.email])
  }
  return ContentService.createTextOutput(
    JSON.stringify({ result: 'success' })
  ).setMimeType(ContentService.MimeType.JSON)
}
```

4. **Deploy > New deployment**
   - Type: Web app
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy, authorize when prompted

5. **Copy the web app URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`)

6. **Create `.env.local`** in `samay-website/`:

```
VITE_WAITLIST_URL=https://script.google.com/macros/s/AKfycb.../exec
```

7. **Restart the dev server** (`npm run dev`). The form now writes to the sheet.

For production: add the same env var in the GitHub repo's deployment settings
(Vercel environment variables, or wherever samayapp.co deploys from).

## How it works

The form POSTs `{ email }` as JSON to the Apps Script URL using `mode: 'no-cors'`.
The script appends a row with timestamp and email. The `no-cors` mode means we
cannot read the response, so the UI shows success optimistically. If the request
fails entirely (network error), it shows an error with a fallback email address.

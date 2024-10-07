const express = require("express");

const {google} = require("googleapis");
const { spreadsheetIdTEST } = require('./const')
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const app = express();

const PORT = process.env.PORT ?? 3000;


app.get("/pollo", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "service-account-test.json",
        scopes: SCOPES
    });
   // Create client instance for auth
    const client = await auth.getClient();
    console.log('---client:', client);

    // Instance of Google Sheets API
    const googleSheets = google.sheets({version: 'v4', auth: client});

    // Get metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: spreadsheetIdTEST 
    });
    console.log('---metadata:', metadata);

    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: spreadsheetIdTEST,
        range: "Sheet1!A:B"
    });
    console.log('---getData:', getRows);

    // Write row(s) to spreadsheet
/*    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: spreadsheetIdTEST,
        range: "Sheet1!A:B",
        valueInputOption: "USER_ENTERED", // or RAW
        resource: {
            values: [
               [ "Reserva para: ", "Pollo"],
               [ "Reserva para:", "Osos"]
            ]
        }
    }) */

    // update?
/*     await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: spreadsheetIdTEST,
        range: "Sheet1!A2",
        valueInputOption: "USER_ENTERED", // or RAW
        resource: {
            values: [
               [ "Pollo"]
            ]
        }
    }); */
    console.log('---getRows:', getRows.data);
    res.status(200).json({resultado:  getRows})  
});

/*
// FUNCIONA A MEDIAS
const auth = new google.auth.GoogleAuth({
    keyFile: './service-account-test.json',
    scopes: SCOPES
});

async function writeToSheet(values) {
    const sheets = google.sheets({version: 'v4', auth});
    const range = 'Sheet1!A1:A2';
    const valueInputOption= 'USER_ENTERED';
    const resource = {values}

    try {
        const res = await sheets.spreadsheets.values.update({
            spreadsheetId: spreadsheetIdTEST, range, valueInputOption, resource
        });
        console.log('--writeToSheet res: ', res);
        return res;
    } catch(error) {
        console.log('--writeToSheet error:', error)
    }
}

(async()=> {
    const writer = await writeToSheet([['Name, age'], ['Pollo', 13]]);
    console.log('--writeToSheet writer:', writer)
})();
*/

// app.set("view engine", "ejs");
/*
app.get("/", (req, res) => {
    res.send("holi start")
})

app.get("/google", async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: SCOPES
    });
    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    // Get metadata about spreadsheet
     const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    });
    console.log('-metadata:', metadata)
    res.send(metadata)
});

*/
app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
});

const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();

const PORT = process.env.PORT ?? 3000;

// mongoDB
const password = encodeURIComponent("admin");
const uri = `mongodb+srv://estrella:${password}@cluster0.vuvof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const DATABASE_NAME = "ESPACIO_INTERIOR_DEV";
const RESERVATION_COLLECTION = "reservations";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const database = client.db(DATABASE_NAME);

const collection = database.collection(RESERVATION_COLLECTION);

/* 
// Revisar que 
async function run() {
  try {
    const db = client.db("myDB");
    const myColl = db.collection("myColl");
    const doc = await myColl.findOne({});
    console.log('.----dioc:', doc);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);  */

app.get('/year/:year/:month/:day', async(req, res) => {
  const { params } = req
  const { year, month, day } = params;
  console.log('--PPARAMS:', params)
  const getData =  await collection.findOne({});
/*   const year = 2024;
  const month = 'january';
  const day = 13; */
  const office = 'cedro-SI-01';
  const keyParam = `years.${year}.${month}.${day}.${office}`;
  const objParam = {}
  // const filter= { "years.2024.january.13.cedro-SI-01": { "$exists": true } }

  objParam[keyParam] = { "$exists": true };
  // const filter = { keyParam : { "$exists": true } }
  console.log('----objParam', objParam)

  // const getInfo = await collection.find(filter).toArray();
  const getInfo = await collection.find(objParam).toArray();

  console.log('----getInfo', getInfo)
  res.status(200).json({
    'getInfo': getInfo,
  })  
});


// first: Select a day



app.listen(PORT, () => {
    console.log('Server running on port:', PORT)
});
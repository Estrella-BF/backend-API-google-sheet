const { connect } = require('mongoose');
const { MongoClient, ServerApiVersion } = require("mongodb");

const password = encodeURIComponent("admin");
const uri = `mongodb+srv://estrella:${password}@cluster0.vuvof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
/* const connectDB = async () => {
  try {
    // mongodb connection
    const con = mongoose.connect(uri);

    console.log('Mongodb connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}; 
module.exports = connectDB;
*/

/* const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("ESPACIO_INTERIOR_DEV").command({ ping: 1 });
    console.log("2Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = client; */

(
    async() => {
        try {
            return await connect(uri);
            console.log('-- DB connected:', db.connection.name)
        } catch( error ) {
            console.log('--error: ', error)
        }
    }
)();
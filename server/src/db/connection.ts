// import { MongoClient } from "mongodb";
// // Connection URI
// const uri =
//   "mongodb://localhost:27017/?writeConcern=majority";
// // Create a new MongoClient
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// const db = client.db("EventoCerto");
// export default db;

import mongoose from "mongoose"
export function connectMongoose() {
    mongoose.connect("mongodb://localhost:27017/EventoCerto?writeConcern=majority");
}




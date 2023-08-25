import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

async function connectToDatabase() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await client.connect();
    console.log("Connected to MongoDB Atlas");
    return client.db("sample_training");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
}

const db = await connectToDatabase();

export default db;

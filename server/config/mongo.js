import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");
let db;

export async function mongoConnect() {
  await client.connect();
  db = client.db("scraping_db");
  console.log("✅ Conectado a MongoDB");
}

export function getDb() {
  return db;
}

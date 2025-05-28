const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const jsonFolder = "./scraped_pages"; // cambia por tu ruta

async function run() {
  try {
    await client.connect();
    const db = client.db("scraping_db");
    const collection = db.collection("scraped_pages");

    const files = fs.readdirSync(jsonFolder);

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(jsonFolder, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const data = JSON.parse(content);

        if (Array.isArray(data)) {
          await collection.insertMany(data);
        } else {
          await collection.insertOne(data);
        }

        console.log(`✅ Insertado: ${file}`);
      }
    }

    console.log("🎉 Todos los archivos fueron insertados correctamente.");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

run();

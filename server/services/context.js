// 📁 services/context.js
import { getDb } from "../config/mongo.js";
import { cosineSimilarity } from "../utils/similarity.js";
import { generarEmbedding } from "./openai.js";

export async function buscarContexto(pregunta, topK = 5) {
  const preguntaEmb = await generarEmbedding(pregunta);
  if (!preguntaEmb) return "";

  const docs = await getDb().collection("scraped_pages").find({ embedding: { $exists: true } }).toArray();

  return docs
    .map((doc) => ({
      text: doc.text,
      score: cosineSimilarity(preguntaEmb, doc.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((d) => d.text)
    .join("\n\n");
}
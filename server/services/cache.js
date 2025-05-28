import { getDb } from "../config/mongo.js";

export async function buscarCache(pregunta) {
  return await getDb().collection("chat_cache").findOne({
    pregunta: pregunta.trim().toLowerCase(),
  });
}

export async function guardarCache(pregunta, respuesta, contexto) {
  await getDb().collection("chat_cache").insertOne({
    pregunta: pregunta.trim().toLowerCase(),
    respuesta,
    contexto,
    timestamp: new Date(),
  });
}

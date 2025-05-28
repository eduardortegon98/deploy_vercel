import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
console.log("🔑 Clave OpenAI:", process.env.OPENAI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generarEmbedding(text) {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
}

export async function generarRespuesta(pregunta, contexto) {
  const chat = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          `Eres Naser Bot, un asesor comercial. Solo responde basándote en el siguiente contexto:\n${contexto}\n\nSi no sabes la respuesta, di: \"No tengo respuesta para eso.\"`,
      },
      { role: "user", content: pregunta },
    ],
    max_tokens: 250,
    temperature: 0.5,
  });
  return chat.choices[0].message.content;
}

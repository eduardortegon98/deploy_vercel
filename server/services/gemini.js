// 📁 services/gemini.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

// Usar configuración por defecto (v1beta)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generarRespuestaGemini(pregunta, contexto = "") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // ✅ modelo disponible en v1beta

    const prompt = contexto
      ? `Usa solo el siguiente contexto para responder. Si no puedes responder con esta información, di: "No tengo respuesta para eso."

Contexto:
${contexto}

Pregunta: ${pregunta}`
      : `Pregunta: ${pregunta}`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("❌ Error en Gemini API:", error.message);
    return "No puedo responder en este momento. Intenta más tarde.";
  }
}

export async function generarEmbeddingGemini(texto) {
  try {
    const model = genAI.getGenerativeModel({ model: "embedding-001" }); // también sin 'models/'
    const result = await model.embedContent({
      content: {
        parts: [{ text: texto }],
      },
      taskType: "RETRIEVAL_QUERY",
    });
    return result.embedding.values;
  } catch (error) {
    console.error("❌ Error generando embedding con Gemini:", error.message);
    return null;
  }
}

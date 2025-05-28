import express from "express";
import { buscarIntent } from "../services/intents.js";
import { buscarCache, guardarCache } from "../services/cache.js";
import { buscarContexto } from "../services/context.js";
import { generarRespuesta } from "../services/openai.js";
// import { generarRespuestaGemini } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { pregunta } = req.body;
  try {
    const intent = buscarIntent(pregunta);
    if (intent) return res.json({ respuesta: intent });

    const cache = await buscarCache(pregunta);
    if (cache) return res.json({ respuesta: cache.respuesta });

    const contexto = await buscarContexto(pregunta);
    const respuesta = await generarRespuesta(pregunta, contexto);
    await guardarCache(pregunta, respuesta, contexto);

    res.json({ respuesta });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ respuesta: "Ocurrió un error." });
  }
});

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect } from "./config/mongo.js";
import chatbotRoutes from "./routes/chatbot.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

await mongoConnect(); // Conexión a Mongo
app.use("/api/chatbot", chatbotRoutes); // Ruta principal del bot

app.listen(3001, () => console.log("✅ Servidor en http://localhost:3001"));

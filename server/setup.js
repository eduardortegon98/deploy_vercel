// 📦 MÓDULO 1: SETUP Y DEPENDENCIAS
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import express from "express";
import cors from "cors";
import fs from "fs";
import { MongoClient } from "mongodb";
import { cosineSimilarity } from "./utils/similarity.js";

// 🔐 CONFIG
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const mongoUri = "mongodb://localhost:27017";
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
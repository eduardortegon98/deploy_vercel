import fs from "fs";
const intents = JSON.parse(fs.readFileSync("./server/intents.json", "utf8"));

export function buscarIntent(pregunta) {
  const norm = pregunta.trim().toLowerCase();
  for (const intent of intents.intents) {
    for (const pattern of intent.patterns) {
      if (norm.includes(pattern.toLowerCase())) return intent.response;
    }
  }
  return null;
}

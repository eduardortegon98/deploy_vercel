import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function ChatbotContainer() {
  const [mensajes, setMensajes] = useState([]);
  const [pregunta, setPregunta] = useState("");
  const [mensajeInicialMostrado, setMensajeInicialMostrado] = useState(false);
  const [vozActiva, setVozActiva] = useState(true);
  const [visible, setVisible] = useState(true);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const cancelSpeak = () => {
    speechSynthesis.cancel();
  };

  const toggleSpeak = () => {
    setVozActiva(!vozActiva);
    cancelSpeak();
  };

  const enviarPregunta = async () => {
    if (!pregunta.trim()) return;

    setMensajes((prev) => [...prev, { tipo: "pregunta", texto: pregunta }]);

    try {
      const res = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta }),
      });

      const data = await res.json();
      const respuesta = data.respuesta;

      setMensajes((prev) => [...prev, { tipo: "respuesta", texto: respuesta }]);

      if (vozActiva) speak(respuesta);
    } catch (error) {
      console.error("Error:", error);
      setMensajes((prev) => [
        ...prev,
        { tipo: "respuesta", texto: "Hubo un error al obtener respuesta." },
      ]);
    }

    setPregunta("");
  };

  const enviarImagen = async (imagen) => {
    const imageUrl = URL.createObjectURL(imagen);

    setMensajes((prev) => [
      ...prev,
      { tipo: "pregunta", texto: "Imagen enviada", imagen: imageUrl },
    ]);

    const formData = new FormData();
    formData.append("image", imagen);

    try {
      const res = await fetch("http://localhost:3001/api/chatbot/image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const respuesta = data.respuesta;

      setMensajes((prev) => [...prev, { tipo: "respuesta", texto: respuesta }]);

      if (vozActiva) speak(respuesta);
    } catch (error) {
      console.error("Error al enviar imagen:", error);
      setMensajes((prev) => [
        ...prev,
        { tipo: "respuesta", texto: "Error al procesar la imagen." },
      ]);
    }
  };

  useEffect(() => {
    if (!mensajeInicialMostrado) {
      setMensajeInicialMostrado(true);
      setMensajes([
        {
          tipo: "respuesta",
          texto:
            "Hola, Soy Nassenze, tu asistente virtual de experiencias en Naser y marketing sensorial. ¿En qué puedo ayudarte?",
        },
      ]);
    }
  }, []);

  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed bottom-0 left-0 right-0 mx-auto flex flex-col w-full max-w-[400px] bg-white/90 rounded-[30px] shadow-xl border border-gray-300 sm:right-[109px] sm:left-auto transition-all duration-500 ${
        visible ? "h-[60vh] sm:h-[546px] gap-4" : "h-auto"
      }`}
    >
      {/* Siempre visible */}
      <ChatHeader
        toggleSpeak={toggleSpeak}
        vozActiva={vozActiva}
        clearMessages={() => setMensajes([])}
        onHeaderClick={() => setVisible((prev) => !prev)}
      />

      {/* Solo visible cuando está abierto */}
      <div
        className={`flex flex-col flex-1 transition-all duration-500 ${
          !visible ? "hidden" : "flex"
        }`}
      >
        <ChatMessages mensajes={mensajes} />
        <ChatInput
          pregunta={pregunta}
          setPregunta={setPregunta}
          enviarPregunta={enviarPregunta}
          enviarImagen={enviarImagen}
        />
      </div>
    </motion.div>
  );
}

export default ChatbotContainer;

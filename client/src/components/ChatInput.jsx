import { useRef } from "react";

function ChatInput({ pregunta, setPregunta, enviarPregunta, enviarImagen }) {
  const fileInputRef = useRef();

  return (
    <div className="flex flex-col sm:flex-row items-center mx-auto justify-start w-full gap-4 sm:gap-8 bg-[#00A9C5] px-6 sm:px-[35px] pt-4 pb-2 sm:pt-[20px] sm:pb-[8px] rounded-[30px]">
      <input
        type="text"
        placeholder="Escribe tu mensaje"
        value={pregunta}
        onChange={(e) => setPregunta(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && pregunta.trim() !== "") enviarPregunta();
        }}
        className="p-4 sm:p-6 w-full border border-[#6EC1E4] focus:outline-none rounded-[30px] bg-[#E7EDFB]"
      />

      {/* Botón para seleccionar imagen */}
      <img
        className="size-12 sm:size-[58px] cursor-pointer"
        src="/assets/mas.png"
        alt="Adjuntar imagen"
        onClick={() => fileInputRef.current.click()}
      />
      
      {/* Input oculto para archivos */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) enviarImagen(file);
        }}
      />
    </div>
  );
}

export default ChatInput;

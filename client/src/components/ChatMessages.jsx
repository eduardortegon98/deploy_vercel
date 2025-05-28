function ChatMessages({ mensajes }) {
  return (
    <div className="w-full h-[80%] bg-white rounded-lg overflow-y-auto p-4 space-y-2 flex flex-col ">
      {mensajes.map((msg, index) => (
        <div
          key={index}
          className={`flex items-start ${
            msg.tipo === "pregunta" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.tipo !== "pregunta" && (
            <img
              src="./assets/naser_logo.png"
              alt=""
              className="size-8 sm:size-10 mr-2 rounded-full"
            />
          )}

          <div
            className={`p-3 rounded-lg text-sm sm:text-md font-regular max-w-[80%] break-words ${
              msg.tipo === "pregunta"
                ? "bg-gray-200/80 text-right"
                : "bg-[#00A9C5] text-left text-white"
            }`}
          >
            {msg.imagen && (
              <img
                src={msg.imagen}
                alt="Imagen enviada"
                className="rounded-lg mb-2 max-w-full max-h-[200px] object-contain"
              />
            )}
            <p>{msg.texto}</p>
          </div>

          {msg.tipo === "pregunta" && (
            <img
              src="./assets/visitante.png"
              alt=""
              className="size-8 sm:size-10 ml-2 rounded-full"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;

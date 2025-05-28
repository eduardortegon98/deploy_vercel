function ChatHeader({ toggleSpeak, vozActiva, clearMessages, onHeaderClick, desplazado }) {
  const handleClick = (e) => {
    const tag = e.target.tagName;
    if (tag !== "IMG" && tag !== "P") {
      onHeaderClick?.();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-full bg-[#00A9C5] flex flex-wrap items-center justify-between rounded-[30px] p-[8px] transition-all duration-500 ${
        desplazado ? "mt-auto sm:mt-[456px]" : ""
      }`}
    >
      <img
        className="size-14 sm:size-[64px]"
        src="/assets/naser_logo.png"
        alt="Logo"
      />
      <p className="text-white font-bold text-xl sm:text-2xl">Naser Bot</p>
      <div className="flex gap-2 sm:gap-0 mt-2 sm:mt-0">
        <img
          className="size-10 sm:size-[2.688rem] cursor-pointer"
          src="/assets/whatsApp.png"
          alt="WhatsApp"
        />
        <img
          className="size-10 sm:size-[2.688rem] cursor-pointer"
          src="/assets/sound.png"
          alt="Sound"
          onClick={(e) => {
            e.stopPropagation();
            toggleSpeak();
          }}
        />
        <img
          className="size-10 sm:size-[2.688rem] cursor-pointer"
          src="/assets/basura.png"
          alt="Borrar"
          onClick={(e) => {
            e.stopPropagation();
            clearMessages();
          }}
        />
      </div>
    </div>
  );
}

export default ChatHeader;


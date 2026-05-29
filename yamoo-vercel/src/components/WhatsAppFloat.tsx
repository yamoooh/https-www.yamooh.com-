const WhatsAppFloat = () => {
  const message = encodeURIComponent("Bonjour Yamooh 👋, je souhaite passer une commande.");
  return (
    <a
      href={`https://wa.me/237658254509?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Commander via WhatsApp"
      style={{ position: "fixed", bottom: 24, right: 20, zIndex: 9999, background: "#25D366", borderRadius: "50%" }}
      className="w-14 h-14 flex items-center justify-center shadow-elevated hover:scale-105 transition-transform animate-whatsapp-pulse"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path fill="#FFFFFF" d="M16.001 3C9.373 3 4 8.373 4 15c0 2.385.69 4.61 1.882 6.49L4 29l7.71-1.838A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.6c-1.93 0-3.73-.55-5.247-1.5l-.376-.227-4.578 1.09 1.108-4.46-.245-.388A9.55 9.55 0 0 1 6.4 15c0-5.293 4.308-9.6 9.601-9.6 5.293 0 9.6 4.307 9.6 9.6s-4.307 9.6-9.6 9.6zm5.51-7.18c-.302-.151-1.79-.882-2.067-.983-.277-.1-.479-.151-.68.151-.202.302-.78.983-.956 1.184-.176.202-.352.227-.654.076-.302-.151-1.276-.47-2.43-1.5-.898-.8-1.504-1.787-1.68-2.09-.176-.302-.019-.466.132-.617.135-.135.302-.352.453-.528.151-.176.202-.302.302-.504.1-.202.05-.378-.025-.529-.076-.151-.68-1.638-.932-2.243-.245-.587-.494-.507-.68-.517l-.58-.01c-.202 0-.529.076-.806.378-.277.302-1.06 1.034-1.06 2.521 0 1.487 1.085 2.923 1.236 3.125.151.202 2.136 3.263 5.176 4.575.724.313 1.288.5 1.728.64.726.231 1.387.198 1.91.12.582-.087 1.79-.732 2.043-1.439.252-.706.252-1.31.176-1.439-.075-.126-.277-.202-.579-.353z"/>
      </svg>
    </a>
  );
};

export default WhatsAppFloat;

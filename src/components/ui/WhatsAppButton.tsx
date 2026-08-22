import Link from "next/link";

const WA_NUMBER = "5492645085444"; // +54 9 2645 08-5444

export function getWALink(mensaje?: string) {
  const texto = mensaje
    ? encodeURIComponent(mensaje)
    : encodeURIComponent("Hola! Vi su catálogo en Artyom y quería consultar.");
  return `https://wa.me/${WA_NUMBER}?text=${texto}`;
}

export default function WhatsAppButton() {
  return (
    <Link
      href={getWALink()}
      target="_blank"
      rel="noopener noreferrer"
      id="whatsapp-float-btn"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{
        width: 58,
        height: 58,
        background: "#25D366",
        boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
      }}
    >
      {/* Ícono WhatsApp SVG oficial */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
      >
        <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.364.641 4.663 1.856 6.674L2.667 29.333l6.845-1.796A13.265 13.265 0 0016.003 29.333C23.37 29.333 29.333 23.363 29.333 16S23.37 2.667 16.003 2.667zm0 24.266a11.2 11.2 0 01-5.697-1.555l-.41-.242-4.063 1.065 1.085-3.958-.267-.42A11.2 11.2 0 014.8 16c0-6.178 5.025-11.2 11.203-11.2S27.2 9.822 27.2 16s-5.02 11.2-11.197 11.2zm6.154-8.39c-.338-.169-1.995-.984-2.305-1.097-.31-.113-.536-.169-.761.168-.225.338-.872 1.097-1.069 1.322-.197.225-.394.254-.732.085-.338-.169-1.427-.526-2.718-1.677-1.004-.894-1.681-1.998-1.877-2.336-.197-.338-.021-.521.148-.689.152-.151.338-.394.507-.591.169-.197.225-.338.338-.563.113-.225.057-.422-.028-.591-.085-.169-.761-1.835-1.043-2.513-.274-.661-.553-.571-.761-.581l-.648-.011c-.225 0-.591.084-.9.422-.31.338-1.183 1.155-1.183 2.818s1.211 3.267 1.38 3.492c.169.225 2.385 3.641 5.778 5.108.808.349 1.438.557 1.93.714.811.258 1.549.221 2.132.134.65-.097 1.995-.816 2.277-1.604.282-.788.282-1.464.197-1.604-.084-.141-.31-.225-.648-.394z" />
      </svg>
    </Link>
  );
}

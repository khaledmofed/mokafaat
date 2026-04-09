import { useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useIsRTL } from "@hooks";
import { useAppConfig } from "@hooks/api/useMokafaatQueries";

function toWhatsAppLink(raw: string): string {
  const digits = String(raw ?? "").replace(/[^\d]/g, "");
  if (!digits) return "";
  return `https://wa.me/${digits}`;
}

const WhatsAppButton = () => {
  const isRTL = useIsRTL();
  const { data: appConfig } = useAppConfig() as {
    data?: { data?: { config?: { contact?: { whatsapp?: string } } } };
  };

  const whatsappRaw =
    appConfig?.data?.config?.contact?.whatsapp ??
    appConfig?.data?.data?.config?.contact?.whatsapp ??
    "";

  const href = useMemo(() => toWhatsAppLink(whatsappRaw), [whatsappRaw]);
  if (!href) return null;

  // opposite side of ScrollToTopButton
  const sideClass = isRTL ? "right-10" : "left-10";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed z-20 p-4 bottom-10 ${sideClass} bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-300`}
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="text-xl" />
    </a>
  );
};

export default WhatsAppButton;


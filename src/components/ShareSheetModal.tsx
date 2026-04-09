import { useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { FaWhatsapp, FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiCopy, FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useIsRTL } from "@hooks";

function buildShareUrl(provider: string, url: string, text?: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text ?? "");
  switch (provider) {
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent(
        text ? `${text}\n${url}` : url,
      )}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "x":
      return `https://twitter.com/intent/tweet?url=${u}${text ? `&text=${t}` : ""}`;
    case "telegram":
      return `https://t.me/share/url?url=${u}${text ? `&text=${t}` : ""}`;
    default:
      return url;
  }
}

export default function ShareSheetModal(props: {
  open: boolean;
  onClose: () => void;
  title?: string;
  url: string;
  text?: string;
}) {
  const isRTL = useIsRTL();
  const { open, onClose, title, url, text } = props;

  const fullText = text?.trim()
    ? text.trim()
    : title?.trim()
      ? title.trim()
      : isRTL
        ? "مشاركة"
        : "Share";

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard?.writeText(url);
      toast.success(isRTL ? "تم نسخ الرابط" : "Link copied");
    } catch {
      toast.error(isRTL ? "تعذر نسخ الرابط" : "Unable to copy link");
    }
  }, [url, isRTL]);

  const systemShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: title ?? fullText, text: fullText, url });
        return;
      }
    } catch {
      // ignore and fallback
    }
    await copyLink();
  }, [copyLink, fullText, title, url]);

  const openProvider = (provider: "whatsapp" | "facebook" | "x" | "telegram") => {
    const link = buildShareUrl(provider, url, fullText);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-md rounded-2xl bg-white shadow-2xl z-[9999] overflow-hidden"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="min-w-0">
            <div className="text-base font-bold text-gray-900 truncate">
              {isRTL ? "مشاركة" : "Share"}
            </div>
            {title && (
              <div className="text-sm text-gray-500 truncate">{title}</div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            aria-label={isRTL ? "إغلاق" : "Close"}
          >
            <IoMdClose className="text-xl text-gray-700" />
          </button>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-4 gap-3">
            <button
              type="button"
              onClick={systemShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-[#400198]/10 flex items-center justify-center text-[#400198]">
                <FiShare2 />
              </div>
              <span className="text-xs font-semibold text-gray-700">
                {isRTL ? "مشاركة" : "Share"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => openProvider("whatsapp")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                <FaWhatsapp />
              </div>
              <span className="text-xs font-semibold text-gray-700">
                WhatsApp
              </span>
            </button>

            <button
              type="button"
              onClick={() => openProvider("facebook")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <FaFacebookF />
              </div>
              <span className="text-xs font-semibold text-gray-700">
                Facebook
              </span>
            </button>

            <button
              type="button"
              onClick={() => openProvider("x")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-900">
                <FaXTwitter />
              </div>
              <span className="text-xs font-semibold text-gray-700">X</span>
            </button>

            <button
              type="button"
              onClick={() => openProvider("telegram")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700">
                <FaTelegramPlane />
              </div>
              <span className="text-xs font-semibold text-gray-700">
                Telegram
              </span>
            </button>

            <button
              type="button"
              onClick={copyLink}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                <FiCopy />
              </div>
              <span className="text-xs font-semibold text-gray-700">
                {isRTL ? "نسخ الرابط" : "Copy link"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}


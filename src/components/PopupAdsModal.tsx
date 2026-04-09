import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useWebPopupAds } from "@hooks/api/useMokafaatQueries";

type PopupAd = {
  id: number;
  title: string;
  image: string;
  link_type?: string | null;
  link_id?: number | null;
  link_url?: string | null;
  target_screen?: string | null; // "all" | "home" | ...
  show_once?: boolean | null;
  display_frequency?: string | null; // every_visit | ...
  display_interval_hours?: number | null;
};

function safeNow() {
  return Date.now();
}

function lsGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}
function ssGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function ssSet(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function shouldShowAd(ad: PopupAd, screen: string): boolean {
  const target = (ad.target_screen || "all").toLowerCase();
  if (target !== "all" && target !== screen.toLowerCase()) return false;

  const once = Boolean(ad.show_once);
  const id = String(ad.id);
  const shownOnceKey = `popup_ad:${id}:shown_once`;
  const shownAtKey = `popup_ad:${id}:shown_at`;
  const sessionShownKey = `popup_ad:${id}:session_shown`;

  if (once && lsGet(shownOnceKey) === "1") return false;

  // Avoid re-opening multiple times in same tab session
  if (ssGet(sessionShownKey) === "1") return false;

  const intervalHours =
    ad.display_interval_hours != null
      ? Number(ad.display_interval_hours)
      : null;
  if (intervalHours && Number.isFinite(intervalHours) && intervalHours > 0) {
    const last = Number(lsGet(shownAtKey) ?? "");
    if (Number.isFinite(last) && last > 0) {
      const diffMs = safeNow() - last;
      if (diffMs < intervalHours * 60 * 60 * 1000) return false;
    }
  }

  // display_frequency "every_visit" => show (but our session guard prevents spam)
  return true;
}

export default function PopupAdsModal({ screen }: { screen: string }) {
  const isRTL = useIsRTL();
  const { data } = useWebPopupAds(screen);
  const [open, setOpen] = useState(false);
  const [activeAd, setActiveAd] = useState<PopupAd | null>(null);

  const popupAds = useMemo(() => {
    const root = (data as Record<string, unknown>) ?? {};
    const inner = (root.data as Record<string, unknown>) ?? root;
    const payload = (inner.data as Record<string, unknown>) ?? inner;
    const list = (payload.popup_ads as unknown) ?? [];
    return Array.isArray(list) ? (list as PopupAd[]) : [];
  }, [data]);

  useEffect(() => {
    if (!popupAds || popupAds.length === 0) return;
    const candidate = popupAds.find((ad) => shouldShowAd(ad, screen));
    if (!candidate) return;
    setActiveAd(candidate);
    setOpen(true);
    // mark as shown for this session immediately to avoid flicker
    ssSet(`popup_ad:${candidate.id}:session_shown`, "1");
  }, [popupAds, screen]);

  if (!open || !activeAd) return null;

  const close = () => {
    const id = String(activeAd.id);
    lsSet(`popup_ad:${id}:shown_at`, String(safeNow()));
    if (activeAd.show_once) {
      lsSet(`popup_ad:${id}:shown_once`, "1");
    }
    setOpen(false);
  };

  const handleClickAd = () => {
    const url =
      activeAd.link_type === "url"
        ? String(activeAd.link_url ?? "")
        : String(activeAd.link_url ?? "");
    if (url && url.trim()) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    close();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
        onClick={close}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-lg rounded-2xl bg-white shadow-2xl z-[9999] overflow-hidden"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute top-3 end-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow"
          aria-label={isRTL ? "إغلاق" : "Close"}
        >
          <IoMdClose className="text-xl text-gray-700" />
        </button>

        <button
          type="button"
          onClick={handleClickAd}
          className="w-full text-start group"
        >
          <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden">
            <img
              src={activeAd.image}
              alt={activeAd.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold text-gray-900 leading-snug">
              {activeAd.title}
            </h3>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#400198]/10 text-[#400198] px-4 py-2 text-sm font-semibold group-hover:bg-[#400198]/15 transition-colors">
                {isRTL ? "اضغط لعرض التفاصيل" : "Click to view details"}
              </span>
              <span className="text-[#fd671a] text-sm font-bold group-hover:translate-x-0.5 transition-transform">
                {isRTL ? "←" : "→"}
              </span>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}

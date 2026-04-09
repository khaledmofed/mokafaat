import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { IoMdClose } from "react-icons/io";
import {
  FiCheck,
  FiBookmark,
  FiShare2,
  FiExternalLink,
  FiEye,
} from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import type { CouponModel } from "@network/mappers/couponsMapper";
import { stripHtml } from "@utils/stripHtml";
import { useUserStore } from "@stores/userStore";
import {
  useCouponVote,
  useFavorites,
  useFavoriteToggle,
} from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";
import { toast } from "react-toastify";

export type CouponWithIcon = CouponModel & { icon: React.ReactNode };

interface CouponModalProps {
  coupon: CouponWithIcon;
  onClose: () => void;
  relatedCoupons?: CouponWithIcon[];
  onRelatedClick?: (coupon: CouponWithIcon) => void;
  getLogoUrl?: (coupon: CouponModel) => string;
}

const CouponModal: React.FC<CouponModalProps> = ({
  coupon,
  onClose,
  getLogoUrl,
}) => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const isAuthenticated = useUserStore((s) => !!s.token);
  const couponVote = useCouponVote();
  const [voteState, setVoteState] = useState<{
    workingCount: number;
    notWorkingCount: number;
    userVote?: "working" | "not_working";
  } | null>(null);
  const { data: favoritesData } = useFavorites();
  const toggleFavorite = useFavoriteToggle();
  const favoritesList = useMemo(
    () => normalizeFavoritesList(favoritesData ?? null),
    [favoritesData],
  );
  const isFavorite = useMemo(
    () =>
      favoritesList.some(
        (f) =>
          f.favorable_type === "coupon" &&
          String(f.favorable_id) === String(coupon.id),
      ),
    [favoritesList, coupon.id],
  );

  const handleFavoriteClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
      );
      onClose();
      return;
    }
    toggleFavorite.mutate(
      { favorable_type: "coupon", favorable_id: coupon.id },
      {
        onSuccess: () => {
          toast.success(
            isFavorite
              ? isRTL
                ? "تمت إزالته من المفضلة"
                : "Removed from favorites"
              : isRTL
                ? "تمت الإضافة إلى المفضلة"
                : "Added to favorites",
          );
        },
        onError: () => toast.error(isRTL ? "حدث خطأ" : "Something went wrong"),
      },
    );
  }, [
    isAuthenticated,
    navigate,
    onClose,
    toggleFavorite,
    coupon.id,
    isFavorite,
    isRTL,
  ]);

  const code =
    coupon.couponCode && coupon.couponCode.trim().length > 0
      ? coupon.couponCode
      : `CPN${String(coupon.id).padStart(4, "0")}`;

  const copyCode = useCallback(() => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const shareCoupon = useCallback(async () => {
    const title = stripHtml(coupon.title);
    const storeUrl =
      coupon.storeUrl && coupon.storeUrl.trim().length > 0 ? coupon.storeUrl : "";

    const lines = [
      title,
      `${isRTL ? "الكود" : "Code"}: ${code}`,
      storeUrl ? `${isRTL ? "الرابط" : "Link"}: ${storeUrl}` : "",
    ].filter(Boolean);
    const text = lines.join("\n");

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text,
          ...(storeUrl ? { url: storeUrl } : {}),
        });
        return;
      }
    } catch {
      // fall back to copy
    }

    try {
      await navigator.clipboard?.writeText(text);
      toast.success(isRTL ? "تم نسخ نص المشاركة" : "Share text copied");
    } catch {
      toast.error(isRTL ? "تعذر المشاركة" : "Unable to share");
    }
  }, [coupon.title, coupon.storeUrl, code, isRTL]);

  const submitVote = useCallback(
    (vote: "working" | "not_working") => {
      if (!isAuthenticated) {
        navigate(
          `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
        );
        onClose();
        return;
      }
      couponVote.mutate(
        { id: coupon.id, vote },
        {
          onSuccess: (res) => {
            const wrapper = res as {
              msg?: unknown;
              data?: unknown;
            };

            const msg =
              typeof wrapper?.msg === "string" && wrapper.msg.trim() !== ""
                ? wrapper.msg
                : null;
            if (msg) {
              toast.success(msg);
            }

            const inner = (() => {
              const d = wrapper?.data;
              if (d && typeof d === "object") {
                const dObj = d as Record<string, unknown>;
                if (dObj.data && typeof dObj.data === "object") {
                  return dObj.data as Record<string, unknown>;
                }
                return dObj;
              }
              return {} as Record<string, unknown>;
            })();

            const payload = inner as {
              working_count?: unknown;
              not_working_count?: unknown;
              user_vote?: unknown;
            };
            const next = {
              workingCount: Number(payload?.working_count ?? 0) || 0,
              notWorkingCount: Number(payload?.not_working_count ?? 0) || 0,
              userVote:
                payload?.user_vote === "working" ||
                payload?.user_vote === "not_working"
                  ? (payload.user_vote as "working" | "not_working")
                  : undefined,
            };
            setVoteState(next);
          },
          onError: () =>
            toast.error(isRTL ? "حدث خطأ" : "Something went wrong"),
        },
      );
    },
    [coupon.id, couponVote, isAuthenticated, isRTL, navigate, onClose],
  );

  const goToStore = () => {
    const url = coupon.storeUrl;
    if (url && url.trim().length > 0) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate("/coupons");
    }
    onClose();
  };

  const logoUrl = getLogoUrl?.(coupon);
  const workingCount = voteState?.workingCount ?? 0;
  const notWorkingCount = voteState?.notWorkingCount ?? 0;
  const userVote = voteState?.userVote;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[9998] flex items-center justify-center p-4"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl z-[9999]"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="coupon-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-2 end-2 w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label={isRTL ? "إغلاق" : "Close"}
        >
          <IoMdClose className="text-xl" />
        </button>

        <div className="px-5 pt-5 pb-6">
          {/* Store name + logo + stats */}
          <div className={`flex items-start gap-3 mb-4`}>
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-green-500 flex items-center justify-center">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={coupon.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-lg">
                  {coupon.title.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h2
                id="coupon-modal-title"
                className="text-base font-bold text-gray-900"
              >
                {stripHtml(coupon.title)}
              </h2>
              <div
                className={`flex items-center gap-4 mt-1 text-sm text-gray-500 `}
              >
                <span className="flex items-center gap-1">
                  <FiBookmark className="w-4 h-4" /> 0
                </span>
                <span className="flex items-center gap-1">
                  <FiEye className="w-4 h-4" /> 0
                </span>
                <span className="flex items-center gap-1">★ 0.0</span>
              </div>
            </div>
          </div>

          {/* Title + subtitle */}
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {coupon.dealText}
            {coupon.discountPercentage ? ` ${coupon.discountPercentage}%` : ""}
          </h3>
          {/* <p className="text-base font-semibold text-gray-700 mb-2">
            {coupon.dealSubtext}
          </p> */}

          {/* Description */}
          {/* <p className="text-sm text-gray-500 mb-6 line-clamp-3">
            {stripHtml(coupon.savings)}
          </p> */}

          {/* Action icons: فعال، أضف للمفضلة، مشاركة، تسوق بالموقع */}
          <div className={`flex flex-wrap gap-4 mb-6 `}>
            {/* Vote: working */}
            <button
              type="button"
              onClick={() => submitVote("working")}
              disabled={couponVote.isPending}
              className={`flex flex-col items-center gap-1 focus:outline-none disabled:opacity-50 ${
                userVote === "working"
                  ? "text-green-700"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  userVote === "working" ? "bg-green-200" : "bg-green-100"
                }`}
              >
                <FiCheck className="w-6 h-6 text-green-700" />
              </div>
              <span className="text-xs font-medium">
                {isRTL ? "فعال" : "Working"} ({workingCount})
              </span>
            </button>

            {/* Vote: not working */}
            <button
              type="button"
              onClick={() => submitVote("not_working")}
              disabled={couponVote.isPending}
              className={`flex flex-col items-center gap-1 focus:outline-none disabled:opacity-50 ${
                userVote === "not_working"
                  ? "text-red-700"
                  : "text-red-600 hover:text-red-700"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  userVote === "not_working" ? "bg-red-200" : "bg-red-100"
                }`}
              >
                <span className="text-xl font-bold text-red-700">×</span>
              </div>
              <span className="text-xs font-medium">
                {isRTL ? "غير فعال" : "Not working"} ({notWorkingCount})
              </span>
            </button>
            <button
              type="button"
              onClick={handleFavoriteClick}
              disabled={toggleFavorite.isPending}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100"}`}
              >
                {isFavorite ? (
                  <BsHeartFill className="w-5 h-5" />
                ) : (
                  <BsHeart className="w-5 h-5" />
                )}
              </div>
              <span className="text-xs font-medium">
                {isRTL
                  ? isFavorite
                    ? "إزالة من المفضلة"
                    : "أضف للمفضلة"
                  : isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"}
              </span>
            </button>
            <button
              type="button"
              onClick={shareCoupon}
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FiShare2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">
                {isRTL ? "مشاركة" : "Share"}
              </span>
            </button>
            <a
              href={
                coupon.storeUrl && coupon.storeUrl.trim()
                  ? coupon.storeUrl
                  : "/coupons"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FiExternalLink className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">
                {isRTL ? "تسوق بالموقع" : "Shop on site"}
              </span>
            </a>
          </div>

          {/* Coupon code box */}
          <div
            onClick={copyCode}
            className="flex items-center justify-between gap-3 py-4 px-5 mb-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-[#400198] hover:bg-purple-50/50 transition-colors"
          >
            <span className="text-xl font-bold text-gray-900 tracking-wider">
              {code}
            </span>
            <div className="flex items-center gap-2">
              <FaRegCopy className="w-5 h-5 text-gray-500" />
              {copied && (
                <span className="text-sm text-green-600 font-medium">
                  {isRTL ? "تم النسخ" : "Copied!"}
                </span>
              )}
            </div>
          </div>

          {/* Expiry (من end_date إن وُجد) */}
          <p className="text-sm text-gray-500 mb-6">
            {coupon.endDate
              ? (() => {
                  const d = new Date(coupon.endDate as string);
                  const formatted = Number.isNaN(d.getTime())
                    ? coupon.endDate
                    : d.toLocaleDateString(isRTL ? "ar-SA" : "en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      });
                  return (isRTL ? "ينتهي " : "Expires ") + String(formatted);
                })()
              : isRTL
                ? "الصلاحية غير محددة"
                : "No expiry date"}
          </p>

          {/* CTA - الذهاب إلى متجر الكوبون (إن وجد) */}
          <button
            type="button"
            onClick={goToStore}
            className="block w-full py-4 rounded-2xl bg-[#fd671a] text-white text-center font-bold text-lg hover:opacity-95 transition-opacity"
          >
            {isRTL ? "الذهاب للمتجر" : "Go to store"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CouponModal;

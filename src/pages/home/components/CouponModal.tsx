import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { IoMdClose } from "react-icons/io";
import { FiCheck, FiBookmark, FiShare2, FiExternalLink, FiEye } from "react-icons/fi";
import { FaRegCopy } from "react-icons/fa";
import type { CouponModel } from "@network/mappers/couponsMapper";
import { stripHtml } from "@utils/stripHtml";

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
  relatedCoupons = [],
  onRelatedClick,
  getLogoUrl,
}) => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const code = `CPN${String(coupon.id).padStart(4, "0")}`;

  const copyCode = useCallback(() => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const goToCouponsPage = () => {
    onClose();
    navigate("/coupons");
  };

  const logoUrl = getLogoUrl?.(coupon);

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
          <div
            className={`flex items-start gap-3 mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
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
                className="text-lg font-bold text-gray-900"
              >
                {stripHtml(coupon.title)}
              </h2>
              <div
                className={`flex items-center gap-4 mt-1 text-sm text-gray-500 ${isRTL ? "flex-row-reverse" : ""}`}
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
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {coupon.dealText}
            {coupon.discountPercentage ? ` ${coupon.discountPercentage}%` : ""}
          </h3>
          <p className="text-base font-semibold text-gray-700 mb-2">
            {coupon.dealSubtext}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-6 line-clamp-3">
            {stripHtml(coupon.savings)}
          </p>

          {/* Action icons: فعال، أضف للمفضلة، مشاركة، تسوق بالموقع */}
          <div
            className={`flex flex-wrap gap-6 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600">
                {isRTL ? "فعال" : "Active"}
              </span>
            </div>
            <button
              type="button"
              className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-700"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <FiBookmark className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">
                {isRTL ? "أضف للمفضلة" : "Add to favorites"}
              </span>
            </button>
            <button
              type="button"
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
              href="/coupons"
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

          {/* Expiry */}
          <p className="text-sm text-gray-500 mb-6">
            {isRTL ? "ينتهي " : "Expires "}
            {coupon.validity}
          </p>

          {/* CTA - التوجيه لصفحة الكوبونز */}
          <button
            type="button"
            onClick={goToCouponsPage}
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

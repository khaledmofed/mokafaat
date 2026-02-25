import React from "react";
import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";

export interface SubscribersOnlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  onBackToOffer?: () => void;
}

/**
 * Modal shown when user tries to access a subscribers-only offer without an active subscription.
 * العرض متاح للمشتركين فقط
 */
const SubscribersOnlyModal: React.FC<SubscribersOnlyModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
  onBackToOffer,
}) => {
  const { t } = useTranslation();
  const handleSubscribe = () => {
    onClose();
    onSubscribe();
  };
  const handleBack = () => {
    onClose();
    onBackToOffer?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribers-only-title"
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label={t("home.subscription.backToOffer")}
        >
          <IoClose className="text-2xl" />
        </button>

        {/* Placeholder for icon */}
        <div className="flex justify-center pt-6">
          <div className="w-14 h-14 rounded-xl bg-gray-200 flex-shrink-0" aria-hidden />
        </div>

        <div className="p-6 text-center">
          <h2
            id="subscribers-only-title"
            className="text-xl font-bold text-gray-900 mb-2"
          >
            {t("home.subscription.offerForSubscribersOnly")}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {t("home.subscription.offerForSubscribersOnlyDesc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onBackToOffer && (
              <button
                type="button"
                onClick={handleBack}
                className="order-2 sm:order-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                {t("home.subscription.backToOffer")}
              </button>
            )}
            <button
              type="button"
              onClick={handleSubscribe}
              className="order-1 sm:order-2 px-6 py-3 bg-[#fd671a] text-white rounded-full font-medium hover:bg-[#e55c18] transition-colors"
            >
              {t("home.subscription.subscribe")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribersOnlyModal;

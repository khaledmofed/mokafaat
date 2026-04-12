import React from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * صفحة فشل الدفع بعد العودة من ميسر.
 * الباكند يوجّه المستخدم إلى هذه الصفحة عند فشل أو إلغاء الدفع، مثلاً:
 *   /orders/failure?id=xxx&status=failed&message=DECLINED&order_id=59
 *
 * أين يتم الربط؟
 * الربط يتم في الباكند (API): عندما ميسر يستدعي callback الـ API عندك، الباكند يتحقق من النتيجة
 * ثم يعيد توجيه المتصفح (Redirect 302) إلى:
 *   - نجاح: /orders/success?order_id=...&status=paid&...
 *   - فشل:  /orders/failure?order_id=...&status=failed&message=...
 * تأكد أن الباكند يوجّه للـ failure عند status غير paid (مثل failed, cancelled, declined).
 */
const OrderFailureRedirectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const message = searchParams.get("message");
  const orderId = searchParams.get("order_id");
  const type = searchParams.get("type");
  const offerCategory = searchParams.get("category");
  const offerRestaurantId = searchParams.get("restaurant_id");

  const handleRetry = () => {
    if (type === "offer" && offerCategory && offerRestaurantId) {
      navigate(`/offers/${offerCategory}/${offerRestaurantId}/payment`, { replace: true });
    } else {
      navigate("/orders", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#1D0843] flex flex-col items-center justify-center px-4 py-12">
      <div
        className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6"
        aria-hidden
      >
        <svg
          className="w-12 h-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
        {t("orderFailureRedirect.title")}
      </h1>
      <p className="text-white/80 text-center mb-4">
        {t("orderFailureRedirect.description")}
      </p>
      {message && (
        <p className="text-white/60 text-sm mb-6 max-w-md text-center">
          {message}
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={handleRetry}
          className="px-6 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
        >
          {t("orderFailureRedirect.try_again")}
        </button>
        <Link
          to="/orders"
          className="px-6 py-3 rounded-full border border-white/50 text-white font-medium hover:bg-white/10 transition-colors text-center"
        >
          {t("orderFailureRedirect.my_orders")}
        </Link>
      </div>
      {orderId && (
        <p className="text-white/50 text-xs mt-6">
          {t("orderFailureRedirect.order_id")} {orderId}
        </p>
      )}
    </div>
  );
};

export default OrderFailureRedirectPage;

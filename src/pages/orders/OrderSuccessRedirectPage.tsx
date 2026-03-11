import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePaymentCallback } from "@hooks/api/useMokafaatQueries";
import { useIsRTL } from "@hooks";

/**
 * صفحة نجاح الدفع بعد العودة من ميسر.
 * الباكند يوجّه المستخدم إلى هذه الصفحة عند نجاح الدفع، مثلاً:
 *   /orders/success?id=xxx&status=paid&message=APPROVED&order_id=59
 *
 * أين يتم الربط؟
 * في الباكند: عند استلام callback من ميسر، الباكند يتحقق ثم يعيد التوجيه (302) إلى
 * هذا الرابط في حالة النجاح، أو إلى /orders/failure في حالة الفشل.
 */
const OrderSuccessRedirectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const paymentCallback = usePaymentCallback();
  const calledRef = useRef(false);
  const [redirectDone, setRedirectDone] = useState(false);

  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const orderId = searchParams.get("order_id");
  // ملاحظة: نوجّه دائماً لصفحة تفاصيل الطلب /orders/:id، فلا حاجة لمعطيات العرض هنا

  const isPaid = status?.toLowerCase() === "paid";
  const isFailed = status && status?.toLowerCase() !== "paid"; // failed | cancelled | declined ...
  const hasParams = id || status || orderId;
  const [autoRedirecting, setAutoRedirecting] = useState(false);

  useEffect(() => {
    if (redirectDone) return;
    // إذا كانت النتيجة فشل، وجّه لصفحة الفشل
    if (isFailed && hasParams) {
      setRedirectDone(true);
      navigate(`/orders/failure?${searchParams.toString()}`, { replace: true });
      return;
    }
    // عند وجود order_id: نعرض صفحة النجاح، ثم نوجّه تلقائياً بعد فترة قصيرة إلى صفحة تفاصيل الطلب
    if (orderId && isPaid && hasParams) {
      if (autoRedirecting) return;
      setAutoRedirecting(true);
      const t = window.setTimeout(() => {
        setRedirectDone(true);
        navigate(`/orders/${orderId}`, { replace: true });
      }, 1500);
      return () => window.clearTimeout(t);
    }
    if (!id || !status || !isPaid) {
      if (!hasParams) {
        setRedirectDone(true);
        navigate("/orders", { replace: true });
      }
      return;
    }
    if (calledRef.current) return;
    calledRef.current = true;
    paymentCallback.mutate(
      { id, status },
      {
        onSettled: () => {
          setRedirectDone(true);
          navigate("/orders", { replace: true });
        },
      }
    );
  }, [id, status, orderId, hasParams, isPaid, isFailed, redirectDone, navigate, paymentCallback, searchParams]);

  // عرض صفحة النجاح عندما يكون status=paid ولدينا معاملات (قبل التوجيه الداخلي أو أثناء التحميل)
  if (hasParams && isPaid && !redirectDone && (orderId || (id && status))) {
    return (
      <div className="min-h-screen bg-[#1D0843] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6" aria-hidden>
          <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          {isRTL ? "تمت العملية بنجاح" : "Success"}
        </h1>
        <p className="text-white/80 text-center mb-8">
          {isRTL ? "تمت الدفعة بنجاح" : "Payment completed successfully"}
        </p>
        {message && (
          <p className="text-white/60 text-sm mb-6">
            {message}
          </p>
        )}
        {orderId ? (
          <button
            type="button"
            onClick={() => {
              setRedirectDone(true);
              navigate(`/orders/${orderId}`, { replace: true });
            }}
            className="px-8 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
          >
            {isRTL ? "عرض الطلب" : "View Order"}
          </button>
        ) : (
          <div className="flex items-center gap-2 text-white/70">
            <span className="inline-block w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            <span>{isRTL ? "جاري التحويل..." : "Redirecting..."}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1D0843] flex items-center justify-center">
      <div className="flex items-center gap-2 text-white/80">
        <span className="inline-block w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin" />
        <span>{isRTL ? "جاري التحويل..." : "Redirecting..."}</span>
      </div>
    </div>
  );
};

export default OrderSuccessRedirectPage;

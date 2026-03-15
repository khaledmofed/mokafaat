import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePaymentCallback } from "@hooks/api/useMokafaatQueries";
import { useIsRTL } from "@hooks";

function extractOrderIdFromCallbackResponse(data: unknown): string | null {
  if (data == null) return null;
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data) as Record<string, unknown>;
      const oid = parsed?.order_id ?? (parsed?.order as Record<string, unknown>)?.id;
      return oid != null ? String(oid) : null;
    } catch {
      return null;
    }
  }
  if (typeof data === "object" && !Array.isArray(data)) {
    const root = data as Record<string, unknown>;
    const oid = root?.order_id ?? (root?.order as Record<string, unknown>)?.id ?? (root?.data as Record<string, unknown>)?.order_id;
    return oid != null ? String(oid) : null;
  }
  return null;
}

/**
 * صفحة نجاح الدفع بعد العودة من ميسر.
 * الباكند يوجّه المستخدم إلى هذه الصفحة عند نجاح الدفع، مثلاً:
 *   /orders/success?id=xxx&status=paid&message=APPROVED&order_id=59
 * أو للبطاقات أحياناً بدون order_id: type=card ثم نستدعي الـ callback لاستخراج order_id أو نعرض زر "عرض الطلبات".
 */
const OrderSuccessRedirectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const paymentCallback = usePaymentCallback();
  const calledRef = useRef(false);
  const resolvedOrderIdRef = useRef<string | null>(null);
  const [redirectDone, setRedirectDone] = useState(false);
  const [resolvedOrderId, setResolvedOrderId] = useState<string | null>(null);
  const [showFallbackButton, setShowFallbackButton] = useState(false);

  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const message = searchParams.get("message");
  const orderIdFromUrl = searchParams.get("order_id");
  const orderId = orderIdFromUrl || resolvedOrderId;

  const isPaid = status?.toLowerCase() === "paid";
  const isFailed = status && status?.toLowerCase() !== "paid";
  const hasParams = id || status || orderIdFromUrl || resolvedOrderId;
  const [autoRedirecting, setAutoRedirecting] = useState(false);

  // عند وجود order_id (من الرابط أو من استجابة الـ callback): عرض زر "عرض الطلب" ثم توجيه تلقائي بعد 1.5 ثانية
  useEffect(() => {
    if (redirectDone || !orderId || !isPaid || !hasParams) return;
    if (autoRedirecting) return;
    setAutoRedirecting(true);
    const t = window.setTimeout(() => {
      setRedirectDone(true);
      navigate(`/orders/${orderId}`, { replace: true });
    }, 1500);
    return () => window.clearTimeout(t);
  }, [orderId, isPaid, hasParams, redirectDone, autoRedirecting, navigate]);

  useEffect(() => {
    if (redirectDone) return;
    if (isFailed && hasParams) {
      setRedirectDone(true);
      navigate(`/orders/failure?${searchParams.toString()}`, { replace: true });
      return;
    }
    if (orderId && isPaid && hasParams) return; // يُعالج من الـ effect أعلاه
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
        onSuccess: (data) => {
          const oid = extractOrderIdFromCallbackResponse(data);
          if (oid) {
            resolvedOrderIdRef.current = oid;
            setResolvedOrderId(oid);
          }
        },
        onSettled: () => {
          // إن حصلنا على order_id من onSuccess يظهر زر "عرض الطلب" ويتولى الـ effect التوجيه بعد 1.5 ثانية
          if (!resolvedOrderIdRef.current) {
            setRedirectDone(true);
            navigate("/orders", { replace: true });
          }
        },
      }
    );
  }, [id, status, orderIdFromUrl, hasParams, isPaid, isFailed, redirectDone, navigate, paymentCallback, searchParams]);

  // بعد 3 ثوانٍ إن لم يظهر order_id نعرض زر "عرض الطلبات" حتى لا تبقى الصفحة على "جاري التحويل"
  useEffect(() => {
    if (orderIdFromUrl || resolvedOrderId || !id || !status || !isPaid) return;
    const t = window.setTimeout(() => setShowFallbackButton(true), 3000);
    return () => window.clearTimeout(t);
  }, [orderIdFromUrl, resolvedOrderId, id, status, isPaid]);

  if (hasParams && isPaid && !redirectDone && (orderId || (id && status))) {
    const effectiveOrderId = orderIdFromUrl || resolvedOrderId;
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
        {effectiveOrderId ? (
          <button
            type="button"
            onClick={() => {
              setRedirectDone(true);
              navigate(`/orders/${effectiveOrderId}`, { replace: true });
            }}
            className="px-8 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
          >
            {isRTL ? "عرض الطلب" : "View Order"}
          </button>
        ) : showFallbackButton ? (
          <button
            type="button"
            onClick={() => {
              setRedirectDone(true);
              navigate("/orders", { replace: true });
            }}
            className="px-8 py-3 rounded-full bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
          >
            {isRTL ? "عرض الطلبات" : "View Orders"}
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

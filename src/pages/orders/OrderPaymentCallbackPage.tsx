import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { usePaymentCallback } from "@hooks/api/useMokafaatQueries";

/**
 * صفحة وسيطة: ميسر يوجّه المتصفح هنا بعد الدفع، ثم نستدعي API الكول باك عندنا
 * وبحسب النتيجة نوجّه لصفحة النجاح أو الفشل عندنا.
 *
 * ملاحظة: الباكند قد يرد بصفحة HTML (تمت العملية بنجاح) بدل JSON.
 * نتعامل مع الرد: إن كان JSON نستخرج order_id وغيرها، وإن كان HTML نعتمد على معاملات الرابط (id, status) فقط.
 */
const OrderPaymentCallbackPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const paymentCallback = usePaymentCallback();
  const calledRef = useRef(false);
  const redirectedRef = useRef(false);

  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const message = searchParams.get("message") ?? "";
  const orderIdFromQuery = searchParams.get("order_id") ?? undefined;
  const typeFromQuery = searchParams.get("type") ?? undefined;
  const categoryFromQuery = searchParams.get("category") ?? undefined;
  const restaurantIdFromQuery = searchParams.get("restaurant_id") ?? undefined;

  const redirectToResult = React.useCallback(
    (isPaid: boolean) => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      const params = new URLSearchParams();
      params.set("id", id ?? "");
      params.set("status", status ?? "");
      if (message) params.set("message", message);
      if (orderIdFromQuery) params.set("order_id", orderIdFromQuery);
      if (typeFromQuery) params.set("type", typeFromQuery);
      if (categoryFromQuery) params.set("category", categoryFromQuery);
      if (restaurantIdFromQuery) params.set("restaurant_id", restaurantIdFromQuery);
      navigate(isPaid ? `/orders/success?${params.toString()}` : `/orders/failure?${params.toString()}`, { replace: true });
    },
    [id, status, message, navigate, orderIdFromQuery, typeFromQuery, categoryFromQuery, restaurantIdFromQuery]
  );

  useEffect(() => {
    if (!id || !status) {
      navigate("/orders", { replace: true });
      return;
    }
    if (calledRef.current) return;
    calledRef.current = true;

    const isPaid = status?.toLowerCase() === "paid";

    // مهلة: إن لم يرد الـ API خلال 8 ثوانٍ نوجّه حسب status من الرابط
    const timeoutId = window.setTimeout(() => {
      if (redirectedRef.current) return;
      redirectToResult(isPaid);
    }, 8000);

    paymentCallback
      .mutateAsync({ id, status })
      .then((res: unknown) => {
        if (redirectedRef.current) return;
        let orderId: string | number | undefined = orderIdFromQuery;
        let type: string | undefined = typeFromQuery;
        let category: string | undefined = categoryFromQuery;
        let restaurantId: string | undefined = restaurantIdFromQuery;

        // الباكند قد يرد بـ HTML (نص) أو JSON — إن كان كائناً نستخرج order_id وغيرها
        if (res != null && typeof res === "object" && !Array.isArray(res)) {
          const data = (res as Record<string, unknown>)?.data ?? res;
          const root = (data as Record<string, unknown>) ?? {};
          orderId = (root.order_id ?? (root.order as Record<string, unknown>)?.id ?? orderId) as string | number | undefined;
          if (root.type != null) type = (root.type as string) ?? type;
          if (root.category != null) category = (root.category as string) ?? category;
          if (root.restaurant_id != null) restaurantId = (root.restaurant_id as string) ?? restaurantId;
        }

        const params = new URLSearchParams();
        params.set("id", id);
        params.set("status", status);
        if (message) params.set("message", message);
        if (orderId != null) params.set("order_id", String(orderId));
        if (type) params.set("type", type);
        if (category) params.set("category", category);
        if (restaurantId) params.set("restaurant_id", restaurantId);

        redirectedRef.current = true;
        window.clearTimeout(timeoutId);
        navigate(isPaid ? `/orders/success?${params.toString()}` : `/orders/failure?${params.toString()}`, { replace: true });
      })
      .catch(() => {
        if (redirectedRef.current) return;
        window.clearTimeout(timeoutId);
        redirectToResult(isPaid);
      });

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [id, status, message, navigate, paymentCallback, searchParams, redirectToResult]);

  return (
    <div className="min-h-screen bg-[#1D0843] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4">
        <span className="inline-block w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-white/90 text-lg">
          {isRTL ? "جاري التحقق من الدفع..." : "Verifying payment..."}
        </p>
      </div>
    </div>
  );
};

export default OrderPaymentCallbackPage;

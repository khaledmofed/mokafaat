import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usePaymentCallback } from "@hooks/api/useMokafaatQueries";
import { LoadingSpinner } from "@components/LoadingSpinner";

/**
 * بعد العودة من ميسر: id و status في الـ URL.
 * نستدعي الـ callback ثم نوجّه إلى تفاصيل الطلب إذا وُجد order_id.
 */
const OrderSuccessRedirectPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const paymentCallback = usePaymentCallback();
  const calledRef = useRef(false);

  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (orderId) {
      navigate(`/orders/${orderId}`, { replace: true });
      return;
    }
    if (calledRef.current || !id || !status || status.toLowerCase() !== "paid") {
      if (!id && !status) navigate("/orders", { replace: true });
      return;
    }
    calledRef.current = true;
    paymentCallback.mutate(
      { id, status },
      {
        onSettled: () => {
          navigate("/orders", { replace: true });
        },
      }
    );
  }, [id, status, orderId, navigate, paymentCallback]);

  return (
    <div className="min-h-screen bg-[#1D0843] flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default OrderSuccessRedirectPage;

import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import {
  IoReceiptOutline,
  IoDownloadOutline,
  IoArrowBackOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
import { useOrderDetail } from "@hooks/api/useMokafaatQueries";
import { useUserStore } from "@stores/userStore";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { normalizeOrdersList, type NormalizedOrder } from "@utils/orders";
import { downloadVoucher } from "@utils/voucherDownload";

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const token = useUserStore((s) => s.token);
  const getToken = useUserStore.getState;

  const { data: rawOrder, isLoading, isError, error } = useOrderDetail(orderId ?? "");
  const order: NormalizedOrder | null = React.useMemo(() => {
    if (!rawOrder) return null;
    const r = rawOrder as Record<string, unknown>;
    const inner = (r?.data as Record<string, unknown>)?.order ?? r?.data ?? r;
    const single = Array.isArray(inner) ? inner[0] : inner;
    if (!single || typeof single !== "object") return null;
    return normalizeOrdersList({ data: [single] })[0] ?? null;
  }, [rawOrder]);

  const handleDownloadVoucher = () => {
    if (!order?.voucherUrl || !token) return;
    downloadVoucher(order.voucherUrl, () => getToken().token).catch((e) => {
      alert(isRTL ? "فشل التنزيل" : "Download failed");
      console.error(e);
    });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-28 flex items-center justify-center" style={{ marginTop: "77px" }}>
        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-md">
          <IoReceiptOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{isRTL ? "تسجيل الدخول مطلوب" : "Login required"}</h2>
          <Link to="/login?returnUrl=/orders" className="bg-[#440798] text-white px-6 py-3 rounded-lg hover:bg-[#440798c9] transition-colors inline-block">
            {isRTL ? "تسجيل الدخول" : "Login"}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !orderId) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-28 flex justify-center items-center" style={{ marginTop: "77px" }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8 pb-28 flex items-center justify-center" style={{ marginTop: "77px" }}>
        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-md">
          <IoReceiptOutline className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{isRTL ? "الطلب غير موجود" : "Order not found"}</h2>
          <p className="text-gray-600 mb-6">{String(error?.message || "")}</p>
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="bg-[#440798] text-white px-6 py-3 rounded-lg hover:bg-[#440798c9] transition-colors"
          >
            {isRTL ? "العودة للطلبات" : "Back to Orders"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isRTL ? "تفاصيل الطلب" : "Order Details"} #{order.orderNumber ?? order.id} | Mokafaat</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-8 pb-28" style={{ marginTop: "77px" }}>
        <div className="container mx-auto px-4 max-w-2xl">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 text-[#440798] hover:text-[#54015d] mb-6"
          >
            <IoArrowBackOutline className="w-5 h-5" />
            <span>{isRTL ? "العودة للطلبات" : "Back to Orders"}</span>
          </button>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-[#1D0843] text-white p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-xl font-bold">
                    {isRTL ? "تفاصيل الطلب" : "Order Details"}
                  </h1>
                  <p className="text-white/80 mt-1">
                    #{order.orderNumber ?? String(order.id).slice(-8)}
                  </p>
                </div>
                {order.status === "completed" && (
                  <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                    <IoCheckmarkCircleOutline className="w-5 h-5" />
                    <span className="font-medium">{isRTL ? "مكتمل" : "Completed"}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              {order.activationCode && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{isRTL ? "رمز التفعيل" : "Activation Code"}</h3>
                  <p className="text-xl font-mono font-bold text-gray-900 tracking-wider">{order.activationCode}</p>
                </div>
              )}

              {order.qrCodeUrl && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">{isRTL ? "رمز QR" : "QR Code"}</h3>
                  <img src={order.qrCodeUrl} alt="QR" className="w-40 h-40 object-contain border border-gray-200 rounded-lg" />
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{isRTL ? "العناصر" : "Items"}</h3>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-xs">#</div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.title[isRTL ? "ar" : "en"]}</p>
                        <p className="text-sm text-gray-500">{isRTL ? "الكمية" : "Qty"}: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-[#440798] flex items-center gap-1">
                        {item.price * item.quantity}
                        <CurrencyIcon size={14} className="text-[#440798]" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <span className="font-semibold text-gray-800">{isRTL ? "المجموع" : "Total"}</span>
                <span className="text-xl font-bold text-[#440798] flex items-center gap-1">
                  {order.totalAmount}
                  <CurrencyIcon size={18} className="text-[#440798]" />
                </span>
              </div>

              {order.voucherUrl && order.status === "completed" && (
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleDownloadVoucher}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#fd671a] text-white rounded-xl hover:bg-[#e55c18] transition-colors font-medium"
                  >
                    <IoDownloadOutline className="w-5 h-5" />
                    {isRTL ? "تنزيل التذكرة (PDF)" : "Download Voucher (PDF)"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;

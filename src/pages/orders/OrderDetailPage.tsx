import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import {
  IoClose,
  IoDownloadOutline,
  IoArrowBackOutline,
} from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
import { useOrderDetail } from "@hooks/api/useMokafaatQueries";
import { useUserStore } from "@stores/userStore";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { normalizeOrdersList, type NormalizedOrder } from "@utils/orders";
import { downloadVoucher } from "@utils/voucherDownload";

/** شكل الطلب الخام من API تفاصيل الطلب */
interface RawOrder {
  id?: number;
  order_number?: string;
  order_type?: string;
  activation_code?: string;
  qr_code_url?: string;
  barcode_url?: string;
  created_at?: string;
  expires_at?: string;
  activated_at?: string;
  quantity?: number;
  total_price?: string | number;
  unit_price?: string | number;
  status?: string;
  voucher_url?: string;
  item?: {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    price_after?: string;
    price_before?: string;
    discount_percent?: string;
    terms?: string;
  };
  merchant?: {
    id?: number;
    name?: string;
    logo?: string;
    phone?: string;
  };
}

function formatVoucherNumber(code: string): string {
  const digits = String(code).replace(/\D/g, "");
  return digits.replace(/(.{3})/g, "$1 ").trim();
}

function formatOrderDate(dateStr: string | undefined, isRTL: boolean): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return isRTL
    ? date.toLocaleDateString("ar-SA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const token = useUserStore((s) => s.token);
  const getToken = useUserStore.getState;

  const {
    data: rawOrder,
    isLoading,
    isError,
    error,
  } = useOrderDetail(orderId ?? "");

  const order: NormalizedOrder | null = React.useMemo(() => {
    if (!rawOrder) return null;
    const r = rawOrder as Record<string, unknown>;
    const inner = (r?.data as Record<string, unknown>)?.order ?? r?.data ?? r;
    const single = Array.isArray(inner) ? inner[0] : inner;
    if (!single || typeof single !== "object") return null;
    return normalizeOrdersList({ data: [single] })[0] ?? null;
  }, [rawOrder]);

  const rawOrderData: RawOrder | null = React.useMemo(() => {
    if (!rawOrder) return null;
    const r = rawOrder as Record<string, unknown>;
    const data = r?.data as Record<string, unknown> | undefined;
    const o = data?.order ?? data ?? r;
    const single = Array.isArray(o) ? o[0] : o;
    return (single as RawOrder) ?? null;
  }, [rawOrder]);

  const handleDownloadVoucher = () => {
    const url = rawOrderData?.voucher_url ?? order?.voucherUrl;
    if (!url || !token) return;
    downloadVoucher(url, () => getToken().token).catch(() => {
      alert(isRTL ? "فشل التنزيل" : "Download failed");
    });
  };

  if (!token) {
    return (
      <div
        className="min-h-screen pt-24 pb-28 flex items-center justify-center"
        style={{ background: "linear-gradient(to bottom, #521A93, #33005D)" }}
      >
        <div className="text-center bg-white/10 rounded-2xl p-8 max-w-md mx-4">
          <h2 className="text-xl font-bold text-white mb-4">
            {isRTL ? "تسجيل الدخول مطلوب" : "Login required"}
          </h2>
          <Link
            to="/login?returnUrl=/orders"
            className="bg-white text-[#1D0843] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors inline-block"
          >
            {isRTL ? "تسجيل الدخول" : "Login"}
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading || !orderId) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ background: "linear-gradient(to bottom, #521A93, #33005D)" }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 pb-24"
        style={{ background: "linear-gradient(to bottom, #521A93, #33005D)" }}
      >
        <div className="text-center bg-white/10 rounded-2xl p-8 max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">
            {isRTL ? "الطلب غير موجود" : "Order not found"}
          </h2>
          <p className="text-white/80 mb-6">{String(error?.message || "")}</p>
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="bg-white text-[#1D0843] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            {isRTL ? "العودة للطلبات" : "Back to Orders"}
          </button>
        </div>
      </div>
    );
  }

  const voucherNumber =
    rawOrderData?.activation_code ?? order?.activationCode ?? "";
  const totalPrice =
    rawOrderData?.total_price != null
      ? typeof rawOrderData.total_price === "string"
        ? parseFloat(rawOrderData.total_price)
        : rawOrderData.total_price
      : (order?.totalAmount ?? 0);
  const terms = rawOrderData?.item?.terms;
  const hasVoucher = !!(rawOrderData?.voucher_url ?? order?.voucherUrl);

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? "تفاصيل الطلب" : "Order Details"} #
          {order.orderNumber ?? order.id} | Mokafaat
        </title>
      </Helmet>

      <div
        className="min-h-screen px-4 flex flex-col items-center pt-20 pb-[200px]"
        style={{
          background: "linear-gradient(to bottom, #521A93, #33005D)",
          marginBottom: "-100px",
        }}
      >
        {/* زر العودة فوق الكارد */}
        <div className="w-full max-w-md flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <IoArrowBackOutline className="w-6 h-6" />
            <span className="text-sm font-medium">
              {isRTL ? "الطلبات" : "Orders"}
            </span>
          </button>
        </div>

        {/* كارد في منتصف الشاشة */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden flex-shrink-0">
          <div className="pt-6 pb-8 px-5">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label={isRTL ? "إغلاق" : "Close"}
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* QR */}
            {order.qrCodeUrl && (
              <div className="flex justify-center mb-6">
                <img
                  src={order.qrCodeUrl}
                  alt={isRTL ? "رمز الاستجابة السريعة" : "QR Code"}
                  className="w-48 h-48 object-contain"
                />
              </div>
            )}

            {/* رقم القسيمة */}
            {voucherNumber && (
              <div className="text-center mb-2">
                <p className="text-2xl font-bold text-gray-900 tracking-widest font-mono">
                  {formatVoucherNumber(voucherNumber)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {isRTL ? "رقم القسيمة" : "Voucher Number"}
                </p>
              </div>
            )}

            {/* تفاصيل الطلب — عمودين (في العربية: التسمية يمين، القيمة يسار) */}
            <div className="mt-8 space-y-4">
              <div
                className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-900 font-medium">
                  {formatOrderDate(
                    rawOrderData?.created_at ?? order.createdAt,
                    isRTL,
                  )}
                </span>
                <span className="text-gray-500">
                  {isRTL ? "تاريخ الشراء" : "Purchase Date"}
                </span>
              </div>
              <div
                className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-900 font-medium">
                  {formatOrderDate(rawOrderData?.expires_at, isRTL)}
                </span>
                <span className="text-gray-500">
                  {isRTL ? "انتهاء الكوبون" : "Coupon Expiry"}
                </span>
              </div>
              {order.items?.[0] && (
                <div
                  className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-900 font-medium">
                    {order.items[0].title[isRTL ? "ar" : "en"]}
                  </span>
                  <span className="text-gray-500">
                    {isRTL ? "العرض" : "Offer"}
                  </span>
                </div>
              )}
              {!order.items?.[0] && rawOrderData?.item?.name && (
                <div
                  className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-900 font-medium">
                    {rawOrderData.item.name}
                  </span>
                  <span className="text-gray-500">
                    {isRTL ? "العرض" : "Offer"}
                  </span>
                </div>
              )}
              <div
                className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-900 font-medium">
                  {isRTL
                    ? `${order.items?.reduce((s, i) => s + i.quantity, 0) ?? rawOrderData?.quantity ?? 1} صفقة`
                    : `${order.items?.reduce((s, i) => s + i.quantity, 0) ?? rawOrderData?.quantity ?? 1} deal(s)`}
                </span>
                <span className="text-gray-500">
                  {isRTL ? "عدد الصفقات المشتراة" : "Number of Deals Purchased"}
                </span>
              </div>
            </div>

            {/* خط متقطع ثم السعر الإجمالي */}
            <div className="border-t border-dashed border-gray-200 mt-6 pt-6">
              <div
                className={`flex justify-between items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-2xl font-bold text-[#fd671a] flex items-center gap-1">
                  {totalPrice}
                  <CurrencyIcon size={20} className="text-[#fd671a]" />
                </span>
                <span className="text-gray-500">
                  {isRTL ? "السعر الإجمالي" : "Total Price"}
                </span>
              </div>
            </div>

            {/* شروط الخصوصية */}
            {terms && (
              <div className="mt-4">
                <Link
                  to="/privacy-policy"
                  className="text-sm text-gray-500 hover:text-[#fd671a] transition-colors inline-flex items-center gap-1"
                >
                  {isRTL ? "تابع شروط الخصوصية" : "Privacy Terms"}
                  <span className="rtl:rotate-180" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            )}

            {/* أزرار الإجراءات */}
            <div className="border-t border-dashed border-gray-200 mt-6 pt-6 flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {isRTL ? "عودة للمتجر" : "Return to Store"}
              </button>
              {hasVoucher && (
                <button
                  type="button"
                  onClick={handleDownloadVoucher}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#fd671a] text-white font-medium hover:bg-[#e55c18] transition-colors flex items-center justify-center gap-2"
                >
                  <IoDownloadOutline className="w-5 h-5" />
                  {isRTL ? "تنزيل ملف PDF" : "Download PDF"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;

import React from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { pickLocalized } from "@utils/pickLocalized";
import {
  IoClose,
  IoDownloadOutline,
  IoArrowBackOutline,
} from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
import {
  useOrderDetail,
  useVerifyMerchantOrderCode,
} from "@hooks/api/useMokafaatQueries";
import { AxiosError } from "axios";
import { useUserStore } from "@stores/userStore";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { normalizeOrdersList, type NormalizedOrder } from "@utils/orders";
import {
  downloadVoucher,
  resolveOrderVoucherUrl,
} from "@utils/voucherDownload";
import { toast } from "react-toastify";

/** شكل الطلب الخام من API تفاصيل الطلب (مطابق لـ OrderDetailPage) */
interface RawOrder {
  id?: number;
  order_number?: string;
  order_type?: string;
  /** قد يُرسل مع الطلب مباشرة (وليس داخل item) */
  pricing_type?: string;
  activation_code?: string;
  qr_code_url?: string;
  barcode_url?: string;
  created_at?: string;
  expires_at?: string;
  activated_at?: string;
  used_at?: string;
  quantity?: number;
  total_price?: string | number;
  unit_price?: string | number;
  status?: string;
  voucher_url?: string;
  voucherUrl?: string;
  item?: {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    price_after?: string;
    price_before?: string;
    discount_percent?: string;
    terms?: string;
    pricing_type?: string;
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

function formatOrderDate(dateStr: string | undefined, langBase: string): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  const locale =
    langBase === "ar"
      ? "ar-SA"
      : langBase === "ur"
        ? "ur-PK"
        : langBase === "hi"
          ? "hi-IN"
          : "en-US";
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** تحويل أرقام عربية/فارسية إلى أرقام غربية لـ parseFloat */
function normalizeWesternDigits(input: string): string {
  const arabicIndic = "٠١٢٣٤٥٦٧٨٩";
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  let s = input;
  for (let i = 0; i < 10; i++) {
    s = s.split(arabicIndic[i]).join(String(i));
    s = s.split(persian[i]).join(String(i));
  }
  return s;
}

function parseOrderMoney(raw: unknown): number {
  if (raw == null || raw === "") return NaN;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : NaN;
  const cleaned = normalizeWesternDigits(String(raw)).replace(/,/g, "");
  const n = parseFloat(cleaned.replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

/** طلب مُفعَّل فعلياً — لا نعتمد Boolean(activated_at) لأن الـ API قد يرسل قيماً وهمية */
function hasRealActivationTimestamp(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "boolean") return value;
  if (typeof value === "number")
    return Number.isFinite(value) && value > 0;
  const s = String(value).trim();
  if (
    !s ||
    s === "null" ||
    s === "false" ||
    s === "0" ||
    s === "[object Object]"
  )
    return false;
  if (s.startsWith("0000-00-00")) return false;
  const t = Date.parse(s);
  return Number.isFinite(t);
}

function pickActivationTimestamp(
  raw: RawOrder | null,
  normalized: NormalizedOrder | null,
): string | undefined {
  const candidates = [
    raw?.activated_at,
    normalized?.activatedAt,
    raw?.used_at,
    normalized?.usedAt,
  ];
  for (const c of candidates) {
    if (hasRealActivationTimestamp(c)) return String(c).trim();
  }
  return undefined;
}

function effectiveOrderTotal(
  raw: RawOrder | null,
  normalized: NormalizedOrder | null,
): number {
  if (raw?.total_price != null && raw.total_price !== "") {
    const n =
      typeof raw.total_price === "number"
        ? raw.total_price
        : parseOrderMoney(raw.total_price);
    if (Number.isFinite(n)) return n;
  }
  if (
    normalized?.totalAmount != null &&
    Number.isFinite(normalized.totalAmount)
  ) {
    return normalized.totalAmount;
  }
  const u = parseOrderMoney(raw?.unit_price ?? "");
  const q = Number(raw?.quantity ?? 1) || 1;
  if (Number.isFinite(u)) return u * q;
  return NaN;
}

const SuccessPage: React.FC = () => {
  useParams<{ category: string; restaurantId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const { t, i18n } = useTranslation();
  const langBase = i18n.language?.split("-")[0] || "en";
  const token = useUserStore((s) => s.token);
  const getToken = useUserStore.getState;

  const state = location.state as {
    order?: Record<string, unknown>;
    orderId?: string | number;
    offer?: unknown;
    restaurant?: unknown;
  } | null | undefined;

  const orderIdParam = searchParams.get("order");
  const orderId =
    orderIdParam ??
    (state?.orderId != null ? String(state.orderId) : null) ??
    (state?.order &&
    typeof state.order === "object" &&
    state.order.id != null
      ? String((state.order as { id?: unknown }).id)
      : null);

  const {
    data: rawOrderResponse,
    isLoading: orderLoading,
    isError: orderError,
    error: orderErrorObj,
  } = useOrderDetail(orderId ?? "");

  const verifyMerchantCode = useVerifyMerchantOrderCode();
  const [verifySheetOpen, setVerifySheetOpen] = React.useState(false);
  const [verifyDigits, setVerifyDigits] = React.useState(["", "", "", ""]);
  const verifyInputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (!verifySheetOpen) return;
    const id = window.setTimeout(
      () => verifyInputRefs.current[0]?.focus(),
      80,
    );
    return () => window.clearTimeout(id);
  }, [verifySheetOpen]);

  const order: NormalizedOrder | null = React.useMemo(() => {
    if (!rawOrderResponse) return null;
    const r = rawOrderResponse as Record<string, unknown>;
    const inner =
      (r?.data as Record<string, unknown>)?.order ?? r?.data ?? r;
    const single = Array.isArray(inner) ? inner[0] : inner;
    if (!single || typeof single !== "object") return null;
    return normalizeOrdersList({ data: [single] })[0] ?? null;
  }, [rawOrderResponse]);

  const rawOrderData: RawOrder | null = React.useMemo(() => {
    if (!rawOrderResponse) return null;
    const r = rawOrderResponse as Record<string, unknown>;
    const data = r?.data as Record<string, unknown> | undefined;
    const o = data?.order ?? data ?? r;
    const single = Array.isArray(o) ? o[0] : o;
    return (single as RawOrder) ?? null;
  }, [rawOrderResponse]);

  const voucherDownloadUrl = React.useMemo(
    () =>
      resolveOrderVoucherUrl(rawOrderResponse) ??
      rawOrderData?.voucher_url ??
      rawOrderData?.voucherUrl ??
      order?.voucherUrl,
    [rawOrderResponse, rawOrderData, order],
  );

  const handleDownloadVoucher = () => {
    const url = voucherDownloadUrl;
    if (!url || !token) return;
    downloadVoucher(url, () => getToken().token).catch((e) => {
      const msg =
        e instanceof Error && e.message
          ? e.message
          : t("offerCheckoutSuccess.download_failed");
      toast.error(msg);
    });
  };

  if (!orderId) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: "linear-gradient(to bottom, #521A93, #33005D)",
        }}
      >
        <div className="text-center bg-white/10 rounded-2xl p-8 max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">
            {t("offerCheckoutSuccess.order_unknown")}
          </h2>
          <button
            type="button"
            onClick={() => navigate("/offers")}
            className="bg-white text-[#1D0843] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            {t("offerCheckoutSuccess.back_to_offers")}
          </button>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div
        className="min-h-screen pt-24 pb-28 flex items-center justify-center"
        style={{
          background: "linear-gradient(to bottom, #521A93, #33005D)",
        }}
      >
        <div className="text-center bg-white/10 rounded-2xl p-8 max-w-md mx-4">
          <h2 className="text-xl font-bold text-white mb-4">
            {t("offerCheckoutSuccess.login_required")}
          </h2>
          <Link
            to={`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`}
            className="bg-white text-[#1D0843] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors inline-block"
          >
            {t("offerCheckoutSuccess.login")}
          </Link>
        </div>
      </div>
    );
  }

  if (orderLoading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{
          background: "linear-gradient(to bottom, #521A93, #33005D)",
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (orderError || !order) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 pb-24"
        style={{
          background: "linear-gradient(to bottom, #521A93, #33005D)",
        }}
      >
        <div className="text-center bg-white/10 rounded-2xl p-8 max-w-md">
          <h2 className="text-xl font-bold text-white mb-2">
            {t("offerCheckoutSuccess.order_not_found")}
          </h2>
          <p className="text-white/80 mb-6">
            {String(orderErrorObj?.message ?? "")}
          </p>
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="bg-white text-[#1D0843] px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            {t("offerCheckoutSuccess.back_to_orders")}
          </button>
        </div>
      </div>
    );
  }

  const voucherNumber =
    rawOrderData?.activation_code ?? order?.activationCode ?? "";
  const totalNumeric = effectiveOrderTotal(rawOrderData, order);
  const totalPrice = Number.isFinite(totalNumeric) ? totalNumeric : 0;
  const terms = rawOrderData?.item?.terms;
  const hasVoucher = !!voucherDownloadUrl;

  const itemPricingType = String(
    rawOrderData?.item?.pricing_type ??
      rawOrderData?.pricing_type ??
      "",
  )
    .trim()
    .toLowerCase();
  const isFreeOfferOrder =
    itemPricingType === "free" ||
    (Number.isFinite(totalNumeric) &&
      (totalNumeric <= 0 || Math.abs(totalNumeric) < 0.005));

  const statusLower = String(
    rawOrderData?.status ?? order?.rawStatus ?? "",
  )
    .trim()
    .toLowerCase();
  const isUsedLikeStatus = ["used", "redeemed", "consumed"].includes(
    statusLower,
  );

  const isOrderAlreadyActivated =
    isUsedLikeStatus ||
    hasRealActivationTimestamp(rawOrderData?.activated_at) ||
    hasRealActivationTimestamp(order?.activatedAt) ||
    hasRealActivationTimestamp(rawOrderData?.used_at) ||
    hasRealActivationTimestamp(order?.usedAt);

  const showActivateOfferButton =
    isFreeOfferOrder && !isOrderAlreadyActivated;

  const activationTimestamp = pickActivationTimestamp(rawOrderData, order);

  const openVerificationSheet = () => {
    setVerifyDigits(["", "", "", ""]);
    verifyMerchantCode.reset();
    setVerifySheetOpen(true);
  };

  const setVerifyDigitAt = (index: number, raw: string) => {
    const d = raw.replace(/\D/g, "").slice(-1);
    setVerifyDigits((prev) => {
      const next = [...prev];
      next[index] = d;
      return next;
    });
    if (d && index < 3) {
      verifyInputRefs.current[index + 1]?.focus();
    }
  };

  const onVerifyDigitKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && index > 0 && e.currentTarget.value === "") {
      e.preventDefault();
      verifyInputRefs.current[index - 1]?.focus();
    }
  };

  const onVerifyPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const raw = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!raw) return;
    const next = ["", "", "", ""].map((_, i) => raw[i] ?? "");
    setVerifyDigits(next);
    verifyInputRefs.current[Math.min(raw.length, 3)]?.focus();
  };

  const submitVerificationCode = () => {
    const code = verifyDigits.join("");
    if (code.length !== 4) {
      toast.error(t("offerCheckoutSuccess.verification_incomplete"));
      return;
    }
    if (!orderId) return;
    verifyMerchantCode.mutate(
      { orderId, verification_code: code },
      {
        onSuccess: () => {
          toast.success(t("offerCheckoutSuccess.verification_success"));
          setVerifySheetOpen(false);
        },
        onError: (err: unknown) => {
          let msg = t("offerCheckoutSuccess.verification_error");
          if (err instanceof AxiosError && err.response?.data) {
            const data = err.response.data as {
              msg?: string;
              message?: string;
            };
            if (typeof data.msg === "string" && data.msg.trim()) msg = data.msg;
            else if (typeof data.message === "string" && data.message.trim())
              msg = data.message;
          }
          toast.error(msg);
        },
      },
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {t("offerCheckoutSuccess.payment_success_title")} #
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
        {/* زر العودة فوق الكارد — مثل صفحة الطلب */}
        <div className="w-full max-w-md flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <IoArrowBackOutline className="w-6 h-6" />
            <span className="text-sm font-medium">
              {t("offerCheckoutSuccess.orders_nav")}
            </span>
          </button>
        </div>

        {/* كارد واحد في المنتصف — نفس تصميم صفحة /orders/:id */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden flex-shrink-0">
          <div className="pt-6 pb-8 px-5">
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label={t("offerCheckoutSuccess.close")}
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* QR */}
            {order.qrCodeUrl && (
              <div className="flex justify-center mb-6">
                <img
                  src={order.qrCodeUrl}
                  alt={t("offerCheckoutSuccess.qr_alt")}
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
                  {t("offerCheckoutSuccess.voucher_number")}
                </p>
              </div>
            )}

            {/* تفاصيل الطلب */}
            <div className="mt-8 space-y-4">
              <div
                className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-900 font-medium">
                  {formatOrderDate(
                    rawOrderData?.created_at ?? order.createdAt,
                    langBase,
                  )}
                </span>
                <span className="text-gray-500">
                  {t("offerCheckoutSuccess.purchase_date")}
                </span>
              </div>
              <div
                className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-900 font-medium">
                  {formatOrderDate(rawOrderData?.expires_at, langBase)}
                </span>
                <span className="text-gray-500">
                  {t("offerCheckoutSuccess.coupon_expiry")}
                </span>
              </div>
              {order.items?.[0] && (
                <div
                  className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-900 font-medium">
                    {pickLocalized(order.items[0].title, langBase)}
                  </span>
                  <span className="text-gray-500">
                    {t("offerCheckoutSuccess.offer")}
                  </span>
                </div>
              )}
              {!order.items?.[0] && rawOrderData?.item?.name && (
                <div
                  className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span className="text-gray-900 font-medium">
                    {rawOrderData.item.name as string}
                  </span>
                  <span className="text-gray-500">
                    {t("offerCheckoutSuccess.offer")}
                  </span>
                </div>
              )}
              <div
                className={`flex justify-between items-center text-sm gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-gray-900 font-medium">
                  {t("offerCheckoutSuccess.deals_count", {
                    count:
                      order.items?.reduce((s, i) => s + i.quantity, 0) ??
                      Number(rawOrderData?.quantity ?? 1),
                  })}
                </span>
                <span className="text-gray-500">
                  {t("offerCheckoutSuccess.deals_label")}
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
                  {t("offerCheckoutSuccess.total_price")}
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
                  {t("offerCheckoutSuccess.privacy_terms")}
                  <span className="rtl:rotate-180" aria-hidden>
                    →
                  </span>
                </Link>
              </div>
            )}

            {isOrderAlreadyActivated && (
              <div
                className={`mt-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 ${isRTL ? "text-right" : "text-left"}`}
              >
                <p className="text-sm font-semibold text-emerald-900">
                  {t("offerCheckoutSuccess.offer_activated")}
                </p>
                {activationTimestamp && (
                  <p className="mt-1 text-xs text-emerald-800/90">
                    {t("offerCheckoutSuccess.offer_activated_at", {
                      date: formatOrderDate(activationTimestamp, langBase),
                    })}
                  </p>
                )}
              </div>
            )}

            {/* أزرار الإجراءات — مثل صفحة الطلب */}
            <div className="border-t border-dashed border-gray-200 mt-6 pt-6 flex gap-3">
              {showActivateOfferButton ? (
                <button
                  type="button"
                  onClick={openVerificationSheet}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  {t("offerCheckoutSuccess.activate_offer")}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  {t("offerCheckoutSuccess.return_store")}
                </button>
              )}
              {hasVoucher && (
                <button
                  type="button"
                  onClick={handleDownloadVoucher}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#fd671a] text-white font-medium hover:bg-[#e55c18] transition-colors flex items-center justify-center gap-2"
                >
                  <IoDownloadOutline className="w-5 h-5" />
                  {t("offerCheckoutSuccess.download_pdf")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {verifySheetOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col justify-end sm:justify-center sm:items-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="verify-sheet-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 border-0 cursor-default"
            aria-label={t("offerCheckoutSuccess.close")}
            onClick={() => setVerifySheetOpen(false)}
          />
          <div
            className={`relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pb-8 pb-[max(2rem,env(safe-area-inset-bottom))] ${isRTL ? "text-right" : "text-left"}`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="relative flex items-center justify-center mb-4">
              <button
                type="button"
                onClick={() => setVerifySheetOpen(false)}
                className="absolute start-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                aria-label={t("offerCheckoutSuccess.close")}
              >
                <IoClose className="w-6 h-6" />
              </button>
              <h2
                id="verify-sheet-title"
                className="text-lg font-bold text-gray-900 px-10 text-center"
              >
                {t("offerCheckoutSuccess.verification_title")}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-6 text-center leading-relaxed">
              {t("offerCheckoutSuccess.verification_hint")}
            </p>
            <div
              className="flex justify-center gap-2 sm:gap-3 mb-6"
              onPaste={onVerifyPaste}
            >
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={(el) => {
                    verifyInputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={verifyDigits[i]}
                  onChange={(e) => setVerifyDigitAt(i, e.target.value)}
                  onKeyDown={(e) => onVerifyDigitKeyDown(i, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold rounded-xl border border-gray-300 focus:border-[#fd671a] focus:ring-2 focus:ring-[#fd671a]/25 outline-none transition-colors"
                  dir="ltr"
                  aria-label={`${t("offerCheckoutSuccess.verification_title")} ${i + 1}/4`}
                />
              ))}
            </div>
            <button
              type="button"
              disabled={verifyMerchantCode.isPending}
              onClick={submitVerificationCode}
              className="w-full py-3.5 rounded-xl bg-[#fd671a] text-white font-semibold hover:bg-[#e55c18] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {verifyMerchantCode.isPending
                ? t("offerCheckoutSuccess.verification_submitting")
                : t("offerCheckoutSuccess.verification_submit")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessPage;

import React, { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiBookmark, FiCheck, FiEye } from "react-icons/fi";
import CurrencyIcon from "@components/CurrencyIcon";
import {
  Visa,
  Master,
  ApplePay,
  Mada,
  Wallet,
  WalletIcon,
  AboutPattern,
} from "@assets";
import {
  getRestaurantById,
  getOfferById,
  getOfferImage,
  getCompanyImage,
  offerCategories,
} from "@data/offers";
import { GetStartedSection } from "@pages/home/components";
import { stripHtml } from "@utils/stripHtml";
import { useUserStore } from "@stores/userStore";
import { useCreateOrder, useSubscriptionStatus } from "@hooks/api/useMokafaatQueries";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { AxiosError } from "axios";
import { isUserSubscribed } from "@utils/subscription";
import { useQueryClient } from "@tanstack/react-query";
import { mokafaatKeys } from "@hooks/api/useMokafaatQueries";
import {
  CardNumberInput,
  ExpiryInput,
  CVVInput,
  CardholderNameInput,
  validateCardForm,
} from "@components/CardInputs";

const PaymentPage: React.FC = () => {
  const { category, restaurantId } = useParams<{
    category: string;
    restaurantId: string;
  }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const token = useUserStore((s) => s.token);
  const createOrder = useCreateOrder();
  const queryClient = useQueryClient();
  const { data: subscriptionStatusData } = useSubscriptionStatus(!!token);
  const isSubscribed = isUserSubscribed(subscriptionStatusData);

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [step, setStep] = useState<"method" | "card" | "confirm">("method");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  // Get data from URL parameters
  const offerId = searchParams.get("offer");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  // Prefer offer/restaurant from navigation state (from offer detail page), then static data
  const state = location.state as { restaurant?: unknown; offer?: unknown } | null | undefined;
  const company = (state?.restaurant ?? (restaurantId ? getRestaurantById(restaurantId) : null)) as ReturnType<typeof getRestaurantById>;
  const offer = (state?.offer ?? (offerId && restaurantId ? getOfferById(restaurantId, offerId) : null)) as ReturnType<typeof getOfferById>;
  const categoryInfo = category
    ? offerCategories.find((cat) => cat.key === category)
    : null;

  // Calculate total price
  const totalPrice = offer ? offer.discountPrice * quantity : 0;

  useEffect(() => {
    if (!company || !offer) {
      navigate("/offers");
    }
  }, [company, offer, navigate]);

  useEffect(() => {
    if (!token && company && offer) {
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname + location.search)}`);
    }
  }, [token, company, offer, navigate, location.pathname, location.search]);

  if (!company || !offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "العرض غير موجود" : "Offer not found"}
          </h1>
          <button
            onClick={() => navigate("/offers")}
            className="px-6 py-3 bg-[#400198] text-white rounded-lg hover:bg-[#54015d] transition-colors"
          >
            {isRTL ? "العودة للعروض" : "Back to Offers"}
          </button>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: "visa",
      name: { ar: "فيزا", en: "Visa" },
      icon: Visa,
    },
    {
      id: "mastercard",
      name: { ar: "ماستركارد", en: "Mastercard" },
      icon: Master,
    },
    {
      id: "applepay",
      name: { ar: "آبل باي", en: "Apple Pay" },
      icon: ApplePay,
    },
    {
      id: "mada",
      name: { ar: "مدى", en: "Mada" },
      icon: Mada,
    },
    {
      id: "wallet1",
      name: { ar: "محفظة 1", en: "Wallet 1" },
      icon: Wallet,
    },
    {
      id: "wallet2",
      name: { ar: "محفظة 2", en: "Wallet 2" },
      icon: WalletIcon,
    },
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setStep("card");
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { valid, errors } = validateCardForm({
      cardNumber,
      expiry,
      cvv,
      cardholderName,
    });
    if (!valid) {
      setCardErrors(errors);
      return;
    }
    setCardErrors({});
    setStep("confirm");
  };

  const handleConfirmPurchase = () => {
    if (!offerId || !offer) return;
    setErrorMsg(null);
    if (!isSubscribed) {
      setErrorMsg(isRTL ? "يجب أن يكون لديك اشتراك فعال للحصول على هذا العرض. يرجى الاشتراك أولاً." : "You need an active subscription for this offer. Please subscribe first.");
      return;
    }
    createOrder.mutate(
      {
        order_type: "offer",
        item_id: offerId,
        quantity,
        branch_id: undefined,
      },
      {
        onSuccess: (res: unknown) => {
          const response = res as { data?: unknown };
          const data = response?.data ?? res;
          const root = (data as Record<string, unknown>) ?? {};
          if (root.status === false) {
            const msg = (root.msg as string) || (root.message as string) || (isRTL ? "فشل إنشاء الطلب" : "Failed to create order");
            const errNum = root.errNum as string | undefined;
            if (errNum === "E005") {
              queryClient.invalidateQueries({ queryKey: mokafaatKeys.subscriptionStatus });
            }
            setErrorMsg(msg);
            return;
          }
          const inner = (root.data ?? root) as Record<string, unknown>;
          const paymentUrl = (root.payment_url ?? root.redirect_url ?? inner?.payment_url ?? inner?.redirect_url) as string | undefined;
          if (paymentUrl && typeof paymentUrl === "string") {
            window.location.href = paymentUrl;
            return;
          }
          const orderId = (root.order_id ?? inner?.order_id ?? (root.order as Record<string, unknown>)?.id) as string | number | undefined;
          if (orderId != null) {
            navigate(`/orders/${orderId}`);
            return;
          }
          setErrorMsg(isRTL ? "لم يتم إرجاع رابط الدفع. جرّب مرة أخرى." : "Payment link was not returned. Please try again.");
        },
        onError: (err) => {
          if (err instanceof AxiosError && err.response?.status === 401) {
            setErrorMsg(isRTL ? "يجب تسجيل الدخول" : "Login required");
            return;
          }
          const data = (err as AxiosError<{ msg?: string; message?: string; errNum?: string }>)?.response?.data;
          if (data?.errNum === "E005" && (data?.msg || data?.message)) {
            queryClient.invalidateQueries({ queryKey: mokafaatKeys.subscriptionStatus });
            setErrorMsg(String(data.msg || data.message));
            return;
          }
          setErrorMsg(isRTL ? "فشل إنشاء الطلب" : "Failed to create order");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/offers/${category}/${restaurantId}`)}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Restaurant Logo */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full overflow-hidden">
            <img
              src={getCompanyImage(company.logo)}
              alt={company.name[isRTL ? "ar" : "en"]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-2xl font-bold mb-2 tracking-tight leading-none text-white">
            {isRTL ? "إتمام الدفع" : "Complete Payment"}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-base mb-4">
            {stripHtml(
              isRTL
                ? "إتمام عملية الدفع للعرض المحدد"
                : "Complete payment for the selected offer"
            )}
          </p>

          {/* Location and Status */}
          <div className="flex items-center justify-center gap-4 text-white/70 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {company.location[isRTL ? "ar" : "en"]} • {company.distance}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {company.isOpen
                ? isRTL
                  ? "مفتوح"
                  : "Open"
                : isRTL
                ? "مغلق"
                : "Closed"}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-white/70 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{company.rating}</span>
              <span>({company.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye />
              <span>{company.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiBookmark />
              <span>{company.saves}</span>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-sm md:text-base">
            <Link
              to="/"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link
              to="/offers"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "العروض" : "Offers"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link
              to={`/offers/${category}`}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? categoryInfo?.ar : categoryInfo?.en}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link
              to={`/offers/${category}/${restaurantId}`}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? company.name.ar : company.name.en}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <span className="text-[#fd671a] font-medium text-xs">
              {isRTL ? "الدفع" : "Payment"}
            </span>
          </div>
        </div>

        {/* Pattern Background */}
        <div className="absolute -bottom-10 transform z-9">
          <img
            src={AboutPattern}
            alt="Pattern"
            className="w-full h-96 animate-float"
          />
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {isRTL ? "ملخص الطلب" : "Order Summary"}
              </h2>

              {/* Company Logo */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={getOfferImage(company.logo)}
                    alt={company.name[isRTL ? "ar" : "en"]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {company.name[isRTL ? "ar" : "en"]}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {company.category[isRTL ? "ar" : "en"]}
                  </p>
                </div>
              </div>

              {/* Offer Details */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={getOfferImage(offer.image)}
                    alt={offer.title[isRTL ? "ar" : "en"]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 text-sm">
                    {offer.title[isRTL ? "ar" : "en"]}
                  </h3>
                  <p className="text-gray-600 text-xs">
                    {isRTL ? `الكمية: ${quantity}` : `Quantity: ${quantity}`}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {isRTL ? "السعر الأصلي" : "Original Price"}
                  </span>
                  <span className="flex items-center gap-1">
                    {offer.originalPrice}
                    <CurrencyIcon size={12} />
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {isRTL ? "الخصم" : "Discount"}
                  </span>
                  <span className="text-green-600">
                    -{offer.discountPercentage}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {isRTL ? "السعر بعد الخصم" : "Discounted Price"}
                  </span>
                  <span className="flex items-center gap-1">
                    {offer.discountPrice}
                    <CurrencyIcon size={12} />
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    {isRTL ? "المجموع" : "Total"}
                  </span>
                  <span className="text-xl font-bold text-[#400198] flex items-center gap-1">
                    {totalPrice}
                    <CurrencyIcon size={16} />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6">
              {step === "method" && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    {isRTL ? "اختر طريقة الدفع" : "Choose Payment Method"}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className="px-4 py-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            onChange={() =>
                              handlePaymentMethodSelect(method.id)
                            }
                            className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                          />
                          <span className="font-medium text-gray-800">
                            {method.name[isRTL ? "ar" : "en"]}
                          </span>
                        </div>
                        <img
                          src={method.icon}
                          alt={method.name[isRTL ? "ar" : "en"]}
                          className="w-12 h-12 object-contain"
                        />
                      </label>
                    ))}
                  </div>
                </>
              )}

              {step === "card" && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    {isRTL ? "معلومات البطاقة" : "Card Information"}
                  </h2>

                  <form onSubmit={handleCardSubmit} className="space-y-4">
                    <CardNumberInput
                      value={cardNumber}
                      onChange={setCardNumber}
                      label={isRTL ? "رقم البطاقة" : "Card Number"}
                      placeholder="1234 5678 9012 3456"
                      required
                      isRTL={!!isRTL}
                      error={cardErrors.cardNumber}
                      className="focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <ExpiryInput
                        value={expiry}
                        onChange={setExpiry}
                        label={isRTL ? "تاريخ الانتهاء" : "Expiry Date"}
                        placeholder="MM/YY"
                        required
                        isRTL={!!isRTL}
                        error={cardErrors.expiry}
                        className="focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <CVVInput
                        value={cvv}
                        onChange={setCvv}
                        label={isRTL ? "CVV" : "CVV"}
                        placeholder="123"
                        required
                        isRTL={!!isRTL}
                        error={cardErrors.cvv}
                        className="focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <CardholderNameInput
                      value={cardholderName}
                      onChange={setCardholderName}
                      label={isRTL ? "اسم حامل البطاقة" : "Cardholder Name"}
                      placeholder={
                        isRTL
                          ? "الاسم كما هو مكتوب على البطاقة"
                          : "Name as it appears on card"
                      }
                      required
                      isRTL={!!isRTL}
                      error={cardErrors.cardholderName}
                      className="focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#400198] text-white rounded-lg hover:bg-[#54015d] transition-colors font-medium"
                    >
                      {isRTL ? "متابعة" : "Continue"}
                    </button>
                  </form>
                </>
              )}

              {step === "confirm" && (
                <>
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">
                    {isRTL ? "تأكيد الدفع" : "Confirm Payment"}
                  </h2>

                  {errorMsg && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <p>{errorMsg}</p>
                      <button
                        type="button"
                        onClick={() => navigate("/subscription/plans")}
                        className="mt-3 text-[#400198] font-medium underline hover:no-underline"
                      >
                        {isRTL ? "الذهاب لصفحة الاشتراك" : "Go to subscription page"}
                      </button>
                    </div>
                  )}

                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {isRTL ? "تأكيد الدفع" : "Confirm Payment"}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {isRTL
                        ? "هل أنت متأكد من إتمام عملية الدفع؟"
                        : "Are you sure you want to complete this payment?"}
                    </p>
                    {selectedPaymentMethod && (
                      <p className="text-gray-500 text-sm mb-4">
                        {isRTL ? "طريقة الدفع: " : "Payment method: "}
                        {selectedPaymentMethod}
                      </p>
                    )}

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setStep("card")}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {isRTL ? "العودة" : "Back"}
                      </button>
                      <button
                        onClick={handleConfirmPurchase}
                        disabled={createOrder.isPending}
                        className="px-6 py-3 bg-[#400198] text-white rounded-lg hover:bg-[#54015d] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {createOrder.isPending ? (
                          <>
                            <LoadingSpinner />
                            <span>{isRTL ? "جاري التحويل..." : "Redirecting..."}</span>
                          </>
                        ) : (
                          isRTL ? "تأكيد الدفع" : "Confirm Payment"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <GetStartedSection className="mt-16 mb-28" />
    </div>
  );
};

export default PaymentPage;

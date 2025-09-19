import React, { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
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

const PaymentPage: React.FC = () => {
  const { category, restaurantId } = useParams<{
    category: string;
    restaurantId: string;
  }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [step, setStep] = useState<"method" | "card" | "confirm">("method");

  // Get data from URL parameters
  const offerId = searchParams.get("offer");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  // Get data from unified data
  const company = restaurantId ? getRestaurantById(restaurantId) : null;
  const offer =
    offerId && restaurantId ? getOfferById(restaurantId, offerId) : null;
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
    setStep("confirm");
  };

  const handleConfirmPurchase = () => {
    // Navigate to success page with same dynamic structure
    navigate(
      `/offers/${category}/${restaurantId}/success?offer=${offerId}&quantity=${quantity}&total=${totalPrice}&method=${selectedPaymentMethod}`
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
            {isRTL
              ? "إتمام عملية الدفع للعرض المحدد"
              : "Complete payment for the selected offer"}
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "رقم البطاقة" : "Card Number"}
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isRTL ? "تاريخ الانتهاء" : "Expiry Date"}
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isRTL ? "CVV" : "CVV"}
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "اسم حامل البطاقة" : "Cardholder Name"}
                      </label>
                      <input
                        type="text"
                        placeholder={
                          isRTL
                            ? "الاسم كما هو مكتوب على البطاقة"
                            : "Name as it appears on card"
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>

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

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setStep("card")}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        {isRTL ? "العودة" : "Back"}
                      </button>
                      <button
                        onClick={handleConfirmPurchase}
                        className="px-6 py-3 bg-[#400198] text-white rounded-lg hover:bg-[#54015d] transition-colors"
                      >
                        {isRTL ? "تأكيد الدفع" : "Confirm Payment"}
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

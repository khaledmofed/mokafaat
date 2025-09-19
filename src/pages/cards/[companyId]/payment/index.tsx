import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { useState } from "react";
import {
  FiArrowLeft,
  FiCreditCard,
  //   FiDollarSign,
  //   FiGift,
} from "react-icons/fi";
import { getCompanyById, getOfferById } from "@data/cards";
import {
  Cards1,
  Cards2,
  Cards3,
  Cards4,
  Cards5,
  Cards6,
  Cards7,
  Cards8,
  AboutPattern,
  Visa,
  Master,
  ApplePay,
  Mada,
  Wallet,
  WalletIcon,
} from "@assets";
import CurrencyIcon from "@components/CurrencyIcon";
import GetStartedSection from "@pages/home/components/GetStartedSection";

const PaymentPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  const offerId = searchParams.get("offer");
  const quantity = parseInt(searchParams.get("quantity") || "1");

  const company = companyId ? getCompanyById(companyId) : null;
  const offer = companyId && offerId ? getOfferById(companyId, offerId) : null;

  const [step, setStep] = useState<"method" | "card" | "confirm">("method");

  // Function to get card image
  const getCardImage = (logoName: string) => {
    switch (logoName) {
      case "Cards1":
        return Cards1;
      case "Cards2":
        return Cards2;
      case "Cards3":
        return Cards3;
      case "Cards4":
        return Cards4;
      case "Cards5":
        return Cards5;
      case "Cards6":
        return Cards6;
      case "Cards7":
        return Cards7;
      case "Cards8":
        return Cards8;
      default:
        return Cards1;
    }
  };

  if (!company || !offer) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "العرض غير موجود" : "Offer not found"}
          </h2>
          <button
            onClick={() => navigate("/cards")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isRTL ? "العودة للبطاقات" : "Back to Cards"}
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = offer.price * quantity;

  const paymentMethods = [
    {
      id: "mastercard",
      name: { ar: "Master Card", en: "Master Card" },
      icon: Master,
      logo: "MasterCard",
    },
    {
      id: "visa",
      name: { ar: "Visa Card", en: "Visa Card" },
      icon: Visa,
      logo: "VISA",
    },
    {
      id: "applepay",
      name: { ar: "Apple Pay", en: "Apple Pay" },
      icon: ApplePay,
      logo: "Apple Pay",
    },
    {
      id: "mada",
      name: { ar: "Mada", en: "Mada" },
      icon: Mada,
      logo: "مدى mada",
    },
  ];

  const alternativeMethods = [
    {
      id: "wallet",
      name: { ar: "دفع من المحفظة", en: "Pay from Wallet" },
      icon: WalletIcon,
    },
    {
      id: "points",
      name: { ar: "الدفع من رصيد نقاطي", en: "Pay from my points balance" },
      icon: Wallet,
    },
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    if (methodId === "applepay") {
      // Direct to confirmation for Apple Pay
      setStep("confirm");
    } else {
      setStep("card");
    }
  };

  const handleCardSubmit = () => {
    setStep("confirm");
  };

  const handleConfirmPurchase = () => {
    // Navigate to success page
    navigate(
      `/cards/${companyId}/success?offer=${offerId}&quantity=${quantity}&total=${totalPrice}`
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? "الدفع الإلكتروني" : "Electronic Payment"} -{" "}
          {company.name[isRTL ? "ar" : "en"]}
        </title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/cards/${companyId}/payment`}
        />
      </Helmet>

      {/* Header */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[140px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Company Logo */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
            <img
              src={getCardImage(company.logo)}
              alt={company.name[isRTL ? "ar" : "en"]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-2xl lg:text-2xl font-semibold mb-4 tracking-tight leading-none text-white">
            {isRTL ? "الدفع الإلكتروني" : "Electronic Payment"}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg mb-4">
            {isRTL
              ? "أكمل عملية الشراء بأمان"
              : "Complete your purchase securely"}
          </p>

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
              to="/cards"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "البطاقات" : "Cards"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link
              to={`/cards/${companyId}`}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {company.name[isRTL ? "ar" : "en"]}
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

      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {isRTL ? "ملخص الطلب" : "Order Summary"}
            </h2>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  src={getCardImage(company.logo)}
                  alt={company.name[isRTL ? "ar" : "en"]}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {offer.title[isRTL ? "ar" : "en"]}
                </h3>
                <p className="text-sm text-gray-600">
                  {isRTL ? `الكمية: ${quantity}` : `Quantity: ${quantity}`}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  {isRTL ? "المجموع" : "Total"}
                </span>
                <span className="text-2xl font-bold text-orange-500 flex items-center gap-1">
                  {totalPrice}
                  <CurrencyIcon className="text-orange-500" size={20} />
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          {step === "method" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {isRTL ? "اختر طريقة الدفع" : "Choose Payment Method"}
              </h2>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="px-2 py-2 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        onChange={() => handlePaymentMethodSelect(method.id)}
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

              {/* Alternative Payment Methods */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {isRTL ? "الدفع من خلال" : "Pay via"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {alternativeMethods.map((method) => (
                    <label
                      key={method.id}
                      className="px-2 py-2 bg-gray-100 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          onChange={() => handlePaymentMethodSelect(method.id)}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <span className="font-medium text-gray-800">
                          {method.name[isRTL ? "ar" : "en"]}
                        </span>
                      </div>
                      <img
                        src={method.icon}
                        alt={method.name[isRTL ? "ar" : "en"]}
                        className="w-12 h-10 object-contain"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Card Details Form */}
          {step === "card" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {isRTL ? "إضافة طريقة الدفع" : "Add Payment Method"}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCardSubmit();
                }}
              >
                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {isRTL ? "رقم البطاقة" : "Card Number"}
                    </label>
                    <div className="relative">
                      <FiCreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="3999 - 1234 - 5678 - 0000"
                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  {/* Expiry and CVC */}
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
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep("method")}
                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isRTL ? "عودة" : "Back"}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    {isRTL ? "تأكيد" : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Confirmation */}
          {step === "confirm" && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                {isRTL ? "تأكيد الشراء" : "Confirm Purchase"}
              </h2>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {isRTL ? "تأكيد الدفع" : "Payment Confirmation"}
                </h3>
                <p className="text-gray-600">
                  {isRTL
                    ? "هل أنت متأكد من إتمام عملية الشراء؟"
                    : "Are you sure you want to complete this purchase?"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {isRTL ? "المجموع النهائي" : "Final Total"}
                  </span>
                  <span className="text-2xl font-bold text-orange-500 flex items-center gap-1">
                    {totalPrice}
                    <CurrencyIcon className="text-orange-500" size={20} />
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep("method")}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isRTL ? "عودة" : "Back"}
                </button>
                <button
                  onClick={handleConfirmPurchase}
                  className="flex-1 py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  {isRTL ? "تأكيد الشراء" : "Confirm Purchase"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default PaymentPage;

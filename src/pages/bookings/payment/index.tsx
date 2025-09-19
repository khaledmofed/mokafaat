import React, { useState, useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiCheck, FiStar } from "react-icons/fi";
import { MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
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
import { GetStartedSection } from "@pages/home/components";

// Mock booking data - in real app this would come from API
const getBookingById = (type: string, id: string) => {
  const mockBookings = {
    flights: [
      {
        id: "1",
        name: { ar: "رحلة إلى دبي", en: "Flight to Dubai" },
        image:
          "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500",
        price: 1200,
        rating: 4.8,
        reviews: 124,
        description: {
          ar: "رحلة مريحة إلى دبي",
          en: "Comfortable flight to Dubai",
        },
        duration: "3h 45m",
        airline: "الإمارات",
        departure: "14:30",
        arrival: "18:15",
        stops: "مباشر",
        class: "اقتصادي",
      },
      {
        id: "2",
        name: { ar: "رحلة إلى باريس", en: "Flight to Paris" },
        image:
          "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500",
        price: 1800,
        rating: 4.9,
        reviews: 89,
        description: {
          ar: "رحلة رومانسية إلى باريس",
          en: "Romantic flight to Paris",
        },
        duration: "6h 20m",
        airline: "الخطوط الفرنسية",
        departure: "09:15",
        arrival: "15:35",
        stops: "توقف واحد",
        class: "اقتصادي",
      },
    ],
    hotels: [
      {
        id: "1",
        name: { ar: "فندق شيراتون", en: "Sheraton Hotel" },
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
        price: 450,
        rating: 4.7,
        reviews: 256,
        description: {
          ar: "فندق فاخر في قلب المدينة",
          en: "Luxury hotel in city center",
        },
        stars: 5,
        location: "وسط المدينة",
        distance: "2.5 كم من المركز",
        amenities: "واي فاي مجاني, مسبح, جيم, مطعم",
      },
      {
        id: "2",
        name: { ar: "فندق هيلتون", en: "Hilton Hotel" },
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
        price: 380,
        rating: 4.6,
        reviews: 189,
        description: {
          ar: "فندق أنيق مع خدمات ممتازة",
          en: "Elegant hotel with excellent services",
        },
        stars: 4,
        location: "منطقة الأعمال",
        distance: "1.8 كم من المركز",
        amenities: "واي فاي مجاني, مسبح, مطعم, بار",
      },
    ],
    cars: [
      {
        id: "1",
        name: { ar: "تويوتا كامري", en: "Toyota Camry" },
        image:
          "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500",
        price: 120,
        rating: 4.5,
        reviews: 78,
        description: {
          ar: "سيارة مريحة ومناسبة للعائلات",
          en: "Comfortable car suitable for families",
        },
        type: "سيدان",
        transmission: "أوتوماتيك",
        seats: 5,
        fuel: "بنزين",
        year: 2022,
      },
      {
        id: "2",
        name: { ar: "هيونداي توسان", en: "Hyundai Tucson" },
        image:
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500",
        price: 150,
        rating: 4.7,
        reviews: 92,
        description: { ar: "سيارة دفع رباعي قوية", en: "Powerful SUV" },
        type: "دفع رباعي",
        transmission: "أوتوماتيك",
        seats: 7,
        fuel: "بنزين",
        year: 2023,
      },
    ],
  };

  return mockBookings[type as keyof typeof mockBookings]?.find(
    (booking) => booking.id === id
  );
};

const PaymentPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [step, setStep] = useState<"method" | "card" | "confirm">("method");

  // Get data from URL parameters
  const bookingId = searchParams.get("booking");
  const quantity = parseInt(searchParams.get("quantity") || "1");
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  // Get booking data
  const booking = bookingId && type ? getBookingById(type, bookingId) : null;

  // Calculate total price
  const totalPrice = booking ? booking.price * quantity : 0;

  useEffect(() => {
    if (!booking || !type) {
      navigate("/bookings");
    }
  }, [booking, type, navigate]);

  if (!booking || !type) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "الحجز غير موجود" : "Booking not found"}
          </h1>
          <button
            onClick={() => navigate("/bookings")}
            className="px-6 py-3 bg-[#400198] text-white rounded-lg hover:bg-[#54015d] transition-colors"
          >
            {isRTL ? "العودة للحجوزات" : "Back to Bookings"}
          </button>
        </div>
      </div>
    );
  }

  const getTypeIcon = () => {
    switch (type) {
      case "flights":
        return <MdOutlineFlight className="text-2xl" />;
      case "hotels":
        return <RiHotelLine className="text-2xl" />;
      case "cars":
        return <FaCar className="text-2xl" />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "flights":
        return isRTL ? "رحلة" : "Flight";
      case "hotels":
        return isRTL ? "فندق" : "Hotel";
      case "cars":
        return isRTL ? "سيارة" : "Car";
      default:
        return "";
    }
  };

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
    // Navigate to success page
    navigate(
      `/bookings/${type}/success?booking=${bookingId}&quantity=${quantity}&date=${date}&time=${time}&total=${totalPrice}&method=${selectedPaymentMethod}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Booking Header */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate("/bookings")}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Booking Icon */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            {getTypeIcon()}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-2xl font-bold mb-2 tracking-tight leading-none text-white">
            {isRTL ? "إتمام الدفع" : "Complete Payment"}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-base mb-4">
            {isRTL
              ? `إتمام عملية الدفع لـ ${getTypeLabel()} المحدد`
              : `Complete payment for the selected ${getTypeLabel()}`}
          </p>

          {/* Booking Details */}
          <div className="flex items-center justify-center gap-4 text-white/70 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {booking.name[isRTL ? "ar" : "en"]}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {isRTL ? `الكمية: ${quantity}` : `Quantity: ${quantity}`}
            </span>
            {date && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {date}
              </span>
            )}
            {time && (
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {time}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 text-white/70 mb-4">
            <div className="flex items-center gap-1">
              <FiStar className="text-yellow-400" />
              <span>{booking.rating}</span>
              <span>({booking.reviews})</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">
                {totalPrice}
                <CurrencyIcon className="inline ml-1" size={16} />
              </span>
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
              to="/bookings"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "الحجوزات" : "Bookings"}
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

              {/* Booking Image */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={booking.image}
                    alt={booking.name[isRTL ? "ar" : "en"]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">
                    {booking.name[isRTL ? "ar" : "en"]}
                  </h3>
                  <p className="text-sm text-gray-600">{getTypeLabel()}</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {isRTL ? "السعر الأساسي" : "Base Price"}
                  </span>
                  <span className="flex items-center gap-1">
                    {booking.price}
                    <CurrencyIcon size={12} />
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {isRTL ? "الكمية" : "Quantity"}
                  </span>
                  <span>{quantity}</span>
                </div>
                {date && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {isRTL ? "التاريخ" : "Date"}
                    </span>
                    <span>{date}</span>
                  </div>
                )}
                {time && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {isRTL ? "الوقت" : "Time"}
                    </span>
                    <span>{time}</span>
                  </div>
                )}
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

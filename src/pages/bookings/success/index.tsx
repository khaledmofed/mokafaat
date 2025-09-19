import React, { useEffect } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  // Link,
} from "react-router-dom";
import { useIsRTL } from "@hooks";
import { FiCheck, FiDownload, FiShare, FiStar } from "react-icons/fi";
// import { MdOutlineFlight } from "react-icons/md";
// import { RiHotelLine } from "react-icons/ri";
// import { FaCar } from "react-icons/fa";
import CurrencyIcon from "@components/CurrencyIcon";
import { GetStartedSection } from "@pages/home/components";

// Types for booking data
interface BaseBooking {
  id: string;
  name: { ar: string; en: string };
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: { ar: string; en: string };
}

interface FlightBooking extends BaseBooking {
  duration: string;
  airline: string;
  departure: string;
  arrival: string;
  stops: string;
  class: string;
}

interface HotelBooking extends BaseBooking {
  stars: number;
  location: string;
  distance: string;
  amenities: string;
}

interface CarBooking extends BaseBooking {
  type: string;
  transmission: string;
  seats: number;
  fuel: string;
  year: number;
}

type Booking = FlightBooking | HotelBooking | CarBooking;

// Mock booking data - same as payment page
const getBookingById = (type: string, id: string): Booking | undefined => {
  const mockBookings: {
    flights: FlightBooking[];
    hotels: HotelBooking[];
    cars: CarBooking[];
  } = {
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

const SuccessPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  // Get data from URL parameters
  const bookingId = searchParams.get("booking");
  const quantity = parseInt(searchParams.get("quantity") || "1");
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const total = parseInt(searchParams.get("total") || "0");
  const method = searchParams.get("method") || "";

  // Get booking data
  const booking = bookingId && type ? getBookingById(type, bookingId) : null;

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

  // const getTypeIcon = () => {
  //   switch (type) {
  //     case "flights":
  //       return <MdOutlineFlight className="text-2xl" />;
  //     case "hotels":
  //       return <RiHotelLine className="text-2xl" />;
  //     case "cars":
  //       return <FaCar className="text-2xl" />;
  //     default:
  //       return null;
  //   }
  // };

  // Type guards
  const isFlightBooking = (booking: Booking): booking is FlightBooking => {
    return "duration" in booking && "airline" in booking;
  };

  const isHotelBooking = (booking: Booking): booking is HotelBooking => {
    return "stars" in booking && "location" in booking;
  };

  const isCarBooking = (booking: Booking): booking is CarBooking => {
    return "type" in booking && "transmission" in booking;
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

  const getPaymentMethodName = () => {
    const methods = {
      visa: { ar: "فيزا", en: "Visa" },
      mastercard: { ar: "ماستركارد", en: "Mastercard" },
      applepay: { ar: "آبل باي", en: "Apple Pay" },
      mada: { ar: "مدى", en: "Mada" },
      wallet1: { ar: "محفظة 1", en: "Wallet 1" },
      wallet2: { ar: "محفظة 2", en: "Wallet 2" },
    };
    return (
      methods[method as keyof typeof methods] || {
        ar: "غير محدد",
        en: "Unknown",
      }
    );
  };

  const generateQRCode = () => {
    // In real app, this would generate actual QR code
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkJSIDIwMjQ8L3RleHQ+PC9zdmc+";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Header */}
      <section className="relative w-full bg-gradient-to-r from-green-600 to-green-700 overflow-hidden min-h-[300px] flex items-center justify-center">
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-lg">
            <FiCheck className="text-green-600 text-3xl" />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-none text-white">
            {isRTL ? "تم الدفع بنجاح!" : "Payment Successful!"}
          </h1>

          {/* Description */}
          <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
            {isRTL
              ? `تم تأكيد حجز ${getTypeLabel()} الخاص بك بنجاح. ستتلقى رسالة تأكيد على بريدك الإلكتروني قريباً.`
              : `Your ${getTypeLabel()} booking has been confirmed successfully. You will receive a confirmation email shortly.`}
          </p>

          {/* Booking Reference */}
          <div className="bg-white/20 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <p className="text-white/80 text-sm mb-2">
              {isRTL ? "رقم المرجع" : "Reference Number"}
            </p>
            <p className="text-white font-mono text-lg font-bold">
              BR-{new Date().getFullYear()}-{bookingId?.padStart(4, "0")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-white text-green-700 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
            >
              <FiDownload />
              {isRTL ? "طباعة" : "Print"}
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: isRTL ? "تأكيد الحجز" : "Booking Confirmation",
                    text: isRTL
                      ? `تم تأكيد حجز ${getTypeLabel()}`
                      : `${getTypeLabel()} booking confirmed`,
                    url: window.location.href,
                  });
                }
              }}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium flex items-center gap-2"
            >
              <FiShare />
              {isRTL ? "مشاركة" : "Share"}
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {isRTL ? "تفاصيل الحجز" : "Booking Details"}
              </h2>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img
                    src={booking.image}
                    alt={booking.name[isRTL ? "ar" : "en"]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {booking.name[isRTL ? "ar" : "en"]}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {booking.description[isRTL ? "ar" : "en"]}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" />
                      <span>{booking.rating}</span>
                      <span>({booking.reviews})</span>
                    </div>
                    <span>•</span>
                    <span>{getTypeLabel()}</span>
                  </div>
                </div>
              </div>

              {/* Booking Specific Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {isRTL ? "الكمية" : "Quantity"}
                  </h4>
                  <p className="text-gray-600">{quantity}</p>
                </div>
                {date && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "التاريخ" : "Date"}
                    </h4>
                    <p className="text-gray-600">{date}</p>
                  </div>
                )}
                {time && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "الوقت" : "Time"}
                    </h4>
                    <p className="text-gray-600">{time}</p>
                  </div>
                )}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {isRTL ? "طريقة الدفع" : "Payment Method"}
                  </h4>
                  <p className="text-gray-600">
                    {getPaymentMethodName()[isRTL ? "ar" : "en"]}
                  </p>
                </div>
              </div>

              {/* Additional Details based on type */}
              {type === "flights" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "مدة الرحلة" : "Duration"}
                    </h4>
                    <p className="text-gray-600">
                      {isFlightBooking(booking) ? booking.duration : ""}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "شركة الطيران" : "Airline"}
                    </h4>
                    <p className="text-gray-600">
                      {isFlightBooking(booking) ? booking.airline : ""}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "الفئة" : "Class"}
                    </h4>
                    <p className="text-gray-600">
                      {isFlightBooking(booking) ? booking.class : ""}
                    </p>
                  </div>
                </div>
              )}

              {type === "hotels" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "التقييم" : "Rating"}
                    </h4>
                    <p className="text-gray-600">
                      {isHotelBooking(booking) ? booking.stars : 0}{" "}
                      {isRTL ? "نجمة" : "Stars"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "الموقع" : "Location"}
                    </h4>
                    <p className="text-gray-600">
                      {isHotelBooking(booking) ? booking.location : ""}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "المسافة" : "Distance"}
                    </h4>
                    <p className="text-gray-600">
                      {isHotelBooking(booking) ? booking.distance : ""}
                    </p>
                  </div>
                </div>
              )}

              {type === "cars" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "نوع السيارة" : "Car Type"}
                    </h4>
                    <p className="text-gray-600">
                      {isCarBooking(booking) ? booking.type : ""}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "ناقل الحركة" : "Transmission"}
                    </h4>
                    <p className="text-gray-600">
                      {isCarBooking(booking) ? booking.transmission : ""}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {isRTL ? "عدد المقاعد" : "Seats"}
                    </h4>
                    <p className="text-gray-600">
                      {isCarBooking(booking) ? booking.seats : 0}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {isRTL ? "الخطوات التالية" : "Next Steps"}
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {isRTL ? "تأكيد البريد الإلكتروني" : "Email Confirmation"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "ستتلقى رسالة تأكيد مفصلة على بريدك الإلكتروني خلال دقائق"
                        : "You will receive a detailed confirmation email within minutes"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {isRTL ? "الاستعداد للحجز" : "Prepare for Booking"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "تأكد من إحضار الهوية والوثائق المطلوبة في يوم الحجز"
                        : "Make sure to bring ID and required documents on booking day"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {isRTL ? "التواصل معنا" : "Contact Us"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "في حالة وجود أي استفسارات، لا تتردد في التواصل مع فريق الدعم"
                        : "If you have any questions, feel free to contact our support team"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code & Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {isRTL ? "رمز الاسترداد" : "QR Code"}
              </h2>

              {/* QR Code */}
              <div className="text-center mb-6">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <img
                    src={generateQRCode()}
                    alt="QR Code"
                    className="w-40 h-40"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {isRTL
                    ? "اعرض هذا الرمز عند الوصول"
                    : "Show this code upon arrival"}
                </p>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {isRTL ? "ملخص السعر" : "Price Summary"}
                </h3>
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
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {isRTL ? "الضرائب" : "Taxes"}
                    </span>
                    <span className="flex items-center gap-1">
                      0
                      <CurrencyIcon size={12} />
                    </span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">
                      {isRTL ? "المجموع" : "Total"}
                    </span>
                    <span className="text-xl font-bold text-[#400198] flex items-center gap-1">
                      {total}
                      <CurrencyIcon size={16} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate("/bookings")}
                  className="w-full py-3 bg-[#400198] text-white rounded-lg hover:bg-[#54015d] transition-colors font-medium"
                >
                  {isRTL ? "العودة للحجوزات" : "Back to Bookings"}
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  {isRTL ? "العودة للرئيسية" : "Back to Home"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GetStartedSection className="mt-16 mb-28" />
    </div>
  );
};

export default SuccessPage;

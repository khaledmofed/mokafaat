import React from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiBookmark, FiEye } from "react-icons/fi";
import CurrencyIcon from "@components/CurrencyIcon";
import { AboutPattern } from "@assets";
import {
  getRestaurantById,
  getOfferById,
  getOfferImage,
  getCompanyImage,
  offerCategories,
} from "@data/offers";
import { GetStartedSection } from "@pages/home/components";
import { stripHtml } from "@utils/stripHtml";

const SuccessPage: React.FC = () => {
  const { category, restaurantId } = useParams<{
    category: string;
    restaurantId: string;
  }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  // Get data from URL parameters
  const offerId = searchParams.get("offer");
  const quantity = parseInt(searchParams.get("quantity") || "1");
  const total = parseInt(searchParams.get("total") || "0");
  const paymentMethod = searchParams.get("method") || "";

  // Get data from unified data
  const company = restaurantId ? getRestaurantById(restaurantId) : null;
  const offer =
    offerId && restaurantId ? getOfferById(restaurantId, offerId) : null;
  const categoryInfo = category
    ? offerCategories.find((cat) => cat.key === category)
    : null;

  const handleBackToOffers = () => {
    navigate("/offers");
  };

  const handleViewOrder = () => {
    // Simulate PDF download
    const link = document.createElement("a");
    link.href = "#";
    link.download = `order-${offer?.id || "unknown"}.pdf`;
    link.click();
  };

  if (!company || !offer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#400198] to-[#54015d] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">
            {isRTL ? "العرض غير موجود" : "Offer not found"}
          </h1>
          <button
            onClick={handleBackToOffers}
            className="px-6 py-3 bg-white text-[#400198] rounded-full hover:bg-gray-100 transition-colors"
          >
            {isRTL ? "العودة للعروض" : "Back to Offers"}
          </button>
        </div>
      </div>
    );
  }

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
            {isRTL ? "تم الدفع بنجاح!" : "Payment Successful!"}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-base mb-4">
            {stripHtml(
              isRTL
                ? "شكراً لك! تم تأكيد طلبك بنجاح"
                : "Thank you! Your order has been confirmed successfully"
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
              {isRTL ? "النجاح" : "Success"}
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

      <div className="container mx-auto px-4 max-w-4xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Card for Restaurant */}
          <div className="bg-[#400198] rounded-3xl p-6 relative">
            {/* Tear-off circles */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#400198] rounded-full ml-0"></div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#400198] rounded-full mr-0"></div>

            <div className="bg-white rounded-2xl p-6 h-full">
              {/* Header */}
              <p className="text-gray-600 text-sm text-center mb-4">
                {isRTL
                  ? "استخدم هذه البطاقة في الدفع للمتاجر"
                  : "Use this card for in-store payments"}
              </p>

              {/* QR Code */}
              <div className="w-auto h-[183px] mx-auto mb-4">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://mokafaat.com/order-confirmed"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Dashed Line */}
              <div className="border-t-2 border-dashed border-gray-300 mb-4"></div>

              {/* User Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {isRTL ? "خالد مفيد الشيخ علي" : "Khaled Mofed Al-Sheikh Ali"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {isRTL
                    ? "رقم إثبات / 10124587714"
                    : "ID Number / 10124587714"}
                </p>
              </div>

              {/* Card Number */}
              <div className="text-center mb-6">
                <p className="text-2xl font-bold text-gray-800 tracking-wider">
                  242 325 678 122
                </p>
              </div>

              {/* Status */}
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm mb-2">
                  {isRTL ? "حالة البطاقة" : "Card Status"}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-green-600 font-semibold">
                    {isRTL ? "فعالة" : "Active"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-white rounded-3xl shadow-2xl p-4 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Success Message */}
            <h2 className="text-2xl font-bold text-gray-800 mb-0">
              {isRTL ? "تم الدفع بنجاح!" : "Payment Successful!"}
            </h2>

            <p className="text-gray-600 text-lg mb-2">
              {isRTL
                ? "شكراً لك! تم تأكيد طلبك بنجاح"
                : "Thank you! Your order has been confirmed successfully"}
            </p>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-xl p-6 mb-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {isRTL ? "تفاصيل الطلب" : "Order Details"}
              </h2>

              {/* Company Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={getOfferImage(company.logo)}
                    alt={company.name[isRTL ? "ar" : "en"]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right flex-1">
                  <h3 className="font-medium text-gray-800">
                    {company.name[isRTL ? "ar" : "en"]}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {company.category[isRTL ? "ar" : "en"]}
                  </p>
                </div>
              </div>

              {/* Offer Details */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={getOfferImage(offer.image)}
                    alt={offer.title[isRTL ? "ar" : "en"]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right flex-1">
                  <h3 className="font-medium text-gray-800">
                    {offer.title[isRTL ? "ar" : "en"]}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isRTL ? `الكمية: ${quantity}` : `Quantity: ${quantity}`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {isRTL ? "الكمية:" : "Quantity:"}
                  </span>
                  <span className="font-medium text-gray-800">{quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {isRTL ? "طريقة الدفع:" : "Payment Method:"}
                  </span>
                  <span className="font-medium text-gray-800">
                    {paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {isRTL ? "المجموع:" : "Total:"}
                  </span>
                  <span className="font-medium text-[#400198] flex items-center gap-1">
                    {total}
                    <CurrencyIcon size={16} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {isRTL ? "تاريخ الطلب:" : "Order Date:"}
                  </span>
                  <span className="font-medium text-gray-800">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleViewOrder}
                className="py-3 px-8 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
              >
                {isRTL ? "تنزيل ملف PDF" : "Download PDF File"}
              </button>
              <button
                onClick={handleBackToOffers}
                className="py-3 px-8 bg-white border-2 border-gray-300 text-gray-800 rounded-full hover:bg-gray-50 transition-colors font-medium"
              >
                {isRTL ? "موافق" : "OK"}
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-sm text-gray-500">
              <p>
                {isRTL
                  ? "سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني"
                  : "Order details will be sent to your email"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <GetStartedSection className="mt-16 mb-28" />
    </div>
  );
};

export default SuccessPage;

import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { useMemo } from "react";
import {
  getCompanyById,
  getOfferById,
  type CardCompany,
  type CardOffer,
} from "@data/cards";
import CurrencyIcon from "@components/CurrencyIcon";
import { Cardpayment } from "@assets";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiCardsToModels } from "@network/mappers/cardsMapper";

const SuccessPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const { data: webHomeResponse } = useWebHome();

  const offerId = searchParams.get("offer");
  const quantity = parseInt(searchParams.get("quantity") || "1");
  const total = parseFloat(searchParams.get("total") || "0");

  const apiCardCompanyAndOffer = useMemo((): {
    company: CardCompany;
    offer: CardOffer;
  } | null => {
    if (!webHomeResponse || !companyId) return null;
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cards = data?.cards as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(cards)) return null;
    const models = mapApiCardsToModels(cards);
    const card = models.find((c) => String(c.id) === String(companyId));
    if (!card) return null;
    const offer: CardOffer = {
      id: String(card.id),
      title: { ar: card.title, en: card.title },
      description: { ar: card.description ?? "", en: card.description ?? "" },
      price: parseFloat(card.price) || 0,
      currency: "SAR",
      validity: { ar: "", en: "" },
      features: [],
      image: card.image,
      rating: 0,
      purchases: 0,
      views: 0,
      downloads: 0,
      bookmarks: 0,
    };
    const company: CardCompany = {
      id: String(card.id),
      name: { ar: card.title, en: card.title },
      logo: card.image,
      category: {
        key: card.category || "other",
        ar: card.category,
        en: card.category,
      },
      description: { ar: card.description ?? "", en: card.description ?? "" },
      color: "#400198",
      offers: [offer],
    };
    return { company, offer };
  }, [webHomeResponse, companyId]);

  const staticCompany = companyId ? getCompanyById(companyId) : null;
  const staticOffer =
    companyId && offerId ? getOfferById(companyId, offerId) : null;
  const company = staticCompany || apiCardCompanyAndOffer?.company || null;
  const offer =
    staticOffer ||
    (apiCardCompanyAndOffer &&
    String(apiCardCompanyAndOffer.offer.id) === String(offerId)
      ? apiCardCompanyAndOffer.offer
      : null) ||
    null;

  if (!company || !offer) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "خطأ في البيانات" : "Data Error"}
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

  const handleBackToCards = () => {
    navigate("/cards");
  };

  const handleViewOrder = () => {
    // Navigate to order details or download PDF
    window.open(
      `/cards/${companyId}/download?offer=${offerId}&quantity=${quantity}`,
      "_blank"
    );
  };

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? "تم الشراء بنجاح" : "Purchase Successful"} -{" "}
          {company.name[isRTL ? "ar" : "en"]}
        </title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#400198] to-[#54015d] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          {/* Credit Card Illustration */}
          <div className="relative mb-8 mx-auto text-center w-full">
            <img
              src={Cardpayment}
              alt="Credit Card"
              className="w-36 h-auto mx-auto"
            />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isRTL ? "شكراً لك" : "Thank You"}
          </h1>
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            {isRTL
              ? "تم شراء البطاقة بنجاح"
              : "The card has been successfully purchased"}
          </h2>
          <p className="text-gray-600 mb-8 text-sm">
            {isRTL
              ? "نسعد بتجربتك معنا"
              : "We are happy with your experience with us"}
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-right">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {isRTL ? "رقم الطلب" : "Order Number"}
              </span>
              <span className="text-sm font-medium text-gray-800">
                #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {isRTL ? "الشركة" : "Company"}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {company.name[isRTL ? "ar" : "en"]}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {isRTL ? "العرض" : "Offer"}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {offer.title[isRTL ? "ar" : "en"]}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                {isRTL ? "الكمية" : "Quantity"}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {quantity}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  {isRTL ? "المجموع" : "Total"}
                </span>
                <span className="text-lg font-bold text-orange-500 flex items-center gap-1">
                  {total}
                  <CurrencyIcon className="text-orange-500" size={18} />
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleViewOrder}
              className="flex-1 py-3 px-6 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
            >
              {isRTL ? "تنزيل ملف PDF" : "Download PDF File"}
            </button>
            <button
              onClick={handleBackToCards}
              className="flex-1 py-3 px-6 bg-white border-2 border-gray-300 text-gray-800 rounded-full hover:bg-gray-50 transition-colors font-medium"
            >
              {isRTL ? "موافق" : "OK"}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-xs text-gray-500">
            <p>
              {isRTL
                ? "سيتم إرسال تفاصيل البطاقة إلى بريدك الإلكتروني"
                : "Card details will be sent to your email"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;

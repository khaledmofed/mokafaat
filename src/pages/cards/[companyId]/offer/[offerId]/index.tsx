import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiMinus, FiPlus, FiStar, FiEye, FiBookmark } from "react-icons/fi";
import { getCompanyById, type CardCompany, type CardOffer } from "@data/cards";
import CurrencyIcon from "@components/CurrencyIcon";
import { stripHtml } from "@utils/stripHtml";
import {
  Cards1,
  Cards2,
  Cards3,
  Cards4,
  Cards5,
  Cards6,
  Cards7,
  Cards8,
  Cards12,
  Cards13,
  Cards14,
  AboutPattern,
} from "@assets";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiCardsToModels } from "@network/mappers/cardsMapper";

const CardOfferDetailPage = () => {
  const { companyId, offerId } = useParams<{ companyId: string; offerId: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const [quantity, setQuantity] = useState(1);

  const { data: webHomeResponse } = useWebHome();

  const apiCompany = useMemo((): CardCompany | null => {
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
      description: {
        ar: card.description ?? "",
        en: card.description ?? "",
      },
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
    return {
      id: String(card.id),
      name: { ar: card.title, en: card.title },
      logo: card.image,
      category: {
        key: card.category || "other",
        ar: card.category,
        en: card.category,
      },
      description: {
        ar: card.description ?? "",
        en: card.description ?? "",
      },
      color: "#400198",
      offers: [offer],
    };
  }, [webHomeResponse, companyId]);

  const staticCompany = companyId ? getCompanyById(companyId) : null;
  const company = staticCompany || apiCompany;
  const offer = useMemo(() => {
    if (!company || !offerId) return null;
    return company.offers.find((o) => String(o.id) === String(offerId)) ?? null;
  }, [company, offerId]);

  const getCardImage = (logoName: string) => {
    if (logoName.startsWith("http")) return logoName;
    switch (logoName) {
      case "Cards1": return Cards1;
      case "Cards2": return Cards2;
      case "Cards3": return Cards3;
      case "Cards4": return Cards4;
      case "Cards5": return Cards5;
      case "Cards6": return Cards6;
      case "Cards7": return Cards7;
      case "Cards8": return Cards8;
      case "Cards12": return Cards12;
      case "Cards13": return Cards13;
      case "Cards14": return Cards14;
      default: return Cards1;
    }
  };

  const handlePurchase = () => {
    if (!companyId || !offerId) return;
    window.location.href = `/cards/${companyId}/payment?offer=${offerId}&quantity=${quantity}`;
  };

  if (!company || !offer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
  const companyName = company.name[isRTL ? "ar" : "en"];
  const offerTitle = offer.title[isRTL ? "ar" : "en"];

  const offerDescription = stripHtml(offer.description[isRTL ? "ar" : "en"]);

  return (
    <>
      <Helmet>
        <title>{offerTitle} - {companyName} | {isRTL ? "البطاقات" : "Cards"}</title>
        <link rel="canonical" href={`https://mukafaat.com/cards/${companyId}/offer/${offerId}`} />
      </Helmet>

      {/* Header - ترويسة داكنة مثل صفحة العروض */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/cards/${companyId}`)}
            className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} text-white hover:text-purple-300 transition-colors flex items-center gap-2`}
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Logo دائري */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30">
            <img
              src={getCardImage(company.logo)}
              alt={companyName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* عنوان العرض */}
          <h1 className="text-2xl md:text-2xl font-semibold mb-2 tracking-tight leading-none text-white">
            {offerTitle}
          </h1>

          {/* وصف قصير */}
          {offerDescription && (
            <p className="text-white/80 text-base mb-4 max-w-xl mx-auto line-clamp-2">
              {offerDescription}
            </p>
          )}

          {/* إحصائيات */}
          <div className="flex items-center justify-center gap-6 text-white/70 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{offer.rating}</span>
              <span>({offer.purchases})</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye className="w-4 h-4" />
              <span>{offer.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiBookmark className="w-4 h-4" />
              <span>{offer.bookmarks}</span>
            </div>
          </div>

          {/* Breadcrumb بفواصل | والعنصر الحالي برتقالي */}
          <div className="flex items-center justify-center text-sm md:text-base flex-wrap gap-x-1">
            <Link
              to="/"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-white text-xs">|</span>
            <Link
              to="/cards"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "البطاقات" : "Cards"}
            </Link>
            <span className="text-white text-xs">|</span>
            <Link
              to={`/cards/${companyId}`}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {companyName}
            </Link>
            <span className="text-white text-xs">|</span>
            <span className="text-[#fd671a] font-medium text-xs" aria-current="page">
              {offerTitle}
            </span>
          </div>
        </div>

        <div className="absolute -bottom-10 transform z-0">
          <img src={AboutPattern} alt="" className="w-full h-96 animate-float" />
        </div>
      </section>

      {/* المحتوى */}
      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "0" }}>
        <div className="container mx-auto px-4 py-8 max-w-4xl -mt-2 relative z-10">
          {/* Content card (محتوى الصفحة كما كان في المودال) */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={getCardImage(company.logo)}
                    alt={companyName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">
                    {offerTitle}
                  </h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" />
                      <span>{offer.rating}</span>
                    </div>
                    <span>•</span>
                    <span>
                      {isRTL
                        ? `${offer.purchases} عدد مرات الشراء`
                        : `${offer.purchases} purchases`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 flex items-center gap-1">
                {totalPrice}
                <CurrencyIcon className="text-gray-800" size={28} />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <section className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {isRTL ? "تفاصيل العرض" : "Offer Details"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {isRTL ? "صلاحية الحزمة" : "Package Validity"}
                    </div>
                    <div className="font-medium text-gray-800">
                      {offer.validity[isRTL ? "ar" : "en"] || "—"}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">
                      {isRTL ? "مميزات الخدمة" : "Service Features"}
                    </div>
                    <div className="font-medium text-gray-800">
                      {isRTL ? "متجددة" : "Renewable"}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">
                    {isRTL ? "تعرف أكثر عن الخدمة" : "Learn more about the service"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {stripHtml(offer.description[isRTL ? "ar" : "en"])}
                  </p>
                </div>
              </section>

              {offer.features.length > 0 && (
                <section className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    {isRTL ? "المميزات" : "Features"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {offer.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                      >
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Quantity */}
              <div className="flex items-center justify-center gap-4 my-8">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
                >
                  <FiMinus className="text-white" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handlePurchase}
                  className="py-3 px-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors font-medium"
                >
                  {isRTL ? "شراء سريع" : "Quick Buy"}
                </button>
                <button
                  onClick={handlePurchase}
                  className="py-3 px-10 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Apple Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardOfferDetailPage;

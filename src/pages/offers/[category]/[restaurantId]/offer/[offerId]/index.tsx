import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiMinus, FiPlus, FiStar, FiEye } from "react-icons/fi";
import {
  getRestaurantById,
  offerCategories,
  type Offer,
  type Restaurant,
} from "@data/offers";
import CurrencyIcon from "@components/CurrencyIcon";
import { stripHtml } from "@utils/stripHtml";
import { Pro1, Pro2, Pro3, Pro4, Pro5, Pro6, Pro7, Pro8, AboutPattern } from "@assets";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";

const getOfferImageSrc = (imageName: string) => {
  if (imageName.startsWith("http")) return imageName;
  switch (imageName) {
    case "Pro1": return Pro1;
    case "Pro2": return Pro2;
    case "Pro3": return Pro3;
    case "Pro4": return Pro4;
    case "Pro5": return Pro5;
    case "Pro6": return Pro6;
    case "Pro7": return Pro7;
    case "Pro8": return Pro8;
    default: return Pro1;
  }
};

const OfferDetailPage = () => {
  const { category, restaurantId, offerId } = useParams<{
    category: string;
    restaurantId: string;
    offerId: string;
  }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const [quantity, setQuantity] = useState(1);

  const { data: webHomeResponse } = useWebHome();

  const staticRestaurant = restaurantId ? getRestaurantById(restaurantId) : null;

  const apiRestaurant = useMemo<Restaurant | null>(() => {
    if (!webHomeResponse || !restaurantId) return null;
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const offersData = data?.offers as Record<string, Array<Record<string, unknown>>> | undefined;
    const allApiOffers = [
      ...(Array.isArray(offersData?.today) ? offersData.today : []),
      ...(Array.isArray(offersData?.new) ? offersData.new : []),
      ...(Array.isArray(offersData?.best_selling) ? offersData.best_selling : []),
    ];
    const mappedOffers = mapApiOffersToModels(allApiOffers);
    const companyOffers = mappedOffers.filter(
      (o) => String(o.companyId || "") === String(restaurantId)
    );
    if (companyOffers.length === 0) return null;
    const first = companyOffers[0]!;
    const categoryKey = (category as string) || first.category || "restaurants";
    const categoryName = first.categoryName || categoryKey;
    return {
      id: String(restaurantId),
      slug: String(restaurantId),
      name: { ar: first.merchantName || first.title.ar || "", en: first.merchantName || first.title.en || "" },
      logo: first.merchantLogo || first.image || "Pro1",
      category: { key: categoryKey, ar: categoryName, en: categoryName },
      description: { ar: first.description?.ar ?? "", en: first.description?.en ?? "" },
      location: { ar: "-", en: "-" },
      distance: "-",
      rating: first.rating ?? 0,
      reviewsCount: 0,
      views: first.views ?? 0,
      saves: first.bookmarks ?? 0,
      color: "#400198",
      topColor: "bg-[#400198]",
      offers: companyOffers,
      menu: [],
      isOpen: true,
      deliveryTime: "-",
      minimumOrder: 0,
      deliveryFee: 0,
    };
  }, [webHomeResponse, restaurantId, category]);

  const restaurant: Restaurant | null = staticRestaurant || apiRestaurant;
  const offer = useMemo((): Offer | null => {
    if (!restaurant || !offerId) return null;
    const fromOffers = restaurant.offers.find((o) => String(o.id) === String(offerId));
    if (fromOffers) return fromOffers;
    const menuItem = restaurant.menu?.find((m) => String(m.id) === String(offerId));
    if (!menuItem) return null;
    const fromMenu: Offer = {
      id: menuItem.id,
      title: menuItem.title,
      description: menuItem.description,
      image: menuItem.image,
      originalPrice: menuItem.originalPrice ?? menuItem.price,
      discountPrice: menuItem.price,
      discountPercentage: menuItem.discountPercentage ?? 0,
      validity: { ar: "متاح دائماً", en: "Always available" },
      features: menuItem.features,
      rating: menuItem.rating,
      reviewsCount: menuItem.reviewsCount,
      views: menuItem.views,
      downloads: 0,
      purchases: menuItem.purchases,
      bookmarks: menuItem.bookmarks,
      isPopular: menuItem.isPopular,
      isNew: menuItem.isNew,
      isBestSeller: menuItem.isBestSeller,
      category: menuItem.category,
      companyId: menuItem.companyId,
      availableUntil: "",
      maxQuantity: menuItem.maxQuantity,
      terms: { ar: "متاح للطلب", en: "Available for order" },
    };
    return fromMenu;
  }, [restaurant, offerId]);

  const categoryInfo = offerCategories.find((c) => c.key === category);
  const categoryName = categoryInfo ? (isRTL ? categoryInfo.ar : categoryInfo.en) : category;
  const restaurantName = restaurant?.name[isRTL ? "ar" : "en"] ?? "";
  const offerTitle = offer?.title[isRTL ? "ar" : "en"] ?? "";

  const handlePurchase = () => {
    if (!category || !restaurantId || !offerId) return;
    navigate(`/offers/${category}/${restaurantId}/payment?offer=${offerId}&quantity=${quantity}`);
  };

  if (!restaurant || !offer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "العرض غير موجود" : "Offer not found"}
          </h2>
          <button
            onClick={() => navigate("/offers")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isRTL ? "العودة للعروض" : "Back to Offers"}
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = offer.discountPrice * quantity;

  return (
    <>
      <Helmet>
        <title>{offerTitle} - {restaurantName} | {isRTL ? "العروض" : "Offers"}</title>
        <link rel="canonical" href={`https://mukafaat.com/offers/${category}/${restaurantId}/offer/${offerId}`} />
      </Helmet>

      {/* هيدر داكن بنفس أسلوب صفحة الدفع */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/offers/${category}/${restaurantId}`)}
            className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} text-white hover:text-purple-300 transition-colors flex items-center gap-2`}
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* لوجو دائري */}
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30">
            <img
              src={getOfferImageSrc(restaurant.logo)}
              alt={restaurantName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* عنوان العرض */}
          <h1 className="text-2xl md:text-2xl font-semibold mb-2 tracking-tight leading-none text-white">
            {offerTitle}
          </h1>

          {/* وصف قصير */}
          {restaurant.description?.[isRTL ? "ar" : "en"] && (
            <p className="text-white/80 text-base mb-4 max-w-xl mx-auto line-clamp-2">
              {stripHtml(restaurant.description[isRTL ? "ar" : "en"])}
            </p>
          )}

          {/* إحصائيات */}
          <div className="flex items-center justify-center gap-6 text-white/70 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{offer.rating}</span>
              <span>({offer.reviewsCount ?? offer.purchases ?? 0})</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye className="w-4 h-4" />
              <span>{offer.views ?? 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-lg font-bold">
                {offer.discountPrice}
                <CurrencyIcon className="inline ml-1" size={14} />
              </span>
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
              to="/offers"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "العروض" : "Offers"}
            </Link>
            {category && (
              <>
                <span className="text-white text-xs">|</span>
                <Link
                  to={`/offers/${category}`}
                  className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
                >
                  {categoryName}
                </Link>
              </>
            )}
            <span className="text-white text-xs">|</span>
            <Link
              to={`/offers/${category}/${restaurantId}`}
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {restaurantName}
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

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "0" }}>
        <div className="container mx-auto px-4 py-8 max-w-4xl -mt-2 relative z-10">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 border-b">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={getOfferImageSrc(restaurant.logo)}
                    alt={restaurantName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">{offerTitle}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiStar className="text-yellow-400" />
                      <span>{offer.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{isRTL ? `${offer.purchases} عدد مرات الشراء` : `${offer.purchases} purchases`}</span>
                  </div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 flex items-center gap-1">
                {totalPrice}
                <CurrencyIcon className="text-gray-800" size={28} />
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <img
                  src={getOfferImageSrc(offer.image)}
                  alt={offerTitle}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              <section className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">{isRTL ? "تفاصيل العرض" : "Offer Details"}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">{isRTL ? "صلاحية العرض" : "Offer Validity"}</div>
                    <div className="font-medium text-gray-800">{offer.validity[isRTL ? "ar" : "en"]}</div>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="text-sm text-gray-600">{isRTL ? "الخصم" : "Discount"}</div>
                    <div className="font-medium text-gray-800">{offer.discountPercentage}%</div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">{isRTL ? "وصف العرض" : "Offer Description"}</h3>
                  <p className="text-gray-600 text-sm">{stripHtml(offer.description[isRTL ? "ar" : "en"])}</p>
                </div>
              </section>

              {offer.features.length > 0 && (
                <section className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">{isRTL ? "المميزات" : "Features"}</h3>
                  <div className="flex flex-wrap gap-2">
                    {offer.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mb-6">
                <h3 className="font-medium text-gray-800 mb-2">{isRTL ? "الشروط والأحكام" : "Terms & Conditions"}</h3>
                <p className="text-gray-600 text-sm">{stripHtml(offer.terms[isRTL ? "ar" : "en"])}</p>
              </section>

              <div className="flex items-center justify-center gap-4 my-8">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 transition-colors"
                >
                  <FiMinus className="text-white" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(offer.maxQuantity || 99, q + 1))}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                >
                  <FiPlus />
                </button>
              </div>

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

export default OfferDetailPage;

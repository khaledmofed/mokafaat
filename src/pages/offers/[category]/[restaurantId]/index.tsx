import { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { FiArrowLeft, FiBookmark, FiEye } from "react-icons/fi";
import {
  getRestaurantById,
  offerCategories,
  type Offer,
  type MenuItem,
  type Restaurant,
} from "@data/offers";
import OfferModal from "./components/OfferModal";
import OfferCard from "./components/OfferCard";
import MenuItemCard from "../../components/MenuItemCard";
import { Pro1, Pro2, Pro3, Pro4, Pro5, Pro6, Pro7, Pro8 } from "@assets";
import { AboutPattern } from "@assets";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { stripHtml } from "@utils/stripHtml";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";

const RestaurantDetailsPage = () => {
  const { category, restaurantId } = useParams<{
    category: string;
    restaurantId: string;
  }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"offers" | "menu">("offers");
  const { data: webHomeResponse } = useWebHome();

  const staticRestaurant = restaurantId
    ? getRestaurantById(restaurantId)
    : null;

  // Restaurant مشتق من عروض الـ API (companyId) في حال عدم وجوده في الداتا الثابتة
  const apiRestaurant = useMemo<Restaurant | null>(() => {
    if (!webHomeResponse || !restaurantId) return null;

    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const offersData = data?.offers as
      | Record<string, Array<Record<string, unknown>>>
      | undefined;

    const allApiOffers = [
      ...(Array.isArray(offersData?.today) ? offersData!.today : []),
      ...(Array.isArray(offersData?.new) ? offersData!.new : []),
      ...(Array.isArray(offersData?.best_selling)
        ? offersData!.best_selling
        : []),
    ];

    const mappedOffers = mapApiOffersToModels(allApiOffers);

    const companyOffers = mappedOffers.filter(
      (o) => String(o.companyId || "") === String(restaurantId)
    );

    if (companyOffers.length === 0) return null;

    const first = companyOffers[0]!;
    const name =
      first.merchantName || first.title.ar || first.title.en || restaurantId;
    const logo = first.merchantLogo || first.image || "Pro1";
    const categoryKey =
      (category as string | undefined) || first.category || "restaurants";
    const categoryName = first.categoryName || categoryKey;

    return {
      id: String(restaurantId),
      slug: String(restaurantId),
      name: { ar: name, en: name },
      logo,
      category: {
        key: categoryKey,
        ar: categoryName,
        en: categoryName,
      },
      description: {
        ar: first.description.ar,
        en: first.description.en,
      },
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

  const categoryInfo = offerCategories.find((cat) => cat.key === category);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "المطعم غير موجود" : "Restaurant not found"}
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

  // Function to get restaurant image
  const getRestaurantImage = (logoName: string) => {
    // If it's already a URL, return it directly
    if (logoName.startsWith("http")) {
      return logoName;
    }

    // Otherwise, use the local images
    switch (logoName) {
      case "Pro1":
        return Pro1;
      case "Pro2":
        return Pro2;
      case "Pro3":
        return Pro3;
      case "Pro4":
        return Pro4;
      case "Pro5":
        return Pro5;
      case "Pro6":
        return Pro6;
      case "Pro7":
        return Pro7;
      case "Pro8":
        return Pro8;
      default:
        return Pro1;
    }
  };

  const handleOfferClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleMenuItemClick = (menuItem: MenuItem) => {
    // Convert MenuItem to Offer format for the modal
    const offerFromMenuItem: Offer = {
      id: menuItem.id,
      title: menuItem.title,
      description: menuItem.description,
      image: menuItem.image,
      originalPrice: menuItem.originalPrice || menuItem.price,
      discountPrice: menuItem.price,
      discountPercentage: menuItem.discountPercentage || 0,
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
      availableUntil: "2024-12-31",
      maxQuantity: menuItem.maxQuantity,
      terms: { ar: "متاح للطلب", en: "Available for order" },
    };
    setSelectedOffer(offerFromMenuItem);
    setIsModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? restaurant.name.ar : restaurant.name.en} -{" "}
          {isRTL ? "العروض" : "Offers"}
        </title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/offers/${category}/${restaurantId}`}
        />
      </Helmet>

      {/* Header */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/offers/${category}`)}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Restaurant Logo */}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full overflow-hidden">
            <img
              src={getRestaurantImage(restaurant.logo)}
              alt={restaurant.name[isRTL ? "ar" : "en"]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-2xl font-bold mb-2 tracking-tight leading-none text-white">
            {isRTL ? restaurant.name.ar : restaurant.name.en}
          </h1>

          {/* Description */}
          <p className="text-white/80 text-base mb-4">
            {stripHtml(restaurant.description[isRTL ? "ar" : "en"])}
          </p>

          {/* Location and Status */}
          <div className="flex items-center justify-center gap-4 text-white/70 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {restaurant.location[isRTL ? "ar" : "en"]} • {restaurant.distance}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {restaurant.isOpen
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
              <span>{restaurant.rating}</span>
              <span>({restaurant.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye />
              <span>{restaurant.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiBookmark />
              <span>{restaurant.saves}</span>
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
              {categoryInfo
                ? isRTL
                  ? categoryInfo.ar
                  : categoryInfo.en
                : category}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <span className="text-[#fd671a] font-medium text-xs">
              {isRTL ? restaurant.name.ar : restaurant.name.en}
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

      {/* Special Offers Section */}
      <section className="container mx-auto px-4 pb-16 mt-16">
        <div className="mb-8 flex justify-between items-center">
          <div className="text-start mb-4">
            <h2 className="text-[#400198] text-3xl font-bold">
              {isRTL ? restaurant.name.ar : restaurant.name.en}
            </h2>
            <p className="text-md text-gray-700 leading-relaxed">
              {stripHtml(restaurant.description[isRTL ? "ar" : "en"])}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Delivery Time */}
            <div className="text-start flex items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-0">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-0">
                <h4 className="font-semibold text-gray-800 mb-0">
                  {isRTL ? "وقت التوصيل" : "Delivery Time"}
                </h4>
                <p className="text-gray-600 font-medium mb-0">
                  {restaurant.deliveryTime}
                </p>
              </div>
            </div>

            {/* Minimum Order */}
            <div className="text-start flex items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center  mb-0">
                <svg
                  className="w-7 h-7 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-0">
                <h4 className="font-semibold text-gray-800 mb-0">
                  {isRTL ? "الحد الأدنى للطلب" : "Minimum Order"}
                </h4>
                <p className="text-gray-600 font-medium mb-0">
                  {restaurant.minimumOrder} {isRTL ? "ريال" : "SAR"}
                </p>
              </div>
            </div>

            {/* Delivery Fee */}
            <div className="text-start flex items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-0">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-0">
                <h4 className="font-semibold text-gray-800 mb-0">
                  {isRTL ? "رسوم التوصيل" : "Delivery Fee"}
                </h4>
                <p className="text-gray-600 font-medium mb-0">
                  {restaurant.deliveryFee === 0
                    ? isRTL
                      ? "مجاني"
                      : "Free"
                    : `${restaurant.deliveryFee} ${isRTL ? "ريال" : "SAR"}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "offers"
                  ? "text-[#400198] border-b-2 border-[#400198]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("offers")}
            >
              {isRTL ? "العروض" : "Offers"}
            </button>
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === "menu"
                  ? "text-[#400198] border-b-2 border-[#400198]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("menu")}
            >
              {isRTL ? "المنيو" : "Menu"}
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === "offers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurant.offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onOfferClick={handleOfferClick}
              />
            ))}
          </div>
        )}

        {activeTab === "menu" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurant.menu.map((menuItem) => (
              <MenuItemCard
                key={menuItem.id}
                menuItem={menuItem}
                onMenuItemClick={handleMenuItemClick}
              />
            ))}
          </div>
        )}
      </section>

      {/* Offer Modal */}
      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          restaurant={restaurant}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOffer(null);
          }}
        />
      )}

      <GetStartedSection className="mt-16 mb-28" />
    </>
  );
};

export default RestaurantDetailsPage;

import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import {
  FiArrowLeft,
  FiClock,
  FiCheck,
  FiTag,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  getRestaurantById,
  offerCategories,
  type Offer,
  type Restaurant,
} from "@data/offers";
import CurrencyIcon from "@components/CurrencyIcon";
import QuantitySelector from "@components/QuantitySelector";
import SubscribersOnlyModal from "@components/SubscribersOnlyModal";
import { stripHtml } from "@utils/stripHtml";
import {
  Pro1,
  Pro2,
  Pro3,
  Pro4,
  Pro5,
  Pro6,
  Pro7,
  Pro8,
  AboutPattern,
} from "@assets";
import { useUserStore } from "@stores/userStore";
import {
  useWebHome,
  useSubscriptionStatus,
  useFavorites,
  useFavoriteToggle,
} from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";
import { isUserSubscribed } from "@utils/subscription";
import { normalizeFavoritesList } from "@utils/favorites";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import { toast } from "react-toastify";

const getOfferImageSrc = (imageName: string) => {
  if (imageName.startsWith("http")) return imageName;
  switch (imageName) {
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

const OfferDetailPage = () => {
  const { category, restaurantId, offerId } = useParams<{
    category: string;
    restaurantId: string;
    offerId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const [quantity, setQuantity] = useState(1);
  const [subscribersOnlyModalOpen, setSubscribersOnlyModalOpen] =
    useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  type TabKey = "description" | "terms" | "privacy";
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const handleQuantityChange = useCallback((q: number) => setQuantity(q), []);

  const token = useUserStore((s) => s.token);
  const { data: webHomeResponse } = useWebHome();
  const { data: subscriptionStatusData } = useSubscriptionStatus(!!token);
  const isSubscribed = isUserSubscribed(subscriptionStatusData);
  const { data: favoritesData } = useFavorites();
  const toggleFavorite = useFavoriteToggle();
  const favoritesList = useMemo(
    () => normalizeFavoritesList(favoritesData ?? null),
    [favoritesData],
  );

  const staticRestaurant = restaurantId
    ? getRestaurantById(restaurantId)
    : null;

  const apiRestaurant = useMemo<Restaurant | null>(() => {
    if (!webHomeResponse || !restaurantId) return null;
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const offersData = data?.offers as
      | Record<string, Array<Record<string, unknown>>>
      | undefined;
    const allApiOffers = [
      ...(Array.isArray(offersData?.today) ? offersData.today : []),
      ...(Array.isArray(offersData?.new) ? offersData.new : []),
      ...(Array.isArray(offersData?.best_selling)
        ? offersData.best_selling
        : []),
    ];
    const mappedOffers = mapApiOffersToModels(allApiOffers);
    const companyOffers = mappedOffers.filter(
      (o) => String(o.companyId || "") === String(restaurantId),
    );
    if (companyOffers.length === 0) return null;
    const first = companyOffers[0]!;
    const categoryKey = (category as string) || first.category || "restaurants";
    const categoryName = first.categoryName || categoryKey;
    return {
      id: String(restaurantId),
      slug: String(restaurantId),
      name: {
        ar: first.merchantName || first.title.ar || "",
        en: first.merchantName || first.title.en || "",
      },
      logo: first.merchantLogo || first.image || "Pro1",
      category: { key: categoryKey, ar: categoryName, en: categoryName },
      description: {
        ar: first.description?.ar ?? "",
        en: first.description?.en ?? "",
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
  const offer = useMemo((): Offer | null => {
    if (!restaurant || !offerId) return null;
    const fromOffers = restaurant.offers.find(
      (o) => String(o.id) === String(offerId),
    );
    if (fromOffers) return fromOffers;
    const menuItem = restaurant.menu?.find(
      (m) => String(m.id) === String(offerId),
    );
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

  const isOfferFavorite = useMemo(
    () =>
      offer &&
      favoritesList.some(
        (f) =>
          f.favorable_type === "offer" &&
          String(f.favorable_id) === String(offer.id),
      ),
    [offer, favoritesList],
  );

  const maxQty = offer ? Math.max(99, offer.maxQuantity ?? 99) : 99;

  // معرض الصور: يجب استدعاء useMemo قبل أي return (قواعد الـ hooks)
  const galleryImages = useMemo(() => {
    if (!restaurant || !offer) return [Pro1, Pro1, Pro1, Pro1];
    const main = getOfferImageSrc(offer.image);
    const logo = getOfferImageSrc(restaurant.logo);
    return [main, logo, main, main];
  }, [offer, restaurant]);
  const mainImageSrc = galleryImages[selectedImageIndex] ?? galleryImages[0];

  const categoryInfo = offerCategories.find((c) => c.key === category);
  const categoryName = categoryInfo
    ? isRTL
      ? categoryInfo.ar
      : categoryInfo.en
    : category;
  const restaurantName = restaurant?.name[isRTL ? "ar" : "en"] ?? "";
  const offerTitle = offer?.title[isRTL ? "ar" : "en"] ?? "";

  const handlePurchase = () => {
    if (!category || !restaurantId || !offerId) return;
    if (!token) {
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (!isSubscribed) {
      setSubscribersOnlyModalOpen(true);
      return;
    }
    navigate(
      `/offers/${category}/${restaurantId}/payment?offer=${offerId}&quantity=${quantity}`,
      {
        state: { offer, restaurant },
      },
    );
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

  const unitPrice = Number(offer.discountPrice) || 0;
  const totalPrice = unitPrice * quantity;

  return (
    <>
      <SubscribersOnlyModal
        isOpen={subscribersOnlyModalOpen}
        onClose={() => setSubscribersOnlyModalOpen(false)}
        onSubscribe={() => navigate("/subscription/plans")}
        onBackToOffer={() => setSubscribersOnlyModalOpen(false)}
      />
      <Helmet>
        <title>
          {offerTitle} - {restaurantName} | {isRTL ? "العروض" : "Offers"}
        </title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/offers/${category}/${restaurantId}/offer/${offerId}`}
        />
      </Helmet>

      {/* هيدر: عنوان، تقييم، أيقونات، لوجو */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl w-full text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          <div className="flex items-center justify-between absolute top-4 left-4 right-4">
            <button
              onClick={() => navigate(`/offers/${category}/${restaurantId}`)}
              className="text-white hover:text-purple-300 transition-colors flex items-center gap-2"
            >
              <FiArrowLeft className="text-xl" />
              <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Share"
              >
                <BsShare className="text-lg" />
              </button>
              {offer && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!token) {
                      navigate(
                        `/login?returnUrl=${encodeURIComponent(location.pathname)}`,
                      );
                      return;
                    }
                    toggleFavorite.mutate(
                      { favorable_type: "offer", favorable_id: offer.id },
                      {
                        onSuccess: () => {
                          toast.success(
                            isOfferFavorite
                              ? isRTL
                                ? "تمت إزالته من المحفوظات"
                                : "Removed from favorites"
                              : isRTL
                                ? "تمت الإضافة إلى المحفوظات"
                                : "Added to favorites",
                          );
                        },
                        onError: () =>
                          toast.error(
                            isRTL ? "حدث خطأ" : "Something went wrong",
                          ),
                      },
                    );
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                  disabled={toggleFavorite.isPending}
                >
                  {isOfferFavorite ? (
                    <BsHeartFill className="text-lg text-red-300" />
                  ) : (
                    <BsHeart className="text-lg" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* لوجو المتجر أعلى اليمين */}
          <div
            className="absolute top-4 w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 hidden sm:block"
            style={isRTL ? { left: "1rem" } : { right: "1rem" }}
          >
            <img
              src={getOfferImageSrc(restaurant.logo)}
              alt={restaurantName}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight leading-tight text-white px-4">
            {offerTitle}
          </h1>
          {restaurant.description?.[isRTL ? "ar" : "en"] && (
            <p className="text-white/80 text-base mb-3 max-w-2xl mx-auto line-clamp-2">
              {stripHtml(restaurant.description[isRTL ? "ar" : "en"])}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 text-white/90 mb-4">
            <span className="text-yellow-400">★</span>
            <span className="font-medium">{offer.rating}</span>
            <span className="text-white/70">
              {isRTL ? "تقييمات" : "reviews"}
            </span>
            <span>{offer.reviewsCount ?? offer.purchases ?? 0}</span>
          </div>
          <div className="flex items-center justify-center text-sm flex-wrap gap-x-1 text-white/80">
            <Link to="/" className="hover:text-white transition-colors text-xs">
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-xs">|</span>
            <Link
              to="/offers"
              className="hover:text-white transition-colors text-xs"
            >
              {isRTL ? "العروض" : "Offers"}
            </Link>
            {category && (
              <>
                <span className="text-xs">|</span>
                <Link
                  to={`/offers/${category}`}
                  className="hover:text-white transition-colors text-xs"
                >
                  {categoryName}
                </Link>
              </>
            )}
            <span className="text-xs">|</span>
            <Link
              to={`/offers/${category}/${restaurantId}`}
              className="hover:text-white transition-colors text-xs"
            >
              {restaurantName}
            </Link>
            <span className="text-xs">|</span>
            <span
              className="text-[#fd671a] font-medium text-xs"
              aria-current="page"
            >
              {offerTitle}
            </span>
          </div>
        </div>
        <div className="absolute -bottom-10 transform z-0">
          <img
            src={AboutPattern}
            alt=""
            className="w-full h-96 animate-float"
          />
        </div>
      </section>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "0" }}>
        <div className="container mx-auto px-4 py-8 max-w-7xl -mt-2 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* عمود المحتوى: معرض الصور + التابات */}
            <div className="lg:col-span-2 space-y-6">
              {/* معرض الصور: صورة رئيسية + شبكة 2x2 مصغرات */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
                <div
                  className={`flex gap-3 p-4 items-stretch h-[400px] ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <div className="grid grid-cols-1 grid-rows-4 gap-0 w-32 flex-shrink-0 h-full overflow-hidden rounded-xl">
                    {galleryImages.slice(0, 4).map((src, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedImageIndex(i)}
                        className={`w-full h-full min-h-0 overflow-hidden border-2 transition-colors ${selectedImageIndex === i ? "border-primary" : "border-transparent"} ${i === 0 ? "rounded-t-xl" : ""} ${i === 3 ? "rounded-b-xl" : ""}`}
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setGalleryOpen(true)}
                    className="flex-1 min-h-0 h-[400px] max-h-[400px] rounded-xl overflow-hidden border-2 border-transparent bg-gray-100 text-left cursor-zoom-in"
                  >
                    <img
                      src={mainImageSrc}
                      alt={offerTitle}
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
              </div>

              {/* تابات: وصف العرض | الشروط والأحكام | سياسة الخصوصية */}
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className={`flex border-b `}>
                  {[
                    {
                      key: "description" as TabKey,
                      label: isRTL ? "وصف العرض" : "Offer Description",
                    },
                    {
                      key: "terms" as TabKey,
                      label: isRTL ? "الشروط والأحكام" : "Terms & Conditions",
                    },
                    {
                      key: "privacy" as TabKey,
                      label: isRTL ? "سياسة الخصوصية" : "Privacy Policy",
                    },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      className={`px-6 py-4 font-medium border-b-2 transition-colors ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-gray-600 hover:text-gray-800"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="p-6">
                  {activeTab === "description" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">
                            {isRTL ? "صلاحية العرض" : "Offer Validity"}
                          </div>
                          <div className="font-medium text-gray-800">
                            {offer.validity[isRTL ? "ar" : "en"]}
                          </div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">
                            {isRTL ? "الخصم" : "Discount"}
                          </div>
                          <div className="font-medium text-gray-800">
                            {offer.discountPercentage}%
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {stripHtml(offer.description[isRTL ? "ar" : "en"])}
                      </p>
                      {offer.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {offer.features.map((f, i) => (
                            <span
                              key={i}
                              className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === "terms" && (
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">
                      {stripHtml(offer.terms[isRTL ? "ar" : "en"])}
                    </p>
                  )}
                  {activeTab === "privacy" && (
                    <p className="text-gray-600 text-sm">
                      {isRTL
                        ? "للمزيد عن كيفية جمع واستخدام بياناتك، يرجى مراجعة سياسة الخصوصية الخاصة بنا."
                        : "For more on how we collect and use your data, please see our privacy policy."}{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-primary underline"
                      >
                        {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* الشريط الجانبي: التسعير والكمية والأزرار */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6 bg-white rounded-3xl shadow-lg p-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    <FiClock className="text-base" />{" "}
                    {isRTL ? "لفترة محدودة فقط" : "Limited time"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    <FiCheck className="text-base" />{" "}
                    {isRTL ? "الأفضل مبيعاً" : "Best seller"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    <FiTag className="text-base" /> {offer.purchases ?? 0}{" "}
                    {isRTL ? "قسيمة مباعة" : "sold"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {isRTL ? "اختر خيارك المفضل" : "Choose your option"}
                </h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <p className="text-gray-800 font-medium mb-2">
                      {offerTitle}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-gray-400 line-through text-sm">
                        {offer.originalPrice}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        {offer.discountPrice}
                      </span>
                      <CurrencyIcon className="text-gray-700" size={20} />
                      <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-0.5 rounded-full">
                        {isRTL ? "حفظ" : "Save"} {offer.discountPercentage}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {isRTL
                        ? "المبلغ الذي تدفعه عندنا"
                        : "Amount you pay on our platform"}
                    </p>
                    <div className="mt-3">
                      <QuantitySelector
                        maxQty={maxQty}
                        isRTL={!!isRTL}
                        onQuantityChange={handleQuantityChange}
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-2">
                      {isRTL ? "المجموع" : "Total"}: {totalPrice}{" "}
                      <CurrencyIcon className="inline" size={14} />
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handlePurchase}
                    className="w-full py-3 px-6 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    {isRTL ? "أضف للسلة" : "Add to Cart"}
                  </button>
                  <button
                    onClick={handlePurchase}
                    className="w-full py-3 px-6 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    {isRTL ? "شراء سريع" : "Quick Buy"}
                  </button>
                </div>
                <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                  {isRTL ? "قسائم الهاتف المحمول" : "Mobile vouchers"}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    {isRTL ? "طريقة الدفع" : "Payment methods"}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-xs font-medium">VISA</span>
                    <span className="text-xs font-medium">MasterCard</span>
                    <span className="text-xs font-medium">Mada</span>
                    <span className="text-xs font-medium">Apple Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* نافذة معرض الصور - التقلب بين الصور */}
      {galleryOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setGalleryOpen(false)}
          role="dialog"
          aria-label={isRTL ? "معرض الصور" : "Image gallery"}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 z-10"
            onClick={() => setGalleryOpen(false)}
            aria-label="Close"
          >
            <FiX className="text-2xl" />
          </button>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) =>
                prev <= 0 ? galleryImages.length - 1 : prev - 1
              );
            }}
            aria-label={isRTL ? "السابق" : "Previous"}
          >
            <FiChevronLeft className="text-3xl" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImageIndex((prev) =>
                prev >= galleryImages.length - 1 ? 0 : prev + 1
              );
            }}
            aria-label={isRTL ? "التالي" : "Next"}
          >
            <FiChevronRight className="text-3xl" />
          </button>
          <img
            src={galleryImages[selectedImageIndex] ?? galleryImages[0]}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </span>
        </div>
      )}
    </>
  );
};

export default OfferDetailPage;

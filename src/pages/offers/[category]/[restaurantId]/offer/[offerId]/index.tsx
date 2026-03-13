import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import {
  FiArrowLeft,
  FiTag,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
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
import { useQueryClient } from "@tanstack/react-query";
import {
  useWebOfferDetail,
  useSubscriptionStatus,
  useFavorites,
  useFavoriteToggle,
  useCreateOrder,
  mokafaatKeys,
} from "@hooks/api/useMokafaatQueries";
import {
  mapApiOfferToModel,
  mapRelatedOfferToModel,
} from "@network/mappers/offersMapper";
import { isUserSubscribed } from "@utils/subscription";
import { normalizeFavoritesList } from "@utils/favorites";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import { toast } from "react-toastify";
import OfferCard from "@pages/offers/components/OfferCard";

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
  const { data: webOfferDetailData, isLoading: isOfferLoading } =
    useWebOfferDetail(offerId);
  const queryClient = useQueryClient();
  const createOrder = useCreateOrder();
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

  const apiRestaurantAndOffer = useMemo<{
    restaurant: Restaurant | null;
    offer: Offer | null;
  }>(() => {
    const apiRoot = webOfferDetailData as Record<string, unknown> | undefined;
    const data = apiRoot?.data as Record<string, unknown> | undefined;
    const apiOfferRaw = data?.offer as Record<string, unknown> | undefined;
    if (!apiOfferRaw) {
      return { restaurant: null, offer: null };
    }

    const mappedOffer = mapApiOfferToModel(apiOfferRaw);
    if (!mappedOffer) {
      return { restaurant: null, offer: null };
    }

    const merchant = apiOfferRaw.merchant as
      | Record<string, unknown>
      | undefined;
    const apiCategory = apiOfferRaw.category as
      | Record<string, unknown>
      | undefined;

    const categoryKey =
      (category as string) || mappedOffer.category || "restaurants";
    const categoryInfo = offerCategories.find((c) => c.key === categoryKey);
    const categoryName =
      mappedOffer.categoryName ||
      (apiCategory?.name as string | undefined) ||
      categoryInfo?.["ar"] ||
      categoryKey;

    const merchantName =
      mappedOffer.merchantName || (merchant?.name as string | undefined) || "";
    const merchantLogo =
      mappedOffer.merchantLogo ||
      (merchant?.logo as string | undefined) ||
      mappedOffer.image ||
      "Pro1";

    const restaurantModel: Restaurant = {
      id:
        (merchant?.id !== undefined
          ? String(merchant.id)
          : String(mappedOffer.companyId)) || String(restaurantId || ""),
      slug:
        (merchant?.id !== undefined
          ? String(merchant.id)
          : String(mappedOffer.companyId)) || String(restaurantId || ""),
      name: {
        ar: merchantName || mappedOffer.title.ar,
        en: merchantName || mappedOffer.title.en,
      },
      logo: merchantLogo,
      category: {
        key: categoryKey,
        ar: categoryInfo?.ar || categoryName,
        en: categoryInfo?.en || categoryName,
      },
      description: {
        ar: mappedOffer.description.ar,
        en: mappedOffer.description.en,
      },
      location: { ar: "-", en: "-" },
      distance: "-",
      rating: mappedOffer.rating ?? 0,
      reviewsCount: mappedOffer.reviewsCount ?? 0,
      views: mappedOffer.views ?? 0,
      saves: mappedOffer.bookmarks ?? 0,
      color: "#400198",
      topColor: "bg-[#400198]",
      offers: [mappedOffer],
      menu: [],
      isOpen: true,
      deliveryTime: "-",
      minimumOrder: 0,
      deliveryFee: 0,
    };

    return { restaurant: restaurantModel, offer: mappedOffer };
  }, [webOfferDetailData, category, restaurantId]);

  const apiDetailExtras = useMemo(() => {
    const apiRoot = webOfferDetailData as Record<string, unknown> | undefined;
    const data = apiRoot?.data as Record<string, unknown> | undefined;
    const apiOfferRaw = data?.offer as Record<string, unknown> | undefined;
    const relatedRaw = data?.related_offers as
      | Array<Record<string, unknown>>
      | undefined;
    const privacyPolicy =
      apiOfferRaw && typeof apiOfferRaw.privacy_policy === "string"
        ? apiOfferRaw.privacy_policy
        : "";
    const relatedOffers: Offer[] = Array.isArray(relatedRaw)
      ? relatedRaw
          .map((item) =>
            mapRelatedOfferToModel(item, (category as string) || "all"),
          )
          .filter((o): o is Offer => o !== null)
      : [];
    const userPurchaseCount =
      apiOfferRaw?.user_purchase_count != null
        ? Number(apiOfferRaw.user_purchase_count)
        : undefined;
    return { privacyPolicy, relatedOffers, userPurchaseCount };
  }, [webOfferDetailData, category]);

  const restaurant: Restaurant | null =
    apiRestaurantAndOffer.restaurant || staticRestaurant;
  const offer: Offer | null = apiRestaurantAndOffer.offer;

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

  const maxQty = offer ? Math.max(1, Number(offer.maxQuantity) || 1) : 1;

  // منطق شراء العرض من الـ API
  // 1) per_user_limit === 0 → استفاد من العرض مسبقاً (إخفاء العداد والزر)
  // 2) usage_limit != null && usage_limit <= purchase_count → لقد انتهى العرض (لا مخزون)
  // 3) غير ذلك: إظهار زر الشراء والعداد عندما usage_limit > purchase_count و per_user_limit > 0
  const perUserLimit = offer ? Number(offer.maxQuantity) || 0 : 0;
  const userPurchaseCount =
    offer?.userPurchaseCount ?? apiDetailExtras.userPurchaseCount ?? 0;
  const totalSold = offer?.purchases ?? 0;
  const usageLimit = offer?.usageLimit;
  const usedQuotaBefore = perUserLimit === 0; // استفاد من العرض مسبقاً
  const offerEndedNoStock = usageLimit != null && totalSold >= usageLimit; // usage_limit > purchase_count → متوفر
  const hasStock = usageLimit == null || totalSold < usageLimit;
  const canPurchase =
    !usedQuotaBefore &&
    hasStock &&
    perUserLimit > 0 &&
    userPurchaseCount < perUserLimit;

  // معرض الصور: الصورة الرئيسية تكون أول مصغرة (المحددة عند الفتح)
  const galleryImages = useMemo(() => {
    if (!restaurant || !offer) return [Pro1, Pro1, Pro1, Pro1];

    const mainSrc = getOfferImageSrc(offer.image);
    const apiImages: string[] =
      Array.isArray(offer.images) && offer.images.length > 0
        ? offer.images.map((src) => getOfferImageSrc(src))
        : [];

    if (apiImages.length > 0) {
      // الصورة الرئيسية أولاً حتى تكون المحددة/المختارة عند التحميل
      if (apiImages[0] !== mainSrc) {
        return [mainSrc, ...apiImages.filter((src) => src !== mainSrc)];
      }
      return apiImages;
    }

    const logo = getOfferImageSrc(restaurant.logo);
    return [mainSrc, logo, mainSrc, mainSrc];
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
    if (!category || !restaurantId || !offerId || !offer) return;
    if (!token) {
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
      return;
    }
    if (!isSubscribed) {
      setSubscribersOnlyModalOpen(true);
      return;
    }
    createOrder.mutate(
      {
        order_type: "offer",
        item_id: offerId,
        quantity,
        branch_id: undefined,
      },
      {
        onSuccess: (res: unknown) => {
          const raw = res as { data?: unknown };
          const data = raw?.data ?? raw;
          const root = (data as Record<string, unknown>) ?? {};
          if (root.status === false) {
            const errNum = root.errNum as string | undefined;
            if (errNum === "E005") {
              void queryClient.invalidateQueries({
                queryKey: mokafaatKeys.subscriptionStatus,
              });
              setSubscribersOnlyModalOpen(true);
              toast.error(
                (root.msg as string) ||
                  (isRTL
                    ? "يجب أن يكون لديك اشتراك فعال"
                    : "Active subscription required"),
              );
              return;
            }
            toast.error(
              (root.msg as string) ||
                (isRTL ? "تعذّر إنشاء الطلب" : "Could not create order"),
            );
            return;
          }
          const inner = (root.data ?? root) as Record<string, unknown>;
          const order = (inner?.order ?? root.order) as
            | Record<string, unknown>
            | undefined;

          const paymentUrl = (root.payment_url ??
            inner?.payment_url ??
            root.redirect_url ??
            inner?.redirect_url) as string | undefined;
          if (paymentUrl && typeof paymentUrl === "string") {
            window.location.href = paymentUrl;
            return;
          }

          const orderId =
            order?.id != null
              ? order.id
              : ((root.order_id ?? inner?.order_id) as
                  | string
                  | number
                  | undefined);
          const requiresPayment = order?.requires_payment === true;

          if (requiresPayment && orderId != null) {
            navigate(
              `/offers/${category}/${restaurantId}/payment?offer=${offerId}&quantity=${quantity}`,
              { state: { orderId, offer, restaurant, order } },
            );
            return;
          }

          if (!requiresPayment) {
            navigate(
              `/offers/${category}/${restaurantId}/success?offer=${offerId}&quantity=${quantity}&order=${orderId ?? ""}`,
              {
                state: {
                  orderId,
                  order: order ?? { id: orderId },
                  offer,
                  restaurant,
                },
              },
            );
            return;
          }

          navigate(
            `/offers/${category}/${restaurantId}/payment?offer=${offerId}&quantity=${quantity}`,
            { state: { orderId, offer, restaurant, order } },
          );
        },
        onError: () => {
          toast.error(isRTL ? "فشل إنشاء الطلب" : "Failed to create order");
        },
      },
    );
  };

  if (isOfferLoading) {
    return (
      <>
        {/* سكيلتون الهيدر */}
        <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary opacity-30" />
          <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl w-full text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
            <div className="flex items-center justify-between absolute top-4 left-4 right-4">
              <div className="h-8 w-20 bg-white/20 rounded-lg animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
                <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse" />
              </div>
            </div>
            <div
              className="absolute top-4 w-12 h-12 rounded-full bg-white/20 animate-pulse hidden sm:block"
              style={isRTL ? { left: "1rem" } : { right: "1rem" }}
            />
            <div className="h-8 w-3/4 max-w-xl bg-white/20 rounded-lg animate-pulse mx-auto mb-2" />
            <div className="h-4 w-1/2 max-w-md bg-white/15 rounded animate-pulse mx-auto mb-4" />
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-24 bg-white/15 rounded animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-1 flex-wrap">
              <div className="h-3 w-12 bg-white/15 rounded animate-pulse" />
              <div className="h-3 w-4 bg-white/15 rounded animate-pulse" />
              <div className="h-3 w-14 bg-white/15 rounded animate-pulse" />
              <div className="h-3 w-4 bg-white/15 rounded animate-pulse" />
              <div className="h-3 w-20 bg-white/15 rounded animate-pulse" />
            </div>
          </div>
        </section>

        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8 max-w-7xl -mt-2 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* سكيلتون عمود المحتوى */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div
                    className={`flex gap-3 p-4 items-stretch h-[400px] ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className="grid grid-cols-1 grid-rows-4 gap-0 w-32 flex-shrink-0 h-full overflow-hidden rounded-xl">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`w-full h-full bg-gray-200 ${i === 0 ? "rounded-t-xl" : ""} ${i === 3 ? "rounded-b-xl" : ""}`}
                        />
                      ))}
                    </div>
                    <div className="flex-1 min-h-0 h-[365px] max-h-[365px] rounded-xl bg-gray-200" />
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
                  <div className="flex border-b">
                    <div className="h-12 w-32 bg-gray-100 mx-1 rounded-t" />
                    <div className="h-12 w-36 bg-gray-100 mx-1 rounded-t" />
                    <div className="h-12 w-28 bg-gray-100 mx-1 rounded-t" />
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="h-16 bg-gray-100 rounded-lg" />
                      <div className="h-16 bg-gray-100 rounded-lg" />
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded" />
                    <div className="h-4 w-4/5 bg-gray-100 rounded" />
                    <div className="h-4 w-3/4 bg-gray-100 rounded" />
                    <div className="flex flex-wrap gap-2 mt-4">
                      <div className="h-6 w-16 bg-gray-100 rounded-full" />
                      <div className="h-6 w-20 bg-gray-100 rounded-full" />
                      <div className="h-6 w-14 bg-gray-100 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* سكيلتون الشريط الجانبي */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-6 bg-white rounded-3xl shadow-lg p-6 space-y-6 animate-pulse">
                  <div className="flex flex-wrap gap-2">
                    <div className="h-8 w-28 bg-gray-100 rounded-full" />
                    <div className="h-8 w-24 bg-gray-100 rounded-full" />
                    <div className="h-8 w-20 bg-gray-100 rounded-full" />
                  </div>
                  <div className="h-6 w-48 bg-gray-100 rounded" />
                  <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="h-5 w-3/4 bg-gray-100 rounded" />
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="h-4 w-10 bg-gray-100 rounded" />
                      <div className="h-6 w-14 bg-gray-100 rounded" />
                      <div className="h-5 w-16 bg-gray-100 rounded-full" />
                    </div>
                    <div className="h-3 w-40 bg-gray-50 rounded" />
                    <div className="flex items-center gap-2 mt-3">
                      <div className="h-10 w-24 bg-gray-100 rounded-lg" />
                    </div>
                    <div className="h-4 w-20 bg-gray-100 rounded" />
                  </div>
                  <div className="h-12 w-full bg-gray-200 rounded-xl" />
                  <div className="h-12 w-full bg-gray-50 rounded-xl" />
                  <div>
                    <div className="h-4 w-24 bg-gray-100 rounded mb-2" />
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-12 bg-gray-50 rounded" />
                      <div className="h-4 w-16 bg-gray-50 rounded" />
                      <div className="h-4 w-10 bg-gray-50 rounded" />
                      <div className="h-4 w-14 bg-gray-50 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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

  const unitPrice =
    Number(
      offer.platformPrice !== undefined && offer.platformPrice !== null
        ? offer.platformPrice
        : offer.discountPrice,
    ) || 0;
  const totalPrice = unitPrice * quantity;

  return (
    <>
      <SubscribersOnlyModal
        isOpen={subscribersOnlyModalOpen}
        onClose={() => setSubscribersOnlyModalOpen(false)}
        onSubscribe={() =>
          navigate("/subscription/plans", {
            state: {
              from: `${location.pathname}${location.search}`,
            },
          })
        }
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
                                ? "تمت إزالته من المفضلة"
                                : "Removed from favorites"
                              : isRTL
                                ? "تمت الإضافة إلى المفضلة"
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
          <div className="flex items-center justify-center gap-2 text-white/90 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★</span>
              <span className="font-medium">{offer.rating}</span>
              <span className="text-white/70">
                {isRTL ? "تقييمات" : "reviews"}
              </span>
              <span>{offer.reviewsCount ?? offer.purchases ?? 0}</span>
            </div>
            <span className="text-white/50">|</span>
            <div className="flex items-center gap-2 text-white/90">
              <FiEye className="text-white/80 shrink-0" size={18} />
              <span>{offer.views ?? 0}</span>
              <span className="text-white/70">
                {isRTL ? "مشاهدات" : "views"}
              </span>
            </div>
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
        <div className="container mx-auto px-4 py-8 max-w-7xl -mt-2 relative z-10 pb-20">
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
                    className="flex-1 min-h-0 h-[365px] max-h-[365px] rounded-xl overflow-hidden border-2 border-transparent bg-gray-100 text-left cursor-zoom-in"
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
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">
                      {apiDetailExtras.privacyPolicy
                        ? stripHtml(apiDetailExtras.privacyPolicy)
                        : null}
                      {apiDetailExtras.privacyPolicy ? null : (
                        <>
                          {isRTL
                            ? "للمزيد عن كيفية جمع واستخدام بياناتك، يرجى مراجعة سياسة الخصوصية الخاصة بنا."
                            : "For more on how we collect and use your data, please see our privacy policy."}{" "}
                          <Link
                            to="/privacy-policy"
                            className="text-primary underline"
                          >
                            {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
                          </Link>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* الشريط الجانبي: التسعير والكمية والأزرار */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6 bg-white rounded-3xl shadow-lg p-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {offer.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
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
                    <div className="mt-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm text-gray-700 mb-1">
                        {unitPrice > 0
                          ? isRTL
                            ? "احصل على العرض الآن مقابل السعر التالي"
                            : "Get this offer now for the price below"
                          : isRTL
                            ? "احصل على العرض الآن مجاناً"
                            : "Get this offer now for free"}
                      </p>
                      {unitPrice > 0 ? (
                        <p className="text-lg font-bold text-primary flex items-center gap-1">
                          {unitPrice}{" "}
                          <CurrencyIcon className="inline" size={18} />
                        </p>
                      ) : (
                        <p className="text-lg font-bold text-green-600">
                          {isRTL ? "مجاني" : "Free"}
                        </p>
                      )}
                    </div>
                    {usedQuotaBefore && (
                      <p className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                        {isRTL
                          ? "لقد استفدت من هذا العرض مسبقاً"
                          : "You have already used this offer"}
                      </p>
                    )}
                    {offerEndedNoStock && (
                      <p className="mt-3 p-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-700 text-sm">
                        {isRTL ? "لقد انتهى العرض" : "Offer ended"}
                      </p>
                    )}
                    {canPurchase && (
                      <>
                        <div className="mt-3">
                          <QuantitySelector
                            maxQty={maxQty}
                            isRTL={!!isRTL}
                            onQuantityChange={handleQuantityChange}
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {isRTL
                              ? `الحد الأقصى للشراء: ${maxQty} وحدة`
                              : `Max quantity: ${maxQty} ${maxQty === 1 ? "unit" : "units"}`}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-700 mt-2">
                          {isRTL ? "المجموع" : "Total"}: {totalPrice}{" "}
                          <CurrencyIcon className="inline" size={14} />
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {canPurchase && (
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handlePurchase}
                      disabled={createOrder.isPending}
                      className="w-full py-3 px-6 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {createOrder.isPending
                        ? isRTL
                          ? "جاري إنشاء الطلب..."
                          : "Creating order..."
                        : isRTL
                          ? "شراء سريع"
                          : "Quick Buy"}
                    </button>
                  </div>
                )}
                {/* <div className="text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                  {isRTL ? "قسائم الهاتف المحمول" : "Mobile vouchers"}
                </div> */}
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

          {/* العروض المتعلقة */}
          {apiDetailExtras.relatedOffers.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {isRTL ? "عروض قد تعجبك" : "Related offers"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {apiDetailExtras.relatedOffers.map((relatedOffer) => (
                  <OfferCard
                    key={relatedOffer.id}
                    offer={relatedOffer}
                    onOfferClick={(o) =>
                      navigate(
                        `/offers/${category}/${o.companyId}/offer/${o.id}`,
                      )
                    }
                  />
                ))}
              </div>
            </section>
          )}
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
                prev <= 0 ? galleryImages.length - 1 : prev - 1,
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
                prev >= galleryImages.length - 1 ? 0 : prev + 1,
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

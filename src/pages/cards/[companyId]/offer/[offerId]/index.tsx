import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import {
  FiArrowLeft,
  FiTag,
  FiEye,
} from "react-icons/fi";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import CurrencyIcon from "@components/CurrencyIcon";
import QuantitySelector from "@components/QuantitySelector";
import { stripHtml } from "@utils/stripHtml";
import { AboutPattern } from "@assets";
import { useUserStore } from "@stores/userStore";
import {
  useCardDetail,
  useFavorites,
  useFavoriteToggle,
} from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";
import { toast } from "react-toastify";
import OfferCard from "@pages/cards/[companyId]/components/OfferCard";
import type { CardOffer } from "@data/cards";

type TabKey = "description" | "terms" | "features";

const validityLabel: Record<string, string> = {
  annual: "سنوي",
  monthly: "شهري",
  quarterly: "ربع سنوي",
  semi_annual: "نصف سنوي",
};

function mapApiRelatedToCardOffer(raw: Record<string, unknown>): CardOffer & { companyId: string } {
  const merchant = (raw.merchant as Record<string, unknown>) || {};
  const id = String(raw.id ?? "");
  const companyId = String(merchant.id ?? raw.merchant_id ?? id);
  return {
    id,
    companyId,
    title: { ar: String(raw.name ?? ""), en: String(raw.name ?? "") },
    description: {
      ar: String(raw.description ?? ""),
      en: String(raw.description ?? ""),
    },
    price: Number(raw.final_price ?? raw.price ?? 0),
    currency: "SAR",
    validity: {
      ar: validityLabel[String(raw.validity_type ?? "").toLowerCase()] ?? String(raw.validity_type ?? ""),
      en: String(raw.validity_type ?? ""),
    },
    features: [],
    image: String(raw.image ?? ""),
    rating: 0,
    purchases: Number(raw.purchase_count ?? 0),
    views: Number(raw.views_count ?? 0),
    downloads: 0,
    bookmarks: 0,
    originalPrice: raw.old_price != null ? Number(raw.old_price) : undefined,
  };
}

const CardOfferDetailPage = () => {
  const { companyId, offerId } = useParams<{ companyId: string; offerId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const handleQuantityChange = useCallback((q: number) => setQuantity(q), []);

  const token = useUserStore((s) => s.token);
  const { data: cardDetailData, isLoading } = useCardDetail(offerId);
  const { data: favoritesData } = useFavorites();
  const toggleFavorite = useFavoriteToggle();
  const favoritesList = useMemo(
    () => normalizeFavoritesList(favoritesData ?? null),
    [favoritesData],
  );

  const card = useMemo(() => {
    const raw = cardDetailData as Record<string, unknown> | undefined;
    const data = raw?.data ?? raw;
    const c = (data as Record<string, unknown>)?.card as Record<string, unknown> | undefined;
    return c ?? null;
  }, [cardDetailData]);

  const relatedCards = useMemo((): (CardOffer & { companyId: string })[] => {
    if (!card) return [];
    const arr = (card.related_cards as Array<Record<string, unknown>>) ?? [];
    return arr.map(mapApiRelatedToCardOffer).filter((o) => o.id && o.title.ar);
  }, [card]);

  const isCardFavorite = useMemo(
    () =>
      card &&
      favoritesList.some(
        (f) =>
          f.favorable_type === "card" &&
          String(f.favorable_id) === String(card.id),
      ),
    [card, favoritesList],
  );

  const cardName = card ? String(card.name ?? "") : "";
  const cardDescription = card ? String(card.description ?? "").trim() : "";
  const cardTerms = card ? String(card.terms ?? "").trim() : "";
  const cardFeatures = card
    ? (typeof card.features === "string"
        ? (card.features as string).split(/[،,;\n]/).map((s) => s.trim()).filter(Boolean)
        : Array.isArray(card.features)
          ? (card.features as string[])
          : [])
    : [];
  const imageUrl = card ? String(card.image ?? "") : "";
  const finalPrice = card != null ? Number(card.final_price ?? card.price ?? 0) : 0;
  const oldPrice = card?.old_price != null ? Number(card.old_price) : null;
  const discountPercentage = card?.discount_percentage != null ? Number(card.discount_percentage) : null;
  const validityType = card ? String(card.validity_type ?? "") : "";
  const isRenewable = card?.is_renewable === true;
  const deliveryType = card ? String(card.delivery_type ?? "") : "";
  const purchaseCount = card != null ? Number(card.purchase_count ?? 0) : 0;
  const viewsCount = card != null ? Number(card.views_count ?? 0) : 0;
  const inStock = card?.in_stock !== false && (card?.stock == null || Number(card.stock) > 0);
  const merchant = (card?.merchant as Record<string, unknown>) ?? {};
  const merchantName = String(merchant.name ?? "");
  const merchantLogo = String(merchant.logo ?? "");
  const category = (card?.category as Record<string, unknown>) ?? {};
  const categoryName = String(category.name ?? "");

  const unitPrice = finalPrice;
  const totalPrice = unitPrice * quantity;

  const handlePurchase = () => {
    if (!companyId || !offerId) return;
    if (!token) {
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
      return;
    }
    window.location.href = `/cards/${companyId}/payment?offer=${offerId}&quantity=${quantity}`;
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!token) {
      navigate(`/login?returnUrl=${encodeURIComponent(location.pathname)}`);
      return;
    }
    toggleFavorite.mutate(
      { favorable_type: "card", favorable_id: String(card?.id ?? offerId) },
      {
        onSuccess: () => {
          toast.success(
            isCardFavorite
              ? isRTL ? "تمت إزالته من المفضلة" : "Removed from favorites"
              : isRTL ? "تمت الإضافة إلى المفضلة" : "Added to favorites",
          );
        },
        onError: () => toast.error(isRTL ? "حدث خطأ" : "Something went wrong"),
      },
    );
  };

  if (isLoading) {
    return (
      <>
        <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary opacity-30" />
          <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl w-full text-center">
            <div className="h-8 w-48 bg-white/20 rounded-lg animate-pulse mx-auto mb-4" />
            <div className="h-4 w-3/4 max-w-md bg-white/15 rounded animate-pulse mx-auto" />
          </div>
        </section>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse h-[280px]" />
                <div className="bg-white rounded-3xl shadow-lg mt-6 h-64 animate-pulse" />
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl shadow-lg p-6 h-80 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "البطاقة غير موجودة" : "Card not found"}
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

  return (
    <>
      <Helmet>
        <title>
          {cardName} - {merchantName} | {isRTL ? "البطاقات" : "Cards"}
        </title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/cards/${companyId}/offer/${offerId}`}
        />
      </Helmet>

      {/* هيدر مثل صفحة العرض */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl w-full text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          <div className="flex items-center justify-between absolute top-4 left-4 right-4">
            <button
              onClick={() => navigate(`/cards/${companyId}`)}
              className={`text-white hover:text-purple-300 transition-colors flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}
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
              <button
                type="button"
                onClick={handleFavoriteClick}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors disabled:opacity-50"
                disabled={toggleFavorite.isPending}
              >
                {isCardFavorite ? (
                  <BsHeartFill className="text-lg text-red-300" />
                ) : (
                  <BsHeart className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {merchantLogo && (
            <div
              className="absolute top-4 w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 hidden sm:block"
              style={isRTL ? { left: "1rem" } : { right: "1rem" }}
            >
              <img
                src={merchantLogo}
                alt={merchantName}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight leading-tight text-white px-4">
            {cardName}
          </h1>
          {cardDescription && (
            <p className="text-white/80 text-base mb-3 max-w-2xl mx-auto line-clamp-2">
              {stripHtml(cardDescription)}
            </p>
          )}
          <div className="flex items-center justify-center gap-2 text-white/90 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-white/70">
                {isRTL ? "مبيعات" : "sold"}
              </span>
              <span className="font-medium">{purchaseCount}</span>
            </div>
            <span className="text-white/50">|</span>
            <div className="flex items-center gap-2 text-white/90">
              <FiEye className="text-white/80 shrink-0" size={18} />
              <span>{viewsCount}</span>
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
            <Link to="/cards" className="hover:text-white transition-colors text-xs">
              {isRTL ? "البطاقات" : "Cards"}
            </Link>
            {merchantName && (
              <>
                <span className="text-xs">|</span>
                <Link
                  to={`/cards/${companyId}`}
                  className="hover:text-white transition-colors text-xs"
                >
                  {merchantName}
                </Link>
              </>
            )}
            <span className="text-xs">|</span>
            <span className="text-[#fd671a] font-medium text-xs" aria-current="page">
              {cardName}
            </span>
          </div>
        </div>
        <div className="absolute -bottom-10 transform z-0">
          <img src={AboutPattern} alt="" className="w-full h-96 animate-float" />
        </div>
      </section>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "0" }}>
        <div className="container mx-auto px-4 py-8 max-w-7xl -mt-2 relative z-10 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* عمود المحتوى: صورة واحدة أصغر + تابات */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="p-4 flex items-center justify-center bg-gray-50">
                  <img
                    src={imageUrl}
                    alt={cardName}
                    className="max-h-[280px] w-auto object-contain rounded-xl"
                  />
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                  {[
                    { key: "description" as TabKey, label: isRTL ? "الوصف" : "Description" },
                    { key: "terms" as TabKey, label: isRTL ? "الشروط والأحكام" : "Terms" },
                    { key: "features" as TabKey, label: isRTL ? "المميزات" : "Features" },
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
                        {validityType && (
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <div className="text-sm text-gray-600">{isRTL ? "نوع الصلاحية" : "Validity"}</div>
                            <div className="font-medium text-gray-800">
                              {validityLabel[validityType.toLowerCase()] ?? validityType}
                            </div>
                          </div>
                        )}
                        <div className="bg-gray-100 p-3 rounded-lg">
                          <div className="text-sm text-gray-600">{isRTL ? "قابل للتجديد" : "Renewable"}</div>
                          <div className="font-medium text-gray-800">{isRenewable ? (isRTL ? "نعم" : "Yes") : (isRTL ? "لا" : "No")}</div>
                        </div>
                        {deliveryType && (
                          <div className="bg-gray-100 p-3 rounded-lg">
                            <div className="text-sm text-gray-600">{isRTL ? "نوع التوصيل" : "Delivery"}</div>
                            <div className="font-medium text-gray-800">{deliveryType}</div>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm whitespace-pre-wrap">
                        {stripHtml(cardDescription) || "—"}
                      </p>
                    </>
                  )}
                  {activeTab === "terms" && (
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">
                      {stripHtml(cardTerms) || (isRTL ? "لا توجد شروط." : "No terms.")}
                    </p>
                  )}
                  {activeTab === "features" && (
                    <div className="space-y-2">
                      {cardFeatures.length > 0 ? (
                        cardFeatures.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-700">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">{stripHtml(String(card.features ?? "")) || (isRTL ? "لا توجد مميزات." : "No features.")}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* الشريط الجانبي */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6 bg-white rounded-3xl shadow-lg p-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {categoryName && (
                    <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                      <FiTag className="text-base" /> {categoryName}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    {purchaseCount} {isRTL ? "مبيعة" : "sold"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {isRTL ? "اختر الكمية" : "Choose quantity"}
                </h3>
                <div className="border border-gray-200 rounded-xl p-4 space-y-3">
                  <p className="text-gray-800 font-medium mb-2">{cardName}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {oldPrice != null && oldPrice > unitPrice && (
                      <span className="text-gray-400 line-through text-sm">{oldPrice}</span>
                    )}
                    <span className="text-xl font-bold text-gray-900">{unitPrice}</span>
                    <CurrencyIcon className="text-gray-700" size={20} />
                    {discountPercentage != null && discountPercentage > 0 && (
                      <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-0.5 rounded-full">
                        {isRTL ? "خصم" : "Save"} {discountPercentage}%
                      </span>
                    )}
                  </div>
                  {!inStock && (
                    <p className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
                      {isRTL ? "غير متوفر حالياً" : "Out of stock"}
                    </p>
                  )}
                  {inStock && (
                    <>
                      <div className="mt-3">
                        <QuantitySelector
                          maxQty={Math.min(99, Number(card.stock) || 99)}
                          isRTL={!!isRTL}
                          onQuantityChange={handleQuantityChange}
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-700 mt-2">
                        {isRTL ? "المجموع" : "Total"}: {totalPrice} <CurrencyIcon className="inline" size={14} />
                      </p>
                    </>
                  )}
                </div>
                {inStock && (
                  <button
                    onClick={handlePurchase}
                    className="w-full py-3 px-6 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isRTL ? "شراء سريع" : "Quick Buy"}
                  </button>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-2">{isRTL ? "طرق الدفع" : "Payment methods"}</p>
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                    <span>VISA</span>
                    <span>MasterCard</span>
                    <span>Mada</span>
                    <span>Apple Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedCards.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                {isRTL ? "بطاقات قد تعجبك" : "Related cards"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedCards.map((related) => (
                  <OfferCard
                    key={related.id}
                    offer={related}
                    companyId={related.companyId}
                    onOfferClick={() =>
                      navigate(`/cards/${related.companyId}/offer/${related.id}`)
                    }
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default CardOfferDetailPage;

import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import {
  type Offer,
  getOfferImage,
  getRestaurantById,
  offerCategories,
} from "@data/offers";
import { API_BASE_URL } from "@config/api";
import CurrencyIcon from "@components/CurrencyIcon";
import { FiEye, FiShoppingBag } from "react-icons/fi";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import { useUserStore } from "@stores/userStore";
import { useFavorites, useFavoriteToggle } from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";
import { toast } from "react-toastify";

interface OfferCardProps {
  offer: Offer;
  onOfferClick: (offer: Offer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onOfferClick }) => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const isAuthenticated = useUserStore((s) => !!s.token);
  const { data: favoritesData } = useFavorites();
  const toggleFavorite = useFavoriteToggle();
  const favoritesList = useMemo(() => normalizeFavoritesList(favoritesData ?? null), [favoritesData]);
  const isFavorite = useMemo(
    () => favoritesList.some((f) => f.favorable_type === "offer" && String(f.favorable_id) === String(offer.id)),
    [favoritesList, offer.id]
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate(`/login?returnUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    toggleFavorite.mutate(
      { favorable_type: "offer", favorable_id: offer.id },
      {
        onSuccess: () => {
          toast.success(isFavorite ? (isRTL ? "تمت إزالته من المحفوظات" : "Removed from favorites") : (isRTL ? "تمت الإضافة إلى المحفوظات" : "Added to favorites"));
        },
        onError: () => toast.error(isRTL ? "حدث خطأ" : "Something went wrong"),
      }
    );
  };

  // Remove HTML tags from text
  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]*>/g, "").trim();
  };

  // Get company and category data - prefer API data if available
  const company = getRestaurantById(offer.companyId);
  const categoryInfo = offerCategories.find(
    (cat) => cat.key === offer.category
  );

  // Use API data if available, otherwise fallback to static data
  const displayCategoryName =
    offer.categoryName ||
    (categoryInfo ? (isRTL ? categoryInfo.ar : categoryInfo.en) : "");
  const displayMerchantName =
    offer.merchantName ||
    (company ? (isRTL ? company.name.ar : company.name.en) : "");

  // صورة المتجر/المطعم: من API (merchantLogo) أو من البيانات الثابتة (company.logo)
  const storeImageUrl = useMemo(() => {
    if (offer.merchantLogo) {
      let url = offer.merchantLogo.trim();
      if (url.includes("/storage/https://")) {
        const i = url.indexOf("/storage/https://");
        url = url.slice(0, i + "/storage".length) + url.slice(i + "/storage/https://".length);
      }
      if (url && !url.startsWith("http")) {
        url = url.startsWith("/") ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/storage/${url}`;
      }
      return url || null;
    }
    if (company?.logo) return getOfferImage(company.logo);
    return null;
  }, [offer.merchantLogo, company?.logo]);

  const handleCategoryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/offers/${offer.category}`);
  };

  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/offers/${offer.category}/${offer.companyId}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col h-full"
      onClick={() => onOfferClick(offer)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={getOfferImage(offer.image)}
          alt={offer.title[isRTL ? "ar" : "en"]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            // onClick={() => onShareClick?.(offer.id)}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsShare className="text-sm" />
          </button>
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200 disabled:opacity-50"
            disabled={toggleFavorite.isPending}
          >
            {isFavorite ? <BsHeartFill className="text-sm text-red-500" /> : <BsHeart className="text-sm" />}
          </button>
        </div>
        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {offer.discountPercentage}% {isRTL ? "خصم" : "OFF"}
          </span>
        </div>

        {/* Status Badges */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {offer.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {isRTL ? "جديد" : "NEW"}
            </span>
          )}
          {offer.isBestSeller && (
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              {isRTL ? "الأكثر مبيعاً" : "BEST SELLER"}
            </span>
          )}
        </div>
      </div>

      {/* Content Section - نفس الارتفاع بين كل الكاردات، السعر والزر يثبتان في الأسفل */}
      <div className="p-4 flex flex-col flex-1 min-h-0">
        <div className="flex flex-col flex-1 min-h-0">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
            {offer.title[isRTL ? "ar" : "en"]}
          </h3>

          <p
            className="text-sm text-gray-600 mb-3 line-clamp-2"
            style={{ height: "40px", overflow: "hidden" }}
          >
            {stripHtml(offer.description[isRTL ? "ar" : "en"])}
          </p>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {offer.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
              {offer.features.length > 2 && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  +{offer.features.length - 2} {isRTL ? "أخرى" : "more"}
                </span>
              )}
            </div>
          </div>

          {/* Breadcrumb Navigation - مع صور صغيرة للتصنيف والمتجر */}
          <div className="mb-4">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {displayCategoryName && (
                <>
                  <button
                    onClick={handleCategoryClick}
                    className="flex items-center gap-1.5 text-[#400198] hover:text-[#3000a0] font-medium transition-colors hover:underline"
                  >
                    {categoryInfo?.icon != null && (
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#400198]/10">
                        {typeof categoryInfo.icon === "string" ? (
                          <img src={categoryInfo.icon} alt="" className="h-full w-full object-contain" />
                        ) : (
                          React.createElement(
                            categoryInfo.icon as unknown as React.ComponentType<{ className?: string }>,
                            { className: "h-3 w-3 text-[#400198]" }
                          )
                        )}
                      </span>
                    )}
                    <span>{displayCategoryName}</span>
                  </button>
                  {displayMerchantName && (
                    <>
                      <span className="text-gray-300">•</span>
                      <button
                        onClick={handleCompanyClick}
                        className="flex items-center gap-1.5 text-[#400198] hover:text-[#3000a0] font-medium transition-colors hover:underline"
                      >
                        {storeImageUrl ? (
                          <span className="relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                            <img src={storeImageUrl} alt="" className="h-full w-full object-cover" />
                          </span>
                        ) : (
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#400198]/10">
                            <FiShoppingBag className="h-3 w-3 text-[#400198]" />
                          </span>
                        )}
                        <span>{displayMerchantName}</span>
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span>{offer.rating}</span>
              <span>({offer.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye />
              <span>{offer.views}</span>
            </div>
          </div>
        </div>

        {/* Price - يثبت في أسفل منطقة المحتوى */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-orange-500 flex items-center gap-1">
              {offer.discountPrice}
              <CurrencyIcon className="text-orange-500" size={16} />
            </span>
            <span className="text-sm text-gray-500 line-through flex items-center gap-1">
              {offer.originalPrice}
              <CurrencyIcon className="text-gray-500" size={12} />
            </span>
          </div>

          <button className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors">
            {isRTL ? "عرض التفاصيل" : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;

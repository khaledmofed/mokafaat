import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FiStar, FiEye, FiDownload, FiClock, FiGift, FiShoppingBag } from "react-icons/fi";
import { BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import { useIsRTL } from "@hooks";
import {
  type Offer,
  getOfferImage,
  getRestaurantById,
  offerCategories,
} from "@data/offers";
import { API_BASE_URL } from "@config/api";
import CurrencyIcon from "@components/CurrencyIcon";
import { useUserStore } from "@stores/userStore";
import { useFavorites, useFavoriteToggle } from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";
import { toast } from "react-toastify";
import { stripHtml } from "@utils/stripHtml";

interface OfferCardProps {
  offer: Offer;
  onOfferClick?: (offer: Offer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const isAuthenticated = useUserStore((s) => !!s.token);
  const { data: favoritesData } = useFavorites();
  const toggleFavorite = useFavoriteToggle();
  const favoritesList = useMemo(
    () => normalizeFavoritesList(favoritesData ?? null),
    [favoritesData],
  );
  const isFavorite = useMemo(
    () =>
      favoritesList.some(
        (f) =>
          f.favorable_type === "offer" &&
          String(f.favorable_id) === String(offer.id),
      ),
    [favoritesList, offer.id],
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate(
        `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`,
      );
      return;
    }
    toggleFavorite.mutate(
      { favorable_type: "offer", favorable_id: offer.id },
      {
        onSuccess: () => {
          toast.success(
            isFavorite
              ? isRTL
                ? "تمت إزالته من المفضلة"
                : "Removed from favorites"
              : isRTL
                ? "تمت الإضافة إلى المفضلة"
                : "Added to favorites",
          );
        },
        onError: () => toast.error(isRTL ? "حدث خطأ" : "Something went wrong"),
      },
    );
  };

  const company = getRestaurantById(offer.companyId);
  const categoryInfo = offerCategories.find(
    (cat) => cat.key === offer.category,
  );
  const displayCategoryName =
    offer.categoryName ||
    (categoryInfo ? (isRTL ? categoryInfo.ar : categoryInfo.en) : "");
  const displayMerchantName =
    offer.merchantName ||
    (company ? (isRTL ? company.name.ar : company.name.en) : "");

  const storeImageUrl = useMemo(() => {
    if (offer.merchantLogo) {
      let url = offer.merchantLogo.trim();
      if (url.includes("/storage/https://")) {
        const i = url.indexOf("/storage/https://");
        url =
          url.slice(0, i + "/storage".length) +
          url.slice(i + "/storage/https://".length);
      }
      if (url && !url.startsWith("http")) {
        url = url.startsWith("/")
          ? `${API_BASE_URL}${url}`
          : `${API_BASE_URL}/storage/${url}`;
      }
      return url || null;
    }
    if (company?.logo) return getOfferImage(company.logo);
    return null;
  }, [offer.merchantLogo, company?.logo]);

  const validityText = offer.validity?.[isRTL ? "ar" : "en"] || "";

  const getOfferTypeIcon = () => {
    if (offer.isBestSeller) {
      return <FiGift className="w-3 h-3 text-white" />;
    }
    if (offer.isNew) {
      return <FiClock className="w-3 h-3 text-white" />;
    }
    return <FiGift className="w-3 h-3 text-white" />;
  };

  const getOfferTypeText = () => {
    if (offer.isBestSeller) {
      return isRTL ? "الأكثر مبيعاً" : "Best Seller";
    }
    if (offer.isNew) {
      return isRTL ? "جديد" : "New";
    }
    return isRTL ? "عرض" : "Offer";
  };

  const getOfferTypeColor = () => {
    if (offer.isBestSeller) {
      return "bg-orange-500";
    }
    if (offer.isNew) {
      return "bg-green-500";
    }
    return "bg-purple-500";
  };

  const visitButtonText = isRTL ? "عرض التفاصيل" : "View Details";
  const purchaseText = isRTL
    ? `${offer.purchases} عملية شراء`
    : `${offer.purchases} purchases`;
  const featuresMoreText =
    offer.features.length > 3
      ? isRTL
        ? `+${offer.features.length - 3} مميزات أخرى`
        : `+${offer.features.length - 3} more features`
      : "";

  const offerDetailPath = `/offers/${offer.category}/${offer.companyId}/offer/${offer.id}`;

  const cardContent = (
    <>
      {/* Image Section - مثل كارد البطاقات */}
      <div className="relative h-[185px] overflow-hidden">
        <img
          src={getOfferImage(offer.image)}
          alt={offer.title[isRTL ? "ar" : "en"]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsShare className="text-sm" />
          </button>
          <button
            type="button"
            onClick={handleFavoriteClick}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all disabled:opacity-50"
            disabled={toggleFavorite.isPending}
          >
            {isFavorite ? (
              <BsHeartFill className="text-sm text-red-500" />
            ) : (
              <BsHeart className="text-sm" />
            )}
          </button>
        </div>

        {/* نوع العرض - يسار الصورة */}
        <div className="absolute top-3 left-3">
          <div
            className={`${getOfferTypeColor()} text-white px-2 py-1 rounded text-xs font-medium`}
          >
            {getOfferTypeText()}
          </div>
        </div>

        {/* خصم أو صلاحية - أسفل يسار الصورة */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {offer.discountPercentage > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              {offer.discountPercentage}% {isRTL ? "خصم" : "OFF"}
            </span>
          )}
          {validityText && (
            <span className="bg-white/20 text-white px-2 py-1 rounded text-xs font-medium">
              {validityText}
            </span>
          )}
        </div>
      </div>

      {/* Content Section - نفس هيكل كارد البطاقات */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#fd671a] rounded-full flex items-center justify-center">
            {getOfferTypeIcon()}
          </div>
          <span className="text-sm text-[#fd671a] font-medium">
            {getOfferTypeText()}
          </span>
        </div>

        <h3 className="text-md font-bold text-gray-900 mb-2 line-clamp-2">
          {offer.title[isRTL ? "ar" : "en"]}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {stripHtml(offer.description[isRTL ? "ar" : "en"])}
        </p>

        {/* التصنيف والمتجر - مع الأيقونة وصورة المتجر */}
        {(displayCategoryName || displayMerchantName) && (
          <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs">
            {displayCategoryName && (
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                {categoryInfo?.icon != null && (
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#400198]/10">
                    {typeof categoryInfo.icon === "string" ? (
                      <img
                        src={categoryInfo.icon}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      React.createElement(
                        categoryInfo.icon as React.ComponentType<{ className?: string }>,
                        { className: "h-3 w-3 text-[#400198]" },
                      )
                    )}
                  </span>
                )}
                <span>{displayCategoryName}</span>
              </span>
            )}
            {displayCategoryName && displayMerchantName && (
              <span className="text-gray-300">•</span>
            )}
            {displayMerchantName && (
              <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                {storeImageUrl ? (
                  <span className="relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                    <img
                      src={storeImageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                ) : (
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#400198]/10">
                    <FiShoppingBag className="h-3 w-3 text-[#400198]" />
                  </span>
                )}
                <span>{displayMerchantName}</span>
              </span>
            )}
          </div>
        )}

        {/* المميزات - pills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {offer.features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
              >
                <div className="w-1 h-1 bg-purple-500 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
            {offer.features.length > 3 && (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {featuresMoreText}
              </div>
            )}
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FiStar className="w-4 h-4 text-[#B3B3B3]" />
              <span className="text-sm text-[#B3B3B3]">{offer.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye className="w-4 h-4 text-[#B3B3B3]" />
              <span className="text-sm text-[#B3B3B3]">{offer.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiDownload className="w-4 h-4 text-[#B3B3B3]" />
              <span className="text-sm text-[#B3B3B3]">{offer.downloads}</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">{purchaseText}</div>
        </div>

        <hr className="my-4 border-t border-[#e6e6e6]" />

        {/* السعر والزر */}
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#400198] flex items-center gap-1">
              {offer.discountPrice}
              <CurrencyIcon className="text-[#400198]" size={16} />
            </span>
            <span className="text-sm text-gray-500 line-through flex items-center gap-1">
              {offer.originalPrice}
              <CurrencyIcon className="text-gray-500" size={12} />
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-[#400198] cursor-pointer hover:text-[#fd671a] transition-colors">
            {visitButtonText}
            <IoIosArrowRoundForward
              className={`text-2xl transform ${
                isRTL ? "rotate-[225deg]" : "-rotate-45"
              }`}
            />
          </span>
        </div>
      </div>
    </>
  );

  return (
    <Link
      to={offerDetailPath}
      className="block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col h-full no-underline text-inherit"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      {cardContent}
    </Link>
  );
};

export default OfferCard;

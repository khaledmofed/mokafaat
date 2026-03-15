import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  FiStar,
  FiEye,
  FiDownload,
  FiBookmark,
  FiClock,
  FiGift,
  FiCreditCard,
  FiShoppingBag,
} from "react-icons/fi";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { type CardOffer } from "@data/cards";
import type { CardOfferWithCompanyId } from "@network/mappers/cardsMapper";
import CurrencyIcon from "@components/CurrencyIcon";
import { useUserStore } from "@stores/userStore";
import { useFavorites, useFavoriteToggle } from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";
import { toast } from "react-toastify";
import {
  Cards1,
  Cards12,
  Cards13,
  Cards14,
  Cards2,
  Cards3,
  Cards4,
  Cards5,
  Cards6,
  Cards7,
  Cards8,
} from "@assets";
import { stripHtml } from "@utils/stripHtml";

interface CategoryItem {
  id: number;
  name: string;
  image?: string;
}

interface OfferCardProps {
  offer: CardOffer;
  companyId: string;
  onOfferClick?: (offer: CardOffer) => void;
  /** قائمة التصنيفات من الصفحة لاستخدام صورة التصنيف */
  categories?: CategoryItem[];
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  companyId,
  onOfferClick,
  categories,
}) => {
  const extendedOffer = offer as CardOfferWithCompanyId;
  const categoryImage = useMemo(
    () =>
      extendedOffer.categoryId && categories?.length
        ? categories.find((c) => c.id === extendedOffer.categoryId)?.image
        : undefined,
    [extendedOffer.categoryId, categories],
  );
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const detailPath = `/cards/${companyId}/offer/${offer.id}`;
  const { i18n } = useTranslation();
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
          f.favorable_type === "card" &&
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
      { favorable_type: "card", favorable_id: offer.id },
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

  // Function to get card image (يدعم الرابط من API أو اسم الأصول)
  const getCardImage = (logoName: string) => {
    if (logoName.startsWith("http")) return logoName;
    switch (logoName) {
      case "Cards1":
        return Cards1;
      case "Cards2":
        return Cards2;
      case "Cards3":
        return Cards3;
      case "Cards4":
        return Cards4;
      case "Cards5":
        return Cards5;
      case "Cards6":
        return Cards6;
      case "Cards7":
        return Cards7;
      case "Cards8":
        return Cards8;
      case "Cards12":
        return Cards12;
      case "Cards13":
        return Cards13;
      case "Cards14":
        return Cards14;
      default:
        return Cards1;
    }
  };

  // Memoize validity text based on language
  const validityText = useMemo(() => {
    return offer.validity[isRTL ? "ar" : "en"];
  }, [offer.validity, isRTL]);

  // Memoize visit button text based on language (تفاصيل البطاقة)
  const visitButtonText = useMemo(() => {
    if (i18n.language === "ar") {
      return "تفاصيل البطاقة";
    }
    return "Card Details";
  }, [i18n.language]);

  // Memoize purchase count text based on language
  const purchaseText = useMemo(() => {
    if (i18n.language === "ar") {
      return `${offer.purchases} عملية شراء`;
    }
    return `${offer.purchases} purchases`;
  }, [offer.purchases, i18n.language]);

  // Memoize features text based on language
  const featuresText = useMemo(() => {
    if (i18n.language === "ar") {
      return `+${offer.features.length - 3} مميزات أخرى`;
    }
    return `+${offer.features.length - 3} more features`;
  }, [offer.features.length, i18n.language]);

  // Function to get the appropriate icon (بطاقة = أيقونة بطاقة)
  const getOfferTypeIcon = () => {
    if (offer.isPopular) {
      return <FiGift className="w-3 h-3 text-white" />;
    }
    if (offer.isNew) {
      return <FiClock className="w-3 h-3 text-white" />;
    }
    return <FiCreditCard className="w-3 h-3 text-white" />;
  };

  // Function to get card/offer type text (بطاقة وليس عرض)
  const getOfferTypeText = () => {
    if (offer.isPopular) {
      return isRTL ? "شائع" : "Popular";
    }
    if (offer.isNew) {
      return isRTL ? "جديد" : "New";
    }
    return isRTL ? "بطاقة" : "Card";
  };

  // Function to get offer type color
  const getOfferTypeColor = () => {
    if (offer.isPopular) {
      return "bg-orange-500";
    }
    if (offer.isNew) {
      return "bg-green-500";
    }
    return "bg-purple-500";
  };

  const cardContent = (
    <>
      {/* Image Section - ارتفاع ثابت */}
      <div className="relative h-[185px] overflow-hidden flex-shrink-0">
        <img
          src={getCardImage(offer.image)}
          alt={offer.title[isRTL ? "ar" : "en"]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <div className="absolute top-3 right-3 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleFavoriteClick(e);
            }}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all disabled:opacity-50"
            disabled={toggleFavorite.isPending}
          >
            {isFavorite ? (
              <BsHeartFill className="text-sm text-red-500" />
            ) : (
              <BsHeart className="text-sm" />
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onOfferClick?.(offer);
            }}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <FiBookmark className="text-sm" />
          </button>
        </div>

        <div className="absolute top-3 left-3">
          <div
            className={`${getOfferTypeColor()} text-white px-2 py-1 rounded text-xs font-medium`}
          >
            {getOfferTypeText()}
          </div>
        </div>

        <div className="absolute bottom-3 left-3 bg-white/20 text-white px-2 py-1 rounded text-xs font-medium">
          {validityText}
        </div>
      </div>

      {/* Content Section - flex لارتفاع موحد والسعر يثبت في الأسفل */}
      <div className="px-4 py-6 flex flex-col flex-1 min-h-[280px]">
        <div className="flex flex-col flex-1 min-h-0">
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

          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
            {stripHtml(offer.description[isRTL ? "ar" : "en"])}
          </p>

          {/* التصنيف والمتجر - مع الصور */}
          {(extendedOffer.category || extendedOffer.merchant) && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs">
              {extendedOffer.category && (
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  {categoryImage ? (
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#400198]/10">
                      <img
                        src={categoryImage}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </span>
                  ) : (
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-[#400198]/10">
                      <FiShoppingBag className="h-3 w-3 text-[#400198]" />
                    </span>
                  )}
                  <span>{extendedOffer.category.name}</span>
                </span>
              )}
              {extendedOffer.category && extendedOffer.merchant && (
                <span className="text-gray-300">•</span>
              )}
              {extendedOffer.merchant && (
                <span className="flex items-center gap-1.5 text-gray-600 font-medium">
                  {extendedOffer.merchant.logo ? (
                    <span className="relative h-5 w-5 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200">
                      <img
                        src={extendedOffer.merchant.logo}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </span>
                  ) : (
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#400198]/10">
                      <FiShoppingBag className="h-3 w-3 text-[#400198]" />
                    </span>
                  )}
                  <span>{extendedOffer.merchant.name}</span>
                </span>
              )}
            </div>
          )}

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
                  {featuresText}
                </div>
              )}
            </div>
          </div>

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
        </div>

        <hr className="my-4 border-t border-[#e6e6e6] flex-shrink-0" />

        <div className="flex items-center justify-between gap-1 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#400198] flex items-center gap-1">
              {offer.price}
              <CurrencyIcon className="text-[#400198]" size={16} />
            </span>
            {offer.originalPrice && (
              <span className="text-sm text-gray-500 line-through flex items-center gap-1">
                {offer.originalPrice}
                <CurrencyIcon className="text-gray-500" size={12} />
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-[#400198] hover:text-[#fd671a] transition-colors">
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
      to={detailPath}
      className="block bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col h-full no-underline text-inherit"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      {cardContent}
    </Link>
  );
};

export default OfferCard;

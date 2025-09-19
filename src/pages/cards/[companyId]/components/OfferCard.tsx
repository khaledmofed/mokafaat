import React, { useMemo } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  FiStar,
  FiEye,
  FiDownload,
  FiBookmark,
  FiClock,
  FiGift,
} from "react-icons/fi";
import { useIsRTL } from "@hooks";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { type CardOffer } from "@data/cards";
import CurrencyIcon from "@components/CurrencyIcon";
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

interface OfferCardProps {
  offer: CardOffer;
  companyId: string;
  onOfferClick?: (offer: CardOffer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  // companyId,
  onOfferClick,
}) => {
  const isRTL = useIsRTL();
  // const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Function to get card image
  const getCardImage = (logoName: string) => {
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

  // Memoize visit button text based on language
  const visitButtonText = useMemo(() => {
    if (i18n.language === "ar") {
      return "عرض التفاصيل";
    }
    return "View Details";
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

  // Function to get the appropriate icon based on offer type
  const getOfferTypeIcon = () => {
    if (offer.isPopular) {
      return <FiGift className="w-3 h-3 text-white" />;
    }
    if (offer.isNew) {
      return <FiClock className="w-3 h-3 text-white" />;
    }
    return <FiGift className="w-3 h-3 text-white" />;
  };

  // Function to get offer type text
  const getOfferTypeText = () => {
    if (offer.isPopular) {
      return isRTL ? "شائع" : "Popular";
    }
    if (offer.isNew) {
      return isRTL ? "جديد" : "New";
    }
    return isRTL ? "عرض" : "Offer";
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

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      {/* Image Section */}
      <div className="relative h-[185px] overflow-hidden">
        <img
          src={getCardImage(offer.image)}
          alt={offer.title[isRTL ? "ar" : "en"]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Image Overlays */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onOfferClick?.(offer)}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <FiBookmark className="text-sm" />
          </button>
        </div>

        {/* Offer Type Badge */}
        <div className="absolute top-3 left-3">
          <div
            className={`${getOfferTypeColor()} text-white px-2 py-1 rounded text-xs font-medium`}
          >
            {getOfferTypeText()}
          </div>
        </div>

        {/* Validity Badge */}
        <div className="absolute bottom-3 left-3 bg-white/20 text-white px-2 py-1 rounded text-xs font-medium">
          {validityText}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6">
        {/* Offer Type */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#fd671a] rounded-full flex items-center justify-center">
            {getOfferTypeIcon()}
          </div>
          <span className="text-sm text-[#fd671a] font-medium">
            {getOfferTypeText()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-md font-bold text-gray-900 mb-2 line-clamp-2">
          {offer.title[isRTL ? "ar" : "en"]}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {offer.description[isRTL ? "ar" : "en"]}
        </p>

        {/* Features List */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {offer.features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
              >
                <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
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

        {/* Features */}
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

        <hr className="my-4 border-t-1 border-[#e6e6e6]" />

        {/* Price and Action */}
        <div className="flex items-center justify-between gap-1">
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
          <button
            onClick={() => onOfferClick?.(offer)}
            className="flex items-center gap-1 text-sm font-semibold text-[#400198] cursor-pointer hover:text-[#fd671a] transition-colors"
          >
            <span>{visitButtonText}</span>
            <IoIosArrowRoundForward
              className={`text-2xl transform ${
                isRTL ? "rotate-[225deg]" : "-rotate-45"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;

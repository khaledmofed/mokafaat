import React from "react";
import { useIsRTL } from "@hooks";
import { type Offer } from "@data/offers";
import { Pro1, Pro2, Pro3, Pro4, Pro5, Pro6, Pro7, Pro8 } from "@assets";
import CurrencyIcon from "@components/CurrencyIcon";
import { FiDownload, FiEye } from "react-icons/fi";
import { stripHtml } from "@utils/stripHtml";

interface OfferCardProps {
  offer: Offer;
  onOfferClick: (offer: Offer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onOfferClick }) => {
  const isRTL = useIsRTL();

  const getOfferImage = (imageName: string) => {
    // If it's already a URL, return it directly
    if (imageName.startsWith("http")) {
      return imageName;
    }

    // Otherwise, use the local images
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

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={() => onOfferClick(offer)}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getOfferImage(offer.image)}
          alt={offer.title[isRTL ? "ar" : "en"]}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Discount Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {offer.discountPercentage}% {isRTL ? "خصم" : "OFF"}
          </span>
        </div>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
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

        {/* Validity */}
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
          {offer.validity[isRTL ? "ar" : "en"]}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {offer.title[isRTL ? "ar" : "en"]}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {stripHtml(offer.description[isRTL ? "ar" : "en"])}
        </p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {offer.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {offer.features.length > 3 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                +{offer.features.length - 3} {isRTL ? "أخرى" : "more"}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span>{offer.rating}</span>
              <span>({offer.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <FiEye />
              <span>{offer.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiDownload />
              <span>{offer.purchases}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
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

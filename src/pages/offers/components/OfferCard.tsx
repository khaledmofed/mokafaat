import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import {
  type Offer,
  getOfferImage,
  getRestaurantById,
  offerCategories,
} from "@data/offers";
import CurrencyIcon from "@components/CurrencyIcon";
import { FiEye } from "react-icons/fi";
import { BsHeart, BsShare } from "react-icons/bs";

interface OfferCardProps {
  offer: Offer;
  onOfferClick: (offer: Offer) => void;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onOfferClick }) => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();

  // Get company and category data
  const company = getRestaurantById(offer.companyId);
  const categoryInfo = offerCategories.find(
    (cat) => cat.key === offer.category
  );

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
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            // onClick={() => onShareClick?.(offer.id)}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsShare className="text-sm" />
          </button>
          <button
            // onClick={() => onFavoriteClick?.(offer.id)}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsHeart className="text-sm" />
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

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {offer.title[isRTL ? "ar" : "en"]}
        </h3>

        <p
          className="text-sm text-gray-600 mb-3 line-clamp-2"
          style={{ height: "40px", overflow: "hidden" }}
        >
          {offer.description[isRTL ? "ar" : "en"]}
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

        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs">
            {categoryInfo && (
              <>
                <button
                  onClick={handleCategoryClick}
                  className="text-[#400198] hover:text-[#3000a0] font-medium transition-colors hover:underline"
                >
                  {isRTL ? categoryInfo.ar : categoryInfo.en}
                </button>
                {company && (
                  <>
                    <span className="text-gray-400">•</span>
                    <button
                      onClick={handleCompanyClick}
                      className="text-[#400198] hover:text-[#3000a0] font-medium transition-colors hover:underline"
                    >
                      {isRTL ? company.name.ar : company.name.en}
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

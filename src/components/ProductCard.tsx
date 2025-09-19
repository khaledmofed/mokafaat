import React, { useMemo } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsShare, BsHeart } from "react-icons/bs";
import { FiEye } from "react-icons/fi";
import { useIsRTL } from "../hooks";
import { useTranslation } from "react-i18next";
import CurrencyIcon from "./CurrencyIcon";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  brand?: string;
  brandColor?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  onShareClick?: (id: number) => void;
  onFavoriteClick?: (id: number) => void;
  onBuyClick?: (id: number) => void;
  onOfferClick?: (product: ProductCardProps) => void; // Add this for modal
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  originalPrice,
  discountPrice,
  discountPercentage,
  rating,
  reviewsCount,
  brand,
  brandColor,
  isNew = false,
  isBestSeller = false,
  onShareClick,
  onFavoriteClick,
  onBuyClick,
  onOfferClick,
}) => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();

  // Memoize buy button text based on language
  const buyButtonText = useMemo(() => {
    return t("home.product.buyNow");
  }, [t]);

  // Memoize discount text based on language
  const discountText = useMemo(() => {
    return `${t("home.product.discount")} ${discountPercentage}%`;
  }, [t, discountPercentage]);

  // Create product object for modal
  const productData = {
    id,
    image,
    title,
    originalPrice: originalPrice || 0,
    discountPrice,
    discountPercentage,
    rating,
    reviewsCount,
    brand: brand || "",
    brandColor: brandColor || "#400198",
    isNew,
    isBestSeller,
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
      onClick={() => onOfferClick?.(productData)}
    >
      {/* Image Section */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Image Overlays */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onShareClick?.(id)}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsShare className="text-sm" />
          </button>
          <button
            onClick={() => onFavoriteClick?.(id)}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsHeart className="text-sm" />
          </button>
        </div>

        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            {discountText}
          </span>
        </div>

        {/* Status Badges */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {t("home.product.new")}
            </span>
          )}
          {isBestSeller && (
            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {t("home.product.bestseller")}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6">
        {/* Title */}
        <h3 className="text-md font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {t("home.product.description")}
        </p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {t("home.product.feature1")}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {t("home.product.feature2")}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              +2 {t("home.product.more")}
            </span>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mb-4">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#400198] font-medium">
              {productData.brand || t("home.product.category")}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-[#400198] font-medium">
              {t("home.product.company")}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{rating}</span>
            <span>({reviewsCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <FiEye className="w-4 h-4" />
            <span>1.2K</span>
          </div>
        </div>

        <hr className="my-4 border-t-1 border-[#e6e6e6]" />

        {/* Price and Action */}
        <div className="flex items-center justify-between gap-1">
          <div className="text-lg font-bold text-[#400198]">
            <span className="flex items-center gap-1">
              {discountPrice}
              <CurrencyIcon size={16} className="text-[#400198]" />
            </span>
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBuyClick?.(id);
            }}
            className="flex items-center gap-1 text-sm font-semibold text-[#400198] cursor-pointer hover:text-[#fd671a] transition-colors"
          >
            <span>{buyButtonText}</span>
            <IoIosArrowRoundForward
              className={`text-2xl transform ${
                isRTL ? "rotate-45" : "-rotate-45"
              }`}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

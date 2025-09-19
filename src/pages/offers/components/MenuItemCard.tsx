import React from "react";
import { MenuItem } from "@data/offers";
import { BsHeart, BsShare } from "react-icons/bs";
import { FaStar, FaEye } from "react-icons/fa";
import { useIsRTL } from "@hooks";
import CurrencyIcon from "@components/CurrencyIcon";

interface MenuItemCardProps {
  menuItem: MenuItem;
  onMenuItemClick?: (menuItem: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  menuItem,
  onMenuItemClick,
}) => {
  const isRTL = useIsRTL();

  const handleClick = () => {
    onMenuItemClick?.(menuItem);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Image Section with Background Color */}
      <div className="relative h-48 overflow-hidden">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${
              menuItem.isPopular
                ? "#f59e0b"
                : menuItem.isNew
                ? "#10b981"
                : menuItem.isBestSeller
                ? "#ef4444"
                : "#6b7280"
            } 0%, ${
              menuItem.isPopular
                ? "#d97706"
                : menuItem.isNew
                ? "#059669"
                : menuItem.isBestSeller
                ? "#dc2626"
                : "#4b5563"
            } 100%)`,
          }}
        >
          <img
            src={menuItem.image}
            alt={isRTL ? menuItem.title.ar : menuItem.title.en}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Bookmark Icon */}
        <div className="absolute top-3 left-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <BsHeart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </div>
        </div>

        {/* Share Icon */}
        <div className="absolute top-3 right-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <BsShare className="w-4 h-4 text-gray-600 hover:text-blue-500 transition-colors" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {menuItem.isPopular && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {isRTL ? "شائع" : "Popular"}
            </span>
          )}
          {menuItem.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {isRTL ? "جديد" : "New"}
            </span>
          )}
          {menuItem.isBestSeller && (
            <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {isRTL ? "الأكثر مبيعاً" : "Best Seller"}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {isRTL ? menuItem.title.ar : menuItem.title.en}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {isRTL ? menuItem.description.ar : menuItem.description.en}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {menuItem.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
          {menuItem.features.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              +{menuItem.features.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <FaStar className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">
              {menuItem.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({menuItem.reviewsCount})
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaEye className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">{menuItem.views}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold text-orange-500">
              {menuItem.price}
            </span>
            <CurrencyIcon className="w-4 h-4 text-orange-500" />
          </div>
          {menuItem.originalPrice &&
            menuItem.originalPrice > menuItem.price && (
              <span className="text-sm text-gray-500 line-through">
                {menuItem.originalPrice}
              </span>
            )}
        </div>

        {/* Preparation Time */}
        <div className="mt-2 text-xs text-gray-500">
          {isRTL ? "وقت التحضير:" : "Prep time:"} {menuItem.preparationTime}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;

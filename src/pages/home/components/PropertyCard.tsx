import React, { useMemo } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
// import { FaHeart } from "react-icons/fa";
import {
  BsBuilding,
  BsHouse,
  BsShop,
  BsBuildingFill,
  BsShare,
} from "react-icons/bs";
import { IoBedOutline } from "react-icons/io5";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { useIsRTL } from "@hooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PropertyCardProps {
  id: number;
  image: string;
  propertyType: string;
  propertyTypeAr?: string;
  title: string;
  location: string;
  bedrooms: number;
  area: string;
  price: string;
  slug?: string;
  propertySlug?: string;
  isFavorite?: boolean;
  onFavoriteClick?: (id: number) => void;
  onShareClick?: (id: number) => void;
  onVisitClick?: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  image,
  propertyType,
  propertyTypeAr,
  title,
  location,
  bedrooms,
  area,
  price,
  slug,
  propertySlug,
  //   isFavorite = false,
  //   onFavoriteClick,
  onShareClick,
  onVisitClick,
}) => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  // Memoize property type display based on language
  const displayPropertyType = useMemo(() => {
    if (i18n.language === "ar" && propertyTypeAr) {
      return propertyTypeAr;
    }
    return propertyType;
  }, [propertyType, propertyTypeAr, i18n.language]);

  // Memoize bedroom text based on language
  const bedroomText = useMemo(() => {
    if (i18n.language === "ar") {
      return bedrooms === 1 ? "غرفة نوم" : `${bedrooms} غرف نوم`;
    }
    return `${bedrooms} Bedroom${bedrooms > 1 ? "s" : ""}`;
  }, [bedrooms, i18n.language]);

  // Memoize area text based on language
  const areaText = useMemo(() => {
    if (i18n.language === "ar") {
      return `حتى ${area}`;
    }
    return `Up to ${area}`;
  }, [area, i18n.language]);

  // Memoize visit button text based on language
  const visitButtonText = useMemo(() => {
    if (i18n.language === "ar") {
      return "زيارة الآن";
    }
    return "Visit Now";
  }, [i18n.language]);

  // Function to get the appropriate icon based on property type
  const getPropertyTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "apartments":
        return <BsBuilding className="w-3 h-3 text-white" />;
      case "villas":
        return <BsHouse className="w-3 h-3 text-white" />;
      case "offices":
        return <BsBuildingFill className="w-3 h-3 text-white" />;
      case "shops":
        return <BsShop className="w-3 h-3 text-white" />;
      default:
        return <BsBuilding className="w-3 h-3 text-white" />;
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
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
          {/* <button
            onClick={() => onFavoriteClick?.(id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white bg-opacity-90 text-gray-700 hover:bg-opacity-100"
            }`}
          >
            <FaHeart className="text-sm" />
          </button> */}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 py-6">
        {/* Property Type */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-[#fd671a] rounded-full flex items-center justify-center">
            {getPropertyTypeIcon(propertyType)}
          </div>
          <span
            onClick={() => {
              if (propertySlug) {
                navigate(`/properties/${propertySlug}`);
              }
            }}
            className="text-sm text-[#fd671a] font-medium cursor-pointer hover:text-[#400198] transition-colors duration-200"
          >
            {displayPropertyType}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-md font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Location */}
        <p className="text-sm text-gray-600 mb-3">{location}</p>

        {/* Specifications */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <IoBedOutline className="w-4 h-4 text-[#B3B3B3]" />
            <span className="text-sm text-[#B3B3B3]">{bedroomText}</span>
          </div>
          <div className="flex items-center gap-1">
            <LiaVectorSquareSolid className="w-4 h-4 text-[#B3B3B3]" />
            <span className="text-sm text-[#B3B3B3]">{areaText}</span>
          </div>
        </div>
        <hr className="my-4 border-t-1 border-[#e6e6e6]" />
        {/* Price */}
        <div className="flex items-center justify-between gap-1">
          <div className="text-lg font-bold text-[#400198]">
            <span className="text-[#B3B3B3] text-sm font-semibold">
              {i18n.language === "ar" ? "من" : "From"}
            </span>{" "}
            {price}
          </div>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (slug && propertySlug) {
                navigate(`/properties/${propertySlug}/${slug}`);
              } else {
                onVisitClick?.(id);
              }
            }}
            className="flex items-center gap-1 text-sm font-semibold text-[#400198] cursor-pointer hover:text-[#fd671a] transition-colors"
          >
            {" "}
            <span>{visitButtonText}</span>
            <IoIosArrowRoundForward
              className={`text-2xl transform ${
                isRTL ? "rotate-45" : "-rotate-45"
              }`}
            />
          </a>
        </div>

        {/* Visit Button */}
        {/* <button
          onClick={() => onVisitClick?.(id)}
          className="w-full bg-[#400198] text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#1a3a6b] transition-colors duration-300"
        >
         
        </button> */}
      </div>
    </div>
  );
};

export default PropertyCard;

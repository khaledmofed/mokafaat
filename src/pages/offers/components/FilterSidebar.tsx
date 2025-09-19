import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiTag, FiUsers, FiLayers, FiSunrise } from "react-icons/fi";
import { useIsRTL } from "@hooks";
import { UnderTitle } from "@assets";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  appliedFilters?: FilterState | null;
}

interface FilterState {
  sortBy: string;
  restaurants: string[];
  subcategories: string[];
  offerTypes: string[];
  facilities: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  appliedFilters,
}) => {
  const isRTL = useIsRTL();

  const [filters, setFilters] = useState<FilterState>({
    sortBy: "closest",
    restaurants: [],
    subcategories: [],
    offerTypes: [],
    facilities: [],
  });

  // Update local filters when appliedFilters changes
  React.useEffect(() => {
    if (appliedFilters) {
      setFilters(appliedFilters);
    } else {
      setFilters({
        sortBy: "closest",
        restaurants: [],
        subcategories: [],
        offerTypes: [],
        facilities: [],
      });
    }
  }, [appliedFilters]);

  const handleSortChange = (sortType: string) => {
    setFilters((prev) => ({ ...prev, sortBy: sortType }));
  };

  const handleCategoryToggle = (
    category: string,
    type: keyof Omit<FilterState, "sortBy">
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(category)
        ? prev[type].filter((item) => item !== category)
        : [...prev[type], category],
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    setFilters({
      sortBy: "closest",
      restaurants: [],
      subcategories: [],
      offerTypes: [],
      facilities: [],
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 h-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white z-[9999] transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen
            ? isRTL
              ? "right-0 translate-x-0"
              : "left-0 translate-x-0"
            : isRTL
            ? "-right-full translate-x-full"
            : "-left-full -translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-800">
              {isRTL ? "تصفية العروض" : "Filter Offers"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-gray-100 rounded-full p-2"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 pb-16 h-[calc(100vh-160px)]">
          <div className="space-y-6">
            {/* Sort By */}
            <div>
              <div className="text-start gap-2 mb-4">
                <span
                  className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "تصفية حسب" : "Sort By"}
                </span>
                <img
                  src={UnderTitle}
                  alt="underlineDecoration"
                  className="h-1 mt-2"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { key: "closest", ar: "الأقرب لك", en: "Closest to you" },
                  { key: "rating", ar: "أعلى تقييم", en: "Highest rating" },
                  { key: "newest", ar: "عروض جديدة", en: "New offers" },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSortChange(option.key)}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.sortBy === option.key
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {isRTL ? option.ar : option.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Restaurants */}
            <div>
              <div className="text-start gap-2 mb-4">
                <span
                  className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "المطاعم" : "Restaurants"}
                </span>
                <img
                  src={UnderTitle}
                  alt="underlineDecoration"
                  className="h-1 mt-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "pizza", ar: "مطاعم بيتزا", en: "Pizza restaurants" },
                  { key: "eastern", ar: "أكلات شرقية", en: "Eastern cuisine" },
                  { key: "burger", ar: "برجر", en: "Burger" },
                  { key: "shawarma", ar: "شاورما", en: "Shawarma" },
                  { key: "grills", ar: "مشاوي", en: "Grills" },
                  { key: "kitchen", ar: "مطبخ", en: "Kitchen" },
                  { key: "falafel", ar: "فلافل", en: "Falafel" },
                  { key: "desserts", ar: "حلويات", en: "Desserts" },
                  { key: "other", ar: "أخرى", en: "Other" },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() =>
                      handleCategoryToggle(option.key, "restaurants")
                    }
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      filters.restaurants.includes(option.key)
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {isRTL ? option.ar : option.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Subcategories */}
            <div>
              <div className="text-start gap-2 mb-4">
                <span
                  className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "فئات فرعية" : "Subcategories"}
                </span>
                <img
                  src={UnderTitle}
                  alt="underlineDecoration"
                  className="h-1 mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "fastfood", ar: "وجبات سريعة", en: "Fast food" },
                  { key: "finedining", ar: "مطاعم فاخرة", en: "Fine dining" },
                  {
                    key: "external",
                    ar: "طلبات خارجية",
                    en: "External orders",
                  },
                  { key: "cafes", ar: "مقاهي", en: "Cafes" },
                  { key: "other", ar: "أخرى", en: "Other" },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() =>
                      handleCategoryToggle(option.key, "subcategories")
                    }
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filters.subcategories.includes(option.key)
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {isRTL ? option.ar : option.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Offer Types */}
            <div>
              <div className="text-start gap-2 mb-4">
                <span
                  className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "نوع العرض" : "Offer Type"}
                </span>
                <img
                  src={UnderTitle}
                  alt="underlineDecoration"
                  className="h-1 mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    key: "light",
                    ar: "عروض لايت",
                    en: "Light offers",
                    icon: <FiTag />,
                  },
                  {
                    key: "kids",
                    ar: "للأطفال",
                    en: "For children",
                    icon: <FiUsers />,
                  },
                  {
                    key: "buffet",
                    ar: "بوفيه",
                    en: "Buffet",
                    icon: <FiLayers />,
                  },
                  {
                    key: "brunch",
                    ar: "برانش",
                    en: "Brunch",
                    icon: <FiSunrise />,
                  },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() =>
                      handleCategoryToggle(option.key, "offerTypes")
                    }
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex flex-col items-center gap-1 ${
                      filters.offerTypes.includes(option.key)
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg text-gray-600">{option.icon}</span>
                    <span>{isRTL ? option.ar : option.en}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Facilities */}
            <div>
              <div className="text-start gap-2 mb-4">
                <span
                  className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "التسهيلات" : "Facilities"}
                </span>
                <img
                  src={UnderTitle}
                  alt="underlineDecoration"
                  className="h-1 mt-2"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "fastfood", ar: "وجبات سريعة", en: "Fast food" },
                  { key: "finedining", ar: "مطاعم فاخرة", en: "Fine dining" },
                  {
                    key: "external",
                    ar: "طلبات خارجية",
                    en: "External orders",
                  },
                  { key: "cafes", ar: "مقاهي", en: "Cafes" },
                  { key: "other", ar: "أخرى", en: "Other" },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() =>
                      handleCategoryToggle(option.key, "facilities")
                    }
                    className={`w-full px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                      filters.facilities.includes(option.key)
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {isRTL ? option.ar : option.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex gap-3">
            <button
              onClick={handleResetFilters}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {isRTL ? "إعادة تعيين" : "Reset"}
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-2 bg-[#fd671a] text-white rounded-lg font-medium hover:bg-[#e55a17] transition-colors"
            >
              {isRTL ? "بحث" : "Search"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

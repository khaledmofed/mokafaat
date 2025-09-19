import React, { useState } from "react";
import { useIsRTL } from "@hooks";
import { IoMdClose } from "react-icons/io";
import { FiStar } from "react-icons/fi";
import { UnderTitle } from "@assets";

interface BookingFilters extends Record<string, unknown> {
  // Flight filters
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: {
    adults: number;
    children: number;
    infants: number;
  };
  class?: string;
  priceRange?: [number, number];
  airlines?: string[];
  duration?: string;

  // Hotel filters
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: {
    adults: number;
    children: number;
  };
  rooms?: number;
  stars?: number;
  starRatings?: number[];
  amenities?: string[];

  // Car filters
  pickupCity?: string;
  pickupLocation?: string;
  pickupDateTime?: string;
  returnDateTime?: string;
  carType?: string;
  carTypes?: string[];
  transmission?: string;
  carPriceRange?: [number, number];
}

interface BookingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  type: "flights" | "hotels" | "cars";
  filters: BookingFilters;
  onFiltersChange: (filters: BookingFilters) => void;
  appliedFilters?: BookingFilters | null;
  onSearch?: (filters?: BookingFilters) => void;
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({
  isOpen,
  onClose,
  type,
  filters,
  onFiltersChange,
  appliedFilters,
  onSearch,
}) => {
  const isRTL = useIsRTL();

  const [localFilters, setLocalFilters] = useState<BookingFilters>(filters);

  // Update local filters when appliedFilters or filters change
  React.useEffect(() => {
    if (appliedFilters) {
      setLocalFilters(appliedFilters);
    } else {
      setLocalFilters(filters);
    }
  }, [appliedFilters, filters]);

  // Initialize localFilters with proper default values
  React.useEffect(() => {
    const defaultFilters: BookingFilters = {
      priceRange: [0, 5000],
      airlines: [],
      duration: undefined,
      starRatings: [],
      amenities: [],
      carTypes: [],
      transmission: undefined,
      carPriceRange: [0, 1000],
    };

    setLocalFilters((prev) => ({
      ...defaultFilters,
      ...prev,
    }));
  }, []);

  const handleFilterChange = (field: keyof BookingFilters, value: unknown) => {
    const newFilters = {
      ...localFilters,
      [field]: value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    if (onSearch) {
      onSearch(localFilters);
    }
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters: BookingFilters = {};
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const renderFlightFilters = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "نطاق السعر" : "Price Range"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="5000"
              value={localFilters.priceRange?.[0] || 0}
              onChange={(e) =>
                handleFilterChange("priceRange", [
                  parseInt(e.target.value),
                  localFilters.priceRange?.[1] || 5000,
                ])
              }
              className="flex-1"
            />
            <span className="text-sm text-gray-600">
              ${localFilters.priceRange?.[0] || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="5000"
              value={localFilters.priceRange?.[1] || 5000}
              onChange={(e) =>
                handleFilterChange("priceRange", [
                  localFilters.priceRange?.[0] || 0,
                  parseInt(e.target.value),
                ])
              }
              className="flex-1"
            />
            <span className="text-sm text-gray-600">
              ${localFilters.priceRange?.[1] || 5000}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Airlines */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "شركات الطيران" : "Airlines"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["الإمارات", "الخطوط السعودية", "الخطوط القطرية", "طيران ناس"].map(
            (airline) => (
              <button
                key={airline}
                onClick={() => {
                  const airlines = localFilters.airlines || [];
                  const newAirlines = airlines.includes(airline)
                    ? airlines.filter((a: string) => a !== airline)
                    : [...airlines, airline];
                  handleFilterChange("airlines", newAirlines);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  (localFilters.airlines || []).includes(airline)
                    ? "bg-purple-100 text-purple-700 border border-purple-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {airline}
              </button>
            )
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Flight Duration */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "مدة الرحلة" : "Flight Duration"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="space-y-2">
          {[
            {
              label: isRTL ? "أقل من 3 ساعات" : "Less than 3 hours",
              value: "short",
            },
            { label: isRTL ? "3-6 ساعات" : "3-6 hours", value: "medium" },
            {
              label: isRTL ? "أكثر من 6 ساعات" : "More than 6 hours",
              value: "long",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleFilterChange("duration", option.value)}
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                localFilters.duration === option.value
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHotelFilters = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "نطاق السعر" : "Price Range"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="2000"
              value={localFilters.priceRange?.[0] || 0}
              onChange={(e) =>
                handleFilterChange("priceRange", [
                  parseInt(e.target.value),
                  localFilters.priceRange?.[1] || 2000,
                ])
              }
              className="flex-1"
            />
            <span className="text-sm text-gray-600">
              ${localFilters.priceRange?.[0] || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="2000"
              value={localFilters.priceRange?.[1] || 2000}
              onChange={(e) =>
                handleFilterChange("priceRange", [
                  localFilters.priceRange?.[0] || 0,
                  parseInt(e.target.value),
                ])
              }
              className="flex-1"
            />
            <span className="text-sm text-gray-600">
              ${localFilters.priceRange?.[1] || 2000}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Star Rating */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "تصنيف النجوم" : "Star Rating"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              onClick={() => {
                const starRatings = localFilters.starRatings || [];
                const newStarRatings = starRatings.includes(stars)
                  ? starRatings.filter((s: number) => s !== stars)
                  : [...starRatings, stars];
                handleFilterChange("starRatings", newStarRatings);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                (localFilters.starRatings || []).includes(stars)
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: stars }).map((_, i) => (
                  <FiStar
                    key={i}
                    className="text-yellow-400 text-xs fill-current"
                  />
                ))}
              </div>
              <span>{stars}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Amenities */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "المرافق" : "Amenities"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[
            { ar: "واي فاي مجاني", en: "Free WiFi" },
            { ar: "مسبح", en: "Pool" },
            { ar: "سبا", en: "Spa" },
            { ar: "صالة رياضية", en: "Gym" },
            { ar: "موقف سيارات", en: "Parking" },
          ].map((amenity) => (
            <button
              key={amenity.en}
              onClick={() => {
                const amenities = localFilters.amenities || [];
                const newAmenities = amenities.includes(amenity.en)
                  ? amenities.filter((a: string) => a !== amenity.en)
                  : [...amenities, amenity.en];
                handleFilterChange("amenities", newAmenities);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                (localFilters.amenities || []).includes(amenity.en)
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isRTL ? amenity.ar : amenity.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCarFilters = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "نطاق السعر" : "Price Range"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={localFilters.carPriceRange?.[0] || 0}
              onChange={(e) =>
                handleFilterChange("carPriceRange", [
                  parseInt(e.target.value),
                  localFilters.carPriceRange?.[1] || 1000,
                ])
              }
              className="flex-1"
            />
            <span className="text-sm text-gray-600">
              ${localFilters.carPriceRange?.[0] || 0}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="1000"
              value={localFilters.carPriceRange?.[1] || 1000}
              onChange={(e) =>
                handleFilterChange("carPriceRange", [
                  localFilters.carPriceRange?.[0] || 0,
                  parseInt(e.target.value),
                ])
              }
              className="flex-1"
            />
            <span className="text-sm text-gray-600">
              ${localFilters.carPriceRange?.[1] || 1000}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Car Type */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "نوع السيارة" : "Car Type"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { ar: "صغيرة", en: "Small" },
            { ar: "سيدان", en: "Sedan" },
            { ar: "SUV", en: "SUV" },
            { ar: "فاخرة", en: "Luxury" },
            { ar: "فان", en: "Van" },
          ].map((carType) => (
            <button
              key={carType.en}
              onClick={() => {
                const carTypes = localFilters.carTypes || [];
                const newCarTypes = carTypes.includes(carType.en)
                  ? carTypes.filter((t: string) => t !== carType.en)
                  : [...carTypes, carType.en];
                handleFilterChange("carTypes", newCarTypes);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                (localFilters.carTypes || []).includes(carType.en)
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isRTL ? carType.ar : carType.en}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Transmission */}
      <div>
        <div className="text-start gap-2 mb-4">
          <span
            className="text-[#400198] text-md font-semibold uppercase tracking-wider"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {isRTL ? "ناقل الحركة" : "Transmission"}
          </span>
          <img
            src={UnderTitle}
            alt="underlineDecoration"
            className="h-1 mt-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { ar: "عادي", en: "Manual" },
            { ar: "أوتوماتيك", en: "Automatic" },
          ].map((transmission) => (
            <button
              key={transmission.en}
              onClick={() =>
                handleFilterChange("transmission", transmission.en)
              }
              className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                localFilters.transmission === transmission.en
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {isRTL ? transmission.ar : transmission.en}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
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
              {isRTL ? "تصفية الحجوزات" : "Filter Bookings"}
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
        <div className="flex-1 overflow-y-auto p-6">
          {type === "flights" && renderFlightFilters()}
          {type === "hotels" && renderHotelFilters()}
          {type === "cars" && renderCarFilters()}
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

export default BookingSidebar;

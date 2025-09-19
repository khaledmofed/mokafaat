import React, { useState } from "react";
import { useIsRTL } from "@hooks";
import { FiFilter, FiGrid, FiList, FiSettings } from "react-icons/fi";
import { MdOutlineFlight } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import Select from "react-select";
import BookingCard from "./BookingCard";
import BookingModal from "./BookingModal";
import { FaCar } from "react-icons/fa";

interface BookingItem {
  id: number;
  name: { ar: string; en: string };
  image: string;
  price: number;
  rating: number;
  reviews: number;
  description: { ar: string; en: string };
  // Flight specific
  duration?: string;
  airline?: string;
  departure?: string;
  arrival?: string;
  stops?: string;
  class?: string;
  // Hotel specific
  stars?: number;
  amenities?: string;
  location?: string;
  distance?: string;
  // Car specific
  type?: string;
  transmission?: string;
  seats?: number;
  fuel?: string;
  year?: number;
  features?: string[];
}

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

interface BookingResultsProps {
  results: BookingItem[];
  type: "flights" | "hotels" | "cars";
  appliedFilters?: BookingFilters | null;
  onToggleSidebar: () => void;
  onToggleFiltersSidebar: () => void;
  showSidebar: boolean;
  isFiltered?: boolean;
  onApplyFilters: (filters: BookingFilters) => void;
}

const BookingResults: React.FC<BookingResultsProps> = ({
  results,
  type,
  appliedFilters,
  onToggleSidebar,
  onToggleFiltersSidebar,
  isFiltered = false,
  onApplyFilters,
}) => {
  const isRTL = useIsRTL();
  console.log(
    "🏷️ BookingResults rendered with appliedFilters:",
    appliedFilters
  );
  const [sortBy, setSortBy] = useState("price");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSortChange = (sortType: string) => {
    setSortBy(sortType);
    // Here you would implement the actual sorting logic
  };

  const handleBookingClick = (booking: BookingItem) => {
    console.log("🎯 Booking clicked:", booking);
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const getTypeLabel = () => {
    switch (type) {
      case "flights":
        return isRTL ? "رحلات الطيران" : "Flights";
      case "hotels":
        return isRTL ? "الفنادق" : "Hotels";
      case "cars":
        return isRTL ? "السيارات" : "Cars";
      default:
        return "";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "flights":
        return <MdOutlineFlight className="text-[#400198]" size={24} />;
      case "hotels":
        return <RiHotelLine className="text-[#400198]" size={24} />;
      case "cars":
        return <FaCar className="text-[#400198]" size={24} />;
      default:
        return "";
    }
  };

  return (
    <div className="">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-0">
        {/* Results Count */}
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-0">
            {getTypeIcon()}
            <h2 className="text-[#400198] text-3xl font-bold">
              {results.length}
            </h2>
            {isRTL
              ? isFiltered
                ? ` نتيجة تم العثور عليها للبحث`
                : ` ${getTypeLabel()} متاحة`
              : isFiltered
              ? ` results found for search`
              : ` available ${getTypeLabel().toLowerCase()}`}
          </div>
        </div>

        {/* Filter and View Buttons */}
        <div className="flex items-center gap-3">
          {/* Filter Button */}
          <button
            onClick={onToggleSidebar}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
          >
            <FiFilter className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {isRTL ? "فلترة" : "Filter"}
            </span>
          </button>

          {/* Advanced Filters Button */}
          <button
            onClick={onToggleFiltersSidebar}
            className="flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
          >
            <FiSettings className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {isRTL
                ? type === "flights"
                  ? "ابحث عن رحلتك"
                  : type === "hotels"
                  ? "ابحث عن فندقك"
                  : type === "cars"
                  ? "ابحث عن سيارتك"
                  : "فلاتر متقدمة"
                : type === "flights"
                ? "Search Your Flight"
                : type === "hotels"
                ? "Search Your Hotel"
                : type === "cars"
                ? "Search Your Car"
                : "Advanced Filters"}
            </span>
          </button>

          {/* Sort Dropdown */}
          <Select
            value={{
              value: sortBy,
              label:
                sortBy === "price"
                  ? isRTL
                    ? "السعر (الأقل أولاً)"
                    : "Price (Low to High)"
                  : sortBy === "rating"
                  ? isRTL
                    ? "التقييم"
                    : "Rating"
                  : sortBy === "popularity"
                  ? isRTL
                    ? "الشعبية"
                    : "Popularity"
                  : isRTL
                  ? "الاسم"
                  : "Name",
            }}
            onChange={(selectedOption) =>
              handleSortChange(selectedOption?.value || "price")
            }
            options={[
              {
                value: "price",
                label: isRTL ? "السعر (الأقل أولاً)" : "Price (Low to High)",
              },
              { value: "rating", label: isRTL ? "التقييم" : "Rating" },
              { value: "popularity", label: isRTL ? "الشعبية" : "Popularity" },
              { value: "name", label: isRTL ? "الاسم" : "Name" },
            ]}
            className="min-w-[200px]"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "48px",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "9999px",
                borderColor: "#d1d5db",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "#d1d5db",
                },
                "&:focus": {
                  borderColor: "#400198",
                  boxShadow: "0 0 0 2px rgba(64, 1, 152, 0.2)",
                },
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 20px",
              }),
              input: (base) => ({
                ...base,
                margin: "0",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                padding: "0 12px",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "12px",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }),
              option: (base, state) => ({
                ...base,
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: state.isSelected
                  ? "#f3f4f6"
                  : state.isFocused
                  ? "#f9fafb"
                  : "white",
                color: state.isSelected ? "#400198" : "#374151",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
              }),
            }}
          />

          {/* View Mode Buttons */}
          <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-md p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-[#400198] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-[#400198] text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FiList size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Applied Filters Tags */}
      {appliedFilters && (
        <div className="mb-6 mt-2">
          <div className="flex flex-wrap gap-2">
            {/* From/To Tags */}
            {appliedFilters.from && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {isRTL ? "من" : "From"}: {appliedFilters.from}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.from;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {appliedFilters.to && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {isRTL ? "إلى" : "To"}: {appliedFilters.to}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.to;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Departure Date Tags */}
            {appliedFilters.departureDate && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {isRTL ? "تاريخ المغادرة" : "Departure Date"}:{" "}
                {appliedFilters.departureDate}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.departureDate;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Return Date Tags */}
            {appliedFilters.returnDate && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {isRTL ? "تاريخ العودة" : "Return Date"}:{" "}
                {appliedFilters.returnDate}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.returnDate;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Passengers Tags */}
            {appliedFilters.passengers && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                {isRTL ? "الركاب" : "Passengers"}:{" "}
                {appliedFilters.passengers.adults} {isRTL ? "بالغ" : "adults"}
                {appliedFilters.passengers.children > 0 &&
                  `, ${appliedFilters.passengers.children} ${
                    isRTL ? "طفل" : "children"
                  }`}
                {appliedFilters.passengers.infants > 0 &&
                  `, ${appliedFilters.passengers.infants} ${
                    isRTL ? "رضيع" : "infants"
                  }`}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.passengers;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Class Tags */}
            {appliedFilters.class && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {isRTL ? "الدرجة" : "Class"}: {appliedFilters.class}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.class;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Price Range Tags */}
            {appliedFilters.priceRange && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                ${appliedFilters.priceRange[0]} - $
                {appliedFilters.priceRange[1]}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.priceRange;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Airlines Tags */}
            {appliedFilters.airlines?.map((airline) => (
              <span
                key={airline}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
              >
                {airline}
                <button
                  onClick={() => {
                    const newFilters = {
                      ...appliedFilters,
                      airlines: appliedFilters.airlines?.filter(
                        (a) => a !== airline
                      ),
                    };
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            ))}

            {/* Duration Tags */}
            {appliedFilters.duration && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {appliedFilters.duration === "short"
                  ? isRTL
                    ? "أقل من 3 ساعات"
                    : "Less than 3 hours"
                  : appliedFilters.duration === "medium"
                  ? isRTL
                    ? "3-6 ساعات"
                    : "3-6 hours"
                  : appliedFilters.duration === "long"
                  ? isRTL
                    ? "أكثر من 6 ساعات"
                    : "More than 6 hours"
                  : appliedFilters.duration}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.duration;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Star Ratings Tags */}
            {appliedFilters.starRatings?.map((stars) => (
              <span
                key={stars}
                className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"
              >
                {stars} {isRTL ? "نجوم" : "stars"}
                <button
                  onClick={() => {
                    const newFilters = {
                      ...appliedFilters,
                      starRatings: appliedFilters.starRatings?.filter(
                        (s) => s !== stars
                      ),
                    };
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            ))}

            {/* Destination Tags */}
            {appliedFilters.destination && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {isRTL ? "الوجهة" : "Destination"}: {appliedFilters.destination}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.destination;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Check In Tags */}
            {appliedFilters.checkIn && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {isRTL ? "تاريخ الوصول" : "Check In"}: {appliedFilters.checkIn}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.checkIn;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Check Out Tags */}
            {appliedFilters.checkOut && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {isRTL ? "تاريخ المغادرة" : "Check Out"}:{" "}
                {appliedFilters.checkOut}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.checkOut;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Guests Tags */}
            {appliedFilters.guests && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                {isRTL ? "الضيوف" : "Guests"}: {appliedFilters.guests.adults}{" "}
                {isRTL ? "بالغ" : "adults"}
                {appliedFilters.guests.children > 0 &&
                  `, ${appliedFilters.guests.children} ${
                    isRTL ? "طفل" : "children"
                  }`}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.guests;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Rooms Tags */}
            {appliedFilters.rooms && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {isRTL ? "الغرف" : "Rooms"}: {appliedFilters.rooms}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.rooms;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Stars Tags */}
            {appliedFilters.stars && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                {appliedFilters.stars} {isRTL ? "نجوم" : "stars"}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.stars;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Amenities Tags */}
            {appliedFilters.amenities?.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
              >
                {amenity === "Free WiFi"
                  ? isRTL
                    ? "واي فاي مجاني"
                    : "Free WiFi"
                  : amenity === "Pool"
                  ? isRTL
                    ? "مسبح"
                    : "Pool"
                  : amenity === "Spa"
                  ? isRTL
                    ? "سبا"
                    : "Spa"
                  : amenity === "Gym"
                  ? isRTL
                    ? "صالة رياضية"
                    : "Gym"
                  : amenity === "Parking"
                  ? isRTL
                    ? "موقف سيارات"
                    : "Parking"
                  : amenity}
                <button
                  onClick={() => {
                    const newFilters = {
                      ...appliedFilters,
                      amenities: appliedFilters.amenities?.filter(
                        (a) => a !== amenity
                      ),
                    };
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            ))}

            {/* Pickup City Tags */}
            {appliedFilters.pickupCity && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {isRTL ? "مدينة الاستلام" : "Pickup City"}:{" "}
                {appliedFilters.pickupCity}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.pickupCity;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Pickup Location Tags */}
            {appliedFilters.pickupLocation && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                {isRTL ? "موقع الاستلام" : "Pickup Location"}:{" "}
                {appliedFilters.pickupLocation}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.pickupLocation;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Pickup DateTime Tags */}
            {appliedFilters.pickupDateTime && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {isRTL ? "تاريخ ووقت الاستلام" : "Pickup DateTime"}:{" "}
                {appliedFilters.pickupDateTime}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.pickupDateTime;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Return DateTime Tags */}
            {appliedFilters.returnDateTime && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {isRTL ? "تاريخ ووقت الإرجاع" : "Return DateTime"}:{" "}
                {appliedFilters.returnDateTime}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.returnDateTime;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Car Type Tags */}
            {appliedFilters.carType && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                {isRTL ? "نوع السيارة" : "Car Type"}: {appliedFilters.carType}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.carType;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Car Types Tags */}
            {appliedFilters.carTypes?.map((carType) => (
              <span
                key={carType}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {carType === "Small"
                  ? isRTL
                    ? "صغيرة"
                    : "Small"
                  : carType === "Sedan"
                  ? isRTL
                    ? "سيدان"
                    : "Sedan"
                  : carType === "SUV"
                  ? "SUV"
                  : carType === "Luxury"
                  ? isRTL
                    ? "فاخرة"
                    : "Luxury"
                  : carType === "Van"
                  ? isRTL
                    ? "فان"
                    : "Van"
                  : carType}
                <button
                  onClick={() => {
                    const newFilters = {
                      ...appliedFilters,
                      carTypes: appliedFilters.carTypes?.filter(
                        (t) => t !== carType
                      ),
                    };
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            ))}

            {/* Transmission Tags */}
            {appliedFilters.transmission && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                {appliedFilters.transmission === "Manual"
                  ? isRTL
                    ? "عادي"
                    : "Manual"
                  : appliedFilters.transmission === "Automatic"
                  ? isRTL
                    ? "أوتوماتيك"
                    : "Automatic"
                  : appliedFilters.transmission}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.transmission;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-indigo-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Car Price Range Tags */}
            {appliedFilters.carPriceRange && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                ${appliedFilters.carPriceRange[0]} - $
                {appliedFilters.carPriceRange[1]}
                <button
                  onClick={() => {
                    const newFilters = { ...appliedFilters };
                    delete newFilters.carPriceRange;
                    onApplyFilters(newFilters);
                  }}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  ×
                </button>
              </span>
            )}

            {/* Clear All Button */}
            {(appliedFilters.from ||
              appliedFilters.to ||
              appliedFilters.departureDate ||
              appliedFilters.returnDate ||
              appliedFilters.passengers ||
              appliedFilters.class ||
              appliedFilters.priceRange ||
              appliedFilters.airlines?.length ||
              appliedFilters.duration ||
              appliedFilters.destination ||
              appliedFilters.checkIn ||
              appliedFilters.checkOut ||
              appliedFilters.guests ||
              appliedFilters.rooms ||
              appliedFilters.stars ||
              appliedFilters.starRatings?.length ||
              appliedFilters.amenities?.length ||
              appliedFilters.pickupCity ||
              appliedFilters.pickupLocation ||
              appliedFilters.pickupDateTime ||
              appliedFilters.returnDateTime ||
              appliedFilters.carType ||
              appliedFilters.carTypes?.length ||
              appliedFilters.transmission ||
              appliedFilters.carPriceRange) && (
              <button
                onClick={() => {
                  onApplyFilters({});
                }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
              >
                {isRTL ? "مسح الكل" : "Clear All"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Results Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "mt-6 grid grid-cols-2 gap-4"
        }
      >
        {results.map((result) => (
          <BookingCard
            key={result.id}
            data={result}
            type={type}
            viewMode={viewMode}
            onClick={() => handleBookingClick(result)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {results.length > 0 && (
        <div className="flex justify-center pt-6">
          <button className="bg-[#fd671a] hover:bg-[#e55a17] text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg">
            {isRTL ? "عرض المزيد" : "Load More"}
          </button>
        </div>
      )}

      {/* Booking Modal */}
      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          type={type}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
          Modal: {isModalOpen ? "Open" : "Closed"} | Booking:{" "}
          {selectedBooking?.id || "None"}
        </div>
      )}
    </div>
  );
};

export default BookingResults;

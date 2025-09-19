import React from "react";
import { useIsRTL } from "@hooks";
import { IoMdClose } from "react-icons/io";
import FlightFilters from "./FlightFilters";
import HotelFilters from "./HotelFilters";
import CarFilters from "./CarFilters";

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

interface BookingFiltersSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  type: "flights" | "hotels" | "cars";
  filters: BookingFilters;
  onFiltersChange: (filters: BookingFilters) => void;
  onSearch: (filters?: BookingFilters) => void;
  isSearching: boolean;
}

const BookingFiltersSidebar: React.FC<BookingFiltersSidebarProps> = ({
  isOpen,
  onClose,
  type,
  filters,
  onFiltersChange,
  onSearch,
  isSearching,
}) => {
  const isRTL = useIsRTL();

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
              {isRTL ? "فلاتر الحجوزات" : "Booking Filters"}
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
          {type === "flights" && (
            <FlightFilters
              filters={filters}
              onFiltersChange={onFiltersChange}
              onSearch={onSearch}
              isSearching={isSearching}
            />
          )}
          {type === "hotels" && (
            <HotelFilters
              filters={filters}
              onFiltersChange={onFiltersChange}
              onSearch={onSearch}
              isSearching={isSearching}
            />
          )}
          {type === "cars" && (
            <CarFilters
              filters={filters}
              onFiltersChange={onFiltersChange}
              onSearch={onSearch}
              isSearching={isSearching}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BookingFiltersSidebar;

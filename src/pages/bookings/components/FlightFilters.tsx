import React from "react";
import { useIsRTL } from "@hooks";
import { FiSearch, FiCalendar, FiUsers, FiNavigation } from "react-icons/fi";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface FlightFiltersProps {
  filters: Record<string, unknown>;
  onFiltersChange: (filters: Record<string, unknown>) => void;
  onSearch: (filters?: Record<string, unknown>) => void;
  isSearching: boolean;
}

const FlightFilters: React.FC<FlightFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  isSearching,
}) => {
  const isRTL = useIsRTL();

  const handleInputChange = (field: string, value: unknown) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handlePassengerChange = (type: string, value: number) => {
    const passengers = (filters.passengers as {
      adults: number;
      children: number;
      infants: number;
    }) || {
      adults: 1,
      children: 0,
      infants: 0,
    };
    onFiltersChange({
      ...filters,
      passengers: {
        ...passengers,
        [type]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Flight Search Form */}
      <div className="space-y-4">
        {/* From */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "من" : "From"}
          </label>
          <div className="relative">
            <FiNavigation className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={isRTL ? "المدينة أو المطار" : "City or Airport"}
              value={(filters.from as string) || ""}
              onChange={(e) => handleInputChange("from", e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "إلى" : "To"}
          </label>
          <div className="relative">
            <FiNavigation className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={isRTL ? "المدينة أو المطار" : "City or Airport"}
              value={(filters.to as string) || ""}
              onChange={(e) => handleInputChange("to", e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "تاريخ المغادرة" : "Departure Date"}
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10" />
            <DatePicker
              value={
                filters.departureDate
                  ? dayjs(filters.departureDate as string)
                  : null
              }
              onChange={(date) =>
                handleInputChange(
                  "departureDate",
                  date ? date.format("YYYY-MM-DD") : ""
                )
              }
              placeholder={isRTL ? "اختر التاريخ" : "Select Date"}
              className="w-full pl-8"
              size="small"
              format="YYYY-MM-DD"
              getPopupContainer={(trigger) => {
                // Find the sidebar container or use body
                const sidebar =
                  trigger.closest(".fixed") ||
                  trigger.closest("[data-sidebar]") ||
                  document.body;
                return sidebar as HTMLElement;
              }}
              style={{
                height: "36px",
                fontSize: "14px",
                borderColor: "#d1d5db",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "تاريخ العودة" : "Return Date"}
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10" />
            <DatePicker
              value={
                filters.returnDate ? dayjs(filters.returnDate as string) : null
              }
              onChange={(date) =>
                handleInputChange(
                  "returnDate",
                  date ? date.format("YYYY-MM-DD") : ""
                )
              }
              placeholder={isRTL ? "اختر التاريخ" : "Select Date"}
              className="w-full pl-8"
              size="small"
              format="YYYY-MM-DD"
              getPopupContainer={(trigger) => {
                // Find the sidebar container or use body
                const sidebar =
                  trigger.closest(".fixed") ||
                  trigger.closest("[data-sidebar]") ||
                  document.body;
                return sidebar as HTMLElement;
              }}
              style={{
                height: "36px",
                fontSize: "14px",
                borderColor: "#d1d5db",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        {/* Passengers */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "عدد المسافرين" : "Passengers"}
          </label>
          <div className="flex items-center gap-2">
            <FiUsers className="text-gray-400 text-sm" />
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handlePassengerChange(
                    "adults",
                    Math.max(
                      1,
                      ((
                        filters.passengers as {
                          adults: number;
                          children: number;
                          infants: number;
                        }
                      )?.adults || 1) - 1
                    )
                  )
                }
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
              >
                -
              </button>
              <span className="px-2 py-1 bg-gray-50 rounded text-xs">
                {(
                  filters.passengers as {
                    adults: number;
                    children: number;
                    infants: number;
                  }
                )?.adults || 1}{" "}
                {isRTL ? "بالغ" : "Adult"}
              </span>
              <button
                onClick={() =>
                  handlePassengerChange(
                    "adults",
                    ((
                      filters.passengers as {
                        adults: number;
                        children: number;
                        infants: number;
                      }
                    )?.adults || 1) + 1
                  )
                }
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "الأطفال" : "Children"}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handlePassengerChange(
                  "children",
                  Math.max(
                    0,
                    ((
                      filters.passengers as {
                        adults: number;
                        children: number;
                        infants: number;
                      }
                    )?.children || 0) - 1
                  )
                )
              }
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
            >
              -
            </button>
            <span className="px-2 py-1 bg-gray-50 rounded text-xs">
              {(
                filters.passengers as {
                  adults: number;
                  children: number;
                  infants: number;
                }
              )?.children || 0}{" "}
              {isRTL ? "طفل" : "Child"}
            </span>
            <button
              onClick={() =>
                handlePassengerChange(
                  "children",
                  ((
                    filters.passengers as {
                      adults: number;
                      children: number;
                      infants: number;
                    }
                  )?.children || 0) + 1
                )
              }
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
            >
              +
            </button>
          </div>
        </div>

        {/* Class */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "درجة السفر" : "Class"}
          </label>
          <Select
            value={{
              value: (filters.class as string) || "economy",
              label: isRTL
                ? filters.class === "business"
                  ? "درجة رجال الأعمال"
                  : filters.class === "first"
                  ? "أولى"
                  : "اقتصادي"
                : filters.class === "business"
                ? "Business"
                : filters.class === "first"
                ? "First"
                : "Economy",
            }}
            onChange={(selectedOption) =>
              handleInputChange("class", selectedOption?.value)
            }
            options={[
              { value: "economy", label: isRTL ? "اقتصادي" : "Economy" },
              {
                value: "business",
                label: isRTL ? "درجة رجال الأعمال" : "Business",
              },
              { value: "first", label: isRTL ? "أولى" : "First" },
            ]}
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "36px",
                fontSize: "14px",
                borderColor: "#d1d5db",
                "&:hover": {
                  borderColor: "#d1d5db",
                },
                "&:focus": {
                  borderColor: "#8b5cf6",
                  boxShadow: "0 0 0 2px rgba(139, 92, 246, 0.2)",
                },
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "0 8px",
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
                padding: "4px",
              }),
            }}
          />
        </div>
      </div>

      {/* Search Button */}
      <div className="pt-2">
        <button
          onClick={() => {
            // Pass filters directly to search function
            onFiltersChange(filters);
            onSearch(filters);
          }}
          disabled={isSearching}
          className="w-full bg-[#fd671a] hover:bg-[#e55a17] disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors text-sm"
        >
          <FiSearch className="text-sm" />
          {isSearching
            ? isRTL
              ? "جاري البحث..."
              : "Searching..."
            : isRTL
            ? "ابحث الآن"
            : "Search Now"}
        </button>
      </div>
    </div>
  );
};

export default FlightFilters;

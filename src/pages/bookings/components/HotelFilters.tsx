import React from "react";
import { useIsRTL } from "@hooks";
// import { useTranslation } from "react-i18next";
import {
  FiSearch,
  FiCalendar,
  FiUsers,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface HotelFiltersProps {
  filters: Record<string, unknown>;
  onFiltersChange: (filters: Record<string, unknown>) => void;
  onSearch: (filters?: Record<string, unknown>) => void;
  isSearching: boolean;
}

const HotelFilters: React.FC<HotelFiltersProps> = ({
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

  const handleGuestChange = (type: string, value: number) => {
    const guests = filters.guests || { adults: 2, children: 0 };
    onFiltersChange({
      ...filters,
      guests: {
        ...guests,
        [type]: value,
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Hotel Search Form */}
      <div className="space-y-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "الوجهة" : "Destination"}
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={isRTL ? "المدينة أو المنطقة" : "City or Area"}
              value={(filters.destination as string) || ""}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "تاريخ تسجيل الوصول" : "Check-in Date"}
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10" />
            <DatePicker
              value={filters.checkIn ? dayjs(filters.checkIn as string) : null}
              onChange={(date) =>
                handleInputChange(
                  "checkIn",
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

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "تاريخ تسجيل المغادرة" : "Check-out Date"}
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10" />
            <DatePicker
              value={
                filters.checkOut ? dayjs(filters.checkOut as string) : null
              }
              onChange={(date) =>
                handleInputChange(
                  "checkOut",
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

        {/* Rooms */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "عدد الغرف" : "Rooms"}
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                handleInputChange(
                  "rooms",
                  Math.max(1, ((filters.rooms as number) || 1) - 1)
                )
              }
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
            >
              -
            </button>
            <span className="px-2 py-1 bg-gray-50 rounded text-xs">
              {(filters.rooms as number) || 1} {isRTL ? "غرفة" : "Room"}
            </span>
            <button
              onClick={() =>
                handleInputChange("rooms", ((filters.rooms as number) || 1) + 1)
              }
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        {/* Adults */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "البالغين" : "Adults"}
          </label>
          <div className="flex items-center gap-2">
            <FiUsers className="text-gray-400 text-sm" />
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleGuestChange(
                    "adults",
                    Math.max(1, ((filters.guests as any)?.adults || 2) - 1)
                  )
                }
                className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
              >
                -
              </button>
              <span className="px-2 py-1 bg-gray-50 rounded text-xs">
                {(filters.guests as any)?.adults || 2}{" "}
                {isRTL ? "بالغ" : "Adult"}
              </span>
              <button
                onClick={() =>
                  handleGuestChange(
                    "adults",
                    ((filters.guests as any)?.adults || 2) + 1
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
                handleGuestChange(
                  "children",
                  Math.max(0, ((filters.guests as any)?.children || 0) - 1)
                )
              }
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
            >
              -
            </button>
            <span className="px-2 py-1 bg-gray-50 rounded text-xs">
              {(filters.guests as any)?.children || 0} {isRTL ? "طفل" : "Child"}
            </span>
            <button
              onClick={() =>
                handleGuestChange(
                  "children",
                  ((filters.guests as any)?.children || 0) + 1
                )
              }
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-xs"
            >
              +
            </button>
          </div>
        </div>

        {/* Star Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "تصنيف النجوم" : "Star Rating"}
          </label>
          <div className="flex items-center gap-2">
            <FiStar className="text-gray-400 text-sm" />
            <Select
              value={{
                value: (filters.stars as string) || "",
                label: (filters.stars as string)
                  ? `${filters.stars} ${
                      isRTL
                        ? filters.stars === "1"
                          ? "نجمة"
                          : "نجوم"
                        : filters.stars === "1"
                        ? "Star"
                        : "Stars"
                    }`
                  : isRTL
                  ? "جميع التصنيفات"
                  : "All Ratings",
              }}
              onChange={(selectedOption) =>
                handleInputChange("stars", selectedOption?.value)
              }
              options={[
                { value: "", label: isRTL ? "جميع التصنيفات" : "All Ratings" },
                { value: "5", label: `5 ${isRTL ? "نجوم" : "Stars"}` },
                { value: "4", label: `4 ${isRTL ? "نجوم" : "Stars"}` },
                { value: "3", label: `3 ${isRTL ? "نجوم" : "Stars"}` },
                { value: "2", label: `2 ${isRTL ? "نجوم" : "Stars"}` },
                { value: "1", label: `1 ${isRTL ? "نجمة" : "Star"}` },
              ]}
              className="flex-1 text-sm"
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

export default HotelFilters;

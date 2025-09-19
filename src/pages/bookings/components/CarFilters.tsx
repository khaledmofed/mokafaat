import React from "react";
import { useIsRTL } from "@hooks";
import { FiSearch, FiCalendar, FiMapPin, FiTruck } from "react-icons/fi";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";

interface CarFiltersProps {
  filters: Record<string, unknown>;
  onFiltersChange: (filters: Record<string, unknown>) => void;
  onSearch: (filters?: Record<string, unknown>) => void;
  isSearching: boolean;
}

const CarFilters: React.FC<CarFiltersProps> = ({
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

  return (
    <div className="space-y-4">
      {/* Car Search Form */}
      <div className="space-y-4">
        {/* Pickup City */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "مدينة الاستلام" : "Pickup City"}
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={isRTL ? "المدينة" : "City"}
              value={(filters.pickupCity as string) || ""}
              onChange={(e) => handleInputChange("pickupCity", e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Pickup Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "موقع الاستلام" : "Pickup Location"}
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              placeholder={
                isRTL
                  ? "المطار، الفرع، أو العنوان"
                  : "Airport, Branch, or Address"
              }
              value={(filters.pickupLocation as string) || ""}
              onChange={(e) =>
                handleInputChange("pickupLocation", e.target.value)
              }
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Pickup Date & Time */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "تاريخ ووقت الاستلام" : "Pickup Date & Time"}
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10" />
            <DatePicker
              value={
                filters.pickupDateTime
                  ? dayjs(filters.pickupDateTime as string)
                  : null
              }
              onChange={(date) =>
                handleInputChange(
                  "pickupDateTime",
                  date ? date.format("YYYY-MM-DD HH:mm") : ""
                )
              }
              placeholder={isRTL ? "اختر التاريخ والوقت" : "Select Date & Time"}
              className="w-full pl-8"
              size="small"
              format="YYYY-MM-DD HH:mm"
              showTime
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

        {/* Return Date & Time */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "تاريخ ووقت الإرجاع" : "Return Date & Time"}
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10" />
            <DatePicker
              value={
                filters.returnDateTime
                  ? dayjs(filters.returnDateTime as string)
                  : null
              }
              onChange={(date) =>
                handleInputChange(
                  "returnDateTime",
                  date ? date.format("YYYY-MM-DD HH:mm") : ""
                )
              }
              placeholder={isRTL ? "اختر التاريخ والوقت" : "Select Date & Time"}
              className="w-full pl-8"
              size="small"
              format="YYYY-MM-DD HH:mm"
              showTime
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
        {/* Car Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "نوع السيارة" : "Car Type"}
          </label>
          <div className="relative">
            <FiTruck className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm z-10" />
            <Select
              value={{
                value: (filters.carType as string) || "",
                label: (filters.carType as string)
                  ? filters.carType === "small"
                    ? isRTL
                      ? "صغيرة"
                      : "Small"
                    : filters.carType === "sedan"
                    ? isRTL
                      ? "سيدان"
                      : "Sedan"
                    : filters.carType === "suv"
                    ? "SUV"
                    : filters.carType === "luxury"
                    ? isRTL
                      ? "فاخرة"
                      : "Luxury"
                    : filters.carType === "van"
                    ? isRTL
                      ? "فان"
                      : "Van"
                    : filters.carType === "convertible"
                    ? isRTL
                      ? "كابريوليه"
                      : "Convertible"
                    : ""
                  : isRTL
                  ? "جميع الأنواع"
                  : "All Types",
              }}
              onChange={(selectedOption) =>
                handleInputChange("carType", selectedOption?.value)
              }
              options={[
                { value: "", label: isRTL ? "جميع الأنواع" : "All Types" },
                { value: "small", label: isRTL ? "صغيرة" : "Small" },
                { value: "sedan", label: isRTL ? "سيدان" : "Sedan" },
                { value: "suv", label: "SUV" },
                { value: "luxury", label: isRTL ? "فاخرة" : "Luxury" },
                { value: "van", label: isRTL ? "فان" : "Van" },
                {
                  value: "convertible",
                  label: isRTL ? "كابريوليه" : "Convertible",
                },
              ]}
              className="text-sm"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: "36px",
                  fontSize: "14px",
                  borderColor: "#d1d5db",
                  paddingLeft: "32px",
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

        {/* Transmission */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {isRTL ? "ناقل الحركة" : "Transmission"}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { ar: "عادي", en: "manual" },
              { ar: "أوتوماتيك", en: "automatic" },
            ].map((transmission) => (
              <button
                key={transmission.en}
                onClick={() =>
                  handleInputChange("transmission", transmission.en)
                }
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.transmission === transmission.en
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

export default CarFilters;

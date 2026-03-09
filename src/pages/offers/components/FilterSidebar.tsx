import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { UnderTitle } from "@assets";
import { useFilters } from "@hooks/api/useMokafaatQueries";

export interface FilterState {
  sortBy: string;
  subcategoryIds: number[];
  offerTypeIds: number[];
  brandIds: number[];
  priceRange: { min?: number; max?: number };
}

interface FilterSidebarProps {
  categoryId: string | number | null | undefined;
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterState) => void;
  appliedFilters?: FilterState | null;
}

const defaultFilters: FilterState = {
  sortBy: "nearest",
  subcategoryIds: [],
  offerTypeIds: [],
  brandIds: [],
  priceRange: {},
};

function normalizeFiltersData(response: unknown): {
  sortOptions: Array<{ key: string; name: string }>;
  subcategories: Array<{ id: number; name: string; image: string | null }>;
  offerTypes: Array<{ id: number; name: string; icon: string | null }>;
  brands: Array<{ id: number; name: string; logo: string }>;
  priceRange: { min: number; max: number };
} {
  const res = response as Record<string, unknown>;
  const data = res?.data as Record<string, unknown> | undefined;
  const inner = data?.data as Record<string, unknown> | undefined;
  if (!inner) {
    return {
      sortOptions: [],
      subcategories: [],
      offerTypes: [],
      brands: [],
      priceRange: { min: 0, max: 9999 },
    };
  }
  const sortOptions = (inner.sort_options as Array<{ key: string; name: string }>) ?? [];
  const subcategories = (inner.subcategories as Array<{ id: number; name: string; image: string | null }>) ?? [];
  const offerTypes = (inner.offer_types as Array<{ id: number; name: string; icon: string | null }>) ?? [];
  const brands = (inner.brands as Array<{ id: number; name: string; logo: string }>) ?? [];
  const pr = (inner.price_range as { min?: number; max?: number }) ?? {};
  const priceRange = { min: pr.min ?? 0, max: pr.max ?? 9999 };
  return { sortOptions, subcategories, offerTypes, brands, priceRange };
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categoryId,
  isOpen,
  onClose,
  onApplyFilters,
  appliedFilters,
}) => {
  const isRTL = useIsRTL();
  const { data: filtersResponse, isLoading } = useFilters(categoryId);

  const { sortOptions, subcategories, offerTypes, brands, priceRange: apiPriceRange } = normalizeFiltersData(
    filtersResponse ?? {}
  );

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const minNum = apiPriceRange.min ?? 0;
  const maxNum = apiPriceRange.max ?? 9999;
  const [priceMinVal, setPriceMinVal] = useState<number>(minNum);
  const [priceMaxVal, setPriceMaxVal] = useState<number>(maxNum);

  useEffect(() => {
    if (appliedFilters) {
      setFilters(appliedFilters);
      setPriceMinVal(appliedFilters.priceRange?.min ?? minNum);
      setPriceMaxVal(appliedFilters.priceRange?.max ?? maxNum);
    } else {
      setFilters(defaultFilters);
      setPriceMinVal(minNum);
      setPriceMaxVal(maxNum);
    }
  }, [appliedFilters, minNum, maxNum]);

  const handleSortChange = (sortKey: string) => {
    setFilters((prev) => ({ ...prev, sortBy: sortKey }));
  };

  const handleToggleIds = (id: number, type: "subcategoryIds" | "offerTypeIds" | "brandIds") => {
    setFilters((prev) => {
      const arr = prev[type];
      const next = arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
      return { ...prev, [type]: next };
    });
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      ...filters,
      priceRange: {
        min: priceMinVal !== minNum ? priceMinVal : undefined,
        max: priceMaxVal !== maxNum ? priceMaxVal : undefined,
      },
    });
    onClose();
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setPriceMinVal(minNum);
    setPriceMaxVal(maxNum);
  };

  const handlePriceMinChange = (v: number) => {
    const val = Math.min(v, priceMaxVal);
    setPriceMinVal(val);
  };
  const handlePriceMaxChange = (v: number) => {
    const val = Math.max(v, priceMinVal);
    setPriceMaxVal(val);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

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
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            {isRTL ? "تصفية العروض" : "Filter Offers"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-gray-100 rounded-full p-2"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-16 h-[calc(100vh-160px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-2 border-[#400198] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Sort By - من API sort_options */}
              {sortOptions.length > 0 && (
                <>
                  <div>
                    <div className="text-start gap-2 mb-4">
                      <span
                        className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                        style={{
                          fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
                        }}
                      >
                        {isRTL ? "ترتيب حسب" : "Sort By"}
                      </span>
                      <img src={UnderTitle} alt="" className="h-1 mt-2" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.key}
                          onClick={() => handleSortChange(opt.key)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filters.sortBy === opt.key
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {opt.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200" />
                </>
              )}

              {/* Subcategories - من API subcategories */}
              {subcategories.length > 0 && (
                <>
                  <div>
                    <div className="text-start gap-2 mb-4">
                      <span
                        className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                        style={{
                          fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
                        }}
                      >
                        {isRTL ? "فئات فرعية" : "Subcategories"}
                      </span>
                      <img src={UnderTitle} alt="" className="h-1 mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleToggleIds(sub.id, "subcategoryIds")}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors text-start ${
                            filters.subcategoryIds.includes(sub.id)
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200" />
                </>
              )}

              {/* Offer Types - من API offer_types */}
              {offerTypes.length > 0 && (
                <>
                  <div>
                    <div className="text-start gap-2 mb-4">
                      <span
                        className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                        style={{
                          fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
                        }}
                      >
                        {isRTL ? "نوع العرض" : "Offer Type"}
                      </span>
                      <img src={UnderTitle} alt="" className="h-1 mt-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {offerTypes.map((ot) => (
                        <button
                          key={ot.id}
                          onClick={() => handleToggleIds(ot.id, "offerTypeIds")}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors text-center ${
                            filters.offerTypeIds.includes(ot.id)
                              ? "bg-purple-100 text-purple-700 border border-purple-200"
                              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {ot.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200" />
                </>
              )}

              {/* Brands - من API brands */}
              {brands.length > 0 && (
                <>
                  <div>
                    <div className="text-start gap-2 mb-4">
                      <span
                        className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                        style={{
                          fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
                        }}
                      >
                        {isRTL ? "العلامات التجارية" : "Brands"}
                      </span>
                      <img src={UnderTitle} alt="" className="h-1 mt-2" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {brands.map((brand) => (
                        <button
                          key={brand.id}
                          onClick={() => handleToggleIds(brand.id, "brandIds")}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
                            filters.brandIds.includes(brand.id)
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {brand.logo && (
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          )}
                          <span>{brand.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200" />
                </>
              )}

              {/* Price Range - سلايدر نطاق من API price_range */}
              {(apiPriceRange.min != null || apiPriceRange.max != null) && (
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
                    <img src={UnderTitle} alt="" className="h-1 mt-2" />
                  </div>
                  <div className="px-1">
                    <div className="relative pt-2 pb-4">
                      {/* Track background */}
                      <div className="h-2 rounded-full bg-gray-200 relative">
                        {/* Active track between thumbs */}
                        <div
                          className="absolute h-full rounded-full bg-[#400198]"
                          style={{
                            left: `${((priceMinVal - minNum) / (maxNum - minNum)) * 100}%`,
                            right: `${100 - ((priceMaxVal - minNum) / (maxNum - minNum)) * 100}%`,
                          }}
                        />
                      </div>
                      <input
                        type="range"
                        min={minNum}
                        max={maxNum}
                        step={Math.max(1, Math.floor((maxNum - minNum) / 100))}
                        value={priceMinVal}
                        onChange={(e) => handlePriceMinChange(Number(e.target.value))}
                        className="absolute w-full h-2 top-2 left-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#400198] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#400198] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:cursor-pointer z-[1]"
                      />
                      <input
                        type="range"
                        min={minNum}
                        max={maxNum}
                        step={Math.max(1, Math.floor((maxNum - minNum) / 100))}
                        value={priceMaxVal}
                        onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
                        className="absolute w-full h-2 top-2 left-0 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#400198] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#400198] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow [&::-moz-range-thumb]:cursor-pointer z-[2]"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>{priceMinVal} ر.س</span>
                      <span>{priceMaxVal} ر.س</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

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
              {isRTL ? "تطبيق" : "Apply"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;

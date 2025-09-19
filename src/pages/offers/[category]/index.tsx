import { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import {
  FiArrowLeft,
  FiStar,
  FiEye,
  FiDownload,
  FiFilter,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { getRestaurantsByCategory, offerCategories } from "@data/offers";
import { Pro1, Pro2, Pro3, Pro4, Pro5, Pro6, Pro7, Pro8 } from "@assets";
import { AboutPattern } from "@assets";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { BsHeart, BsShare } from "react-icons/bs";
import FilterSidebar from "../components/FilterSidebar";
import RestaurantListView from "../components/RestaurantListView";

const CategoryOffersPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
    sortBy: string;
    restaurants: string[];
    subcategories: string[];
    offerTypes: string[];
    facilities: string[];
  } | null>(null);
  const perPage = 9;

  // Get category info
  const categoryInfo = offerCategories.find((cat) => cat.key === category);

  // Function to get restaurant image
  const getRestaurantImage = (logoName: string) => {
    switch (logoName) {
      case "Pro1":
        return Pro1;
      case "Pro2":
        return Pro2;
      case "Pro3":
        return Pro3;
      case "Pro4":
        return Pro4;
      case "Pro5":
        return Pro5;
      case "Pro6":
        return Pro6;
      case "Pro7":
        return Pro7;
      case "Pro8":
        return Pro8;
      default:
        return Pro1;
    }
  };

  // Get restaurants based on category
  const filteredRestaurants = useMemo(() => {
    if (!category) return [];

    let restaurants = getRestaurantsByCategory(category);

    // Apply search filter
    if (search) {
      restaurants = restaurants.filter(
        (restaurant) =>
          restaurant.name[isRTL ? "ar" : "en"]
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          restaurant.description[isRTL ? "ar" : "en"]
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    // Apply additional filters if any
    if (appliedFilters) {
      // Sort by
      if (appliedFilters.sortBy === "rating") {
        restaurants = restaurants.sort((a, b) => b.rating - a.rating);
      } else if (appliedFilters.sortBy === "newest") {
        restaurants = restaurants.sort((a, b) => b.views - a.views);
      }
      // Add more filter logic here as needed
    }

    return restaurants;
  }, [category, search, isRTL, appliedFilters]);

  const handleApplyFilters = (filters: {
    sortBy: string;
    restaurants: string[];
    subcategories: string[];
    offerTypes: string[];
    facilities: string[];
  }) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isRTL ? "الفئة غير موجودة" : "Category not found"}
          </h2>
          <button
            onClick={() => navigate("/offers")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isRTL ? "العودة للعروض" : "Back to Offers"}
          </button>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(filteredRestaurants.length / perPage) || 1;
  const startIdx = (currentPage - 1) * perPage;
  const paginated = filteredRestaurants.slice(startIdx, startIdx + perPage);

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? categoryInfo.ar : categoryInfo.en} -{" "}
          {isRTL ? "العروض" : "Offers"}
        </title>
        <link
          rel="canonical"
          href={`https://mukafaat.com/offers/${category}`}
        />
      </Helmet>

      {/* Header */}
      <section className="relative w-full bg-[#1D0843] overflow-hidden min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 bg-primary opacity-30" />
        <div className="relative pt-24 pb-10 px-6 mx-auto max-w-screen-xl text-center lg:pt-24 lg:pb-10 lg:px-12 flex flex-col justify-center z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate("/offers")}
            className="absolute top-4 left-4 text-white hover:text-purple-300 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft className="text-xl" />
            <span className="text-sm">{isRTL ? "العودة" : "Back"}</span>
          </button>

          {/* Category Icon and Title */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `#f8f1ff` }}
            >
              <img
                src={categoryInfo.icon}
                alt={isRTL ? categoryInfo.ar : categoryInfo.en}
                className="w-6 h-6 object-contain"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {isRTL ? categoryInfo.ar : categoryInfo.en}
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/80 text-lg mb-4">
            {isRTL
              ? `اكتشف أفضل العروض في فئة ${categoryInfo.ar}`
              : `Discover the best offers in ${categoryInfo.en} category`}
          </p>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-sm md:text-base">
            <Link
              to="/"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <Link
              to="/offers"
              className="text-white hover:text-purple-300 transition-colors cursor-pointer text-xs"
            >
              {isRTL ? "العروض" : "Offers"}
            </Link>
            <span className="text-white text-xs mx-2">|</span>
            <span className="text-[#fd671a] font-medium text-xs">
              {isRTL ? categoryInfo.ar : categoryInfo.en}
            </span>
          </div>
        </div>

        {/* Pattern Background */}
        <div className="absolute -bottom-10 transform z-9">
          <img
            src={AboutPattern}
            alt="Pattern"
            className="w-full h-96 animate-float"
          />
        </div>
      </section>

      <section className="container mx-auto md:py-10 py-6 px-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          {/* Results Count */}
          <div className="text-sm text-gray-600">
            <div className="flex items-center gap-2 mb-0">
              <h2 className="text-[#400198] text-3xl font-bold">
                {filteredRestaurants.length}
              </h2>

              {isRTL
                ? ` نتيجة تم العثور عليها لنتيجة البحث`
                : ` results found for search`}
            </div>

            {/* Applied Filters Tags */}
            {appliedFilters && (
              <div className="flex flex-wrap gap-2">
                {/* Sort By Tag */}
                {appliedFilters.sortBy !== "closest" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {appliedFilters.sortBy === "rating"
                      ? isRTL
                        ? "أعلى تقييم"
                        : "Highest rating"
                      : appliedFilters.sortBy === "newest"
                      ? isRTL
                        ? "عروض جديدة"
                        : "New offers"
                      : appliedFilters.sortBy}
                    <button
                      onClick={() => {
                        const newFilters = {
                          ...appliedFilters,
                          sortBy: "closest",
                        };
                        setAppliedFilters(newFilters);
                        handleApplyFilters(newFilters);
                      }}
                      className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}

                {/* Restaurant Tags */}
                {appliedFilters.restaurants.map((restaurant) => (
                  <span
                    key={restaurant}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                  >
                    {restaurant === "pizza"
                      ? isRTL
                        ? "مطاعم بيتزا"
                        : "Pizza restaurants"
                      : restaurant === "eastern"
                      ? isRTL
                        ? "أكلات شرقية"
                        : "Eastern cuisine"
                      : restaurant === "burger"
                      ? isRTL
                        ? "برجر"
                        : "Burger"
                      : restaurant === "shawarma"
                      ? isRTL
                        ? "شاورما"
                        : "Shawarma"
                      : restaurant === "grills"
                      ? isRTL
                        ? "مشاوي"
                        : "Grills"
                      : restaurant === "kitchen"
                      ? isRTL
                        ? "مطبخ"
                        : "Kitchen"
                      : restaurant === "falafel"
                      ? isRTL
                        ? "فلافل"
                        : "Falafel"
                      : restaurant === "desserts"
                      ? isRTL
                        ? "حلويات"
                        : "Desserts"
                      : isRTL
                      ? "أخرى"
                      : "Other"}
                    <button
                      onClick={() => {
                        const newFilters = {
                          ...appliedFilters,
                          restaurants: appliedFilters.restaurants.filter(
                            (r) => r !== restaurant
                          ),
                        };
                        setAppliedFilters(newFilters);
                        handleApplyFilters(newFilters);
                      }}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {/* Subcategory Tags */}
                {appliedFilters.subcategories.map((subcategory) => (
                  <span
                    key={subcategory}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                  >
                    {subcategory === "fastfood"
                      ? isRTL
                        ? "وجبات سريعة"
                        : "Fast food"
                      : subcategory === "finedining"
                      ? isRTL
                        ? "مطاعم فاخرة"
                        : "Fine dining"
                      : subcategory === "external"
                      ? isRTL
                        ? "طلبات خارجية"
                        : "External orders"
                      : subcategory === "cafes"
                      ? isRTL
                        ? "مقاهي"
                        : "Cafes"
                      : isRTL
                      ? "أخرى"
                      : "Other"}
                    <button
                      onClick={() => {
                        const newFilters = {
                          ...appliedFilters,
                          subcategories: appliedFilters.subcategories.filter(
                            (s) => s !== subcategory
                          ),
                        };
                        setAppliedFilters(newFilters);
                        handleApplyFilters(newFilters);
                      }}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {/* Offer Type Tags */}
                {appliedFilters.offerTypes.map((offerType) => (
                  <span
                    key={offerType}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                  >
                    {offerType === "light"
                      ? isRTL
                        ? "عروض لايت"
                        : "Light offers"
                      : offerType === "kids"
                      ? isRTL
                        ? "للأطفال"
                        : "For children"
                      : offerType === "buffet"
                      ? isRTL
                        ? "بوفيه"
                        : "Buffet"
                      : offerType === "brunch"
                      ? isRTL
                        ? "برانش"
                        : "Brunch"
                      : offerType}
                    <button
                      onClick={() => {
                        const newFilters = {
                          ...appliedFilters,
                          offerTypes: appliedFilters.offerTypes.filter(
                            (o) => o !== offerType
                          ),
                        };
                        setAppliedFilters(newFilters);
                        handleApplyFilters(newFilters);
                      }}
                      className="ml-1 hover:bg-orange-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {/* Facilities Tags */}
                {appliedFilters.facilities.map((facility) => (
                  <span
                    key={facility}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {facility === "fastfood"
                      ? isRTL
                        ? "وجبات سريعة"
                        : "Fast food"
                      : facility === "finedining"
                      ? isRTL
                        ? "مطاعم فاخرة"
                        : "Fine dining"
                      : facility === "external"
                      ? isRTL
                        ? "طلبات خارجية"
                        : "External orders"
                      : facility === "cafes"
                      ? isRTL
                        ? "مقاهي"
                        : "Cafes"
                      : isRTL
                      ? "أخرى"
                      : "Other"}
                    <button
                      onClick={() => {
                        const newFilters = {
                          ...appliedFilters,
                          facilities: appliedFilters.facilities.filter(
                            (f) => f !== facility
                          ),
                        };
                        setAppliedFilters(newFilters);
                        handleApplyFilters(newFilters);
                      }}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {/* Clear All Button */}
                {(appliedFilters.restaurants.length > 0 ||
                  appliedFilters.subcategories.length > 0 ||
                  appliedFilters.offerTypes.length > 0 ||
                  appliedFilters.facilities.length > 0 ||
                  appliedFilters.sortBy !== "closest") && (
                  <button
                    onClick={() => {
                      setAppliedFilters({
                        sortBy: "closest",
                        restaurants: [],
                        subcategories: [],
                        offerTypes: [],
                        facilities: [],
                      });
                      handleApplyFilters({
                        sortBy: "closest",
                        restaurants: [],
                        subcategories: [],
                        offerTypes: [],
                        facilities: [],
                      });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium hover:bg-red-200 transition-colors"
                  >
                    {isRTL ? "مسح الكل" : "Clear All"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Filter and View Buttons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={
                  isRTL
                    ? `البحث في ${categoryInfo.ar}...`
                    : `Search in ${categoryInfo.en}...`
                }
                className="w-full px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
              />
            </div>
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#400198] focus:border-transparent"
            >
              <FiFilter className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {isRTL ? "فلترة" : "Filter"}
              </span>
            </button>

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

        {/* Restaurants Display */}
        {paginated.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-view">
              {paginated.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="relative overflow-hidden rounded-xl shadow-lg group hover:shadow-2xl transition-all duration-700 ease-out cursor-pointer"
                  onClick={() =>
                    navigate(`/offers/${category}/${restaurant.slug}`)
                  }
                >
                  {/* Restaurant Card Background */}
                  <div className="w-full h-64 relative overflow-hidden">
                    {/* Restaurant Image */}
                    <img
                      src={getRestaurantImage(restaurant.logo)}
                      alt={restaurant.name[isRTL ? "ar" : "en"]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200">
                        <BsShare className="text-sm" />
                      </button>
                      <button className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200">
                        <BsHeart className="text-sm" />
                      </button>
                    </div>
                    {/* Status Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {restaurant.isOpen && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {isRTL ? "مفتوح" : "Open"}
                        </span>
                      )}
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-10 left-3">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {restaurant.offers[0]?.discountPercentage || 30}%{" "}
                        {isRTL ? "خصم" : "OFF"}
                      </span>
                    </div>
                  </div>

                  {/* Card Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 py-4 flex items-end h-full">
                    <div className="p-0 text-white w-full">
                      <h3 className="text-xl font-bold leading-tight">
                        {restaurant.name[isRTL ? "ar" : "en"]}
                      </h3>
                      <div className="text-sm opacity-90 mt-1">
                        {restaurant.description[isRTL ? "ar" : "en"]}
                      </div>

                      {/* Stats and Offers Count */}
                      <div className="flex items-center justify-between mt-3 text-xs text-white/80">
                        <div className="flex items-center gap-2 text-white/90 text-sm">
                          <span className="px-2 py-1 bg-white/20 rounded-full text-xs">
                            {restaurant.location[isRTL ? "ar" : "en"]}
                          </span>
                          <span className="text-xs">{restaurant.distance}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FiStar className="text-yellow-400" />
                            <span>{restaurant.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiEye />
                            <span>{restaurant.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiDownload />
                            <span>{restaurant.saves}</span>
                          </div>
                        </div>
                        <div className="text-white/70">
                          {isRTL
                            ? `${restaurant.offers.length} عروض`
                            : `${restaurant.offers.length} offers`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <RestaurantListView
              restaurants={paginated}
              category={category!}
              getRestaurantImage={getRestaurantImage}
              className="list-view"
            />
          )
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              {search
                ? isRTL
                  ? `لم يتم العثور على عروض لـ "${search}"`
                  : `No offers found for "${search}"`
                : isRTL
                ? "لا توجد عروض متاحة"
                : "No offers available"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md text-sm ${
                    isActive
                      ? "bg-[#C13899] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
      </section>

      <GetStartedSection className="mt-16 mb-28" />

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        appliedFilters={appliedFilters}
      />
    </>
  );
};

export default CategoryOffersPage;

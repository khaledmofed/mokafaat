import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { IoLocationOutline } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { FaCircleCheck } from "react-icons/fa6";
import PropertyCard from "../home/components/PropertyCard";
import Select, { components } from "react-select";
import { HiOutlineHome } from "react-icons/hi";
import { useIsRTL } from "@hooks";
import { UnderTitle } from "@assets";
import GetStartedSectionInside from "@pages/home/components/GetStartedSectionInside";
import FAQSection from "@pages/home/components/FAQSection";
import { useNavigate } from "react-router-dom";
import { properties, getCategoryFilters } from "@data/properties";
import Pagination from "../../components/Pagination";

// Custom SingleValue component for Sort by
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomSingleValue = (props: any) => {
  const isRTL = useIsRTL();
  return (
    <components.SingleValue {...props}>
      <span style={{ color: "#4C4C4C", fontSize: "13px", fontWeight: "500" }}>
        {isRTL ? "ترتيب حسب: " : "Short by : "}
      </span>
      <span style={{ color: "#400198", fontSize: "13px", fontWeight: "500" }}>
        {props.children}
      </span>
    </components.SingleValue>
  );
};

const PropertiesPage: React.FC = () => {
  const navigate = useNavigate();
  const isRTL = useIsRTL();

  // Filter states
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [price, setPrice] = useState("");
  const [advancedFilter, setAdvancedFilter] = useState("");
  const [sortBy, setSortBy] = useState({
    value: "recently-added",
    label: isRTL ? "مضاف مؤخراً" : "Recently Added",
  });
  const [activeTab, setActiveTab] = useState("programs");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get category filters with real counts
  const categoryFilters = useMemo(() => getCategoryFilters(), []);

  // Use centralized properties data
  const allProperties = useMemo(() => properties, []);

  const handleClearFilters = () => {
    setLocation("");
    setPropertyType("");
    setAmenities("");
    setPrice("");
    setAdvancedFilter("");
  };

  const handleFilterChange = (filterType: string) => {
    setIsLoading(true);
    setActiveFilter(filterType);

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  // Filter properties based on active filter
  const filteredProperties = useMemo(() => {
    if (activeFilter === "all") {
      return allProperties;
    }

    // Filter based on propertySlug (which matches the filter IDs)
    return allProperties.filter((p) => p.propertySlug === activeFilter);
  }, [allProperties, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of properties section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show only 6 categories initially, or all if showMoreTags is true
  const displayedCategories = useMemo(() => {
    if (showMoreTags) {
      return categoryFilters;
    }
    return categoryFilters.slice(0, 6);
  }, [categoryFilters, showMoreTags]);

  return (
    <>
      <Helmet>
        <title>{isRTL ? "العقارات - مكافئات" : "Properties - Mukafaat"}</title>
        <meta
          name="description"
          content={
            isRTL
              ? "اكتشف عقاراتنا. تصفح قوائمنا المحدثة للعثور على منزلك المثالي أو فرصة الاستثمار اليوم."
              : "Explore our properties. Browse our updated listings to find your ideal home or investment opportunity today."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "72px" }}>
        {/* Top Filter Bar */}
        <div className="bg-white shadow-2xl">
          <div className="container mx-auto px-4 lg:px-0 py-8 filtering-container">
            <div
              className="grid grid-cols-1 md:grid-cols-5 gap-3 p-6"
              style={{
                boxShadow:
                  "rgb(0 0 0 / 2%) 0px 4px 8px 0px, rgb(0 0 0 / 8%) 0px 0px 20px 0px",
                borderRadius: "15px",
              }}
            >
              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">
                  {isRTL ? "الموقع" : "Location"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder={
                      isRTL ? "اختر المدينة، المنطقة" : "Select by city, Region"
                    }
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-200 transition-all duration-300 hover:shadow-lg focus:shadow-xl h-[48px]"
                    style={{
                      padding: "10px",
                      fontSize: "13px",
                      borderRadius: "9px",
                    }}
                  />
                  <IoLocationOutline
                    className={`absolute ${
                      isRTL ? "left-5" : "right-5"
                    } top-1/2 transform -translate-y-1/2 text-gray-500 text-xl`}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">
                  {isRTL ? "نوع العقار" : "Property Type"}
                </label>
                <Select
                  value={
                    propertyType
                      ? { value: propertyType, label: propertyType }
                      : null
                  }
                  onChange={(option) => setPropertyType(option?.value || "")}
                  options={[
                    {
                      value: "apartments",
                      label: isRTL ? "شقق" : "Apartments",
                    },
                    { value: "villas", label: isRTL ? "فيلات" : "Villas" },
                    { value: "offices", label: isRTL ? "مكاتب" : "Offices" },
                    { value: "shops", label: isRTL ? "محلات" : "Shops" },
                  ]}
                  placeholder={
                    isRTL ? "اختر نوع العقار" : "Select Property type"
                  }
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">
                  {isRTL ? "المرافق" : "Amenities"}
                </label>
                <Select
                  value={
                    amenities ? { value: amenities, label: amenities } : null
                  }
                  onChange={(option) => setAmenities(option?.value || "")}
                  options={[
                    {
                      value: "1-1",
                      label: isRTL ? "1 غرفة نوم، 1 حمام" : "1 Bed, 1 Bath",
                    },
                    {
                      value: "2-2",
                      label: isRTL ? "2 غرفة نوم، 2 حمام" : "2 Beds, 2 Baths",
                    },
                    {
                      value: "3-2",
                      label: isRTL ? "3 غرفة نوم، 2 حمام" : "3 Beds, 2 Baths",
                    },
                    {
                      value: "4+",
                      label: isRTL
                        ? "4+ غرفة نوم، 3+ حمام"
                        : "4+ Beds, 3+ Baths",
                    },
                  ]}
                  placeholder={
                    isRTL
                      ? "اختر غرف النوم والحمامات"
                      : "Select Bedroom & Baths"
                  }
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Price */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">
                  {isRTL ? "السعر" : "Price"}
                </label>
                <Select
                  value={price ? { value: price, label: price } : null}
                  onChange={(option) => setPrice(option?.value || "")}
                  options={[
                    { value: "0-1000", label: "$0 - $1,000" },
                    { value: "1000-5000", label: "$1,000 - $5,000" },
                    { value: "5000-10000", label: "$5,000 - $10,000" },
                    { value: "10000+", label: "$10,000+" },
                  ]}
                  placeholder={isRTL ? "اختر السعر" : "Choose Price"}
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Advanced Filter */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-800">
                  {isRTL ? "فلتر متقدم" : "Advanced Filter"}
                </label>
                <Select
                  value={
                    advancedFilter
                      ? { value: advancedFilter, label: advancedFilter }
                      : null
                  }
                  onChange={(option) => setAdvancedFilter(option?.value || "")}
                  options={[
                    {
                      value: "ready",
                      label: isRTL ? "جاهز للسكن" : "Ready to Move",
                    },
                    {
                      value: "construction",
                      label: isRTL ? "قيد الإنشاء" : "Under Construction",
                    },
                    {
                      value: "investment",
                      label: isRTL ? "استثماري" : "Investment",
                    },
                  ]}
                  placeholder={
                    isRTL
                      ? "حالة العقار، المساحة..."
                      : "Property Status, Area, Ge..."
                  }
                  isClearable
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Listing Header */}
        <div className="bg-white pb-6">
          <div className="container mx-auto px-4 lg:px-0 py-0">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-[#141414] font-medium mb-4">
              <HiOutlineHome className="me-2 text-lg" />
              <span
                className="cursor-pointer hover:text-[#fd671a] transition-colors"
                onClick={() => navigate("/")}
              >
                {isRTL ? "الرئيسية" : "Home"}
              </span>
              <BsChevronDown
                className={`mx-2 transform ${
                  isRTL ? "rotate-90" : "rotate-[270deg]"
                }`}
              />
              <span
                className="cursor-pointer hover:text-[#fd671a] transition-colors"
                onClick={() => navigate("/properties")}
              >
                {isRTL ? "العقارات" : "Properties"}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <h1
                  className="text-[#400198] text-3xl font-bold"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "العقارات" : "Properties"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {isRTL
                    ? "اكتشف أفضل العقارات، تصفح قوائمنا المحدثة للعثور على منزلك المثالي أو فرصة الاستثمار اليوم."
                    : "Explore the best properties, Browse our updated listings to find your ideal home or investment opportunity today."}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleClearFilters}
                  className="text-red-500 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  {isRTL ? "مسح الفلتر" : "Clear Filter"}
                </button>
                <div className="w-60">
                  <Select
                    value={sortBy}
                    onChange={(option) =>
                      setSortBy(
                        option || {
                          value: "recently-added",
                          label: isRTL ? "مضاف مؤخراً" : "Recently Added",
                        }
                      )
                    }
                    options={[
                      {
                        value: "recently-added",
                        label: isRTL ? "مضاف مؤخراً" : "Recently Added",
                      },
                      {
                        value: "price-low-high",
                        label: isRTL
                          ? "السعر: من الأقل إلى الأعلى"
                          : "Price: Low to High",
                      },
                      {
                        value: "price-high-low",
                        label: isRTL
                          ? "السعر: من الأعلى إلى الأقل"
                          : "Price: High to Low",
                      },
                      {
                        value: "newest-first",
                        label: isRTL ? "الأحدث أولاً" : "Newest First",
                      },
                    ]}
                    placeholder={isRTL ? "ترتيب حسب" : "Sort by"}
                    className="sort-select-container"
                    classNamePrefix="react-select"
                    isSearchable={false}
                    components={{
                      SingleValue: CustomSingleValue,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation/Category Tabs */}
        <div className="bg-white">
          <div className="container mx-auto px-4 lg:px-0 py-4">
            {/* Main Tabs */}
            <div
              className="flex space-x-1 mb-4"
              style={{
                borderBottom: "1px solid #DDDDDD",
              }}
            >
              <button
                onClick={() => setActiveTab("programs")}
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "programs"
                    ? "bg-[#400198] text-white"
                    : "bg-gray-100 hover:text-gray-700 text-[#000]"
                }`}
              >
                {isRTL ? "البرامج والتخصصات" : "Programs and specializations"}
              </button>
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-t-lg font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-[#400198] text-white"
                    : "bg-gray-100 hover:text-gray-700 text-[#000]"
                }`}
              >
                {isRTL ? "نظرة عامة" : "Overview"}
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "programs" ? (
              <>
                <div className="pt-4 pb-20">
                  {/* Sub-category Pills */}
                  <div className="flex flex-wrap gap-3">
                    {/* All Button - Active by default */}
                    <button
                      onClick={() => handleFilterChange("all")}
                      className={`px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-[#E5E5E5] ${
                        activeFilter === "all"
                          ? "bg-[#400198] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {isRTL ? "الكل" : "All"}{" "}
                      <span
                        className={
                          activeFilter === "all"
                            ? "text-[#fd671a]"
                            : "text-[#006EA9]"
                        }
                      >
                        ({allProperties.length})
                      </span>
                    </button>

                    {displayedCategories.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => handleFilterChange(filter.id)}
                        className={`px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-[#E5E5E5] ${
                          activeFilter === filter.id
                            ? "bg-[#400198] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {isRTL ? filter.nameAr : filter.name}{" "}
                        <span
                          className={
                            activeFilter === filter.id
                              ? "text-[#fd671a]"
                              : "text-[#006EA9]"
                          }
                        >
                          ({filter.count})
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={() => setShowMoreTags(!showMoreTags)}
                      className={`px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-[#E5E5E5] ${
                        showMoreTags
                          ? "bg-[#006EA9] text-white"
                          : "bg-white text-[#006EA9] hover:bg-blue-50"
                      }`}
                    >
                      {showMoreTags
                        ? isRTL
                          ? "عرض أقل"
                          : "Show Less"
                        : isRTL
                        ? "عرض المزيد"
                        : "View More"}
                    </button>
                  </div>

                  {/* Additional Tags - Show when View More is clicked */}

                  {/* Property Listings */}
                  <div className="container mx-auto px-4 lg:px-0 py-8">
                    {isLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {[...Array(8)].map((_, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                          >
                            <div className="h-[180px] bg-gray-200"></div>
                            <div className="p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                              </div>
                              <div className="h-5 bg-gray-200 rounded w-32"></div>
                              <div className="h-4 bg-gray-200 rounded w-24"></div>
                              <div className="h-4 bg-gray-200 rounded w-28"></div>
                              <div className="h-4 bg-gray-200 rounded w-20"></div>
                              <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {currentProperties.map((property) => (
                          <PropertyCard
                            key={property.id}
                            {...property}
                            onShareClick={() => console.log("Share clicked")}
                            onVisitClick={() => console.log("Visit clicked")}
                          />
                        ))}
                      </div>
                    )}

                    {/* Pagination */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Overview Content */}
                <div className="space-y-6 pt-4 pb-20">
                  <div className="">
                    <div
                      className={`${
                        isRTL ? "text-end" : "text-start"
                      } gap-2 mb-3`}
                    >
                      <span
                        className="text-[#400198] text-lg font-semibold uppercase tracking-wider"
                        style={{
                          fontFamily: isRTL
                            ? "Readex Pro, sans-serif"
                            : "Jost, sans-serif",
                        }}
                      >
                        {isRTL ? "تفاصيل النظرة العامة" : "Overview Details"}
                      </span>
                      <img
                        src={UnderTitle}
                        alt="underlineDecoration"
                        className="h-1 mt-2"
                      />
                    </div>
                  </div>

                  <div className="max-w-4xl space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-black mb-3">
                        {isRTL
                          ? "مرحباً بكم في صفحة خطط العقارات!"
                          : "Welcome to our Properties Plans Page!"}
                      </h4>
                      <p className="text-black leading-relaxed">
                        {isRTL
                          ? "تصفح مجموعة واسعة من العقارات للبيع والإيجار، من الشقق والفيلات إلى المساحات التجارية. ابحث عن المطابقة المثالية مع قوائم مفصلة وفلترة بحث سهلة. اكتشف أحدث قوائم العقارات مع الصور والأسعار والتفاصيل الرئيسية. منزلك المثالي أو استثمارك على بعد نقرة واحدة."
                          : "Browse a wide range of properties for sale and rent, from apartments and villas to commercial spaces. Find your perfect match with detailed listings and easy search filters. Explore the latest property listings with photos, prices, and key details. Your ideal home or investment is just a click away."}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-black mb-3">
                        {isRTL
                          ? "لماذا تختار عقاراتنا؟"
                          : "Why Choose Our Properties?"}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "مواقع متميزة: عقارات في أفضل المواقع الاستراتيجية"
                              : "Prime locations: Properties in the best strategic locations"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "جودة عالية في البناء: مواد بناء عالية الجودة وتصميم متقن"
                              : "High-quality construction: Premium building materials and meticulous design"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "مرافق استثنائية: مجموعة شاملة من المرافق والخدمات"
                              : "Exceptional amenities: Comprehensive range of facilities and services"}
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCircleCheck className="text-[#fd671a] text-xl mt-1" />
                          <span className="text-black">
                            {isRTL
                              ? "خبراء عقاريون: فريق من الخبراء ذوي الخبرة الطويلة"
                              : "Real estate experts: Team of experienced professionals"}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="">
                      <p className="text-black font-medium">
                        {isRTL
                          ? "ابدأ رحلتك نحو مستقبل أكثر إشراقاً مع عقاراتنا. اتصل الآن!"
                          : "Start your journey toward a brighter future with our Properties. Contact Now!"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <GetStartedSectionInside />
      <FAQSection />
    </>
  );
};

export default PropertiesPage;

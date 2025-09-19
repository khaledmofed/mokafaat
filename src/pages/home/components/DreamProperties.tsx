import React, { useState, useMemo, useRef, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";
import { UnderTitle, PatternNewProperty } from "@assets";
import {
  properties,
  propertyTypes,
  getCategoryFilters,
} from "@data/properties";

interface Property {
  id: number;
  image: string;
  propertyType: string;
  title: string;
  location: string;
  bedrooms: number;
  area: string;
  price: string;
  slug: string;
  propertySlug: string;
  isFavorite?: boolean;
}

interface TabData {
  id: string;
  label: string;
  properties: Property[];
}

const DreamProperties: React.FC = () => {
  const isRTL = useIsRTL();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const owlCarouselRef = useRef<OwlCarousel | null>(null);

  // Force re-render when language or direction changes
  useEffect(() => {
    setCarouselKey((prev) => prev + 1);
  }, [i18n.language, isRTL]);

  // Create tabsData dynamically from centralized data
  const tabsData: TabData[] = useMemo(() => {
    // Get unique property slugs from properties
    const uniqueSlugs = [...new Set(properties.map((p) => p.propertySlug))];

    return uniqueSlugs.map((slug) => {
      const propertyType = propertyTypes.find((pt) => pt.slug === slug);
      const tabProperties = properties.filter((p) => p.propertySlug === slug);

      return {
        id: slug,
        label: propertyType ? t(`dreamProperties.tabs.${slug}`) : slug,
        properties: tabProperties.map((p) => ({
          id: p.id,
          image: p.image,
          propertyType: p.propertyType,
          propertyTypeAr: p.propertyTypeAr,
          title: p.title,
          location: p.location,
          bedrooms: p.bedrooms,
          area: p.area,
          price: p.price,
          slug: p.slug,
          propertySlug: p.propertySlug,
          isFavorite: false, // Default value
        })),
      };
    });
  }, [t, i18n.language]); // Add i18n.language dependency

  // Get category filters with real counts
  const categoryFilters = useMemo(() => getCategoryFilters(), [i18n.language]); // Add i18n.language dependency

  const currentProperties = useMemo(() => {
    if (activeTab === "all") {
      return properties; // Show all properties when "all" is selected
    }
    return tabsData.find((tab) => tab.id === activeTab)?.properties || [];
  }, [activeTab, tabsData, properties, i18n.language]); // Add i18n.language dependency

  // Show only 6 categories initially, or all if showMoreTags is true
  const displayedCategories = useMemo(() => {
    if (showMoreTags) {
      return categoryFilters;
    }
    return categoryFilters.slice(0, 6);
  }, [categoryFilters, showMoreTags, i18n.language]); // Add i18n.language dependency

  const owlCarouselOptions = useMemo(
    () => ({
      loop: currentProperties.length > 4, // Only loop if there are more than 4 items
      margin: 10,
      nav: currentProperties.length > 4, // Only show navigation if there are more than 4 items
      dots: false,
      autoplay: currentProperties.length > 4, // Only autoplay if there are more than 4 items
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      rtl: isRTL.toString(), // Handle RTL direction
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 4,
        },
      },
    }),
    [currentProperties.length, isRTL] // Add isRTL dependency
  );

  const handleTabChange = async (tabId: string) => {
    setIsLoading(true);
    setActiveTab(tabId);

    // Force re-render of carousel by changing key
    setCarouselKey((prev) => prev + 1);

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleFavoriteClick = (id: number) => {
    // Handle favorite logic
    console.log("Favorite clicked:", id);
  };

  const handleShareClick = (id: number) => {
    // Handle share logic
    console.log("Share clicked:", id);
  };

  const handleVisitClick = (id: number) => {
    // Handle visit logic
    console.log("Visit clicked:", id);
  };

  return (
    <section className="pt-10 pb-20 relative overflow-hidden">
      <div className="container mx-auto relative px-4 z-10">
        {/* Header Section */}
        <div className="text-start mb-10">
          <div className="text-start gap-2 mb-3">
            <span
              className="text-[#fd671a] text-md font-semibold uppercase tracking-wider"
              style={{
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              {t("dreamProperties.subtitle")}
            </span>
            <img
              src={UnderTitle}
              alt="underlineDecoration"
              className="h-1 mt-2"
            />
          </div>
          <h2
            className="text-[#400198] text-3xl font-bold"
            style={{
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            {t("dreamProperties.mainTitle")}
          </h2>
        </div>

        {/* Tabs and Navigation */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 w-full lg:w-[90%]">
            {/* All Button - Active by default */}
            <button
              onClick={() => handleTabChange("all")}
              className={`px-3 py-2 lg:px-5 lg:py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {i18n.language === "ar" ? "الكل" : "All"} ({properties.length})
            </button>

            {displayedCategories.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleTabChange(filter.id)}
                className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                  activeTab === filter.id
                    ? "bg-[#400198] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {i18n.language === "ar" ? filter.nameAr : filter.name} (
                {filter.count})
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
                ? i18n.language === "ar"
                  ? "عرض أقل"
                  : "Show Less"
                : i18n.language === "ar"
                ? "عرض المزيد"
                : "View More"}
            </button>
          </div>
        </div>

        {/* Properties Carousel */}
        <div className="relative PropertiesCarousel">
          {isLoading ? (
            // Skeleton Loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <PropertySkeleton key={index} />
              ))}
            </div>
          ) : (
            // Properties Carousel with key to force re-render
            <OwlCarousel
              key={carouselKey}
              ref={owlCarouselRef}
              className="owl-theme"
              {...owlCarouselOptions}
              style={{ direction: "ltr" }}
            >
              {currentProperties.map((property) => (
                <div key={property.id} className="item">
                  <PropertyCard
                    {...property}
                    slug={property.slug}
                    propertySlug={property.propertySlug}
                    onFavoriteClick={handleFavoriteClick}
                    onShareClick={handleShareClick}
                    onVisitClick={handleVisitClick}
                  />
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>

        {/* Main CTA Button */}
        <div className="text-center mt-0">
          <button
            onClick={() => navigate("/properties")}
            className="bg-[#400198] mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2 cursor-pointer"
            style={{
              marginTop: "0px",
              fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            }}
          >
            <span>{t("dreamProperties.viewMore")}</span>
            <IoIosArrowRoundForward
              className={`text-3xl transform ${
                isRTL ? "rotate-45" : "-rotate-45"
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`absolute -bottom-40 w-1/1 sm:w-1/1 ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
      >
        <img
          src={PatternNewProperty}
          alt={t("worldwideProperties.appPattern")}
          className="h-auto animate-float"
        />
      </div>
    </section>
  );
};

export default DreamProperties;

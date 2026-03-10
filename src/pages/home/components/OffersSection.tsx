import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OfferCard from "../../offers/components/OfferCard";
import { Pattern, PatternNewProperty } from "../../../assets";
import OwlCarousel from "react-owl-carousel";
import { useIsRTL } from "../../../hooks";
import { type Offer } from "@data/offers";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";

const OffersSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [carouselKey, setCarouselKey] = useState(0);
  const owlCarouselRef = useRef<OwlCarousel | null>(null);

  // Fetch offers from API
  const { data: webHomeResponse, isLoading: apiLoading } = useWebHome();

  // Force re-render when language or direction changes
  useEffect(() => {
    setCarouselKey((prev) => prev + 1);
  }, [i18n.language, isRTL]);

  // Extract offers from API response
  const apiOffers = useMemo(() => {
    if (!webHomeResponse) return { today: [], new: [], best_selling: [] };
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const offers = data?.offers as
      | Record<string, Array<Record<string, unknown>>>
      | undefined;
    if (!offers) return { today: [], new: [], best_selling: [] };
    return {
      today: Array.isArray(offers.today) ? offers.today : [],
      new: Array.isArray(offers.new) ? offers.new : [],
      best_selling: Array.isArray(offers.best_selling)
        ? offers.best_selling
        : [],
    };
  }, [webHomeResponse]);

  // Map API offers to frontend models
  const mappedOffers = useMemo(() => {
    return {
      today: mapApiOffersToModels(apiOffers.today),
      new: mapApiOffersToModels(apiOffers.new),
      best_selling: mapApiOffersToModels(apiOffers.best_selling),
    };
  }, [apiOffers]);

  // Get filtered offers based on active filter
  const displayOffers = useMemo(() => {
    switch (activeFilter) {
      case "today":
        return mappedOffers.today;
      case "new":
        return mappedOffers.new;
      case "bestseller":
        return mappedOffers.best_selling;
      case "all":
      default: {
        // Combine all offers, removing duplicates by id
        const allOffers = [
          ...mappedOffers.today,
          ...mappedOffers.new,
          ...mappedOffers.best_selling,
        ];
        const uniqueOffers = allOffers.filter(
          (offer, index, self) =>
            index === self.findIndex((o) => o.id === offer.id)
        );
        return uniqueOffers;
      }
    }
  }, [activeFilter, mappedOffers]);

  const filters = [
    {
      key: "all",
      label: t("home.offers.filters.all"),
      count:
        mappedOffers.today.length +
        mappedOffers.new.length +
        mappedOffers.best_selling.length,
    },
    {
      key: "today",
      label: t("home.offers.filters.today"),
      count: mappedOffers.today.length,
    },
    {
      key: "new",
      label: t("home.offers.filters.new"),
      count: mappedOffers.new.length,
    },
    {
      key: "bestseller",
      label: t("home.offers.filters.bestseller"),
      count: mappedOffers.best_selling.length,
    },
  ];

  // OwlCarousel options
  const owlCarouselOptions = useMemo(
    () => ({
      loop: displayOffers.length > 4, // Only loop if there are more than 4 items
      margin: 10,
      nav: displayOffers.length > 4, // Only show navigation if there are more than 4 items
      dots: false,
      autoplay: displayOffers.length > 4, // Only autoplay if there are more than 4 items
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      rtl: (isRTL && displayOffers.length < 4) ? "true" : "false",
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
    [displayOffers.length, isRTL]
  );

  const handleFilterChange = (filterKey: string) => {
    setActiveFilter(filterKey);
    // Force re-render of carousel by changing key
    setCarouselKey((prev) => prev + 1);
  };

  const handleOfferClick = (offer: Offer) => {
    navigate(`/offers/${offer.category}/${offer.companyId}/offer/${offer.id}`);
  };
  // Skeleton component
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
        <div className="flex gap-1 mb-4">
          <div className="h-6 bg-gray-200 rounded-full w-16"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
  return (
    <section
      className="pb-24 pt-40 relative overflow-hidden z-1"
      style={{ marginTop: "-142px" }}
    >
      <div
        className={`absolute -top-0 w-1/2 sm:w-1/1 ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
        style={{ transform: "rotate(-20deg)" }}
      >
        <img src={Pattern} alt="offers" className="h-auto animate-float" />
      </div>
      <div className="container mx-auto px-4 pt-16">
        {/* Section Header */}
        <div className="text-start mb-4">
          <h2 className="text-[#400198] text-3xl font-bold">
            {t("home.offers.title")}
          </h2>
          <p className="text-md text-gray-700 leading-relaxed">
            {t("home.offers.description")}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-start mb-8 gap-3 relative z-10 w-1/2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div
          className="relative OffersCarousel PropertiesCarousel"
          style={{
            direction: isRTL && displayOffers.length < 4 ? "rtl" : "ltr",
          }}
        >
          {apiLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : displayOffers.length === 0 ? (
            // No offers message
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {isRTL
                  ? "لا توجد عروض متاحة حالياً"
                  : "No offers available at the moment"}
              </p>
            </div>
          ) : (
            // Products Carousel with key to force re-render
            <OwlCarousel
              key={carouselKey}
              ref={owlCarouselRef}
              className="owl-theme"
              {...owlCarouselOptions}
              style={{
                direction: isRTL && displayOffers.length < 4 ? "rtl" : "ltr",
              }}
            >
              {displayOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="item h-full"
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <OfferCard offer={offer} onOfferClick={handleOfferClick} />
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>

        {/* View More Button */}
        <div className="text-center mt-2 z-10 relative">
          <button
            onClick={() => (window.location.href = "/offers")}
            className="bg-[#400198] lg:mx-auto hover:scale-105 transition-transform duration-300 text-base sm:text-base px-8 sm:px-8 lg:px-8 py-4 sm:py-4 font-semibold rounded-full text-white flex items-center gap-2"
          >
            {t("home.offers.viewMore")}
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
          alt="offers"
          className="h-auto animate-float"
        />
      </div>

    </section>
  );
};

export default OffersSection;

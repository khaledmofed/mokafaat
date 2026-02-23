import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import OwlCarousel from "react-owl-carousel";
import { type Offer } from "@data/offers";
import OfferCard from "./OfferCard";
import { FiEye, FiStar } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";

const SuggestedOffersSection: React.FC = () => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<
    "nearby" | "most-viewed" | "highest-rated"
  >("most-viewed");
  const [isLoading, setIsLoading] = useState(false);
  const [carouselKey, setCarouselKey] = useState(0);
  const owlCarouselRef = useRef<OwlCarousel | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { data: webHomeResponse } = useWebHome();

  const apiOffersByType = useMemo(() => {
    if (!webHomeResponse) return { today: [], new: [], best_selling: [] };
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const offers = data?.offers as
      | Record<string, Array<Record<string, unknown>>>
      | undefined;
    return {
      today: mapApiOffersToModels(
        Array.isArray(offers?.today) ? offers.today : []
      ),
      new: mapApiOffersToModels(Array.isArray(offers?.new) ? offers.new : []),
      best_selling: mapApiOffersToModels(
        Array.isArray(offers?.best_selling) ? offers.best_selling : []
      ),
    };
  }, [webHomeResponse]);

  const filters = [
    {
      key: "most-viewed" as const,
      label: { ar: "الأعلى زيارة", en: "Most Viewed" },
      icon: <FiEye />,
    },
    {
      key: "highest-rated" as const,
      label: { ar: "الأعلى تقييماً", en: "Highest Rated" },
      icon: <FiStar />,
    },
    {
      key: "nearby" as const,
      label: { ar: "قريبة منك", en: "Nearby" },
      icon: <IoLocationOutline />,
    },
  ];

  const offers = useMemo(() => {
    switch (activeFilter) {
      case "most-viewed":
        return apiOffersByType.best_selling;
      case "highest-rated":
        return apiOffersByType.new;
      case "nearby":
        return userLocation ? apiOffersByType.today : [];
      default:
        return [];
    }
  }, [activeFilter, userLocation, apiOffersByType]);

  // OwlCarousel options
  const owlCarouselOptions = useMemo(
    () => ({
      loop: offers.length > 4, // Only loop if there are more than 4 items
      margin: 10,
      nav: offers.length > 4, // Only show navigation if there are more than 4 items
      dots: false,
      autoplay: offers.length > 4, // Only autoplay if there are more than 4 items
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
    [offers.length, isRTL]
  );

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to Riyadh coordinates
          setUserLocation({ lat: 24.7136, lng: 46.6753 });
        }
      );
    } else {
      // Fallback to Riyadh coordinates
      setUserLocation({ lat: 24.7136, lng: 46.6753 });
    }
  };

  const handleFilterChange = (
    filterKey: "most-viewed" | "highest-rated" | "nearby"
  ) => {
    setIsLoading(true);
    setActiveFilter(filterKey);
    setCarouselKey((prev) => prev + 1);

    if (filterKey === "nearby" && !userLocation) {
      handleLocationRequest();
    }

    requestAnimationFrame(() => setIsLoading(false));
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
    <section className="container mx-auto px-4 py-10">
      <div className="text-start mb-4">
        <h2 className="text-[#400198] text-3xl font-bold">
          {isRTL ? "نقترحها عليك" : "Suggested for You"}
        </h2>
        <p className="text-md text-gray-700 leading-relaxed">
          {isRTL
            ? "عروض مخصصة لك بناءً على تفضيلاتك"
            : "Personalized offers based on your preferences"}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-start mb-8 gap-3 relative z-10 w-1/2">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => handleFilterChange(filter.key)}
            className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 flex items-center gap-2 ${
              activeFilter === filter.key
                ? "bg-[#400198] text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>{filter.icon}</span>
            <span>{filter.label[isRTL ? "ar" : "en"]}</span>
          </button>
        ))}
      </div>

      {/* Location Request for Nearby */}
      {activeFilter === "nearby" && !userLocation && (
        <div className="text-center mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="text-blue-600 text-4xl mb-4">
              {" "}
              <IoLocationOutline className=" mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {isRTL ? "تحديد موقعك" : "Share Your Location"}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {isRTL
                ? "نحتاج إلى معرفة موقعك لعرض العروض القريبة منك"
                : "We need to know your location to show nearby offers"}
            </p>
            <button
              onClick={handleLocationRequest}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isRTL ? "تحديد الموقع" : "Share Location"}
            </button>
          </div>
        </div>
      )}

      {/* Offers Carousel */}
      <div className="relative OffersCarousel PropertiesCarousel">
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : offers.length > 0 ? (
          // Offers Carousel with key to force re-render
          <OwlCarousel
            key={carouselKey}
            ref={owlCarouselRef}
            className="owl-theme"
            {...owlCarouselOptions}
            style={{
              direction: offers.length > 4 && isRTL ? "ltr" : "ltr",
            }}
          >
            {offers.slice(0, 8).map((offer) => (
              <div
                key={offer.id}
                className="item"
                style={{ direction: isRTL ? "rtl" : "ltr" }}
              >
                <OfferCard offer={offer} onOfferClick={handleOfferClick} />
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              {activeFilter === "nearby" ? (
                <IoLocationOutline className=" mx-auto" />
              ) : activeFilter === "most-viewed" ? (
                <FiEye className=" mx-auto" />
              ) : (
                <FiStar className=" mx-auto" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {isRTL ? "لا توجد عروض متاحة" : "No offers available"}
            </h3>
            <p className="text-gray-500">
              {isRTL
                ? "جرب فلتر آخر أو تحقق مرة أخرى لاحقاً"
                : "Try another filter or check back later"}
            </p>
          </div>
        )}
      </div>

    </section>
  );
};

export default SuggestedOffersSection;

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OfferCard from "../../offers/components/OfferCard";
import { Pattern, PatternNewProperty } from "../../../assets";
import OwlCarousel from "react-owl-carousel";
import { useIsRTL } from "../../../hooks";
import { type Offer } from "@data/offers";
import { useWebOffers } from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";

function extractOffersArray(res: unknown): Array<Record<string, unknown>> {
  const root = (res as Record<string, unknown>) ?? {};
  const data =
    (root.data as Record<string, unknown>) ?? (root as Record<string, unknown>);
  const offers = (data.offers ?? data.data ?? data) as unknown;
  return Array.isArray(offers)
    ? (offers as Array<Record<string, unknown>>)
    : [];
}

const OffersSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<
    "latest" | "free" | "paid" | "suggested"
  >("latest");
  const [carouselKey, setCarouselKey] = useState(0);
  const owlCarouselRef = useRef<OwlCarousel | null>(null);

  // Fetch offers from API: /api/web/offers?category_id&price_min&price_max&pricing_type&search&sort_by
  const { data: latestRes, isLoading: latestLoading } = useWebOffers({
    sort_by: "latest",
    per_page: 50,
  });
  const { data: freeRes, isLoading: freeLoading } = useWebOffers({
    sort_by: "latest",
    per_page: 50,
  });
  const { data: paidRes, isLoading: paidLoading } = useWebOffers({
    sort_by: "latest",
    per_page: 50,
  });
  const { data: suggestedRes, isLoading: suggestedLoading } = useWebOffers({
    sort_by: "best_selling",
    per_page: 50,
  });

  // Force re-render when language or direction changes
  useEffect(() => {
    setCarouselKey((prev) => prev + 1);
  }, [i18n.language, isRTL]);

  const latestOffers = useMemo(
    () => mapApiOffersToModels(extractOffersArray(latestRes)),
    [latestRes],
  );
  const freeOffers = useMemo(
    () =>
      mapApiOffersToModels(extractOffersArray(freeRes)).filter(
        (o) => Number(o.platformPrice ?? 0) <= 0,
      ),
    [freeRes],
  );
  const paidOffers = useMemo(
    () =>
      mapApiOffersToModels(extractOffersArray(paidRes)).filter(
        (o) => Number(o.platformPrice ?? 0) > 0,
      ),
    [paidRes],
  );
  const suggestedOffers = useMemo(
    () => mapApiOffersToModels(extractOffersArray(suggestedRes)),
    [suggestedRes],
  );

  const displayOffers = useMemo(() => {
    switch (activeFilter) {
      case "free":
        return freeOffers;
      case "paid":
        return paidOffers;
      case "suggested":
        return suggestedOffers;
      case "latest":
      default:
        return latestOffers;
    }
  }, [activeFilter, freeOffers, paidOffers, suggestedOffers, latestOffers]);

  const apiLoading =
    latestLoading || freeLoading || paidLoading || suggestedLoading;

  const makeOwlOptions = useMemo(
    () => (len: number) => ({
      loop: len > 1,
      margin: 10,
      nav: len > 1,
      dots: len > 1,
      autoplay: len > 1,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      // عند استخدام OwlCarousel نجعل الاتجاه دائماً LTR
      rtl: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 },
      },
    }),
    [],
  );

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

  const owlOptions = useMemo(
    () => makeOwlOptions(displayOffers.length),
    [displayOffers.length, makeOwlOptions],
  );
  const filters = useMemo(
    () => [
      {
        key: "latest" as const,
        label: isRTL ? "أحدث العروض" : "Latest",
        count: latestOffers.length,
      },
      {
        key: "free" as const,
        label: isRTL ? "عروض مجانية" : "Free",
        count: freeOffers.length,
      },
      {
        key: "paid" as const,
        label: isRTL ? "عروض مدفوعة" : "Paid",
        count: paidOffers.length,
      },
      {
        key: "suggested" as const,
        label: isRTL ? "نقترحها عليك" : "Suggested",
        count: suggestedOffers.length,
      },
    ],
    [
      isRTL,
      latestOffers.length,
      freeOffers.length,
      paidOffers.length,
      suggestedOffers.length,
    ],
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
      <div className="container mx-auto px-4 pt-16 relative z-10">
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
        <div
          className="flex justify-start mb-8 gap-3 relative z-10 flex-wrap"
          style={{ width: "90%" }}
        >
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              onClick={() => {
                setActiveFilter(filter.key);
                setCarouselKey((prev) => prev + 1);
              }}
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
          style={{ direction: "ltr" }}
        >
          {apiLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : displayOffers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                {isRTL ? "لا توجد عروض" : "No offers"}
              </p>
            </div>
          ) : isRTL && displayOffers.length < 4 ? (
            // في العربية ومع عدد عناصر أقل من 4: لا نستخدم OwlCarousel ونطبق RTL
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-10"
              style={{ direction: "rtl" }}
            >
              {displayOffers.map((offer) => (
                <OfferCard
                  key={offer.id}
                  offer={offer}
                  onOfferClick={handleOfferClick}
                />
              ))}
            </div>
          ) : (
            <OwlCarousel
              key={`${carouselKey}-${activeFilter}`}
              ref={owlCarouselRef}
              className="owl-theme"
              {...owlOptions}
              style={{ direction: "ltr" }}
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
            type="button"
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

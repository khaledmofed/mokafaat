import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { type Offer } from "@data/offers";
import OfferCard from "./OfferCard";
import OwlCarousel from "react-owl-carousel";
import { Pattern } from "@assets";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";

const LatestOffersSection: React.FC = () => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const [carouselKey, setCarouselKey] = useState(0);
  const owlCarouselRef = useRef<OwlCarousel | null>(null);

  const { data: webHomeResponse, isLoading: apiLoading } = useWebHome();

  const latestOffers = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const offers = data?.offers as
      | Record<string, Array<Record<string, unknown>>>
      | undefined;
    if (!offers) return [];
    const all = [
      ...(Array.isArray(offers.today) ? offers.today : []),
      ...(Array.isArray(offers.new) ? offers.new : []),
      ...(Array.isArray(offers.best_selling) ? offers.best_selling : []),
    ];
    const unique = all.filter(
      (o, i, arr) => arr.findIndex((x) => String(x?.id) === String(o?.id)) === i
    );
    return mapApiOffersToModels(unique).slice(0, 8);
  }, [webHomeResponse]);

  // Force re-render when language or direction changes
  useEffect(() => {
    setCarouselKey((prev) => prev + 1);
  }, [isRTL]);

  // OwlCarousel options
  const owlCarouselOptions = useMemo(
    () => ({
      loop: latestOffers.length > 4,
      margin: 10,
      nav: latestOffers.length > 4,
      dots: false,
      autoplay: latestOffers.length > 4,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      rtl: (isRTL && latestOffers.length < 4) ? "true" : "false",
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
    [latestOffers.length, isRTL]
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

  return (
    <section className="container mx-auto px-4 py-10 relative  z-1">
      <div
        className={`absolute -top-20 w-1/2 sm:w-1/1 ${
          isRTL ? "-left-10" : "-right-10"
        } z-0 hidden sm:block`}
        style={{ transform: "rotate(-20deg)" }}
      >
        <img src={Pattern} alt="offers" className="h-auto animate-float" />
      </div>
      <div className="text-start mb-4">
        <h2 className="text-[#400198] text-3xl font-bold">
          {isRTL ? "أحدث العروض" : "Latest Offers"}
        </h2>
        <p className="text-md text-gray-700 leading-relaxed">
          {isRTL
            ? "اكتشف أحدث العروض والخصومات المتاحة"
            : "Discover the latest offers and discounts available"}
        </p>
      </div>

      <div
        className="relative OffersCarousel PropertiesCarousel"
        style={{
          direction: isRTL && latestOffers.length < 4 ? "rtl" : "ltr",
        }}
      >
        {apiLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          latestOffers.length > 0 && (
            <OwlCarousel
              key={carouselKey}
              ref={owlCarouselRef}
              className="owl-theme"
              {...owlCarouselOptions}
              style={{
                direction: isRTL && latestOffers.length < 4 ? "rtl" : "ltr",
              }}
            >
              {latestOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="item"
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <OfferCard offer={offer} onOfferClick={handleOfferClick} />
                </div>
              ))}
            </OwlCarousel>
          )
        )}
        {!apiLoading && latestOffers.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            {isRTL
              ? "لا توجد عروض متاحة حالياً"
              : "No offers available at the moment"}
          </div>
        )}
      </div>

    </section>
  );
};

export default LatestOffersSection;

import React, { useState, useMemo, useRef, useEffect } from "react";
import { useIsRTL } from "@hooks";
import { getAllOffers, type Offer } from "@data/offers";
import OfferCard from "./OfferCard";
import OfferModal from "./OfferModal";
import OwlCarousel from "react-owl-carousel";
import { Pattern } from "@assets";

const LatestOffersSection: React.FC = () => {
  const isRTL = useIsRTL();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [carouselKey, setCarouselKey] = useState(0);
  const owlCarouselRef = useRef<OwlCarousel | null>(null);

  const latestOffers = useMemo(() => getAllOffers().slice(0, 8), []);

  // Force re-render when language or direction changes
  useEffect(() => {
    setCarouselKey((prev) => prev + 1);
  }, [isRTL]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
      rtl: isRTL.toString(),
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
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOffer(null);
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

      <div className="relative OffersCarousel PropertiesCarousel">
        {isLoading ? (
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
                direction: latestOffers.length > 4 && isRTL ? "ltr" : "rtl",
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
      </div>

      {/* Offer Modal */}
      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default LatestOffersSection;

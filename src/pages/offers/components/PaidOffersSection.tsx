import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { type Offer } from "@data/offers";
import OfferCard from "./OfferCard";
import OwlCarousel from "react-owl-carousel";
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

const PaidOffersSection: React.FC = () => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const [carouselKey, setCarouselKey] = useState(0);
  const owlCarouselRef = useRef<OwlCarousel | null>(null);

  // نجلب كمية أكبر ثم نفلتر حسب price !== 0 (platformPrice)
  const { data: paidRes, isLoading } = useWebOffers({
    sort_by: "latest",
    per_page: 50,
  });

  const paidOffers = useMemo(
    () =>
      mapApiOffersToModels(extractOffersArray(paidRes))
        .filter((o) => Number(o.platformPrice ?? 0) > 0)
        .slice(0, 8),
    [paidRes],
  );

  useEffect(() => {
    setCarouselKey((prev) => prev + 1);
  }, [isRTL]);

  const carouselOptions = useMemo(
    () => ({
      loop: paidOffers.length > 4,
      margin: 10,
      nav: paidOffers.length > 4,
      dots: false,
      autoplay: paidOffers.length > 4,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      rtl: false,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 },
      },
    }),
    [paidOffers.length],
  );

  const handleOfferClick = (offer: Offer) => {
    navigate(`/offers/${offer.category}/${offer.companyId}/offer/${offer.id}`);
  };

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="text-start mb-4">
        <h2 className="text-[#400198] text-3xl font-bold">
          {isRTL ? "عروض مدفوعة" : "Paid Offers"}
        </h2>
        <p className="text-md text-gray-700 leading-relaxed">
          {isRTL
            ? "استفد من أفضل العروض المدفوعة"
            : "Enjoy the best paid offers"}
        </p>
      </div>

      <div
        className="relative OffersCarousel PropertiesCarousel"
        style={{ direction: "ltr" }}
      >
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">
            {isRTL ? "جاري التحميل..." : "Loading..."}
          </div>
        ) : isRTL && paidOffers.length < 4 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-6"
            style={{ direction: "rtl" }}
          >
            {paidOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onOfferClick={handleOfferClick}
              />
            ))}
          </div>
        ) : (
          <OwlCarousel
            key={carouselKey}
            ref={owlCarouselRef}
            className="owl-theme"
            {...carouselOptions}
            style={{ direction: "ltr" }}
          >
            {paidOffers.map((offer) => (
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
    </section>
  );
};

export default PaidOffersSection;

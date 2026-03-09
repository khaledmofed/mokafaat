import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import OwlCarousel from "react-owl-carousel";
import { FaMapMarkerAlt, FaStar, FaEye, FaCheck } from "react-icons/fa";
import { BsHeart, BsShare } from "react-icons/bs";
import { getOfferImage, getRestaurantById, Offer } from "@data/offers";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiOffersToModels } from "@network/mappers/offersMapper";

const DEFAULT_TOP_COLOR = "bg-[#400198]";

const WeeklyDiscountsSection: React.FC = () => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();

  const { data: webHomeResponse } = useWebHome();

  const weeklyDiscounts = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const offers = data?.offers as
      | Record<string, Array<Record<string, unknown>>>
      | undefined;
    const today = Array.isArray(offers?.today) ? offers.today : [];
    return mapApiOffersToModels(today).slice(0, 4);
  }, [webHomeResponse]);

  const handleOfferClick = (offer: Offer) => {
    navigate(`/offers/${offer.category}/${offer.companyId}/offer/${offer.id}`);
  };

  const handleRestaurantClick = (
    e: React.MouseEvent,
    restaurantId: string,
    categoryKey: string
  ) => {
    e.stopPropagation(); // Prevent triggering offer click
    navigate(`/offers/${categoryKey}/${restaurantId}`);
  };

  const handleCategoryClick = (e: React.MouseEvent, categoryKey: string) => {
    e.stopPropagation(); // Prevent triggering offer click
    navigate(`/offers/${categoryKey}`);
  };

  const carouselOptions = useMemo(
    () => ({
      loop: weeklyDiscounts.length > 4,
      margin: 10,
      nav: weeklyDiscounts.length > 4,
      dots: false,
      autoplay: weeklyDiscounts.length > 4,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      rtl: (isRTL && weeklyDiscounts.length < 4) ? "true" : "false",
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
    [weeklyDiscounts.length, isRTL]
  );

  return (
    <section className="container mx-auto px-4 py-0">
      <div className="text-start mb-4">
        <h2 className="text-[#400198] text-3xl font-bold">
          {isRTL ? "تخفيضات الأسبوع" : "Weekly Discounts"}
        </h2>
        <p className="text-md text-gray-700 leading-relaxed">
          {isRTL
            ? "عروض خاصة محدودة الوقت لا تفوتها"
            : "Special limited-time offers you don't want to miss"}
        </p>
      </div>

      <div
        className="relative OffersCarousel PropertiesCarousel -ms-[15px]"
        style={{
          direction: isRTL && weeklyDiscounts.length < 4 ? "rtl" : "ltr",
        }}
      >
        <OwlCarousel
          className="owl-theme"
          {...carouselOptions}
          style={{
            direction: isRTL && weeklyDiscounts.length < 4 ? "rtl" : "ltr",
          }}
        >
          {weeklyDiscounts.length > 0 ? (
            weeklyDiscounts.map((offer) => {
              const restaurant = getRestaurantById(offer.companyId);
              const topColor = restaurant?.topColor ?? DEFAULT_TOP_COLOR;
              const locationText = restaurant
                ? `${restaurant.location[isRTL ? "ar" : "en"]}, ${
                    restaurant.distance
                  }`
                : "";
              const categoryKey =
                restaurant?.category?.key ?? offer.category ?? "all";
              const categoryLabel =
                restaurant?.category?.[isRTL ? "ar" : "en"] ??
                offer.categoryName ??
                "";
              const merchantLabel =
                restaurant?.name?.[isRTL ? "ar" : "en"] ??
                offer.merchantName ??
                offer.title[isRTL ? "ar" : "en"];
              const logoUrl = offer.merchantLogo
                ? getOfferImage(offer.merchantLogo)
                : getOfferImage(offer.image);

              return (
                <div
                  key={offer.id}
                  className="item"
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <div
                    onClick={() => handleOfferClick(offer)}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden relative"
                  >
                    <div
                      className={`${topColor} relative h-24 flex items-center justify-between px-3`}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10 bg-white/20 overflow-hidden">
                        <img
                          src={logoUrl}
                          alt={offer.title[isRTL ? "ar" : "en"]}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-right ms-2 text-start">
                        <h3 className="text-white font-bold text-base mb-1 cursor-pointer hover:text-gray-200 transition-colors">
                          {offer.title[isRTL ? "ar" : "en"]}
                        </h3>
                        {locationText && (
                          <div className="flex items-center justify-start gap-1 text-white text-xs">
                            <FaMapMarkerAlt className="text-xs" />
                            <span>{locationText}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all duration-200">
                          <BsHeart className="text-white text-sm" />
                        </div>
                        <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all duration-200">
                          <BsShare className="text-white text-sm" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0">
                        <svg
                          viewBox="0 0 300 20"
                          className="w-full h-5 fill-white"
                          preserveAspectRatio="none"
                        >
                          <path d="M0,20 Q75,0 150,20 T300,20 L300,20 L0,20 Z" />
                        </svg>
                      </div>
                    </div>

                    <div className="p-4 h-28 flex flex-col justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h4 className="text-black font-bold text-sm mb-1 leading-tight">
                            {offer.title[isRTL ? "ar" : "en"]}
                          </h4>
                          <div className="flex items-center gap-2 text-xs">
                            {categoryLabel && (
                              <>
                                <span
                                  className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                                  onClick={(e) =>
                                    handleCategoryClick(e, categoryKey)
                                  }
                                >
                                  {categoryLabel}
                                </span>
                                <span className="text-gray-400">•</span>
                              </>
                            )}
                            <span
                              className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                              onClick={(e) =>
                                handleRestaurantClick(
                                  e,
                                  offer.companyId,
                                  categoryKey
                                )
                              }
                            >
                              {merchantLabel}
                            </span>
                          </div>
                        </div>
                        <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex-shrink-0">
                          {offer.discountPercentage}% {isRTL ? "خصم" : "OFF"}
                        </div>
                      </div>

                      <div className="flex items-center justify-start gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <span className="font-bold">{offer.rating}</span>
                          <FaStar className="text-orange-500" />
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <span className="font-bold">{offer.views}</span>
                          <FaEye />
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <span className="font-bold">{offer.bookmarks}</span>
                          <FaCheck className="text-green-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            // No data fallback
            <div className="item">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <h3 className="text-gray-500 text-lg mb-2">
                  {isRTL
                    ? "لا توجد عروض متاحة حالياً"
                    : "No offers available at the moment"}
                </h3>
                <p className="text-gray-400 text-sm">
                  {isRTL ? "تحقق مرة أخرى لاحقاً" : "Check back later"}
                </p>
              </div>
            </div>
          )}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default WeeklyDiscountsSection;

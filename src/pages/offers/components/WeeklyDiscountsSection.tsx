import React, {
  useState,
  // useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import OwlCarousel from "react-owl-carousel";
import { FaMapMarkerAlt, FaStar, FaEye, FaCheck } from "react-icons/fa";
import { BsHeart, BsShare } from "react-icons/bs";
import {
  getTodayOffers,
  getOfferImage,
  getRestaurantById,
  Offer,
} from "@data/offers";
import OfferModal from "./OfferModal";

const WeeklyDiscountsSection: React.FC = () => {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get today's offers as weekly discounts
  const weeklyDiscounts = useMemo(() => {
    const offers = getTodayOffers();
    return offers.slice(0, 4); // Show only first 4 offers
  }, []);

  // Simulate loading - run once on mount
  // useEffect(() => {
  // Always show loading for at least 800ms to demonstrate skeleton
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 800);
  //   return () => clearTimeout(timer);
  // }, []);
  // Empty dependency array - run once on mount

  const handleOfferClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setIsModalOpen(false);
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

  // Skeleton component
  // const SkeletonCard = () => (
  //   <div className="item">
  //     <div className="bg-white rounded-xl shadow-lg overflow-hidden">
  //       {/* Top Section Skeleton */}
  //       <div className="bg-gray-300 relative h-24 flex items-center justify-between px-3 animate-pulse">
  //         <div className="w-12 h-12 rounded-full bg-gray-400"></div>
  //         <div className="flex-1 ms-2">
  //           <div className="h-4 bg-gray-400 rounded mb-1"></div>
  //           <div className="h-3 bg-gray-400 rounded w-3/4"></div>
  //         </div>
  //         <div className="flex gap-2">
  //           <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
  //           <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
  //         </div>
  //       </div>
  //       {/* Bottom Section Skeleton */}
  //       <div className="p-4 h-28 flex flex-col justify-between">
  //         <div className="flex items-start gap-3">
  //           <div className="flex-1">
  //             <div className="h-4 bg-gray-400 rounded mb-1"></div>
  //             <div className="h-3 bg-gray-400 rounded w-1/2"></div>
  //           </div>
  //           <div className="w-16 h-6 bg-gray-400 rounded-full"></div>
  //         </div>
  //         <div className="flex items-center gap-4">
  //           <div className="h-4 bg-gray-400 rounded w-8"></div>
  //           <div className="h-4 bg-gray-400 rounded w-8"></div>
  //           <div className="h-4 bg-gray-400 rounded w-8"></div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const carouselOptions = useMemo(
    () => ({
      loop: weeklyDiscounts.length > 4,
      margin: 10,
      nav: weeklyDiscounts.length > 4,
      dots: false,
      autoplay: weeklyDiscounts.length > 4,
      autoplayTimeout: 4000,
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

      <div className="relative OffersCarousel PropertiesCarousel -ms-[15px]">
        <OwlCarousel
          className="owl-theme"
          {...carouselOptions}
          style={{
            direction: weeklyDiscounts.length > 4 && isRTL ? "ltr" : "ltr",
          }}
        >
          {
            // isLoading ? (
            //   // Show skeleton loaders
            //   Array.from({ length: 4 }).map((_, index) => (
            //     <SkeletonCard key={index} />
            //   ))
            // ) :

            weeklyDiscounts.length > 0 ? (
              weeklyDiscounts.map((offer) => {
                const restaurant = getRestaurantById(offer.companyId);
                if (!restaurant) return null;

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
                      {/* Top Section - Dynamic Color Background */}
                      <div
                        className={`${restaurant.topColor} relative h-24 flex items-center justify-between px-3`}
                      >
                        {/* Restaurant Logo */}
                        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg relative z-10">
                          <img
                            src={getOfferImage(offer.image)}
                            alt={offer.title[isRTL ? "ar" : "en"]}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>

                        {/* Right Side - Restaurant Info */}
                        <div className="flex-1 text-right ms-2 text-start">
                          <h3 className="text-white font-bold text-base mb-1 cursor-pointer hover:text-gray-200 transition-colors">
                            {offer.title[isRTL ? "ar" : "en"]}
                          </h3>
                          <div className="flex items-center justify-start gap-1 text-white text-xs">
                            <FaMapMarkerAlt className="text-xs" />
                            <span>
                              {restaurant.location[isRTL ? "ar" : "en"]},{" "}
                              {restaurant.distance}
                            </span>
                          </div>
                        </div>
                        {/* Left Side - Icons */}
                        <div className="flex gap-2">
                          <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all duration-200">
                            <BsHeart className="text-white text-sm" />
                          </div>
                          <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all duration-200">
                            <BsShare className="text-white text-sm" />
                          </div>
                        </div>
                        {/* Wavy Separator */}
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

                      {/* Bottom Section - White Background */}
                      <div className="p-4 h-28 flex flex-col justify-between">
                        {/* Discount Badge and Offer */}
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h4 className="text-black font-bold text-sm mb-1 leading-tight">
                              {offer.title[isRTL ? "ar" : "en"]}
                            </h4>
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                                onClick={(e) =>
                                  handleCategoryClick(
                                    e,
                                    restaurant.category.key
                                  )
                                }
                              >
                                {restaurant.category[isRTL ? "ar" : "en"]}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span
                                className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
                                onClick={(e) =>
                                  handleRestaurantClick(
                                    e,
                                    restaurant.id,
                                    restaurant.category.key
                                  )
                                }
                              >
                                {restaurant.name[isRTL ? "ar" : "en"]}
                              </span>
                            </div>
                          </div>
                          <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex-shrink-0">
                            {offer.discountPercentage}% {isRTL ? "خصم" : "OFF"}
                          </div>
                        </div>

                        {/* Stats Row */}
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
            )
          }
        </OwlCarousel>
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

export default WeeklyDiscountsSection;

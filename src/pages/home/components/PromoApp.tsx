import { useState, useEffect } from "react";
import { PromoAppImage, OurAppPattern2 } from "@assets";
import { useIsRTL } from "@hooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { t } from "i18next";

interface SlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  feature1: string;
  feature2: string;
}

// slides are defined using i18n to support translation
const buildSlides = (): SlideData[] => [
  {
    id: 1,
    title: t("promo-app.slide1.title", {
      defaultValue: "Get your Promotion Application",
    }),
    description: t("promo-app.slide1.description", {
      defaultValue:
        "Mukafaat is your premier partner for all your event management needs in Saudi Arabia.",
    }),
    image: PromoAppImage,
    feature1: t("promo-app.slide1.feature1", {
      defaultValue: "Easy to use interface",
    }),
    feature2: t("promo-app.slide1.feature2", {
      defaultValue: "Real-time updates",
    }),
  },
  {
    id: 2,
    title: t("promo-app.slide2.title", {
      defaultValue: "Download Our Event App",
    }),
    description: t("promo-app.slide2.description", {
      defaultValue:
        "Manage your events with our comprehensive mobile application designed for professionals.",
    }),
    image: PromoAppImage,
    feature1: t("promo-app.slide2.feature1", {
      defaultValue: "Event scheduling",
    }),
    feature2: t("promo-app.slide2.feature2", {
      defaultValue: "Client management",
    }),
  },
  {
    id: 3,
    title: t("promo-app.slide3.title", {
      defaultValue: "Professional Event Tools",
    }),
    description: t("promo-app.slide3.description", {
      defaultValue:
        "Access powerful tools and features to streamline your event planning process.",
    }),
    image: PromoAppImage,
    feature1: t("promo-app.slide3.feature1", {
      defaultValue: "Advanced analytics",
    }),
    feature2: t("promo-app.slide3.feature2", {
      defaultValue: "Multi-language support",
    }),
  },
];

const PromoApp = () => {
  const isRTL = useIsRTL();
  const slides = buildSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [isTransitioning, slides.length]);

  const handleSlideChange = (newSlide: number) => {
    if (newSlide !== currentSlide && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide(newSlide);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const nextSlide = () => {
    handleSlideChange((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    handleSlideChange((currentSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    handleSlideChange(index);
  };

  const currentSlideData = slides[currentSlide];

  // Touch/swipe navigation
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart) {
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      className="py-10 bg-white relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10 mt-mobile-24">
          {/* Left Column - Text Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            {/* Header */}
            <div className="text-center lg:text-start">
              <h2
                className={`font-size-mobile-heading text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight transition-all duration-700 ${
                  isTransitioning
                    ? "opacity-0 transform translate-y-4"
                    : "opacity-100 transform translate-y-0"
                }`}
              >
                <span className="text-[#fd671a]">
                  {currentSlideData.title.split(" ")[0]}
                </span>{" "}
                {currentSlideData.title.split(" ").slice(1).join(" ")}
              </h2>
            </div>

            {/* Description */}
            <p
              className={`text-gray-600 text-base sm:text-lg leading-relaxed transition-all duration-700 delay-100 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              {currentSlideData.description}
            </p>

            {/* Features List */}
            <div
              className={`space-y-3 sm:space-y-4 transition-all duration-700 delay-200 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-4"
                  : "opacity-100 transform translate-y-0"
              }`}
            >
              <div
                className={`flex items-center ${
                  isRTL ? "space-x-reverse" : ""
                } space-x-2 sm:space-x-3`}
              >
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#A4DB74" }}
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span
                  className={`text-sm sm:text-base font-semibold ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {currentSlideData.feature1}
                </span>
              </div>
              <div
                className={`flex items-center ${
                  isRTL ? "space-x-reverse" : ""
                } space-x-2 sm:space-x-3`}
              >
                <div
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#A4DB74" }}
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span
                  className={`text-sm sm:text-base font-semibold ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {currentSlideData.feature2}
                </span>
              </div>
            </div>

            {/* App Download Buttons */}
            <div className="flex flex-row gap-4">
              <button className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg
                  className="w-8 h-8 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg
                  className="w-8 h-8 mr-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Mobile App Interface */}
          <div className="relative order-1 lg:order-2">
            <img
              src={currentSlideData.image}
              alt="Promotion App Interface"
              className={`w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0 h-auto rounded-lg z-1 transition-all duration-700 hover:scale-105 ${
                isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className={`absolute ${
            isRTL ? "right-2 sm:right-4" : "left-2 sm:left-4"
          } top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
          aria-label="Previous slide"
        >
          {isRTL ? (
            <FaChevronRight className="text-base sm:text-lg" />
          ) : (
            <FaChevronLeft className="text-base sm:text-lg" />
          )}
        </button>

        <button
          onClick={nextSlide}
          className={`absolute ${
            isRTL ? "left-2 sm:left-4" : "right-2 sm:right-4"
          } top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full transition-all duration-300 z-10 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500`}
          aria-label="Next slide"
        >
          {isRTL ? (
            <FaChevronLeft className="text-base sm:text-lg" />
          ) : (
            <FaChevronRight className="text-base sm:text-lg" />
          )}
        </button>

        {/* Dots Indicator */}
        <div className="hideinmobile flex justify-center -mt-8 sm:-mt-12 lg:-mt-16 gap-1.5 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#fd671a] rounded-full"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-300 rounded-full hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Background Pattern */}
        <div
          className={`absolute bottom-0 w-1/3 sm:w-1/2 ${
            isRTL ? "left-0" : "right-0"
          } z-0 hidden sm:block`}
        >
          <img
            src={OurAppPattern2}
            alt="App Pattern"
            className="h-auto animate-float"
          />
        </div>
      </div>
    </section>
  );
};

export default PromoApp;

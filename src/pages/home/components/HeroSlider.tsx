import { IoIosArrowRoundForward } from "react-icons/io";
import {
  // FaChevronLeft,
  // FaChevronRight,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// Import background images
import // CarIcon,
// CoffeeIcon,
// DeliveryIcon,
// HeadphoneIcon,
// HotelIcon,
// RestaurantIcon,
// ShopIcon,
"@assets";
import { FaXTwitter } from "react-icons/fa6";
// import CategoryCard from "../../../components/CategoryCard";
import CategorySection from "@pages/offers/components/CategorySection";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiResponseToHeroSlides } from "@network/mappers/heroSlidesMapper";

const DEFAULT_SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
];
const DEFAULT_GRADIENTS = [
  "linear-gradient(135deg, rgba(64, 1, 152, 0.8) 0%, rgba(253, 103, 26, 0.6) 100%)",
  "linear-gradient(135deg, rgba(253, 103, 26, 0.8) 0%, rgba(64, 1, 152, 0.6) 100%)",
  "linear-gradient(135deg, rgba(64, 1, 152, 0.7) 0%, rgba(253, 103, 26, 0.5) 50%, rgba(64, 1, 152, 0.7) 100%)",
];

const HeroSlider = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { data: webHomeResponse, isSuccess } = useWebHome();

  const fallbackSlides = useMemo(
    () => [
      {
        title: t("home.hero.slides.slide1.title"),
        description: t("home.hero.slides.slide1.description"),
        background: DEFAULT_SLIDE_IMAGES[0],
        gradient: DEFAULT_GRADIENTS[0],
      },
      {
        title: t("home.hero.slides.slide2.title"),
        description: t("home.hero.slides.slide2.description"),
        background: DEFAULT_SLIDE_IMAGES[1],
        gradient: DEFAULT_GRADIENTS[1],
      },
      {
        title: t("home.hero.slides.slide3.title"),
        description: t("home.hero.slides.slide3.description"),
        background: DEFAULT_SLIDE_IMAGES[2],
        gradient: DEFAULT_GRADIENTS[2],
      },
    ],
    [t]
  );

  const apiSlides = useMemo(() => {
    if (!isSuccess || !webHomeResponse) return [];
    const list = mapApiResponseToHeroSlides(webHomeResponse);
    return list.map((s, i) => ({
      title: s.title,
      description: s.description,
      background:
        s.background || DEFAULT_SLIDE_IMAGES[i % DEFAULT_SLIDE_IMAGES.length],
      gradient: s.gradient || DEFAULT_GRADIENTS[i % DEFAULT_GRADIENTS.length],
    }));
  }, [isSuccess, webHomeResponse]);

  const slides = apiSlides.length > 0 ? apiSlides : fallbackSlides;

  useEffect(() => {
    if (currentSlide >= slides.length)
      setCurrentSlide(Math.max(0, slides.length - 1));
  }, [slides.length, currentSlide]);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsTransitioning(false), 500);
      }, 300);
    }
  }, [isTransitioning, slides.length]);

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isTransitioning, currentSlide, nextSlide]);

  // const prevSlide = () => {
  //   if (!isTransitioning) {
  //     setIsTransitioning(true);
  //     setTimeout(() => {
  //       setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  //       setTimeout(() => setIsTransitioning(false), 500);
  //     }, 300);
  //   }
  // };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setTimeout(() => setIsTransitioning(false), 500);
      }, 300);
    }
  };

  const currentSlideData = slides[currentSlide];

  // Categories data
  // const categories = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       icon: RestaurantIcon,
  //       title: t("home.categories.restaurants"),
  //       alt: t("home.categories.restaurants"),
  //     },
  //     {
  //       id: 2,
  //       icon: CoffeeIcon,
  //       title: t("home.categories.cafes"),
  //       alt: t("home.categories.cafes"),
  //     },
  //     {
  //       id: 3,
  //       icon: HeadphoneIcon,
  //       title: t("home.categories.entertainment"),
  //       alt: t("home.categories.entertainment"),
  //     },
  //     {
  //       id: 4,
  //       icon: ShopIcon,
  //       title: t("home.categories.shops"),
  //       alt: t("home.categories.shops"),
  //     },
  //     {
  //       id: 5,
  //       icon: HotelIcon,
  //       title: t("home.categories.hotels"),
  //       alt: t("home.categories.hotels"),
  //     },
  //     {
  //       id: 6,
  //       icon: CarIcon,
  //       title: t("home.categories.cars"),
  //       alt: t("home.categories.cars"),
  //     },
  //     {
  //       id: 7,
  //       icon: DeliveryIcon,
  //       title: t("home.categories.delivery"),
  //       alt: t("home.categories.delivery"),
  //     },
  //   ],
  //   [t]
  // );

  return (
    <>
      <section
        className="relative container mx-auto rounded-xl w-full overflow-hidden bg-[#400198] z-10"
        style={{
          marginTop: "77px",
          height: "calc(70vh - 76px)",
        }}
        role="region"
        aria-label="Hero section"
        title="Mukafaat Hero Section"
      >
        {/* Background Images with Animation */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover  bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? isTransitioning
                  ? "opacity-0 scale-110"
                  : "opacity-100 scale-100"
                : "opacity-0 scale-100"
            }`}
            style={{
              backgroundImage: `url(${slide.background})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                background: slide.gradient,
              }}
              aria-hidden="true"
            ></div>
          </div>
        ))}

        {/* Social Media Icons - Left Side */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 z-10 hidden lg:block ${
            document.documentElement.dir === "rtl" ? "left-8" : "right-8"
          }`}
        >
          <div className="flex flex-col space-y-4">
            {/* Vertical Line */}
            <div className="w-0.5 h-8 bg-white mx-auto"></div>

            {/* Facebook */}
            <button className="w-10 h-10 bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <FaFacebook />
              </div>
            </button>

            {/* Instagram */}
            <button className="w-10 h-10 bg-white/40  backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <FaInstagram />
              </div>
            </button>

            {/* Twitter */}
            <button className="w-10 h-10 bg-white/40  backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <FaXTwitter />
              </div>
            </button>

            {/* YouTube */}
            <button className="w-10 h-10 bg-white/40  backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
              <div className="w-5 h-5 flex items-center justify-center">
                <FaYoutube />
              </div>
            </button>
          </div>
        </div>

        {/* Content - Centered with Animation */}
        <div className="relative z-8 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl">
            <h1
              className={`text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl font-semibold leading-tight   mb-3 transition-all duration-700 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-8 blur-sm"
                  : "opacity-100 transform translate-y-0 blur-0"
              }`}
              style={{
                fontFamily:
                  document.documentElement.dir === "rtl"
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                color: "#fff",
              }}
              aria-live="polite"
            >
              {currentSlideData.title}
            </h1>

            <p
              className={`text-base sm:text-lg md:text-lg lg:text-lg leading-relaxed   mb-8 max-w-3xl mx-auto transition-all font-semibold duration-700 delay-200 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-8 blur-sm"
                  : "opacity-100 transform translate-y-0 blur-0"
              }`}
              style={{
                color: "#fff",
                fontWeight: 400,
                fontFamily:
                  document.documentElement.dir === "rtl"
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
              }}
              aria-live="polite"
            >
              {currentSlideData.description}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-400 ${
                isTransitioning
                  ? "opacity-0 transform translate-y-8 blur-sm"
                  : "opacity-100 transform translate-y-0 blur-0"
              }`}
            >
              <button
                onClick={() => navigate("/offers")}
                className="hover:scale-105 transition-transform duration-300 text-md sm:text-md px-8 sm:px-8 lg:px-8 py-4 sm:py-4 font-semibold rounded-full text-white flex items-center gap-2"
                style={{ backgroundColor: "#fd671a" }}
                aria-label="View offers"
              >
                {t("home.hero.viewMore")}
                <IoIosArrowRoundForward className="text-3xl transform -rotate-45" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Left and Right */}
        {/* <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className={`absolute bottom-10 transform bg-white/20 hover:bg-white/30 focus:bg-white/40 text-white p-3 rounded-full transition-all duration-300 z-10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed ${
            document.documentElement.dir === "rtl" ? "left-4" : "left-4"
          }`}
          aria-label="Previous slide"
          title="Previous slide"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className={`absolute bottom-10 transform bg-white/20 hover:bg-white/30 focus:bg-white/40 text-white p-3 rounded-full transition-all duration-300 z-10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed ${
            document.documentElement.dir === "rtl" ? "right-4" : "right-4"
          }`}
          aria-label="Next slide"
          title="Next slide"
        >
          <FaChevronRight className="text-xl" />
        </button> */}

        {/* Dots Navigation - Bottom with Animation */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
          <div
            className={`flex ${
              document.documentElement.dir === "rtl"
                ? "space-x-reverse space-x-3"
                : "space-x-3"
            }`}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-8 h-2 rounded-md transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed ${
                  index === currentSlide
                    ? "bg-white scale-100 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-90"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                title={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Search Bar */}
      </section>
      {/* <section
        className="relative container mx-auto rounded-xl w-full"
        style={{}}
      >
        <div
          className="w-full max-w-5xl px-4 z-10 mx-auto"
          style={{
            marginTop: "-50px",
          }}
        >
          <div className="hidden lg:block">
            <div className="bg-white rounded-full shadow-xl py-2 px-5 flex items-center">
              <div
                className={`flex-1 flex items-center px-3 py-3 ${
                  document.documentElement.dir === "rtl"
                    ? "border-l border-gray-200"
                    : "border-r border-gray-200"
                }`}
              >
                <SlLocationPin
                  className={`text-gray-400 text-2xl ${
                    document.documentElement.dir === "rtl" ? "ml-4" : "mr-4"
                  }`}
                />
                <div className="flex-1">
                  <label className="block text-black font-bold text-sm mb-0 ">
                    {t("search.location.label")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("search.location.placeholder")}
                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>

              <div
                className={`flex-1 flex items-center px-3 py-3 ${
                  document.documentElement.dir === "rtl"
                    ? "border-l border-gray-200"
                    : "border-r border-gray-200"
                }`}
              >
                <IoHomeOutline
                  className={`text-gray-400 text-2xl ${
                    document.documentElement.dir === "rtl" ? "ml-2" : "mr-2"
                  }`}
                />
                <div className="flex-1">
                  <label className="block text-black font-bold text-sm mb-0 px-4">
                    {t("search.propertyType.label")}
                  </label>
                  <Select
                    options={propertyTypeOptions}
                    styles={customStyles}
                    placeholder={t("search.propertyType.placeholder")}
                    isSearchable
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div
                  className={`flex flex-col gap-0 ${
                    document.documentElement.dir === "rtl" ? "mr-2" : "ml-2"
                  }`}
                >
                  <IoChevronDown className="text-gray-400 text-xs transform rotate-180" />
                  <IoChevronDown className="text-gray-400 text-xs" />
                </div>
              </div>

              <div className="flex-1 flex items-center px-3 py-3 ">
                <IoBedOutline
                  className={`text-gray-400 text-2xl ${
                    document.documentElement.dir === "rtl" ? "ml-2" : "mr-2"
                  }`}
                />
                <div className="flex-1">
                  <label className="block text-black font-bold text-sm mb-0 px-2">
                    {t("search.bedsBaths.label")}
                  </label>
                  <Select
                    options={bedsBathsOptions}
                    styles={customStyles}
                    placeholder={t("search.bedsBaths.placeholder")}
                    isSearchable
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
                <div
                  className={`flex flex-col gap-0 ${
                    document.documentElement.dir === "rtl" ? "mr-2" : "ml-2"
                  }`}
                >
                  <IoChevronDown className="text-gray-400 text-xs transform rotate-180" />
                  <IoChevronDown className="text-gray-400 text-xs" />
                </div>
              </div>

              <button
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-all duration-300 ${
                  document.documentElement.dir === "rtl" ? "mr-4" : "ml-4"
                }`}
                style={{ backgroundColor: "#400198" }}
              >
                <IoSearchOutline className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="lg:hidden">
            <div className="bg-white rounded-2xl shadow-xl p-4 space-y-4">
              <div className="flex items-center px-3 py-3 border border-gray-200 rounded-xl">
                <SlLocationPin
                  className={`text-gray-400 text-xl ${
                    document.documentElement.dir === "rtl" ? "ml-3" : "mr-3"
                  }`}
                />
                <div className="flex-1">
                  <label className="block text-black font-bold text-sm mb-1">
                    {t("search.location.label")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("search.location.placeholder")}
                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center px-3 py-3 border border-gray-200 rounded-xl">
                <IoHomeOutline
                  className={`text-gray-400 text-xl ${
                    document.documentElement.dir === "rtl" ? "ml-3" : "mr-3"
                  }`}
                />
                <div className="flex-1">
                  <label className="block text-black font-bold text-sm mb-1">
                    {t("search.propertyType.label")}
                  </label>
                  <Select
                    options={propertyTypeOptions}
                    styles={{
                      ...customStyles,
                      control: (provided) => ({
                        ...provided,
                        border: "none",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                        minHeight: "auto",
                        padding: 0,
                      }),
                    }}
                    placeholder={t("search.propertyType.placeholder")}
                    isSearchable
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>

              <div className="flex items-center px-3 py-3 border border-gray-200 rounded-xl">
                <IoBedOutline
                  className={`text-gray-400 text-xl ${
                    document.documentElement.dir === "rtl" ? "ml-3" : "mr-3"
                  }`}
                />
                <div className="flex-1">
                  <label className="block text-black font-bold text-sm mb-1">
                    {t("search.bedsBaths.label")}
                  </label>
                  <Select
                    options={bedsBathsOptions}
                    styles={{
                      ...customStyles,
                      control: (provided) => ({
                        ...provided,
                        border: "none",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                        minHeight: "auto",
                        padding: 0,
                      }),
                    }}
                    placeholder={t("search.bedsBaths.placeholder")}
                    isSearchable
                    isClearable
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </div>
              </div>

              <button
                className="w-full h-12 rounded-xl flex items-center justify-center text-white font-semibold hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: "#400198" }}
              >
                <IoSearchOutline className="text-xl me-2" />
                {t("search.searchButton")}
              </button>
            </div>
          </div>
        </div>
      </section> */}

      <CategorySection />
    </>
  );
};

export default HeroSlider;

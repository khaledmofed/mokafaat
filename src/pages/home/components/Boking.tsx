import React, { useState, useMemo } from "react";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PatternNewProperty } from "@assets";
import OwlCarousel from "react-owl-carousel";
import { IoIosArrowRoundForward } from "react-icons/io";
import InvestmentCard from "./InvestmentCard";
import { bookingProperties } from "./bookingData";

const Boking: React.FC = () => {
  const isRTL = useIsRTL();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Filter options
  const filters = [
    {
      key: "all",
      label: t("home.bookings.filters.all"),
      count: bookingProperties.length,
    },
    {
      key: "cars",
      label: t("home.bookings.filters.cars"),
      count: bookingProperties.filter((item) => item.category === "cars")
        .length,
    },
    {
      key: "hotels",
      label: t("home.bookings.filters.hotels"),
      count: bookingProperties.filter((item) => item.category === "hotels")
        .length,
    },
    {
      key: "flights",
      label: t("home.bookings.filters.flights"),
      count: bookingProperties.filter((item) => item.category === "flights")
        .length,
    },
  ];

  // Filtered properties based on active filter
  const filteredProperties = useMemo(() => {
    if (activeFilter === "all") {
      return bookingProperties;
    }
    return bookingProperties.filter(
      (property) => property.category === activeFilter
    );
  }, [activeFilter]);

  const owlCarouselOptions = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
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
  };

  const handleShare = (id: number) => {
    console.log("Share clicked:", id);
  };

  return (
    <section className="pb-16 pt-20 lg:pb-20 relative overflow-hidden">
      <div className="container mx-auto relative px-4 z-10">
        <div className={`space-y-6`}>
          {/* Header */}
          <div className="text-start mb-4">
            <h2 className="text-[#400198] text-3xl font-bold">
              {t("home.bookings.title")}
            </h2>
            <p className="text-md text-gray-700 leading-relaxed">
              {t("home.bookings.description")}
            </p>
          </div>
        </div>
        <div className="block lg:flex gap-12 justify-between items-end">
          {/* Left Section - Content */}

          <div className="flex justify-start mb-0 gap-3 relative z-10">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                  activeFilter === filter.key
                    ? "bg-[#400198] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                style={{
                  fontFamily: isRTL
                    ? "Readex Pro, sans-serif"
                    : "Jost, sans-serif",
                }}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-0">
            <button
              onClick={() => navigate("/bookings")}
              className="bg-[#400198] lg:mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2"
              style={{
                marginTop: "0px",
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              <span>{t("home.bookings.viewAll")}</span>
              <IoIosArrowRoundForward
                className={`text-3xl transform ${
                  isRTL ? "rotate-45" : "-rotate-45"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Booking Properties Carousel */}
        <div className="mt-0 InvestmentCarousel">
          <OwlCarousel
            key={activeFilter} // إضافة key لضمان إعادة التحميل عند تغيير الفلتر
            className="owl-theme"
            {...owlCarouselOptions}
            style={{
              direction: "ltr",
            }}
          >
            {filteredProperties.map((property) => (
              <div key={property.id} className="item">
                <InvestmentCard {...property} onShare={handleShare} />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>

      <div
        className={`absolute -top-40 w-1/1 sm:w-1/1 ${
          isRTL ? "left-0" : "right-0"
        } z-0 hidden sm:block`}
      >
        <img
          src={PatternNewProperty}
          alt={t("worldwideProperties.appPattern")}
          className="h-auto animate-float"
        />
      </div>
    </section>
  );
};

export default Boking;

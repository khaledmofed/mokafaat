import { LoadingSpinner } from "@components";
import { portfolioCarouselResponsive } from "@constants";
import useGetPaginationQuery from "@hooks/api/useGetPaginationQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { t } from "i18next";
import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { useIsRTL } from "@hooks";
import {
  PortfolioEv1,
  PortfolioEv2,
  PortfolioEv3,
  PortfolioEv4,
} from "@assets";

const PortfolioWithTabs = () => {
  const [activeTab, setActiveTab] = useState("events");
  const isRTL = useIsRTL();

  const { data, isLoading } = useGetPaginationQuery({
    endpoint: API_ENDPOINTS.getEvents,
    perPage: 12,
    query: "getEvents",
  });

  const tabs = [
    { id: "events", label: t("portfolio.tabs.events") },
    { id: "promotion", label: t("portfolio.tabs.promotion") },
    { id: "logistic", label: t("portfolio.tabs.logistic") },
  ];

  // Mock data for promotion and logistic tabs
  const mockPromotionItems = [
    {
      id: 1,
      image: PortfolioEv1,
      title: "Marketing Campaign",
      subtitle: "Digital",
      description: "Social Media",
      location: "Saudi Arabia",
    },
    {
      id: 2,
      image: PortfolioEv2,
      title: "Brand Launch",
      subtitle: "Product",
      description: "Launch Event",
      location: "Riyadh",
    },
    {
      id: 5,
      image: PortfolioEv3,
      title: "Supply Chain",
      subtitle: "Management",
      description: "Logistics",
      location: "Jeddah",
    },
    {
      id: 6,
      image: PortfolioEv4,
      title: "Transportation",
      subtitle: "Services",
      description: "Delivery",
      location: "Dammam",
    },
  ];

  const mockLogisticItems = [
    {
      id: 1,
      image: PortfolioEv3,
      title: "Supply Chain",
      subtitle: "Management",
      description: "Logistics",
      location: "Jeddah",
    },
    {
      id: 2,
      image: PortfolioEv4,
      title: "Transportation",
      subtitle: "Services",
      description: "Delivery",
      location: "Dammam",
    },
    {
      id: 33,
      image: PortfolioEv2,
      title: "Brand Launch",
      subtitle: "Product",
      description: "Launch Event",
      location: "Riyadh",
    },
    {
      id: 43,
      image: PortfolioEv1,
      title: "Brand Launch",
      subtitle: "Product",
      description: "Launch Event",
      location: "Riyadh",
    },
  ];

  const getCurrentItems = () => {
    if (activeTab === "events") {
      // Always return events data if available, regardless of loading state
      if (data?.pages) {
        return data.pages.flatMap((page) =>
          page.events && page.events.length > 0 ? page.events : []
        );
      }
      return [];
    } else if (activeTab === "promotion") {
      return mockPromotionItems;
    } else if (activeTab === "logistic") {
      return mockLogisticItems;
    }
    return [];
  };

  const currentItems = getCurrentItems();

  // Monitor data changes
  useEffect(() => {
    console.log("Data changed:", data?.pages);
  }, [data]);

  console.log("activeTab:", activeTab);
  console.log("currentItems:", currentItems);
  console.log("data?.pages:", data?.pages);

  return (
    <section className="py-16" style={{ backgroundColor: "#F7F8FB" }}>
      <div className="w-full mx-auto px-0">
        <div className="space-y-8 portfolio-container">
          {/* Header Section - Text Content */}
          <div className="space-y-6 container mx-auto">
            {/* Subtitle */}
            <div className="flex justify-center items-center flex-mobile">
              <div className="">
                <span className="text-[#fd671a] text-md font-semibold">
                  {t("portfolio.subtitle")}
                </span>

                {/* Main Heading */}
                <h2 className="font-size-mobile-heading text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {t("portfolio.title")}
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-md leading-relaxed max-w-2xl mx-auto text-start">
                {t("portfolio.description")}
              </p>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="container mx-auto flex justify-start gap-4 portfolio-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${
                  activeTab === tab.id
                    ? "bg-[#fd671a] text-white border-[#fd671a]"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Portfolio Slider Section */}
          <div className="relative w-full mx-auto">
            {isLoading && activeTab === "events" ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : currentItems.length > 0 ? (
              <div
                dir="ltr"
                className="overflow-hidden py-4 max-w-screen-2xl mx-auto"
              >
                <OwlCarousel
                  className="owl-theme portfolio-carousel"
                  loop
                  margin={10}
                  autoplayTimeout={10500}
                  autoplay
                  animateOut
                  animateIn
                  responsive={portfolioCarouselResponsive}
                >
                  {currentItems.map((item) => (
                    <div
                      className="item overflow-hidden wow fadeIn relative group cursor-pointer rounded-lg"
                      data-wow-delay="0.2s"
                      key={item.id}
                    >
                      <img
                        src={item.image}
                        alt="portfolio item"
                        className="h-60 md:h-72 object-cover transition-transform duration-400 ease-in-out transform hover:scale-105 rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/400x300/CCCCCC/666666?text=No+Image";
                        }}
                      />

                      {/* Overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1D0843] via-transparent to-transparent flex flex-col justify-end p-6 group-hover:from-[#1D0843]/90 transition-all duration-300">
                        <div className="text-white">
                          {activeTab === "events" ? (
                            <>
                              <div className="text-lg font-bold mb-2">
                                {isRTL ? item.arTitle : item.enTitle}
                              </div>
                              <div className="text-sm opacity-90">
                                {new Date(item.createdAt).toLocaleDateString(
                                  isRTL ? "ar-SA" : "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-sm font-medium mb-1">
                                {item.title}
                              </div>
                              <div className="text-lg font-bold mb-2">
                                {item.subtitle}
                              </div>
                              <div className="text-xs mb-2">
                                {item.description}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                No items found
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioWithTabs;

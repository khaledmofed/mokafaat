import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { PatternNewProperty } from "@assets";
import OwlCarousel from "react-owl-carousel";
import { IoIosArrowRoundForward } from "react-icons/io";
import NewsCard from "./NewsCard";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import {
  mapApiNewsToModels,
  type NewsArticleModel,
} from "@network/mappers/newsMapper";

// Export news articles data (kept for backward compatibility, but will use API data)
export const newsArticles: NewsArticleModel[] = [];

const NewsBlogs: React.FC = () => {
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const { t } = useTranslation();

  // Fetch news from API
  const { data: webHomeResponse } = useWebHome();

  // Extract news from API response
  const apiNews = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const news = data?.news as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(news)) return [];
    return news;
  }, [webHomeResponse]);

  // Map API news to frontend models
  const newsArticles = useMemo(() => {
    return mapApiNewsToModels(apiNews);
  }, [apiNews]);

  const owlCarouselOptions1 = {
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

  const handleVisit = (id: number) => {
    console.log("Visit clicked:", id);
  };

  return (
    <section className="pb-16 lg:pb-32 relative overflow-hidden pt-10 lg:pt-20">
      <div className="container mx-auto relative px-4 z-10">
        <div className="block lg:flex gap-12 justify-between items-end">
          {/* Left Section - Content */}

          <div className={`space-y-6`}>
            {/* Header */}
            <div className="text-start mb-0">
              <h2 className="text-[#400198] text-3xl font-bold">
                {t("newsBlogs.subtitle")}
              </h2>
              <p className="text-md text-gray-700 leading-relaxed">
                {t("newsBlogs.mainTitle")}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              onClick={() => navigate("/blogs")}
              className="bg-[#400198] lg:mx-auto hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center gap-2"
              style={{
                marginTop: "0px",
                fontFamily: isRTL
                  ? "Readex Pro, sans-serif"
                  : "Jost, sans-serif",
              }}
            >
              <span>{t("newsBlogs.viewBlogs")}</span>
              <IoIosArrowRoundForward
                className={`text-3xl transform ${
                  isRTL ? "rotate-45" : "-rotate-45"
                }`}
              />
            </button>
          </div>
        </div>

        {/* News Articles Carousel */}
        <div className="mt-0 InvestmentCarousel NewsCarousel">
          <OwlCarousel
            key={newsArticles.length}
            className="owl-theme"
            {...owlCarouselOptions1}
            style={{
              direction: "ltr",
            }}
          >
            {newsArticles.map((article) => (
              <div key={article.id} className="item">
                <NewsCard
                  {...article}
                  onShare={handleShare}
                  onVisit={handleVisit}
                />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>

      <div
        className={`absolute -bottom-40 w-1/1 sm:w-1/1 ${
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

export default NewsBlogs;

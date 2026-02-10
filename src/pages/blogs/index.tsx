import React, { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { useIsRTL } from "@hooks";

import FAQSection from "@pages/home/components/FAQSection";
import { useNavigate, useLocation } from "react-router-dom";
import NewsCard from "@pages/home/components/NewsCard";
import Pagination from "../../components/Pagination";
import { useInquiryModal } from "@context";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiNewsToModels } from "@network/mappers/newsMapper";
import type { NewsArticleModel } from "@network/mappers/newsMapper";

const ALL_CATEGORY_KEY = "__all__";

const BlogsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = useIsRTL();
  const { openModal } = useInquiryModal();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedCategory, setSelectedCategory] =
    useState<string>(ALL_CATEGORY_KEY);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const { data: webHomeResponse } = useWebHome();

  const newsList = useMemo((): NewsArticleModel[] => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const news = data?.news as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(news)) return [];
    return mapApiNewsToModels(news);
  }, [webHomeResponse]);

  const categories = useMemo(() => {
    const allLabel = {
      key: ALL_CATEGORY_KEY,
      ar: "جميع الفئات",
      en: "All Category",
    };
    const byKey = new Map<string, { key: string; ar: string; en: string }>();
    byKey.set(ALL_CATEGORY_KEY, allLabel);
    newsList.forEach((article) => {
      if (article.category && !byKey.has(article.category)) {
        byKey.set(article.category, {
          key: article.category,
          ar: article.categoryAr,
          en: article.categoryEn,
        });
      }
    });
    return Array.from(byKey.values());
  }, [newsList]);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(String(location.state.selectedCategory));
      setCurrentPage(1);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const filteredNews = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY_KEY) return newsList;
    return newsList.filter((article) => article.category === selectedCategory);
  }, [selectedCategory, newsList]);

  const allNews = filteredNews;

  // Pagination logic
  const totalPages = Math.ceil(allNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = allNews.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of blogs section
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setCurrentPage(1);
  };

  const toggleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };

  const handleNewsClick = (news: NewsArticleModel) => {
    navigate(`/blogs/${news.slug}`);
  };

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? "المدونة والأخبار - مكافئات" : "Blogs & News - Mukafaat"}
        </title>
        <meta
          name="description"
          content={
            isRTL
              ? "اقرأ أحدث المقالات والأخبار حول العروض والخصومات والبطاقات والكوبونات والحجوزات في المملكة العربية السعودية"
              : "Read our latest blogs and news about offers, discounts, cards, coupons, and bookings in Saudi Arabia."
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "72px" }}>
        {/* Listing Header */}
        <div className="bg-white pb-6">
          <div className="container mx-auto px-4 lg:px-0 py-0">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-[#141414] font-medium mb-4 pt-4">
              <HiOutlineHome className="me-2 text-lg" />
              <span
                className="cursor-pointer hover:text-[#fd671a] transition-colors"
                onClick={() => navigate("/")}
              >
                {isRTL ? "الرئيسية" : "Home"}
              </span>
              <BsChevronDown
                className={`mx-2 transform ${
                  isRTL ? "rotate-90" : "rotate-[270deg]"
                }`}
              />
              <span
                className="cursor-pointer hover:text-[#fd671a] transition-colors"
                onClick={() => navigate("/blogs")}
              >
                {isRTL ? "المدونة والأخبار" : "Blogs & News"}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2">
                <h1
                  className="text-[#400198] text-3xl font-bold"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {isRTL ? "مدونة مكافئات" : "Mukafaat Blog"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {isRTL
                    ? "اكتشف أفضل المقالات والنصائح حول العروض والخصومات والبطاقات والكوبونات والحجوزات في المملكة العربية السعودية. وفر المال واستمتع بأفضل الخدمات"
                    : "Discover the best articles and tips about offers, discounts, cards, coupons, and bookings in Saudi Arabia. Save money and enjoy the best services"}
                </p>
              </div>
            </div>

            {/* Category Filter Bar */}
            <div className="mt-6">
              <div className="flex flex-wrap gap-3">
                {categories
                  .slice(0, showMoreCategories ? categories.length : 6)
                  .map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => handleCategoryChange(cat.key)}
                      className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg  ${
                        selectedCategory === cat.key
                          ? "bg-[#400198] text-white"
                          : "bg-white text-[#4C4C4C] border border-gray-300 hover:border-[#400198]"
                      }`}
                    >
                      {isRTL ? cat.ar : cat.en}
                    </button>
                  ))}
                {categories.length > 6 && (
                  <button
                    onClick={toggleShowMoreCategories}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white text-[#4C4C4C] border border-gray-300 hover:border-[#400198] transition-all duration-200"
                  >
                    {showMoreCategories
                      ? isRTL
                        ? "عرض أقل"
                        : "Show Less"
                      : isRTL
                      ? "عرض المزيد"
                      : "Show More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* News Listings */}
        <div className="bg-white">
          <div className="container mx-auto px-4 lg:px-0 pb-4">
            <div className="pt-0 pb-20 border-t border-[#DDDDDD]">
              {/* News Listings */}
              <div className="container mx-auto px-4 lg:px-0 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {currentNews.map((news) => (
                    <NewsCard
                      key={news.id}
                      {...news}
                      onVisit={() => handleNewsClick(news)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GetStartedSection className="mt-0 mb-0" />
      <FAQSection />
    </>
  );
};

export default BlogsPage;

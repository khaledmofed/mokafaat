import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { BsChevronDown } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { LuCalendarRange } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { HiOutlineEye } from "react-icons/hi";
import { UnderTitle } from "@assets";
import useIsRTL from "@hooks/useIsRTL";
import { useInquiryModal } from "@context";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { GetStartedSection } from "@pages/home/components";
import { useWebHome } from "@hooks/api/useMokafaatQueries";
import { mapApiNewsToModels } from "@network/mappers/newsMapper";

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const { openModal } = useInquiryModal();
  const { data: webHomeResponse, isLoading: newsLoading } = useWebHome();

  const [currentRecentPage, setCurrentRecentPage] = useState(1);

  const newsList = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const news = data?.news as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(news)) return [];
    return mapApiNewsToModels(news);
  }, [webHomeResponse]);

  const currentArticle = useMemo(() => {
    return newsList.find((article) => article.slug === slug);
  }, [newsList, slug]);

  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    return newsList.filter(
      (article) =>
        article.category === currentArticle.category && article.slug !== slug
    );
  }, [currentArticle, slug, newsList]);

  //   const handleShareClick = (id: number) => {
  //     console.log("Share clicked:", id);
  //   };

  //   const handleVisitClick = (id: number) => {
  //     console.log("Visit clicked:", id);
  //   };

  // Loading: wait for API before showing 404
  if (newsLoading) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        style={{ paddingTop: "72px" }}
      >
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#400198] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">
            {isRTL ? "جاري التحميل..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // If article not found after load, show 404
  if (!currentArticle) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        style={{ paddingTop: "72px" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#400198] mb-4">
            {isRTL ? "المقال غير موجود" : "Article Not Found"}
          </h1>
          <p className="text-gray-600 mb-6">
            {isRTL
              ? "المقال الذي تبحث عنه غير موجود."
              : "The article you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="bg-[#400198] text-white px-6 py-3 rounded-full hover:bg-[#fd671a] transition-colors"
          >
            {isRTL ? "العودة للمدونة" : "Back to Blogs"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {isRTL ? currentArticle.title : currentArticle.titleEn} -{" "}
          {isRTL ? "مكافئات" : "Mukafaat"}
        </title>
        <meta
          name="description"
          content={
            isRTL ? currentArticle.description : currentArticle.descriptionEn
          }
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: "72px" }}>
        <div className="bg-white">
          <div className="container mx-auto px-4 lg:px-0 border-t-1 border-[#E5E5E5] pb-32">
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
              <BsChevronDown
                className={`mx-2 transform ${
                  isRTL ? "rotate-90" : "rotate-[270deg]"
                }`}
              />
              <span>
                {isRTL ? currentArticle.title : currentArticle.titleEn}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content - Left Column */}
              <div className="w-full lg:w-3/4 space-y-6">
                {/* Article Header */}
                <div className="bg-white rounded-xl p-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-[#400198] mb-2">
                        {isRTL ? currentArticle.title : currentArticle.titleEn}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Article Metadata Pills */}
                <div className="bg-white rounded-xl p-0">
                  <div className="flex flex-wrap gap-4 mb-4">
                    {/* Date Pill */}
                    <div className="flex items-center shadow-md gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                      <LuCalendarRange className="text-[#fd671a] text-lg" />
                      <span className="text-[#400198] font-medium text-sm">
                        {isRTL ? currentArticle.date : currentArticle.dateEn}
                      </span>
                    </div>

                    {/* Editor Pill */}
                    <div className="flex items-center shadow-md gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                      <IoPersonOutline className="text-[#fd671a] text-lg" />
                      <span className="text-[#400198] font-medium text-sm">
                        {isRTL ? "تم تحريره بواسطة الإدارة" : "Edited by Admin"}
                      </span>
                    </div>

                    {/* Views Pill */}
                    <div className="flex items-center shadow-md gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full">
                      <HiOutlineEye className="text-[#fd671a] text-lg" />
                      <span className="text-[#400198] font-medium text-sm">
                        {currentArticle.views}
                      </span>
                    </div>

                    <div className="flex items-center shadow-md gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full ml-auto">
                      <IoLocationOutline className="text-[#fd671a] text-lg" />
                      <span className="text-[#400198] font-medium text-sm">
                        {isRTL
                          ? currentArticle.categoryAr
                          : currentArticle.categoryEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Article Image */}
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="p-0">
                    <img
                      src={currentArticle.image}
                      alt={
                        isRTL ? currentArticle.title : currentArticle.titleEn
                      }
                      className="w-full h-80 object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Article Content */}
                <div className="bg-white rounded-xl p-0">
                  <div className="text-start gap-2 mb-3">
                    <span
                      className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                      style={{
                        fontFamily: isRTL
                          ? "Readex Pro, sans-serif"
                          : "Jost, sans-serif",
                      }}
                    >
                      {isRTL ? "محتوى المقال" : "Article Content"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>

                  <div className="prose max-w-none text-sm mt-4">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? "منصة مكافئات توفر لك أفضل العروض والخصومات على البطاقات الائتمانية والكوبونز والحجوزات في المملكة العربية السعودية. اكتشف آلاف الفرص لتوفير المال والاستمتاع بأفضل الخدمات."
                        : "Mukafaat platform provides you with the best offers and discounts on credit cards, couponz, and bookings in Saudi Arabia. Discover thousands of opportunities to save money and enjoy the best services."}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? `تفاصيل أكثر حول: ${currentArticle.title}: https://www.mukafaat.com/blogs/${currentArticle.slug}`
                        : `More details about: ${currentArticle.titleEn}: https://www.mukafaat.com/blogs/${currentArticle.slug}`}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? "تقدم مكافئات مجموعة شاملة من الخدمات المالية والسياحية، بما في ذلك بطاقات الائتمان من أفضل البنوك، كوبونز خصم حصرية، وحجوزات فندقية وطيران بأسعار مميزة. انضم إلى آلاف المستخدمين الذين يوفرون المال يومياً."
                        : "Mukafaat offers a comprehensive range of financial and tourism services, including credit cards from top banks, exclusive discount couponz, and hotel and flight bookings at competitive prices. Join thousands of users who save money daily."}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? "استفد من خبرتنا في مجال التوفير والاستثمار الذكي. نوفر لك أحدث العروض والفرص الاستثمارية، مع ضمان أفضل الأسعار والخدمات المتميزة في السوق السعودي."
                        : "Benefit from our expertise in savings and smart investment. We provide you with the latest offers and investment opportunities, ensuring the best prices and premium services in the Saudi market."}
                    </p>
                  </div>
                </div>

                {/* Why This Article */}
                <div className="bg-white rounded-xl p-0">
                  <div className="text-start gap-2 mb-3">
                    <span
                      className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                      style={{
                        fontFamily: isRTL
                          ? "Readex Pro, sans-serif"
                          : "Jost, sans-serif",
                      }}
                    >
                      {isRTL ? "لماذا تختار مكافئات؟" : "Why Choose Mukafaat?"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>

                  <div className="prose max-w-none text-sm mt-4">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? "مكافئات هي المنصة الرائدة في المملكة العربية السعودية لتوفير المال والاستفادة من أفضل العروض. نحن نقدم لك مجموعة واسعة من الخدمات المالية والسياحية التي تساعدك على توفير المال في كل عملية شراء أو حجز."
                        : "Mukafaat is the leading platform in Saudi Arabia for saving money and benefiting from the best offers. We provide you with a wide range of financial and tourism services that help you save money on every purchase or booking."}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? `تفاصيل أكثر حول: ${currentArticle.title}: https://www.mukafaat.com/blogs/${currentArticle.slug}`
                        : `More details about: ${currentArticle.titleEn}: https://www.mukafaat.com/blogs/${currentArticle.slug}`}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? "نحن نعمل مع أفضل الشركاء في السوق السعودي لتقديم عروض حصرية ومميزة. سواء كنت تبحث عن بطاقة ائتمان مناسبة، كوبونز خصم، أو حجوزات سفر، مكافئات يوفر لك كل ما تحتاجه في مكان واحد."
                        : "We work with the best partners in the Saudi market to provide exclusive and special offers. Whether you're looking for a suitable credit card, discount couponz, or travel bookings, Mukafaat provides you with everything you need in one place."}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {isRTL
                        ? "انضم إلى مجتمع مكافئات اليوم وابدأ رحلتك نحو التوفير الذكي. نحن ملتزمون بتقديم أفضل الخدمات وأحدث العروض لضمان حصولك على أقصى استفادة من أموالك."
                        : "Join the Mukafaat community today and start your journey towards smart savings. We are committed to providing the best services and latest offers to ensure you get the maximum benefit from your money."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar - Right Column */}
              <div className="w-full lg:w-1/4 space-y-6">
                {/* Recent Posts Section */}
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                  <div className="text-start gap-2 mb-4">
                    <span
                      className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                      style={{
                        fontFamily: isRTL
                          ? "Readex Pro, sans-serif"
                          : "Jost, sans-serif",
                      }}
                    >
                      {isRTL ? "المقالات الحديثة" : "Recent Posts"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>

                  {/* Recent Posts List */}
                  <div className="space-y-4">
                    {relatedArticles
                      .slice((currentRecentPage - 1) * 4, currentRecentPage * 4)
                      .map((article) => (
                        <div
                          key={article.id}
                          className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                          onClick={() => navigate(`/blogs/${article.slug}`)}
                        >
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            {/* Top Row - Date and Views */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <LuCalendarRange className="text-[#fd671a] text-sm" />
                                <span className="text-gray-700 text-xs font-medium">
                                  {isRTL ? article.date : article.dateEn}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <HiOutlineEye className="text-[#fd671a] text-sm" />
                                <span className="text-gray-700 text-xs font-medium">
                                  {article.views}
                                </span>
                              </div>
                            </div>

                            {/* Category */}
                            <div className="mb-2">
                              <span className="text-[#fd671a] text-xs font-medium">
                                {isRTL
                                  ? article.categoryAr
                                  : article.categoryEn}
                              </span>
                            </div>

                            {/* Title */}
                            <h4 className="text-[#400198] text-sm font-bold leading-tight line-clamp-2">
                              {isRTL ? article.title : article.titleEn}
                            </h4>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Pagination for Recent Posts */}
                  {relatedArticles.length > 4 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Previous Button */}
                        <button
                          onClick={() =>
                            setCurrentRecentPage((prev) =>
                              Math.max(1, prev - 1)
                            )
                          }
                          disabled={currentRecentPage === 1}
                          className={`w-8 h-8 rounded-full border border-gray-300 transition-colors flex items-center justify-center ${
                            currentRecentPage === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            <MdArrowBackIosNew />
                          </span>
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center gap-1">
                          {Array.from(
                            { length: Math.ceil(relatedArticles.length / 4) },
                            (_, i) => i + 1
                          )
                            .slice(0, 5)
                            .map((page) => (
                              <button
                                key={page}
                                onClick={() => setCurrentRecentPage(page)}
                                className={`w-8 h-8 rounded-full font-medium text-sm flex items-center justify-center transition-colors ${
                                  currentRecentPage === page
                                    ? "bg-[#400198] text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {page}
                              </button>
                            ))}
                          {Math.ceil(relatedArticles.length / 4) > 5 && (
                            <>
                              <span className="text-gray-700 text-sm">...</span>
                              <button
                                onClick={() =>
                                  setCurrentRecentPage(
                                    Math.ceil(relatedArticles.length / 4)
                                  )
                                }
                                className={`w-8 h-8 rounded-full font-medium text-sm flex items-center justify-center transition-colors ${
                                  currentRecentPage ===
                                  Math.ceil(relatedArticles.length / 4)
                                    ? "bg-[#400198] text-white"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                {Math.ceil(relatedArticles.length / 4)}
                              </button>
                            </>
                          )}
                        </div>

                        {/* Next Button */}
                        <button
                          onClick={() =>
                            setCurrentRecentPage((prev) =>
                              Math.min(
                                Math.ceil(relatedArticles.length / 4),
                                prev + 1
                              )
                            )
                          }
                          disabled={
                            currentRecentPage ===
                            Math.ceil(relatedArticles.length / 4)
                          }
                          className={`w-8 h-8 rounded-full border border-gray-300 transition-colors flex items-center justify-center ${
                            currentRecentPage ===
                            Math.ceil(relatedArticles.length / 4)
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <span className="text-sm font-medium">
                            <MdArrowForwardIos />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {/* Categories Section */}
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                  <div className="text-start gap-2 mb-4">
                    <span
                      className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                      style={{
                        fontFamily: isRTL
                          ? "Readex Pro, sans-serif"
                          : "Jost, sans-serif",
                      }}
                    >
                      {isRTL ? "الفئات" : "Categories"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>

                  {/* Categories List */}
                  <div className="space-y-3">
                    {Array.from(
                      new Set(newsList.map((article) => article.category))
                    ).map((category) => (
                      <div
                        key={category}
                        className={`cursor-pointer py-3 px-4 rounded-full border transition-all duration-200 ${
                          category === currentArticle.category
                            ? "bg-[#400198] text-white border-[#400198]"
                            : "bg-white text-[#4C4C4C] border-gray-200 hover:border-[#400198] hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          // Navigate to blogs page with category filter
                          navigate("/blogs", {
                            state: { selectedCategory: category },
                          });
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {isRTL
                              ? newsList.find(
                                  (article) => article.category === category
                                )?.categoryAr || category
                              : category}
                          </span>
                          <span className="text-xs opacity-75">
                            {
                              newsList.filter(
                                (article) => article.category === category
                              ).length
                            }{" "}
                            {isRTL ? "مقال" : "articles"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-sm border border-[#E5E5E5] p-6">
                  <div className="text-start gap-2 mb-4">
                    <span
                      className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                      style={{
                        fontFamily: isRTL
                          ? "Readex Pro, sans-serif"
                          : "Jost, sans-serif",
                      }}
                    >
                      {isRTL
                        ? "تحتاج مساعدة في التوفير؟"
                        : "Need help with savings?"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>
                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "الاسم" : "Name"}
                      </label>
                      <input
                        type="text"
                        placeholder={isRTL ? "أدخل الاسم" : "Enter Name"}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {isRTL ? "رقم الهاتف" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        placeholder={isRTL ? "رقم الهاتف" : "Phone Number"}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#400198] focus:border-transparent ${
                          isRTL ? "text-right" : "text-left"
                        }`}
                      />
                    </div>
                    <button
                      onClick={() =>
                        openModal(
                          isRTL
                            ? "احصل على مساعدة في التوفير"
                            : "Get Savings Help",
                          isRTL
                            ? "املأ النموذج أدناه وسنتصل بك لمناقشة احتياجاتك في التوفير والاستفادة من أفضل العروض."
                            : "Fill out the form below and we'll call you back to discuss your savings needs and how to benefit from the best offers."
                        )
                      }
                      className="bg-[#400198] h-[45px] w-full justify-center hover:scale-105 transition-transform duration-300 text-sm sm:text-md px-8 sm:px-8 lg:px-8 py-2 sm:py-2 font-semibold rounded-full text-white flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LuPhoneCall className="text-lg" />
                      {isRTL ? "اتصل بي" : "Call me"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-20">
        <GetStartedSection className="mt-0 mb-0" />{" "}
      </div>
    </>
  );
};

export default BlogArticlePage;

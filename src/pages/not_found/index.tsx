import { ChangePageTitle } from "@components";
import { APP_ROUTES } from "@constants";
import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import { Helmet } from "react-helmet-async";
import { HiOutlineHome } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { UnderTitle } from "@assets";
import { useNavigate } from "react-router-dom";
import GetStartedSection from "@pages/home/components/GetStartedSection";

function NotFoundPage() {
  const [t] = useTranslation();
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  ChangePageTitle({ pageTitle: t("404.title") });

  return (
    <>
      <Helmet>
        <title>{t("404.title")}</title>
        <link rel="canonical" href="https://mukafaat.com/404" />
        <meta name="description" content={t("404.description")} />
        <meta property="og:title" content={t("404.title")} />
        <meta property="og:description" content={t("404.description")} />
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
              <span>{isRTL ? "الصفحة غير موجودة" : "Page Not Found"}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content - Left Column */}
              <div className="w-full lg:w-3/4 space-y-6">
                {/* Article Header */}
                <div className="bg-white rounded-xl p-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-[#400198] mb-2">
                        {isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* 404 Content */}
                <div className="bg-white rounded-xl pb-6">
                  <div className="prose max-w-none text-sm space-y-6">
                    {/* 404 Message */}
                    <div className="text-start pb-12">
                      <div className="mb-8">
                        <h2 className="text-8xl font-bold text-[#400198] mb-4">
                          404
                        </h2>
                        <div className="text-start gap-2 mb-4">
                          <span
                            className="text-[#400198] text-lg font-semibold uppercase tracking-wider"
                            style={{
                              fontFamily: isRTL
                                ? "Readex Pro, sans-serif"
                                : "Jost, sans-serif",
                            }}
                          >
                            {isRTL
                              ? "عذراً، الصفحة غير موجودة"
                              : "Sorry, Page Not Found"}
                          </span>
                          <img
                            src={UnderTitle}
                            alt="underlineDecoration"
                            className="h-1 mt-2"
                          />
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg mb-8">
                          {isRTL
                            ? "الصفحة التي تبحث عنها غير موجودة أو تم نقلها. يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية."
                            : "The page you are looking for does not exist or has been moved. Please check the link or return to the home page."}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <button
                          onClick={() => navigate(APP_ROUTES.home)}
                          className="bg-white border-2 border-[#400198] text-[#400198] px-8 py-3 rounded-full font-semibold hover:bg-[#400198] hover:text-white transition-all duration-300"
                        >
                          {isRTL ? "العودة للرئيسية" : "Back to Home"}
                        </button>
                        <button
                          onClick={() => window.history.back()}
                          className="bg-white border-2 border-[#fd671a] text-[#fd671a] px-8 py-3 rounded-full font-semibold hover:bg-[#fd671a] hover:text-white transition-all duration-300"
                        >
                          {isRTL ? "العودة للخلف" : "Go Back"}
                        </button>
                      </div>
                    </div>

                    {/* Help Section */}
                    <div className="mt-12">
                      <div className="text-start gap-2 mb-4">
                        <span
                          className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                          style={{
                            fontFamily: isRTL
                              ? "Readex Pro, sans-serif"
                              : "Jost, sans-serif",
                          }}
                        >
                          {isRTL ? "تحتاج مساعدة؟" : "Need Help?"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {isRTL
                          ? "إذا كنت تواجه مشكلة في العثور على ما تبحث عنه، يمكنك:"
                          : "If you're having trouble finding what you're looking for, you can:"}
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>
                          {isRTL
                            ? "استخدام شريط البحث في أعلى الصفحة"
                            : "Use the search bar at the top of the page"}
                        </li>
                        <li>
                          {isRTL
                            ? "تصفح فئات العروض والبطاقات والكوبونز"
                            : "Browse our offers, cards, and couponz categories"}
                        </li>
                        <li>
                          {isRTL
                            ? "التحقق من الروابط في القائمة الرئيسية"
                            : "Check the links in the main menu"}
                        </li>
                        <li>
                          {isRTL
                            ? "الاتصال بنا للحصول على المساعدة"
                            : "Contact us for assistance"}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Right Column */}
              <div
                className="w-full lg:w-1/4 space-y-6"
                style={{
                  marginTop: "65px",
                }}
              >
                {/* Quick Links */}
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
                      {isRTL ? "روابط سريعة" : "Quick Links"}
                    </span>
                    <img
                      src={UnderTitle}
                      alt="underlineDecoration"
                      className="h-1 mt-2"
                    />
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate("/offers")}
                      className="w-full text-right hover:text-[#400198] transition-colors text-sm"
                    >
                      {isRTL ? "العروض" : "Offers"}
                    </button>
                    <button
                      onClick={() => navigate("/cards")}
                      className="w-full text-right hover:text-[#400198] transition-colors text-sm"
                    >
                      {isRTL ? "البطاقات" : "Cards"}
                    </button>
                    <button
                      onClick={() => navigate("/coupons")}
                      className="w-full text-right hover:text-[#400198] transition-colors text-sm"
                    >
                      {isRTL ? "الكوبونز" : "Couponz"}
                    </button>
                    <button
                      onClick={() => navigate("/bookings")}
                      className="w-full text-right hover:text-[#400198] transition-colors text-sm"
                    >
                      {isRTL ? "الحجوزات" : "Bookings"}
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="w-full text-right hover:text-[#400198] transition-colors text-sm"
                    >
                      {isRTL ? "اتصل بنا" : "Contact Us"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-20">
        <GetStartedSection className="mt-0 mb-0" />
      </div>
    </>
  );
}

export default NotFoundPage;

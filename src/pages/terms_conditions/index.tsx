import { useIsRTL } from "@hooks";
import GetStartedSection from "@pages/home/components/GetStartedSection";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import { HiOutlineHome } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { UnderTitle, PrivacyImage } from "@assets";
import { useNavigate } from "react-router-dom";
import { LuPhoneCall } from "react-icons/lu";
import { useInquiryModal } from "@context";

function TermsConditionsPage() {
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const { openModal } = useInquiryModal();

  return (
    <>
      <Helmet>
        <title>{t("home.footer.terms")}</title>
        <link
          rel="canonical"
          href="https://mukafaat.com/terms-and-conditions"
        />
        <meta name="description" content="Mukafaat Terms and Conditions" />
        <meta property="og:title" content={t("home.footer.terms")} />
        <meta
          property="og:description"
          content="Mukafaat Terms and Conditions"
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

              <span> {t("home.footer.terms")}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Content - Left Column */}
              <div className="w-full lg:w-3/4 space-y-6">
                {/* Article Header */}
                <div className="bg-white rounded-xl p-0">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-bold text-[#400198] mb-2">
                        {isRTL
                          ? "الشروط والأحكام - مكافئات"
                          : `${t("home.footer.terms")} - Mukafaat`}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Main Article Image */}
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="p-0">
                    <img
                      src={PrivacyImage}
                      alt="termsConditions"
                      className="w-full h-[333px] object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Terms & Conditions Content */}
                <div className="bg-white rounded-xl py-6">
                  <div className="prose max-w-none text-sm space-y-6">
                    {/* Introduction */}
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {isRTL
                          ? "مرحباً بك في منصة مكافئات. تحكم هذه الشروط والأحكام استخدامك لموقعنا الإلكتروني وخدماتنا. من خلال الوصول إلى موقعنا الإلكتروني واستخدامه، فإنك تقبل وتوافق على الالتزام بهذه الشروط والأحكام."
                          : "Welcome to Mukafaat platform. These terms and conditions govern your use of our website and services. By accessing and using our website, you accept and agree to be bound by these terms and conditions."}
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        {isRTL
                          ? "إذا كنت لا توافق على أي جزء من هذه الشروط والأحكام، يرجى عدم استخدام موقعنا الإلكتروني أو خدماتنا. نحتفظ بالحق في تعديل هذه الشروط في أي وقت."
                          : "If you disagree with any part of these terms and conditions, please do not use our website or services. We reserve the right to modify these terms at any time."}
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        {isRTL
                          ? "تنطبق هذه الشروط على جميع الزوار والمستخدمين والآخرين الذين يصلون إلى خدماتنا أو يستخدمونها. من خلال استخدام خدماتنا، فإنك توافق على الالتزام بهذه الشروط."
                          : "These terms apply to all visitors, users, and others who access or use our services. By using our services, you agree to be bound by these terms."}
                      </p>
                    </div>

                    {/* Acceptance Section */}
                    <div>
                      <div className="text-start gap-2 mb-3">
                        <span
                          className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                          style={{
                            fontFamily: isRTL
                              ? "Readex Pro, sans-serif"
                              : "Jost, sans-serif",
                          }}
                        >
                          {isRTL ? "قبول الشروط" : "Acceptance of Terms"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {isRTL
                          ? "من خلال الوصول إلى هذا الموقع الإلكتروني واستخدامه، فإنك تقبل وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية. إذا كنت لا توافق على الالتزام بما سبق، يرجى عدم استخدام هذه الخدمة."
                          : "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."}
                      </p>
                    </div>

                    {/* Use License Section */}
                    <div>
                      <div className="text-start gap-2 mb-3">
                        <span
                          className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                          style={{
                            fontFamily: isRTL
                              ? "Readex Pro, sans-serif"
                              : "Jost, sans-serif",
                          }}
                        >
                          {isRTL ? "رخصة الاستخدام" : "Use License"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {isRTL
                          ? "يُمنح الإذن لتحميل نسخة واحدة مؤقتة من المواد (المعلومات أو البرامج) على موقع منصة مكافئات الإلكتروني للعرض الشخصي غير التجاري المؤقت فقط."
                          : "Permission is granted to temporarily download one copy of the materials (information or software) on Mukafaat platform's website for personal, non-commercial transitory viewing only."}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {isRTL
                          ? "هذا منح رخصة وليس نقل ملكية، وتحت هذه الرخصة لا يجوز لك: تعديل أو نسخ المواد، أو استخدام المواد لأي غرض تجاري، أو نقل المواد إلى شخص آخر."
                          : "This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials, use the materials for any commercial purpose, or transfer the materials to another person."}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {isRTL
                          ? "ستنتهي هذه الرخصة تلقائياً إذا انتهكت أي من هذه القيود ويمكن إنهاؤها من قبل منصة مكافئات في أي وقت."
                          : "This license shall automatically terminate if you violate any of these restrictions and may be terminated by Mukafaat platform at any time."}
                      </p>
                    </div>

                    {/* Disclaimer Section */}
                    <div>
                      <div className="text-start gap-2 mb-3">
                        <span
                          className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                          style={{
                            fontFamily: isRTL
                              ? "Readex Pro, sans-serif"
                              : "Jost, sans-serif",
                          }}
                        >
                          {isRTL ? "إخلاء المسؤولية" : "Disclaimer"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {isRTL
                          ? "يتم تقديم المواد على موقع منصة مكافئات الإلكتروني على أساس 'كما هي'. لا تقدم منصة مكافئات أي ضمانات، صريحة أو ضمنية، وتتنصل وتنفي جميع الضمانات الأخرى بما في ذلك على سبيل المثال لا الحصر:"
                          : "The materials on Mukafaat platform's website are provided on an 'as is' basis. Mukafaat platform makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation:"}
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>
                          {isRTL
                            ? "الضمانات الضمنية للقابلية للتسويق أو الملاءمة لغرض معين"
                            : "Implied warranties of merchantability or fitness for a particular purpose"}
                        </li>
                        <li>
                          {isRTL
                            ? "عدم انتهاك الملكية الفكرية أو انتهاك آخر للحقوق"
                            : "Non-infringement of intellectual property or other violation of rights"}
                        </li>
                        <li>
                          {isRTL
                            ? "دقة أو اكتمال أو موثوقية أي مواد"
                            : "Accuracy, completeness, or reliability of any materials"}
                        </li>
                        <li>
                          {isRTL
                            ? "ملاءمة المعلومات لأي غرض محدد"
                            : "Suitability of information for any specific purpose"}
                        </li>
                        <li>
                          {isRTL
                            ? "توفر وإمكانية الوصول إلى الموقع الإلكتروني والخدمات"
                            : "Availability and accessibility of the website and services"}
                        </li>
                        <li>
                          {isRTL
                            ? "أمان نقل المعلومات"
                            : "Security of information transmission"}
                        </li>
                        <li>
                          {isRTL
                            ? "التوافق مع جميع الأجهزة والمتصفحات"
                            : "Compatibility with all devices and browsers"}
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
                            : "Get Help with Savings",
                          isRTL
                            ? "املأ النموذج أدناه وسنتصل بك لمناقشة احتياجاتك في التوفير والاستفادة من أفضل العروض."
                            : "Fill out the form below and we'll call you back to discuss your savings needs and benefit from the best offers."
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
        <GetStartedSection className="mt-0 mb-0" />
      </div>
    </>
  );
}

export default TermsConditionsPage;

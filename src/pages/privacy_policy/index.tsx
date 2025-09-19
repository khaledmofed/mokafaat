// import { PageHeader } from "@components";
// import { PivacyTermsModel } from "@entities";
import { useIsRTL } from "@hooks";
// import useGetQuery from "@hooks/api/useGetQuery";
// import { API_ENDPOINTS } from "@network/apiEndpoints";
// import { GetStarted } from "@pages/home/components";
import { t } from "i18next";
// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { HiOutlineHome } from "react-icons/hi";
import { BsChevronDown } from "react-icons/bs";
import { UnderTitle, PrivacyImage } from "@assets";
import { useNavigate } from "react-router-dom";
import { LuPhoneCall } from "react-icons/lu";
import { useInquiryModal } from "@context";
import GetStartedSection from "@pages/home/components/GetStartedSection";

// Function to decode HTML entities
// function decodeHTMLEntities(text: string): string {
//   const textarea = document.createElement("textarea");
//   textarea.innerHTML = text;
//   return textarea.value;
// }

function PrivacyPolicyPage() {
  // ChangePageTitle({
  //   pageTitle: t("home.footer.privacy"),
  //   description: "Mukafaat Privacy Policy",
  //   path: APP_ROUTES.privacy_policy,
  // });
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const { openModal } = useInquiryModal();
  // const [privacyPolicy, setPrivacyPolicy] = useState<PivacyTermsModel | null>(
  //   null
  // );

  // const { data, isSuccess } = useGetQuery({
  //   endpoint: API_ENDPOINTS.getPrivacyPolicy,
  // });

  // useEffect(() => {
  //   const pp = data?.data?.privacyPolicy;
  //   if (isSuccess && data?.status && pp) {
  //     setPrivacyPolicy(pp);
  //   }
  // }, [isSuccess, data]);

  return (
    <>
      <Helmet>
        <title>{t("home.footer.privacy")}</title>
        <link rel="canonical" href="https://mukafaat.com/privacy-policy" />
        <meta name="description" content="Mukafaat Privacy Policy" />
        <meta property="og:title" content={t("home.footer.privacy")} />
        <meta property="og:description" content="Mukafaat Privacy Policy" />
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

              <span>{isRTL ? "سياسة الخصوصية" : t("home.footer.privacy")}</span>
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
                          ? "سياسة الخصوصية - مكافئات"
                          : `${t("home.footer.privacy")} - Mukafaat`}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Main Article Image */}
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="p-0">
                    <img
                      src={PrivacyImage}
                      alt="privacyPolicy"
                      className="w-full h-[333px] object-cover rounded-2xl"
                    />
                  </div>
                </div>

                {/* Privacy Policy Content */}
                <div className="bg-white rounded-xl py-6">
                  <div className="prose max-w-none text-sm space-y-6">
                    {/* Introduction */}
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {isRTL
                          ? "أحد أولوياتنا الرئيسية في منصة مكافئات هو حماية خصوصية زوارنا، وتحتوي وثيقة سياسة الخصوصية هذه على أنواع المعلومات التي يتم جمعها وتسجيلها من قبل منصة مكافئات وكيفية استخدامنا لها."
                          : "One of our main priorities at Mukafaat platform is to protect the privacy of our visitors, and this privacy policy document contains the types of information that is collected and recorded by Mukafaat platform and how we use it."}
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        {isRTL
                          ? "إذا كان لديك أسئلة إضافية أو تحتاج إلى مزيد من المعلومات حول سياسة الخصوصية الخاصة بنا، فلا تتردد في الاتصال بنا."
                          : "If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us."}
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        {isRTL
                          ? "تنطبق سياسة الخصوصية هذه فقط على أنشطتنا عبر الإنترنت، وتشمل زوار موقعنا الإلكتروني فيما يتعلق بالمعلومات التي شاركوها و/أو نجمعها في منصة مكافئات. لا تنطبق هذه السياسة على أي معلومات يتم جمعها خارج الإنترنت أو عبر قنوات أخرى غير هذا الموقع الإلكتروني."
                          : "This Privacy Policy applies only to our online activities, and it includes visitors to our website with respect to the information they shared and/or we collect at Mukafaat platform. This policy does not apply to any information collected offline or via channels other than this website."}
                      </p>
                    </div>

                    {/* Consent Section */}
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
                          {isRTL ? "الموافقة" : "Consent"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {isRTL
                          ? "عند استخدام موقعنا الإلكتروني، فإنك توافق على سياسة الخصوصية الخاصة بنا والشروط المنشورة."
                          : "When using our website, you agree to our privacy policy and its published terms."}
                      </p>
                    </div>

                    {/* Information Collection Section */}
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
                          {isRTL
                            ? "المعلومات التي نجمعها"
                            : "The information we collect"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {isRTL
                          ? "المعلومات الشخصية التي يُطلب منك تقديمها، والأسباب التي تطلب منك تقديمها، ستكون واضحة لك في النقطة التي نطلب منك فيها تقديم معلوماتك الشخصية."
                          : "The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information."}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {isRTL
                          ? "إذا اتصلت بنا مباشرة، فقد نتلقى معلومات إضافية عنك مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك ومحتوى الرسالة و/أو المرفقات التي قد ترسلها لنا، وأي معلومات أخرى قد تختار تقديمها."
                          : "If you contact us directly, we may receive additional information about you such as your name, email address, telephone number, the contents of the message and/or attachments that you may send us, and any other information that you may choose to provide."}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {isRTL
                          ? "عندما تسجل للحصول على حساب، قد نطلب معلومات الاتصال الخاصة بك، بما في ذلك عناصر مثل الاسم واسم الشركة والعنوان وعنوان البريد الإلكتروني ورقم الهاتف."
                          : "When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and phone number."}
                      </p>
                    </div>

                    {/* Information Usage Section */}
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
                          {isRTL
                            ? "كيف نستخدم معلوماتك"
                            : "How we use your information"}
                        </span>
                        <img
                          src={UnderTitle}
                          alt="underlineDecoration"
                          className="h-1 mt-2"
                        />
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {isRTL
                          ? "نستخدم المعلومات التي نجمعها بطرق مختلفة، بما في ذلك:"
                          : "We use the information we collect in various ways, including to:"}
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>
                          {isRTL
                            ? "تقديم وتشغيل وصيانة موقعنا الإلكتروني"
                            : "Providing, operating, and maintaining our website"}
                        </li>
                        <li>
                          {isRTL
                            ? "تحسين وتخصيص وتوسيع موقعنا الإلكتروني"
                            : "Improve, customize and expand our website"}
                        </li>
                        <li>
                          {isRTL
                            ? "فهم وتحليل كيفية استخدامك لموقعنا الإلكتروني"
                            : "Understand and analyze how you use our website"}
                        </li>
                        <li>
                          {isRTL
                            ? "تطوير منتجات وخدمات وميزات ووظائف جديدة"
                            : "Develop new products, services, features, and functionality"}
                        </li>
                        <li>
                          {isRTL
                            ? "التواصل معك، إما مباشرة أو من خلال أحد شركائنا، بما في ذلك خدمة العملاء، لتقديم التحديثات والمعلومات الأخرى المتعلقة بالموقع الإلكتروني ولأغراض التسويق والترويج"
                            : "Communicate with you, either directly or through one of our partners, including customer service, to provide you with updates and other information regarding the website and for marketing and promotional purposes"}
                        </li>
                        <li>
                          {isRTL ? "إرسال رسائل بريد إلكتروني" : "Send emails"}
                        </li>
                        <li>
                          {isRTL
                            ? "العثور على شيء ومنع الاحتيال"
                            : "Find something and prevent fraud"}
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

export default PrivacyPolicyPage;

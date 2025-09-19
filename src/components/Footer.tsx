import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@constants";
import { FaPhone, FaAt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { LogoLight, MailboxIcon } from "@assets";
import { useIsRTL } from "@hooks";

interface FooterProps {
  mobileNumber?: string;
  email?: string;
}

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();

  const socialMediaLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const handleSubscribe = () => {
    console.log("Subscribe clicked");
  };

  return (
    <>
      {/* Stay in the loop Subscription Banner */}
      <div className="relative" style={{ marginBottom: "-50px" }}>
        {/* Background Pattern */}

        <div className="container mx-auto px-8 lg:px-4 w-full max-w-6xl relative z-10 pt-10 lg:pt-0">
          <div className="bg-[#3f0196] rounded-3xl p-4 lg:p-4 shadow-2xl border border-[#3f0196] h-auto lg:h-[106px]">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
              {/* Mailbox Illustration and Content */}
              <div className="flex flex-col lg:flex-row w-full lg:w-4/6 gap-4 items-center">
                <div className="relative group h-[74px] w-[144px]">
                  <img
                    src={MailboxIcon}
                    alt="Mailbox with documents"
                    className="relative w-[144px] h-auto object-contain drop-shadow-2xl filter brightness-110"
                    style={{ marginTop: "-78px" }}
                  />
                </div>
                <div
                  className={`space-y-2 text-start lg:${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  <h2 className="text-lg lg:text-xl font-bold text-white leading-tight">
                    {isRTL ? "ابق على تواصل" : t("footer.stayInLoop.title")}
                  </h2>
                  <p className="text-sm text-white opacity-95 leading-relaxed">
                    {isRTL
                      ? "احصل على آخر الأخبار والعروض الخاصة"
                      : t("footer.stayInLoop.description")}
                  </p>
                </div>
              </div>

              {/* Email Input and Button */}
              <div className="relative w-full lg:w-2/6">
                <div className="flex flex-col lg:flex-row bg-[#33007a] p-1 rounded-lg lg:rounded-full overflow-hidden border border-gray-200 gap-2 lg:gap-0">
                  {/* Email Input Field */}
                  <div className="relative flex-1">
                    <FaAt
                      className={`absolute ${
                        isRTL ? "right-4" : "left-4"
                      } top-1/2 transform -translate-y-1/2 text-white text-lg z-10`}
                    />
                    <input
                      type="email"
                      placeholder={
                        isRTL
                          ? "أدخل بريدك الإلكتروني"
                          : t("footer.stayInLoop.emailPlaceholder")
                      }
                      className={`w-full ${
                        isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                      } py-3 text-white bg-transparent focus:outline-none text-base placeholder-white placeholder-opacity-80`}
                    />
                  </div>

                  {/* Subscribe Button */}
                  <button
                    onClick={handleSubscribe}
                    className="bg-white text-gray-800 px-6 py-2 rounded-lg lg:rounded-full font-semibold text-base hover:bg-gray-50 transition-all duration-300 whitespace-nowrap"
                  >
                    {isRTL ? "اشتراك" : t("footer.stayInLoop.subscribeButton")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div
        className="bg-[#1d0843] pb-16"
        style={{ borderRadius: "40px 40px 0 0", paddingTop: "100px" }}
      >
        <div className="container mx-auto px-8 lg:px-4">
          {/* Mobile Layout */}
          <div className="space-y-8 lg:hidden">
            {/* Column 1 - Company Info - Full Width on Mobile */}
            <div className="w-full space-y-4">
              {/* Logo */}
              <div className="space-y-3">
                <div className="text-start">
                  <img
                    src={LogoLight}
                    alt="Mukafaat Logo"
                    className="h-[50px] w-auto mb-3"
                  />
                </div>
                <p
                  className="text-[#EBEBEB] leading-relaxed text-start"
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {isRTL
                    ? "لوريم إبسوم هو نص وهمي يستخدم في الطباعة والتنضيد. الغرض منه هو السماح بتصميم تخطيط الصفحة بشكل مستقل عن المحتوى الذي سيتم ملؤه لاحقاً."
                    : t("footer.companyDescription")}
                </p>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-start space-x-3">
                {socialMediaLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="rounded-full flex items-center justify-center text-[#EBEBEB] hover:bg-opacity-20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Row 2 - About Us + Learn More */}
            <div className="grid grid-cols-2 gap-8">
              {/* Column 2 - About Us */}
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base text-start">
                  {isRTL ? "عنا" : "About Us"}
                </h3>
                <ul className="space-y-2 text-start">
                  <li>
                    <Link
                      to={APP_ROUTES.contact}
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL ? "تواصل معنا" : "Contact Us"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/join"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL ? "انضم إلى موقعنا" : "Join Our Site"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL ? "شروط خصوصية المستخدم" : "User Privacy Terms"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL
                        ? "سياسة الخصوصية العامة"
                        : "General Privacy Policy"}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3 - Learn More */}
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base text-start">
                  {isRTL ? "اعرف المزيد" : "Learn More"}
                </h3>
                <ul className="space-y-2 text-start">
                  <li>
                    <Link
                      to="/rewards"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL ? "شرح مبدأ مكافات" : "Rewards Principle"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL ? "أسئلة متكررة" : "FAQ"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/share-offer"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL ? "شارك بعرض مع مكافات" : "Share an Offer"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/subscriptions"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {isRTL ? "اشتراكات الشركات" : "Company Subscriptions"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Row 3 - Our Locations + Contact Info */}
            <div className="grid grid-cols-2 gap-8">
              {/* Column 4 - Our Locations */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#fd671a] text-base text-start">
                  {isRTL ? "مواقعنا" : "Our Locations"}
                </h3>
                <ul className="space-y-2 text-start">
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {isRTL ? "دبي" : "Dubai"}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {isRTL ? "ابو ظبي" : "Abu Dhabi"}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {isRTL ? "البحرين" : "Bahrain"}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {isRTL ? "جدة" : "Jeddah"}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {isRTL ? "الرياض" : "Riyadh"}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {isRTL ? "الدمام" : "Dammam"}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Column 5 - Contact Info */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-start text-sm ${
                      isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                    }`}
                  >
                    <FaMapMarkerAlt className="text-white w-4 h-4" />
                    <span className="text-[#EBEBEB]">
                      {isRTL
                        ? "جدة، المملكة العربية السعودية"
                        : "Jeddah, Kingdom of Saudi Arabia"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-start text-sm ${
                      isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                    }`}
                  >
                    <FaClock className="text-white w-4 h-4" />
                    <div className="text-[#EBEBEB]">
                      <div>
                        {isRTL
                          ? "ساعات العمل: 9:00 صباحاً - 6:00 مساءً"
                          : "Working hours: 9:00 AM - 6:00 PM"}
                      </div>
                      <div className="text-xs">
                        {isRTL
                          ? "من الأحد إلى الخميس"
                          : "From Sunday to Thursday"}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-start text-sm ${
                      isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                    }`}
                  >
                    <FaPhone className="text-white w-4 h-4" />
                    <span className="text-[#EBEBEB]">
                      {isRTL
                        ? "تحتاج مساعدة؟ اتصل بنا 0123456789"
                        : "Need help? Call us 0123456789"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Original */}
          <div className="hidden lg:flex gap-8">
            {/* Column 1 - Company Info */}
            <div className="w-2/6 space-y-4">
              {/* Logo */}
              <div className="space-y-3">
                <div className={`${isRTL ? "text-right" : "text-left"}`}>
                  <img
                    src={LogoLight}
                    alt="Mukafaat Logo"
                    className="h-[50px] w-auto mb-3"
                  />
                </div>
                <p
                  className={`text-[#EBEBEB] leading-relaxed ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {isRTL
                    ? "لوريم إبسوم هو نص وهمي يستخدم في الطباعة والتنضيد. الغرض منه هو السماح بتصميم تخطيط الصفحة بشكل مستقل عن المحتوى الذي سيتم ملؤه لاحقاً."
                    : "Lorem ipsum is a dummy text used in printing and typesetting. Its purpose is to allow page layout design independently of the content that will be filled later."}
                </p>
              </div>

              {/* Social Media Icons */}
              <div
                className={`flex ${isRTL ? "justify-start" : "justify-start"} ${
                  isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                }`}
              >
                {socialMediaLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="rounded-full flex items-center justify-center text-[#EBEBEB] hover:bg-opacity-20 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="w-1/6 space-y-4">
              <h3
                className={`font-bold text-white text-base ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {isRTL ? "روابط سريعة" : "Quick Links"}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <li>
                  <Link
                    to={APP_ROUTES.about}
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "من نحن" : "About Us"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "المدونة والأخبار" : "Blog & News"}
                  </Link>
                </li>
                <li>
                  <Link
                    to={APP_ROUTES.contact}
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "اتصل بنا" : "Contact Us"}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/investments"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "الاستثمارات" : "Investments"}
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Column 3 - About Us */}
            <div className="w-1/6 space-y-4">
              <h3
                className={`font-bold text-white text-base ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {isRTL ? "عنا" : "About Us"}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <li>
                  <Link
                    to={APP_ROUTES.contact}
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "تواصل معنا" : "Contact Us"}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/join"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "انضم إلى موقعنا" : "Join Our Site"}
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/privacy"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "شروط خصوصية المستخدم" : "User Privacy Terms"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "سياسة الخصوصية العامة" : "General Privacy Policy"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Learn More */}
            <div className="w-1/6 space-y-4">
              <h3
                className={`font-bold text-white text-base ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {isRTL ? "اعرف المزيد" : "Learn More"}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <li>
                  <Link
                    to="/rewards"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "شرح مبدأ مكافات" : "Rewards Principle"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "أسئلة متكررة" : "FAQ"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/share-offer"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "شارك بعرض مع مكافات" : "Share an Offer"}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subscriptions"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {isRTL ? "اشتراكات الشركات" : "Company Subscriptions"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 - Our Locations */}
            <div className="w-1/6 space-y-4">
              <h3
                className={`font-bold text-[#fd671a] text-base ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {isRTL ? "مواقعنا" : "Our Locations"}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <li>
                  <span className="text-[#EBEBEB] text-sm">
                    {isRTL ? "دبي" : "Dubai"}
                  </span>
                </li>
                <li>
                  <span className="text-[#EBEBEB] text-sm">
                    {isRTL ? "ابو ظبي" : "Abu Dhabi"}
                  </span>
                </li>
                <li>
                  <span className="text-[#EBEBEB] text-sm">
                    {isRTL ? "البحرين" : "Bahrain"}
                  </span>
                </li>
                <li>
                  <span className="text-[#EBEBEB] text-sm">
                    {isRTL ? "جدة" : "Jeddah"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 6 - Contact Info */}
            <div className="w-1/6 space-y-4">
              <div className="space-y-3">
                <div
                  className={`flex items-center justify-start text-sm ${
                    isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                  }`}
                >
                  <FaMapMarkerAlt className="text-white w-4 h-4" />
                  <span className="text-[#EBEBEB]">
                    {isRTL
                      ? "جدة، المملكة العربية السعودية"
                      : "Jeddah, Kingdom of Saudi Arabia"}
                  </span>
                </div>
                <div
                  className={`flex items-center justify-start text-sm ${
                    isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                  }`}
                >
                  <FaClock className="text-white w-4 h-4" />
                  <div className="text-[#EBEBEB]">
                    <div>
                      {isRTL
                        ? "ساعات العمل: 9:00 صباحاً - 6:00 مساءً"
                        : "Working hours: 9:00 AM - 6:00 PM"}
                    </div>
                    <div className="text-xs">
                      {isRTL
                        ? "من الأحد إلى الخميس"
                        : "From Sunday to Thursday"}
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-center justify-start text-sm ${
                    isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                  }`}
                >
                  <FaPhone className="text-white w-4 h-4" />
                  <span className="text-[#EBEBEB]">
                    {isRTL
                      ? "تحتاج مساعدة؟ اتصل بنا 0123456789"
                      : "Need help? Call us 0123456789"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-[#1d0843] border-t border-gray-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-[#EBEBEB] text-sm text-start md:text-left">
              {isRTL
                ? "© 2025 مكافئات. جميع الحقوق محفوظة."
                : "© 2025 Mukafaat. All rights reserved."}
            </div>
            <div className="flex items-center space-x-4 text-[#EBEBEB] text-sm gap-4">
              <Link
                to={APP_ROUTES.privacy_policy}
                className="hover:text-white transition-colors"
              >
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
              <Link
                to={APP_ROUTES.terms_conditions}
                className="hover:text-white transition-colors"
              >
                {isRTL ? "شروط الاستخدام" : "Terms of Use"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

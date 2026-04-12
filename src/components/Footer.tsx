import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "@constants";
import {
  FaPhone,
  FaAt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LogoLight, MailboxIcon } from "@assets";
import { useIsRTL } from "@hooks";
import { useAppConfig } from "@hooks/api/useMokafaatQueries";

interface FooterProps {
  mobileNumber?: string;
  email?: string;
}

const FOOTER_SOCIAL_ICONS: Record<
  string,
  { Icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  facebook: { Icon: FaFacebook, label: "Facebook" },
  instagram: { Icon: FaInstagram, label: "Instagram" },
  twitter: { Icon: FaXTwitter, label: "Twitter" },
  youtube: { Icon: FaYoutube, label: "YouTube" },
  linkedin: { Icon: FaLinkedin, label: "LinkedIn" },
  snapchat: { Icon: FaSnapchat, label: "Snapchat" },
  tiktok: { Icon: FaTiktok, label: "TikTok" },
};

type AppConfigData = {
  data?: {
    config?: {
      contact?: {
        address?: string;
        email?: string;
        phone?: string;
        whatsapp?: string;
        working_hours?: string;
      };
      countries?: Array<{ id: number; name: string; code: string; flag?: string }>;
      site?: { name?: string; description?: string; logo?: string; favicon?: string };
      social?: Record<string, string>;
    };
  };
};

const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const { data: appConfig } = useAppConfig() as { data?: AppConfigData };
  const contact = appConfig?.data?.config?.contact;
  const countries = appConfig?.data?.config?.countries ?? [];
  const site = appConfig?.data?.config?.site;
  const social = appConfig?.data?.config?.social ?? {};
  const socialEntries = Object.entries(social).filter(
    ([, url]) => url && typeof url === "string"
  );

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
                    {t("footer.stayInLoop.title")}
                  </h2>
                  <p className="text-sm text-white opacity-95 leading-relaxed">
                    {t("footer.stayInLoop.description")}
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
                      placeholder={t("footer.stayInLoop.emailPlaceholder")}
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
                    {t("footer.stayInLoop.subscribeButton")}
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
                  style={{ fontSize: "13px" }}
                >
                  {site?.description ?? t("footer.companyDescription")}
                </p>
              </div>

              {/* Social Media Icons - من config.social */}
              <div className={`flex justify-start ${isRTL ? "space-x-reverse space-x-3" : "space-x-3"}`}>
                {socialEntries.map(([key, url]) => {
                  const meta = FOOTER_SOCIAL_ICONS[key];
                  if (!meta) return null;
                  const { Icon, label } = meta;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full flex items-center justify-center text-[#EBEBEB] hover:bg-opacity-20 transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Row 2 - About Us + Learn More */}
            <div className="grid grid-cols-2 gap-8">
              {/* Column 2 - About Us */}
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base text-start">
                  {t("footer.about")}
                </h3>
                <ul className="space-y-2 text-start">
                  <li>
                    <Link
                      to={APP_ROUTES.contact}
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.contactUs")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/join"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.joinOurSite")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.userPrivacyTerms")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.generalPrivacyPolicy")}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3 - Learn More */}
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base text-start">
                  {t("footer.learnMore")}
                </h3>
                <ul className="space-y-2 text-start">
                  <li>
                    <Link
                      to="/rewards"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.rewardsPrinciple")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.faq")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/share-offer"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.shareOffer")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/subscriptions"
                      className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                    >
                      {t("footer.companySubscriptions")}
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
                  {t("footer.ourLocations")}
                </h3>
                <ul className="space-y-2 text-start">
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {t("footer.dubai")}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {t("footer.abuDhabi")}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {t("footer.bahrain")}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {t("footer.jeddah")}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {t("footer.riyadh")}
                    </span>
                  </li>
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      {t("footer.dammam")}
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
                      {t("footer.location")}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-start text-sm ${
                      isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                    }`}
                  >
                    <FaClock className="text-white w-4 h-4" />
                    <div className="text-[#EBEBEB]">
                      <div>{t("footer.workingHours")}</div>
                      <div className="text-xs">
                        {t("footer.workingDays")}
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
                      {t("footer.needHelp")}
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
                  style={{ fontSize: "13px" }}
                >
                  {site?.description ?? t("footer.companyDescriptionFallback")}
                </p>
              </div>

              {/* Social Media Icons - من config.social */}
              <div
                className={`flex ${isRTL ? "justify-start" : "justify-start"} ${
                  isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                }`}
              >
                {socialEntries.map(([key, url]) => {
                  const meta = FOOTER_SOCIAL_ICONS[key];
                  if (!meta) return null;
                  const { Icon, label } = meta;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full flex items-center justify-center text-[#EBEBEB] hover:bg-opacity-20 transition-all duration-300"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="w-1/6 space-y-4">
              <h3
                className={`font-bold text-white text-base ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("footer.quickLinks")}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <li>
                  <Link
                    to={APP_ROUTES.about}
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.whoWeAreLink")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.blogNews")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={APP_ROUTES.contact}
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.contactUs")}
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
                {t("footer.about")}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <li>
                  <Link
                    to={APP_ROUTES.contact}
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.contactUs")}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/join"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.joinOurSite")}
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/privacy"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.userPrivacyTerms")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.generalPrivacyPolicy")}
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
                {t("footer.learnMore")}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                <li>
                  <Link
                    to="/rewards"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.rewardsPrinciple")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.faq")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/share-offer"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.shareOffer")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/subscriptions"
                    className="text-[#EBEBEB] hover:text-white transition-colors text-sm"
                  >
                    {t("footer.companySubscriptions")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 - Our Locations من config.countries */}
            <div className="w-1/6 space-y-4">
              <h3
                className={`font-bold text-[#fd671a] text-base ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("footer.ourLocations")}
              </h3>
              <ul className={`space-y-2 ${isRTL ? "text-right" : "text-left"}`}>
                {countries.length === 0 ? (
                  <li>
                    <span className="text-[#EBEBEB] text-sm">
                      —
                    </span>
                  </li>
                ) : (
                  countries.map((country) => (
                    <li key={country.id}>
                      <span className="text-[#EBEBEB] text-sm">
                        {country.name}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Column 6 - Contact Info من /api/app-config (config.contact) */}
            <div className="w-1/6 space-y-4">
              <div className="space-y-3">
                {contact?.address && (
                  <div
                    className={`flex items-center justify-start text-sm ${
                      isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                    }`}
                  >
                    <FaMapMarkerAlt className="text-white w-4 h-4 flex-shrink-0" />
                    <span className="text-[#EBEBEB]">{contact.address}</span>
                  </div>
                )}
                {contact?.working_hours && (
                  <div
                    className={`flex items-center justify-start text-sm ${
                      isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                    }`}
                  >
                    <FaClock className="text-white w-4 h-4 flex-shrink-0" />
                    <div className="text-[#EBEBEB]">{contact.working_hours}</div>
                  </div>
                )}
                {(contact?.phone ?? contact?.whatsapp) && (
                  <div
                    className={`flex items-center justify-start text-sm ${
                      isRTL ? "space-x-reverse space-x-3" : "space-x-3"
                    }`}
                  >
                    <FaPhone className="text-white w-4 h-4 flex-shrink-0" />
                    <span className="text-[#EBEBEB]">
                      {contact.phone ?? contact.whatsapp}
                    </span>
                  </div>
                )}
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
              {t("footer.brandCopyright")}
            </div>
            <div className="flex items-center space-x-4 text-[#EBEBEB] text-sm gap-4">
              <Link
                to={APP_ROUTES.privacy_policy}
                className="hover:text-white transition-colors"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <Link
                to={APP_ROUTES.terms_conditions}
                className="hover:text-white transition-colors"
              >
                {t("footer.termsOfUse")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

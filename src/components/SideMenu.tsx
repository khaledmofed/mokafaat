import { IoMdClose } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { Logo, UnderTitle } from "@assets";
import {
  FaClock,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaSnapchat,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAppConfig } from "@hooks/api/useMokafaatQueries";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOCIAL_ICONS: Record<
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

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const { data: appConfig } = useAppConfig() as {
    data?: {
      data?: {
        config?: {
          contact?: {
            address?: string;
            email?: string;
            phone?: string;
            whatsapp?: string;
            working_hours?: string;
          };
          social?: Record<string, string>;
        };
      };
    };
  };
  const contact = appConfig?.data?.config?.contact;
  const social = appConfig?.data?.config?.social;
  const socialEntries = social
    ? Object.entries(social).filter(([, url]) => url && typeof url === "string")
    : [];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-0 h-full w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white z-[9999] transition-all duration-300 ease-in-out shadow-2xl ${
          isOpen
            ? isRTL
              ? "right-0 translate-x-0"
              : "left-0 translate-x-0"
            : isRTL
            ? "-right-full translate-x-full"
            : "-left-full -translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src={Logo} alt="Mukafaat Logo" className="h-10 w-auto" />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 bg-gray-100 rounded-full p-2"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Working Hours - من config.contact */}
            {(contact?.working_hours ?? t("home.navbar.side-menu.working-hours")) && (
              <div>
                <div className="text-start gap-2 mb-4">
                  <span
                    className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("home.navbar.side-menu.working-hours")}
                  </span>
                  <img
                    src={UnderTitle}
                    alt="underlineDecoration"
                    className="h-1 mt-2"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2">
                    <FaClock className="text-[#fd671a] text-lg flex-shrink-0" />
                    <span className="text-gray-800">
                      {contact?.working_hours ?? t("home.navbar.side-menu.hours-value")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Contact Info - من config.contact */}
            {(contact?.address ?? contact?.email ?? contact?.phone ?? contact?.whatsapp) && (
              <div>
                <div className="text-start gap-2 mb-4">
                  <span
                    className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                    style={{
                      fontFamily: isRTL
                        ? "Readex Pro, sans-serif"
                        : "Jost, sans-serif",
                    }}
                  >
                    {t("home.navbar.side-menu.contact-info")}
                  </span>
                  <img
                    src={UnderTitle}
                    alt="underlineDecoration"
                    className="h-1 mt-2"
                  />
                </div>
                <div className="space-y-3">
                  {contact?.address && (
                    <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2">
                      <FaMapMarkerAlt className="text-[#fd671a] text-lg flex-shrink-0" />
                      <span className="text-gray-800">{contact.address}</span>
                    </div>
                  )}
                  {contact?.email && (
                    <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2">
                      <FaEnvelope className="text-[#fd671a] text-lg flex-shrink-0" />
                      <span className="text-gray-800">{contact.email}</span>
                    </div>
                  )}
                  {(contact?.phone ?? contact?.whatsapp) && (
                    <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2">
                      <FaPhone className="text-[#fd671a] text-lg flex-shrink-0" />
                      <span className="text-gray-800">
                        {contact.phone ?? contact.whatsapp}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Follow Us - من config.social */}
            <div>
              <div className="text-start gap-2 mb-4">
                <span
                  className="text-[#400198] text-md font-semibold uppercase tracking-wider"
                  style={{
                    fontFamily: isRTL
                      ? "Readex Pro, sans-serif"
                      : "Jost, sans-serif",
                  }}
                >
                  {t("home.navbar.side-menu.follow-us")}
                </span>
                <img
                  src={UnderTitle}
                  alt="underlineDecoration"
                  className="h-1 mt-2"
                />
              </div>
              <div className={`flex flex-wrap gap-3 ${isRTL ? "space-x-reverse" : ""}`}>
                {socialEntries.map(([key, url]) => {
                  const meta = SOCIAL_ICONS[key];
                  if (!meta) return null;
                  const { Icon, label } = meta;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                      aria-label={label}
                    >
                      <Icon className="text-gray-700 text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

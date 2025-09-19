import { IoMdClose } from "react-icons/io";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { Logo, UnderTitle } from "@assets";
import {
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();

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
            {/* Working Hours */}
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
                  <FaClock className="text-[#fd671a] text-lg" />
                  <span className="text-gray-600">
                    {t("home.navbar.side-menu.hours")} :
                  </span>
                  <span className="text-gray-800">
                    {t("home.navbar.side-menu.hours-value")}
                  </span>
                </div>
                <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2">
                  <FaCalendarAlt className="text-[#fd671a] text-lg" />
                  <span className="text-gray-600">
                    {t("home.navbar.side-menu.days")} :
                  </span>
                  <span className="text-gray-800">
                    {t("home.navbar.side-menu.days-value")}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Contact Info */}
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
                <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2">
                  <FaMapMarkerAlt className="text-[#fd671a] text-lg" />
                  <span className="text-gray-800">
                    {t("home.navbar.side-menu.location")}
                  </span>
                </div>
                <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2">
                  <FaEnvelope className="text-[#fd671a] text-lg" />
                  <span className="text-gray-800">
                    {t("home.navbar.side-menu.email")}
                  </span>
                </div>
                <div className="flex items-center text-sm text-[#141414] font-medium space-x-3 gap-2  ">
                  <FaPhone className="text-[#fd671a] text-lg" />
                  <span className="text-gray-800">
                    {t("home.navbar.side-menu.phone-value")}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Follow Us */}
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
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <FaFacebook className="text-gray-700 text-lg" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <FaTwitter className="text-gray-700 text-lg" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <FaInstagram className="text-gray-700 text-lg" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <FaLinkedin className="text-gray-700 text-lg" />
                </button>
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                  <FaYoutube className="text-gray-700 text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;

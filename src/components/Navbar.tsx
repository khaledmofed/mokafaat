import { APP_ROUTES } from "@constants";
import { Link } from "react-router-dom";
import { Logo } from "@assets";
// import LogoLight from "@assets/images/logo-light.png";
import { NavLinks } from "@constants";
import { useState, useEffect } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import {
  IoPersonOutline,
  IoHeartOutline,
  IoCartOutline,
  IoWalletOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import NavigationLinks from "./NavigationLinks";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import SideMenu from "./SideMenu";
import { useUserStore } from "@stores/userStore";
import { useProfile, useFavorites } from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList } from "@utils/favorites";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, isAuthenticated, logout } = useUserStore();
  const { data: profileData } = useProfile(!!isAuthenticated);
  const { data: favoritesData } = useFavorites();
  const favoritesCount = normalizeFavoritesList(favoritesData ?? null).length;

  const displayName = (() => {
    const raw = profileData as Record<string, unknown> | undefined;
    const data = raw?.data as Record<string, unknown> | undefined;
    const u = (data?.user ?? data) as Record<string, unknown> | undefined;
    if (u) {
      const first = (u.first_name ?? u.name) as string | undefined;
      const last = u.last_name as string | undefined;
      const full = [first, last].filter(Boolean).join(" ").trim();
      if (full) return full;
      if (u.name) return String(u.name);
    }
    return user?.name ?? "";
  })();
  const displayEmail = (() => {
    const raw = profileData as Record<string, unknown> | undefined;
    const data = raw?.data as Record<string, unknown> | undefined;
    const u = (data?.user ?? data) as Record<string, unknown> | undefined;
    return (u?.email as string) ?? user?.email ?? "";
  })();
  const displayAvatar = (() => {
    const raw = profileData as Record<string, unknown> | undefined;
    const data = raw?.data as Record<string, unknown> | undefined;
    const u = (data?.user ?? data) as Record<string, unknown> | undefined;
    return (u?.avatar as string) ?? user?.avatar ?? null;
  })();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق قائمة المستخدم عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        const target = event.target as HTMLElement;
        if (!target.closest(".user-menu-container")) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  const handleToggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleCloseNavigation = () => {
    setOpenNavigation(false);
  };

  const handleToggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const isRTL = useIsRTL();
  const openClass = isRTL ? "right-0 w-4/5" : "left-0 w-4/5";
  const closeClass = isRTL ? "-right-full w-full" : "-left-full w-full";

  return (
    <>
      <div
        className={`fixed top-0 w-full z-20 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="container flex items-center justify-between mx-auto md:py-4 md:px-0 px-0 py-4 pading-mobile">
          <Link
            to={APP_ROUTES.home}
            className="flex-shrink-0 wow fadeIn"
            data-wow-delay="0.2s"
          >
            <span className="self-center">
              <img
                src={isScrolled ? Logo : Logo}
                alt="logo"
                width={140}
                className="transition-all duration-300"
              />
            </span>
          </Link>

          <div
            className="lg:hidden relative z-30 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <button
              onClick={handleToggleNavigation}
              className={`text-2xl focus:outline-none rounded-lg p-2 transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-800 bg-gray-100 hover:bg-gray-200"
                  : "text-gray-800 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {openNavigation ? <IoMdClose /> : <RiMenu4Line />}
            </button>
          </div>

          <div
            className={`${
              openNavigation ? openClass : closeClass
            } lg:flex flex-1 items-center justify-center fixed lg:static top-0 h-full lg:h-auto lg:w-auto transition-all duration-300 ease-in-out bg-white z-20 lg:bg-transparent wow fadeInUp px-6`}
            data-wow-delay="0.2s"
          >
            <NavigationLinks
              links={NavLinks}
              t={t}
              handleCloseNavigation={handleCloseNavigation}
            />
            {/* <div className="lg:hidden mt-4">
              <Link
                to={APP_ROUTES.request_service}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#6CC417] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#5AB307] transition-colors duration-300 inline-block"
                onClick={handleCloseNavigation}
              >
                {t("home.navbar.request-service")}
              </Link>
            </div> */}
          </div>

          <div className="lg:flex items-center gap-4 hidden">
            {/* أزرار المستخدم */}
            {isAuthenticated ? (
              <>
                {/* زر المحفوظات */}
                <Link
                  to="/saved"
                  className="relative flex items-center justify-center w-9 h-9 bg-[#fff] border-2 border border-[#440798] rounded-full transition-all duration-300 hover:bg-[#eee]"
                >
                  <IoHeartOutline className="text-[#440798] text-md" />
                  {isAuthenticated && favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>

                {/* قائمة المستخدم */}
                <div className="relative user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center justify-center w-9 h-9 bg-[#fff] border-2 border border-[#440798] rounded-full transition-all duration-300 hover:bg-[#eee]"
                  >
                    {displayAvatar ? (
                      <img
                        src={displayAvatar}
                        alt={displayName}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <IoPersonOutline className="text-[#440798] text-md" />
                    )}
                  </button>

                  {/* قائمة المستخدم المنسدلة */}
                  {showUserMenu && (
                    <div className="absolute top-12 right-0 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden p-2 min-w-[280px]">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100 mb-4">
                        <div className="flex items-center gap-3">
                          {displayAvatar ? (
                            <img
                              src={displayAvatar}
                              alt={displayName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#400198] flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {displayName?.charAt(0) || "U"}
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {displayName || user?.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {displayEmail || user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="space-y-1">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <IoPersonOutline className="w-5 h-5 text-gray-400" />
                          <span className="font-medium">
                            {t("home.navbar.profile")}
                          </span>
                        </Link>

                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <IoCartOutline className="w-5 h-5 text-gray-400" />
                          <span className="font-medium">
                            {t("home.navbar.orders")}
                          </span>
                        </Link>

                        <Link
                          to="/wallet"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <IoWalletOutline className="w-5 h-5 text-gray-400" />
                          <span className="font-medium">
                            {t("home.navbar.wallet")}
                          </span>
                        </Link>

                        <div className="border-t border-gray-100 my-2"></div>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <IoLogOutOutline className="w-5 h-5 text-red-400" />
                          <span className="font-medium">
                            {t("home.navbar.logout")}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* زر تسجيل الدخول */}
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-3 h-9 py-2 text-xs bg-gray-100 border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-200"
                >
                  {t("home.navbar.login")}
                </Link>

                {/* زر التسجيل */}
                {/* <Link
                  to="/register"
                  className="bg-transparent text-[#440798] border border-[#440798] px-6 py-2 rounded-md text-sm font-medium hover:bg-[#440798] hover:text-white transition-colors duration-300 inline-block"
                >
                  إنشاء حساب
                </Link> */}
              </>
            )}

            <button
              onClick={handleToggleSideMenu}
              className={`flex items-center justify-center w-9 h-9 bg-[#fff] border-2 border border-[#440798] rounded-full transition-all duration-300 hover:bg-[#eee] ${
                isScrolled ? "text-white" : "text-[#440798]"
              }`}
            >
              <RiMenu4Line className="text-[#440798] text-md" />
            </button>

            <LanguageToggle handleCloseNavigation={handleCloseSideMenu} />
            {/* Search Button */}
            <Link
              to="#"
              className="flex items-center justify-center w-9 h-9 bg-[#fff] border-2 border border-[#440798] rounded-full transition-all duration-300 hover:bg-[#eee]"
            >
              <IoSearchOutline className="text-[#440798] text-md" />
            </Link>
          </div>
        </div>

        {/* Side Menu */}
      </div>
      <SideMenu isOpen={isSideMenuOpen} onClose={handleCloseSideMenu} />
    </>
  );
};

export default Navbar;

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import { useUserStore } from "@stores/userStore";
import { APP_ROUTES } from "@constants";
import {
  IoPersonOutline,
  IoHeartOutline,
  IoReceiptOutline,
  IoWalletOutline,
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoSparklesOutline,
  IoMailOutline,
  IoLogOutOutline,
  IoChevronBack,
} from "react-icons/io5";

const ProfileDashboardLayout: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  const menu: {
    to: string;
    end?: boolean;
    labelKey: string;
    icon: React.ComponentType<{ className?: string }>;
    state?: { from: string };
  }[] = [
    {
      to: "/profile",
      end: true,
      labelKey: "profileDashboard.menu_account",
      icon: IoPersonOutline,
    },
    {
      to: "/saved",
      labelKey: "profileDashboard.menu_interests",
      icon: IoHeartOutline,
    },
    {
      to: "/orders",
      labelKey: "profileDashboard.menu_orders",
      icon: IoReceiptOutline,
    },
    {
      to: "/wallet",
      labelKey: "profileDashboard.menu_wallet",
      icon: IoWalletOutline,
    },
    {
      to: APP_ROUTES.about,
      labelKey: "profileDashboard.menu_how_to_use",
      icon: IoDocumentTextOutline,
    },
    {
      to: "/profile/subscribe-for-other",
      labelKey: "profileDashboard.menu_subscribe_other",
      icon: IoPeopleOutline,
    },
    {
      to: "/subscription/plans",
      labelKey: "profileDashboard.menu_upgrade",
      icon: IoSparklesOutline,
      state: { from: "/profile" },
    },
    {
      to: APP_ROUTES.contact,
      labelKey: "profileDashboard.menu_contact",
      icon: IoMailOutline,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50" style={{ marginTop: "77px" }}>
        <Outlet />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 pb-12"
      style={{ marginTop: "77px", minHeight: "calc(-76px + 70vh)" }}
    >
      <div className="container mx-auto px-4 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t("profileDashboard.title")}
        </h1>
        <div
          dir={isRTL ? "rtl" : "ltr"}
          className="flex flex-col gap-6 lg:flex-row lg:items-start"
        >
          <aside className="w-full shrink-0 lg:w-64 lg:order-1">
            <nav
              className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <ul className="divide-y divide-gray-100">
                {menu.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={`${item.to}-${item.labelKey}`}>
                      <NavLink
                        to={item.to}
                        end={!!item.end}
                        state={item.state}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-[#440798]/10 text-[#440798]"
                              : "text-gray-700 hover:bg-gray-50"
                          }`
                        }
                      >
                        <Icon className="w-5 h-5 shrink-0 opacity-90" />
                        <span className="flex-1 text-start">
                          {t(item.labelKey)}
                        </span>
                        <IoChevronBack
                          className={`w-4 h-4 shrink-0 text-gray-400 ${
                            isRTL ? "" : "rotate-180"
                          }`}
                        />
                      </NavLink>
                    </li>
                  );
                })}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <IoLogOutOutline className="w-5 h-5 shrink-0" />
                    <span className="flex-1 text-start">
                      {t("profileDashboard.menu_logout")}
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="min-w-0 flex-1 lg:order-2">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboardLayout;

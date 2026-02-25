import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useTranslation } from "react-i18next";
import { useIsRTL } from "@hooks";
import {
  IoHeartOutline,
  IoHeart,
  IoTrashOutline,
} from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
import { useFavorites, useFavoriteToggle } from "@hooks/api/useMokafaatQueries";
import { normalizeFavoritesList, type NormalizedFavorite } from "@utils/favorites";
import { toast } from "react-toastify";
import { LoadingSpinner } from "@components/LoadingSpinner";

const SavedPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const token = useUserStore((s) => s.token);
  const { data: favoritesData, isLoading, refetch } = useFavorites();
  const toggleMutation = useFavoriteToggle();

  const [filter, setFilter] = useState<"all" | "offer" | "card" | "coupon">("all");

  const items = useMemo(() => normalizeFavoritesList(favoritesData ?? null), [favoritesData]);
  const filteredItems = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.type === filter)),
    [items, filter]
  );

  const handleRemove = (item: NormalizedFavorite) => {
    toggleMutation.mutate(
      { favorable_type: item.favorable_type, favorable_id: item.favorable_id },
      {
        onSuccess: () => {
          refetch();
          toast.success(isRTL ? "تمت إزالته من المحفوظات" : "Removed from favorites");
        },
        onError: () => toast.error(isRTL ? "فشل في التحديث" : "Update failed"),
      }
    );
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "offer":
        return t("saved.types.offer");
      case "card":
        return t("saved.types.card");
      case "coupon":
        return t("saved.types.coupon");
      case "booking":
        return t("saved.types.booking");
      default:
        return t("saved.types.item");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "offer":
        return "bg-orange-100 text-orange-800";
      case "card":
        return "bg-blue-100 text-blue-800";
      case "coupon":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getItemPath = (item: NormalizedFavorite): string | null => {
    const id = String(item.favorable_id);
    switch (item.type) {
      case "offer":
        if (item.companyId && (item.category || "offers")) {
          return `/offers/${item.category || "offers"}/${item.companyId}/offer/${id}`;
        }
        return null;
      case "card":
        if (item.companyId) {
          return `/cards/${item.companyId}/offer/${id}`;
        }
        return `/cards/${id}/offer/${id}`;
      case "coupon":
        return "/coupons";
      default:
        return null;
    }
  };

  const handleItemClick = (item: NormalizedFavorite) => {
    const path = getItemPath(item);
    if (path) navigate(path);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-28 flex items-center justify-center" style={{ marginTop: "77px" }}>
        <div className="text-center bg-white rounded-xl p-8 shadow-sm max-w-md">
          <IoHeartOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{isRTL ? "تسجيل الدخول مطلوب" : "Login required"}</h2>
          <p className="text-gray-600 mb-6">{isRTL ? "سجّل دخولك لعرض المحفوظات" : "Sign in to view your saved items"}</p>
          <Link
            to="/login?returnUrl=/saved"
            className="bg-[#440798] text-white px-6 py-3 rounded-lg hover:bg-[#440798c9] transition-colors inline-block"
          >
            {isRTL ? "تسجيل الدخول" : "Login"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-28" style={{ marginTop: "77px" }}>
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t("saved.title")}</h1>
              <p className="text-gray-600 mt-1">{t("saved.subtitle", { count: items.length })}</p>
            </div>
            <IoHeart className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex justify-start mb-8 gap-3 flex-wrap">
              {[
                { key: "all" as const, label: t("saved.filters.all"), count: items.length },
                { key: "offer" as const, label: t("saved.filters.offers"), count: items.filter((i) => i.type === "offer").length },
                { key: "card" as const, label: t("saved.filters.cards"), count: items.filter((i) => i.type === "card").length },
                { key: "coupon" as const, label: t("saved.types.coupon"), count: items.filter((i) => i.type === "coupon").length },
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setFilter(opt.key)}
                  className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                    filter === opt.key ? "bg-[#400198] text-white shadow-lg" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {opt.label} ({opt.count})
                </button>
              ))}
            </div>

            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => {
                  const path = getItemPath(item);
                  const isClickable = path != null;
                  return (
                    <div
                      key={item.id}
                      role={isClickable ? "button" : undefined}
                      tabIndex={isClickable ? 0 : undefined}
                      onClick={() => isClickable && handleItemClick(item)}
                      onKeyDown={(e) => {
                        if (isClickable && (e.key === "Enter" || e.key === " ")) {
                          e.preventDefault();
                          handleItemClick(item);
                        }
                      }}
                      className={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${isClickable ? "cursor-pointer" : ""}`}
                    >
                      <div className="relative">
                        <img
                          src={item.image || "https://via.placeholder.com/300x200?text=Image"}
                          alt={item.title[isRTL ? "ar" : "en"]}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                            {getTypeLabel(item.type)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemove(item);
                          }}
                          disabled={toggleMutation.isPending}
                          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors disabled:opacity-70"
                        >
                          <IoTrashOutline className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.title[isRTL ? "ar" : "en"]}
                        </h3>
                        {(item.price != null || item.originalPrice != null) && (
                          <div className="flex items-center gap-2 mb-4">
                            {item.price != null && (
                              <span className="text-lg font-bold text-[#440798] flex items-center gap-1">
                                {item.price}
                                <CurrencyIcon size={16} className="text-[#440798]" />
                              </span>
                            )}
                            {item.originalPrice != null && (
                              <span className="text-sm text-gray-500 line-through flex items-center gap-1">
                                {item.originalPrice}
                                <CurrencyIcon size={14} className="text-gray-500" />
                              </span>
                            )}
                          </div>
                        )}
                        <div className="mt-3 text-xs text-gray-500">
                          {t("saved.saved_since")} {new Date(item.savedAt).toLocaleDateString("ar-SA")}
                        </div>
                        {isClickable && (
                          <span className="mt-2 inline-block text-sm text-[#440798] hover:underline">
                            {isRTL ? "عرض التفاصيل" : "View details"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <IoHeartOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {filter === "all" ? t("saved.empty.title") : t("saved.empty.title_filtered", { type: getTypeLabel(filter) })}
                </h3>
                <p className="text-gray-600 mb-6">{t("saved.empty.description")}</p>
                <Link
                  to="/offers"
                  className="bg-[#440798] text-white px-6 py-2 rounded-md hover:bg-[#440798c9] transition-colors inline-block"
                >
                  {t("saved.empty.browse_offers")}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SavedPage;

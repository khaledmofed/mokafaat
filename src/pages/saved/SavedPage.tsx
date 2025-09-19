import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "@stores/userStore";
import { useTranslation } from "react-i18next";
import {
  IoHeartOutline,
  IoHeart,
  IoTrashOutline,
  // IoCartOutline,
  // IoEyeOutline,
} from "react-icons/io5";
import CurrencyIcon from "@components/CurrencyIcon";
const SavedPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    savedItems,
    removeFromSaved,
    // resetStore
  } = useUserStore();
  const [filter, setFilter] = useState<"all" | "offer" | "card" | "booking">(
    "all"
  );

  const filteredItems =
    filter === "all"
      ? savedItems
      : savedItems.filter((item) => item.type === filter);

  const handleRemoveFromSaved = (itemId: string) => {
    removeFromSaved(itemId);
  };

  // const handleAddToCart = (item: SavedItem) => {
  //   addToCart({
  //     type: item.type,
  //     itemId: item.itemId,
  //     companyId: item.companyId,
  //     title: item.title,
  //     image: item.image,
  //     price: item.price || 0,
  //     originalPrice: item.originalPrice,
  //     quantity: 1,
  //   });
  // };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "offer":
        return t("saved.types.offer");
      case "card":
        return t("saved.types.card");
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
      case "booking":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 pt-8 pb-28"
      style={{ marginTop: "77px" }}
    >
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t("saved.title")}
              </h1>
              <p className="text-gray-600 mt-1">
                {t("saved.subtitle", { count: savedItems.length })}
              </p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <IoHeart className="w-8 h-8 text-red-500" />
              {/* <button
                onClick={resetStore}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors"
                title="إعادة تعيين البيانات لعرض العناصر الجديدة"
              >
                إعادة تعيين
              </button> */}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-start mb-8 gap-3 relative z-10 w-1/2">
          {[
            {
              key: "all",
              label: t("saved.filters.all"),
              count: savedItems.length,
            },
            {
              key: "offer",
              label: t("saved.filters.offers"),
              count: savedItems.filter((item) => item.type === "offer").length,
            },
            {
              key: "card",
              label: t("saved.filters.cards"),
              count: savedItems.filter((item) => item.type === "card").length,
            },
            {
              key: "booking",
              label: t("saved.filters.bookings"),
              count: savedItems.filter((item) => item.type === "booking")
                .length,
            },
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() =>
                setFilter(
                  filterOption.key as "all" | "offer" | "card" | "booking"
                )
              }
              className={`px-5 py-3 rounded-full font-medium text-sm shadow-md transition-all duration-300 ${
                filter === filterOption.key
                  ? "bg-[#400198] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {filterOption.label} ({filterOption.count})
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title.ar}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        item.type
                      )}`}
                    >
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveFromSaved(item.itemId)}
                    className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                  >
                    <IoTrashOutline className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title.ar}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{item.title.en}</p>

                  {/* Price */}
                  {item.price && (
                    <div className="flex items-center space-x-2 space-x-reverse mb-4">
                      <span className="text-lg font-bold text-[#440798] flex items-center gap-1">
                        {item.price}
                        <CurrencyIcon size={16} className="text-[#440798]" />
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through flex items-center gap-1">
                          {item.originalPrice}
                          <CurrencyIcon size={14} className="text-gray-500" />
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  {/* <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-[#440798] text-white py-2 px-4 rounded-md hover:bg-[#440798c9] transition-colors flex items-center justify-center"
                    >
                      <IoCartOutline className="w-4 h-4 ml-1" />
                      إضافة للسلة
                    </button>
                    <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <IoEyeOutline className="w-4 h-4" />
                    </button>
                  </div> */}

                  {/* Date */}
                  <div className="mt-3 text-xs text-gray-500">
                    {t("saved.saved_since")}{" "}
                    {new Date(item.savedAt).toLocaleDateString("ar-SA")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <IoHeartOutline className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === "all"
                ? t("saved.empty.title")
                : t("saved.empty.title_filtered", {
                    type: getTypeLabel(filter),
                  })}
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
      </div>
    </div>
  );
};

export default SavedPage;

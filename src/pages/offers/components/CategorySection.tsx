import React from "react";
import { useTranslation } from "react-i18next";
import {
  CarIcon,
  CoffeeIcon,
  DeliveryIcon,
  HeadphoneIcon,
  HotelIcon,
  RestaurantIcon,
  ShopIcon,
} from "@assets";
import CategoryCard from "@components/CategoryCard";

const CategorySection: React.FC = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 1,
      icon: RestaurantIcon,
      title: t("home.categories.restaurants"),
      alt: t("home.categories.restaurants"),
      key: "restaurants",
    },
    {
      id: 2,
      icon: CoffeeIcon,
      title: t("home.categories.cafes"),
      alt: t("home.categories.cafes"),
      key: "cafes",
    },
    {
      id: 3,
      icon: HeadphoneIcon,
      title: t("home.categories.entertainment"),
      alt: t("home.categories.entertainment"),
      key: "entertainment",
    },
    {
      id: 4,
      icon: ShopIcon,
      title: t("home.categories.shops"),
      alt: t("home.categories.shops"),
      key: "shopping",
    },
    {
      id: 5,
      icon: HotelIcon,
      title: t("home.categories.hotels"),
      alt: t("home.categories.hotels"),
      key: "hotels",
    },
    {
      id: 6,
      icon: CarIcon,
      title: t("home.categories.cars"),
      alt: t("home.categories.cars"),
      key: "cars",
    },
    {
      id: 7,
      icon: DeliveryIcon,
      title: t("home.categories.delivery"),
      alt: t("home.categories.delivery"),
      key: "services",
    },
  ];

  return (
    <section className="relative container mx-auto px-4 py-8 z-10">
      <div
        className="w-full max-w-6xl px-4 z-10 mx-auto"
        style={{
          marginTop: "-80px",
        }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              alt={category.alt}
              categoryKey={category.key}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

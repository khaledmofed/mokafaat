import React, { useMemo } from "react";
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
import { useWebHome } from "@hooks/api/useMokafaatQueries";

const CategorySection: React.FC = () => {
  const { t } = useTranslation();
  const { data: webHomeResponse, isLoading, error } = useWebHome();

  // Debug: طباعة الـ response للتأكد من الشكل
  React.useEffect(() => {
    if (webHomeResponse) {
      console.log("Web Home API Response:", webHomeResponse);
    }
    if (error) {
      console.error("Web Home API Error:", error);
    }
  }, [webHomeResponse, error]);

  // Fallback categories (من الترجمة) إذا الـ API ما رجع بيانات
  const fallbackCategories = useMemo(
    () => [
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
    ],
    [t]
  );

  // استخراج categories من الـ API response
  // الـ response من /api/web/home يكون: { status, errNum, msg, data: { categories: [...] } }
  const apiCategories = useMemo(() => {
    if (!webHomeResponse) {
      console.log("No web home response");
      return [];
    }

    console.log("Processing web home response:", webHomeResponse);

    // استخراج categories من response.data.categories
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cats = data?.categories as Array<Record<string, unknown>> | undefined;

    if (!Array.isArray(cats) || cats.length === 0) {
      console.log("No categories array found in response.data.categories");
      return [];
    }

    console.log("Found categories array:", cats);

    const mapped = cats
      .map((cat) => {
        const id = cat.id;
        const name = String(cat.name ?? cat.title ?? "");
        const slug = String(cat.slug ?? "");
        let image = String(cat.image ?? cat.image_url ?? "");

        // إصلاح URL مكرر في الصور (مثل: https://mokafat.ivadso.com/storage/https://mokafat.ivadso.com/storage/...)
        if (image && image.includes("/storage/https://")) {
          const storageIndex = image.indexOf("/storage/https://");
          image =
            image.substring(0, storageIndex + "/storage".length) +
            image.substring(storageIndex + "/storage/https://".length);
        }

        if (!name || !slug) {
          console.warn("Category missing name or slug:", cat);
          return null;
        }

        return {
          id: typeof id === "number" ? id : 0,
          icon: image || RestaurantIcon, // إذا image موجود من API نستخدمه، وإلا أيقونة افتراضية
          title: name,
          alt: name,
          key: slug,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);

    console.log("Mapped categories:", mapped);
    return mapped;
  }, [webHomeResponse]);

  const categories =
    apiCategories.length > 0 ? apiCategories : fallbackCategories;

  // عرض loading state إذا كان الـ API ما زال يحمل
  if (isLoading) {
    return (
      <section className="relative container mx-auto px-4 py-8 z-10">
        <div
          className="w-full max-w-6xl px-4 z-10 mx-auto"
          style={{
            marginTop: "-80px",
          }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {fallbackCategories.map((category) => (
              <div
                key={category.id}
                className="w-1/2 sm:w-1/3 lg:w-[14.285714%] min-w-0"
              >
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  alt={category.alt}
                  categoryKey={category.key}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative container mx-auto px-4 py-8 z-10">
      <div
        className="w-full max-w-6xl px-4 z-10 mx-auto"
        style={{
          marginTop: "-80px",
        }}
      >
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            خطأ في تحميل التصنيفات. يتم عرض البيانات الافتراضية.
          </div>
        )}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-1/2 sm:w-1/3 lg:w-[14.285714%] min-w-0"
            >
              <CategoryCard
                icon={category.icon}
                title={category.title}
                alt={category.alt}
                categoryKey={category.key}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

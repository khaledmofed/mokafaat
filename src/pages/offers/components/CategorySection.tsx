import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import OwlCarousel from "react-owl-carousel";
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
import { useIsRTL } from "@hooks";
import { useWebHome } from "@hooks/api/useMokafaatQueries";

/** من هنا فما فوق = دسكتوب: شبكة 6 أعمدة بدون سلايدر، محاذاة للوسط */
const DESKTOP_BREAKPOINT_PX = 1024;

type CategoryItem = {
  id: number;
  icon: string;
  title: string;
  alt: string;
  key: string;
};

const CategorySection: React.FC = () => {
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const { data: webHomeResponse, isLoading, error } = useWebHome();
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT_PX}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (webHomeResponse) console.log("Web Home API Response:", webHomeResponse);
    if (error) console.error("Web Home API Error:", error);
  }, [webHomeResponse, error]);

  const fallbackCategories = useMemo<CategoryItem[]>(
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
    [t],
  );

  const apiCategories = useMemo(() => {
    if (!webHomeResponse) return [];
    const res = webHomeResponse as Record<string, unknown>;
    const data = res?.data as Record<string, unknown> | undefined;
    const cats = data?.categories as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(cats) || cats.length === 0) return [];

    return cats
      .map((cat) => {
        const id = cat.id;
        const name = String(cat.name ?? cat.title ?? "");
        const slug = String(cat.slug ?? "");
        let image = String(cat.image ?? cat.image_url ?? "");
        if (image && image.includes("/storage/https://")) {
          const storageIndex = image.indexOf("/storage/https://");
          image =
            image.substring(0, storageIndex + "/storage".length) +
            image.substring(storageIndex + "/storage/https://".length);
        }
        if (!name || !slug) return null;
        return {
          id: typeof id === "number" ? id : 0,
          icon: image || RestaurantIcon,
          title: name,
          alt: name,
          key: slug,
        };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null);
  }, [webHomeResponse]);

  const categories: CategoryItem[] =
    apiCategories.length > 0 ? apiCategories : fallbackCategories;

  const categoriesForDisplay = useMemo(
    () => (isRTL ? [...categories].reverse() : categories),
    [isRTL, categories],
  );
  const fallbackForDisplay = useMemo(
    () => (isRTL ? [...fallbackCategories].reverse() : fallbackCategories),
    [isRTL, fallbackCategories],
  );

  /** سلايدر للموبايل/تابلت فقط — بدون صف 7 على الشاشات الصغيرة */
  const mobileOwlOptions = useMemo(
    () => ({
      loop: categories.length > 2,
      margin: 8,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      rtl: false,
      responsive: {
        0: { items: 2 },
        640: { items: 3 },
      },
    }),
    [categories.length],
  );

  const loadingMobileOwlOptions = useMemo(
    () => ({
      loop: true,
      margin: 8,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      rtl: false,
      responsive: {
        0: { items: 2 },
        640: { items: 3 },
      },
    }),
    [],
  );

  const DESKTOP_COLS = 6;

  /**
   * دسكتوب: 6 بالصف، بدون فرض LTR — العربي dir=rtl والترتيب كما من الـ API (أول عنصر يمين).
   * الموبايل وحده يستخدم categoriesForDisplay (عكس) لأن السلايدر LTR.
   */
  const renderDesktopGrid = (list: CategoryItem[]) => {
    const n = list.length;
    const remainder = n % DESKTOP_COLS;
    const lastRowStart = remainder === 0 ? n : n - remainder;
    const fullRowItems = list.slice(0, lastRowStart);
    const lastRowItems = remainder > 0 ? list.slice(lastRowStart) : [];

    const cellClass =
      "min-w-0 shrink-0 w-[calc((100%-2.5rem)/6)] sm:w-[calc((100%-3.75rem)/6)]";

    return (
      <div
        className="w-full max-w-5xl mx-auto"
        dir={isRTL ? "rtl" : "ltr"}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {fullRowItems.length > 0 && (
          <div className="grid grid-cols-6 gap-2 sm:gap-3 w-full justify-items-stretch">
            {fullRowItems.map((category) => (
              <div key={category.id} className="min-w-0">
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  alt={category.alt}
                  categoryKey={category.key}
                />
              </div>
            ))}
          </div>
        )}
        {lastRowItems.length > 0 && (
          <div
            className={`flex flex-wrap justify-center items-stretch gap-2 sm:gap-3 w-full ${fullRowItems.length ? "mt-2 sm:mt-3" : ""}`}
          >
            {lastRowItems.map((category) => (
              <div key={category.id} className={cellClass}>
                <CategoryCard
                  icon={category.icon}
                  title={category.title}
                  alt={category.alt}
                  categoryKey={category.key}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="relative container mx-auto px-4 py-8 z-10">
        <div
          className="w-full max-w-6xl px-4 z-10 mx-auto"
          style={{ marginTop: "-80px" }}
        >
          {isDesktop ? (
            renderDesktopGrid(fallbackCategories)
          ) : (
            <div
              className="relative OffersCarousel PropertiesCarousel CategoryCarousel"
              dir="ltr"
              style={{ direction: "ltr" }}
            >
              <OwlCarousel
                className="owl-theme"
                {...loadingMobileOwlOptions}
                dir="ltr"
                style={{ direction: "ltr" }}
              >
                {fallbackForDisplay.map((category) => (
                  <div key={category.id} className="item">
                    <CategoryCard
                      icon={category.icon}
                      title={category.title}
                      alt={category.alt}
                      categoryKey={category.key}
                    />
                  </div>
                ))}
              </OwlCarousel>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative container mx-auto px-4 py-8 z-10">
      <div
        className="w-full max-w-6xl px-4 z-10 mx-auto"
        style={{ marginTop: "-80px" }}
      >
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            خطأ في تحميل التصنيفات. يتم عرض البيانات الافتراضية.
          </div>
        )}
        {isDesktop ? (
          renderDesktopGrid(categories)
        ) : (
          <div
            className="relative OffersCarousel PropertiesCarousel CategoryCarousel"
            dir="ltr"
            style={{ direction: "ltr" }}
          >
            <OwlCarousel
              key={`categories-mobile-${categories.length}-${isRTL ? "rtl" : "ltr"}`}
              className="owl-theme"
              {...mobileOwlOptions}
              dir="ltr"
              style={{ direction: "ltr" }}
            >
              {categoriesForDisplay.map((category) => (
                <div key={category.id} className="item">
                  <CategoryCard
                    icon={category.icon}
                    title={category.title}
                    alt={category.alt}
                    categoryKey={category.key}
                  />
                </div>
              ))}
            </OwlCarousel>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;

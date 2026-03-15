import React, { useMemo, useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import { useIsRTL } from "@hooks";

export interface CardsCategoryItem {
  id: number | string;
  name: string;
  image?: string;
}

interface CardsCategoryCardProps {
  image: string;
  title: string;
  alt: string;
  selected: boolean;
  onClick: () => void;
}

const CardsCategoryCard: React.FC<CardsCategoryCardProps> = ({
  image,
  title,
  alt,
  selected,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`w-full bg-white rounded-xl py-4 px-4 flex flex-col items-center transition-all duration-300 cursor-pointer group border ${
      selected
        ? "border-[#400198] shadow-md shadow-[#400198]/20 scale-[1.02]"
        : "border-gray-100 hover:scale-105"
    }`}
    style={
      selected
        ? {
            boxShadow:
              "0 10px 15px -3px rgba(68, 7, 152, 0.2), 0 4px 6px -2px rgba(68, 7, 152, 0.1)",
          }
        : {
            boxShadow:
              "0 10px 15px -3px rgba(68, 7, 152, 0.1), 0 4px 6px -2px rgba(68, 7, 152, 0.05)",
          }
    }
  >
    <div
      className={`w-14 h-14 mb-4 flex items-center justify-center rounded-full transition-all duration-300 overflow-hidden ${
        selected
          ? "bg-gradient-to-br from-[#400198]/20 to-[#400198]/30"
          : "bg-gradient-to-br from-purple-50 to-purple-100 group-hover:from-purple-100 group-hover:to-purple-200"
      }`}
    >
      {image ? (
        <img
          src={image}
          alt={alt}
          className={`w-8 h-8 object-contain transition-transform duration-300 ${
            selected ? "opacity-100" : "filter group-hover:scale-110"
          }`}
        />
      ) : (
        <span className="text-[#400198] text-lg font-bold">{title}</span>
      )}
    </div>
    <span
      className={`text-[14px] font-semibold text-center transition-colors duration-300 leading-tight ${
        selected
          ? "text-[#400198]"
          : "text-gray-800 group-hover:text-purple-700"
      }`}
    >
      {title}
    </span>
    <div
      className={`w-8 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mt-3 transition-opacity duration-300 ${
        selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    />
  </button>
);

interface CardsCategorySectionProps {
  categories: CardsCategoryItem[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  isLoading?: boolean;
}

const CardsCategorySection: React.FC<CardsCategorySectionProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  isLoading = false,
}) => {
  const isRTL = useIsRTL();
  const [carouselKey, setCarouselKey] = useState(0);

  const displayCategories = useMemo(
    () => (isRTL ? [...categories].reverse() : categories),
    [isRTL, categories],
  );

  useEffect(() => {
    setCarouselKey((prev) => prev + 1);
  }, [isRTL]);

  const owlCarouselOptions = useMemo(
    () => ({
      loop: displayCategories.length > 4,
      margin: 0,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      rtl: isRTL && displayCategories.length < 4 ? "true" : "false",
      responsive: {
        0: { items: 2 },
        640: { items: 3 },
        1024: { items: 7 },
      },
    }),
    [isRTL, displayCategories.length],
  );

  if (isLoading) {
    return (
      <section className="relative container mx-auto px-4 py-8 z-10">
        <div
          className="w-full max-w-6xl px-4 z-10 mx-auto"
          style={{ marginTop: "-80px" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl py-4 px-4 border border-gray-100 animate-pulse"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gray-200 rounded-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative container mx-auto px-4 py-8 z-10 CardsCategorySection">
      <div
        className="w-full max-w-6xl px-4 z-10 mx-auto"
        style={{ marginTop: "-80px" }}
      >
        <div
          className="relative OffersCarousel PropertiesCarousel CategoryCarousel CardsCategorySectionCarousel"
          style={{
            direction: isRTL && displayCategories.length < 4 ? "rtl" : "ltr",
          }}
        >
          <OwlCarousel
            key={`cards-categories-${carouselKey}-${displayCategories.length}`}
            className="owl-theme"
            {...owlCarouselOptions}
            style={{
              direction: isRTL && displayCategories.length < 4 ? "rtl" : "ltr",
            }}
          >
            {displayCategories.map((cat) => (
              <div key={String(cat.id)} className="item">
                <CardsCategoryCard
                  image={cat.image ?? ""}
                  title={cat.name}
                  alt={cat.name}
                  selected={selectedCategoryId === String(cat.id)}
                  onClick={() => onSelectCategory(String(cat.id))}
                />
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default CardsCategorySection;

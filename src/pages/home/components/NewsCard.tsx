import React from "react";
import { useNavigate } from "react-router-dom";
import { useIsRTL } from "@hooks";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundForward } from "react-icons/io";
import { BsShare } from "react-icons/bs";
import { LuCalendarRange } from "react-icons/lu";
import { HiOutlineEye } from "react-icons/hi";
// import { newsArticles } from "./NewsBlogs";

interface NewsCardProps {
  id: number;
  image: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  date: string;
  dateEn: string;
  views: string;
  // category: string;
  categoryEn: string;
  categoryAr: string;
  slug: string;
  onShare?: (id: number) => void;
  onVisit?: (id: number) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  image,
  title,
  titleEn,
  description,
  descriptionEn,
  date,
  dateEn,
  views,
  // category,
  categoryEn,
  categoryAr,
  slug,
  onShare,
  onVisit,
}) => {
  const navigate = useNavigate();
  const isRTL = useIsRTL();
  const { t } = useTranslation();

  const handleShare = () => {
    if (onShare) onShare(id);
  };

  const handleVisit = () => {
    if (onVisit) onVisit(id);
    // Navigate to the article page using slug
    navigate(`/blogs/${slug}`);
  };

  return (
    <div
      className="cursor-pointer mainNewsBlogsCard bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 max-w-sm"
      style={{
        direction: isRTL ? "rtl" : "ltr",
      }}
      onClick={handleVisit}
    >
      {/* Image Section - Height 180px as requested */}
      <div className="relative h-[180px] overflow-hidden ">
        <img
          src={image}
          alt={title}
          className="w-full h-[180px] object-cover"
        />
        {/* Top Right - Share Icon */}
        <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}>
          <button
            onClick={handleShare}
            className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-gray-700 hover:bg-opacity-100 transition-all duration-200"
          >
            <BsShare className="text-sm" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-6 px-4">
        {/* Date and Views */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LuCalendarRange className="text-md text-[#fd671a]" />
            <span className="text-xs text-gray-700 font-medium">
              {isRTL ? date : dateEn}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineEye className="text-md text-[#fd671a]" />
            <span className="text-xs text-gray-700 font-medium">
              {isRTL ? "المشاهدات: " : "Views: "}
              {views}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="mb-3">
          <span className="text-xs text-[#fd671a] font-medium bg-[#f8f9fa] px-2 py-1 rounded-full">
            {isRTL ? categoryAr : categoryEn}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-bold text-[#400198] mb-3 leading-tight line-clamp-1"
          style={{
            fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          {isRTL ? title : titleEn}
        </h3>

        {/* Description */}
        <p
          className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2"
          style={{
            fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
          }}
        >
          {isRTL ? description : descriptionEn}
        </p>

        {/* Visit Now Button */}
        <button
          onClick={handleVisit}
          className="text-sm text-[#400198] hover:text-[#fd671a] transition-colors duration-300 font-semibold flex items-center gap-2"
          style={{
            fontFamily: isRTL ? "Readex Pro, sans-serif" : "Jost, sans-serif",
          }}
        >
          <span>{isRTL ? "زيارة الآن" : t("newsBlogs.visitNow")}</span>
          <IoIosArrowRoundForward
            className={`text-xl transform ${
              isRTL ? "rotate-45" : "-rotate-45"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;

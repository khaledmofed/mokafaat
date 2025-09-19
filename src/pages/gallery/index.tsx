import { GetStarted } from "@pages/home/components";
import { t } from "i18next";
import { Helmet } from "react-helmet-async";
import { useIsRTL } from "@hooks";
import { useState } from "react";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { GalleryHero } from "./components";

// Interface for Gallery data from API
interface GalleryItem {
  id: number;
  image: string;
}

interface GalleryResponse {
  status: boolean;
  data: {
    gallery: GalleryItem[];
    totalItems: number;
    totalPages: number;
    page: number;
  };
  error?: string;
  message?: string;
}

const GalleryPage = () => {
  const isRTL = useIsRTL();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 16;

  // Get Gallery from API
  const { data: galleryResponse, isLoading } = useGetQuery({
    endpoint: `${API_ENDPOINTS.getGallery}?page=${currentPage}&perPage=${perPage}`,
  });

  const galleryData: GalleryResponse | null = galleryResponse?.data
    ? (galleryResponse as GalleryResponse)
    : null;
  const galleryItems = galleryData?.data?.gallery || [];
  const totalPages = galleryData?.data?.totalPages || 1;

  // Function to render gallery grid (8 images per grid)
  const renderGalleryGrid = (images: GalleryItem[], startIndex: number) => {
    const gridImages = images.slice(startIndex, startIndex + 8);

    if (gridImages.length === 0) return null;

    return (
      <div
        className="grid grid-cols-3 gap-4"
        style={{ gridTemplateRows: "auto auto" }}
      >
        {/* الصف الأول */}

        {/* صورتان صغيرتان (يسار) */}
        <div className="col-span-2 flex gap-4">
          <div className="w-1/2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
            <img
              src={gridImages[0]?.image || ""}
              alt=""
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="w-1/2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
            <img
              src={gridImages[1]?.image || ""}
              alt=""
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* صورة عريضة أسفل الصور الصغيرة (يسار) */}
        <div className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
          <img
            src={gridImages[2]?.image || ""}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* صورة طويلة يمين (الصف الأول) */}
        <div className="col-span-1 relative overflow-hidden h-456 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
          <img
            src={gridImages[3]?.image || ""}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* الصف الثاني */}

        {/* صورة طويلة يمين (الصف الثاني) مع top: 235px */}
        <div
          className="col-span-1 relative overflow-hidden h-456 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group"
          style={{ top: "235px" }}
        >
          <img
            src={gridImages[4]?.image || ""}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* صورتان صغيرتان */}
        <div className="col-span-1 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
          <img
            src={gridImages[5]?.image || ""}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="col-span-1 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
          <img
            src={gridImages[6]?.image || ""}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* ديف فارغ يأخذ المساحة للصورة الطويلة */}
        <div className="col-span-1"></div>

        {/* صورة عريضة أسفل */}
        <div className="col-span-2 h-220 relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-700 ease-out group">
          <img
            src={gridImages[7]?.image || ""}
            alt=""
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>{t("gallery.title") || "Gallery"}</title>
        <link rel="canonical" href="https://mukafaat.com/gallery" />
        <meta
          name="description"
          content="Explore our event gallery showcasing amazing events and celebrations."
        />
        <meta property="og:title" content={t("gallery.title") || "Gallery"} />
        <meta
          property="og:description"
          content="Explore our event gallery showcasing amazing events and celebrations."
        />
      </Helmet>

      {/* Gallery Hero Section */}
      <GalleryHero />

      {/* Gallery Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-500 mt-4 text-lg">Loading gallery...</p>
            </div>
          ) : galleryItems.length > 0 ? (
            <div className="space-y-4">
              {/* First Grid - First 8 images */}
              {renderGalleryGrid(galleryItems, 0)}

              {/* Second Grid - Next 8 images */}
              {renderGalleryGrid(galleryItems, 8)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">
                No gallery items available
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#fd671a] text-white hover:bg-purple-700"
                }`}
              >
                {isRTL ? "السابق" : "Previous"}
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#C13899] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#fd671a] text-white hover:bg-purple-700"
                }`}
              >
                {isRTL ? "التالي" : "Next"}
              </button>
            </div>
          )}
        </div>
      </section>

      <GetStarted />
    </>
  );
};

export default GalleryPage;

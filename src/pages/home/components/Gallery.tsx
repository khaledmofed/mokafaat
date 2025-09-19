import { LoadingSpinner } from "@components";
import { galleryCarouselResponsive } from "@constants";
import { GalleryModel } from "@entities";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";

const Gallery = () => {
  const [gallery, setGallery] = useState<GalleryModel[]>([]);
  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: API_ENDPOINTS.getGallery,
  });

  useEffect(() => {
    const galleryData = data?.data?.gallery;
    if (isSuccess && data?.status && galleryData) {
      setGallery(galleryData);
    }
  }, [isSuccess, data]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    gallery.length > 0 && (
      <div dir="ltr" className="overflow-hidden py-4 max-w-screen-2xl mx-auto">
        <OwlCarousel
          className="owl-theme"
          loop
          margin={10}
          autoplayTimeout={1500}
          autoplay
          animateOut
          animateIn
          responsive={galleryCarouselResponsive}
        >
          {gallery.map((item) => (
            <div
              className="item overflow-hidden wow fadeIn"
              data-wow-delay="0.2s"
              key={item.id}
            >
              <img
                src={item.image}
                alt="gallery item"
                className="h-60 md:h-72 object-cover transition-transform duration-400 ease-in-out transform hover:scale-105"
              />
            </div>
          ))}
        </OwlCarousel>
      </div>
    )
  );
};

export default Gallery;

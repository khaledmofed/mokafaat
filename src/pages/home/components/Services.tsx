import { FaPlay } from "react-icons/fa6";
import VideoPopup from "./VideoPopup";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { useIsRTL } from "@hooks";
import { t } from "i18next";
import { ServiceModel } from "@entities";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { LoadingSpinner } from "@components";

const Services = () => {
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [services, setServices] = useState<ServiceModel[]>([]);

  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: API_ENDPOINTS.getServices,
  });

  useEffect(() => {
    const servicesData = data?.data?.services;
    if (isSuccess && data?.status && servicesData) {
      setServices(servicesData);
    }
  }, [isSuccess, data]);

  const toggleVideoPopup = () => {
    setIsVideoPopupOpen(!isVideoPopupOpen);
  };

  const isRTL = useIsRTL();
  const whoFontType = isRTL
    ? "readex-pro text-lg top-0 right-0"
    : "font-pacifico text-5xl top-5 md:top-5";
  const titleFontType = isRTL
    ? "readex-pro text-3xl"
    : "font-nenu-condensed-bold text-7xl";

  return (
    <section
      id="services"
      className="services max-w-screen-xl flex flex-col mx-auto md:py-10 md:px-4 px-6 py-6"
    >
      <div className="top-info text-center w-full">
        <span
          className={`${whoFontType} mb-2 capitalize relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {t("home.services.our")}
        </span>
        <h1
          className={`mb-6 text-title font-bold ${titleFontType} uppercase z-2 wow fadeInUp`}
          data-wow-delay="0.3s"
        >
          {t("home.services.title")}
        </h1>
        <p
          className="mb-4 text-gray-400 text-sm px-10 lg:px-80 wow fadeInUp"
          data-wow-delay="0.3s"
        >
          {t("home.services.description")}
        </p>
        <div
          className="flex flex-row gap-4 items-center justify-center cursor-pointer wow fadeInUp"
          data-wow-delay="0.3s"
          onClick={toggleVideoPopup}
        >
          <div className="relative p-6 bg-white rounded-full border-2 border-primary shadow-[0_0_0_4px_rgba(255,255,255,0.5)] cursor-pointer flex items-center justify-center">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FaPlay className="text-primary" />
            </div>
          </div>

          <span className="text-title capitalize text-md font-bold">
            {t("home.services.watch")}
          </span>
          <VideoPopup isOpen={isVideoPopupOpen} onClose={toggleVideoPopup} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full py-6">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          services.length > 0 &&
          services.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))
        )}
      </div>
    </section>
  );
};

export default Services;

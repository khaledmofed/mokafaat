import OwlCarousel from "react-owl-carousel";
import { clientsCarouselResponsive } from "@constants";
import { t } from "i18next";
import useGetQuery from "@hooks/api/useGetQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { useEffect, useState } from "react";
import { ClientModel } from "@entities";
import { LoadingSpinner } from "@components";

const Clients = (props: { isRTL: boolean }) => {
  const { isRTL } = props;
  const [clients, setClients] = useState<ClientModel[]>([]);

  const { data, isSuccess, isLoading } = useGetQuery({
    endpoint: API_ENDPOINTS.getClients,
  });

  useEffect(() => {
    const clientsData = data?.data?.clients;
    if (isSuccess && data?.status && clientsData) {
      setClients(clientsData);
    }
  }, [isSuccess, data]);

  const titleFont = isRTL
    ? "readex-pro text-4xl"
    : "font-nenu-condensed-bold text-6xl md:text-8xl ";
  const titleFontType = isRTL
    ? "readex-pro text-lg"
    : "font-nenu-condensed-bold text-2xl";

  return (
    <section
      id="clients"
      className="clients py-10 px-10 lg:py-14 lg:px-12 max-w-screen-xl mx-auto"
    >
      <div className="top-content grid md:grid-cols-2 md:mb-10 mb-10 lg:mb-0 items-start justify-start">
        <h1
          className={`${titleFont} font-bold mb-4 uppercase wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {t("home.clients.title")}
        </h1>
        <p
          className="text-sm md:text-md text-sub-title wow fadeInUp"
          data-wow-delay="0.3s"
        >
          {t("home.clients.description")}
        </p>
      </div>

      <h3
        className={`text-black ${titleFontType} font-bold uppercase hidden md:block wow fadeInUp`}
        data-wow-delay="0.3s"
      >
        {t("home.clients.partners")}
      </h3>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        clients.length > 0 && (
          <div dir="ltr" className="overflow-hidden">
            <OwlCarousel
              className="owl-theme"
              margin={10}
              autoplayTimeout={1500}
              autoplay
              animateOut
              animateIn
              responsive={clientsCarouselResponsive}
            >
              {clients.map((client) => (
                <div
                  className="item w-full min-h-[200px] wow fadeInUp"
                  data-wow-delay="0.2s"
                  key={client.id}
                >
                  <div className="bg-client-frame bg-contain bg-no-repeat bg-center flex justify-center items-center group">
                    <div className="relative">
                      <img
                        src={client.logo}
                        alt="gallery item"
                        className="h-60 md:h-42 md:p-20 lg:p-8 p-16 object-contain group-hover:blur-[2px] transition-blur transition-all duration-50"
                      />
                      <div
                        className="absolute top-1/2 left-0 right-0 bg-primary bg-opacity-90 text-white 
                      text-center text-sm capitalize py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {client.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        )
      )}
    </section>
  );
};

export default Clients;

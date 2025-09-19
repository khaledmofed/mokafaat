import { LoadingSpinner } from "@components";
import { EventModel } from "@entities";
import { useIsRTL } from "@hooks";
import useGetPaginationQuery from "@hooks/api/useGetPaginationQuery";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { t } from "i18next";
import React from "react";
import EventItem from "./EventItem";

const Portfolio = () => {
  const { data, isSuccess, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useGetPaginationQuery({
      endpoint: API_ENDPOINTS.getEvents,
      perPage: 12,
      query: "getEvents",
    });

  const isRTL = useIsRTL();
  const pastFontType = isRTL
    ? "readex-pro text-3xl"
    : "font-nenu-condensed-bold text-7xl";
  const titleFontType = isRTL
    ? "readex-pro text-lg"
    : "font-nenu-condensed-bold text-4xl";
  const titleSpacing = isRTL ? "0" : "0.8em";

  return (
    <section
      id="portfolio"
      className="portfolio max-w-screen-xl flex flex-col mx-auto md:py-10 md:px-4 px-6 py-6 overflow-hidden"
    >
      <div className="top-info text-center w-full">
        <h1
          className={`mb-4 text-title ${pastFontType} font-bold uppercase wow fadeInUp`}
          data-wow-delay="0.2s"
        >
          {t("home.portfolio.past-events")}
        </h1>
        <h3
          className={`text-primary ${titleFontType} font-bold uppercase md:ms-6 wow fadeInUp`}
          style={{ letterSpacing: titleSpacing }}
          data-wow-delay="0.2s"
        >
          {t("home.portfolio.title")}
        </h3>
      </div>
      <div
        className="past-events-gallery w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pt-10 wow fadeInUp"
        data-wow-delay="0.3s"
      >
        {isLoading ? (
          <div className="m-10 flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : (
          isSuccess &&
          data?.pages.map((page) => (
            <React.Fragment key={page}>
              {page.events && page.events.length > 0 ? (
                page.events.map((item: EventModel) => (
                  <EventItem event={item} key={item.id} />
                ))
              ) : (
                <div key="no-events">No Events Found</div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
      {hasNextPage && (
        <h6
          onClick={() => fetchNextPage()}
          className="text-center mt-6 capitalize font-bold underline wow fadeInUp cursor-pointer"
          data-wow-delay="0.3s"
        >
          {isFetching ? <LoadingSpinner /> : t("home.portfolio.see-more")}
        </h6>
      )}
    </section>
  );
};

export default Portfolio;

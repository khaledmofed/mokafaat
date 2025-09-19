import { t } from "i18next";

const OurStaff = (props: { isRTL: boolean; description?: string }) => {
  const { isRTL, description } = props;
  const whoFontType = isRTL
    ? "readex-pro text-2xl top-0 right-0"
    : "font-pacifico text-5xl top-5 md:top-7 right-7";
  const titleFontType = isRTL
    ? "readex-pro text-4xl"
    : "font-nenu-condensed-bold text-7xl";

  return (
    <section className="our-staff flex max-w-screen-xl items-center justify-center mx-auto md:py-10 md:px-4 px-6 py-6">
      <div className="justify-center items-center grid lg:grid-cols-2">
        <div
          className="info flex flex-col max-w-lg me-10 ms-5 wow fadeInRight"
          data-wow-delay="0.2s"
        >
          <span
            className={`${whoFontType} mb-2 capitalize relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent wow fadeInUp`}
            data-wow-delay="0.2s"
          >
            {t("about.staff.our")}
          </span>
          <h1
            className={`mb-6 text-title font-bold ${titleFontType} uppercase z-2 wow fadeInUp`}
            data-wow-delay="0.3s"
          >
            {t("about.staff.title")}
          </h1>
          <p
            className="mb-4 text-title text-sm wow fadeInUp"
            data-wow-delay="0.3s"
          >
            {description}
          </p>
        </div>

        <div
          className="w-full min-h-80 bg-staff bg-no-repeat bg-center bg-contain relative block lg:flex wow fadeInLeft"
          data-wow-delay="0.2s"
        />
      </div>
    </section>
  );
};

export default OurStaff;

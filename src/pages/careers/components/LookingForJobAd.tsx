import { SecondaryButton } from "@components";
import { APP_ROUTES } from "@constants";
import { useIsRTL } from "@hooks";
import { t } from "i18next";

const LookingForJobAd = () => {
  const language = useIsRTL();
  const bgDir = language ? " bg-gradient-to-l" : " bg-gradient-to-r";
  const bgCircleDir = language ? "scale-x-[-1] left-0" : "right-0";
  const titleFontType = language
    ? "font-readex-pro text-4xl "
    : "font-nenu-condensed-bold md:text-5xl text-3xl";

  return (
    <section
      className={`looking-for-job-ad ${bgDir} from-black to-secondary w-full flex justify-center min-h-60 relative mt-10`}
    >
      <div
        className={`absolute ${bgCircleDir} top-0 bg-looking-for-job bg-contain bg-no-repeat bg-center md:min-w-40 min-w-20 md:min-h-48 min-h-24`}
      />
      <div className="add-content text-white md:w-2/4 w-full md:p-14 p-10 flex flex-col gap-4 items-start justify-center">
        <h1 className={`font-bold uppercase ${titleFontType}`}>
          {t("careers.ad.title")}
        </h1>
        <p className="text-sm">{t("careers.ad.description")}</p>
        <SecondaryButton to={APP_ROUTES.talent_application}>
          {t("careers.ad.apply")}
        </SecondaryButton>
      </div>
      <div className="w-2/4 hidden md:block bg-looking-for-job-person bg-contain bg-no-repeat bg-center min-h-72 mt-[-70px] z-5" />
    </section>
  );
};

export default LookingForJobAd;

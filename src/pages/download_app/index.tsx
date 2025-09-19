import { AppleStore, GooglePlay } from "@assets";
import { ChangePageTitle } from "@components";
import { t } from "i18next";

const DownloadAppPage = () => {
  ChangePageTitle({
    pageTitle: t("download_app.title"),
  });

  return (
    <div
      className="download_app container md:p-10 p-6 mx-auto w-full bg-gray-50 
    m-10 rounded-lg border text-center flex flex-col gap-6"
    >
      <h3 className="font-bold text-title text-lg">
        {t("download_app.header")}
      </h3>

      <p className="text-sm text-sub-title">{t("download_app.description")}</p>

      <div className="flex lg:flex-row flex-col lg:items-center items-start gap-2 buttons self-center">
        <a
          href={import.meta.env.VITE_GOOGLE_PLAY_LINK}
          title="Google Play"
          target="_blank"
        >
          <img src={GooglePlay} alt="Google Play" className="w-40" />
        </a>

        <a
          href={import.meta.env.VITE_APPLE_STORE_LINK}
          title="Apple Store"
          target="_blank"
        >
          <img src={AppleStore} alt="Apple Store" className="w-40" />
        </a>
      </div>
    </div>
  );
};

export default DownloadAppPage;

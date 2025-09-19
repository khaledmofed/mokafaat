import { t } from "i18next";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";

const index = () => {
  return (
    <div
      className="md:p-10 p-6 md:m-10 m-5 border border-gray-100 rounded-lg
  flex flex-col justify-center items-center gap-6 text-center"
    >
      <FaEnvelopeCircleCheck className="text-5xl text-success" />
      <h1 className="font-bold text-4xl text-title">
        {t("messages.applicationSent")}
      </h1>
      <p className="text-sm text-sub-title">
        {t("messages.jobApplicationSuccess")}
      </p>
    </div>
  );
};

export default index;

import { LoadingSpinner, SuccessDangerToast } from "@components";
import usePostRequestWithData from "@hooks/api/usePostRequestWithData";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { useParams } from "react-router-dom";

const index = () => {
  const { email, code } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    mutate,
    data: response,
    isPending,
  } = usePostRequestWithData({
    endpoint: API_ENDPOINTS.confirmEmail,
  });

  useEffect(() => {
    const data = {
      email: email,
      code: code,
    };
    mutate(data);
  }, [email, code]);

  useEffect(() => {
    if (response?.status == true) {
      setIsSuccess(true);
    } else if (response?.status == false && response.message) {
      setErrorMessage(response.message);
    }
  }, [response?.status, response]);

  return (
    <div
      className="md:p-10 p-6 md:m-10 m-5 border border-gray-100 rounded-lg
      flex flex-col justify-center items-center gap-6 text-center"
    >
      {isPending ? (
        <LoadingSpinner />
      ) : isSuccess ? (
        <>
          <RiVerifiedBadgeLine className="text-5xl text-success" />
          <h1 className="font-bold text-4xl text-title">
            {t("messages.emailConfirmed")}
          </h1>
          <p className="text-sm text-sub-title">
            {t("messages.emailConfirmedDesc")}
          </p>
        </>
      ) : (
        <SuccessDangerToast
          Icon={BsInfoCircle}
          text={errorMessage || ""}
          color="danger"
        />
      )}
    </div>
  );
};

export default index;

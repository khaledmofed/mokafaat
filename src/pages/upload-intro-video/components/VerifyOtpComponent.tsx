import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { ErrorMessage, PrimaryButton } from "@components";
import { useVerifyOtp } from "@hooks";
import type { TFunction } from "i18next";

const VerifyOtpComponent = (props: {
  t: TFunction;
  email: string;
  onNext: () => void;
}) => {
  const { t, email, onNext } = props;
  const [otp, setOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  const { verify, isPending, success, error, setError, setSuccess } =
    useVerifyOtp();

  const verifyOtp = () => {
    if (!otp) {
      setOtpError(t("upload_intro_video.otp_error"));
    } else {
      setOtpError(null);
      verify(email, otp);
    }
  };

  useEffect(() => {
    if (success && !error) {
      setSuccess(!success);
      setError(null);
      setOtp("");
      onNext();
    }

    if (error && !success) {
      setRequestError(error);
      setError(null);
    }
  }, [success, error, setSuccess, setError, onNext]);

  return (
    <div className="flex flex-col gap-4">
      <h6 className="font-bold">{t("upload_intro_video.title")}</h6>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="otp" className="text-sm">
          {t("upload_intro_video.enter_otp")}
        </label>
        <InputText
          id="otp"
          value={otp}
          placeholder={t("upload_intro_video.otp")}
          className="p-4 h-12 rounded-md w-full text-sm border bg-[#f9fafb]"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOtp(e.target.value)
          }
        />
        {otpError && (
          <small id="otp-error" className="text-xs text-danger">
            {otpError}
          </small>
        )}
      </div>

      {requestError && <ErrorMessage message={requestError} />}

      <PrimaryButton type="button" onClick={verifyOtp} isLoading={isPending}>
        {t("upload_intro_video.verify")}
      </PrimaryButton>
    </div>
  );
};

export default VerifyOtpComponent;

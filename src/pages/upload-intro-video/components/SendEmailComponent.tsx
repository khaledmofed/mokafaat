import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { ErrorMessage, PrimaryButton } from "@components";
import useVerifyEmail from "@hooks/useVerifyEmail";
import type { TFunction } from "i18next";

const SendEmailComponent = (props: {
  t: TFunction;
  email: string;
  onEmailChange: (value: string) => void;
  onNext: () => void;
}) => {
  const { onNext, t, email, onEmailChange } = props;
  const [emailError, setEmailError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);

  const { verify, isPending, error, success, setError, setSuccess } =
    useVerifyEmail();

  const sendEmail = () => {
    if (!email) {
      setEmailError(t("upload_intro_video.email_validation"));
    } else {
      setEmailError(null);
      verify(email);
    }
  };

  useEffect(() => {
    if (success && !error) {
      setSuccess(!success);
      setError(null);
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
        <label htmlFor="email" className="text-sm">
          {t("upload_intro_video.enter_email_to_proceed")}
        </label>
        <InputText
          id="email"
          type="email"
          value={email}
          placeholder={t("contact.email")}
          className="p-4 rounded-md h-12 w-full text-sm border bg-[#f9fafb]"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onEmailChange(e.target.value)
          }
        />
        {emailError && (
          <small id="email-error" className="text-xs text-danger">
            {emailError}
          </small>
        )}
      </div>

      {requestError && <ErrorMessage message={requestError} />}

      <PrimaryButton type="button" onClick={sendEmail} isLoading={isPending}>
        {t("upload_intro_video.continue")}
      </PrimaryButton>
    </div>
  );
};

export default SendEmailComponent;

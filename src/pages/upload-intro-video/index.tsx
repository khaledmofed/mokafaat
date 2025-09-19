import { ChangePageTitle } from "@components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import SendEmailComponent from "./components/SendEmailComponent";
import VerifyOtpComponent from "./components/VerifyOtpComponent";
import UploadVideoComponent from "./components/UploadVideoComponent";

const UploadIntroVideo = () => {
  const { t } = useTranslation();
  ChangePageTitle({ pageTitle: t("upload_intro_video.title") });
  const [email, setEmail] = useState<string>("");

  const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="container mx-auto p-8 max-w-xl border rounded-lg m-10 flex flex-col gap-4">
      {step === 1 && (
        <SendEmailComponent
          t={t}
          email={email}
          onEmailChange={setEmail}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <VerifyOtpComponent t={t} email={email} onNext={nextStep} />
      )}
      {step === 3 && (
        <UploadVideoComponent
          email={email}
          t={t}
          clearEmail={() => {
            setEmail("");
            setStep(1);
          }}
        />
      )}
    </div>
  );
};

export default UploadIntroVideo;

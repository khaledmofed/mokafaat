import { ErrorMessage, FileUploader, PrimaryButton } from "@components";
import { APP_ROUTES } from "@constants";
import { useUploadFreelancerIntroVideo } from "@hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadVideoComponent = (props: {
  email: string;
  t: any;
  clearEmail: () => void;
}) => {
  const { email, t, clearEmail } = props;
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { upload, isPending, success, error, setError, setSuccess } =
    useUploadFreelancerIntroVideo();

  const uploadHandler = () => {
    if (!file) {
      setFileError(t("upload_intro_video.file_error"));
      return;
    }
    setFileError(null);
    upload(email, file);
  };

  useEffect(() => {
    if (success && !error) {
      setSuccess(!success);
      setError(null);
      clearEmail();
      navigate(APP_ROUTES.home);
    }

    if (error && !success) {
      setRequestError(error);
      setError(null);
    }
  }, [success, error]);

  return (
    <div className="flex flex-col gap-4">
      <h6 className="font-bold">{t("upload_intro_video.title")}</h6>
      <FileUploader label="" file={file} onFileChange={setFile} />

      <ul className="w-full max-w-xl space-y-4 text-sm font-semibold font-readex-pro">
        <li>1 - Introduce Yourself / عرف بنفسك</li>
        <li>
          2 - What is your experience in events? / ما هي خبرتك في الفعاليات ؟
        </li>
        <li>3 - What is your role in events? / ما هو دورك في الفعاليات ؟</li>
      </ul>

      <span className="font-readex-pro text-sm text-gray-400 text-center w-full mt-6">
        Smaple Video / فيديو توضيحي
      </span>
      <div className="relative w-full max-w-xl overflow-hidden rounded-md shadow-lg">
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            paddingTop: "56.25%",
          }}
        >
          <iframe
            src="https://share.synthesia.io/embeds/videos/88270cf2-e997-434d-bf91-fcc4543c88a7"
            loading="lazy"
            title="Synthesia video player - Interview"
            allowFullScreen
            allow="encrypted-media; fullscreen"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              border: "none",
              padding: 0,
              margin: 0,
              overflow: "hidden",
            }}
          ></iframe>
        </div>
      </div>

      {fileError && <ErrorMessage message={fileError} />}

      {requestError && <ErrorMessage message={requestError} />}

      <PrimaryButton
        type="button"
        onClick={uploadHandler}
        isLoading={isPending}
      >
        {t("upload_intro_video.upload")}
      </PrimaryButton>
    </div>
  );
};

export default UploadVideoComponent;

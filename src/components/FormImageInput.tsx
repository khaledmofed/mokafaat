import { t } from "i18next";
import { UploadUserPhoto } from "@assets";
import ErrorMessage from "./ErrorMessage";

const FormImageInput = (props: {
  image: File | null;
  onImageChange: (image: File | null) => void;
  error: string | null;
}) => {
  const { image, onImageChange, error } = props;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      onImageChange(file);
    }
  };
  return (
    <div
      className="user-photo flex flex-col lg:items-start items-center gap-2 text-center wow fadeInUp"
      data-wow-delay="0.2s"
    >
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      <label htmlFor="imageInput" className="cursor-pointer">
        <img
          src={
            image
              ? image instanceof File
                ? URL.createObjectURL(image)
                : image
              : UploadUserPhoto
          }
          className="min-w-52 max-w-52 min-h-64 max-h-64 rounded-md object-cover object-center"
          alt="upload user photo"
        />

        <span className="text-sm text-sub-title">
          {t("job-application.photo")}
        </span>
        <ErrorMessage message={error || ""} />
      </label>
    </div>
  );
};

export default FormImageInput;

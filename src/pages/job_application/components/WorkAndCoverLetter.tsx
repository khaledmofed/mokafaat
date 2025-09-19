import {
  CityDropdown,
  ErrorMessage,
  FormInputGroup,
  FormTextareaGroup,
} from "@components";
import FormFileInput from "@components/FormFileInput";
import { useIsRTL } from "@hooks";
import { JobApplicationWorkAndCoverLetterProps } from "@interfaces";
import { t } from "i18next";
import { Dropdown } from "primereact/dropdown";

const WorkAndCoverLetter: React.FC<JobApplicationWorkAndCoverLetterProps> = ({
  city,
  cityError,
  cvError,
  idTypes,
  idType,
  idTypeError,
  idPictureError,
  idExpirationDateError,
  onCityChange,
  onCvChange,
  onIdTypeChange,
  onIdPictureChange,
  onIdExpirationDateChange,
  register,
  errors,
}) => {
  const isRTL = useIsRTL();

  return (
    <div
      className="work-and-cover-letter border border-gray-200 rounded-lg p-6 flex flex-col gap-4 wow fadeInUp bg-[#f9fafb]"
      data-wow-delay="0.2s"
    >
      <div className="grid md:grid-cols-2 w-full gap-2">
        <div
          className="input-group flex flex-col gap-2 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="id-type"
            className="text-sm text-title font-bold capitalize"
          >
            {t("job-seeker.id-type")}
          </label>

          <Dropdown
            value={idType}
            onChange={(e) => onIdTypeChange(e.value)}
            options={idTypes}
            optionLabel="type"
            placeholder={t("job-seeker.id-type")}
            className="border p-1 mt-1 rounded-lg capitalize text-sm w-full"
            invalid={idTypeError != null}
          />
          <ErrorMessage message={idTypeError || ""} />
        </div>

        <FormInputGroup
          label={t("job-seeker.id-number")}
          id="idNumber"
          type="text"
          register={register("idNumber")}
          error={errors.idNumber?.message}
        />
      </div>

      <div className="grid md:grid-cols-2 w-full gap-2">
        <div
          className="input-group flex flex-col gap-2 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="id-picture"
            className="text-sm text-title font-bold capitalize"
          >
            {t("job-seeker.id-picture")}
          </label>

          <FormFileInput
            label={t("job-seeker.id-picture")}
            onFileChange={onIdPictureChange}
            error={idPictureError}
            id="id-picture"
          />
        </div>

        <div
          className="input-group flex flex-col gap-2 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="id-expiration-date"
            className="text-sm text-title font-bold capitalize"
          >
            {t("job-seeker.id-expiration-date")}
          </label>

          <FormFileInput
            label={t("job-seeker.id-expiration-date")}
            onFileChange={onIdExpirationDateChange}
            error={idExpirationDateError}
            id="id-picture-date"
          />
        </div>
      </div>

      <div className="location-edu grid md:grid-cols-2 w-full gap-2">
        <div
          className="input-group flex flex-col gap-2 mt-1 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="city"
            className="text-sm text-title font-bold capitalize"
          >
            {t("job-application.city")}
          </label>

          <CityDropdown
            isRTL={isRTL}
            label={t("job-application.city")}
            selected={city}
            onSelect={(value) => onCityChange(value)}
            error={cityError}
          />
        </div>

        <FormInputGroup
          label={t("job-application.edu")}
          id="education"
          register={register("education")}
          error={errors.education?.message}
        />
      </div>

      <FormFileInput
        label={t("job-application.cv")}
        onFileChange={onCvChange}
        error={cvError}
        id="cv"
      />

      <FormTextareaGroup
        label={t("job-seeker.bio")}
        id="bio"
        register={register("bio")}
        error={errors.bio?.message}
      />
    </div>
  );
};

export default WorkAndCoverLetter;

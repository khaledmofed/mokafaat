import {
  CountrySelectDropdown,
  FormDatePicker,
  FormImageInput,
  FormInputGroup,
  SelectDropdown,
} from "@components";
import { JobSeekerBasicInformationProps } from "@interfaces";
import { t } from "i18next";
import React from "react";
import { GetGenders } from "./GetGenders";

const BasicInformation: React.FC<JobSeekerBasicInformationProps> = ({
  // title,
  photo,
  photoError,
  selectedGender,
  genderError,
  selectedNationality,
  birthDateError,
  onSelectGenderChange,
  onSelectBirthDate,
  onSelectNatiolaity,
  onPhotoChange,
  register,
  errors,
}) => {
  const genders = GetGenders();

  return (
    <section className="basic-information border border-gray-200 rounded-md">
      <div className="form p-6 flex lg:flex-row flex-col gap-4 bg-[#f9fafb]">
        <FormImageInput
          image={photo}
          onImageChange={onPhotoChange}
          error={photoError}
        />
        <div className="basic-data-form grid md:grid-cols-2 w-full gap-3">
          <FormInputGroup
            label={t("job-application.fName")}
            id="fName"
            register={register("fullName")}
            error={errors?.fullName?.message}
          />
          <FormInputGroup
            label={t("job-application.email")}
            id="email"
            register={register("email")}
            error={errors?.email?.message}
          />
          <FormInputGroup
            label={t("job-application.mNumber")}
            id="mNumber"
            register={register("mobileNumber")}
            error={errors?.mobileNumber?.message}
          />

          <CountrySelectDropdown
            selectedNationality={selectedNationality}
            onSelectNationalityChange={(value) => onSelectNatiolaity(value)}
          />

          <FormDatePicker
            label={t("job-application.dBirth")}
            id="dBirth"
            handleChangeDate={(date) => onSelectBirthDate(date)}
            error={birthDateError}
          />

          <SelectDropdown
            id="gender"
            items={genders}
            selectedItem={selectedGender}
            onSelectItemChange={onSelectGenderChange}
            optionLabel="title"
            placeholder={t("job-application.gender")}
            error={genderError}
          />
        </div>
      </div>
    </section>
  );
};

export default BasicInformation;

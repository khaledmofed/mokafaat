import { BasicInformation, IDTypes, PrimaryGradientButton } from "@components";
import WorkAndCoverLetter from "./components/WorkAndCoverLetter";
import { WorkExperience } from "@pages/job_application/components";
import { t } from "i18next";
import { useEffect, useState } from "react";
import {
  DepartmentModel,
  DropdownModel,
  GenderModel,
  JobSeekerModel,
} from "@entities";
import { useTranslate } from "@hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobSeekerSchema } from "@validations";
import { Nullable } from "primereact/ts-helpers";
import { Experience, IDType } from "@interfaces";
import usePostRequest from "@hooks/api/usePostRequest";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function TalentApplicationPage() {
  // ChangePageTitle({
  //   pageTitle: t("job-seeker.title"),
  //   path: APP_ROUTES.talent_application,
  //   description:
  //     "Apply now to join Mukafaat SA. Submit your application to become part of our talented team and start your journey in the event management industry.",
  // });
  const { translateValidationMessage } = useTranslate();
  const idTypes = IDTypes();
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [nationality, setNationality] = useState<string>("SA");
  const [birthDate, setBirthDate] = useState<Nullable<Date>>(null);
  const [birthDateError, setBirthDateError] = useState<string | null>(null);
  const [department, setDepartment] = useState<DepartmentModel | null>(null);
  const [departmentError, setDepartmentError] = useState<string | null>(null);
  const [city, setCity] = useState<DropdownModel | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [workType, setWorkType] = useState<DropdownModel | null>(null);
  const [workTypeError, setWorkTypeError] = useState<string | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<GenderModel | null>(
    null
  );
  const [genderError, setGenderError] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);

  const [idType, setIdType] = useState<IDType | null>(null);
  const [idTypeError, setIdTypeError] = useState<string | null>(null);
  const [idPicture, setIdPicture] = useState<File | null>(null);
  const [idPictureError, setIdPictureError] = useState<string | null>(null);
  const [idExpirationDate, setIdExpirationDate] = useState<File | null>(null);
  const [idExpirationDateError, setIdExpirationDateError] = useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobSeekerSchema(translateValidationMessage)),
  });

  const {
    mutate,
    data: response,
    isPending,
  } = usePostRequest({
    endpoint: API_ENDPOINTS.registerJobSeeker,
  });

  const submitForm = (data: any) => {
    const jobSeeker: JobSeekerModel = {
      photo: photo,
      fullName: data.fullName,
      email: data.email,
      mobileNumber: data.mobileNumber,
      idType: idType?.id.toString(),
      idNumber: data.idNumber,
      idPicture: idPicture,
      idExpirationDate: idExpirationDate,
      nationality: nationality,
      gender: selectedGender?.id,
      birthDate: birthDate,
      education: data.education,
      cityId: city ? Number(city.id) : undefined,
      departmentId: department ? Number(department.id) : undefined,
      workTypeId: workType ? Number(workType.id) : undefined,
      cv: cv,
      bio: data.bio,
      experiences: JSON.stringify(experiences),
    };

    if (validateData(jobSeeker)) mutate(jobSeeker);
  };

  useEffect(() => {
    if (response?.status == true) {
      toast(t("messages.jobSeekerSuccess"));
    } else if (response?.status == false && response.message) {
      toast(response.message);
    }
  }, [response?.status, response]);

  const validateData = (jobSeeker: JobSeekerModel): boolean => {
    let isValid = true;

    if (jobSeeker.photo == null) {
      setPhotoError(t("validations.photoRequired"));
      isValid = false;
    } else {
      setPhotoError(null);
    }

    if (jobSeeker.birthDate == null) {
      setBirthDateError(t("validations.birthDateRequired"));
      isValid = false;
    } else {
      setBirthDateError(null);
    }

    if (jobSeeker.gender == null) {
      setGenderError(t("validations.genderRequired"));
      isValid = false;
    } else {
      setGenderError(null);
    }

    if (jobSeeker.workTypeId == null) {
      setWorkTypeError(t("validations.workTypeRequired"));
      isValid = false;
    } else {
      setWorkTypeError(null);
    }

    if (jobSeeker.departmentId == null) {
      setDepartmentError(t("validations.departmentRequired"));
      isValid = false;
    } else {
      setDepartmentError(null);
    }

    if (jobSeeker.cityId == null) {
      setCityError(t("validations.cityRequired"));
      isValid = false;
    } else {
      setCityError(null);
    }

    if (jobSeeker.cv == null) {
      setCvError(t("validations.cvRequired"));
      isValid = false;
    } else {
      setCvError(null);
    }

    if (jobSeeker.idType == null) {
      setIdTypeError(t("validations.idTypeRequired"));
      isValid = false;
    } else {
      setIdTypeError(null);
    }

    if (jobSeeker.idPicture == null) {
      setIdPictureError(t("validations.idPictureRequired"));
      isValid = false;
    } else {
      setIdPictureError(null);
    }

    if (jobSeeker.idExpirationDate == null) {
      setIdExpirationDateError(t("validations.idExpirationDateRequired"));
      isValid = false;
    } else {
      setIdExpirationDateError(null);
    }

    return isValid;
  };

  return (
    <>
      <Helmet>
        <title>{t("job-seeker.title")}</title>
        <link
          rel="canonical"
          href="https://mukafaat.com/freelancer-application"
        />
        <meta
          name="description"
          content="Apply now to join Mukafaat SA. Submit your application to become part of our talented team and start your journey in the event management industry."
        />
        <meta property="og:title" content={t("job-seeker.title")} />
        <meta
          property="og:description"
          content="Apply now to join Mukafaat SA. Submit your application to become part of our talented team and start your journey in the event management industry."
        />
      </Helmet>

      <div className="talent-application container md:p-10 p-6 mx-auto w-full flex flex-col gap-6">
        <form
          method="POST"
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col w-full gap-2"
        >
          <BasicInformation
            photo={photo}
            photoError={photoError}
            selectedGender={selectedGender}
            genderError={genderError}
            selectedNationality={nationality}
            birthDateError={birthDateError}
            onSelectGenderChange={(gender) => setSelectedGender(gender)}
            onSelectBirthDate={(date) => setBirthDate(date)}
            onSelectNatiolaity={(nationality) => setNationality(nationality)}
            onPhotoChange={(photo) => setPhoto(photo)}
            title="job-seeker.title"
            register={register}
            errors={errors}
          />

          <WorkAndCoverLetter
            city={city}
            cityError={cityError}
            workType={workType}
            workTypeError={workTypeError}
            department={department}
            departmentError={departmentError}
            cvError={cvError}
            idPictureError={idPictureError}
            idExpirationDateError={idExpirationDateError}
            idType={idType}
            idTypes={idTypes}
            idTypeError={idTypeError}
            onDepartmentChange={(value) => setDepartment(value)}
            onWorkTypeChange={(value) => setWorkType(value)}
            onCityChange={(value) => setCity(value)}
            onCvChange={(value) => setCv(value)}
            onIdPictureChange={(value) => setIdPicture(value)}
            onIdExpirationDateChange={(value) => setIdExpirationDate(value)}
            onIdTypeChange={(value) => setIdType(value)}
            register={register}
            errors={errors}
          />

          <WorkExperience
            experiences={experiences}
            onExperiencesChange={(value) => setExperiences(value)}
          />

          <div className="flex justify-center">
            <PrimaryGradientButton
              type="submit"
              visibility="flex"
              textTransform="uppercase"
              className="font-bold"
              isLoading={isPending}
            >
              {t("job-application.submit")}
            </PrimaryGradientButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default TalentApplicationPage;

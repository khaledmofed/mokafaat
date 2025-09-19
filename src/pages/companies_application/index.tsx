import { useForm } from "react-hook-form";
import {
  CompanyInformation,
  EventInformations,
  UniformSpecification,
  VenuInformations,
} from "./components";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyApplicationSchema } from "@validations";
import { useTranslate } from "@hooks";
import { PrimaryButton } from "@components";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { MapPosition } from "@interfaces";
import { Nullable } from "primereact/ts-helpers";
import usePostRequest from "@hooks/api/usePostRequest";
import { API_ENDPOINTS } from "@network/apiEndpoints";
import { toast } from "react-toastify";
import { APP_ROUTES } from "@constants";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CompaniesApplicationPage = () => {
  // ChangePageTitle({
  //   pageTitle: t("company-application.title"),
  //   path: APP_ROUTES.companiesApplication,
  //   description:
  //     "Request top-notch event management services with Mukafaat in Saudi Arabia. Whether you need planning, execution, or full event management, our experts are here to help you create a flawless and memorable event experience. اتصل بنا الآن لطلب خدمات إدارة الفعاليات المتميزة في المملكة العربية السعودية. فريقنا المتخصص جاهز لمساعدتك في تنظيم فعاليات لا تُنسى من التخطيط إلى التنفيذ.",
  // });
  const { translateValidationMessage } = useTranslate();
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [selectedCountryError, setSelectedCountryError] = useState<
    string | null
  >(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCityError, setSelectedCityError] = useState<string | null>(
    null
  );
  const [eventLocation, setEventLocation] = useState<MapPosition | null>(null);
  const [startDate, setStartDate] = useState<Nullable<Date>>(null);
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Nullable<Date>>(null);
  const [standbyHour, setStandbyHour] = useState<Nullable<Date>>(null);
  const [standbyHourError, setStandbyHourError] = useState<string | null>(null);
  const [closingHour, setClosingHour] = useState<Nullable<Date>>(null);
  const [closingHourError, setClosingHourError] = useState<string | null>(null);
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [gatesNumber, setGatesNumber] = useState<string>("");
  const [venueMap, setVenueMap] = useState<File | null>(null);
  const [gatesData, setGatesData] = useState<Record<string, any>[]>([]);
  const [uniformDesign, setUniformDesign] = useState<File | null>(null);
  const [uniformQty, setUniformQty] = useState<number | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(companyApplicationSchema(translateValidationMessage)),
  });

  const {
    mutate,
    data: response,
    isPending,
  } = usePostRequest({
    endpoint: API_ENDPOINTS.sendCompanyApplication,
  });

  const onSubmit = (data: any) => {
    const application = {
      companyName: data.companyName,
      crNumber: data.crNumber,
      vatNumber: data.vatNumber,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactMobile: data.contactMobile,
      selectedCountry: selectedCountry ? selectedCountry.name : null,
      selectedCity: selectedCity,
      startDate: startDate,
      endDate: endDate,
      standbyHour: standbyHour,
      closingHour: closingHour,
      eventName: data.eventName,
      eventImage: eventImage,
      gatesNumber: gatesNumber,
      venueMap: venueMap,
      gatesData: JSON.stringify(gatesData),
      uniformDesign: uniformDesign,
      uniformQty: uniformQty,
    };
    if (validateData(application)) mutate(application);
  };

  const validateData = (application: any): boolean => {
    let isValid = true;

    if (application.selectedCountry == null) {
      setSelectedCountryError(t("validations.countryRequired"));
      isValid = false;
    } else {
      setSelectedCountryError(null);
    }

    if (application.selectedCity == null) {
      setSelectedCityError(t("validations.cityRequired"));
      isValid = false;
    } else {
      setSelectedCityError(null);
    }

    if (application.startDate == null) {
      setStartDateError(t("validations.startDateRequired"));
      isValid = false;
    } else {
      setStartDateError(null);
    }

    if (application.standbyHour == null) {
      setStandbyHourError(t("validations.standbyHourRequired"));
      isValid = false;
    } else {
      setStandbyHourError(null);
    }

    if (application.closingHour == null) {
      setClosingHourError(t("validations.closingHourRequired"));
      isValid = false;
    } else {
      setClosingHourError(null);
    }

    return isValid;
  };

  // Update gatesData based on gatesNumber change
  useEffect(() => {
    const gateCount = parseInt(gatesNumber);
    if (!isNaN(gateCount)) {
      setGatesData((prevGatesData) => {
        if (gateCount > prevGatesData.length) {
          return [
            ...prevGatesData,
            ...Array(gateCount - prevGatesData.length).fill({}),
          ];
        } else {
          return prevGatesData.slice(0, gateCount);
        }
      });
    }
  }, [gatesNumber]);

  // Handle individual gate data change
  const handleGateDataChange = (index: number, newGateData: any) => {
    setGatesData((prevGatesData) => {
      const updatedGatesData = [...prevGatesData];
      updatedGatesData[index] = newGateData;
      return updatedGatesData;
    });
  };

  useEffect(() => {
    if (response?.status == true) {
      navigate(APP_ROUTES.companiesApplicationSuccess);
    } else if (response?.status == false && response.message) {
      toast(response.message);
    }
  }, [response?.status, response]);

  return (
    <>
      <Helmet>
        <title>{t("company-application.title")}</title>
        <link
          rel="canonical"
          href="https://mukafaat.com/companies-application"
        />
        <meta
          name="description"
          content="Request top-notch event management services with Mukafaat in Saudi Arabia. Whether you need planning, execution, or full event management, our experts are here to help you create a flawless and memorable event experience. اتصل بنا الآن لطلب خدمات إدارة الفعاليات المتميزة في المملكة العربية السعودية. فريقنا المتخصص جاهز لمساعدتك في تنظيم فعاليات لا تُنسى من التخطيط إلى التنفيذ."
        />
        <meta property="og:title" content={t("company-application.title")} />
        <meta
          property="og:description"
          content="Request top-notch event management services with Mukafaat in Saudi Arabia. Whether you need planning, execution, or full event management, our experts are here to help you create a flawless and memorable event experience. اتصل بنا الآن لطلب خدمات إدارة الفعاليات المتميزة في المملكة العربية السعودية. فريقنا المتخصص جاهز لمساعدتك في تنظيم فعاليات لا تُنسى من التخطيط إلى التنفيذ."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="companies-application flex flex-col gap-4"
        >
          <CompanyInformation
            register={register}
            errors={errors}
            control={control}
          />

          <EventInformations
            selectedCountry={selectedCountry}
            selectedCountryError={selectedCountryError}
            selectedCity={selectedCity}
            selectedCityError={selectedCityError}
            eventLocation={eventLocation}
            startDate={startDate}
            startDateError={startDateError}
            endDate={endDate}
            standbyHour={standbyHour}
            standbyError={standbyHourError}
            closingHour={closingHour}
            closingError={closingHourError}
            register={register}
            errors={errors}
            onCountryChange={(value) => setSelectedCountry(value)}
            onCityChange={(value) => setSelectedCity(value)}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onStandByChange={setStandbyHour}
            onClosingChange={setClosingHour}
            onEventImageChange={setEventImage}
            onEventLocationChange={(value) => setEventLocation(value)}
          />

          <VenuInformations
            gatesNumber={gatesNumber}
            onGatesNumberChangeChange={setGatesNumber}
            onVenueMapChange={setVenueMap}
            gatesData={gatesData}
            onGateDataChange={handleGateDataChange}
          />

          <UniformSpecification
            uniformQty={uniformQty}
            onUniformDesignChange={setUniformDesign}
            onUniformQtyChange={setUniformQty}
          />

          <div className="flex justify-center font-bold">
            <PrimaryButton
              type="submit"
              isLoading={isPending}
              onClick={() => {}}
            >
              {t("company-application.send-application")}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default CompaniesApplicationPage;

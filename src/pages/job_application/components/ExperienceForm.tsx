import { FormDatePicker, ExperinceFormInput } from "@components";
import React, { useState } from "react";
import ExperienceFormButtoon from "./ExperienceFormButtoon";
import { Experience, ExperienceFormProps } from "@interfaces";
import { Nullable } from "primereact/ts-helpers";
import { t } from "i18next";

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  handleSubmitAddButton,
}) => {
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobPositionError, setJobPositionError] = useState<string | null>(null);
  const [event, setEvent] = useState<string>("");
  const [eventError, setEventError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Nullable<Date>>(null);
  const [startDateError, setStartDateError] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Nullable<Date>>(null);
  const [endDateError, setEndDateError] = useState<string | null>(null);

  const handleSubmit = () => {
    const experience: Experience = {
      jobPosition,
      event,
      location,
      startDate,
      endDate,
    };

    if (validateData(experience)) {
      handleSubmitAddButton(experience);

      setJobPosition("");
      setEvent("");
      setLocation("");
      setStartDate(null);
      setEndDate(null);
    }
  };

  const validateData = (experience: Experience): boolean => {
    let isValid = true;

    if (experience.jobPosition.length === 0) {
      setJobPositionError(t("validations.jobPositionRequired"));
      isValid = false;
    } else {
      setJobPositionError(null);
    }

    if (experience.event.length === 0) {
      setEventError(t("validations.eventRequired"));
      isValid = false;
    } else {
      setEventError(null);
    }

    if (experience.location.length === 0) {
      setLocationError(t("validations.locationRequired"));
      isValid = false;
    } else {
      setLocationError(null);
    }

    if (experience.startDate == null) {
      setStartDateError(t("validations.startDateRequired"));
      isValid = false;
    } else {
      setStartDateError(null);
    }

    if (experience.endDate == null) {
      setEndDateError(t("validations.endDateRequired"));
      isValid = false;
    } else {
      setEndDateError(null);
    }

    return isValid;
  };

  return (
    <div className="experience-form grid lg:grid-cols-6 md:grid-cols-2 gap-2 items-end">
      <ExperinceFormInput
        label={t("job-application.job-position")}
        id="job-position"
        value={jobPosition}
        handleOnChange={(value) => setJobPosition(value)}
        error={jobPositionError}
      />
      <ExperinceFormInput
        label={t("job-application.event")}
        id="event"
        value={event}
        handleOnChange={(value) => setEvent(value)}
        error={eventError}
      />
      <ExperinceFormInput
        label={t("job-application.location")}
        id="location"
        value={location}
        handleOnChange={(value) => setLocation(value)}
        error={locationError}
      />
      <FormDatePicker
        label={t("job-application.sDate")}
        id="start-date"
        handleChangeDate={(date) => setStartDate(date)}
        error={startDateError}
      />
      <FormDatePicker
        label={t("job-application.eDate")}
        id="end-date"
        handleChangeDate={(date) => setEndDate(date)}
        error={endDateError}
      />
      <ExperienceFormButtoon handleSubmit={handleSubmit} />
    </div>
  );
};

export default ExperienceForm;

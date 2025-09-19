import countriesList from "../countries-list.json";
import { t } from "i18next";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useState } from "react";
import { EventInformationsProps } from "@interfaces";
import { ErrorMessage, FormInputGroup } from "@components";
import { Calendar } from "primereact/calendar";
import FormFileInput from "@components/FormFileInput";

const EventInformations = ({
  selectedCountry,
  selectedCountryError,
  selectedCity,
  selectedCityError,
  startDate,
  startDateError,
  endDate,
  standbyHour,
  standbyError,
  closingHour,
  closingError,
  register,
  errors,
  onCountryChange,
  onCityChange,
  onStartDateChange,
  onStandByChange,
  onClosingChange,
  onEventImageChange,
  onEndDateChange,
}: EventInformationsProps) => {
  const [cities, setCities] = useState<string[]>([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchLoading, setSearchLoading] = useState(false);

  // Extract countries list
  const countries = countriesList.map((item) => ({
    name: item.country.name_en,
    code: item.country.phone_code,
    cities: item.country.cities,
  }));

  // Handle country change
  const handleOnCountryChange = (e: DropdownChangeEvent) => {
    const selected = e.value;
    onCountryChange(selected);
    if (selected) {
      // setSearchQuery("");
      onCityChange(null);
      setCities(selected.cities);
    }
  };

  // Handle city change
  const handleOnCityChange = (e: DropdownChangeEvent) => {
    onCityChange(e.value);
  };

  // Search for location
  // const handleOnSearchClick = async () => {
  //   if (searchQuery) {
  //     setSearchLoading(true);

  //     const response = await fetch(
  //       `https://api.opencagedata.com/geocode/v1/json?q=${searchQuery}&key=${
  //         import.meta.env.VITE_OPEN_CAGE_DATA_TOKEN
  //       }`
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data && data.results && data.results.length > 0) {
  //         const { geometry } = data.results[0];
  //         const location: MapPosition = {
  //           lat: parseFloat(geometry.lat),
  //           lng: parseFloat(geometry.lng),
  //         };
  //         onEventLocationChange(location);
  //       }
  //     }

  //     setSearchLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col border rounded-lg">
      <h1 className="font-bold border-b p-4 bg-gray-50 rounded-tr-lg rounded-tl-lg">
        {t("company-application.event-location")}
      </h1>

      <div className="grid lg:grid-cols-2 gap-2 p-4">
        <FormInputGroup
          label={t("company-application.event-name")}
          id="event-name"
          placeholder={t("company-application.event-name")}
          register={register("eventName")}
          error={errors?.eventName?.message}
        />

        <div
          className="flex flex-col gap-3 input-group wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="event-date"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.event-date")}
          </label>

          <div id="event-date" className="flex gap-2 items-center justify-between">
            <div className="flex flex-col gap-1">
              <Calendar
                id="start-date"
                showIcon
                value={startDate}
                onChange={(e) => onStartDateChange(e.value)}
                placeholder={t("company-application.from")}
                className="border rounded-lg p-3.5"
                invalid={startDateError != null}
              />
              {startDateError && <ErrorMessage message={startDateError} />}
            </div>
            <Calendar
              id="end-date"
              showIcon
              value={endDate}
              onChange={(e) => onEndDateChange(e.value)}
              placeholder={t("company-application.to")}
              className="border rounded-lg p-3.5"
            />
          </div>
        </div>

        <div
          className="flex flex-col gap-3 input-group wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="standby-hour"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.operation-hours")} -{" "}
            {t("company-application.standby")}
          </label>

          <Calendar
            id="standby-hour"
            showIcon
            value={standbyHour}
            onChange={(e) => onStandByChange(e.value)}
            placeholder={t("company-application.standby")}
            className="border rounded-lg p-3.5"
            timeOnly
            hourFormat="12"
            invalid={standbyError != null}
          />
          {standbyError && <ErrorMessage message={standbyError} />}
        </div>

        <div
          className="flex flex-col gap-3 input-group wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="closing-hour"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.operation-hours")} -{" "}
            {t("company-application.closing")}
          </label>

          <Calendar
            id="closing-hour"
            showIcon
            value={closingHour}
            onChange={(e) => onClosingChange(e.value)}
            placeholder={t("company-application.closing")}
            className="border rounded-lg p-3.5"
            timeOnly
            hourFormat="12"
            invalid={closingError != null}
          />
          {closingError && <ErrorMessage message={closingError} />}
        </div>

        <div
          className="input-group wow fadeInUp flex flex-col gap-2"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="country"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.country")}
          </label>
          <Dropdown
            value={selectedCountry}
            onChange={handleOnCountryChange}
            options={countries}
            optionLabel="name"
            placeholder={t("company-application.country")}
            className="w-full border"
            checkmark={true}
            filter
            filterPlaceholder={t("company-application.search-country")}
            highlightOnSelect={false}
            invalid={selectedCountryError != null}
            id="country"
          />
          {selectedCountryError && (
            <ErrorMessage message={selectedCountryError} />
          )}
        </div>

        <div
          className="input-group wow fadeInUp flex flex-col gap-2"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="city"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.city")}
          </label>
          <Dropdown
            value={selectedCity}
            onChange={handleOnCityChange}
            options={cities.map((city) => ({ label: city, value: city }))}
            placeholder={t("company-application.city")}
            className="w-full border"
            checkmark={true}
            filter
            filterPlaceholder={t("company-application.search-city")}
            highlightOnSelect={false}
            disabled={cities.length === 0}
            invalid={selectedCityError != null}
            id="city"
          />
          {selectedCityError && <ErrorMessage message={selectedCityError} />}
        </div>

        <div
          className="input-group wow fadeInUp flex flex-col gap-2 col-span-full"
          data-wow-delay="0.2s"
        >
          <label
            htmlFor="company-application-event-image"
            className="text-sm text-title font-bold capitalize"
          >
            {t("company-application.image")}
          </label>

          <FormFileInput
            label={t("company-application.image")}
            onFileChange={onEventImageChange}
            error={null}
            id="company-application-event-image"
          />
        </div>

        {/* <div className="col-span-full border rounded-lg relative">
          <MapComponent
            eventLocation={eventLocation}
            selectedCity={selectedCity}
            onEventLocationChange={onEventLocationChange}
          />
          <div className="absolute top-0 start-0 end-0 ms-12 me-4">
            <input
              type="text"
              id="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-4 rounded-lg text-sm border mt-2 lg:grid-cols-5 w-full"
            />
            <button
              type="button"
              className={`bg-primary text-white rounded-lg absolute ${
                searchLoading ? "p-2.5 bg-opacity-10" : "p-3"
              } end-3 top-4`}
              onClick={handleOnSearchClick}
              disabled={searchLoading}
            >
              {searchLoading ? <LoadingSpinner /> : <IoSearchOutline />}
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default EventInformations;

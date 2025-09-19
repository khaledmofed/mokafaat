import { DropdownCountryModel } from "@entities";
import { MapPosition } from "./MapPosition";
import { FieldErrors } from "react-hook-form";
import { Nullable } from "primereact/ts-helpers";

export interface EventInformationsProps {
  selectedCountry: DropdownCountryModel | null;
  selectedCountryError: string | null;
  selectedCity: string | null;
  selectedCityError: string | null;
  eventLocation: MapPosition | null;
  startDate: Nullable<Date>;
  startDateError: string | null;
  endDate: Nullable<Date>;
  standbyHour: Nullable<Date>;
  standbyError: string | null;
  closingHour: Nullable<Date>;
  closingError: string | null;
  register: any;
  errors?: FieldErrors<{
    eventName: string;
  }>;
  onCountryChange: (value: DropdownCountryModel | null) => void;
  onCityChange: (value: string | null) => void;
  onStartDateChange: (value: Nullable<Date>) => void;
  onEndDateChange: (value: Nullable<Date>) => void;
  onStandByChange: (value: Nullable<Date>) => void;
  onClosingChange: (value: Nullable<Date>) => void;
  onEventImageChange: (image: File | null) => void;
  onEventLocationChange: (value: MapPosition | null) => void;
}

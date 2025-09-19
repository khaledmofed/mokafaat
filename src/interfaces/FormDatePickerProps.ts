import { Nullable } from "primereact/ts-helpers";

export interface FormDatePickerProps {
  label: string;
  id: string;
  handleChangeDate: (date: Nullable<Date>) => void;
  error?: string | null;
}

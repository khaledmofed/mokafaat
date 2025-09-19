import { Nullable } from "primereact/ts-helpers";

export interface Experience {
  jobPosition: string;
  event: string;
  location: string;
  startDate: Nullable<Date>;
  endDate: Nullable<Date>;
}

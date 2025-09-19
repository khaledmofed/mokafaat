import { MapPosition } from "./MapPosition";

export interface MapComponentProps {
  eventLocation: MapPosition | null;
  selectedCity: string | null;
  onEventLocationChange: (value: MapPosition | null) => void;
}

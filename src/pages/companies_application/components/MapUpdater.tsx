import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { getCoordinatesByCity } from "./getCoordinatesByCity";

export const MapUpdater: React.FC<{
  selectedCity: string | null;
  onEventLocationChange: (location: { lat: number; lng: number }) => void;
}> = ({ selectedCity, onEventLocationChange }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCity) {
      getCoordinatesByCity(selectedCity).then((location) => {
        if (location) {
          map.setView([location.lat, location.lng], 10);
          onEventLocationChange(location);
        }
      });
    }
  }, [selectedCity, map, onEventLocationChange]);

  return null;
};

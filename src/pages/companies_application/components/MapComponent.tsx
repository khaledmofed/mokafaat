import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapComponentProps } from "@interfaces";
import { MapEvents } from "./MapEvents";
import { MapUpdater } from "./MapUpdater";

const MapComponent = ({
  eventLocation,
  selectedCity,
  onEventLocationChange,
}: MapComponentProps) => {
  return (
    <MapContainer
      center={
        eventLocation
          ? [eventLocation.lat, eventLocation.lng]
          : [24.7136, 46.6753]
      }
      zoom={10}
      style={{ height: "300px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.carto.com/attributions">CARTO</a> | Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <MapUpdater
        selectedCity={selectedCity}
        onEventLocationChange={onEventLocationChange}
      />

      <MapEvents
        position={eventLocation}
        onLocationSelect={onEventLocationChange}
      />
    </MapContainer>
  );
};

export default MapComponent;

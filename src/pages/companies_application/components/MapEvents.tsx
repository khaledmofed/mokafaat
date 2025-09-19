import { MapPosition } from "@interfaces";
import { useEffect } from "react";
import { Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

export const MapEvents: React.FC<{
  position: MapPosition | null;
  onLocationSelect: (location: MapPosition) => void;
}> = ({ position, onLocationSelect }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      const location: MapPosition = { lat, lng };
      onLocationSelect(location);
    },
  });

  return position === null ? null : (
    <Marker position={[position.lat, position.lng]} icon={customIcon}>
      <Popup>
        Selected Location: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
      </Popup>
    </Marker>
  );
};

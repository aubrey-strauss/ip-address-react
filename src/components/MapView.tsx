import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
} from "react-leaflet"; //Zoom control added for Mobile layout
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Black location pin from the design
const locationIcon = L.icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

// Props: where to center the map
type MapViewProps = {
  lat: number;
  lng: number;
};

// Helper: glides the map to a new spot when lat/lng change
function FlyToLocation({ lat, lng }: MapViewProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 13);
  }, [map, lat, lng]);
  return null;
} // end of FlyToLocation

// Map showing the searched location
function MapView({ lat, lng }: MapViewProps) {
  return (
    <MapContainer
      className="map"
      center={[lat, lng]}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={locationIcon} alt="Location marker" />
      <FlyToLocation lat={lat} lng={lng} />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
} // end of MapView

export default MapView;

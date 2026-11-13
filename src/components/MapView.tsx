// Marker is the pin. L is Leaflet’s own toolbox
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const locationIcon = L.icon({
  iconUrl: "/images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

// Props- where to center the map
type MapViewProps = {
  lat: number;
  lng: number;
};

// Map showing the searched location
function MapView({ lat, lng }: MapViewProps) {
  return (
    <MapContainer
      className="map"
      center={[lat, lng]}
      zoom={13}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={locationIcon} alt="Location marker" />
    </MapContainer>
  );
}

export default MapView;

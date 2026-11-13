import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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
    </MapContainer>
  );
}

export default MapView;

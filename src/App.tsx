import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import InfoItem from "./components/InfoItem";
import InfoPanel from "./components/InfoPanel";
import type { IpData } from "./types/ipData";
import { fetchIpData } from "./api/fetchIpData";

const fakeData: IpData = {
  // placeholder code- swap in real data later
  ip: "192.212.174.101",
  location: {
    city: "Brooklyn",
    region: "NY",
    postalCode: "10001",
    timezone: "-05:00",
    lat: 40.6501,
    lng: -73.9496,
  },
  isp: "SpaceX Starlink",
};
function App() {
  return (
    <>
      <Header title="IP Address React">
        <SearchForm
          onSearch={(query) =>
            fetchIpData(query).then(console.log).catch(console.error)
          }
        />
      </Header>
      <main>
        {/* Card overlaps the banner; InfoItems are its children */}{" "}
        <InfoPanel>
          <InfoItem label="IP Address" value={fakeData.ip} />
          {/* Template string glues city, region, and zip together */}{" "}
          <InfoItem
            label="Location"
            value={`${fakeData.location.city}, ${fakeData.location.region} ${fakeData.location.postalCode}`}
          />
          <InfoItem
            label="Timezone"
            value={`UTC ${fakeData.location.timezone}`}
          />
          <InfoItem label="ISP" value={fakeData.isp} />
        </InfoPanel>
        {/* Placeholder until the real map in Phase 5 */}
        <div className="map" style={{ background: "#ddd" }}></div>
      </main>
    </>
  );
}

export default App;

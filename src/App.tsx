import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import InfoItem from "./components/InfoItem";
import InfoPanel from "./components/InfoPanel";

// placeholder code- swap in real data later
const fakeData = {
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
          onSearch={(query) => console.log("Searching for:", query)}
        />
      </Header>
      <main>
        {/*main is the page’s main content, and your CSS positions the card from it. The 4 InfoItems become InfoPanel’s children */}
        <InfoPanel>
          <InfoItem label="IP Address" value={fakeData.ip} />
          {/* Why: backticks ` make a template string, which glues text together. Each ${ } drops a value in, giving you “Brooklyn, NY 10001”. */}
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

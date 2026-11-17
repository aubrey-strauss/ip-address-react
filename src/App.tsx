import { useIpContext } from "./context/IpContext";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import InfoItem from "./components/InfoItem";
import InfoPanel from "./components/InfoPanel";
import RecentSearches from "./components/RecentSearches";

import MapView from "./components/MapView";

function App() {
  const { data, loading, error, search } = useIpContext();
  return (
    <>
      <Header title="IP Address React">
        <SearchForm onSearch={search} />
        {loading && <p className="status-message">Looking up...</p>}
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </Header>
      <main>
        {/* && is conditional rendering-"only show once data exists" */}
        {data && (
          <InfoPanel>
            <InfoItem label="IP Address" value={data.ip} />
            <InfoItem
              label="Location"
              value={`${data.location.city}, ${data.location.region} ${data.location.postalCode}`}
            />
            <InfoItem
              label="Timezone"
              value={`UTC ${data.location.timezone}`}
            />
            <InfoItem label="ISP" value={data.isp} />
          </InfoPanel>
        )}
        {data && <MapView lat={data.location.lat} lng={data.location.lng} />}
        <RecentSearches />
      </main>
    </>
  );
}

export default App;

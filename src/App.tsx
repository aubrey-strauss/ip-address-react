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
      <Header title="IP Address Tracker">
        <SearchForm onSearch={search} />
        {loading && (
          <p className="status-message" role="status">
            Looking up…
          </p>
        )}
        {/* //role="status" is the gentle version of role="alert".
         It announces “Looking up…” without interrupting,
          while errors (alert) interrupt right away because they matter more.// */}
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
      </Header>
      <main>
        {/* && is conditional rendering-"only show once data exists" */}
        {data && (
          <InfoPanel key={data.ip}>
            {" "}
            {/* fix garbled text on safari mobile*/}
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

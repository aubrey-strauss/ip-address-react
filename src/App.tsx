import { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import InfoItem from "./components/InfoItem";
import InfoPanel from "./components/InfoPanel";
import { useIpLookup } from "./hooks/useIpLookup";

function App() {
  const [query, setQuery] = useState("");
  const { data, loading, error } = useIpLookup(query);
  return (
    <>
      <Header title="IP Address React">
        <SearchForm onSearch={setQuery} />
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
        {/* Placeholder until the real map in Phase 5 */}
        <div className="map" style={{ background: "#ddd" }}></div>
      </main>
    </>
  );
}

export default App;

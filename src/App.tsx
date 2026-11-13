import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import InfoItem from "./components/InfoItem";
import InfoPanel from "./components/InfoPanel";

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
          <InfoItem label="IP Address" value="192.212.174.101" />
          <InfoItem label="Location" value="Brooklyn, NY 10001" />
          <InfoItem label="Timezone" value="UTC -05:00" />
          <InfoItem label="ISP" value="SpaceX Starlink" />
        </InfoPanel>
      </main>
    </>
  );
}

export default App;

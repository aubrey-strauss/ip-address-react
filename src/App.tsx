import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import InfoItem from "./components/InfoItem";

function App() {
  return (
    <>
      <Header title="IP Address React">
        <SearchForm
          onSearch={(query) => console.log("Searching for:", query)}
        />
      </Header>
      <InfoItem label="IP Address" value="192.212.174.101" />
    </>
  );
}

export default App;

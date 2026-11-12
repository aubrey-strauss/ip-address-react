import { useState } from "react";

type SearchFormProps = {
  onSearch: (query: string) => void;
};
function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  return (
    <form
      className="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(query.trim());
      }}
    >
      <label htmlFor="search-input" className="visually-hidden">
        Search for any IP address or domain
      </label>

      <input
        id="search-input"
        className="search-input"
        type="text"
        placeholder="Search for any IP address or domain"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <button className="search-button" type="submit" aria-label="Search">
        <img src="/images/icon-arrow.svg" alt="" />
      </button>
    </form>
  );
}

export default SearchForm;

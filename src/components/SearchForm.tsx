import { useState } from "react";
import { validateQuery } from "../utils/validateQuery";

// Props: a function the parent gives us to run when the user searches
type SearchFormProps = {
  onSearch: (query: string) => void;
};

// Search bar: checks the text, then sends it up on submit
function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  return (
    <>
      <form
        className="search"
        onSubmit={(event) => {
          event.preventDefault();
          const cleaned = query.trim();
          const problem = validateQuery(cleaned);
          setFormError(problem);
          if (!problem) onSearch(cleaned);
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
          aria-invalid={formError ? true : undefined}
        />
        <button className="search-button" type="submit" aria-label="Search">
          <img src="/images/icon-arrow.svg" alt="" />
        </button>
      </form>
      {formError && (
        <p className="error-message" role="alert">
          {formError}
        </p>
      )}
    </>
  );
} // end of SearchForm

export default SearchForm;

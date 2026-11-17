import { useIpContext } from "../context/IpContext";

function RecentSearches() {
  const { history, search } = useIpContext();
  if (history.length < 2) return null;

  return (
    <section className="recent" aria-label="Recent searches">
      <h2 className="recent-title">Recent searches</h2>
      <ul className="recent-list">
        {history.map((item) => (
          <li key={item.ip}>
            <button
              type="button"
              className="recent-button"
              onClick={() => search(item.ip)}
            >
              {item.ip} | {item.location.city}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentSearches;

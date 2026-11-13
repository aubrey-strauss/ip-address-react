import { useEffect, useState } from "react";
import { fetchIpData } from "../api/fetchIpData";
import type { IpData } from "../types/ipData";

// Custom hook: looks up an IP/domain and tracks data, loading, and error
export function useIpLookup(query: string) {
  // Lookup result; null until the first answer arrives
  const [data, setData] = useState<IpData | null>(null);
  // True while waiting on IPify; starts true because we fetch right away
  const [loading, setLoading] = useState(true);
  // Error message to show the user; null when everything's fine
  const [error, setError] = useState<string | null>(null);

  // Runs after render, and again only when query changes
  useEffect(() => {
    // Controller = a "stop button" that can cancel this request mid-flight
    const controller = new AbortController();

    // New search: show loading and clear any old error
    setLoading(true);
    setError(null);

    // Pass the controller's signal so fetch knows to listen for "stop"
    fetchIpData(query, controller.signal)
      // Success: save the result (React redraws the screen)
      .then(setData)
      // Failure: save the message, but ignore cancels we caused on purpose
      .catch((err: Error) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      // Done either way: stop loading, unless this request was cancelled
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    // Cleanup: press "stop" if query changes or the component goes away
    return () => controller.abort();
  }, [query]); // Dependency array: only re-run when query changes

  // Hand all three values to whoever uses this hook
  return { data, loading, error };
}

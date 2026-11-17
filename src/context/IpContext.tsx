import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { useIpLookup } from "../hooks/useIpLookup";
import type { IpData } from "../types/ipData";

// Everything we pin to the "bulletin board"
type IpContextValue = {
  data: IpData | null;
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
};
// The shared board; empty (null) until the provider fills it
const IpContext = createContext<IpContextValue | null>(null);
// Provider: runs the lookup and shares results with everything inside it
export function IpProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const { data, loading, error } = useIpLookup(query);

  return (
    <IpContext.Provider value={{ data, loading, error, search: setQuery }}>
      {children}
    </IpContext.Provider>
  );
} // end of IpProvider
// Any component calls this to read the shared data
export function useIpContext() {
  const context = useContext(IpContext);
  if (!context)
    throw new Error("useIpContext must be used inside <IpProvider>");
  return context;
} // end of useIpContext

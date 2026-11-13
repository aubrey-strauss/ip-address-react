import type { IpData } from "../types/ipData";

export async function fetchIpData(
  query: string,
  signal?: AbortSignal,
): Promise<IpData> {
  // a signal is a “stop” button we can press to cancel a request
  const params = new URLSearchParams({
    apiKey: import.meta.env.VITE_IPIFY_KEY,
  });
  if (query) {
    const isIp = /^[\d.]+$/.test(query) || query.includes(":"); //the /.../ part is a regex (regular expression, a pattern matcher). This one means “only digits and dots,”
    params.set(isIp ? "ipAddress" : "domain", query);
  }
  const response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?${params}`,
    { signal }, // now if we press “stop,” the request is cancelled before it wastes credits
  );

  if (!response.ok) {
    throw new Error(`Lookup failed (status ${response.status})`);
  }
  return response.json();
}

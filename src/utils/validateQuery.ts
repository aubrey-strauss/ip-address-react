// Returns an error message if the search looks wrong, or null if it's OK
export function validateQuery(query: string): string | null {
  if (query === "") return null; // empty = look up your own IP
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const domain = /^([a-z0-9-]+\.)+[a-z]{2,}$/i;
  if (ipv4.test(query) || query.includes(":") || domain.test(query))
    return null;
  return "Please enter a valid IP (like 8.8.8.8) or domain (like google.com).";
}

//ipv4 = 4 number groups with dots. domain = words, dots, and an ending like .com. A : = IPv6. Pass any one, and it’s valid.

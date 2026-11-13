// The shape of IPify's answer (only the parts we use)
export type IpData = {
  ip: string;
  isp: string;
  location: {
    city: string;
    region: string;
    postalCode: string;
    timezone: string;
    lat: number;
    lng: number;
  };
};

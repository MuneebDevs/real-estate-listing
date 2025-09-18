export type Property = {
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  location: string;
  thumbnail: string;
  image: string;
  description: string;
  features: string[];
  yearBuilt: number;
  coordinates?: { lat: number; lng: number };
  priceHistory?: Array<{ date: string; price: number }>;
};

export type PropertyType = 
  | 'luxury-villa' 
  | 'penthouse' 
  | 'modern-apartment' 
  | 'estate' 
  | 'townhouse' 
  | 'historic-manor'
  | 'residential-plot'
  | 'commercial-property'
  | 'floor-portion';

export type PropertyStatus = 
  | 'for-sale' 
  | 'for-lease' 
  | 'exclusive' 
  | 'under-offer' 
  | 'sold';

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  areaSize: number;
  areaUnit: string;
  areaFormatted: string;
  areaSqFt: number;
  lotSizeSqFt?: number;
  yearBuilt?: number | null;
  parkingSpaces: number;
  condition?: string;
  propertyType: PropertyType;
  rawPropertyType?: string;
  energyRating?: string;
  floorLevel?: string;
}

export interface PropertyLocation {
  address: string;
  neighborhood: string;
  city: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface PropertyAgent {
  id?: string;
  name: string;
  title?: string;
  phone: string;
  email: string;
  avatarUrl: string;
  experienceYears?: number;
  whatsapp?: string;
}

export interface FloorPlan {
  title: string;
  level: string;
  sqFt: number;
  imageUrl: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  price: number;
  priceFormatted: string;
  priceSuffix?: string;
  status: PropertyStatus;
  isFeatured: boolean;
  location: PropertyLocation;
  specs: PropertySpecs;
  amenities: string[];
  features: { title: string; desc: string }[];
  images: {
    hero: string;
    gallery: string[];
    floorPlans: FloorPlan[];
    virtualTourUrl?: string;
  };
  agent: PropertyAgent;
  publishedAt?: string;
}

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  city: string;
  tagline: string;
  description: string;
  heroImage: string;
  lifestyleTags: string[];
  stats: {
    avgPriceSqFt: string;
    annualGrowth: string;
    walkScore: number;
    transitScore: number;
    safetyRating: string;
  };
  highlights: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  preferredDate?: string;
  timeSlot?: string;
}

export interface ValuationFormData {
  propertyType: PropertyType;
  location: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  condition: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
}

export interface PropertyFilterState {
  searchQuery?: string;
  neighborhood: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms?: string;
  status: string;
  sortBy: string;
}

export type FilterState = PropertyFilterState;

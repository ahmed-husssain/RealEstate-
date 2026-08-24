export type PropertyType = 
  | 'luxury-villa' 
  | 'penthouse' 
  | 'modern-apartment' 
  | 'estate' 
  | 'townhouse' 
  | 'historic-manor';

export type PropertyStatus = 
  | 'for-sale' 
  | 'for-lease' 
  | 'exclusive' 
  | 'under-offer' 
  | 'sold';

export interface PropertySpecs {
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  lotSizeSqFt?: number;
  yearBuilt: number;
  parkingSpaces: number;
  propertyType: PropertyType;
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
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  avatarUrl: string;
  experienceYears: number;
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
  publishedAt: string;
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

export interface PropertyFilterState {
  searchQuery: string;
  neighborhood: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  status: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc';
}

export interface ViewingBooking {
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  timeSlot: string;
  viewingType: 'in-person' | 'virtual';
  notes?: string;
}

export interface ValuationSubmission {
  propertyType: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  condition: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  timeframe: string;
}

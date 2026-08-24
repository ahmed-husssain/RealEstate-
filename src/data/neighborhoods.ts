import { Neighborhood } from '@/types';

export const mockNeighborhoods: Neighborhood[] = [
  {
    id: 'neigh-01',
    slug: 'bel-air',
    name: 'Bel Air',
    city: 'Los Angeles, CA',
    tagline: 'Private Gated Enclaves & Landmark Architectural Estates',
    description: 'Synonymous with world-class privacy and panoramic mountain-to-ocean vistas, Bel Air is defined by winding canyon roads, manicured botanical grounds, and some of the world’s most prestigious residential sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Ultra-Private', 'Architectural', 'Gated Enclaves', 'Canyon Views'],
    stats: {
      avgPriceSqFt: '$1,620',
      annualGrowth: '+8.4%',
      walkScore: 42,
      transitScore: 35,
      safetyRating: 'Top 1% Nationwide'
    },
    highlights: [
      'Iconic Bel-Air Hotel and Wolfgang Puck dining pavilion',
      'Direct proximity to UCLA, Beverly Hills Triangle, and Sunset Strip',
      'Exclusive private security patrol and strict architectural preservation'
    ]
  },
  {
    id: 'neigh-02',
    slug: 'tribeca',
    name: 'Tribeca',
    city: 'New York, NY',
    tagline: 'Cobblestone Heritage Meets Contemporary Architectural Refinement',
    description: 'Once the industrial heart of Lower Manhattan, Tribeca has transformed into New York’s most revered enclave of cast-iron architecture, Michelin-starred gastronomy, and full-floor gallery lofts.',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Historic Lofts', 'Michelin Dining', 'Hudson River Park', 'Art Galleries'],
    stats: {
      avgPriceSqFt: '$2,350',
      annualGrowth: '+6.1%',
      walkScore: 99,
      transitScore: 100,
      safetyRating: 'Exceptional'
    },
    highlights: [
      'Hudson River Park waterfront recreation, Piers 25 & 26',
      'Avenue of the Americas Michelin corridor (Jungsik, Atera, Frenchette)',
      'Coveted historic landmark district protection'
    ]
  },
  {
    id: 'neigh-03',
    slug: 'malibu',
    name: 'Point Dume & Malibu',
    city: 'Malibu, CA',
    tagline: 'Coastal Bluff Sanctuaries & Golden Hour Ocean Living',
    description: 'Perched above pristine coves and world-renowned surf breaks, Point Dume offers private beach key access, organic modernist architecture, and uninhibited Pacific horizons.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Private Beach Key', 'Oceanfront Living', 'Coastal Modernism', 'Equestrian'],
    stats: {
      avgPriceSqFt: '$2,100',
      annualGrowth: '+9.2%',
      walkScore: 55,
      transitScore: 28,
      safetyRating: 'Top 2% Nationwide'
    },
    highlights: [
      'Private gated trail to Little Dume & Big Dume pristine beaches',
      'Malibu Country Mart & Nobu Malibu dining',
      'Scenic bluffs nature reserve with seasonal whale migration views'
    ]
  },
  {
    id: 'neigh-04',
    slug: 'greenwich',
    name: 'Backcountry Greenwich',
    city: 'Greenwich, CT',
    tagline: 'Expansive Country Estates, Equestrian Heritage & Coastal Commute',
    description: 'Set amidst rolling topography and mature forest canopies, Backcountry Greenwich provides peaceful multi-acre tranquility just 45 minutes from Manhattan.',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Multi-Acre Parcels', 'Equestrian Trails', 'Historic Manors', 'Tax Advantage'],
    stats: {
      avgPriceSqFt: '$890',
      annualGrowth: '+5.7%',
      walkScore: 30,
      transitScore: 50,
      safetyRating: 'Top 1% Nationwide'
    },
    highlights: [
      'Greenwich Country Day and premier private preparatory academies',
      'Round Hill Club and Greenwich Polo Club grounds',
      'Express Metro-North rail connection to Grand Central Terminal'
    ]
  }
];

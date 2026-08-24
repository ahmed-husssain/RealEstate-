import { Neighborhood } from '@/types';

export const mockNeighborhoods: Neighborhood[] = [
  {
    id: 'neigh-01',
    slug: 'north-nazimabad',
    name: 'North Nazimabad',
    city: 'Karachi',
    tagline: 'Premier Central Enclave with Wide Avenues & Sprawling Bangalows',
    description: 'One of Karachi’s most planned and prestigious residential sectors. Featuring planned Blocks (A to W), wide boulevards, top schools, commercial hubs, and luxury 240, 400, and 600 Gaz bungalows.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Central Location', 'Wide Roads', 'Family Enclave', 'Commercial Access'],
    stats: {
      avgPriceSqFt: 'PKR 165,000 / Sq Yd',
      annualGrowth: '+14.2%',
      walkScore: 88,
      transitScore: 92,
      safetyRating: 'Top Residential'
    },
    highlights: [
      'Blocks A, B, C, F & H premier residential avenues',
      'Immediate access to Green Line Metrobus & Hyderi Market',
      'High rental yields and steady capital appreciation'
    ]
  },
  {
    id: 'neigh-02',
    slug: 'gulshan-e-iqbal',
    name: 'Gulshan-e-Iqbal',
    city: 'Karachi',
    tagline: 'Educational & Commercial Epicenter of Karachi',
    description: 'A vibrant central metropolitan hub renowned for prime accessibility, University Road corridor, premier gated blocks, and diverse residential bungalows and luxury apartments.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['University Road', 'Gated Blocks', 'High Rental Demand', 'Prime Connectivity'],
    stats: {
      avgPriceSqFt: 'PKR 150,000 / Sq Yd',
      annualGrowth: '+13.5%',
      walkScore: 90,
      transitScore: 95,
      safetyRating: 'Established & Secure'
    },
    highlights: [
      'Blocks 4, 7, 13-D & 10-A premium family enclaves',
      'Close to University of Karachi, NED, and Aga Khan Hospital',
      'Thriving commercial dining and retail markets'
    ]
  },
  {
    id: 'neigh-03',
    slug: 'federal-b-area',
    name: 'Federal B Area (F.B Area)',
    city: 'Karachi',
    tagline: 'Planned Grid Community with Thriving Retail & High-Yield Housing',
    description: 'Central Karachi’s most accessible planned grid development across Blocks 1 to 21. Renowned for 120, 240, and 400 Gaz single-unit and multi-family residential houses with excellent civic amenities.',
    heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Planned Grid', 'Affordable Luxury', 'Shahrah-e-Pakistan', 'Strong Community'],
    stats: {
      avgPriceSqFt: 'PKR 135,000 / Sq Yd',
      annualGrowth: '+12.8%',
      walkScore: 92,
      transitScore: 90,
      safetyRating: 'Secure Family District'
    },
    highlights: [
      'Blocks 6, 14, 15 & 16 prime residential streets',
      'Direct connectivity via Shahrah-e-Pakistan and Water Pump Market',
      'Excellent water and gas infrastructure stability'
    ]
  },
  {
    id: 'neigh-04',
    slug: 'scheme-33',
    name: 'Scheme 33 (Gulzar-e-Hijri)',
    city: 'Karachi',
    tagline: 'Rapidly Expanding High-Growth Corridor & Gated Societies',
    description: 'Karachi’s fastest-growing residential and investment hub along the M-9 Super Highway and University Road. Home to over 100+ approved gated cooperative societies and modern turnkey villas.',
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Gated Societies', 'New Construction', 'M-9 Motorway', 'High Capital Gains'],
    stats: {
      avgPriceSqFt: 'PKR 85,000 / Sq Yd',
      annualGrowth: '+18.5%',
      walkScore: 70,
      transitScore: 78,
      safetyRating: 'Gated Security'
    },
    highlights: [
      'Saadi Town, Lawyers Colony, Gulshan-e-Kaneez Fatima & Pilibhit Society',
      'Modern wide-road master planning with new infrastructure',
      'Top choice for new 120, 200 & 400 Gaz construction'
    ]
  },
  {
    id: 'neigh-05',
    slug: 'buffer-zone',
    name: 'Buffer Zone',
    city: 'Karachi',
    tagline: 'Peaceful Residential Sector Adjacent to North Nazimabad',
    description: 'A quiet, well-organized residential enclave comprising Sector 15-A & 15-B. Known for family bungalows, community parks, and close access to Sakhi Hassan and Shadman Town.',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Peaceful Living', 'Parks & Playgrounds', 'Sakhi Hassan', 'Family Friendly'],
    stats: {
      avgPriceSqFt: 'PKR 110,000 / Sq Yd',
      annualGrowth: '+11.2%',
      walkScore: 84,
      transitScore: 86,
      safetyRating: 'Quiet Residential'
    },
    highlights: [
      'Sectors 15-A/1, 15-A/2 & 15-B residential blocks',
      'Walking distance to Gymkhanas, sports complexes and hospitals',
      'Affordable construction and renovation potential'
    ]
  },
  {
    id: 'neigh-06',
    slug: 'north-karachi',
    name: 'North Karachi',
    city: 'Karachi',
    tagline: 'Vast Residential Hub with Outstanding Commercial & Industrial Activity',
    description: 'Encompassing Sectors 1 to 11, North Karachi offers dynamic options from affordable 80 & 120 Gaz houses to prime commercial plazas and industrial export zones near Power House and Nagan Chowrangi.',
    heroImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Diverse Housing', 'Power House Hub', 'Commercial Zones', 'Nagan Corridor'],
    stats: {
      avgPriceSqFt: 'PKR 90,000 / Sq Yd',
      annualGrowth: '+12.0%',
      walkScore: 86,
      transitScore: 88,
      safetyRating: 'Bustling Metropolis'
    },
    highlights: [
      'Sectors 11-A, 11-B & 5-C prime residential developments',
      'Rapid access to Green Line Metro transit terminal',
      'Strong commercial rental demand and shop bookings'
    ]
  },
  {
    id: 'neigh-07',
    slug: 'gulberg',
    name: 'Gulberg Karachi',
    city: 'Karachi',
    tagline: 'Established Central Town Connecting North Nazimabad & F.B Area',
    description: 'Gulberg Town encompasses prime residential blocks including Block 1 to 19 and Samanabad. Characterized by lush local parks, respected colleges, and solid community infrastructure.',
    heroImage: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Established Enclave', 'Samanabad', 'Parks & Schools', 'High Connectivity'],
    stats: {
      avgPriceSqFt: 'PKR 125,000 / Sq Yd',
      annualGrowth: '+11.8%',
      walkScore: 88,
      transitScore: 89,
      safetyRating: 'Established Community'
    },
    highlights: [
      'Blocks 11, 12, 13 & 14 peaceful residential sectors',
      'Proximity to Aisha Manzil and Water Pump commercial districts',
      'Reliable municipal supply lines'
    ]
  },
  {
    id: 'neigh-08',
    slug: 'scheme-45',
    name: 'Scheme 45 (Taiser Town)',
    city: 'Karachi',
    tagline: 'High-Potential Emerging Investment Corridor of Northern Karachi',
    description: 'Karachi’s landmark master-planned scheme by MDA. Offering budget-friendly 80, 120, 240, and 400 Gaz residential plots, making it the top long-term wealth builder for smart investors.',
    heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['MDA Approved', 'Affordable Plots', 'Long-term Gains', 'Northern Bypass'],
    stats: {
      avgPriceSqFt: 'PKR 35,000 / Sq Yd',
      annualGrowth: '+22.4%',
      walkScore: 50,
      transitScore: 60,
      safetyRating: 'Developing Scheme'
    },
    highlights: [
      'Sectors 1 to 86 MDA planned residential sectors',
      'Immediate access via Northern Bypass and Manghopir Road',
      'Maximum return on investment (ROI) for plot files and land'
    ]
  },
  {
    id: 'neigh-09',
    slug: 'dha-karachi',
    name: 'DHA Karachi (Phases 1–8)',
    city: 'Karachi',
    tagline: 'Premier Coastal Enclaves & Ultra-Luxury Mansions',
    description: 'Karachi’s flagship elite development along the Arabian Sea. Renowned for wide boulevards, security, golf courses, beachfront promenades, and world-class architectural homes.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Coastal Living', 'Phases 5, 6 & 8', 'Ultra-Luxury', 'Golf & Marina'],
    stats: {
      avgPriceSqFt: 'PKR 320,000 / Sq Yd',
      annualGrowth: '+15.0%',
      walkScore: 80,
      transitScore: 75,
      safetyRating: 'Elite Security'
    },
    highlights: [
      'Phases 5, 6, 7 & 8 Creek Marina & Beachfront living',
      'Khayaban-e-Bukhari & Shahbaz premium commercial avenues',
      'Direct DHA head office title verification'
    ]
  },
  {
    id: 'neigh-10',
    slug: 'clifton-karachi',
    name: 'Clifton (Blocks 1–9)',
    city: 'Karachi',
    tagline: 'Diplomatic Enclave, Sea View & Trophy High-Rises',
    description: 'Karachi’s historic seaside destination featuring diplomat residences, modern shopping complexes, Sea View boulevard, and trophy sky penthouses.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Sea View', 'Diplomatic Zone', 'Oceanfront Towers', 'Fine Dining'],
    stats: {
      avgPriceSqFt: 'PKR 280,000 / Sq Yd',
      annualGrowth: '+13.8%',
      walkScore: 85,
      transitScore: 82,
      safetyRating: 'Diplomatic Grade'
    },
    highlights: [
      'Blocks 2, 4 & 5 luxury family villas',
      'Sea View & Ocean Towers coastal dining and entertainment',
      'High rental yield from multinational executives'
    ]
  }
];

import { Property } from '@/types';

export const mockProperties: Property[] = [
  {
    id: 'prop-01',
    slug: '500-sq-yd-luxury-bungalow-north-nazimabad-block-f',
    title: '500 Gaz Luxury Modern Bangalow',
    tagline: 'Brand New Architectural Bangalow in Prime Block F, North Nazimabad',
    description: 'A masterpiece of contemporary construction situated in the most coveted residential avenue of Block F, North Nazimabad. Built with Grade-60 steel, imported Spanish porcelain tiles, dual German modular kitchens, executive drawing room with false ceilings, and a private landscaped lawn.',
    price: 145000000,
    priceFormatted: 'PKR 14.50 Crore',
    status: 'for-sale',
    isFeatured: true,
    location: {
      address: 'Street 14, Block F, North Nazimabad',
      neighborhood: 'North Nazimabad',
      city: 'Karachi',
      postalCode: '74700',
      coordinates: { lat: 24.9333, lng: 67.0333 }
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      areaSqFt: 4500,
      lotSizeSqFt: 4500,
      yearBuilt: 2024,
      parkingSpaces: 4,
      propertyType: 'luxury-villa',
      energyRating: 'Solar Ready (15kW)',
      floorLevel: 'Ground + 1'
    },
    amenities: [
      'Dual German-Style Acrylic Kitchens',
      'Basement Entertainment Lounge & Media Wall',
      'Imported Spanish & Italian Porcelain Tiling',
      'Concealed Grohe Sanitary Fittings',
      '15kW Hybrid Solar Net-Metering Setup',
      'Underground RCC Tank (5,000 Gallons)',
      'High-Security CCTV Perimeter & Guard Room',
      'Private Lush Lawn & Rooftop Terrace'
    ],
    features: [
      { title: 'Prime Location', desc: 'Situated in the quiet, prestigious residential sector of Block F near Hyderi.' },
      { title: 'Executive Master Suites', desc: '6 spacious bedrooms with attached designer baths and walk-in dressing rooms.' },
      { title: 'Gourmet Kitchens', desc: 'UV acrylic soft-close cabinetry with quartz countertops and built-in ovens.' },
      { title: 'Solid Structure', desc: 'Earthquake-resistant RCC framed structure with anti-termite subterranean treatment.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: [
        { title: 'Ground Floor Living & 2 Master Suites', level: 'Ground Floor', sqFt: 2500, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80' },
        { title: 'First Floor 4 Bedrooms & Family Lounge', level: 'First Floor', sqFt: 2000, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' }
      ]
    },
    agent: {
      name: 'Tariq Mehmood Siddiqui',
      phone: '+92 300 822 4110',
      email: 'tariq.siddiqui@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923008224110'
    }
  },
  {
    id: 'prop-02',
    slug: '400-sq-yd-turnkey-house-gulshan-e-iqbal-block-4',
    title: '400 Gaz Executive Turnkey Bangalow',
    tagline: 'Prime Gated Enclave in Block 4, Gulshan-e-Iqbal',
    description: 'An elegantly crafted 400 Gaz single-unit residence in Gulshan-e-Iqbal Block 4. Offers an expansive double-height lounge, modern open American kitchen, teak wood woodwork, and dedicated parking for 3 vehicles.',
    price: 115000000,
    priceFormatted: 'PKR 11.50 Crore',
    status: 'for-sale',
    isFeatured: true,
    location: {
      address: 'Main Boulevard, Block 4, Gulshan-e-Iqbal',
      neighborhood: 'Gulshan-e-Iqbal',
      city: 'Karachi',
      postalCode: '75300',
      coordinates: { lat: 24.9180, lng: 67.0971 }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      areaSqFt: 3600,
      lotSizeSqFt: 3600,
      yearBuilt: 2023,
      parkingSpaces: 3,
      propertyType: 'luxury-villa',
      energyRating: '10kW Solar Net-Metered',
      floorLevel: 'Ground + 1'
    },
    amenities: [
      'Double Height Ceiling Drawing Room',
      'Solid Burma Teak Main Door & Millwork',
      'Granite Kitchen Tops with Grease Exhaust Hood',
      'Servant Quarter with Attached Bath',
      'Underground & Overhead Water Reservoir',
      '24/7 Gated Street Security Guard'
    ],
    features: [
      { title: 'Heart of Gulshan', desc: 'Walking distance to schools, parks, and dining avenues on Disco Bakery road.' },
      { title: 'Verified Title', desc: 'Clear KDA transfer documents with Sanad and complete mutation records.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Kamran Alvi',
      phone: '+92 333 219 8830',
      email: 'kamran.alvi@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923332198830'
    }
  },
  {
    id: 'prop-03',
    slug: '240-sq-yd-modern-villa-federal-b-area-block-14',
    title: '240 Gaz Brand New Double-Story House',
    tagline: 'Superb Double Unit House in Block 14, Federal B Area',
    description: 'Perfect for joint family or rental income. Newly built 240 Gaz double-unit property with separate entrances, 2 separate K-Electric meters, 2 full modern kitchens, and immaculate tile flooring.',
    price: 68000000,
    priceFormatted: 'PKR 6.80 Crore',
    status: 'for-sale',
    isFeatured: true,
    location: {
      address: 'Street 7, Block 14, Federal B Area (F.B Area)',
      neighborhood: 'Federal B Area',
      city: 'Karachi',
      postalCode: '75950',
      coordinates: { lat: 24.9280, lng: 67.0680 }
    },
    specs: {
      bedrooms: 6,
      bathrooms: 6,
      areaSqFt: 2160,
      lotSizeSqFt: 2160,
      yearBuilt: 2024,
      parkingSpaces: 2,
      propertyType: 'townhouse',
      energyRating: 'Energy Efficient LED',
      floorLevel: 'Ground + 1 (Dual Unit)'
    },
    amenities: [
      'Dual Independent Units (Ideal for 2 Families)',
      '2 Separate K-Electric Digital 3-Phase Meters',
      'Sweet Line Water Connection + Underground Tank',
      'Modern High-Gloss UV Cabinets',
      'Wide 40ft Carpeted Street'
    ],
    features: [
      { title: 'High Rental Yield', desc: 'Expected rental income of PKR 250,000/month if rented out separately.' },
      { title: 'Sub-Registrar Title', desc: '100% verified registry and mutation papers.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Kamran Alvi',
      phone: '+92 333 219 8830',
      email: 'kamran.alvi@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923332198830'
    }
  },
  {
    id: 'prop-04',
    slug: '200-sq-yd-turnkey-house-scheme-33-saadi-town',
    title: '200 Gaz Modern Turnkey Villa',
    tagline: 'Brand New Gated Residence in Saadi Town, Scheme 33',
    description: 'A contemporary 200 Gaz residential villa in the secure gated community of Saadi Town / Scheme 33. Boasts modern elevation, open roof garden, high-end false ceilings with COB warm lighting, and zero water or gas issues.',
    price: 38500000,
    priceFormatted: 'PKR 3.85 Crore',
    status: 'for-sale',
    isFeatured: true,
    location: {
      address: 'Block 4, Saadi Town, Scheme 33',
      neighborhood: 'Scheme 33',
      city: 'Karachi',
      postalCode: '75270',
      coordinates: { lat: 24.9600, lng: 67.1400 }
    },
    specs: {
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 1800,
      lotSizeSqFt: 1800,
      yearBuilt: 2024,
      parkingSpaces: 2,
      propertyType: 'luxury-villa',
      energyRating: 'Modern Insulation',
      floorLevel: 'Ground + 1'
    },
    amenities: [
      'Gated Society with Armed Security',
      'Wide Road Corner Option',
      'Underground Sweet Water Storage',
      'Rooftop BBQ Pavilion & Garden',
      'Nearby Commercial Market & Mosque'
    ],
    features: [
      { title: 'Affordable Modern Luxury', desc: 'Unbeatable value for brand new construction in a booming corridor.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Tariq Mehmood Siddiqui',
      phone: '+92 300 822 4110',
      email: 'tariq.siddiqui@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923008224110'
    }
  },
  {
    id: 'prop-05',
    slug: '240-sq-yd-corner-house-buffer-zone-sector-15a',
    title: '240 Gaz Renovated Corner House',
    tagline: 'Prime Corner Location in Sector 15-A, Buffer Zone',
    description: 'Completely modernized double-story bungalow in Buffer Zone Sector 15-A. Featuring new plumbing, chemical roof waterproofing, new kitchen, and spacious car porch.',
    price: 52000000,
    priceFormatted: 'PKR 5.20 Crore',
    status: 'for-sale',
    isFeatured: false,
    location: {
      address: 'Street 12, Sector 15-A, Buffer Zone',
      neighborhood: 'Buffer Zone',
      city: 'Karachi',
      postalCode: '75850',
      coordinates: { lat: 24.9500, lng: 67.0500 }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 5,
      areaSqFt: 2160,
      lotSizeSqFt: 2160,
      yearBuilt: 2023,
      parkingSpaces: 2,
      propertyType: 'luxury-villa',
      energyRating: 'Fully Rewired',
      floorLevel: 'Ground + 1'
    },
    amenities: [
      'Corner Plot with Dual Road Access',
      'Complete Amber Property Remodeling Guarantee',
      'Seepage-Proof Treated Walls & Roof',
      'Parks & Schools in Immediate Walking Distance'
    ],
    features: [
      { title: 'Turnkey Move-in Ready', desc: 'Completely refurbished and ready for immediate family possession.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Kamran Alvi',
      phone: '+92 333 219 8830',
      email: 'kamran.alvi@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923332198830'
    }
  },
  {
    id: 'prop-06',
    slug: '120-sq-yd-residential-plot-scheme-45-taiser-town',
    title: '120 Gaz Prime Residential Plot',
    tagline: 'Approved MDA Plot in Sector 2, Scheme 45 (Taiser Town)',
    description: 'Superb investment opportunity in MDA Scheme 45 (Taiser Town). Clear title file with paid challans, direct possession status, and rapid appreciation potential along the Northern Bypass.',
    price: 3200000,
    priceFormatted: 'PKR 32 Lakh',
    status: 'for-sale',
    isFeatured: false,
    location: {
      address: 'Sector 2, Scheme 45 (Taiser Town)',
      neighborhood: 'Scheme 45',
      city: 'Karachi',
      postalCode: '75890',
      coordinates: { lat: 25.0200, lng: 67.0800 }
    },
    specs: {
      bedrooms: 0,
      bathrooms: 0,
      areaSqFt: 1080,
      lotSizeSqFt: 1080,
      yearBuilt: 2024,
      parkingSpaces: 0,
      propertyType: 'estate',
      energyRating: 'Residential Open Plot',
      floorLevel: 'Open Land'
    },
    amenities: [
      'MDA Approved Scheme',
      'All Dues & Development Charges Cleared',
      'Ideal for Budget Home Construction or Long-Term ROI',
      'Direct Ownership File with Complete Bio-metric Verification'
    ],
    features: [
      { title: 'High ROI Investment', desc: 'Fastest growing budget corridor with projected 25%+ annual capital growth.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Tariq Mehmood Siddiqui',
      phone: '+92 300 822 4110',
      email: 'tariq.siddiqui@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923008224110'
    }
  },
  {
    id: 'prop-07',
    slug: '500-sq-yd-architectural-villa-north-nazimabad-block-b',
    title: '500 Gaz Executive Architectural Villa',
    tagline: 'Brand New Turnkey Residence in Block B, North Nazimabad',
    description: 'Designed for luxury multi-generational living in prime Block B, North Nazimabad. Features Italian porcelain elevation, dual imported German acrylic kitchens, basement lounge, covered car porch, and 15kW solar setup.',
    price: 165000000,
    priceFormatted: 'PKR 16.50 Crore',
    status: 'for-sale',
    isFeatured: true,
    location: {
      address: 'Street 9, Block B',
      neighborhood: 'North Nazimabad',
      city: 'Karachi',
      postalCode: '74700',
      coordinates: { lat: 24.9350, lng: 67.0380 }
    },
    specs: {
      bedrooms: 6,
      bathrooms: 7,
      areaSqFt: 4500,
      lotSizeSqFt: 4500,
      yearBuilt: 2024,
      parkingSpaces: 4,
      propertyType: 'luxury-villa',
      energyRating: '15kW Solar Hybrid',
      floorLevel: 'Ground + 1'
    },
    amenities: [
      'Italian Porcelain & Textured Facade',
      'Dual German Modular Kitchens',
      'Basement Entertainment Lounge',
      '15kW Solar Hybrid Net-Metering Setup',
      'Dedicated Guard & Driver Quarters'
    ],
    features: [
      { title: 'Prime Central Address', desc: 'Minutes from Allama Iqbal Open University, Hyderi Market, and Ziauddin Hospital.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Zainab Farooq',
      phone: '+92 321 945 6670',
      email: 'zainab.farooq@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923219456670'
    }
  }
];

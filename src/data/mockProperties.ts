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
  },
  {
    id: 'prop-08',
    slug: '500-sq-yd-luxury-ground-floor-portion-north-nazimabad-block-f',
    title: '500 Gaz Ground Floor Executive Portion',
    tagline: 'Spacious 4-Bed Luxury Portion with Separate Gate & Garden in Block F',
    description: 'A lavish ground floor portion situated in Block F, North Nazimabad. Features 4 large bedrooms with attached tiled bathrooms, drawing/dining hall, imported open modular kitchen, separate K-Electric 3-phase meter, underground water tank, and covered car parking.',
    price: 175000,
    priceFormatted: 'PKR 1.75 Lakh / mo',
    status: 'for-lease',
    isFeatured: true,
    location: {
      address: 'Street 11, Block F, North Nazimabad',
      neighborhood: 'North Nazimabad',
      city: 'Karachi',
      postalCode: '74700',
      coordinates: { lat: 24.9340, lng: 67.0345 }
    },
    specs: {
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3200,
      lotSizeSqFt: 4500,
      yearBuilt: 2023,
      parkingSpaces: 2,
      propertyType: 'townhouse',
      energyRating: 'Separate 3-Phase Meter',
      floorLevel: 'Ground Floor'
    },
    amenities: [
      'Separate Dedicated Gate & Driveway',
      'Sweet Water Line + Underground Tank',
      'Modern Modular Acrylic Kitchen',
      'Imported Tiled Flooring Throughout',
      'Drawing & Dining with Powder Room',
      'Quiet Residential Block Near Hyderi'
    ],
    features: [
      { title: 'Separate Entrance', desc: 'Complete privacy with independent entrance gate and 2-car internal porch.' },
      { title: 'Prime Block F', desc: 'Secure location within walking distance of parks, mosques, and top schools.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85'
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
    id: 'prop-09',
    slug: '3-bed-luxury-corner-apartment-gulshan-block-13d',
    title: '3-Bed Corner Luxury Apartment',
    tagline: 'High-Floor Ventilated Flat in Gated Complex, Block 13-D Gulshan',
    description: 'Immaculately maintained 3-bedroom apartment on the 5th floor of an executive gated complex in Block 13-D, Gulshan-e-Iqbal. Features standby generator, high-speed dual elevators, designated basement parking, and 24/7 security.',
    price: 95000,
    priceFormatted: 'PKR 95,000 / mo',
    status: 'for-lease',
    isFeatured: true,
    location: {
      address: 'Main University Road, Block 13-D, Gulshan-e-Iqbal',
      neighborhood: 'Gulshan-e-Iqbal',
      city: 'Karachi',
      postalCode: '75300',
      coordinates: { lat: 24.9180, lng: 67.0980 }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1800,
      lotSizeSqFt: 1800,
      yearBuilt: 2022,
      parkingSpaces: 1,
      propertyType: 'modern-apartment',
      energyRating: 'Standby Generator Backup',
      floorLevel: '5th Floor (Corner Unit)'
    },
    amenities: [
      '24/7 Standby Generator for Lifts & Common Areas',
      'Dual High-Speed Mitsubishi Elevators',
      'Assigned Covered Basement Parking',
      'Gated Community with CCTV Surveillance',
      'American Open Kitchen with Chimney Hood'
    ],
    features: [
      { title: 'Corner Ventilation', desc: 'West-open layout with maximum natural airflow and scenic city views.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85'
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
  },
  {
    id: 'prop-10',
    slug: '120-sq-yd-renovated-upper-portion-fb-area-block-14',
    title: '120 Gaz Renovated 1st Floor Portion',
    tagline: 'Spick-and-Span 3-Bed Family Floor in Block 14, Federal B Area',
    description: 'Completely renovated first-floor family portion in Block 14 (Naseerabad), Federal B Area. Includes 3 bedrooms, 2 bathrooms, modern tile work, drawing room, rooftop access, and separate gas & electricity meters.',
    price: 65000,
    priceFormatted: 'PKR 65,000 / mo',
    status: 'for-lease',
    isFeatured: false,
    location: {
      address: 'Street 4, Block 14, Federal B Area',
      neighborhood: 'Federal B Area',
      city: 'Karachi',
      postalCode: '75950',
      coordinates: { lat: 24.9280, lng: 67.0680 }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      areaSqFt: 1100,
      lotSizeSqFt: 1080,
      yearBuilt: 2021,
      parkingSpaces: 1,
      propertyType: 'townhouse',
      energyRating: 'Independent Utilities',
      floorLevel: '1st Floor'
    },
    amenities: [
      'Independent Sub-Meter Electricity & Gas',
      'Freshly Painted with Modern Tile Flooring',
      'Rooftop Access for Laundry & Family Gathering',
      'Close to Water Pump and Shahrah-e-Pakistan'
    ],
    features: [
      { title: 'Family Friendly', desc: 'Peaceful residential block close to reputable coaching centers, parks, and grocery stores.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=85',
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
    id: 'prop-11',
    slug: '240-sq-yd-independent-house-scheme-33-saadi-town',
    title: '240 Gaz Independent 1-Storey House',
    tagline: 'Gated Society 3-Bed Bangalow in Saadi Town, Scheme 33',
    description: 'Independent 240 Gaz single-storey bungalow available for family rent in Saadi Town, Scheme 33. Gated boundary wall society with security checkpoints, sweet line water, tiled rooms, and wide front road.',
    price: 85000,
    priceFormatted: 'PKR 85,000 / mo',
    status: 'for-lease',
    isFeatured: true,
    location: {
      address: 'Block 2, Saadi Town, Scheme 33',
      neighborhood: 'Scheme 33',
      city: 'Karachi',
      postalCode: '75270',
      coordinates: { lat: 24.9650, lng: 67.1450 }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 2160,
      lotSizeSqFt: 2160,
      yearBuilt: 2022,
      parkingSpaces: 2,
      propertyType: 'luxury-villa',
      energyRating: 'Gated Society Security',
      floorLevel: 'Single Storey Independent'
    },
    amenities: [
      'Gated Society Security & Guard Patrol',
      'Spacious Car Porch (Fits 2 Sedans)',
      'Front Lawn & Open Courtyard',
      'Sweet Line Water Connection'
    ],
    features: [
      { title: 'Independent Living', desc: 'No upper-portion sharing; entire house and rooftop for exclusive family use.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Farhan Raza',
      phone: '+92 333 456 7890',
      email: 'farhan.raza@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923334567890'
    }
  },
  {
    id: 'prop-12',
    slug: '240-sq-yd-ground-floor-portion-buffer-zone-15a',
    title: '240 Gaz Ground Portion with Separate Gate',
    tagline: 'Prime Family Portion in Sector 15-A/1, Buffer Zone',
    description: 'Renovated ground floor portion in Sector 15-A Buffer Zone, adjacent to North Nazimabad Block N. Features 3 bedrooms, drawing room, spacious lounge, separate car gate, and independent utilities.',
    price: 75000,
    priceFormatted: 'PKR 75,000 / mo',
    status: 'for-lease',
    isFeatured: false,
    location: {
      address: 'Street 8, Sector 15-A/1, Buffer Zone',
      neighborhood: 'Buffer Zone',
      city: 'Karachi',
      postalCode: '75850',
      coordinates: { lat: 24.9500, lng: 67.0580 }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1800,
      lotSizeSqFt: 2160,
      yearBuilt: 2021,
      parkingSpaces: 1,
      propertyType: 'townhouse',
      energyRating: 'Independent Meters',
      floorLevel: 'Ground Floor'
    },
    amenities: [
      'Independent Gate & Car Porch',
      'Solid Teakwood Doors & Aluminum Windows',
      'Sweet Water Line Available',
      'Near Government Degree College & Parks'
    ],
    features: [
      { title: 'Prime Buffer Zone', desc: 'Direct access to Nagan Chowrangi and North Nazimabad commercial areas.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=85'
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
    id: 'prop-13',
    slug: '3-bed-family-floor-north-karachi-sector-11a',
    title: '3-Bed Family Floor in North Karachi',
    tagline: 'Renovated 120 Gaz Upper Floor in Sector 11-A',
    description: 'Affordable, clean 3-bedroom upper portion in Sector 11-A, North Karachi. Near Green Line BRT station and Power House Chowrangi. Separate gas & electricity connections.',
    price: 45000,
    priceFormatted: 'PKR 45,000 / mo',
    status: 'for-lease',
    isFeatured: false,
    location: {
      address: 'Sector 11-A, North Karachi',
      neighborhood: 'North Karachi',
      city: 'Karachi',
      postalCode: '75850',
      coordinates: { lat: 24.9800, lng: 67.0650 }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 2,
      areaSqFt: 1080,
      lotSizeSqFt: 1080,
      yearBuilt: 2020,
      parkingSpaces: 1,
      propertyType: 'townhouse',
      energyRating: 'Standard',
      floorLevel: '1st Floor'
    },
    amenities: [
      '2 Minutes to Green Line BRT Power House Station',
      'Clean Tile Flooring and Fresh Paint',
      'Sweet Water Tank Setup',
      'Secure Family Residential Sector'
    ],
    features: [
      { title: 'Budget Family Rental', desc: 'Low monthly rent with immediate move-in condition.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: []
    },
    agent: {
      name: 'Farhan Raza',
      phone: '+92 333 456 7890',
      email: 'farhan.raza@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      whatsapp: '+923334567890'
    }
  },
  {
    id: 'prop-14',
    slug: 'commercial-storage-plot-lease-scheme-45-taiser-town',
    title: '400 Gaz Commercial Yard / Open Plot Lease',
    tagline: 'Ideal for Construction Materials Storage, Yard & Warehouse in Sector 2',
    description: '400 Gaz leveled commercial boundary-walled plot on wide 60-foot road in Scheme 45 (Taiser Town) Sector 2. Perfect for construction storage, scaffolding staging yard, or logistics depot with easy Northern Bypass truck access.',
    price: 35000,
    priceFormatted: 'PKR 35,000 / mo',
    status: 'for-lease',
    isFeatured: false,
    location: {
      address: '60 Ft Road, Sector 2, Scheme 45 (Taiser Town)',
      neighborhood: 'Scheme 45',
      city: 'Karachi',
      postalCode: '75850',
      coordinates: { lat: 25.0400, lng: 67.1200 }
    },
    specs: {
      bedrooms: 0,
      bathrooms: 1,
      areaSqFt: 3600,
      lotSizeSqFt: 3600,
      yearBuilt: 2023,
      parkingSpaces: 6,
      propertyType: 'estate',
      energyRating: 'Commercial Heavy Vehicle Access',
      floorLevel: 'Ground Plot Yard'
    },
    amenities: [
      '60-Foot Wide Truck Road Access',
      'High Boundary Wall with Heavy Iron Gate',
      'Guard Room with Attached Bathroom',
      'Direct Connectivity to Northern Bypass & M-9'
    ],
    features: [
      { title: 'Commercial Yard Lease', desc: 'Secure depot space for contractors, materials storage, and logistics.' }
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
  }
];

import { Property } from '@/types';

export const mockProperties: Property[] = [
  {
    id: 'prop-01',
    slug: 'the-solarium-manor-bel-air',
    title: 'The Solarium Manor',
    tagline: 'Architectural Masterpiece with Panoramic Canyon & Pacific Vistas',
    description: 'Conceived as an organic dialogue between warm limestone and stratified floor-to-ceiling glass, The Solarium Manor stands as a pinnacle of contemporary residential architecture. Enclosed within 1.8 private landscaped acres, the estate features bespoke mahogany millwork, dual temperature-controlled wine vaults, an infinity edge basalt pool, and private wellness pavilion.',
    price: 18500000,
    priceFormatted: '$18,500,000',
    status: 'exclusive',
    isFeatured: true,
    location: {
      address: '10420 Bellagio Road',
      neighborhood: 'Bel Air',
      city: 'Los Angeles, CA',
      postalCode: '90077',
      coordinates: { lat: 34.0837, lng: -118.4485 }
    },
    specs: {
      bedrooms: 6,
      bathrooms: 8,
      areaSqFt: 11400,
      lotSizeSqFt: 78400,
      yearBuilt: 2024,
      parkingSpaces: 6,
      propertyType: 'luxury-villa',
      energyRating: 'LEED Platinum',
      floorLevel: '3 Levels'
    },
    amenities: [
      'Infinity Edge Basalt Pool',
      'Dual Climate Wine Vault (2,000 Bottles)',
      'Subterranean 6-Car Gallery',
      'Private Spa & Cedar Sauna',
      'Dolby Atmos Screening Room',
      'Chef Kitchen with Gaggenau & La Cornue',
      'Smart Home Automation (Lutron & Savant)',
      'Solar Array & Tesla Powerwalls'
    ],
    features: [
      { title: 'Architectural Framework', desc: 'Crafted with hand-honed travertine, blackened bronze, and thermal glass.' },
      { title: 'Primary Suite Sanctuary', desc: 'Private terrace, dual stone dressing rooms, and outdoor shower garden.' },
      { title: 'Culinary Excellence', desc: 'Custom walnut cabinetry with bookmatched Calacatta marble counters.' },
      { title: 'Private Grounds', desc: 'Ancient olive groves, sculpture gardens, and reflective water features.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: [
        { title: 'Main Living & Entertainment Level', level: 'Level 1', sqFt: 5200, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80' },
        { title: 'Primary Retreat & Guest Suites', level: 'Level 2', sqFt: 4400, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' },
        { title: 'Wellness Pavilion & Subterranean Gallery', level: 'Lower Level', sqFt: 1800, imageUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80' }
      ],
      virtualTourUrl: 'https://my.matterport.com/show/?m=sample'
    },
    agent: {
      id: 'agent-01',
      name: 'Eleanor Vance-Sterling',
      title: 'Senior Managing Partner | Luxury Estates',
      phone: '+1 (310) 892-4412',
      email: 'eleanor@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      experienceYears: 18
    },
    publishedAt: '2026-08-10'
  },
  {
    id: 'prop-02',
    slug: 'the-apex-sky-penthouse-manhattan',
    title: 'The Apex Sky Penthouse',
    tagline: 'Duplex Crown with 360-Degree Manhattan Skyline & River Views',
    description: 'Perched atop the 68th and 69th floors along Billionaires Row, The Apex Sky Penthouse offers an unmatched metropolitan lifestyle. Featuring 24-foot double-height ceilings, a cantilevered bronze sculptural staircase, private elevator vestibule, and a 1,200 sq ft wrap-around sky terrace with outdoor fireplace.',
    price: 24750000,
    priceFormatted: '$24,750,000',
    status: 'for-sale',
    isFeatured: true,
    location: {
      address: '111 West 57th Street, PH 68',
      neighborhood: 'Central Park South',
      city: 'New York, NY',
      postalCode: '10019',
      coordinates: { lat: 40.7648, lng: -73.9772 }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      areaSqFt: 7850,
      yearBuilt: 2023,
      parkingSpaces: 2,
      propertyType: 'penthouse',
      energyRating: 'A+',
      floorLevel: '68th & 69th Floors'
    },
    amenities: [
      'Private 1,200 Sq Ft Sky Terrace',
      'Direct Keyed High-Speed Elevators',
      '24-Hour Concierge & White Glove Doorman',
      '82-Foot Indoor Saltwater Lap Pool',
      'Private Wine Cellar & Tasting Lounge',
      'Private Dining Room with Catering Kitchen',
      'Full-Floor Wellness & Fitness Club'
    ],
    features: [
      { title: 'Dramatic Ceiling Heights', desc: '24-foot soaring double-height great room with acoustic plaster finishes.' },
      { title: 'Bespoke Stone Craft', desc: 'Solid slab Fior di Bosco marble fireplace and honed French limestone floors.' },
      { title: 'Skyline Terrace', desc: 'Integrated heated radiant pavers, outdoor kitchen, and wind-shielded glass balustrades.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: [
        { title: 'Lower Duplex Level - Entertaining', level: 'Floor 68', sqFt: 4600, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80' },
        { title: 'Upper Duplex Level - Private Suites', level: 'Floor 69', sqFt: 3250, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' }
      ]
    },
    agent: {
      id: 'agent-02',
      name: 'Julian Montgomery',
      title: 'Principal Broker | Metropolitan Penthouses',
      phone: '+1 (212) 640-8820',
      email: 'julian@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      experienceYears: 15
    },
    publishedAt: '2026-08-15'
  },
  {
    id: 'prop-03',
    slug: 'amber-cove-coastal-residence-malibu',
    title: 'Amber Cove Residence',
    tagline: 'Private Blufftop Sanctuary with Direct Beach Access',
    description: 'Set directly upon the bluffs of Malibu’s most coveted coastline, Amber Cove combines warm coastal cedar, board-formed concrete, and floor-to-ceiling motorized glass walls that blur the distinction between interior warmth and the rhythm of the Pacific Ocean.',
    price: 14200000,
    priceFormatted: '$14,200,000',
    status: 'for-sale',
    isFeatured: true,
    location: {
      address: '28914 Cliffside Drive',
      neighborhood: 'Point Dume',
      city: 'Malibu, CA',
      postalCode: '90265',
      coordinates: { lat: 34.0016, lng: -118.8066 }
    },
    specs: {
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 6200,
      lotSizeSqFt: 43560,
      yearBuilt: 2022,
      parkingSpaces: 4,
      propertyType: 'luxury-villa',
      energyRating: 'Net Zero',
      floorLevel: '2 Levels'
    },
    amenities: [
      'Private Funicular & Gated Beach Trail',
      'Oceanfront Heated Plunge Pool & Spa',
      'Outdoor Dining Pavilion with Woodfired Oven',
      'Custom White Oak Millwork Throughout',
      'Integrated Sonos Architectural Audio',
      'Wine Room with Tasting Bench',
      'Primary Suite Oceanfront Lanai'
    ],
    features: [
      { title: 'Ocean Panorama', desc: 'Uninterrupted 180-degree ocean views from Point Dume to Catalina Island.' },
      { title: 'Organic Materials', desc: 'Hand-picked Japanese cedar, terrazzo tile, and tactile linen finishes.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: [
        { title: 'Main Living & Pool Terrace', level: 'Level 1', sqFt: 3800, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80' },
        { title: 'Ocean Suites & Lanai', level: 'Level 2', sqFt: 2400, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' }
      ]
    },
    agent: {
      id: 'agent-01',
      name: 'Eleanor Vance-Sterling',
      title: 'Senior Managing Partner | Luxury Estates',
      phone: '+1 (310) 892-4412',
      email: 'eleanor@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      experienceYears: 18
    },
    publishedAt: '2026-08-01'
  },
  {
    id: 'prop-04',
    slug: 'the-chelsea-atrium-townhouse',
    title: 'The Chelsea Atrium Townhouse',
    tagline: 'Historic Brownstone with 4-Story Glass Light Atrium',
    description: 'Meticulously reimagined by renowned architectural studio, this 25-foot wide townhouse merges 19th-century brick facade with an expansive steel-and-glass central atrium that floods every floor with natural light. Complete with private elevator, landscaped rooftop garden, and private garden level.',
    price: 11950000,
    priceFormatted: '$11,950,000',
    status: 'for-sale',
    isFeatured: false,
    location: {
      address: '328 West 21st Street',
      neighborhood: 'Chelsea',
      city: 'New York, NY',
      postalCode: '10011',
      coordinates: { lat: 40.7441, lng: -74.0006 }
    },
    specs: {
      bedrooms: 5,
      bathrooms: 6,
      areaSqFt: 6800,
      yearBuilt: 1910,
      parkingSpaces: 1,
      propertyType: 'townhouse',
      energyRating: 'A',
      floorLevel: '5 Stories'
    },
    amenities: [
      '4-Story Glass Lightwell Atrium',
      'Hydraulic Private Passenger Elevator',
      'Landscaped Rooftop with Outdoor Kitchen',
      'Private Japanese Zen Courtyard Garden',
      'Finished Cellar with Tasting Room & Gym',
      'Radiant Heated Chevron White Oak Floors'
    ],
    features: [
      { title: 'Historic Preservation', desc: 'Restored original brownstone facade with landmark approval.' },
      { title: 'Light & Volume', desc: 'Central atrium creates an organic garden core visible from all levels.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: [
        { title: 'Garden & Parlor Levels', level: 'Levels 1 & 2', sqFt: 3200, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80' },
        { title: 'Suites & Rooftop Terrace', level: 'Levels 3, 4 & Roof', sqFt: 3600, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' }
      ]
    },
    agent: {
      id: 'agent-02',
      name: 'Julian Montgomery',
      title: 'Principal Broker | Metropolitan Penthouses',
      phone: '+1 (212) 640-8820',
      email: 'julian@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      experienceYears: 15
    },
    publishedAt: '2026-08-18'
  },
  {
    id: 'prop-05',
    slug: 'the-oak-ridge-estate-greenwich',
    title: 'The Oak Ridge Estate',
    tagline: 'Modern Country Manor Set Across 8 Private Wooded Acres',
    description: 'Embodying quiet luxury and timeless proportions, The Oak Ridge Estate combines classical stone masonry with light-filled Scandinavian interior architecture. Features equestrian facilities, a private clay tennis court, heated swimming pavilion, and guest carriage house.',
    price: 9800000,
    priceFormatted: '$9,800,000',
    status: 'for-sale',
    isFeatured: false,
    location: {
      address: '42 Round Hill Road',
      neighborhood: 'Backcountry',
      city: 'Greenwich, CT',
      postalCode: '06831',
      coordinates: { lat: 41.0962, lng: -73.6668 }
    },
    specs: {
      bedrooms: 7,
      bathrooms: 9,
      areaSqFt: 12500,
      lotSizeSqFt: 348480,
      yearBuilt: 2021,
      parkingSpaces: 5,
      propertyType: 'estate',
      energyRating: 'Geothermal Certified',
      floorLevel: '3 Levels'
    },
    amenities: [
      '8 Private Landscaped & Wooded Acres',
      'Heated Gunite Pool with Pool House',
      'Championship Har-Tru Tennis Court',
      'Detached 2-Bedroom Guest Carriage House',
      'Geothermal Heating & Cooling System',
      '3,000-Bottle Sommelier Tasting Cellar'
    ],
    features: [
      { title: 'Estate Grounds', desc: 'Perennial walking trails, formal boxwood gardens, and reflecting pond.' },
      { title: 'Grand Scale', desc: '11-foot beamed ceilings and bespoke plaster molding.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: [
        { title: 'Main Manor House', level: 'Levels 1 & 2', sqFt: 9800, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80' }
      ]
    },
    agent: {
      id: 'agent-03',
      name: 'Victoria Thorne',
      title: 'Partner | Country & Equestrian Estates',
      phone: '+1 (203) 512-9901',
      email: 'victoria@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      experienceYears: 12
    },
    publishedAt: '2026-07-28'
  },
  {
    id: 'prop-06',
    slug: 'the-tribeca-cast-iron-loft',
    title: 'The Tribeca Cast-Iron Loft',
    tagline: 'Museum-Quality Full-Floor Loft with Original Fluted Columns',
    description: 'An expansive 4,800 square foot full-floor home in Tribeca’s historic landmark district. Showcasing 13-foot timber beamed ceilings, restored 1880s Corinthian cast-iron columns, minimalist Henrybuilt kitchen, and floor-to-ceiling south-facing acoustic casement windows.',
    price: 32000,
    priceFormatted: '$32,000',
    priceSuffix: '/month',
    status: 'for-lease',
    isFeatured: true,
    location: {
      address: '74 Franklin Street, 4th Floor',
      neighborhood: 'Tribeca',
      city: 'New York, NY',
      postalCode: '10013',
      coordinates: { lat: 40.7176, lng: -74.0049 }
    },
    specs: {
      bedrooms: 3,
      bathrooms: 3.5,
      areaSqFt: 4800,
      yearBuilt: 1886,
      parkingSpaces: 1,
      propertyType: 'modern-apartment',
      energyRating: 'A',
      floorLevel: '4th Floor'
    },
    amenities: [
      'Direct Key-Locked Elevator Access',
      'Restored Historic Cast-Iron Columns',
      'Custom Henrybuilt Solid Walnut Kitchen',
      'Primary Suite Spa with Boffi Soaking Tub',
      'Acoustic Triple-Glazed Landmark Windows',
      'Automated Hidden Architectural Shade Systems'
    ],
    features: [
      { title: 'Volume & Proportion', desc: '50-foot wide great room ideal for significant art collections.' },
      { title: 'Historic Soul', desc: 'Preserved exposed yellow pine joists and textured masonry.' }
    ],
    images: {
      hero: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1800&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1400&q=85',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'
      ],
      floorPlans: [
        { title: 'Full Floor Loft Plan', level: 'Floor 4', sqFt: 4800, imageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80' }
      ]
    },
    agent: {
      id: 'agent-02',
      name: 'Julian Montgomery',
      title: 'Principal Broker | Metropolitan Penthouses',
      phone: '+1 (212) 640-8820',
      email: 'julian@amberproperty.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      experienceYears: 15
    },
    publishedAt: '2026-08-20'
  }
];

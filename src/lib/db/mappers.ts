import { Property, Neighborhood, PropertyType, PropertyStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';

export function mapDbPropertyToProperty(dbProp: any): Property {
  const heroImage = dbProp.images?.find((img: any) => img.isHero)?.url ||
    dbProp.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  const gallery = dbProp.images?.map((img: any) => img.url) || [heroImage];

  let pType: PropertyType = 'luxury-villa';
  if (dbProp.propertyType === 'PENTHOUSE') pType = 'penthouse';
  if (dbProp.propertyType === 'HOUSE') pType = 'luxury-villa';
  if (dbProp.propertyType === 'VILLA') pType = 'luxury-villa';
  if (dbProp.propertyType === 'ESTATE') pType = 'estate';
  if (dbProp.propertyType === 'TOWNHOUSE') pType = 'townhouse';
  if (dbProp.propertyType === 'APARTMENT') pType = 'modern-apartment';

  let pStatus: PropertyStatus = 'for-sale';
  if (dbProp.status === 'FOR_LEASE') pStatus = 'for-lease';
  if (dbProp.status === 'EXCLUSIVE') pStatus = 'exclusive';
  if (dbProp.status === 'UNDER_OFFER') pStatus = 'under-offer';
  if (dbProp.status === 'SOLD') pStatus = 'sold';

  const priceNum = typeof dbProp.price === 'number' ? dbProp.price : Number(dbProp.price);
  const areaSizeNum = typeof dbProp.areaSize === 'number' ? dbProp.areaSize : Number(dbProp.areaSize);

  return {
    id: dbProp.id,
    slug: dbProp.slug,
    title: dbProp.title,
    tagline: `${areaSizeNum} ${dbProp.areaUnit || 'Sq Yd'} ${pType.replace('-', ' ')} in ${dbProp.area?.name || 'Prime Enclave'}`,
    description: dbProp.description,
    price: priceNum,
    priceFormatted: formatCurrency(priceNum),
    status: pStatus,
    isFeatured: Boolean(dbProp.isFeatured),
    location: {
      address: dbProp.address,
      neighborhood: dbProp.area?.name || 'Karachi Prime',
      city: dbProp.area?.city || 'Karachi',
      postalCode: '75500',
      coordinates: { lat: 24.8607, lng: 67.0011 },
    },
    specs: {
      bedrooms: dbProp.bedrooms || 4,
      bathrooms: dbProp.bathrooms || 5,
      areaSqFt: dbProp.areaUnit === 'SQYD' ? areaSizeNum * 9 : areaSizeNum,
      yearBuilt: 2024,
      parkingSpaces: 4,
      propertyType: pType,
      energyRating: 'A+',
    },
    amenities: [
      'Private Heated Pool & Spa',
      'Smart Home Automation',
      'Imported Italian Marble / Travertine',
      '24/7 Security & Guard House',
      'Solar Backup & Generator System',
      'Designer Chef Kitchen',
    ],
    features: [
      { title: 'Architectural Volumes', desc: 'Double-height ceilings and bespoke light trajectories.' },
      { title: 'Prime Location', desc: 'Coveted corner orientation in top-tier gated enclave.' },
      { title: 'Turnkey Luxury', desc: 'Fitted with German appliances and custom millwork.' },
    ],
    images: {
      hero: heroImage,
      gallery,
      floorPlans: [
        {
          title: 'Ground Level & Courtyard',
          level: 'Ground Floor',
          sqFt: Math.round((dbProp.areaUnit === 'SQYD' ? areaSizeNum * 9 : areaSizeNum) * 0.55),
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Upper Suites & Master Pavilion',
          level: 'First Floor',
          sqFt: Math.round((dbProp.areaUnit === 'SQYD' ? areaSizeNum * 9 : areaSizeNum) * 0.45),
          imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        },
      ],
      virtualTourUrl: 'https://example.com/virtual-tour',
    },
    agent: {
      id: dbProp.agent?.id || 'agent-1',
      name: dbProp.agent?.name || 'Tariq Mehmood Siddiqui',
      title: dbProp.agent?.role || 'Senior Managing Advisor',
      phone: dbProp.agent?.phone || '+92 300 822 4110',
      email: dbProp.agent?.email || 'tariq.siddiqui@amberproperty.com',
      avatarUrl: dbProp.agent?.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      experienceYears: 15,
    },
    publishedAt: dbProp.createdAt ? new Date(dbProp.createdAt).toISOString() : new Date().toISOString(),
  };
}

export function mapDbAreaToNeighborhood(dbArea: any): Neighborhood {
  return {
    id: dbArea.id,
    slug: dbArea.slug,
    name: dbArea.name,
    city: dbArea.city || 'Karachi',
    tagline: `Premier architectural enclave in ${dbArea.city || 'Karachi'}`,
    description: dbArea.description || '',
    heroImage: dbArea.heroImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    lifestyleTags: ['Coastal Estates', 'Fine Dining', 'Private Security', 'Family Clubs'],
    stats: {
      avgPriceSqFt: 'PKR 45,000',
      annualGrowth: '+14.2%',
      walkScore: 88,
      transitScore: 78,
      safetyRating: 'A+',
    },
    highlights: [
      'Gated security checkpoints and dedicated surveillance network',
      'Immediate access to marine promenades and elite sports clubs',
      'Highest capital appreciation trajectory across prime urban sectors',
    ],
  };
}

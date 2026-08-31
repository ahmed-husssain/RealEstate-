import { Property, Neighborhood, PropertyType, PropertyStatus } from '@/types';
import { formatCurrency } from '@/lib/utils';

export function mapDbPropertyToProperty(dbProp: any): Property {
  const heroImage =
    dbProp.images?.find((img: any) => img.isHero)?.url ||
    dbProp.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  const gallery = dbProp.images?.map((img: any) => img.url) || [heroImage];

  // Map Property Types
  let pType: PropertyType = 'luxury-villa';
  if (dbProp.propertyType === 'PENTHOUSE') pType = 'penthouse';
  else if (dbProp.propertyType === 'HOUSE' || dbProp.propertyType === 'VILLA') pType = 'luxury-villa';
  else if (dbProp.propertyType === 'ESTATE') pType = 'estate';
  else if (dbProp.propertyType === 'TOWNHOUSE') pType = 'townhouse';
  else if (dbProp.propertyType === 'APARTMENT') pType = 'modern-apartment';
  else if (dbProp.propertyType === 'PLOT') pType = 'residential-plot';
  else if (dbProp.propertyType === 'COMMERCIAL') pType = 'commercial-property';
  else if (dbProp.propertyType === 'PORTION') pType = 'floor-portion';

  // Map Status
  let pStatus: PropertyStatus = 'for-sale';
  if (dbProp.status === 'FOR_LEASE') pStatus = 'for-lease';
  else if (dbProp.status === 'EXCLUSIVE') pStatus = 'exclusive';
  else if (dbProp.status === 'UNDER_OFFER') pStatus = 'under-offer';
  else if (dbProp.status === 'SOLD') pStatus = 'sold';

  const priceNum = typeof dbProp.price === 'number' ? dbProp.price : Number(dbProp.price);
  const areaSizeNum = typeof dbProp.areaSize === 'number' ? dbProp.areaSize : Number(dbProp.areaSize);

  // Area unit display name & multiplier
  let unitLabel = 'Sq Yd';
  let sqFtMultiplier = 9;
  if (dbProp.areaUnit === 'SQFT') {
    unitLabel = 'Sq Ft';
    sqFtMultiplier = 1;
  } else if (dbProp.areaUnit === 'MARLA') {
    unitLabel = 'Marla';
    sqFtMultiplier = 225;
  } else if (dbProp.areaUnit === 'KANAL') {
    unitLabel = 'Kanal';
    sqFtMultiplier = 4500;
  } else if (dbProp.areaUnit === 'SQYD') {
    unitLabel = 'Sq Yd / Gaz';
    sqFtMultiplier = 9;
  }

  // Condition Label
  let conditionLabel = 'Good';
  if (dbProp.condition === 'BRAND_NEW') conditionLabel = 'Brand New';
  else if (dbProp.condition === 'EXCELLENT') conditionLabel = 'Excellent';
  else if (dbProp.condition === 'NEEDS_RENOVATION') conditionLabel = 'Needs Renovation';
  else if (dbProp.condition === 'UNDER_CONSTRUCTION') conditionLabel = 'Under Construction';

  // Price formatting
  let formattedPrice = dbProp.priceFormatted;
  if (!formattedPrice) {
    formattedPrice = formatCurrency(priceNum);
    if (pStatus === 'for-lease') {
      formattedPrice = `${formattedPrice} / Month`;
    }
  }

  // Generate authentic dynamic key highlights based ONLY on actual real data
  const realFeatures: { title: string; desc: string }[] = [];

  if (dbProp.area?.name) {
    realFeatures.push({
      title: 'Prime Location',
      desc: `Located in ${dbProp.area.name}, ${dbProp.area.city || 'Karachi'}.`,
    });
  }

  if (areaSizeNum > 0) {
    realFeatures.push({
      title: 'Land / Covered Footprint',
      desc: `${areaSizeNum} ${unitLabel} prime ${pType.replace(/-/g, ' ')} parcel.`,
    });
  }

  if (dbProp.propertyType !== 'PLOT' && conditionLabel) {
    realFeatures.push({
      title: 'Property Condition',
      desc: `Maintained in ${conditionLabel.toLowerCase()} condition.`,
    });
  }

  return {
    id: dbProp.id,
    slug: dbProp.slug,
    title: dbProp.title,
    tagline:
      dbProp.tagline ||
      `${areaSizeNum} ${unitLabel} ${pType.replace(/-/g, ' ')} in ${dbProp.area?.name || 'Karachi'}`,
    description: dbProp.description,
    price: priceNum,
    priceFormatted: formattedPrice,
    priceSuffix: dbProp.priceSuffix || (pStatus === 'for-lease' ? '/ Month' : undefined),
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
      bedrooms: dbProp.bedrooms || 0,
      bathrooms: dbProp.bathrooms || 0,
      areaSize: areaSizeNum,
      areaUnit: dbProp.areaUnit || 'SQYD',
      areaFormatted: `${areaSizeNum.toLocaleString()} ${unitLabel}`,
      areaSqFt: Math.round(areaSizeNum * sqFtMultiplier),
      yearBuilt: dbProp.yearBuilt || null,
      parkingSpaces: dbProp.parkingSpaces || 0,
      condition: conditionLabel,
      propertyType: pType,
      rawPropertyType: dbProp.propertyType,
      energyRating: 'A+',
    },
    // Amenities come directly from PostgreSQL
    amenities: Array.isArray(dbProp.amenities) ? dbProp.amenities : [],
    features: realFeatures,
    images: {
      hero: heroImage,
      gallery,
      floorPlans: [],
      virtualTourUrl: dbProp.virtualTourUrl || undefined,
    },
    agent: {
      id: dbProp.agent?.id || 'agent-1',
      name: dbProp.agent?.name || 'Syed Sikander Waqar',
      title: dbProp.agent?.role || 'Senior Managing Advisor',
      phone: dbProp.agent?.phone || '+92 300 822 4110',
      email: dbProp.agent?.email || 'syedsikander1401@gmail.com',
      avatarUrl:
        dbProp.agent?.avatarUrl ||
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      experienceYears: dbProp.agent?.experienceYears || 15,
      whatsapp: dbProp.agent?.whatsapp || '+923008224110',
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
    lifestyleTags: ['Master Planned', 'Prime Enclave', '24/7 Security', 'Commercial Hubs'],
    stats: {
      avgPriceSqFt: dbArea.avgPriceSqYd || 'PKR 150,000 / Sq Yd',
      annualGrowth: dbArea.annualGrowth || '+12.5%',
      walkScore: 88,
      transitScore: 78,
      safetyRating: 'A+',
    },
    highlights: [
      `Master-planned community network in ${dbArea.name}`,
      'Direct access to major urban transit and commercial arteries',
      'Consistent capital appreciation trajectory in Karachi real estate',
    ],
  };
}

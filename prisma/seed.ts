import { PrismaClient, PropertyStatus, PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Amber Property Corner database seeding for Karachi Luxury Market...');

  // 1. Clean existing records in reverse dependency order
  await prisma.propertyImage.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.property.deleteMany();
  await prisma.area.deleteMany();
  await prisma.agent.deleteMany();
  await prisma.valuationRequest.deleteMany();

  console.log('🧹 Cleaned existing database records.');

  // 2. Create Certified Senior Real Estate Advisors
  const tariq = await prisma.agent.create({
    data: {
      name: 'Tariq Mehmood Siddiqui',
      phone: '+92 300 822 4110',
      email: 'tariq.siddiqui@amberproperty.com',
      whatsapp: '+923008224110',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      role: 'Senior Managing Partner | DHA & Coastal Estates',
      isActive: true,
    },
  });

  const zainab = await prisma.agent.create({
    data: {
      name: 'Zainab Farooq',
      phone: '+92 321 945 6670',
      email: 'zainab.farooq@amberproperty.com',
      whatsapp: '+923219456670',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      role: 'Managing Director | Clifton & Trophy Penthouses',
      isActive: true,
    },
  });

  const kamran = await prisma.agent.create({
    data: {
      name: 'Kamran Alvi',
      phone: '+92 333 219 8830',
      email: 'kamran.alvi@amberproperty.com',
      whatsapp: '+923332198830',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      role: 'Partner | KDA Scheme 1 & Commercial Portfolios',
      isActive: true,
    },
  });

  console.log('✅ Created 3 Senior Real Estate Advisors.');

  // 3. Create Karachi Prime Districts & Enclaves
  const dhaPhase8 = await prisma.area.create({
    data: {
      slug: 'dha-phase-8',
      name: 'DHA Phase 8 (Creek & Marina)',
      city: 'Karachi',
      description: 'Karachi’s most prestigious coastal enclave offering modern seafront mansions, golf club access, and private sea-facing promenades.',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const clifton = await prisma.area.create({
    data: {
      slug: 'clifton-blocks',
      name: 'Clifton (Blocks 2, 4 & 5)',
      city: 'Karachi',
      description: 'Historic prestige neighborhood home to diplomatic compounds, iconic heritage architecture, oceanfront high-rises, and private residences.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const kdaScheme1 = await prisma.area.create({
    data: {
      slug: 'kda-scheme-1',
      name: 'KDA Scheme 1 (Tipu Sultan)',
      city: 'Karachi',
      description: 'Central premier sanctuary celebrated for sprawling 1000–2000 Sq Yd private family estates, canopy tree-lined avenues, and total security.',
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const dhaPhase6 = await prisma.area.create({
    data: {
      slug: 'dha-phase-6',
      name: 'DHA Phase 6 (Hilal & Ittehad)',
      city: 'Karachi',
      description: 'The dynamic center of modern DHA living featuring brand new contemporary architectural villas and immediate proximity to high-end dining and shopping.',
      heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  console.log('✅ Created 4 Prime Karachi Enclaves.');

  // 4. Create Karachi Prime Properties with Galleries
  // Property 1: 1000 Sq Yd Phase 8 Mansion
  const prop1 = await prisma.property.create({
    data: {
      slug: '1000-sqyd-modern-seafront-mansion-dha-phase-8',
      title: '1000 Sq Yd Modern Seafront Architectural Mansion',
      description: 'Constructed to uncompromising international standards, this corner 1000 Sq Yd contemporary residence in DHA Phase 8 features double-height Italian travertine volumes, basement cinema, private swimming pool, smart climate control, and uninterrupted Arabian Sea breezes.',
      price: 385000000.00, // PKR 38.5 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.VILLA,
      bedrooms: 6,
      bathrooms: 7,
      areaSize: 1000.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Khayaban-e-Ghalib, Zone B, DHA Phase 8, Karachi',
      areaId: dhaPhase8.id,
      agentId: tariq.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            alt: 'Front Architectural Elevation of 1000 Sq Yd Mansion',
            isHero: true,
            displayOrder: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            alt: 'Double Height Formal Living Lounge with Italian Travertine',
            isHero: false,
            displayOrder: 2,
          },
          {
            url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
            alt: 'Private Courtyard Heated Swimming Pool & Deck',
            isHero: false,
            displayOrder: 3,
          },
        ],
      },
    },
  });

  // Property 2: 600 Sq Yd Luxury Designer Villa - Phase 6
  const prop2 = await prisma.property.create({
    data: {
      slug: '600-sqyd-designer-triplex-villa-dha-phase-6',
      title: '600 Sq Yd Minimalist Triplex Designer Villa',
      description: 'A masterpiece of contemporary residential engineering on Khayaban-e-Hilal. Features solid teakwood paneling, German open-plan kitchen, private lift/elevator across all levels, rooftop entertainment pavilion, and 4 dedicated basement car parking spots.',
      price: 245000000.00, // PKR 24.5 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.HOUSE,
      bedrooms: 5,
      bathrooms: 6,
      areaSize: 600.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Khayaban-e-Hilal, Phase 6, DHA, Karachi',
      areaId: dhaPhase6.id,
      agentId: tariq.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
            alt: 'Exterior Concrete & Glass Facade in Phase 6',
            isHero: true,
            displayOrder: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
            alt: 'Open Concept Chef Kitchen & Breakfast Island',
            isHero: false,
            displayOrder: 2,
          },
        ],
      },
    },
  });

  // Property 3: Sky Penthouse - Clifton
  const prop3 = await prisma.property.create({
    data: {
      slug: '5-bed-panoramic-ocean-penthouse-clifton',
      title: '5-Bedroom Sky Penthouse with Direct Arabian Sea View',
      description: 'Rare opportunity to acquire an expansive 5,500 Sq Ft full-floor penthouse in an ultra-exclusive Clifton high-rise. Offering 360-degree views over Karachi shoreline, private elevator access, 24/7 armed concierge, and duplex outdoor terraces.',
      price: 168000000.00, // PKR 16.8 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.EXCLUSIVE,
      propertyType: PropertyType.PENTHOUSE,
      bedrooms: 5,
      bathrooms: 5,
      areaSize: 5500.00,
      areaUnit: AreaUnit.SQFT,
      address: 'Marine Drive, Block 2, Clifton, Karachi',
      areaId: clifton.id,
      agentId: zainab.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
            alt: 'Penthouse Living Room with Floor-to-Ceiling Ocean Glazing',
            isHero: true,
            displayOrder: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
            alt: 'Master Suite Sunset Terrace overlooking Marine Drive',
            isHero: false,
            displayOrder: 2,
          },
        ],
      },
    },
  });

  // Property 4: 2000 Sq Yd Family Compound - KDA Scheme 1
  const prop4 = await prisma.property.create({
    data: {
      slug: '2000-sqyd-estate-compound-kda-scheme-1',
      title: '2000 Sq Yd Landmark Family Estate Compound',
      description: 'A generational asset occupying a prime 2000 Sq Yd corner parcel in KDA Scheme 1. Includes lush manicured lawn grounds, private guest villa, 8-car portico, separate guard house, and complete solar backup system.',
      price: 750000000.00, // PKR 75 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.EXCLUSIVE,
      propertyType: PropertyType.ESTATE,
      bedrooms: 8,
      bathrooms: 9,
      areaSize: 2000.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Main Tipu Sultan Road, KDA Scheme 1, Karachi',
      areaId: kdaScheme1.id,
      agentId: kamran.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
            alt: 'Expansive Lawn & Classical Modern Facade',
            isHero: true,
            displayOrder: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
            alt: 'Grand Entrance Foyer & Spiral Floating Staircase',
            isHero: false,
            displayOrder: 2,
          },
        ],
      },
    },
  });

  // Property 5: 500 Sq Yd Phase 5 Brand New Bungalow
  const prop5 = await prisma.property.create({
    data: {
      slug: '500-sqyd-brand-new-modern-house-dha-phase-5',
      title: '500 Sq Yd Brand New Minimalist Bungalow',
      description: 'Brand new completion featuring architectural exposed concrete accents, double-glazed soundproof glass, Spanish porcelain tile flooring, and fully integrated smart home automation in prime Phase 5.',
      price: 180000000.00, // PKR 18 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.HOUSE,
      bedrooms: 5,
      bathrooms: 6,
      areaSize: 500.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Khayaban-e-Shamsheer, Phase 5, DHA, Karachi',
      areaId: dhaPhase6.id,
      agentId: tariq.id,
      isFeatured: false,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
            alt: 'Phase 5 Modern Bungalow Exterior',
            isHero: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  console.log('✅ Created 5 Landmark Karachi Luxury Listings with Full Media Galleries.');

  console.log('🎉 Database seeding successfully finished!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

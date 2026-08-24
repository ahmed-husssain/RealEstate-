import { PrismaClient, PropertyStatus, PropertyType, AreaUnit } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Amber Property Corner database seeding for Karachi Core & Emerging Markets...');

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
      role: 'Senior Managing Partner | North Nazimabad & Construction',
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
      role: 'Senior Advisor | Gulshan, FB Area & Scheme 33',
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
      role: 'Director | Gulshan, North Nazimabad & High-Yield Commercial',
      isActive: true,
    },
  });

  console.log('✅ Created 3 Senior Real Estate Advisors.');

  // 3. Create All Target Karachi Areas
  const northNazimabad = await prisma.area.create({
    data: {
      slug: 'north-nazimabad',
      name: 'North Nazimabad',
      city: 'Karachi',
      description: 'Prime master-planned residential enclave known for spacious 240 to 1000 Gaz bangalows, wide boulevards, excellent schools, and top healthcare centers.',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const gulshan = await prisma.area.create({
    data: {
      slug: 'gulshan-e-iqbal',
      name: 'Gulshan-e-Iqbal',
      city: 'Karachi',
      description: 'Vibrant central residential hub featuring prime blocks, university campuses, shopping avenues, and premium multi-unit residential houses.',
      heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const fbArea = await prisma.area.create({
    data: {
      slug: 'federal-b-area',
      name: 'Federal B Area (F.B Area)',
      city: 'Karachi',
      description: 'One of Karachi’s most established residential zones with 21 well-planned blocks, bustling commercial centers, and solid property appreciation.',
      heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const scheme33 = await prisma.area.create({
    data: {
      slug: 'scheme-33',
      name: 'Scheme 33 (Gulzar-e-Hijri)',
      city: 'Karachi',
      description: 'Fastest-growing corridor in Karachi featuring over 100 gated housing societies, modern infrastructure, and tremendous investment potential.',
      heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const bufferZone = await prisma.area.create({
    data: {
      slug: 'buffer-zone',
      name: 'Buffer Zone',
      city: 'Karachi',
      description: 'Peaceful central residential sector adjacent to North Nazimabad with high rental yield and renovated double-storey family houses.',
      heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const northKarachi = await prisma.area.create({
    data: {
      slug: 'north-karachi',
      name: 'North Karachi',
      city: 'Karachi',
      description: 'Thriving northern hub offering diverse residential plot options, commercial centers, and prime connectivity via Green Line BRT and Nagan Chowrangi.',
      heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const gulberg = await prisma.area.create({
    data: {
      slug: 'gulberg-karachi',
      name: 'Gulberg Karachi',
      city: 'Karachi',
      description: 'Prestigious central town comprising Samanabad, Aisha Manzil, and Water Pump with high demand for turnkey houses and commercial assets.',
      heroImage: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  const scheme45 = await prisma.area.create({
    data: {
      slug: 'scheme-45-taiser-town',
      name: 'Scheme 45 (Taiser Town)',
      city: 'Karachi',
      description: 'MDA master-planned low-cost investment scheme offering 80, 120 & 240 Gaz residential plots with immense long-term appreciation potential.',
      heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      isPopular: true,
    },
  });

  console.log('✅ Created 8 Target Karachi Areas.');

  // 4. Create Properties
  await prisma.property.create({
    data: {
      slug: '500-sq-yd-luxury-bungalow-north-nazimabad-block-f',
      title: '500 Gaz Luxury Modern Bangalow',
      description: 'A masterpiece of contemporary construction situated in Block F, North Nazimabad. Built with Grade-60 steel, imported Spanish porcelain tiles, dual German modular kitchens, executive drawing room with false ceilings, and a private landscaped lawn.',
      price: 145000000.00, // PKR 14.50 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.VILLA,
      bedrooms: 6,
      bathrooms: 7,
      areaSize: 500.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Street 14, Block F, North Nazimabad, Karachi',
      areaId: northNazimabad.id,
      agentId: tariq.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            alt: 'Front Elevation of 500 Gaz North Nazimabad Bangalow',
            isHero: true,
            displayOrder: 1,
          },
          {
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            alt: 'Spacious Formal Drawing Room with Italian Tiling',
            isHero: false,
            displayOrder: 2,
          },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      slug: '400-sq-yd-turnkey-house-gulshan-e-iqbal-block-4',
      title: '400 Gaz Executive Turnkey Bangalow',
      description: 'An elegantly crafted 400 Gaz single-unit residence in Gulshan-e-Iqbal Block 4. Offers an expansive double-height lounge, modern open American kitchen, teak woodwork, and dedicated parking for 3 vehicles.',
      price: 115000000.00, // PKR 11.50 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.VILLA,
      bedrooms: 5,
      bathrooms: 6,
      areaSize: 400.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Main Boulevard, Block 4, Gulshan-e-Iqbal, Karachi',
      areaId: gulshan.id,
      agentId: kamran.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
            alt: 'Front Facade of 400 Gaz House in Gulshan',
            isHero: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      slug: '240-sq-yd-modern-villa-federal-b-area-block-14',
      title: '240 Gaz Brand New Double-Story House',
      description: 'Newly built 240 Gaz double-unit property in F.B Area Block 14 with separate entrances, 2 separate K-Electric meters, 2 full modern kitchens, and immaculate tile flooring.',
      price: 68000000.00, // PKR 6.80 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.TOWNHOUSE,
      bedrooms: 6,
      bathrooms: 6,
      areaSize: 240.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Street 7, Block 14, Federal B Area, Karachi',
      areaId: fbArea.id,
      agentId: kamran.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
            alt: '240 Gaz Double Unit House in FB Area',
            isHero: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      slug: '200-sq-yd-turnkey-house-scheme-33-saadi-town',
      title: '200 Gaz Modern Turnkey Villa',
      description: 'Contemporary 200 Gaz residential villa in the secure gated community of Saadi Town / Scheme 33. Boasts modern elevation, open roof garden, and high-end false ceilings.',
      price: 38500000.00, // PKR 3.85 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.VILLA,
      bedrooms: 4,
      bathrooms: 5,
      areaSize: 200.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Block 4, Saadi Town, Scheme 33, Karachi',
      areaId: scheme33.id,
      agentId: tariq.id,
      isFeatured: true,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
            alt: 'Turnkey Modern Villa in Saadi Town Scheme 33',
            isHero: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      slug: '240-sq-yd-corner-house-buffer-zone-sector-15a',
      title: '240 Gaz Renovated Corner House',
      description: 'Completely modernized double-story bungalow in Buffer Zone Sector 15-A with new plumbing, chemical roof waterproofing, and spacious car porch.',
      price: 52000000.00, // PKR 5.20 Crore
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.VILLA,
      bedrooms: 5,
      bathrooms: 5,
      areaSize: 240.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Street 12, Sector 15-A, Buffer Zone, Karachi',
      areaId: bufferZone.id,
      agentId: kamran.id,
      isFeatured: false,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
            alt: '240 Gaz Corner House in Buffer Zone',
            isHero: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  await prisma.property.create({
    data: {
      slug: '120-sq-yd-residential-plot-scheme-45-taiser-town',
      title: '120 Gaz Prime Residential Plot',
      description: 'MDA Scheme 45 (Taiser Town) Sector 2 open residential plot with cleared dues, possession status, and rapid appreciation potential along the Northern Bypass.',
      price: 3200000.00, // PKR 32 Lakh
      priceType: 'TOTAL',
      status: PropertyStatus.FOR_SALE,
      propertyType: PropertyType.PLOT,
      bedrooms: 0,
      bathrooms: 0,
      areaSize: 120.00,
      areaUnit: AreaUnit.SQYD,
      address: 'Sector 2, Scheme 45 (Taiser Town), Karachi',
      areaId: scheme45.id,
      agentId: tariq.id,
      isFeatured: false,
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
            alt: 'Residential Plot in Scheme 45 Taiser Town',
            isHero: true,
            displayOrder: 1,
          },
        ],
      },
    },
  });

  console.log('✅ Created Karachi Properties with Galleries.');
  console.log('🎉 Seeding successfully completed for Amber Property Corner!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

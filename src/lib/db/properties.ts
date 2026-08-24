import prisma from '@/lib/prisma';
import { PropertyStatus, PropertyType } from '@prisma/client';
import { unstable_cache } from 'next/cache';

export interface PropertyQueryOptions {
  search?: string;
  propertyType?: string;
  areaSlug?: string;
  bedrooms?: number | string;
  status?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';
  limit?: number;
  page?: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface PaginatedPropertiesResult {
  properties: any[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

function buildPrismaWhereClause(options: PropertyQueryOptions = {}) {
  const where: any = {};

  // 1. Text Search across Title, Description, Address, and Area Name
  if (options.search && options.search.trim().length > 0) {
    const term = options.search.trim();
    where.OR = [
      { title: { contains: term, mode: 'insensitive' } },
      { description: { contains: term, mode: 'insensitive' } },
      { address: { contains: term, mode: 'insensitive' } },
      { area: { name: { contains: term, mode: 'insensitive' } } },
    ];
  }

  // 2. Property Type Filter
  if (options.propertyType && options.propertyType !== 'all') {
    const rawType = options.propertyType.toUpperCase().replace('-', '_');
    // Map common slug variations
    let resolvedType: PropertyType | undefined;
    if (rawType === 'LUXURY_VILLA' || rawType === 'VILLA') resolvedType = PropertyType.VILLA;
    else if (rawType === 'MODERN_APARTMENT' || rawType === 'APARTMENT') resolvedType = PropertyType.APARTMENT;
    else if (rawType === 'PENTHOUSE') resolvedType = PropertyType.PENTHOUSE;
    else if (rawType === 'TOWNHOUSE') resolvedType = PropertyType.TOWNHOUSE;
    else if (rawType === 'ESTATE' || rawType === 'PLOT') resolvedType = PropertyType.PLOT;
    else if (rawType === 'HOUSE') resolvedType = PropertyType.HOUSE;
    else if (Object.values(PropertyType).includes(rawType as any)) {
      resolvedType = rawType as PropertyType;
    }

    if (resolvedType) {
      where.propertyType = resolvedType;
    }
  }

  // 3. Area / Neighborhood Filter
  if (options.areaSlug && options.areaSlug !== 'all') {
    const cleanArea = options.areaSlug.trim();
    where.OR = [
      ...(where.OR || []),
      { area: { slug: cleanArea } },
      { area: { name: { contains: cleanArea, mode: 'insensitive' } } },
    ];
  }

  // 4. Status Filter (For Sale, For Rent / Lease)
  if (options.status && options.status !== 'all') {
    let resolvedStatus: PropertyStatus | undefined;
    const rawStatus = options.status.toUpperCase().replace('-', '_');
    if (rawStatus === 'FOR_SALE' || rawStatus === 'BUY') resolvedStatus = PropertyStatus.FOR_SALE;
    else if (rawStatus === 'FOR_LEASE' || rawStatus === 'RENT') resolvedStatus = PropertyStatus.FOR_LEASE;
    else if (rawStatus === 'EXCLUSIVE') resolvedStatus = PropertyStatus.EXCLUSIVE;
    else if (Object.values(PropertyStatus).includes(rawStatus as any)) {
      resolvedStatus = rawStatus as PropertyStatus;
    }

    if (resolvedStatus) {
      where.status = resolvedStatus;
    }
  }

  // 5. Bedrooms Minimum Threshold
  if (options.bedrooms && options.bedrooms !== 'all') {
    const minBeds = parseInt(String(options.bedrooms), 10);
    if (!isNaN(minBeds) && minBeds > 0) {
      where.bedrooms = { gte: minBeds };
    }
  }

  // 6. Price Range Boundaries
  if (options.minPrice !== undefined || options.maxPrice !== undefined) {
    where.price = {};
    if (options.minPrice !== undefined && options.minPrice > 0) {
      where.price.gte = options.minPrice;
    }
    if (options.maxPrice !== undefined && options.maxPrice < 1000000000) {
      where.price.lte = options.maxPrice;
    }
    if (Object.keys(where.price).length === 0) {
      delete where.price;
    }
  }

  return where;
}

function buildPrismaOrderBy(sortBy?: string) {
  switch (sortBy) {
    case 'price-asc':
      return { price: 'asc' as const };
    case 'price-desc':
      return { price: 'desc' as const };
    case 'area-desc':
      return { areaSize: 'desc' as const };
    case 'newest':
      return { createdAt: 'desc' as const };
    case 'featured':
    default:
      return [{ isFeatured: 'desc' as const }, { createdAt: 'desc' as const }];
  }
}

/**
 * High-performance paginated property query with database-level filtering, sorting, and image limit optimization.
 */
async function fetchPaginatedPropertiesFromDb(
  options: PropertyQueryOptions = {}
): Promise<PaginatedPropertiesResult> {
  try {
    const page = Math.max(1, parseInt(String(options.page || 1), 10) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(String(options.pageSize || 12), 10) || 12));
    const skip = (page - 1) * pageSize;

    const where = buildPrismaWhereClause(options);
    const orderBy = buildPrismaOrderBy(options.sortBy);

    // Concurrently execute count and paginated query in a single database transaction round-trip
    const [totalCount, rawProperties] = await prisma.$transaction([
      prisma.property.count({ where }),
      prisma.property.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        include: {
          area: {
            select: {
              id: true,
              name: true,
              slug: true,
              city: true,
            },
          },
          agent: {
            select: {
              id: true,
              name: true,
              phone: true,
              whatsapp: true,
              avatarUrl: true,
              role: true,
            },
          },
          // Optimized relation: Load up to 4 ordered images for the interactive card carousel instead of unbounded galleries
          images: {
            orderBy: { displayOrder: 'asc' },
            take: 4,
          },
        },
      }),
    ]);

    const properties = rawProperties.map((p) => ({
      ...p,
      price: Number(p.price),
      areaSize: Number(p.areaSize),
      lotSize: p.lotSize ? Number(p.lotSize) : null,
      latitude: p.latitude ? Number(p.latitude) : null,
      longitude: p.longitude ? Number(p.longitude) : null,
    }));

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

    return {
      properties,
      totalCount,
      page,
      pageSize,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching paginated properties from database:', error);
    return {
      properties: [],
      totalCount: 0,
      page: 1,
      pageSize: 12,
      totalPages: 1,
    };
  }
}

/**
 * Cached getter for paginated catalog queries.
 */
export const getPaginatedProperties = async (options: PropertyQueryOptions = {}) => {
  const page = Math.max(1, parseInt(String(options.page || 1), 10) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(String(options.pageSize || 12), 10) || 12));

  const cacheKey = [
    'properties-paginated',
    String(page),
    String(pageSize),
    options.search || '',
    options.propertyType || '',
    options.areaSlug || '',
    String(options.bedrooms || ''),
    options.status || '',
    options.sortBy || '',
    String(options.minPrice || ''),
    String(options.maxPrice || ''),
  ];

  return unstable_cache(
    () => fetchPaginatedPropertiesFromDb(options),
    cacheKey,
    { revalidate: 60, tags: ['properties'] }
  )();
};

/**
 * Legacy list query with limit (used by home page and widgets).
 */
export const getProperties = async (options: PropertyQueryOptions = {}) => {
  const res = await getPaginatedProperties({
    ...options,
    pageSize: options.limit || 12,
    page: 1,
  });
  return res.properties;
};

/**
 * Fetch full property details by slug for detail page view (unrestricted gallery).
 */
async function fetchPropertyBySlugFromDb(slug: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { slug },
      include: {
        area: true,
        agent: true,
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (!property) return null;

    return {
      ...property,
      price: Number(property.price),
      areaSize: Number(property.areaSize),
      lotSize: property.lotSize ? Number(property.lotSize) : null,
      latitude: property.latitude ? Number(property.latitude) : null,
      longitude: property.longitude ? Number(property.longitude) : null,
    };
  } catch (error) {
    console.error(`Error fetching property for slug "${slug}":`, error);
    return null;
  }
}

export const getPropertyBySlug = async (slug: string) => {
  return unstable_cache(
    () => fetchPropertyBySlugFromDb(slug),
    ['property-detail', slug],
    { revalidate: 60, tags: ['properties', `property-${slug}`] }
  )();
};

export async function getFeaturedProperties(limit = 3) {
  return getProperties({ limit, sortBy: 'featured' });
}

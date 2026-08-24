import prisma from '@/lib/prisma';
import { PropertyStatus, PropertyType } from '@prisma/client';

export interface PropertyQueryOptions {
  search?: string;
  propertyType?: string;
  areaSlug?: string;
  bedrooms?: number | string;
  status?: string;
  sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';
  limit?: number;
}

export async function getProperties(options: PropertyQueryOptions = {}) {
  try {
    const where: any = {};

    if (options.search) {
      where.OR = [
        { title: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
        { address: { contains: options.search, mode: 'insensitive' } },
        { area: { name: { contains: options.search, mode: 'insensitive' } } },
      ];
    }

    if (options.propertyType && options.propertyType !== 'all') {
      const typeEnum = options.propertyType.toUpperCase().replace('-', '_');
      if (Object.values(PropertyType).includes(typeEnum as any)) {
        where.propertyType = typeEnum as PropertyType;
      }
    }

    if (options.areaSlug && options.areaSlug !== 'all') {
      where.area = { slug: options.areaSlug };
    }

    if (options.status && options.status !== 'all') {
      const statusEnum = options.status.toUpperCase().replace('-', '_');
      if (Object.values(PropertyStatus).includes(statusEnum as any)) {
        where.status = statusEnum as PropertyStatus;
      }
    }

    if (options.bedrooms && options.bedrooms !== 'all') {
      const minBeds = Number(options.bedrooms);
      if (!isNaN(minBeds)) {
        where.bedrooms = { gte: minBeds };
      }
    }

    let orderBy: any = [{ isFeatured: 'desc' }, { createdAt: 'desc' }];
    if (options.sortBy === 'price-asc') orderBy = { price: 'asc' };
    if (options.sortBy === 'price-desc') orderBy = { price: 'desc' };
    if (options.sortBy === 'area-desc') orderBy = { areaSize: 'desc' };
    if (options.sortBy === 'newest') orderBy = { createdAt: 'desc' };

    const properties = await prisma.property.findMany({
      where,
      orderBy,
      take: options.limit,
      include: {
        area: true,
        agent: true,
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    return properties.map((p) => ({
      ...p,
      price: Number(p.price),
      areaSize: Number(p.areaSize),
    }));
  } catch (error) {
    console.error('Error fetching properties from database:', error);
    return [];
  }
}

export async function getPropertyBySlug(slug: string) {
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
    };
  } catch (error) {
    console.error(`Error fetching property for slug "${slug}":`, error);
    return null;
  }
}

export async function getFeaturedProperties(limit = 3) {
  return getProperties({ limit, sortBy: 'featured' });
}

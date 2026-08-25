'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { requireAuthUser } from '@/lib/auth/admin';
import { PropertyStatus, PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import { revalidatePath, updateTag } from 'next/cache';

const propertyInputSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  tagline: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  priceFormatted: z.string().optional(),
  priceSuffix: z.string().optional(),
  status: z.nativeEnum(PropertyStatus).default(PropertyStatus.FOR_SALE),
  isFeatured: z.boolean().default(false),
  propertyType: z.nativeEnum(PropertyType).default(PropertyType.HOUSE),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  areaSize: z.number().positive('Area size must be greater than 0'),
  areaUnit: z.nativeEnum(AreaUnit).default(AreaUnit.SQYD),
  yearBuilt: z.number().int().optional(),
  parkingSpaces: z.number().int().min(0).default(0),
  condition: z.nativeEnum(PropertyCondition).default(PropertyCondition.GOOD),
  address: z.string().min(3, 'Address is required'),
  areaId: z.string().min(1, 'Please select a Karachi Area'),
  amenities: z.array(z.string()).default([]),
  images: z.array(
    z.object({
      url: z.string().url('Invalid image URL'),
      alt: z.string().optional(),
      isHero: z.boolean().default(false),
      displayOrder: z.number().default(0),
    })
  ).min(1, 'At least one image is required'),
});

// Collision-free slug generator
async function generateUniqueSlug(title: string, excludePropertyId?: string): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug || 'property-listing';
  let counter = 1;

  while (true) {
    const existing = await prisma.property.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!existing || (excludePropertyId && existing.id === excludePropertyId)) {
      return slug;
    }

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

export async function createPropertyAction(rawData: any) {
  try {
    const user = await requireAuthUser();
    const validated = propertyInputSchema.parse(rawData);

    const slug = await generateUniqueSlug(validated.title);

    // Format PKR price naturally if not provided
    let formattedPrice = validated.priceFormatted;
    if (!formattedPrice) {
      if (validated.price >= 10000000) {
        formattedPrice = `PKR ${(validated.price / 10000000).toFixed(2)} Crore`;
      } else if (validated.price >= 100000) {
        formattedPrice = `PKR ${(validated.price / 100000).toFixed(2)} Lakh`;
      } else {
        formattedPrice = `PKR ${validated.price.toLocaleString()}`;
      }
    }

    const newProperty = await prisma.$transaction(async (tx) => {
      return tx.property.create({
        data: {
          slug,
          title: validated.title.trim(),
          tagline: validated.tagline?.trim(),
          description: validated.description.trim(),
          price: validated.price,
          priceFormatted: formattedPrice,
          priceSuffix: validated.priceSuffix?.trim(),
          status: validated.status,
          isFeatured: validated.isFeatured,
          propertyType: validated.propertyType,
          bedrooms: validated.bedrooms,
          bathrooms: validated.bathrooms,
          areaSize: validated.areaSize,
          areaUnit: validated.areaUnit,
          yearBuilt: validated.yearBuilt,
          parkingSpaces: validated.parkingSpaces,
          condition: validated.condition,
          address: validated.address.trim(),
          areaId: validated.areaId,
          amenities: validated.amenities,
          images: {
            create: validated.images.map((img, idx) => ({
              url: img.url,
              alt: img.alt || validated.title,
              isHero: idx === 0 || img.isHero,
              displayOrder: img.displayOrder || idx,
            })),
          },
        },
        include: {
          images: true,
          area: true,
        },
      });
    });

    revalidatePath('/properties');
    revalidatePath('/');
    revalidatePath('/admin/properties');
    revalidatePath('/admin');
    revalidatePath('/neighborhoods');
    updateTag('properties');
    updateTag('admin-properties');
    updateTag('admin-dashboard');

    return {
      success: true,
      property: newProperty,
      message: `Property "${newProperty.title}" created successfully`,
    };
  } catch (error: any) {
    console.error('Error creating property:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: error.message || 'Failed to create property listing' };
  }
}

export async function updatePropertyAction(propertyId: string, rawData: any) {
  try {
    await requireAuthUser();
    const validated = propertyInputSchema.parse(rawData);

    const existing = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!existing) {
      return { success: false, error: 'Property not found' };
    }

    // Generate unique slug only if title changed
    let slug = existing.slug;
    if (validated.title.trim() !== existing.title) {
      slug = await generateUniqueSlug(validated.title, propertyId);
    }

    // Format PKR price naturally if not provided
    let formattedPrice = validated.priceFormatted;
    if (!formattedPrice) {
      if (validated.price >= 10000000) {
        formattedPrice = `PKR ${(validated.price / 10000000).toFixed(2)} Crore`;
      } else if (validated.price >= 100000) {
        formattedPrice = `PKR ${(validated.price / 100000).toFixed(2)} Lakh`;
      } else {
        formattedPrice = `PKR ${validated.price.toLocaleString()}`;
      }
    }

    const updated = await prisma.$transaction(async (tx) => {
      // Delete old images
      await tx.propertyImage.deleteMany({
        where: { propertyId },
      });

      // Update property and recreate images
      return tx.property.update({
        where: { id: propertyId },
        data: {
          slug,
          title: validated.title.trim(),
          tagline: validated.tagline?.trim(),
          description: validated.description.trim(),
          price: validated.price,
          priceFormatted: formattedPrice,
          priceSuffix: validated.priceSuffix?.trim(),
          status: validated.status,
          isFeatured: validated.isFeatured,
          propertyType: validated.propertyType,
          bedrooms: validated.bedrooms,
          bathrooms: validated.bathrooms,
          areaSize: validated.areaSize,
          areaUnit: validated.areaUnit,
          yearBuilt: validated.yearBuilt,
          parkingSpaces: validated.parkingSpaces,
          condition: validated.condition,
          address: validated.address.trim(),
          areaId: validated.areaId,
          amenities: validated.amenities,
          images: {
            create: validated.images.map((img, idx) => ({
              url: img.url,
              alt: img.alt || validated.title,
              isHero: idx === 0 || img.isHero,
              displayOrder: img.displayOrder || idx,
            })),
          },
        },
        include: {
          images: true,
          area: true,
        },
      });
    });

    revalidatePath('/properties');
    revalidatePath(`/properties/${existing.slug}`);
    revalidatePath(`/properties/${slug}`);
    revalidatePath('/');
    revalidatePath('/admin/properties');
    revalidatePath('/admin');
    updateTag('properties');
    updateTag('admin-properties');
    updateTag('admin-dashboard');

    return {
      success: true,
      property: updated,
      message: `Property "${updated.title}" updated successfully`,
    };
  } catch (error: any) {
    console.error('Error updating property:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: error.message || 'Failed to update property listing' };
  }
}

export async function deletePropertyAction(propertyId: string) {
  try {
    await requireAuthUser();

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { slug: true, title: true },
    });

    if (!property) {
      return { success: false, error: 'Property not found' };
    }

    await prisma.property.delete({
      where: { id: propertyId },
    });

    revalidatePath('/properties');
    revalidatePath(`/properties/${property.slug}`);
    revalidatePath('/');
    revalidatePath('/admin/properties');
    revalidatePath('/admin');
    updateTag('properties');
    updateTag('admin-properties');
    updateTag('admin-dashboard');

    return { success: true, message: `Property "${property.title}" deleted successfully` };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete property' };
  }
}

export async function getAdminPropertiesAction(filters?: {
  search?: string;
  status?: string;
  propertyType?: string;
}) {
  try {
    await requireAuthUser();

    const where: any = {};
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { address: { contains: filters.search, mode: 'insensitive' } },
        { area: { name: { contains: filters.search, mode: 'insensitive' } } },
      ];
    }

    if (filters?.status && filters.status !== 'all') {
      where.status = filters.status as PropertyStatus;
    }

    if (filters?.propertyType && filters.propertyType !== 'all') {
      where.propertyType = filters.propertyType as PropertyType;
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        area: true,
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    return {
      success: true,
      data: properties.map((p) => ({
        ...p,
        price: Number(p.price),
        areaSize: Number(p.areaSize),
      })),
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

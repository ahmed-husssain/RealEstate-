'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { requireAuthUser } from '@/lib/auth/admin';
import { PropertyStatus, PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import { revalidatePath, updateTag } from 'next/cache';
import { classifyAdminError } from '@/lib/errors/admin-errors';
import { MediaService } from '@/lib/media/service';

const propertyImageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  publicId: z.string().optional().nullable(),
  alt: z.string().optional().nullable(),
  isHero: z.boolean().default(false),
  displayOrder: z.number().default(0),
});

const propertyInputSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  tagline: z.string().optional().nullable(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  priceFormatted: z.string().optional().nullable(),
  priceSuffix: z.string().optional().nullable(),
  status: z.nativeEnum(PropertyStatus).default(PropertyStatus.FOR_SALE),
  isFeatured: z.boolean().default(false),
  propertyType: z.nativeEnum(PropertyType).default(PropertyType.HOUSE),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  areaSize: z.number().positive('Area size must be greater than 0'),
  areaUnit: z.nativeEnum(AreaUnit).default(AreaUnit.SQYD),
  yearBuilt: z.number().int().optional().nullable(),
  parkingSpaces: z.number().int().min(0).default(0),
  condition: z.nativeEnum(PropertyCondition).default(PropertyCondition.GOOD),
  address: z.string().min(3, 'Address is required'),
  areaId: z.string().min(1, 'Please select a Karachi Area'),
  amenities: z.array(z.string()).default([]),
  images: z
    .array(propertyImageSchema)
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed per property'),
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
    await requireAuthUser();
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
              publicId: img.publicId || null,
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
    const classified = classifyAdminError(error, 'Failed to create property listing.');
    return { success: false, error: classified.message };
  }
}

export async function updatePropertyAction(propertyId: string, rawData: any) {
  try {
    await requireAuthUser();
    const validated = propertyInputSchema.parse(rawData);

    const existing = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { images: true },
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

    // Identify old images that were removed in the update to delete from Cloudinary
    const newPublicIds = new Set(validated.images.map((img) => img.publicId).filter(Boolean));
    const removedImages = existing.images.filter(
      (oldImg) => oldImg.publicId && !newPublicIds.has(oldImg.publicId)
    );

    const updated = await prisma.$transaction(async (tx) => {
      // Delete old images from DB
      await tx.propertyImage.deleteMany({
        where: { propertyId },
      });

      // Update property and recreate image records
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
              publicId: img.publicId || null,
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

    // Cleanup removed assets from Cloudinary in background
    if (removedImages.length > 0) {
      Promise.all(removedImages.map((img) => MediaService.deleteAsset(img.publicId))).catch((err) =>
        console.error('Background Cloudinary cleanup error:', err)
      );
    }

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
    const classified = classifyAdminError(error, 'Failed to update property listing.');
    return { success: false, error: classified.message };
  }
}

export async function deletePropertyAction(propertyId: string) {
  try {
    await requireAuthUser();

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { images: true },
    });

    if (!property) {
      return { success: false, error: 'Property not found' };
    }

    await prisma.property.delete({
      where: { id: propertyId },
    });

    // Clean up all Cloudinary assets associated with this property
    if (property.images && property.images.length > 0) {
      Promise.all(property.images.map((img) => MediaService.deleteAsset(img.publicId))).catch((err) =>
        console.error('Failed to cleanup Cloudinary assets on property delete:', err)
      );
    }

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
    console.error('Error deleting property:', error);
    const classified = classifyAdminError(error, 'Failed to delete property.');
    return { success: false, error: classified.message };
  }
}

/**
 * Direct Image Upload Server Action for Property Gallery Uploader.
 * Enforces strict max 5 images per property.
 */
export async function uploadPropertyImageDirectAction(formData: FormData) {
  try {
    await requireAuthUser();

    const file = formData.get('file') as File | null;
    if (!file) {
      return { success: false, error: 'No file was provided for upload.' };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary via MediaService
    const uploaded = await MediaService.uploadPropertyPhoto(buffer, file.type);

    return {
      success: true,
      data: {
        url: uploaded.url,
        publicId: uploaded.publicId,
        width: uploaded.width,
        height: uploaded.height,
        format: uploaded.format,
      },
    };
  } catch (error: any) {
    console.error('Error uploading property image:', error);
    const classified = classifyAdminError(error, 'Failed to upload image.');
    return { success: false, error: classified.message };
  }
}

/**
 * Direct Image Deletion Action (removes asset from Cloudinary immediately).
 */
export async function deleteUploadedImageDirectAction(publicId: string) {
  try {
    await requireAuthUser();
    if (!publicId) {
      return { success: false, error: 'Asset publicId is required.' };
    }

    await MediaService.deleteAsset(publicId);
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting asset from Cloudinary:', error);
    return { success: false, error: 'Failed to delete media asset.' };
  }
}

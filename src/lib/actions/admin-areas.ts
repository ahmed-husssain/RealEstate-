'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { requireAuthUser } from '@/lib/auth/admin';
import { revalidatePath, updateTag } from 'next/cache';
import { classifyAdminError } from '@/lib/errors/admin-errors';
import { MediaService } from '@/lib/media/service';

const areaSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  city: z.string().default('Karachi'),
  tagline: z.string().optional().nullable(),
  description: z.string().min(10, 'Description is required'),
  heroImage: z.string().url('Hero image must be a valid URL'),
  heroImagePublicId: z.string().optional().nullable(),
  avgPriceSqYd: z.string().optional().nullable(),
  annualGrowth: z.string().optional().nullable(),
  isPopular: z.boolean().default(true),
});

export async function getAdminAreasAction() {
  try {
    await requireAuthUser();

    const areas = await prisma.area.findMany({
      orderBy: [{ isPopular: 'desc' }, { name: 'asc' }],
      include: {
        _count: {
          select: { properties: true },
        },
      },
    });

    return { success: true, data: areas };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createAreaAction(rawData: any) {
  try {
    await requireAuthUser();
    const validated = areaSchema.parse(rawData);

    const baseSlug = validated.name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const area = await prisma.area.create({
      data: {
        slug: baseSlug,
        name: validated.name.trim(),
        city: validated.city.trim(),
        tagline: validated.tagline?.trim(),
        description: validated.description.trim(),
        heroImage: validated.heroImage,
        heroImagePublicId: validated.heroImagePublicId || null,
        avgPriceSqYd: validated.avgPriceSqYd || 'PKR 150,000 / Sq Yd',
        annualGrowth: validated.annualGrowth || '+12.5%',
        isPopular: validated.isPopular,
      },
    });

    revalidatePath('/neighborhoods');
    revalidatePath('/admin/areas');
    revalidatePath('/admin');
    revalidatePath('/');
    updateTag('admin-areas');
    updateTag('admin-dashboard');
    updateTag('areas');

    return { success: true, area, message: `Area "${area.name}" created successfully` };
  } catch (error: any) {
    console.error('Error creating area:', error);
    const classified = classifyAdminError(error, 'Failed to create area.');
    return { success: false, error: classified.message };
  }
}

export async function updateAreaAction(areaId: string, rawData: any) {
  try {
    await requireAuthUser();
    const validated = areaSchema.parse(rawData);

    const existing = await prisma.area.findUnique({
      where: { id: areaId },
    });

    if (!existing) {
      return { success: false, error: 'Area not found' };
    }

    const updated = await prisma.area.update({
      where: { id: areaId },
      data: {
        name: validated.name.trim(),
        city: validated.city.trim(),
        tagline: validated.tagline?.trim(),
        description: validated.description.trim(),
        heroImage: validated.heroImage,
        heroImagePublicId: validated.heroImagePublicId || existing.heroImagePublicId,
        avgPriceSqYd: validated.avgPriceSqYd,
        annualGrowth: validated.annualGrowth,
        isPopular: validated.isPopular,
      },
    });

    // If hero image changed and old image had a publicId, delete old asset from Cloudinary
    if (
      existing.heroImagePublicId &&
      validated.heroImagePublicId &&
      existing.heroImagePublicId !== validated.heroImagePublicId
    ) {
      MediaService.deleteAsset(existing.heroImagePublicId).catch((err) =>
        console.error('Failed to delete old area hero image from Cloudinary:', err)
      );
    }

    revalidatePath('/neighborhoods');
    revalidatePath(`/neighborhoods/${updated.slug}`);
    revalidatePath('/admin/areas');
    revalidatePath('/admin');
    revalidatePath('/');
    updateTag('admin-areas');
    updateTag('admin-dashboard');
    updateTag('areas');
    updateTag('properties');

    return { success: true, area: updated, message: `Area "${updated.name}" updated successfully` };
  } catch (error: any) {
    console.error('Error updating area:', error);
    const classified = classifyAdminError(error, 'Failed to update area.');
    return { success: false, error: classified.message };
  }
}

export async function deleteAreaAction(areaId: string) {
  try {
    await requireAuthUser();

    const area = await prisma.area.findUnique({
      where: { id: areaId },
      include: {
        _count: { select: { properties: true } },
      },
    });

    if (!area) {
      return { success: false, error: 'Area not found' };
    }

    if (area._count.properties > 0) {
      return {
        success: false,
        error: `Cannot delete area "${area.name}" because it still has ${area._count.properties} active property listings attached.`,
      };
    }

    await prisma.area.delete({
      where: { id: areaId },
    });

    // Cleanup hero image from Cloudinary
    if (area.heroImagePublicId) {
      MediaService.deleteAsset(area.heroImagePublicId).catch((err) =>
        console.error('Failed to delete area hero from Cloudinary:', err)
      );
    }

    revalidatePath('/neighborhoods');
    revalidatePath('/admin/areas');
    revalidatePath('/admin');
    revalidatePath('/');
    updateTag('admin-areas');
    updateTag('admin-dashboard');
    updateTag('areas');

    return { success: true, message: `Area "${area.name}" deleted` };
  } catch (error: any) {
    console.error('Error deleting area:', error);
    const classified = classifyAdminError(error, 'Failed to delete area.');
    return { success: false, error: classified.message };
  }
}

export async function uploadAreaHeroDirectAction(formData: FormData) {
  try {
    await requireAuthUser();

    const file = formData.get('file') as File | null;
    if (!file) {
      return { success: false, error: 'No file was provided for upload.' };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await MediaService.uploadAreaPhoto(buffer, file.type);

    return {
      success: true,
      data: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
    };
  } catch (error: any) {
    console.error('Error uploading area hero image:', error);
    const classified = classifyAdminError(error, 'Failed to upload area image.');
    return { success: false, error: classified.message };
  }
}

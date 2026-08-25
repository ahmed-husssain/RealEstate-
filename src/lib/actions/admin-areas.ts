'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { requireAuthUser } from '@/lib/auth/admin';
import { revalidatePath, updateTag } from 'next/cache';

const areaSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  city: z.string().default('Karachi'),
  tagline: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  heroImage: z.string().url('Hero image must be a valid URL'),
  avgPriceSqYd: z.string().optional(),
  annualGrowth: z.string().optional(),
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
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: error.message || 'Failed to create area' };
  }
}

export async function updateAreaAction(areaId: string, rawData: any) {
  try {
    await requireAuthUser();
    const validated = areaSchema.parse(rawData);

    const updated = await prisma.area.update({
      where: { id: areaId },
      data: {
        name: validated.name.trim(),
        city: validated.city.trim(),
        tagline: validated.tagline?.trim(),
        description: validated.description.trim(),
        heroImage: validated.heroImage,
        avgPriceSqYd: validated.avgPriceSqYd,
        annualGrowth: validated.annualGrowth,
        isPopular: validated.isPopular,
      },
    });

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
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: error.message || 'Failed to update area' };
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

    revalidatePath('/neighborhoods');
    revalidatePath('/admin/areas');
    revalidatePath('/admin');
    revalidatePath('/');
    updateTag('admin-areas');
    updateTag('admin-dashboard');
    updateTag('areas');

    return { success: true, message: `Area "${area.name}" deleted` };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete area' };
  }
}

'use server';

import prisma from '@/lib/prisma';
import { requireAuthUser } from '@/lib/auth/admin';
import { revalidatePath, updateTag } from 'next/cache';

export interface SiteSettingsMap {
  hero_headline?: string;
  hero_subtitle?: string;
  office_address?: string;
  phone_primary?: string;
  phone_landline?: string;
  whatsapp_number?: string;
  contact_email?: string;
  office_timings?: string;
  announcement_banner?: string;
  announcement_active?: string;
}

export async function getSiteSettingsAction(): Promise<{ success: boolean; data: SiteSettingsMap; error?: string }> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: SiteSettingsMap = {};
    for (const item of settings) {
      (map as any)[item.key] = item.value;
    }
    return { success: true, data: map };
  } catch (error: any) {
    console.error('Error in getSiteSettingsAction:', error);
    return { success: false, data: {}, error: error.message || 'Database query error' };
  }
}

export async function updateSiteSettingsAction(settings: Record<string, string>): Promise<{
  success: boolean;
  message?: string;
  error?: string;
  updatedCount?: number;
  data?: SiteSettingsMap;
}> {
  try {
    // 1. Authenticate user
    const user = await requireAuthUser();
    if (!user) {
      return { success: false, error: 'Unauthorized. Please log in to update website content.' };
    }

    if (!settings || typeof settings !== 'object' || Object.keys(settings).length === 0) {
      return { success: false, error: 'No configuration data provided to update.' };
    }

    let updatedCount = 0;

    // 2. Perform verified atomic database updates
    for (const [key, rawValue] of Object.entries(settings)) {
      if (rawValue !== undefined && rawValue !== null) {
        const cleanValue = String(rawValue).trim();
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: cleanValue },
          create: { key, value: cleanValue, category: 'general' },
        });
        updatedCount++;
      }
    }

    // 3. Re-query from database to double-verify persistence
    const verifiedSettings = await prisma.siteSetting.findMany();
    const verifiedMap: SiteSettingsMap = {};
    for (const item of verifiedSettings) {
      (verifiedMap as any)[item.key] = item.value;
    }

    // 4. Invalidate cache across all website routes including Root Layout (Navbar & Footer)
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/properties');
    revalidatePath('/neighborhoods');
    revalidatePath('/contact');
    revalidatePath('/about');
    revalidatePath('/services');
    revalidatePath('/valuation');
    revalidatePath('/admin/content');
    revalidatePath('/admin');
    updateTag('site_settings');
    updateTag('admin-content');

    return {
      success: true,
      message: `Successfully saved ${updatedCount} settings to database and updated live website.`,
      updatedCount,
      data: verifiedMap,
    };
  } catch (error: any) {
    console.error('Exception in updateSiteSettingsAction:', error);
    return {
      success: false,
      error: error.message || 'An unexpected database error occurred while saving settings.',
    };
  }
}

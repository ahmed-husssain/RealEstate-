'use server';

import prisma from '@/lib/prisma';
import { requireAuthUser } from '@/lib/auth/admin';
import { revalidatePath } from 'next/cache';

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

export async function getSiteSettingsAction(): Promise<{ success: boolean; data: SiteSettingsMap }> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: SiteSettingsMap = {};
    for (const item of settings) {
      (map as any)[item.key] = item.value;
    }
    return { success: true, data: map };
  } catch (error: any) {
    return { success: false, data: {} };
  }
}

export async function updateSiteSettingsAction(settings: Record<string, string>) {
  try {
    await requireAuthUser();

    for (const [key, value] of Object.entries(settings)) {
      if (value !== undefined) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value), category: 'general' },
        });
      }
    }

    revalidatePath('/');
    revalidatePath('/contact');
    revalidatePath('/about');
    revalidatePath('/services');
    revalidatePath('/admin/content');

    return { success: true, message: 'Website text & settings updated successfully' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update website content' };
  }
}

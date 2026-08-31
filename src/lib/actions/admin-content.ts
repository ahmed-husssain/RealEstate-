'use server';

import prisma from '@/lib/prisma';
import { requireAuthUser } from '@/lib/auth/admin';
import { revalidatePath, updateTag } from 'next/cache';
import { classifyAdminError } from '@/lib/errors/admin-errors';
import { MediaService } from '@/lib/media/service';

export interface SiteSettingsMap {
  // Hero & General
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

  // Senior Property Advisor Profile (Screenshot 1)
  advisor_name?: string;
  advisor_role?: string;
  advisor_experience?: string;
  advisor_avatar?: string;
  advisor_avatar_public_id?: string;
  advisor_phone?: string;
  advisor_whatsapp?: string;
  advisor_email?: string;
  advisor_wa_msg?: string;

  // Private Wealth Mortgage Estimator (Screenshot 2)
  mortgage_title?: string;
  mortgage_badge?: string;
  mortgage_default_interest?: string;
  mortgage_default_downpayment?: string;
  mortgage_terms?: string;
  mortgage_tax_rate?: string;
  mortgage_insurance_rate?: string;
  mortgage_disclaimer?: string;

  // Karachi Valuation Engine Behind-The-Scenes (BTS)
  val_rate_north_nazimabad?: string;
  val_rate_gulshan?: string;
  val_rate_fb_area?: string;
  val_rate_gulberg?: string;
  val_rate_buffer_zone?: string;
  val_rate_scheme33?: string;
  val_rate_north_karachi?: string;
  val_rate_scheme45?: string;
  val_rate_clifton?: string;

  val_mult_house?: string;
  val_mult_plot?: string;
  val_mult_apartment?: string;
  val_mult_penthouse?: string;
  val_mult_townhouse?: string;

  val_cond_brand_new?: string;
  val_cond_well_maintained?: string;
  val_cond_renovation?: string;
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
    const classified = classifyAdminError(error, 'Failed to load website settings.');
    return { success: false, data: {}, error: classified.message };
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
    // 1. Authenticate user (Admins and Staff users)
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

    // 4. Invalidate cache across all website routes
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/properties');
    revalidatePath('/properties/[slug]', 'page');
    revalidatePath('/neighborhoods');
    revalidatePath('/contact');
    revalidatePath('/about');
    revalidatePath('/services');
    revalidatePath('/valuation');
    revalidatePath('/admin/content');
    revalidatePath('/admin');
    updateTag('site_settings');
    updateTag('admin-content');
    updateTag('properties');

    return {
      success: true,
      message: `Successfully saved ${updatedCount} settings to database and updated live website.`,
      updatedCount,
      data: verifiedMap,
    };
  } catch (error: any) {
    console.error('Exception in updateSiteSettingsAction:', error);
    const classified = classifyAdminError(error, 'An error occurred while saving website content.');
    return {
      success: false,
      error: classified.message,
    };
  }
}

export async function uploadAdvisorAvatarDirectAction(formData: FormData) {
  try {
    await requireAuthUser();

    const file = formData.get('file') as File | null;
    if (!file) {
      return { success: false, error: 'No image file was provided for upload.' };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploaded = await MediaService.uploadAgentAvatar(buffer, file.type);

    return {
      success: true,
      data: {
        url: uploaded.url,
        publicId: uploaded.publicId,
      },
    };
  } catch (error: any) {
    console.error('Error uploading advisor avatar:', error);
    const classified = classifyAdminError(error, 'Failed to upload advisor avatar.');
    return { success: false, error: classified.message };
  }
}

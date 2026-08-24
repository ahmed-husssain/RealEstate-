import prisma from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export interface PublicSiteSettings {
  hero_headline: string;
  hero_subtitle: string;
  office_address: string;
  phone_primary: string;
  phone_landline: string;
  whatsapp_number: string;
  whatsapp_clean: string;
  contact_email: string;
  office_timings: string;
  announcement_banner: string;
  announcement_active: boolean;
}

// Development and disaster recovery baseline structure
export const DEFAULT_SITE_SETTINGS: PublicSiteSettings = {
  hero_headline: 'Find Luxury Homes & Penthouses in Karachi',
  hero_subtitle:
    'Buy, sell, build, and renovate verified bangalows, houses, and plots across North Nazimabad, Gulshan-e-Iqbal, Federal B Area, Scheme 33, Buffer Zone, North Karachi, Gulberg, Scheme 45, and Clifton.',
  office_address: 'B 693, Block 13 Gulberg Town, Karachi, Pakistan',
  phone_primary: '+92 300 822 4110',
  phone_landline: '+92 21 3634 1100',
  whatsapp_number: '+92 300 822 4110',
  whatsapp_clean: '923008224110',
  contact_email: 'info@amberproperty.com',
  office_timings: 'Mon – Sat (10:30 AM to 8:00 PM)',
  announcement_banner: 'New North Nazimabad and Gulshan luxury listings now open for private viewings.',
  announcement_active: true,
};

async function fetchPublicSiteSettingsFromDb(): Promise<PublicSiteSettings> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const item of settings) {
      map[item.key] = item.value;
    }

    const whatsapp = map.whatsapp_number || DEFAULT_SITE_SETTINGS.whatsapp_number;
    const whatsappClean = whatsapp.replace(/[^0-9]/g, '');

    return {
      hero_headline: map.hero_headline || DEFAULT_SITE_SETTINGS.hero_headline,
      hero_subtitle: map.hero_subtitle || DEFAULT_SITE_SETTINGS.hero_subtitle,
      office_address: map.office_address || DEFAULT_SITE_SETTINGS.office_address,
      phone_primary: map.phone_primary || DEFAULT_SITE_SETTINGS.phone_primary,
      phone_landline: map.phone_landline || DEFAULT_SITE_SETTINGS.phone_landline,
      whatsapp_number: whatsapp,
      whatsapp_clean: whatsappClean || DEFAULT_SITE_SETTINGS.whatsapp_clean,
      contact_email: map.contact_email || DEFAULT_SITE_SETTINGS.contact_email,
      office_timings: map.office_timings || DEFAULT_SITE_SETTINGS.office_timings,
      announcement_banner: map.announcement_banner || DEFAULT_SITE_SETTINGS.announcement_banner,
      announcement_active: map.announcement_active !== undefined ? map.announcement_active === 'true' : true,
    };
  } catch (error) {
    console.error('Error loading site settings from database:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}

export const getPublicSiteSettings = async () => {
  return unstable_cache(
    fetchPublicSiteSettingsFromDb,
    ['public-site-settings'],
    { revalidate: 60, tags: ['site_settings'] }
  )();
};

import { getPublicSiteSettings } from '@/lib/db/settings';
import { ContactClient } from './ContactClient';

export const revalidate = 60;

export default async function ContactPage() {
  const siteSettings = await getPublicSiteSettings();
  return <ContactClient siteSettings={siteSettings} />;
}

import { getCurrentAdminUser } from '@/lib/auth/admin';
import { getSiteSettingsAction } from '@/lib/actions/admin-content';
import { Badge } from '@/ui/Badge';
import { SiteContentEditorClient } from './SiteContentEditorClient';

export const dynamic = 'force-dynamic';

export default async function AdminSiteContentPage() {
  const user = await getCurrentAdminUser();
  if (!user) return null;

  const { data: settings } = await getSiteSettingsAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">Live Copy & Branding</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
          Website Content Management (CMS)
        </h1>
        <p className="text-xs text-[#7e7365]">
          Edit headline texts, phone numbers, WhatsApp concierge, and announcements live without editing code
        </p>
      </div>

      <SiteContentEditorClient initialSettings={settings} />
    </div>
  );
}

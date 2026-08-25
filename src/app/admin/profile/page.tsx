import { requireAuthUserPage } from '@/lib/auth/admin';
import { Badge } from '@/ui/Badge';
import { ProfileSettingsClient } from './ProfileSettingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminProfilePage() {
  const user = await requireAuthUserPage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">Security & Credentials</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
          My Profile & Password Settings
        </h1>
        <p className="text-xs text-[#7e7365]">
          Manage your personal account details, change login password, and verify credentials
        </p>
      </div>

      <ProfileSettingsClient user={user} />
    </div>
  );
}

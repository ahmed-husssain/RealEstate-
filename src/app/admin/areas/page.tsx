import { getCurrentAdminUser } from '@/lib/auth/admin';
import { getAdminAreasAction } from '@/lib/actions/admin-areas';
import { Badge } from '@/ui/Badge';
import { AreasManagerClient } from './AreasManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminAreasPage() {
  const user = await getCurrentAdminUser();
  if (!user) return null;

  const { data: areas } = await getAdminAreasAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">Karachi Enclaves</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
          Karachi Area Guides & Market Rates
        </h1>
        <p className="text-xs text-[#7e7365]">
          Manage average square yard rates, annual appreciation data, and guide summaries
        </p>
      </div>

      <AreasManagerClient initialAreas={areas || []} />
    </div>
  );
}

import { getCurrentAdminUser } from '@/lib/auth/admin';
import { getTeamUsersAction } from '@/lib/actions/admin-users';
import { Badge } from '@/ui/Badge';
import { UsersManagerClient } from './UsersManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const currentUser = await getCurrentAdminUser();
  if (!currentUser || currentUser.role !== 'ADMIN') return null;
  const { data: users } = await getTeamUsersAction();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">Super Admin Only</Badge>
          <span className="text-xs font-mono text-[#7e7365]">
            {users?.length || 0} Authorized Accounts
          </span>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
          Team Users & Administrators
        </h1>
        <p className="text-xs text-[#7e7365]">
          Manage authorized staff accounts, assign roles (ADMIN / USER), reset passwords, and suspend access
        </p>
      </div>

      <UsersManagerClient users={users || []} currentUserId={currentUser.id} />
    </div>
  );
}

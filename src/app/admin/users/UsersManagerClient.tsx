'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { AdminRole } from '@prisma/client';
import {
  createTeamUserAction,
  toggleUserActiveAction,
  resetUserPasswordAction,
  deleteTeamUserAction,
} from '@/lib/actions/admin-users';
import {
  UserPlus,
  ShieldCheck,
  User,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Trash2,
  Power,
  X,
} from 'lucide-react';

interface TeamUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
}

export function UsersManagerClient({
  users,
  currentUserId,
}: {
  users: TeamUser[];
  currentUserId: string;
}) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [resettingUserId, setResettingUserId] = useState<string | null>(null);

  // New User Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<AdminRole>(AdminRole.USER);

  // Reset Password State
  const [resetPasswordValue, setResetPasswordValue] = useState('');

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await createTeamUserAction({
        name: newName,
        email: newEmail,
        password: newPassword,
        role: newRole,
      });

      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message || 'User created successfully' });
        setIsCreating(false);
        setNewName('');
        setNewEmail('');
        setNewPassword('');
        router.refresh();
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to create user' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (userId: string) => {
    setLoading(true);
    try {
      const res = await toggleUserActiveAction(userId);
      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message || 'Status updated' });
        router.refresh();
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to toggle status' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingUserId) return;
    setLoading(true);

    try {
      const res = await resetUserPasswordAction(resettingUserId, resetPasswordValue);
      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message || 'Password reset successfully' });
        setResettingUserId(null);
        setResetPasswordValue('');
        router.refresh();
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to reset password' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete access for "${name}"?`)) {
      setLoading(true);
      try {
        const res = await deleteTeamUserAction(userId);
        if (res.success) {
          setStatusMsg({ type: 'success', text: res.message || 'User deleted' });
          router.refresh();
        } else {
          setStatusMsg({ type: 'error', text: res.error || 'Failed to delete user' });
        }
      } catch (err: any) {
        setStatusMsg({ type: 'error', text: err.message });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="primary" size="md" onClick={() => setIsCreating(true)} className="text-xs">
          <UserPlus className="w-4 h-4" />
          <span>Authorize New Team Member</span>
        </Button>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Create User Modal */}
      {isCreating && (
        <GlassCard variant="container" rounded="2rem" className="p-6 bg-white border border-[#5c3822]/40 shadow-xl space-y-4 max-w-xl mx-auto">
          <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              Create Authorized Team Account
            </h2>
            <button onClick={() => setIsCreating(false)} className="p-1 rounded-full hover:bg-stone-100">
              <X className="w-5 h-5 text-[#7e7365]" />
            </button>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Tariq Mehmood (Senior Property Advisor)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />

            <Input
              label="Staff Email (Login ID)"
              type="email"
              placeholder="tariq@amberproperty.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />

            <Input
              label="Temporary / Initial Password"
              type="password"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
                Access Role & Permissions
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as AdminRole)}
                className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none"
              >
                <option value={AdminRole.USER}>
                  USER (Staff / Real Estate Advisor) – Listings & Leads
                </option>
                <option value={AdminRole.ADMIN}>
                  ADMIN (Partner / Director) – Full System & User Management
                </option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={loading}>
                <span>Create Account</span>
              </Button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Reset Password Modal */}
      {resettingUserId && (
        <GlassCard variant="container" rounded="2rem" className="p-6 bg-white border border-[#5c3822]/40 shadow-xl space-y-4 max-w-md mx-auto">
          <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              Reset User Password
            </h2>
            <button onClick={() => setResettingUserId(null)} className="p-1 rounded-full hover:bg-stone-100">
              <X className="w-5 h-5 text-[#7e7365]" />
            </button>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="Minimum 6 characters"
              value={resetPasswordValue}
              onChange={(e) => setResetPasswordValue(e.target.value)}
              required
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setResettingUserId(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={loading}>
                <span>Save New Password</span>
              </Button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Users Table */}
      <GlassCard variant="container" rounded="2rem" className="overflow-hidden bg-[#fbf6f0]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f5efe6] border-b border-[#d8cebe] text-[#7e7365] uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Login</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d8cebe]/60 font-sans">
              {users.map((u) => {
                const isSelf = u.id === currentUserId;

                return (
                  <tr key={u.id} className="hover:bg-white/60 transition-colors">
                    <td className="p-4 font-medium text-[#1F1B16]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#5c3822]/15 text-[#5c3822] flex items-center justify-center font-bold text-xs">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <span>{u.name}</span>
                          {isSelf && (
                            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#5c3822]/10 text-[#5c3822] text-[10px] font-mono">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono text-[#7e7365]">{u.email}</td>

                    <td className="p-4">
                      <Badge variant={u.role === 'ADMIN' ? 'exclusive' : 'stone'} size="sm">
                        {u.role}
                      </Badge>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                          u.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {u.isActive ? 'ACTIVE' : 'SUSPENDED'}
                      </span>
                    </td>

                    <td className="p-4 font-mono text-[11px] text-[#7e7365]">
                      {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <button
                          type="button"
                          onClick={() => setResettingUserId(u.id)}
                          className="p-1.5 text-[#1F1B16] hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                          title="Reset user password"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>

                        {!isSelf && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleToggleActive(u.id)}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                u.isActive
                                  ? 'text-amber-700 hover:bg-amber-100'
                                  : 'text-green-700 hover:bg-green-100'
                              }`}
                              title={u.isActive ? 'Suspend access' : 'Activate access'}
                            >
                              <Power className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                              title="Delete user account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Badge } from '@/ui/Badge';
import { updateMyPasswordAction, updateMyProfileAction } from '@/lib/actions/admin-auth';
import { KeyRound, User, CheckCircle2, AlertCircle, Shield } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function ProfileSettingsClient({ user }: { user: UserProfile }) {
  // Name Profile State
  const [name, setName] = useState(user.name);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileStatus, setProfileStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileStatus(null);

    try {
      const res = await updateMyProfileAction({ name });
      if (res.success) {
        setProfileStatus({ type: 'success', text: res.message || 'Profile updated' });
      } else {
        setProfileStatus({ type: 'error', text: res.error || 'Failed to update' });
      }
    } catch (err: any) {
      setProfileStatus({ type: 'error', text: err.message });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordStatus(null);

    try {
      const res = await updateMyPasswordAction({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (res.success) {
        setPasswordStatus({ type: 'success', text: res.message || 'Password changed successfully' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordStatus({ type: 'error', text: res.error || 'Failed to update password' });
      }
    } catch (err: any) {
      setPasswordStatus({ type: 'error', text: err.message });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* 1. Account Details */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-5 bg-[#fbf6f0]">
        <div className="flex items-center gap-2 text-[#5c3822]">
          <User className="w-4 h-4" />
          <h2 className="font-display font-medium text-lg text-[#1F1B16]">
            Personal Profile & Identity
          </h2>
        </div>

        {profileStatus && (
          <div
            className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
              profileStatus.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {profileStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{profileStatus.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <Input
            label="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="space-y-1">
            <label className="block text-xs font-mono font-medium text-[#7e7365]">
              Login Email (Immutable)
            </label>
            <input
              type="text"
              disabled
              value={user.email}
              className="w-full bg-[#e5decb]/40 text-[#7e7365] border border-[#d8cebe] rounded-full px-4 py-2 text-xs font-mono cursor-not-allowed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#7e7365]">Role:</span>
              <Badge variant={user.role === 'ADMIN' ? 'exclusive' : 'stone'} size="sm">
                {user.role}
              </Badge>
            </div>
            <Button type="submit" variant="primary" size="sm" isLoading={profileLoading} disabled={profileLoading}>
              <span>{profileLoading ? 'Saving Name...' : 'Save Name'}</span>
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* 2. Password Change */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-5 bg-[#fbf6f0]">
        <div className="flex items-center gap-2 text-[#5c3822]">
          <KeyRound className="w-4 h-4" />
          <h2 className="font-display font-medium text-lg text-[#1F1B16]">
            Change Your Password
          </h2>
        </div>

        {passwordStatus && (
          <div
            className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2 ${
              passwordStatus.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {passwordStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{passwordStatus.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Minimum 6 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Repeat new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="md" isLoading={passwordLoading} disabled={passwordLoading}>
              <span>{passwordLoading ? 'Updating Password...' : 'Update Password'}</span>
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

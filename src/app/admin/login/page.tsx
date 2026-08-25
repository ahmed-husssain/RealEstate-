'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { loginAdminAction } from '@/lib/actions/admin-auth';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginAdminAction({ email, password });
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(res.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <BrandLogo href="" imageClassName="h-10" />
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#5c3822]" />
            <Badge variant="exclusive" size="sm">Private Management Portal</Badge>
          </div>
          <p className="text-xs text-[#7e7365]">
            Authorized Staff & Management Access Only
          </p>
        </div>

        {/* Login Card */}
        <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 bg-[#fbf6f0] shadow-2xl border border-[#d8cebe]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-[#7e7365]">
                Staff Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-[#7e7365] pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="admin@amberproperty.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-[#7e7365]">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-[#7e7365] pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full pl-10 pr-11 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 flex items-center justify-center p-1 text-[#7e7365] hover:text-[#1F1B16] transition-colors rounded-full focus:outline-none focus:ring-1 focus:ring-[#5c3822]/30 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-xs sm:text-sm"
                isLoading={loading}
              >
                <span>Enter Admin Panel</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </GlassCard>

        {/* Security Notice */}
        <p className="text-center text-[11px] font-mono text-[#7e7365]">
          Strictly confidential. Unauthorized access attempts are monitored and logged.
        </p>
      </div>
    </div>
  );
}

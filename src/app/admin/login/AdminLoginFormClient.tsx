'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { loginAdminAction } from '@/lib/actions/admin-auth';

interface AdminLoginFormClientProps {
  isLoggedOut?: boolean;
}

export function AdminLoginFormClient({ isLoggedOut = false }: AdminLoginFormClientProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showLoggedOutAlert, setShowLoggedOutAlert] = useState(isLoggedOut);

  const validateEmail = (val: string): boolean => {
    const trimmed = val.trim();
    if (!trimmed) {
      setEmailError('Email address is required.');
      return false;
    }
    if (trimmed.length > 150) {
      setEmailError('Email address cannot exceed 150 characters.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (val: string): boolean => {
    if (!val) {
      setPasswordError('Password is required.');
      return false;
    }
    if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return false;
    }
    if (val.length > 62) {
      setPasswordError('Password cannot exceed 62 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    setShowLoggedOutAlert(false);

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

    try {
      const res = await loginAdminAction({
        email: email.trim(),
        password,
      });

      if (res.success) {
        window.location.replace('/admin');
      } else {
        setGeneralError(res.error || 'Invalid email or password.');
      }
    } catch (err: any) {
      setGeneralError(err?.message || 'Unable to connect to the authentication server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center p-4 sm:p-6 text-[#1F1B16]">
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

        {/* Logged Out Notice */}
        {showLoggedOutAlert && (
          <div
            role="status"
            className="p-3.5 rounded-2xl bg-[#efebe4] border border-[#d8cebe] text-xs text-[#5c3822] flex items-start gap-2.5 shadow-sm animate-in fade-in duration-200"
          >
            <CheckCircle2 className="w-4 h-4 text-[#5c3822] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              You have been signed out. Please sign in again to access the admin portal.
            </p>
          </div>
        )}

        {/* Login Card */}
        <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 bg-[#fbf6f0] shadow-2xl border border-[#d8cebe]">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-[#7e7365]">
                Staff Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-[#7e7365] pointer-events-none" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  disabled={loading}
                  placeholder="admin@amberproperty.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) validateEmail(e.target.value);
                  }}
                  onBlur={(e) => validateEmail(e.target.value)}
                  className={`w-full bg-white text-[#1F1B16] border rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none transition-colors shadow-inner disabled:opacity-60 disabled:cursor-not-allowed ${
                    emailError ? 'border-red-400 focus:border-red-600' : 'border-[#d8cebe] focus:border-[#5c3822]'
                  }`}
                />
              </div>
              {emailError && (
                <p className="text-[11px] text-red-600 pl-3 pt-0.5">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-[#7e7365]">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-[#7e7365] pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  className={`w-full bg-white text-[#1F1B16] border rounded-full pl-10 pr-11 py-2.5 text-xs sm:text-sm outline-none transition-colors shadow-inner disabled:opacity-60 disabled:cursor-not-allowed ${
                    passwordError ? 'border-red-400 focus:border-red-600' : 'border-[#d8cebe] focus:border-[#5c3822]'
                  }`}
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 flex items-center justify-center p-1 text-[#7e7365] hover:text-[#1F1B16] transition-colors rounded-full focus:outline-none focus:ring-1 focus:ring-[#5c3822]/30 cursor-pointer disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-[11px] text-red-600 pl-3 pt-0.5">{passwordError}</p>
              )}
            </div>

            {/* General Server / Auth Error Alert */}
            {generalError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{generalError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-xs sm:text-sm shadow-md"
                isLoading={loading}
                disabled={loading}
              >
                <span>{loading ? 'Signing in...' : 'Enter Admin Panel'}</span>
                {!loading && <ArrowRight className="w-4 h-4" />}
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

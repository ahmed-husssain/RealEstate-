'use client';

import React, { useEffect } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { AlertCircle, RotateCcw, ArrowLeft, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error details to browser console for developer inspection
    console.error('Admin Dashboard Error Boundary caught error:', error);
  }, [error]);

  const isUnauthorized =
    error.message?.toLowerCase().includes('unauthorized') ||
    error.message?.toLowerCase().includes('forbidden') ||
    error.message?.toLowerCase().includes('session');

  const userMessage = isUnauthorized
    ? 'Your administrative session has expired or you do not have permission to view this section. Please log in again.'
    : 'Unable to load data from the database server. Please verify your connection and try again.';

  return (
    <div className="py-12 flex items-center justify-center">
      <GlassCard
        variant="card"
        rounded="2rem"
        className="max-w-lg w-full p-6 sm:p-8 bg-[#fbf6f0] border border-red-200 shadow-xl space-y-6 text-center"
      >
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <Badge variant="exclusive" size="sm" className="bg-red-50 text-red-800 border-red-200">
              System Notice
            </Badge>
          </div>
          <h2 className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16]">
            {isUnauthorized ? 'Session Verification Required' : 'Database Access Issue'}
          </h2>
          <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
            {userMessage}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {isUnauthorized ? (
            <Link href="/admin/login" className="w-full sm:w-auto">
              <Button variant="primary" size="md" className="w-full text-xs">
                <LogIn className="w-4 h-4" />
                <span>Go to Admin Login</span>
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="md" onClick={() => reset()} className="w-full sm:w-auto text-xs">
              <RotateCcw className="w-4 h-4" />
              <span>Retry Operation</span>
            </Button>
          )}

          <Link href="/admin" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full text-xs">
              <ArrowLeft className="w-4 h-4" />
              <span>Dashboard Home</span>
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

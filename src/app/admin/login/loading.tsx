import React from 'react';
import { GlassCard } from '@/ui/GlassCard';

export default function AdminLoginLoading() {
  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center p-4 sm:p-6 animate-pulse">
      <div className="w-full max-w-md space-y-6">
        {/* Header Skeleton */}
        <div className="text-center space-y-2 flex flex-col items-center">
          <div className="h-10 w-36 bg-[#e5decb] rounded-xl mb-2" />
          <div className="h-5 w-48 bg-[#e5decb] rounded-full" />
          <div className="h-3 w-56 bg-[#e5decb] rounded" />
        </div>

        {/* Card Skeleton */}
        <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 bg-[#fbf6f0] shadow-2xl border border-[#d8cebe] space-y-4">
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-[#e5decb] rounded" />
            <div className="h-10 w-full bg-[#e5decb] rounded-full" />
          </div>

          <div className="space-y-1.5">
            <div className="h-3 w-20 bg-[#e5decb] rounded" />
            <div className="h-10 w-full bg-[#e5decb] rounded-full" />
          </div>

          <div className="pt-2">
            <div className="h-11 w-full bg-[#e5decb] rounded-full" />
          </div>
        </GlassCard>

        {/* Notice Skeleton */}
        <div className="h-3 w-64 bg-[#e5decb] rounded mx-auto" />
      </div>
    </div>
  );
}

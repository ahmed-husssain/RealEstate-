import React from 'react';
import { GlassCard } from '@/ui/GlassCard';

export default function AdminUsersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-28 bg-[#e5decb] rounded-full" />
          <div className="h-4 w-28 bg-[#e5decb] rounded" />
        </div>
        <div className="h-8 w-64 bg-[#e5decb] rounded-xl" />
        <div className="h-4 w-96 bg-[#e5decb] rounded" />
      </div>

      {/* Button Skeleton */}
      <div className="flex justify-end">
        <div className="h-9 w-44 bg-[#e5decb] rounded-full" />
      </div>

      {/* Table Skeleton */}
      <GlassCard variant="container" rounded="2rem" className="overflow-hidden bg-[#fbf6f0] p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-[#d8cebe]/40 last:border-0">
            <div className="space-y-1.5">
              <div className="h-4 w-44 bg-[#e5decb] rounded" />
              <div className="h-3 w-32 bg-[#e5decb] rounded" />
            </div>
            <div className="h-6 w-16 bg-[#e5decb] rounded-full" />
            <div className="h-6 w-16 bg-[#e5decb] rounded-full" />
            <div className="flex gap-2">
              <div className="h-7 w-24 bg-[#e5decb] rounded-full" />
              <div className="h-7 w-16 bg-[#e5decb] rounded-full" />
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

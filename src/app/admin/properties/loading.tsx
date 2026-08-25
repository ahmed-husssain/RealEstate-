import React from 'react';
import { GlassCard } from '@/ui/GlassCard';

export default function AdminPropertiesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8cebe]/60 pb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-32 bg-[#e5decb] rounded-full" />
            <div className="h-4 w-20 bg-[#e5decb] rounded" />
          </div>
          <div className="h-8 w-56 bg-[#e5decb] rounded-xl" />
          <div className="h-4 w-72 bg-[#e5decb] rounded" />
        </div>
        <div className="h-9 w-36 bg-[#e5decb] rounded-full" />
      </div>

      {/* Table Skeleton */}
      <GlassCard variant="container" rounded="2rem" className="overflow-hidden bg-[#fbf6f0] p-6 space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-[#d8cebe]/40 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-10 rounded-xl bg-[#e5decb] shrink-0" />
              <div className="space-y-1.5">
                <div className="h-4 w-48 bg-[#e5decb] rounded" />
                <div className="h-3 w-32 bg-[#e5decb] rounded" />
              </div>
            </div>
            <div className="hidden sm:block space-y-1">
              <div className="h-4 w-24 bg-[#e5decb] rounded" />
              <div className="h-3 w-36 bg-[#e5decb] rounded" />
            </div>
            <div className="h-4 w-20 bg-[#e5decb] rounded font-mono" />
            <div className="h-6 w-16 bg-[#e5decb] rounded-full" />
            <div className="flex gap-2">
              <div className="h-7 w-12 bg-[#e5decb] rounded-full" />
              <div className="h-7 w-12 bg-[#e5decb] rounded-full" />
            </div>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

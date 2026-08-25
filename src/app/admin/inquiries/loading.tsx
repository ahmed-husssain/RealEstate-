import React from 'react';
import { GlassCard } from '@/ui/GlassCard';

export default function AdminInquiriesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 bg-[#e5decb] rounded-full" />
          <div className="h-4 w-28 bg-[#e5decb] rounded" />
        </div>
        <div className="h-8 w-72 bg-[#e5decb] rounded-xl" />
        <div className="h-4 w-80 bg-[#e5decb] rounded" />
      </div>

      {/* List Skeletons */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i} variant="card" rounded="1.75rem" className="p-5 bg-[#fbf6f0] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-36 bg-[#e5decb] rounded" />
                  <div className="h-5 w-16 bg-[#e5decb] rounded-full" />
                  <div className="h-4 w-24 bg-[#e5decb] rounded" />
                </div>
                <div className="h-3.5 w-64 bg-[#e5decb] rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-28 bg-[#e5decb] rounded-full" />
                <div className="h-8 w-8 bg-[#e5decb] rounded-full" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

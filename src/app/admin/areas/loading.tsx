import React from 'react';
import { GlassCard } from '@/ui/GlassCard';

export default function AdminAreasLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2 border-b border-[#d8cebe]/60 pb-4">
        <div className="h-5 w-28 bg-[#e5decb] rounded-full" />
        <div className="h-8 w-72 bg-[#e5decb] rounded-xl" />
        <div className="h-4 w-96 bg-[#e5decb] rounded" />
      </div>

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <GlassCard key={i} variant="card" rounded="1.75rem" className="p-5 bg-[#fbf6f0] space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-5 w-32 bg-[#e5decb] rounded" />
                <div className="h-3 w-20 bg-[#e5decb] rounded" />
              </div>
              <div className="h-6 w-16 bg-[#e5decb] rounded-full" />
            </div>
            <div className="h-10 w-full bg-[#e5decb] rounded-xl" />
            <div className="flex justify-end gap-2 pt-2 border-t border-[#d8cebe]/40">
              <div className="h-7 w-14 bg-[#e5decb] rounded-full" />
              <div className="h-7 w-14 bg-[#e5decb] rounded-full" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

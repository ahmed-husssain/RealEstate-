import React from 'react';
import { GlassCard } from '@/ui/GlassCard';

export default function AdminContentLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2 border-b border-[#d8cebe]/60 pb-4">
        <div className="h-5 w-32 bg-[#e5decb] rounded-full" />
        <div className="h-8 w-80 bg-[#e5decb] rounded-xl" />
        <div className="h-4 w-96 bg-[#e5decb] rounded" />
      </div>

      {/* Forms Skeletons */}
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] space-y-4">
            <div className="h-5 w-48 bg-[#e5decb] rounded" />
            <div className="space-y-3">
              <div className="h-10 w-full bg-[#e5decb] rounded-full" />
              <div className="h-20 w-full bg-[#e5decb] rounded-2xl" />
            </div>
            <div className="flex justify-end pt-2">
              <div className="h-9 w-32 bg-[#e5decb] rounded-full" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

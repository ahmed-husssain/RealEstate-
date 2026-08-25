import React from 'react';
import { GlassCard } from '@/ui/GlassCard';

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Welcome Banner Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-24 bg-[#e5decb] rounded-full" />
            <div className="h-4 w-16 bg-[#e5decb] rounded" />
          </div>
          <div className="h-8 w-64 bg-[#e5decb] rounded-xl" />
          <div className="h-4 w-80 bg-[#e5decb] rounded" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-9 w-36 bg-[#e5decb] rounded-full" />
          <div className="h-9 w-32 bg-[#e5decb] rounded-full" />
        </div>
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i} variant="card" rounded="1.75rem" className="p-5 bg-[#fbf6f0] space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 w-16 bg-[#e5decb] rounded" />
              <div className="w-8 h-8 rounded-lg bg-[#e5decb]" />
            </div>
            <div className="h-8 w-14 bg-[#e5decb] rounded-lg" />
            <div className="h-3 w-28 bg-[#e5decb] rounded" />
          </GlassCard>
        ))}
      </div>

      {/* Recent Inquiries Table Skeleton */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-5 bg-[#fbf6f0]">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="h-5 w-52 bg-[#e5decb] rounded" />
            <div className="h-3 w-72 bg-[#e5decb] rounded" />
          </div>
          <div className="h-8 w-28 bg-[#e5decb] rounded-full" />
        </div>

        <div className="divide-y divide-[#d8cebe]/60">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-32 bg-[#e5decb] rounded" />
                  <div className="h-4 w-12 bg-[#e5decb] rounded-full" />
                  <div className="h-3 w-16 bg-[#e5decb] rounded" />
                </div>
                <div className="h-3 w-64 bg-[#e5decb] rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-7 w-24 bg-[#e5decb] rounded-full" />
                <div className="h-7 w-8 bg-[#e5decb] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

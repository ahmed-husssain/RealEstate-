import React from 'react';

export default function NeighborhoodsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2 max-w-xl">
        <div className="flex gap-2">
          <div className="h-6 w-28 bg-[#d8cebe]/60 rounded-full" />
          <div className="h-6 w-36 bg-[#d8cebe]/40 rounded-full" />
        </div>
        <div className="h-10 w-96 bg-[#d8cebe]/70 rounded-2xl" />
        <div className="h-4 w-80 bg-[#d8cebe]/50 rounded-xl" />
      </div>

      {/* Grid of Neighborhood Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="rounded-[2rem] bg-[#fbf6f0] border border-[#d8cebe]/70 overflow-hidden shadow-sm space-y-4"
          >
            <div className="aspect-[16/9] w-full bg-[#d8cebe]/50" />
            <div className="p-6 space-y-3">
              <div className="h-6 w-1/2 bg-[#d8cebe]/70 rounded-lg" />
              <div className="h-4 w-full bg-[#d8cebe]/40 rounded-lg" />
              <div className="h-12 w-full bg-[#d8cebe]/30 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

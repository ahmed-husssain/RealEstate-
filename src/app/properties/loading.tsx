import React from 'react';

export default function PropertiesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-pulse">
      {/* Header Banner */}
      <div className="space-y-2 max-w-xl">
        <div className="flex gap-2">
          <div className="h-6 w-28 bg-[#d8cebe]/60 rounded-full" />
          <div className="h-6 w-36 bg-[#d8cebe]/40 rounded-full" />
        </div>
        <div className="h-10 w-80 bg-[#d8cebe]/70 rounded-2xl" />
        <div className="h-4 w-96 bg-[#d8cebe]/50 rounded-xl" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="h-16 w-full rounded-[2rem] bg-[#fbf6f0] border border-[#d8cebe]/60" />

      {/* Grid of Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-[2rem] bg-[#fbf6f0] border border-[#d8cebe]/70 overflow-hidden p-4 space-y-4 shadow-sm"
          >
            <div className="aspect-[4/3] w-full bg-[#d8cebe]/50 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-[#d8cebe]/70 rounded-lg" />
              <div className="h-4 w-1/2 bg-[#d8cebe]/50 rounded-lg" />
            </div>
            <div className="h-10 w-full bg-[#d8cebe]/40 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

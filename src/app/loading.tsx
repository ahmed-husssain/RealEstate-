import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-3 max-w-xl">
        <div className="h-6 w-32 bg-[#d8cebe]/60 rounded-full" />
        <div className="h-10 w-3/4 bg-[#d8cebe]/70 rounded-2xl" />
        <div className="h-4 w-full bg-[#d8cebe]/50 rounded-xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-[2rem] bg-[#fbf6f0] border border-[#d8cebe]/60 overflow-hidden space-y-4 p-4"
          >
            <div className="aspect-[4/3] w-full bg-[#d8cebe]/50 rounded-2xl" />
            <div className="space-y-2 pt-1">
              <div className="h-5 w-2/3 bg-[#d8cebe]/60 rounded-lg" />
              <div className="h-3 w-1/2 bg-[#d8cebe]/40 rounded-lg" />
            </div>
            <div className="h-8 w-full bg-[#d8cebe]/40 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

export default function PropertyDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-36 bg-[#d8cebe]/60 rounded-full" />

      {/* Title & Price Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-6 border-b border-[#d8cebe]/60">
        <div className="space-y-2">
          <div className="h-6 w-32 bg-[#d8cebe]/60 rounded-full" />
          <div className="h-10 w-96 bg-[#d8cebe]/70 rounded-2xl" />
          <div className="h-4 w-60 bg-[#d8cebe]/40 rounded-lg" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-[#d8cebe]/40 rounded-lg" />
          <div className="h-9 w-48 bg-[#d8cebe]/70 rounded-xl" />
        </div>
      </div>

      {/* Hero Gallery Skeleton */}
      <div className="aspect-[21/9] w-full rounded-[2rem] bg-[#d8cebe]/50 border border-[#d8cebe]/70 shadow-md" />

      {/* Specs Ribbon Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-20 bg-[#fbf6f0] border border-[#d8cebe]/70 rounded-2xl" />
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="h-6 w-48 bg-[#d8cebe]/70 rounded-lg" />
          <div className="h-28 bg-[#fbf6f0] border border-[#d8cebe]/50 rounded-2xl" />
        </div>
        <div className="lg:col-span-4">
          <div className="h-72 bg-[#fbf6f0] border border-[#d8cebe]/70 rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}

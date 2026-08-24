'use client';

import React from 'react';

export function GuideRails() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Left guide rail */}
      <div className="hidden lg:block absolute left-4 sm:left-6 lg:left-8 top-0 bottom-0 w-px bg-[#d8cebe]/40" />
      
      {/* Right guide rail */}
      <div className="hidden lg:block absolute right-4 sm:right-6 lg:right-8 top-0 bottom-0 w-px bg-[#d8cebe]/40" />
    </div>
  );
}

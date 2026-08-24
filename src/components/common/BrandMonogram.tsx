'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface BrandMonogramProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'whatsapp' | 'circle';
  alt?: string;
}

export function BrandMonogram({
  className,
  size = 'md',
  variant = 'gold',
  alt = 'Amber Property Corner',
}: BrandMonogramProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const imageSrc = variant === 'whatsapp'
    ? '/amber-property-corner-whatsapp.png'
    : '/amber-property-corner-favicon.png';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden',
        sizeClasses[size],
        variant === 'circle' && 'rounded-full bg-[#fbf6f0] border border-[#d8cebe] p-1.5 shadow-sm',
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="64px"
        className="object-contain"
      />
    </div>
  );
}

export default BrandMonogram;

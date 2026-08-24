'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'default' | 'on-dark' | 'compact';
  priority?: boolean;
  href?: string;
}

export function BrandLogo({
  className,
  imageClassName,
  variant = 'default',
  priority = true,
  href = '/',
}: BrandLogoProps) {
  const content = (
    <div
      className={cn(
        'relative inline-flex items-center transition-opacity hover:opacity-95',
        variant === 'on-dark' && 'bg-[#fbf6f0] px-3 py-1.5 rounded-2xl border border-[#d8cebe]/50 shadow-md',
        className
      )}
    >
      <div className={cn(
        'relative h-8 sm:h-10 w-auto aspect-[551/183]',
        variant === 'compact' && 'h-7 sm:h-8',
        imageClassName
      )}>
        <Image
          src="/amber-property-corner-logo.png"
          alt="Amber Property Corner"
          fill
          priority={priority}
          sizes="(max-width: 640px) 150px, 220px"
          className="object-contain"
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center cursor-pointer select-none" aria-label="Amber Property Corner Home">
        {content}
      </Link>
    );
  }

  return content;
}

export default BrandLogo;

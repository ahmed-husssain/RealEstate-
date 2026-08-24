import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'exclusive' | 'moss' | 'mahogany' | 'stone';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-[11px]',
  };

  const variantClasses = {
    default:
      'bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] shadow-sm',
    exclusive:
      'bg-[#5c3822] text-[#F8F4ED] border border-[#5c3822]/40 shadow-inset-highlight',
    moss:
      'bg-[#2e3a2f] text-[#F8F4ED] border border-[#2e3a2f]/40 shadow-inset-highlight',
    mahogany:
      'bg-[#5c3822]/15 text-[#5c3822] border border-[#5c3822]/30',
    stone:
      'bg-[#D8CEBE]/40 text-[#1F1B16] border border-[#d8cebe]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-semibold uppercase tracking-[0.18em] rounded-full select-none transition-colors',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

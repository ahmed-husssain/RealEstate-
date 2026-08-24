import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'container' | 'dark' | 'interactive';
  rounded?: '2rem' | '1.75rem' | 'xl' | '2xl' | '3xl';
}

export function GlassCard({
  className,
  variant = 'card',
  rounded = '1.75rem',
  children,
  ...props
}: GlassCardProps) {
  const roundedClasses = {
    '2rem': 'rounded-[2rem]',
    '1.75rem': 'rounded-[1.75rem]',
    'xl': 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const variantClasses = {
    card:
      'bg-gradient-to-br from-[#fbf6f0]/95 to-[#f5efe6]/90 backdrop-blur-xl border border-[#d8cebe] shadow-stratified',
    container:
      'bg-gradient-to-br from-[#fbf6f0]/80 to-[#f5efe6]/70 backdrop-blur-2xl border border-[#d8cebe]/80 shadow-stratified',
    dark:
      'bg-gradient-to-br from-[#24201a] to-[#1a1713] text-[#F8F4ED] border border-[#6E7A67]/40 shadow-2xl',
    interactive:
      'bg-gradient-to-br from-[#fbf6f0]/95 to-[#f5efe6]/90 backdrop-blur-xl border border-[#d8cebe] shadow-stratified hover:shadow-stratified-hover hover:border-[#847666]/50 transition-all duration-300 cursor-pointer',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        roundedClasses[rounded],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {/* Tactile 1px top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
      {children}
    </div>
  );
}

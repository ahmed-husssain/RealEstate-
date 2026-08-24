import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#7e7365]">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              'w-full bg-[#fbf6f0] text-[#1F1B16] placeholder-[#7e7365]/70 border border-[#d8cebe] rounded-full px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:border-[#5c3822] focus:ring-1 focus:ring-[#5c3822]/20',
              leftIcon && 'pl-10',
              error && 'border-red-500/80 focus:border-red-600',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-600 font-sans">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

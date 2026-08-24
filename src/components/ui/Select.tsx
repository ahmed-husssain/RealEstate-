import React from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365]">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner appearance-none cursor-pointer focus:border-[#5c3822] focus:ring-1 focus:ring-[#5c3822]/20 pr-10',
              error && 'border-red-500/80',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#7e7365]">
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        {error && <p className="text-xs text-red-600 font-sans">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      leftIcon,
      rightIcon,
      type = 'text',
      showPasswordToggle = true,
      ...props
    },
    ref
  ) => {
    const isPassword = type === 'password';
    const [showPassword, setShowPassword] = useState(false);

    const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
            type={effectiveType}
            ref={ref}
            className={cn(
              'w-full bg-[#fbf6f0] text-[#1F1B16] placeholder-[#7e7365]/70 border border-[#d8cebe] rounded-full px-4 py-2.5 text-sm outline-none transition-all duration-200 shadow-inner focus:border-[#5c3822] focus:ring-1 focus:ring-[#5c3822]/20',
              leftIcon && 'pl-10',
              (isPassword && showPasswordToggle || rightIcon) && 'pr-11',
              error && 'border-red-500/80 focus:border-red-600',
              className
            )}
            {...props}
          />

          {isPassword && showPasswordToggle ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3.5 flex items-center justify-center p-1 text-[#7e7365] hover:text-[#1F1B16] transition-colors rounded-full focus:outline-none focus:ring-1 focus:ring-[#5c3822]/30 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          ) : rightIcon ? (
            <div className="absolute right-3.5 flex items-center text-[#7e7365]">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {error && <p className="text-xs text-red-600 font-sans">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

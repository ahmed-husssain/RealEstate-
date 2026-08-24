import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'moss' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-3.5 py-1.5 text-xs rounded-full gap-1.5',
      md: 'px-5 py-2.5 text-sm rounded-full gap-2',
      lg: 'px-7 py-3.5 text-base rounded-full gap-2.5 font-medium',
    };

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-[#5c3822] to-[#422616] text-[#F8F4ED] border border-[#5c3822]/40 shadow-inset-highlight hover:brightness-110 active:scale-[0.98] shadow-sm',
      moss:
        'bg-gradient-to-r from-[#2e3a2f] to-[#1f2820] text-[#F8F4ED] border border-[#2e3a2f]/40 shadow-inset-highlight hover:brightness-110 active:scale-[0.98] shadow-sm',
      secondary:
        'bg-[#fbf6f0]/95 text-[#1F1B16] border border-[#d8cebe] shadow-sm hover:bg-[#f5efe6] hover:border-[#847666]/40 active:scale-[0.98]',
      outline:
        'bg-transparent text-[#1F1B16] border border-[#d8cebe] hover:bg-[#fbf6f0] hover:border-[#847666] active:scale-[0.98]',
      ghost:
        'bg-transparent text-[#1F1B16] hover:bg-[#d8cebe]/20 active:scale-[0.98]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-sans tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

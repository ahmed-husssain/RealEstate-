'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CustomSelectOption {
  value: string;
  label: string;
  sublabel?: string;
}

export interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: CustomSelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
}

export function CustomSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  disabled = false,
  className,
  buttonClassName,
  menuClassName,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn('relative w-full space-y-1', isOpen ? 'z-50' : 'z-10', className)} ref={containerRef}>
      {label && (
        <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
          {label}
        </label>
      )}

      <div className={cn('relative', isOpen ? 'z-50' : 'z-auto')}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={cn(
            'w-full flex items-center justify-between bg-white text-[#1F1B16] border rounded-full px-3.5 py-2 text-xs outline-none transition-all cursor-pointer shadow-2xs select-none text-left',
            isOpen ? 'border-[#5c3822] ring-1 ring-[#5c3822]/20' : 'border-[#d8cebe] hover:border-[#b3a492]',
            error && 'border-red-500 bg-red-50/20',
            disabled && 'opacity-50 cursor-not-allowed bg-neutral-100',
            buttonClassName
          )}
        >
          <span className={cn('truncate', !selectedOption && 'text-[#a39788]')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 text-[#7e7365] shrink-0 ml-2 transition-transform duration-200',
              isOpen && 'rotate-180 text-[#5c3822]'
            )}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            className={cn(
              'absolute left-0 top-full mt-1.5 z-50 w-full min-w-[180px] max-h-60 overflow-y-auto bg-white border border-[#d8cebe] rounded-2xl shadow-xl p-1.5 space-y-0.5 focus:outline-none animate-in fade-in-50 zoom-in-95 origin-top',
              menuClassName
            )}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors text-left cursor-pointer',
                    isSelected
                      ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                      : 'text-[#1F1B16] hover:bg-[#fbf6f0] hover:text-[#5c3822]'
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full shrink-0',
                        isSelected ? 'bg-[#5c3822]' : 'bg-[#d8cebe]'
                      )}
                    />
                    <span className="truncate">{option.label}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#5c3822] shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-600 font-sans mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

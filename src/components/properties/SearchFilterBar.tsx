'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/Button';
import { GlassCard } from '@/ui/GlassCard';
import { Search, SlidersHorizontal, MapPin, Building, DollarSign, BedDouble, RotateCcw } from 'lucide-react';
import { PropertyFilterState } from '@/types';

export interface SearchFilterBarProps {
  initialValues?: Partial<PropertyFilterState>;
  onFilterChange?: (filters: PropertyFilterState) => void;
  isCompact?: boolean;
}

export function SearchFilterBar({
  initialValues,
  onFilterChange,
  isCompact = false,
}: SearchFilterBarProps) {
  const router = useRouter();

  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: initialValues?.searchQuery || '',
    neighborhood: initialValues?.neighborhood || 'all',
    propertyType: initialValues?.propertyType || 'all',
    priceRange: initialValues?.priceRange || [0, 30000000],
    bedrooms: initialValues?.bedrooms || 'all',
    bathrooms: initialValues?.bathrooms || 'all',
    status: initialValues?.status || 'all',
    sortBy: initialValues?.sortBy || 'featured',
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onFilterChange) {
      onFilterChange(filters);
    } else {
      const params = new URLSearchParams();
      if (filters.searchQuery) params.set('q', filters.searchQuery);
      if (filters.neighborhood !== 'all') params.set('neighborhood', filters.neighborhood);
      if (filters.propertyType !== 'all') params.set('type', filters.propertyType);
      if (filters.bedrooms !== 'all') params.set('beds', filters.bedrooms);
      if (filters.status !== 'all') params.set('status', filters.status);
      router.push(`/properties?${params.toString()}`);
    }
  };

  const resetFilters = () => {
    const reset: PropertyFilterState = {
      searchQuery: '',
      neighborhood: 'all',
      propertyType: 'all',
      priceRange: [0, 30000000],
      bedrooms: 'all',
      bathrooms: 'all',
      status: 'all',
      sortBy: 'featured',
    };
    setFilters(reset);
    if (onFilterChange) onFilterChange(reset);
  };

  return (
    <GlassCard
      variant="container"
      rounded="2rem"
      className="p-4 sm:p-5 shadow-stratified w-full"
    >
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Main Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword / Location Search */}
          <div className="relative">
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-1">
              Search Location / Estate
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3.5 w-4 h-4 text-[#5c3822] pointer-events-none" />
              <input
                type="text"
                placeholder="Bel Air, Tribeca, Malibu..."
                value={filters.searchQuery}
                onChange={(e) => {
                  const updated = { ...filters, searchQuery: e.target.value };
                  setFilters(updated);
                  if (onFilterChange) onFilterChange(updated);
                }}
                className="w-full bg-[#fbf6f0] text-[#1F1B16] placeholder-[#7e7365]/70 border border-[#d8cebe] rounded-full pl-10 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner"
              />
            </div>
          </div>

          {/* Property Category */}
          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-1">
              Architecture Style
            </label>
            <div className="relative flex items-center">
              <Building className="absolute left-3.5 w-4 h-4 text-[#5c3822] pointer-events-none" />
              <select
                value={filters.propertyType}
                onChange={(e) => {
                  const updated = { ...filters, propertyType: e.target.value };
                  setFilters(updated);
                  if (onFilterChange) onFilterChange(updated);
                }}
                className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full pl-10 pr-8 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner appearance-none cursor-pointer"
              >
                <option value="all">All Architectural Types</option>
                <option value="luxury-villa">Architectural Villas</option>
                <option value="penthouse">Sky Penthouses</option>
                <option value="estate">Country & Modern Estates</option>
                <option value="townhouse">Historic Townhouses</option>
                <option value="modern-apartment">Gallery Lofts & Condos</option>
              </select>
            </div>
          </div>

          {/* Bedrooms Selector */}
          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-1">
              Bedrooms
            </label>
            <div className="relative flex items-center">
              <BedDouble className="absolute left-3.5 w-4 h-4 text-[#5c3822] pointer-events-none" />
              <select
                value={filters.bedrooms}
                onChange={(e) => {
                  const updated = { ...filters, bedrooms: e.target.value };
                  setFilters(updated);
                  if (onFilterChange) onFilterChange(updated);
                }}
                className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full pl-10 pr-8 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner appearance-none cursor-pointer"
              >
                <option value="all">Any Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
                <option value="6">6+ Bedrooms</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1 text-xs py-2.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isExpanded ? 'Fewer Filters' : 'More Filters'}</span>
            </Button>

            <Button type="submit" variant="primary" size="md" className="flex-1 text-xs py-2.5">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </Button>
          </div>
        </div>

        {/* Expanded Filters Drawer */}
        {isExpanded && (
          <div className="pt-4 border-t border-[#d8cebe]/60 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-1">
                Portfolio Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => {
                  const updated = { ...filters, status: e.target.value };
                  setFilters(updated);
                  if (onFilterChange) onFilterChange(updated);
                }}
                className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2 text-xs outline-none focus:border-[#5c3822]"
              >
                <option value="all">All Listings (Sale & Lease)</option>
                <option value="for-sale">For Sale Only</option>
                <option value="exclusive">Exclusive Off-Market Only</option>
                <option value="for-lease">Luxury Lease Only</option>
              </select>
            </div>

            {/* Neighborhood Filter */}
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-1">
                Enclave / District
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => {
                  const updated = { ...filters, neighborhood: e.target.value };
                  setFilters(updated);
                  if (onFilterChange) onFilterChange(updated);
                }}
                className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2 text-xs outline-none focus:border-[#5c3822]"
              >
                <option value="all">All Enclaves</option>
                <option value="Bel Air">Bel Air, CA</option>
                <option value="Central Park South">Central Park South, NY</option>
                <option value="Point Dume">Point Dume / Malibu, CA</option>
                <option value="Chelsea">Chelsea, NY</option>
                <option value="Backcountry">Backcountry Greenwich, CT</option>
                <option value="Tribeca">Tribeca, NY</option>
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-[#7e7365] hover:text-[#1F1B16]"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset All Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </GlassCard>
  );
}

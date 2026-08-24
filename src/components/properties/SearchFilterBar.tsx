'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/Button';
import { GlassCard } from '@/ui/GlassCard';
import { Search, SlidersHorizontal, MapPin, Building, BedDouble, RotateCcw } from 'lucide-react';
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
    priceRange: initialValues?.priceRange || [0, 1000000000],
    bedrooms: initialValues?.bedrooms || 'all',
    bathrooms: initialValues?.bathrooms || 'all',
    status: initialValues?.status || 'all',
    sortBy: initialValues?.sortBy || 'featured',
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const isRentMode = filters.status === 'for-lease';

  const handleModeToggle = (mode: 'buy' | 'rent' | 'all') => {
    let nextStatus: PropertyFilterState['status'] = 'all';
    if (mode === 'buy') nextStatus = 'for-sale';
    if (mode === 'rent') nextStatus = 'for-lease';

    const updated: PropertyFilterState = {
      ...filters,
      status: nextStatus,
      priceRange: [0, 1000000000],
    };
    setFilters(updated);
    if (onFilterChange) onFilterChange(updated);
  };

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
      priceRange: [0, 1000000000],
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
      className="p-3.5 sm:p-4 shadow-xl w-full bg-[#fbf6f0]"
    >
      <form onSubmit={handleSearch} className="space-y-3">
        {/* Buy / Rent Segmented Switcher */}
        <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-2.5">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#e8dece]/70 border border-[#d8cebe]">
            <button
              type="button"
              onClick={() => handleModeToggle('buy')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filters.status === 'for-sale' || filters.status === 'all'
                  ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm'
                  : 'text-[#1F1B16] hover:text-[#5c3822]'
              }`}
            >
              Buy Property
            </button>
            <button
              type="button"
              onClick={() => handleModeToggle('rent')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                filters.status === 'for-lease'
                  ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm'
                  : 'text-[#1F1B16] hover:text-[#5c3822]'
              }`}
            >
              Rent (Monthly)
            </button>
          </div>

          <span className="text-[11px] font-mono text-[#7e7365] hidden sm:inline-block">
            {isRentMode ? 'Showing Rental Portions, Houses & Flats' : 'Showing Properties for Sale & Investment'}
          </span>
        </div>

        {/* Main Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Location Search */}
          <div className="relative">
            <label className="block text-[11px] font-mono text-[#7e7365] mb-1">
              Search Location or Property
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3.5 w-4 h-4 text-[#5c3822] pointer-events-none" />
              <input
                type="text"
                placeholder={
                  isRentMode
                    ? 'Search rental portions, flats, houses...'
                    : 'North Nazimabad, Gulshan, FB Area, Scheme 33...'
                }
                value={filters.searchQuery}
                onChange={(e) => {
                  const updated = { ...filters, searchQuery: e.target.value };
                  setFilters(updated);
                  if (onFilterChange) onFilterChange(updated);
                }}
                className="w-full bg-white text-[#1F1B16] placeholder-[#7e7365]/70 border border-[#d8cebe] rounded-full pl-9 pr-3.5 py-2 text-xs outline-none focus:border-[#5c3822] shadow-inner"
              />
            </div>
          </div>

          {/* Property Category */}
          <div>
            <label className="block text-[11px] font-mono text-[#7e7365] mb-1">
              {isRentMode ? 'Rental Unit Type' : 'Property Type'}
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
                className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full pl-9 pr-8 py-2 text-xs outline-none focus:border-[#5c3822] shadow-inner appearance-none cursor-pointer"
              >
                <option value="all">{isRentMode ? 'All Rental Units' : 'All Types'}</option>
                <option value="townhouse">Upper / Lower Portions</option>
                <option value="luxury-villa">Full Bangalows & Houses</option>
                <option value="modern-apartment">Apartments & Flats</option>
                <option value="penthouse">Penthouses</option>
                <option value="estate">Plots & Commercial Lease</option>
              </select>
            </div>
          </div>

          {/* Bedrooms Selector */}
          <div>
            <label className="block text-[11px] font-mono text-[#7e7365] mb-1">
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
                className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full pl-9 pr-8 py-2 text-xs outline-none focus:border-[#5c3822] shadow-inner appearance-none cursor-pointer"
              >
                <option value="all">Any Bedrooms</option>
                <option value="2">2+ Beds</option>
                <option value="3">3+ Beds</option>
                <option value="4">4+ Beds</option>
                <option value="5">5+ Beds</option>
                <option value="6">6+ Beds</option>
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
              className="flex-1 text-xs py-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isExpanded ? 'Less' : 'More'}</span>
            </Button>

            <Button type="submit" variant="primary" size="md" className="flex-1 text-xs py-2 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </Button>
          </div>
        </div>

        {/* Expanded Filters Drawer */}
        {isExpanded && (
          <div className="pt-3 border-t border-[#d8cebe]/60 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in duration-200">
            {/* Neighborhood Filter */}
            <div>
              <label className="block text-[11px] font-mono text-[#7e7365] mb-1">
                Select Karachi Area
              </label>
              <select
                value={filters.neighborhood}
                onChange={(e) => {
                  const updated = { ...filters, neighborhood: e.target.value };
                  setFilters(updated);
                  if (onFilterChange) onFilterChange(updated);
                }}
                className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-1.5 text-xs outline-none focus:border-[#5c3822] cursor-pointer"
              >
                <option value="all">All Karachi Locations</option>
                <option value="North Nazimabad">North Nazimabad (Blocks A–W)</option>
                <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal (All Blocks)</option>
                <option value="Federal B Area">Federal B Area (F.B Area)</option>
                <option value="Scheme 33">Scheme 33 (Gulzar-e-Hijri)</option>
                <option value="Buffer Zone">Buffer Zone (Sector 15-A & B)</option>
                <option value="North Karachi">North Karachi (Sectors 1–11)</option>
                <option value="Gulberg">Gulberg Karachi</option>
                <option value="Scheme 45">Scheme 45 (Taiser Town)</option>
                <option value="Clifton">Clifton & Sea View</option>
              </select>
            </div>

            {/* Price / Rent Range Filter */}
            <div>
              <label className="block text-[11px] font-mono text-[#7e7365] mb-1">
                {isRentMode ? 'Monthly Rent Budget' : 'Price Range'}
              </label>
              {isRentMode ? (
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    let range: [number, number] = [0, 1000000000];
                    if (val === 'under-50k') range = [0, 50000];
                    if (val === '50k-100k') range = [50000, 100000];
                    if (val === '100k-200k') range = [100000, 200000];
                    if (val === '200k-plus') range = [200000, 10000000];
                    const updated: PropertyFilterState = { ...filters, priceRange: range };
                    setFilters(updated);
                    if (onFilterChange) onFilterChange(updated);
                  }}
                  className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-1.5 text-xs outline-none focus:border-[#5c3822] cursor-pointer"
                >
                  <option value="all">Any Monthly Rent</option>
                  <option value="under-50k">Under PKR 50,000 / mo</option>
                  <option value="50k-100k">PKR 50k – 1 Lakh / mo</option>
                  <option value="100k-200k">PKR 1 – 2 Lakh / mo</option>
                  <option value="200k-plus">PKR 2 Lakh+ / mo</option>
                </select>
              ) : (
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    let range: [number, number] = [0, 1000000000];
                    if (val === 'under-1cr') range = [0, 10000000];
                    if (val === '1cr-3cr') range = [10000000, 30000000];
                    if (val === '3cr-6cr') range = [30000000, 60000000];
                    if (val === '6cr-plus') range = [60000000, 1000000000];
                    const updated: PropertyFilterState = { ...filters, priceRange: range };
                    setFilters(updated);
                    if (onFilterChange) onFilterChange(updated);
                  }}
                  className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-1.5 text-xs outline-none focus:border-[#5c3822] cursor-pointer"
                >
                  <option value="all">Any Price</option>
                  <option value="under-1cr">Under PKR 1 Crore</option>
                  <option value="1cr-3cr">PKR 1 – 3 Crore</option>
                  <option value="3cr-6cr">PKR 3 – 6 Crore</option>
                  <option value="6cr-plus">PKR 6 Crore+</option>
                </select>
              )}
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="text-xs text-[#7e7365] hover:text-[#1F1B16] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </GlassCard>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { SearchFilterBar } from '@/components/properties/SearchFilterBar';
import { Property, PropertyFilterState } from '@/types';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { GlassCard } from '@/ui/GlassCard';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ArrowUpDown, RotateCcw } from 'lucide-react';

export interface PropertiesCatalogClientProps {
  initialProperties: Property[];
}

export function PropertiesCatalogClient({ initialProperties }: PropertiesCatalogClientProps) {
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || 'all';
  const initialNeighborhood = searchParams.get('neighborhood') || 'all';
  const initialBeds = searchParams.get('beds') || 'all';
  const initialStatus = searchParams.get('status') || 'all';

  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: initialQuery,
    neighborhood: initialNeighborhood,
    propertyType: initialType,
    priceRange: [0, 1000000000],
    bedrooms: initialBeds,
    bathrooms: 'all',
    status: initialStatus,
    sortBy: 'featured',
  });

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((property) => {
      // Search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(query);
        const matchesLocation = `${property.location.neighborhood} ${property.location.city}`
          .toLowerCase()
          .includes(query);
        const matchesTagline = property.tagline.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation && !matchesTagline) return false;
      }

      // Property Type
      if (filters.propertyType !== 'all' && property.specs.propertyType !== filters.propertyType) {
        return false;
      }

      // Neighborhood
      if (filters.neighborhood !== 'all' && !property.location.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'all') {
        const minBeds = parseInt(filters.bedrooms, 10);
        if (property.specs.bedrooms < minBeds) return false;
      }

      // Status
      if (filters.status !== 'all' && property.status !== filters.status) {
        return false;
      }

      // Price Range
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'area-desc') return b.specs.areaSqFt - a.specs.areaSqFt;
      if (filters.sortBy === 'newest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters, initialProperties]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">Active Listings</Badge>
          <Badge variant="stone" size="sm">{filteredProperties.length} Properties Available</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
          Properties for Sale in Karachi
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-xl">
          Browse luxury houses, penthouses, and plots in DHA, Clifton, and KDA with verified details and direct agent contact.
        </p>
      </div>

      {/* Filter Bar */}
      <SearchFilterBar
        initialValues={filters}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />

      {/* Control Bar: Active Filters Count & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#7e7365]">
          <span>Showing <strong className="text-[#1F1B16]">{filteredProperties.length}</strong> of {initialProperties.length} properties</span>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase text-[#7e7365] flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            className="bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-1.5 text-xs outline-none focus:border-[#5c3822] cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="area-desc">Size: Largest</option>
            <option value="newest">Recently Listed</option>
          </select>
        </div>
      </div>

      {/* Property Results Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProperties.map((property, idx) => (
            <PropertyCard key={property.id} property={property} priority={idx < 3} />
          ))}
        </div>
      ) : (
        <GlassCard variant="card" rounded="2rem" className="p-12 text-center space-y-4">
          <BrandLogo href="" imageClassName="h-10 mx-auto" />
          <div className="space-y-1">
            <h3 className="font-display font-medium text-xl text-[#1F1B16]">
              No matching properties found
            </h3>
            <p className="text-xs text-[#7e7365] max-w-sm mx-auto">
              Try adjusting your price range, property type, or location filters to view more residences.
            </p>
          </div>
          <Button
            variant="secondary"
            size="md"
            onClick={() =>
              setFilters({
                searchQuery: '',
                neighborhood: 'all',
                propertyType: 'all',
                priceRange: [0, 1000000000],
                bedrooms: 'all',
                bathrooms: 'all',
                status: 'all',
                sortBy: 'featured',
              })
            }
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset Filters
          </Button>
        </GlassCard>
      )}
    </div>
  );
}

export default PropertiesCatalogClient;

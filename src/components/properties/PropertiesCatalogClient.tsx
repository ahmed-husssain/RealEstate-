'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { SearchFilterBar } from '@/components/properties/SearchFilterBar';
import { Property, PropertyFilterState } from '@/types';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { GlassCard } from '@/ui/GlassCard';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ArrowUpDown, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

export interface PropertiesCatalogClientProps {
  properties: Property[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  currentFilters: {
    searchQuery: string;
    neighborhood: string;
    propertyType: string;
    bedrooms: string;
    status: string;
    sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';
    priceRange: [number, number];
  };
}

export function PropertiesCatalogClient({
  properties,
  totalCount,
  currentPage,
  pageSize,
  totalPages,
  currentFilters,
}: PropertiesCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper to build URL with updated search parameters
  const updateUrlWithFilters = (
    newFilters: Partial<PropertyFilterState>,
    targetPage: number = 1
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    // Update query params
    if (newFilters.searchQuery !== undefined) {
      if (newFilters.searchQuery) params.set('q', newFilters.searchQuery);
      else params.delete('q');
    }

    if (newFilters.neighborhood !== undefined) {
      if (newFilters.neighborhood && newFilters.neighborhood !== 'all') {
        params.set('neighborhood', newFilters.neighborhood);
      } else {
        params.delete('neighborhood');
      }
    }

    if (newFilters.propertyType !== undefined) {
      if (newFilters.propertyType && newFilters.propertyType !== 'all') {
        params.set('type', newFilters.propertyType);
      } else {
        params.delete('type');
      }
    }

    if (newFilters.bedrooms !== undefined) {
      if (newFilters.bedrooms && newFilters.bedrooms !== 'all') {
        params.set('beds', newFilters.bedrooms);
      } else {
        params.delete('beds');
      }
    }

    if (newFilters.status !== undefined) {
      if (newFilters.status && newFilters.status !== 'all') {
        params.set('status', newFilters.status);
      } else {
        params.delete('status');
      }
    }

    if (newFilters.sortBy !== undefined) {
      if (newFilters.sortBy && newFilters.sortBy !== 'featured') {
        params.set('sort', newFilters.sortBy);
      } else {
        params.delete('sort');
      }
    }

    if (newFilters.priceRange !== undefined) {
      if (newFilters.priceRange[0] > 0) {
        params.set('minPrice', String(newFilters.priceRange[0]));
      } else {
        params.delete('minPrice');
      }

      if (newFilters.priceRange[1] < 1000000000) {
        params.set('maxPrice', String(newFilters.priceRange[1]));
      } else {
        params.delete('maxPrice');
      }
    }

    if (targetPage > 1) {
      params.set('page', String(targetPage));
    } else {
      params.delete('page');
    }

    router.push(`/properties?${params.toString()}`);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    if (pageNumber > 1) {
      params.set('page', String(pageNumber));
    } else {
      params.delete('page');
    }
    router.push(`/properties?${params.toString()}`);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleSortChange = (newSort: string) => {
    updateUrlWithFilters({ sortBy: newSort as any }, 1);
  };

  const handleReset = () => {
    router.push('/properties');
  };

  const startRecord = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">
            {currentFilters.status === 'for-lease' ? 'Rental Inventory' : 'Active Listings'}
          </Badge>
          <Badge variant="stone" size="sm">{totalCount} Properties Available</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
          {currentFilters.status === 'for-lease'
            ? 'Properties for Rent in Karachi'
            : currentFilters.status === 'for-sale'
            ? 'Properties for Sale in Karachi'
            : 'Properties for Sale & Rent in Karachi'}
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-xl">
          {currentFilters.status === 'for-lease'
            ? 'Browse luxury rental bangalows, independent family houses, and modern apartments across North Nazimabad, Gulshan, FB Area, Scheme 33, Buffer Zone, and North Karachi with verified utilities and direct agent contact.'
            : 'Browse luxury houses, penthouses, plots, and apartments in North Nazimabad, Gulshan, FB Area, Scheme 33, and prime Karachi enclaves with verified details and direct agent contact.'}
        </p>
      </div>

      {/* Filter Bar */}
      <SearchFilterBar
        initialValues={currentFilters}
        onFilterChange={(newFilters) => updateUrlWithFilters(newFilters, 1)}
      />

      {/* Control Bar: Active Filters Count & Database Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#7e7365]">
          {totalCount > 0 ? (
            <span>
              Showing <strong className="text-[#1F1B16]">{startRecord} - {endRecord}</strong> of {totalCount} properties
            </span>
          ) : (
            <span>Showing 0 properties</span>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase text-[#7e7365] flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
          </span>
          <select
            value={currentFilters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
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
      {properties.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} priority={idx < 3} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#d8cebe]/60">
              <div className="text-xs font-mono text-[#7e7365]">
                Page <strong className="text-[#1F1B16]">{currentPage}</strong> of {totalPages}
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="rounded-full px-3"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((pageNum, idx, arr) => {
                    const prevPage = arr[idx - 1];
                    const showEllipsis = prevPage && pageNum - prevPage > 1;

                    return (
                      <React.Fragment key={pageNum}>
                        {showEllipsis && (
                          <span className="px-2 text-xs text-[#7e7365]">...</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                            pageNum === currentPage
                              ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm'
                              : 'bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] hover:bg-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="rounded-full px-3"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
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
            onClick={handleReset}
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

import React, { Suspense } from 'react';
import { getPaginatedProperties } from '@/lib/db/properties';
import { mapDbPropertyToProperty } from '@/lib/db/mappers';
import { PropertiesCatalogClient } from '@/components/properties/PropertiesCatalogClient';

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    type?: string;
    neighborhood?: string;
    beds?: string;
    status?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function PropertiesPage(props: PageProps) {
  const searchParams = await props.searchParams;

  // 1. Sanitize & validate incoming URL search parameters
  const page = Math.max(1, parseInt(searchParams.page || '1', 10) || 1);
  const pageSize = 12;
  const searchQuery = (searchParams.q || '').trim();
  const propertyType = (searchParams.type || 'all').trim();
  const neighborhood = (searchParams.neighborhood || 'all').trim();
  const bedrooms = (searchParams.beds || 'all').trim();
  const status = (searchParams.status || 'all').trim();
  const sortBy = (['featured', 'price-asc', 'price-desc', 'area-desc', 'newest'].includes(searchParams.sort || '')
    ? searchParams.sort
    : 'featured') as 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';

  const minPrice = searchParams.minPrice ? Math.max(0, parseInt(searchParams.minPrice, 10)) : undefined;
  const maxPrice = searchParams.maxPrice ? Math.min(1000000000, parseInt(searchParams.maxPrice, 10)) : undefined;

  // 2. Query PostgreSQL with server-side pagination, filtering, and sorting
  const result = await getPaginatedProperties({
    page,
    pageSize,
    search: searchQuery,
    propertyType,
    areaSlug: neighborhood,
    bedrooms,
    status,
    sortBy,
    minPrice,
    maxPrice,
  });

  const properties = result.properties.map(mapDbPropertyToProperty);

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center font-mono text-xs text-[#7e7365]">Loading curated properties catalog...</div>}>
      <PropertiesCatalogClient
        properties={properties}
        totalCount={result.totalCount}
        currentPage={page}
        pageSize={pageSize}
        totalPages={result.totalPages}
        currentFilters={{
          searchQuery,
          neighborhood,
          propertyType,
          bedrooms,
          status,
          sortBy,
          priceRange: [minPrice || 0, maxPrice || 1000000000],
        }}
      />
    </Suspense>
  );
}

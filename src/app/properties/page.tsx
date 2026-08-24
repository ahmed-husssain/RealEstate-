import React, { Suspense } from 'react';
import { getProperties } from '@/lib/db/properties';
import { mapDbPropertyToProperty } from '@/lib/db/mappers';
import { mockProperties } from '@/data/mockProperties';
import { PropertiesCatalogClient } from '@/components/properties/PropertiesCatalogClient';

export default async function PropertiesPage() {
  const dbProperties = await getProperties();
  const initialProperties = dbProperties.length > 0
    ? dbProperties.map(mapDbPropertyToProperty)
    : mockProperties;

  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center font-mono text-xs text-[#7e7365]">Loading curated properties catalog...</div>}>
      <PropertiesCatalogClient initialProperties={initialProperties} />
    </Suspense>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import { getPropertyBySlug, getProperties } from '@/lib/db/properties';
import { mapDbPropertyToProperty } from '@/lib/db/mappers';
import { PropertyDetailClient } from '@/components/properties/PropertyDetailClient';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export const revalidate = 60;

export default async function PropertyDetailPage(props: PageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const dbProperty = await getPropertyBySlug(slug);

  if (!dbProperty) {
    notFound();
  }

  const property = mapDbPropertyToProperty(dbProperty);

  // Fetch similar properties from the same area or general catalog from PostgreSQL
  const dbSimilar = await getProperties({
    areaSlug: dbProperty.area?.slug,
    limit: 4,
  });

  const similarProperties = dbSimilar
    .map(mapDbPropertyToProperty)
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <PropertyDetailClient
      property={property}
      similarProperties={similarProperties}
    />
  );
}

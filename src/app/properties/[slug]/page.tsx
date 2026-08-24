import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPropertyBySlug, getProperties } from '@/lib/db/properties';
import { mapDbPropertyToProperty } from '@/lib/db/mappers';
import { mockProperties } from '@/data/mockProperties';
import { PropertyDetailClient } from '@/components/properties/PropertyDetailClient';
import { Button } from '@/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function PropertyDetailPage(props: PageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const dbProperty = await getPropertyBySlug(slug);
  const property = dbProperty
    ? mapDbPropertyToProperty(dbProperty)
    : mockProperties.find((p) => p.slug === slug);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display font-medium text-3xl text-[#1F1B16]">
          Property Not Found
        </h1>
        <p className="text-xs text-[#7e7365]">
          The requested luxury listing may have been acquired or privatized.
        </p>
        <Link href="/properties">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const dbAll = await getProperties({ limit: 4 });
  const allProperties = dbAll.length > 0 ? dbAll.map(mapDbPropertyToProperty) : mockProperties;
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <PropertyDetailClient
      property={property}
      similarProperties={similarProperties}
    />
  );
}

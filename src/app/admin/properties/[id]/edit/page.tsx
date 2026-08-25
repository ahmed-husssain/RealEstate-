import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { requireAuthUserPage } from '@/lib/auth/admin';
import { PropertyForm } from '../../PropertyForm';

export const dynamic = 'force-dynamic';

interface EditPropertyPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function AdminEditPropertyPage(props: EditPropertyPageProps) {
  await requireAuthUserPage();

  const resolvedParams = await props.params;
  const { id } = resolvedParams;

  const [property, areas] = await Promise.all([
    prisma.property.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    }),
    prisma.area.findMany({
      orderBy: [{ isPopular: 'desc' }, { name: 'asc' }],
      select: { id: true, name: true, city: true },
    }),
  ]);

  if (!property) {
    notFound();
  }

  return (
    <PropertyForm
      initialData={{
        ...property,
        price: Number(property.price),
        areaSize: Number(property.areaSize),
      }}
      areas={areas}
      isEdit={true}
    />
  );
}

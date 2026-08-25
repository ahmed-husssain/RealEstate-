import React from 'react';
import prisma from '@/lib/prisma';
import { requireAuthUser } from '@/lib/auth/admin';
import { PropertyForm } from '../PropertyForm';

export const dynamic = 'force-dynamic';

export default async function AdminNewPropertyPage() {
  await requireAuthUser();

  const areas = await prisma.area.findMany({
    orderBy: [{ isPopular: 'desc' }, { name: 'asc' }],
    select: { id: true, name: true, city: true },
  });

  return <PropertyForm areas={areas} isEdit={false} />;
}

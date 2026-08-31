import React from 'react';
import { getSiteSettingsAction } from '@/lib/actions/admin-content';
import { ValuationClient } from './ValuationClient';

export const revalidate = 60;

export default async function ValuationPage() {
  const { data: siteSettings } = await getSiteSettingsAction();

  return <ValuationClient siteSettings={siteSettings || {}} />;
}

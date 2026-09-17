'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HeaderNavbar } from '@/components/common/HeaderNavbar';
import { Footer } from '@/components/common/Footer';
import { GuideRails } from '@/components/common/GuideRails';
import { WhatsAppFloatingButton } from '@/components/common/WhatsAppFloatingButton';
import { PublicSiteSettings } from '@/lib/db/settings';

interface AppLayoutShellProps {
  siteSettings: PublicSiteSettings;
  children: React.ReactNode;
}

export function AppLayoutShell({ siteSettings, children }: AppLayoutShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <main className="relative z-10 min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      {/* 7xl Guide-Rails for LG+ Viewports */}
      <GuideRails />

      {/* Floating Stratified Navigation */}
      <HeaderNavbar siteSettings={siteSettings} />

      {/* Main Application Container */}
      <main className="relative z-10 pt-24 sm:pt-28 min-h-screen">
        {children}
      </main>

      {/* Floating WhatsApp Concierge */}
      <WhatsAppFloatingButton phoneNumber={siteSettings.whatsapp_clean} />

      {/* Grounded Ground-Tone Dark Footer */}
      <Footer siteSettings={siteSettings} />
    </>
  );
}

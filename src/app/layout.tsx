import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { HeaderNavbar } from '@/components/common/HeaderNavbar';
import { Footer } from '@/components/common/Footer';
import { GuideRails } from '@/components/common/GuideRails';
import { BackgroundCanvas } from '@/components/common/BackgroundCanvas';
import { WhatsAppFloatingButton } from '@/components/common/WhatsAppFloatingButton';
import { RouteProgressBar } from '@/components/common/RouteProgressBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amber Property Corner | Prime Real Estate & Architectural Estates',
  description:
    'Amber Property Corner represents the pinnacle of luxury real estate, prime architectural estates, sky penthouses, and private coastal residences with enduring craftsmanship.',
  keywords: [
    'luxury real estate',
    'architectural homes',
    'penthouses',
    'amber property corner',
    'karachi luxury estates',
    'prime property advisory',
  ],
  authors: [{ name: 'Amber Property Corner Advisory' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

import { getPublicSiteSettings } from '@/lib/db/settings';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getPublicSiteSettings();

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-[#f5efe6] text-[#1F1B16] antialiased selection:bg-[#5c3822] selection:text-[#F8F4ED]">
        {/* Top Route Progress Bar for Instant Navigation Feedback */}
        <Suspense fallback={null}>
          <RouteProgressBar />
        </Suspense>

        {/* Procedural WebGL Ambient Scene */}
        <BackgroundCanvas />

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
      </body>
    </html>
  );
}

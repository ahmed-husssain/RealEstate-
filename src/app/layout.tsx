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
  metadataBase: new URL('https://amberproperty.vercel.app'),
  title: 'Amber Property Corner | Real Estate & Construction Advisor Karachi',
  description:
    'Verified real estate agency in Karachi specializing in residential houses (120, 240, 500 Gaz), plots, SBCA legal verification, and turnkey house construction across North Nazimabad, Gulshan-e-Iqbal, Federal B Area, Scheme 33, Buffer Zone, and Scheme 45.',
  keywords: [
    'real estate agency karachi',
    'houses for sale north nazimabad',
    'property in gulshan-e-iqbal',
    'federal b area real estate',
    'scheme 33 houses for sale',
    'buffer zone property dealer',
    'scheme 45 taiser town plots',
    'amber property corner',
    'syed sikander waqar real estate',
    'sbca legal approval verification karachi',
    'turnkey house construction karachi',
  ],
  authors: [{ name: 'Syed Sikander Waqar - Amber Property Corner' }],
  openGraph: {
    title: 'Amber Property Corner | Real Estate & Construction in Karachi',
    description:
      'Verified houses for sale, plot investments, and construction in North Nazimabad, Gulshan-e-Iqbal, FB Area, and Scheme 33.',
    url: 'https://amberproperty.vercel.app',
    siteName: 'Amber Property Corner',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: '/apple-touch-icon.png',
        width: 180,
        height: 180,
        alt: 'Amber Property Corner Karachi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amber Property Corner | Real Estate & Construction Advisor Karachi',
    description:
      'Verified houses for sale, plot investments, and turnkey construction across North Nazimabad, Gulshan, and Scheme 33.',
    images: ['/apple-touch-icon.png'],
  },
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

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': ['RealEstateAgent', 'LocalBusiness'],
  name: 'Amber Property Corner',
  alternateName: 'Amber Real Estate & Construction Advisory',
  url: 'https://amberproperty.vercel.app',
  logo: 'https://amberproperty.vercel.app/icon.svg',
  image: 'https://amberproperty.vercel.app/apple-touch-icon.png',
  description:
    'Premier real estate consultancy and construction firm in Karachi, Pakistan. Specializing in verified residential bungalows, plots, SBCA/KDA legal approvals, and turnkey construction in North Nazimabad, Gulshan-e-Iqbal, FB Area, Scheme 33, Buffer Zone, and Scheme 45.',
  telephone: '+923327906034',
  email: 'syedsikander1401@gmail.com',
  priceRange: 'PKR 5,000,000 - PKR 350,000,000',
  currenciesAccepted: 'PKR',
  paymentAccepted: 'Cash, Bank Transfer, Pay Order',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressRegion: 'Sindh',
    addressCountry: 'PK',
    postalCode: '74600',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '24.9355',
    longitude: '67.0428',
  },
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'North Nazimabad',
      description: 'Blocks A through W, Karachi',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Gulshan-e-Iqbal',
      description: 'Blocks 1 through 19, Karachi',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Federal B Area (F.B Area)',
      description: 'Blocks 1 through 21, Karachi',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Scheme 33 (Gulzar-e-Hijri)',
      description: 'Cooperative Housing Societies, Karachi',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Buffer Zone & North Karachi',
      description: 'Sectors 15A, 15B, 11A, 11B, Karachi',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Scheme 45 (Taiser Town)',
      description: 'MDA Residential & Commercial Plots, Karachi',
    },
  ],
  founder: {
    '@type': 'Person',
    name: 'Syed Sikander Waqar',
    jobTitle: 'Senior Real Estate & Construction Advisor',
    telephone: '+923327906034',
    email: 'syedsikander1401@gmail.com',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '21:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Karachi Real Estate & Construction Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Verified House Sales (120, 240, 500 Gaz)',
          description: 'Sales of residential houses with full registry, Sanad, and tax verification.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Legal Due Diligence & SBCA Approvals',
          description: 'Title verification, approved building plans, and NOC clearance.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Turnkey House Construction & Architecture',
          description: 'A-to-Z construction with Grade-60 steel, grey structure, and finishing.',
        },
      },
    ],
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
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
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

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { HeaderNavbar } from '@/components/common/HeaderNavbar';
import { Footer } from '@/components/common/Footer';
import { GuideRails } from '@/components/common/GuideRails';
import { BackgroundCanvas } from '@/components/common/BackgroundCanvas';

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
    'bel air estates',
    'manhattan luxury apartments',
    'amber property corner',
  ],
  authors: [{ name: 'Amber Property Corner Advisory' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-[#f5efe6] text-[#1F1B16] antialiased selection:bg-[#5c3822] selection:text-[#F8F4ED]">
        {/* Procedural WebGL Ambient Scene */}
        <BackgroundCanvas />

        {/* 7xl Guide-Rails for LG+ Viewports */}
        <GuideRails />

        {/* Floating Stratified Navigation */}
        <HeaderNavbar />

        {/* Main Application Container */}
        <main className="relative z-10 pt-24 sm:pt-28 min-h-screen">
          {children}
        </main>

        {/* Grounded Ground-Tone Dark Footer */}
        <Footer />
      </body>
    </html>
  );
}

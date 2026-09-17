import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/ui/Badge';
import { BrandLogo } from '@/components/common/BrandLogo';
import { PublicSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/db/settings';

export interface FooterProps {
  siteSettings?: PublicSiteSettings;
}

export function Footer({ siteSettings = DEFAULT_SITE_SETTINGS }: FooterProps) {
  return (
    <footer className="relative z-30 bg-[#1F1B16] text-[#F8F4ED] pt-12 md:pt-16 pb-16 mt-16 md:mt-24 border-t border-[#6E7A67]/30 overflow-hidden pointer-events-auto">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d8cebe]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* MOBILE VIEW (< md): Luxury Bento Grid                                     */}
        {/* ========================================================================= */}
        <div className="md:hidden space-y-5 pb-8">
          {/* Brand Header */}
          <div className="space-y-3">
            <BrandLogo variant="on-dark" />
            <p className="text-xs text-[#D7CBBB] leading-relaxed">
              Your trusted real estate and construction partner for buying, selling, renting, building, and renovating verified properties across Karachi’s premier residential enclaves.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Badge variant="moss" size="sm">Verified Karachi Listings</Badge>
              <Badge variant="stone" size="sm" className="bg-[#24201a] text-[#D7CBBB] border-[#6E7A67]/30">Construction & Renovation</Badge>
            </div>
          </div>

          {/* 2-Column Bento Grid for Links */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* Bento 1: Properties & Rentals */}
            <div className="bg-[#24201a]/95 border border-[#6E7A67]/35 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D8CEBE] border-b border-[#6E7A67]/30 pb-1.5">
                Properties & Rentals
              </h4>
              <ul className="space-y-2 text-xs text-[#D7CBBB]">
                <li>
                  <Link href="/properties?type=luxury-villa" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">Luxury Houses</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties?status=for-lease" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer text-[#DDD2C2]">
                    <span className="truncate">Rental Bungalows</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties?type=penthouse" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">Penthouses</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties?type=estate" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">Plots</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer font-semibold text-[#F8F4ED]">
                    <span className="truncate">All Listings</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bento 2: Karachi Areas */}
            <div className="bg-[#24201a]/95 border border-[#6E7A67]/35 rounded-2xl p-3.5 space-y-2.5 shadow-sm">
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#D8CEBE] border-b border-[#6E7A67]/30 pb-1.5">
                Karachi Areas
              </h4>
              <ul className="space-y-2 text-xs text-[#D7CBBB]">
                <li>
                  <Link href="/properties?neighborhood=north-nazimabad&status=for-sale" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">North Nazimabad</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties?neighborhood=gulshan-e-iqbal&status=for-sale" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">Gulshan-e-Iqbal</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties?neighborhood=federal-b-area&status=for-sale" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">FB Area</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties?neighborhood=scheme-33&status=for-sale" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">Scheme 33</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/properties?neighborhood=buffer-zone&status=for-sale" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer">
                    <span className="truncate">Buffer Zone</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
                <li>
                  <Link href="/neighborhoods" className="hover:text-[#F8F4ED] transition-colors flex items-center justify-between gap-1 cursor-pointer text-[#DDD2C2] font-semibold">
                    <span className="truncate">Explore All</span>
                    <ArrowUpRight className="w-3 h-3 text-[#D8CEBE] shrink-0 opacity-70" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Head Office Card */}
          <div className="bg-[#24201a]/95 border border-[#6E7A67]/35 rounded-2xl p-4 space-y-3 shadow-md">
            <div className="flex items-center justify-between border-b border-[#6E7A67]/30 pb-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D8CEBE]">
                Head Office
              </h4>
              <span className="text-[10px] font-mono text-[#DDD2C2] bg-[#5c3822]/40 px-2 py-0.5 rounded-full border border-[#5c3822]/60">
                Gulberg Town
              </span>
            </div>

            <div className="text-xs text-[#D7CBBB] space-y-1.5">
              <p className="font-semibold text-[#F8F4ED]">Amber Property Corner</p>
              <p className="text-[11px] leading-relaxed text-[#D7CBBB]">{siteSettings.office_address}</p>
              
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] border-t border-[#6E7A67]/20">
                <div>
                  <span className="text-[#847666] block">Mobile:</span>
                  <a href={`tel:${siteSettings.whatsapp_clean}`} className="text-[#DDD2C2] hover:underline font-medium">
                    {siteSettings.phone_primary}
                  </a>
                </div>
                <div>
                  <span className="text-[#847666] block">WhatsApp:</span>
                  <a href={`https://wa.me/${siteSettings.whatsapp_clean}`} target="_blank" rel="noopener noreferrer" className="text-[#22c55e] font-semibold hover:underline">
                    {siteSettings.whatsapp_number}
                  </a>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#5c3822] hover:bg-[#6e432a] text-[#F8F4ED] text-xs font-semibold transition-all shadow-sm cursor-pointer active:scale-[0.99]"
            >
              <span>Contact Office Page</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (>= md): Classic 5-Column Grid                               */}
        {/* ========================================================================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#6E7A67]/20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="on-dark" />
            <p className="text-xs text-[#D7CBBB] leading-relaxed max-w-sm">
              Your trusted real estate and construction partner for buying, selling, renting, building, and renovating verified properties across Karachi’s premier residential enclaves.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="moss" size="sm">Verified Karachi Listings</Badge>
              <Badge variant="stone" size="sm" className="bg-[#24201a] text-[#D7CBBB] border-[#6E7A67]/30">Construction & Renovation</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Properties & Rentals
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D7CBBB]">
              <li>
                <Link href="/properties?type=luxury-villa" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1 cursor-pointer">
                  Luxury Houses & Villas <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?status=for-lease" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1 cursor-pointer font-medium text-[#DDD2C2]">
                  Rental Houses & Bungalows <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?type=penthouse" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1 cursor-pointer">
                  Penthouses & Apartments <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?type=estate" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1 cursor-pointer">
                  Residential Plots <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1 cursor-pointer">
                  All Active Listings <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Karachi Areas
            </h4>
            <ul className="space-y-2 text-xs text-[#D7CBBB]">
              <li>
                <Link href="/properties?neighborhood=north-nazimabad&status=for-sale" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  North Nazimabad
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=gulshan-e-iqbal&status=for-sale" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Gulshan-e-Iqbal
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=federal-b-area&status=for-sale" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Federal B Area (F.B Area)
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=scheme-33&status=for-sale" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Scheme 33 (Gulzar-e-Hijri)
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=buffer-zone&status=for-sale" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Buffer Zone & North Karachi
                </Link>
              </li>
              <li>
                <Link href="/properties?neighborhood=scheme-45-taiser-town&status=for-sale" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Scheme 45 (Taiser Town)
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="hover:text-[#F8F4ED] transition-colors text-[#DDD2C2] font-semibold cursor-pointer">
                  Explore All Areas &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Office & Direct Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Head Office
            </h4>
            <div className="text-xs text-[#D7CBBB] space-y-1.5">
              <p className="font-medium text-[#F8F4ED]">Amber Property Corner</p>
              <p>{siteSettings.office_address}</p>
              <p className="text-[11px] text-[#DDD2C2] pt-1">
                Mobile: <a href={`tel:${siteSettings.whatsapp_clean}`} className="hover:underline">{siteSettings.phone_primary}</a>
              </p>
              <p className="text-[11px] text-[#847666]">
                Tel: <a href={`tel:${siteSettings.phone_landline.replace(/[^0-9]/g, '')}`} className="hover:underline">{siteSettings.phone_landline}</a>
              </p>
              <p className="text-[11px] text-[#DDD2C2]">
                WhatsApp: <a href={`https://wa.me/${siteSettings.whatsapp_clean}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#22c55e] font-semibold">{siteSettings.whatsapp_number}</a>
              </p>
              <p className="pt-1">
                Email: <a href={`mailto:${siteSettings.contact_email}`} className="underline hover:text-white cursor-pointer">{siteSettings.contact_email}</a>
              </p>
            </div>

            {/* Direct Contact Button */}
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5c3822] hover:bg-[#6e432a] text-[#F8F4ED] text-xs font-medium transition-colors shadow-sm cursor-pointer"
              >
                <span>Contact Office Page &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Extra Right Clearance for Floating WhatsApp */}
        <div className="pt-6 md:pt-8 pb-8 sm:pb-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#847666] pr-0 sm:pr-24 border-t border-[#6E7A67]/20 md:border-t-0">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Amber Property Corner. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-4 md:gap-6">
            <Link href="/about" className="px-2.5 py-1 rounded-full md:rounded-none md:p-0 bg-[#24201a] md:bg-transparent border border-[#6E7A67]/30 md:border-0 hover:text-[#F8F4ED] text-[#D7CBBB] transition-colors cursor-pointer">
              About Us
            </Link>
            <Link href="/services" className="px-2.5 py-1 rounded-full md:rounded-none md:p-0 bg-[#24201a] md:bg-transparent border border-[#6E7A67]/30 md:border-0 hover:text-[#F8F4ED] text-[#D7CBBB] transition-colors cursor-pointer">
              Construction Services
            </Link>
            <Link href="/contact" className="px-2.5 py-1 rounded-full md:rounded-none md:p-0 bg-[#24201a] md:bg-transparent border border-[#6E7A67]/30 md:border-0 hover:text-[#F8F4ED] text-[#D7CBBB] transition-colors cursor-pointer font-medium underline underline-offset-4">
              Contact Office
            </Link>
            <Link
              href="/admin"
              className="hover:text-[#F8F4ED] text-[#F8F4ED] font-semibold transition-colors inline-flex items-center gap-1.5 py-1 px-3 rounded-full md:rounded-lg bg-[#5c3822] md:bg-[#2e261f] border border-[#5c3822] md:border-[#6E7A67]/40 hover:border-[#D8CEBE] cursor-pointer shadow-sm"
            >
              <span>Admin Portal</span>
              <ArrowUpRight className="w-3 h-3 text-[#D8CEBE]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

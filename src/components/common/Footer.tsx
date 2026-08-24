import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/ui/Badge';
import { BrandLogo } from '@/components/common/BrandLogo';

export function Footer() {
  return (
    <footer className="relative z-30 bg-[#1F1B16] text-[#F8F4ED] pt-16 pb-16 mt-24 border-t border-[#6E7A67]/30 overflow-hidden pointer-events-auto">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d8cebe]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#6E7A67]/20">
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
                  Rental Portions & Houses <ArrowUpRight className="w-3 h-3 opacity-60" />
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
                <Link href="/neighborhoods/north-nazimabad" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  North Nazimabad
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/gulshan-e-iqbal" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Gulshan-e-Iqbal
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/federal-b-area" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Federal B Area (F.B Area)
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/scheme-33" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Scheme 33 (Gulzar-e-Hijri)
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/buffer-zone" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
                  Buffer Zone & North Karachi
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/scheme-45-taiser-town" className="hover:text-[#F8F4ED] transition-colors cursor-pointer">
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
              <p>B 693, Block 13 Gulberg Town, Karachi, Pakistan</p>
              <p className="text-[11px] text-[#DDD2C2] pt-1">Mobile: +92 300 822 4110</p>
              <p className="text-[11px] text-[#847666]">Tel: +92 21 3634 1100</p>
              <p className="pt-1">Email: <a href="mailto:info@amberproperty.com" className="underline hover:text-white cursor-pointer">info@amberproperty.com</a></p>
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
        <div className="pt-8 pb-8 sm:pb-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#847666] pr-0 sm:pr-24">
          <p>© {new Date().getFullYear()} Amber Property Corner. All rights reserved.</p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <Link href="/about" className="hover:text-[#F8F4ED] text-[#D7CBBB] transition-colors py-1 cursor-pointer">
              About Us
            </Link>
            <Link href="/services" className="hover:text-[#F8F4ED] text-[#D7CBBB] transition-colors py-1 cursor-pointer">
              Construction Services
            </Link>
            <Link href="/contact" className="hover:text-[#F8F4ED] text-[#D7CBBB] transition-colors py-1 cursor-pointer font-medium underline underline-offset-4">
              Contact Office
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-[#F8F4ED] text-[#F8F4ED] font-semibold transition-colors inline-flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#2e261f] border border-[#6E7A67]/40 hover:border-[#D8CEBE] cursor-pointer shadow-sm"
            >
              <span>Admin Login</span>
              <ArrowUpRight className="w-3 h-3 text-[#D8CEBE]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

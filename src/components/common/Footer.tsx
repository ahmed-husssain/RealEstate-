import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/ui/Badge';
import { BrandLogo } from '@/components/common/BrandLogo';

export function Footer() {
  return (
    <footer className="relative bg-[#1F1B16] text-[#F8F4ED] pt-16 pb-12 mt-24 border-t border-[#6E7A67]/30 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d8cebe]/40 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#6E7A67]/20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="on-dark" />
            <p className="text-xs text-[#D7CBBB] leading-relaxed max-w-sm">
              Your trusted partner for buying, selling, constructing, and renovating luxury properties across Karachi’s premier residential enclaves.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="moss" size="sm">Verified Karachi Listings</Badge>
              <Badge variant="stone" size="sm" className="bg-[#24201a] text-[#D7CBBB] border-[#6E7A67]/30">Construction & Renovation</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Properties
            </h4>
            <ul className="space-y-2 text-xs text-[#D7CBBB]">
              <li>
                <Link href="/properties?type=luxury-villa" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Luxury Houses & Villas <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?type=penthouse" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Penthouses & Apartments <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?type=estate" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Residential Plots <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
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
                <Link href="/neighborhoods/north-nazimabad" className="hover:text-[#F8F4ED] transition-colors">
                  North Nazimabad
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/gulshan-e-iqbal" className="hover:text-[#F8F4ED] transition-colors">
                  Gulshan-e-Iqbal
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/federal-b-area" className="hover:text-[#F8F4ED] transition-colors">
                  Federal B Area (F.B Area)
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/scheme-33" className="hover:text-[#F8F4ED] transition-colors">
                  Scheme 33 (Gulzar-e-Hijri)
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/buffer-zone" className="hover:text-[#F8F4ED] transition-colors">
                  Buffer Zone & North Karachi
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/scheme-45-taiser-town" className="hover:text-[#F8F4ED] transition-colors">
                  Scheme 45 (Taiser Town)
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="hover:text-[#F8F4ED] transition-colors text-[#DDD2C2] font-semibold">
                  Explore All Areas &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Karachi Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Office & Contact
            </h4>
            <div className="text-xs text-[#D7CBBB] space-y-1">
              <p className="font-medium text-[#F8F4ED]">Amber Property Corner</p>
              <p>B 693, Block 13 Gulberg Town, Karachi, Pakistan</p>
              <p className="text-[11px] text-[#DDD2C2] pt-1">Mobile: +92 300 822 4110</p>
              <p className="text-[11px] text-[#847666]">Tel: +92 21 3634 1100</p>
            </div>
            <div className="pt-2 text-xs text-[#D7CBBB]">
              <p>Email: <a href="mailto:info@amberproperty.com" className="underline hover:text-white">info@amberproperty.com</a></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#847666]">
          <p>© {new Date().getFullYear()} Amber Property Corner. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-[#D7CBBB] transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-[#D7CBBB] transition-colors">Construction Services</Link>
            <Link href="/contact" className="hover:text-[#D7CBBB] transition-colors">Contact Office</Link>
            <Link href="/admin/login" className="hover:text-[#D7CBBB] text-[#D8CEBE] font-semibold transition-colors flex items-center gap-1">
              <span>Admin Login</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

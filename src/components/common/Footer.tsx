import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Award, Compass, Sparkles } from 'lucide-react';
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
              An architectural real estate advisory dedicated to prime luxury estates, private penthouses, and landmark residences. Curating environments of enduring proportion and quiet luxury.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="moss" size="sm">Global Luxury Certified</Badge>
              <Badge variant="stone" size="sm" className="bg-[#24201a] text-[#D7CBBB] border-[#6E7A67]/30">Private Advisory</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Portfolios
            </h4>
            <ul className="space-y-2 text-xs text-[#D7CBBB]">
              <li>
                <Link href="/properties?type=luxury-villa" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Architectural Villas <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?type=penthouse" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Sky Penthouses <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?type=estate" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Country Estates <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?type=historic-manor" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Historic Landmarks <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link href="/properties?status=exclusive" className="hover:text-[#F8F4ED] transition-colors flex items-center gap-1">
                  Private Off-Market <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Districts */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Districts
            </h4>
            <ul className="space-y-2 text-xs text-[#D7CBBB]">
              <li>
                <Link href="/neighborhoods/bel-air" className="hover:text-[#F8F4ED] transition-colors">
                  Bel Air & Beverly Hills
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/tribeca" className="hover:text-[#F8F4ED] transition-colors">
                  Tribeca & SoHo
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/malibu" className="hover:text-[#F8F4ED] transition-colors">
                  Point Dume & Malibu
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods/greenwich" className="hover:text-[#F8F4ED] transition-colors">
                  Backcountry Greenwich
                </Link>
              </li>
              <li>
                <Link href="/neighborhoods" className="hover:text-[#F8F4ED] transition-colors text-[#DDD2C2]">
                  Explore All Guides &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Advisory & Offices */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#D8CEBE]">
              Private Office
            </h4>
            <div className="text-xs text-[#D7CBBB] space-y-1">
              <p className="font-medium text-[#F8F4ED]">New York</p>
              <p>575 Madison Avenue, 18th Floor</p>
              <p className="text-[11px] text-[#847666]">+1 (212) 640-8800</p>
            </div>
            <div className="text-xs text-[#D7CBBB] space-y-1 pt-2">
              <p className="font-medium text-[#F8F4ED]">Los Angeles</p>
              <p>9460 Wilshire Boulevard</p>
              <p className="text-[11px] text-[#847666]">+1 (310) 892-4400</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#847666]">
          <p>© {new Date().getFullYear()} Amber Property Corner. All rights reserved. Equal Housing Opportunity.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#D7CBBB] transition-colors">Architectural Code</Link>
            <Link href="/services" className="hover:text-[#D7CBBB] transition-colors">Discretion Protocol</Link>
            <Link href="/contact" className="hover:text-[#D7CBBB] transition-colors">Client Concierge</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

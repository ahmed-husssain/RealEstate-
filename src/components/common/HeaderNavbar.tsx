'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import {
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  Building2,
  KeyRound,
  HardHat,
  Calculator,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { PublicSiteSettings, DEFAULT_SITE_SETTINGS } from '@/lib/db/settings';
import { cn } from '@/lib/utils';

export interface HeaderNavbarProps {
  siteSettings?: PublicSiteSettings;
}

export function HeaderNavbar({ siteSettings = DEFAULT_SITE_SETTINGS }: HeaderNavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Desktop active dropdowns
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile accordion state
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Floating Nav Container */}
        <div
          className={cn(
            'pointer-events-auto w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 relative',
            scrolled
              ? 'bg-[#fbf6f0]/95 backdrop-blur-xl border border-[#d8cebe] shadow-stratified'
              : 'bg-[#fbf6f0]/90 backdrop-blur-lg border border-[#d8cebe]/75 shadow-sm'
          )}
        >
          {/* Brand Logo */}
          <BrandLogo priority={true} imageClassName="h-8 sm:h-9" />

          {/* Desktop Navigation (Grouped Luxury Menus) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* 1. Home */}
            <Link
              href="/"
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                pathname === '/'
                  ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                  : 'text-[#1F1B16] hover:text-[#5c3822] hover:bg-[#d8cebe]/25'
              )}
            >
              Home
            </Link>

            {/* 2. Properties Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('properties')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'properties' ? null : 'properties')}
                className={cn(
                  'flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                  pathname.startsWith('/properties') || activeDropdown === 'properties'
                    ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                    : 'text-[#1F1B16] hover:text-[#5c3822] hover:bg-[#d8cebe]/25'
                )}
              >
                <span>Properties</span>
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', activeDropdown === 'properties' && 'rotate-180')} />
              </button>

              {/* Properties Dropdown Menu */}
              {activeDropdown === 'properties' && (
                <div className="absolute top-full left-0 mt-2 w-[23rem] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="space-y-1.5">
                    <Link
                      href="/properties?status=for-sale"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#e8dece]/60 transition-colors group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-xl bg-[#5c3822]/10 text-[#5c3822] shrink-0 mt-0.5">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                          Buy Property
                        </div>
                        <p className="text-[11px] text-[#7e7365] leading-snug">
                          Verified bangalows, houses, plots, and ready flats
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/properties?status=for-lease"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#e8dece]/60 transition-colors group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-xl bg-[#2e3a2f]/10 text-[#2e3a2f] shrink-0 mt-0.5">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors flex items-center gap-1.5">
                          <span>Rental Properties</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] font-bold">NEW</span>
                        </div>
                        <p className="text-[11px] text-[#7e7365] leading-snug">
                          Upper/lower portions, single houses & family apartments
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/properties?type=estate"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#e8dece]/60 transition-colors group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-xl bg-[#7e7365]/15 text-[#1F1B16] shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                          Plots & Commercial Land
                        </div>
                        <p className="text-[11px] text-[#7e7365] leading-snug">
                          80, 120, 240, 400 & 500 Gaz residential/commercial plots
                        </p>
                      </div>
                    </Link>

                    <div className="pt-2 border-t border-[#d8cebe]/60 mt-1">
                      <Link
                        href="/properties"
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#5c3822] hover:bg-[#5c3822]/10 transition-colors cursor-pointer"
                      >
                        <span>Browse All Karachi Active Listings</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className={cn(
                  'flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                  pathname === '/services' || pathname === '/valuation' || activeDropdown === 'services'
                    ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                    : 'text-[#1F1B16] hover:text-[#5c3822] hover:bg-[#d8cebe]/25'
                )}
              >
                <span>Services</span>
                <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', activeDropdown === 'services' && 'rotate-180')} />
              </button>

              {/* Services Dropdown Menu */}
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-[23rem] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="space-y-1.5">
                    <Link
                      href="/services"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#e8dece]/60 transition-colors group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-xl bg-[#5c3822]/10 text-[#5c3822] shrink-0 mt-0.5">
                        <HardHat className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                          Turnkey Construction & Builds
                        </div>
                        <p className="text-[11px] text-[#7e7365] leading-snug">
                          Gray structure, architectural drawings & modern turnkey houses
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/valuation"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#e8dece]/60 transition-colors group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-xl bg-[#2e3a2f]/10 text-[#2e3a2f] shrink-0 mt-0.5">
                        <Calculator className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors">
                          Property Price Calculator
                        </div>
                        <p className="text-[11px] text-[#7e7365] leading-snug">
                          Instant estimated market value for house, flat, or plot
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/services"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#e8dece]/60 transition-colors group cursor-pointer"
                    >
                      <div className="p-2.5 rounded-xl bg-[#7e7365]/15 text-[#1F1B16] shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                          Legal Due Diligence & SBCA
                        </div>
                        <p className="text-[11px] text-[#7e7365] leading-snug">
                          Map approvals, title registry checks & Sub-Registrar NOCs
                        </p>
                      </div>
                    </Link>

                    <div className="pt-2 border-t border-[#d8cebe]/60 mt-1">
                      <Link
                        href="/services"
                        className="flex items-center justify-between p-2 rounded-xl text-xs font-semibold text-[#5c3822] hover:bg-[#5c3822]/10 transition-colors cursor-pointer"
                      >
                        <span>Explore All 5 Construction Wings</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Karachi Areas */}
            <Link
              href="/neighborhoods"
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                pathname.startsWith('/neighborhoods')
                  ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                  : 'text-[#1F1B16] hover:text-[#5c3822] hover:bg-[#d8cebe]/25'
              )}
            >
              Karachi Areas
            </Link>

            {/* 5. About */}
            <Link
              href="/about"
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                pathname === '/about'
                  ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                  : 'text-[#1F1B16] hover:text-[#5c3822] hover:bg-[#d8cebe]/25'
              )}
            >
              About
            </Link>

            {/* 6. Contact Office */}
            <Link
              href="/contact"
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer',
                pathname === '/contact'
                  ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                  : 'text-[#1F1B16] hover:text-[#5c3822] hover:bg-[#d8cebe]/25'
              )}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick WhatsApp Pill (Visible on Mobile & Desktop) */}
            <a
              href={`https://wa.me/${siteSettings.whatsapp_clean}?text=${encodeURIComponent(
                'Assalam o Alaikum Amber Property Corner, I would like to inquire about your prime properties and construction services.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#1F1B16] text-xs font-medium hover:bg-[#22c55e]/25 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#16a34a]" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Call / Contact CTA */}
            <Link href="/contact">
              <Button variant="primary" size="sm" className="text-xs py-1.5 px-3 sm:px-4 cursor-pointer">
                <PhoneCall className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Contact Office</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-[#1F1B16] bg-[#e8dece]/50 hover:bg-[#d8cebe] transition-colors cursor-pointer border border-[#d8cebe]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu (Touch & Thumb Optimized Accordions) */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto lg:hidden mt-2 max-w-7xl mx-auto bg-[#fbf6f0] border border-[#d8cebe] rounded-[2rem] p-5 shadow-2xl animate-in slide-in-from-top-3 duration-200 max-h-[82vh] overflow-y-auto">
          <nav className="space-y-2">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-[#1F1B16] hover:bg-[#d8cebe]/30"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-[#7e7365]" />
            </Link>

            {/* Accordion 1: Properties */}
            <div className="border border-[#d8cebe]/70 rounded-2xl overflow-hidden bg-white/70">
              <button
                type="button"
                onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
                className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-[#1F1B16] text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#5c3822]" />
                  <span>Properties & Rentals</span>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-[#7e7365] transition-transform', mobilePropertiesOpen && 'rotate-180')} />
              </button>

              {mobilePropertiesOpen && (
                <div className="p-3 pt-0 space-y-1.5 border-t border-[#d8cebe]/50 bg-[#fbf6f0]/50">
                  <Link
                    href="/properties?status=for-sale"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-medium text-[#1F1B16] hover:bg-[#e8dece]"
                  >
                    🏡 Buy Property (Houses, Plots, Flats)
                  </Link>
                  <Link
                    href="/properties?status=for-lease"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-medium text-[#2e3a2f] bg-[#2e3a2f]/10"
                  >
                    🔑 Rent Properties (Portions & Houses)
                  </Link>
                  <Link
                    href="/properties?type=estate"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-medium text-[#1F1B16] hover:bg-[#e8dece]"
                  >
                    📍 Plots & Commercial Land
                  </Link>
                  <Link
                    href="/properties"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-semibold text-[#5c3822] hover:underline"
                  >
                    Explore All Listings &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion 2: Services */}
            <div className="border border-[#d8cebe]/70 rounded-2xl overflow-hidden bg-white/70">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-[#1F1B16] text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-[#5c3822]" />
                  <span>Construction & Services</span>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-[#7e7365] transition-transform', mobileServicesOpen && 'rotate-180')} />
              </button>

              {mobileServicesOpen && (
                <div className="p-3 pt-0 space-y-1.5 border-t border-[#d8cebe]/50 bg-[#fbf6f0]/50">
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-medium text-[#1F1B16] hover:bg-[#e8dece]"
                  >
                    🏗️ Turnkey Construction & Gray Structure
                  </Link>
                  <Link
                    href="/valuation"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-medium text-[#2e3a2f] bg-[#2e3a2f]/10"
                  >
                    📊 Property Price Calculator (Free Estimate)
                  </Link>
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-2.5 rounded-lg text-xs font-medium text-[#1F1B16] hover:bg-[#e8dece]"
                  >
                    📑 SBCA Map Approvals & Title Verification
                  </Link>
                </div>
              )}
            </div>

            {/* Karachi Areas */}
            <Link
              href="/neighborhoods"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-[#1F1B16] hover:bg-[#d8cebe]/30"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#5c3822]" />
                <span>Karachi Areas Guide</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#7e7365]" />
            </Link>

            {/* About */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-[#1F1B16] hover:bg-[#d8cebe]/30"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#5c3822]" />
                <span>About Our Agency</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#7e7365]" />
            </Link>

            {/* Quick 1-Tap Mobile Action Cards */}
            <div className="pt-3 grid grid-cols-2 gap-2.5 border-t border-[#d8cebe] mt-2">
              <a
                href={`https://wa.me/${siteSettings.whatsapp_clean}?text=${encodeURIComponent(
                  'Assalam o Alaikum Amber Property Corner, I need assistance.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#1F1B16] text-center gap-1 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-[#16a34a]" />
                <span className="text-xs font-bold text-[#16a34a]">WhatsApp</span>
                <span className="text-[10px] text-[#7e7365] truncate max-w-[120px]">{siteSettings.whatsapp_number}</span>
              </a>

              <a
                href={`tel:${siteSettings.whatsapp_clean}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#5c3822]/10 border border-[#5c3822]/30 text-[#1F1B16] text-center gap-1 cursor-pointer"
              >
                <Phone className="w-5 h-5 text-[#5c3822]" />
                <span className="text-xs font-bold text-[#5c3822]">Call Office</span>
                <span className="text-[10px] text-[#7e7365] truncate max-w-[120px]">{siteSettings.phone_primary}</span>
              </a>
            </div>

            {/* Contact Office Page Link */}
            <div className="pt-1">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full text-xs cursor-pointer">
                  Visit Head Office &rarr;
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

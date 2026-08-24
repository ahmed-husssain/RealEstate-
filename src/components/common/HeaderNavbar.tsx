'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Menu, X, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeaderNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Areas', href: '/neighborhoods' },
    { name: 'Price Calculator', href: '/valuation' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Floating Nav Container */}
        <div
          className={cn(
            'pointer-events-auto w-full flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300',
            scrolled
              ? 'bg-[#fbf6f0]/95 backdrop-blur-xl border border-[#d8cebe] shadow-stratified'
              : 'bg-[#fbf6f0]/85 backdrop-blur-lg border border-[#d8cebe]/70 shadow-sm'
          )}
        >
          {/* Brand Logo */}
          <BrandLogo priority={true} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer',
                    isActive
                      ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                      : 'text-[#1F1B16] hover:text-[#5c3822] hover:bg-[#d8cebe]/25'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Consultation CTA */}
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button variant="primary" size="sm" className="text-xs">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-[#1F1B16] hover:bg-[#d8cebe]/30 transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-3 max-w-7xl mx-auto bg-[#fbf6f0] border border-[#d8cebe] rounded-[2rem] p-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[#5c3822]/10 text-[#5c3822] font-semibold'
                    : 'text-[#1F1B16] hover:bg-[#d8cebe]/20'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#d8cebe]/50 mt-1">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

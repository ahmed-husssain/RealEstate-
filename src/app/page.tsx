import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { SearchFilterBar } from '@/components/properties/SearchFilterBar';
import { BrowsePropertiesMatrix } from '@/components/properties/BrowsePropertiesMatrix';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { GlassCard } from '@/ui/GlassCard';
import { getProperties } from '@/lib/db/properties';
import { getAreas } from '@/lib/db/areas';
import { mapDbPropertyToProperty, mapDbAreaToNeighborhood } from '@/lib/db/mappers';
import {
  ArrowUpRight,
  ShieldCheck,
  Building2,
  HardHat,
  Scale,
  Sparkles,
  Droplets,
  CheckCircle2,
  Calculator,
  Compass,
  PhoneCall,
} from 'lucide-react';
import { getPublicSiteSettings } from '@/lib/db/settings';

export const revalidate = 60;

export default async function HomePage() {
  const [dbProperties, dbAreas, siteSettings] = await Promise.all([
    getProperties({ limit: 6 }),
    getAreas(),
    getPublicSiteSettings(),
  ]);

  const properties = dbProperties.map(mapDbPropertyToProperty);
  const neighborhoods = dbAreas.map(mapDbAreaToNeighborhood);

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 3);
  const secondaryProperties = properties.filter((p) => !p.isFeatured).slice(0, 3);
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : properties.slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. High-Converting Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-6 space-y-8">
        {/* Above-The-Fold Value Header */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Trust Authority Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fbf6f0] border border-[#d8cebe] rounded-full py-1.5 px-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2e3a2f]" />
            <span className="text-xs font-mono font-medium text-[#5c3822] uppercase tracking-wider">
              Amber Property Corner • Real Estate & Construction
            </span>
          </div>

          {/* High-Impact Outcome Headline */}
          <h1 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl leading-[1.12] text-[#1F1B16] tracking-tight">
            {siteSettings.hero_headline || 'Buy, Sell & Build Verified Properties in Karachi'}
          </h1>

          {/* Outcome & Risk-Reducer Subtitle */}
          <p className="text-sm sm:text-lg text-[#7e7365] max-w-2xl mx-auto font-sans leading-relaxed">
            {siteSettings.hero_subtitle || 'Verified houses (80 to 1000 Gaz), plots, SBCA map approvals, turnkey house construction, and seepage (سیم) solutions in North Nazimabad, Gulshan, FB Area, and Scheme 33.'}
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/properties">
              <Button variant="primary" size="lg" className="text-xs sm:text-sm shadow-md cursor-pointer">
                <span>Browse Verified Properties</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/valuation">
              <Button variant="secondary" size="lg" className="text-xs sm:text-sm bg-white cursor-pointer">
                <Calculator className="w-4 h-4 mr-1 text-[#5c3822]" />
                <span>Free Property Price Calculator</span>
              </Button>
            </Link>
          </div>

          {/* Micro-Trust Signals */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-[#7e7365]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e3a2f]" /> 100% Clean Registry Papers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e3a2f]" /> SBCA Approved Building Maps
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e3a2f]" /> 15+ Years Karachi Experience
            </span>
          </div>
        </div>

        {/* Primary Interactive Search Filter Bar */}
        <div className="max-w-5xl mx-auto text-left">
          <SearchFilterBar />
        </div>

        {/* Above-The-Fold Quick Services Navigation Matrix */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#fbf6f0]/95 border border-[#d8cebe] rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#d8cebe]/60 mb-3">
              <span className="text-xs font-mono font-medium text-[#1F1B16] uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#5c3822]" />
                Quick Services
              </span>
              <Link href="/services" className="text-xs font-mono text-[#5c3822] hover:underline flex items-center gap-1">
                View All 5 Departments <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              <Link
                href="/services"
                className="group p-3 rounded-xl bg-white border border-[#d8cebe] hover:border-[#5c3822] hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="font-display font-medium text-xs text-[#1F1B16] group-hover:text-[#5c3822] transition-colors leading-snug block">
                    Houses & Plots for Sale
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7e7365] group-hover:text-[#5c3822] mt-2 block">
                  80–1000 Gaz →
                </span>
              </Link>

              <Link
                href="/services"
                className="group p-3 rounded-xl bg-white border border-[#d8cebe] hover:border-[#2e3a2f] hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <span className="font-display font-medium text-xs text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors leading-snug block">
                    SBCA Map & Registry Check
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7e7365] group-hover:text-[#2e3a2f] mt-2 block">
                  Legal Approvals →
                </span>
              </Link>

              <Link
                href="/services"
                className="group p-3 rounded-xl bg-white border border-[#d8cebe] hover:border-[#5c3822] hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center">
                    <HardHat className="w-4 h-4" />
                  </div>
                  <span className="font-display font-medium text-xs text-[#1F1B16] group-hover:text-[#5c3822] transition-colors leading-snug block">
                    House Construction
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7e7365] group-hover:text-[#5c3822] mt-2 block">
                  Gray & Finish →
                </span>
              </Link>

              <Link
                href="/services"
                className="group p-3 rounded-xl bg-white border border-[#d8cebe] hover:border-[#847666] hover:shadow-sm transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#847666]/15 text-[#1F1B16] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-display font-medium text-xs text-[#1F1B16] group-hover:text-[#5c3822] transition-colors leading-snug block">
                    Kitchen & Bath Renovation
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7e7365] group-hover:text-[#5c3822] mt-2 block">
                  Modern Interiors →
                </span>
              </Link>

              <Link
                href="/services"
                className="group p-3 rounded-xl bg-white border border-[#d8cebe] hover:border-[#2e3a2f] hover:shadow-sm transition-all text-left flex flex-col justify-between col-span-2 sm:col-span-1"
              >
                <div className="space-y-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <span className="font-display font-medium text-xs text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors leading-snug block">
                    Waterproofing & Seepage (سیم)
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7e7365] group-hover:text-[#2e3a2f] mt-2 block">
                  Permanent Fix →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Karachi Property Explorer & Categorical Matrix */}
      <BrowsePropertiesMatrix />

      {/* 3. Featured Exclusive Residences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#d8cebe]/60 pb-5">
          <div className="space-y-1">
            <Badge variant="moss" size="sm">
              Featured Listings
            </Badge>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
              Featured Properties in Karachi
            </h2>
            <p className="text-xs sm:text-sm text-[#7e7365]">
              Handpicked houses, flats, and plots with complete details and clean ownership papers.
            </p>
          </div>
          <Link href="/properties">
            <Button variant="secondary" size="md" className="cursor-pointer">
              <span>View All Properties ({properties.length})</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* 3-Column Listing Grid */}
        {displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property, idx) => (
              <PropertyCard key={property.id} property={property} priority={idx === 0} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl text-xs text-[#7e7365]">
            Currently updating verified listings in North Nazimabad, Gulshan, and Scheme 33.
          </div>
        )}
      </section>

      {/* 3. Comprehensive Five Service Wings (Detailed Bento Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="container"
          rounded="2rem"
          className="p-6 sm:p-10 space-y-8 bg-[#fbf6f0]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <Badge variant="exclusive" size="sm">
                All-in-One Real Estate Services
              </Badge>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
                5 Complete Real Estate & Construction Departments
              </h2>
              <p className="text-xs sm:text-sm text-[#7e7365]">
                From verified land purchasing and SBCA map approvals to full house construction, room renovation, and permanent seepage solutions.
              </p>
            </div>
            <Link href="/services">
              <Button variant="secondary" size="md" className="cursor-pointer">
                <span>View All Services</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#d8cebe]/60">
            <Link href="/services" className="group">
              <div className="bg-white hover:border-[#5c3822] border border-[#d8cebe] rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#7e7365]">01</span>
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                    Property Buying, Selling & Plots
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Houses (80–1000 Gaz), open plots, apartments, and commercial shops across prime areas in Karachi.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#5c3822] pt-2 block font-medium">Learn More &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group">
              <div className="bg-white hover:border-[#2e3a2f] border border-[#d8cebe] rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center">
                      <Scale className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#7e7365]">02</span>
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors">
                    SBCA Map Approvals & Registry Check
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Registry and file verification, SBCA layout map approval, demolition NOCs, and transfer clearances.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#2e3a2f] pt-2 block font-medium">Learn More &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group">
              <div className="bg-white hover:border-[#5c3822] border border-[#d8cebe] rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center">
                      <HardHat className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#7e7365]">03</span>
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                    Turnkey House Construction
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Complete house construction (80 to 1000 Gaz), gray structure, safe building demolition, Grade-60 steel, and modern front elevations.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#5c3822] pt-2 block font-medium">Learn More &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group">
              <div className="bg-white hover:border-[#847666] border border-[#d8cebe] rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#847666]/15 text-[#1F1B16] flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#7e7365]">04</span>
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                    Kitchen, Bathroom & Room Renovation
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Modern modular kitchens, executive Italian tile bathrooms, gypsum false ceilings, and wooden media walls.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#847666] pt-2 block font-medium">Learn More &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group sm:col-span-2 lg:col-span-2">
              <div className="bg-white hover:border-[#2e3a2f] border border-[#d8cebe] rounded-2xl p-5 space-y-3 shadow-xs hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#7e7365]">05</span>
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors">
                    Waterproofing, Seepage (سیم) & Plumbing Solutions
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Permanent roof and wall chemical waterproofing (*seem* solution), solar wiring setup, and durable plumbing line replacement.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#2e3a2f] pt-2 block font-medium">Learn More &rarr;</span>
              </div>
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* 4. Popular Karachi Neighborhoods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#d8cebe]/60 pb-5">
          <div className="space-y-1">
            <Badge variant="stone" size="sm">
              Neighborhoods
            </Badge>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
              Popular Karachi Areas
            </h2>
            <p className="text-xs sm:text-sm text-[#7e7365]">
              Explore top neighborhoods, average market rates, and available properties.
            </p>
          </div>
          <Link href="/neighborhoods">
            <Button variant="secondary" size="md" className="cursor-pointer">
              <span>View All Areas</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        {/* Target Karachi Neighborhood Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {neighborhoods.slice(0, 8).map((neighborhood) => (
            <Link
              key={neighborhood.id}
              href={`/neighborhoods/${neighborhood.slug}`}
              className="group cursor-pointer"
            >
              <GlassCard
                variant="interactive"
                rounded="1.75rem"
                className="overflow-hidden flex flex-col h-full bg-[#fbf6f0]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e5decb]">
                  <Image
                    src={neighborhood.heroImage}
                    alt={neighborhood.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3">
                    <span className="font-mono text-[10px] uppercase text-[#F8F4ED]/80">
                      {neighborhood.city}
                    </span>
                    <h3 className="font-display font-medium text-lg text-[#F8F4ED]">
                      {neighborhood.name}
                    </h3>
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2 bg-[#fbf6f0]">
                  <p className="text-xs text-[#7e7365] line-clamp-2">
                    {neighborhood.tagline}
                  </p>
                  <div className="pt-2 border-t border-[#d8cebe]/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7e7365]">Avg Rate</span>
                    <span className="font-semibold text-[#1F1B16]">
                      {neighborhood.stats.avgPriceSqFt}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. More Listings */}
      {secondaryProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-5">
            <div>
              <Badge variant="stone" size="sm">
                More Listings
              </Badge>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16] mt-1">
                Recently Added Properties
              </h2>
            </div>
            <Link href="/properties">
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#5c3822] hover:underline flex items-center gap-1">
                Explore All <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      )}

      {/* 6. Valuation & Direct Advisory Conversion Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="card"
          rounded="2rem"
          className="relative overflow-hidden p-6 sm:p-10 bg-[#fbf6f0] border border-[#d8cebe] shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <Badge variant="exclusive" size="sm">
                Free Price Estimate
              </Badge>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
                Want to Know the Current Market Price of Your Property?
              </h2>
              <p className="text-xs sm:text-sm text-[#7e7365] max-w-xl leading-relaxed">
                Calculate your house, flat, or plot value based on real Karachi area rates, or speak directly with our senior advisor for a free on-site visit.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <Link href="/valuation" className="w-full">
                <Button variant="primary" size="lg" className="w-full text-xs sm:text-sm cursor-pointer shadow-sm">
                  <Calculator className="w-4 h-4 mr-1.5" />
                  <span>Calculate Property Price</span>
                </Button>
              </Link>
              <Link href="/contact" className="w-full">
                <Button variant="secondary" size="lg" className="w-full text-xs sm:text-sm bg-white cursor-pointer">
                  <PhoneCall className="w-4 h-4 mr-1.5 text-[#5c3822]" />
                  <span>Speak With Senior Advisor</span>
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

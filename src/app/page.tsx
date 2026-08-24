import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockProperties } from '@/data/mockProperties';
import { mockNeighborhoods } from '@/data/neighborhoods';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { SearchFilterBar } from '@/components/properties/SearchFilterBar';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { GlassCard } from '@/ui/GlassCard';
import { getProperties } from '@/lib/db/properties';
import { getAreas } from '@/lib/db/areas';
import { mapDbPropertyToProperty, mapDbAreaToNeighborhood } from '@/lib/db/mappers';
import {
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Hammer,
  CheckCircle2,
} from 'lucide-react';

import { getPublicSiteSettings } from '@/lib/db/settings';

export const revalidate = 60;

export default async function HomePage() {
  const [dbProperties, dbAreas, siteSettings] = await Promise.all([
    getProperties({ limit: 6 }),
    getAreas(),
    getPublicSiteSettings(),
  ]);

  const properties = dbProperties.length > 0
    ? dbProperties.map(mapDbPropertyToProperty)
    : mockProperties;

  const neighborhoods = dbAreas.length > 0
    ? dbAreas.map(mapDbAreaToNeighborhood)
    : mockNeighborhoods;

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 3);
  const secondaryProperties = properties.filter((p) => !p.isFeatured).slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* Announcement Banner (if active) */}
      {siteSettings.announcement_active && siteSettings.announcement_banner && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-2">
          <div className="bg-[#5c3822]/10 border border-[#5c3822]/20 rounded-full py-2 px-4 text-center text-xs font-medium text-[#5c3822] flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5c3822] animate-pulse shrink-0" />
            <span>{siteSettings.announcement_banner}</span>
          </div>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          {/* Label Chip */}
          <div className="flex items-center justify-center gap-2">
            <Badge variant="exclusive" size="md">
              Amber Property Corner
            </Badge>
            <Badge variant="stone" size="md">
              Real Estate & Construction
            </Badge>
          </div>

          {/* Dynamic Direct Headline */}
          <h1 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl leading-tight text-[#1F1B16] tracking-tight">
            {siteSettings.hero_headline}
          </h1>

          {/* Dynamic Subtitle */}
          <p className="text-sm sm:text-base text-[#7e7365] max-w-2xl mx-auto font-sans leading-relaxed">
            {siteSettings.hero_subtitle}
          </p>

          {/* Search Filter Bar Component */}
          <div className="pt-4 text-left">
            <SearchFilterBar />
          </div>

          {/* Trust Metrics Ribbon */}
          <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#fbf6f0]/90 border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-lg sm:text-xl text-[#1F1B16]">
                500+ Sq Yd
              </span>
              <p className="text-[11px] font-mono text-[#7e7365] mt-0.5">
                Luxury Houses
              </p>
            </div>
            <div className="bg-[#fbf6f0]/90 border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-lg sm:text-xl text-[#1F1B16]">
                North & Central
              </span>
              <p className="text-[11px] font-mono text-[#7e7365] mt-0.5">
                Prime Sectors
              </p>
            </div>
            <div className="bg-[#fbf6f0]/90 border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-lg sm:text-xl text-[#2e3a2f]">
                100% Verified
              </span>
              <p className="text-[11px] font-mono text-[#7e7365] mt-0.5">
                Clean Title Deeds
              </p>
            </div>
            <div className="bg-[#fbf6f0]/90 border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-lg sm:text-xl text-[#5c3822]">
                Full Service
              </span>
              <p className="text-[11px] font-mono text-[#7e7365] mt-0.5">
                Build & Renovate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Exclusive Residences */}
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
              Handpicked luxury houses and apartments with complete details and verified documents.
            </p>
          </div>
          <Link href="/properties">
            <Button variant="secondary" size="md">
              <span>View All Properties ({properties.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* 3-Column Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, idx) => (
            <PropertyCard key={property.id} property={property} priority={idx === 0} />
          ))}
        </div>
      </section>

      {/* 3. Five Core Service Departments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="container"
          rounded="2rem"
          className="p-6 sm:p-10 space-y-8 bg-[#fbf6f0]"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <Badge variant="exclusive" size="sm">
                Amber Property Corner
              </Badge>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
                5 Complete Real Estate & Construction Wings
              </h2>
              <p className="text-xs sm:text-sm text-[#7e7365]">
                From verified land acquisition and SBCA map approvals to turnkey construction and permanent seepage solutions.
              </p>
            </div>
            <Link href="/services">
              <Button variant="secondary" size="md">
                <span>View Full Service Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#d8cebe]/60">
            <Link href="/services" className="group">
              <div className="bg-white/80 hover:bg-white border border-[#d8cebe] group-hover:border-[#5c3822] rounded-2xl p-5 space-y-2 shadow-sm transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                    Sales & Commercial Investments
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Houses (80–1000 Gaz), residential/commercial plots, apartments, and high-yield commercial assets in Karachi.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#5c3822] pt-2 block">Learn more &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group">
              <div className="bg-white/80 hover:bg-white border border-[#d8cebe] group-hover:border-[#2e3a2f] rounded-2xl p-5 space-y-2 shadow-sm transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors">
                    Legal Vetting & Map Approvals
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Title check (Registry, Mutation), SBCA layout sanctioning, demolition NOCs, and Cantonment Board clearances.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#2e3a2f] pt-2 block">Learn more &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group">
              <div className="bg-white/80 hover:bg-white border border-[#d8cebe] group-hover:border-[#5c3822] rounded-2xl p-5 space-y-2 shadow-sm transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                    Turnkey House Construction
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Turnkey bungalow rebuilds (80 to 1000 Gaz), gray structure, controlled demolition, and modern facade redesign.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#5c3822] pt-2 block">Learn more &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group">
              <div className="bg-white/80 hover:bg-white border border-[#d8cebe] group-hover:border-[#847666] rounded-2xl p-5 space-y-2 shadow-sm transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#847666]/15 text-[#1F1B16] flex items-center justify-center font-mono font-bold text-xs">
                    04
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#5c3822] transition-colors">
                    Room-by-Room Interior Remodel
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Modular German-style kitchens, executive Italian-tiled bathrooms, false ceiling lighting, and media walls.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#847666] pt-2 block">Learn more &rarr;</span>
              </div>
            </Link>

            <Link href="/services" className="group sm:col-span-2 lg:col-span-2">
              <div className="bg-white/80 hover:bg-white border border-[#d8cebe] group-hover:border-[#2e3a2f] rounded-2xl p-5 space-y-2 shadow-sm transition-all h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center font-mono font-bold text-xs">
                    05
                  </div>
                  <h3 className="font-display font-medium text-base text-[#1F1B16] group-hover:text-[#2e3a2f] transition-colors">
                    Specialized Remedial & Infrastructure Solutions
                  </h3>
                  <p className="text-xs text-[#7e7365] leading-relaxed">
                    Roof and wall seepage (*seem*) chemical waterproofing, RCC underground water tank relining, solar wiring, PPRC plumbing replacement, and termite (*deemak*) barriers.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-[#2e3a2f] pt-2 block">Learn more &rarr;</span>
              </div>
            </Link>
          </div>
        </GlassCard>
      </section>

      {/* 4. Popular Areas & Enclaves */}
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
              Explore top neighborhoods, average market rates, and available homes.
            </p>
          </div>
          <Link href="/neighborhoods">
            <Button variant="secondary" size="md">
              <span>View All Areas</span>
              <ArrowUpRight className="w-4 h-4" />
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

      {/* 6. Valuation & Contact Banner */}
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
                Want to know the current market value of your property?
              </h2>
              <p className="text-xs sm:text-sm text-[#7e7365] max-w-xl leading-relaxed">
                Use our quick online calculator or get in touch with our team for an on-site property evaluation.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <Link href="/valuation" className="w-full">
                <Button variant="primary" size="lg" className="w-full text-xs sm:text-sm">
                  Calculate Property Price
                </Button>
              </Link>
              <Link href="/contact" className="w-full">
                <Button variant="secondary" size="lg" className="w-full text-xs sm:text-sm">
                  Contact Our Office
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

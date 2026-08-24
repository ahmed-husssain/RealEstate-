import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockProperties } from '@/data/mockProperties';
import { mockNeighborhoods } from '@/data/neighborhoods';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { SearchFilterBar } from '@/components/properties/SearchFilterBar';
import { TextReveal } from '@/ui/TextReveal';
import { Button } from '@/ui/Button';
import { Badge } from '@/ui/Badge';
import { GlassCard } from '@/ui/GlassCard';
import {
  ArrowUpRight,
  Shield,
  Compass,
  Sparkles,
  KeyRound,
  TrendingUp,
  Award,
  ChevronRight,
  Building2,
} from 'lucide-react';

export default function HomePage() {
  const featuredProperties = mockProperties.filter((p) => p.isFeatured).slice(0, 3);
  const secondaryProperties = mockProperties.filter((p) => !p.isFeatured).slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-12">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Label Chip */}
          <div className="flex items-center justify-center gap-2">
            <Badge variant="exclusive" size="md">
              The Amber Standard
            </Badge>
            <Badge variant="stone" size="md" className="hidden sm:inline-flex">
              Estates & Architecture
            </Badge>
          </div>

          {/* Display-LG Headline with Word Reveal */}
          <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-[68px] leading-[1.04] text-[#1F1B16] tracking-tight">
            Architectural Precision. <br className="hidden sm:inline" />
            <span className="italic font-serif font-normal text-[#5c3822]">
              Timeless
            </span>{' '}
            Proportions.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#7e7365] max-w-2xl mx-auto font-sans leading-relaxed">
            Representing the world’s most distinguished private estates, sky penthouses, and bespoke coastal residences with uncompromised discretion.
          </p>

          {/* Search Filter Bar Component */}
          <div className="pt-6 sm:pt-8 text-left">
            <SearchFilterBar />
          </div>

          {/* Trust Metrics Ribbon */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-[#fbf6f0]/80 backdrop-blur-md border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16]">
                $1.4B+
              </span>
              <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#7e7365] mt-0.5">
                Curated Portfolio
              </p>
            </div>
            <div className="bg-[#fbf6f0]/80 backdrop-blur-md border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16]">
                45+
              </span>
              <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#7e7365] mt-0.5">
                Off-Market Mandates
              </p>
            </div>
            <div className="bg-[#fbf6f0]/80 backdrop-blur-md border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16]">
                18 Days
              </span>
              <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#7e7365] mt-0.5">
                Avg Prime Contract
              </p>
            </div>
            <div className="bg-[#fbf6f0]/80 backdrop-blur-md border border-[#d8cebe] rounded-2xl py-3 px-4 shadow-sm">
              <span className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16]">
                100%
              </span>
              <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#7e7365] mt-0.5">
                Discretion Index
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Exclusive Residences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#d8cebe]/60 pb-6">
          <div className="space-y-1.5">
            <Badge variant="moss" size="sm">
              Curated Inventory
            </Badge>
            <h2 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
              Featured Prime Residences
            </h2>
            <p className="text-xs sm:text-sm text-[#7e7365]">
              Architectural masterpieces selected for exceptional material integrity and site prominence.
            </p>
          </div>
          <Link href="/properties">
            <Button variant="secondary" size="md">
              <span>View All Properties ({mockProperties.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* 3-Column Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProperties.map((property, idx) => (
            <PropertyCard key={property.id} property={property} priority={idx === 0} />
          ))}
        </div>
      </section>

      {/* 3. Architectural Philosophy & Stratified Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="container"
          rounded="2rem"
          className="p-8 sm:p-12 lg:p-16 space-y-12"
        >
          <div className="max-w-3xl space-y-3">
            <Badge variant="exclusive" size="sm">
              Architectural Philosophy
            </Badge>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#1F1B16]">
              Real estate evaluated not by square footage alone, but by architectural resonance.
            </h2>
            <p className="text-sm text-[#7e7365] leading-relaxed">
              Every residence represented by Amber Property Corner undergoes a rigorous evaluation of spatial volume, natural light trajectory, material honesty, and neighborhood context.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#d8cebe]/60">
            <div className="bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                Proportion & Light
              </h3>
              <p className="text-xs text-[#7e7365] leading-relaxed">
                Prioritizing double-height volumes, unobstructed orientation toward natural light paths, and seamless indoor-outdoor transitions.
              </p>
            </div>

            <div className="bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                Material Integrity
              </h3>
              <p className="text-xs text-[#7e7365] leading-relaxed">
                Celebrating authentic masonry, honed travertine, fluted architectural bronze, and sustainably harvested quarter-sawn hardwoods.
              </p>
            </div>

            <div className="bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-6 space-y-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#847666]/15 text-[#1F1B16] flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                Private Discretion
              </h3>
              <p className="text-xs text-[#7e7365] leading-relaxed">
                White-glove advisory and strict non-disclosure protocols protecting the privacy of ultra-high-net-worth principals and family offices.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 4. Curated Enclaves & Neighborhood Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#d8cebe]/60 pb-6">
          <div className="space-y-1.5">
            <Badge variant="stone" size="sm">
              Geographic Intelligence
            </Badge>
            <h2 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
              Curated Metropolitan Enclaves
            </h2>
            <p className="text-xs sm:text-sm text-[#7e7365]">
              In-depth architectural neighborhood guides, market metrics, and lifestyle context.
            </p>
          </div>
          <Link href="/neighborhoods">
            <Button variant="secondary" size="md">
              <span>View All Enclaves</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* 4 Neighborhood Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockNeighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.id}
              href={`/neighborhoods/${neighborhood.slug}`}
              className="group cursor-pointer"
            >
              <GlassCard
                variant="interactive"
                rounded="1.75rem"
                className="overflow-hidden flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e5decb]">
                  <Image
                    src={neighborhood.heroImage}
                    alt={neighborhood.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 inset-x-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#F8F4ED]/80">
                      {neighborhood.city}
                    </span>
                    <h3 className="font-display font-medium text-xl text-[#F8F4ED]">
                      {neighborhood.name}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#fbf6f0]">
                  <p className="text-xs text-[#7e7365] line-clamp-2 leading-relaxed">
                    {neighborhood.tagline}
                  </p>
                  <div className="pt-2 border-t border-[#d8cebe]/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7e7365]">Avg Sq Ft</span>
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

      {/* 5. Additional Curated Portfolio Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-6">
          <div>
            <Badge variant="stone" size="sm">
              Expanded Portfolio
            </Badge>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16] mt-1 tracking-tight">
              Metropolitan Lofts & Historic Manors
            </h2>
          </div>
          <Link href="/properties">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#5c3822] hover:underline flex items-center gap-1">
              Explore All <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {secondaryProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 6. Valuation & Private Advisory Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlassCard
          variant="card"
          rounded="2rem"
          className="relative overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-[#fbf6f0] via-[#f5efe6] to-[#ece3d5] border border-[#d8cebe] shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="exclusive" size="sm">
                Private Advisory
              </Badge>
              <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#1F1B16] tracking-tight">
                Contemplating the acquisition or divestment of a landmark residence?
              </h2>
              <p className="text-xs sm:text-sm text-[#7e7365] max-w-2xl leading-relaxed">
                Access our proprietary automated valuation model or request a bespoke confidential portfolio assessment from our Senior Partners.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link href="/valuation" className="w-full">
                <Button variant="primary" size="lg" className="w-full">
                  Instant Valuation Tool
                </Button>
              </Link>
              <Link href="/contact" className="w-full">
                <Button variant="secondary" size="lg" className="w-full">
                  Request Partner Meeting
                </Button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

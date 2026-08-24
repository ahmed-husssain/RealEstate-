import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAreaBySlug } from '@/lib/db/areas';
import { mapDbAreaToNeighborhood, mapDbPropertyToProperty } from '@/lib/db/mappers';
import { mockNeighborhoods } from '@/data/neighborhoods';
import { mockProperties } from '@/data/mockProperties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ArrowLeft, MapPin, CheckCircle, TrendingUp, ShieldCheck, Footprints, School, Train } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function SingleNeighborhoodPage(props: PageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const dbArea = await getAreaBySlug(slug);
  const neighborhood = dbArea
    ? mapDbAreaToNeighborhood(dbArea)
    : mockNeighborhoods.find((n) => n.slug === slug);

  if (!neighborhood) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display font-medium text-3xl text-[#1F1B16]">
          Neighborhood Profile Not Found
        </h1>
        <Link href="/neighborhoods">
          <Button variant="primary">View All Neighborhoods</Button>
        </Link>
      </div>
    );
  }

  const neighborhoodProperties = dbArea && dbArea.properties.length > 0
    ? dbArea.properties.map(mapDbPropertyToProperty)
    : mockProperties.filter(
        (p) =>
          p.location.neighborhood.toLowerCase().includes(neighborhood.name.toLowerCase()) ||
          neighborhood.name.toLowerCase().includes(p.location.neighborhood.toLowerCase())
      );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Back Link */}
      <Link
        href="/neighborhoods"
        className="inline-flex items-center gap-1 text-xs font-mono text-[#7e7365] hover:text-[#1F1B16] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> All Neighborhood Guides
      </Link>

      {/* Hero Banner Card */}
      <div className="relative aspect-[21/9] w-full rounded-[2rem] overflow-hidden border border-[#d8cebe] shadow-2xl bg-[#e5decb]">
        <Image
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/90 via-[#1F1B16]/40 to-transparent" />

        <div className="absolute bottom-6 sm:bottom-10 inset-x-6 sm:inset-x-10 text-[#F8F4ED] space-y-2 max-w-2xl">
          <Badge variant="exclusive" size="sm">
            {neighborhood.city} Metropolitan Profile
          </Badge>
          <h1 className="font-display font-medium text-3xl sm:text-5xl tracking-tight">
            {neighborhood.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#D7CBBB]">
            {neighborhood.tagline}
          </p>
        </div>
      </div>

      {/* District Intelligence Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] text-center space-y-1 shadow-sm">
          <TrendingUp className="w-5 h-5 mx-auto text-[#5c3822] mb-1" />
          <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Average Price</span>
          <span className="font-display font-medium text-xl text-[#1F1B16]">{neighborhood.stats.avgPriceSqFt} / Sq Ft</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] text-center space-y-1 shadow-sm">
          <ShieldCheck className="w-5 h-5 mx-auto text-[#2e3a2f] mb-1" />
          <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Annual Growth</span>
          <span className="font-display font-medium text-xl text-[#2e3a2f]">{neighborhood.stats.annualGrowth}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] text-center space-y-1 shadow-sm">
          <Footprints className="w-5 h-5 mx-auto text-[#5c3822] mb-1" />
          <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Walkability</span>
          <span className="font-display font-medium text-xl text-[#1F1B16]">{neighborhood.stats.walkScore}/100</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] text-center space-y-1 shadow-sm">
          <Train className="w-5 h-5 mx-auto text-[#5c3822] mb-1" />
          <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Safety Rating</span>
          <span className="font-display font-medium text-xl text-[#1F1B16]">{neighborhood.stats.safetyRating}</span>
        </div>
      </div>

      {/* Narrative & Lifestyle Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <h2 className="font-display font-medium text-2xl text-[#1F1B16]">
              Architectural & Cultural Context
            </h2>
            <p className="text-sm text-[#7e7365] leading-relaxed font-sans">
              {neighborhood.description}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#d8cebe]/60">
            <h3 className="font-display font-medium text-lg text-[#1F1B16]">
              Signature Enclave Highlights
            </h3>
            <div className="space-y-2.5">
              {neighborhood.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fbf6f0] border border-[#d8cebe]/70 text-xs">
                  <CheckCircle className="w-4 h-4 text-[#2e3a2f] shrink-0 mt-0.5" />
                  <span className="text-[#1F1B16]">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <GlassCard variant="card" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
            <Badge variant="stone" size="sm">Lifestyle Atmosphere</Badge>
            <div className="flex flex-wrap gap-2 pt-1">
              {neighborhood.lifestyleTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-full bg-[#f5efe6] border border-[#d8cebe] text-xs font-mono text-[#1F1B16]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-[#d8cebe]/60">
              <Link href="/contact" className="block">
                <Button variant="primary" size="md" className="w-full text-xs">
                  Schedule Private Enclave Tour
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Localized Available Listings */}
      <div className="space-y-6 pt-8 border-t border-[#d8cebe]/60">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Badge variant="moss" size="sm">Active Portfolios</Badge>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
              Available Residences in {neighborhood.name}
            </h2>
          </div>
          <span className="text-xs font-mono text-[#7e7365]">
            {neighborhoodProperties.length} Properties Represented
          </span>
        </div>

        {neighborhoodProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {neighborhoodProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl text-xs text-[#7e7365]">
            All public listings in this enclave are currently under NDA or in private contract. Contact our Senior Advisors for off-market access.
          </div>
        )}
      </div>
    </div>
  );
}

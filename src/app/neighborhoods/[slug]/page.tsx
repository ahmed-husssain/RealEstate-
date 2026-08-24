import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAreaBySlug } from '@/lib/db/areas';
import { mapDbAreaToNeighborhood, mapDbPropertyToProperty } from '@/lib/db/mappers';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ArrowLeft, TrendingUp, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export const revalidate = 60;

export default async function SingleNeighborhoodPage(props: PageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

  const dbArea = await getAreaBySlug(slug);

  if (!dbArea) {
    notFound();
  }

  const neighborhood = mapDbAreaToNeighborhood(dbArea);
  const neighborhoodProperties = (dbArea.properties || []).map(mapDbPropertyToProperty);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Back Link */}
      <Link
        href="/neighborhoods"
        className="inline-flex items-center gap-1 text-xs font-mono text-[#7e7365] hover:text-[#1F1B16] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to All Areas
      </Link>

      {/* Hero Banner Card */}
      <GlassCard
        variant="container"
        rounded="2rem"
        className="overflow-hidden p-0 relative min-h-[340px] sm:min-h-[420px] flex items-end bg-[#1F1B16]"
      >
        <Image
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16] via-[#1F1B16]/50 to-transparent" />

        <div className="relative p-6 sm:p-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="stone" size="sm" className="bg-white/20 text-[#F8F4ED] border-white/30 backdrop-blur-md">
              {neighborhood.city}
            </Badge>
            <Badge variant="exclusive" size="sm">
              Prime Karachi Enclave
            </Badge>
          </div>

          <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#F8F4ED] tracking-tight">
            {neighborhood.name}
          </h1>

          <p className="text-xs sm:text-sm text-[#D7CBBB] font-sans leading-relaxed">
            {neighborhood.description}
          </p>
        </div>
      </GlassCard>

      {/* Market Fundamentals Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard variant="card" rounded="1.75rem" className="p-5 flex items-center gap-4 bg-[#fbf6f0]">
          <div className="w-10 h-10 rounded-xl bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Average Rate / Sq Yd</span>
            <span className="font-display font-medium text-lg text-[#1F1B16]">{neighborhood.stats.avgPriceSqFt}</span>
          </div>
        </GlassCard>

        <GlassCard variant="card" rounded="1.75rem" className="p-5 flex items-center gap-4 bg-[#fbf6f0]">
          <div className="w-10 h-10 rounded-xl bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Title & Land Security</span>
            <span className="font-display font-medium text-lg text-[#2e3a2f]">{neighborhood.stats.safetyRating} Approved</span>
          </div>
        </GlassCard>

        <GlassCard variant="card" rounded="1.75rem" className="p-5 flex items-center gap-4 bg-[#fbf6f0]">
          <div className="w-10 h-10 rounded-xl bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#7e7365] block">5-Year Capital Growth</span>
            <span className="font-display font-medium text-lg text-[#1F1B16]">{neighborhood.stats.annualGrowth}</span>
          </div>
        </GlassCard>
      </div>

      {/* Highlights & Lifestyle Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <h2 className="font-display font-medium text-2xl text-[#1F1B16]">
              Enclave Character & Overview
            </h2>
            <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
              {neighborhood.description}
            </p>
          </div>

          {/* Key Advantages */}
          <div className="space-y-3 pt-4 border-t border-[#d8cebe]/60">
            <h3 className="font-display font-medium text-lg text-[#1F1B16]">
              Strategic Advantages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {neighborhood.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] text-xs flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2e3a2f] shrink-0 mt-0.5" />
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
                  className="px-3 py-1.5 rounded-full bg-white border border-[#d8cebe] text-xs font-mono text-[#1F1B16]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-[#d8cebe]/60">
              <Link href="/contact" className="block">
                <Button variant="primary" size="md" className="w-full text-xs">
                  Inquire About {neighborhood.name}
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Localized Available Listings */}
      <div className="space-y-5 pt-6 border-t border-[#d8cebe]/60">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Badge variant="moss" size="sm">Active Listings</Badge>
            <h2 className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16]">
              Available Properties in {neighborhood.name}
            </h2>
          </div>
          <span className="text-xs font-mono text-[#7e7365]">
            {neighborhoodProperties.length} Properties Found
          </span>
        </div>

        {neighborhoodProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl text-xs text-[#7e7365]">
            No public listings currently shown in this area. Contact our advisors for unlisted off-market plots and houses.
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockNeighborhoods } from '@/data/neighborhoods';
import { mockProperties } from '@/data/mockProperties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ArrowLeft, MapPin, CheckCircle, TrendingUp, ShieldCheck, Footprints, School, Train } from 'lucide-react';

export default function SingleNeighborhoodPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const neighborhood = mockNeighborhoods.find((n) => n.slug === slug);

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

  const neighborhoodProperties = mockProperties.filter(
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
      <div className="relative aspect-[21/9] min-h-[300px] w-full rounded-[2rem] overflow-hidden border border-[#d8cebe] shadow-2xl bg-[#e5decb]">
        <Image
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/90 via-[#1F1B16]/40 to-transparent" />
        
        <div className="absolute bottom-8 inset-x-8 max-w-3xl space-y-2 text-[#F8F4ED]">
          <Badge variant="exclusive" size="sm">
            {neighborhood.city}
          </Badge>
          <h1 className="font-display font-medium text-3xl sm:text-5xl tracking-tight">
            {neighborhood.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#D7CBBB] font-sans">
            {neighborhood.tagline}
          </p>
        </div>
      </div>

      {/* Overview & Key Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Narrative & Highlights */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h2 className="font-display font-medium text-2xl text-[#1F1B16]">
              District Profile & Context
            </h2>
            <p className="text-sm sm:text-base text-[#1F1B16]/90 leading-relaxed">
              {neighborhood.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <h3 className="font-display font-medium text-xl text-[#1F1B16]">
              Enclave Signature Highlights
            </h3>
            <div className="space-y-2.5">
              {neighborhood.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] text-xs font-sans text-[#1F1B16]"
                >
                  <CheckCircle className="w-4 h-4 text-[#5c3822] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Micro-Market Metrics Card */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-7 space-y-5">
            <Badge variant="stone" size="sm">Micro-Market Metrics</Badge>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex justify-between items-center py-2 border-b border-[#d8cebe]/60">
                <span className="text-[#7e7365]">Average Price / Sq Ft</span>
                <span className="font-mono font-bold text-[#1F1B16] text-sm">{neighborhood.stats.avgPriceSqFt}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#d8cebe]/60">
                <span className="text-[#7e7365]">12-Month Appreciation</span>
                <span className="font-mono font-bold text-[#2e3a2f] text-sm">{neighborhood.stats.annualGrowth}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#d8cebe]/60">
                <span className="text-[#7e7365]">Walkability Index</span>
                <span className="font-mono font-bold text-[#1F1B16] text-sm">{neighborhood.stats.walkScore} / 100</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-[#d8cebe]/60">
                <span className="text-[#7e7365]">Transit & Connectivity</span>
                <span className="font-mono font-bold text-[#1F1B16] text-sm">{neighborhood.stats.transitScore} / 100</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-[#7e7365]">Safety & Discretion</span>
                <span className="font-mono font-bold text-[#1F1B16] text-xs">{neighborhood.stats.safetyRating}</span>
              </div>
            </div>

            <Link href="/contact" className="block pt-2">
              <Button variant="primary" size="md" className="w-full text-xs">
                Request Private Enclave Report
              </Button>
            </Link>
          </GlassCard>
        </div>
      </div>

      {/* Localized Properties in this Neighborhood */}
      <div className="pt-10 border-t border-[#d8cebe]/60 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="moss" size="sm">Available Inventory</Badge>
            <h3 className="font-display font-medium text-2xl text-[#1F1B16] mt-1">
              Active Residences in {neighborhood.name}
            </h3>
          </div>
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="text-xs">
              View All Properties &rarr;
            </Button>
          </Link>
        </div>

        {neighborhoodProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoodProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] text-center text-xs text-[#7e7365]">
            Currently no active public listings in this enclave. Inquire for private off-market opportunities.
          </div>
        )}
      </div>
    </div>
  );
}

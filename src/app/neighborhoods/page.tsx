import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockNeighborhoods } from '@/data/neighborhoods';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { MapPin, TrendingUp, ShieldCheck, Footprints, ArrowUpRight } from 'lucide-react';

export default function NeighborhoodsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">Geographic Intelligence</Badge>
          <Badge variant="stone" size="sm">Metropolitan Enclaves</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Curated Enclaves & Districts
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-2xl leading-relaxed">
          Comprehensive neighborhood profiles, architectural histories, micro-market pricing trajectories, and private lifestyle intelligence.
        </p>
      </div>

      {/* Grid of Neighborhoods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockNeighborhoods.map((neighborhood) => (
          <GlassCard
            key={neighborhood.id}
            variant="interactive"
            rounded="2rem"
            className="overflow-hidden flex flex-col group bg-[#fbf6f0]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e5decb]">
              <Image
                src={neighborhood.heroImage}
                alt={neighborhood.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="stone" size="sm" className="bg-[#fbf6f0]/90 backdrop-blur-md">
                  {neighborhood.city}
                </Badge>
              </div>

              <div className="absolute bottom-4 inset-x-4">
                <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#F8F4ED]">
                  {neighborhood.name}
                </h2>
                <p className="text-xs text-[#D7CBBB] font-sans mt-0.5">
                  {neighborhood.tagline}
                </p>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
                {neighborhood.description}
              </p>

              {/* Lifestyle Tags */}
              <div className="flex flex-wrap gap-1.5">
                {neighborhood.lifestyleTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-full bg-[#f5efe6] border border-[#d8cebe] text-[11px] font-mono text-[#1F1B16]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#d8cebe]/60 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#f5efe6]">
                  <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Avg / Sq Ft</span>
                  <span className="font-mono font-bold text-[#1F1B16] text-sm">{neighborhood.stats.avgPriceSqFt}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f5efe6]">
                  <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Annual Growth</span>
                  <span className="font-mono font-bold text-[#2e3a2f] text-sm">{neighborhood.stats.annualGrowth}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#f5efe6]">
                  <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Walk Score</span>
                  <span className="font-mono font-bold text-[#1F1B16] text-sm">{neighborhood.stats.walkScore}/100</span>
                </div>
              </div>

              <Link href={`/neighborhoods/${neighborhood.slug}`} className="block">
                <Button variant="primary" size="md" className="w-full text-xs">
                  <span>Explore {neighborhood.name} Intelligence</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAreas } from '@/lib/db/areas';
import { mapDbAreaToNeighborhood } from '@/lib/db/mappers';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ArrowUpRight } from 'lucide-react';

export const revalidate = 60;

export default async function NeighborhoodsPage() {
  const dbAreas = await getAreas();
  const neighborhoods = dbAreas.map(mapDbAreaToNeighborhood);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">Location Guide</Badge>
          <Badge variant="stone" size="sm">Karachi Enclaves</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
          Prime Areas & Neighborhoods in Karachi
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-xl leading-relaxed">
          Explore neighborhood profiles, average rates per square yard, and active luxury listings in North Nazimabad, Gulshan, FB Area, Scheme 33, Buffer Zone, and central Karachi.
        </p>
      </div>

      {/* Grid of Neighborhoods */}
      {neighborhoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {neighborhoods.map((neighborhood) => (
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
                  <h2 className="font-display font-medium text-2xl text-[#F8F4ED]">
                    {neighborhood.name}
                  </h2>
                  <p className="text-xs text-[#D7CBBB] font-sans line-clamp-1">
                    {neighborhood.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-[#7e7365] line-clamp-2 leading-relaxed">
                  {neighborhood.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#d8cebe]/60 text-center">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Avg Rate</span>
                    <span className="font-display font-medium text-sm sm:text-base text-[#1F1B16]">{neighborhood.stats.avgPriceSqFt}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Annual Growth</span>
                    <span className="font-display font-medium text-sm sm:text-base text-[#2e3a2f]">{neighborhood.stats.annualGrowth}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#7e7365] block">Security</span>
                    <span className="font-display font-medium text-sm sm:text-base text-[#1F1B16]">{neighborhood.stats.safetyRating}</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {neighborhood.lifestyleTags.slice(0, 2).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-[#f5efe6] text-[11px] font-mono text-[#1F1B16] border border-[#d8cebe]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/neighborhoods/${neighborhood.slug}`}>
                    <Button variant="primary" size="sm" className="text-xs">
                      <span>View Area Guide</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#fbf6f0] border border-[#d8cebe] rounded-3xl text-xs text-[#7e7365]">
          Target Karachi location dossiers are currently being synchronized.
        </div>
      )}
    </div>
  );
}

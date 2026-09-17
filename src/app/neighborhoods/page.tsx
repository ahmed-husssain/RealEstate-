import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAreas } from '@/lib/db/areas';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ArrowUpRight } from 'lucide-react';

export const revalidate = 60;

export default async function NeighborhoodsPage() {
  const areas = await getAreas();

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
          Explore prime Karachi enclaves and discover available verified properties in North Nazimabad, Gulshan, FB Area, Scheme 33, and central Karachi.
        </p>
      </div>

      {/* Grid of Neighborhoods */}
      {areas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => (
            <GlassCard
              key={area.id}
              variant="interactive"
              rounded="2rem"
              className="overflow-hidden flex flex-col group bg-[#fbf6f0] shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link
                href={`/properties?neighborhood=${encodeURIComponent(area.slug || area.name)}&status=for-sale`}
                className="relative aspect-[16/9] w-full overflow-hidden bg-[#e5decb] block cursor-pointer"
              >
                <Image
                  src={area.heroImage || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'}
                  alt={area.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/80 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="stone" size="sm" className="bg-[#fbf6f0]/90 backdrop-blur-md text-[#1F1B16]">
                    {area.city || 'Karachi'}
                  </Badge>
                </div>

                {/* Floating Arrow Indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-[#F8F4ED] group-hover:bg-[#5c3822] group-hover:border-[#5c3822] transition-all duration-300 shadow-md group-hover:scale-110">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="absolute bottom-4 inset-x-4">
                  <h2 className="font-display font-medium text-2xl text-[#F8F4ED] group-hover:text-white transition-colors">
                    {area.name}
                  </h2>
                </div>
              </Link>

              {/* Only View Properties Button in Card Body */}
              <div className="p-4 sm:p-5 bg-[#fbf6f0]">
                <Link
                  href={`/properties?neighborhood=${encodeURIComponent(area.slug || area.name)}&status=for-sale`}
                  className="block w-full"
                >
                  <Button variant="primary" size="md" className="w-full text-xs cursor-pointer shadow-sm justify-center">
                    <span>View Properties</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
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

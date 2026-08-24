import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Award, Compass, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  const partners = [
    {
      name: 'Eleanor Vance-Sterling',
      role: 'Founding Partner | West Coast & Coastal Estates',
      bio: 'Over 18 years specializing in landmark Bel Air and Malibu transactions with a background in architectural history.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Julian Montgomery',
      role: 'Managing Partner | Metropolitan Penthouses',
      bio: 'Leading Manhattan and Brooklyn trophy loft transactions with extensive experience in historic landmark properties.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Victoria Thorne',
      role: 'Partner | Country & Equestrian Estates',
      bio: 'Dedicated to significant acreage, historic manors, and equestrian parcels across Greenwich and Westchester.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-16">
      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-3">
          <BrandLogo href="" imageClassName="h-10" />
          <Badge variant="exclusive" size="sm">Brand Philosophy</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Where Architectural Rigor Meets Private Wealth Advisory
        </h1>
        <p className="text-xs sm:text-base text-[#7e7365] leading-relaxed">
          Founded on the conviction that extraordinary residences are not mere real estate assets, but livable works of art shaped by proportion, materiality, and light.
        </p>
      </div>

      {/* Story & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-[#d8cebe] shadow-2xl bg-[#e5decb]">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Amber Property Corner Architectural Vision"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <Badge variant="moss" size="sm">The Amber Standard</Badge>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
            A Curation Philosophy Driven by Architectural Integrity
          </h2>
          <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
            Conventional brokerages aggregate inventory; Amber Property Corner curates. We examine every property through the lens of architectural provenance, construction craft, and enduring lifestyle resonance.
          </p>
          <div className="space-y-3 text-xs font-sans">
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5c3822] mt-1.5 shrink-0" />
              <p><strong>Material Honesty:</strong> Prioritizing authentic stone, timber, and glass over transient cosmetic trends.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5c3822] mt-1.5 shrink-0" />
              <p><strong>Unmatched Discretion:</strong> Conducting the majority of high-value transactions off-market under strict NDAs.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5c3822] mt-1.5 shrink-0" />
              <p><strong>Global Reach:</strong> Direct relationships with family offices, architects, and private collectors across the globe.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="space-y-8 pt-8 border-t border-[#d8cebe]/60">
        <div className="space-y-2">
          <Badge variant="stone" size="sm">Leadership</Badge>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
            Senior Managing Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, idx) => (
            <GlassCard key={idx} variant="card" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#e5decb] border border-[#d8cebe]">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                  {partner.name}
                </h3>
                <p className="text-xs font-mono text-[#5c3822] mt-0.5">
                  {partner.role}
                </p>
                <p className="text-xs text-[#7e7365] mt-2 leading-relaxed">
                  {partner.bio}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

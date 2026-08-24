import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ShieldCheck, CheckCircle2, Hammer, KeyRound } from 'lucide-react';

export default function AboutPage() {
  const advisors = [
    {
      name: 'Tariq Mehmood Siddiqui',
      role: 'Senior Real Estate Advisor',
      bio: 'Over 16 years of experience in North Nazimabad and central Karachi property transactions, registry verification, and bungalow acquisitions.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Engr. Farhan Raza',
      role: 'Head of Construction & Engineering',
      bio: 'Civil engineer with 14+ years managing turnkey residential builds, gray structure works, and modern architectural finishing in Karachi.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Zainab Alvi',
      role: 'Luxury Residential Consultant',
      bio: 'Specializing in Gulshan and North Nazimabad luxury penthouses, commercial assets, and overseas client property portfolios.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-14">
      {/* Hero Header */}
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center gap-2">
          <BrandLogo href="" imageClassName="h-8" />
          <Badge variant="exclusive" size="sm">Our Story</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          About Amber Property Corner
        </h1>
        <p className="text-xs sm:text-base text-[#7e7365] leading-relaxed">
          A dedicated real estate and construction agency based in Karachi, helping clients buy verified properties, build dream homes, and complete modern renovations.
        </p>
      </div>

      {/* Story & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-[#d8cebe] shadow-xl bg-[#e5decb]">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            alt="Amber Property Corner Karachi"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <Badge variant="moss" size="sm">Our Values</Badge>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
            Built on Integrity, Local Experience & Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
            Whether you are purchasing a plot in Scheme 33, constructing a turnkey house in North Nazimabad, or renovating an apartment in Gulshan, we provide transparent guidance without hidden surprises.
          </p>
          <div className="space-y-2.5 text-xs text-[#1F1B16]">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e3a2f] shrink-0 mt-0.5" />
              <p><strong>Verified Ownership:</strong> Thorough inspection of all Sub-Registrar records, KDA, and MDA transfer paperwork.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e3a2f] shrink-0 mt-0.5" />
              <p><strong>Quality Construction:</strong> High-grade materials, structural safety, and timely project delivery.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#2e3a2f] shrink-0 mt-0.5" />
              <p><strong>Dedicated Support:</strong> Direct contact with our advisors throughout the buying or building process.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advisors Team */}
      <div className="space-y-6 pt-6 border-t border-[#d8cebe]/60">
        <div className="space-y-1">
          <Badge variant="stone" size="sm">Our Team</Badge>
          <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
            Experienced Advisors & Engineers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {advisors.map((advisor, idx) => (
            <GlassCard key={idx} variant="card" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#e5decb] border border-[#d8cebe]">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                  {advisor.name}
                </h3>
                <p className="text-xs font-mono text-[#5c3822]">
                  {advisor.role}
                </p>
                <p className="text-xs text-[#7e7365] pt-1 leading-relaxed">
                  {advisor.bio}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}

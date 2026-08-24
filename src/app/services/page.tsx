import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ShieldCheck, Compass, Award, KeyRound, Building, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <KeyRound className="w-6 h-6 text-[#5c3822]" />,
      title: 'Confidential Acquisition & Representation',
      tagline: 'Securing off-market architectural landmarks for discerning buyers',
      description: 'We act as dedicated buy-side advocates for private individuals, family offices, and institutions. Our extensive network enables access to unlisted trophy assets and off-market architectural estates.',
      points: [
        'Proprietary off-market pipeline across prime metropolitan enclaves',
        'Rigorous architectural and structural due diligence',
        'Complex negotiation and international capital structuring',
      ],
    },
    {
      icon: <Building className="w-6 h-6 text-[#2e3a2f]" />,
      title: 'Bespoke Divestment & Global Marketing',
      tagline: 'Strategic positioning for architecturally significant residences',
      description: 'Selling a trophy property requires nuanced storytelling, museum-quality visual documentation, and targeted distribution to qualified ultra-high-net-worth principals worldwide.',
      points: [
        'Editorial architectural photography and cinematic 4K production',
        'Direct global marketing to vetted family office syndicates',
        'Complete confidentiality and controlled buyer qualification',
      ],
    },
    {
      icon: <Award className="w-6 h-6 text-[#847666]" />,
      title: 'Architectural & Development Advisory',
      tagline: 'Pre-construction consulting for value and aesthetic maximization',
      description: 'We advise developers, architects, and private owners on spatial optimization, material palettes, and target demographic preferences before groundbreaking or major renovations.',
      points: [
        'Floor plan efficiency and luxury amenities programming',
        'Material palette and wellness technology curation',
        'Micro-market pricing optimization and launch sequencing',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="exclusive" size="sm">Advisory Protocols</Badge>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Private Client Services & Representation
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
          Comprehensive real estate advisory combining architectural discernment with sophisticated transactional execution.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <GlassCard
            key={idx}
            variant="card"
            rounded="2rem"
            className="p-8 flex flex-col justify-between space-y-6 bg-[#fbf6f0]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f5efe6] border border-[#d8cebe] flex items-center justify-center shadow-sm">
                {service.icon}
              </div>
              <h2 className="font-display font-medium text-xl text-[#1F1B16] leading-snug">
                {service.title}
              </h2>
              <p className="text-xs font-mono text-[#5c3822]">
                {service.tagline}
              </p>
              <p className="text-xs text-[#7e7365] leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 pt-4 border-t border-[#d8cebe]/60">
                {service.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#1F1B16]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#2e3a2f] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/contact" className="block pt-4">
              <Button variant="outline" size="md" className="w-full text-xs">
                Inquire Regarding Service &rarr;
              </Button>
            </Link>
          </GlassCard>
        ))}
      </div>

      {/* Trust Guarantee Card */}
      <GlassCard variant="container" rounded="2rem" className="p-8 sm:p-12 bg-gradient-to-br from-[#fbf6f0] to-[#ece3d5] text-center max-w-4xl mx-auto space-y-4">
        <ShieldCheck className="w-10 h-10 mx-auto text-[#2e3a2f]" />
        <h3 className="font-display font-medium text-2xl text-[#1F1B16]">
          Institutional Discretion & Non-Disclosure Protocol
        </h3>
        <p className="text-xs text-[#7e7365] max-w-xl mx-auto leading-relaxed">
          Every client engagement is safeguarded by strict confidentiality agreements. Asset information, identity, and financial negotiations are managed exclusively by our Senior Partners.
        </p>
        <div className="pt-2">
          <Link href="/contact">
            <Button variant="primary" size="md">
              Initiate Confidential Dialogue
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

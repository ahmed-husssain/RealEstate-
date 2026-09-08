'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  Building2,
  FileCheck2,
  Hammer,
  Paintbrush,
  Droplets,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export default function ServicesPage() {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 0,
      title: '1. Property Buying, Selling & Investments',
      shortTitle: 'Property & Investments',
      icon: <Building2 className="w-5 h-5 text-[#5c3822]" />,
      tagline: 'Verified houses, bangalows, flats, and plots across prime Karachi locations',
      description:
        'Whether you want to buy a ready house in North Nazimabad or Gulshan, sell your property, invest in commercial assets, or book on easy installments, we ensure 100% verified documents, safe transactions, and transparent pricing.',
      services: [
        {
          name: 'Bungalows & Houses (80 to 1000 Gaz)',
          details: 'Single & double storey houses in North Nazimabad, Gulshan-e-Iqbal, FB Area, Scheme 33, and Buffer Zone with verified registry documents.',
        },
        {
          name: 'Residential & Commercial Plots',
          details: 'Open plots in 80, 120, 240, 400, 500 & 1000 Gaz ready for immediate construction with clear utility & transfer status.',
        },
        {
          name: 'Apartments, Flats & Penthouses',
          details: 'Ready and under-construction 2, 3 & 4-bed family flats with lifts, standby generator, designated parking, and 24/7 security.',
        },
        {
          name: 'Commercial Properties & High Rental Assets',
          details: 'Banquets, Marriage Halls, shops, bank-leased buildings, and commercial plots with solid monthly rental income.',
        },
        {
          name: 'Easy Monthly & Yearly Installment Projects',
          details: 'Affordable 1 to 4-year installment plans for residential plots and brand new apartments in SBCA approved schemes.',
        },
        {
          name: 'Profitable Property Flip & Urgent Deals',
          details: 'Sourcing under-market price houses and plots for investors looking for quick capital growth and safe returns.',
        },
        {
          name: 'Renovate Before Selling Service',
          details: 'We repair, paint, and modernize your old house before listing to help you get the maximum market price from buyers.',
        },
      ],
    },
    {
      id: 1,
      title: '2. SBCA Map Approvals, Registry & Legal Verification',
      shortTitle: 'Legal & Map Approvals',
      icon: <FileCheck2 className="w-5 h-5 text-[#2e3a2f]" />,
      tagline: '100% safe ownership, building map sanctioning, and municipal NOCs',
      description:
        'We protect you from property fraud, disputed lands, and illegal construction. Our legal experts check official records directly with KDA, MDA, SBCA, and the Sub-Registrar office.',
      services: [
        {
          name: 'Registry & File Verification',
          details: 'Complete check of Registry, Mutation, Intiqal, Sanad, and Sub-Registrar files to verify original ownership.',
        },
        {
          name: 'KDA, MDA & Cantonment Clearances',
          details: 'Transfer papers, official NOCs, and clearance letters from KDA, MDA, LDA, SBCA, and Cantonment Boards (CBC, Faisal, Malir).',
        },
        {
          name: 'SBCA Building Map Approval (نقشہ پاس)',
          details: 'Designing, submitting, and getting official SBCA approvals for architectural layout maps, structural drawings, and floor plans.',
        },
        {
          name: 'Demolition & Reconstruction NOC (توڑ پھوڑ)',
          details: 'Official government permission and safety NOCs to safely demolish old buildings and construct new houses.',
        },
        {
          name: 'Non-Encumbrance Certificate (NEC)',
          details: 'Official government certificate proving the property is free from court cases, bank mortgages, and legal disputes.',
        },
        {
          name: 'Electricity, Gas & Water Clearances (NOC)',
          details: 'Bill verification, meter transfer, and new connection clearances from K-Electric, Sui Gas (SSGC), and Water Board (KW&SC).',
        },
        {
          name: 'Sale Agreement & Power of Attorney Drafting',
          details: 'Professional legal drafting of Biyana Agreements, Sale Deeds, General Power of Attorney (GPA), and registered Lease Deeds.',
        },
      ],
    },
    {
      id: 2,
      title: '3. Turnkey House Construction & Gray Structure',
      shortTitle: 'Turnkey Construction',
      icon: <Hammer className="w-5 h-5 text-[#5c3822]" />,
      tagline: 'Full house construction, gray structure builds, and modern front elevations',
      description:
        'Our construction team builds strong, modern, and high-quality houses from foundation to final paint. We use Grade-60 steel, solid concrete blocks, and deliver projects on committed deadlines.',
      services: [
        {
          name: 'Complete Turnkey House Construction (80 to 1000 Gaz)',
          details: 'Complete construction from foundation excavation to final luxury keys handover with complete material warranty.',
        },
        {
          name: 'Gray Structure Construction',
          details: 'RCC pillars, solid block masonry, Grade-60 deformed steel, underground water tank, plumbing conduits, and electrical piping.',
        },
        {
          name: 'Safe Demolition & Debris (Malba) Removal',
          details: 'Controlled building demolition with protective scaffolding and fast removal of malba according to city safety rules.',
        },
        {
          name: 'Front Elevation & Modern Facade Redesign',
          details: 'Giving old houses a modern exterior look using Travertine stone, weather-resistant paint, wooden louvers, and stylish exterior lights.',
        },
        {
          name: 'Commercial Plazas & Banquet Construction',
          details: 'Heavy-duty construction for commercial halls, shops, and multi-storey office buildings.',
        },
      ],
    },
    {
      id: 3,
      title: '4. Room-by-Room Interior Renovation',
      shortTitle: 'Interior Renovation',
      icon: <Paintbrush className="w-5 h-5 text-[#847666]" />,
      tagline: 'Modern modular kitchens, executive bathrooms, and false ceiling lighting',
      description:
        'Modernize your house or flat with customized German-style kitchens, imported Italian tile bathrooms, false ceilings, and stylish media walls.',
      services: [
        {
          name: 'Modern Kitchen Renovation',
          details: 'UV/Acrylic waterproof cabinets, granite & quartz slabs, soft-close drawers, and built-in stove & hood installations.',
        },
        {
          name: 'Modern Bathroom Upgrades',
          details: 'Spanish & Italian tiles, concealed Grohe/Master sanitary fittings, glass shower partitions, and vanity mirrors.',
        },
        {
          name: 'Drawing Room & TV Lounge Renovation',
          details: 'Gypsum false ceilings with warm LED strip lights, fluted wooden media walls, and marble feature walls.',
        },
        {
          name: 'Master Bedroom & Wardrobes',
          details: 'Full-height wooden wardrobes with sliding doors, internal LED lights, and custom headboard wall designs.',
        },
        {
          name: 'Apartment & Flat Renovation',
          details: 'Complete makeover for old apartments including floor tiling, paint, plumbing renewal, and door replacements.',
        },
      ],
    },
    {
      id: 4,
      title: '5. Waterproofing, Seepage (Seem) & Tank Repair',
      shortTitle: 'Seepage & Waterproofing',
      icon: <Droplets className="w-5 h-5 text-[#2e3a2f]" />,
      tagline: 'Permanent solutions for wall seepage (سیم), tank leakage, plumbing & solar',
      description:
        'Permanent chemical solutions to stop water seepage, underground water tank leakage, hidden pipe leaks, and termite (deemak) attacks before they ruin your walls.',
      services: [
        {
          name: 'Roof & Wall Seepage (Seem) Waterproofing',
          details: 'Chemical pressure injection and multi-layer chemical polymer coatings to stop moisture and wall peeling permanently.',
        },
        {
          name: 'Underground & Overhead Water Tank Repair',
          details: 'Waterproofing chemical crack filling and tile relining to prevent water loss and contaminated drinking water.',
        },
        {
          name: 'Solar Panel Setup & Electrical Rewiring',
          details: 'Complete Pakistan Cables wiring, 3-phase load distribution, and solar hybrid inverter net-metering installations.',
        },
        {
          name: 'Complete Plumbing & Sewerage Replacement',
          details: 'Replacing old rusted GI pipes with durable PPRC water pipes and UPVC drainage to eliminate wall leaks.',
        },
        {
          name: 'Termite (Deemak) Chemical Treatment',
          details: 'Deep soil chemical barriers and wood injection to protect doors, wardrobes, and kitchen cabinets from termite damage.',
        },
      ],
    },
  ];

  const current = pillars.find((p) => p.id === activePillar) || pillars[0];
  const currentIdx = pillars.findIndex((p) => p.id === current.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="exclusive" size="sm">Amber Property Corner</Badge>
          <Badge variant="stone" size="sm">All Services in One Place</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Real Estate, Construction & Renovation Services
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
          From verified property buying and SBCA map approvals to full house construction, room remodeling, and permanent seepage solutions across Karachi.
        </p>
      </div>

      {/* 5-Pillar Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#d8cebe]/60">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setActivePillar(pillar.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-sans whitespace-nowrap transition-all cursor-pointer border ${
              current.id === pillar.id
                ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-sm font-semibold'
                : 'bg-[#fbf6f0] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
            }`}
          >
            {pillar.icon}
            <span>{pillar.shortTitle}</span>
          </button>
        ))}
      </div>

      {/* Active Pillar Showcase */}
      <div className="space-y-8 animate-in fade-in duration-200">
        <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-10 space-y-6 bg-[#fbf6f0]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#d8cebe]/60">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge variant="exclusive" size="sm">Department 0{currentIdx + 1}</Badge>
                <span className="text-xs font-mono text-[#7e7365]">{current.tagline}</span>
              </div>
              <h2 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16]">
                {current.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed font-sans">
                {current.description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
              <a
                href={`https://wa.me/923327906034?text=${encodeURIComponent(`Assalam o Alaikum, I want to inquire regarding: ${current.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md" className="w-full text-xs">
                  Get Free Quote on WhatsApp
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="secondary" size="md" className="w-full text-xs">
                  Book In-Person Office Visit
                </Button>
              </Link>
            </div>
          </div>

          {/* List of Detailed Services in this Pillar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {current.services.map((srv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#d8cebe] space-y-2 shadow-sm hover:border-[#5c3822] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2e3a2f] shrink-0" />
                  <h3 className="font-display font-medium text-base text-[#1F1B16]">
                    {srv.name}
                  </h3>
                </div>
                <p className="text-xs text-[#7e7365] leading-relaxed pl-6">
                  {srv.details}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* All 5 Wings Summary Grid */}
        <div className="space-y-4 pt-6">
          <div className="space-y-1 text-center max-w-xl mx-auto">
            <h3 className="font-display font-medium text-2xl text-[#1F1B16]">
              All 5 Specialized Departments
            </h3>
            <p className="text-xs text-[#7e7365]">
              Click any department to view complete details and get in touch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => {
                  setActivePillar(pillar.id);
                  window.scrollTo({ top: 150, behavior: 'smooth' });
                }}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  current.id === pillar.id
                    ? 'bg-[#5c3822]/10 border-[#5c3822] shadow-sm'
                    : 'bg-[#fbf6f0] border-[#d8cebe] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#d8cebe] flex items-center justify-center shadow-sm">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono text-[#7e7365] uppercase">
                    0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-display font-medium text-base text-[#1F1B16]">
                    {pillar.shortTitle}
                  </h4>
                  <p className="text-xs text-[#7e7365] line-clamp-2 leading-relaxed">
                    {pillar.tagline}
                  </p>
                </div>

                <div className="pt-2 text-xs font-mono text-[#5c3822] flex items-center gap-1 font-medium">
                  <span>View Details &rarr;</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Card */}
      <GlassCard variant="container" rounded="2rem" className="p-8 sm:p-10 text-center space-y-4 bg-[#fbf6f0]">
        <div className="w-12 h-12 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
          Need a Free Price Estimate or Site Visit?
        </h2>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-lg mx-auto">
          Our senior engineers and real estate advisors are available for direct site visits across Karachi.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="https://wa.me/923327906034?text=Assalam%20o%20Alaikum%20Amber%20Property%20Corner,%20I%20would%20like%20to%20request%20a%20site%20visit%20and%20quotation."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" className="text-xs sm:text-sm">
              WhatsApp for Quick Estimate
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="text-xs sm:text-sm">
              Contact Our Office
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

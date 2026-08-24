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
      title: '1. Real Estate Sales & Commercial Investments',
      shortTitle: 'Property & Investments',
      icon: <Building2 className="w-5 h-5 text-[#5c3822]" />,
      tagline: 'Prime residential, commercial, and high-yield investment properties across Karachi',
      description:
        'Whether you are looking to acquire a luxury bungalow in DHA, invest in commercial assets, or book installment projects, our advisory ensures verified files, transparent dealings, and maximum capital growth.',
      services: [
        {
          name: 'Residential Bangalows & Houses',
          details: '80, 120, 240, 400, 500 & 1000 Gaz houses across DHA (Phases 1–8), Clifton, KDA Scheme 1, and prime enclaves.',
        },
        {
          name: 'Residential & Commercial Plots',
          details: 'Ready-to-build residential and commercial open plots in all prime sizes with 100% verified documentation.',
        },
        {
          name: 'High-Rise Towers & Luxury Apartments',
          details: 'Ready and off-plan high-end apartments, duplex penthouses, and executive suites in prestigious beachfront & urban towers.',
        },
        {
          name: 'Commercial High-Yield Assets',
          details: 'Banquets, Marriage Halls, Bank-Leased commercial spaces, and multi-story commercial plazas generating stable monthly rental returns.',
        },
        {
          name: 'Installment Project Bookings',
          details: 'Easy 1 to 4-year installment plans for residential plots, luxury apartments, and commercial shops across approved master plans.',
        },
        {
          name: 'High-ROI Flip Deals & Distressed Asset Sourcing',
          details: 'Identifying undervalued and distressed properties for investors looking for rapid capital gains through value enhancement.',
        },
        {
          name: '“Renovate Before Selling” Program',
          details: 'Strategic cosmetic and structural modernization for sellers to significantly boost property valuation prior to market listing.',
        },
      ],
    },
    {
      id: 1,
      title: '2. Complete Legal Due Diligence, Map Approvals & Documentation Wing',
      shortTitle: 'Legal & Map Approvals',
      icon: <FileCheck2 className="w-5 h-5 text-[#2e3a2f]" />,
      tagline: '100% safe property ownership, municipal approvals, and legal verification',
      description:
        'We protect our clients against land disputes, illegal constructions, and encumbrances through meticulous legal vetting and direct liaison with all governing authorities in Karachi.',
      services: [
        {
          name: 'Title & Ownership Verification',
          details: 'Exhaustive verification of Registry, Mutation, Intiqal, Sanad, and Sub-Registrar official records to confirm legitimate ownership.',
        },
        {
          name: 'Authority Approvals & Clearances',
          details: 'Official NOCs and transfer clearances from KDA, MDA, LDA, SBCA, KMC, and Cantonment Boards (CBC, Clifton, Faisal, Malir).',
        },
        {
          name: 'Building Map Approvals & Architectural Vetting',
          details: 'Preparation, submission, and sanctioning of SBCA-approved architectural layout drawings, structural drawings, and MEP plans.',
        },
        {
          name: 'Demolition & Reconstruction NOCs',
          details: 'Controlled demolition approvals, municipal safety certificates, and reconstruction permissions for old structures.',
        },
        {
          name: 'Non-Encumbrance & Clear Title Certificates (NEC)',
          details: 'Issuance of official Non-Encumbrance Certificates verifying freedom from court stays, bank mortgages, or legal liens.',
        },
        {
          name: 'Utility Verification & Clearances',
          details: 'No-Objection Certificates (NOCs) and billing clearance from K-Electric, Sui Gas (SSGC), and KW&SC.',
        },
        {
          name: 'Legal Drafting & Agreement Execution',
          details: 'Professional drafting of Sale Agreements, Irrevocable General Power of Attorney (GPA), and registered Lease Deeds.',
        },
      ],
    },
    {
      id: 2,
      title: '3. Full House & Structural Construction',
      shortTitle: 'Turnkey Construction',
      icon: <Hammer className="w-5 h-5 text-[#5c3822]" />,
      tagline: 'Turnkey residential construction, gray structure rebuilds, and structural remodeling',
      description:
        'Our engineering team builds modern, durable, and architecturally refined houses from foundation excavation to final paint, using Grade-A materials and strict quality controls.',
      services: [
        {
          name: 'Turnkey Bangalow Rebuilds (80 to 1000 Gaz)',
          details: 'Complete end-to-end house construction from foundation to luxury turnkey handover on committed delivery milestones.',
        },
        {
          name: 'New Grey Structure Construction',
          details: 'RCC columns, solid concrete blocks, Grade-60 deformed steel, termite-proofed plinth, and premium MEP conduit infrastructure.',
        },
        {
          name: 'Controlled Demolition & Malba Removal',
          details: 'Safe, municipal-compliant building demolition and rapid debris (malba) removal with protective perimeter scaffolding.',
        },
        {
          name: 'Exterior Elevation & Modern Facade Redesign',
          details: 'Transforming outdated bungalow facades with imported Travertine stone, HPL cladding, louvers, and architectural exterior lighting.',
        },
        {
          name: 'Commercial & Banquet Hall Refurbishment',
          details: 'Heavy-duty structural redesign, acoustic wall panelling, and high-capacity space planning for commercial banquet venues.',
        },
      ],
    },
    {
      id: 3,
      title: '4. Room-by-Room & Interior Remodeling',
      shortTitle: 'Interior Remodeling',
      icon: <Paintbrush className="w-5 h-5 text-[#847666]" />,
      tagline: 'Modern luxury interior design, modular kitchens, and executive bathroom upgrades',
      description:
        'Upgrade your living space with bespoke interiors, imported Italian tiles, custom German-style kitchens, and smart ambient ceiling lighting tailored to your lifestyle.',
      services: [
        {
          name: 'Modular Kitchen Transformations',
          details: 'UV/Acrylic and Matte soft-close cabinets, quartz and polished granite countertops, built-in islands, and German kitchen hardware.',
        },
        {
          name: 'Executive Bathroom Modernization',
          details: 'Imported Spanish/Italian porcelain tiles, concealed Grohe/Kohler sanitary fittings, frameless glass shower cabins, and floating vanities.',
        },
        {
          name: 'Drawing Room & Living Lounge Redesign',
          details: 'False ceilings with cove and magnetic track lighting, fluted charcoal media walls, marble feature accents, and wall paneling.',
        },
        {
          name: 'Master Bedroom Suites & Walk-in Closets',
          details: 'Custom wardrobe suites with integrated LED shelving, upholstered headboard walls, and ergonomic space optimization.',
        },
        {
          name: 'Apartment & Penthouse Interior Overhauls',
          details: 'Turnkey modernization of vertical residences including space remodeling, soundproofing, and designer finishes.',
        },
      ],
    },
    {
      id: 4,
      title: '5. Specialized Infrastructure & Remedial Solutions',
      shortTitle: 'Remedial & Infrastructure',
      icon: <Droplets className="w-5 h-5 text-[#2e3a2f]" />,
      tagline: 'Solving Karachi’s critical home maintenance challenges: Seepage, tanks, plumbing & solar',
      description:
        'Permanent engineering solutions for water seepage, underground tank leakage, electrical overload, and termite infestation, saving your property from long-term damage.',
      services: [
        {
          name: 'Seepage, Dampness (Seem) & Roof Waterproofing',
          details: 'Pressure chemical injection, elastomeric polymer membrane coatings, and roof screed thermal-waterproofing treatments.',
        },
        {
          name: 'RCC Underground & Overhead Water Tank Rehabilitation',
          details: 'Crack sealing, food-grade chemical waterproofing, and porcelain tile relining to prevent water contamination and leakage.',
        },
        {
          name: 'Electrical Rewiring & Solar / Net-Metering Infrastructure',
          details: 'Load calculation, Pakistan Cables wiring overhaul, solar inverter hybrid setup, and 3-phase net-metering integration.',
        },
        {
          name: 'Complete Internal Plumbing & Sewerage Overhaul',
          details: 'Replacing corroded GI pipes with premium PPRC water lines and UPVC drainage systems to eliminate hidden wall leaks.',
        },
        {
          name: 'Termite (Deemak) Treatment & Woodwork Restoration',
          details: 'Pre-construction and post-construction chemical soil barriers and localized micro-injection for wooden doorframes and wardrobes.',
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
          <Badge variant="stone" size="sm">Complete Scope of Services</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Real Estate, Construction & Renovation
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
          From verified property acquisition and SBCA map approvals to turnkey construction, interior remodeling, and permanent seepage solutions in Karachi.
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
                <Badge variant="exclusive" size="sm">Wing 0{currentIdx + 1}</Badge>
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
                href={`https://wa.me/923008224110?text=${encodeURIComponent(`Assalam o Alaikum, I want to inquire regarding: ${current.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md" className="w-full text-xs">
                  Request Quotation on WhatsApp
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="secondary" size="md" className="w-full text-xs">
                  Book In-Person Consultation
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
              Click any department to view complete capabilities and request assistance.
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

                <div className="pt-2 text-xs font-mono text-[#5c3822] flex items-center gap-1">
                  <span>Explore Wing &rarr;</span>
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
          Need a Custom Estimate or Site Inspection?
        </h2>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-lg mx-auto">
          Our senior engineers and real estate advisors are available for on-site visits across Karachi.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href="https://wa.me/923008224110?text=Assalam%20o%20Alaikum%20Amber%20Property%20Corner,%20I%20would%20like%20to%20request%20a%20site%20visit%20and%20quotation."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" className="text-xs sm:text-sm">
              WhatsApp for Quick Quote
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="secondary" size="lg" className="text-xs sm:text-sm">
              Submit Inquiry Form
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}

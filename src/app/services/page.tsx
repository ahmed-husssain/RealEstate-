import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { KeyRound, Hammer, Paintbrush, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <KeyRound className="w-6 h-6 text-[#5c3822]" />,
      title: 'Property Buying & Selling',
      tagline: 'Verified houses, apartments, and plots in DHA & Clifton',
      description: 'We help you find, inspect, and purchase genuine properties with clean title deeds. If you want to sell, we connect you with verified serious buyers quickly.',
      points: [
        'Complete document verification and DHA transfer assistance',
        'Direct access to on-market and private off-market listings',
        'Fair market pricing and transparent deal closing',
      ],
    },
    {
      icon: <Hammer className="w-6 h-6 text-[#2e3a2f]" />,
      title: 'Complete Construction Services',
      tagline: 'Turnkey home construction from foundation to finish',
      description: 'From architectural floor plans to structural gray structure and luxury finishing, our construction team builds modern, durable homes in Karachi.',
      points: [
        'Architectural design, structural drawings, and DHA approval',
        'Grade-A steel, cement, plumbing, and electrical materials',
        'Transparent cost estimation with milestone-based timelines',
      ],
    },
    {
      icon: <Paintbrush className="w-6 h-6 text-[#847666]" />,
      title: 'House Renovation & Remodeling',
      tagline: 'Upgrade your existing home with modern interiors',
      description: 'Give your bungalow or apartment a fresh, contemporary look with our interior design, kitchen remodeling, and luxury bathroom upgrades.',
      points: [
        'Modern chef kitchens, imported fittings, and custom wardrobes',
        'Imported marble, porcelain tiles, and false ceiling lighting',
        'Exterior elevation remodeling and waterproofing solutions',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="exclusive" size="sm">Our Core Services</Badge>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Real Estate, Construction & Renovation
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
          Complete property and building solutions for homeowners, buyers, and overseas Pakistanis looking for quality work in Karachi.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <GlassCard
            key={idx}
            variant="card"
            rounded="2rem"
            className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#fbf6f0]"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#d8cebe] flex items-center justify-center shadow-sm">
                {service.icon}
              </div>

              <div className="space-y-1.5">
                <h3 className="font-display font-medium text-xl text-[#1F1B16]">
                  {service.title}
                </h3>
                <p className="text-xs font-mono text-[#5c3822]">
                  {service.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed">
                {service.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#d8cebe]/60">
                {service.points.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-[#1F1B16]">
                    <CheckCircle2 className="w-4 h-4 text-[#2e3a2f] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link href="/contact" className="block w-full">
                <Button variant="secondary" size="md" className="w-full text-xs">
                  <span>Inquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* CTA Box */}
      <GlassCard variant="container" rounded="2rem" className="p-8 sm:p-12 text-center space-y-4 bg-[#fbf6f0]">
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
          Planning to Build, Buy, or Renovate in Karachi?
        </h2>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-lg mx-auto">
          Contact our team today for a free site visit, architectural consultation, or property valuation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/contact">
            <Button variant="primary" size="lg" className="text-xs sm:text-sm">
              Contact Our Office
            </Button>
          </Link>
          <a
            href="https://wa.me/923008224110?text=Hello%20Amber%20Property%20Corner,%20I%20would%20like%20to%20inquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" className="text-xs sm:text-sm">
              WhatsApp Us Directly
            </Button>
          </a>
        </div>
      </GlassCard>
    </div>
  );
}

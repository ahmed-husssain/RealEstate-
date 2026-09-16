import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { FEATURED_PROJECTS } from '@/lib/data/projectsData';
import {
  CheckCircle2,
  HardHat,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Delivered Projects & Before/After Showcase | Amber Property Corner Karachi',
  description:
    'Explore completed turnkey house construction, modern room-by-room renovations, and plot developments in North Nazimabad, Gulshan-e-Iqbal, and Scheme 33.',
  openGraph: {
    title: 'Delivered Construction & Renovation Projects | Amber Property Corner',
    description:
      'Real before-and-after transformations of houses, bungalows, and plots in Karachi by Syed Sikander Waqar.',
    url: 'https://amberproperty.vercel.app/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-16">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BrandLogo href="" imageClassName="h-8" />
          <Badge variant="exclusive" size="sm">Delivered Work</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Completed Projects & Before / After Transformations
        </h1>
        <p className="text-xs sm:text-base text-[#7e7365] leading-relaxed">
          See the tangible craftsmanship, Grade-60 steel structural builds, and turnkey finishing delivered for homeowners and Overseas Pakistanis across Karachi.
        </p>
      </div>

      {/* Projects Showcase Cards */}
      <div className="space-y-12">
        {FEATURED_PROJECTS.map((project, index) => (
          <GlassCard
            key={project.id}
            variant="container"
            rounded="2rem"
            className="p-6 sm:p-10 bg-[#fbf6f0] border border-[#d8cebe] shadow-lg space-y-8"
          >
            {/* Top Meta Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8cebe]/60 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="stone" size="sm">Case Study #0{index + 1}</Badge>
                  <Badge variant="moss" size="sm">
                    {project.category === 'turnkey' ? 'Turnkey House Construction' : project.category === 'renovation' ? 'Complete Renovation' : 'Estate & Sanad Build'}
                  </Badge>
                </div>
                <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#7e7365] pt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#5c3822]" /> {project.area}</span>
                  <span className="flex items-center gap-1"><HardHat className="w-3.5 h-3.5 text-[#5c3822]" /> {project.gazSize}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#5c3822]" /> {project.durationMonths} Months Duration</span>
                </div>
              </div>

              <a
                href={`https://wa.me/923327906034?text=${encodeURIComponent(
                  `Assalam o Alaikum Syed Sikander Waqar Bhai, I saw your delivered project "${project.title}" in ${project.area}. I would like to get a free estimate for my property.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="md" className="cursor-pointer shrink-0 shadow-sm">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  <span>Inquire About Similar Project</span>
                </Button>
              </a>
            </div>

            {/* Before & After Image Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before Card */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#847666]">
                    Before State
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#847666]/15 text-[#847666]">
                    Initial Condition
                  </span>
                </div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#d8cebe] bg-[#e5decb] shadow-inner">
                  <Image
                    src={project.beforeImage}
                    alt={`${project.title} Before`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#1F1B16]/80 text-[#F8F4ED] text-[10px] font-mono px-2.5 py-1 rounded-full backdrop-blur-md">
                    BEFORE
                  </div>
                </div>
                <p className="text-xs text-[#7e7365] leading-relaxed">
                  {project.beforeDescription}
                </p>
              </div>

              {/* After Card */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#2e3a2f]">
                    After Delivery
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#2e3a2f]/15 text-[#2e3a2f] font-semibold">
                    100% Handover
                  </span>
                </div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-[#2e3a2f]/40 bg-[#e5decb] shadow-md">
                  <Image
                    src={project.afterImage}
                    alt={`${project.title} After`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#2e3a2f]/90 text-[#F8F4ED] text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> AFTER
                  </div>
                </div>
                <p className="text-xs text-[#1F1B16] font-medium leading-relaxed">
                  {project.afterDescription}
                </p>
              </div>
            </div>

            {/* Engineering Highlights & Client Testimonial */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#d8cebe]/60 items-center">
              <div className="lg:col-span-6 space-y-2">
                <span className="text-xs font-mono font-medium text-[#7e7365] uppercase tracking-wider block">
                  Key Structural & Technical Features
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#1F1B16] bg-white p-2.5 rounded-xl border border-[#d8cebe]/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2e3a2f] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 p-4 rounded-2xl bg-white border border-[#d8cebe] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(project.clientReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#7e7365] uppercase">Verified Client Review</span>
                </div>
                <p className="text-xs text-[#1F1B16] italic leading-relaxed">
                  &ldquo;{project.clientReview.quote}&rdquo;
                </p>
                <div className="text-[11px] font-mono pt-1 text-[#5c3822] font-semibold">
                  {project.clientReview.clientName} &bull; <span className="font-normal text-[#7e7365]">{project.clientReview.clientRole}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Conversion Banner */}
      <section className="max-w-4xl mx-auto">
        <GlassCard variant="card" rounded="2rem" className="p-8 text-center space-y-4 bg-[#fbf6f0] border border-[#d8cebe]">
          <h3 className="font-display font-medium text-2xl text-[#1F1B16]">
            Have an Old House, Plot, or Renovation Project in Karachi?
          </h3>
          <p className="text-xs sm:text-sm text-[#7e7365] max-w-xl mx-auto">
            Speak directly with Syed Sikander Waqar for a free on-site survey, SBCA map advisory, and turnkey cost breakdown.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/923327906034?text=Assalam%20o%20Alaikum%20Syed%20Sikander%20Waqar%20Bhai%2C%20I%20want%20to%20discuss%20a%20construction%20%2F%20renovation%20project%20in%20Karachi."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg" className="text-xs sm:text-sm shadow-md">
                <MessageCircle className="w-4 h-4 mr-1.5" />
                <span>WhatsApp Senior Advisor Directly</span>
              </Button>
            </a>
            <Link href="/valuation">
              <Button variant="secondary" size="lg" className="text-xs sm:text-sm bg-white">
                <span>Free Property Price Calculator</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockProperties } from '@/data/mockProperties';
import { PropertyGallery } from '@/components/properties/PropertyGallery';
import { FloorPlanViewer } from '@/components/properties/FloorPlanViewer';
import { MortgageCalculator } from '@/components/properties/MortgageCalculator';
import { ScheduleViewingModal } from '@/components/properties/ScheduleViewingModal';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { GlassCard } from '@/ui/GlassCard';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  Share2,
  Heart,
  ArrowLeft,
  FileText,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const property = mockProperties.find((p) => p.slug === slug);
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display font-medium text-3xl text-[#1F1B16]">
          Property Not Found
        </h1>
        <p className="text-xs text-[#7e7365]">
          The requested luxury listing may have been acquired or privatized.
        </p>
        <Link href="/properties">
          <Button variant="primary">Return to Catalog</Button>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const similarProperties = mockProperties
    .filter((p) => p.id !== property.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-[#7e7365]">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1 hover:text-[#1F1B16] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Properties
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3 py-1 rounded-full bg-[#fbf6f0] border border-[#d8cebe] hover:bg-white text-[11px] font-mono text-[#1F1B16] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#5c3822]" />
            <span>{copied ? 'Link Copied' : 'Share Estate'}</span>
          </button>
        </div>
      </div>

      {/* Property Title & Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#d8cebe]/60 pb-8">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {property.status === 'exclusive' ? (
              <Badge variant="exclusive" size="md">Private Off-Market</Badge>
            ) : property.status === 'for-lease' ? (
              <Badge variant="moss" size="md">Luxury Lease</Badge>
            ) : (
              <Badge variant="default" size="md">For Sale</Badge>
            )}
            <Badge variant="stone" size="md">{property.specs.propertyType.replace('-', ' ')}</Badge>
            {property.specs.energyRating && (
              <Badge variant="moss" size="sm">{property.specs.energyRating}</Badge>
            )}
          </div>

          <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
            {property.title}
          </h1>

          <p className="text-xs sm:text-sm text-[#7e7365] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#5c3822] shrink-0" />
            <span>{property.location.address}, {property.location.neighborhood}, {property.location.city} {property.location.postalCode}</span>
          </p>
        </div>

        {/* Pricing & Booking CTA */}
        <div className="lg:text-right space-y-3 shrink-0">
          <div className="space-y-0.5">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#7e7365] block">
              Guide Offering Price
            </span>
            <div className="text-3xl sm:text-4xl font-display font-medium text-[#1F1B16] tracking-tight">
              {property.priceFormatted}
              {property.priceSuffix && (
                <span className="text-sm font-mono text-[#7e7365] ml-1">
                  {property.priceSuffix}
                </span>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => setViewingModalOpen(true)}
            className="w-full sm:w-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Private Viewing</span>
          </Button>
        </div>
      </div>

      {/* High-Resolution Media Gallery with Lightbox */}
      <PropertyGallery images={property.images} title={property.title} />

      {/* Main Content Layout: Left 8 Cols (Details/Specs), Right 4 Cols (Sticky Agent Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-12">
          {/* Key Architectural Specs Grid */}
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-6">
              Key Architectural Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1">
                <Bed className="w-5 h-5 mx-auto text-[#5c3822]" />
                <div className="font-mono font-bold text-lg text-[#1F1B16]">{property.specs.bedrooms}</div>
                <div className="text-[10px] font-mono uppercase text-[#7e7365]">Bedrooms</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1">
                <Bath className="w-5 h-5 mx-auto text-[#5c3822]" />
                <div className="font-mono font-bold text-lg text-[#1F1B16]">{property.specs.bathrooms}</div>
                <div className="text-[10px] font-mono uppercase text-[#7e7365]">Bathrooms</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1">
                <Maximize2 className="w-5 h-5 mx-auto text-[#5c3822]" />
                <div className="font-mono font-bold text-lg text-[#1F1B16]">{formatNumber(property.specs.areaSqFt)}</div>
                <div className="text-[10px] font-mono uppercase text-[#7e7365]">Living Sq Ft</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1">
                <Calendar className="w-5 h-5 mx-auto text-[#5c3822]" />
                <div className="font-mono font-bold text-lg text-[#1F1B16]">{property.specs.yearBuilt}</div>
                <div className="text-[10px] font-mono uppercase text-[#7e7365]">Year Built</div>
              </div>
            </div>

            {/* Extended Specs Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 pt-6 mt-6 border-t border-[#d8cebe]/60 text-xs">
              <div>
                <span className="text-[#7e7365] block">Garage / Gallery:</span>
                <span className="font-mono font-medium text-[#1F1B16]">{property.specs.parkingSpaces} Vehicles</span>
              </div>
              <div>
                <span className="text-[#7e7365] block">Spatial Level:</span>
                <span className="font-mono font-medium text-[#1F1B16]">{property.specs.floorLevel || 'Multi-Level'}</span>
              </div>
              {property.specs.lotSizeSqFt && (
                <div>
                  <span className="text-[#7e7365] block">Lot Grounds:</span>
                  <span className="font-mono font-medium text-[#1F1B16]">{(property.specs.lotSizeSqFt / 43560).toFixed(2)} Acres</span>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Narrative Overview */}
          <div className="space-y-4">
            <h2 className="font-display font-medium text-2xl text-[#1F1B16]">
              Architectural Statement & Vision
            </h2>
            <p className="text-sm sm:text-base text-[#1F1B16]/90 leading-relaxed font-sans">
              {property.description}
            </p>
          </div>

          {/* Key Architectural Features */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-display font-medium text-xl text-[#1F1B16]">
                Design Highlights & Materiality
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] space-y-1.5 shadow-sm"
                  >
                    <h4 className="font-display font-medium text-base text-[#1F1B16]">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-[#7e7365] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities & Curated Facilities */}
          <div className="space-y-4">
            <h3 className="font-display font-medium text-xl text-[#1F1B16]">
              Private Amenities & Security
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {property.amenities.map((amenity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#fbf6f0] border border-[#d8cebe]/70 text-xs font-sans text-[#1F1B16]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Floor Plans Viewer */}
          {property.images.floorPlans && property.images.floorPlans.length > 0 && (
            <FloorPlanViewer floorPlans={property.images.floorPlans} />
          )}

          {/* Mortgage Calculator Component */}
          <MortgageCalculator initialPrice={property.price} />
        </div>

        {/* Right Sticky Sidebar: Advisor Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Agent Contact Card */}
            <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-7 space-y-6">
              <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-4">
                <Badge variant="exclusive" size="sm">Listing Representative</Badge>
                <Badge variant="stone" size="sm">{property.agent.experienceYears} Yrs Practice</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#5c3822] shrink-0 bg-[#e5decb]">
                  <Image
                    src={property.agent.avatarUrl}
                    alt={property.agent.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-medium text-lg text-[#1F1B16]">
                    {property.agent.name}
                  </h4>
                  <p className="text-xs text-[#7e7365] font-sans">
                    {property.agent.title}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 text-xs">
                <a
                  href={`https://wa.me/923001234567?text=${encodeURIComponent(`Hello, I would like to inquire regarding ${property.title} (${property.location.address}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 hover:bg-[#22c55e]/20 text-[#1F1B16] transition-colors group cursor-pointer"
                  aria-label="Chat with Listing Advisor on WhatsApp"
                >
                  <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/amber-property-corner-whatsapp.png"
                      alt="WhatsApp Concierge"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-sans font-medium text-xs text-[#1F1B16]">
                    Direct WhatsApp Inquiry
                  </span>
                </a>
                <a
                  href={`tel:${property.agent.phone}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#f5efe6] border border-[#d8cebe] hover:bg-white text-[#1F1B16] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#5c3822]" />
                  <span className="font-mono">{property.agent.phone}</span>
                </a>
                <a
                  href={`mailto:${property.agent.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#f5efe6] border border-[#d8cebe] hover:bg-white text-[#1F1B16] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#5c3822]" />
                  <span className="font-mono truncate">{property.agent.email}</span>
                </a>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setViewingModalOpen(true)}
                  className="w-full"
                >
                  Book Viewing Appointment
                </Button>
                <Link href="/contact" className="block w-full">
                  <Button variant="outline" size="md" className="w-full text-xs">
                    Inquire Confidentially
                  </Button>
                </Link>
              </div>
            </GlassCard>

            {/* Discretion Box */}
            <div className="bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-5 text-xs text-[#7e7365] space-y-2 shadow-sm">
              <div className="flex items-center gap-1.5 font-mono uppercase tracking-wider text-[#1F1B16] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#2e3a2f]" />
                <span>Protected Acquisition</span>
              </div>
              <p className="leading-relaxed">
                Amber Property Corner maintains an encrypted data room for floor engineering, title deeds, and land covenants.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties Section */}
      <section className="pt-12 border-t border-[#d8cebe]/60 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="stone" size="sm">Related Opportunities</Badge>
            <h3 className="font-display font-medium text-2xl text-[#1F1B16] mt-1">
              Similar Architectural Estates
            </h3>
          </div>
          <Link href="/properties">
            <Button variant="ghost" size="sm" className="text-xs">
              View Catalog &rarr;
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {similarProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      {/* Private Viewing Modal */}
      <ScheduleViewingModal
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
        property={property}
      />
    </div>
  );
}

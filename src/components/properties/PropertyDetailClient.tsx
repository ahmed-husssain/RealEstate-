'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/types';
import { SiteSettingsMap } from '@/lib/actions/admin-content';
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
  ArrowLeft,
  Clock,
  Sparkles,
  Key,
  Compass,
  FileCheck,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export interface PropertyDetailClientProps {
  property: Property;
  similarProperties: Property[];
  siteSettings?: SiteSettingsMap;
}

export function PropertyDetailClient({
  property,
  similarProperties,
  siteSettings,
}: PropertyDetailClientProps) {
  const [viewingModalOpen, setViewingModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isRental = property.status === 'for-lease';
  const isPlot = property.specs.propertyType === 'residential-plot' || property.specs.rawPropertyType === 'PLOT';
  const isCommercial = property.specs.propertyType === 'commercial-property' || property.specs.rawPropertyType === 'COMMERCIAL';

  // Dynamic Advisor Info from Site Settings or Property Agent fallback
  const advisorName = siteSettings?.advisor_name || property.agent.name || 'Syed Sikander Waqar';
  const advisorRole = siteSettings?.advisor_role || property.agent.title || 'Senior Managing Advisor | North Nazimabad & Construction';
  const advisorExperience = siteSettings?.advisor_experience || (property.agent.experienceYears ? `${property.agent.experienceYears} Years Exp` : '15 Years Exp');
  const advisorAvatar = siteSettings?.advisor_avatar || property.agent.avatarUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';
  const advisorPhone = siteSettings?.advisor_phone || property.agent.phone || '+92 300 822 4110';
  const advisorWhatsapp = siteSettings?.advisor_whatsapp || property.agent.whatsapp || '+923008224110';
  const advisorEmail = siteSettings?.advisor_email || property.agent.email || 'syedsikander1401@gmail.com';
  const defaultWaMsg = siteSettings?.advisor_wa_msg
    ? `${siteSettings.advisor_wa_msg} (${property.title} in ${property.location.neighborhood})`
    : `Assalam o Alaikum, I want to inquire about ${property.title} in ${property.location.neighborhood}.`;

  // Dynamic Mortgage Settings
  const mortgageTitle = siteSettings?.mortgage_title || 'Private Wealth Mortgage Estimator';
  const mortgageBadge = siteSettings?.mortgage_badge || 'Financial Modeling';
  const mortgageInterest = siteSettings?.mortgage_default_interest ? Number(siteSettings.mortgage_default_interest) : 6.25;
  const mortgageDownPayment = siteSettings?.mortgage_default_downpayment ? Number(siteSettings.mortgage_default_downpayment) : 20;
  const mortgageTerms = siteSettings?.mortgage_terms
    ? siteSettings.mortgage_terms.split(',').map((s) => Number(s.trim())).filter((n) => !isNaN(n) && n > 0)
    : [15, 30];
  const mortgageDisclaimer = siteSettings?.mortgage_disclaimer || '*Estimates provided for informational illustrative modeling. Subject to lender qualification and tax advisory review.';

  // Status Badge Label
  const getStatusBadge = () => {
    switch (property.status) {
      case 'for-lease':
        return <Badge variant="moss" size="sm">For Rent (Lease)</Badge>;
      case 'exclusive':
        return <Badge variant="exclusive" size="sm">Exclusive Listing</Badge>;
      case 'under-offer':
        return <Badge variant="stone" size="sm">Under Offer</Badge>;
      case 'sold':
        return <Badge variant="stone" size="sm">Sold</Badge>;
      case 'for-sale':
      default:
        return <Badge variant="exclusive" size="sm">For Sale</Badge>;
    }
  };

  // Human-readable category label
  const getCategoryBadge = () => {
    if (isPlot) return 'Residential Plot';
    if (isCommercial) return 'Commercial Property';
    if (property.specs.propertyType === 'floor-portion') return 'Floor Portion';
    if (property.specs.propertyType === 'modern-apartment') return 'Apartment';
    if (property.specs.propertyType === 'penthouse') return 'Penthouse';
    return 'Bungalow / Villa';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs font-mono text-[#7e7365]">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1 hover:text-[#1F1B16] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Properties
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3.5 py-1.5 rounded-full bg-[#fbf6f0] border border-[#d8cebe] hover:bg-white text-xs font-mono text-[#1F1B16] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-[#5c3822]" />
            <span>{copied ? 'Link Copied' : 'Share Property'}</span>
          </button>
        </div>
      </div>

      {/* Property Title & Pricing Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-[#d8cebe]/60">
        <div className="space-y-2.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            <Badge variant="stone" size="sm">
              {getCategoryBadge()}
            </Badge>
            <Badge variant="stone" size="sm">
              {property.location.neighborhood}, {property.location.city}
            </Badge>
          </div>

          <h1 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#7e7365]">
            <MapPin className="w-4 h-4 text-[#5c3822] shrink-0" />
            <span>{property.location.address}</span>
          </div>
        </div>

        {/* Price & Action Container */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
          <div className="text-left lg:text-right">
            <span className="text-[11px] font-mono text-[#7e7365] block">
              {isRental ? 'Monthly Rental Demand' : 'Demand / Price'}
            </span>
            <span className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16]">
              {property.priceFormatted}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              onClick={() => setViewingModalOpen(true)}
              className="w-full sm:w-auto text-xs sm:text-sm"
            >
              Book a Property Visit
            </Button>
          </div>
        </div>
      </div>

      {/* Interactive Photo Gallery */}
      <PropertyGallery
        images={{ hero: property.images.hero, gallery: property.images.gallery }}
        title={property.title}
      />

      {/* Adaptive Property Specs Ribbon */}
      <div className="flex flex-wrap gap-3">
        {/* Total Area / Footprint */}
        {property.specs.areaSize > 0 && (
          <div className="flex-1 min-w-[140px] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3.5 text-center shadow-sm">
            <Maximize2 className="w-4 h-4 mx-auto text-[#5c3822] mb-1" />
            <span className="text-[11px] font-mono uppercase text-[#7e7365] block">
              {isPlot ? 'Plot Area' : 'Total Area'}
            </span>
            <span className="font-display font-medium text-base text-[#1F1B16]">
              {property.specs.areaFormatted}
            </span>
          </div>
        )}

        {/* Bedrooms (Hidden for Plots and Commercial) */}
        {!isPlot && !isCommercial && property.specs.bedrooms > 0 && (
          <div className="flex-1 min-w-[120px] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3.5 text-center shadow-sm">
            <Bed className="w-4 h-4 mx-auto text-[#5c3822] mb-1" />
            <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Bedrooms</span>
            <span className="font-display font-medium text-base text-[#1F1B16]">
              {property.specs.bedrooms} Beds
            </span>
          </div>
        )}

        {/* Bathrooms / Washrooms (Hidden for Plots) */}
        {!isPlot && property.specs.bathrooms > 0 && (
          <div className="flex-1 min-w-[120px] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3.5 text-center shadow-sm">
            <Bath className="w-4 h-4 mx-auto text-[#5c3822] mb-1" />
            <span className="text-[11px] font-mono uppercase text-[#7e7365] block">
              {isCommercial ? 'Washrooms' : 'Bathrooms'}
            </span>
            <span className="font-display font-medium text-base text-[#1F1B16]">
              {property.specs.bathrooms} Baths
            </span>
          </div>
        )}

        {/* Built Year (Only if entered and not a plot) */}
        {!isPlot && Boolean(property.specs.yearBuilt && property.specs.yearBuilt > 0) && (
          <div className="flex-1 min-w-[120px] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3.5 text-center shadow-sm">
            <Calendar className="w-4 h-4 mx-auto text-[#5c3822] mb-1" />
            <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Built Year</span>
            <span className="font-display font-medium text-base text-[#1F1B16]">
              {property.specs.yearBuilt}
            </span>
          </div>
        )}

        {/* Car Parking (Only if > 0 and not a plot) */}
        {!isPlot && property.specs.parkingSpaces > 0 && (
          <div className="flex-1 min-w-[120px] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3.5 text-center shadow-sm">
            <Clock className="w-4 h-4 mx-auto text-[#5c3822] mb-1" />
            <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Car Parking</span>
            <span className="font-display font-medium text-base text-[#1F1B16]">
              {property.specs.parkingSpaces} Cars
            </span>
          </div>
        )}

        {/* Condition (Hidden for Plots) */}
        {!isPlot && property.specs.condition && (
          <div className="flex-1 min-w-[120px] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3.5 text-center shadow-sm">
            <Sparkles className="w-4 h-4 mx-auto text-[#5c3822] mb-1" />
            <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Condition</span>
            <span className="font-display font-medium text-base text-[#2e3a2f]">
              {property.specs.condition}
            </span>
          </div>
        )}

        {/* Plot Status Chip for Plots */}
        {isPlot && (
          <div className="flex-1 min-w-[140px] bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-3.5 text-center shadow-sm">
            <Compass className="w-4 h-4 mx-auto text-[#5c3822] mb-1" />
            <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Plot Status</span>
            <span className="font-display font-medium text-base text-[#2e3a2f]">
              Ready to Build
            </span>
          </div>
        )}
      </div>

      {/* Main Content & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
        {/* Left Column: Description, Features, Floorplans, Calculator / Lease Terms */}
        <div className="lg:col-span-8 space-y-8">
          {/* Property Overview */}
          <div className="space-y-3">
            <h3 className="font-display font-medium text-xl text-[#1F1B16]">
              Property Overview
            </h3>
            <p className="text-xs sm:text-sm text-[#7e7365] leading-relaxed font-sans whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Key Highlights */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {property.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#fbf6f0] border border-[#d8cebe] space-y-1.5 shadow-sm"
                  >
                    <h4 className="font-display font-medium text-sm text-[#1F1B16]">
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

          {/* Features & Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                Features & Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-[#fbf6f0] border border-[#d8cebe]/70 text-xs font-sans text-[#1F1B16] shadow-sm"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floor Plans Viewer */}
          {property.images.floorPlans && property.images.floorPlans.length > 0 && (
            <FloorPlanViewer floorPlans={property.images.floorPlans} />
          )}

          {/* Smart Financials Module: Mortgage for Sale vs Lease Terms for Rental */}
          {isRental ? (
            <GlassCard
              variant="container"
              rounded="2rem"
              className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4 shadow-sm"
            >
              <div className="flex items-center gap-2.5 border-b border-[#d8cebe]/60 pb-3">
                <div className="w-9 h-9 rounded-full bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center shrink-0">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                    Lease & Rental Guidelines
                  </h3>
                  <p className="text-xs text-[#7e7365]">
                    Standard tenancy structure and security deposit policies
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 bg-white border border-[#d8cebe] rounded-2xl space-y-1 shadow-sm">
                  <span className="text-[10px] font-mono text-[#7e7365] block uppercase">Monthly Rent</span>
                  <span className="font-semibold text-sm text-[#1F1B16]">{property.priceFormatted}</span>
                </div>
                <div className="p-3.5 bg-white border border-[#d8cebe] rounded-2xl space-y-1 shadow-sm">
                  <span className="text-[10px] font-mono text-[#7e7365] block uppercase">Security Deposit</span>
                  <span className="font-semibold text-sm text-[#1F1B16]">2 - 3 Months Rent</span>
                </div>
                <div className="p-3.5 bg-white border border-[#d8cebe] rounded-2xl space-y-1 shadow-sm">
                  <span className="text-[10px] font-mono text-[#7e7365] block uppercase">Tenancy Period</span>
                  <span className="font-semibold text-sm text-[#1F1B16]">11 Months (Renewable)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#efebe4] text-xs text-[#5c3822] flex items-start gap-2">
                <FileCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Amber Property Corner prepares registered tenancy agreements, utility transfer verifications, and professional inventory check-ins for tenant peace of mind.
                </p>
              </div>
            </GlassCard>
          ) : (
            <MortgageCalculator
              initialPrice={property.price}
              title={mortgageTitle}
              badge={mortgageBadge}
              defaultInterestRate={mortgageInterest}
              defaultDownPaymentPercent={mortgageDownPayment}
              terms={mortgageTerms}
              disclaimer={mortgageDisclaimer}
            />
          )}
        </div>

        {/* Right Sticky Sidebar: Dynamic Advisor Card (Screenshot 1) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="lg:sticky lg:top-24 space-y-5">
            <GlassCard variant="card" rounded="2rem" className="p-6 space-y-5 bg-[#fbf6f0] border border-[#d8cebe] shadow-sm">
              <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
                <Badge variant="exclusive" size="sm">PROPERTY ADVISOR</Badge>
                <Badge variant="stone" size="sm">{advisorExperience}</Badge>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#5c3822] shrink-0 bg-[#e5decb] shadow-sm">
                  <Image
                    src={advisorAvatar}
                    alt={advisorName}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-medium text-base text-[#1F1B16]">
                    {advisorName}
                  </h4>
                  <p className="text-xs text-[#7e7365]">
                    {advisorRole}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <a
                  href={`https://wa.me/${advisorWhatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultWaMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 hover:bg-[#22c55e]/25 text-[#1F1B16] transition-colors group cursor-pointer"
                  aria-label="Chat with Listing Advisor on WhatsApp"
                >
                  <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/amber-property-corner-whatsapp.png"
                      alt="WhatsApp"
                      fill
                      sizes="20px"
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-xs text-[#1F1B16]">
                    Chat on WhatsApp
                  </span>
                </a>
                <a
                  href={`tel:${advisorPhone}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#d8cebe] hover:bg-[#f5efe6] text-[#1F1B16] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#5c3822]" />
                  <span className="font-mono">{advisorPhone}</span>
                </a>
                <a
                  href={`mailto:${advisorEmail}`}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#d8cebe] hover:bg-[#f5efe6] text-[#1F1B16] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#5c3822]" />
                  <span className="font-mono truncate">{advisorEmail}</span>
                </a>
              </div>

              <div className="space-y-2 pt-1">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setViewingModalOpen(true)}
                  className="w-full text-xs"
                >
                  Book a Visit
                </Button>
                <Link href="/contact" className="block w-full">
                  <Button variant="outline" size="md" className="w-full text-xs">
                    Send Message
                  </Button>
                </Link>
              </div>
            </GlassCard>

            {/* Verification Guarantee Box */}
            <div className="bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-4 text-xs text-[#7e7365] space-y-1.5 shadow-sm">
              <div className="flex items-center gap-1.5 font-semibold text-[#1F1B16]">
                <ShieldCheck className="w-4 h-4 text-[#2e3a2f]" />
                <span>Verified Documentation</span>
              </div>
              <p className="leading-relaxed">
                All property files, title deeds, and transfer records are checked by our team for safe and smooth transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="space-y-5 pt-8 border-t border-[#d8cebe]/60">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-medium text-xl text-[#1F1B16]">
              Similar Properties
            </h3>
            <Link href="/properties">
              <span className="text-xs font-mono uppercase tracking-wider text-[#5c3822] hover:underline">
                View All &rarr;
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      )}

      {/* Schedule Viewing Modal */}
      <ScheduleViewingModal
        isOpen={viewingModalOpen}
        onClose={() => setViewingModalOpen(false)}
        property={property}
      />
    </div>
  );
}

export default PropertyDetailClient;

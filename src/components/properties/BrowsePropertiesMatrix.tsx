'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  MapPin,
  Building2,
  Store,
  Key,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  MessageCircle,
  Compass,
} from 'lucide-react';

type CategoryKey = 'houses' | 'plots' | 'apartments' | 'commercial' | 'rentals';

interface CategoryData {
  id: CategoryKey;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  sizesTitle: string;
  sizes: Array<{ label: string; dimension?: string; query: string }>;
  areasTitle: string;
  areas: Array<{ label: string; subtext: string; query: string }>;
  featuresTitle: string;
  features: Array<{ label: string; tag: string; query: string }>;
  whatsappMsg: string;
}

// ponytail: static in-memory discovery matrix; no runtime API fetches for instant 0ms tab switching
const CATEGORIES: Record<CategoryKey, CategoryData> = {
  houses: {
    id: 'houses',
    label: 'Houses (80–1000 Gaz)',
    shortLabel: 'Houses',
    icon: Home,
    sizesTitle: 'Popular Gaz Sizes',
    sizes: [
      { label: '120 Gaz House', dimension: "24' × 45'", query: '120' },
      { label: '240 Gaz Bangalow', dimension: "30' × 72'", query: '240' },
      { label: '400 Gaz House', dimension: "36' × 100'", query: '400' },
      { label: '500 Gaz Luxury Bangalow', dimension: "45' × 100'", query: '500' },
      { label: '1000 Gaz Elite Mansion', dimension: "60' × 150'", query: '1000' },
      { label: '80 Gaz Townhouse', dimension: "18' × 40'", query: '80' },
    ],
    areasTitle: 'Prime Karachi Areas',
    areas: [
      { label: 'North Nazimabad', subtext: 'Blocks A to W', query: 'North Nazimabad' },
      { label: 'Gulshan-e-Iqbal', subtext: 'Blocks 1 to 19', query: 'Gulshan-e-Iqbal' },
      { label: 'Federal B Area', subtext: 'Blocks 1 to 21', query: 'Federal B Area' },
      { label: 'Scheme 33', subtext: 'Gated Societies', query: 'Scheme 33' },
      { label: 'Buffer Zone', subtext: 'Sector 15-A & B', query: 'Buffer Zone' },
    ],
    featuresTitle: 'Paperwork & Key Features',
    features: [
      { label: 'Clean 99-Year Leased', tag: 'KDA / KMC Verified', query: 'leased' },
      { label: 'Bank Financing Ready', tag: 'Meezan / HBL Eligible', query: 'bank-ready' },
      { label: 'Sub-Lease & Mutation Done', tag: '100% Clear Title', query: 'sub-lease' },
      { label: 'Brand New (Zero-Meter)', tag: 'Ready to Move', query: 'brand-new' },
      { label: 'Corner & West Open', tag: 'Prime Air & Light', query: 'corner' },
      { label: 'Double Unit (2 Portions)', tag: 'Separate Gas & Electric', query: 'double-unit' },
    ],
    whatsappMsg: 'Assalam-o-Alaikum Sikander Bhai, I am looking for a House in Karachi. Please share verified direct owner options and video walkthroughs.',
  },
  plots: {
    id: 'plots',
    label: 'Residential & Commercial Plots',
    shortLabel: 'Plots',
    icon: MapPin,
    sizesTitle: 'Popular Plot Sizes',
    sizes: [
      { label: '80 Gaz Plot', dimension: 'Townhouse Size', query: '80' },
      { label: '120 Gaz Residential Plot', dimension: 'Most Demanded', query: '120' },
      { label: '240 Gaz Plot', dimension: 'Standard Bangalow', query: '240' },
      { label: '400 Gaz Plot', dimension: 'Executive Plot', query: '400' },
      { label: '500 Gaz Plot', dimension: 'Luxury Bangalow', query: '500' },
      { label: 'Commercial Open Plot', dimension: 'Main Road', query: 'commercial-plot' },
    ],
    areasTitle: 'High-Demand Plot Enclaves',
    areas: [
      { label: 'Scheme 33 (Gulzar-e-Hijri)', subtext: 'Gated Societies', query: 'Scheme 33' },
      { label: 'Scheme 45 (Taiser Town)', subtext: 'Sector 40 to 80', query: 'Scheme 45' },
      { label: 'North Karachi Sector 5', subtext: 'Residential Plots', query: 'North Karachi' },
      { label: 'Northern Bypass Corridor', subtext: 'Long Term Investment', query: 'Northern Bypass' },
      { label: 'Gulshan-e-Maymar Environs', subtext: 'Peaceful Sector', query: 'Gulshan-e-Maymar' },
    ],
    featuresTitle: 'Verification & Status',
    features: [
      { label: 'Possession & Utility Paid', tag: 'Ready for Construction', query: 'possession' },
      { label: 'Direct Allottee File', tag: '1st Owner Paperwork', query: 'allottee' },
      { label: 'Clear Leased File', tag: 'KDA / Society Approved', query: 'leased' },
      { label: 'Park Facing & Corner', tag: 'High Resale Value', query: 'corner-park' },
      { label: 'Main Boulevard 100-Ft', tag: 'Commercial Potential', query: 'main-road' },
    ],
    whatsappMsg: 'Assalam-o-Alaikum Sikander Bhai, I am looking for a Plot in Karachi (Scheme 33 / North Nazimabad / Scheme 45). Please share clean file options.',
  },
  apartments: {
    id: 'apartments',
    label: 'Flats & Apartments',
    shortLabel: 'Flats',
    icon: Building2,
    sizesTitle: 'Apartment Layouts',
    sizes: [
      { label: '2-Bed Lounge Flat', dimension: 'Ideal for Small Families', query: '2-bed' },
      { label: '3-Bed Drawing Dining', dimension: 'Executive Family Flat', query: '3-bed' },
      { label: '4-Bed Luxury Apartment', dimension: 'Spacious Unit', query: '4-bed' },
      { label: 'Duplex Penthouse', dimension: 'Top Floor Sky Unit', query: 'penthouse' },
      { label: 'Ground Floor Apartment', dimension: 'With Lawn / Porch', query: 'ground-floor' },
    ],
    areasTitle: 'Prime Apartment Locations',
    areas: [
      { label: 'Gulshan Block 13-D & 13-A', subtext: 'Family Buildings', query: 'Gulshan-e-Iqbal' },
      { label: 'North Nazimabad Blocks L & H', subtext: 'Central Location', query: 'North Nazimabad' },
      { label: 'FB Area (Water Pump & Aisha Manzil)', subtext: 'Convenient Transit', query: 'Federal B Area' },
      { label: 'Clifton & Defense Enclaves', subtext: 'Luxury High-Rise', query: 'Clifton' },
      { label: 'Scheme 33 Main Highway', subtext: 'Modern Complexes', query: 'Scheme 33' },
    ],
    featuresTitle: 'Building Amenities & Legal',
    features: [
      { label: 'Standby Generator', tag: '24/7 Power Backup', query: 'generator' },
      { label: 'Dedicated Basement Parking', tag: 'Reserved Spot', query: 'parking' },
      { label: 'Dual High-Speed Lifts', tag: 'With Backup Inverter', query: 'lift' },
      { label: 'Clean Sub-Lease Ready', tag: 'Bank Loan Eligible', query: 'sub-lease' },
      { label: 'Gated Security Complex', tag: 'CCTV & Guards', query: 'gated' },
    ],
    whatsappMsg: 'Assalam-o-Alaikum Sikander Bhai, I am looking for a Flat / Apartment in Karachi. Please share verified building listings with lift and generator.',
  },
  commercial: {
    id: 'commercial',
    label: 'Commercial Properties',
    shortLabel: 'Commercial',
    icon: Store,
    sizesTitle: 'Commercial Units',
    sizes: [
      { label: 'Commercial Shop', dimension: 'Ground Floor Footfall', query: 'shop' },
      { label: 'Bank-Leased Plaza', dimension: 'Secure Monthly Income', query: 'bank-leased' },
      { label: 'Marriage Hall & Banquet', dimension: 'High Commercial Return', query: 'banquet' },
      { label: 'Multi-Storey Building', dimension: 'Full Plaza for Sale', query: 'commercial-building' },
      { label: 'Corporate Office Floor', dimension: 'Ready for IT / Corporate', query: 'office' },
    ],
    areasTitle: 'High-Footfall Markets',
    areas: [
      { label: 'North Nazimabad Main Hydri', subtext: 'Premier Shopping Zone', query: 'North Nazimabad' },
      { label: 'Gulshan University Road', subtext: 'Commercial Corridor', query: 'Gulshan-e-Iqbal' },
      { label: 'Water Pump & Samanabad', subtext: 'FB Area Commercial Hub', query: 'Federal B Area' },
      { label: 'Scheme 33 Super Highway', subtext: 'Growing Trade Area', query: 'Scheme 33' },
    ],
    featuresTitle: 'Commercial Attributes',
    features: [
      { label: 'High Monthly Rental Yield', tag: 'Immediate Cashflow', query: 'rental-yield' },
      { label: 'Bank Lease Agreement in Place', tag: 'Corporate Tenant', query: 'bank-tenant' },
      { label: 'Main Corner / Front Road', tag: 'Maximum Visibility', query: 'corner' },
      { label: 'Heavy Pedestrian Footfall', tag: 'Active Commercial Zone', query: 'footfall' },
    ],
    whatsappMsg: 'Assalam-o-Alaikum Sikander Bhai, I am looking for Commercial Property in Karachi (Shop / Plaza / Hall). Please share direct owner options.',
  },
  rentals: {
    id: 'rentals',
    label: 'Rental Homes & Portions',
    shortLabel: 'Rentals',
    icon: Key,
    sizesTitle: 'Rental Options',
    sizes: [
      { label: 'Upper Portion for Rent', dimension: 'Separate Staircase & Gate', query: 'upper-portion' },
      { label: 'Lower Portion for Rent', dimension: 'Car Porch & Front Lawn', query: 'lower-portion' },
      { label: 'Full Independent Bangalow', dimension: '120 to 500 Gaz', query: 'full-house' },
      { label: 'Furnished Executive Flat', dimension: 'Ready to Move In', query: 'furnished-flat' },
    ],
    areasTitle: 'Popular Family Rental Areas',
    areas: [
      { label: 'North Nazimabad Family Blocks', subtext: 'Blocks B, D, F, H, J', query: 'North Nazimabad' },
      { label: 'Gulshan-e-Iqbal Central', subtext: 'Near Main Amenities', query: 'Gulshan-e-Iqbal' },
      { label: 'FB Area Blocks 14 & 15', subtext: 'Peaceful Streets', query: 'Federal B Area' },
      { label: 'Saadi Town Scheme 33', subtext: 'Gated Family Community', query: 'Scheme 33' },
    ],
    featuresTitle: 'Utility & Security Checklist',
    features: [
      { label: 'Separate Gas & Electric Meters', tag: 'No Shared Bills', query: 'separate-meters' },
      { label: 'Sweet Line Water Supply', tag: 'Regular Line Water', query: 'sweet-water' },
      { label: 'Dedicated Car Parking Porch', tag: 'Safe Secure Parking', query: 'car-parking' },
      { label: 'Family Only Residential Zone', tag: 'Safe Neighborhood', query: 'family-only' },
    ],
    whatsappMsg: 'Assalam-o-Alaikum Sikander Bhai, I am looking for a Rental Home / Portion in Karachi. Please share available family-friendly options.',
  },
};

export function BrowsePropertiesMatrix() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('houses');
  const current = CATEGORIES[activeTab];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#fbf6f0] border border-[#d8cebe] rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#d8cebe]/60 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-white border border-[#d8cebe] rounded-full py-1 px-3 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-[#5c3822]" />
              <span className="text-[11px] font-mono font-medium text-[#5c3822] uppercase tracking-wider">
                Karachi Property Explorer
              </span>
            </div>
            <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16] tracking-tight">
              Browse Properties by Size, Area &amp; Verification
            </h2>
            <p className="text-xs sm:text-sm text-[#7e7365]">
              Explore verified houses, plots, flats, and commercial assets tailored to Karachi&apos;s most demanded specifications.
            </p>
          </div>

          <Link href="/properties">
            <span className="text-xs font-mono text-[#5c3822] hover:underline flex items-center gap-1">
              Explore All Listings <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Category Filter Tabs (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
            const cat = CATEGORIES[key];
            const Icon = cat.icon;
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`cursor-pointer whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm'
                    : 'bg-white text-[#1F1B16] border border-[#d8cebe] hover:border-[#5c3822]/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8F4ED]' : 'text-[#5c3822]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Structured Content Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Sizes & Dimensions */}
          <div className="bg-white border border-[#d8cebe] rounded-2xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#d8cebe]/60">
              <span className="text-xs font-mono font-medium text-[#1F1B16] uppercase tracking-wider">
                {current.sizesTitle}
              </span>
            </div>
            <div className="space-y-1.5">
              {current.sizes.map((item) => (
                <Link
                  key={item.label}
                  href={`/properties?q=${encodeURIComponent(item.query)}`}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#fbf6f0] border border-transparent hover:border-[#d8cebe] transition-all"
                >
                  <span className="text-xs text-[#1F1B16] group-hover:text-[#5c3822] font-medium transition-colors">
                    {item.label}
                  </span>
                  {item.dimension && (
                    <span className="text-[10px] font-mono text-[#2e3a2f] bg-[#2e3a2f]/10 px-2 py-0.5 rounded-md">
                      {item.dimension}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Prime Karachi Neighborhoods */}
          <div className="bg-white border border-[#d8cebe] rounded-2xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#d8cebe]/60">
              <span className="text-xs font-mono font-medium text-[#1F1B16] uppercase tracking-wider">
                {current.areasTitle}
              </span>
            </div>
            <div className="space-y-1.5">
              {current.areas.map((area) => (
                <Link
                  key={area.label}
                  href={`/properties?neighborhood=${encodeURIComponent(area.query)}&status=for-sale`}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#fbf6f0] border border-transparent hover:border-[#d8cebe] transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs text-[#1F1B16] group-hover:text-[#5c3822] font-medium transition-colors">
                      {area.label}
                    </div>
                    <div className="text-[10px] text-[#7e7365] font-mono">{area.subtext}</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7e7365] group-hover:text-[#5c3822] transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Paperwork & Key Features */}
          <div className="bg-white border border-[#d8cebe] rounded-2xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2 pb-2 border-b border-[#d8cebe]/60">
              <span className="text-xs font-mono font-medium text-[#1F1B16] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2e3a2f]" />
                {current.featuresTitle}
              </span>
            </div>
            <div className="space-y-1.5">
              {current.features.map((feat) => (
                <Link
                  key={feat.label}
                  href={`/properties?q=${encodeURIComponent(feat.query)}`}
                  className="group flex items-center justify-between p-2 rounded-xl hover:bg-[#fbf6f0] border border-transparent hover:border-[#d8cebe] transition-all"
                >
                  <div className="space-y-0.5">
                    <div className="text-xs text-[#1F1B16] group-hover:text-[#2e3a2f] font-medium transition-colors flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2e3a2f]" />
                      {feat.label}
                    </div>
                    <div className="text-[10px] text-[#7e7365] font-mono pl-5">{feat.tag}</div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7e7365] group-hover:text-[#2e3a2f] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 1-Click WhatsApp Direct Matcher Desk */}
        <div className="bg-white border border-[#d8cebe] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-medium text-[#1F1B16] uppercase tracking-wider flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#2e3a2f]" />
              Need Direct Owner Options or Unlisted Video Tours?
            </div>
            <p className="text-xs text-[#7e7365]">
              Speak directly with Syed Sikander Waqar to receive off-market listings and verified paperwork files.
            </p>
          </div>

          <a
            href={`https://wa.me/923327906034?text=${encodeURIComponent(current.whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#2e3a2f] hover:bg-[#222c23] text-white px-5 py-2.5 rounded-xl text-xs font-medium transition-colors shadow-xs shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Sikander Waqar (+92 332 7906034)</span>
          </a>
        </div>

        {/* Karachi Gaz Quick Conversion Guide Ribbon */}
        <div className="bg-[#fbf6f0] border border-[#d8cebe]/70 rounded-xl px-4 py-2 text-center text-[11px] font-mono text-[#7e7365]">
          <span className="font-semibold text-[#5c3822]">Karachi Gaz Quick Guide:</span>{' '}
          120 Gaz = 1,080 Sq Ft (24&apos;×45&apos;) &bull; 240 Gaz = 2,160 Sq Ft (30&apos;×72&apos;) &bull; 500 Gaz = 4,500 Sq Ft (45&apos;×100&apos;)
        </div>
      </div>
    </section>
  );
}

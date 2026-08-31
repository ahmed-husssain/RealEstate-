'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { submitValuationAction } from '@/lib/actions/valuation';
import { SiteSettingsMap } from '@/lib/actions/admin-content';
import { PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import confetti from 'canvas-confetti';
import Image from 'next/image';

interface ValuationClientProps {
  siteSettings: SiteSettingsMap;
}

// Clean integer input sanitizer for user inputs (0-9 only, removes leading zeros)
function handleIntegerChange(raw: string, setter: (val: number | '') => void) {
  const digitsOnly = raw.replace(/\D/g, '');
  if (!digitsOnly) {
    setter('');
    return;
  }
  setter(parseInt(digitsOnly, 10));
}

export function ValuationClient({ siteSettings }: ValuationClientProps) {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('luxury-villa');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('North Nazimabad');
  
  // Clean integer states
  const [areaSqYd, setAreaSqYd] = useState<number | ''>(240);
  const [bedrooms, setBedrooms] = useState<number | ''>(5);
  const [bathrooms, setBathrooms] = useState<number | ''>(6);

  const [condition, setCondition] = useState('turnkey');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [websiteHp, setWebsiteHp] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isPlot = propertyType === 'estate';

  // Dynamic BTS Calculation Engine using Database Rates
  const calculateEstimate = () => {
    // 1. Get Area Base Gaz Rate from DB
    let basePerSqYd = 280000; // Default fallback
    if (city.includes('Clifton')) {
      basePerSqYd = Number(siteSettings.val_rate_clifton) || 350000;
    } else if (city.includes('North Nazimabad')) {
      basePerSqYd = Number(siteSettings.val_rate_north_nazimabad) || 280000;
    } else if (city.includes('Gulshan')) {
      basePerSqYd = Number(siteSettings.val_rate_gulshan) || 260000;
    } else if (city.includes('Federal B Area') || city.includes('F.B Area')) {
      basePerSqYd = Number(siteSettings.val_rate_fb_area) || 220000;
    } else if (city.includes('Gulberg')) {
      basePerSqYd = Number(siteSettings.val_rate_gulberg) || 210000;
    } else if (city.includes('Buffer Zone')) {
      basePerSqYd = Number(siteSettings.val_rate_buffer_zone) || 190000;
    } else if (city.includes('Scheme 33')) {
      basePerSqYd = Number(siteSettings.val_rate_scheme33) || 175000;
    } else if (city.includes('North Karachi')) {
      basePerSqYd = Number(siteSettings.val_rate_north_karachi) || 160000;
    } else if (city.includes('Scheme 45') || city.includes('Taiser')) {
      basePerSqYd = Number(siteSettings.val_rate_scheme45) || 75000;
    }

    // 2. Category Multiplier from DB (handles float 0.65 or percentage 65)
    const parseMultiplier = (rawVal: string | undefined, defaultFloat: number): number => {
      if (!rawVal) return defaultFloat;
      const num = parseFloat(rawVal);
      if (isNaN(num) || num <= 0) return defaultFloat;
      if (num > 2.0) return num / 100;
      return num;
    };

    let catMultiplier = 1.0;
    if (propertyType === 'estate') {
      catMultiplier = parseMultiplier(siteSettings.val_mult_plot, 0.65);
    } else if (propertyType === 'modern-apartment') {
      catMultiplier = parseMultiplier(siteSettings.val_mult_apartment, 0.75);
    } else if (propertyType === 'penthouse') {
      catMultiplier = parseMultiplier(siteSettings.val_mult_penthouse, 0.90);
    } else if (propertyType === 'townhouse') {
      catMultiplier = parseMultiplier(siteSettings.val_mult_townhouse, 0.85);
    } else {
      catMultiplier = parseMultiplier(siteSettings.val_mult_house, 1.00);
    }

    // 3. Condition Multiplier from DB
    let condMultiplier = 1.05;
    if (condition === 'museum') {
      condMultiplier = parseMultiplier(siteSettings.val_cond_brand_new, 1.25);
    } else if (condition === 'turnkey') {
      condMultiplier = parseMultiplier(siteSettings.val_cond_well_maintained, 1.05);
    } else if (condition === 'renovation') {
      condMultiplier = parseMultiplier(siteSettings.val_cond_renovation, 0.85);
    }

    const currentArea = typeof areaSqYd === 'number' && areaSqYd > 0 ? areaSqYd : 240;
    const estimatedMid = currentArea * basePerSqYd * catMultiplier * condMultiplier;
    const low = Math.round((estimatedMid * 0.93) / 100000) * 100000;
    const high = Math.round((estimatedMid * 1.07) / 100000) * 100000;
    const mid = Math.round(estimatedMid / 100000) * 100000;

    return { low, high, mid, avgSqYd: Math.round(mid / currentArea) };
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const est = calculateEstimate();
    const finalArea = typeof areaSqYd === 'number' && areaSqYd > 0 ? areaSqYd : 240;
    const finalBeds = typeof bedrooms === 'number' ? bedrooms : (isPlot ? 0 : 4);
    const finalBaths = typeof bathrooms === 'number' ? bathrooms : (isPlot ? 0 : 4);

    try {
      let pType: PropertyType = PropertyType.HOUSE;
      if (propertyType === 'luxury-villa') pType = PropertyType.VILLA;
      if (propertyType === 'penthouse') pType = PropertyType.PENTHOUSE;
      if (propertyType === 'estate') pType = PropertyType.ESTATE;
      if (propertyType === 'townhouse') pType = PropertyType.TOWNHOUSE;
      if (propertyType === 'modern-apartment') pType = PropertyType.APARTMENT;

      let cond: PropertyCondition = PropertyCondition.GOOD;
      if (condition === 'museum') cond = PropertyCondition.EXCELLENT;
      if (condition === 'turnkey') cond = PropertyCondition.BRAND_NEW;
      if (condition === 'renovation') cond = PropertyCondition.NEEDS_RENOVATION;

      const res = await submitValuationAction({
        propertyType: pType,
        areaName: `${address ? address + ', ' : ''}${city}`,
        areaSize: finalArea,
        areaUnit: AreaUnit.SQYD,
        bedrooms: finalBeds,
        bathrooms: finalBaths,
        condition: cond,
        ownerName: contactName,
        ownerPhone: contactPhone,
        ownerEmail: contactEmail,
        estimatedMin: est.low,
        estimatedMax: est.high,
        website_hp: websiteHp,
      });

      if (res.success) {
        setIsCalculated(true);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#5c3822', '#2e3a2f', '#D8CEBE', '#847666'],
          });
        } catch (err) {}
      } else {
        setErrorMessage(res.error || 'Failed to calculate valuation');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const estimate = calculateEstimate();
  const currentArea = typeof areaSqYd === 'number' && areaSqYd > 0 ? areaSqYd : 240;
  const advisorWhatsapp = (siteSettings.advisor_whatsapp || siteSettings.whatsapp_number || '923008224110').replace(/[^0-9]/g, '');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="exclusive" size="sm">Free Tool</Badge>
          <Badge variant="stone" size="sm">Karachi Real Estate Index</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
          Karachi Property Valuation Calculator
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-lg mx-auto">
          Instant algorithm-driven market valuation for houses, plots, and apartments across North Nazimabad, Gulshan, FB Area, Scheme 33, and prime sectors.
        </p>
      </div>

      {/* Main Valuation Container */}
      <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 shadow-xl bg-[#fbf6f0]">
        {isCalculated ? (
          /* Result View */
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
                Estimated Market Value
              </h2>
              <p className="text-xs text-[#7e7365]">
                {address ? `${address}, ` : ''}{city} • {currentArea} Sq Yds
              </p>
            </div>

            {/* Valuation Figure Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#d8cebe] text-center space-y-2.5 shadow-sm">
              <span className="text-[11px] font-mono text-[#7e7365] block uppercase">
                Expected Market Price Range
              </span>
              <div className="text-2xl sm:text-4xl font-display font-medium text-[#1F1B16]">
                {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <Badge variant="moss" size="sm">
                  Average: {formatCurrency(estimate.mid)}
                </Badge>
                <Badge variant="stone" size="sm">
                  {formatCurrency(estimate.avgSqYd)} / Gaz
                </Badge>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Location Benchmark</span>
                <span className="font-semibold text-[#1F1B16]">{city}</span>
                <p className="text-[11px] text-[#7e7365]">Active market transaction demand index.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Algorithm Accuracy</span>
                <span className="font-semibold text-[#2e3a2f]">Live BTS DB Model</span>
                <p className="text-[11px] text-[#7e7365]">Verified against Amber Property Corner rates.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Market Trend</span>
                <span className="font-semibold text-[#1F1B16]">Appreciating Steady</span>
                <p className="text-[11px] text-[#7e7365]">High capital growth in central Karachi.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-[#d8cebe]/60">
              <a
                href={`https://wa.me/${advisorWhatsapp}?text=${encodeURIComponent(
                  `Assalam o Alaikum, I used the price calculator for my ${currentArea} Sq Yd property in ${city}. Estimated valuation: ${formatCurrency(
                    estimate.mid
                  )}. I would like a formal evaluation and site visit.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" size="lg" className="w-full text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0">
                      <Image
                        src="/amber-property-corner-whatsapp.png"
                        alt="WhatsApp"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>Chat on WhatsApp for Official Evaluation</span>
                  </div>
                </Button>
              </a>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setIsCalculated(false);
                  setStep(1);
                }}
              >
                Calculate Another Property
              </Button>
            </div>
          </div>
        ) : (
          /* Multi-Step Form */
          <form onSubmit={handleFinalSubmit} className="space-y-5">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3 text-xs font-mono">
              <span className="text-[#5c3822] font-semibold">
                Step {step} of 3
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-1.5 rounded-full transition-all ${
                      s <= step ? 'bg-[#5c3822]' : 'bg-[#d8cebe]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Property Identity */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                  1. Property Type & Location
                </h3>
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono font-medium text-[#7e7365] mb-2">
                      Select Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'luxury-villa', label: 'Bungalow / House' },
                        { id: 'estate', label: 'Residential Plot' },
                        { id: 'modern-apartment', label: 'Apartment / Flat' },
                        { id: 'penthouse', label: 'Penthouse' },
                        { id: 'townhouse', label: 'Townhouse / Duplex' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPropertyType(type.id)}
                          className={`p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                            propertyType === type.id
                              ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-sm font-semibold'
                              : 'bg-white text-[#1F1B16] border-[#d8cebe] hover:border-[#5c3822]'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-medium text-[#7e7365]">
                      Select Karachi Area
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner cursor-pointer"
                    >
                      <option value="North Nazimabad">North Nazimabad (Blocks A–W)</option>
                      <option value="Gulshan-e-Iqbal">Gulshan-e-Iqbal (All Blocks)</option>
                      <option value="Federal B Area">Federal B Area (F.B Area)</option>
                      <option value="Scheme 33">Scheme 33 (Gulzar-e-Hijri)</option>
                      <option value="Buffer Zone">Buffer Zone (Sector 15-A & B)</option>
                      <option value="North Karachi">North Karachi (Sectors 1–11)</option>
                      <option value="Gulberg">Gulberg Karachi</option>
                      <option value="Scheme 45">Scheme 45 (Taiser Town)</option>
                      <option value="Clifton">Clifton & Sea View</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
                      Street / Block Details (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Block F, Street 14 / Sector 15-A"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(2)}>
                    <span>Next: Size & Condition</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Dimensions & Condition (Single-Line Row & Strict Clean Integers) */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                  2. Dimensions & Property Condition
                </h3>
                
                {/* Single Horizontal Row for Plot Size, Bedrooms, Bathrooms (Strict Clean Integers, No Spinners) */}
                <div className={`grid gap-3.5 ${isPlot ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {/* Plot / Covered Size */}
                  <div className="space-y-1">
                    <label className="block text-[10px] sm:text-xs font-mono font-medium text-[#7e7365] uppercase tracking-wider">
                      {isPlot ? 'Plot Size (Sq Yds / Gaz) *' : 'Plot / Covered Size (Sq Yds) *'}
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="240"
                      value={areaSqYd === '' ? '' : areaSqYd}
                      onChange={(e) => handleIntegerChange(e.target.value, setAreaSqYd)}
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm font-mono font-medium outline-none focus:border-[#5c3822] shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      required
                    />
                  </div>

                  {/* Bedrooms (Hidden for Plots) */}
                  {!isPlot && (
                    <div className="space-y-1">
                      <label className="block text-[10px] sm:text-xs font-mono font-medium text-[#7e7365] uppercase tracking-wider">
                        Bedrooms *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="5"
                        value={bedrooms === '' ? '' : bedrooms}
                        onChange={(e) => handleIntegerChange(e.target.value, setBedrooms)}
                        className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm font-mono font-medium outline-none focus:border-[#5c3822] shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                    </div>
                  )}

                  {/* Bathrooms (Hidden for Plots) */}
                  {!isPlot && (
                    <div className="space-y-1">
                      <label className="block text-[10px] sm:text-xs font-mono font-medium text-[#7e7365] uppercase tracking-wider">
                        Bathrooms *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="6"
                        value={bathrooms === '' ? '' : bathrooms}
                        onChange={(e) => handleIntegerChange(e.target.value, setBathrooms)}
                        className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm font-mono font-medium outline-none focus:border-[#5c3822] shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Property Condition Selection */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-mono font-medium text-[#7e7365]">
                    {isPlot ? 'Plot Status & Ground Level' : 'Property Construction Condition'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      {
                        id: 'museum',
                        label: isPlot ? 'Ready to Build / Clear Ground' : 'Brand New / Modern Luxury',
                        desc: isPlot ? 'Demarcated, level ground with utilities' : 'Recently constructed with high-end finishing',
                      },
                      {
                        id: 'turnkey',
                        label: isPlot ? 'Standard Possession' : 'Well-Maintained',
                        desc: isPlot ? 'Clear title with verified documents' : 'Good habitable condition, move-in ready',
                      },
                      {
                        id: 'renovation',
                        label: isPlot ? 'Under Development / File' : 'Needs Renovation',
                        desc: isPlot ? 'Pending final infrastructure completion' : 'Older structure requiring modernization',
                      },
                    ].map((cond) => (
                      <button
                        key={cond.id}
                        type="button"
                        onClick={() => setCondition(cond.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          condition === cond.id
                            ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-sm font-semibold'
                            : 'bg-white text-[#1F1B16] border-[#d8cebe] hover:bg-[#f5efe6]'
                        }`}
                      >
                        <div className="font-medium text-xs">{cond.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            condition === cond.id ? 'text-[#D7CBBB]' : 'text-[#7e7365]'
                          }`}
                        >
                          {cond.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(3)}>
                    <span>Next: Get Valuation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                  3. Contact Information
                </h3>

                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="website_hp"
                  value={websiteHp}
                  onChange={(e) => setWebsiteHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="sr-only"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-medium text-[#7e7365]">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tariq Mehmood"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822]"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-medium text-[#7e7365]">
                      WhatsApp / Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +92 300 1234567"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-mono font-medium text-[#7e7365]">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@example.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822]"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="flex justify-between pt-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>
                  <Button type="submit" variant="primary" size="lg" isLoading={loading} disabled={loading}>
                    <span>{loading ? 'Calculating Market Rate...' : 'Get Instant Valuation'}</span>
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </GlassCard>
    </div>
  );
}

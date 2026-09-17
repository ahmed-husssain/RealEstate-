'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { submitValuationAction } from '@/lib/actions/valuation';
import { SiteSettingsMap } from '@/lib/actions/admin-content';
import { CustomSelect } from '@/ui/CustomSelect';
import { PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import confetti from 'canvas-confetti';
import Image from 'next/image';

interface ValuationClientProps {
  siteSettings: SiteSettingsMap;
}

const KARACHI_AREA_OPTIONS = [
  { value: 'North Nazimabad', label: 'North Nazimabad (Blocks A–W)' },
  { value: 'Gulshan-e-Iqbal', label: 'Gulshan-e-Iqbal (All Blocks)' },
  { value: 'Federal B Area', label: 'Federal B Area (F.B Area)' },
  { value: 'Scheme 33', label: 'Scheme 33 (Gulzar-e-Hijri)' },
  { value: 'Buffer Zone', label: 'Buffer Zone (Sector 15-A & B)' },
  { value: 'North Karachi', label: 'North Karachi (Sectors 1–11)' },
  { value: 'Gulberg', label: 'Gulberg Karachi' },
  { value: 'Scheme 45', label: 'Scheme 45 (Taiser Town)' },
  { value: 'Clifton', label: 'Clifton & Sea View' },
];

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
  const advisorWhatsapp = (siteSettings.advisor_whatsapp || siteSettings.whatsapp_number || '923327906034').replace(/[^0-9]/g, '');

  return (
    <div className="w-full max-w-3xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="exclusive" size="sm">Free Tool</Badge>
          <Badge variant="stone" size="sm">Karachi Real Estate Index</Badge>
        </div>
        <h1 className="font-display font-medium text-xl sm:text-3xl lg:text-4xl text-[#1F1B16] tracking-tight">
          Karachi Property Valuation Calculator
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-lg mx-auto leading-relaxed">
          Instant algorithm-driven market valuation for houses, plots, and apartments across North Nazimabad, Gulshan, FB Area, Scheme 33, and prime sectors.
        </p>
      </div>

      {/* Main Valuation Container */}
      <GlassCard variant="card" rounded="2rem" className="p-4 sm:p-7 shadow-xl bg-[#fbf6f0] overflow-hidden w-full">
        {isCalculated ? (
          /* Result View */
          <div className="space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1">
              <div className="w-11 h-11 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16]">
                Estimated Market Value
              </h2>
              <p className="text-xs text-[#7e7365]">
                {address ? `${address}, ` : ''}{city} • {currentArea} Sq Yds
              </p>
            </div>

            {/* Valuation Figure Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#d8cebe] text-center space-y-2 shadow-sm">
              <span className="text-[10px] sm:text-xs font-mono text-[#7e7365] block uppercase">
                Expected Market Price Range
              </span>
              <div className="text-xl sm:text-3xl lg:text-4xl font-display font-medium text-[#1F1B16] break-words">
                {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <Badge variant="moss" size="sm">
                  Average: {formatCurrency(estimate.mid)}
                </Badge>
                <Badge variant="stone" size="sm">
                  {formatCurrency(estimate.avgSqYd)} / Gaz
                </Badge>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white border border-[#d8cebe]/60 space-y-0.5">
                <span className="text-[#7e7365] block font-mono text-[10px]">Location</span>
                <span className="font-semibold text-[#1F1B16] block">{city}</span>
                <p className="text-[10px] text-[#7e7365]">Current market demand in this sector.</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#d8cebe]/60 space-y-0.5">
                <span className="text-[#7e7365] block font-mono text-[10px]">Rate Accuracy</span>
                <span className="font-semibold text-[#2e3a2f] block">Live Market Benchmark</span>
                <p className="text-[10px] text-[#7e7365]">Calculated from actual verified Karachi rates.</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#d8cebe]/60 space-y-0.5">
                <span className="text-[#7e7365] block font-mono text-[10px]">Market Activity</span>
                <span className="font-semibold text-[#1F1B16] block">High Demand</span>
                <p className="text-[10px] text-[#7e7365]">Active buying & selling in this neighborhood.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2.5 border-t border-[#d8cebe]/60">
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
                <Button variant="primary" size="md" className="w-full text-xs justify-center shadow-sm">
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
                type="button"
                variant="secondary"
                size="md"
                onClick={() => {
                  setIsCalculated(false);
                  setStep(1);
                }}
                className="text-xs justify-center"
              >
                Calculate Another Property
              </Button>
            </div>
          </div>
        ) : (
          /* Multi-Step Form */
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-2.5 text-xs font-mono">
              <span className="text-[#5c3822] font-semibold">
                Step {step} of 3
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-7 sm:w-9 h-1.5 rounded-full transition-all ${
                      s <= step ? 'bg-[#5c3822]' : 'bg-[#d8cebe]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Property Type & Location */}
            {step === 1 && (
              <div className="space-y-3.5">
                <h3 className="font-display font-medium text-base sm:text-lg text-[#1F1B16]">
                  1. Property Type & Location
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1.5">
                      Select Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                          className={`p-2.5 sm:p-3 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer flex items-center justify-between ${
                            propertyType === type.id
                              ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-sm font-semibold'
                              : 'bg-white text-[#1F1B16] border-[#d8cebe] hover:border-[#5c3822]'
                          }`}
                        >
                          <span className="truncate">{type.label}</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ml-1 ${
                              propertyType === type.id ? 'bg-[#F8F4ED]' : 'bg-[#d8cebe]'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <CustomSelect
                      label="Select Karachi Area"
                      value={city}
                      onChange={(val) => setCity(val)}
                      options={KARACHI_AREA_OPTIONS}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-medium text-[#7e7365]">
                      Street / Block Details (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Block F, Street 14 / Sector 15-A"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2.5 border-t border-[#d8cebe]/40">
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(2)} className="w-full sm:w-auto justify-center text-xs">
                    <span>Next: Dimensions & Condition</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Dimensions & Condition */}
            {step === 2 && (
              <div className="space-y-3.5">
                <h3 className="font-display font-medium text-base sm:text-lg text-[#1F1B16]">
                  2. Dimensions & Property Condition
                </h3>
                
                <div className="space-y-3">
                  {/* Plot / Covered Size */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-medium text-[#7e7365]">
                      {isPlot ? 'Plot Size (Sq Yds / Gaz) *' : 'Land / Covered Size (Sq Yds / Gaz) *'}
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="240"
                      value={areaSqYd === '' ? '' : areaSqYd}
                      onChange={(e) => handleIntegerChange(e.target.value, setAreaSqYd)}
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-medium outline-none focus:border-[#5c3822] shadow-xs"
                      required
                    />
                    {/* Quick Gaz Preset Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[80, 120, 240, 400, 500, 1000].map((gaz) => (
                        <button
                          key={gaz}
                          type="button"
                          onClick={() => setAreaSqYd(gaz)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                            areaSqYd === gaz
                              ? 'bg-[#5c3822] text-[#F8F4ED] font-bold shadow-xs'
                              : 'bg-white text-[#1F1B16] border border-[#d8cebe] hover:bg-[#f5efe6]'
                          }`}
                        >
                          {gaz} Gaz
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms and Bathrooms (Hidden for Plots) */}
                  {!isPlot && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#7e7365]">
                          Bedrooms *
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="5"
                          value={bedrooms === '' ? '' : bedrooms}
                          onChange={(e) => handleIntegerChange(e.target.value, setBedrooms)}
                          className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-medium outline-none focus:border-[#5c3822] shadow-xs"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-mono font-medium text-[#7e7365]">
                          Bathrooms *
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          placeholder="6"
                          value={bathrooms === '' ? '' : bathrooms}
                          onChange={(e) => handleIntegerChange(e.target.value, setBathrooms)}
                          className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-medium outline-none focus:border-[#5c3822] shadow-xs"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Property Condition Selection */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-mono font-medium text-[#7e7365]">
                      {isPlot ? 'Plot Status & Ground Level' : 'Construction Condition'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        {
                          id: 'museum',
                          label: isPlot ? 'Ready to Build / Clear' : 'Brand New / Luxury',
                          desc: isPlot ? 'Demarcated, level ground' : 'Recent high-end construction',
                        },
                        {
                          id: 'turnkey',
                          label: isPlot ? 'Standard Possession' : 'Well-Maintained',
                          desc: isPlot ? 'Clear title documents' : 'Good habitable condition',
                        },
                        {
                          id: 'renovation',
                          label: isPlot ? 'Under Development' : 'Needs Renovation',
                          desc: isPlot ? 'Pending infrastructure' : 'Requires modernization',
                        },
                      ].map((cond) => (
                        <button
                          key={cond.id}
                          type="button"
                          onClick={() => setCondition(cond.id)}
                          className={`p-2.5 sm:p-3 rounded-xl text-left border transition-all cursor-pointer ${
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
                </div>

                <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-[#d8cebe]/40">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(1)} className="text-xs">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    <span>Back</span>
                  </Button>
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(3)} className="text-xs">
                    <span>Next: Contact Information</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Information */}
            {step === 3 && (
              <div className="space-y-3.5">
                <h3 className="font-display font-medium text-base sm:text-lg text-[#1F1B16]">
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

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-medium text-[#7e7365]">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Tariq Mehmood"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-xs"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-mono font-medium text-[#7e7365]">
                        WhatsApp / Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 0300 1234567"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-xs"
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
                      className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-xs"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-[#d8cebe]/40">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(2)} className="text-xs">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    <span>Back</span>
                  </Button>
                  <Button type="submit" variant="primary" size="md" isLoading={loading} disabled={loading} className="text-xs justify-center shadow-sm">
                    <span>{loading ? 'Calculating...' : 'Get Instant Valuation'}</span>
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

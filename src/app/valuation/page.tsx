'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Sparkles, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { submitValuationAction } from '@/lib/actions/valuation';
import { PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import confetti from 'canvas-confetti';

export default function ValuationPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('luxury-villa');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('North Nazimabad');
  const [bedrooms, setBedrooms] = useState(5);
  const [bathrooms, setBathrooms] = useState(6);
  const [areaSqYd, setAreaSqYd] = useState(240);
  const [condition, setCondition] = useState('turnkey');
  const [hasPool, setHasPool] = useState(false);
  const [hasView, setHasView] = useState(true);
  const [hasElevator, setHasElevator] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [websiteHp, setWebsiteHp] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const calculateEstimate = () => {
    // Area-specific base rate per Sq Yd (PKR)
    let areaMultiplier = 280000; // Default North Nazimabad built rate

    if (city.includes('Clifton')) areaMultiplier = 350000;
    else if (city.includes('North Nazimabad')) areaMultiplier = 280000;
    else if (city.includes('Gulshan')) areaMultiplier = 260000;
    else if (city.includes('Federal B Area') || city.includes('F.B Area')) areaMultiplier = 220000;
    else if (city.includes('Gulberg')) areaMultiplier = 210000;
    else if (city.includes('Buffer Zone')) areaMultiplier = 190000;
    else if (city.includes('Scheme 33')) areaMultiplier = 175000;
    else if (city.includes('North Karachi')) areaMultiplier = 160000;
    else if (city.includes('Scheme 45') || city.includes('Taiser')) areaMultiplier = 75000;

    let basePerSqYd = areaMultiplier;
    if (propertyType === 'penthouse') basePerSqYd *= 0.9;
    if (propertyType === 'estate') basePerSqYd *= 0.65; // Plot/Land only
    if (propertyType === 'modern-apartment') basePerSqYd *= 0.75;
    if (propertyType === 'townhouse') basePerSqYd *= 0.85;

    if (condition === 'museum') basePerSqYd *= 1.25;
    if (condition === 'turnkey') basePerSqYd *= 1.05;
    if (condition === 'renovation') basePerSqYd *= 0.85;

    let amenityBonus = 0;
    if (hasPool) amenityBonus += 5000000;
    if (hasView) amenityBonus += 2000000;
    if (hasElevator) amenityBonus += 3500000;

    const estimatedMid = areaSqYd * basePerSqYd + amenityBonus;
    const low = Math.round((estimatedMid * 0.93) / 100000) * 100000;
    const high = Math.round((estimatedMid * 1.07) / 100000) * 100000;
    const mid = Math.round(estimatedMid / 100000) * 100000;

    return { low, high, mid, avgSqYd: Math.round(mid / areaSqYd) };
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const est = calculateEstimate();

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
        areaSize: areaSqYd,
        areaUnit: AreaUnit.SQYD,
        bedrooms,
        bathrooms,
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="exclusive" size="sm">Free Tool</Badge>
          <Badge variant="stone" size="sm">Karachi Real Estate Index</Badge>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-4xl text-[#1F1B16] tracking-tight">
          Property Price Calculator
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-lg mx-auto">
          Get an instant estimated market value for your house, flat, or plot in North Nazimabad, Gulshan, FB Area, Scheme 33, and Karachi prime sectors.
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
                {address ? `${address}, ` : ''}{city} • {areaSqYd} Sq Yds
              </p>
            </div>

            {/* Valuation Figure Card */}
            <div className="p-6 rounded-2xl bg-white border border-[#d8cebe] text-center space-y-2.5 shadow-sm">
              <span className="text-[11px] font-mono text-[#7e7365] block uppercase">
                Expected Price Range
              </span>
              <div className="text-2xl sm:text-4xl font-display font-medium text-[#1F1B16]">
                {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
              </div>
              <div className="flex items-center justify-center gap-2 pt-1">
                <Badge variant="moss" size="sm">
                  Average: {formatCurrency(estimate.mid)}
                </Badge>
                <Badge variant="stone" size="sm">
                  {formatCurrency(estimate.avgSqYd)} / Sq Yd
                </Badge>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Location Demand</span>
                <span className="font-semibold text-[#1F1B16]">High Buyer Interest</span>
                <p className="text-[11px] text-[#7e7365]">Strong demand in North Nazimabad & Gulshan sectors.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Estimate Accuracy</span>
                <span className="font-semibold text-[#2e3a2f]">Based on Recent Sales</span>
                <p className="text-[11px] text-[#7e7365]">Compared with verified deals in your area.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Market Trend</span>
                <span className="font-semibold text-[#1F1B16]">Appreciating Steady</span>
                <p className="text-[11px] text-[#7e7365]">Annual capital growth across central Karachi.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-[#d8cebe]/60">
              <a
                href={`https://wa.me/923008224110?text=${encodeURIComponent(
                  `Assalam o Alaikum, I used the price calculator for my ${areaSqYd} Sq Yd property in ${city}. Estimated value: ${formatCurrency(
                    estimate.mid
                  )}. I would like a formal evaluation and site visit.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" size="lg" className="w-full text-xs sm:text-sm">
                  Chat on WhatsApp for Exact Valuation
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
                        { id: 'penthouse', label: 'Penthouse' },
                        { id: 'estate', label: 'Residential Plot' },
                        { id: 'townhouse', label: 'Townhouse / Duplex' },
                        { id: 'modern-apartment', label: 'Apartment / Flat' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPropertyType(type.id)}
                          className={`p-2.5 rounded-xl border text-xs font-medium transition-all text-left ${
                            propertyType === type.id
                              ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-sm'
                              : 'bg-white text-[#1F1B16] border-[#d8cebe] hover:border-[#5c3822]'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Street / Block Details (Optional)"
                    placeholder="e.g. Block F, Street 14 / Sector 15-A"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

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
                </div>

                <div className="flex justify-end pt-3">
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(2)}>
                    <span>Next: Size & Rooms</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Dimensions & Condition */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                  2. Size & Features
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="Plot / Covered Size (Sq Yds)"
                      type="number"
                      min={100}
                      max={5000}
                      step={25}
                      value={areaSqYd}
                      onChange={(e) => setAreaSqYd(Number(e.target.value))}
                      required
                    />
                    <Input
                      label="Bedrooms"
                      type="number"
                      min={1}
                      max={15}
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      required
                    />
                    <Input
                      label="Bathrooms"
                      type="number"
                      min={1}
                      max={15}
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[#7e7365] mb-2">
                      Property Condition
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'museum', label: 'Brand New / Modern Luxury', desc: 'Recently built with top quality fixtures' },
                        { id: 'turnkey', label: 'Well-Maintained', desc: 'Good condition, ready to move in' },
                        { id: 'renovation', label: 'Needs Renovation', desc: 'Older construction requiring modernizing' },
                      ].map((cond) => (
                        <button
                          key={cond.id}
                          type="button"
                          onClick={() => setCondition(cond.id)}
                          className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                            condition === cond.id
                              ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822]'
                              : 'bg-white text-[#1F1B16] border-[#d8cebe] hover:bg-[#f5efe6]'
                          }`}
                        >
                          <div className="font-medium text-xs">{cond.label}</div>
                          <div className={`text-[10px] mt-0.5 ${condition === cond.id ? 'text-[#D7CBBB]' : 'text-[#7e7365]'}`}>
                            {cond.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra Features */}
                  <div>
                    <label className="block text-xs font-mono font-medium text-[#7e7365] mb-2">
                      Extra Features
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setHasPool(!hasPool)}
                        className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                          hasPool ? 'bg-[#2e3a2f] text-white border-[#2e3a2f]' : 'bg-white border-[#d8cebe] text-[#1F1B16]'
                        }`}
                      >
                        Swimming Pool
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasView(!hasView)}
                        className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                          hasView ? 'bg-[#2e3a2f] text-white border-[#2e3a2f]' : 'bg-white border-[#d8cebe] text-[#1F1B16]'
                        }`}
                      >
                        Corner / Main Road
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasElevator(!hasElevator)}
                        className={`p-2 rounded-xl border text-xs font-medium transition-all ${
                          hasElevator ? 'bg-[#2e3a2f] text-white border-[#2e3a2f]' : 'bg-white border-[#d8cebe] text-[#1F1B16]'
                        }`}
                      >
                        Elevator / Lift
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(3)}>
                    <span>Next: Get Estimate</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-display font-medium text-lg text-[#1F1B16]">
                  3. Where should we send the estimate?
                </h3>

                {/* Anti-spam honeypot (hidden from human users) */}
                <input
                  type="text"
                  name="website_hp"
                  value={websiteHp}
                  onChange={(e) => setWebsiteHp(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden opacity-0 pointer-events-none absolute -left-[9999px]"
                />

                <div className="space-y-3.5">
                  <Input
                    label="Your Name"
                    placeholder="e.g. Muhammad Ahmed"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input
                      label="Phone / WhatsApp Number"
                      type="tel"
                      placeholder="0300 1234567"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="ahmed@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="bg-white border border-[#d8cebe] rounded-xl p-3 text-xs text-[#7e7365] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2e3a2f] shrink-0" />
                    <span>Your information is private and never shared with third parties.</span>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-3">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>
                  <Button type="submit" variant="primary" size="lg" isLoading={loading}>
                    <span>Calculate Market Price</span>
                    <Sparkles className="w-4 h-4" />
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

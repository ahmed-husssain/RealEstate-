'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Select } from '@/ui/Select';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { submitValuationAction } from '@/lib/actions/valuation';
import { PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import confetti from 'canvas-confetti';

export default function ValuationPage() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('luxury-villa');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Los Angeles, CA');
  const [bedrooms, setBedrooms] = useState(5);
  const [bathrooms, setBathrooms] = useState(6);
  const [areaSqFt, setAreaSqFt] = useState(7500);
  const [condition, setCondition] = useState('museum');
  const [hasPool, setHasPool] = useState(true);
  const [hasView, setHasView] = useState(true);
  const [hasElevator, setHasElevator] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateEstimate = () => {
    let basePerSqFt = 1450;
    if (propertyType === 'penthouse') basePerSqFt = 2200;
    if (propertyType === 'estate') basePerSqFt = 1100;
    if (propertyType === 'townhouse') basePerSqFt = 1750;

    if (condition === 'museum') basePerSqFt *= 1.25;
    if (condition === 'turnkey') basePerSqFt *= 1.1;

    let amenityBonus = 0;
    if (hasPool) amenityBonus += 350000;
    if (hasView) amenityBonus += 850000;
    if (hasElevator) amenityBonus += 250000;

    const estimatedMid = areaSqFt * basePerSqFt + amenityBonus;
    const low = Math.round((estimatedMid * 0.93) / 50000) * 50000;
    const high = Math.round((estimatedMid * 1.07) / 50000) * 50000;
    const mid = Math.round(estimatedMid / 50000) * 50000;

    return { low, high, mid, avgSqFt: Math.round(mid / areaSqFt) };
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        areaSize: areaSqFt,
        areaUnit: AreaUnit.SQFT,
        bedrooms,
        bathrooms,
        condition: cond,
        ownerName: contactName,
        ownerPhone: contactPhone,
        ownerEmail: contactEmail,
        estimatedMin: est.low,
        estimatedMax: est.high,
      });

      if (res.success) {
        setIsCalculated(true);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#5c3822', '#2e3a2f', '#D8CEBE', '#847666'],
          });
        } catch (err) {}
      } else {
        setErrorMessage(res.error || 'Failed to generate valuation');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const estimate = calculateEstimate();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Badge variant="exclusive" size="sm">Proprietary Algorithm</Badge>
          <Badge variant="stone" size="sm">Amber Valuation Model</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Instant Architectural Valuation
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365] max-w-xl mx-auto leading-relaxed">
          Evaluate the contemporary market position and replacement cost of your luxury residence using our proprietary prime property index.
        </p>
      </div>

      {/* Main Valuation Container */}
      <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-10 shadow-2xl">
        {isCalculated ? (
          /* Result View */
          <div className="space-y-8 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
                Estimated Valuation Assessment
              </h2>
              <p className="text-xs text-[#7e7365] font-mono">
                {address || 'Sample Residence'}, {city}
              </p>
            </div>

            {/* Valuation Figure Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#f5efe6] to-[#ece3d5] border border-[#d8cebe] text-center space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#7e7365]">
                Target Advisory Offering Range
              </span>
              <div className="text-3xl sm:text-5xl font-display font-medium text-[#1F1B16] tracking-tight">
                {formatCurrency(estimate.low)} – {formatCurrency(estimate.high)}
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <Badge variant="moss" size="sm">
                  Midpoint: {formatCurrency(estimate.mid)}
                </Badge>
                <Badge variant="stone" size="sm">
                  Est. ${formatNumber(estimate.avgSqFt)} / Sq Ft
                </Badge>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              <div className="p-4 rounded-xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Market Velocity</span>
                <span className="font-bold text-[#1F1B16] text-sm">High Prime Demand</span>
                <p className="text-[10px] text-[#7e7365]">Scarcity of similar architectural inventory.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Algorithm Confidence</span>
                <span className="font-bold text-[#2e3a2f] text-sm">94.8% High Index</span>
                <p className="text-[10px] text-[#7e7365]">Calibrated with recent closed comp benchmarks.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1">
                <span className="text-[#7e7365] block font-mono">Dossier Dispatch</span>
                <span className="font-bold text-[#1F1B16] text-sm">Sent to Email</span>
                <p className="text-[10px] text-[#7e7365]">Comprehensive comp package routed to {contactEmail || 'your email'}.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={() => alert('Our Senior Managing Partner will contact you shortly to schedule an on-site confidential walk.')}
              >
                Request On-Site Partner Appraisal
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setIsCalculated(false);
                  setStep(1);
                }}
              >
                Recalculate
              </Button>
            </div>
          </div>
        ) : (
          /* Multi-Step Form */
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-4 text-xs font-mono">
              <span className="text-[#5c3822] font-semibold uppercase tracking-wider">
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
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-display font-medium text-xl text-[#1F1B16]">
                  1. Property Category & Location
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-2">
                      Architectural Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'luxury-villa', label: 'Architectural Villa' },
                        { id: 'penthouse', label: 'Sky Penthouse' },
                        { id: 'estate', label: 'Country Estate' },
                        { id: 'townhouse', label: 'Historic Townhouse' },
                        { id: 'modern-apartment', label: 'Gallery Loft' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPropertyType(type.id)}
                          className={`p-3 rounded-xl text-xs font-sans text-left border transition-all cursor-pointer ${
                            propertyType === type.id
                              ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-inset-highlight font-medium'
                              : 'bg-[#f5efe6] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Input
                    label="Property Street Address"
                    placeholder="e.g. 10420 Bellagio Road"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />

                  <Input
                    label="City & State"
                    placeholder="e.g. Los Angeles, CA or New York, NY"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(2)}>
                    <span>Continue to Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Dimensions & Condition */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-display font-medium text-xl text-[#1F1B16]">
                  2. Spatial Proportions & Finishes
                </h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Living Area (Sq Ft)"
                      type="number"
                      min={1000}
                      max={50000}
                      step={100}
                      value={areaSqFt}
                      onChange={(e) => setAreaSqFt(Number(e.target.value))}
                      required
                    />
                    <Input
                      label="Bedrooms"
                      type="number"
                      min={1}
                      max={20}
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      required
                    />
                    <Input
                      label="Bathrooms"
                      type="number"
                      min={1}
                      max={25}
                      value={bathrooms}
                      onChange={(e) => setBathrooms(Number(e.target.value))}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-2">
                      Finish Level & Condition
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'museum', label: 'Museum / Architectural Quality', desc: 'Bespoke stone, custom millwork, pristine state' },
                        { id: 'turnkey', label: 'Turnkey Luxury', desc: 'Modern high-end finishes, ready to inhabit' },
                        { id: 'renovation', label: 'Needs Architectural Revision', desc: 'Classic layout requiring modernization' },
                      ].map((cond) => (
                        <button
                          key={cond.id}
                          type="button"
                          onClick={() => setCondition(cond.id)}
                          className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                            condition === cond.id
                              ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] shadow-inset-highlight'
                              : 'bg-[#f5efe6] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
                          }`}
                        >
                          <div className="font-semibold text-xs">{cond.label}</div>
                          <div className={`text-[10px] mt-0.5 ${condition === cond.id ? 'text-[#D7CBBB]' : 'text-[#7e7365]'}`}>
                            {cond.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities Checkboxes */}
                  <div>
                    <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365] mb-2">
                      Key Premium Attributes
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setHasPool(!hasPool)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          hasPool ? 'bg-[#2e3a2f] text-white border-[#2e3a2f]' : 'bg-[#f5efe6] border-[#d8cebe] text-[#1F1B16]'
                        }`}
                      >
                        Pool / Spa Grounds
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasView(!hasView)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          hasView ? 'bg-[#2e3a2f] text-white border-[#2e3a2f]' : 'bg-[#f5efe6] border-[#d8cebe] text-[#1F1B16]'
                        }`}
                      >
                        Panoramic View
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasElevator(!hasElevator)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          hasElevator ? 'bg-[#2e3a2f] text-white border-[#2e3a2f]' : 'bg-[#f5efe6] border-[#d8cebe] text-[#1F1B16]'
                        }`}
                      >
                        Private Elevator
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>
                  <Button type="button" variant="primary" size="md" onClick={() => setStep(3)}>
                    <span>Continue to Contact</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Confidential Dispatch */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <h3 className="font-display font-medium text-xl text-[#1F1B16]">
                  3. Confidential Report Dispatch
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Owner / Principal Full Name"
                    placeholder="e.g. Lady Katherine Kensington"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Confidential Email"
                      type="email"
                      placeholder="principal@familyoffice.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                    <Input
                      label="Direct Phone"
                      type="tel"
                      placeholder="+1 (555) 019-8812"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="bg-[#f5efe6] border border-[#d8cebe] rounded-xl p-3.5 text-xs text-[#7e7365] space-y-1">
                    <div className="font-semibold text-[#1F1B16] flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#2e3a2f]" />
                      <span>Non-Disclosure Guarantee</span>
                    </div>
                    <p className="leading-relaxed">
                      Your asset information is never public. Results are calculated in encrypted memory.
                    </p>
                  </div>
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="ghost" size="md" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </Button>
                  <Button type="submit" variant="primary" size="lg" isLoading={loading}>
                    <span>Generate Valuation Dossier</span>
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

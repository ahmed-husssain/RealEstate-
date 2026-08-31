'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Badge } from '@/ui/Badge';
import {
  updateSiteSettingsAction,
  uploadAdvisorAvatarDirectAction,
  SiteSettingsMap,
} from '@/lib/actions/admin-content';
import {
  CheckCircle2,
  AlertCircle,
  Save,
  Sparkles,
  Phone,
  MapPin,
  Megaphone,
  Loader2,
  UploadCloud,
  UserCheck,
  Calculator,
  Eye,
  Mail,
  ShieldCheck,
  TrendingUp,
  Info,
  Layers,
  Check,
} from 'lucide-react';
import { calculateMonthlyMortgage, formatCurrency } from '@/lib/utils';

// Clean integer input sanitizer (only digits 0-9, no leading zero bug)
function sanitizeIntegerString(val: string): string {
  const digitsOnly = val.replace(/\D/g, '');
  if (!digitsOnly) return '';
  return String(parseInt(digitsOnly, 10));
}

export function SiteContentEditorClient({ initialSettings }: { initialSettings: SiteSettingsMap }) {
  const [activeTab, setActiveTab] = useState<'advisor' | 'mortgage' | 'valuation' | 'hero' | 'general'>('valuation');

  // --- 1. Senior Property Advisor Profile State ---
  const [advisorName, setAdvisorName] = useState(initialSettings.advisor_name || 'Syed Sikander Waqar');
  const [advisorRole, setAdvisorRole] = useState(
    initialSettings.advisor_role || 'Senior Managing Advisor | North Nazimabad & Construction'
  );
  const [advisorExperience, setAdvisorExperience] = useState(initialSettings.advisor_experience || '15 Years Exp');
  const [advisorAvatar, setAdvisorAvatar] = useState(
    initialSettings.advisor_avatar ||
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  );
  const [advisorPhone, setAdvisorPhone] = useState(initialSettings.advisor_phone || '+92 300 822 4110');
  const [advisorWhatsapp, setAdvisorWhatsapp] = useState(initialSettings.advisor_whatsapp || '+923008224110');
  const [advisorEmail, setAdvisorEmail] = useState(initialSettings.advisor_email || 'syedsikander1401@gmail.com');
  const [advisorWaMsg, setAdvisorWaMsg] = useState(
    initialSettings.advisor_wa_msg || 'Assalam o Alaikum, I would like to inquire about properties in Karachi.'
  );

  // Avatar upload
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // --- 2. Private Wealth Mortgage Estimator State ---
  const [mortgageTitle, setMortgageTitle] = useState(
    initialSettings.mortgage_title || 'Private Wealth Mortgage Estimator'
  );
  const [mortgageBadge, setMortgageBadge] = useState(initialSettings.mortgage_badge || 'Financial Modeling');
  const [mortgageDefaultInterest, setMortgageDefaultInterest] = useState(
    initialSettings.mortgage_default_interest || '6.25'
  );
  const [mortgageDefaultDownPayment, setMortgageDefaultDownPayment] = useState(
    sanitizeIntegerString(initialSettings.mortgage_default_downpayment || '20')
  );
  const [mortgageTerms, setMortgageTerms] = useState(initialSettings.mortgage_terms || '15, 30');
  const [mortgageTaxRate, setMortgageTaxRate] = useState(initialSettings.mortgage_tax_rate || '0.5');
  const [mortgageInsuranceRate, setMortgageInsuranceRate] = useState(
    initialSettings.mortgage_insurance_rate || '0.1'
  );
  const [mortgageDisclaimer, setMortgageDisclaimer] = useState(
    initialSettings.mortgage_disclaimer ||
      '*Estimates provided for informational illustrative modeling. Subject to lender qualification and tax advisory review.'
  );

  // --- 3. Karachi Valuation Engine Behind-The-Scenes (BTS) ---
  // Base Gaz Rates (PKR / Gaz) - strictly clean integer strings
  const [valRateNorthNazimabad, setValRateNorthNazimabad] = useState(
    sanitizeIntegerString(initialSettings.val_rate_north_nazimabad || '280000')
  );
  const [valRateGulshan, setValRateGulshan] = useState(
    sanitizeIntegerString(initialSettings.val_rate_gulshan || '260000')
  );
  const [valRateFbArea, setValRateFbArea] = useState(
    sanitizeIntegerString(initialSettings.val_rate_fb_area || '220000')
  );
  const [valRateGulberg, setValRateGulberg] = useState(
    sanitizeIntegerString(initialSettings.val_rate_gulberg || '210000')
  );
  const [valRateBufferZone, setValRateBufferZone] = useState(
    sanitizeIntegerString(initialSettings.val_rate_buffer_zone || '190000')
  );
  const [valRateScheme33, setValRateScheme33] = useState(
    sanitizeIntegerString(initialSettings.val_rate_scheme33 || '175000')
  );
  const [valRateNorthKarachi, setValRateNorthKarachi] = useState(
    sanitizeIntegerString(initialSettings.val_rate_north_karachi || '160000')
  );
  const [valRateScheme45, setValRateScheme45] = useState(
    sanitizeIntegerString(initialSettings.val_rate_scheme45 || '75000')
  );
  const [valRateClifton, setValRateClifton] = useState(
    sanitizeIntegerString(initialSettings.val_rate_clifton || '350000')
  );

  // Category Multipliers (Percentages: e.g. 100 = 100%, 65 = 65%)
  const parsePct = (val: string | undefined, defaultVal: number): string => {
    if (!val) return String(defaultVal);
    const num = parseFloat(val);
    if (isNaN(num)) return String(defaultVal);
    // If stored as decimal <= 2.0 (e.g. 0.65), convert to percentage 65
    if (num <= 2.0) return String(Math.round(num * 100));
    return String(Math.round(num));
  };

  const [valMultHousePct, setValMultHousePct] = useState(parsePct(initialSettings.val_mult_house, 100));
  const [valMultPlotPct, setValMultPlotPct] = useState(parsePct(initialSettings.val_mult_plot, 65));
  const [valMultApartmentPct, setValMultApartmentPct] = useState(parsePct(initialSettings.val_mult_apartment, 75));
  const [valMultPenthousePct, setValMultPenthousePct] = useState(parsePct(initialSettings.val_mult_penthouse, 90));
  const [valMultTownhousePct, setValMultTownhousePct] = useState(parsePct(initialSettings.val_mult_townhouse, 85));

  // Condition Multipliers (Percentages: e.g. 125 = 125%, 105 = 105%, 85 = 85%)
  const [valCondBrandNewPct, setValCondBrandNewPct] = useState(parsePct(initialSettings.val_cond_brand_new, 125));
  const [valCondWellMaintainedPct, setValCondWellMaintainedPct] = useState(
    parsePct(initialSettings.val_cond_well_maintained, 105)
  );
  const [valCondRenovationPct, setValCondRenovationPct] = useState(
    parsePct(initialSettings.val_cond_renovation, 85)
  );

  // Interactive Live Simulator in Admin Panel
  const [simArea, setSimArea] = useState<'North Nazimabad' | 'Gulshan' | 'FB Area' | 'Gulberg' | 'Buffer Zone' | 'Scheme 33' | 'North Karachi' | 'Scheme 45' | 'Clifton'>('North Nazimabad');
  const [simCategory, setSimCategory] = useState<'house' | 'plot' | 'apartment' | 'penthouse' | 'townhouse'>('house');
  const [simCondition, setSimCondition] = useState<'brand_new' | 'well_maintained' | 'renovation'>('brand_new');
  const [simGazSize, setSimGazSize] = useState<string>('240');

  // --- 4. Hero & Branding State ---
  const [heroHeadline, setHeroHeadline] = useState(
    initialSettings.hero_headline || 'Find Luxury Homes & Penthouses in Karachi'
  );
  const [heroSubtitle, setHeroSubtitle] = useState(
    initialSettings.hero_subtitle ||
      'Buy, sell, build, and renovate verified bangalows, houses, and plots across North Nazimabad, Gulshan-e-Iqbal, Federal B Area, Scheme 33, Buffer Zone, North Karachi, Gulberg, Scheme 45, and Clifton.'
  );
  const [phonePrimary, setPhonePrimary] = useState(initialSettings.phone_primary || '+92 300 822 4110');
  const [phoneLandline, setPhoneLandline] = useState(initialSettings.phone_landline || '+92 21 3634 1100');
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsapp_number || '+92 300 822 4110');
  const [contactEmail, setContactEmail] = useState(initialSettings.contact_email || 'syedsikander1401@gmail.com');
  const [officeAddress, setOfficeAddress] = useState(
    initialSettings.office_address || 'B 693, Block 13 Gulberg Town, Karachi, Pakistan'
  );
  const [officeTimings, setOfficeTimings] = useState(
    initialSettings.office_timings || 'Mon – Sat (10:30 AM to 8:00 PM)'
  );
  const [announcementBanner, setAnnouncementBanner] = useState(
    initialSettings.announcement_banner ||
      'New North Nazimabad and Gulshan luxury listings now open for private viewings.'
  );
  const [announcementActive, setAnnouncementActive] = useState(
    initialSettings.announcement_active !== undefined ? initialSettings.announcement_active === 'true' : true
  );

  const [loading, setLoading] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string; details?: string[] } | null>(
    null
  );

  // Handle Avatar file upload
  const handleAvatarFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setStatusMsg(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadAdvisorAvatarDirectAction(formData);
      if (res.success && res.data) {
        setAdvisorAvatar(res.data.url);
        setStatusMsg({
          type: 'success',
          text: 'Advisor avatar uploaded successfully to Cloudinary! Click "Save All Changes" below to apply it live.',
        });
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to upload avatar image.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err?.message || 'Error uploading avatar.' });
    } finally {
      setUploadingAvatar(false);
    }
  };

  // Preview Mortgage calculation
  const samplePrice = 50000000; // 5 Crore
  const numInterest = Number(mortgageDefaultInterest) || 6.25;
  const numDownPct = Number(mortgageDefaultDownPayment) || 20;
  const mortgagePreviewCalc = calculateMonthlyMortgage(samplePrice, numDownPct, numInterest, 30);

  // Interactive Live Simulator Calculation
  const runLiveSimulation = () => {
    let rate = 280000;
    if (simArea === 'North Nazimabad') rate = parseInt(valRateNorthNazimabad, 10) || 280000;
    else if (simArea === 'Gulshan') rate = parseInt(valRateGulshan, 10) || 260000;
    else if (simArea === 'FB Area') rate = parseInt(valRateFbArea, 10) || 220000;
    else if (simArea === 'Gulberg') rate = parseInt(valRateGulberg, 10) || 210000;
    else if (simArea === 'Buffer Zone') rate = parseInt(valRateBufferZone, 10) || 190000;
    else if (simArea === 'Scheme 33') rate = parseInt(valRateScheme33, 10) || 175000;
    else if (simArea === 'North Karachi') rate = parseInt(valRateNorthKarachi, 10) || 160000;
    else if (simArea === 'Scheme 45') rate = parseInt(valRateScheme45, 10) || 75000;
    else if (simArea === 'Clifton') rate = parseInt(valRateClifton, 10) || 350000;

    let catFactor = 1.0;
    if (simCategory === 'plot') catFactor = (parseInt(valMultPlotPct, 10) || 65) / 100;
    else if (simCategory === 'apartment') catFactor = (parseInt(valMultApartmentPct, 10) || 75) / 100;
    else if (simCategory === 'penthouse') catFactor = (parseInt(valMultPenthousePct, 10) || 90) / 100;
    else if (simCategory === 'townhouse') catFactor = (parseInt(valMultTownhousePct, 10) || 85) / 100;
    else catFactor = (parseInt(valMultHousePct, 10) || 100) / 100;

    let condFactor = 1.05;
    if (simCondition === 'brand_new') condFactor = (parseInt(valCondBrandNewPct, 10) || 125) / 100;
    else if (simCondition === 'well_maintained') condFactor = (parseInt(valCondWellMaintainedPct, 10) || 105) / 100;
    else condFactor = (parseInt(valCondRenovationPct, 10) || 85) / 100;

    const gaz = parseInt(simGazSize, 10) || 240;
    const mid = gaz * rate * catFactor * condFactor;
    const low = Math.round((mid * 0.93) / 100000) * 100000;
    const high = Math.round((mid * 1.07) / 100000) * 100000;

    return {
      rate,
      catFactor,
      condFactor,
      gaz,
      low,
      mid,
      high,
      avgPerGaz: Math.round(mid / (gaz || 1)),
    };
  };

  const simResult = runLiveSimulation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const payload: Record<string, string> = {
        // Advisor Profile
        advisor_name: advisorName,
        advisor_role: advisorRole,
        advisor_experience: advisorExperience,
        advisor_avatar: advisorAvatar,
        advisor_phone: advisorPhone,
        advisor_whatsapp: advisorWhatsapp,
        advisor_email: advisorEmail,
        advisor_wa_msg: advisorWaMsg,

        // Mortgage Estimator
        mortgage_title: mortgageTitle,
        mortgage_badge: mortgageBadge,
        mortgage_default_interest: mortgageDefaultInterest,
        mortgage_default_downpayment: mortgageDefaultDownPayment,
        mortgage_terms: mortgageTerms,
        mortgage_tax_rate: mortgageTaxRate,
        mortgage_insurance_rate: mortgageInsuranceRate,
        mortgage_disclaimer: mortgageDisclaimer,

        // Karachi Valuation BTS (Saved as normalized clean strings)
        val_rate_north_nazimabad: valRateNorthNazimabad,
        val_rate_gulshan: valRateGulshan,
        val_rate_fb_area: valRateFbArea,
        val_rate_gulberg: valRateGulberg,
        val_rate_buffer_zone: valRateBufferZone,
        val_rate_scheme33: valRateScheme33,
        val_rate_north_karachi: valRateNorthKarachi,
        val_rate_scheme45: valRateScheme45,
        val_rate_clifton: valRateClifton,

        // Multipliers converted to 2-decimal floats for the backend engine
        val_mult_house: ((parseInt(valMultHousePct, 10) || 100) / 100).toFixed(2),
        val_mult_plot: ((parseInt(valMultPlotPct, 10) || 65) / 100).toFixed(2),
        val_mult_apartment: ((parseInt(valMultApartmentPct, 10) || 75) / 100).toFixed(2),
        val_mult_penthouse: ((parseInt(valMultPenthousePct, 10) || 90) / 100).toFixed(2),
        val_mult_townhouse: ((parseInt(valMultTownhousePct, 10) || 85) / 100).toFixed(2),

        val_cond_brand_new: ((parseInt(valCondBrandNewPct, 10) || 125) / 100).toFixed(2),
        val_cond_well_maintained: ((parseInt(valCondWellMaintainedPct, 10) || 105) / 100).toFixed(2),
        val_cond_renovation: ((parseInt(valCondRenovationPct, 10) || 85) / 100).toFixed(2),

        // Hero & General
        hero_headline: heroHeadline,
        hero_subtitle: heroSubtitle,
        phone_primary: phonePrimary,
        phone_landline: phoneLandline,
        whatsapp_number: whatsappNumber,
        contact_email: contactEmail,
        office_address: officeAddress,
        office_timings: officeTimings,
        announcement_banner: announcementBanner,
        announcement_active: announcementActive ? 'true' : 'false',
      };

      const res = await updateSiteSettingsAction(payload);

      if (res.success) {
        const timeString = new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setLastSavedAt(timeString);
        setStatusMsg({
          type: 'success',
          text: `Verified & Saved to Database at ${timeString}!`,
          details: [
            `Senior Advisor: ${advisorName} (${advisorRole})`,
            `Mortgage Estimator: ${mortgageTitle} (${mortgageDefaultInterest}%)`,
            `Valuation Engine: North Nazimabad PKR ${Number(valRateNorthNazimabad).toLocaleString()} / Gaz`,
            `All public property detail pages and valuation calculator routes updated live.`,
          ],
        });
      } else {
        setStatusMsg({
          type: 'error',
          text: res.error || 'Failed to update website settings in database.',
        });
      }
    } catch (err: any) {
      setStatusMsg({
        type: 'error',
        text: err.message || 'An unexpected client-server exception occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#f5efe6] border border-[#d8cebe] rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('valuation')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'valuation'
              ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm font-bold'
              : 'text-[#7e7365] hover:text-[#1F1B16] hover:bg-white/60'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>1. Karachi Valuation Engine (BTS)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('advisor')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'advisor'
              ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm font-bold'
              : 'text-[#7e7365] hover:text-[#1F1B16] hover:bg-white/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>2. Property Advisor Profile</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mortgage')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'mortgage'
              ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm font-bold'
              : 'text-[#7e7365] hover:text-[#1F1B16] hover:bg-white/60'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>3. Mortgage Estimator</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'hero'
              ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm font-bold'
              : 'text-[#7e7365] hover:text-[#1F1B16] hover:bg-white/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>4. Hero & Taglines</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'general'
              ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm font-bold'
              : 'text-[#7e7365] hover:text-[#1F1B16] hover:bg-white/60'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>5. Office Contacts</span>
        </button>
      </div>

      {/* Status Alerts */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in shadow-sm ${
            statusMsg.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2 font-bold">
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
          {statusMsg.details && (
            <ul className="list-disc list-inside text-[11px] opacity-90 pl-1 space-y-0.5">
              {statusMsg.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 1: KARACHI VALUATION ENGINE (BTS)                    */}
      {/* ======================================================== */}
      {activeTab === 'valuation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            {/* Guide Explainer Banner */}
            <div className="p-4 rounded-2xl bg-[#efebe4] border border-[#d8cebe] text-xs text-[#5c3822] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-4 h-4" />
                <span>How Behind-The-Scenes (BTS) Valuation Works</span>
              </div>
              <p className="text-[11px] text-[#7e7365] leading-relaxed">
                When a client uses <strong className="text-[#1F1B16]">/valuation</strong>, the algorithm multiplies:{' '}
                <span className="font-mono text-[#5c3822]">[Plot Gaz Size] × [Area Base Rate] × [Category %] × [Condition %]</span>.
                Adjust the base rates and percentage weights below to align with current market prices.
              </p>
            </div>

            {/* Section A: Area Base Gaz Rates */}
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-5">
              <div className="border-b border-[#d8cebe]/60 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#5c3822]" />
                    <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                      1. Karachi Enclave Base Rates (PKR per Gaz / Sq Yd)
                    </h2>
                  </div>
                  <Badge variant="exclusive" size="sm">Baseline</Badge>
                </div>
                <p className="text-xs text-[#7e7365] mt-1">
                  Represents the standard combined land and base construction value per Gaz (Square Yard) in each sector.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: 'North Nazimabad',
                    desc: 'Blocks A to W prime residential',
                    val: valRateNorthNazimabad,
                    set: setValRateNorthNazimabad,
                  },
                  {
                    name: 'Gulshan-e-Iqbal',
                    desc: 'All residential & commercial blocks',
                    val: valRateGulshan,
                    set: setValRateGulshan,
                  },
                  {
                    name: 'Federal B Area',
                    desc: 'F.B Area central residential blocks',
                    val: valRateFbArea,
                    set: setValRateFbArea,
                  },
                  {
                    name: 'Gulberg Karachi',
                    desc: 'Block 12, 13 & adjacent sectors',
                    val: valRateGulberg,
                    set: setValRateGulberg,
                  },
                  {
                    name: 'Buffer Zone',
                    desc: 'Sector 15-A, 15-B & surroundings',
                    val: valRateBufferZone,
                    set: setValRateBufferZone,
                  },
                  {
                    name: 'Scheme 33',
                    desc: 'Gulzar-e-Hijri housing societies',
                    val: valRateScheme33,
                    set: setValRateScheme33,
                  },
                  {
                    name: 'North Karachi',
                    desc: 'Sectors 1 to 11 residential',
                    val: valRateNorthKarachi,
                    set: setValRateNorthKarachi,
                  },
                  {
                    name: 'Scheme 45 (Taiser Town)',
                    desc: 'MDA development plots & houses',
                    val: valRateScheme45,
                    set: setValRateScheme45,
                  },
                  {
                    name: 'Clifton & Sea View',
                    desc: 'High-end seaside luxury enclaves',
                    val: valRateClifton,
                    set: setValRateClifton,
                  },
                ].map((area, idx) => {
                  const numericRate = parseInt(area.val, 10) || 0;
                  const lakhFormatted = (numericRate / 100000).toFixed(2);
                  const sample240Crore = ((numericRate * 240) / 10000000).toFixed(2);

                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl bg-white border border-[#d8cebe] space-y-2 shadow-sm ${
                        idx === 8 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-semibold text-xs text-[#1F1B16] block">{area.name}</span>
                          <span className="text-[10px] text-[#7e7365] block">{area.desc}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-[#efebe4] text-[#5c3822] px-2 py-0.5 rounded-full shrink-0">
                          PKR {lakhFormatted} Lakh / Gaz
                        </span>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-[#7e7365] uppercase">
                          Rate (PKR / Gaz) — Digits Only
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={area.val}
                          onChange={(e) => area.set(sanitizeIntegerString(e.target.value))}
                          placeholder="e.g. 280000"
                          className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-xl px-3 py-1.5 text-xs font-mono font-medium outline-none focus:border-[#5c3822] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </div>

                      <p className="text-[10px] text-[#7e7365] font-mono pt-0.5">
                        240 Gaz baseline ≈ <span className="font-bold text-[#1F1B16]">PKR {sample240Crore} Crore</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Section B: Category Multipliers */}
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-5">
              <div className="border-b border-[#d8cebe]/60 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#5c3822]" />
                    <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                      2. Property Category Multipliers (%)
                    </h2>
                  </div>
                  <Badge variant="stone" size="sm">Type Weight</Badge>
                </div>
                <p className="text-xs text-[#7e7365] mt-1">
                  Adjusts value based on structure type. For instance, a Plot has no building cost, so it is weighted at ~65% of a built house.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    title: 'Bungalow / House',
                    desc: 'Full constructed house with land (Baseline 100%)',
                    val: valMultHousePct,
                    set: setValMultHousePct,
                    badge: '100% Base',
                  },
                  {
                    title: 'Residential Plot',
                    desc: 'Land value only without construction & finishing cost',
                    val: valMultPlotPct,
                    set: setValMultPlotPct,
                    badge: `${valMultPlotPct}% of House`,
                  },
                  {
                    title: 'Apartment / Flat',
                    desc: 'Covered apartment unit with undivided sub-lease land share',
                    val: valMultApartmentPct,
                    set: setValMultApartmentPct,
                    badge: `${valMultApartmentPct}% of House`,
                  },
                  {
                    title: 'Penthouse',
                    desc: 'Top floor luxury penthouse with private terrace access',
                    val: valMultPenthousePct,
                    set: setValMultPenthousePct,
                    badge: `${valMultPenthousePct}% of House`,
                  },
                  {
                    title: 'Townhouse / Duplex',
                    desc: 'Multi-level semi-detached home or independent portion',
                    val: valMultTownhousePct,
                    set: setValMultTownhousePct,
                    badge: `${valMultTownhousePct}% of House`,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl bg-white border border-[#d8cebe] space-y-2 shadow-sm ${
                      idx === 4 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-semibold text-xs text-[#1F1B16] block">{item.title}</span>
                        <span className="text-[10px] text-[#7e7365] block">{item.desc}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-[#efebe4] text-[#5c3822] px-2 py-0.5 rounded-full shrink-0">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={item.val}
                        onChange={(e) => item.set(sanitizeIntegerString(e.target.value))}
                        className="w-24 bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-xl px-3 py-1.5 text-xs font-mono font-bold outline-none focus:border-[#5c3822] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs font-mono font-bold text-[#7e7365]">%</span>
                      <span className="text-[11px] text-[#7e7365] font-mono ml-auto">
                        Factor: {(parseInt(item.val, 10) / 100 || 1.0).toFixed(2)}x
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Section C: Condition Multipliers */}
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-5">
              <div className="border-b border-[#d8cebe]/60 pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#5c3822]" />
                    <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                      3. Condition & Construction Adjustment Factors (%)
                    </h2>
                  </div>
                  <Badge variant="stone" size="sm">Quality Tier</Badge>
                </div>
                <p className="text-xs text-[#7e7365] mt-1">
                  Premiums or discounts applied depending on age, fixtures, and readiness.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: 'Brand New / Modern Luxury',
                    desc: 'Recently built with imported sanitary, Italian tiles, modern elevation, and zero repair work required.',
                    val: valCondBrandNewPct,
                    set: setValCondBrandNewPct,
                    chip: '+25% Premium',
                    chipColor: 'bg-green-100 text-green-800',
                  },
                  {
                    title: 'Well-Maintained',
                    desc: 'Clean habitable condition, ready to move in, minor or zero renovations required.',
                    val: valCondWellMaintainedPct,
                    set: setValCondWellMaintainedPct,
                    chip: '+5% Normal',
                    chipColor: 'bg-blue-100 text-blue-800',
                  },
                  {
                    title: 'Needs Renovation',
                    desc: 'Older construction requiring modernizing, sanitary replacement, electrical rewiring, or paint.',
                    val: valCondRenovationPct,
                    set: setValCondRenovationPct,
                    chip: '-15% Discount',
                    chipColor: 'bg-amber-100 text-amber-900',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#d8cebe] space-y-2 shadow-sm">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-semibold text-xs text-[#1F1B16] block">{item.title}</span>
                        <span className="text-[10px] text-[#7e7365] block">{item.desc}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shrink-0 ${item.chipColor}`}>
                        {item.chip}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={item.val}
                        onChange={(e) => item.set(sanitizeIntegerString(e.target.value))}
                        className="w-24 bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-xl px-3 py-1.5 text-xs font-mono font-bold outline-none focus:border-[#5c3822] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <span className="text-xs font-mono font-bold text-[#7e7365]">%</span>
                      <span className="text-[11px] text-[#7e7365] font-mono ml-auto">
                        Multiplier: {(parseInt(item.val, 10) / 100 || 1.0).toFixed(2)}x
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Live Interactive Simulator Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7e7365]">
              <Eye className="w-3.5 h-3.5 text-[#5c3822]" />
              <span>Interactive BTS Pricing Simulator:</span>
            </div>

            <GlassCard variant="card" rounded="2rem" className="p-6 space-y-5 bg-[#fbf6f0] border border-[#d8cebe] shadow-lg sticky top-24">
              <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#5c3822]" />
                  <h3 className="font-display font-medium text-sm text-[#1F1B16]">
                    Live Output Verification
                  </h3>
                </div>
                <Badge variant="moss" size="sm">Real-Time Sync</Badge>
              </div>

              {/* Simulator Selector Controls */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] font-mono text-[#7e7365] uppercase block mb-1">
                    Test Karachi Area
                  </label>
                  <select
                    value={simArea}
                    onChange={(e) => setSimArea(e.target.value as any)}
                    className="w-full bg-white border border-[#d8cebe] rounded-xl p-2 text-xs outline-none focus:border-[#5c3822]"
                  >
                    <option value="North Nazimabad">North Nazimabad</option>
                    <option value="Gulshan">Gulshan-e-Iqbal</option>
                    <option value="FB Area">Federal B Area</option>
                    <option value="Gulberg">Gulberg Karachi</option>
                    <option value="Buffer Zone">Buffer Zone</option>
                    <option value="Scheme 33">Scheme 33</option>
                    <option value="North Karachi">North Karachi</option>
                    <option value="Scheme 45">Scheme 45 (Taiser)</option>
                    <option value="Clifton">Clifton & Sea View</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-mono text-[#7e7365] uppercase block mb-1">
                      Property Type
                    </label>
                    <select
                      value={simCategory}
                      onChange={(e) => setSimCategory(e.target.value as any)}
                      className="w-full bg-white border border-[#d8cebe] rounded-xl p-2 text-xs outline-none focus:border-[#5c3822]"
                    >
                      <option value="house">Bungalow / House</option>
                      <option value="plot">Residential Plot</option>
                      <option value="apartment">Apartment</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-[#7e7365] uppercase block mb-1">
                      Condition
                    </label>
                    <select
                      value={simCondition}
                      onChange={(e) => setSimCondition(e.target.value as any)}
                      className="w-full bg-white border border-[#d8cebe] rounded-xl p-2 text-xs outline-none focus:border-[#5c3822]"
                    >
                      <option value="brand_new">Brand New</option>
                      <option value="well_maintained">Well-Maintained</option>
                      <option value="renovation">Needs Renovation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#7e7365] uppercase block mb-1">
                    Plot Size (Sq Yds / Gaz)
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={simGazSize}
                    onChange={(e) => setSimGazSize(sanitizeIntegerString(e.target.value))}
                    className="w-full bg-white border border-[#d8cebe] rounded-xl p-2 text-xs font-mono font-bold outline-none focus:border-[#5c3822] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="e.g. 240"
                  />
                </div>
              </div>

              {/* Calculated Results Card */}
              <div className="bg-white border border-[#d8cebe] rounded-2xl p-4 space-y-3">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono text-[#7e7365] uppercase tracking-widest block">
                    ESTIMATED MARKET RANGE
                  </span>
                  <div className="text-xl sm:text-2xl font-display font-medium text-[#1F1B16]">
                    {formatCurrency(simResult.low)} – {formatCurrency(simResult.high)}
                  </div>
                  <div className="pt-1">
                    <Badge variant="moss" size="sm">
                      Average: {formatCurrency(simResult.mid)}
                    </Badge>
                  </div>
                </div>

                {/* Calculation Breakdown Step-by-Step */}
                <div className="space-y-1.5 pt-3 border-t border-[#d8cebe]/60 text-xs font-mono">
                  <div className="flex justify-between text-[#7e7365]">
                    <span>Base Gaz Rate:</span>
                    <span className="font-semibold text-[#1F1B16]">PKR {simResult.rate.toLocaleString()} / Gaz</span>
                  </div>
                  <div className="flex justify-between text-[#7e7365]">
                    <span>Category Factor:</span>
                    <span className="font-semibold text-[#1F1B16]">{simResult.catFactor.toFixed(2)}x</span>
                  </div>
                  <div className="flex justify-between text-[#7e7365]">
                    <span>Condition Factor:</span>
                    <span className="font-semibold text-[#1F1B16]">{simResult.condFactor.toFixed(2)}x</span>
                  </div>
                  <div className="flex justify-between text-[#7e7365] pt-1 border-t border-[#d8cebe]/40">
                    <span>Effective Rate / Gaz:</span>
                    <span className="font-bold text-[#5c3822]">PKR {simResult.avgPerGaz.toLocaleString()} / Gaz</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: PROPERTY ADVISOR PROFILE (SCREENSHOT 1)           */}
      {/* ======================================================== */}
      {activeTab === 'advisor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#d8cebe]/60 pb-3">
                <UserCheck className="w-4 h-4 text-[#5c3822]" />
                <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                  Senior Property Advisor Identity
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Advisor Full Name *"
                  placeholder="e.g. Syed Sikander Waqar"
                  value={advisorName}
                  onChange={(e) => setAdvisorName(e.target.value)}
                  required
                />

                <Input
                  label="Experience Badge *"
                  placeholder="e.g. 15 Years Exp"
                  value={advisorExperience}
                  onChange={(e) => setAdvisorExperience(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Advisor Title / Designation *"
                placeholder="e.g. Senior Managing Advisor | North Nazimabad & Construction"
                value={advisorRole}
                onChange={(e) => setAdvisorRole(e.target.value)}
                required
              />

              {/* Avatar Photo Upload */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-mono font-medium text-[#7e7365]">
                  Advisor Profile Photo (Cloudinary Upload)
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#5c3822] shrink-0 bg-[#e5decb] shadow-sm">
                    <Image src={advisorAvatar} alt={advisorName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex gap-2 w-full">
                    <input
                      type="url"
                      value={advisorAvatar}
                      onChange={(e) => setAdvisorAvatar(e.target.value)}
                      placeholder="https://res.cloudinary.com/... or upload"
                      className="flex-1 bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none focus:border-[#5c3822]"
                    />
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleAvatarFileUpload}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={uploadingAvatar}
                      onClick={() => avatarInputRef.current?.click()}
                      className="shrink-0 text-xs"
                    >
                      {uploadingAvatar ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <UploadCloud className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#d8cebe]/60 pb-3">
                <Phone className="w-4 h-4 text-[#5c3822]" />
                <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                  Advisor Contact & WhatsApp Channels
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Official Phone Number *"
                  placeholder="e.g. +92 300 822 4110"
                  value={advisorPhone}
                  onChange={(e) => setAdvisorPhone(e.target.value)}
                  required
                />

                <Input
                  label="WhatsApp Direct Number *"
                  placeholder="e.g. +923008224110"
                  value={advisorWhatsapp}
                  onChange={(e) => setAdvisorWhatsapp(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Direct Advisor Email Address *"
                type="email"
                placeholder="e.g. syedsikander1401@gmail.com"
                value={advisorEmail}
                onChange={(e) => setAdvisorEmail(e.target.value)}
                required
              />

              <Input
                label="WhatsApp Default Greeting Message"
                placeholder="e.g. Assalam o Alaikum, I want to inquire about properties in Karachi."
                value={advisorWaMsg}
                onChange={(e) => setAdvisorWaMsg(e.target.value)}
              />
            </GlassCard>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7e7365]">
              <Eye className="w-3.5 h-3.5 text-[#5c3822]" />
              <span>Live Public Card Preview:</span>
            </div>

            <GlassCard variant="card" rounded="2rem" className="p-6 space-y-5 bg-[#fbf6f0] border border-[#d8cebe] shadow-lg">
              <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
                <Badge variant="exclusive" size="sm">PROPERTY ADVISOR</Badge>
                <Badge variant="stone" size="sm">{advisorExperience}</Badge>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#5c3822] shrink-0 bg-[#e5decb] shadow-sm">
                  <Image src={advisorAvatar} alt={advisorName} fill className="object-cover" />
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
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#1F1B16]">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                    <Image
                      src="/amber-property-corner-whatsapp.png"
                      alt="WhatsApp"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-medium text-xs text-[#1F1B16]">Chat on WhatsApp</span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#d8cebe] text-[#1F1B16]">
                  <Phone className="w-4 h-4 text-[#5c3822]" />
                  <span className="font-mono">{advisorPhone}</span>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#d8cebe] text-[#1F1B16]">
                  <Mail className="w-4 h-4 text-[#5c3822]" />
                  <span className="font-mono truncate">{advisorEmail}</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Button type="button" variant="primary" size="md" className="w-full text-xs">
                  Book a Visit
                </Button>
                <Button type="button" variant="outline" size="md" className="w-full text-xs">
                  Send Message
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: MORTGAGE ESTIMATOR CMS (SCREENSHOT 2)             */}
      {/* ======================================================== */}
      {activeTab === 'mortgage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#d8cebe]/60 pb-3">
                <Calculator className="w-4 h-4 text-[#5c3822]" />
                <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                  Mortgage Estimator Header & Rates
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Estimator Title *"
                  placeholder="e.g. Private Wealth Mortgage Estimator"
                  value={mortgageTitle}
                  onChange={(e) => setMortgageTitle(e.target.value)}
                  required
                />

                <Input
                  label="Subtitle Badge *"
                  placeholder="e.g. Financial Modeling or KIBOR Finance"
                  value={mortgageBadge}
                  onChange={(e) => setMortgageBadge(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Default Interest / KIBOR Rate (%) *"
                  type="number"
                  step="0.05"
                  placeholder="e.g. 6.25 or 12.5"
                  value={mortgageDefaultInterest}
                  onChange={(e) => setMortgageDefaultInterest(e.target.value)}
                  required
                />

                <div className="space-y-1">
                  <label className="block text-xs font-mono font-medium text-[#7e7365]">
                    Default Down Payment (%) *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={mortgageDefaultDownPayment}
                    onChange={(e) => setMortgageDefaultDownPayment(sanitizeIntegerString(e.target.value))}
                    className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs font-mono outline-none focus:border-[#5c3822] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="20"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Amortization Terms (Comma-separated years) *"
                  placeholder="e.g. 15, 30 or 10, 15, 20, 30"
                  value={mortgageTerms}
                  onChange={(e) => setMortgageTerms(e.target.value)}
                  required
                />

                <Input
                  label="Estimated Annual Property Tax Rate (%)"
                  type="number"
                  step="0.05"
                  placeholder="e.g. 0.5"
                  value={mortgageTaxRate}
                  onChange={(e) => setMortgageTaxRate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
                  Legal Disclaimer & Compliance Note
                </label>
                <textarea
                  rows={2}
                  value={mortgageDisclaimer}
                  onChange={(e) => setMortgageDisclaimer(e.target.value)}
                  placeholder="*Estimates provided for informational illustrative modeling. Subject to lender qualification..."
                  className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-3 text-xs outline-none focus:border-[#5c3822]"
                />
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7e7365]">
              <Eye className="w-3.5 h-3.5 text-[#5c3822]" />
              <span>Live Estimator Preview (Calculated for PKR 5.00 Crore Villa):</span>
            </div>

            <GlassCard variant="card" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0] border border-[#d8cebe] shadow-lg">
              <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#5c3822]" />
                  <h3 className="font-display font-medium text-sm text-[#1F1B16]">
                    {mortgageTitle}
                  </h3>
                </div>
                <Badge variant="stone" size="sm">{mortgageBadge}</Badge>
              </div>

              <div className="bg-[#f5efe6] border border-[#d8cebe] rounded-2xl p-4 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#7e7365] uppercase tracking-widest block">
                    ESTIMATED MONTHLY OUTLAY
                  </span>
                  <div className="text-2xl font-display font-medium text-[#1F1B16] mt-0.5">
                    {formatCurrency(mortgagePreviewCalc.totalMonthly)}
                    <span className="text-[10px] font-mono text-[#7e7365] font-normal ml-1">/ mo</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#d8cebe]/60 text-xs">
                  <div className="flex justify-between text-[#7e7365]">
                    <span>Principal & Interest ({numInterest}%)</span>
                    <span className="font-mono font-medium text-[#1F1B16]">
                      {formatCurrency(mortgagePreviewCalc.principalAndInterest)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#7e7365]">
                    <span>Down Payment ({numDownPct}%)</span>
                    <span className="font-mono font-medium text-[#1F1B16]">
                      {formatCurrency(mortgagePreviewCalc.downPaymentAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#7e7365]">
                    <span>Est. Property Tax</span>
                    <span className="font-mono font-medium text-[#1F1B16]">
                      {formatCurrency(mortgagePreviewCalc.propertyTax)}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-[#7e7365] leading-tight pt-1">
                  {mortgageDisclaimer}
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: HERO & TAGLINES                                    */}
      {/* ======================================================== */}
      {activeTab === 'hero' && (
        <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#d8cebe]/60 pb-3">
            <Sparkles className="w-4 h-4 text-[#5c3822]" />
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              Homepage Hero Section & Announcement Banner
            </h2>
          </div>

          <Input
            label="Hero Main Headline"
            placeholder="e.g. Find Luxury Homes & Penthouses in Karachi"
            value={heroHeadline}
            onChange={(e) => setHeroHeadline(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Hero Subtitle & Sector Descriptions
            </label>
            <textarea
              rows={3}
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-3 text-xs outline-none focus:border-[#5c3822]"
            />
          </div>

          <div className="pt-2 border-t border-[#d8cebe]/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-medium text-[#7e7365]">
                Top Announcement Notification Bar
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={announcementActive}
                  onChange={(e) => setAnnouncementActive(e.target.checked)}
                  className="rounded border-[#d8cebe] text-[#5c3822] focus:ring-[#5c3822]"
                />
                <span className="font-semibold text-[#1F1B16]">
                  {announcementActive ? 'Banner Active' : 'Banner Disabled'}
                </span>
              </label>
            </div>
            <Input
              placeholder="e.g. New North Nazimabad luxury listings now open for private viewings."
              value={announcementBanner}
              onChange={(e) => setAnnouncementBanner(e.target.value)}
            />
          </div>
        </GlassCard>
      )}

      {/* ======================================================== */}
      {/* TAB 5: AGENCY CONTACT INFO                                */}
      {/* ======================================================== */}
      {activeTab === 'general' && (
        <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
          <div className="flex items-center gap-2 border-b border-[#d8cebe]/60 pb-3">
            <Phone className="w-4 h-4 text-[#5c3822]" />
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              Amber Property Corner Office Coordinates
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Primary Mobile Phone"
              value={phonePrimary}
              onChange={(e) => setPhonePrimary(e.target.value)}
              required
            />
            <Input
              label="Office Landline"
              value={phoneLandline}
              onChange={(e) => setPhoneLandline(e.target.value)}
            />
            <Input
              label="WhatsApp Concierge"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Official Contact Email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <Input
              label="Office Working Timings"
              value={officeTimings}
              onChange={(e) => setOfficeTimings(e.target.value)}
            />
          </div>

          <Input
            label="Karachi Office Physical Address"
            value={officeAddress}
            onChange={(e) => setOfficeAddress(e.target.value)}
            required
          />
        </GlassCard>
      )}

      {/* Global Save Button Bar */}
      <div className="flex items-center justify-between p-4 bg-[#f5efe6] border border-[#d8cebe] rounded-2xl sticky bottom-4 z-20 shadow-xl backdrop-blur-md">
        <div className="text-xs text-[#7e7365]">
          {lastSavedAt ? (
            <span className="font-mono text-green-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span>Last synced with PostgreSQL at {lastSavedAt}</span>
            </span>
          ) : (
            <span>Ready to update public website settings</span>
          )}
        </div>

        <Button type="submit" variant="primary" size="md" isLoading={loading} disabled={loading}>
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Changes...' : 'Save All Changes Live'}</span>
        </Button>
      </div>
    </form>
  );
}

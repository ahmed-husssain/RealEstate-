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
} from 'lucide-react';
import { calculateMonthlyMortgage, formatCurrency } from '@/lib/utils';

export function SiteContentEditorClient({ initialSettings }: { initialSettings: SiteSettingsMap }) {
  const [activeTab, setActiveTab] = useState<'advisor' | 'mortgage' | 'valuation' | 'hero' | 'general'>('advisor');

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
    initialSettings.mortgage_default_downpayment || '20'
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
  const [valRateNorthNazimabad, setValRateNorthNazimabad] = useState(
    initialSettings.val_rate_north_nazimabad || '280000'
  );
  const [valRateGulshan, setValRateGulshan] = useState(initialSettings.val_rate_gulshan || '260000');
  const [valRateFbArea, setValRateFbArea] = useState(initialSettings.val_rate_fb_area || '220000');
  const [valRateGulberg, setValRateGulberg] = useState(initialSettings.val_rate_gulberg || '210000');
  const [valRateBufferZone, setValRateBufferZone] = useState(initialSettings.val_rate_buffer_zone || '190000');
  const [valRateScheme33, setValRateScheme33] = useState(initialSettings.val_rate_scheme33 || '175000');
  const [valRateNorthKarachi, setValRateNorthKarachi] = useState(
    initialSettings.val_rate_north_karachi || '160000'
  );
  const [valRateScheme45, setValRateScheme45] = useState(initialSettings.val_rate_scheme45 || '75000');
  const [valRateClifton, setValRateClifton] = useState(initialSettings.val_rate_clifton || '350000');

  const [valMultHouse, setValMultHouse] = useState(initialSettings.val_mult_house || '1.00');
  const [valMultPlot, setValMultPlot] = useState(initialSettings.val_mult_plot || '0.65');
  const [valMultApartment, setValMultApartment] = useState(initialSettings.val_mult_apartment || '0.75');
  const [valMultPenthouse, setValMultPenthouse] = useState(initialSettings.val_mult_penthouse || '0.90');
  const [valMultTownhouse, setValMultTownhouse] = useState(initialSettings.val_mult_townhouse || '0.85');

  const [valCondBrandNew, setValCondBrandNew] = useState(initialSettings.val_cond_brand_new || '1.25');
  const [valCondWellMaintained, setValCondWellMaintained] = useState(
    initialSettings.val_cond_well_maintained || '1.05'
  );
  const [valCondRenovation, setValCondRenovation] = useState(initialSettings.val_cond_renovation || '0.85');

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

  // Preview Valuation calculation (240 Sq Yd House in North Nazimabad)
  const previewValuation = () => {
    const baseRate = Number(valRateNorthNazimabad) || 280000;
    const catMult = Number(valMultHouse) || 1.0;
    const condMult = Number(valCondBrandNew) || 1.25;
    const mid = 240 * baseRate * catMult * condMult;
    const low = Math.round((mid * 0.93) / 100000) * 100000;
    const high = Math.round((mid * 1.07) / 100000) * 100000;
    return { low, mid, high };
  };

  const valPreview = previewValuation();

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

        // Karachi Valuation BTS
        val_rate_north_nazimabad: valRateNorthNazimabad,
        val_rate_gulshan: valRateGulshan,
        val_rate_fb_area: valRateFbArea,
        val_rate_gulberg: valRateGulberg,
        val_rate_buffer_zone: valRateBufferZone,
        val_rate_scheme33: valRateScheme33,
        val_rate_north_karachi: valRateNorthKarachi,
        val_rate_scheme45: valRateScheme45,
        val_rate_clifton: valRateClifton,

        val_mult_house: valMultHouse,
        val_mult_plot: valMultPlot,
        val_mult_apartment: valMultApartment,
        val_mult_penthouse: valMultPenthouse,
        val_mult_townhouse: valMultTownhouse,

        val_cond_brand_new: valCondBrandNew,
        val_cond_well_maintained: valCondWellMaintained,
        val_cond_renovation: valCondRenovation,

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
          onClick={() => setActiveTab('advisor')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
            activeTab === 'advisor'
              ? 'bg-[#5c3822] text-[#F8F4ED] shadow-sm font-bold'
              : 'text-[#7e7365] hover:text-[#1F1B16] hover:bg-white/60'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>1. Property Advisor</span>
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
          <span>2. Mortgage Estimator</span>
        </button>

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
          <span>3. Karachi Valuation Engine (BTS)</span>
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
          <span>4. Hero & Copy</span>
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
      {/* TAB 1: PROPERTY ADVISOR PROFILE (SCREENSHOT 1)           */}
      {/* ======================================================== */}
      {activeTab === 'advisor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Fields Column */}
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

          {/* Live Preview Column (Matches Screenshot 1 exactly) */}
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
      {/* TAB 2: MORTGAGE ESTIMATOR CMS (SCREENSHOT 2)             */}
      {/* ======================================================== */}
      {activeTab === 'mortgage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Form Fields Column */}
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

                <Input
                  label="Default Down Payment (%) *"
                  type="number"
                  placeholder="e.g. 20 or 30"
                  value={mortgageDefaultDownPayment}
                  onChange={(e) => setMortgageDefaultDownPayment(e.target.value)}
                  required
                />
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

          {/* Live Preview Column (Matches Screenshot 2 exactly) */}
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
      {/* TAB 3: KARACHI VALUATION ENGINE (BTS)                    */}
      {/* ======================================================== */}
      {activeTab === 'valuation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            {/* Area Base Gaz Rates */}
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
              <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#5c3822]" />
                  <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                    Karachi Enclave Base Rate (PKR / Gaz)
                  </h2>
                </div>
                <Badge variant="exclusive" size="sm">BTS Engine</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="North Nazimabad (PKR / Gaz)"
                  type="number"
                  value={valRateNorthNazimabad}
                  onChange={(e) => setValRateNorthNazimabad(e.target.value)}
                />
                <Input
                  label="Gulshan-e-Iqbal (PKR / Gaz)"
                  type="number"
                  value={valRateGulshan}
                  onChange={(e) => setValRateGulshan(e.target.value)}
                />
                <Input
                  label="Federal B Area (PKR / Gaz)"
                  type="number"
                  value={valRateFbArea}
                  onChange={(e) => setValRateFbArea(e.target.value)}
                />
                <Input
                  label="Gulberg Karachi (PKR / Gaz)"
                  type="number"
                  value={valRateGulberg}
                  onChange={(e) => setValRateGulberg(e.target.value)}
                />
                <Input
                  label="Buffer Zone (PKR / Gaz)"
                  type="number"
                  value={valRateBufferZone}
                  onChange={(e) => setValRateBufferZone(e.target.value)}
                />
                <Input
                  label="Scheme 33 (PKR / Gaz)"
                  type="number"
                  value={valRateScheme33}
                  onChange={(e) => setValRateScheme33(e.target.value)}
                />
                <Input
                  label="North Karachi (PKR / Gaz)"
                  type="number"
                  value={valRateNorthKarachi}
                  onChange={(e) => setValRateNorthKarachi(e.target.value)}
                />
                <Input
                  label="Scheme 45 / Taiser (PKR / Gaz)"
                  type="number"
                  value={valRateScheme45}
                  onChange={(e) => setValRateScheme45(e.target.value)}
                />
                <div className="sm:col-span-2">
                  <Input
                    label="Clifton & Sea View (PKR / Gaz)"
                    type="number"
                    value={valRateClifton}
                    onChange={(e) => setValRateClifton(e.target.value)}
                  />
                </div>
              </div>
            </GlassCard>

            {/* Category Multipliers */}
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#d8cebe]/60 pb-3">
                <MapPin className="w-4 h-4 text-[#5c3822]" />
                <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                  Property Category Multipliers
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Bungalow / House"
                  type="number"
                  step="0.05"
                  value={valMultHouse}
                  onChange={(e) => setValMultHouse(e.target.value)}
                />
                <Input
                  label="Residential Plot"
                  type="number"
                  step="0.05"
                  value={valMultPlot}
                  onChange={(e) => setValMultPlot(e.target.value)}
                />
                <Input
                  label="Apartment / Flat"
                  type="number"
                  step="0.05"
                  value={valMultApartment}
                  onChange={(e) => setValMultApartment(e.target.value)}
                />
                <Input
                  label="Penthouse"
                  type="number"
                  step="0.05"
                  value={valMultPenthouse}
                  onChange={(e) => setValMultPenthouse(e.target.value)}
                />
                <Input
                  label="Townhouse / Duplex"
                  type="number"
                  step="0.05"
                  value={valMultTownhouse}
                  onChange={(e) => setValMultTownhouse(e.target.value)}
                />
              </div>
            </GlassCard>

            {/* Condition Multipliers */}
            <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#d8cebe]/60 pb-3">
                <Sparkles className="w-4 h-4 text-[#5c3822]" />
                <h2 className="font-display font-medium text-lg text-[#1F1B16]">
                  Condition Weight Factors
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  label="Brand New / Luxury"
                  type="number"
                  step="0.05"
                  value={valCondBrandNew}
                  onChange={(e) => setValCondBrandNew(e.target.value)}
                />
                <Input
                  label="Well-Maintained"
                  type="number"
                  step="0.05"
                  value={valCondWellMaintained}
                  onChange={(e) => setValCondWellMaintained(e.target.value)}
                />
                <Input
                  label="Needs Renovation"
                  type="number"
                  step="0.05"
                  value={valCondRenovation}
                  onChange={(e) => setValCondRenovation(e.target.value)}
                />
              </div>
            </GlassCard>
          </div>

          {/* Live Valuation Engine Preview */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#7e7365]">
              <Eye className="w-3.5 h-3.5 text-[#5c3822]" />
              <span>BTS Live Output (240 Gaz Brand New House in North Nazimabad):</span>
            </div>

            <GlassCard variant="card" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0] border border-[#d8cebe] shadow-lg">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono text-[#7e7365] uppercase tracking-widest block">
                  CALCULATED VALUATION RANGE
                </span>
                <div className="text-2xl font-display font-medium text-[#1F1B16]">
                  {formatCurrency(valPreview.low)} – {formatCurrency(valPreview.high)}
                </div>
                <div className="pt-1">
                  <Badge variant="moss" size="sm">
                    Average: {formatCurrency(valPreview.mid)}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#d8cebe]/60 text-xs font-mono text-[#7e7365]">
                <div className="flex justify-between">
                  <span>Base Rate:</span>
                  <span className="font-semibold text-[#1F1B16]">PKR {Number(valRateNorthNazimabad).toLocaleString()} / Gaz</span>
                </div>
                <div className="flex justify-between">
                  <span>Category Factor:</span>
                  <span className="font-semibold text-[#1F1B16]">{valMultHouse}x</span>
                </div>
                <div className="flex justify-between">
                  <span>Condition Factor:</span>
                  <span className="font-semibold text-[#1F1B16]">{valCondBrandNew}x</span>
                </div>
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

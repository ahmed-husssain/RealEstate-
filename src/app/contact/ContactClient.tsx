'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Input } from '@/ui/Input';
import { Select } from '@/ui/Select';
import { Phone, Mail, MapPin, CheckCircle2, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { submitInquiryAction } from '@/lib/actions/inquiry';
import { InquiryType } from '@prisma/client';
import confetti from 'canvas-confetti';
import { PublicSiteSettings } from '@/lib/db/settings';

export function ContactClient({ siteSettings }: { siteSettings: PublicSiteSettings }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('sales-buying');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      let type: InquiryType = InquiryType.GENERAL;
      if (inquiryType === 'valuation') type = InquiryType.VALUATION;

      const res = await submitInquiryAction({
        name,
        email,
        phone,
        type,
        message: `Topic: ${inquiryType}. Message: ${message}`,
      });

      if (res.success) {
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#5c3822', '#2e3a2f', '#D8CEBE', '#847666'],
          });
        } catch (e) {}
      } else {
        setErrorMessage(res.error || 'Failed to submit inquiry');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <BrandLogo href="" imageClassName="h-8" />
          <Badge variant="exclusive" size="sm">Get in Touch</Badge>
        </div>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Contact Our Advisory Team
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365]">
          Whether you want to buy, sell, rent, construct, or appraise prime property in Karachi, our senior consultants are ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container */}
        <div className="lg:col-span-7">
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 bg-[#fbf6f0]">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-medium text-2xl text-[#1F1B16]">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#7e7365] max-w-md mx-auto">
                  Thank you for reaching out to Amber Property Corner. Our designated advisor will contact you within 2 hours.
                </p>
                <div className="pt-2">
                  <Button variant="secondary" size="sm" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="e.g. Tariq Mehmood"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Phone / WhatsApp Number *"
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label="Email Address (Optional)"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Select
                  label="Select Service / Department"
                  options={[
                    { value: 'sales-buying', label: '1. Property Buying (Bungalows, Plots, Flats)' },
                    { value: 'rent-property', label: '2. Rental Properties (Houses, Bangalows & Flats)' },
                    { value: 'sales-selling', label: '3. Property Selling & Investment Booking' },
                    { value: 'construction', label: '4. Turnkey Construction & Gray Structure Rebuild' },
                    { value: 'legal-approvals', label: '5. Legal Due Diligence & SBCA Map Approvals' },
                    { value: 'interior-remodel', label: '6. Room-by-Room Interior Remodeling (Kitchen, Bath)' },
                    { value: 'remedial-seepage', label: '7. Seepage Waterproofing, Tank Repair & Remedial' },
                    { value: 'valuation', label: 'Property Valuation & Price Estimation' },
                    { value: 'general', label: 'General Inquiry / Consultation' },
                  ]}
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-[#7e7365]">
                    Message / Property Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your requirements, preferred location (e.g. North Nazimabad, Gulshan, FB Area, Scheme 33, Buffer Zone), budget, or plot size..."
                    className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-3.5 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner"
                  />
                </div>

                <div className="bg-white border border-[#d8cebe] rounded-xl p-3 text-xs text-[#7e7365] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2e3a2f] shrink-0" />
                  <span>Your contact information is strictly confidential.</span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-1">
                  <Button type="submit" variant="primary" size="lg" className="w-full text-xs sm:text-sm" isLoading={loading} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Office & Direct WhatsApp (Live Database Bound) */}
        <div className="lg:col-span-5 space-y-5">
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-7 space-y-5 bg-[#fbf6f0]">
            <Badge variant="stone" size="sm">Office Location</Badge>

            <div className="space-y-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#d8cebe]/70 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-display font-medium text-base text-[#1F1B16]">
                  <MapPin className="w-4 h-4 text-[#5c3822]" /> Amber Property Corner
                </div>
                <p className="text-[#7e7365]">{siteSettings.office_address}</p>
                <p className="text-[#1F1B16] pt-1">Timing: {siteSettings.office_timings}</p>
              </div>

              <a
                href={`https://wa.me/${siteSettings.whatsapp_clean}?text=${encodeURIComponent(
                  'Hello Amber Property Corner, I would like to get in touch.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 hover:bg-[#22c55e]/25 text-[#1F1B16] transition-colors group cursor-pointer"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="/amber-property-corner-whatsapp.png"
                    alt="WhatsApp"
                    fill
                    sizes="24px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-semibold text-xs text-[#1F1B16] block">
                    Direct WhatsApp Chat ({siteSettings.whatsapp_number})
                  </span>
                  <span className="text-[11px] text-[#7e7365]">
                    Fastest response from our Senior Advisor
                  </span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-white border border-[#d8cebe]/70 space-y-2 text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#5c3822]" />
                  <a href={`tel:${siteSettings.whatsapp_clean}`} className="font-mono text-[#1F1B16] hover:underline">
                    {siteSettings.phone_primary}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#7e7365]" />
                  <a href={`tel:${siteSettings.phone_landline.replace(/[^0-9]/g, '')}`} className="font-mono text-[#1F1B16] hover:underline">
                    {siteSettings.phone_landline}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#5c3822]" />
                  <a href={`mailto:${siteSettings.contact_email}`} className="font-mono text-[#1F1B16] hover:underline">
                    {siteSettings.contact_email}
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

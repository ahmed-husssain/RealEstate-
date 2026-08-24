'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Input } from '@/ui/Input';
import { Select } from '@/ui/Select';
import { Phone, Mail, MapPin, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { submitInquiryAction } from '@/lib/actions/inquiry';
import { InquiryType } from '@prisma/client';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('buying');
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
          Contact Our Karachi Office
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365]">
          Have a question about buying, selling, constructing, or renovating property? Send us a message or visit our office in DHA Phase 6.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-7">
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 shadow-xl bg-[#fbf6f0]">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-medium text-2xl text-[#1F1B16]">
                  Message Sent Successfully
                </h3>
                <p className="text-xs text-[#7e7365] max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#1F1B16]">{name}</strong>. Our team will contact you directly at <strong className="text-[#1F1B16]">{phone || email}</strong> shortly.
                </p>
                <div className="pt-2">
                  <Button variant="secondary" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Your Full Name"
                  placeholder="e.g. Muhammad Ahmed Khan"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    label="Phone / WhatsApp Number"
                    type="tel"
                    placeholder="0300 1234567"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="ahmed@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Select
                  label="I am interested in"
                  options={[
                    { value: 'buying', label: 'Buying a Property (House, Plot, Flat)' },
                    { value: 'selling', label: 'Selling My Property' },
                    { value: 'construction', label: 'New Construction Services' },
                    { value: 'renovation', label: 'House Renovation & Remodeling' },
                    { value: 'valuation', label: 'Property Valuation & Evaluation' },
                    { value: 'general', label: 'General Inquiry' },
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
                    placeholder="Tell us about your requirements, preferred location (e.g. DHA Phase 6, Clifton), budget, or plot size..."
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
                  <Button type="submit" variant="primary" size="lg" className="w-full text-xs sm:text-sm" isLoading={loading}>
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Office & Direct WhatsApp */}
        <div className="lg:col-span-5 space-y-5">
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-7 space-y-5 bg-[#fbf6f0]">
            <Badge variant="stone" size="sm">Office Location</Badge>

            <div className="space-y-3.5 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-[#d8cebe]/70 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-2 font-display font-medium text-base text-[#1F1B16]">
                  <MapPin className="w-4 h-4 text-[#5c3822]" /> DHA Phase 6 Office
                </div>
                <p className="text-[#7e7365]">Main Khayaban-e-Bukhari, Phase 6, DHA, Karachi, Pakistan</p>
                <p className="text-[#1F1B16] pt-1">Timing: Mon – Sat (10:30 AM to 8:00 PM)</p>
              </div>

              <a
                href="https://wa.me/923008224110?text=Hello%20Amber%20Property%20Corner,%20I%20would%20like%20to%20get%20in%20touch."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#22c55e]/15 border border-[#22c55e]/30 hover:bg-[#22c55e]/25 text-[#1F1B16] transition-colors group cursor-pointer"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                  <Image
                    src="/amber-property-corner-whatsapp.png"
                    alt="WhatsApp"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <span className="font-semibold text-xs text-[#1F1B16] block">
                    Direct WhatsApp Chat
                  </span>
                  <span className="text-[11px] text-[#7e7365]">
                    Fastest response from our Senior Advisor
                  </span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-white border border-[#d8cebe]/70 space-y-2 text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#5c3822]" />
                  <a href="tel:+923008224110" className="font-mono text-[#1F1B16] hover:underline">+92 300 822 4110</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#5c3822]" />
                  <a href="mailto:info@amberproperty.com" className="font-mono text-[#1F1B16] hover:underline">info@amberproperty.com</a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

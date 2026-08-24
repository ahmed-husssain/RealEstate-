'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Select } from '@/ui/Select';
import { Phone, Mail, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('acquisition');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#5c3822', '#2e3a2f', '#D8CEBE', '#847666'],
        });
      } catch (e) {}
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="exclusive" size="sm">Private Concierge</Badge>
        <h1 className="font-display font-medium text-3xl sm:text-5xl text-[#1F1B16] tracking-tight">
          Initiate Confidential Dialogue
        </h1>
        <p className="text-xs sm:text-sm text-[#7e7365]">
          Direct routing to our Senior Managing Partners for private acquisition, divestment, or portfolio appraisal inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Container */}
        <div className="lg:col-span-7">
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-10 shadow-xl bg-[#fbf6f0]">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#2e3a2f]/15 text-[#2e3a2f] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-medium text-2xl text-[#1F1B16]">
                  Inquiry Received
                </h3>
                <p className="text-xs text-[#7e7365] max-w-sm mx-auto leading-relaxed">
                  A Senior Partner will respond to <strong className="text-[#1F1B16]">{email}</strong> within four business hours under strict confidentiality.
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
                  label="Full Name / Principal Representation"
                  placeholder="e.g. Eleanor Roosevelt-Sterling"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Confidential Email"
                    type="email"
                    placeholder="name@advisory.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Direct Telephone"
                    type="tel"
                    placeholder="+1 (555) 019-8821"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <Select
                  label="Nature of Inquiry"
                  options={[
                    { value: 'acquisition', label: 'Confidential Acquisition / Buying' },
                    { value: 'divestment', label: 'Bespoke Property Divestment / Selling' },
                    { value: 'valuation', label: 'Institutional Property Valuation' },
                    { value: 'off-market', label: 'Access to Private Off-Market Pipeline' },
                    { value: 'advisory', label: 'Architectural & Development Advisory' },
                  ]}
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-semibold uppercase tracking-[0.18em] text-[#7e7365]">
                    Specific Requirements or Asset Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide desired enclaves, spatial parameters, timeline, or asset address..."
                    className="w-full bg-[#fbf6f0] text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-4 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner"
                  />
                </div>

                <div className="bg-[#f5efe6] border border-[#d8cebe] rounded-xl p-3 text-[11px] text-[#7e7365] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2e3a2f] shrink-0" />
                  <span>All communications protected under standard international NDA protocol.</span>
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={loading}>
                    Submit Confidential Inquiry
                  </Button>
                </div>
              </form>
            )}
          </GlassCard>
        </div>

        {/* Offices & Direct Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 space-y-6 bg-[#fbf6f0]">
            <Badge variant="stone" size="sm">Metropolitan Offices</Badge>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1.5">
                <div className="flex items-center gap-2 font-display font-medium text-base text-[#1F1B16]">
                  <MapPin className="w-4 h-4 text-[#5c3822]" /> New York Flagship
                </div>
                <p className="text-[#7e7365]">575 Madison Avenue, 18th Floor, New York, NY 10022</p>
                <p className="font-mono text-[#5c3822]">+1 (212) 640-8800</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f5efe6] border border-[#d8cebe]/60 space-y-1.5">
                <div className="flex items-center gap-2 font-display font-medium text-base text-[#1F1B16]">
                  <MapPin className="w-4 h-4 text-[#5c3822]" /> Los Angeles Private Client Suite
                </div>
                <p className="text-[#7e7365]">9460 Wilshire Boulevard, Beverly Hills, CA 90212</p>
                <p className="font-mono text-[#5c3822]">+1 (310) 892-4400</p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#d8cebe]/60 space-y-2">
              <span className="text-[11px] font-mono uppercase text-[#7e7365] block">Direct Executive Concierge</span>
              <p className="text-xs font-mono text-[#1F1B16]">concierge@amberproperty.com</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

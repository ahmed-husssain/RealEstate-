'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { updateSiteSettingsAction, SiteSettingsMap } from '@/lib/actions/admin-content';
import { CheckCircle2, AlertCircle, Save, Sparkles, Phone, MapPin, Megaphone } from 'lucide-react';

export function SiteContentEditorClient({ initialSettings }: { initialSettings: SiteSettingsMap }) {
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
  const [contactEmail, setContactEmail] = useState(initialSettings.contact_email || 'info@amberproperty.com');
  const [officeAddress, setOfficeAddress] = useState(
    initialSettings.office_address || 'B 693, Block 13 Gulberg Town, Karachi, Pakistan'
  );
  const [officeTimings, setOfficeTimings] = useState(
    initialSettings.office_timings || 'Mon – Sat: 10:00 AM – 9:00 PM | Sun: By Appointment'
  );
  const [announcementBanner, setAnnouncementBanner] = useState(
    initialSettings.announcement_banner || 'New North Nazimabad and Gulshan luxury listings now open for private viewings.'
  );
  const [announcementActive, setAnnouncementActive] = useState(
    initialSettings.announcement_active === 'true'
  );

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await updateSiteSettingsAction({
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
      });

      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message || 'Website text updated successfully!' });
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to update settings' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-12">
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-2 ${
            statusMsg.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* 1. Hero Text CMS */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-4 bg-[#fbf6f0]">
        <div className="flex items-center gap-2 text-[#5c3822]">
          <Sparkles className="w-4 h-4" />
          <h2 className="font-display font-medium text-lg text-[#1F1B16]">
            1. Home Page Hero & Main Headline
          </h2>
        </div>

        <Input
          label="Main Headline"
          value={heroHeadline}
          onChange={(e) => setHeroHeadline(e.target.value)}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-medium text-[#7e7365]">
            Hero Subtitle / Description
          </label>
          <textarea
            rows={3}
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            required
            className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-3 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner"
          />
        </div>
      </GlassCard>

      {/* 2. Contact & Concierge Information */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-4 bg-[#fbf6f0]">
        <div className="flex items-center gap-2 text-[#5c3822]">
          <Phone className="w-4 h-4" />
          <h2 className="font-display font-medium text-lg text-[#1F1B16]">
            2. Contact Numbers & WhatsApp Concierge
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Primary Mobile Phone"
            value={phonePrimary}
            onChange={(e) => setPhonePrimary(e.target.value)}
            required
          />

          <Input
            label="WhatsApp Concierge Number"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Landline / Office Number"
            value={phoneLandline}
            onChange={(e) => setPhoneLandline(e.target.value)}
          />

          <Input
            label="Official Contact Email"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>
      </GlassCard>

      {/* 3. Office Address & Hours */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-4 bg-[#fbf6f0]">
        <div className="flex items-center gap-2 text-[#5c3822]">
          <MapPin className="w-4 h-4" />
          <h2 className="font-display font-medium text-lg text-[#1F1B16]">
            3. Office Address & Visiting Timings
          </h2>
        </div>

        <Input
          label="Physical Office Address"
          value={officeAddress}
          onChange={(e) => setOfficeAddress(e.target.value)}
          required
        />

        <Input
          label="Visiting Hours"
          value={officeTimings}
          onChange={(e) => setOfficeTimings(e.target.value)}
          required
        />
      </GlassCard>

      {/* 4. Global Announcement Banner */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-4 bg-[#fbf6f0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#5c3822]">
            <Megaphone className="w-4 h-4" />
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              4. Promotional Announcement Banner
            </h2>
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
            <input
              type="checkbox"
              checked={announcementActive}
              onChange={(e) => setAnnouncementActive(e.target.checked)}
              className="w-4 h-4 rounded text-[#5c3822] focus:ring-[#5c3822]"
            />
            <span className="font-semibold text-[#1F1B16]">Enable Banner</span>
          </label>
        </div>

        <Input
          label="Announcement Text"
          value={announcementBanner}
          onChange={(e) => setAnnouncementBanner(e.target.value)}
          placeholder="e.g. Special installment project booking open this week."
        />
      </GlassCard>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-[#d8cebe]/60">
        <Button type="submit" variant="primary" size="lg" isLoading={loading}>
          <Save className="w-4 h-4" />
          <span>Save Website Content</span>
        </Button>
      </div>
    </form>
  );
}

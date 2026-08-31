'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { updateSiteSettingsAction, SiteSettingsMap } from '@/lib/actions/admin-content';
import { CheckCircle2, AlertCircle, Save, Sparkles, Phone, MapPin, Megaphone, Loader2, Check, RefreshCw } from 'lucide-react';

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
    initialSettings.office_timings || 'Mon – Sat (10:30 AM to 8:00 PM)'
  );
  const [announcementBanner, setAnnouncementBanner] = useState(
    initialSettings.announcement_banner || 'New North Nazimabad and Gulshan luxury listings now open for private viewings.'
  );
  const [announcementActive, setAnnouncementActive] = useState(
    initialSettings.announcement_active !== undefined ? initialSettings.announcement_active === 'true' : true
  );

  const [loading, setLoading] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string; details?: string[] } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const payload: Record<string, string> = {
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
        const timeString = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSavedAt(timeString);
        setStatusMsg({
          type: 'success',
          text: `Verified & Saved to Database at ${timeString}!`,
          details: [
            `WhatsApp Concierge: ${whatsappNumber}`,
            `Primary Phone: ${phonePrimary}`,
            `Office Address: ${officeAddress}`,
            `Official Email: ${contactEmail}`,
            `All public pages, navbar, and footer cache updated in real time.`,
          ],
        });

        // Sync with verified database return data
        if (res.data) {
          if (res.data.hero_headline) setHeroHeadline(res.data.hero_headline);
          if (res.data.hero_subtitle) setHeroSubtitle(res.data.hero_subtitle);
          if (res.data.phone_primary) setPhonePrimary(res.data.phone_primary);
          if (res.data.phone_landline) setPhoneLandline(res.data.phone_landline);
          if (res.data.whatsapp_number) setWhatsappNumber(res.data.whatsapp_number);
          if (res.data.contact_email) setContactEmail(res.data.contact_email);
          if (res.data.office_address) setOfficeAddress(res.data.office_address);
          if (res.data.office_timings) setOfficeTimings(res.data.office_timings);
          if (res.data.announcement_banner) setAnnouncementBanner(res.data.announcement_banner);
          if (res.data.announcement_active !== undefined) setAnnouncementActive(res.data.announcement_active === 'true');
        }
      } else {
        setStatusMsg({
          type: 'error',
          text: res.error || 'Failed to update website content in database.',
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-12">
      {/* Dynamic Status / Feedback Alert */}
      {loading && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[#1F1B16] text-xs flex items-center gap-3 animate-pulse">
          <Loader2 className="w-5 h-5 text-[#5c3822] animate-spin shrink-0" />
          <div>
            <span className="font-bold text-[#5c3822]">Saving to Database...</span>
            <p className="text-[11px] text-[#7e7365]">Updating SiteSetting records and revalidating public cache.</p>
          </div>
        </div>
      )}

      {statusMsg && !loading && (
        <div
          className={`p-5 rounded-2xl border text-xs space-y-2 shadow-sm animate-in fade-in zoom-in-95 duration-200 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <div className="flex items-center gap-2.5 font-bold text-sm">
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>

          {statusMsg.details && statusMsg.details.length > 0 && (
            <ul className="pl-7 space-y-1 text-xs text-emerald-800 list-disc">
              {statusMsg.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          )}
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
      <div className="flex items-center justify-between pt-4 border-t border-[#d8cebe]/60">
        <div className="text-xs text-[#7e7365]">
          {lastSavedAt ? `Last verified & saved at ${lastSavedAt}` : 'Ready to save changes'}
        </div>
        <Button type="submit" variant="primary" size="lg" isLoading={loading} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving to Database...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save & Update Website</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Badge } from '@/ui/Badge';
import { updateAreaAction, createAreaAction, uploadAreaHeroDirectAction } from '@/lib/actions/admin-areas';
import { Edit2, Plus, CheckCircle2, AlertCircle, MapPin, X, UploadCloud, Loader2 } from 'lucide-react';

interface AreaData {
  id: string;
  slug: string;
  name: string;
  city: string;
  tagline: string | null;
  description: string;
  heroImage: string;
  heroImagePublicId?: string | null;
  avgPriceSqYd: string | null;
  annualGrowth: string | null;
  isPopular: boolean;
  _count: { properties: number };
}

export function AreasManagerClient({ initialAreas }: { initialAreas: AreaData[] }) {
  const router = useRouter();
  const [editingArea, setEditingArea] = useState<AreaData | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [heroImagePublicId, setHeroImagePublicId] = useState<string | null>(null);
  const [avgPriceSqYd, setAvgPriceSqYd] = useState('');
  const [annualGrowth, setAnnualGrowth] = useState('');

  const [uploadingHero, setUploadingHero] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const openEdit = (area: AreaData) => {
    setIsAddingNew(false);
    setEditingArea(area);
    setName(area.name);
    setTagline(area.tagline || '');
    setDescription(area.description);
    setHeroImage(area.heroImage);
    setHeroImagePublicId(area.heroImagePublicId || null);
    setAvgPriceSqYd(area.avgPriceSqYd || 'PKR 150,000 / Sq Yd');
    setAnnualGrowth(area.annualGrowth || '+12.0%');
  };

  const openAdd = () => {
    setEditingArea(null);
    setIsAddingNew(true);
    setName('');
    setTagline('');
    setDescription('');
    setHeroImage('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80');
    setHeroImagePublicId(null);
    setAvgPriceSqYd('PKR 120,000 / Sq Yd');
    setAnnualGrowth('+10.0%');
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setStatusMsg({ type: 'error', text: 'Image file size must be less than 10 MB.' });
      return;
    }

    setUploadingHero(true);
    setStatusMsg(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadAreaHeroDirectAction(formData);
      if (res.success && res.data) {
        setHeroImage(res.data.url);
        setHeroImagePublicId(res.data.publicId);
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to upload hero image.' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err?.message || 'Error uploading file.' });
    } finally {
      setUploadingHero(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const payload = {
        name,
        city: 'Karachi',
        tagline: tagline || null,
        description,
        heroImage,
        heroImagePublicId: heroImagePublicId || null,
        avgPriceSqYd: avgPriceSqYd || null,
        annualGrowth: annualGrowth || null,
        isPopular: true,
      };

      let res;
      if (editingArea) {
        res = await updateAreaAction(editingArea.id, payload);
      } else {
        res = await createAreaAction(payload);
      }

      if (res.success) {
        setStatusMsg({ type: 'success', text: res.message || 'Saved successfully' });
        setEditingArea(null);
        setIsAddingNew(false);
        router.refresh();
      } else {
        setStatusMsg({ type: 'error', text: res.error || 'Failed to save area' });
      }
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
            Karachi Neighborhoods
          </h1>
          <p className="text-xs sm:text-sm text-[#7e7365]">
            Manage covered enclaves, average gaz prices, appreciation metrics, and hero banners.
          </p>
        </div>

        {!isAddingNew && !editingArea && (
          <Button variant="primary" size="md" onClick={openAdd} className="shrink-0 text-xs">
            <Plus className="w-4 h-4" />
            <span>Add New Area</span>
          </Button>
        )}
      </div>

      {/* Notification */}
      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-2.5 animate-in fade-in ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Form Card */}
      {(isAddingNew || editingArea) && (
        <GlassCard variant="container" rounded="2rem" className="p-6 bg-[#fbf6f0] border border-[#d8cebe] space-y-4">
          <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-3">
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              {editingArea ? `Edit Area: ${editingArea.name}` : 'Create New Karachi Area'}
            </h2>
            <button
              onClick={() => {
                setEditingArea(null);
                setIsAddingNew(false);
              }}
              className="p-1 rounded-full text-[#7e7365] hover:text-[#1F1B16]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Area Name"
                placeholder="e.g. North Nazimabad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Tagline / Summary"
                placeholder="e.g. Master-Planned KDA Residential Enclave"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Average Price / Sq Yd"
                placeholder="e.g. PKR 160,000 / Sq Yd"
                value={avgPriceSqYd}
                onChange={(e) => setAvgPriceSqYd(e.target.value)}
                required
              />
              <Input
                label="Annual Appreciation Growth"
                placeholder="e.g. +14.5%"
                value={annualGrowth}
                onChange={(e) => setAnnualGrowth(e.target.value)}
                required
              />
            </div>

            {/* Hero Cover Photo Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-medium text-[#7e7365]">
                Hero Cover Image
              </label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                {heroImage && (
                  <div className="relative w-28 h-16 rounded-xl overflow-hidden bg-[#e5decb] border border-[#d8cebe] shrink-0">
                    <img src={heroImage} alt="Hero preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex-1 w-full flex items-center gap-2">
                  <input
                    type="url"
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    required
                    placeholder="https://images.unsplash.com/... or upload via button"
                    className="flex-1 bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none focus:border-[#5c3822]"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleHeroFileUpload}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={uploadingHero}
                    onClick={() => fileInputRef.current?.click()}
                    className="shrink-0 text-xs"
                  >
                    {uploadingHero ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <UploadCloud className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingHero ? 'Uploading...' : 'Upload'}</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-mono font-medium text-[#7e7365]">
                Area Guide & Living Overview
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-3 text-xs outline-none focus:border-[#5c3822] shadow-inner"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingArea(null);
                  setIsAddingNew(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={loading} disabled={loading}>
                <span>{loading ? 'Saving Area Data...' : 'Save Area Data'}</span>
              </Button>
            </div>
          </form>
        </GlassCard>
      )}

      {/* Areas Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {initialAreas.map((area) => (
          <GlassCard
            key={area.id}
            variant="card"
            rounded="1.75rem"
            className="overflow-hidden bg-[#fbf6f0] flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] w-full bg-[#e5decb]">
                <Image src={area.heroImage} alt={area.name} fill className="object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge variant="exclusive" size="sm">
                    {area._count.properties} Listings
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-medium text-lg text-[#1F1B16]">{area.name}</h3>
                  <span className="text-[10px] font-mono font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                    {area.annualGrowth}
                  </span>
                </div>
                <p className="text-xs text-[#7e7365] line-clamp-2">{area.description}</p>
                <div className="pt-2 border-t border-[#d8cebe]/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#7e7365]">Avg Rate</span>
                  <span className="font-bold text-[#1F1B16]">{area.avgPriceSqYd}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs"
                onClick={() => openEdit(area)}
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

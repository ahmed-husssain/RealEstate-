'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Select } from '@/ui/Select';
import { PropertyStatus, PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import { createPropertyAction, updatePropertyAction } from '@/lib/actions/admin-properties';
import { Plus, Trash2, ArrowLeft, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface AreaOption {
  id: string;
  name: string;
  city: string;
}

interface PropertyFormProps {
  initialData?: any;
  areas: AreaOption[];
  isEdit?: boolean;
}

export function PropertyForm({ initialData, areas, isEdit = false }: PropertyFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState<number>(initialData ? Number(initialData.price) : 50000000);
  const [priceFormatted, setPriceFormatted] = useState(initialData?.priceFormatted || '');
  const [status, setStatus] = useState<PropertyStatus>(initialData?.status || PropertyStatus.FOR_SALE);
  const [propertyType, setPropertyType] = useState<PropertyType>(initialData?.propertyType || PropertyType.HOUSE);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.isFeatured || false);

  const [bedrooms, setBedrooms] = useState<number>(initialData?.bedrooms || 5);
  const [bathrooms, setBathrooms] = useState<number>(initialData?.bathrooms || 5);
  const [areaSize, setAreaSize] = useState<number>(initialData ? Number(initialData.areaSize) : 240);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(initialData?.areaUnit || AreaUnit.SQYD);
  const [yearBuilt, setYearBuilt] = useState<number>(initialData?.yearBuilt || 2024);
  const [parkingSpaces, setParkingSpaces] = useState<number>(initialData?.parkingSpaces || 2);
  const [condition, setCondition] = useState<PropertyCondition>(initialData?.condition || PropertyCondition.GOOD);

  const [address, setAddress] = useState(initialData?.address || '');
  const [areaId, setAreaId] = useState(initialData?.areaId || (areas[0]?.id || ''));

  // Image URLs
  const defaultImages = initialData?.images?.map((img: any) => ({
    url: img.url,
    alt: img.alt || '',
    isHero: img.isHero,
  })) || [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', alt: 'Main Front Elevation', isHero: true },
  ];

  const [images, setImages] = useState<Array<{ url: string; alt?: string; isHero: boolean }>>(defaultImages);
  const [amenityInput, setAmenityInput] = useState('');
  const [amenities, setAmenities] = useState<string[]>(
    initialData?.amenities || [
      'Dual German Acrylic Kitchens',
      'Imported Spanish Porcelain Tiling',
      'Underground RCC Water Reservoir',
      'Solar Hybrid Net-Metering Setup',
    ]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const addImage = () => {
    setImages([...images, { url: '', alt: '', isHero: false }]);
  };

  const removeImage = (index: number) => {
    if (images.length === 1) return;
    setImages(images.filter((_, idx) => idx !== index));
  };

  const updateImageUrl = (index: number, url: string) => {
    const updated = [...images];
    updated[index].url = url;
    setImages(updated);
  };

  const setHeroImage = (index: number) => {
    const updated = images.map((img, idx) => ({
      ...img,
      isHero: idx === index,
    }));
    setImages(updated);
  };

  const addAmenity = () => {
    if (!amenityInput.trim()) return;
    if (!amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
    }
    setAmenityInput('');
  };

  const removeAmenity = (item: string) => {
    setAmenities(amenities.filter((a) => a !== item));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const payload = {
        title,
        tagline,
        description,
        price: Number(price),
        priceFormatted: priceFormatted || undefined,
        status,
        propertyType,
        isFeatured,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        areaSize: Number(areaSize),
        areaUnit,
        yearBuilt: Number(yearBuilt) || undefined,
        parkingSpaces: Number(parkingSpaces),
        condition,
        address,
        areaId,
        amenities,
        images: images.filter((img) => img.url.trim().length > 0).map((img, idx) => ({
          url: img.url.trim(),
          alt: img.alt || title,
          isHero: img.isHero || idx === 0,
          displayOrder: idx,
        })),
      };

      let res;
      if (isEdit && initialData?.id) {
        res = await updatePropertyAction(initialData.id, payload);
      } else {
        res = await createPropertyAction(payload);
      }

      if (res.success) {
        setSuccessMsg(res.message || 'Saved successfully');
        setTimeout(() => {
          router.push('/admin/properties');
          router.refresh();
        }, 800);
      } else {
        setError(res.error || 'Failed to save property');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/properties">
            <Button type="button" variant="secondary" size="sm" className="p-2 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="font-display font-medium text-2xl text-[#1F1B16]">
              {isEdit ? 'Edit Property Listing' : 'Create New Property'}
            </h1>
            <p className="text-xs text-[#7e7365]">
              Fill in all specifications and media to publish across the website
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button type="submit" variant="primary" size="md" isLoading={loading}>
            <span>{isEdit ? 'Update Listing' : 'Publish Listing'}</span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-xs text-green-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1. Basic Identity */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <h2 className="font-display font-medium text-lg text-[#1F1B16]">
          1. Title & Marketing Summary
        </h2>

        <Input
          label="Property Title"
          placeholder="e.g. 500 Gaz Luxury Modern Bangalow"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="Subtitle / Tagline"
          placeholder="e.g. Brand New Architectural Residence in Block F, North Nazimabad"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-medium text-[#7e7365]">
            Full Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Detailed architectural specifications, room layout, fittings, water/gas infrastructure..."
            className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-3 text-xs sm:text-sm outline-none focus:border-[#5c3822] shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Category
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType)}
              className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none"
            >
              <option value={PropertyType.HOUSE}>Bungalow / House</option>
              <option value={PropertyType.VILLA}>Architectural Villa</option>
              <option value={PropertyType.TOWNHOUSE}>Townhouse / Duplex</option>
              <option value={PropertyType.PLOT}>Residential / Commercial Plot</option>
              <option value={PropertyType.APARTMENT}>Apartment / Flat</option>
              <option value={PropertyType.PENTHOUSE}>Sky Penthouse</option>
              <option value={PropertyType.COMMERCIAL}>Commercial Plaza / Asset</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Listing Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PropertyStatus)}
              className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none"
            >
              <option value={PropertyStatus.FOR_SALE}>For Sale</option>
              <option value={PropertyStatus.FOR_LEASE}>For Rent</option>
              <option value={PropertyStatus.EXCLUSIVE}>Exclusive / Off-Market</option>
              <option value={PropertyStatus.UNDER_OFFER}>Under Offer</option>
              <option value={PropertyStatus.SOLD}>Sold</option>
            </select>
          </div>

          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#5c3822] focus:ring-[#5c3822]"
              />
              <span className="font-medium text-[#1F1B16]">Feature on Home Page</span>
            </label>
          </div>
        </div>
      </GlassCard>

      {/* 2. Pricing & Location */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <h2 className="font-display font-medium text-lg text-[#1F1B16]">
          2. Price & Karachi Location
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Price (PKR exact number)"
            type="number"
            placeholder="e.g. 145000000 for 14.50 Crore"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <Input
            label="Custom Display Price (Optional)"
            placeholder="e.g. PKR 14.50 Crore / PKR 85 Lakh"
            value={priceFormatted}
            onChange={(e) => setPriceFormatted(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Street Address / Block Details"
            placeholder="e.g. Street 14, Block F"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Select Karachi Area / Enclave
            </label>
            <select
              value={areaId}
              onChange={(e) => setAreaId(e.target.value)}
              className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none"
            >
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name} ({area.city})
                </option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* 3. Specs */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <h2 className="font-display font-medium text-lg text-[#1F1B16]">
          3. Dimensions & Specifications
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Input
            label="Area Size (in Gaz / Sq Yd)"
            type="number"
            value={areaSize}
            onChange={(e) => setAreaSize(Number(e.target.value))}
            required
          />

          <Input
            label="Bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
          />

          <Input
            label="Bathrooms"
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value))}
          />

          <Input
            label="Car Parking"
            type="number"
            value={parkingSpaces}
            onChange={(e) => setParkingSpaces(Number(e.target.value))}
          />
        </div>
      </GlassCard>

      {/* 4. Photo Gallery */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-medium text-lg text-[#1F1B16]">
            4. Photos & Media URLs
          </h2>
          <Button type="button" variant="secondary" size="sm" onClick={addImage} className="text-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photo URL</span>
          </Button>
        </div>

        <div className="space-y-3">
          {images.map((img, idx) => (
            <div key={idx} className="flex items-center gap-2 p-3 bg-white border border-[#d8cebe] rounded-2xl">
              <span className="text-xs font-mono text-[#7e7365] w-6">{idx + 1}.</span>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/photo-..."
                value={img.url}
                onChange={(e) => updateImageUrl(idx, e.target.value)}
                className="flex-1 bg-transparent text-xs outline-none"
              />
              <button
                type="button"
                onClick={() => setHeroImage(idx)}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono transition-all ${
                  img.isHero ? 'bg-[#5c3822] text-white font-bold' : 'bg-[#f5efe6] text-[#7e7365]'
                }`}
              >
                {img.isHero ? 'Hero Cover' : 'Set Cover'}
              </button>
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* 5. Amenities */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <h2 className="font-display font-medium text-lg text-[#1F1B16]">
          5. Amenities & Features
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. Basement Home Theater, Swimming Pool, Solar Ready"
            value={amenityInput}
            onChange={(e) => setAmenityInput(e.target.value)}
            className="flex-1 bg-white text-xs border border-[#d8cebe] rounded-full px-4 py-2 outline-none focus:border-[#5c3822]"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addAmenity();
              }
            }}
          />
          <Button type="button" variant="secondary" size="sm" onClick={addAmenity}>
            Add Tag
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {amenities.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-full bg-white border border-[#d8cebe] text-xs flex items-center gap-1.5 shadow-sm"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeAmenity(item)}
                className="text-red-500 hover:text-red-700 text-xs font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </GlassCard>

      {/* Submit Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#d8cebe]/60">
        <Link href="/admin/properties">
          <Button type="button" variant="ghost" size="md">
            Cancel
          </Button>
        </Link>
        <Button type="submit" variant="primary" size="lg" isLoading={loading}>
          <span>{isEdit ? 'Save Changes' : 'Publish Property'}</span>
        </Button>
      </div>
    </form>
  );
}

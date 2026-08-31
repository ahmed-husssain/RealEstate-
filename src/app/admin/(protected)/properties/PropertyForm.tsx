'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/ui/GlassCard';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { PropertyStatus, PropertyType, AreaUnit, PropertyCondition } from '@prisma/client';
import { createPropertyAction, updatePropertyAction } from '@/lib/actions/admin-properties';
import { PropertyGalleryUploader, GalleryImageItem } from './PropertyGalleryUploader';
import { ArrowLeft, AlertCircle, CheckCircle2, Plus, Sparkles, X } from 'lucide-react';
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

const COMMON_AMENITIES_BY_TYPE: Record<string, string[]> = {
  RESIDENTIAL: [
    'West Open',
    'Corner Plot',
    'Park Facing',
    'Dual Acrylic Kitchens',
    'Solar Net-Metering Setup',
    'Standby Generator Backup',
    'Underground RCC Water Tank',
    'Imported Porcelain Tiles',
    'Private Guard Room',
    'Lift / Elevator Installed',
    'CCTV Security Surveillance',
  ],
  PLOT: [
    'West Open',
    'Corner Plot',
    'Park Facing',
    'Main Boulevard Access',
    'Boundary Wall Done',
    'Leased / Clear Documentation',
    'Utilities Available (Water, Gas, Electricity)',
    'Immediate Construction Allowed',
  ],
  COMMERCIAL: [
    'Main Boulevard Facing',
    'Dedicated High-Speed Elevator',
    'Underground Reserved Car Parking',
    'Fire Safety & Hydrant System',
    'Standby Commercial Generator',
    'High Visibility Footfall Zone',
  ],
};

export function PropertyForm({ initialData, areas, isEdit = false }: PropertyFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [tagline, setTagline] = useState(initialData?.tagline || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState<number | string>(
    initialData ? Number(initialData.price) : 50000000
  );
  const [priceFormatted, setPriceFormatted] = useState(initialData?.priceFormatted || '');
  const [status, setStatus] = useState<PropertyStatus>(initialData?.status || PropertyStatus.FOR_SALE);
  const [propertyType, setPropertyType] = useState<PropertyType>(
    initialData?.propertyType || PropertyType.HOUSE
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.isFeatured || false);

  const [bedrooms, setBedrooms] = useState<number | string>(initialData?.bedrooms ?? (propertyType === PropertyType.PLOT ? '' : 4));
  const [bathrooms, setBathrooms] = useState<number | string>(initialData?.bathrooms ?? (propertyType === PropertyType.PLOT ? '' : 4));
  const [areaSize, setAreaSize] = useState<number | string>(initialData ? Number(initialData.areaSize) : 240);
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(initialData?.areaUnit || AreaUnit.SQYD);
  const [yearBuilt, setYearBuilt] = useState<number | string>(initialData?.yearBuilt ?? (propertyType === PropertyType.PLOT ? '' : 2024));
  const [parkingSpaces, setParkingSpaces] = useState<number | string>(initialData?.parkingSpaces ?? (propertyType === PropertyType.PLOT ? '' : 2));
  const [condition, setCondition] = useState<PropertyCondition>(initialData?.condition || PropertyCondition.GOOD);

  const [address, setAddress] = useState(initialData?.address || '');
  const [areaId, setAreaId] = useState(initialData?.areaId || (areas[0]?.id || ''));

  // Image Gallery Items
  const defaultImages: GalleryImageItem[] =
    initialData?.images?.map((img: any, idx: number) => ({
      id: img.id,
      url: img.url,
      publicId: img.publicId || null,
      alt: img.alt || '',
      isHero: img.isHero ?? idx === 0,
      displayOrder: img.displayOrder ?? idx,
    })) || [];

  const [images, setImages] = useState<GalleryImageItem[]>(defaultImages);

  const [amenityInput, setAmenityInput] = useState('');
  const [amenities, setAmenities] = useState<string[]>(
    initialData?.amenities || [
      'West Open',
      'Solar Net-Metering Setup',
      'Underground RCC Water Tank',
    ]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isPlot = propertyType === PropertyType.PLOT;
  const isCommercial = propertyType === PropertyType.COMMERCIAL;
  const isRental = status === PropertyStatus.FOR_LEASE;

  // Helper to sanitize numeric input and strip accidental leading zeros (e.g. 020000 -> 20000)
  const sanitizeNumberInput = (val: string): string => {
    if (val === '') return '';
    return val.replace(/^0+(?=\d)/, '');
  };

  const addAmenity = (text?: string) => {
    const val = (text || amenityInput).trim();
    if (!val) return;
    if (!amenities.includes(val)) {
      setAmenities([...amenities, val]);
    }
    if (!text) setAmenityInput('');
  };

  const removeAmenity = (item: string) => {
    setAmenities(amenities.filter((a) => a !== item));
  };

  // Get suggested amenity tags based on selected property type
  const getSuggestions = () => {
    if (isPlot) return COMMON_AMENITIES_BY_TYPE.PLOT;
    if (isCommercial) return COMMON_AMENITIES_BY_TYPE.COMMERCIAL;
    return COMMON_AMENITIES_BY_TYPE.RESIDENTIAL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (images.length === 0) {
      setError('Please upload at least one photo for this property listing.');
      return;
    }

    if (images.length > 5) {
      setError('Maximum 5 photos are allowed per property.');
      return;
    }

    if (!areaId) {
      setError('Please select a Karachi Area / Neighborhood.');
      return;
    }

    const numericPrice = Number(price);
    if (!numericPrice || numericPrice <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    const numericAreaSize = Number(areaSize);
    if (!numericAreaSize || numericAreaSize <= 0) {
      setError('Please enter a valid area size greater than 0.');
      return;
    }

    setLoading(true);

    const payload = {
      title,
      tagline: tagline || null,
      description,
      price: numericPrice,
      priceFormatted: priceFormatted || null,
      status,
      isFeatured,
      propertyType,
      bedrooms: isPlot ? 0 : Number(bedrooms) || 0,
      bathrooms: isPlot ? 0 : Number(bathrooms) || 0,
      areaSize: numericAreaSize,
      areaUnit,
      yearBuilt: isPlot ? null : (yearBuilt ? Number(yearBuilt) : null),
      parkingSpaces: isPlot ? 0 : Number(parkingSpaces) || 0,
      condition: isPlot ? PropertyCondition.GOOD : condition,
      address,
      areaId,
      amenities,
      images: images.map((img, idx) => ({
        url: img.url,
        publicId: img.publicId || null,
        alt: img.alt || title,
        isHero: img.isHero,
        displayOrder: idx,
      })),
    };

    try {
      let res;
      if (isEdit) {
        res = await updatePropertyAction(initialData.id, payload);
      } else {
        res = await createPropertyAction(payload);
      }

      if (res.success) {
        setSuccessMsg(isEdit ? 'Property updated successfully!' : 'Property published successfully!');
        setTimeout(() => {
          router.push('/admin/properties');
          router.refresh();
        }, 1200);
      } else {
        setError(res.error || 'Failed to save property listing.');
      }
    } catch (err: any) {
      setError(err?.message || 'A network error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/properties"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7e7365] hover:text-[#1F1B16] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/admin/properties">
            <Button type="button" variant="ghost" size="sm">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" size="md" isLoading={loading}>
            <span>{isEdit ? 'Save Changes' : 'Publish Property'}</span>
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1. Basic Information */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <h2 className="font-display font-medium text-lg text-[#1F1B16]">
          1. Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Listing Title"
            placeholder={
              isPlot
                ? 'e.g. 500 Sq Yd West Open Residential Plot in Block B'
                : 'e.g. 500 Sq Yd Modern Minimalist Villa'
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Input
            label="Catchy Tagline / Subtitle"
            placeholder={
              isPlot
                ? 'e.g. 100% Leased and Ready for Immediate Construction'
                : 'e.g. Brand New Architect-Designed Residence in North Nazimabad'
            }
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />

          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Detailed Property Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide complete details regarding the location, boundaries, access roads, fixtures, and lifestyle features..."
              className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-2xl p-3 text-xs outline-none focus:border-[#5c3822]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
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
              <option value={PropertyStatus.FOR_LEASE}>For Rent (Lease)</option>
              <option value={PropertyStatus.EXCLUSIVE}>Exclusive</option>
              <option value={PropertyStatus.UNDER_OFFER}>Under Offer</option>
              <option value={PropertyStatus.SOLD}>Sold</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Property Category
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value as PropertyType)}
              className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none"
            >
              <option value={PropertyType.HOUSE}>House / Bungalow</option>
              <option value={PropertyType.APARTMENT}>Apartment / Flat</option>
              <option value={PropertyType.PORTION}>Floor Portion</option>
              <option value={PropertyType.PLOT}>Residential Plot (Land)</option>
              <option value={PropertyType.COMMERCIAL}>Commercial Property</option>
              <option value={PropertyType.VILLA}>Luxury Villa</option>
              <option value={PropertyType.PENTHOUSE}>Penthouse</option>
              <option value={PropertyType.TOWNHOUSE}>Townhouse</option>
            </select>
          </div>

          <div className="flex items-center pt-6 gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-[#d8cebe] text-[#5c3822] focus:ring-[#5c3822]"
            />
            <label htmlFor="isFeatured" className="text-xs font-medium text-[#1F1B16] cursor-pointer">
              Feature on Homepage Showcase
            </label>
          </div>
        </div>
      </GlassCard>

      {/* 2. Location & Pricing (Context-Aware for Rent vs Sale) */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <h2 className="font-display font-medium text-lg text-[#1F1B16]">
          2. Price & Karachi Location
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={isRental ? 'Monthly Rental Demand (PKR)' : 'Price / Demand (PKR exact number)'}
            type="number"
            placeholder={
              isRental
                ? 'e.g. 150000 for 1.5 Lakh / Month'
                : 'e.g. 145000000 for 14.50 Crore'
            }
            value={price}
            onChange={(e) => setPrice(sanitizeNumberInput(e.target.value))}
            required
          />

          <Input
            label={isRental ? 'Custom Rental Display (Optional)' : 'Custom Display Price (Optional)'}
            placeholder={
              isRental
                ? 'e.g. PKR 1.50 Lakh / Month'
                : 'e.g. PKR 14.50 Crore / PKR 85 Lakh'
            }
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

      {/* 3. Dimensions & Specifications (Adaptive by Property Type) */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-medium text-lg text-[#1F1B16]">
            3. Dimensions & Specifications
          </h2>
          {isPlot && (
            <span className="text-[11px] font-mono text-[#5c3822] bg-[#5c3822]/10 px-2.5 py-1 rounded-full">
              Plot Mode: Architectural rooms hidden
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Land / Covered Area Size"
            type="number"
            placeholder="e.g. 240 or 500"
            value={areaSize}
            onChange={(e) => setAreaSize(sanitizeNumberInput(e.target.value))}
            required
          />

          <div>
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Measurement Unit
            </label>
            <select
              value={areaUnit}
              onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
              className="w-full bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none"
            >
              <option value={AreaUnit.SQYD}>Square Yards (Gaz)</option>
              <option value={AreaUnit.SQFT}>Square Feet (Sq Ft)</option>
              <option value={AreaUnit.MARLA}>Marla</option>
              <option value={AreaUnit.KANAL}>Kanal</option>
            </select>
          </div>
        </div>

        {/* Show Residential / Architectural Specs only when not a Plot */}
        {!isPlot && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-[#d8cebe]/60">
            {!isCommercial && (
              <Input
                label="Bedrooms"
                type="number"
                placeholder="e.g. 4"
                value={bedrooms}
                onChange={(e) => setBedrooms(sanitizeNumberInput(e.target.value))}
              />
            )}

            <Input
              label={isCommercial ? 'Washrooms' : 'Bathrooms'}
              type="number"
              placeholder="e.g. 4"
              value={bathrooms}
              onChange={(e) => setBathrooms(sanitizeNumberInput(e.target.value))}
            />

            <Input
              label="Car Parking"
              type="number"
              placeholder="e.g. 2"
              value={parkingSpaces}
              onChange={(e) => setParkingSpaces(sanitizeNumberInput(e.target.value))}
            />

            <Input
              label="Built Year"
              type="number"
              placeholder="e.g. 2024"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(sanitizeNumberInput(e.target.value))}
            />
          </div>
        )}

        {!isPlot && (
          <div className="pt-2">
            <label className="block text-xs font-mono font-medium text-[#7e7365] mb-1">
              Construction Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as PropertyCondition)}
              className="w-full sm:w-1/2 bg-white text-[#1F1B16] border border-[#d8cebe] rounded-full px-3.5 py-2 text-xs outline-none"
            >
              <option value={PropertyCondition.BRAND_NEW}>Brand New</option>
              <option value={PropertyCondition.EXCELLENT}>Excellent</option>
              <option value={PropertyCondition.GOOD}>Good</option>
              <option value={PropertyCondition.UNDER_CONSTRUCTION}>Under Construction</option>
              <option value={PropertyCondition.NEEDS_RENOVATION}>Needs Renovation</option>
            </select>
          </div>
        )}
      </GlassCard>

      {/* 4. Photo Gallery (Cloudinary Uploader with 5-Image Limit) */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <PropertyGalleryUploader
          images={images}
          onChange={setImages}
          maxImages={5}
        />
      </GlassCard>

      {/* 5. Features & Amenities with 1-Click Suggestions */}
      <GlassCard variant="container" rounded="2rem" className="p-6 space-y-4 bg-[#fbf6f0]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              5. Features & Amenities
            </h2>
            <p className="text-xs text-[#7e7365]">
              Add custom tags or click suggested pills below.
            </p>
          </div>
        </div>

        {/* Custom Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type custom amenity (e.g. Servant Quarter, Net Metering)..."
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
          <Button type="button" variant="secondary" size="sm" onClick={() => addAmenity()}>
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tag</span>
          </Button>
        </div>

        {/* 1-Click Quick Suggestions */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-mono text-[#7e7365] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#5c3822]" />
            <span>Quick Suggestions for {propertyType.replace(/_/g, ' ')}:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {getSuggestions().map((sug, i) => {
              const alreadyAdded = amenities.includes(sug);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => !alreadyAdded && addAmenity(sug)}
                  disabled={alreadyAdded}
                  className={`text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    alreadyAdded
                      ? 'bg-[#5c3822]/15 border-[#5c3822] text-[#5c3822] font-semibold opacity-60 cursor-default'
                      : 'bg-white border-[#d8cebe] text-[#1F1B16] hover:border-[#5c3822] hover:bg-[#f5efe6]'
                  }`}
                >
                  + {sug}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Selected Tags */}
        {amenities.length > 0 && (
          <div className="pt-2 border-t border-[#d8cebe]/60">
            <p className="text-[11px] font-mono text-[#7e7365] mb-2">
              Active Tags on Listing ({amenities.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#d8cebe] text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(item)}
                    className="text-red-500 hover:text-red-700 text-xs font-bold ml-1 cursor-pointer"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
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

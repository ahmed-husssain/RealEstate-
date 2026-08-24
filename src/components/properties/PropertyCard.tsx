'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types';
import { Badge } from '@/ui/Badge';
import { GlassCard } from '@/ui/GlassCard';
import { Bed, Bath, Maximize2, MapPin, Heart, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export interface PropertyCardProps {
  property: Property;
  priority?: boolean;
}

export function PropertyCard({ property, priority = false }: PropertyCardProps) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const images = [property.images.hero, ...property.images.gallery.slice(0, 3)];

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('amber_saved_properties') || '[]');
      setIsSaved(saved.includes(property.id));
    } catch (e) {
      setIsSaved(false);
    }
  }, [property.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved: string[] = JSON.parse(localStorage.getItem('amber_saved_properties') || '[]');
      let updated: string[];
      if (saved.includes(property.id)) {
        updated = saved.filter((id) => id !== property.id);
        setIsSaved(false);
      } else {
        updated = [...saved, property.id];
        setIsSaved(true);
      }
      localStorage.setItem('amber_saved_properties', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.error(e);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <GlassCard
      variant="interactive"
      rounded="1.75rem"
      className="group flex flex-col h-full bg-[#fbf6f0]/95"
    >
      {/* Image Media Container */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#e5decb]">
        <Image
          src={images[currentImageIdx]}
          alt={property.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Gradient vignette on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/50 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            {property.status === 'exclusive' ? (
              <Badge variant="exclusive" size="sm">Exclusive</Badge>
            ) : property.status === 'for-lease' ? (
              <Badge variant="moss" size="sm">For Lease</Badge>
            ) : (
              <Badge variant="default" size="sm">For Sale</Badge>
            )}
            {property.isFeatured && (
              <Badge variant="stone" size="sm">Featured</Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={toggleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save property'}
            className="w-8 h-8 rounded-full bg-[#fbf6f0]/90 backdrop-blur-md border border-[#d8cebe] flex items-center justify-center text-[#1F1B16] hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? 'fill-[#5c3822] text-[#5c3822]' : 'text-[#1F1B16]'
              }`}
            />
          </button>
        </div>

        {/* Image Navigation Arrows (Hover) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <button
              onClick={prevImage}
              aria-label="Previous photo"
              className="w-7 h-7 rounded-full bg-[#fbf6f0]/80 backdrop-blur-md border border-[#d8cebe] flex items-center justify-center text-[#1F1B16] hover:bg-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next photo"
              className="w-7 h-7 rounded-full bg-[#fbf6f0]/80 backdrop-blur-md border border-[#d8cebe] flex items-center justify-center text-[#1F1B16] hover:bg-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImageIdx ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <Link href={`/properties/${property.slug}`} className="flex-1 flex flex-col p-5 sm:p-6 cursor-pointer">
        {/* Location & Tagline */}
        <div className="flex items-center gap-1 text-xs text-[#7e7365] font-sans mb-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#5c3822] shrink-0" />
          <span className="truncate">{property.location.neighborhood}, {property.location.city}</span>
        </div>

        {/* Title */}
        <h3 className="font-display font-medium text-lg sm:text-xl text-[#1F1B16] group-hover:text-[#5c3822] transition-colors leading-tight mb-2">
          {property.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-4">
          <span className="font-display font-medium text-xl sm:text-2xl text-[#1F1B16] tracking-tight">
            {property.priceFormatted}
          </span>
          {property.priceSuffix && (
            <span className="font-mono text-xs text-[#7e7365]">
              {property.priceSuffix}
            </span>
          )}
        </div>

        {/* Architectural Specs Row */}
        <div className="mt-auto pt-4 border-t border-[#d8cebe]/60 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="flex flex-col items-center justify-center py-1 bg-[#f5efe6]/60 rounded-xl border border-[#d8cebe]/40">
            <span className="font-mono font-semibold text-[#1F1B16] text-xs sm:text-sm">
              {property.specs.bedrooms}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-[#7e7365]">
              Beds
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-1 bg-[#f5efe6]/60 rounded-xl border border-[#d8cebe]/40">
            <span className="font-mono font-semibold text-[#1F1B16] text-xs sm:text-sm">
              {property.specs.bathrooms}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-[#7e7365]">
              Baths
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-1 bg-[#f5efe6]/60 rounded-xl border border-[#d8cebe]/40">
            <span className="font-mono font-semibold text-[#1F1B16] text-xs sm:text-sm">
              {formatNumber(property.specs.areaSqFt)}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-[#7e7365]">
              Sq Ft
            </span>
          </div>
        </div>

        {/* View Details Link */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#5c3822] group-hover:translate-x-0.5 transition-transform">
          <span>Explore Residence</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </GlassCard>
  );
}

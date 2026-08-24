'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '@/ui/Modal';
import { Badge } from '@/ui/Badge';
import { Expand, ChevronLeft, ChevronRight, Grid } from 'lucide-react';

export interface PropertyGalleryProps {
  images: {
    hero: string;
    gallery: string[];
  };
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const allImages = [images.hero, ...images.gallery];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="relative space-y-3">
      {/* Media Grid: 1 large hero + 2 smaller thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-[2rem] overflow-hidden border border-[#d8cebe] shadow-stratified p-2 bg-[#fbf6f0]">
        {/* Main Hero Photo */}
        <div
          onClick={() => openLightbox(0)}
          className="relative md:col-span-2 aspect-[16/10] overflow-hidden rounded-[1.5rem] cursor-pointer group bg-[#e5decb]"
        >
          <Image
            src={allImages[0]}
            alt={`${title} - Main View`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1B16]/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
          <button className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-[#fbf6f0]/90 backdrop-blur-md border border-[#d8cebe] text-xs font-mono font-medium text-[#1F1B16] flex items-center gap-1.5 shadow-sm group-hover:bg-white transition-all">
            <Expand className="w-3.5 h-3.5 text-[#5c3822]" />
            <span>Expand Photo</span>
          </button>
        </div>

        {/* Side Thumbnails */}
        <div className="hidden md:grid grid-rows-2 gap-3">
          {allImages.slice(1, 3).map((img, i) => (
            <div
              key={i}
              onClick={() => openLightbox(i + 1)}
              className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] cursor-pointer group bg-[#e5decb]"
            >
              <Image
                src={img}
                alt={`${title} - Detail ${i + 1}`}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1F1B16]/20 group-hover:bg-transparent transition-colors" />
              {i === 1 && allImages.length > 3 && (
                <div className="absolute inset-0 bg-[#1F1B16]/60 backdrop-blur-[2px] flex items-center justify-center text-center p-4">
                  <div className="text-[#F8F4ED] space-y-1">
                    <Grid className="w-5 h-5 mx-auto" />
                    <p className="font-mono text-xs font-semibold tracking-wider">
                      +{allImages.length - 3} More Photos
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="2xl"
        title={title}
        subtitle={`Photo ${activeIndex + 1} of ${allImages.length}`}
      >
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black/80">
          <Image
            src={allImages[activeIndex]}
            alt={`${title} - Expanded Photo ${activeIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-contain"
          />

          {/* Navigation Controls */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fbf6f0]/90 backdrop-blur-md border border-[#d8cebe] flex items-center justify-center text-[#1F1B16] hover:bg-white transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % allImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#fbf6f0]/90 backdrop-blur-md border border-[#d8cebe] flex items-center justify-center text-[#1F1B16] hover:bg-white transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Ribbon */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2">
          {allImages.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'border-[#5c3822] shadow-md scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image src={thumb} alt="thumbnail" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </Modal>
    </section>
  );
}

'use client';

import React, { useState, useRef } from 'react';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  UploadCloud,
  X,
  Star,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import {
  uploadPropertyImageDirectAction,
  deleteUploadedImageDirectAction,
} from '@/lib/actions/admin-properties';

export interface GalleryImageItem {
  id?: string;
  url: string;
  publicId?: string | null;
  alt?: string | null;
  isHero: boolean;
  displayOrder: number;
}

interface PropertyGalleryUploaderProps {
  images: GalleryImageItem[];
  onChange: (images: GalleryImageItem[]) => void;
  maxImages?: number;
}

export function PropertyGalleryUploader({
  images,
  onChange,
  maxImages = 5,
}: PropertyGalleryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canUploadMore = images.length < maxImages;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);

    const availableSlots = maxImages - images.length;
    if (availableSlots <= 0) {
      setError(`Maximum ${maxImages} images are allowed for this property listing.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, availableSlots);
    if (files.length > availableSlots) {
      setError(
        `Only ${availableSlots} more photo${
          availableSlots > 1 ? 's' : ''
        } can be added (Maximum ${maxImages} total).`
      );
    }

    setUploading(true);

    const newUploadedItems: GalleryImageItem[] = [...images];

    try {
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];

        // Client-side quick size validation
        if (file.size > 10 * 1024 * 1024) {
          setError(`File "${file.name}" exceeds the 10 MB limit.`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const res = await uploadPropertyImageDirectAction(formData);

        if (res.success && res.data) {
          const isFirstImage = newUploadedItems.length === 0;
          newUploadedItems.push({
            url: res.data.url,
            publicId: res.data.publicId,
            alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            isHero: isFirstImage,
            displayOrder: newUploadedItems.length,
          });
        } else {
          setError(res.error || `Failed to upload "${file.name}".`);
        }
      }

      onChange(newUploadedItems);
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during image upload.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!canUploadMore || uploading) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = async (index: number) => {
    const itemToDelete = images[index];
    const updated = images.filter((_, idx) => idx !== index);

    // If we deleted the hero image, assign hero status to the first remaining image
    if (itemToDelete.isHero && updated.length > 0) {
      updated[0].isHero = true;
    }

    // Re-index display orders
    const reordered = updated.map((img, idx) => ({
      ...img,
      displayOrder: idx,
    }));

    onChange(reordered);

    // Background cleanup from Cloudinary
    if (itemToDelete.publicId) {
      deleteUploadedImageDirectAction(itemToDelete.publicId).catch((err) =>
        console.error('Failed to cleanup deleted image from Cloudinary:', err)
      );
    }
  };

  const handleSetHero = (index: number) => {
    const updated = images.map((img, idx) => ({
      ...img,
      isHero: idx === index,
    }));
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const newArr = [...images];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;

    // Update display orders
    const reordered = newArr.map((img, idx) => ({
      ...img,
      displayOrder: idx,
    }));

    onChange(reordered);
  };

  const handleAltChange = (index: number, alt: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], alt };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Header & Counter */}
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-mono font-medium text-[#7e7365]">
            Property Image Gallery
          </label>
          <p className="text-[11px] text-[#7e7365]">
            Upload high-resolution photos (Max {maxImages} photos, JPG/PNG/WebP up to 10 MB each).
          </p>
        </div>
        <Badge
          variant={images.length === maxImages ? 'moss' : 'stone'}
          size="sm"
          className="font-mono text-xs"
        >
          {images.length} / {maxImages} Photos
        </Badge>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      {canUploadMore && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
            isDragOver
              ? 'border-[#5c3822] bg-[#5c3822]/5 scale-[1.01]'
              : 'border-[#d8cebe] hover:border-[#5c3822] bg-white/60 hover:bg-white'
          } ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading || !canUploadMore}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-2">
              <Loader2 className="w-7 h-7 text-[#5c3822] animate-spin" />
              <p className="text-xs font-semibold text-[#1F1B16]">
                Uploading & Optimizing to Cloudinary...
              </p>
              <p className="text-[11px] text-[#7e7365]">
                Converting format and generating CDN URLs
              </p>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1F1B16]">
                  Click to select photos or drag & drop files here
                </p>
                <p className="text-[11px] text-[#7e7365] pt-0.5">
                  Remaining slots: <span className="font-semibold text-[#5c3822]">{maxImages - images.length}</span>
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Uploaded Gallery Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
          {images.map((img, idx) => (
            <GlassCard
              key={img.publicId || img.url || idx}
              variant="card"
              rounded="1.75rem"
              className="p-3 bg-white border border-[#d8cebe] shadow-sm relative space-y-2.5 group overflow-hidden"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#e5decb]">
                <img
                  src={img.url}
                  alt={img.alt || `Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Hero Badge */}
                {img.isHero ? (
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-[#5c3822] text-[#F8F4ED] text-[10px] font-mono font-semibold shadow-md">
                    <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>HERO COVER</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetHero(idx)}
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 hover:bg-[#5c3822] text-white text-[10px] font-mono shadow-md cursor-pointer"
                  >
                    <Star className="w-3 h-3" />
                    <span>Set as Hero</span>
                  </button>
                )}

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(idx)}
                  aria-label="Remove photo"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Order Index Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[10px]">
                  #{idx + 1}
                </div>
              </div>

              {/* Card Controls & Alt Input */}
              <div className="space-y-1.5">
                <input
                  type="text"
                  placeholder="Photo description / alt tag..."
                  value={img.alt || ''}
                  onChange={(e) => handleAltChange(idx, e.target.value)}
                  className="w-full bg-[#fbf6f0] border border-[#d8cebe] rounded-lg px-2.5 py-1 text-xs outline-none focus:border-[#5c3822] text-[#1F1B16]"
                />

                {/* Reorder Buttons */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'left')}
                      className="p-1 rounded border border-[#d8cebe] text-[#7e7365] hover:text-[#1F1B16] disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move left"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMove(idx, 'right')}
                      className="p-1 rounded border border-[#d8cebe] text-[#7e7365] hover:text-[#1F1B16] disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Move right"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {!img.isHero && (
                    <button
                      type="button"
                      onClick={() => handleSetHero(idx)}
                      className="text-[11px] text-[#5c3822] hover:underline font-medium cursor-pointer"
                    >
                      Make Primary
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

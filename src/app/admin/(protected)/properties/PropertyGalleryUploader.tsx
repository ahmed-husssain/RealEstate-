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
  GripVertical,
  CheckCircle2,
  Sparkles,
  Info,
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

interface UploadProgressState {
  total: number;
  current: number;
  currentFileName: string;
  progressPct: number;
}

interface UploadFailureItem {
  fileName: string;
  error: string;
}

export function PropertyGalleryUploader({
  images,
  onChange,
  maxImages = 5,
}: PropertyGalleryUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgressState | null>(null);
  const [uploadFailures, setUploadFailures] = useState<UploadFailureItem[]>([]);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isDragOverZone, setIsDragOverZone] = useState(false);

  // Drag & drop reorder state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const canUploadMore = images.length < maxImages;
  const isUploading = uploadProgress !== null;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setGeneralError(null);
    setUploadFailures([]);

    const availableSlots = maxImages - images.length;
    if (availableSlots <= 0) {
      setGeneralError(`Maximum ${maxImages} images are allowed for this property listing.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, availableSlots);
    if (files.length > availableSlots) {
      setGeneralError(
        `Only ${availableSlots} more photo${
          availableSlots > 1 ? 's' : ''
        } could be processed (Limit is ${maxImages} photos total).`
      );
    }

    const newUploadedItems: GalleryImageItem[] = [...images];
    const failures: UploadFailureItem[] = [];

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      const progressPercent = Math.round(((i) / filesToUpload.length) * 100);

      setUploadProgress({
        total: filesToUpload.length,
        current: i + 1,
        currentFileName: file.name,
        progressPct: progressPercent,
      });

      // Client-side quick size validation
      if (file.size > 10 * 1024 * 1024) {
        failures.push({
          fileName: file.name,
          error: `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the 10 MB maximum.`,
        });
        continue;
      }

      // Check allowed image extensions
      const lowerName = file.name.toLowerCase();
      if (
        !lowerName.endsWith('.jpg') &&
        !lowerName.endsWith('.jpeg') &&
        !lowerName.endsWith('.png') &&
        !lowerName.endsWith('.webp')
      ) {
        failures.push({
          fileName: file.name,
          error: 'Unsupported image type. Only JPG, PNG, and WebP are allowed.',
        });
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await uploadPropertyImageDirectAction(formData);

        if (res.success && res.data) {
          const isFirstEverImage = newUploadedItems.length === 0;
          newUploadedItems.push({
            url: res.data.url,
            publicId: res.data.publicId,
            alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            isHero: isFirstEverImage,
            displayOrder: newUploadedItems.length,
          });
        } else {
          failures.push({
            fileName: file.name,
            error: res.error || 'Server rejected the image file.',
          });
        }
      } catch (err: any) {
        failures.push({
          fileName: file.name,
          error: err?.message || 'Network communication error.',
        });
      }
    }

    setUploadProgress(null);
    setUploadFailures(failures);
    onChange(newUploadedItems);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleZoneDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverZone(false);
    if (!canUploadMore || isUploading) return;
    handleFiles(e.dataTransfer.files);
  };

  // Reordering: HTML5 Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOverCard = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDropOnCard = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...images];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    const reordered = updated.map((img, idx) => ({
      ...img,
      displayOrder: idx,
    }));

    onChange(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Actions
  const handleDelete = async (index: number) => {
    const itemToDelete = images[index];
    const updated = images.filter((_, idx) => idx !== index);

    // If we deleted the hero image, designate the first remaining image as Hero
    if (itemToDelete.isHero && updated.length > 0) {
      updated[0].isHero = true;
    }

    const reordered = updated.map((img, idx) => ({
      ...img,
      displayOrder: idx,
    }));

    onChange(reordered);

    // Asynchronous Cloudinary asset purge
    if (itemToDelete.publicId) {
      deleteUploadedImageDirectAction(itemToDelete.publicId).catch((err) =>
        console.error('Background Cloudinary purge error:', err)
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
      {/* Gallery Header & Quota */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d8cebe]/60 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <label className="block text-sm font-display font-medium text-[#1F1B16]">
              4. Property Photo Gallery
            </label>
            <Badge
              variant={images.length === maxImages ? 'moss' : 'stone'}
              size="sm"
              className="font-mono text-[11px]"
            >
              {images.length} / {maxImages} Photos
            </Badge>
          </div>
          <p className="text-xs text-[#7e7365] pt-0.5">
            Upload up to {maxImages} high-resolution photos. Drag cards to reorder. The first or starred photo will serve as the Hero listing thumbnail.
          </p>
        </div>

        {images.length > 0 && (
          <p className="text-[11px] font-mono text-[#5c3822] bg-[#5c3822]/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 self-start sm:self-auto">
            <Sparkles className="w-3 h-3 text-[#5c3822]" />
            <span>Drag cards to reorder</span>
          </p>
        )}
      </div>

      {/* General Error Notice */}
      {generalError && (
        <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Upload Failures Itemized Alert */}
      {uploadFailures.length > 0 && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span>Some files failed to upload ({uploadFailures.length}):</span>
            </div>
            <button
              type="button"
              onClick={() => setUploadFailures([])}
              className="text-[11px] text-red-700 hover:underline font-mono"
            >
              Dismiss
            </button>
          </div>
          <ul className="space-y-1 pl-6 list-disc text-[11px] text-red-700">
            {uploadFailures.map((f, i) => (
              <li key={i}>
                <span className="font-medium text-red-900">{f.fileName}:</span> {f.error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Active Upload Progress Bar */}
      {uploadProgress && (
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-[#d8cebe] space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#5c3822] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-[#5c3822]" />
              <span>
                Uploading photo {uploadProgress.current} of {uploadProgress.total}...
              </span>
            </div>
            <span className="font-mono text-[#7e7365] text-[11px]">
              {uploadProgress.currentFileName}
            </span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-[#d8cebe]/40 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#5c3822] h-full transition-all duration-300 rounded-full"
              style={{
                width: `${Math.max(10, Math.round((uploadProgress.current / uploadProgress.total) * 100))}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      {canUploadMore && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOverZone(true);
          }}
          onDragLeave={() => setIsDragOverZone(false)}
          onDrop={handleZoneDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-7 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2.5 ${
            isDragOverZone
              ? 'border-[#5c3822] bg-[#5c3822]/5 scale-[1.01]'
              : 'border-[#d8cebe] hover:border-[#5c3822] bg-white/70 hover:bg-white shadow-inner'
          } ${isUploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            disabled={isUploading || !canUploadMore}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="w-12 h-12 rounded-full bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center shadow-sm">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm font-semibold text-[#1F1B16]">
              Click to select property photos or drag & drop files here
            </p>
            <p className="text-[11px] text-[#7e7365]">
              Supports JPG, PNG, and WebP (Max 10 MB per file) &bull;{' '}
              <span className="font-semibold text-[#5c3822]">
                {maxImages - images.length} remaining slot{maxImages - images.length > 1 ? 's' : ''}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && !isUploading && (
        <div className="p-8 text-center border border-dashed border-[#d8cebe] rounded-3xl bg-[#fbf6f0]">
          <Info className="w-8 h-8 text-[#7e7365]/60 mx-auto mb-2" />
          <p className="text-xs font-medium text-[#1F1B16]">No property photos added yet</p>
          <p className="text-[11px] text-[#7e7365] pt-0.5">
            Upload at least 1 photo to publish this property listing.
          </p>
        </div>
      )}

      {/* Uploaded Gallery Grid (Cards with Drag & Drop, Hero, Alt, Reorder) */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {images.map((img, idx) => {
            const isBeingDragged = draggedIndex === idx;
            const isDropTarget = dragOverIndex === idx && draggedIndex !== idx;

            return (
              <div
                key={img.publicId || img.url || idx}
                draggable={!isUploading}
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOverCard(e, idx)}
                onDrop={(e) => handleDropOnCard(e, idx)}
                onDragEnd={handleDragEnd}
                className={`transition-all duration-200 rounded-[1.75rem] ${
                  isBeingDragged ? 'opacity-40 scale-95' : 'opacity-100'
                } ${
                  isDropTarget
                    ? 'ring-2 ring-[#5c3822] ring-offset-2 scale-[1.02]'
                    : ''
                }`}
              >
                <GlassCard
                  variant="card"
                  rounded="1.75rem"
                  className={`p-3.5 bg-white border shadow-sm relative space-y-3 group overflow-hidden transition-all ${
                    img.isHero
                      ? 'border-[#5c3822] shadow-md ring-1 ring-[#5c3822]/20'
                      : 'border-[#d8cebe]'
                  }`}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e5decb] cursor-grab active:cursor-grabbing select-none">
                    <img
                      src={img.url}
                      alt={img.alt || `Property photo ${idx + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Drag Handle Indicator */}
                    <div className="absolute top-2.5 left-2.5 p-1 rounded-md bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none">
                      <GripVertical className="w-3.5 h-3.5" />
                    </div>

                    {/* Hero Badge or Make Hero Button */}
                    {img.isHero ? (
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5c3822] text-[#F8F4ED] text-[10px] font-mono font-semibold shadow-lg backdrop-blur-md">
                        <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                        <span>HERO COVER</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetHero(idx)}
                        className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 hover:bg-[#5c3822] text-white text-[10px] font-mono shadow-md cursor-pointer backdrop-blur-sm"
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
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Order Index Badge */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white font-mono text-[10px] backdrop-blur-sm">
                      #{idx + 1}
                    </div>
                  </div>

                  {/* Alt Text Input (SEO & Accessibility) */}
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-[#7e7365] font-medium">
                      Alt Text / Photo Description
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Master Bedroom with ensuite bath..."
                      value={img.alt || ''}
                      onChange={(e) => handleAltChange(idx, e.target.value)}
                      className="w-full bg-[#fbf6f0] border border-[#d8cebe] rounded-xl px-3 py-1.5 text-xs outline-none focus:border-[#5c3822] text-[#1F1B16] transition-colors"
                    />
                  </div>

                  {/* Reorder Arrows & Quick Action Controls */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#d8cebe]/40">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMove(idx, 'left')}
                        className="p-1.5 rounded-lg border border-[#d8cebe] text-[#7e7365] hover:text-[#1F1B16] hover:bg-[#f5efe6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Move photo left"
                        title="Move left"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === images.length - 1}
                        onClick={() => handleMove(idx, 'right')}
                        className="p-1.5 rounded-lg border border-[#d8cebe] text-[#7e7365] hover:text-[#1F1B16] hover:bg-[#f5efe6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        aria-label="Move photo right"
                        title="Move right"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {!img.isHero && (
                      <button
                        type="button"
                        onClick={() => handleSetHero(idx)}
                        className="text-[11px] font-mono text-[#5c3822] hover:text-[#3d2416] hover:underline font-semibold cursor-pointer"
                      >
                        Make Primary
                      </button>
                    )}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

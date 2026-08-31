'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  itemName: string;
  itemType?: string;
  warningMessage?: string;
  isLoading?: boolean;
  error?: string | null;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  itemName,
  itemType = 'item',
  warningMessage = 'This action is permanent and cannot be undone. All linked data and media will be removed.',
  isLoading = false,
  error = null,
}: DeleteConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop covering the ENTIRE viewport */}
      <div
        className="fixed inset-0 bg-[#1F1B16]/75 backdrop-blur-sm transition-opacity"
        onClick={() => !isLoading && onClose()}
      />

      {/* Modal Dialog centered on screen */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-[#fbf6f0] to-[#f5efe6] border border-[#d8cebe] rounded-[2rem] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 p-6 space-y-5">
        {/* Top subtle highlight */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500/0 via-red-500/80 to-red-500/0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#7e7365] hover:text-[#1F1B16] hover:bg-[#d8cebe]/40 transition-colors disabled:opacity-40 cursor-pointer"
          title="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon + Title */}
        <div className="flex items-start gap-3.5 pt-1">
          <div className="w-11 h-11 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0 shadow-sm">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-display font-medium text-[#1F1B16]">
              {title}
            </h3>
            <p className="text-xs font-mono text-[#7e7365] uppercase tracking-wider mt-0.5">
              Permanent Deletion Warning
            </p>
          </div>
        </div>

        {/* Body Text */}
        <div className="space-y-3 text-xs">
          <p className="text-[#1F1B16] leading-relaxed">
            Are you sure you want to permanently delete this {itemType}:
          </p>

          <div className="p-3 rounded-xl bg-white border border-[#d8cebe] text-sm font-semibold text-[#1F1B16] font-display shadow-inner break-words">
            &ldquo;{itemName}&rdquo;
          </div>

          <p className="text-[#7e7365] leading-relaxed">
            {warningMessage}
          </p>

          {/* Error Alert */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 leading-tight flex items-start gap-2">
              <span className="font-bold shrink-0">&bull;</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#d8cebe]/60">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="text-xs text-[#7e7365] hover:text-[#1F1B16]"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
            className="text-xs shadow-md"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isLoading ? 'Deleting...' : `Delete ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`}</span>
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

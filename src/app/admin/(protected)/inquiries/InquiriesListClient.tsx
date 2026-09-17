'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { InquiryStatus } from '@prisma/client';
import { updateInquiryStatusAction, deleteInquiryAction } from '@/lib/actions/admin-inquiries';
import { Phone, Mail, Trash2, Clock, Building, MessageSquare, ChevronDown, Check } from 'lucide-react';

interface InquiryItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: string;
  status: InquiryStatus;
  message: string | null;
  preferredDate: string | null;
  timeSlot: string | null;
  createdAt: Date;
  property: { id: string; title: string; slug: string } | null;
}

const statusConfig: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; dot: string; border: string }
> = {
  NEW: { label: 'NEW', bg: 'bg-rose-50 hover:bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-500', border: 'border-rose-200' },
  CONTACTED: { label: 'CONTACTED', bg: 'bg-amber-50 hover:bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
  IN_PROGRESS: { label: 'IN_PROGRESS', bg: 'bg-sky-50 hover:bg-sky-100', text: 'text-sky-800', dot: 'bg-sky-500', border: 'border-sky-200' },
  CLOSED: { label: 'CLOSED', bg: 'bg-emerald-50 hover:bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500', border: 'border-emerald-200' },
  ARCHIVED: { label: 'ARCHIVED', bg: 'bg-stone-100 hover:bg-stone-200', text: 'text-stone-700', dot: 'bg-stone-500', border: 'border-stone-300' },
};

function StatusBadgeDropdown({
  currentStatus,
  disabled,
  onChange,
}: {
  currentStatus: InquiryStatus;
  disabled?: boolean;
  onChange: (status: InquiryStatus) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const config = statusConfig[currentStatus] || statusConfig.NEW;

  return (
    <div className="relative inline-block text-left shrink-0" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold border transition-all cursor-pointer shadow-2xs select-none ${config.bg} ${config.text} ${config.border} disabled:opacity-50`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        <span>{config.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-1.5 z-50 w-36 bg-white border border-[#d8cebe] rounded-xl shadow-xl p-1 space-y-0.5 focus:outline-none animate-in fade-in-50 zoom-in-95 origin-top-right"
          role="listbox"
        >
          {(['NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED'] as InquiryStatus[]).map((st) => {
            const itemCfg = statusConfig[st];
            const isSelected = currentStatus === st;

            return (
              <button
                key={st}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(st);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-colors text-left cursor-pointer ${
                  isSelected
                    ? `${itemCfg.bg} ${itemCfg.text} font-bold`
                    : 'text-[#1F1B16] hover:bg-[#fbf6f0]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${itemCfg.dot}`} />
                  <span>{st}</span>
                </div>
                {isSelected && <Check className="w-3 h-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function InquiriesListClient({ initialInquiries }: { initialInquiries: InquiryItem[] }) {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = initialInquiries.filter((inq) => {
    if (filterStatus === 'all') return true;
    return inq.status === filterStatus;
  });

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    setLoadingId(id);
    try {
      const res = await updateInquiryStatusAction(id, newStatus);
      if (res.success) {
        router.refresh();
      } else {
        alert(res.error || 'Failed to update status');
      }
    } catch (e: any) {
      alert(e.message || 'Error occurred');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete inquiry record for "${name}"?`)) {
      setLoadingId(id);
      try {
        const res = await deleteInquiryAction(id);
        if (res.success) {
          router.refresh();
        } else {
          alert(res.error || 'Failed to delete');
        }
      } catch (e: any) {
        alert(e.message || 'Error occurred');
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer border whitespace-nowrap shrink-0 ${
              filterStatus === st
                ? 'bg-[#5c3822] text-[#F8F4ED] border-[#5c3822] font-semibold shadow-sm'
                : 'bg-[#fbf6f0] text-[#1F1B16] border-[#d8cebe] hover:bg-white'
            }`}
          >
            {st === 'all' ? `All Leads (${initialInquiries.length})` : st}
          </button>
        ))}
      </div>

      {/* Inquiries Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((inquiry) => {
            const cleanPhone = inquiry.phone.replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Assalam o Alaikum ${inquiry.name},\nThank you for reaching out to Amber Property Corner. How can we assist you today?`
            )}`;

            return (
              <GlassCard
                key={inquiry.id}
                variant="card"
                rounded="1.75rem"
                className="p-5 sm:p-6 bg-[#fbf6f0] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Row: Name, Status & Date */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <h3 className="font-display font-medium text-base text-[#1F1B16]">
                        {inquiry.name}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap text-[11px] text-[#7e7365]">
                        <span className="font-mono">{new Date(inquiry.createdAt).toLocaleString()}</span>
                        <span>•</span>
                        <Badge variant="exclusive" size="sm" className="text-[9px] py-0">
                          {inquiry.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Custom Status Dropdown */}
                    <StatusBadgeDropdown
                      currentStatus={inquiry.status}
                      disabled={loadingId === inquiry.id}
                      onChange={(newStatus) => handleStatusChange(inquiry.id, newStatus)}
                    />
                  </div>

                  {/* Property Link if attached */}
                  {inquiry.property && (
                    <div className="p-2.5 rounded-xl bg-white border border-[#d8cebe] text-xs flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-[#5c3822] shrink-0" />
                      <span className="text-[#1F1B16] font-medium truncate">
                        {inquiry.property.title}
                      </span>
                    </div>
                  )}

                  {/* Preferred Date if visit booking */}
                  {inquiry.preferredDate && (
                    <div className="p-2 rounded-xl bg-[#f5efe6] text-xs font-mono text-[#7e7365] flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#5c3822]" />
                      <span>Requested: {inquiry.preferredDate} ({inquiry.timeSlot || 'Any Time'})</span>
                    </div>
                  )}

                  {/* Message Body */}
                  {inquiry.message && (
                    <p className="text-xs text-[#1F1B16] bg-white/80 p-3 rounded-xl border border-[#d8cebe]/60 leading-relaxed font-sans">
                      {inquiry.message}
                    </p>
                  )}
                </div>

                {/* Contact Actions Footer */}
                <div className="pt-3 border-t border-[#d8cebe]/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="sm" className="text-xs py-1 px-3">
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp Client</span>
                      </Button>
                    </a>
                    <a href={`tel:${inquiry.phone}`}>
                      <Button variant="secondary" size="sm" className="text-xs py-1 px-2.5" title="Call">
                        <Phone className="w-3 h-3" />
                      </Button>
                    </a>
                    <a href={`mailto:${inquiry.email}`}>
                      <Button variant="secondary" size="sm" className="text-xs py-1 px-2.5" title="Email">
                        <Mail className="w-3 h-3" />
                      </Button>
                    </a>
                  </div>

                  <button
                    onClick={() => handleDelete(inquiry.id, inquiry.name)}
                    disabled={loadingId === inquiry.id}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Delete lead record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl text-xs text-[#7e7365]">
          No inquiries found under the selected status filter.
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ValuationStatus } from '@prisma/client';
import { updateValuationStatusAction } from '@/lib/actions/admin-inquiries';
import { Phone, Mail, MapPin, Calculator, MessageSquare, ChevronDown, Check } from 'lucide-react';

interface ValuationItem {
  id: string;
  propertyType: string;
  areaName: string;
  areaSize: number;
  areaUnit: string;
  bedrooms: number;
  bathrooms: number;
  condition: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  estimatedMin: number | null;
  estimatedMax: number | null;
  status: ValuationStatus;
  createdAt: Date;
}

const valuationStatusConfig: Record<
  ValuationStatus,
  { label: string; bg: string; text: string; dot: string; border: string }
> = {
  PENDING: { label: 'PENDING', bg: 'bg-amber-50 hover:bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
  ESTIMATED: { label: 'ESTIMATED', bg: 'bg-blue-50 hover:bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500', border: 'border-blue-200' },
  CONTACTED: { label: 'CONTACTED', bg: 'bg-purple-50 hover:bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500', border: 'border-purple-200' },
  COMPLETED: { label: 'COMPLETED', bg: 'bg-emerald-50 hover:bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500', border: 'border-emerald-200' },
};

function ValuationStatusBadgeDropdown({
  currentStatus,
  disabled,
  onChange,
}: {
  currentStatus: ValuationStatus;
  disabled?: boolean;
  onChange: (status: ValuationStatus) => void;
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

  const config = valuationStatusConfig[currentStatus] || valuationStatusConfig.PENDING;

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
          {(['PENDING', 'ESTIMATED', 'CONTACTED', 'COMPLETED'] as ValuationStatus[]).map((st) => {
            const itemCfg = valuationStatusConfig[st];
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

export function ValuationsListClient({ initialValuations }: { initialValuations: ValuationItem[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: ValuationStatus) => {
    setLoadingId(id);
    try {
      const res = await updateValuationStatusAction(id, status);
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

  return (
    <div className="space-y-6">
      {initialValuations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {initialValuations.map((item) => {
            const cleanPhone = item.ownerPhone.replace(/[^0-9]/g, '');
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Assalam o Alaikum ${item.ownerName},\nRegarding your property valuation request for ${item.areaSize} ${item.areaUnit} in ${item.areaName} with Amber Property Corner.`
            )}`;

            return (
              <GlassCard
                key={item.id}
                variant="card"
                rounded="1.75rem"
                className="p-5 sm:p-6 bg-[#fbf6f0] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display font-medium text-base text-[#1F1B16]">
                        {item.ownerName}
                      </h3>
                      <span className="text-[11px] font-mono text-[#7e7365]">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <ValuationStatusBadgeDropdown
                      currentStatus={item.status}
                      disabled={loadingId === item.id}
                      onChange={(newStatus) => handleStatusChange(item.id, newStatus)}
                    />
                  </div>

                  {/* Location & Specs */}
                  <div className="p-3 bg-white rounded-2xl border border-[#d8cebe] space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-medium text-[#1F1B16]">
                      <MapPin className="w-3.5 h-3.5 text-[#5c3822]" />
                      <span>{item.areaName}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#7e7365] font-mono">
                      <span>{item.propertyType}</span>
                      <span>•</span>
                      <span>{item.areaSize} {item.areaUnit}</span>
                      <span>•</span>
                      <span>{item.bedrooms} Beds / {item.bathrooms} Baths</span>
                      <span>•</span>
                      <span>Condition: {item.condition}</span>
                    </div>
                  </div>

                  {/* Calculated Price Estimate */}
                  {item.estimatedMin && item.estimatedMax && (
                    <div className="p-3 bg-[#5c3822]/10 rounded-2xl border border-[#5c3822]/20 space-y-0.5">
                      <span className="text-[10px] font-mono uppercase text-[#7e7365] block">
                        Estimated Valuation Range
                      </span>
                      <p className="font-display font-medium text-sm text-[#1F1B16]">
                        PKR {(item.estimatedMin / 10000000).toFixed(2)} Crore – PKR {(item.estimatedMax / 10000000).toFixed(2)} Crore
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact Actions */}
                <div className="pt-3 border-t border-[#d8cebe]/60 flex items-center gap-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" size="sm" className="text-xs py-1 px-3">
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp Owner</span>
                    </Button>
                  </a>
                  <a href={`tel:${item.ownerPhone}`}>
                    <Button variant="secondary" size="sm" className="text-xs py-1 px-2.5">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </a>
                  <a href={`mailto:${item.ownerEmail}`}>
                    <Button variant="secondary" size="sm" className="text-xs py-1 px-2.5">
                      <Mail className="w-3 h-3" />
                    </Button>
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl text-xs text-[#7e7365]">
          No valuation requests submitted yet.
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { ValuationStatus } from '@prisma/client';
import { updateValuationStatusAction } from '@/lib/actions/admin-inquiries';
import { Phone, Mail, MapPin, Calculator, MessageSquare } from 'lucide-react';

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

                    <select
                      value={item.status}
                      disabled={loadingId === item.id}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as ValuationStatus)}
                      className="text-[11px] font-mono font-bold rounded-full px-3 py-1 bg-white border border-[#d8cebe] outline-none cursor-pointer"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="ESTIMATED">ESTIMATED</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
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

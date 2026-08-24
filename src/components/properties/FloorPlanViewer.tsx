'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FloorPlan } from '@/types';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Layers, Maximize2 } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export interface FloorPlanViewerProps {
  floorPlans: FloorPlan[];
}

export function FloorPlanViewer({ floorPlans }: FloorPlanViewerProps) {
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);

  if (!floorPlans || floorPlans.length === 0) return null;

  const currentPlan = floorPlans[selectedPlanIdx];

  return (
    <GlassCard variant="card" rounded="2rem" className="p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8cebe]/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5c3822]" />
            <h3 className="font-display font-medium text-xl text-[#1F1B16]">
              Architectural Floor Plans
            </h3>
          </div>
          <p className="text-xs text-[#7e7365] mt-1 font-sans">
            Detailed layout Schematics & Interior Spatial Distribution
          </p>
        </div>

        {/* Level Switcher Chips */}
        <div className="flex flex-wrap gap-2">
          {floorPlans.map((plan, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPlanIdx(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                idx === selectedPlanIdx
                  ? 'bg-[#5c3822] text-[#F8F4ED] shadow-inset-highlight font-semibold'
                  : 'bg-[#f5efe6] text-[#1F1B16] border border-[#d8cebe] hover:bg-white'
              }`}
            >
              {plan.level}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Meta Information */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-sans font-semibold text-sm text-[#1F1B16]">
            {currentPlan.title}
          </h4>
          <span className="text-xs font-mono text-[#7e7365]">
            Spatial Area: {formatNumber(currentPlan.sqFt)} Sq Ft
          </span>
        </div>
        <Badge variant="stone" size="sm">
          Scale 1:100 Architectural
        </Badge>
      </div>

      {/* Floor Plan Visual Representation */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-[#d8cebe] bg-[#f5efe6] flex items-center justify-center group">
        <Image
          src={currentPlan.imageUrl}
          alt={currentPlan.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-[#fbf6f0]/70 backdrop-blur-[2px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-[#fbf6f0] border border-[#d8cebe] rounded-2xl p-6 shadow-stratified space-y-2">
            <Layers className="w-8 h-8 mx-auto text-[#5c3822]" />
            <h5 className="font-display font-medium text-base text-[#1F1B16]">
              {currentPlan.level} — {currentPlan.title}
            </h5>
            <p className="text-xs text-[#7e7365] leading-relaxed">
              Full CAD vector floor plans, ceiling elevations, and engineering drawings available via private client portal.
            </p>
            <div className="pt-2">
              <Badge variant="mahogany" size="sm">
                {formatNumber(currentPlan.sqFt)} SQ FT
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

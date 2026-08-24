'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockProperties } from '@/data/mockProperties';
import { PropertyCard } from '@/components/properties/PropertyCard';
import { Property } from '@/types';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { GlassCard } from '@/ui/GlassCard';
import { Heart, Trash2, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function SavedPropertiesPage() {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedIds: string[] = JSON.parse(localStorage.getItem('amber_saved_properties') || '[]');
      const matches = mockProperties.filter((p) => savedIds.includes(p.id));
      setSavedProperties(matches);
    } catch (e) {
      setSavedProperties([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAll = () => {
    localStorage.removeItem('amber_saved_properties');
    setSavedProperties([]);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#d8cebe]/60 pb-6">
        <div className="space-y-2">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1 text-xs font-mono text-[#7e7365] hover:text-[#1F1B16] transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="exclusive" size="sm">Client Shortlist</Badge>
            <Badge variant="stone" size="sm">{savedProperties.length} Estates</Badge>
          </div>
          <h1 className="font-display font-medium text-3xl sm:text-4xl text-[#1F1B16] tracking-tight">
            Saved Properties & Private Portfolio
          </h1>
        </div>

        {savedProperties.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="text-xs text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Clear Shortlist
          </Button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-[#7e7365]">
          Loading saved collection...
        </div>
      ) : savedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <GlassCard variant="card" rounded="2rem" className="p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#f5efe6] border border-[#d8cebe] flex items-center justify-center mx-auto text-[#5c3822]">
            <Heart className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-medium text-xl text-[#1F1B16]">
              Your Shortlist is Empty
            </h3>
            <p className="text-xs text-[#7e7365] leading-relaxed">
              Explore our curated portfolio and tap the heart icon on any estate to add it to your private review collection.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/properties">
              <Button variant="primary" size="md">
                Browse Properties
              </Button>
            </Link>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

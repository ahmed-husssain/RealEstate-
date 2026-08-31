import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { requireAuthUserPage } from '@/lib/auth/admin';
import { getAdminPropertiesList } from '@/lib/db/admin';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import { Plus, Building2, MapPin } from 'lucide-react';
import { PropertyRowActions } from './PropertyRowActions';

export const dynamic = 'force-dynamic';

export default async function AdminPropertiesListPage() {
  await requireAuthUserPage();
  const properties = await getAdminPropertiesList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#d8cebe]/60 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="exclusive" size="sm">Portfolio Management</Badge>
            <span className="text-xs font-mono text-[#7e7365]">
              {properties.length} Total Properties
            </span>
          </div>
          <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
            All Property Listings
          </h1>
          <p className="text-xs text-[#7e7365]">
            Create, edit prices, update specs, and manage Karachi property listings
          </p>
        </div>

        <Link href="/admin/properties/new">
          <Button variant="primary" size="md" className="text-xs">
            <Plus className="w-4 h-4" />
            <span>Create New Property</span>
          </Button>
        </Link>
      </div>

      {/* Properties Table */}
      <GlassCard variant="container" rounded="2rem" className="overflow-hidden bg-[#fbf6f0]">
        {properties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f5efe6] border-b border-[#d8cebe] text-[#7e7365] uppercase font-mono text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Area & Location</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Category / Size</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d8cebe]/60 font-sans">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-white/60 transition-colors">
                    {/* Property Cover & Title */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-10 rounded-xl overflow-hidden bg-[#e5decb] shrink-0 border border-[#d8cebe]">
                          {property.images[0] ? (
                            <Image
                              src={property.images[0].url}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#7e7365]">
                              <Building2 className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-xs">
                          <Link
                            href={`/admin/properties/${property.id}/edit`}
                            className="font-semibold text-xs text-[#1F1B16] hover:text-[#5c3822] line-clamp-1"
                          >
                            {property.title}
                          </Link>
                          <span className="text-[10px] text-[#7e7365] line-clamp-1">
                            {property.tagline || property.address}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Area & Location */}
                    <td className="p-4 text-[#1F1B16]">
                      <div className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#5c3822] shrink-0" />
                        <span>{property.area.name}</span>
                      </div>
                      <span className="text-[10px] text-[#7e7365] block pl-4">
                        {property.address}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-mono font-bold text-[#1F1B16]">
                      {property.priceFormatted || `PKR ${Number(property.price).toLocaleString()}`}
                    </td>

                    {/* Category & Size */}
                    <td className="p-4">
                      <span className="font-mono text-[11px] text-[#1F1B16] block">
                        {property.bedrooms > 0 ? `${property.bedrooms} Bed · ` : ''}{Number(property.areaSize)} {property.areaUnit}
                      </span>
                      <span className="text-[10px] text-[#7e7365] font-mono">
                        {property.propertyType}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <Badge
                        variant={
                          property.status === 'EXCLUSIVE'
                            ? 'exclusive'
                            : property.status === 'FOR_LEASE'
                            ? 'moss'
                            : property.status === 'SOLD'
                            ? 'stone'
                            : 'default'
                        }
                        size="sm"
                        className="text-[10px]"
                      >
                        {property.status.replace('_', ' ')}
                      </Badge>
                      {property.isFeatured && (
                        <span className="block text-[9px] font-mono text-[#5c3822] font-semibold mt-0.5">
                          ★ Featured
                        </span>
                      )}
                    </td>

                    {/* Row Actions */}
                    <td className="p-4 text-right">
                      <PropertyRowActions
                        propertyId={property.id}
                        slug={property.slug}
                        title={property.title}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <Building2 className="w-8 h-8 mx-auto text-[#7e7365]" />
            <p className="text-xs text-[#7e7365]">No properties found in the database.</p>
            <Link href="/admin/properties/new">
              <Button variant="primary" size="sm">Create First Property</Button>
            </Link>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

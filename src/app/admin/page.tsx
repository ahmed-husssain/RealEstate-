import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { getCurrentAdminUser } from '@/lib/auth/admin';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  Building2,
  Inbox,
  Calculator,
  MapPin,
  Users,
  ArrowUpRight,
  Phone,
  Clock,
  Plus,
  FileText,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const user = await getCurrentAdminUser();
  if (!user) return null;

  // Fetch metrics in parallel
  const [
    totalProperties,
    featuredProperties,
    totalInquiries,
    newInquiries,
    totalValuations,
    totalAreas,
    totalUsers,
    recentInquiries,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { isFeatured: true } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
    prisma.valuationRequest.count(),
    prisma.area.count(),
    prisma.adminUser.count(),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        property: {
          select: { title: true },
        },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="exclusive" size="sm">Internal Portal</Badge>
            <span className="text-xs font-mono text-[#7e7365]">Role: {user.role}</span>
          </div>
          <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-[#7e7365]">
            Amber Property Corner Management & Real Estate Operations Hub
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/properties/new">
            <Button variant="primary" size="md" className="text-xs">
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </Button>
          </Link>
          <Link href="/admin/content">
            <Button variant="secondary" size="md" className="text-xs">
              <FileText className="w-4 h-4" />
              <span>Edit Site Text</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Properties Card */}
        <GlassCard variant="card" rounded="1.75rem" className="p-5 bg-[#fbf6f0] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#7e7365]">Properties</span>
            <div className="w-8 h-8 rounded-lg bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <p className="font-display font-medium text-2xl text-[#1F1B16]">{totalProperties}</p>
          <p className="text-[11px] text-[#7e7365]">{featuredProperties} Featured on Home</p>
        </GlassCard>

        {/* Client Inquiries Card */}
        <GlassCard variant="card" rounded="1.75rem" className="p-5 bg-[#fbf6f0] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#7e7365]">Client Leads</span>
            <div className="w-8 h-8 rounded-lg bg-[#2e3a2f]/10 text-[#2e3a2f] flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <p className="font-display font-medium text-2xl text-[#1F1B16]">{totalInquiries}</p>
          <div className="flex items-center gap-1.5">
            {newInquiries > 0 ? (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold">
                {newInquiries} New Leads
              </span>
            ) : (
              <span className="text-[11px] text-[#7e7365]">All caught up</span>
            )}
          </div>
        </GlassCard>

        {/* Valuation Requests Card */}
        <GlassCard variant="card" rounded="1.75rem" className="p-5 bg-[#fbf6f0] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#7e7365]">Price Valuations</span>
            <div className="w-8 h-8 rounded-lg bg-[#847666]/15 text-[#1F1B16] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
          </div>
          <p className="font-display font-medium text-2xl text-[#1F1B16]">{totalValuations}</p>
          <p className="text-[11px] text-[#7e7365]">Submitted by Sellers</p>
        </GlassCard>

        {/* Karachi Areas Card */}
        <GlassCard variant="card" rounded="1.75rem" className="p-5 bg-[#fbf6f0] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#7e7365]">Target Areas</span>
            <div className="w-8 h-8 rounded-lg bg-[#5c3822]/10 text-[#5c3822] flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <p className="font-display font-medium text-2xl text-[#1F1B16]">{totalAreas}</p>
          <p className="text-[11px] text-[#7e7365]">{totalUsers} Team Accounts</p>
        </GlassCard>
      </div>

      {/* Recent Inquiries Table & Fast WhatsApp Response */}
      <GlassCard variant="container" rounded="2rem" className="p-6 sm:p-7 space-y-5 bg-[#fbf6f0]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-medium text-lg text-[#1F1B16]">
              Recent Client Inquiries & Leads
            </h2>
            <p className="text-xs text-[#7e7365]">
              Latest messages from contact forms and property visit booking requests
            </p>
          </div>
          <Link href="/admin/inquiries">
            <Button variant="secondary" size="sm" className="text-xs">
              <span>View All Leads ({totalInquiries})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {recentInquiries.length > 0 ? (
          <div className="divide-y divide-[#d8cebe]/60">
            {recentInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[#1F1B16]">{inquiry.name}</span>
                    <Badge
                      variant={inquiry.status === 'NEW' ? 'exclusive' : 'stone'}
                      size="sm"
                      className="text-[10px]"
                    >
                      {inquiry.status}
                    </Badge>
                    <span className="text-[10px] font-mono text-[#7e7365]">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#7e7365] line-clamp-1">
                    {inquiry.message || (inquiry.property ? `Inquiry on: ${inquiry.property.title}` : 'General Inquiry')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam o Alaikum ${inquiry.name}, thank you for contacting Amber Property Corner.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" size="sm" className="text-xs py-1.5 px-3">
                      <span>WhatsApp Client</span>
                    </Button>
                  </a>
                  <a href={`tel:${inquiry.phone}`}>
                    <Button variant="secondary" size="sm" className="text-xs py-1.5 px-2.5">
                      <Phone className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-[#7e7365]">
            No client inquiries yet. Submissions from the website will appear here automatically.
          </div>
        )}
      </GlassCard>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { requireAuthUserPage } from '@/lib/auth/admin';
import { getAdminDashboardMetrics } from '@/lib/db/admin';
import { GlassCard } from '@/ui/GlassCard';
import { Badge } from '@/ui/Badge';
import { Button } from '@/ui/Button';
import {
  Building2,
  Inbox,
  Calculator,
  MapPin,
  ArrowUpRight,
  Phone,
  Plus,
  FileText,
  MessageSquare,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatInquiryMessage(rawMessage: string | null) {
  if (!rawMessage) return { topic: null, message: null };
  const topicMatch = rawMessage.match(/^Topic:\s*([^.]+)\.\s*Message:\s*([\s\S]*)$/i);
  if (topicMatch) {
    const rawTopic = topicMatch[1].trim();
    const topicLabels: Record<string, string> = {
      'sales-buying': 'Property Buying',
      'rent-property': 'Rental Property',
      'sales-selling': 'Property Selling',
      'construction': 'Turnkey Construction',
      'legal-approvals': 'SBCA Map & Legal Approvals',
      'interior-remodel': 'Room & Interior Remodeling',
      'valuation': 'Price Valuation',
      'general': 'General Consultation',
    };
    return {
      topic: topicLabels[rawTopic] || rawTopic,
      message: topicMatch[2].trim(),
    };
  }
  return { topic: null, message: rawMessage };
}

export default async function AdminDashboardPage() {
  const user = await requireAuthUserPage();
  const metrics = await getAdminDashboardMetrics();

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

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/properties/new" className="flex-1 sm:flex-none">
            <Button variant="primary" size="md" className="text-xs w-full sm:w-auto justify-center">
              <Plus className="w-4 h-4" />
              <span>Add New Property</span>
            </Button>
          </Link>
          <Link href="/admin/content" className="flex-1 sm:flex-none">
            <Button variant="secondary" size="md" className="text-xs w-full sm:w-auto justify-center">
              <FileText className="w-4 h-4" />
              <span>Edit Site Text</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Properties Card */}
        <Link href="/admin/properties" className="group block focus:outline-none cursor-pointer">
          <GlassCard
            variant="card"
            rounded="1.75rem"
            className="p-5 bg-[#fbf6f0] space-y-2 border border-[#d8cebe] group-hover:border-[#5c3822] group-hover:shadow-md transition-all h-full"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7e7365] group-hover:text-[#5c3822] transition-colors">
                Properties
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#5c3822]/10 text-[#5c3822] group-hover:bg-[#5c3822] group-hover:text-white transition-all flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display font-medium text-2xl text-[#1F1B16]">{metrics.totalProperties}</p>
            <div className="flex items-center justify-between text-[11px] text-[#7e7365]">
              <span>{metrics.featuredProperties} Featured on Home</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#5c3822] transition-all" />
            </div>
          </GlassCard>
        </Link>

        {/* Client Inquiries Card */}
        <Link href="/admin/inquiries" className="group block focus:outline-none cursor-pointer">
          <GlassCard
            variant="card"
            rounded="1.75rem"
            className="p-5 bg-[#fbf6f0] space-y-2 border border-[#d8cebe] group-hover:border-[#2e3a2f] group-hover:shadow-md transition-all h-full"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7e7365] group-hover:text-[#2e3a2f] transition-colors">
                Client Leads
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#2e3a2f]/10 text-[#2e3a2f] group-hover:bg-[#2e3a2f] group-hover:text-white transition-all flex items-center justify-center">
                <Inbox className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display font-medium text-2xl text-[#1F1B16]">{metrics.totalInquiries}</p>
            <div className="flex items-center justify-between">
              {metrics.newInquiries > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-mono font-bold">
                  {metrics.newInquiries} New Leads
                </span>
              ) : (
                <span className="text-[11px] text-[#7e7365]">All caught up</span>
              )}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#2e3a2f] transition-all" />
            </div>
          </GlassCard>
        </Link>

        {/* Valuation Requests Card */}
        <Link href="/admin/valuations" className="group block focus:outline-none cursor-pointer">
          <GlassCard
            variant="card"
            rounded="1.75rem"
            className="p-5 bg-[#fbf6f0] space-y-2 border border-[#d8cebe] group-hover:border-[#847666] group-hover:shadow-md transition-all h-full"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7e7365] group-hover:text-[#1F1B16] transition-colors">
                Price Valuations
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#847666]/15 text-[#1F1B16] group-hover:bg-[#1F1B16] group-hover:text-white transition-all flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display font-medium text-2xl text-[#1F1B16]">{metrics.totalValuations}</p>
            <div className="flex items-center justify-between text-[11px] text-[#7e7365]">
              <span>Submitted by Sellers</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#847666] transition-all" />
            </div>
          </GlassCard>
        </Link>

        {/* Karachi Areas Card */}
        <Link href="/admin/areas" className="group block focus:outline-none cursor-pointer">
          <GlassCard
            variant="card"
            rounded="1.75rem"
            className="p-5 bg-[#fbf6f0] space-y-2 border border-[#d8cebe] group-hover:border-[#5c3822] group-hover:shadow-md transition-all h-full"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#7e7365] group-hover:text-[#5c3822] transition-colors">
                Target Areas
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#5c3822]/10 text-[#5c3822] group-hover:bg-[#5c3822] group-hover:text-white transition-all flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display font-medium text-2xl text-[#1F1B16]">{metrics.totalAreas}</p>
            <div className="flex items-center justify-between text-[11px] text-[#7e7365]">
              <span>{metrics.totalUsers} Team Accounts</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#5c3822] transition-all" />
            </div>
          </GlassCard>
        </Link>
      </div>

      {/* Recent Inquiries Section */}
      <GlassCard variant="container" rounded="2rem" className="p-5 sm:p-7 space-y-5 bg-[#fbf6f0]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#d8cebe]/60 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-medium text-lg sm:text-xl text-[#1F1B16]">
                Recent Inquiries & Leads
              </h2>
              {metrics.newInquiries > 0 && (
                <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#5c3822]/10 text-[#5c3822] border border-[#5c3822]/30 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5c3822] animate-pulse" />
                  {metrics.newInquiries} New
                </span>
              )}
            </div>
            <p className="text-xs text-[#7e7365]">
              Latest messages from contact forms and property visit booking requests
            </p>
          </div>

          <div className="flex items-center justify-start sm:justify-end shrink-0">
            <Link
              href="/admin/inquiries"
              className="group inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#5c3822] hover:text-[#1F1B16] bg-white hover:bg-[#5c3822]/10 px-3.5 py-2 rounded-xl border border-[#d8cebe] transition-all shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <span>View All Leads ({metrics.totalInquiries})</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {metrics.recentInquiries.length > 0 ? (
          <div className="grid grid-cols-1 gap-3.5">
            {metrics.recentInquiries.map((inquiry) => {
              const { topic, message } = formatInquiryMessage(inquiry.message);
              const initial = (inquiry.name || 'C').charAt(0).toUpperCase();

              return (
                <div
                  key={inquiry.id}
                  className="bg-white border border-[#d8cebe] hover:border-[#5c3822]/60 rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-3.5"
                >
                  {/* Row 1: Client Profile Header & Metadata */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#5c3822]/10 text-[#5c3822] font-display font-semibold text-sm flex items-center justify-center shrink-0 border border-[#5c3822]/20">
                        {initial}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-medium text-sm text-[#1F1B16]">
                            {inquiry.name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              inquiry.status === 'NEW'
                                ? 'bg-[#5c3822]/15 text-[#5c3822]'
                                : 'bg-[#7e7365]/15 text-[#7e7365]'
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-[#7e7365]">
                          {inquiry.phone}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#7e7365] shrink-0">
                      {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Row 2: Topic / Property Badge & Clean Message */}
                  <div className="space-y-2">
                    {inquiry.property ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#5c3822]/10 text-[#5c3822] text-[11px] font-medium">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="line-clamp-1">{inquiry.property.title}</span>
                      </div>
                    ) : topic ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2e3a2f]/10 text-[#2e3a2f] text-[11px] font-medium">
                        <MessageSquare className="w-3 h-3" />
                        <span>Topic: {topic}</span>
                      </div>
                    ) : null}

                    {message && (
                      <div className="bg-[#fbf6f0] rounded-xl p-3 border border-[#d8cebe]/40 text-xs text-[#1F1B16] leading-relaxed">
                        &ldquo;{message}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Row 3: Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Assalam o Alaikum ${inquiry.name}, thank you for contacting Amber Property Corner.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none"
                    >
                      <Button variant="primary" size="sm" className="text-xs py-1.5 px-3.5 w-full sm:w-auto justify-center shadow-xs">
                        <span>WhatsApp Client</span>
                      </Button>
                    </a>
                    <a href={`tel:${inquiry.phone}`}>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs py-1.5 px-3 bg-white"
                        title="Call Client"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline ml-1">Call</span>
                      </Button>
                    </a>
                    <Link href="/admin/inquiries" className="ml-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs py-1.5 px-2.5 bg-transparent border-transparent hover:bg-[#5c3822]/10 text-[#5c3822]"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3 ml-0.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-10 text-center space-y-2 bg-white rounded-2xl border border-[#d8cebe] p-6">
            <Inbox className="w-8 h-8 text-[#7e7365] mx-auto opacity-50" />
            <p className="font-display font-medium text-sm text-[#1F1B16]">No client inquiries yet</p>
            <p className="text-xs text-[#7e7365]">Submissions from website visitors will appear here in real-time.</p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

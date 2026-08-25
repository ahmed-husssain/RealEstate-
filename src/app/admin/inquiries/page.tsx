import React from 'react';
import { requireAuthUser } from '@/lib/auth/admin';
import { getAdminInquiriesList } from '@/lib/db/admin';
import { Badge } from '@/ui/Badge';
import { InquiriesListClient } from './InquiriesListClient';

export const dynamic = 'force-dynamic';

export default async function AdminInquiriesPage() {
  await requireAuthUser();
  const inquiries = await getAdminInquiriesList();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 border-b border-[#d8cebe]/60 pb-4">
        <div className="flex items-center gap-2">
          <Badge variant="exclusive" size="sm">CRM & Leads</Badge>
          <span className="text-xs font-mono text-[#7e7365]">
            {inquiries.length} Total Inquiries Received
          </span>
        </div>
        <h1 className="font-display font-medium text-2xl sm:text-3xl text-[#1F1B16]">
          Client Inquiries & Booking Requests
        </h1>
        <p className="text-xs text-[#7e7365]">
          Manage incoming buyer and seller leads with 1-click WhatsApp messaging
        </p>
      </div>

      <InquiriesListClient initialInquiries={inquiries} />
    </div>
  );
}
